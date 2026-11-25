/* INTERFACE-AGU-002: leitor móvel, contexto, seleção, retorno e preservação local. */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(__dirname,'artifacts-interface-agu-002');
const fixture=JSON.stringify({version:1,created:'2026-11-23T12:00:00Z',topic:{},answers:[],sessions:[],reviews:[],notebook:[],seed:false});
const server=process.env.AGU_TEST_URL?null:http.createServer((req,res)=>{
 const name=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html',file=path.resolve(ROOT,name);
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('Forbidden')}
 fs.readFile(file,(err,bytes)=>{
  const ext=path.extname(file);
  res.writeHead(err?404:200,{'content-type':({'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml'})[ext]||'application/javascript; charset=utf-8'});
  res.end(err?'Missing':bytes);
 });
});
async function run(){
 fs.mkdirSync(OUT,{recursive:true});
 if(server)await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 const base=process.env.AGU_TEST_URL||'http://127.0.0.1:'+server.address().port+'/';
 const browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 const results=[];
 try{
  for(const width of [320,390,430,768,980,1100,1280]){
   const mobile=width<=1100,ctx=await browser.newContext({viewport:{width,height:900},hasTouch:mobile,isMobile:mobile,reducedMotion:'reduce',timezoneId:'America/Sao_Paulo'});
   const p=await ctx.newPage(),errors=[];
   p.on('pageerror',e=>errors.push(e.message));
   await p.addInitScript(value=>localStorage.setItem('agu_quiz_mvp1_2026',value),fixture);
   await p.goto(base,{waitUntil:'load'});
   await p.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();
   await p.getByRole('button',{name:/Legislação e materiais/}).click();
   await p.locator('#agu-reader .agu-document h2').waitFor();
   const begin=await p.evaluate(()=>({article:AGULegal.peek().article,unit:AGULegal.peek().unit,notes:AGULegal.peek().notes}));
   assert.ok((await p.locator('.agu-reader-location').innerText()).length>12,'contexto da norma e artigo');
   assert.ok(await p.locator('.agu-reader-back').isVisible(),'retorno ao acervo visível');
   if(mobile){
    const buttons=p.locator('#agu-reader .agu-mobile button');
    assert.deepEqual(await buttons.evaluateAll(es=>es.map(e=>e.getAttribute('aria-pressed'))),['false','true','false'],'estado visível do painel ativo');
    assert.equal(await p.locator('.agu-document').isVisible(),true);
    const readerGeometry=await p.evaluate(()=>{
     const doc=document.querySelector('#agu-reader .agu-document'),unit=doc.querySelector('.agu-unit p');
     const active=document.querySelector('#agu-reader .agu-mobile button[aria-pressed=true]');
     return {documentWidth:doc.getBoundingClientRect().width,viewport:innerWidth,font:parseFloat(getComputedStyle(unit).fontSize),accent:getComputedStyle(active).backgroundColor};
    });
    assert.ok(readerGeometry.documentWidth>=innerWidth*.85,'leitura ocupa a largura móvel '+width+' '+JSON.stringify(readerGeometry));
    assert.ok(readerGeometry.font>=18,'texto legal com fonte de pelo menos 18px '+JSON.stringify(readerGeometry));
    assert.equal(readerGeometry.accent,'rgb(99, 60, 105)','nova identidade no painel ativo');
    await buttons.nth(0).click();
    assert.deepEqual(await buttons.evaluateAll(es=>es.map(e=>e.getAttribute('aria-pressed'))),['true','false','false']);
    assert.equal(await p.locator('.agu-index').isVisible(),true);
    assert.equal(await p.locator('.agu-document').isVisible(),false);
    await p.locator('.agu-index-entry').nth(1).click();
    assert.equal(await p.locator('.agu-document').isVisible(),true);
    assert.equal(await p.locator('.agu-document h2').evaluate(el=>el===document.activeElement),true,'foco segue o artigo escolhido');
    const panelBefore=await p.evaluate(()=>({article:AGULegal.peek().article,unit:AGULegal.peek().unit}));
    await buttons.nth(2).click();
    assert.deepEqual(await buttons.evaluateAll(es=>es.map(e=>e.getAttribute('aria-pressed'))),['false','false','true']);
    assert.equal(await p.locator('.agu-related').isVisible(),true);
    await buttons.nth(1).click();
    assert.deepEqual(await buttons.evaluateAll(es=>es.map(e=>e.getAttribute('aria-pressed'))),['false','true','false']);
    assert.deepEqual(await p.evaluate(()=>({article:AGULegal.peek().article,unit:AGULegal.peek().unit})),panelBefore,'troca de painel não modifica dispositivo');
    await p.evaluate(()=>{window.scrollTo(0,Math.min(420,Math.max(0,document.documentElement.scrollHeight-innerHeight-30)))});
    const beforeY=await p.evaluate(()=>scrollY);
    await p.evaluate(()=>AGULegal.mobile('related',true));
    await p.evaluate(()=>new Promise(ok=>requestAnimationFrame(()=>requestAnimationFrame(ok))));
    await p.evaluate(()=>AGULegal.mobile('text',true));
    await p.evaluate(()=>new Promise(ok=>requestAnimationFrame(()=>requestAnimationFrame(ok))));
    const afterY=await p.evaluate(()=>scrollY);
    if(beforeY>40)assert.ok(Math.abs(afterY-beforeY)<85,'posição ao retornar à leitura: '+beforeY+' -> '+afterY);
    assert.equal(await buttons.nth(1).evaluate(e=>document.activeElement===e),true,'foco no botão de painel');
    await p.evaluate(()=>AGULegal.tab('comentarios',true));
    await p.locator('#agu-legal-note').fill('Anotação sintética INTERFACE-AGU-002');
    await p.locator('#agu-save-note').click();
    assert.equal(await p.evaluate(()=>AGULegal.peek().notes[AGULegal.peek().unit]),'Anotação sintética INTERFACE-AGU-002');
    await p.evaluate(()=>AGULegal.mobile('text',true));
    assert.equal(await p.locator('.agu-document').isVisible(),true);
    // Regressão S32: abrir resultado de busca deve manter a unidade focada e visível.
    await buttons.nth(0).click();
    await p.locator('#agu-reader .agu-s17-search > button').press('Enter');
    await p.locator('#agu-search-q').fill('art. 13');
    await p.locator('#agu-search-q').press('Enter');
    const result=p.locator('#agu-reader .agu-s17-result').filter({hasText:'Lei nº 9.784/1999 · Art. 13 · I'}).first();
    await result.press('Enter');
    await p.evaluate(()=>new Promise(ok=>requestAnimationFrame(()=>requestAnimationFrame(ok))));
    const found=await p.evaluate(()=>{
     const el=document.activeElement,r=el.getBoundingClientRect();
     return {focused:el.classList.contains('agu-unit')&&el.classList.contains('selected'),visible:r.top<innerHeight&&r.bottom>0,unit:AGULegal.peek().unit};
    });
    assert.ok(found.focused&&found.visible,'resultado da busca conserva dispositivo focado e visível '+JSON.stringify(found));
    assert.equal(found.unit,'L9784:art13:I');
   }else{
    assert.equal(await p.locator('.agu-mobile').isVisible(),false,'desktop mantém três painéis');
    assert.equal(await p.locator('.agu-index').isVisible(),true);
    assert.equal(await p.locator('.agu-related').isVisible(),true);
   }
   let overflow=await p.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));
   assert.ok(overflow.scroll<=overflow.width+1,'sem rolagem horizontal '+width+' '+JSON.stringify(overflow));
   await p.locator('#agu-reader').evaluate(el=>el.style.fontSize='200%');
   overflow=await p.evaluate(()=>({scroll:document.documentElement.scrollWidth,width:innerWidth}));
   assert.ok(overflow.scroll<=overflow.width+1,'texto ampliado 200% '+width+' '+JSON.stringify(overflow));
   if(mobile){
    const size=await p.locator('.agu-mobile button').evaluateAll(es=>es.map(e=>({w:e.getBoundingClientRect().width,h:e.getBoundingClientRect().height})));
    assert.ok(size.every(x=>x.w>=44&&x.h>=44),'alvos móveis 44x44 '+JSON.stringify(size));
    const focused=await p.locator('.agu-mobile button').nth(1).evaluate(e=>{e.focus();return {active:document.activeElement===e,outline:getComputedStyle(e).outlineStyle}});
    assert.equal(focused.active,true,'teclado alcança controles');
   }
   let access=null;
   if(width===390||width===1280){
    await p.addScriptTag({content:axe.source});
    access=await p.evaluate(async()=>{
     const r=await axe.run(document.querySelector('#agu-reader'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});
     return {violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(v=>v.id)};
    });
   }
   await p.screenshot({path:path.join(OUT,'leitor-'+width+'.png'),fullPage:true});
   const ending=await p.evaluate(()=>({article:AGULegal.peek().article,unit:AGULegal.peek().unit}));
   await p.locator('.agu-reader-back').click();
   assert.equal(await p.locator('#main h1').innerText(),'Biblioteca Inteligente');
   await p.getByRole('button',{name:/Legislação e materiais/}).click();
   assert.deepEqual(await p.evaluate(()=>({article:AGULegal.peek().article,unit:AGULegal.peek().unit})),ending,'retorno preserva norma e dispositivo');
   assert.equal(await p.evaluate(()=>localStorage.getItem('agu_quiz_mvp1_2026')),fixture,'dados históricos intactos');
   assert.deepEqual(errors,[],'nenhum erro JS');
   results.push({width,mobile,begin,ending,overflow,access,androidPhysical:false,talkBackPhysical:false});
   await ctx.close();
  }
  fs.writeFileSync(path.join(OUT,'relatorio.json'),JSON.stringify(results,null,2)+'\n');
  console.log('INTERFACE_AGU_002_BROWSER_OK',JSON.stringify({profiles:results.length,zoom200:true,androidPhysical:false,talkBackPhysical:false,axeInconclusive:results.filter(x=>x.access?.incomplete?.length).length}));
 }finally{await browser.close();if(server)server.close()}
}
run().catch(e=>{console.error('INTERFACE_AGU_002_FAIL',e.stack||e);process.exitCode=1;if(server)server.close()});
