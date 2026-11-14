/* AGU Quiz Sprint 21 — verificação externa REAL do Pages via HTTP.
 * URL proveniente de logs GitHub Actions Pages run 43346114364, job deploy 131625843932.
 * Execução: node tests/sprint21-pages.cjs
 */
'use strict';
const fs=require('node:fs'),crypto=require('node:crypto'),path=require('node:path'),assert=require('node:assert/strict');
const BASE='https://talksxb.github.io/agu-quiz/';
const scripts=['revisao-inteligente.js','planejamento-semanal.js','leitor-consolidacao.js','backup-local-s20.js','leitor-juridico.js','meu-estudo.js','dados/legislacao-s13.js','estudo-integrado.js'];
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
const delay=n=>new Promise(ok=>setTimeout(ok,n));
async function get(url){
 const ctl=new AbortController(),timer=setTimeout(()=>ctl.abort(),20000);
 try{
  const r=await fetch(url,{cache:'no-store',signal:ctl.signal,headers:{'User-Agent':'AGUQuiz-S21-Verify/1.0','Cache-Control':'no-cache'}});
  if(!r.ok)throw Error('HTTP '+r.status+' '+url);
  const body=Buffer.from(await r.arrayBuffer());
  console.log('HTTP',r.status,new URL(url).pathname,'bytes',body.length,
   'etag',r.headers.get('etag'),'cache-control',r.headers.get('cache-control'),
   'sha256',sha(body));
  return body;
 }finally{clearTimeout(timer)}
}
async function main(){
 const home=fs.readFileSync(path.join(__dirname,'../index.html'));
 for(let attempt=1;attempt<=7;attempt++){
  try{
   const remote=await get(BASE+'?agu_verify='+Date.now());
   const markup=remote.toString('utf8');
   if(!markup.includes('backup-local-s20.js?v=20261113-s27a'))throw Error('HTML sem a versão esperada');
   if(!markup.includes('leitor-juridico.js?v=20261114-leg05'))throw Error('HTML sem a versão nova do Leitor');
   if(!markup.includes('leitor-consolidacao.js?v=20261113-leg02'))throw Error('HTML sem a versão nova de Consolidação');
   if(sha(remote)!==sha(home))throw Error('HTML remoto difere do checkout main, possível cache/propagação');
   for(const script of scripts){
    const m=markup.match(new RegExp('<script src="'+script.replaceAll('.','\\.')+'\\?v=([^"]+)"'));
    assert.ok(m,'script não listado '+script);
    assert.equal(m[1],script==='meu-estudo.js'?'20261113-work01b':script==='backup-local-s20.js'?'20261113-s27a':script==='estudo-integrado.js'?'20261113-leg01':script==='leitor-consolidacao.js'?'20261113-leg02':script==='dados/legislacao-s13.js'?'20261114-leg06':script==='leitor-juridico.js'?'20261114-leg05':'20261113-s35a','versão de cache '+script);
    const remoteJs=await get(BASE+script+'?v='+m[1]);
    const local=fs.readFileSync(path.join(__dirname,'..',script));
    assert.equal(sha(remoteJs),sha(local),'hash do asset diverge '+script);
   }
   console.log('PAGES_VERIFICADO: URL HTTPS, HTML e 8 scripts correspondem ao commit do checkout.');
   return;
  }catch(e){
   console.error('Pages tentativa',attempt,'falhou:',e.message);
   if(attempt===7)throw e;
   await delay(5000);
  }
 }
}
main().catch(e=>{console.error('PAGES_FALHA:',e.message);process.exitCode=1});

