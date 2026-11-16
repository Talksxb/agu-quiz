/* Códigos CC/CPC: acervo adicional não certificado, índice isolado, backup S20 legado. */
'use strict';
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const assert=require('node:assert/strict'),crypto=require('node:crypto');
const rootDir=path.join(__dirname,'..'),read=f=>fs.readFileSync(path.join(rootDir,f),'utf8');
const sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const run=(file,context)=>vm.runInNewContext(read(file),context,{filename:file});
const base={window:{}};run('dados/legislacao-s13.js',base);
const previous=JSON.parse(JSON.stringify(base.window.AGU_LEGAL_CORPUS));
run('dados/codigos-cc-cpc.js',base);
const full=base.window.AGU_LEGAL_CORPUS;
const catalog=require('../lib/catalogo-legislativo');

function check(name,fn){fn();console.log('OK:',name)}
check('identidade dos seis diplomas anteriores intacta',()=>{
 assert.equal(sha(JSON.stringify(full.laws.slice(0,6))),sha(JSON.stringify(previous.laws)));
 assert.equal(full.laws.length,8);
 assert.deepEqual(catalog.validate(full),{laws:8,articles:3448,units:4332,integral:5});
});
check('CC e CPC importados sem alegação de cotejo integral ou tópico',()=>{
 for(const [id,n] of [['L10406',2082],['L13105',1074]]){
  const law=full.laws.find(x=>x.id===id);
  assert.equal(law.articles.length,n);assert.equal(law.contentCoverage,'partial');
  assert.equal(law.textVerification.status,'pending');assert.equal(law.contentImport,'mirror_unverified');
  assert.ok(law.articles.every(a=>a.topic===null&&a.clauses.length===1));
  assert.match(law.source,/^https:\/\/www\.planalto\.gov\.br/);
  assert.equal(law.sourceMirror.commit,'e2a0e14bfc5cddf9a88b2aa05c66536cdb547aa1');
 }
 assert.match(full.laws.find(l=>l.id==='L10406').articles[0].clauses[0].text,/Toda pessoa é capaz de direitos e deveres/);
 assert.match(full.laws.find(l=>l.id==='L13105').articles[0].clauses[0].text,/processo civil será ordenado/);
});

function boot(data){
 const records=new Map(data||[]),fields=new Map();let renderCount=0;
 const doc={getElementById:id=>fields.get(id)||null,querySelector:()=>null,querySelectorAll:()=>[],
  createElement:()=>({}),head:{appendChild(){}}};
 const localStorage={getItem:k=>records.get(k)??null,setItem(k,v){records.set(k,String(v))},removeItem(k){records.delete(k)}};
 const w={AGU_LEGAL_CORPUS:full,localStorage,document:doc,crypto:crypto.webcrypto,Blob,Date,Math,
  render(){renderCount++},history:{replaceState(){}}};
 const context={window:w,document:doc,localStorage,Blob,crypto:crypto.webcrypto,Date,Math,URL};
 run('leitor-juridico.js',context);run('backup-local-s20.js',context);
 return {w,records,fields,renderCount:()=>renderCount};
}
check('seletor recolhido, somente a lei atual no índice e janela limitada a 49',()=>{
 const {w}=boot();assert.equal(w.AGULegal.openLaw('L10406'),true);
 let html=w.AGULegal.page();
 assert.match(html,/<details id="agu-law-picker">/);
 assert.match(html,/Artigos 1–49 de 2082/);
 assert.equal((html.match(/class="agu-index-entry/g)||[]).length,49);
 assert.ok(!html.includes("AGULegal.article('L13105:art1'"));
 assert.ok(html.includes('Texto de referência, ainda sem cotejo integral'));
 assert.equal(w.AGULegal.gotoArticle('1.228'),true);
 assert.equal(w.AGULegal.peek().article,'L10406:art1228');
 assert.equal(w.AGULegal.gotoArticle('1.228-A'),false);
 assert.equal(w.AGULegal.openLaw('L13105'),true);
 html=w.AGULegal.page();assert.match(html,/de 1074/);
 assert.ok(!html.includes("AGULegal.article('L10406:art1228'"));
 assert.equal(w.AGULegal.gotoArticle('489'),true);
 assert.equal(w.AGULegal.peek().article,'L13105:art489');
 assert.equal(w.AGULegal.gotoArticle('2046'),false);
});
check('próximo/anterior nunca muda de lei',()=>{
 const {w}=boot();w.AGULegal.openLaw('L10406');
 assert.equal(w.AGULegal.step(-1),false);
 w.AGULegal.gotoArticle('2046');assert.equal(w.AGULegal.step(1),false);
 assert.equal(w.AGULegal.peek().article,'L10406:art2046');
});
check('marcação nova em CC preserva categoria e é validada pelo backup S20',()=>{
 const {w,records,fields}=boot();w.AGULegal.openLaw('L10406');
 fields.set('agu-caderno-brief',{value:'Qual é a regra de capacidade do art. 1º?'});
 assert.equal(w.AGULegal.notebookSave(),true);
 const saved=JSON.parse(records.get('agu_leitor_juridico_s13_v1'));
 assert.equal(saved.forNotebook.length,1);assert.equal(saved.forNotebook[0].topic,null);
 assert.equal(saved.forNotebook[0].lawId,'L10406');
 assert.equal(saved.forNotebook[0].unitId,'L10406:art1:texto');
 assert.equal(w.AGUBackup20.validateRecord('agu_leitor_juridico_s13_v1',saved),true);
 const again=boot(records);assert.equal(again.w.AGULegal.peek().forNotebook.length,1);
 assert.equal(again.w.AGULegal.peek().forNotebook[0].id,saved.forNotebook[0].id);
 assert.equal(records.size,1,'nenhuma décima chave criada');
});
check('script cacheado do HTML após o corpus base e antes do leitor',()=>{
 const html=read('index.html');
 const first=html.indexOf('src="dados/legislacao-s13.js'),extra=html.indexOf('src="dados/codigos-cc-cpc.js'),reader=html.indexOf('src="leitor-juridico.js');
 assert.ok(first>=0&&first<extra&&extra<reader);
 assert.ok(read('tests/sprint21-pages.cjs').includes('dados/codigos-cc-cpc.js'));
});
console.log('CODIGOS_CC_CPC_VALIDADO: 8 diplomas, 3448 artigos, 4332 unidades; espelho pendente de cotejo oficial.');
