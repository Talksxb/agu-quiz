/* UX-BARALHOS-02 — avaliações e seleção com dados 100% sintéticos. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const ROOT=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(ROOT,f),'utf8');
const sha=f=>crypto.createHash('sha256').update(read(f)).digest('hex');
const copy=x=>JSON.parse(JSON.stringify(x));
const KEY='agu_quiz_revisao_inteligente_v1';
const pad=n=>String(n).padStart(2,'0');
const day=offset=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+offset);return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())};
function boot(records={},single=false){
 const saved=new Map(Object.entries(records).map(([k,v])=>[k,typeof v==='string'?v:JSON.stringify(v)]));
 const alerts=[];
 const root={window:null,crypto:crypto.webcrypto,Date,Math,Blob,URL,URLSearchParams,console,
  history:{replaceState(){}},location:{pathname:'/agu-quiz/',search:''},
  document:{querySelector(){return null},getElementById(){return null},head:{appendChild(){}},createElement(){return {}}},
  localStorage:{getItem:k=>saved.get(k)??null,setItem:(k,v)=>saved.set(k,String(v)),removeItem:k=>saved.delete(k)},
  alert:m=>alerts.push(m),confirm:()=>{throw Error('A seleção UX02 não deve usar confirmação nativa')},render(){}};
 root.window=root;vm.createContext(root);
 for(const file of ['catalogo-disciplinas.js','dados/flashcards-aud03-lote01.js','dados/questoes-auditadas-s18.js','dados/questoes-auditadas-s19.js','dados/legislacao-s13.js','revisao-inteligente.js','planejamento-semanal.js','estudo-integrado.js','leitor-consolidacao.js','leitor-juridico.js','backup-local-s20.js']){
  let source=read(file);
  if(single&&file==='revisao-inteligente.js')source=source.replace('const ALL=[...CARDS,...AUD03_CARDS,...OFFICIAL,...S18_ITEMS];',"const ALL=[...CARDS,...AUD03_CARDS,...OFFICIAL,...S18_ITEMS].filter(x=>x.kind!=='flashcard'||x.id==='ri-adm-01');");
  vm.runInContext(source,root,{filename:file});
 }
 return {root,saved,alerts};
}
function seed(){return {schema:'agu-review-v1',attempts:[],cards:{
 'ri-con-01':{stage:1,seen:2,due:day(-1),errors:0,ease:'lembrei'},
 'ri-con-02':{stage:1,seen:1,due:day(0),errors:0,ease:'dificil'},
 'ri-adm-01':{stage:1,seen:1,due:day(1),errors:0,ease:'facil'},
 'ri-adm-02':{stage:0,seen:1,due:null,errors:1,ease:'errei'}},created:new Date().toISOString()}}
let checks=0;function check(name,fn){fn();checks++;console.log('OK UX02',name)}

check('inventário público imutável: 36 cartões em 6 baralhos e 14 disciplinas',()=>{
 const {root}=boot(),decks=root.AGUReview.deckList();
 assert.deepEqual(copy(decks.map(x=>[x.code,x.count])),[['ADM-06',12],['ADM-13',4],['ADM-23',4],['CON-02',2],['CON-50',4],['PC-03',10]]);
 assert.equal(new Set(decks.flatMap(d=>d.cards.map(c=>c.id))).size,36);
 assert.equal(root.AGUDisciplines.list().length,14);
 assert.equal(decks.flatMap(d=>d.cards).every(x=>x.deviceId===undefined),true,'nenhum deviceId granular comprovado nos cartões');
});
check('inédito, vencido estrito, vence hoje, futuro e sem data são diferentes',()=>{
 const {root}=boot({[KEY]:seed()}),decks=root.AGUReview.deckList();
 const con=decks.find(d=>d.code==='CON-02'),adm=decks.find(d=>d.code==='ADM-06');
 assert.equal(con.overdue,1);assert.equal(con.todayDue,1);assert.equal(con.due,2);assert.equal(con.new,0);
 assert.equal(adm.future,1);assert.equal(adm.noDate,1);assert.equal(adm.new,10);
 assert.match(root.AGUReview.page(),/Vencidos: prazo anterior a hoje/);
 assert.match(root.AGUReview.page(),/Vence hoje|vencem hoje/);
});
check('filtros combinados selecionam cartões reais e esvaziam sem criar baralhos',()=>{
 const {root}=boot({[KEY]:seed()});
 root.AGUReview.deckFilter('discipline','CON');root.AGUReview.deckFilter('topic','CON-02');
 root.AGUReview.deckFilter('difficulty','sem_nivel');root.AGUReview.deckFilter('status','vencidos');
 assert.match(root.AGUReview.page(),/1 baralho · 1 cartão selecionável/);
 assert.equal(root.AGUReview.deckStart('CON-02'),true);
 assert.deepEqual(copy(root.AGUReview.deckSession().order),['ri-con-01']);
 root.AGUReview.deckPause();root.AGUReview.deckFilter('status','ineditos');
 assert.match(root.AGUReview.page(),/Nenhum cartão corresponde à combinação de filtros/);
 assert.match(root.AGUReview.page(),/Limpar filtros/);
 root.AGUReview.deckClearFilters();assert.match(root.AGUReview.page(),/6 baralhos · 36 cartões selecionáveis/);
});
check('filtro UX01 due continua como alias de pendentes; status distingue somente hoje',()=>{
 const {root}=boot({[KEY]:seed()});root.AGUReview.deckFilter('due',true);
 assert.match(root.AGUReview.page(),/1 baralho · 2 cartões selecionáveis/);
 root.AGUReview.deckFilter('status','hoje');root.AGUReview.deckStart('CON-02');
 assert.deepEqual(copy(root.AGUReview.deckSession().order),['ri-con-02']);
});
check('escolha continuar/cancelar/nova seleção não descarta avaliações antigas',()=>{
 const b=boot(),{root,saved}=b;
 assert.equal(root.AGUReview.deckStart('CON-02'),true);root.AGUReview.reveal();
 assert.equal(root.AGUReview.rate('lembrei'),true);root.AGUReview.deckPause();
 const previous=copy(JSON.parse(saved.get(KEY)));assert.equal(previous.attempts.length,1);
 root.AGUReview.deckFilter('status','ineditos');
 assert.equal(root.AGUReview.deckStart('CON-02'),true);
 assert.match(root.AGUReview.page(),/Escolha como continuar/);
 assert.equal(saved.get(KEY),JSON.stringify(previous),'abrir escolha não grava armazenamento');
 assert.equal(root.AGUReview.deckDecide('cancelar'),true);assert.deepEqual(copy(root.AGUReview.deckSession().order),previous.librarySession.order);
 root.AGUReview.deckStart('CON-02');assert.equal(root.AGUReview.deckDecide('continuar'),true);
 assert.equal(root.AGUReview.deckSession().index,1);root.AGUReview.deckPause();
 root.AGUReview.deckStart('CON-02');assert.equal(root.AGUReview.deckDecide('novo'),true);
 assert.deepEqual(copy(root.AGUReview.deckSession().order),['ri-con-02']);
 assert.equal(root.AGUReview.attemptsInfo().length,1,'tentativa anterior continua no histórico');
 assert.equal(root.AGUReview.reviewInfo('ri-con-01').seen,1);
 assert.equal(root.AGUReview.reviewInfo('ri-con-02').seen,0);
 root.AGUReview.reveal();root.AGUReview.rate('facil');
 assert.equal(root.AGUReview.deckSession().status,'concluida');
 assert.equal(root.AGUReview.attemptsInfo().length,2);
 assert.match(root.AGUReview.page(),/Distribuição das avaliações desta sessão/);
 assert.match(root.AGUReview.page(),/Fácil 1/);
 assert.deepEqual(b.alerts,[]);
});
check('troca de assunto requer escolha explícita e mantém a sessão anterior até confirmação',()=>{
 const {root,saved}=boot();root.AGUReview.deckStart('CON-02');root.AGUReview.deckPause();
 const before=saved.get(KEY);
 root.AGUReview.deckStart('ADM-13');assert.equal(saved.get(KEY),before);
 assert.match(root.AGUReview.page(),/Retomar sessão anterior/);
 root.AGUReview.deckDecide('novo');assert.equal(root.AGUReview.deckSession().code,'ADM-13');
 assert.equal(root.AGUReview.deckSession().order.length,4);
});
check('reestudar seleção concluída não depende de filtro atual nem duplica tentativa da sessão antiga',()=>{
 const {root}=boot();root.AGUReview.deckStart('CON-02');root.AGUReview.reveal();root.AGUReview.rate('errei');root.AGUReview.reveal();root.AGUReview.rate('dificil');
 assert.equal(root.AGUReview.deckSession().status,'concluida');const previousIds=copy(root.AGUReview.deckSession().order);
 root.AGUReview.deckFilter('status','ineditos');
 assert.equal(root.AGUReview.deckRepeat(),true);assert.deepEqual(copy(root.AGUReview.deckSession().order),previousIds);
 assert.equal(Object.keys(root.AGUReview.deckSession().ratings).length,0);
 assert.equal(root.AGUReview.attemptsInfo().length,2);
});
check('reload, avaliação única e backup S20 mantêm a categoria e o agendamento',()=>{
 const old=seed(),b=boot({[KEY]:old});
 b.root.AGUReview.deckFilter('status','vencidos');b.root.AGUReview.deckStart('CON-02');
 b.root.AGUReview.reveal();b.root.AGUReview.rate('dificil');
 const snapshot=copy(JSON.parse(b.saved.get(KEY)));
 assert.equal(snapshot.librarySession.status,'concluida');
 assert.equal(snapshot.attempts.length,1);assert.equal(snapshot.cards['ri-con-02'].due,day(0));
 const bundle=b.root.AGUBackup20.capture();assert.equal(b.root.AGUBackup20.keys().length,9);
 const restored=boot();assert.equal(restored.root.AGUBackup20.importMissing(bundle).added,1);
 assert.equal(restored.root.AGUBackup20.importMissing(bundle).added,0);
 const loaded=boot({[KEY]:restored.saved.get(KEY)});assert.equal(loaded.root.AGUReview.deckSession().status,'concluida');
 assert.equal(loaded.root.AGUReview.reviewInfo('ri-con-02').due,day(0));
 loaded.root.AGUReview.deckRepeat();loaded.root.AGUReview.reveal();loaded.root.AGUReview.rate('lembrei');
 assert.equal(loaded.root.AGUReview.attemptsInfo().length,2);
 loaded.root.AGUReview.rate('errei');assert.equal(loaded.root.AGUReview.attemptsInfo().length,2,'segunda tentativa mesma sessão é rejeitada');
});
check('importação parcial mescla tentativas, não muda sessão nem prazos',()=>{
 const source=boot();source.root.AGUReview.deckStart('CON-02');source.root.AGUReview.reveal();source.root.AGUReview.rate('lembrei');
 const raw=copy(JSON.parse(source.saved.get(KEY)));
 const dest=boot({[KEY]:seed()});dest.root.AGUReview.deckStart('ADM-06');
 const schedule=dest.root.AGUReview.reviewInfo('ri-con-01').due,session=copy(dest.root.AGUReview.deckSession());
 assert.equal(dest.root.AGUReview.mergeBackupObject({schema:'agu-review-backup-v1',data:raw}).added,1);
 assert.equal(dest.root.AGUReview.mergeBackupObject({schema:'agu-review-backup-v1',data:raw}).added,0);
 assert.equal(dest.root.AGUReview.reviewInfo('ri-con-01').due,schedule);
 assert.deepEqual(copy(dest.root.AGUReview.deckSession()),session);
});
check('baralho com um cartão conclui sem coleção artificial',()=>{
 const {root}=boot({},true);assert.equal(root.AGUReview.deckList().length,1);
 assert.equal(root.AGUReview.deckStart('ADM-06'),true);root.AGUReview.reveal();root.AGUReview.rate('errei');
 assert.equal(root.AGUReview.deckSession().status,'concluida');
 assert.match(root.AGUReview.page(),/1 de 1 cartões avaliados/);
});
check('cronograma e leitura não recebem vínculo curricular presumido',()=>{
 const f=JSON.parse(read('tests/fixtures/leg09-deltas.json'));
 assert.equal(sha('planejamento-semanal.js'),f.plannerSha256);
 assert.equal(sha('leitor-juridico.js'),f.readerAfterSha256);
 assert.equal(sha('estudo-integrado.js'),f.studyAfterSha256);
 assert.equal(sha('dados/legislacao-s13.js'),f.corpusSha256);
 const {root}=boot();root.AGUPlannerContext=()=>({disciplines:[['ADM','Direito Administrativo',['Atos administrativos']]],sessions:[],answers:[],reviews:[],notebook:[],topic:{}});
 const topic=root.AGUPlanner?.generate?.().days.flatMap(x=>x.tasks).find(x=>x.topic);
 assert.ok(topic?.topic.includes('/'),'plano conserva tópicos amplos ADM/..., não equivale ao ID granular ADM-06');
 assert.equal(root.AGUBackup20.keys().length,9);
});
console.log('UX_BARALHOS_02_VALIDACAO_OK',JSON.stringify({checks,flashcards:36,decks:6,storageCategories:9}));
