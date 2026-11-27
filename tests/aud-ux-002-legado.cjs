'use strict';
const assert=require('node:assert/strict'),crypto=require('node:crypto');
const delta=require('./fixtures/aud-ux-002-review-delta.json');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
module.exports=source=>{
 source=require('./backlog-seg-001-legado.cjs')(source,'revisao-inteligente.js');
 // AUD-UX-005: reverte somente a descrição do contador, antes dos hashes históricos.
 const prior="<div class=\"muted\">Revisões vencidas</div><div class=\"metric\">'+sum.due+'</div><div class=\"small muted\">Novos flashcards: ",current="<div class=\"muted\">Revisões com prazo até hoje</div><div class=\"metric\">'+sum.due+'</div><div class=\"small muted\">Cartões e referências oficiais com data; não é o tamanho da fila.</div><div class=\"small muted\">Novos flashcards: ";
 assert.equal(source.split(current).length,2,'AUD-UX-005: somente o delta de rótulo deve ser único');
 assert.equal(source.includes(prior),false,'Rótulo antigo não deve coexistir');
 source=source.replace(current,prior);
 assert.equal(hash(source),delta.after,'AUD-UX-002: somente o delta explícito de apresentação é permitido');
 for(const change of [...delta.changes].reverse()){
  assert.equal(source.split(change.after).length,2,'AUD-UX-002: trecho alterado deve ser único');
  source=source.replace(change.after,change.before);
 }
 assert.equal(hash(source),delta.before,'AUD-UX-002: motor anterior deve ser restituído byte a byte');
 return source;
};
