/* AGU Quiz Sprint 11: planejamento semanal, persistência local e integração sem backend */
(function(global){
"use strict";
const KEY="agu_quiz_planejamento_semanal_v1", VERSION=1;
const DEFAULT_MINUTES=[130,130,130,130,130,130,0]; // 13h/semana, configurável
const WEEKDAYS=["Segunda","Terça","Quarta","Quinta","Sexta","Sábado","Domingo"];
const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const pad=x=>String(x).padStart(2,"0");
const isoLocal=d=>d.getFullYear()+"-"+pad(d.getMonth()+1)+"-"+pad(d.getDate());
const parseDay=s=>new Date(s+"T12:00:00");
function monday(date=new Date()){const d=new Date(date.getFullYear(),date.getMonth(),date.getDate(),12);d.setDate(d.getDate()-(d.getDay()+6)%7);return isoLocal(d)}
function dateAdd(day,n){const d=parseDay(day);d.setDate(d.getDate()+n);return isoLocal(d)}
function minutesText(n){return Math.floor(n/60)+"h"+pad(n%60)}
function empty(){return {schema:VERSION,settings:{dailyMinutes:DEFAULT_MINUTES.slice()},weeks:{},created:new Date().toISOString()}}
let state;try{const obj=JSON.parse(localStorage.getItem(KEY)||"null");state=obj?.schema===VERSION&&obj.weeks&&Array.isArray(obj.settings?.dailyMinutes)?obj:empty()}catch{state=empty()}
function save(){localStorage.setItem(KEY,JSON.stringify(state))}
function setDaily(index,value){const n=Number(value);if(!Number.isInteger(n)||n<0||n>780||index<0||index>6)return false;state.settings.dailyMinutes[index]=n;save();return true}
function asTopics(data){
 const d=global.AGUPlannerContext?.()||{disciplines:[],sessions:[],answers:[],reviews:[],notebook:[],topic:{}};
 const topics=[];
 for(const disc of d.disciplines||[])for(const topic of disc[2]||[])topics.push({id:disc[0]+"/"+topic,disc:disc[0],name:topic,full:disc[1]});
 return {d,topics};
}
function makeWeights(ctx){
 const {d,topics}=ctx,review=global.AGUReview?.disciplineMetrics?.()||{};
 const stat={};
 for(const t of topics){stat[t.id]={...t,priority:0,errors:0,due:0,active:false,minutes:0}}
 for(const s of d.sessions||[]){const x=stat[s.topic];if(x){x.minutes+=Math.max(0,Number(s.minutes)||0);x.active=true}}
 for(const a of d.answers||[]){const x=stat[a.topic];if(x){x.active=true;if(a.correct===false)x.errors++}}
 for(const nb of d.notebook||[]){const x=stat[nb.topic];if(x)x.active=true}
 for(const [id,val] of Object.entries(d.topic||{})){const x=stat[id];if(x&&val&&val.state&&val.state!=="Não iniciado")x.active=true}
 const today=isoLocal(new Date());
 for(const rv of d.reviews||[]){const x=stat[rv.topic];if(x&&rv.due&&String(rv.due).slice(0,10)<=today)x.due++}
 for(const x of Object.values(stat)){
  const rs=review[x.disc]||{};
  x.priority=x.due*12+x.errors*8+(rs.errors||0)*2+(rs.due||0)*3+(x.active?4:0);
 }
 return Object.values(stat).sort((a,b)=>b.priority-a.priority||Number(b.active)-Number(a.active)||a.id.localeCompare(b.id));
}
function generate(start=monday()){
 const ctx=asTopics(),priority=makeWeights(ctx);
 const available=priority.filter(x=>x.active);
 // Mantém as dificuldades em primeiro lugar, mas distribui outras matérias ao longo da semana.
 const pool=[...available,...priority.filter(x=>!x.active)]; // sem progresso: rotação provisória, não avanço presumido
 if(!pool.length)throw Error("Nenhuma disciplina disponível no mapa local");
 const week={start,created:new Date().toISOString(),updated:new Date().toISOString(),generator:"v1-prioridade_e_rotacao",provisional:!available.length,days:[]};
 let cursor=0;
 for(let i=0;i<7;i++){
  const date=dateAdd(start,i),minutes=Number(state.settings.dailyMinutes[i]||0);
  if(minutes===0){week.days.push({date,minutes:0,tasks:[]});continue}
  const selected=pool[cursor%pool.length];cursor++;
  const revision=Math.min(8,minutes),questions=minutes>=40?Math.min(15,Math.floor(minutes*.12)):0;
  const lesson=Math.max(0,minutes-revision-questions);
  const tasks=[];
  if(lesson>0)tasks.push({id:date+"-aula",type:"aula",topic:selected.id,minutes:lesson,done:false,manual:false});
  if(revision>0)tasks.push({id:date+"-revisao",type:"revisao",topic:selected.id,minutes:revision,done:false,manual:false});
  if(questions>0)tasks.push({id:date+"-questoes",type:"questoes",topic:selected.id,minutes:questions,done:false,manual:false});
  week.days.push({date,minutes,tasks})
 }
 return week;
}
function current(start=monday()){return state.weeks[start]||null}
function ensure(start=monday()){if(!state.weeks[start]){state.weeks[start]=generate(start);save()}return state.weeks[start]}
function create(start=monday(),force=false){if(state.weeks[start]&&!force)return state.weeks[start];state.weeks[start]=generate(start);save();return state.weeks[start]}
function change(dayIndex,taskId,field,value){
 const w=ensure();const day=w.days[dayIndex],task=day?.tasks?.find(x=>x.id===taskId);
 if(!task)return false;
 if(field==="done"){task.done=Boolean(value)}
 else if(field==="topic"){
  if(!asTopics().topics.some(x=>x.id===value))return false;task.topic=value;task.manual=true
 }else if(field==="minutes"){
  const n=Number(value);if(!Number.isInteger(n)||n<0||n>780)return false;
  const other=day.tasks.filter(x=>x.id!==taskId).reduce((sum,x)=>sum+x.minutes,0);
  if(n+other>day.minutes)return false;
  task.minutes=n;task.manual=true
 }else return false;
 w.updated=new Date().toISOString();save();return true;
}
function move(dayIndex,taskId,direction){
 const w=ensure(),from=w.days[dayIndex];const task=from?.tasks?.find(x=>x.id===taskId);const to=w.days[dayIndex+direction];
 if(!task||!to||to.minutes===0)return false;
 const occupied=to.tasks.reduce((a,t)=>a+t.minutes,0);
 if(occupied+task.minutes>to.minutes)return false;
 from.tasks=from.tasks.filter(x=>x.id!==taskId);to.tasks.push({...task,manual:true});
 w.updated=new Date().toISOString();save();return true;
}
function setWeeklyTime(dayIndex,n){
 if(!setDaily(dayIndex,n))return false;
 const w=current();if(!w)return true;
 const day=w.days[dayIndex],occupied=day.tasks.reduce((sum,x)=>sum+x.minutes,0);
 if(occupied>n){return "needs_regeneration"} // não apagar trabalho realizado
 day.minutes=n;w.updated=new Date().toISOString();save();return true;
}
function stats(w=ensure()){
 const days=w.days,planned=days.reduce((n,d)=>n+d.tasks.reduce((s,t)=>s+t.minutes,0),0);
 const done=days.reduce((n,d)=>n+d.tasks.filter(t=>t.done).reduce((s,t)=>s+t.minutes,0),0);
 return {planned,done,remaining:planned-done,count:days.reduce((n,d)=>n+d.tasks.length,0),completed:days.reduce((n,d)=>n+d.tasks.filter(t=>t.done).length,0)};
}
function next(w=ensure(),today=isoLocal(new Date())){
 const due=w.days.flatMap(d=>d.tasks.filter(t=>!t.done).map(t=>({...t,date:d.date})));
 return due.find(x=>x.date>=today)||due[0]||null
}
function exportJSON(){
 const blob=new Blob([JSON.stringify({schema:"agu-planner-backup-v1",exported:new Date().toISOString(),data:state},null,2)],{type:"application/json"});
 const url=URL.createObjectURL(blob),a=document.createElement("a");a.href=url;a.download="AGU_Planejamento_Semanal_backup.json";a.click();setTimeout(()=>URL.revokeObjectURL(url),2000)
}
/* Sprint 20: impedir que semanas malformadas corrompam o planejamento. */
const ISO_DAY=/^\d{4}-\d{2}-\d{2}$/;
const validMinutes=n=>Number.isInteger(n)&&n>=0&&n<=780;
const isDate=x=>typeof x==='string'&&ISO_DAY.test(x)&&!Number.isNaN(Date.parse(x+'T12:00:00Z'));
function validWeek(key,w){
 if(!isDate(key)||monday(parseDay(key))!==key||!w||w.start!==key||!Array.isArray(w.days)||w.days.length!==7)return false;
 const ids=new Set();
 for(let i=0;i<7;i++){
  const day=w.days[i];
  if(!day||day.date!==dateAdd(key,i)||!validMinutes(day.minutes)||!Array.isArray(day.tasks)||day.tasks.length>100)return false;
  let sum=0;
  for(const task of day.tasks){
   if(!task||typeof task.id!=='string'||task.id.length>150||!task.id||ids.has(task.id)||!['aula','revisao','questoes'].includes(task.type))return false;
   if(typeof task.topic!=='string'||task.topic.length<1||task.topic.length>240||!validMinutes(task.minutes)||typeof task.done!=='boolean'||typeof task.manual!=='boolean')return false;
   ids.add(task.id);sum+=task.minutes;
  }
  if(sum>day.minutes)return false;
 }
 return true;
}
function validateBackupObject(raw){
 const b=typeof raw==='string'?JSON.parse(raw):raw;
 if(b?.schema!=='agu-planner-backup-v1'||b.data?.schema!==VERSION||!b.data.weeks||typeof b.data.weeks!=='object'||Array.isArray(b.data.weeks))throw Error('Backup de planejamento incompatível.');
 const settings=b.data.settings?.dailyMinutes;
 if(!Array.isArray(settings)||settings.length!==7||!settings.every(validMinutes))throw Error('Metas semanais inválidas.');
 const weeks=Object.entries(b.data.weeks);
 if(weeks.length>520||weeks.some(([key,w])=>!validWeek(key,w)))throw Error('Semana importada inválida; nenhuma modificação realizada.');
 return weeks;
}
function mergeBackupObject(raw){
 const incoming=validateBackupObject(raw),merged={...state.weeks};
 let added=0;
 for(const [key,week] of incoming)if(!Object.hasOwn(merged,key)){merged[key]=week;added++}
 if(added){
  const next={...state,weeks:merged};
  localStorage.setItem(KEY,JSON.stringify(next));state=next;
 }
 return {added,skipped:incoming.length-added,preservedSettings:true};
}
function importBackup(input){
 const f=input?.files?.[0];if(!f)return;
 if(f.size>3000000){alert('Backup acima do limite de 3 MB.');return}
 const reader=new FileReader();reader.onload=()=>{
  try{
   const raw=String(reader.result);
   if(raw.length>3000000)throw Error('Backup acima do limite permitido.');
   const incoming=validateBackupObject(raw);
   if(!confirm('Importar até '+incoming.length+' semanas novas? Semanas e metas atuais serão preservadas.'))return;
   const result=mergeBackupObject(raw);
   global.render?.();alert(result.added+' semana(s) adicionada(s), '+result.skipped+' já existentes. Metas locais mantidas.');
  }catch(e){alert('Importação rejeitada: '+e.message)}
 };reader.onerror=()=>alert('Falha na leitura do backup.');reader.readAsText(f);
}
function html(){
 const week=ensure(),s=stats(week),n=next(week),ctx=asTopics(),choices=ctx.topics;
 const hours=state.settings.dailyMinutes.reduce((a,b)=>a+b,0);
 return '<div class="top"><div><div class="eyebrow">AGU / SPRINT 11</div><h1>Planejamento semanal</h1><div class="muted">Cronograma automático · tarefas editáveis · histórico preservado neste navegador</div></div></div>'+
 '<div class="grid"><div class="card"><div class="muted">Tempo previsto</div><div class="metric">'+minutesText(s.planned)+'</div><div class="small muted">Meta configurada: '+minutesText(hours)+'</div></div>'+
 '<div class="card"><div class="muted">Tarefas concluídas</div><div class="metric">'+s.completed+'/'+s.count+'</div><div class="small muted">Marcadas manualmente, não são tempo líquido</div></div>'+
 '<div class="card"><div class="muted">Próxima atividade</div><b>'+esc(n?n.topic.replace("/"," · "):"Nenhuma pendência")+'</b><div class="small muted">'+esc(n?n.type+" · "+n.date:"Cronograma concluído")+'</div></div></div>'+
 '<div class="card"><h2>Disponibilidade semanal</h2><p class="small muted">Configuração inicial: 13h distribuídas de segunda a sábado. Ajuste conforme sua disponibilidade real. O planejamento não modifica sessões nem revisões já registradas.</p>'+
 '<div class="grid">'+WEEKDAYS.map((day,i)=>'<label>'+day+'<input aria-label="Minutos de '+day+'" type="number" min="0" max="780" step="5" id="planner-min-'+i+'" value="'+state.settings.dailyMinutes[i]+'"></label>').join("")+'</div>'+
 '<div class="btnrow"><button class="secondary" onclick="AGUPlanner.applyHours()">Salvar disponibilidade</button><button class="primary" onclick="AGUPlanner.regenerate()">Gerar novamente esta semana</button></div></div>'+
 (week.provisional?'<div class="note"><b>Planejamento provisório:</b> não há progresso local suficiente para ordenar as matérias por dificuldade. A sequência inicial é uma rotação e não indica aulas concluídas.</div>':'')+
 '<div class="card"><h2>Semana de '+esc(week.start)+'</h2><p class="small muted">Alocação: aulas e continuidade, revisão ativa (até 8 minutos/dia) e questões. As tarefas são propostas, nunca registradas como horas estudadas automaticamente.</p>'+
 week.days.map((d,i)=>'<div class="history"><div class="split"><b>'+WEEKDAYS[i]+' · '+esc(d.date)+'</b><span class="chip">'+minutesText(d.minutes)+'</span></div>'+
 (d.tasks.length?d.tasks.map(task=>'<div class="section"><div class="split"><label><input type="checkbox" '+(task.done?'checked':'')+' onchange="AGUPlanner.edit('+i+',\''+esc(task.id)+'\',\'done\',this.checked)"> '+(task.type==='aula'?'Aula / continuidade':task.type==='revisao'?'Recuperação ativa':'Questões oficiais')+'</label><span class="small muted">'+minutesText(task.minutes)+'</span></div>'+
 '<select aria-label="Matéria da atividade" onchange="AGUPlanner.edit('+i+',\''+esc(task.id)+'\',\'topic\',this.value)">'+choices.map(x=>'<option value="'+esc(x.id)+'" '+(x.id===task.topic?'selected':'')+'>'+esc(x.full+" · "+x.name)+'</option>').join("")+'</select>'+
 '<div class="btnrow"><button class="secondary" '+(i===0?'disabled':'')+' onclick="AGUPlanner.shift('+i+',\''+esc(task.id)+'\',-1)">Dia anterior</button><button class="secondary" '+(i===6?'disabled':'')+' onclick="AGUPlanner.shift('+i+',\''+esc(task.id)+'\',1)">Próximo dia</button></div></div>').join(""):'<div class="small muted">Dia sem estudo planejado</div>')+'</div>').join("")+'</div>'+
 '<div class="card"><h2>Continuar o estudo</h2><div class="btnrow"><button class="primary" onclick="setView(\'review\')">Abrir revisões</button><button class="secondary" onclick="setView(\'sessions\')">Registrar horas reais</button><button class="secondary" onclick="setView(\'organization\')">Organização por matérias</button></div>'+
 '<p class="small muted">Não há sincronização com lembretes do ChatGPT. As tarefas marcadas são planejamento local, distinto do tempo líquido registrado nas sessões.</p>'+
 '<div class="btnrow"><button class="secondary" onclick="AGUPlanner.exportData()">Exportar plano JSON</button><button class="secondary" onclick="document.getElementById(\'planner-import\').click()">Importar backup</button><input id="planner-import" class="hidden" type="file" accept="application/json" onchange="AGUPlanner.importBackup(this)"></div></div>';
}
function applyHours(){
 const inputs=DEFAULT_MINUTES.map((_,i)=>document.getElementById("planner-min-"+i));
 const values=inputs.map(el=>Number(el?.value));
 if(values.some(n=>!Number.isInteger(n)||n<0||n>780)){alert("Use minutos inteiros entre 0 e 780 por dia.");return}
 const w=current(),occupied=w?.days?.map(d=>d.tasks.reduce((a,t)=>a+t.minutes,0))||[];
 const conflicts=values.some((n,i)=>occupied[i]>n);
 if(conflicts&&!confirm("As horas novas são menores que as tarefas de alguns dias. Salvar a disponibilidade e manter o cronograma atual até você regenerá-lo?"))return;
 state.settings.dailyMinutes=values;save();
 if(w&&!conflicts){w.days.forEach((d,i)=>d.minutes=values[i]);w.updated=new Date().toISOString();save()}
 global.render?.()
}
function regenerate(){
 const w=current(),hasEdits=w?.days?.some(d=>d.tasks.some(t=>t.manual||t.done));
 if(w&&hasEdits&&!confirm("O novo cronograma substituirá as marcações e alterações manuais desta semana. O histórico de respostas/sessões/revisões será preservado. Continuar?"))return;
 create(monday(),true);global.render?.()
}
function edit(i,id,field,value){if(!change(i,id,field,value))alert("Alteração inválida.");global.render?.()}
function shift(i,id,n){if(!move(i,id,n))alert("O dia de destino não tem capacidade disponível. Ajuste os minutos semanais antes de mover.");global.render?.()}
global.AGUPlanner={page:html,ensure,current,create,generate,stats,next,change,move,edit,shift,applyHours,regenerate,exportData:exportJSON,importBackup,validateBackupObject,mergeBackupObject,settings:()=>state.settings,weekKey:monday,peek:()=>state};
})(window);
