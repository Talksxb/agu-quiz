/* Somente fixtures; não lê histórico do estudante. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..'),KEY='agu_livros_reader_v1';
const db=new Map(),storage={getItem:k=>db.has(k)?db.get(k):null,setItem:(k,v)=>db.set(k,String(v)),removeItem:k=>db.delete(k)},env={Blob,console,Date,localStorage:{...storage}};
env.window=env;vm.createContext(env);
for(const f of ['dados/metodo-agu-referencias.js','metodo-agu-progresso.js','backup-local-s20.js'])if(fs.existsSync(path.join(ROOT,f)))vm.runInContext(fs.readFileSync(path.join(ROOT,f),'utf8'),env,{filename:f});
const B=env.AGUBackup20,P=env.AGUMethodProgress,copy=x=>JSON.parse(JSON.stringify(x)),at='2026-11-20T12:00:00.000Z',REVIEW='agu_quiz_revisao_inteligente_v1';
const references=env.AGU_METHOD_BOOK_REFERENCES.chapters,reference=references['adm-53'];
const record=()=>({page:2,done:[0],updated:at,methodEdition:reference.edition,sectionId:reference.sections[2],preferences:{size:22,height:1.9},activities:{'adm-53-caso':{draft:'Hipótese <script>sem execução</script>',edition:reference.edition,performedAt:at}},campoFuturo:{nota:'preservar',n:3}});
const bundle=items=>({schema:'agu-portable-local-s20-v1',version:1,createdAt:at,items});
const bookBundle=records=>bundle({[KEY]:JSON.stringify(records)}),review=JSON.stringify({schema:'agu-review-v1',cards:{'ri-adm-01':{seen:3,due:'2099-05-01'}},attempts:[]});
let count=0;function test(name,fn){db.clear();Object.assign(env.localStorage,storage);try{fn();count++;console.log('OK MÉTODO-AGU-003 '+name)}finally{Object.assign(env.localStorage,storage)}}
test('captura o percurso sem alterar bytes, registros ou agendas',()=>{
 const raw=JSON.stringify({'adm-53':record()},null,2);db.set(KEY,raw);db.set(REVIEW,review);const b=B.capture();assert.equal(b.items[KEY],raw);assert.equal(b.items[REVIEW],review);assert.equal(db.get(KEY),raw);assert.equal(db.size,2);assert.equal(B.keys().length,10);
 assert.deepEqual(copy(B.keys()).slice(0,9).map(x=>x.key),['agu_quiz_mvp1_2026',REVIEW,'agu_quiz_planejamento_semanal_v1','agu_caderno_contextual_s15_v1','agu_estudo_integrado_s16_v1','agu_leitor_juridico_s13_v1','agu_consolidacao_s17_v1','agu_quiz_curriculo_repo_v1','agu_quiz_mapeamento_questoes_v1']);
});
test('backup antigo sem livros não cria nem remove o percurso',()=>{
 const old=bundle({[REVIEW]:review});assert.equal(B.validateBundle(old).version,1);B.importMissing(old);assert.equal(db.has(KEY),false);db.set(KEY,JSON.stringify({'adm-53':record()}));const before=db.get(KEY);assert.equal(B.importMissing(old).added,0);assert.equal(db.get(KEY),before);
});
test('restauração ausente é byte-idêntica, completa e idempotente',()=>{
 const r=record();r.activities['adm-53-caso'].draft='é'.repeat(12000);r.readingEditions={'0.1':{page:1,done:[0],updated:at,activities:{'antiga-atividade':{draft:'rascunho antigo',edition:'0.1'}}}};
 const raw=JSON.stringify({'adm-53':r,'capitulo-futuro':{page:999,done:[1],methodEdition:'3.0',campoNovo:['sem catálogo',null]}},null,2),b=bundle({[KEY]:raw});
 const p=B.previewRestore(b);assert.equal(p.books.added.length,2);assert.equal(p.books.references.find(x=>x.id==='capitulo-futuro').known,false);assert.equal(B.restore(b,{expected:p.expected}).added,1);assert.equal(db.get(KEY),raw);assert.equal(B.importMissing(b).added,0);assert.equal(db.get(KEY),raw);
});
test('restauração padrão preserva categoria e todos os capítulos existentes',()=>{
 const raw=JSON.stringify({'adm-53':record()});db.set(KEY,raw);const incoming=bookBundle({'adm-54':{page:1,done:[]},'adm-53':{page:0,done:[]}});B.importMissing(incoming);assert.equal(db.get(KEY),raw);
});
test('mesclagem explícita só adiciona IDs de capítulos ausentes',()=>{
 const current={'adm-53':record(),'registro-externo':{preservar:'campos legados'}};db.set(KEY,JSON.stringify(current));db.set(REVIEW,review);
 const incoming=bookBundle({'adm-53':{page:0,done:[]},'adm-54':{page:1,done:[],updated:at}}),p=B.previewRestore(incoming,{mergeBooks:true});assert.deepEqual(copy(p.books.added),['adm-54']);assert.deepEqual(copy(p.books.conflicts),['adm-53']);
 const result=B.restore(incoming,{mergeBooks:true,expected:p.expected}),after=JSON.parse(db.get(KEY));assert.equal(result.chaptersAdded,1);assert.deepEqual(after['adm-53'],current['adm-53']);assert.deepEqual(after['registro-externo'],current['registro-externo']);assert.equal(db.get(REVIEW),review);
 const before=db.get(KEY);assert.equal(B.restore(incoming,{mergeBooks:true}).chaptersAdded,0);assert.equal(db.get(KEY),before);
});
test('prévia vencida aborta antes da primeira escrita',()=>{
 db.set(KEY,JSON.stringify({'adm-53':record()}));const b=bookBundle({'adm-54':{page:0,done:[]}}),p=B.previewRestore(b,{mergeBooks:true});db.set(KEY,JSON.stringify({'adm-53':{page:1,done:[]}}));const changed=db.get(KEY);assert.throws(()=>B.restore(b,{mergeBooks:true,expected:p.expected}),/mudaram/);assert.equal(db.get(KEY),changed);
});
test('percurso local inválido bloqueia mesclagem e preserva bytes',()=>{
 for(const raw of ['{inválido',JSON.stringify({'adm-53':{page:-1}})]){db.set(KEY,raw);assert.throws(()=>B.restore(bookBundle({'adm-54':{page:0}}),{mergeBooks:true}),/inválido|inconsistente/);assert.equal(db.get(KEY),raw);assert.equal(B.importMissing(bookBundle({})).added,0);assert.equal(db.get(KEY),raw);}
});
test('mesclagem não grava um conjunto que invalida limites de capítulos ou nós',()=>{
 const many=Object.fromEntries(Array.from({length:2000},(_,i)=>['capitulo-'+i,{}]));
 const large=()=>({extra:Array.from({length:10000},()=>Array(11).fill('texto artificial'))});
 for(const [current,incoming] of [[many,{'capitulo-adicional':{}}],[{'capitulo-local':large()},{'capitulo-importado':large()}]]){
  assert.equal(P.validate(current),true);assert.equal(P.validate(incoming),true);assert.equal(P.validate({...current,...incoming}),false);
  const before=JSON.stringify(current);db.set(KEY,before);
  assert.throws(()=>B.restore(bundle({[REVIEW]:review,[KEY]:JSON.stringify(incoming)}),{mergeBooks:true}),/Percurso combinado/);
  assert.equal(db.get(KEY),before,'resultado inválido não pode substituir percurso válido');
  assert.equal(db.has(REVIEW),false,'nenhuma outra categoria pode ser escrita antes de validar o conjunto');
 }
});
test('quota na última escrita reverte inserções e preserva categoria existente',()=>{
 const raw=JSON.stringify({'adm-53':record()});db.set(KEY,raw);env.localStorage.setItem=(k,v)=>{if(k===KEY)throw Error('quota sintética');storage.setItem(k,v)};
 const b=bundle({[REVIEW]:review,[KEY]:JSON.stringify({'adm-54':{page:0}})});assert.throws(()=>B.restore(b,{mergeBooks:true}),/revertida/);assert.equal(db.get(KEY),raw);assert.equal(db.has(REVIEW),false);
});
test('escrita concorrente entre operações não é apagada no rollback',()=>{
 const raw=JSON.stringify({'adm-53':record()}),changed=JSON.stringify({'adm-53':{page:3}});db.set(KEY,raw);env.localStorage.setItem=(k,v)=>{storage.setItem(k,v);if(k===REVIEW)storage.setItem(KEY,changed)};
 assert.throws(()=>B.restore(bundle({[REVIEW]:review,[KEY]:JSON.stringify({'adm-54':{page:0}})}),{mergeBooks:true}),/revertida/);assert.equal(db.get(KEY),changed);assert.equal(db.has(REVIEW),false);
});
test('falha de limpeza não é relatada como reversão completa',()=>{
 const raw=JSON.stringify({'adm-53':record()});db.set(KEY,raw);env.localStorage.setItem=(k,v)=>{if(k===KEY)throw Error('quota');storage.setItem(k,v)};env.localStorage.removeItem=()=>{throw Error('indisponível')};
 assert.throws(()=>B.restore(bundle({[REVIEW]:review,[KEY]:JSON.stringify({'adm-54':{page:0}})}),{mergeBooks:true}),/Restauração parcial/);assert.equal(db.get(KEY),raw);assert.equal(db.get(REVIEW),review);
});
test('armazenamento inacessível aborta sem escrita',()=>{env.localStorage.getItem=()=>{throw Error('sem acesso')};assert.throws(()=>B.restore(bookBundle({'adm-53':record()})),/sem acesso/);assert.equal(db.size,0)});
test('campos e índices incompatíveis são rejeitados antes de restaurar',()=>{
 const invalid=[r=>r.page=-1,r=>r.page=1.5,r=>r.page=20,r=>r.done=[0,0],r=>r.done=[20],r=>r.sectionId='secao-falsa',r=>r.updated='2026-02-30T00:00:00Z',r=>r.preferences.size=17,r=>r.preferences.height=4,r=>r.activities['adm-53-caso'].draft='a'.repeat(12001),r=>r.activities['adm-53-caso'].performedAt='ontem',r=>r.readingEditions={'0.1':{done:[-1]}},r=>r.activities['atividade-falsa']={draft:'falsa',edition:reference.edition}];
 for(const alter of invalid){const r=record();alter(r);const b=bookBundle({'adm-53':r});assert.throws(()=>B.restore(b),/Categoria inválida/);assert.equal(db.size,0);}
 assert.throws(()=>B.restore(bookBundle({'ID/inválido':{}})),/Categoria inválida/);assert.throws(()=>B.restore(bookBundle({'adm-53':null})),/Categoria inválida/);
});
test('chaves perigosas são recusadas também em extensões e históricos',()=>{
 for(const name of ['__proto__','constructor','prototype'])for(const nested of [false,true]){const rec=record(),bad=JSON.parse('{"'+name+'":{"poluído":true}}');if(nested)rec.readingEditions={'0.1':{extra:bad}};else rec.campoFuturo=bad;assert.throws(()=>B.restore(bookBundle({'adm-53':rec})),/Categoria inválida/);assert.equal(db.size,0);}
 assert.equal({}.poluído,undefined);
 const b=bookBundle({'adm-53':record()});Object.defineProperty(b,'__proto__',{value:{poluido:true},enumerable:true});assert.throws(()=>B.restore(JSON.stringify(b)),/Chave perigosa/);assert.equal(db.size,0);
});
test('dados extensos ou aninhados além do contrato não são gravados',()=>{
 let deep='fim';for(let i=0;i<15;i++)deep={camada:deep};assert.equal(P.validate({'adm-53':{extra:deep}}),false);assert.equal(P.validate({'adm-53':{extra:'a'.repeat(20001)}}),false);
 const raw='é'.repeat(6000001);assert.ok(raw.length<12000000);assert.throws(()=>B.validateBundle(raw),/12 MB/);assert.equal(db.size,0);
});
test('edição diferente conserva original e não reaproveita índices nem rascunhos',()=>{
 const old={...record(),methodEdition:'0.1',page:99,done:[98],sectionId:'secao-historica'};old.activities['adm-53-caso'].edition='0.1';assert.equal(P.validate({'adm-53':old}),true);assert.equal(P.assess('adm-53',old).mismatch,true);
 const active=P.active(old,reference.edition);assert.equal(active.page,0);assert.deepEqual(copy(active.done),[]);assert.deepEqual(copy(active.activities),{});assert.equal(old.page,99);
 const next=P.prepare(old,reference.edition);assert.deepEqual(copy(next.readingEditions['0.1']),old);assert.equal(P.validate({'adm-53':next}),true);assert.equal(next.mastery,undefined);assert.equal(next.activities['adm-53-caso'],undefined);
});
test('arquivo histórico coincidente não é sobrescrito ao trocar de edição',()=>{
 const old={...record(),methodEdition:'0.1',readingEditions:{'0.1':{page:1,done:[0],anotacao:'snapshot anterior'}}};old.activities['adm-53-caso'].edition='0.1';const next=P.prepare(old,reference.edition);assert.equal(next.readingEditions['0.1'].anotacao,'snapshot anterior');assert.equal(next.readingEditions['0.1#2'].page,2);assert.equal(next.readingEditions['0.1#2'].activities['adm-53-caso'].draft,old.activities['adm-53-caso'].draft);
});
test('atividade antiga sem edição no capítulo também é preservada e isolada',()=>{
 const old=record();delete old.methodEdition;old.activities['adm-53-caso'].edition='0.1';assert.equal(P.active(old,reference.edition).page,0);const next=P.prepare(old,reference.edition);assert.equal(next.readingEditions['sem-edicao'].activities['adm-53-caso'].edition,'0.1');assert.deepEqual(copy(next.activities),{});
});
test('registros legados compatíveis e campos desconhecidos permanecem utilizáveis',()=>{
 const legacy={page:2,done:[0],updated:at,extra:{nota:'texto',opcao:true}};assert.equal(P.validate({'adm-53':legacy}),true);assert.equal(P.active(legacy,reference.edition),legacy);const next=P.prepare(legacy,reference.edition);assert.deepEqual(copy(next.extra),legacy.extra);assert.equal(next.page,2);assert.equal(next.mastery,undefined);
});
test('referências do backup incluem seis capítulos sem alterar os cinco anteriores',()=>{
 assert.equal(Object.keys(references).length,6);assert.deepEqual(Object.keys(references).slice(0,5),['lgpd-adm64b','adm-53','adm-54','amb-03','amb-11']);assert.equal(references['amb-06'].sections.length,16);assert.deepEqual(Array.from(references['amb-06'].curricularIds),['AMB-06']);for(const [id,r] of Object.entries(references)){const m=JSON.parse(fs.readFileSync(path.join(ROOT,'livros/metodo/'+id+'.json')));assert.equal(r.edition,m.edition);assert.deepEqual(copy(r.sections),m.sections.map(s=>s.id));assert.deepEqual(copy(r.activities),m.activities.map(a=>a.id));}
 assert.equal(B.validateRecord(KEY,{}),true);assert.equal(B.capture().items[KEY],undefined);
});
console.log('METODO_AGU_003_NODE_OK',JSON.stringify({tests:count,categories:10,legacyCategories:9,physicalAndroid:false}));
