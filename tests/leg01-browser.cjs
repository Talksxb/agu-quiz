/* LEG-01: leitor real, notas e catálogo ampliado somente em fixture sintética. */
'use strict';
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-leg01');
const server=http.createServer((req,res)=>{const f=path.resolve(ROOT,decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html');if(!f.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end()}fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'content-type':f.endsWith('.html')?'text/html;charset=utf-8':'application/javascript;charset=utf-8'});res.end(e?'missing':b)})});
let browser;
async function main(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));browser=await chromium.launch({headless:true,args:['--no-sandbox']});const origin='http://127.0.0.1:'+server.address().port+'/',results=[];
 for(const width of [320,360,390,430,1280]){
  const ctx=await browser.newContext({viewport:{width,height:850}}),p=await ctx.newPage(),errors=[];p.on('pageerror',e=>errors.push(e.message));await p.goto(origin);
  await p.evaluate(()=>{setView('legal');AGULegal.unit('L9784:art13:II');AGULegal.tab('comentarios')});
  await p.locator('#agu-legal-note').fill('Anotação sintética LEG01: preservar o inciso II.');await p.locator('#agu-save-note').press('Enter');
  const before=await p.evaluate(()=>localStorage.getItem('agu_leitor_juridico_s13_v1'));
  await p.reload();await p.evaluate(()=>setView('legal'));
  assert.equal(await p.evaluate(()=>localStorage.getItem('agu_leitor_juridico_s13_v1')),before,'recarregar não reescreve notas '+width);
  assert.equal(await p.locator('#agu-legal-note').inputValue(),'Anotação sintética LEG01: preservar o inciso II.');
  if(width<=850)await p.getByRole('button',{name:'Texto legal',exact:true}).click();
  assert.ok((await p.locator('.agu-document').innerText()).includes('Texto integral incorporado'));
  assert.equal(await p.getByRole('link',{name:'Abrir texto oficial completo da norma',exact:true}).count(),1);
  assert.deepEqual(await p.evaluate(()=>AGULegal.stats()),{laws:4,articles:240,units:996,relations:18});
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2));
  assert.deepEqual(errors,[]);results.push({width,legacyNotes:true,integralLabel:true});await ctx.close();
 }
 // Segundo corpus só intercepta uma resposta no contexto descartável, sem alterar o repo.
 const e={};e.window=e;vm.runInNewContext(fs.readFileSync(path.join(ROOT,'dados/legislacao-s13.js'),'utf8'),e);
 e.AGU_LEGAL_CORPUS.laws[1].articles.push({id:'L9784:artTEST',label:'Artigo sintético — não é legislação',topic:null,contentKind:'isolated_article',structurePath:['L9784:chapterVI'],textVerification:{status:'pending'},clauses:[{id:'L9784:artTEST:caput',label:'Ensaio',text:'Texto exclusivamente sintético.',kind:'caput',parentId:'L9784:artTEST'}]});
 for(const width of [390,1280]){
  const ctx=await browser.newContext({viewport:{width,height:850}}),p=await ctx.newPage();
  await p.route('**/dados/legislacao-s13.js?*',r=>r.fulfill({contentType:'application/javascript',body:'window.AGU_LEGAL_CORPUS='+JSON.stringify(e.AGU_LEGAL_CORPUS)}));
  await p.goto(origin);await p.evaluate(()=>{setView('legal');AGULegal.article('L9784:artTEST');AGULegal.tab('estudo')});
  assert.ok((await p.locator('.agu-related').innerText()).includes('ainda não tem vínculo curricular'));
  assert.equal(await p.evaluate(()=>AGUStudy.peek().sessions.length),0);
  await p.evaluate(()=>AGULegal.tab('comentarios'));await p.locator('#agu-legal-note').fill('Comentário sintético sem vínculo curricular');await p.locator('#agu-save-note').click();
  const stored=await p.evaluate(()=>localStorage.getItem('agu_leitor_juridico_s13_v1'));await p.reload();assert.equal(await p.evaluate(()=>localStorage.getItem('agu_leitor_juridico_s13_v1')),stored);
  results.push({width,syntheticUnmapped:true,noInvalidSession:true});
  if(width===390){await p.evaluate(()=>{setView('legal');AGULegal.mobile('text')});fs.mkdirSync(OUT,{recursive:true});await p.screenshot({path:path.join(OUT,'leitor-sintetico-390.png')})}await ctx.close();
 }
 fs.mkdirSync(OUT,{recursive:true});fs.writeFileSync(path.join(OUT,'catalogo-e-notas.json'),JSON.stringify({browser:browser.version(),results},null,2));console.log('LEG01_BROWSER_OK',JSON.stringify({browser:browser.version(),results}));
}
main().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
