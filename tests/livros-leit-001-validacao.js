/* LIVROS-LEIT-001 — proteção editorial, navegação e estado legado. */
'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),get=p=>fs.readFileSync(path.join(root,p),'utf8');
const works=[
{file:'livros/lgpd-adm64b.json',id:'lgpd-adm64b',count:24,minWords:12000,start:'LGPD aplicada à Administração Pública',end:'16.3 Registro editorial'},
{file:'livros/adm-53.json',id:'adm-53',count:20,minWords:7500,start:'Responsabilidade patrimonial',end:'Lacunas e controle de edição'},
{file:'livros/adm-54.json',id:'adm-54',count:17,minWords:6500,start:'Agentes públicos e a natureza',end:'fontes'}
];
for(const w of works){
 const b=JSON.parse(get(w.file));
 assert.equal(b.id,w.id);assert.equal(b.pages.length,w.count);
 assert.ok(b.pages.every(p=>typeof p.text==='string'&&p.text.trim().length>100),'sem páginas ou seções vazias');
 const all=b.pages.map(p=>p.text).join('\n');
 assert.ok(all.includes(w.start));assert.ok(all.toLowerCase().includes(w.end.toLowerCase()));
 assert.ok(all.trim().split(/\s+/).length>=w.minWords,'volume do capítulo deve ser preservado');
 assert.match(b.verification,/sem certificação integral/i);
}
const html=get('livros-agu.html'),main=get('index.html'),lab=get('laboratorio-leitura.html');
assert.match(html,/lang="pt-BR"/);
assert.match(html,/agu_livros_reader_v1/);
assert.match(html,/Direito Ambiental/);
assert.match(html,/disabled><strong>Direito Ambiental/,'Ambiental não pode ser rotulado como livro publicado');
assert.match(html,/sem sincronização com Caderno/);
assert.match(html,/hist[oó]rico|progresso/);
assert.match(main,/<a class="hub-entry hub-book" href="livros-agu.html">/);
assert.match(lab,/href="livros-agu.html"/);
assert.equal((main.match(/href="livros-agu.html"/g)||[]).length,1);
const js=html.match(/<script>([\s\S]*?)<\/script>/);
assert.ok(js);new vm.Script(js[1],{filename:'livros-agu.html'});
assert.doesNotMatch(html,/api[_-]?key/i);
assert.doesNotMatch(html,/talksxb\/agu-auditoria\/raw/);
assert.doesNotMatch(html,/openai\.com\/v1/);
const legacy=require('./livro-sites-001-legado.cjs')();
assert.match(legacy,/^[0-9a-f]{64}$/);
console.log('LIVROS_LEIT_001_NODE_OK: três fontes integrais, biblioteca, sintaxe, estado isolado e digest histórico.');
