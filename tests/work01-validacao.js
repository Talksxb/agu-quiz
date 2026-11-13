/* Integração real dos motores em VM/DOM mínimo; não equivale a navegador. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(ROOT,p),'utf8'),html=read('index.html');
const files=[...html.matchAll(/<script\s+src="([^"]+)"/g)].map(x=>x[1].split('?')[0]);
function boot(saved=new Map()){
 const fields={'#main':{innerHTML:'',contains:()=>false},'#main h1':{focus(){},tabIndex:0}};
 const document={activeElement:{},head:{appendChild(){}},createElement:()=>({style:{}}),getElementById:()=>null,querySelector:s=>fields[s]||null,querySelectorAll:()=>[],addEventListener(){}};
 const env={document,console,Date,Math,Blob,TextEncoder,URLSearchParams,crypto:require('node:crypto').webcrypto,location:{search:''},HTMLElement:function(){},setTimeout(){},setInterval(){},alert(){},confirm:()=>true,
  localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,String(v)),removeItem:k=>saved.delete(k)}};
 env.window=env;vm.createContext(env);
 for(const f of files)vm.runInContext(read(f),env,{filename:f});
 for(const m of html.matchAll(/<script>([\s\S]*?)<\/script>/g))vm.runInContext(m[1],env,{filename:'index-inline'});
 return {env,saved,main:fields['#main']};
}
let n=0;const check=(name,f)=>{f();n++;console.log('OK WORK01',name)};
const {env:e,saved,main}=boot();
check('entrada direta no estudo integrado disponível',()=>assert.equal(e.AGUHome.next().kind,'lesson'));
check('home não cria planejamento, respostas, horas nem sessão',()=>{const before=JSON.stringify([...saved]);for(let i=0;i<3;i++)e.AGUHome.panel();assert.equal(JSON.stringify([...saved]),before);assert.equal(saved.size,0)});
check('ação começa sessão no motor original e no dispositivo exato',()=>{e.AGUHome.continueStudy();assert.equal(e.AGUStudy.active().deviceId,'L9784:art11:caput');assert.equal(e.AGULegal.peek().tab,'estudo');assert.equal(e.AGULegal.peek().mobile,'related');assert.equal(e.AGUReview.attemptsInfo().length,0)});
e.AGUStudy.stage('caderno');const sessionId=e.AGUStudy.active().id;
const {env:reloaded}=boot(saved);
check('reload retoma etapa e ID sem duplicar sessão',()=>{assert.equal(reloaded.AGUHome.next().sessionId,sessionId);assert.equal(reloaded.AGUHome.next().activity,'Caderno AGU');reloaded.AGUHome.continueStudy();assert.equal(reloaded.AGUStudy.active().stage,'caderno');assert.equal(reloaded.AGUStudy.peek().sessions.length,1)});
check('simulação não expõe nem grava nos motores reais',()=>{const before=JSON.stringify([...saved]);reloaded.switchDemo();assert.equal(reloaded.AGUHome.next().kind,'quiz');assert.ok(!reloaded.AGUHome.panel().includes(sessionId));reloaded.AGUHome.continueStudy();assert.equal(JSON.stringify([...saved]),before)});
const {env:p,saved:ps}=boot();p.AGUPlanner.create();const task=p.AGUPlanner.next(p.AGUPlanner.current());
check('mesma próxima tarefa e minutos do planejador existente',()=>{const home=p.AGUHome.next();assert.equal(home.topic,task.topic);assert.equal(home.minutes,task.minutes);assert.ok(home.reason.includes(task.date))});
check('consultar missão não altera plano manual',()=>{const before=ps.get('agu_quiz_planejamento_semanal_v1');p.AGUHome.panel();assert.equal(ps.get('agu_quiz_planejamento_semanal_v1'),before)});
check('tópico sem material tem fallback explícito, sem quiz vazio',()=>{const day=p.AGUPlanner.current().days.findIndex(d=>d.tasks.some(t=>t.id===task.id));p.AGUPlanner.change(day,task.id,'topic','INT/Tratados');assert.equal(p.AGUHome.next().kind,'planner');assert.ok(p.AGUHome.panel().includes('material deste tópico ainda não integrado'));p.AGUHome.continueStudy();assert.equal(p.AGUReview.attemptsInfo().length,0)});
const {env:r}=boot();r.AGUReview.focusCard('ri-adm-01');r.AGUReview.reveal();r.AGUReview.rate('errei');
check('revisão usa agenda e tentativas originais',()=>{const a=r.AGUReview.attemptsInfo()[0];const raw=JSON.parse(r.localStorage.getItem('agu_quiz_revisao_inteligente_v1'));raw.cards[a.itemId].due='2000-01-01';r.localStorage.setItem('agu_quiz_revisao_inteligente_v1',JSON.stringify(raw));const {env:due}=boot(new Map([['agu_quiz_revisao_inteligente_v1',JSON.stringify(raw)]]));assert.equal(due.AGUHome.next().kind,'review');due.AGUHome.continueStudy();assert.equal(due.AGUReview.attemptsInfo().length,1)});
check('interface traz fonte, retomada e backup preservado',()=>{assert.ok(main.innerHTML.includes('agu-reader'));assert.ok(html.includes('backup-local-s20.js?v=20261113-s27a'));assert.ok(html.includes('leitor-juridico.js?v=20261113-s32a'))});
check('storage indisponível não impede apresentação da home',()=>{const original=e.localStorage.getItem;e.localStorage.getItem=()=>{throw Error('SecurityError')};assert.ok(e.AGUHome.panel().includes('Continuar estudando'));e.localStorage.getItem=original});
check('meta exibida respeita disponibilidade configurada',()=>{e.AGUPlanner.settings().dailyMinutes=[30,30,30,30,30,0,0];e.setView('dashboard');assert.ok(main.innerHTML.includes('Meta configurada: 2h 30m'))});
check('resumo de atividade tem região nomeada acessível',()=>assert.ok(e.AGUHome.panel().includes('class="today-summary" role="region" aria-label=')));
check('abrir versão atualizada preserva bytes do histórico preexistente',()=>{const copy=new Map(saved),before=JSON.stringify([...copy]);const upgraded=boot(copy);upgraded.env.setView('dashboard');assert.equal(JSON.stringify([...copy]),before)});
console.log('WORK01_VALIDACAO_OK',n);
