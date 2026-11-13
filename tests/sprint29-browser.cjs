/* Sprint 29 — ativação real pelo teclado das unidades do Leitor Jurídico.
 * Chromium desktop em cinco larguras; não representa Android físico/TalkBack.
 */
'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-s29');
const server=http.createServer((req,res)=>{
 const u=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'');
 const f=path.resolve(ROOT,u||'index.html');
 if(!f.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('denied')}
 fs.readFile(f,(err,body)=>{if(err){res.writeHead(404);return res.end('not found')}
  res.writeHead(200,{'content-type':f.endsWith('.html')?'text/html;charset=utf-8':f.endsWith('.js')?'application/javascript;charset=utf-8':'application/octet-stream','cache-control':'no-store'});res.end(body)});
});
let browser;
async function main(){
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const results=[];
 for(const width of [320,360,390,430,1280]){
  const context=await browser.newContext({viewport:{width,height:850},reducedMotion:'reduce'});
  const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:'+server.address().port+'/',{waitUntil:'load'});
  await page.evaluate(()=>window.setView('legal'));
  const ids=await page.locator('#agu-reader .agu-unit').evaluateAll(units=>units.map(el=>el.getAttribute('onclick')?.match(/'([^']+)'/)?.[1]));
  assert.ok(ids.length>=2,'corpus deve oferecer duas unidades do primeiro artigo');
  assert.equal(await page.evaluate(()=>window.AGULegal.peek().unit),ids[0]);
  await page.locator('#agu-reader .agu-unit').nth(1).focus();
  await page.keyboard.press('x');
  assert.equal(await page.evaluate(()=>window.AGULegal.peek().unit),ids[0],'tecla comum não ativa '+width);
  await page.keyboard.press('Space');
  assert.equal(await page.evaluate(()=>window.AGULegal.peek().unit),ids[1],'Espaço ativa role=button '+width);
  assert.equal(await page.evaluate(()=>JSON.parse(localStorage.getItem('agu_leitor_juridico_s13_v1')).unit),ids[1],'Espaço persiste '+width);
  await page.locator('#agu-reader .agu-unit').first().focus();
  await page.keyboard.press('Enter');
  assert.equal(await page.evaluate(()=>window.AGULegal.peek().unit),ids[0],'Enter ativa role=button '+width);
  await page.reload({waitUntil:'load'});await page.evaluate(()=>window.setView('legal'));
  assert.equal(await page.evaluate(()=>window.AGULegal.peek().unit),ids[0],'reload conserva a unidade '+width);
  assert.deepEqual(errors,[],'erros JS '+width);
  results.push({width,unitInitial:ids[0],unitSpace:ids[1],space:true,enter:true,reload:true});
  await context.close();
 }
 fs.mkdirSync(OUT,{recursive:true});
 fs.writeFileSync(path.join(OUT,'leitor-unidades-teclado.json'),JSON.stringify({runtime:{node:process.version,chromium:browser.version()},results},null,2));
 console.log('S29_BROWSER_LEITOR_TECLADO',JSON.stringify({node:process.version,chromium:browser.version(),viewports:results.map(x=>x.width),cases:results.length}));
}
main().catch(e=>{console.error('S29_BROWSER_FALHA',e.stack);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
