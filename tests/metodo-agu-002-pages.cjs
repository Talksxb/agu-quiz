/* Conferência HTTP da edição publicada. Não altera armazenamento nem avalia cartões. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(__dirname,'artifacts-metodo-agu');
const BASE=(process.env.AGU_TEST_URL||'https://talksxb.github.io/agu-quiz/').replace(/\/?$/,'/');
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const read=p=>JSON.parse(fs.readFileSync(path.join(ROOT,p),'utf8'));
const catalog=read('livros/catalogo.json'),chapters=catalog.disciplines.flatMap(d=>d.chapters);
const files=new Set(['index.html','livros-agu.html','laboratorio-leitura.html','metodo-agu.js','metodo-agu.css','metodo-agu-progresso.js','dados/metodo-agu-referencias.js','backup-local-s20.js','revisao-inteligente.js','dados/flashcards-editoriais.js','dados/questoes-agu-2023.js','livros/catalogo.json',...catalog.collections]);
for(const p of ['simulados-agu.js','simulados-agu-ui.js','simulados-agu.css','dados/simulados-agu.json'])files.add(p);
for(const c of chapters){
 files.add(c.reader);files.add(c.method);
 const data=read(c.method);files.add(data.canonical);
 if(data.reader.original_html)files.add(data.reader.original_html);
 for(const r of data.resources)if(r.src)files.add(r.src);
}
for(const p of files)assert.ok(/^[a-z0-9/.-]+$/.test(p)&&!p.split('/').includes('..'),'caminho público inválido: '+p);
const wait=ms=>new Promise(resolve=>setTimeout(resolve,ms));
async function verify(){
 const results=[];
 for(const p of files){
  const response=await fetch(new URL(p,BASE),{cache:'no-store',signal:AbortSignal.timeout(20000),headers:{'Cache-Control':'no-cache','User-Agent':'AGUQuiz-Metodo-002'}});
  assert.equal(response.status,200,'HTTP '+p);
  const body=Buffer.from(await response.arrayBuffer()),expected=sha(fs.readFileSync(path.join(ROOT,p))),actual=sha(body);
  assert.equal(actual,expected,'edição pública diverge do checkout: '+p);
  results.push({path:p,status:response.status,bytes:body.length,sha256:actual,etag:response.headers.get('etag')});
 }
 fs.mkdirSync(OUT,{recursive:true});
 fs.writeFileSync(path.join(OUT,'publicacao-http.json'),JSON.stringify({base:BASE,checkout:process.env.GITHUB_SHA||null,verifiedAt:new Date().toISOString(),chapters:chapters.map(c=>({id:c.id,edition:c.edition})),files:results},null,2)+'\n');
 console.log('METODO_AGU_002_PAGES_OK',JSON.stringify({chapters:chapters.length,files:results.length,base:BASE}));
}
async function main(){
 for(let attempt=1;attempt<=24;attempt++){
  try{await verify();return}catch(e){console.error('Pages Método tentativa '+attempt+': '+e.message);if(attempt===24)throw e;await wait(5000)}
 }
}
main().catch(e=>{console.error(e.stack||e);process.exitCode=1});
