'use strict';
const fs=require('node:fs'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const read=p=>fs.readFileSync(p,'utf8'),json=p=>JSON.parse(read(p)),sha=s=>crypto.createHash('sha256').update(s).digest('hex');
const md=read('livros/fontes/amb-06.md'),m=json('livros/editorial/amb-06.json'),r=json('livros/amb-06.json'),method=json('livros/metodo/amb-06.json'),cat=json('livros/catalogo.json'),coll=json('livros/colecoes/ambiental.json'),cand=json('livros/candidatos/cartoes.json');
assert.equal(sha(md),'e6eb89f75327f872b3ae3228aa53955f7a9f995072e0011fb36ce73b942842a0');
assert.equal(m.approval.inputSha256,'912eaac70b7e90b502e9c649e9789d488731c7485480d7d42954d66fe144c923');
assert.equal(method.sourceSha256,sha(md)); assert.equal(r.pages.length,16); assert.equal(method.sections.length,16);
assert.equal(md.split('AGU_EDITOR_SECTION_START:').length-1,16);
assert.equal(r.pages[12].text.split('### Q').length-1,10);
assert.deepEqual(m.curricularIds,['AMB-06']); assert.equal(m.coverage.length,4);
assert.ok(cat.disciplines.find(d=>d.id==='AMB').chapters.some(c=>c.id==='amb-06'&&c.edition==='1.1'));
assert.equal(coll.chapters.find(c=>c.editorialId==='LIVRO-AMB-004-AMB06').chapterId,'amb-06');
assert.ok(coll.chapters.some(c=>c.editorialId==='LIVRO-AMB-004'&&c.chapterId===null));
assert.equal(cand.cards.filter(c=>c.chapterId==='amb-06').length,10);
for(const c of cand.cards.filter(c=>c.chapterId==='amb-06')){assert.equal(c.status,'candidato');assert.equal(c.nature,'autoral');}
for(const p of ['livros/fontes/amb-06.md','livros/amb-06.json','livros/metodo/amb-06.json']){const s=read(p);for(const forbidden of ['Talksxb/agu-auditoria','NORM-AMB-002','32d68425856d0fa7a01c39915d87d6c57e162b77'])assert.ok(!s.includes(forbidden),'referência interna publicada em '+p);}
console.log('PUB-LIVRO-AMB-004 VALIDACAO_OK');
