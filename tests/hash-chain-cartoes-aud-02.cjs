/* Conecta o baseline realmente integrado após CÓDIGOS-CC-CPC-01 ao delta CARTOES-AUD-02. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const delta=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/cartoes-aud-02-delta.json')));
const biblioteca=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/biblioteca-leis-02-deltas.json')));
const afterCartoes03=require('./hash-chain-cartoes-aud-03.cjs');
module.exports=function afterCartoes02(file,previous){
 if(file==='index.html'){
  if(previous===biblioteca.changed['index.html'].after){
   assert.equal(delta.htmlBeforeSha256,biblioteca.changed['index.html'].before,'Base histórica CÓDIGOS/Cartões02');
   return afterCartoes03(file,previous);
  }
  assert.equal(previous,delta.htmlBeforeSha256,'CARTOES02 HTML: baseline incompatível');
  return afterCartoes03(file,biblioteca.changed['index.html'].after);
 }
 if(file==='revisao-inteligente.js'){
  assert.equal(previous,delta.reviewBeforeSha256,'CARTOES02 motor: baseline incompatível');
  return afterCartoes03(file,delta.reviewAfterSha256);
 }
 return previous;
};
