/* CARTOES-AUD-02 — quatro cartões autorais de fontes primárias e prova pública. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const BASE=path.resolve(__dirname,'..'),KEY='agu_quiz_revisao_inteligente_v1';
const read=f=>fs.readFileSync(path.join(BASE,f),'utf8');
const sha=f=>crypto.createHash('sha256').update(read(f)).digest('hex');
const names=['catalogo-disciplinas.js','dados/flashcards-aud03-lote01.js','dados/flashcards-aud02-2015-atualizados-lote01.js','dados/flashcards-aud02-2015-atualizados-lote02.js','revisao-inteligente.js'];
const copy=x=>JSON.parse(JSON.stringify(x));
function boot(saved){
 const data=new Map(saved?[[KEY,JSON.stringify(saved)]]:[]),o={Date,Math,Blob,URL,URLSearchParams,console,crypto:crypto.webcrypto,
 location:{pathname:'/agu-quiz/',search:''},history:{replaceState(){}},document:{querySelector(){return null},getElementById(){return null},createElement(){return {}}},
 localStorage:{getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,String(value))},render(){},alert(){}};
 o.window=o;vm.createContext(o);for(const f of names)vm.runInContext(read(f),o,{filename:f});return {o,data};
}
let tests=0;function check(label,fn){fn();tests++;console.log('OK CARTOES-AUD-02',label)}
check('quatro IDs autorais e gabaritos históricos públicos, não oficiais',()=>{
 const {o}=boot(),items=copy(o.AGU_AUD02_2015_CARDS_LOTE02),old=copy(o.AGU_AUD02_2015_CARDS);
 assert.equal(items.length,4);assert.equal(old.length,8);
 assert.deepEqual(items.map(x=>[x.historicalExam.number,x.historicalExam.key]),[[2,'E'],[3,'C'],[9,'E'],[12,'C']]);
 assert.equal(new Set([...items,...old].map(x=>x.id)).size,12);
 for(const x of items){assert.equal(x.kind,'flashcard');assert.equal(x.notOfficial,true);assert.match(x.origin,/autoral/);assert.match(x.validation,/sem_certificacao_integral/);assert.match(x.link,/^https:\/\/(?:www2\.camara\.leg\.br|www\.gov\.br)/);assert.equal(x.historicalExam.exam,'187AGU_001_07');assert.equal(x.legalCutoff,'2026-11-04');assert.ok(x.caseNote&&x.trap);assert.ok(x.front.length>20&&x.back.length>30);assert.equal(Object.hasOwn(x,'level'),false);assert.equal(Object.hasOwn(x,'deviceId'),false);}
 assert.doesNotMatch(read('dados/flashcards-aud02-2015-atualizados-lote02.js'),/AGU_MATRIZ_CURRICULAR|evidencias\/(?:normativa|provas)|AUD02-Q-/);
});
check('48 cartas e 10 baralhos; C01 preservada e sem ranking inventado',()=>{
 const {o,data}=boot(),before=data.size,ds=copy(o.AGUReview.deckList());
 assert.deepEqual([o.AGUReview.deck().flashcards,o.AGUReview.deck().lotAud02_2015,o.AGUReview.deck().lotAud02_2015_02,ds.length],[48,8,4,10]);
 assert.equal(ds.find(x=>x.code==='CON-50').count,8);assert.equal(ds.find(x=>x.code==='ADM-25').count,5);assert.equal(ds.find(x=>x.code==='ADM-27').count,1);
 assert.equal(o.AGUDisciplines.list().length,14);assert.equal(o.AGUReview.exactDeck('ADM/Atos administrativos'),null);assert.equal(o.AGUReview.exactDeck('ADM-27').count,1);assert.equal(data.size,before);
});
check('novo cartão mantém caderno LEG11 único e tema apenas comprovado',()=>{
 const {o,data}=boot();for(const id of ['aud02-2015-flc-02-002','aud02-2015-flc-02-003','aud02-2015-flc-02-009','aud02-2015-flc-02-012'])assert.equal(o.AGUReview.notebookEligibleCard(id).id,id);
 assert.equal(o.AGUReview.notebookHistoricCard('aud02-2015-flc-02-002').topic,'CON-50');
 assert.equal(o.AGUReview.notebookHistoricCard('aud02-2015-flc-02-012').topic,null);
 o.AGUReview.select('aud02-2015-flc-02-012');o.AGUReview.reveal();
 const h=o.AGUReview.page();assert.match(h,/Referência histórica · prova AGU 2015/);assert.match(h,/gabarito definitivo histórico: C/);assert.match(h,/flashcard é autoral/);
 assert.equal(data.size,0,'leitura e revelação não escrevem armazenamento');
});
check('um baralho de uma carta agenda somente após nota voluntária',()=>{
 const old={schema:'agu-review-v1',cards:{'ri-adm-01':{seen:2,due:'2099-01-01',stage:2}},attempts:[]};
 const {o,data}=boot(old);assert.equal(o.AGUReview.deckStart('ADM-27'),true);const snapshot=copy(JSON.parse(data.get(KEY)).cards);
 o.AGUReview.reveal();assert.equal(o.AGUReview.attemptsInfo().length,0);assert.deepEqual(copy(JSON.parse(data.get(KEY)).cards),snapshot);
 o.AGUReview.rate('lembrei');assert.equal(o.AGUReview.attemptsInfo().length,1);
 const saved=JSON.parse(data.get(KEY));assert.equal(saved.cards['aud02-2015-flc-02-009'].seen,1);assert.deepEqual(saved.cards['ri-adm-01'],old.cards['ri-adm-01']);assert.equal(saved.librarySession.status,'concluida');
 o.AGUReview.rate('facil');assert.equal(o.AGUReview.attemptsInfo().length,1);
});
check('fixture aditiva encadeia fonte publicada e não reescreve histórico',()=>{
 const f=JSON.parse(read('tests/fixtures/cartoes-aud-02-delta.json')),previous=JSON.parse(read('tests/fixtures/cartoes-aud-01-delta.json')),codigos=require('./hash-chain-codigos.cjs');
 assert.equal(f.htmlBeforeSha256,codigos('index.html',previous.htmlAfterSha256));assert.equal(f.reviewBeforeSha256,previous.reviewAfterSha256);
 assert.equal(sha('index.html'),f.htmlAfterSha256);assert.equal(sha('revisao-inteligente.js'),f.reviewAfterSha256);assert.equal(sha(f.newFile),f.newFileSha256);
 for(const [file,value] of Object.entries(f.unchanged))assert.equal(sha(file),value,file);
 const html=read('index.html');assert.ok(html.indexOf('flashcards-aud02-2015-atualizados-lote02.js')<html.indexOf('revisao-inteligente.js'));
 assert.match(html,/revisao-inteligente\.js\?v=20261115-cards-aud02/);assert.equal(f.cardsBefore+f.cardsAdded,f.cardsAfter);
});
console.log('CARTOES_AUD_02_VALIDACAO_OK',JSON.stringify({tests,cards:48,decks:10,newCards:4}));
