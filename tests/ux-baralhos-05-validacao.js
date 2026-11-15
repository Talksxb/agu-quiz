/* UX05 — regressões adversariais sintéticas; nenhuma escrita em perfil pessoal. */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const crypto=require('node:crypto');
const ROOT=path.resolve(__dirname,'..');
const read=p=>fs.readFileSync(path.join(ROOT,p),'utf8');
const copy=x=>JSON.parse(JSON.stringify(x));
const REVIEW='agu_quiz_revisao_inteligente_v1';
const READER='agu_leitor_juridico_s13_v1';
const PLAN='agu_quiz_planejamento_semanal_v1';
const files=['catalogo-disciplinas.js','dados/flashcards-aud03-lote01.js','dados/questoes-auditadas-s18.js',
 'dados/questoes-auditadas-s19.js','dados/legislacao-s13.js','revisao-inteligente.js','planejamento-semanal.js',
 'estudo-integrado.js','leitor-consolidacao.js','leitor-juridico.js','questoes-leitor-s18.js',
 'backup-local-s20.js','meu-estudo.js'];
function boot(seed={}){
 const data=new Map(Object.entries(seed).map(([k,v])=>[k,typeof v==='string'?v:JSON.stringify(v)]));
 const alerts=[];let writes=0;
 const w={Date,Math,Blob,URL,URLSearchParams,crypto:crypto.webcrypto,console,alert:m=>alerts.push(m),confirm:()=>true,
  location:{pathname:'/agu-quiz/',search:''},history:{replaceState(){}},
  document:{head:{appendChild(){}},createElement:()=>({}),querySelector:()=>null,getElementById:()=>null},
  localStorage:{getItem:k=>data.get(k)??null,setItem:(k,v)=>{writes++;data.set(k,String(v))},removeItem:k=>data.delete(k)},render(){},
  FileReader:class {readAsText(file){this.result=file.content;this.onload()}}};
 w.window=w;vm.createContext(w);
 for(const file of files)vm.runInContext(read(file),w,{filename:file});
 return {w,data,alerts,writes:()=>writes};
}
const attempt=(n,id='ri-con-01')=>({id:'rv-ux05-'+n,itemId:id,kind:'flashcard',code:'CON-02',
 at:'2026-11-10T10:00:00.000Z',rating:'dificil',selected:null,correct:null,
 sourceStatus:'B_pendente_revisao_independente',due:'2026-11-11',stage:0,origin:'flashcard_autoral'});
const mark=(origin,id,extra)=>({id:'pc-ux05-'+id,lawId:null,articleId:null,unitId:null,origin,
 prompt:'Pergunta breve sintética '+id,createdAt:'2026-11-14T20:00:00.000Z',status:'pendente',...extra});
