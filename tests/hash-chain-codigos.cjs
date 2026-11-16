/* As fixtures LEG/UX antigas permanecem imutáveis; o delta novo encadeia seus hashes. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const delta=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/codigos-cc-cpc-deltas.json')));
module.exports=function expectedAfterCodigos(file,previous){
 const change=delta.changed[file];
 if(!change)return previous;
 assert.equal(previous,change.before,'Cadeia anterior incompatível: '+file);
 return change.after;
};
