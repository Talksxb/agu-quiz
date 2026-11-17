/* UX03 — histórico efetivo versus agenda local e ponte curricular literal.
 * Todos os registros são sintéticos; nenhuma categoria pessoal é consultada. */
'use strict';
const afterUx=require('./hash-chain-ux-estudo-integrado.cjs');
const afterCodigos=require('./hash-chain-codigos.cjs');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const ROOT=path.resolve(__dirname,'..'),read=x=>fs.readFileSync(path.join(ROOT,x),'utf8');
const copy=x=>JSON.parse(JSON.stringify(x)),KEY='agu_quiz_revisao_inteligente_v1';
const pad=n=>String(n).padStart(2,'0');
const day=offset=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+offset);return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())};
const sourceFiles=['catalogo-disciplinas.js','dados/flashcards-aud03-lote01.js','dados/questoes-auditadas-s18.js','dados/questoes-auditadas-s19.js','dados/legislacao-s13.js','revisao-inteligente.js','planejamento-semanal.js','estudo-integrado.js','leitor-consolidacao.js','leitor-juridico.js','backup-local-s20.js'];
function boot(initial={}){
 const saved=new Map(Object.entries(initial).map(([k,v])=>[k,typeof v==='string'?v:JSON.stringify(v)]));
 const alerts=[];
 const z={window:null,crypto:crypto.webcrypto,Date,Math,Blob,URL,URLSearchParams,console,
  location:{pathname:'/agu-quiz/',search:''},history:{replaceState(){}},
  document:{querySelector(){return null},getElementById(){return null},head:{appendChild(){}},createElement(){return {}}},
  localStorage:{getItem:k=>saved.get(k)??null,setItem:(k,v)=>saved.set(k,String(v)),removeItem:k=>saved.delete(k)},
  alert:m=>alerts.push(m),confirm(){throw Error('Não pedir confirmação nativa')},render(){} };
 z.window=z;vm.createContext(z);
 for(const file of sourceFiles)vm.runInContext(read(file),z,{filename:file});
 return {z,saved,alerts};
}
let checks=0;function check(name,fn){fn();checks++;console.log('OK UX03',name)}
function importedAttempt(id,card='ri-con-01'){
 return {id:'rv-ux03-'+id,itemId:card,kind:'flashcard',code:'CON-02',
  at:'2026-11-10T10:00:00.000Z',rating:'dificil',selected:null,correct:null,
  sourceStatus:'B_pendente_revisao_independente',due:'2026-11-11',stage:0,origin:'flashcard_autoral'};
}
check('acervo e níveis originais imutáveis',()=>{
 const {z}=boot(),decks=z.AGUReview.deckList();
 assert.deepEqual(copy(decks.map(d=>[d.code,d.count])),[['ADM-06',12],['ADM-13',4],['ADM-23',4],['CON-02',2],['CON-50',4],['PC-03',10]]);
 assert.equal(decks.reduce((n,d)=>n+d.count,0),36);
 assert.equal(decks.reduce((n,d)=>n+(d.difficulties['original:2']||0),0),7);
 assert.equal(decks.reduce((n,d)=>n+(d.difficulties['original:3']||0),0),6);
 assert.equal(decks.reduce((n,d)=>n+(d.difficulties['original:4']||0),0),1);
 assert.equal(decks.reduce((n,d)=>n+(d.difficulties.sem_nivel||0),0),22);
 assert.equal(z.AGUDisciplines.verifiedFrequency(null,'ADM-06'),null);
});
check('tentativa importada não cria data nem muda seen, mas deixa de ser inédita',()=>{
 const {z,saved}=boot(),source={schema:'agu-review-v1',attempts:[importedAttempt('import0001')],cards:{},created:'2026-11-10T10:00:00Z'};
 const result=z.AGUReview.mergeBackupObject({schema:'agu-review-backup-v1',data:source});
 assert.equal(result.added,1);assert.equal(result.reviewSchedulePreserved,true);
 assert.equal(z.AGUReview.reviewInfo('ri-con-01').seen,0);
 assert.equal(z.AGUReview.reviewInfo('ri-con-01').due,null);
 const con=z.AGUReview.deckList().find(d=>d.code==='CON-02');
 assert.equal(con.seen,1);assert.equal(con.new,1);assert.equal(con.noDate,1);assert.equal(con.due,0);
 assert.equal(z.AGUReview.summary().newCards,35);
 assert.match(z.AGUReview.page(),/1 avaliados sem data/);
 assert.match(z.AGUReview.page(),/tentativas importadas sem agenda local/);
 z.AGUReview.deckFilter('status','ineditos');z.AGUReview.deckStart('CON-02');
 assert.deepEqual(copy(z.AGUReview.deckSession().order),['ri-con-02']);
 assert.equal(JSON.parse(saved.get(KEY)).attempts.length,1);
});
check('status sem data inclui importação e explicita avaliação prévia após reload',()=>{
 const old={schema:'agu-review-v1',attempts:[importedAttempt('import0002')],cards:{},created:'2026-11-10T10:00:00Z'};
 const first=boot({[KEY]:old});first.z.AGUReview.deckFilter('status','sem_data');
 assert.equal(first.z.AGUReview.deckStart('CON-02'),true);
 assert.deepEqual(copy(first.z.AGUReview.deckSession().order),['ri-con-01']);
 assert.match(first.z.AGUReview.page(),/Histórico importado · sem agendamento local/);
 assert.match(first.z.AGUReview.page(),/1 avaliação\(ões\) anteriores no histórico/);
 assert.equal(first.z.AGUReview.attemptsInfo().length,1);
 const stored=first.saved.get(KEY);
 const again=boot({[KEY]:stored});assert.equal(again.z.AGUReview.deckResume(),true);
 assert.match(again.z.AGUReview.page(),/Histórico importado · sem agendamento local/);
 assert.equal(again.saved.get(KEY),stored,'render e retomada não alteram a agenda');
 again.z.AGUReview.reveal();assert.equal(again.z.AGUReview.attemptsInfo().length,1);
 assert.equal(again.z.AGUReview.rate('dificil'),true);
 assert.equal(again.z.AGUReview.reviewInfo('ri-con-01').seen,1);
 assert.equal(again.z.AGUReview.reviewInfo('ri-con-01').due,day(1));
 assert.equal(again.z.AGUReview.attemptsInfo().length,2);
 again.z.AGUReview.rate('errei');assert.equal(again.z.AGUReview.attemptsInfo().length,2,'uma nota por cartão em sessão');
 assert.equal(again.z.AGUReview.deckRepeat(),true);
 again.z.AGUReview.reveal();assert.equal(again.z.AGUReview.rate('lembrei'),true);
 assert.equal(again.z.AGUReview.attemptsInfo().length,3,'segunda nota apenas em nova sessão');
});
check('histórico extenso é apresentado como avaliação, não domínio nem vencimento',()=>{
 const attempts=Array.from({length:1500},(_,i)=>importedAttempt('mass'+String(i).padStart(5,'0')));
 const data={schema:'agu-review-v1',attempts,cards:{},created:'2026-11-10T10:00:00Z'};
 const {z,saved}=boot({[KEY]:data}),before=saved.get(KEY);
 const deck=z.AGUReview.deckList().find(d=>d.code==='CON-02');
 assert.equal(deck.seen,1);assert.equal(deck.noDate,1);assert.equal(deck.due,0);
 z.AGUReview.deckFilter('status','sem_data');z.AGUReview.page();
 assert.equal(saved.get(KEY),before,'filtros e render não escrevem histórico');
 assert.match(z.AGUReview.page(),/Progresso conta avaliações, nunca aberturas ou domínio/);
});
check('ponte de código literal não presume ADM/Atos administrativos → ADM-06',()=>{
 const {z,saved}=boot(),before=[...saved.entries()];
 assert.deepEqual(copy(z.AGUReview.exactDeck('ADM-06')),{code:'ADM-06',discipline:'ADM',count:12});
 for(const topic of ['ADM/Atos administrativos','CON/Funções essenciais à Justiça','ADM','ADM-6','ADM-060','ADM-06/Delegação','PC/Normas fundamentais',null])assert.equal(z.AGUReview.exactDeck(topic),null);
 z.AGUPlannerContext=()=>({disciplines:[['ADM','Direito Administrativo',['Atos administrativos']]],sessions:[],answers:[],reviews:[],notebook:[],topic:{}});
 const tasks=z.AGUPlanner.generate().days.flatMap(d=>d.tasks);
 assert.ok(tasks.length>0);assert.ok(tasks.every(t=>z.AGUReview.exactDeck(t.topic)===null));
 assert.deepEqual([...saved.entries()],before,'verificação curricular não grava plano ou notas');
});
check('intervalos e restauração de nove categorias continuam no motor original',()=>{
 for(const [grade,stage,days] of [['errei',0,1],['dificil',0,1],['lembrei',1,7],['facil',2,21]]){
  const {z}=boot();z.AGUReview.deckStart('CON-02');z.AGUReview.reveal();z.AGUReview.rate(grade);
  const info=z.AGUReview.reviewInfo('ri-con-01');assert.equal(info.due,day(days));
  assert.equal(z.AGUBackup20.keys().length,9);assert.equal(z.AGUReview.attemptsInfo().length,1);
 }
 const {z,saved}=boot();z.AGUReview.deckStart('CON-02');z.AGUReview.reveal();z.AGUReview.rate('facil');
 z.AGUReview.reveal();z.AGUReview.rate('errei');assert.equal(z.AGUReview.deckRepeat(),true);
 z.AGUReview.reveal();z.AGUReview.rate('facil');
 assert.equal(z.AGUReview.reviewInfo('ri-con-01').due,day(45));
 const bundle=z.AGUBackup20.capture(),dest=boot();
 assert.equal(dest.z.AGUBackup20.importMissing(bundle).added,1);
 assert.equal(dest.z.AGUBackup20.importMissing(bundle).added,0);
 assert.equal(dest.z.AGUBackup20.validateRecord(KEY,JSON.parse(saved.get(KEY))),true);
});
check('delta UX03 encadeia UX02→LEG11 sem reescrever fixtures anteriores',()=>{
 const sha=file=>crypto.createHash('sha256').update(read(file)).digest('hex');
 const prior=JSON.parse(read('tests/fixtures/ux-baralhos-02-delta.json'));
 const leg11=JSON.parse(read('tests/fixtures/leg11-deltas.json'));
 const delta=JSON.parse(read('tests/fixtures/ux-baralhos-03-delta.json')),next=JSON.parse(read('tests/fixtures/ux-baralhos-04-delta.json'));
 assert.equal(leg11.reviewBeforeSha256,prior.reviewAfterSha256);
 assert.equal(leg11.htmlBeforeSha256,prior.htmlAfterSha256);
 assert.equal(delta.reviewBeforeSha256,leg11.reviewAfterSha256);
 assert.equal(delta.htmlBeforeSha256,leg11.htmlAfterSha256);
 assert.equal(next.reviewBeforeSha256,delta.reviewAfterSha256);
 assert.equal(next.htmlBeforeSha256,delta.htmlAfterSha256);
 const leg12=JSON.parse(read('tests/fixtures/leg12-deltas.json'));
 assert.equal(leg12.htmlBeforeSha256,next.htmlAfterSha256);
 assert.equal(leg12.homeBeforeSha256,next.unchanged['meu-estudo.js']);
 const cards=JSON.parse(read('tests/fixtures/cartoes-aud-01-delta.json'));
 assert.equal(next.reviewAfterSha256,cards.reviewBeforeSha256);
 const nextCards=require('./hash-chain-cartoes-aud-02.cjs');assert.equal(sha('revisao-inteligente.js'),nextCards('revisao-inteligente.js',cards.reviewAfterSha256));
 const leg13=JSON.parse(read('tests/fixtures/leg13-deltas.json'));assert.equal(leg13.htmlBeforeSha256,leg12.htmlAfterSha256);
 assert.equal(leg13.htmlAfterSha256,cards.htmlBeforeSha256);
 assert.equal(sha('index.html'),nextCards('index.html',afterCodigos('index.html',cards.htmlAfterSha256)));
 assert.equal(sha('meu-estudo.js'),afterUx('meu-estudo.js',leg12.homeAfterSha256));
 for(const file of ['planejamento-semanal.js','estudo-integrado.js','leitor-juridico.js','backup-local-s20.js','questoes-leitor-s18.js','catalogo-disciplinas.js','dados/flashcards-aud03-lote01.js']){
  assert.equal(sha(file),afterCodigos(file,delta.unchanged[file]));
 }
});
console.log('UX_BARALHOS_03_VALIDACAO_OK',JSON.stringify({checks,cards:36,decks:6,backupCategories:9}));
