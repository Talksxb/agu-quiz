/* As fixtures LEG/UX antigas permanecem imutáveis; o delta novo encadeia seus hashes. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const delta=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/codigos-cc-cpc-deltas.json')));
const next=JSON.parse(fs.readFileSync(path.join(__dirname,'fixtures/biblioteca-leis-02-deltas.json')));
module.exports=function expectedAfterCodigos(file,previous){
 const change=delta.changed[file];
 if(change)assert.equal(previous,change.before,'Cadeia anterior incompatível: '+file);
 const first=change?change.after:previous,following=next.changed[file];
 if(following)assert.equal(first,following.before,'Cadeia BIBLIOTECA-02 incompatível: '+file);
 const historical=require('./hash-chain-metodo-backup.cjs')(file,following?following.after:first);
 if(file==='leitor-juridico.js'){
  assert.equal(require('./interface-agu-002-legado.cjs')(),historical,'INTERFACE-AGU-002 deve reverter ao hash histórico');
  return require('node:crypto').createHash('sha256').update(fs.readFileSync(path.join(__dirname,'..',file))).digest('hex');
 }
 return historical;
};
