/* S35 — cenários estritamente sintéticos de foco após controles secundários.
 * A VM não substitui o ensaio humano nem o navegador real.
 */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..'),saved=new Map(),body={tagName:'BODY',id:'BODY'};
const fields={
 'ctx-title':{value:'Nota artificial para excluir S35'},'ctx-content':{value:'Conteúdo apenas sintético.'},
 'ctx-source':{value:''},'ctx-type':{value:'hipotese'},'ctx-stage':{value:'problematizacao'},
 'ctx-legacy':{value:'legacy-s35'},
 ...Object.fromEntries(Array.from({length:7},(_,i)=>['planner-min-'+i,{value:i===6?'0':'130'}]))
};
const document={activeElement:body,getElementById:id=>fields[id]||null,
 querySelector:selector=>({id:selector,tagName:'BUTTON',focus(options){document.activeElement=this;this.options=options}}),
 querySelectorAll:()=>[]};
const env={window:null,document,localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,String(v))},
 crypto:{randomUUID:()=>String(Date.now())+'-s35'},alert:()=>{},confirm:()=>true,
 AGUPlannerContext:()=>({disciplines:[['ADM','Direito Administrativo',['Atos administrativos','Processo administrativo']]],sessions:[],answers:[],reviews:[],notebook:[],topic:{}}),
 render(){document.activeElement=body}};
env.window=env;vm.createContext(env);
for(const file of ['dados/questoes-auditadas-s18.js','dados/questoes-auditadas-s19.js','dados/legislacao-s13.js','revisao-inteligente.js','caderno-contextual.js','estudo-integrado.js','planejamento-semanal.js'])
 vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),env,{filename:file});
const device='L9784:art13:I',other='L9784:art13:II',cases=[];
function check(name,expected,action){document.activeElement={id:'antes-'+name};action();cases.push({name,expected,observed:document.activeElement?.id||'BODY'});}
env.AGUCaderno.submit(device);
const note=env.AGUCaderno.list(device)[0];
check('caderno_excluir_sintetico','#agu-reader .agu-ctx-box button.agu-primary',()=>env.AGUCaderno.askDelete(note.id,true));
assert.equal(env.AGUCaderno.list(device).length,0,'somente nota sintética excluída');
saved.set('agu_quiz_mvp1_2026',JSON.stringify({notebook:[{id:'legacy-s35',topic:'ADM/06',title:'Legado artificial',hypothesis:'Exemplo fictício'}]}));
check('caderno_vincular_legado','[data-ctx-record-id="aguc-TEST-LEGACY"]',()=>{
 env.AGUCaderno.attachLegacy(device,true);
 // ID real será testado logo abaixo: o seletor deve apontar o novo registro.
});
const linked=env.AGUCaderno.list(device)[0];
assert.equal(linked?.legacyId,'legacy-s35');
cases[cases.length-1].expected='[data-ctx-record-id="'+linked.id+'"]';
assert.equal(env.AGUCaderno.legacyRecords().length,1,'origem legada intacta');

env.AGUStudy.start(device);
const first=env.AGUStudy.active();
env.AGUStudy.start(other);
check('estudo_retomar_sessao','[data-agu-study-stage="norma"]',()=>env.AGUStudy.open(first.id,true));
env.AGUStudy.stage('caderno');
check('estudo_vincular_registros','button[onclick^="AGUStudy.collect("]',()=>env.AGUStudy.collect(true));
assert.equal(env.AGUStudy.active().notes.length,1,'uma nota associada sem duplicação');
env.AGUStudy.syncNotes();
assert.equal(env.AGUStudy.active().notes.length,1,'vinculação idempotente');
env.AGUStudy.stage('flashcards');
const card=env.AGUReview.availableForTopic(env.AGUStudy.active().topic)[0];
assert.ok(card,'cartão existente no tópico');
check('estudo_escolher_cartao','button[onclick^="AGUReview.reveal("]',()=>env.AGUStudy.pick(card.id,true));
assert.equal(env.AGUReview.attemptsInfo().length,0,'abrir cartão não avalia');

env.AGUReview.go('official');
check('revisao_alternativa_auditada','button.option.selected',()=>env.AGUReview.answer('E',true));
assert.equal(env.AGUReview.attemptsInfo().length,0,'escolher alternativa não registra tentativa');

const week=env.AGUPlanner.ensure(),moveTask=week.days[0].tasks[1];
check('plano_conflito_sem_deslocamento','[data-planner-task="'+moveTask.id+'"][data-planner-field="done"]',()=>env.AGUPlanner.shift(0,moveTask.id,1,true));
assert.ok(week.days[0].tasks.some(t=>t.id===moveTask.id),'tarefa preservada em conflito');
week.days[1].minutes+=moveTask.minutes;
check('plano_deslocamento_sintetico','[data-planner-task="'+moveTask.id+'"][data-planner-field="done"]',()=>env.AGUPlanner.shift(0,moveTask.id,1,true));
assert.ok(week.days[1].tasks.some(t=>t.id===moveTask.id),'movida para dia de capacidade suficiente');
check('plano_regeneracao_confirmada','button[onclick^="AGUPlanner.regenerate("]',()=>env.AGUPlanner.regenerate(true));
assert.equal(env.AGUPlanner.current().days[1].tasks.some(t=>t.id===moveTask.id),false,'nova semana reposiciona apenas tarefa de plano artificial');
assert.equal(env.AGUReview.attemptsInfo().length,0,'nenhuma tentativa fantasma');
const failures=cases.filter(x=>x.expected!==x.observed);
console.log('S35_FOCO_NODE',JSON.stringify({cases,failures,records:env.AGUCaderno.list(device).length,linked:linked.legacyId,attempts:env.AGUReview.attemptsInfo().length}));
assert.deepEqual(failures,[],'foco nos controles secundários específicos S35');
