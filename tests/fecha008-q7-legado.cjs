'use strict';
const assert=require('node:assert/strict'),crypto=require('node:crypto'),d=require('./fixtures/livro-con-001-fecha008-q7-delta.json');
const gitBlob=s=>{const b=Buffer.from(s,'utf8');return crypto.createHash('sha1').update('blob '+b.length+'\0').update(b).digest('hex')};
module.exports=(s,file)=>{const c=d.files[file];assert.ok(c);assert.equal(s.split(c.after).length,2,'FECHA008 somente o delta Q7 único');assert.equal(gitBlob(s),c.afterBlob,'FECHA008 somente o delta Q7: blob de entrada');const prior=s.replace(c.after,()=>c.before);assert.equal(gitBlob(prior),c.beforeBlob,'FECHA008 somente o delta Q7: restituição literal do blob anterior');return prior};
