const fs = require('node:fs');
const assert = require('node:assert/strict');
const html = fs.readFileSync(require('node:path').join(__dirname,'..','index.html'),'utf8');

const method = fs.readFileSync(require('node:path').join(__dirname,'..','livros-agu.html'),'utf8');
assert.match(html, /<a class="hub-entry hub-book" href="livros-agu.html"><b>Método AGU<\/b>/);
assert.match(method, /href="https:\/\/leitura-agu-caderno-2026\.aleixo-taw\.chatgpt\.site\/"/);
assert.doesNotMatch(html, /hub-book[^>]*aria-label=/, 'O nome acessível deve incluir todo o rótulo visível');
assert.match(method, /ADM-53/);
assert.match(html, /rel="noopener noreferrer"/);
assert.match(html, /\.hub-book\{background:/);

const forbidden = [/\/api\/livro/, /AGU_MATRIZ_CURRICULAR_2022_v3\.json.*apostila/i, /LIVRO-VIS-001_v0\.2_LEITURA_RESPONSIVA\.html/];
for (const token of forbidden) assert.doesNotMatch(html,token);
console.log('LIVRO-SITES-001: link público do leitor, card do Quiz e ausência de conteúdo privado — PASSOU.');
