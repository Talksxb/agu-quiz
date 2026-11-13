/* Sprint 20 — E2E de navegador real (Chromium via Playwright).
 * Usar após instalar: npm install --no-save playwright && npx playwright install chromium
 * Execute: node tests/sprint20-browser.cjs
 * Chromium em viewport mobile NÃO equivale a Android físico.
 */
'use strict';
const {chromium}=require('playwright');
const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const ROOT=path.resolve(__dirname,'..');
const MIME={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json'};
const server=http.createServer((req,res)=>{
 const raw=decodeURIComponent((req.url||'/').split('?')[0]);
 const clean=path.normalize(raw).replace(/^[/\\]+/,'');
 const file=path.resolve(ROOT,clean||'index.html');
 if(!(file===ROOT||file.startsWith(ROOT+path.sep))){res.writeHead(403);return res.end('denied')}
 fs.readFile(file,(err,data)=>{if(err){res.writeHead(404);return res.end('missing')}
 res.writeHead(200,{'content-type':MIME[path.extname(file)]||'application/octet-stream','cache-control':'no-store'});res.end(data)});
});
let browser;
async function run(){
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 const port=server.address().port,origin='http://127.0.0.1:'+port+'/';
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 let scenarios=0;
 const evidence=path.join(ROOT,'tests','artifacts-s20');
 fs.mkdirSync(evidence,{recursive:true});
 for(const width of [320,360,390,430,1280]){
  const page=await browser.newPage({viewport:{width,height:840},deviceScaleFactor:1});
  const errors=[];
  page.on('pageerror',e=>errors.push('pageerror: '+e.message));
  page.on('response',response=>{if(response.status()===404)errors.push('404: '+response.url())});
  await page.goto(origin,{waitUntil:'load'});
  await page.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();
  assert.equal(await page.locator('.side .nav').count(),4,'quatro destinos');
  assert.ok(await page.getByRole('button',{name:'Questões Cebraspe'}).count()>=1,'acesso à questão na Biblioteca');
  await page.getByRole('button',{name:'Questões Cebraspe'}).click();
  assert.ok(await page.getByRole('button',{name:/AGU 2015.*Q7/}).count()>=1,'botão questão auditada');
  await page.getByRole('button',{name:/AGU 2015.*Q7/}).click();
  const before=await page.locator('body').innerText();
  assert.ok(before.includes('Fundamentação')||before.includes('AGU 2015'),'painel renderizado');
  assert.ok(!before.includes('Gabarito definitivo da questão original: C'),'gabarito oculto');
  await page.getByRole('button',{name:'CERTO',exact:true}).click();
  await page.getByRole('button',{name:'Conferir resposta'}).click();
  assert.ok((await page.locator('body').innerText()).includes('Gabarito definitivo da questão original: C'),'gabarito C');
  const history=page.locator('summary').filter({hasText:'Fundamentação histórica'});
  const current=page.locator('summary').filter({hasText:'Direito atual'});
  assert.ok(await history.count()>0,'fundamentação histórica disponível');
  assert.ok(await current.count()>0,'fundamentação atual disponível');
  await history.first().click();await current.first().click();
  await page.screenshot({path:path.join(evidence,'width-'+width+'.png'),fullPage:true});
  await page.getByRole('button',{name:'Fácil',exact:true}).click();
  await page.locator('#q18-note').fill('Confundi excesso regulamentar com revogação geral.');
  await page.getByRole('button',{name:'Salvar dificuldade'}).click();
  const stored=await page.evaluate(()=>({
    review:JSON.parse(localStorage.getItem('agu_quiz_revisao_inteligente_v1')||'{}'),
    notebook:JSON.parse(localStorage.getItem('agu_caderno_contextual_s15_v1')||'{}')
  }));
  assert.equal(stored.review.attempts.length,1,'uma tentativa');
  assert.equal(stored.notebook.records.length,1,'uma nota');
  assert.equal(stored.notebook.records[0].sources.length,2,'PDFs oficiais');
  await page.reload({waitUntil:'load'});
  const after=await page.evaluate(()=>JSON.parse(localStorage.getItem('agu_quiz_revisao_inteligente_v1')).attempts.length);
  assert.equal(after,1,'histórico preservado no reload');
  await page.getByRole('button',{name:'Evolução',exact:true}).click();
  await page.getByRole('button',{name:'Dados e backup'}).click();
  assert.ok((await page.locator('body').innerText()).includes('Backup local completo'),'backup acessível');
  const widths=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,innerWidth:innerWidth}));
  assert.ok(widths.scrollWidth<=widths.innerWidth+2,'overflow horizontal '+JSON.stringify(widths));
  assert.deepEqual(errors,[],'erro no console/rede');
  scenarios++;console.log('OK Chromium viewport '+width+'px, fluxo, dados e backup.');
  await page.close();
 }
 console.log('RESULTADO navegador: '+scenarios+' viewports executadas (desktop Chromium em emulação de largura).');
}
run().catch(e=>{console.error('FALHA E2E:',e.stack||e);process.exitCode=1}).finally(async()=>{if(browser)await browser.close();await new Promise(resolve=>server.close(resolve))});
