/* Sprint 32 — teclado real em controles existentes do Leitor e Consolidação.
 * Dados/prints sintéticos; Chromium desktop emula viewports, não Android/TalkBack.
 */
'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-s32');
const server=http.createServer((req,res)=>{
 const u=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'');
 const f=path.resolve(ROOT,u||'index.html');
 if(!f.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('denied')}
 fs.readFile(f,(err,body)=>{if(err){res.writeHead(404);return res.end('not found')}
  res.writeHead(200,{'content-type':f.endsWith('.html')?'text/html;charset=utf-8':f.endsWith('.js')?'application/javascript;charset=utf-8':'application/octet-stream','cache-control':'no-store'});res.end(body);
 });
});
let browser;
const focusState=()=>{const e=document.activeElement,r=e.getBoundingClientRect();return {
 tag:e.tagName,id:e.id,name:(e.textContent||'').trim().slice(0,70),className:e.className,
 rect:{top:r.top,bottom:r.bottom,left:r.left,right:r.right},
 visible:r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth,
 viewport:{width:innerWidth,height:innerHeight},scrollY,
 mobile:document.querySelector('#agu-reader')?.dataset.mobile
}};
async function main(){
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const results=[];
 for(const width of [320,360,390,430,1280]){
  const context=await browser.newContext({viewport:{width,height:850},reducedMotion:'reduce'}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:'+server.address().port+'/',{waitUntil:'load'});
  await page.evaluate(()=>window.setView('legal')); // preparação, não prova de Tab
  const beforeAttempts=await page.evaluate(()=>window.AGUReview?.getStats?.()?.attempts??0);
  if(width<850)await page.locator('#agu-reader .agu-mobile button').nth(2).click(); // revelar abas no painel Relacionados
  await page.locator('#agu-reader .agu-tabs button').filter({hasText:'Comentários'}).click();
  const synthetic='Nota exclusivamente sintética S32 — foco e persistência '+width;
  await page.locator('#agu-legal-note').fill(synthetic);
  await page.keyboard.press('Tab');
  const noteBefore=await page.evaluate(focusState);
  assert.equal(noteBefore.name,'Salvar anotação','Tab alcança o botão de salvar '+width);
  await page.keyboard.press('Enter');
  const noteAfter=await page.evaluate(focusState);
  assert.equal(noteAfter.id,'agu-save-note','Enter restaura botão salvar '+width);
  assert.equal(noteAfter.visible,true,'foco salvar visível após render '+width);
  const stored=await page.evaluate(()=>{const s=JSON.parse(localStorage.getItem('agu_leitor_juridico_s13_v1'));return {unit:s.unit,note:s.notes[s.unit],tab:s.tab}});
  assert.equal(stored.note,synthetic,'anotação sintética íntegra '+width);
  await page.keyboard.press('Tab');
  assert.equal((await page.evaluate(focusState)).name,'Exportar comentários','Tab após salvar mantém continuidade '+width);
  await page.keyboard.press('Shift+Tab');
  assert.equal((await page.evaluate(focusState)).id,'agu-save-note','Shift+Tab retorna a salvar '+width);

  if(width<850)await page.locator('#agu-reader .agu-mobile button').first().click();
  const toggle=page.locator('#agu-reader .agu-s17-search > button');
  await toggle.press('Enter');
  const toggleAfter=await page.evaluate(focusState);
  assert.ok(toggleAfter.name.includes('Pesquisa jurídica e filtros'),'foco no expansor '+width);
  assert.equal(toggleAfter.visible,true,'expansor visível '+width);
  assert.equal(await toggle.getAttribute('aria-expanded'),'true','painel expandiu '+width);
  await page.keyboard.press('Tab');
  assert.equal((await page.evaluate(focusState)).id,'agu-search-q','Tab chega à busca '+width);
  await page.locator('#agu-search-q').fill('art. 13');
  await page.keyboard.press('Enter');
  assert.equal((await page.evaluate(focusState)).id,'agu-search-q','Enter mantém foco na busca '+width);
  assert.ok(await page.locator('#agu-reader .agu-s17-result').count()>0,'busca produz resultado '+width);
  await page.keyboard.press('Tab');await page.keyboard.press('Tab');await page.keyboard.press('Tab');
  assert.equal((await page.evaluate(focusState)).name,'Buscar','Tab alcança botão buscar '+width);
  await page.keyboard.press('Enter');
  assert.equal((await page.evaluate(focusState)).name,'Buscar','buscar mantém foco após render '+width);
  await page.keyboard.press('Tab');
  assert.equal((await page.evaluate(focusState)).name,'Limpar','Tab alcança limpar '+width);
  await page.keyboard.press('Enter');
  assert.equal((await page.evaluate(focusState)).name,'Limpar','limpar mantém foco '+width);
  assert.equal(await page.locator('#agu-search-q').inputValue(),'','limpeza não altera outras categorias '+width);

  const size=page.locator('#agu-reader .agu-s17-settings select');
  await size.press('ArrowDown');
  assert.equal(await size.inputValue(),'115','seta altera fonte para ampliado '+width);
  const sizeAfter=await page.evaluate(focusState);
  assert.equal(sizeAfter.tag,'SELECT','ajuste mantém foco em select '+width);
  assert.equal(sizeAfter.visible,true,'select visível após ajuste '+width);

  await page.locator('#agu-search-q').fill('art. 13');
  await page.keyboard.press('Enter');
  const item=page.locator('#agu-reader .agu-s17-result').filter({hasText:'Lei nº 9.784/1999 · Art. 13 · I'}).first();
  await item.press('Enter');
  const resultAfter=await page.evaluate(focusState);
  assert.ok(resultAfter.className.includes('agu-unit')&&resultAfter.className.includes('selected'),'resultado abre unidade focada '+width);
  assert.equal(resultAfter.visible,true,'unidade de resultado visível '+width);
  assert.equal(await page.locator('#agu-reader .agu-document h2').innerText(),'Art. 13','resultado abre artigo correto '+width);
  const unit=await page.evaluate(()=>JSON.parse(localStorage.getItem('agu_leitor_juridico_s13_v1')).unit);
  assert.equal(unit,'L9784:art13:I','ID persistente do dispositivo '+width);
  if(width===390){fs.mkdirSync(OUT,{recursive:true});await page.screenshot({path:path.join(OUT,'foco-apos-busca-s32-390.png')})}
  await page.reload({waitUntil:'load'});await page.evaluate(()=>window.setView('legal'));
  assert.equal(await page.evaluate(unitId=>JSON.parse(localStorage.getItem('agu_leitor_juridico_s13_v1')).notes[unitId],stored.unit),synthetic,'nota preservada após reload '+width);
  assert.equal(await page.evaluate(()=>window.AGUReview?.getStats?.()?.attempts??0),beforeAttempts,'nenhuma tentativa fantasma '+width);
  assert.deepEqual(errors,[],'sem pageerror '+width);
  results.push({width,noteBefore,noteAfter,toggleAfter,sizeAfter,resultAfter,storedUnit:stored.unit,reload:true,attemptsUnchanged:true});
  await context.close();
 }
 fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(path.join(OUT,'foco-controles-s32.json'),JSON.stringify({kind:'synthetic',viewportWidths:[320,360,390,430,1280],results},null,2));
 console.log('S32_BROWSER_CONTROLES_OK',JSON.stringify({viewports:results.map(x=>x.width),scenarios:['salvar','tab','shift-tab','filtros','busca','limpar','tamanho','resultado','reload'],attemptsUnchanged:true}));
}main().catch(err=>{console.error('S32_BROWSER_FALHA',err);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();server.close()});
