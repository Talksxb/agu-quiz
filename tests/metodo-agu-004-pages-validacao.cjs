/* Executa o verificador HTTP real com respostas artificiais byte a byte. */
'use strict';
const assert=require('node:assert/strict'),path=require('node:path'),cp=require('node:child_process');
const ROOT=path.resolve(__dirname,'..');
const harness=String.raw`
const fs=require('node:fs'),path=require('node:path');
const mode=process.argv[1];
global.setTimeout=fn=>{queueMicrotask(fn);return 1};
global.fetch=async url=>{
 const name=new URL(url).pathname.replace(/^\/agu-quiz\//,'')||'index.html';
 let bytes=fs.readFileSync(path.join(process.cwd(),name));
 if(mode==='divergente'&&name==='backup-local-s20.js')bytes=Buffer.concat([bytes,Buffer.from('/* diferença artificial */')]);
 return new Response(bytes,{status:200,headers:{etag:'fixture'}});
};
require('./tests/sprint21-pages.cjs');
`;
for(const mode of ['alinhado','divergente']){
 const r=cp.spawnSync(process.execPath,['-e',harness,mode],{cwd:ROOT,encoding:'utf8',timeout:15000});
 assert.equal(r.error,undefined);assert.equal(r.status,mode==='alinhado'?0:1,'verificador '+mode+': '+r.stdout+r.stderr);
 if(mode==='alinhado')assert.match(r.stdout,/PAGES_VERIFICADO/);else assert.match(r.stderr,/hash do asset diverge backup-local-s20.js/);
 console.log('METODO_AGU_004_PAGES_FIXTURE_OK',mode);
}
