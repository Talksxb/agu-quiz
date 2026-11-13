/* Sprint 30 — o foco deve sobreviver à seleção de subdivisão pelo teclado.
 * Chromium desktop: cinco viewports isoladas; não representa Android/TalkBack.
 */
'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-s30');
const server=http.createServer((req,res)=>{
  const u=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'');
  const f=path.resolve(ROOT,u||'index.html');
  if(!f.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('denied')}
  fs.readFile(f,(err,body)=>{if(err){res.writeHead(404);return res.end('not found')}
    res.writeHead(200,{'content-type':f.endsWith('.html')?'text/html;charset=utf-8':f.endsWith('.js')?'application/javascript;charset=utf-8':'application/octet-stream','cache-control':'no-store'});
    res.end(body);
  });
});
let browser;
const focusState=()=>({
  focused:!!document.activeElement?.matches?.('#agu-reader .agu-unit.selected'),
  selectedIndex:[...document.querySelectorAll('#agu-reader .agu-unit')].findIndex(e=>e.classList.contains('selected')),
  focusedIndex:[...document.querySelectorAll('#agu-reader .agu-unit')].indexOf(document.activeElement),
  tag:document.activeElement?.tagName,
  rect:(()=>{const e=document.activeElement,r=e.getBoundingClientRect();return {top:r.top,bottom:r.bottom,left:r.left,right:r.right}})(),
  viewport:{width:innerWidth,height:innerHeight}
});
async function main(){
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  const results=[];
  for(const width of [320,360,390,430,1280]){
    const context=await browser.newContext({viewport:{width,height:850},reducedMotion:'reduce'});
    const page=await context.newPage(),errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    await page.goto('http://127.0.0.1:'+server.address().port+'/',{waitUntil:'load'});
    await page.evaluate(()=>window.setView('legal'));
    const units=page.locator('#agu-reader .agu-unit');
    assert.ok(await units.count()>=2,'corpus permite Tab entre unidades');
    await units.first().focus();
    await page.keyboard.press('Tab');
    const before=await page.evaluate(focusState);
    assert.equal(before.focusedIndex,1,'Tab deve alcançar a segunda unidade '+width);
    await page.keyboard.press('Space');
    const after=await page.evaluate(focusState);
    assert.equal(after.selectedIndex,1,'Espaço seleciona segunda unidade '+width);
    assert.equal(after.focusedIndex,1,'foco permanece na segunda unidade '+width);
    assert.equal(after.focused,true,'foco permanece sobre elemento selecionado '+width);
    assert.ok(after.rect.bottom>0&&after.rect.top<after.viewport.height,'foco deve permanecer visível '+width);
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(()=>document.activeElement?.textContent?.trim()),'Próximo artigo →',
      'Tab após a unidade segue para próximo artigo '+width);
    await page.keyboard.press('Shift+Tab');
    assert.equal((await page.evaluate(focusState)).focusedIndex,1,'Shift+Tab volta à unidade '+width);
    await page.keyboard.press('Enter');
    assert.equal((await page.evaluate(focusState)).focusedIndex,1,'Enter preserva foco '+width);
    await page.keyboard.press('x');
    assert.equal((await page.evaluate(focusState)).selectedIndex,1,'tecla neutra não altera seleção '+width);
    const stored=await page.evaluate(()=>JSON.parse(localStorage.getItem('agu_leitor_juridico_s13_v1')).unit);
    assert.ok(stored,'seleção persistida no perfil isolado '+width);
    if(width===390){fs.mkdirSync(OUT,{recursive:true});await page.screenshot({path:path.join(OUT,'leitor-foco-restaurado-390.png')})}
    await page.reload({waitUntil:'load'});await page.evaluate(()=>window.setView('legal'));
    assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('agu_leitor_juridico_s13_v1')).unit),stored,
      'reload mantém seleção '+width);
    assert.deepEqual(errors,[],'sem exceções JS '+width);
    results.push({width,before,after,tabForward:true,shiftTab:true,enter:true,reload:true});
    await context.close();
  }
  fs.mkdirSync(OUT,{recursive:true});
  fs.writeFileSync(path.join(OUT,'foco-leitor-s30.json'),JSON.stringify({runtime:{node:process.version,chromium:browser.version()},results},null,2));
  console.log('S30_BROWSER_FOCO_OK',JSON.stringify({node:process.version,chromium:browser.version(),
    viewports:results.map(x=>x.width),cases:results.length}));
}
main().catch(e=>{console.error('S30_BROWSER_FALHA',e.stack);process.exitCode=1})
  .finally(async()=>{await browser?.close();server.close()});
