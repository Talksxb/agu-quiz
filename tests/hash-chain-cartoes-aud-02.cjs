/* Conecta o baseline realmente integrado após CÓDIGOS-CC-CPC-01 ao delta CARTOES-AUD-02. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const delta=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/cartoes-aud-02-delta.json')));
module.exports=function afterCartoes02(file,previous){
 if(file==='index.html'){
  assert.equal(previous,delta.htmlBeforeSha256,'CARTOES02 HTML: baseline incompatível');
  return delta.htmlAfterSha256;
 }
 if(file==='revisao-inteligente.js'){
  assert.equal(previous,delta.reviewBeforeSha256,'CARTOES02 motor: baseline incompatível');
  return delta.reviewAfterSha256;
 }
 return previous;
};
