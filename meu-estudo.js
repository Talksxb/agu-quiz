/* WORK 01 — apresentação da continuidade; os motores e seus dados continuam originais. */
(function(root){
'use strict';
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const stages={norma:'Leitura normativa',caderno:'Caderno AGU',questoes:'Questões verificadas',flashcards:'Flashcards',revisao:'Avaliação e revisão'};
// Atalho temático de interface, não vínculo de respostas nem certificação curricular.
const entries={'ADM/Atos administrativos':'L9784:art11:caput','CON/Funções essenciais à Justiça':'CF88:art131:caput'};
function units(){return (root.AGU_LEGAL_CORPUS?.laws||[]).flatMap(l=>l.articles.flatMap(a=>a.clauses.map(c=>({id:c.id,law:l.title,article:a.label,topic:a.topic,label:c.label}))))}
function context(){return root.AGUHomeContext?.()||{}}
function next(){
 const ctx=context(),catalog=units();
 if(!ctx.demo){
  const state=root.AGUStudy?.peek?.(),sessions=state?.sessions||[];
  const open=sessions.filter(s=>s.status==='em_andamento'&&catalog.some(u=>u.id===s.deviceId));
  const session=open.find(s=>s.id===state.activeId)||open.slice().sort((a,b)=>String(b.updatedAt).localeCompare(String(a.updatedAt)))[0];
  if(session){const unit=catalog.find(u=>u.id===session.deviceId);return {kind:'session',sessionId:session.id,deviceId:session.deviceId,title:unit.law+' · '+unit.article,discipline:unit.topic,activity:stages[session.stage]||'Estudo integrado',reason:'Sessão em andamento · retome a etapa salva',minutes:null}}
  const week=root.AGUPlanner?.current?.();
  const task=week?root.AGUPlanner.next(week):null;
  if(task)return route(task.topic,task.type,{reason:'Próxima tarefa do plano semanal · '+task.date,minutes:task.minutes});
  if((root.AGUReview?.summary?.().due||0)>0)return {kind:'review',title:'Recuperação ativa',activity:'Revisões pendentes',reason:'Agenda original de revisão',minutes:null};
  if(ctx.legacyDue>0)return route(ctx.recommended,'questoes',{reason:'Revisão prioritária do treino autoral',minutes:null});
 }
 return route(ctx.recommended||'ADM/Atos administrativos','aula',{reason:ctx.demo?'Exemplo com dados fictícios':'Sugestão inicial · sem atividade concluída presumida',minutes:null},ctx.demo);
}
function route(topic,type,details,demo=false){
 const ctx=context(),disc=(ctx.disciplines||[]).find(d=>d[0]===String(topic).split('/')[0]);
 const base={title:String(topic).split('/').slice(1).join('/')||topic,discipline:disc?.[1]||String(topic).split('/')[0],topic,...details};
 if(demo)return {...base,kind:'quiz',activity:'Treino autoral de demonstração'};
 if(type==='revisao')return {...base,kind:'review',activity:'Recuperação ativa · acervo disponível',reason:details.reason+' · seleção de cartões pelo motor de revisão'};
 const entry=entries[topic],unit=units().find(u=>u.id===entry);
 if(type==='aula'&&unit)return {...base,kind:'lesson',deviceId:unit.id,activity:'Leitura e estudo integrado · '+unit.law+' · '+unit.article};
 if(ctx.practiceTopics?.includes(topic))return {...base,kind:'quiz',activity:'Treino autoral disponível',reason:details.reason+(type==='aula'?' · aula dialogada ainda não integrada':'')};
 return {...base,kind:'planner',activity:'Consultar roteiro no Plano',reason:details.reason+' · material deste tópico ainda não integrado'};
}
function focusTitle(){const title=root.document?.querySelector('#main h1');if(title){title.tabIndex=-1;title.focus({preventScroll:false})}}
function continueStudy(){
 const item=next();
 try{
  if(item.kind==='session'||item.kind==='lesson'){
   if(item.kind==='session'?!root.AGUStudy?.resume(item.sessionId):!root.AGUStudy?.start(item.deviceId))throw Error('Sessão indisponível. Abra a Biblioteca para consultar o material.');
   root.setView('legal');root.AGULegal.unit(item.deviceId);root.AGULegal.tab('estudo');
  }else if(item.kind==='review'){root.setView('review');root.AGUReview.go('auto')}
  else if(item.kind==='quiz')root.startQuiz(item.topic);
  else root.setView('planner');
  focusTitle();
 }catch(e){root.alert('Não foi possível continuar: '+e.message+' Preserve seu histórico e consulte Dados e backup.');}
}
function panel(){
 const item=next(),ctx=context(),review=ctx.demo?{}:root.AGUReview?.summary?.()||{};
 const attempts=ctx.demo?[]:root.AGUReview?.attemptsInfo?.()||[];
 const notes=ctx.demo?[]:root.AGUCaderno?.peek?.().records||[];
 const time=Number(ctx.weekMinutes)||0;
 const minutes=Number.isInteger(item.minutes)?item.minutes+' min previstos no plano':'Tempo livre · duração não estimada';
 return '<section class="daily-mission" aria-labelledby="today-title"><div><span class="muted">'+(ctx.demo?'MISSÃO SIMULADA':'MEU ESTUDO DE HOJE')+'</span><h2 id="today-title">'+esc(item.title)+'</h2>'+
 (item.discipline?'<p class="today-discipline">'+esc(item.discipline)+'</p>':'')+'<p>'+esc(item.activity)+'</p><p class="today-detail">'+esc(item.reason)+'<br>'+esc(minutes)+'</p></div>'+
 '<button id="continue-study" class="primary" onclick="AGUHome.continueStudy()">Continuar estudando</button></section>'+
 '<div class="today-summary" aria-label="Atividade registrada neste navegador"><p><b>'+Number(review.due||0)+'</b> revisões pendentes no motor de revisão</p><p><b>'+Number(ctx.legacyDue||0)+'</b> revisões do treino autoral</p><p><b>'+time+'</b> min confirmados nesta semana</p></div>'+
 '<div class="btnrow today-links"><button class="secondary" onclick="setView(\'review\')">Abrir revisões</button><button class="secondary" onclick="setView(\'legal\')">'+(ctx.readerSaved&&!ctx.demo?'Retomar ponto salvo no leitor':'Consultar fontes jurídicas')+'</button><button class="secondary" onclick="setView(\'planner\')">Ver meu plano</button></div>'+
 '<p class="small muted">'+(ctx.demo?'Simulação isolada do histórico real.':attempts.length+' avaliações no motor de revisão · '+notes.length+' notas contextuais. Atividade registrada não equivale a domínio ou certificação jurídica.')+'</p>';
}
root.AGUHome={panel,next,continueStudy};
})(window);
