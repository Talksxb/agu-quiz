/* LIVROS-LEIT-001 — leitura real no Chromium em viewports móveis e desktop. */
'use strict';
const {chromium}=require('playwright'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),ART=path.join(__dirname,'artifacts-livros-001');
const PUBLIC=process.env.AGU_TEST_URL||'';
const srv=PUBLIC?null:http.createServer((req,res)=>{
 const s=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html',f=path.resolve(ROOT,s);
 if(!f.startsWith(ROOT+path.sep)){res.writeHead(403);res.end('Forbidden');return}
 fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'content-type':f.endsWith('.json')?'application/json; charset=utf-8':f.endsWith('.html')?'text/html; charset=utf-8':'application/javascript; charset=utf-8'});res.end(e?'Missing':b)})
});
async function main(){
 fs.mkdirSync(ART,{recursive:true});if(srv)await new Promise(resolve=>srv.listen(0,'127.0.0.1',resolve));
 const url=PUBLIC||'http://127.0.0.1:'+srv.address().port+'/';
 const browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 const evidence=[];
 try{
  for(const width of [320,390,768,1280]){
   const ctx=await browser.newContext({viewport:{width,height:844},hasTouch:width<900});
   const page=await ctx.newPage(),errors=[];
   page.on('pageerror',e=>errors.push(e.message));
   await page.goto(url,{waitUntil:'load'});await page.evaluate(()=>setView('library'));
   const tile=page.getByRole('link',{name:/Livros · Leitura guiada AGU/});
   assert.equal(await tile.isVisible(),true);
   await tile.click();await page.waitForURL(/livros-agu\.html$/);
   assert.equal(await page.getByRole('button',{name:/Competências e Cooperação Ambiental/}).isEnabled(),true);
   await page.getByRole('button',{name:/LGPD na Administração Pública/}).click();
   await page.waitForFunction(()=>document.querySelector('#book-title')?.textContent==='LGPD aplicada à Administração Pública');
   assert.equal(await page.locator('#read-full').isVisible(),true);
   assert.match(await page.locator('#read-full').innerText(),/LGPD aplicada à Administração Pública/);
   assert.equal(await page.locator('#page option').count(),24,'LGPD sem páginas omitidas');
   await page.locator('#mode').selectOption('guided');
   assert.equal(await page.locator('#read-guided').isVisible(),true);
   await page.getByRole('button',{name:'Iniciar leitura'}).click();
   await page.getByRole('button',{name:'Pausar',exact:true}).click();
   await page.getByRole('button',{name:'Próximo bloco'}).click();
   await page.getByRole('button',{name:'Bloco anterior'}).click();
   await page.getByRole('button',{name:'Continuar leitura'}).click();
   await page.getByRole('button',{name:/Concluir trecho e avançar/}).click();
   const current=await page.locator('#page').inputValue();
   assert.equal(current,'1');
   const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('agu_livros_reader_v1')||'{}'));
   assert.deepEqual(saved['lgpd-adm64b'].done,[0]);
   assert.equal(localStorageCheck(saved),true);
   await page.reload(); // O link profundo já reabre o livro, sem escolher novamente no catálogo.
   await page.waitForFunction(()=>document.querySelector('#book-title')?.textContent==='LGPD aplicada à Administração Pública');
   assert.equal(await page.locator('#page').inputValue(),'1','retomada local');
   await page.locator('#mode').selectOption('integral');
   await page.locator('#page').selectOption('23');
   assert.match(await page.locator('#read-full').innerText(),/16.3 Registro editorial/,'última página acessível');
   const dims=await page.evaluate(()=>({vw:innerWidth,scroll:document.documentElement.scrollWidth}));
   assert.ok(dims.scroll<=dims.vw+1,'sem overflow horizontal');
   await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
   const violations=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.length}))});
   assert.deepEqual(violations,[],'axe: '+JSON.stringify(violations));
   assert.deepEqual(errors,[]);
   await page.screenshot({path:path.join(ART,'livros-'+width+'.png'),fullPage:false});
   evidence.push({width,loaded:'LGPD',pages:24,returned:'page 2',last:'page 24',axe:0,dims});
   await ctx.close();
  }
  const ctx=await browser.newContext({viewport:{width:390,height:844},hasTouch:true});
  const page=await ctx.newPage();
  await page.goto(new URL('livros-agu.html?livro=adm-54',url).href);
  await page.waitForFunction(()=>document.querySelector('#book-title')?.textContent==='Agentes públicos e a natureza dos vínculos com o Estado');
  assert.equal(await page.locator('#page option').count(),17);
  await page.locator('#page').selectOption('16');
  assert.ok((await page.locator('#read-full').innerText()).length>200);
  await page.getByRole('button',{name:'Voltar aos livros'}).click();
  await page.getByRole('button',{name:/Responsabilidade patrimonial do Estado/}).click();
  await page.waitForFunction(()=>document.querySelector('#book-title')?.textContent==='Responsabilidade patrimonial do Estado no Direito brasileiro');
  assert.equal(await page.locator('#page option').count(),20);
  await ctx.close();
  // Fonte ambiental integral: abrir pela biblioteca, preservar a obra responsiva original e retomar a leitura.
  const envCtx=await browser.newContext({viewport:{width:390,height:844},hasTouch:true});
  const env=await envCtx.newPage(),envErrors=[];
  env.on('pageerror',e=>envErrors.push(e.message));
  await env.goto(new URL('livros-agu.html?livro=amb-03',url).href);
  await env.waitForFunction(()=>document.querySelector('#book-title')?.textContent==='Competências e Cooperação Ambiental');
  assert.equal(await env.locator('#page option').count(),17,'Ambiental precisa ter 17 seções');
  const original=env.locator('#original-link');
  assert.equal(await original.isVisible(),true,'atalho para versão original com diagramas');
  assert.equal(await original.getAttribute('href'),'livros/livro-amb-001-original.html');
  const resp=await env.request.get(new URL('livros/livro-amb-001-original.html',url).href);
  assert.equal(resp.status(),200);
  assert.match(await resp.text(),/<svg\\b/i,'diagramas da edição original preservados');
  await env.locator('#mode').selectOption('guided');
  assert.equal(await env.locator('#read-guided').isVisible(),true);
  await env.getByRole('button',{name:'Iniciar leitura'}).click();
  await env.getByRole('button',{name:'Pausar',exact:true}).click();
  await env.getByRole('button',{name:'Próximo bloco'}).click();
  await env.getByRole('button',{name:'Bloco anterior'}).click();
  await env.getByRole('button',{name:/Concluir trecho e avançar/}).click();
  assert.equal(await env.locator('#page').inputValue(),'1');
  let savedEnv=await env.evaluate(()=>JSON.parse(localStorage.getItem('agu_livros_reader_v1')||'{}'));
  assert.deepEqual(savedEnv['amb-03'].done,[0]);
  assert.equal(savedEnv['lgpd-adm64b'],undefined,'outros livros não são marcados como lidos pela obra ambiental');
  await env.reload();
  await env.waitForFunction(()=>document.querySelector('#book-title')?.textContent==='Competências e Cooperação Ambiental');
  assert.equal(await env.locator('#page').inputValue(),'1');
  await env.locator('#page').selectOption('16');
  assert.match(await env.locator('#read-full').innerText(),/Handoff editorial/);
  await env.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
  const envViolations=await env.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return r.violations.map(v=>({id:v.id,impact:v.impact}))});
  assert.deepEqual(envViolations,[],'Ambiental axe WCAG '+JSON.stringify(envViolations));
  const dimsEnv=await env.evaluate(()=>({vw:innerWidth,scroll:document.documentElement.scrollWidth}));
  assert.ok(dimsEnv.scroll<=dimsEnv.vw+1,'Ambiental sem overflow horizontal');
  assert.deepEqual(envErrors,[]);
  evidence.push({width:390,loaded:'AMB-03',sections:17,original:'HTML com SVGs',retained:'página 2',axe:0,dims:dimsEnv});
  await env.screenshot({path:path.join(ART,'livro-amb-390.png'),fullPage:false});
  await envCtx.close();
  fs.writeFileSync(path.join(ART,'resultado.json'),JSON.stringify(evidence,null,2)+'\n');
  console.log('LIVROS_LEIT_001_CHROMIUM_OK',JSON.stringify(evidence));
 }finally{await browser.close();if(srv)srv.close()}
}
function localStorageCheck(s){return !JSON.stringify(s).includes('recall')}
main().catch(e=>{console.error('LIVROS_LEIT_001_CHROMIUM_FAIL',e.stack||e);process.exitCode=1;if(srv)srv.close()});
