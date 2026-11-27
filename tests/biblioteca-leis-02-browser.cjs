/* Biblioteca 02: 5 larguras, teclado/toque, foco, zoom e axe com perfis sintéticos. */
'use strict';
const corr01=require('./ux-agu-aud-001-axe-recheck.cjs');
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-biblioteca-02');
const server=http.createServer((req,res)=>{
 const name=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html',file=path.resolve(ROOT,name);
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('Forbidden')}
 fs.readFile(file,(err,bytes)=>{res.writeHead(err?404:200,{'content-type':file.endsWith('.html')?'text/html;charset=utf-8':file.endsWith('.css')?'text/css;charset=utf-8':'application/javascript;charset=utf-8'});res.end(err?'Missing':bytes)});
});
async function run(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 const base=process.env.AGU_TEST_URL||'http://127.0.0.1:'+server.address().port+'/';
 fs.mkdirSync(OUT,{recursive:true});const outcomes=[];
 try{
  for(const width of [320,360,390,430,1280]){
   const ctx=await browser.newContext({viewport:{width,height:900},hasTouch:width<850,reducedMotion:'reduce'}),p=await ctx.newPage(),errors=[];
   p.on('pageerror',e=>errors.push(e.message));await p.goto(base,{waitUntil:'load'});await p.evaluate(()=>setView('legal'));
   if(width<850)await p.locator('#agu-reader .agu-mobile button').first().click();
   assert.equal(await p.locator('#agu-law-picker').evaluate(e=>e.open),false);
   await p.locator('#agu-law-picker summary').focus();await p.keyboard.press('Enter');
   assert.equal(await p.locator('#agu-law-picker').evaluate(e=>e.open),true);
   const before=await p.evaluate(()=>Object.keys(localStorage).sort());
   await p.getByRole('button',{name:'Direito Civil',exact:true}).click();
   assert.equal(await p.locator('#agu-law-picker').evaluate(e=>e.open),true);
   assert.equal(await p.locator('.agu-matter-option[aria-pressed="true"]').innerText().then(s=>s.includes('Direito Civil')),true);
   assert.equal(await p.locator('#agu-law-select option').count(),3,'placeholder e CC/LINDB');
   assert.equal(await p.evaluate(()=>AGULegal.peek().article),'CF88:art37','filtrar não troca o texto');
   assert.deepEqual(await p.evaluate(()=>Object.keys(localStorage).sort()),before,'filtro não grava dados');
   await p.locator('#agu-law-select').selectOption('L10406');
   assert.equal(await p.locator('#agu-law-picker').evaluate(e=>e.open),false);
   assert.equal(await p.evaluate(()=>AGULegal.peek().article),'L10406:art1');
   assert.match(await p.locator('.agu-selected-matters').innerText(),/Direito Civil/);
   await p.locator('.agu-change-law').click();
   await p.getByRole('button',{name:'Direito Processual Civil',exact:true}).click();
   assert.equal(await p.locator('#agu-law-select option').count(),2);
   await p.locator('#agu-law-select').selectOption('L13105');
   if(width<850)await p.locator('#agu-reader .agu-mobile button').first().click();
   await p.locator('#agu-law-jump').fill('489');await p.locator('#agu-law-jump').press('Enter');
   assert.equal(await p.evaluate(()=>AGULegal.peek().article),'L13105:art489');
   let overflow=await p.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert.ok(overflow.scroll<=overflow.viewport+1,'overflow horizontal '+width+' '+JSON.stringify(overflow));
   if(width<=390){
    await p.evaluate(()=>{document.querySelector('#agu-reader').style.fontSize='200%'});
    overflow=await p.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth,offenders:[...document.querySelectorAll('#agu-reader *')].filter(e=>{
     const r=e.getBoundingClientRect(),s=getComputedStyle(e);return s.display!=='none'&&r.width>0&&(r.right>innerWidth+2||r.left< -2);
    }).slice(0,12).map(e=>({tag:e.tagName,cls:e.className,id:e.id,text:(e.innerText||'').slice(0,50),right:Math.round(e.getBoundingClientRect().right),width:Math.round(e.getBoundingClientRect().width)}))}));
    if(overflow.scroll>overflow.viewport+1){console.error('BIB_02_ZOOM_DIAG',JSON.stringify({width,overflow}));await p.screenshot({path:path.join(OUT,'zoom-overflow-'+width+'.png'),fullPage:true})}
    assert.ok(overflow.scroll<=overflow.viewport+1,'overflow com texto 200% '+width);
   }
   const evidence={width,overflow,errors,axe:null};
   if(width===390||width===1280){
    await p.addScriptTag({content:axe.source});
    evidence.axe=await p.evaluate(async()=>{
     const r=await axe.run(document.querySelector('#agu-reader'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});
     return {violations:r.violations.map(x=>({id:x.id,nodes:x.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(x=>({id:x.id,nodes:x.nodes.map(n=>n.target)})),passed:r.passes.map(x=>x.id)};
    });
    evidence.axe.recheck=await corr01.recheck(p,'#agu-reader',evidence.axe,'biblioteca-cpc',width);
    await p.screenshot({path:path.join(OUT,'biblioteca-'+width+'.png'),fullPage:true});
   }
   assert.deepEqual(errors,[],'sem erros JS '+width);outcomes.push(evidence);await ctx.close();
  }
 }finally{await browser.close();server.close()}
 fs.writeFileSync(path.join(OUT,'relatorio.json'),JSON.stringify(outcomes,null,2));
 corr01.assertResolved();
 console.log('BIBLIOTECA_02_BROWSER_OK',JSON.stringify(outcomes.map(o=>({width:o.width,overflow:o.overflow,axe:o.axe&&{violations:o.axe.violations.length,incomplete:o.axe.incomplete.length,passed:o.axe.passed.length}}))));
}
run().catch(e=>{console.error('BIBLIOTECA_02_BROWSER_FAIL',e.stack||e);process.exitCode=1;server.close()});
