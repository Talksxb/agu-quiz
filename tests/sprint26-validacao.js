/* Sprint 26 — rejeição não destrutiva de anotação não textual no backup do Leitor.
 * VM com módulos reais, apenas dados sintéticos. Sem histórico de usuário ou rede.
 */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm'),crypto=require('node:crypto'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),KEY='agu_leitor_juridico_s13_v1',UNIT='CF88:art37:caput';
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
const load=stored=>{
 const map=new Map(stored||[]),doc={getElementById(){return null},createElement(){return {id:'',textContent:''}},head:{appendChild(){}}};
 const env={Blob,document:doc,window:null,localStorage:{getItem:k=>map.has(k)?map.get(k):null,setItem:(k,v)=>map.set(k,String(v)),removeItem:k=>map.delete(k)}};
 env.window=env;vm.createContext(env);
 for(const file of ['dados/legislacao-s13.js','leitor-juridico.js','backup-local-s20.js'])vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),env,{filename:file});
 return {env,map};
};
const reader=notes=>({article:'CF88:art37',unit:UNIT,tab:'comentarios',mobile:'related',notes});
const bundle=record=>JSON.stringify({schema:'agu-portable-local-s20-v1',version:1,createdAt:'2026-11-13T00:00:00.000Z',items:{[KEY]:JSON.stringify(record)}});

// Antes da S26, o validador aceitava objeto e a UI exibia literalmente [object Object].
const {env,map}=load(new Map([['agu_quiz_mvp1_2026','sentinela-sintetica']]));
const invalid=[{texto:'anotacao_nao_textual'},null,123,['frase'],{html:'<img>'},'a'.repeat(14001)];
for(const value of invalid){
 const record=reader({[UNIT]:value}),raw=bundle(record);
 assert.equal(env.AGUBackup20.validateRecord(KEY,record),false,'valor não textual ou excessivo deve falhar');
 assert.throws(()=>env.AGUBackup20.validateBundle(raw),/Categoria inválida/);
 assert.throws(()=>env.AGUBackup20.importMissing(raw),/Categoria inválida/);
 assert.equal(map.get('agu_quiz_mvp1_2026'),'sentinela-sintetica','não alterar dados preexistentes');
 assert.equal(map.has(KEY),false,'não criar categoria contaminada');
}
console.log('S26_LEITOR_REJEICAO_OK',JSON.stringify({valores_invalidos:invalid.length,escritas:0}));

// Comportamento positivo: texto de limite real do Leitor (até 14.000 caracteres).
const valid=reader({[UNIT]:'Revisão e distinção jurídica — '.repeat(500).slice(0,14000)});
assert.equal(env.AGUBackup20.validateRecord(KEY,valid),true);
const raw=bundle(valid),parsed=env.AGUBackup20.validateBundle(raw);
assert.equal(parsed.schema,'agu-portable-local-s20-v1');
const first=env.AGUBackup20.importMissing(raw);
assert.equal(first.added,1);
const expected=JSON.stringify(valid);
assert.equal(hash(map.get(KEY)),hash(expected));
assert.equal(env.AGUBackup20.importMissing(raw).added,0,'reimportação idempotente');
const old=map.get(KEY);map.set(KEY,old+' ');
assert.equal(env.AGUBackup20.importMissing(raw).added,0,'não sobrescrever categoria presente');
assert.equal(map.get(KEY),old+' ');
assert.equal(map.get('agu_quiz_mvp1_2026'),'sentinela-sintetica');
console.log('S26_LEITOR_VALIDO_OK',JSON.stringify({caracteres:valid.notes[UNIT].length,sha256:hash(expected),idempotente:true,preservado:true}));
console.log('Sprint 26: anotações inválidas rejeitadas e texto válido restaurado sem perda.');
