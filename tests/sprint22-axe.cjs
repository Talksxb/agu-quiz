/* Sprint 22 — auditoria diagnóstica axe-core no Chromium REAL.
 * Dados de teste não incluem progresso pessoal. Resultado em tests/artifacts-s22/.
 * Este teste RELATA problemas; não certifica acessibilidade WCAG completa.
 */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core'),http=require('node:http');
const fs=require('node:fs'),path=require('node:path');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-s22');
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
 console.log('AXE_S22_RUNTIME Node',process.version,'Chromium',browser.version(),'axe-core',axe.version);
 const report=[];
 for(const width of [320,360,390,430,1280]){
  const ctx=await browser.newContext({viewport:{width,height:850},reducedMotion:'reduce'}),page=await ctx.newPage();
  await page.goto('http://127.0.0.1:'+server.address().port+'/',{waitUntil:'load'});
  await page.addScriptTag({content:axe.source});
  const routes=width===390||width===1280?['dashboard','study','library','evolution','officialExam','legal','settings']:
    ['dashboard','study','library','evolution'];
  for(const route of routes){
   await page.evaluate(v=>window.setView(v),route);
   const findings=await page.evaluate(async()=>{
    const out=await window.axe.run(document,{
      runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}
    });
    return {violations:out.violations.map(v=>({
      id:v.id,impact:v.impact,help:v.help,docs:v.helpUrl,
      targets:v.nodes.slice(0,7).map(n=>n.target)
    })),incomplete:out.incomplete.map(x=>({id:x.id,n:x.nodes.length}))};
   });
   report.push({width,route,...findings});
   const counts=Object.fromEntries(['critical','serious','moderate','minor'].map(s=>[s,findings.violations.filter(x=>x.impact===s).length]));
   console.log('AXE_S22',width,route,JSON.stringify(counts),'incomplete',findings.incomplete.length);
  }
  await ctx.close();
 }
 const summary={runtime:{node:process.version,browser:browser.version(),axe:axe.version},scans:report.length,
  counts:Object.fromEntries(['critical','serious','moderate','minor'].map(s=>[s,report.reduce((n,r)=>n+r.violations.filter(x=>x.impact===s).length,0)])),
  uniqueIssues:[...new Map(report.flatMap(r=>r.violations.map(v=>[v.id,{id:v.id,impact:v.impact,help:v.help,docs:v.docs}]))).values()],
  inconclusiveByRule:Object.fromEntries([...new Set(report.flatMap(r=>r.incomplete.map(x=>x.id)))].map(id=>[
    id,report.filter(r=>r.incomplete.some(x=>x.id===id)).length
  ]))};
 fs.writeFileSync(path.join(OUT,'axe-diagnostico.json'),JSON.stringify({summary,routes:report},null,2));
 console.log('AXE_S22_RESUMO',JSON.stringify(summary));
 console.log('AXE_S22_CONCLUIDO: varredura diagnóstica; conferir avisos antes de afirmar conformidade WCAG.');
}
main().catch(e=>{console.error('FALHA_AXE_S22:',e.stack||e);process.exitCode=1})
 .finally(async()=>{if(browser)await browser.close();if(server.listening)await new Promise(ok=>server.close(ok))});
