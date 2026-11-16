/* Navegação de uma norma por vez nos códigos, perfis sintéticos e axe diagnóstico. */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-codigos-cc-cpc');
const server=http.createServer((req,res)=>{
 const name=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html',file=path.resolve(ROOT,name);
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('Forbidden')}
 fs.readFile(file,(error,bytes)=>{res.writeHead(error?404:200,{'content-type':file.endsWith('.html')?'text/html;charset=utf-8':file.endsWith('.css')?'text/css;charset=utf-8':'application/javascript;charset=utf-8','cache-control':'no-store'});res.end(error?'Missing':bytes)});
});
async function run(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 const base=process.env.AGU_TEST_URL||'http://127.0.0.1:'+server.address().port+'/';
 fs.mkdirSync(OUT,{recursive:true});const results=[];
 try{
  for(const width of [320,360,390,430,1280]){
   const context=await browser.newContext({viewport:{width,height:900},hasTouch:width<=430,reducedMotion:'reduce'});
   const p=await context.newPage(),errors=[];p.on('pageerror',err=>errors.push(err.message));
   await p.goto(base,{waitUntil:'load'});
   await p.evaluate(()=>setView('legal'));
   const stats=await p.evaluate(()=>AGULegal.stats());assert.equal(stats.laws,8);
   if(width<=430)await p.locator('#agu-reader .agu-mobile button').first().click();
   assert.equal(await p.locator('#agu-law-picker').evaluate(e=>e.open),false);
   await p.locator('#agu-law-picker summary').click();
   await p.locator('#agu-law-select').selectOption('L10406');
   assert.equal(await p.evaluate(()=>AGULegal.peek().article),'L10406:art1');
   if(width<=430)await p.locator('#agu-reader .agu-mobile button').first().click();
   assert.equal(await p.locator('#agu-reader .agu-index-entry').count(),49);
   assert.match(await p.locator('.agu-index').innerText(),/Artigos 1–49 de 2082/);
   assert.equal(await p.locator('#agu-law-picker').evaluate(e=>e.open),false,'seletor recolhido ao mudar de lei');
   const input=p.locator('#agu-law-jump');await input.fill('1.228');await input.press('Enter');
   assert.equal(await p.evaluate(()=>AGULegal.peek().article),'L10406:art1228');
   assert.match(await p.locator('.agu-document').innerText(),/Texto de referência, ainda sem cotejo integral/);
   await p.locator('.agu-change-law').click();
   assert.equal(await p.evaluate(()=>document.activeElement?.tagName),'SUMMARY');
   await p.locator('#agu-law-select').selectOption('L13105');
   assert.equal(await p.evaluate(()=>AGULegal.peek().article),'L13105:art1');
   if(width<=430)await p.locator('#agu-reader .agu-mobile button').first().click();
   await p.locator('#agu-law-jump').fill('489');await p.locator('#agu-law-jump').press('Enter');
   assert.equal(await p.evaluate(()=>AGULegal.peek().article),'L13105:art489');
   assert.equal(await p.evaluate(()=>AGULegal.gotoArticle('99999')),false);
   const overflow=await p.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert.ok(overflow.scroll<=overflow.viewport+1,'overflow horizontal '+width+': '+JSON.stringify(overflow));
   const before=await p.evaluate(()=>Object.keys(localStorage));
   await p.evaluate(()=>AGULegal.tab('para_caderno'));
   if(width<=430)await p.locator('#agu-reader .agu-mobile button').nth(2).click();
   await p.locator('#agu-caderno-brief').fill('Qual a exigência de fundamentação da decisão?');
   await p.locator('#agu-caderno-save').click();
   const marks=await p.evaluate(()=>AGULegal.peek().forNotebook);
   assert.equal(marks.length,1);assert.equal(marks[0].lawId,'L13105');assert.equal(marks[0].topic,null);
   assert.deepEqual(await p.evaluate(()=>Object.keys(localStorage).sort()),[...new Set([...before,'agu_leitor_juridico_s13_v1'])].sort());
   await p.reload({waitUntil:'load'});assert.equal(await p.evaluate(()=>AGULegal.peek().forNotebook.length),1);
   const evidence={width,overflow,bookmark:marks[0].id,errors,axe:null};
   if(width===390||width===1280){
    await p.evaluate(()=>setView('legal'));await p.addScriptTag({content:axe.source});
    evidence.axe=await p.evaluate(async()=>{const a=await axe.run(document.querySelector('#agu-reader'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return {violations:a.violations.map(x=>({id:x.id,targets:x.nodes.map(n=>n.target)})),incomplete:a.incomplete.map(x=>({id:x.id,targets:x.nodes.map(n=>n.target)})),passed:a.passes.map(x=>x.id)}});
    await p.screenshot({path:path.join(OUT,'codigo-cpc-'+width+'.png')});
   }
   assert.deepEqual(errors,[],'erros JS no navegador '+width);results.push(evidence);await context.close();
  }
 }finally{await browser.close();server.close()}
 fs.writeFileSync(path.join(OUT,'relatorio.json'),JSON.stringify(results,null,2));
 console.log('CODIGOS_CC_CPC_BROWSER_OK',JSON.stringify(results.map(r=>({width:r.width,overflow:r.overflow,axe:r.axe&&{violations:r.axe.violations.length,incomplete:r.axe.incomplete.length,passed:r.axe.passed.length}}))));
}
run().catch(e=>{console.error('CODIGOS_CC_CPC_BROWSER_FAIL',e.stack||e);process.exitCode=1;server.close()});
