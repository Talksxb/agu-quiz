/* INTERFACE-AGU-002: reverte somente a apresentação antes dos hashes legados. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const delta=require('./fixtures/interface-agu-002-delta.json');
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
module.exports=function readerBeforeInterface002(){
 let source=fs.readFileSync(path.join(__dirname,'..','leitor-juridico.js'),'utf8');
 assert.equal(hash(source),delta.afterSha256,'leitor atual fora do delta INTERFACE-AGU-002');
 for(const part of [...delta.changes].reverse()){
  assert.equal(source.split(part.after).length,2,'substituição visual não única');
  source=source.replace(part.after,part.before);
 }
 assert.equal(hash(source),delta.beforeSha256,'leitor anterior deve ser restituído integralmente');
 return hash(source);
};
