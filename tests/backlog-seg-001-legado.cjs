'use strict';
const assert=require('node:assert/strict'),crypto=require('node:crypto'),delta=require('./fixtures/backlog-seg-001.json');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
// Só o delta registrado desta sprint é retirado antes das verificações históricas.
module.exports=(s,file)=>{const d=delta[file];if(!d)return s;assert.equal(hash(s),d.after,'BACKLOG-SEG-001: somente o delta registrado; entrada exata '+file);for(const c of [...d.changes].reverse()){assert.equal(s.split(c.after).length,2,'BACKLOG-SEG-001 trecho único '+file);s=s.replace(c.after,c.before)}assert.equal(hash(s),d.before,'BACKLOG-SEG-001 restituição exata '+file);return s};
