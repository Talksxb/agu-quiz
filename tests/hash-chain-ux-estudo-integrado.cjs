/* Delta de UX encadeado ao checkout integrado; fixtures históricas não são regravadas. */
'use strict';
const assert=require('node:assert/strict'),delta=require('./fixtures/ux-estudo-integrado-01-delta.json');
const next=require('./hash-chain-ux-estudo-integrado-02.cjs');
module.exports=function afterUxStudy(file,previous){
 const change=delta.changed[file];if(!change)return next(file,previous);
 assert.equal(previous,change.before,'UX ESTUDO 01: baseline incompatível em '+file);
 return next(file,change.after);
};
