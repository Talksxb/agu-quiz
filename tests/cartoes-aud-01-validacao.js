/* CARTOES-AUD-01 — escopo público, provas históricas e revisão sem efeitos de leitura. */
'use strict';
const legacyIndexDigest=require('./livro-sites-001-legado.cjs');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..');
const read=file=>{const s=fs.readFileSync(path.join(root,file),'utf8');return file==='catalogo-disciplinas.js'?require('./backlog-seg-001-legado.cjs')(s,file):s};
const digest=file=>crypto.createHash('sha256').update(read(file)).digest('hex');
const KEY='agu_quiz_revisao_inteligente_v1';
const scripts=['catalogo-disciplinas.js','dados/flashcards-aud03-lote01.js',
 'dados/flashcards-aud02-2015-atualizados-lote01.js','revisao-inteligente.js'];
const clone=x=>JSON.parse(JSON.stringify(x));
const afterCodigos=require('./hash-chain-codigos.cjs');
const afterCartoes02=require('./hash-chain-cartoes-aud-02.cjs');
function boot(initial={}){
 const data=new Map(Object.entries(initial).map(([key,value])=>[key,JSON.stringify(value)]));
 const root={Date,Math,Blob,URL,URLSearchParams,console,crypto:crypto.webcrypto,
  location:{pathname:'/agu-quiz/',search:''},history:{replaceState(){}},
  document:{querySelector(){return null},getElementById(){return null},createElement(){return {}}},
  localStorage:{getItem:key=>data.get(key)??null,setItem:(key,value)=>data.set(key,String(value)),removeItem:key=>data.delete(key)},
  render(){},alert(){}};
 root.window=root;vm.createContext(root);for(const file of scripts)vm.runInContext(read(file),root,{filename:file});
 return {root,data};
}
let checks=0;
function check(title,verify){verify();checks++;console.log('OK CARTOES-AUD-01',title)}
check('dados novos são oito cartas autorais, sete itens históricos e fontes públicas',()=>{
 const {root:z}=boot(),cards=clone(z.AGU_AUD02_2015_CARDS);
 assert.equal(cards.length,8);
 assert.equal(new Set(cards.map(x=>x.id)).size,8);
 assert.deepEqual([...new Set(cards.map(x=>x.historicalExam.number))].sort((a,b)=>a-b),[1,10,11,13,22,26,39]);
 assert.deepEqual(cards.map(x=>x.historicalExam.key),['E','C','E','C','C','E','E','C']);
 for(const c of cards){
  assert.equal(c.kind,'flashcard');assert.equal(c.notOfficial,true);
  assert.match(c.origin,/autoral/);assert.match(c.validation,/sem_certificacao_integral/);
  assert.match(c.link,/^https:\/\/(www2\.camara\.leg\.br)/);
  assert.equal(c.historicalExam.exam,'187AGU_001_07');
  assert.match(c.historicalExam.examUrl,/187AGU_001_07\.pdf/);
  assert.match(c.historicalExam.keyUrl,/Gab_Definitivo_187AGU_001_07_SUPER-A4\.pdf/);
  assert.equal(Object.hasOwn(c,'level'),false,'nível não recebe classificação inferida');
  assert.equal(Object.hasOwn(c,'deviceId'),false,'sem âncora automática de artigo');
  assert.equal(Object.hasOwn(c,'audit'),false,'sem cópia do registro privado');
  assert.ok(c.front.length>20&&c.back.length>30);
 }
 assert.doesNotMatch(read('dados/flashcards-aud02-2015-atualizados-lote01.js'),/evidencias\/(?:normativa|provas)|AGU_MATRIZ_CURRICULAR|AUD02-Q-/);
});
check('integra na biblioteca sem criar disciplinas artificiais nem duplicar IDs',()=>{
 const {root:z,data}=boot();const before=data.size;
 const decks=clone(z.AGUReview.deckList());
 assert.equal(z.AGUReview.deck().flashcards,44,'o teste histórico carrega apenas o primeiro lote');
 assert.equal(z.AGUReview.deck().lotAud03,14);
 assert.equal(z.AGUReview.deck().lotAud02_2015,8);
 assert.equal(decks.length,9);
 assert.equal(z.AGUDisciplines.list().length,14);
 assert.deepEqual(decks.filter(x=>['ADM-25','ADM-58','CON-24'].includes(x.code)).map(x=>[x.code,x.count]),[
  ['ADM-25',4],['ADM-58',1],['CON-24',1]
 ]);
 assert.equal(decks.find(x=>x.code==='CON-50').count,6);
 assert.equal(z.AGUReview.exactDeck('ADM/Atos administrativos'),null);
 assert.deepEqual(clone(z.AGUReview.exactDeck('ADM-25')),{code:'ADM-25',discipline:'ADM',count:4});
 assert.equal(data.size,before,'listar não persiste');
});
check('histórico de prova, fonte vigente e caderno único aparecem após revelar',()=>{
 const {root:z,data}=boot();
 const id='aud02-2015-flc-003';
 assert.equal(z.AGUReview.notebookEligibleCard(id).id,id);
 assert.equal(z.AGUReview.notebookHistoricCard(id).topic,null);
 z.AGUReview.select(id);assert.doesNotMatch(z.AGUReview.page(),/Gabarito definitivo \(PDF\)/);
 assert.equal(data.size,0);
 z.AGUReview.reveal();const html=z.AGUReview.page();
 assert.match(html,/Referência histórica · prova AGU 2015/);
 assert.match(html,/gabarito definitivo histórico: E/);
 assert.match(html,/flashcard é autoral/);
 assert.match(html,/Consultar fonte oficial/);
 assert.equal(data.size,0,'abrir e revelar não agendam');
});
check('sessão e avaliação preservam o motor e exigem rating voluntário',()=>{
 const old={schema:'agu-review-v1',attempts:[],cards:{'ri-con-01':{seen:2,due:'2099-12-31',stage:2}}};
 const {root:z,data}=boot({[KEY]:old});const before=JSON.parse(data.get(KEY));
 assert.equal(z.AGUReview.deckStart('ADM-58'),true);
 assert.deepEqual(JSON.parse(data.get(KEY)).cards,before.cards);
 assert.equal(z.AGUReview.deckSession().order.length,1);
 assert.equal(z.AGUReview.deckSession().status,'em_andamento');
 z.AGUReview.reveal();assert.equal(z.AGUReview.attemptsInfo().length,0);
 z.AGUReview.rate('lembrei');
 assert.equal(z.AGUReview.attemptsInfo().length,1);
 const state=JSON.parse(data.get(KEY));
 assert.equal(state.cards['aud02-2015-flc-006'].seen,1);
 assert.equal(state.cards['aud02-2015-flc-006'].stage,1);
 assert.equal(state.librarySession.status,'concluida');
 assert.deepEqual(state.cards['ri-con-01'],before.cards['ri-con-01']);
 z.AGUReview.rate('facil');assert.equal(z.AGUReview.attemptsInfo().length,1,'sem segunda nota na mesma sessão');
});
check('fixture encadeia somente hashes novos aos históricos preservados',()=>{
 const delta=JSON.parse(read('tests/fixtures/cartoes-aud-01-delta.json'));
 const leg13=JSON.parse(read('tests/fixtures/leg13-deltas.json'));
 const ux04=JSON.parse(read('tests/fixtures/ux-baralhos-04-delta.json'));
 assert.equal(delta.htmlBeforeSha256,leg13.htmlAfterSha256);
 assert.equal(delta.reviewBeforeSha256,ux04.reviewAfterSha256);
 assert.equal(afterCartoes02('index.html',afterCodigos('index.html',delta.htmlAfterSha256)),legacyIndexDigest());
 assert.equal(afterCartoes02('revisao-inteligente.js',delta.reviewAfterSha256),digest('revisao-inteligente.js'));
 assert.equal(delta.newFileSha256,digest(delta.newFile));
 for(const [file,hash] of Object.entries(delta.unchanged))assert.equal(digest(file),hash,file);
 const html=read('index.html');assert.match(html,/dados\/flashcards-aud02-2015-atualizados-lote01\.js\?v=20261115-cards-aud01/);
 assert.ok(html.indexOf('flashcards-aud02-2015-atualizados-lote01.js')<html.indexOf('revisao-inteligente.js'));
 assert.equal(delta.cardsAfter,delta.cardsBefore+delta.cardsAdded);
});
console.log('CARTOES_AUD_01_VALIDACAO_OK',JSON.stringify({checks,flashcards:44,decks:9,newCards:8,historicItems:7}));
