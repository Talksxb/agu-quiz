/* Encadeia apenas o novo delta à main com CARTOES02 e BIBLIOTECA02 integrados. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const delta=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/cartoes-aud-03-delta.json')));
module.exports=function afterCartoes03(file,previous){
 if(file==='index.html'){
  assert.equal(previous,delta.htmlBeforeSha256,'CARTOES03 HTML: main integrada divergiu');
  return delta.htmlAfterSha256;
 }
 if(file==='revisao-inteligente.js'){
  assert.equal(previous,delta.reviewBeforeSha256,'CARTOES03 motor: main integrada divergiu');
  const method=require('./fixtures/metodo-agu/review-delta.json');
  assert.equal(delta.reviewAfterSha256,method.before,'MÉTODO parte do motor histórico exato');
  return method.after;
 }
 return previous;
};
