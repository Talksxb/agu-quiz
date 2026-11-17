'use strict';
const assert=require('node:assert/strict'),delta=require('./fixtures/ux-estudo-integrado-02-delta.json');
const next=require('./hash-chain-ux-estudo-integrado-03.cjs');
module.exports=function afterUx02(file,previous){
 const change=delta.changed[file];if(!change)return next(file,previous);
 assert.equal(previous,change.before,'UX ESTUDO 02: baseline incompatível em '+file);return next(file,change.after);
};