const marks=[
 {...mark('leitor','reader0001',{lawId:'L4717',articleId:'L4717:art2',unitId:'L4717:art2:pu:e',topic:null})},
 mark('estudo_integrado','study0001',{deviceId:'L9784:art12:caput',sessionId:'ags-ux05-001',topic:'ADM-06'}),
 mark('questao_verificada','quest0001',{questionId:'of-2015-adv-006',questionLabel:'AGU 2015 · Q6 · 187AGU_001_07',topic:'ADM-17'}),
 mark('flashcard_existente','flash0001',{cardId:'ri-con-01',cardLabel:'Flashcard ri-con-01 · CON-02',topic:null})
];
const reader={article:'L4717:art2',unit:'L4717:art2:pu:e',tab:'juris',mobile:'text',notes:{},forNotebook:marks};
let tests=0;
function check(name,fn){fn();tests++;console.log('OK UX05',name)}
check('acervo real, níveis originais e nove categorias não se alteraram',()=>{
 const {w}=boot(),decks=w.AGUReview.deckList();
 assert.deepEqual(copy(decks.map(x=>[x.code,x.count])),[['ADM-06',12],['ADM-13',4],['ADM-23',4],['CON-02',2],['CON-50',4],['PC-03',10]]);
 assert.deepEqual(copy(decks.reduce((p,d)=>{for(const [level,count] of Object.entries(d.difficulties))p[level]=(p[level]||0)+count;return p},{})),
  {'sem_nivel':22,'original:2':7,'original:3':6,'original:4':1});
 assert.equal(w.AGUBackup20.keys().length,9);
 assert.equal(w.AGUDisciplines.verifiedFrequency(null,'ADM-06'),null);
 assert.match(read('revisao-inteligente.js'),/const DAYS=\[1,7,21,45\]/);
});
check('histórico longo importado sem agenda só altera índice de leitura',()=>{
 const attempts=Array.from({length:1900},(_,i)=>attempt('long'+String(i).padStart(5,'0')));
 const original={schema:'agu-review-v1',cards:{},attempts,created:'2026-11-10T10:00:00Z'};
 const {w,data,writes}=boot({[REVIEW]:original}),raw=data.get(REVIEW);
 assert.equal(w.AGUReview.deckList().find(x=>x.code==='CON-02').noDate,1);
 assert.equal(w.AGUReview.deckList().find(x=>x.code==='CON-02').new,1);
 assert.equal(w.AGUReview.attemptsInfo().length,1900);
 assert.equal(w.AGUReview.reviewInfo('ri-con-01').seen,0);
 assert.equal(w.AGUReview.reviewInfo('ri-con-01').due,null);
 w.AGUReview.deckFilter('status','sem_data');w.AGUReview.page();
 assert.equal(data.get(REVIEW),raw);assert.equal(writes(),0);
 assert.match(w.AGUReview.page(),/não há equivalência validada/);
});
check('importação parcial usa 3 MB, é idempotente e não substitui due/seen/stage',()=>{
 const old={schema:'agu-review-v1',cards:{'ri-con-01':{seen:4,due:'2099-03-21',stage:3,ease:'facil'}},attempts:[],created:'2026-11-10T10:00:00Z'};
 const {w,data,alerts}=boot({[REVIEW]:old}),before=data.get(REVIEW);
 w.AGUReview.importBackup({files:[{size:3000001,content:''}]});
 assert.equal(data.get(REVIEW),before);assert.match(alerts[0],/3 MB/);
 const incoming={schema:'agu-review-backup-v1',data:{schema:'agu-review-v1',cards:{'ri-con-01':{seen:99,due:'2000-01-01',stage:0}},attempts:[attempt('import0001')]}};
 const content=JSON.stringify(incoming);
 w.AGUReview.importBackup({files:[{size:Buffer.byteLength(content),content}]});
 assert.equal(w.AGUReview.attemptsInfo().length,1);
 assert.deepEqual(copy(w.AGUReview.reviewInfo('ri-con-01')),
  {itemId:'ri-con-01',code:'CON-02',kind:'flashcard',seen:4,due:'2099-03-21',rating:'facil'});
 w.AGUReview.importBackup({files:[{size:Buffer.byteLength(content),content}]});
 assert.equal(w.AGUReview.attemptsInfo().length,1);
 assert.equal(JSON.parse(data.get(REVIEW)).cards['ri-con-01'].stage,3);
});
check('seleção de um, pausa, troca consciente, repetição e avaliação única',()=>{
 const {w,data}=boot({[REVIEW]:{schema:'agu-review-v1',cards:{},attempts:[attempt('seed0001')]}});
 w.AGUReview.deckFilter('status','sem_data');assert.equal(w.AGUReview.deckStart('CON-02'),true);
 assert.deepEqual(copy(w.AGUReview.deckSession().order),['ri-con-01']);
 assert.equal(w.AGUReview.deckPause(),true);
 w.AGUReview.deckFilter('status','ineditos');assert.equal(w.AGUReview.deckStart('CON-02'),true);
 assert.match(w.AGUReview.page(),/Escolha como continuar/);
 assert.equal(w.AGUReview.deckDecide('novo'),true);
 assert.deepEqual(copy(w.AGUReview.deckSession().order),['ri-con-02']);
 const oldCount=w.AGUReview.attemptsInfo().length;
 w.AGUReview.reveal();assert.equal(w.AGUReview.attemptsInfo().length,oldCount);
 assert.equal(w.AGUReview.rate('facil'),true);assert.equal(w.AGUReview.attemptsInfo().length,oldCount+1);
 assert.notEqual(w.AGUReview.rate('errei'),true);assert.equal(w.AGUReview.attemptsInfo().length,oldCount+1);
 assert.equal(w.AGUReview.deckRepeat(),true);w.AGUReview.reveal();assert.equal(w.AGUReview.rate('lembrei'),true);
 assert.equal(w.AGUReview.attemptsInfo().length,oldCount+2);
 const persisted=data.get(REVIEW),after=boot({[REVIEW]:persisted});
 assert.equal(after.w.AGUReview.attemptsInfo().length,oldCount+2);
 assert.equal(after.w.AGUReview.reviewInfo('ri-con-01').seen,0,'tentativa prévia sem agenda continua sem agenda');
});
check('LEG11 + LEG12 mantêm quatro origens na única lista e S20 restaura apenas ausências',()=>{
 const {w,data}=boot({[READER]:reader}),before=data.get(READER);
 assert.equal(w.AGUBackup20.validateRecord(READER,reader),true);
 assert.equal(w.AGUHome.notebookPending(),4);
 assert.match(w.AGUHome.panel(),/4 marcações pendentes/);
 assert.equal(data.get(READER),before,'consulta Home não edita nota');
 const bundle=w.AGUBackup20.capture();
 const target=boot({[READER]:{...reader,forNotebook:marks.slice(0,1)}});
 assert.equal(target.w.AGUBackup20.importMissing(bundle).added,0);
 assert.equal(copy(JSON.parse(target.data.get(READER))).forNotebook.length,1,'não substitui categoria existente');
 const empty=boot();assert.equal(empty.w.AGUBackup20.importMissing(bundle).added,1);
 assert.equal(empty.w.AGUBackup20.importMissing(bundle).added,0);
 assert.deepEqual(copy(JSON.parse(empty.data.get(READER)).forNotebook),marks);
 assert.equal(boot({[READER]:empty.data.get(READER)}).w.AGUHome.notebookPending(),4);
});
check('tarefa pública ampla não é código de baralho; inspeção não escreve minutos ou agenda',()=>{
 const {w,data,writes}=boot();
 w.AGUPlannerContext=()=>({disciplines:[['ADM','Direito Administrativo',['Atos administrativos']],
 ['CON','Direito Constitucional',['Funções essenciais à Justiça']]],sessions:[],answers:[],reviews:[],notebook:[],topic:{}});
 const generated=w.AGUPlanner.generate();
 assert.ok(generated.days.flatMap(d=>d.tasks).every(task=>w.AGUReview.exactDeck(task.topic)===null));
 assert.deepEqual(copy(w.AGUReview.exactDeck('ADM-06')),{code:'ADM-06',discipline:'ADM',count:12});
 assert.equal(w.AGUReview.exactDeck('ADM/Atos administrativos'),null);
 assert.equal(w.AGUReview.exactDeck('CON/Funções essenciais à Justiça'),null);
 assert.equal(data.has(PLAN),false);assert.equal(writes(),0);
});
console.log('UX_BARALHOS_05_VALIDACAO_OK',JSON.stringify({tests,cardCount:36,decks:6,backupCategories:9}));
