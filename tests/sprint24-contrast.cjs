/* AGU Quiz Sprint 24 — contraste visível, rolagem horizontal, teclado e touch emulado.
 * Chromium de desktop, NÃO Android físico/TalkBack. Somente perfis e dados sintéticos.
 * Reclassifica incompletos anteriores após trazer o controle para dentro do viewport.
 */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core');
const http=require('node:http'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-s24');
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
 console.log('S24_RUNTIME',JSON.stringify({node:process.version,chromium:browser.version(),axe:axe.version}));
 const origin='http://127.0.0.1:'+server.address().port+'/';
 const result=[],focusRecords=[];
 for(const width of [320,360,390,430,1280]){
  const ctx=await browser.newContext({viewport:{width,height:850},reducedMotion:'reduce'}),page=await ctx.newPage();
  await page.goto(origin,{waitUntil:'load'});await page.addScriptTag({content:axe.source});
  const routes=width===390||width===1280?['dashboard','study','library','evolution','officialExam','legal','settings']:['dashboard','study','library','evolution'];
  for(const route of routes){
   await page.evaluate(r=>window.setView(r),route);
   const start=await page.evaluate(async()=>{
    const a=await window.axe.run(document,{runOnly:{type:'rule',values:['color-contrast']}});
    return {incomplete:a.incomplete.flatMap(x=>x.nodes.map(n=>({target:n.target[0],reason:n.any[0]?.data?.messageKey}))),
     violations:a.violations.map(x=>({id:x.id,nodes:x.nodes.map(n=>n.target[0])}))};
   });
   const trials=[];
   for(const item of start.incomplete){
    const found=await page.evaluate(async selector=>{
     const el=document.querySelector(selector);if(!el)return {selector,missing:true};
     const bounds=element=>{const nav=element.closest('.secondary-nav'),r=element.getBoundingClientRect(),n=nav?.getBoundingClientRect();
      return {left:Math.round(r.left),right:Math.round(r.right),viewport:innerWidth,
       navLeft:n?Math.round(n.left):null,navRight:n?Math.round(n.right):null,
       fullyVisible:!!n&&r.left>=n.left-1&&r.right<=n.right+1,
       scrollLeft:nav?.scrollLeft||0,scrollMax:nav?nav.scrollWidth-nav.clientWidth:0};};
     const pre=bounds(el);
     el.scrollIntoView({inline:'center',block:'nearest'});
     await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
     const post=bounds(el);
     const scan=await window.axe.run(document,{runOnly:{type:'rule',values:['color-contrast']}});
     const includes=(list)=>list.some(x=>x.nodes.some(n=>n.target.some(s=>s===selector)));
     return {selector,pre,post,after:includes(scan.violations)?'violation':includes(scan.incomplete)?'incomplete':includes(scan.passes)?'passed':'not_classified',
      violationCount:scan.violations.length};
    },item.target);
    trials.push({...item,...found});
   }
   result.push({width,route,start,trials});
   console.log('S24_SCROLL',width,route,'initial',start.incomplete.length,'after',trials.map(x=>x.after).join(','));
  }
  // Foco por teclado em item inicialmente fora do campo horizontal, quando existente.
  await page.evaluate(()=>window.setView('study'));
  const target=page.getByRole('button',{name:'Plano semanal',exact:true});
  const inspectFocus=()=>page.evaluate(async()=>{
   await new Promise(done=>requestAnimationFrame(()=>requestAnimationFrame(done)));
   const e=document.activeElement,n=e.closest('.secondary-nav'),r=e.getBoundingClientRect(),b=n.getBoundingClientRect();
   return {text:e.textContent.trim(),visible:r.left>=b.left-1&&r.right<=b.right+1,scroll:n.scrollLeft,
    rect:{left:r.left,right:r.right},nav:{left:b.left,right:b.right,scrollWidth:n.scrollWidth,clientWidth:n.clientWidth}};
  });
  await target.focus();const programmaticFocus=await inspectFocus();
  await page.getByRole('button',{name:'Explorar temas',exact:true}).focus();
  await page.keyboard.press('Tab');const keyboardFocus=await inspectFocus();
  focusRecords.push({width,programmaticFocus,keyboardFocus});
  console.log('S24_FOCUS',JSON.stringify({width,programmaticFocus,keyboardFocus}));
  assert.equal(keyboardFocus.text,'Plano semanal');
  assert.equal(programmaticFocus.visible,true,'foco direto precisa revelar todo o botão '+width);
  assert.equal(keyboardFocus.visible,true,'Tab precisa revelar todo o botão '+width);
  await target.press('Enter');
  assert.equal(await page.evaluate(()=>document.activeElement?.tagName),'H1','foco permanece visível após rota '+width);
  await ctx.close();
 }
 const touches=[];
 for(const width of [320,390,430]){
  const ctx=await browser.newContext({viewport:{width,height:850},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:'reduce'});
  const page=await ctx.newPage();await page.goto(origin,{waitUntil:'load'});
  await page.getByRole('button',{name:'Estudar',exact:true}).tap();
  await page.getByRole('button',{name:'Plano semanal',exact:true}).tap();
  assert.equal(await page.locator('#main h1').innerText(),'Planejamento semanal');
  await page.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).tap();
  await page.getByRole('button',{name:'Materiais',exact:true}).tap();
  await page.getByRole('button',{name:'Evolução',exact:true}).tap();
  await page.getByRole('button',{name:'Dados e backup',exact:true}).tap();
  assert.equal(await page.getByRole('button',{name:'Restaurar categorias ausentes'}).count(),1);
  const metric=await page.evaluate(()=>({inner:innerWidth,scroll:document.documentElement.scrollWidth,
   attempts:JSON.parse(localStorage.getItem('agu_quiz_revisao_inteligente_v1')||'{"attempts":[]}').attempts.length}));
  assert.ok(metric.scroll<=metric.inner+2,'reflow touch sintético '+width);assert.equal(metric.attempts,0);
  await page.screenshot({path:path.join(OUT,'touch-emulado-'+width+'.png'),fullPage:true});
  touches.push({width,...metric});await ctx.close();console.log('S24_TOUCH_EMULADO',JSON.stringify({width,...metric}));
 }
 const summary={node:process.version,chromium:browser.version(),axe:axe.version,scans:result.length,
  initiallyIncomplete:result.reduce((n,s)=>n+s.start.incomplete.length,0),
  afterScroll:Object.fromEntries([...new Set(result.flatMap(s=>s.trials.map(t=>t.after)))].map(k=>[k,result.flatMap(s=>s.trials).filter(t=>t.after===k).length])),
  offscreenBecameVisible:result.flatMap(s=>s.trials).filter(t=>t.post?.fullyVisible).length,focusRecords,touches};
 fs.writeFileSync(path.join(OUT,'contraste-rolagem-teclado-touch.json'),JSON.stringify({summary,routes:result},null,2));
 console.log('S24_RESUMO',JSON.stringify(summary));
 if(result.some(s=>s.start.violations.length)||result.some(s=>s.trials.some(t=>t.after==='violation')))throw Error('Violação axe concreta; examinar relatório');
}
main().catch(e=>{console.error('FALHA_S24:',e.stack||e);process.exitCode=1})
 .finally(async()=>{if(browser)await browser.close();if(server.listening)await new Promise(ok=>server.close(ok))});
