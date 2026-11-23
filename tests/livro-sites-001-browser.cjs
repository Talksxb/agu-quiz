/* LIVRO-SITES-001 — o atalho da Biblioteca deve ser legível e acessível no celular. */
'use strict';
const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..');
const server=http.createServer((req,res)=>{
 const name=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html',file=path.resolve(ROOT,name);
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('Forbidden')}
 fs.readFile(file,(error,bytes)=>{res.writeHead(error?404:200,{'content-type':file.endsWith('.css')?'text/css;charset=utf-8':file.endsWith('.html')?'text/html; charset=utf-8':'application/javascript; charset=utf-8'});res.end(error?'Missing':bytes)});
});
async function run(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 const out=[];
 try{
  for(const width of [320,390,1280]){
   const context=await browser.newContext({viewport:{width,height:800},hasTouch:width<850}),page=await context.newPage(),errors=[];
   page.on('pageerror',error=>errors.push(error.message));
   await page.goto('http://127.0.0.1:'+server.address().port+'/',{waitUntil:'load'});
   await page.evaluate(()=>setView('library'));
   await page.getByRole('link',{name:/Método AGU/}).click();
   await page.getByText('Recursos de leitura já disponíveis',{exact:true}).click();
   const link=page.getByRole('link',{name:/Apostila · Leitura AGU/});
   assert.equal(await link.isVisible(),true,'atalho visível em '+width);
   assert.equal(await link.getAttribute('href'),'https://leitura-agu-caderno-2026.aleixo-taw.chatgpt.site/');
   assert.match(await link.innerText(),/GPT Sites/);
   const dimensions=await page.evaluate(()=>({page:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert.ok(dimensions.page<=dimensions.viewport+1,'sem rolagem horizontal em '+width);
   await link.focus();assert.equal(await link.evaluate(el=>el===document.activeElement),true,'foco por teclado em '+width);
   assert.deepEqual(errors,[],'sem erros de script em '+width);
   out.push({width,dimensions,link:'visível e focalizável'});await context.close();
  }
 }finally{await browser.close();server.close()}
 console.log('LIVRO_SITES_001_BROWSER_OK',JSON.stringify(out));
}
run().catch(error=>{console.error('LIVRO_SITES_001_BROWSER_FAIL',error.stack||error);process.exitCode=1;server.close()});
