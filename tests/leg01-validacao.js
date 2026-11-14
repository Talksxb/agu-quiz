/* LEG-01: contrato, corpus legado e ampliação sintética. Não importa lei nova. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),crypto=require('node:crypto');
const ROOT=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(ROOT,p),'utf8'),{validate}=require('../lib/catalogo-legislativo');
const copy=x=>JSON.parse(JSON.stringify(x)),hash=x=>crypto.createHash('sha256').update(x).digest('hex');
const base={};base.window=base;vm.runInNewContext(read('dados/legislacao-s13.js'),base);
const corpus=copy(base.AGU_LEGAL_CORPUS),identity=JSON.parse(read('tests/fixtures/leg01-identidade-s36.json'));
const deltas=JSON.parse(read('tests/fixtures/leg02-correcao-legados.json')).changes,counts=validate(corpus);
let n=0;const check=(name,f)=>{f();n++;console.log('OK LEG01',name)};
check('catálogo expandido LEG02 mantém duas normas e distinção de cobertura',()=>assert.deepEqual(counts,{laws:2,articles:84,units:231,integral:1}));
check('IDs e vínculos S36 conservados; única correção textual é explícita',()=>{
 const units=corpus.laws.flatMap(l=>l.articles.flatMap(a=>a.clauses.map(u=>({id:u.id,article:a.id,law:l.id,topic:a.topic,textSha256:hash(u.text)}))));for(const old of identity.units){const next=units.find(u=>u.id===old.id),delta=deltas.find(d=>d.id===old.id);assert.ok(next);assert.deepEqual({...next,textSha256:old.textSha256},old);assert.equal(next.textSha256,delta?delta.afterSha256:old.textSha256);if(delta)assert.equal(delta.beforeSha256,old.textSha256)}
});
check('artigos completos e excertos com cobertura da norma separada',()=>{
 const arts=corpus.laws.flatMap(l=>l.articles);assert.equal(arts.filter(a=>a.contentKind==='isolated_article').length,82);assert.equal(arts.filter(a=>a.contentKind==='excerpt').length,2);assert.equal(corpus.laws[0].contentCoverage,'partial');assert.equal(corpus.laws[1].contentCoverage,'integral');
});
check('verificação textual não eleva auditoria jurídica',()=>{assert.ok(corpus.laws.every(l=>l.auditStatus==='parcial_nao_certificado'));assert.equal(corpus.laws[0].textVerification.status,'legacy_point_check');assert.equal(corpus.laws[1].textVerification.status,'compared')});
const bad=(name,change)=>check(name,()=>{const c=copy(corpus);change(c);assert.throws(()=>validate(c))});
bad('ID duplicado rejeitado',c=>c.laws[1].articles[0].clauses[0].id=c.laws[0].articles[0].clauses[0].id);
bad('excerto não pode se declarar artigo integral',c=>c.laws[0].articles[0].contentKind='isolated_article');
bad('norma integral sem manifesto rejeitada',c=>delete c.laws[1].completeness);
bad('ciclo estrutural rejeitado',c=>c.laws[0].structure[0].parentId=c.laws[0].structure[0].id);
bad('caminho de capítulo de outra norma rejeitado',c=>c.laws[1].articles[0].structurePath=['CF88:titleIII']);
bad('fonte não oficial rejeitada',c=>c.laws[1].source='https://example.com/lei');
check('remoção e remapeamento de vínculo legado bloqueados',()=>{for(const f of [c=>c.laws[1].articles.pop(),c=>c.laws[1].articles[0].topic='ADM-99']){const c=copy(corpus);f(c);assert.throws(()=>validate(c,corpus))}});
check('atualização textual exige versão diferente e mantém IDs',()=>{const c=copy(corpus);c.laws[1].articles[0].clauses[0].text+=' [ensaio sintético]';assert.throws(()=>validate(c,corpus));c.laws[1].textVersionId+='-test';assert.equal(validate(c,corpus).units,counts.units)});
const enlarged=copy(corpus),law=enlarged.laws[1];
law.contentCoverage='partial';delete law.completeness;
law.articles.push({id:'L9784:artTEST',label:'Artigo sintético — não é legislação',topic:null,contentKind:'isolated_article',structurePath:['L9784:chapterVI'],textVerification:{status:'pending'},clauses:[{id:'L9784:artTEST:caput',label:'Ensaio',text:'Dispositivo somente para teste de infraestrutura.',kind:'caput',parentId:'L9784:artTEST'}]});
check('extensão sem vínculo curricular artificial é estruturalmente válida',()=>assert.equal(validate(enlarged,corpus).units,counts.units+1));
const KEY='agu_leitor_juridico_s13_v1',initial={article:'L9784:art13',unit:'L9784:art13:II',tab:'comentarios',mobile:'text',notes:{'L9784:art13:II':'Nota sintética A','CF88:art131:p3':'Nota sintética B'}};
function boot(c=corpus,records=new Map([[KEY,JSON.stringify(initial)]])){
 const fields={};const document={getElementById:id=>fields[id]||null,createElement:()=>({}),head:{appendChild(){}},querySelector:()=>null,querySelectorAll:()=>[]};
 const env={window:null,document,Blob,Date,Math,crypto:crypto.webcrypto,AGU_LEGAL_CORPUS:c,localStorage:{getItem:k=>records.get(k)??null,setItem:(k,v)=>records.set(k,String(v)),removeItem:k=>records.delete(k)},render(){}};env.window=env;vm.createContext(env);
 for(const file of ['estudo-integrado.js','leitor-consolidacao.js','leitor-juridico.js','backup-local-s20.js'])vm.runInContext(read(file),env,{filename:file});
 return {env,records,fields};
}
const {env:e,records,fields}=boot(enlarged);const before=JSON.stringify([...records]);
check('ampliar corpus e montar leitor não escreve nem perde notas/retomada',()=>{e.AGULegal.page();assert.equal(JSON.stringify([...records]),before);assert.equal(e.AGULegal.peek().unit,initial.unit);assert.deepEqual(copy(e.AGULegal.peek().notes),initial.notes)});
check('novo texto pendente não entra na busca como confirmado',()=>{assert.equal(e.AGUConsolidation.query('L9784:artTEST','norma','pendente').length,1);assert.equal(e.AGUConsolidation.query('L9784:artTEST','norma','confirmado').length,0)});
check('artigo sem vínculo admite leitura e comentários, sem sessão inválida',()=>{e.AGULegal.article('L9784:artTEST');assert.equal(e.AGUStudy.start('L9784:artTEST:caput'),false);assert.equal(e.AGUStudy.peek().sessions.length,0);fields['agu-legal-note']={value:'Comentário sintético no artigo novo'};e.AGULegal.note();e.AGULegal.tab('caderno');assert.ok(e.AGULegal.page().includes('Vínculo curricular ainda não documentado'));assert.equal(e.AGULegal.peek().notes['L9784:art13:II'],'Nota sintética A')});
check('mesmo backup restaura notas antigas e novas sem sobrescrever',()=>{const raw=records.get(KEY),bundle=JSON.stringify({schema:'agu-portable-local-s20-v1',version:1,items:{[KEY]:raw}}),target=boot(enlarged,new Map());assert.equal(target.env.AGUBackup20.importMissing(bundle).added,1);assert.equal(target.records.get(KEY),raw);assert.equal(target.env.AGUBackup20.importMissing(bundle).added,0)});
check('índice de versões legado continua referenciando unidades presentes',()=>{const z={};z.window=z;vm.runInNewContext(read('dados/versoes-normativas-s17.js'),z);const ids=new Set(identity.units.map(u=>u.id));assert.ok(z.AGU_LEGAL_VERSIONS.entries.every(v=>ids.has(v.deviceId)));assert.equal(z.AGU_LEGAL_VERSIONS.entries.length,18)});
console.log('LEG01_VALIDACAO_OK',JSON.stringify({checks:n,...counts,syntheticExtraUnits:1}));
