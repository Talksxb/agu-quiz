/* LIVROS-EDITOR-001 — teste documental não destrutivo; rodar: node tests/livros-editor-001-fidelidade.cjs */
'use strict';
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const root=path.resolve(__dirname,'..'),read=p=>fs.readFileSync(path.join(root,p),'utf8');
const md=read('livros/fontes/amb-03.md'),json=JSON.parse(read('livros/amb-03.json')),html=read('livros/livro-amb-001-original.html');
const blob=s=>crypto.createHash('sha1').update('blob '+Buffer.byteLength(s)+'\0'+s).digest('hex');
assert.equal(blob(html),'b12e615a3afe3762ead34455e6d25aeb1d4fce81','HTML alterado');
assert.equal(blob(read('livros/amb-03.json')),'1ef017d5766fdf75f47abbd27d333f844c6d91d6','JSON publicado alterado');
assert.equal(json.pages.length,17);
assert.equal((md.match(/^# /gm)||[]).length,1,'apenas um H1');
const norm=s=>s.replace(/<[^>]*>/g,' ').replace(/&nbsp;|&#160;/gi,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
const headings=[...html.matchAll(/<h([12])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map(m=>norm(m[2]));
assert.equal(headings.length,17,'1 H1 + 16 H2 no HTML');
for(let i=0;i<17;i++){
 const n=String(i+1).padStart(2,'0'),begin='<!-- AGU_EDITOR_SECTION_START:'+n+' -->\n',end='\n<!-- AGU_EDITOR_SECTION_END:'+n+' -->';
 const a=md.indexOf(begin),b=md.indexOf(end,a+begin.length);
 assert.ok(a>=0&&b>a,'faltou o bloco '+n);
 assert.equal(md.slice(a+begin.length,b),json.pages[i].text,'texto modificado no bloco '+n);
 assert.equal(norm((json.pages[i].text.match(/^#{1,4}\s+(.+)$/m)||[])[1]||''),headings[i],'ordem dos cabeçalhos '+n);
}
assert.equal((html.match(/<svg\b/gi)||[]).length,4);
assert.equal((html.match(/<table\b/gi)||[]).length,2);
for(let i=1;i<=4;i++)assert.match(md,new RegExp('Figura V'+i+' —'),'faltou descrição SVG '+i);
for(let i=1;i<=2;i++)assert.match(md,new RegExp('Tabela T'+i+' —'),'faltou tabela '+i);
assert.equal((json.pages[11].text.match(/### Questão \d+/g)||[]).length,8);
assert.equal(json.curricular_id,'AMB-03');
assert.ok(!md.includes('certificado integralmente pela auditoria: sim'),'certificação inventada');
console.log('LIVROS_EDITOR_001_OK: 17 blocos idênticos, 1 H1/16 H2, 8 questões, 4 SVG e 2 tabelas referenciados, fontes JSON/HTML intocadas');
