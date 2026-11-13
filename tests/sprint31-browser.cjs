/* Sprint 31 — continuidade de Tab/Enter e foco após as renderizações do Leitor.
 * Chromium desktop em cinco viewports, contextos descartáveis, corpus público.
 */
'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-s31');
const server=http.createServer((req,res)=>{
 const u=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'');
 const f=path.resolve(ROOT,u||'index.html');
 if(!f.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('denied')}
 fs.readFile(f,(err,body)=>{if(err){res.writeHead(404);return res.end('not found')}
  res.writeHead(200,{'content-type':f.endsWith('.html')?'text/html;charset=utf-8':f.endsWith('.js')?'application/javascript;charset=utf-8':'application/octet-stream','cache-control':'no-store'});res.end(body);
 });
});
let browser;
const focusState=()=>{
 const e=document.activeElement,r=e.getBoundingClientRect();
 return {tag:e.tagName,role:e.getAttribute('role')||'native',name:(e.textContent||'').trim().slice(0,95),
  className:e.className,rect:{left:r.left,top:r.top,right:r.right,bottom:r.bottom},
  visible:r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth,
  viewport:{width:innerWidth,height:innerHeight},mobile:document.querySelector('#agu-reader')?.dataset.mobile};
};
async function main(){
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const results=[];
 for(const width of [320,360,390,430,1280]){
  const narrow=width<850,context=await browser.newContext({viewport:{width,height:850},reducedMotion:'reduce'});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:'+server.address().port+'/',{waitUntil:'load'});
  await page.evaluate(()=>window.setView('legal')); // setup programático; testes de tecla abaixo são reais
  if(narrow){
   await page.locator('#agu-reader .agu-mobile button').first().click();
   assert.equal((await page.evaluate(focusState)).name,'Índice','toque emulado mantém foco no painel de índice '+width);
  }
  await page.locator('#agu-reader .agu-index-entry').first().focus(); // ponto inicial; próximo comando usa Tab real
  await page.keyboard.press('Tab');
  const indexBefore=await page.evaluate(focusState);
  assert.ok(indexBefore.name.startsWith('Art. 49'),'Tab alcança segundo artigo '+width);
  await page.keyboard.press('Enter');
  const indexAfter=await page.evaluate(focusState);
  assert.ok((await page.locator('#agu-reader .agu-document h2').innerText()).startsWith('Art. 49'),'Enter muda artigo '+width);
  assert.equal(indexAfter.tag,narrow?'H2':'BUTTON','retém foco em destino visível após artigo '+width);
  if(narrow)assert.ok(indexAfter.name.startsWith('Art. 49'),'cabeçalho anunciado na troca de painel '+width);
  else assert.ok(indexAfter.name.startsWith('Art. 49'),'índice selecionado permanece focado '+width);
  assert.equal(indexAfter.visible,true,'foco após índice visível '+width);
  await page.keyboard.press('Tab');
  const indexNext=await page.evaluate(focusState);
  assert.ok(narrow?indexNext.name.startsWith('Abrir texto oficial completo'):indexNext.name.startsWith('Art. 131'),
   'Tab segue em ordem após artigo '+width);

  if(narrow){await page.locator('#agu-reader .agu-mobile button').nth(2).click();
   assert.equal((await page.evaluate(focusState)).name,'Relacionados','alternância touch emulada foca Related '+width)}
  await page.locator('#agu-reader .agu-tabs button').first().focus();
  await page.keyboard.press('Tab');
  const tabBefore=await page.evaluate(focusState);
  assert.equal(tabBefore.name,'Questões','Tab chega à aba Questões '+width);
  await page.keyboard.press('Enter');
  const tabAfter=await page.evaluate(focusState);
  assert.equal(tabAfter.name,'Questões','troca de aba conserva foco '+width);
  assert.equal(await page.locator('#agu-reader .agu-tabs button[aria-pressed="true"]').innerText(),'Questões');
  await page.keyboard.press('Tab');
  assert.equal((await page.evaluate(focusState)).name,'Caderno','Tab seguinte na aba seguinte '+width);
  await page.keyboard.press('Shift+Tab');
  assert.equal((await page.evaluate(focusState)).name,'Questões','Shift+Tab volta à aba '+width);

  if(narrow){
   await page.locator('#agu-reader .agu-mobile button').first().focus();
   await page.keyboard.press('Tab');
   assert.equal((await page.evaluate(focusState)).name,'Texto legal','Tab alcança painel Texto legal '+width);
   await page.keyboard.press('Enter');
   assert.equal((await page.evaluate(focusState)).name,'Texto legal','Enter preserva foco no painel '+width);
   await page.keyboard.press('Tab');
   assert.equal((await page.evaluate(focusState)).name,'Relacionados','Tab progride no switcher '+width);
   await page.keyboard.press('Enter');
   assert.equal((await page.evaluate(focusState)).name,'Relacionados','Enter no painel Related mantém foco '+width);
   await page.keyboard.press('Shift+Tab');
   assert.equal((await page.evaluate(focusState)).name,'Texto legal','Shift+Tab retorna ao painel '+width);
   await page.keyboard.press('Enter');
  }
  const next=page.locator('#agu-reader .agu-document button.agu-light').nth(1);
  await next.focus();await page.keyboard.press('Enter');
  const stepAfter=await page.evaluate(focusState);
  assert.equal((await page.locator('#agu-reader .agu-document h2').innerText()).trim(),'Art. 131','avanço de artigo '+width);
  assert.equal(stepAfter.name,'Próximo artigo →','avanço mantém foco no botão '+width);
  assert.equal(stepAfter.visible,true,'botão de avanço permanece visível '+width);

  await page.evaluate(()=>window.AGULegal.article('CF88:art37')); // valida retorno programático sem exigir foco
  if(narrow)await page.locator('#agu-reader .agu-mobile button').nth(1).click();
  const units=page.locator('#agu-reader .agu-unit');
  assert.ok(await units.count()>=2,'artigo possui duas unidades '+width);
  await units.first().focus();await page.keyboard.press('Tab');await page.keyboard.press('Space');
  assert.equal(await page.evaluate(()=>document.activeElement?.matches('#agu-reader .agu-unit.selected')),true,'regressão S30 de Espaço '+width);
  await page.keyboard.press('Tab');
  assert.equal((await page.evaluate(focusState)).name,'Próximo artigo →','Tab após unidade '+width);
  const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('agu_leitor_juridico_s13_v1')));
  const oldAttempts=await page.evaluate(()=>window.AGUReview?.getStats?.()?.attempts??0);
  if(width===390){fs.mkdirSync(OUT,{recursive:true});await page.screenshot({path:path.join(OUT,'continuidade-foco-s31-390.png')})}
  await page.reload({waitUntil:'load'});await page.evaluate(()=>window.setView('legal'));
  assert.equal((await page.evaluate(()=>JSON.parse(localStorage.getItem('agu_leitor_juridico_s13_v1')))).unit,stored.unit,'reload conserva unidade '+width);
  assert.equal(await page.evaluate(()=>window.AGUReview?.getStats?.()?.attempts??0),oldAttempts,'nenhuma tentativa fantasma '+width);
  assert.deepEqual(errors,[],'sem erros JS '+width);
  results.push({width,indexBefore,indexAfter,tabBefore,tabAfter,stepAfter,mobile:narrow,reload:true});
  await context.close();
 }
 fs.mkdirSync(OUT,{recursive:true});
 fs.writeFileSync(path.join(OUT,'foco-renderizacoes-s31.json'),JSON.stringify({runtime:{node:process.version,chromium:browser.version()},results},null,2));
 console.log('S31_BROWSER_FOCO_OK',JSON.stringify({node:process.version,chromium:browser.version(),viewports:results.map(x=>x.width),cases:results.length}));
}
main().catch(e=>{console.error('S31_BROWSER_FALHA',e.stack);process.exitCode=1})
 .finally(async()=>{await browser?.close();server.close()});
