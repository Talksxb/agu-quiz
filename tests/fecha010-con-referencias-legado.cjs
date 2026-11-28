'use strict';
const assert=require('node:assert/strict'),crypto=require('node:crypto');
const gitBlob=s=>crypto.createHash('sha1').update('blob '+Buffer.byteLength(s)+'\0').update(s).digest('hex');
module.exports=s=>{
 assert.equal(gitBlob(s),'01c3064aaefdcd90a83a63c4706f59fc4a43fa3a','FECHA-010 referências exatas');
 const prefix='/* Gerado dos índices publicados; não contém dados do estudante. */\nwindow.AGU_METHOD_BOOK_REFERENCES = ';
 assert.ok(s.startsWith(prefix));const expanded=JSON.parse(s.slice(prefix.length).replace(/;\s*$/,''));
 assert.equal(Object.keys(expanded.chapters).length,8);const added=expanded.chapters['con-v1'];assert.equal(added.edition,'0.9.6');assert.equal(added.curricularIds.length,17);assert.equal(added.sections.length,13);assert.equal(added.activities.length,85);delete expanded.chapters['con-v1'];
 const prior=prefix+JSON.stringify(expanded,null,2)+';\n';assert.equal(gitBlob(prior),'e29b30578f0fac06a4f25fa22539348e1812a609','FECHA-010 restituição exata do índice legado');return prior;
};
