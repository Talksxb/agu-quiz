'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),crypto=require('node:crypto');
const afterUx02=require('./hash-chain-ux-estudo-integrado-02.cjs');
const ROOT=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(ROOT,p),'utf8'),html=read('index.html');
const READER='agu_leitor_juridico_s13_v1',REVIEW='agu_quiz_revisao_inteligente_v1',PLAN='agu_quiz_planejamento_semanal_v1';
const clone=x=>JSON.parse(JSON.stringify(x));
function boot(saved=new Map()){
 const fields={},main={innerHTML:'',contains:()=>false};fields['#main']=main;
 for(const id of ['#agu-subject-title','#agu-subjects-title','#agu-caderno-list','#main h1'])fields[id]={focus(){this.focused=true}};
 const document={activeElement:{},head:{appendChild(){}},createElement:()=>({style:{}}),getElementById:id=>fields['#'+id]||null,querySelector:s=>fields[s]||null,querySelectorAll:()=>[],addEventListener(){}};
 const e={document,console,Date,Math,Blob,TextEncoder,URLSearchParams,crypto:crypto.webcrypto,location:{search:''},HTMLElement:function(){},setTimeout(){},setInterval(){},alert(){},confirm:()=>true,
 localStorage:{getItem:k=>saved.get(k)??null,setItem:(k,v)=>saved.set(k,String(v)),removeItem:k=>saved.delete(k)}};
 e.window=e;vm.createContext(e);
 for(const [,src] of html.matchAll(/<script\s+src="([^"]+)"/g))vm.runInContext(read(src.split('?')[0]),e,{filename:src});
 for(const [,inline] of html.matchAll(/<script>([\s\S]*?)<\/script>/g))vm.runInContext(inline,e);
 return {e,saved,main,fields};
}
let checks=0;function test(label,fn){fn();checks++;console.log('UX_ESTUDO_01_OK',label)}
test('catálogo derivado sem escrita, alias, frequência ou vínculo por nome',()=>{
 const {e,saved}=boot(),c=e.AGUSubjects.catalog();assert.equal(c.length,12);assert.equal(saved.size,0);
 assert.equal(c.find(x=>x.code==='PC-03').articles.length,0,'CPC sem topic não é vínculo curricular');
 assert.equal(c.find(x=>x.code==='CON-50').questions.length,0,'Q48 sem relação direta não é promovida');
 assert.equal(c.find(x=>x.code==='ADM-17').questions.length,1);
 assert.equal(e.AGUSubjects.select('ADM-02'),false,'não traduz código pedagógico por semelhança');
 e.AGUSubjects.page();e.AGUSubjects.openLibrary();e.AGUSubjects.filter('discipline','CIV');assert.match(e.AGUSubjects.page(),/Nenhum assunto disponível/);assert.equal(saved.size,0);
});
test('cartões e revisão abrem biblioteca original sem alterar sessão, agenda ou plano',()=>{
 const {e,saved,main}=boot();e.AGUPlanner.create();e.AGUReview.deckStart('CON-02');
 const before=JSON.stringify([...saved]),session=clone(e.AGUReview.deckSession());
 e.AGUSubjects.select('ADM-06');assert.equal(e.AGUSubjects.open('cards'),true);
 assert.match(main.innerHTML,/Voltar ao assunto ADM-06/);assert.match(main.innerHTML,/value="ADM-06"/);
 assert.equal(JSON.stringify([...saved]),before);assert.deepEqual(clone(e.AGUReview.deckSession()),session);
 e.AGUSubjects.openLibrary();e.AGUSubjects.open('review');assert.match(main.innerHTML,/Nenhum cartão corresponde/);assert.equal(JSON.stringify([...saved]),before);
 assert.equal(e.AGUReview.attemptsInfo().length,0);assert.equal(e.AGUReview.browseTopic('ADM/Atos administrativos'),false);
});
test('Continuar estudando retoma o mesmo baralho após reload, sem nova tentativa',()=>{
 const {e,saved}=boot();e.AGUReview.deckStart('ADM-06');e.AGUReview.reveal();e.AGUReview.rate('lembrei');e.AGUReview.deckPause();
 const before=saved.get(REVIEW),order=clone(e.AGUReview.deckSession().order),{e:r}=boot(saved);
 assert.equal(r.AGUHome.next().kind,'deck');r.AGUHome.continueStudy();
 assert.deepEqual(clone(r.AGUReview.deckSession().order),order);assert.equal(r.AGUReview.attemptsInfo().length,1);assert.equal(saved.get(REVIEW),before);
 r.AGUSubjects.select('ADM-06');assert.match(r.AGUSubjects.page(),/1 de 12 cartões/);
});
test('sessão integrada continua com prioridade e ID originais',()=>{
 const {e,saved}=boot();e.AGUStudy.start('L9784:art12:caput');e.AGUStudy.stage('caderno');e.AGUReview.deckStart('ADM-06');
 const id=e.AGUStudy.active().id,{e:r}=boot(saved);assert.equal(r.AGUHome.next().kind,'session');r.AGUHome.continueStudy();assert.equal(r.AGUStudy.active().id,id);assert.equal(r.AGUStudy.active().stage,'caderno');
});
test('leitor, notas e lista única preservam registros, filtros e backup de nove categorias',()=>{
 const {e,saved,main,fields}=boot();e.AGULegal.unit('L9784:art12:caput');
 fields['#agu-legal-note']={value:'Nota sintética anterior'};e.AGULegal.note();
 assert.equal(e.AGULegal.notebookSaveCard('ri-adm-01','Delegação e avocação?'),true);
 e.AGUPlanner.create();const planner=saved.get(PLAN),notes=clone(e.AGULegal.peek().notes),marks=clone(e.AGULegal.peek().forNotebook);
 e.AGUSubjects.select('ADM-06');e.AGUSubjects.open('law','L9784:art11:caput');assert.equal(e.AGULegal.peek().unit,'L9784:art11:caput');
 e.AGUSubjects.openLibrary();e.AGUSubjects.open('notebook');assert.match(main.innerHTML,/Delegação e avocação/);assert.match(main.innerHTML,/value="ADM-06" selected/);
 assert.deepEqual(clone(e.AGULegal.peek().notes),notes);assert.deepEqual(clone(e.AGULegal.peek().forNotebook),marks);assert.equal(saved.get(PLAN),planner);
 e.AGUReview.deckStart('ADM-06');e.AGUReview.reveal();e.AGUReview.rate('errei');
 const bundle=e.AGUBackup20.capture(),dest=boot();assert.equal(e.AGUBackup20.keys().length,9);
 assert.equal(dest.e.AGUBackup20.importMissing(bundle).added,3);assert.equal(dest.e.AGUBackup20.importMissing(bundle).added,0);
 const {e:restored}=boot(dest.saved);assert.deepEqual(clone(restored.AGULegal.peek().forNotebook),marks);assert.deepEqual(clone(restored.AGULegal.peek().notes),notes);assert.equal(restored.AGUReview.attemptsInfo().length,1);
});
test('questão pontual conserva identidade e abrir não responde nem conclui',()=>{
 const {e}=boot();e.AGUSubjects.select('ADM-17');assert.equal(e.AGUSubjects.open('question','of-2015-adv-048'),false);
 assert.equal(e.AGUSubjects.open('question','of-2015-adv-006'),true);assert.equal(e.AGULegal.peek().unit,'L9784:art50:p1');assert.equal(e.AGUReview.attemptsInfo().length,0);assert.equal(e.AGUStudy.peek().sessions.length,0);
});
test('simulação e armazenamento inválido não criam novo registro',()=>{
 const {e,saved}=boot();e.switchDemo();assert.match(e.AGUSubjects.page(),/Saia da simulação/);assert.equal(e.AGUSubjects.select('ADM-06'),false);assert.equal(saved.size,0);
 e.switchDemo();e.AGUSubjects.select('ADM-06');saved.set(READER,'{inválido');const before=JSON.stringify([...saved]);assert.equal(e.AGUSubjects.open('notebook'),false);assert.equal(JSON.stringify([...saved]),before);
 assert.equal(e.AGUSubjects.open('law','L9784:art12:caput'),false);assert.equal(JSON.stringify([...saved]),before);
 e.AGUSubjects.select('ADM-17');assert.equal(e.AGUSubjects.open('question','of-2015-adv-006'),false);assert.equal(JSON.stringify([...saved]),before);
});
test('delta exato mantém corpus, motores externos, backup e todas as fixtures históricas',()=>{
 const delta=JSON.parse(read('tests/fixtures/ux-estudo-integrado-01-delta.json')),sha=f=>crypto.createHash('sha256').update(read(f)).digest('hex');
 for(const [file,change] of Object.entries(delta.changed))assert.equal(sha(file),afterUx02(file,change.after),file);
 for(const entries of [delta.added,delta.unchanged,delta.historicalFixtures])for(const [file,hash] of Object.entries(entries))assert.equal(sha(file),hash,file);
 assert.equal(everyExternalSecretAbsent(),true);
});
function everyExternalSecretAbsent(){return !/fetch\(|XMLHttpRequest|api[_-]?key|chatgpt\.com\/backend/.test(read('navegacao-estudo.js'))}
console.log('UX_ESTUDO_INTEGRADO_01_VALIDACAO_OK',JSON.stringify({checks,backupCategories:9}));
