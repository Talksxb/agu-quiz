'use strict';
const assert=require('assert/strict'),crypto=require('crypto'),d=require('./fixtures/aud-ux-004-delta.json');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
module.exports=(s,file)=>{const x=d[file];if(!x)return s;assert.equal(hash(s),x.after,'AUD-UX-004 entrada exata '+file);for(const c of [...x.changes].reverse()){assert.equal(s.split(c.after).length,2);s=s.replace(c.after,c.before)}assert.equal(hash(s),x.before,'AUD-UX-004 restituição exata '+file);return s};
