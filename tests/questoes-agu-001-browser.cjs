const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict'),http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),pdf=process.env.AGU2023_PDF;
assert(pdf&&fs.existsSync(pdf),'PDF oficial precisa estar disponível para o teste');
const server=http.createServer((req,res)=>{const p=path.resolve(root,'.'+new URL(req.url,'http://localhost').pathname);if(!p.startsWith(root+path.sep)||!fs.existsSync(p)||!fs.statSync(p).isFile()){res.writeHead(404);res.end();return}const ext=path.extname(p);res.setHeader('Content-Type',({'.html':'text/html; charset=utf-8','.js':'application/javascript','.mjs':'application/javascript','.css':'text/css','.json':'application/json'})[ext]||'application/octet-stream');fs.createReadStream(p).pipe(res)});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin='http://127.0.0.1:'+server.address().port;const b=await chromium.launch({headless:true});const out=path.join(root,'tests','artifacts-questoes-agu-001');fs.mkdirSync(out,{recursive:true});
const reports=[];try{
for(const width of [320,360,390,430,768,1280]){
 const p=await b.newPage({viewport:{width,height:850}});await p.route('**/*',r=>r.request().url().startsWith(origin)||r.request().url().startsWith('blob:')?r.continue():r.abort());
 await p.goto(origin+'/index.html');await p.evaluate(()=>setView('officialExam'));await p.locator('#agu-question-bank').waitFor();assert.equal(await p.locator('#aq-number option').count(),100);
 assert(await p.locator('#aq-submit').isDisabled());await p.screenshot({path:path.join(out,'antes-'+width+'.png'),fullPage:true});
 assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow '+width);
 await p.locator('#aq-confirm').check();await p.locator('#aq-file').setInputFiles(pdf);
 await p.locator('#aq-pdf canvas').waitFor({timeout:90000});
 assert((await p.locator('#aq-status').textContent()).includes('100 cabeçalhos'));
 if(width===390){for(let n=1;n<=100;n++){await p.locator('#aq-number').selectOption(String(n));await p.locator('#aq-pdf canvas').waitFor({timeout:30000});assert((await p.locator('#aq-title').textContent()).includes('Questão '+n));await p.waitForFunction(()=>document.getElementById('aq-page-label')?.textContent.includes('PDF · página'));if([7,25,30,41,50,54,81].includes(n))assert.equal(await p.locator('#aq-submit').count(),0)}await p.locator('#aq-number').selectOption('1');await p.locator('#aq-pdf canvas').waitFor()}
 await p.screenshot({path:path.join(out,'prova-'+width+'.png'),fullPage:true});
 assert(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'overflow após importar '+width);
 await p.locator('input[name="aq-answer"][value="A"]').check();await p.locator('#aq-submit').click();
 await p.getByText('Gabarito definitivo de 2023: A.').waitFor();
 await p.locator('#aq-number').selectOption('7');await p.getByText('Questão anulada.',{exact:true}).waitFor();
 assert.equal(await p.locator('#aq-submit').count(),0);
 await p.reload();await p.evaluate(()=>setView('officialExam'));assert(await p.locator('#aq-number').inputValue()==='7');assert((await p.locator('.aq-stats').innerText()).includes('1'));
 await p.addScriptTag({content:axe.source});const report=await p.evaluate(()=>axe.run(document.getElementById('agu-question-bank')));reports.push({width,violations:report.violations.map(x=>x.id),incomplete:report.incomplete.map(x=>x.id)});await p.close();
}
}finally{fs.writeFileSync(path.join(out,'axe.json'),JSON.stringify(reports,null,2));await b.close();server.close()}
assert(reports.every(r=>!r.violations.length),'axe violações');console.log(JSON.stringify(reports));})().catch(e=>{console.error(e);server.close();process.exitCode=1});
