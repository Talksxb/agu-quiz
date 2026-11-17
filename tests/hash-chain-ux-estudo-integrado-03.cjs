'use strict';
const assert=require('node:assert/strict'),delta=require('./fixtures/ux-estudo-integrado-03-delta.json');
module.exports=function afterUx03(file,previous){
 const change=delta.changed[file];if(!change)return previous;
 assert.equal(previous,change.before,'UX ESTUDO 03: baseline incompatível em '+file);return change.after;
};
