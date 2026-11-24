/* Autoriza somente o delta versionado do backup; fixtures históricas não mudam. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const delta=require('./fixtures/metodo-agu/backup-engine-delta.json'),hash=s=>crypto.createHash('sha256').update(s).digest('hex');
module.exports=function(file,previous){
 if(file!=='backup-local-s20.js')return previous;
 assert.equal(previous,delta.before,'Baseline histórico do backup divergiu');
 let source=fs.readFileSync(path.join(__dirname,'..',file),'utf8');const originalHash=hash(source),q=require('./fixtures/questoes-agu-002-backup-delta.json');
 if(originalHash!==delta.after){assert.equal(originalHash,q.after,'Backup fora do delta QUESTOES-AGU-002');assert.equal(source.split(q.added).length,2);source=source.replace(q.added,'');}
 assert.equal(hash(source),delta.after,'Backup diverge do delta MÉTODO-AGU-003');
 for(const change of [...delta.changes].reverse()){assert.equal(source.split(change.after).length,2,'Trecho alterado deve ser único');source=source.replace(change.after,change.before)}
 assert.equal(hash(source),delta.before,'Código histórico fora do delta não foi preservado');return originalHash;
};
