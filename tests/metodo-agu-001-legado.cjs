/* Delta exato da navegação. Nenhuma mudança fora dos três cartões é normalizada. */
'use strict';
const assert=require('node:assert/strict'),crypto=require('node:crypto');
const delta=require('./fixtures/metodo-agu/nav-delta.json');
const hash=s=>crypto.createHash('sha256').update(s).digest('hex');
module.exports=html=>{html=require('./interface-agu-001-legado.cjs')(html);const backup=require('./fixtures/metodo-agu/backup-nav-delta.json');assert.equal(hash(html),backup.after,'HTML diverge do delta de backup MÉTODO-AGU-003');for(const c of [...backup.changes].reverse()){assert.equal(html.split(c.after).length,2);html=html.replace(c.after,c.before)}assert.equal(hash(html),backup.before,'Mudança além da carga do contrato e da rota de backup');assert.equal(hash(html),delta.after,'HTML diverge do delta MÉTODO-AGU-001');assert.equal(html.split(delta.afterTiles).length,2);let old=html.replace(delta.afterTiles,delta.beforeTiles);for(const s of delta.extraIncludes||[]){assert.equal(old.split(s).length,2);old=old.replace(s,'')}assert.equal(hash(old),delta.before,'Mudança além dos cartões/adaptador');return old};
module.exports.review=function(js){js=module.exports.reverseReviewA11y(js);const d=require('./fixtures/metodo-agu/review-delta.json');assert.equal(hash(js),d.after,'Motor diverge do adaptador explícito');for(const c of [...d.changes].reverse()){assert.equal(js.split(c.after).length,2);js=js.replace(c.after,c.before)}assert.equal(hash(js),d.before,'Código anterior do motor não foi preservado');return js};

// UX-AGU-006-A11Y-001: somente o papel semântico do verso, reversível byte a byte.
module.exports.reverseReviewA11y=function(js){
 js=require('./aud-ux-001-legado.cjs')(js);
 const before="<div class=\"agu-deck-surface agu-deck-back\" aria-label=\"Verso do cartão\">",after="<div class=\"agu-deck-surface agu-deck-back\" role=\"group\" aria-label=\"Verso do cartão\">";
 assert.equal(js.split(after).length,2,'Papel ARIA do verso deve ser único');
 assert.equal(js.includes(before),false,'Verso genérico antigo não deve coexistir');
 const filterBefore="<div class=\"agu-deck-filters\" aria-label=\"Filtrar baralhos\">",filterAfter="<div class=\"agu-deck-filters\" role=\"group\" aria-label=\"Filtrar baralhos\">";
 assert.equal(js.split(filterAfter).length,2,'Papel ARIA dos filtros deve ser único');
 assert.equal(js.includes(filterBefore),false,'Filtro genérico antigo não deve coexistir');
 const restored=js.replace(filterAfter,filterBefore).replace(after,before);
 assert.equal(hash(restored),require('./fixtures/metodo-agu/review-delta.json').after,'Motor fora do delta semântico autorizado');
 return restored;
};
