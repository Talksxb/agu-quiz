'use strict';
const fs=require('fs'),vm=require('vm'),assert=require('assert/strict'),path=require('path');
const db=new Map(),x={Blob,URL,URLSearchParams,Date,console,document:{getElementById:()=>null},localStorage:{getItem:k=>db.get(k)??null,setItem:(k,v)=>db.set(k,v),removeItem:k=>db.delete(k)}};x.window=x;vm.createContext(x);
for(const f of ['dados/questoes-vigentes-gov003.js','questoes-vigentes.js','backup-local-s20.js'])vm.runInContext(fs.readFileSync(path.join(__dirname,'..',f),'utf8'),x,{filename:f});
const key='agu_gov_003_treino_vigente_v1',q=x.AGUCurrentQuestions.items[0],h={schema:1,attempts:[{id:'fixture-attempt-001',question:q.id,selected:q.currentKey,correct:true,date:'2026-11-25T12:00:00Z'}]},raw=JSON.stringify(h);
assert.equal(x.AGUVigenteContract.KEY,key);assert.equal(x.AGUBackup20.keys().length,11);assert.ok(x.AGUBackup20.keys().some(y=>y.key===key));
db.set(key,raw);const b=x.AGUBackup20.capture();assert.equal(b.items[key],raw);db.delete(key);assert.equal(x.AGUBackup20.importMissing(b).added,1);assert.equal(db.get(key),raw);assert.equal(x.AGUBackup20.importMissing(b).added,0);
const prior=JSON.stringify({schema:1,attempts:[]});db.set(key,prior);assert.equal(x.AGUBackup20.importMissing(b).added,0);assert.equal(db.get(key),prior,'não substituir histórico existente');
const bad=JSON.parse(raw);bad.attempts[0].correct=false;assert.equal(x.AGUBackup20.validateRecord(key,bad),false);assert.throws(()=>x.AGUBackup20.importMissing({...b,items:{[key]:JSON.stringify(bad)}}));assert.equal(db.get(key),prior);
for(const file of Object.keys(require('./fixtures/aud-ux-003-delta.json'))){const s=fs.readFileSync(path.join(__dirname,'..',file),'utf8');require('./aud-ux-003-legado.cjs')(s,file);assert.throws(()=>require('./aud-ux-003-legado.cjs')(s+'\n',file));}
console.log('AUD_UX_003_CONTRACT_OK: contrato único, 11 categorias, roundtrip, não substituição, idempotência e rejeição de chave/correção inválida');
