/* Sprint 23 — detalhamento das verificações inconclusivas da Sprint 22.
 * Executado em Chromium real; somente interface vazia e dados sintéticos.
 * Relatório diagnóstico, nunca atestado de conformidade WCAG ou Android físico.
 */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-s23');
const server=http.createServer((req,res)=>{
 const u=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'');
 const f=path.resolve(ROOT,u||'index.html');
 if(!f.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('denied')}
 fs.readFile(f,(e,b)=>{if(e){res.writeHead(404);return res.end('not found')}
  res.writeHead(200,{'content-type':f.endsWith('.html')?'text/html;charset=utf-8':f.endsWith('.js')?'application/javascript;charset=utf-8':'application/octet-stream','cache-control':'no-store'});res.end(b)});
});
let browser;
async function main(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));fs.mkdirSync(OUT,{recursive:true});
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const scans=[];console.log('S23_AXE_RUNTIME',JSON.stringify({node:process.version,chromium:browser.version(),axe:axe.version}));
 for(const width of [320,360,390,430,1280]){
  const ctx=await browser.newContext({viewport:{width,height:850},reducedMotion:'reduce'});
  const page=await ctx.newPage();await page.goto('http://127.0.0.1:'+server.address().port+'/',{waitUntil:'load'});
  await page.addScriptTag({content:axe.source});
  for(const route of width===390||width===1280?['dashboard','study','library','evolution','officialExam','legal','settings']:['dashboard','study','library','evolution']){
   await page.evaluate(r=>window.setView(r),route);
   const result=await page.evaluate(async()=>{
    const out=await window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});
    const details=x=>x.nodes.map(n=>({target:n.target,html:n.html.slice(0,320),failureSummary:n.failureSummary,
      any:n.any.map(c=>({id:c.id,data:c.data,message:c.message})),all:n.all.map(c=>({id:c.id,data:c.data,message:c.message})),
      none:n.none.map(c=>({id:c.id,data:c.data,message:c.message}))}));
    return {violations:out.violations.map(x=>({id:x.id,impact:x.impact,help:x.help,nodes:details(x)})),
      incomplete:out.incomplete.map(x=>({id:x.id,impact:x.impact,help:x.help,nodes:details(x)})),
      fileTriggers:[...document.querySelectorAll('input[type="file"]')].map(x=>({id:x.id,display:getComputedStyle(x).display,ariaLabel:x.getAttribute('aria-label')})),
      mainNav:[...document.querySelectorAll('.secondary-nav')].map(x=>({role:x.getAttribute('role'),label:x.getAttribute('aria-label')}))};
   });
   scans.push({width,route,...result});
   console.log('S23_AXE',width,route,'violations',result.violations.length,'incomplete',result.incomplete.map(x=>x.id+':'+x.nodes.length).join(','));
  }
  await ctx.close();
 }
 const summary={node:process.version,chromium:browser.version(),axe:axe.version,scans:scans.length,
  violations:scans.flatMap(x=>x.violations.map(y=>({width:x.width,route:x.route,id:y.id,impact:y.impact}))),
  incompleteRules:Object.fromEntries([...new Set(scans.flatMap(x=>x.incomplete.map(y=>y.id)))].map(id=>[id,{scenarios:scans.filter(x=>x.incomplete.some(y=>y.id===id)).length,nodes:scans.reduce((n,x)=>n+(x.incomplete.find(y=>y.id===id)?.nodes.length||0),0)}]))};
 fs.writeFileSync(path.join(OUT,'axe-elementos-inconclusivos.json'),JSON.stringify({summary,scans},null,2));
 console.log('S23_AXE_RESUMO',JSON.stringify(summary));
 if(summary.violations.length)throw Error('Violações axe-core confirmadas; investigar relatório antes de publicação');
}
main().catch(e=>{console.error('FALHA_AXE_S23:',e.stack||e);process.exitCode=1})
 .finally(async()=>{if(browser)await browser.close();if(server.listening)await new Promise(ok=>server.close(ok))});
