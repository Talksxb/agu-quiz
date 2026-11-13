/* S34: regressões sintéticas para falhas de foco reproduzidas no Chrome
 * público antes do patch (Editar/Cancelar, Encerrar, Estudar cartão, checkbox).
 * Não lê nem escreve histórico pessoal ou matriz privada.
 */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..'),saved=new Map(),body={tagName:'BODY',id:'body'};
const fields={
 'ctx-title':{value:'Nota sintética S34'},'ctx-content':{value:'Teste de foco sem dado pessoal.'},
 'ctx-source':{value:''},'ctx-type':{value:'hipotese'},'ctx-stage':{value:'problematizacao'},
 ...Object.fromEntries(Array.from({length:7},(_,i)=>['planner-min-'+i,{value:i===6?'0':'130'}]))
};
const document={activeElement:body,getElementById:id=>fields[id]||null,
 querySelector:selector=>({id:selector,tagName:'BUTTON',focus(options){document.activeElement=this;this.options=options}}),
 querySelectorAll:()=>[]};
const env={window:null,document,localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,String(v))},
 crypto:{randomUUID:()=>String(Date.now())+'-s34'},alert:()=>{},confirm:()=>true,
 AGUPlannerContext:()=>({disciplines:[['ADM','Direito Administrativo',['Atos administrativos','Processo administrativo']]],sessions:[],answers:[],reviews:[],notebook:[],topic:{}}),
 render(){document.activeElement=body}};
env.window=env;vm.createContext(env);
for(const file of ['dados/legislacao-s13.js','revisao-inteligente.js','caderno-contextual.js','estudo-integrado.js','planejamento-semanal.js'])
 vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),env,{filename:file});
const device='L9784:art13:I',cases=[];
function check(name,expected,action){document.activeElement={id:'before-'+name};action();cases.push({name,expected,observed:document.activeElement?.id||'body'});}
env.AGUCaderno.submit(device);
const note=env.AGUCaderno.list(device)[0];
assert.equal(env.AGUCaderno.list(device).length,1);
check('caderno_editar','#ctx-title',()=>env.AGUCaderno.startEdit(note.id,true));
check('caderno_cancelar','[data-ctx-record-id="'+note.id+'"]',()=>env.AGUCaderno.cancel(true));
env.AGUStudy.begin(device);
check('estudo_encerrar','button[onclick^="AGUStudy.begin("]',()=>env.AGUStudy.close(true));
assert.equal(env.AGUStudy.sessionsFor(device).filter(x=>x.status==='concluida').length,1);
const firstCard=env.AGUReview.page().match(/<option value="([^"]+)"/)[1];
check('revisao_catalogo','button[onclick^="AGUReview.reveal("]',()=>env.AGUReview.select(firstCard,true));
assert.equal(env.AGUReview.attemptsInfo().length,0,'selecionar cartão não é responder');
env.AGUPlanner.ensure();
const task=env.AGUPlanner.current().days[0].tasks[0];
check('plano_checkbox','[data-planner-task="'+task.id+'"][data-planner-field="done"]',()=>env.AGUPlanner.edit(0,task.id,'done',true,true));
assert.equal(env.AGUPlanner.current().days[0].tasks[0].done,true);
env.AGUPlanner.edit(0,task.id,'done',false,true);
assert.equal(env.AGUPlanner.current().days[0].tasks[0].done,false,'marcação revertida no teste isolado');
const failures=cases.filter(x=>x.expected!==x.observed);
console.log('S34_FOCO_NODE',JSON.stringify({cases,failures,notes:env.AGUCaderno.list(device).length,attempts:env.AGUReview.attemptsInfo().length,taskDone:task.done}));
assert.deepEqual(failures,[],'foco restaurado nos cinco controles reproduzidos');
