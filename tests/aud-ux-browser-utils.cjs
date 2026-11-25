'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict'),axe=require('axe-core');
exports.server=async root=>{
 const server=http.createServer((req,res)=>{const f=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname.replace(/\/$/,'/index.html'));if(!f.startsWith(root+path.sep)){res.writeHead(403);return res.end()}
 fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'content-type':({'.html':'text/html;charset=utf-8','.js':'application/javascript','.mjs':'application/javascript','.css':'text/css','.json':'application/json'})[path.extname(f)]||'application/octet-stream'});res.end(e?'missing':b)})});
 await new Promise(r=>server.listen(0,'127.0.0.1',r));return {base:'http://127.0.0.1:'+server.address().port+'/',close:()=>server.close()};
};
exports.scan=async p=>{
 if(!await p.evaluate(()=>typeof axe!=='undefined'))await p.addScriptTag({content:axe.source});
 const report=await p.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return {violations:r.violations.map(x=>({id:x.id,targets:x.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(x=>({id:x.id,targets:x.nodes.map(n=>n.target)}))}});
 assert.deepEqual(report.violations,[]);report.rechecks=[];
 for(const rule of report.incomplete)for(const target of rule.targets){
  assert.equal(target.length,1);const loc=p.locator(target[0]);assert.equal(await loc.count(),1);await loc.scrollIntoViewIfNeeded();
  const result=await p.evaluate(async({id,target})=>{const n=document.querySelector(target[0]),b=n.getBoundingClientRect(),r=await axe.run(document,{runOnly:{type:'rule',values:[id]}}),hits=k=>r[k].flatMap(x=>x.nodes.filter(n=>JSON.stringify(n.target)===JSON.stringify(target))).length;return {id,target,visible:b.width>0&&b.height>0&&b.bottom>0&&b.top<innerHeight,passed:hits('passes'),failed:hits('violations'),incomplete:hits('incomplete')}},{id:rule.id,target});
  assert.ok(result.visible&&result.passed>0&&!result.failed&&!result.incomplete,'axe unresolved '+JSON.stringify(result));report.rechecks.push(result);
 }
 assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'overflow');return report;
};
