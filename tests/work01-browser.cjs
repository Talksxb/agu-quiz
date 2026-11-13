/* WORK 01 — jornada por teclado, retomada e resposta real, somente dados sintéticos. */
'use strict';
const {chromium}=require('playwright'),http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-work01');
const server=http.createServer((req,res)=>{
 const f=path.resolve(ROOT,decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html');
 if(!f.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end()}
 fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'content-type':f.endsWith('.html')?'text/html;charset=utf-8':'application/javascript;charset=utf-8','cache-control':'no-store'});res.end(e?'missing':b)});
});
let browser;
async function main(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 const origin=process.env.AGU_TEST_URL||'http://127.0.0.1:'+server.address().port+'/';
 const results=[];
 for(const width of [320,360,390,430,1280]){
  const ctx=await browser.newContext({viewport:{width,height:850},reducedMotion:'reduce'}),page=await ctx.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin,{waitUntil:'load'});
  assert.equal(await page.locator('#main h1').innerText(),'Meu estudo de hoje');
  assert.equal(await page.evaluate(()=>localStorage.length),0,'entrada não grava histórico nem plano');
  const cta=page.getByRole('button',{name:'Continuar estudando',exact:true});
  const box=await cta.boundingBox();assert.ok(box.y+box.height<=850,'ação principal aparece na primeira tela '+width);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'sem overflow '+width);
  if(width===390){fs.mkdirSync(OUT,{recursive:true});await page.screenshot({path:path.join(OUT,'meu-estudo-390.png')})}
  await cta.press('Enter');
  assert.equal(await page.evaluate(()=>document.activeElement===document.querySelector('#main h1')),true,'foco no título após entrada');
  assert.equal(await page.evaluate(()=>AGUStudy.active().deviceId),'L9784:art11:caput');
  await page.getByRole('button',{name:'Caderno AGU',exact:true}).click();
  const id=await page.evaluate(()=>AGUStudy.active().id);
  await page.getByRole('button',{name:'Início',exact:true}).click();
  const beforeResume=await page.evaluate(()=>JSON.stringify({...localStorage}));
  await page.reload({waitUntil:'load'});
  assert.equal(await page.evaluate(()=>JSON.stringify({...localStorage})),beforeResume,'reabrir home preserva todos os dados salvos');
  assert.ok((await page.locator('.daily-mission').innerText()).includes('Caderno AGU'));
  await page.getByRole('button',{name:'Continuar estudando',exact:true}).press('Space');
  assert.deepEqual(await page.evaluate(()=>({id:AGUStudy.active().id,stage:AGUStudy.active().stage,count:AGUStudy.peek().sessions.length})),{id,stage:'caderno',count:1});
  // Fixture de sessão com questão já cotejada: nenhuma nova fonte ou gabarito.
  await page.evaluate(()=>{AGUStudy.finish();AGUStudy.start('CF88:art131:caput');AGULegal.unit('CF88:art131:caput');AGULegal.tab('questoes');AGUQuestions18.choose('of-2015-adv-048')});
  assert.equal(await page.getByRole('link',{name:'Caderno original PDF',exact:true}).count(),1);
  await page.getByRole('button',{name:'CERTO',exact:true}).click();
  await page.getByRole('button',{name:'Conferir resposta',exact:true}).click();
  await page.getByRole('button',{name:'Lembrei',exact:true}).click();
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),1,'uma resposta efetiva');
  if(width<=850)await page.getByRole('button',{name:'Texto legal',exact:true}).click();
  assert.ok(await page.getByRole('link',{name:'Abrir texto oficial completo da norma',exact:true}).isVisible(),'conteúdo relacionado e fonte oficial acessíveis');
  await page.getByRole('button',{name:'Início',exact:true}).click();
  const beforeReload=await page.evaluate(()=>JSON.stringify({...localStorage}));
  await page.reload({waitUntil:'load'});
  assert.equal(await page.evaluate(()=>JSON.stringify({...localStorage})),beforeReload,'retornar e recarregar preserva progresso integral');
  await page.getByRole('button',{name:'Continuar estudando',exact:true}).click();
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),1,'retomada não duplica resposta');
  assert.equal(await page.evaluate(()=>AGUStudy.active().stage),'revisao');
  assert.deepEqual(errors,[]);results.push({width,overflow:false,resume:true,attempts:1});await ctx.close();
 }
 fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(path.join(OUT,'jornada.json'),JSON.stringify({target:origin,chromium:browser.version(),results},null,2));
 console.log('WORK01_BROWSER_OK',JSON.stringify({target:origin,chromium:browser.version(),results}));
}
main().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
