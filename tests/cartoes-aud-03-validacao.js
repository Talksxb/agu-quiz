/* CARTOES-AUD-03: gabarito histórico, fontes atuais, persistência e delta. */
'use strict';
const legacyIndexDigest=require('./livro-sites-001-legado.cjs');
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const BASE=path.resolve(__dirname,'..'),KEY='agu_quiz_revisao_inteligente_v1';
const read=f=>{const s=fs.readFileSync(path.join(BASE,f),'utf8');return f==='catalogo-disciplinas.js'?require('./backlog-seg-001-legado.cjs')(s,f):s};
const sha=f=>crypto.createHash('sha256').update(read(f)).digest('hex');
const names=['catalogo-disciplinas.js','dados/flashcards-aud03-lote01.js','dados/flashcards-aud02-2015-atualizados-lote01.js','dados/flashcards-aud02-2015-atualizados-lote02.js','dados/flashcards-aud02-2015-atualizados-lote03.js','revisao-inteligente.js'];
const copy=x=>JSON.parse(JSON.stringify(x));
function boot(saved){
 const data=new Map(saved?[[KEY,JSON.stringify(saved)]]:[]),o={Date,Math,Blob,URL,URLSearchParams,console,crypto:crypto.webcrypto,
 location:{pathname:'/agu-quiz/',search:''},history:{replaceState(){}},document:{querySelector(){return null},getElementById(){return null},createElement(){return {}}},
 localStorage:{getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,String(value))},render(){},alert(){}};
 o.window=o;vm.createContext(o);for(const f of names)vm.runInContext(read(f),o,{filename:f});return {o,data};
}
let tests=0;function check(label,fn){fn();tests++;console.log('OK CARTOES-AUD-03',label)}
check('três cartas autorais, chave histórica e suporte primário, sem nível inferido',()=>{
 const {o}=boot(),newCards=copy(o.AGU_AUD02_2015_CARDS_LOTE03),previous=copy(o.AGU_AUD02_2015_CARDS_LOTE02);
 assert.deepEqual(newCards.map(x=>[x.historicalExam.number,x.historicalExam.key,x.code]),[[5,'E','ADM-17'],[7,'C','ADM-27'],[8,'C','ADM-27']]);
 assert.equal(new Set([...newCards,...previous].map(x=>x.id)).size,7);
 for(const x of newCards){
  assert.equal(x.kind,'flashcard');assert.equal(x.notOfficial,true);assert.match(x.origin,/autoral/);
  assert.match(x.validation,/sem_certificacao_integral/);assert.match(x.link,/^https:\/\/www2\.camara\.leg\.br/);
  assert.equal(x.historicalExam.exam,'187AGU_001_07');assert.match(x.historicalExam.examUrl,/^https:\/\/cdn\.cebraspe/);
  assert.equal(x.legalCutoff,'2026-11-04');assert.equal(x.reviewedAt,'2026-11-16');
  assert.ok(x.caseNote.length>40&&x.trap.length>40&&x.front.length>30&&x.back.length>50);
  assert.equal(Object.hasOwn(x,'level'),false);assert.equal(Object.hasOwn(x,'deviceId'),false);
 }
 assert.doesNotMatch(read('dados/flashcards-aud02-2015-atualizados-lote03.js'),/AGU_MATRIZ_CURRICULAR|evidencias\/(?:normativa|provas)|AUD02-Q-/);
});
check('51 cartões / 11 baralhos; códigos públicos granulares e nenhuma frequência inferida',()=>{
 const {o,data}=boot(),decks=copy(o.AGUReview.deckList());
 assert.deepEqual([o.AGUReview.deck().flashcards,o.AGUReview.deck().lotAud02_2015_02,o.AGUReview.deck().lotAud02_2015_03,decks.length],[51,4,3,11]);
 assert.equal(decks.find(x=>x.code==='ADM-17').count,1);assert.equal(decks.find(x=>x.code==='ADM-27').count,3);
 assert.equal(decks.find(x=>x.code==='CON-50').count,8);assert.equal(o.AGUDisciplines.list().length,14);
 assert.equal(o.AGUReview.exactDeck('ADM/Atos administrativos'),null);assert.equal(o.AGUReview.exactDeck('ADM-17').count,1);
 assert.equal(data.size,0);
});
check('caderno único com ID de origem imutável, leitura e revelação não avaliam',()=>{
 const {o,data}=boot();for(const [id,code] of [['aud02-2015-flc-03-005','ADM-17'],['aud02-2015-flc-03-007','ADM-27'],['aud02-2015-flc-03-008','ADM-27']]){
  assert.equal(o.AGUReview.notebookEligibleCard(id).id,id);
  assert.equal(o.AGUReview.notebookHistoricCard(id).code,code);
  assert.equal(o.AGUReview.notebookHistoricCard(id).topic,null);
 }
 o.AGUReview.select('aud02-2015-flc-03-007');o.AGUReview.reveal();
 const html=o.AGUReview.page();assert.match(html,/Referência histórica · prova AGU 2015/);assert.match(html,/gabarito definitivo histórico: C/);
 assert.match(html,/flashcard é autoral/);assert.equal(o.AGUReview.attemptsInfo().length,0);assert.equal(data.size,0);
});
check('rating voluntário único por sessão; registros anteriores inalterados',()=>{
 const previous={schema:'agu-review-v1',cards:{'ri-adm-01':{seen:2,due:'2099-01-01',stage:2}},attempts:[]};
 const {o,data}=boot(previous);assert.equal(o.AGUReview.deckStart('ADM-17'),true);
 o.AGUReview.reveal();assert.equal(o.AGUReview.attemptsInfo().length,0);
 o.AGUReview.rate('lembrei');o.AGUReview.rate('facil');assert.equal(o.AGUReview.attemptsInfo().length,1);
 const after=JSON.parse(data.get(KEY));assert.equal(after.cards['aud02-2015-flc-03-005'].seen,1);
 assert.deepEqual(after.cards['ri-adm-01'],previous.cards['ri-adm-01']);assert.equal(after.librarySession.status,'concluida');
});
check('hashes e ordem de carregamento respeitam baseline integrado; CSS preservado',()=>{
 const f=JSON.parse(read('tests/fixtures/cartoes-aud-03-delta.json'));
 const older=JSON.parse(read(f.previousFixture));const biblioteca=JSON.parse(read(f.concurrentIntegratedFixture));
 assert.equal(f.htmlBeforeSha256,biblioteca.changed['index.html'].after);
 assert.equal(f.reviewBeforeSha256,older.reviewAfterSha256);
 assert.equal(f.cardsBefore+f.cardsAdded,f.cardsAfter);
 assert.equal(legacyIndexDigest(),f.htmlAfterSha256);assert.equal(crypto.createHash('sha256').update(require('./metodo-agu-001-legado.cjs').review(read('revisao-inteligente.js'))).digest('hex'),f.reviewAfterSha256);
 assert.equal(sha(f.newFile),f.newFileSha256);
 for(const [file,hash] of Object.entries(f.unchanged))assert.equal(sha(file),hash,file);
 const html=read('index.html');assert.ok(html.indexOf('flashcards-aud02-2015-atualizados-lote02.js')<html.indexOf('flashcards-aud02-2015-atualizados-lote03.js'));
 assert.ok(html.indexOf('flashcards-aud02-2015-atualizados-lote03.js')<html.indexOf('revisao-inteligente.js'));
});
console.log('CARTOES_AUD_03_VALIDACAO_OK',JSON.stringify({tests,cards:51,decks:11,newCards:3}));
