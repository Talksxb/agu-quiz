/* LEIT-META-002-INT — jornada real em Chromium (inclui viewports móveis emulados; não Android físico). */
'use strict';
const {chromium}=require('playwright'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(__dirname,'artifacts-leit-meta');
const PUBLIC=process.env.AGU_TEST_URL||'';
const server=PUBLIC?null:http.createServer((req,res)=>{
 const name=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html';
 const file=path.resolve(ROOT,name);
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('Forbidden')}
 fs.readFile(file,(err,data)=>{res.writeHead(err?404:200,{'content-type':file.endsWith('.html')?'text/html; charset=utf-8':'application/javascript; charset=utf-8'});res.end(err?'Missing':data)})
});
async function run(){
 fs.mkdirSync(OUT,{recursive:true});
 if(server)await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const root=PUBLIC||'http://127.0.0.1:'+server.address().port+'/';
 const browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 const evidence=[];
 try{
 for(const width of [320,390,768,1280]){
  const context=await browser.newContext({viewport:{width,height:850},hasTouch:width<850,deviceScaleFactor:1});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(root,{waitUntil:'load'});
  await page.evaluate(()=>setView('library'));
  await page.getByRole('link',{name:/Método AGU/}).click();
  await page.getByText('Recursos de leitura já disponíveis',{exact:true}).click();
  const link=page.getByRole('link',{name:/Laboratório de Leitura Jurídica/});
  assert.equal(await link.isVisible(),true,'link no acervo: '+width);
  assert.equal(await link.getAttribute('href'),'laboratorio-leitura.html');
  await link.click();
  await page.waitForURL(/laboratorio-leitura\.html$/);
  await page.getByRole('button',{name:'Iniciar leitura'}).click();
  assert.equal(await page.locator('#reading').isVisible(),true);
  assert.equal(await page.locator('#read-title').evaluate(el=>document.activeElement===el),true,'foco na etapa de leitura');
  await page.getByRole('button',{name:'Pausar',exact:true}).click();
  await page.getByRole('button',{name:'Continuar',exact:true}).click();
  await page.getByRole('button',{name:/Concluir leitura/}).click();
  assert.equal(await page.locator('#evaluation').isVisible(),true);
  assert.equal(await page.locator('#evaluate-title').evaluate(el=>document.activeElement===el),true,'foco na avaliação');
  await page.locator('input[name="q0"][value="0"]').check();
  await page.locator('input[name="q1"][value="2"]').check();
  await page.locator('input[name="q2"][value="1"]').check();
  await page.locator('#open-answer').fill('O problema é a transferência excessiva de dados. É necessário limitar a finalidade e o acesso antes de contratar.');
  await page.getByRole('button',{name:'Corrigir questões objetivas'}).click();
  assert.equal(await page.locator('#score').innerText(),'3/3');
  assert.equal(await page.locator('#results-title').evaluate(el=>document.activeElement===el),true,'foco no resultado');
  const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('agu_leitura_lab_v1')||'[]'));
  assert.equal(saved.length,1);
  assert.equal(JSON.stringify(saved).includes('O problema é'),false,'resposta livre não é armazenada');
  assert.equal(await page.locator('#history .history-item').count(),1);
  const dimensions=await page.evaluate(()=>({page:document.documentElement.scrollWidth,viewport:innerWidth}));
  assert.ok(dimensions.page<=dimensions.viewport+1,'sem overflow horizontal em '+width);
  await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
  const violations=await page.evaluate(async()=>{const result=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return result.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.length}))});
  assert.deepEqual(violations,[],'axe WCAG A/AA em '+width+': '+JSON.stringify(violations));
  assert.deepEqual(errors,[],'nenhum erro de JS '+width);
  await page.screenshot({path:path.join(OUT,'leitura-'+width+'.png'),fullPage:true});
  evidence.push({width,dimensions,objective:'3/3',stored:saved.length,axeViolations:violations.length});
  await context.close();
 }
 // Teste independente de leitura guiada, pausa, retorno e foco em tela de celular.
 const ctx=await browser.newContext({viewport:{width:390,height:844},hasTouch:true});
 const page=await ctx.newPage();await page.goto(new URL('laboratorio-leitura.html',root).href);
 await page.locator('#mode').selectOption('guided');
 await page.getByRole('button',{name:'Iniciar leitura'}).click();
 assert.equal(await page.locator('#guided').isVisible(),true);
 assert.match(await page.locator('#sentence-count').innerText(),/Frase 1 de/);
 await page.getByRole('button',{name:'Pausar',exact:true}).click();
 await page.getByRole('button',{name:'Voltar uma frase'}).click();
 assert.match(await page.locator('#sentence-count').innerText(),/Frase 1 de/);
 await page.getByRole('button',{name:'Continuar',exact:true}).click();
 await page.getByRole('button',{name:/Concluir leitura/}).click();
 assert.equal(await page.locator('#evaluation').isVisible(),true);
 await ctx.close();
 fs.writeFileSync(path.join(OUT,'resultado.json'),JSON.stringify(evidence,null,2)+'\n');
 console.log('LEIT_META_002_CHROMIUM_OK',JSON.stringify({runs:evidence,guided:'ok'}));
 }finally{await browser.close();if(server)server.close()}
}
run().catch(e=>{console.error('LEIT_META_002_CHROMIUM_FAIL',e.stack||e);process.exitCode=1;if(server)server.close()});
