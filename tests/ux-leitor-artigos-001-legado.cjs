'use strict';
const assert=require('assert/strict'),crypto=require('crypto'),d=require('./fixtures/ux-leitor-artigos-001.json');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
module.exports=s=>{assert.equal(hash(s),d.after,'Leitor fora do delta UX-LEITOR-ARTIGOS-001');assert.ok(s.endsWith(d.appended));s=s.slice(0,-d.appended.length);assert.equal(hash(s),d.before);return s};
