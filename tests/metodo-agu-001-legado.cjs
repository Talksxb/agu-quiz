/* Delta exato da navegação. Nenhuma mudança fora dos três cartões é normalizada. */
'use strict';
const assert=require('node:assert/strict'),crypto=require('node:crypto');
const delta=require('./fixtures/metodo-agu/nav-delta.json');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
module.exports=html=>{assert.equal(hash(html),delta.after,'HTML diverge do delta MÉTODO-AGU-001');assert.equal(html.split(delta.afterTiles).length,2);let old=html.replace(delta.afterTiles,delta.beforeTiles);for(const s of delta.extraIncludes||[]){assert.equal(old.split(s).length,2);old=old.replace(s,'')}assert.equal(hash(old),delta.before,'Mudança além dos cartões/adaptador');return old};
module.exports.review=function(js){const d=require('./fixtures/metodo-agu/review-delta.json');assert.equal(hash(js),d.after,'Motor diverge do adaptador explícito');for(const c of [...d.changes].reverse()){assert.equal(js.split(c.after).length,2);js=js.replace(c.after,c.before)}assert.equal(hash(js),d.before,'Código anterior do motor não foi preservado');return js};
