/* S33: falhas reais de foco reproduzidas no Chrome público antes do patch.
 * VM sintética; nunca lê notas reais, respostas pessoais ou matriz privada.
 */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..'),saved=new Map(),body={tagName:'BODY',id:'body'};
const fields={
 'ctx-title':{value:'Hipótese sintética S33'},'ctx-content':{value:'Registro artificial de teclado.'},
 'ctx-source':{value:''},'ctx-type':{value:'hipotese'},'ctx-stage':{value:'problematizacao'},
 ...Object.fromEntries(Array.from({length:7},(_,i)=>['planner-min-'+i,{value:i===6?'0':'130'}]))
};
const document={activeElement:body,getElementById:id=>fields[id]||null,
 querySelector:selector=>({id:selector,tagName:'BUTTON',focus(options){document.activeElement=this;this.options=options}}),
 querySelectorAll:()=>[]};
const env={window:null,document,localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,String(v))},
 crypto:{randomUUID:()=>String(Date.now())+'-s33'},alert:()=>{},confirm:()=>true,
 AGUPlannerContext:()=>({disciplines:[['ADM','Direito Administrativo',['Atos administrativos','Processo administrativo']]],sessions:[],answers:[],reviews:[],notebook:[],topic:{}}),
 render(){document.activeElement=body}};
env.window=env;vm.createContext(env);
for(const file of ['dados/legislacao-s13.js','revisao-inteligente.js','caderno-contextual.js','estudo-integrado.js','planejamento-semanal.js'])
 vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),env,{filename:file});
const device='L9784:art13:I',cases=[];
function check(name,expected,action){document.activeElement={id:'before-'+name};action();cases.push({name,expected,observed:document.activeElement?.id||'body'});}
check('caderno_salvar','#agu-reader .agu-ctx-box button.agu-primary',()=>env.AGUCaderno.submit(device,true));
assert.equal(env.AGUCaderno.list(device).length,1,'nota sintética única');
check('caderno_filtro','#ctx-filter-type',()=>env.AGUCaderno.filter('type','hipotese',true));
check('estudo_iniciar','[data-agu-study-stage="norma"]',()=>env.AGUStudy.begin(device,true));
check('estudo_etapa','[data-agu-study-stage="caderno"]',()=>env.AGUStudy.goto('caderno',true));
check('revisao_selecionar','button[onclick^="AGUReview.go(\'flashcard\'"]',()=>env.AGUReview.go('flashcard',true));
check('revisao_revelar','button[onclick^="AGUReview.rate(\'errei\'"]',()=>env.AGUReview.reveal(true));
check('revisao_avaliar','button[onclick^="AGUReview.reveal("]',()=>env.AGUReview.rate('lembrei',true));
assert.equal(env.AGUReview.attemptsInfo().length,1,'exatamente uma tentativa sintética');
env.AGUPlanner.ensure();
check('plano_disponibilidade','button[onclick^="AGUPlanner.applyHours("]',()=>env.AGUPlanner.applyHours(true));
const task=env.AGUPlanner.current().days[0].tasks[0];
check('plano_materia','[data-planner-task="'+task.id+'"][data-planner-field="topic"]',()=>env.AGUPlanner.edit(0,task.id,'topic','ADM/Processo administrativo',true));
assert.equal(env.AGUPlanner.current().days[0].tasks[0].topic,'ADM/Processo administrativo','plano editado apenas na categoria pretendida');
const failures=cases.filter(x=>x.expected!==x.observed);
console.log('S33_FOCO_NODE',JSON.stringify({cases,failures,notes:env.AGUCaderno.list(device).length,attempts:env.AGUReview.attemptsInfo().length}));
assert.deepEqual(failures,[],'restauração do foco nas renderizações pontuais reproduzidas');
