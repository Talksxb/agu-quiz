'use strict';
const assert=require('node:assert/strict'),crypto=require('node:crypto');
const delta=require('./fixtures/aud-ux-001-review-delta.json');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
module.exports=source=>{
 source=require('./aud-ux-002-legado.cjs')(source);
 assert.equal(hash(source),delta.after,'AUD-UX-001: somente o delta explícito de apresentação é permitido');
 for(const change of [...delta.changes].reverse()){
  assert.equal(source.split(change.after).length,2,'AUD-UX-001: trecho alterado deve ser único');
  source=source.replace(change.after,change.before);
 }
 assert.equal(hash(source),delta.before,'AUD-UX-001: motor anterior deve ser restituído byte a byte');
 return source;
};
