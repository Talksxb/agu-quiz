'use strict';
const assert=require('node:assert/strict'),crypto=require('node:crypto'),d=require('./fixtures/aud-ux-003-delta.json');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
module.exports=(s,file)=>{
 const x=d[file];assert.ok(x,'arquivo explícito AUD-UX-003');assert.equal(hash(s),x.after,'AUD-UX-003 entrada exata: '+file);
 for(const c of [...x.changes].reverse()){assert.equal(s.split(c.after).length,2,'delta único '+file);s=s.replace(c.after,c.before)}
 assert.equal(hash(s),x.before,'AUD-UX-003 restituição exata '+file);return s;
};
