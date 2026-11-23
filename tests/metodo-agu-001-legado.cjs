/* Delta exato da navegação. Nenhuma mudança fora dos três cartões é normalizada. */
'use strict';
const assert=require('node:assert/strict'),crypto=require('node:crypto');
const delta=require('./fixtures/metodo-agu/nav-delta.json');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
module.exports=html=>{assert.equal(hash(html),delta.after,'HTML diverge do delta MÉTODO-AGU-001');assert.equal(html.split(delta.afterTiles).length,2);const old=html.replace(delta.afterTiles,delta.beforeTiles);assert.equal(hash(old),delta.before,'Mudança além dos cartões');return old};
