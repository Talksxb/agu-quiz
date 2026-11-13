/* Sprint 27 — somente estado sintético: IDs e estados do Leitor no backup portátil.
 * Reproduz a aceitação pré-correção de artigo desconhecido que perdia notas ao carregar.
 */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),path=require('node:path'),crypto=require('node:crypto');
const ROOT=path.resolve(__dirname,'..'),KEY='agu_leitor_juridico_s13_v1',UNIT='CF88:art37:caput';
const digest=x=>crypto.createHash('sha256').update(x).digest('hex');
const records=new Map([['agu_quiz_mvp1_2026','sentinela-sintetica']]);
const document={getElementById(){return null},createElement(){return {id:'',textContent:''}},head:{appendChild(){}}};
const env={Blob,window:null,document,localStorage:{getItem:k=>records.has(k)?records.get(k):null,
 setItem:(k,v)=>records.set(k,String(v)),removeItem:k=>records.delete(k)}};
env.window=env;vm.createContext(env);
for(const file of ['dados/legislacao-s13.js','backup-local-s20.js'])
 vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),env,{filename:file});
const good={article:'CF88:art37',unit:UNIT,tab:'comentarios',mobile:'related',notes:{[UNIT]:'Nota sintética de controle'}};
const wrap=r=>JSON.stringify({schema:'agu-portable-local-s20-v1',version:1,createdAt:'2026-11-13T00:00:00.000Z',items:{[KEY]:JSON.stringify(r)}});

// Pré-patch: todos os casos abaixo eram aceitos. O primeiro fazia o Leitor reinicializar
// o estado com notes={} e perder a nota da sessão após carregar o arquivo.
const invalid=[
 ['artigo_inexistente',{...good,article:'ARTIGO-INEXISTENTE'}],
 ['unidade_inexistente',{...good,unit:'UNIDADE-INEXISTENTE'}],
 ['anotacao_sem_dispositivo',{...good,notes:{'UNIDADE-INEXISTENTE':'Nota órfã'}}],
 ['aba_desconhecida',{...good,tab:'ABA-INEXISTENTE'}],
 ['painel_mobile_desconhecido',{...good,mobile:'PAINEL-INEXISTENTE'}]
];
for(const [name,obj] of invalid){
 const json=wrap(obj);
 assert.equal(env.AGUBackup20.validateRecord(KEY,obj),false,`registro inválido: ${name}`);
 assert.throws(()=>env.AGUBackup20.validateBundle(json),/Categoria inválida/,`pacote inválido: ${name}`);
 assert.throws(()=>env.AGUBackup20.importMissing(json),/Categoria inválida/,`não escrever: ${name}`);
 assert.equal(records.get('agu_quiz_mvp1_2026'),'sentinela-sintetica');
 assert.equal(records.has(KEY),false,`categoria deve permanecer ausente: ${name}`);
}
console.log('S27_LEITOR_IDS_REJEITADOS',JSON.stringify({casos:invalid.map(([k])=>k),alteracoes:0}));

// Caso positivo com notas em duas subdivisões existentes (inclusive uma de outro artigo).
const otherArticle=env.AGU_LEGAL_CORPUS.laws.flatMap(l=>l.articles).find(a=>a.id!==good.article);
const another=otherArticle?.clauses[0]?.id;
assert.ok(another,'corpus oficial deve conter artigo distinto');
const valid={...good,notes:{[UNIT]:'Anotação sintética válida', [another]:'Nota sintética preservada em outro artigo'}};
assert.equal(env.AGUBackup20.validateRecord(KEY,valid),true);
const json=wrap(valid),expected=JSON.stringify(valid),before=digest(expected);
assert.equal(env.AGUBackup20.importMissing(json).added,1);
assert.equal(digest(records.get(KEY)),before);
for(const file of ['leitor-juridico.js'])
 vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),env,{filename:file});
const loaded=env.AGULegal.peek();
assert.equal(loaded.article,good.article);
assert.equal(loaded.unit,good.unit);
assert.equal(loaded.notes[UNIT],valid.notes[UNIT]);
assert.equal(loaded.notes[another],valid.notes[another]);
assert.equal(env.AGUBackup20.importMissing(json).added,0,'reimportação idempotente');
records.set(KEY,expected+' ');
assert.equal(env.AGUBackup20.importMissing(json).added,0,'não sobrescrever dados preexistentes');
assert.equal(records.get(KEY),expected+' ');
console.log('S27_LEITOR_VALIDO_PRESERVADO',JSON.stringify({sha256:before,notas:2,idempotente:true}));
