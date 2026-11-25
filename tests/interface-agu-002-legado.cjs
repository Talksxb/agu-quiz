/* INTERFACE-AGU-002: reverte somente a apresentação antes dos hashes legados. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const delta=require('./fixtures/interface-agu-002-delta.json');
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
module.exports=function readerBeforeInterface002(){
 let source=fs.readFileSync(path.join(__dirname,'..','leitor-juridico.js'),'utf8');
 const next=require('./fixtures/interface-agu-003-delta.json');
 assert.equal(hash(source),next.afterSha256,'leitor atual fora do delta INTERFACE-AGU-003');
 assert.equal(source.split(next.addedCss).length,2,'bloco visual 003 único');
 source=source.replace(next.addedCss,'');
 assert.equal(source.split('css+codeCss+reflowCss+readerPlumCss;').length,2,'injeção visual 003 única');
 source=source.replace('css+codeCss+reflowCss+readerPlumCss;','css+codeCss+reflowCss;');
 assert.equal(source.split('max-width:1100px').length-1,next.breakpointCount,'quantidade de breakpoints 003');
 source=source.replaceAll('max-width:1100px','max-width:850px');
 assert.equal(hash(source),next.beforeSha256,'leitor 002 restituído integralmente');
 assert.equal(hash(source),delta.afterSha256,'leitor atual fora do delta INTERFACE-AGU-002');
 for(const part of [...delta.changes].reverse()){
  assert.equal(source.split(part.after).length,2,'substituição visual não única');
  source=source.replace(part.after,part.before);
 }
 assert.equal(hash(source),delta.beforeSha256,'leitor anterior deve ser restituído integralmente');
 return hash(source);
};
