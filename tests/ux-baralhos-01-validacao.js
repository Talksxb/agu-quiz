/* UX-BARALHOS-01 — somente perfis sintéticos e preservação do contrato público. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const clone=x=>JSON.parse(JSON.stringify(x)),sha=s=>crypto.createHash('sha256').update(s).digest('hex');
let checks=0;
function check(label,cb){cb();console.log('OK UX01',label);checks++}
function boot(initial={},oneCard=false){
 const records=new Map(Object.entries(initial).map(([k,v])=>[k,typeof v==='string'?v:JSON.stringify(v)]));
 const x={window:null,crypto:crypto.webcrypto,Date,Math,Blob,URL,URLSearchParams,console,history:{replaceState(){}},location:{pathname:'/agu-quiz/',search:''},document:{querySelector(){return null},getElementById(){return null},head:{appendChild(){}},createElement(){return {}}},localStorage:{getItem:k=>records.get(k)??null,setItem:(k,v)=>records.set(k,String(v)),removeItem:k=>records.delete(k)},confirm:()=>true,alert:m=>{throw Error('Alerta inesperado: '+m)},render(){}};
 x.window=x;vm.createContext(x);
 for(const p of ['catalogo-disciplinas.js','dados/flashcards-aud03-lote01.js','dados/questoes-auditadas-s18.js','dados/questoes-auditadas-s19.js','dados/legislacao-s13.js','revisao-inteligente.js','leitor-consolidacao.js','leitor-juridico.js','backup-local-s20.js']){
  let code=read(p);
  if(oneCard&&p==='revisao-inteligente.js')code=code.replace('const ALL=[...CARDS,...AUD03_CARDS,...OFFICIAL,...S18_ITEMS];',"const ALL=[...CARDS,...AUD03_CARDS,...OFFICIAL,...S18_ITEMS].filter(x=>x.kind!=='flashcard'||x.id==='ri-adm-01');");
  vm.runInContext(code,x,{filename:p});
 }
 return {x,records};
}
const KEY='agu_quiz_revisao_inteligente_v1';
check('catálogo reproduz as 14 disciplinas públicas e cobre 3 disciplinas reais',()=>{
 const {x}=boot(),all=x.AGUDisciplines.list();assert.equal(all.length,14);assert.equal(new Set(all.map(d=>d.code)).size,14);
 assert.equal(x.AGUDisciplines.forTopic('PC-03').name,'Direito Processual Civil');
 assert.equal(new Set(x.AGUReview.deckList().map(d=>d.discipline)).size,3);
 assert.equal(x.AGUDisciplines.verifiedFrequency(null,'ADM-06'),null);
});
check('36 cartões em 6 assuntos; não duplicar e não converter level 4',()=>{
 const {x}=boot(),ds=clone(x.AGUReview.deckList());
 assert.deepEqual(ds.map(d=>[d.code,d.count]),[['ADM-06',12],['ADM-13',4],['ADM-23',4],['CON-02',2],['CON-50',4],['PC-03',10]]);
 assert.equal(ds.reduce((n,d)=>n+d.count,0),36);assert.equal(new Set(ds.flatMap(d=>d.cards.map(c=>c.id))).size,36);
 assert.equal(ds.reduce((n,d)=>n+(d.difficulties['original:4']||0),0),1);
 assert.match(x.AGUReview.page(),/Nível cognitivo original 4/);
 assert.doesNotMatch(x.AGUReview.page(),/alta incidência/);
});
check('abrir, revelar, navegar e pausar sem gravar acerto ou mudar estágio',()=>{
 const b=boot(),{x,records}=b;
 assert.equal(x.AGUReview.deckStart('CON-02'),true);const started=clone(x.AGUReview.deckSession());
 assert.equal(records.get(KEY).includes('"attempts":[]'),true);
 x.AGUReview.reveal();assert.equal(x.AGUReview.deckSession().revealed,true);
 assert.equal(x.AGUReview.deckMove(1),true);assert.equal(x.AGUReview.deckMove(-1),true);
 assert.equal(x.AGUReview.deckPause(),true);assert.equal(x.AGUReview.deckResume(),true);
 assert.equal(x.AGUReview.deckSession().startedAt,started.startedAt);
 assert.equal(JSON.parse(records.get(KEY)).attempts.length,0);
});
check('avaliação única por cartão, D+1 e retorno sem duplicação',()=>{
 const {x,records}=boot();x.AGUReview.deckStart('CON-02');x.AGUReview.reveal();x.AGUReview.rate('lembrei');
 const save=JSON.parse(records.get(KEY));assert.equal(save.attempts.length,1);
 assert.equal(save.attempts[0].itemId,'ri-con-01');assert.equal(save.cards['ri-con-01'].stage,1);
 assert.equal(save.librarySession.index,1);
 x.AGUReview.deckMove(-1);assert.match(x.AGUReview.page(),/já avaliou este cartão/);
 x.AGUReview.rate('errei');assert.equal(JSON.parse(records.get(KEY)).attempts.length,1);
 x.AGUReview.deckMove(1);x.AGUReview.reveal();x.AGUReview.rate('facil');
 const end=JSON.parse(records.get(KEY));assert.equal(end.attempts.length,2);
 assert.equal(end.librarySession.status,'concluida');assert.equal(end.cards['ri-con-02'].stage,2);
 assert.match(x.AGUReview.page(),/Baralho concluído/);
});
check('reload restaura posição e mantém IDs, tentativas e revisão prévia',()=>{
 const old={schema:'agu-review-v1',attempts:[],cards:{'ri-adm-01':{stage:1,due:'2000-01-01',seen:1,errors:1,ease:'dificil'}},created:'2026-11-01T00:00:00.000Z'};
 const b=boot({[KEY]:old});b.x.AGUReview.deckStart('ADM-06');b.x.AGUReview.reveal();b.x.AGUReview.rate('dificil');
 const current=JSON.parse(b.records.get(KEY));assert.equal(current.cards['ri-adm-01'].errors,1);
 assert.equal(current.librarySession.index,1);
 const restarted=boot({[KEY]:current});assert.equal(restarted.x.AGUReview.deckResume(),true);
 assert.equal(restarted.x.AGUReview.deckSession().index,1);
 assert.equal(restarted.x.AGUReview.reviewInfo('ri-adm-01').seen,2);
 assert.equal(restarted.x.AGUReview.attemptsInfo().length,1);
});
check('backup do legado e restauração de categoria ausente preservam a sessão',()=>{
 const b=boot();b.x.AGUReview.deckStart('CON-02');b.x.AGUReview.reveal();b.x.AGUReview.rate('lembrei');
 const bundle=clone(b.x.AGUBackup20.capture());assert.equal(b.x.AGUBackup20.keys().length,9);
 assert.equal(b.x.AGUBackup20.validateRecord(KEY,JSON.parse(b.records.get(KEY))),true);
 const restored=boot();assert.equal(restored.x.AGUBackup20.importMissing(bundle).added,1);
 assert.equal(restored.x.AGUReview.validateBackupObject({schema:'agu-review-backup-v1',data:JSON.parse(b.records.get(KEY))}).length,1);
 assert.equal(restored.x.AGUBackup20.importMissing(bundle).added,0);
 const restart=boot({[KEY]:restored.records.get(KEY)});assert.equal(restart.x.AGUReview.deckResume(),true);
 assert.equal(restart.x.AGUReview.deckSession().index,1);
});
check('uma carta sintética forma baralho unitário sem inflar contagem',()=>{
 const {x}=boot({},true),ds=clone(x.AGUReview.deckList());assert.equal(ds.length,1);assert.equal(ds[0].count,1);
 x.AGUReview.deckStart('ADM-06');x.AGUReview.reveal();x.AGUReview.rate('errei');
 assert.equal(x.AGUReview.deckSession().status,'concluida');assert.match(x.AGUReview.page(),/1 de 1 cartões avaliados/);
});
check('filtro por dificuldade real restringe a sessão sem reclassificar nível',()=>{
 const {x}=boot();x.AGUReview.deckFilter('difficulty','original:4');
 assert.equal(x.AGUReview.deckStart('ADM-23'),true);
 assert.equal(x.AGUReview.deckSession().order.length,1);
 assert.equal(x.AGUReview.deckSession().order[0],'aud03-flc-009');
 assert.match(x.AGUReview.page(),/Nível cognitivo original 4/);
});
check('LEG07/08 continuam na única categoria de leitor, sem caderno paralelo',()=>{
 const {x,records}=boot();assert.equal(x.AGUBackup20.keys().length,9);
 assert.equal(x.AGULegal.peek().forNotebook,undefined);
 assert.equal(typeof x.AGULegal.notebookSave,'function');assert.equal(typeof x.AGULegal.notebookSetStatus,'function');
 x.AGUReview.deckStart('ADM-06');assert.equal(x.AGUReview.notebookDue().length,0);
 assert.equal(records.has('agu_quiz_caderno_baralhos'),false);
});
check('fonte, corpus e legislativo inalterados, sem questões oficiais adicionais',()=>{
 const {x}=boot();assert.equal(x.AGUReview.deck().flashcards,36);assert.equal(x.AGUReview.deck().official,24);
 assert.equal(x.AGU_LEGAL_CORPUS.laws.length,6);assert.equal(x.AGUReview.searchCards().length,36);
 const f=JSON.parse(read('tests/fixtures/leg09-deltas.json')),t=JSON.parse(read('tests/fixtures/leg10-deltas.json')),w=JSON.parse(read('tests/fixtures/leg11-deltas.json'));
 for(const k of ['reader','backup'])assert.equal(t[k+'BeforeSha256'],f[k+'AfterSha256']);
 for(const k of ['reader','backup'])assert.equal(t[k+'AfterSha256'],w[k+'BeforeSha256']);
 for(const [p,key] of [['leitor-juridico.js','readerAfterSha256'],['backup-local-s20.js','backupAfterSha256'],['estudo-integrado.js','studySha256'],['planejamento-semanal.js','plannerSha256'],['dados/legislacao-s13.js','corpusSha256']])assert.equal(sha(read(p)),w[key]);
});
console.log('UX_BARALHOS_01_VALIDACAO_OK',JSON.stringify({checks,flashcards:36,decks:6,localStorageCategories:9}));
