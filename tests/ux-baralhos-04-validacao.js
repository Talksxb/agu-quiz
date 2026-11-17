/* UX04 — coerência do histórico sintético entre biblioteca e revisão legada. */
'use strict';
const afterUx=require('./hash-chain-ux-estudo-integrado.cjs');
const afterCodigos=require('./hash-chain-codigos.cjs');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const ROOT=path.resolve(__dirname,'..'),read=f=>fs.readFileSync(path.join(ROOT,f),'utf8');
const KEY='agu_quiz_revisao_inteligente_v1',READER='agu_leitor_juridico_s13_v1';
const files=['catalogo-disciplinas.js','dados/flashcards-aud03-lote01.js','dados/questoes-auditadas-s18.js','dados/questoes-auditadas-s19.js','dados/legislacao-s13.js','revisao-inteligente.js','planejamento-semanal.js','estudo-integrado.js','leitor-consolidacao.js','leitor-juridico.js','backup-local-s20.js'];
const clone=x=>JSON.parse(JSON.stringify(x));
function boot(initial={}){
 const records=new Map(Object.entries(initial).map(([k,v])=>[k,typeof v==='string'?v:JSON.stringify(v)]));
 const z={Date,Math,Blob,URL,URLSearchParams,crypto:crypto.webcrypto,console,location:{pathname:'/agu-quiz/',search:''},history:{replaceState(){}},document:{querySelector(){return null},getElementById(){return null},head:{appendChild(){}},createElement(){return {}}},localStorage:{getItem:k=>records.get(k)??null,setItem:(k,v)=>records.set(k,String(v)),removeItem:k=>records.delete(k)},render(){},alert(){}};
 z.window=z;vm.createContext(z);for(const file of files)vm.runInContext(read(file),z,{filename:file});return {z,records};
}
const attempt=(n,card='ri-con-01')=>({id:'rv-ux04-'+n,itemId:card,kind:'flashcard',code:'CON-02',at:'2026-11-10T10:00:00Z',rating:'dificil',selected:null,correct:null,sourceStatus:'B_pendente_revisao_independente',due:'2026-11-11',stage:0,origin:'flashcard_autoral'});
const imported={schema:'agu-review-v1',created:'2026-11-10T10:00:00Z',cards:{},attempts:[attempt('import0001'),attempt('import0002')]};
let checks=0;function check(title,fn){fn();checks++;console.log('OK UX04',title)}
check('avaliações importadas sem agenda têm rótulo coerente na revisão legada',()=>{
 const {z,records}=boot({[KEY]:imported}),before=records.get(KEY);
 assert.equal(z.AGUReview.deckList().find(d=>d.code==='CON-02').noDate,1);
 z.AGUReview.select('ri-con-01');assert.match(z.AGUReview.page(),/Avaliações anteriores: 2 · sem agenda local/);
 assert.doesNotMatch(z.AGUReview.page(),/Revisão anterior: 0 · próxima inédita/);
 assert.deepEqual(clone(z.AGUReview.reviewInfo('ri-con-01')),{itemId:'ri-con-01',code:'CON-02',kind:'flashcard',seen:0,due:null,rating:null});
 assert.equal(records.get(KEY),before,'consultar rótulos não altera armazenamento');
 const reloaded=boot({[KEY]:records.get(KEY)});reloaded.z.AGUReview.select('ri-con-01');
 assert.match(reloaded.z.AGUReview.page(),/Avaliações anteriores: 2 · sem agenda local/);
 assert.equal(reloaded.z.AGUReview.attemptsInfo().length,2);
});
check('cartão realmente inédito e agenda antiga preservam semânticas distintas',()=>{
 const {z}=boot({[KEY]:imported});z.AGUReview.select('ri-con-02');
 assert.match(z.AGUReview.page(),/Avaliações anteriores: 0 · ainda inédito/);
 const withSchedule=boot({[KEY]:{...imported,cards:{'ri-con-01':{seen:3,due:'2099-01-01',stage:2,ease:'facil'}}}});
 withSchedule.z.AGUReview.select('ri-con-01');
 assert.match(withSchedule.z.AGUReview.page(),/Avaliações anteriores: 3 · próxima 2099-01-01/);
 assert.equal(withSchedule.z.AGUReview.reviewInfo('ri-con-01').due,'2099-01-01');
});
check('histórico longo, revisão, caderno e backup são independentes da leitura',()=>{
 const data={...imported,attempts:Array.from({length:1400},(_,i)=>attempt('many'+String(i).padStart(5,'0')))};
 const {z,records}=boot({[KEY]:data}),before=records.get(KEY);
 z.AGUReview.select('ri-con-01');assert.match(z.AGUReview.page(),/Avaliações anteriores: 1400 · sem agenda local/);
 assert.equal(z.AGUReview.reviewInfo('ri-con-01').seen,0);
 assert.equal(z.AGUBackup20.keys().length,9);assert.equal(z.AGUReview.exactDeck('ADM/Atos administrativos'),null);
 assert.deepEqual(clone(z.AGUReview.exactDeck('ADM-06')),{code:'ADM-06',discipline:'ADM',count:12});
 assert.equal(records.get(KEY),before);
 const bundle=z.AGUBackup20.capture(),restored=boot();assert.equal(restored.z.AGUBackup20.importMissing(bundle).added,1);
 assert.equal(restored.z.AGUBackup20.importMissing(bundle).added,0);
 assert.equal(boot({[KEY]:restored.records.get(KEY)}).z.AGUReview.attemptsInfo().length,1400,'a restauração exige reload para reidratar módulo');
 assert.equal(restored.z.AGUBackup20.validateRecord(READER,clone(restored.z.AGULegal.peek())),true);
});
check('deltas antigos intactos e novo delta encadeado',()=>{
 const prior=JSON.parse(read('tests/fixtures/ux-baralhos-03-delta.json'));
 const delta=JSON.parse(read('tests/fixtures/ux-baralhos-04-delta.json'));
 const sha=f=>crypto.createHash('sha256').update(read(f)).digest('hex');
 assert.equal(delta.reviewBeforeSha256,prior.reviewAfterSha256);
 assert.equal(delta.htmlBeforeSha256,prior.htmlAfterSha256);
 const leg12=JSON.parse(read('tests/fixtures/leg12-deltas.json'));
 assert.equal(leg12.htmlBeforeSha256,delta.htmlAfterSha256);
 assert.equal(leg12.homeBeforeSha256,delta.unchanged['meu-estudo.js']);
 const cards=JSON.parse(read('tests/fixtures/cartoes-aud-01-delta.json'));
 assert.equal(delta.reviewAfterSha256,cards.reviewBeforeSha256);
 const nextCards=require('./hash-chain-cartoes-aud-02.cjs');assert.equal(nextCards('revisao-inteligente.js',cards.reviewAfterSha256),sha('revisao-inteligente.js'));
 const leg13=JSON.parse(read('tests/fixtures/leg13-deltas.json'));assert.equal(leg13.htmlBeforeSha256,leg12.htmlAfterSha256);
 assert.equal(leg13.htmlAfterSha256,cards.htmlBeforeSha256);
 assert.equal(nextCards('index.html',afterCodigos('index.html',cards.htmlAfterSha256)),sha('index.html'));
 assert.equal(afterUx('meu-estudo.js',leg12.homeAfterSha256),sha('meu-estudo.js'));
 for(const [file,hash] of Object.entries(delta.unchanged))if(file!=='meu-estudo.js')assert.equal(sha(file),afterCodigos(file,hash),file);
});
console.log('UX_BARALHOS_04_VALIDACAO_OK',JSON.stringify({checks,cardCount:36,deckCount:6,backupCategories:9}));
