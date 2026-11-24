/* QUESTOES-AGU-001 — reversão exata e encadeada, sem alterar fixture anterior. */
'use strict';
const assert=require('node:assert/strict'),crypto=require('node:crypto');
const d=require('./fixtures/questoes-agu-001-delta.json');
const hash=x=>crypto.createHash('sha256').update(x).digest('hex');
module.exports=html=>{html=require('./questoes-agu-002-legado.cjs')(html);if(hash(html)===d.before)return html;assert.equal(hash(html),d.after,'HTML fora do delta QUESTOES-AGU-001');for(const x of [...d.changes].reverse()){assert.equal(html.split(x.after).length,2,'delta deve ser único');html=html.replace(x.after,x.before)}assert.equal(hash(html),d.before);return html};
