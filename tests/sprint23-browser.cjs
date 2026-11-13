/* Sprint 23 — foco, semântica, backup adversarial e não duplicação.
 * Chromium desktop real em cinco larguras; nenhum dispositivo Android físico.
 * Exclusivamente perfis efêmeros e dados fictícios, sem matriz privada.
 */
'use strict';
const {chromium}=require('playwright'),http=require('node:http'),path=require('node:path');
const fs=require('node:fs'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const ROOT=path.resolve(__dirname,'..'),sha=s=>crypto.createHash('sha256').update(s||'').digest('hex');
const server=http.createServer((req,res)=>{
 const u=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'');
 const f=path.resolve(ROOT,u||'index.html');
 if(!f.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('denied')}
 fs.readFile(f,(e,b)=>{if(e){res.writeHead(404);return res.end('not found')}
  res.writeHead(200,{'content-type':f.endsWith('.html')?'text/html;charset=utf-8':f.endsWith('.js')?'application/javascript;charset=utf-8':'application/octet-stream','cache-control':'no-store'});res.end(b)});
});
let browser;
async function main(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 console.log('S23_BROWSER_RUNTIME',JSON.stringify({node:process.version,chromium:browser.version()}));
 const origin='http://127.0.0.1:'+server.address().port+'/';
 for(const width of [320,360,390,430,1280]){
  const ctx=await browser.newContext({viewport:{width,height:860},reducedMotion:'reduce'}),page=await ctx.newPage();
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin,{waitUntil:'load'});
  await page.keyboard.press('Tab');
  const topFocus=await page.evaluate(()=>({tag:document.activeElement?.tagName,outline:getComputedStyle(document.activeElement).outlineStyle}));
  assert.equal(topFocus.tag,'BUTTON');assert.notEqual(topFocus.outline,'none');
  await page.getByRole('button',{name:'Estudar',exact:true}).click();
  assert.equal(await page.getByRole('navigation',{name:'Navegação interna de Estudar'}).count(),1);
  // Ativação real por teclado: foco-visível só é exigível após navegação por teclado.
  await page.getByRole('button',{name:'Plano semanal',exact:true}).press('Enter');
  const focus=await page.evaluate(()=>({tag:document.activeElement?.tagName,text:document.activeElement?.textContent?.trim(),main:document.querySelector('#main h1')?.textContent,outline:getComputedStyle(document.activeElement).outlineStyle}));
  assert.equal(focus.tag,'H1','foco de navegação interna não pode cair no body');
  assert.equal(focus.text,focus.main);assert.notEqual(focus.outline,'none');
  await page.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();
  assert.equal(await page.getByRole('navigation',{name:'Navegação interna de Biblioteca Inteligente'}).count(),1);
  await page.getByRole('button',{name:'Evolução',exact:true}).click();
  await page.getByRole('button',{name:'Dados e backup',exact:true}).click();
  assert.equal(await page.getByRole('navigation',{name:'Navegação interna de Evolução'}).count(),1);
  assert.equal(await page.getByRole('button',{name:'Exportar cópia completa'}).count(),1);
  assert.equal(await page.getByRole('button',{name:'Restaurar categorias ausentes'}).count(),1);
  const input=await page.locator('#agu-s20-backup-file').evaluate(el=>({type:el.type,display:getComputedStyle(el).display}));
  assert.deepEqual(input,{type:'file',display:'none'},'input oculto é operado por botão acessível');
  const layout=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));
  assert.ok(layout.scroll<=layout.width+2,'overflow '+width+' '+JSON.stringify(layout));
  assert.deepEqual(errors,[]);await ctx.close();
  console.log('OK S23 navegação semântica, teclado, foco e backup',width);
 }
 const ctx=await browser.newContext({viewport:{width:390,height:860}}),p=await ctx.newPage(),dialogs=[];
 p.on('dialog',async d=>{dialogs.push(d.message());await d.accept()});
 await p.goto(origin,{waitUntil:'load'});
 await p.getByRole('button',{name:'Começar agora'}).click();
 const count=()=>p.evaluate(()=>JSON.parse(localStorage.getItem('agu_quiz_revisao_inteligente_v1')||'{"attempts":[]}').attempts.length);
 const before=await count();
 await p.reload({waitUntil:'load'});
 await p.getByRole('button',{name:'Evolução',exact:true}).click();
 await p.getByRole('button',{name:'Dados e backup',exact:true}).click();
 assert.equal(await count(),before,'navegar e recarregar não duplica tentativas');
 const record={version:1,topic:{},answers:[],sessions:[],reviews:[],notebook:[]};
 const review={schema:'agu-review-v1',attempts:[],cards:{}};
 const preferences={query:'',filter:'todos',status:'todos',size:100};
 const bundle={schema:'agu-portable-local-s20-v1',version:1,createdAt:new Date().toISOString(),items:{
  agu_quiz_mvp1_2026:JSON.stringify(record),
  agu_quiz_revisao_inteligente_v1:JSON.stringify(review),
  agu_consolidacao_s17_v1:JSON.stringify(preferences)
 }};
 const adversarial=await p.evaluate(b=>{
  const keys=Object.keys(b.items),key=keys[0],copy=Object.assign({},b);
  const rejects=raw=>{try{window.AGUBackup20.validateBundle(raw);return false}catch(_){return true}};
  const candidates={
   truncated:JSON.stringify(b).slice(0,-7),
   version:{...b,version:0},
   unknownKey:{...b,items:{...b.items,app_inventado:'{}'}},
   inconsistent:{...b,items:{...b.items,[key]:'{"version":1}'}},
   oversize:JSON.stringify(b).padEnd(12000001,'x'),
   invalidDevice:{...b,items:{...b.items,agu_estudo_integrado_s16_v1:JSON.stringify({schema:'agu-integrated-study-v1',sessions:[{
    id:'ags-invalida',deviceId:'CF88:art999:caput',topic:'ADM-27',status:'em_andamento',stage:'norma',notes:[],cardsSeen:[],attemptIds:[],createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()}],activeId:null})}}
  };
  const states=Object.fromEntries(Object.entries(candidates).map(([k,v])=>[k,rejects(v)]));
  const snapshot=Object.fromEntries(keys.map(k=>[k,localStorage.getItem(k)]));
  const valid=!rejects(copy);
  const unchanged=keys.every(k=>localStorage.getItem(k)===snapshot[k]);
  return {states,valid,unchanged};
 },bundle);
 assert.ok(adversarial.valid);assert.ok(adversarial.unchanged);
 for(const [name,rejected] of Object.entries(adversarial.states))assert.equal(rejected,true,'rejeição '+name);
 const raw=JSON.stringify({...bundle,version:0});
 const prior=await p.evaluate(()=>JSON.stringify(Object.fromEntries(['agu_quiz_mvp1_2026','agu_quiz_revisao_inteligente_v1','agu_consolidacao_s17_v1'].map(k=>[k,localStorage.getItem(k)]))));
 await p.locator('#agu-s20-backup-file').setInputFiles({name:'s23-truncado.json',mimeType:'application/json',buffer:Buffer.from(raw.slice(0,-5))});
 await p.waitForFunction(()=>document.querySelector('#agu-s20-backup-file').value==='');
 assert.ok(dialogs.some(d=>d.includes('Backup rejeitado')),'arquivo truncado gera aviso claro');
 const after=await p.evaluate(()=>JSON.stringify(Object.fromEntries(['agu_quiz_mvp1_2026','agu_quiz_revisao_inteligente_v1','agu_consolidacao_s17_v1'].map(k=>[k,localStorage.getItem(k)]))));
 assert.equal(sha(after),sha(prior),'rejeição de arquivo não pode alterar o armazenamento');
 await ctx.close();
 const clean=await browser.newContext(),dest=await clean.newPage();await dest.goto(origin,{waitUntil:'load'});
 const restored=await dest.evaluate(b=>{
  const k=Object.keys(b.items);for(const key of k)localStorage.removeItem(key);
  const added=window.AGUBackup20.importMissing(b);
  const hashes=Object.fromEntries(k.map(x=>[x,localStorage.getItem(x)]));
  const again=window.AGUBackup20.importMissing(b);
  return {added,again,hashes};
 },bundle);
 assert.equal(restored.added.added,3);assert.equal(restored.again.added,0);
 for(const [key,value] of Object.entries(bundle.items))assert.equal(sha(restored.hashes[key]),sha(value));
 const quota=await dest.evaluate(b=>{
  const k=Object.keys(b.items);for(const key of k)localStorage.removeItem(key);
  const original=Storage.prototype.setItem;let n=0,error='';
  Storage.prototype.setItem=function(key,value){if(++n===2)throw new DOMException('quota sintética','QuotaExceededError');return original.call(this,key,value)};
  try{window.AGUBackup20.importMissing(b)}catch(e){error=e.message}finally{Storage.prototype.setItem=original}
  return {error,present:k.filter(key=>localStorage.getItem(key)!==null)};
 },bundle);
 assert.ok(quota.error.includes('revertida'));assert.deepEqual(quota.present,[]);
 console.log('OK S23 truncado, excessivo, versão, chave, device, quota, hashes, idempotência e preservação');
 await clean.close();console.log('S23_BROWSER_PASSOU: testes sintéticos, Android físico não testado.');
}
main().catch(e=>{console.error('FALHA_S23_BROWSER:',e.stack||e);process.exitCode=1})
 .finally(async()=>{if(browser)await browser.close();if(server.listening)await new Promise(ok=>server.close(ok))});
