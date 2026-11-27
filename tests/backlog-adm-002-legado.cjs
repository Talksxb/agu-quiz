'use strict';
const assert=require('assert/strict'),crypto=require('crypto'),delta=require('./fixtures/backlog-adm-002.json');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
module.exports=(s,file)=>{const d=delta[file];if(!d)return s;assert.equal(hash(s),d.after,'BACKLOG-ADM-002 entrada exata '+file);for(const c of [...d.changes].reverse()){assert.equal(s.split(c.after).length,2);s=s.replace(c.after,c.before)}assert.equal(hash(s),d.before,'BACKLOG-ADM-002 restituição exata '+file);return s};
