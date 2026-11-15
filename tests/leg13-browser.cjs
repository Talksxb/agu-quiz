/* LEG13 — prova sintética de foco, filtros, armazenamento adversarial e axe da Home ⇄ lista. */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-leg13');
const KEY='agu_leitor_juridico_s13_v1';
const SERVER=http.createServer((req,res)=>{
 const route=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html',file=path.resolve(ROOT,route);
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('forbidden')}
 fs.readFile(file,(err,data)=>{res.writeHead(err?404:200,{'content-type':file.endsWith('.html')?'text/html;charset=utf-8':file.endsWith('.css')?'text/css;charset=utf-8':'application/javascript;charset=utf-8','cache-control':'no-store'});res.end(err?'missing':data)});
});
let browser;
function assertVisibleFocus(label,geometry){assert.equal(geometry.id,label,'foco no elemento esperado');assert.ok(geometry.top>=-1&&geometry.bottom<=geometry.height+1,'foco fora da área visível '+label+': '+JSON.stringify(geometry));assert.equal(geometry.uncovered,true,'foco encoberto '+label)}
async function focusGeometry(page,selector){return page.evaluate(sel=>{const node=document.querySelector(sel),r=node.getBoundingClientRect(),x=Math.max(1,Math.min(innerWidth-1,r.left+Math.min(r.width/2,15))),y=Math.max(1,Math.min(innerHeight-1,r.top+r.height/2)),top=document.elementFromPoint(x,y);return {id:document.activeElement?.id,top:r.top,bottom:r.bottom,height:innerHeight,uncovered:!!top&&(top===node||node.contains(top)||top.contains(node))}},selector)}
async function audit(page,name,width){const report=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});const nodes=v=>v.map(x=>({id:x.id,impact:x.impact,nodes:x.nodes.map(n=>({target:n.target,html:n.html?.slice(0,160),failureSummary:n.failureSummary}))}));return {violations:nodes(r.violations),incomplete:nodes(r.incomplete),passed:r.passes.map(v=>v.id)}});
 assert.deepEqual(report.violations,[],'violação de acessibilidade '+name+' '+width);
 report.afterScroll=[];
 for(const issue of report.incomplete)for(const node of issue.nodes){const selector=node.target[0];if(typeof selector!=='string'||!await page.locator(selector).count())continue;
  await page.locator(selector).first().scrollIntoViewIfNeeded();const again=await page.evaluate(async({selector,id})=>{const r=await axe.run(document.querySelector(selector),{runOnly:{type:'rule',values:[id]}});return {violations:r.violations.length,incomplete:r.incomplete.length,passed:r.passes.map(v=>v.id)}},{selector,id:issue.id});
  report.afterScroll.push({selector,rule:issue.id,...again,resolution:again.incomplete?'persistente':'reavaliado'});assert.equal(again.violations,0,'violação após rolagem '+selector);
 }
 report.unresolved=report.afterScroll.filter(x=>x.incomplete);
 return report;
}
async function adverse(origin,width,kind){const ctx=await browser.newContext({viewport:{width,height:900},hasTouch:width<500}),p=await ctx.newPage();
 await p.addInitScript(({key,kind})=>{const base={article:'L4717:art2',unit:'L4717:art2:pu:e',notes:{'L4717:art2:pu:e':'nota anterior sintética'},forNotebook:[{id:'pc-leg13-adverse0001',lawId:'L4717',articleId:'L4717:art2',unitId:'L4717:art2:pu:e',topic:null,origin:'leitor',prompt:'Dúvida adversarial?',createdAt:'2026-11-14T20:00:00.000Z',status:'pendente'}]};
  if(kind==='invalid-topic')base.forNotebook[0].topic='ADM-23';localStorage.setItem(key,kind==='bad-json'?'{arquivo inválido':JSON.stringify(base));
  window.__leg13NativeGetItem=Storage.prototype.getItem;
  if(kind==='blocked'||kind==='quota'){
   const name=kind==='blocked'?'getItem':'setItem',native=Storage.prototype[name];Storage.prototype[name]=function(k,...args){if(k===key)throw new DOMException('Acesso local indisponível',kind==='blocked'?'SecurityError':'QuotaExceededError');return native.call(this,k,...args)};
  }
 },{key:KEY,kind});
 await p.goto(origin,{waitUntil:'load'});assert.match(await p.locator('#agu-home-notebook-count').innerText(),kind==='quota'?/1 marcação pendente/:/Contagem indisponível/);
 const raw=await p.evaluate(k=>window.__leg13NativeGetItem.call(localStorage,k),KEY);
 await p.locator('#agu-home-notebook-open').press('Enter');assert.ok(await p.locator('#agu-home-notebook-warning').isVisible());
 assert.equal(await p.evaluate(()=>document.activeElement?.id),kind==='quota'?'agu-caderno-list':'agu-home-notebook-warning');
 assert.equal(await p.evaluate(k=>window.__leg13NativeGetItem.call(localStorage,k),KEY),raw,'bytes da categoria preservados');
 if(kind==='blocked')assert.equal(await p.evaluate(k=>{try{return localStorage.getItem(k)}catch{return 'LEITURA_BLOQUEADA'}},KEY),'LEITURA_BLOQUEADA');
 await p.locator('#agu-home-notebook-return').click();assert.equal(await p.evaluate(()=>document.activeElement?.id),'agu-home-notebook-open');
 await ctx.close();return {kind,warning:true,rawPreserved:true};
}
async function main(){
 await new Promise(ok=>SERVER.listen(0,'127.0.0.1',ok));
 browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 const origin=process.env.AGU_TEST_URL||'http://127.0.0.1:'+SERVER.address().port+'/',results=[];fs.mkdirSync(OUT,{recursive:true});
 for(const width of [320,360,390,430,1280]){
  const blank=await browser.newContext({viewport:{width,height:900}}),empty=await blank.newPage();await empty.goto(origin,{waitUntil:'load'});
  assert.match(await empty.locator('#agu-home-notebook-count').innerText(),/Nenhuma marcação pendente/);assert.equal(await empty.evaluate(k=>localStorage.getItem(k)),null);await blank.close();
  const ctx=await browser.newContext({viewport:{width,height:900},hasTouch:width<=430,reducedMotion:'reduce',acceptDownloads:true}),p=await ctx.newPage(),errors=[];
  p.on('pageerror',e=>errors.push(e.message));p.on('dialog',d=>d.accept());
  await p.addInitScript(key=>{if(localStorage.getItem(key))return;localStorage.setItem(key,JSON.stringify({article:'L4717:art2',unit:'L4717:art2:pu:e',tab:'juris',mobile:'text',notes:{'L4717:art2:pu:e':'Nota de teste prévia'},forNotebook:[
   {id:'pc-leg13-reader0001',lawId:'L4717',articleId:'L4717:art2',unitId:'L4717:art2:pu:e',topic:null,origin:'leitor',prompt:'Motivo versus finalidade?',createdAt:'2026-11-14T20:00:00.000Z',status:'pendente'},
   {id:'pc-leg13-study00001',lawId:null,articleId:null,unitId:null,deviceId:'L9784:art12:caput',sessionId:'ags-leg13-001',topic:'ADM-06',origin:'estudo_integrado',prompt:'Delegação e avocação?',createdAt:'2026-11-14T20:00:00.000Z',status:'anotado'},
   {id:'pc-leg13-question01',lawId:null,articleId:null,unitId:null,questionId:'of-2015-adv-006',questionLabel:'AGU 2015 · Q6 · 187AGU_001_07',topic:'ADM-17',origin:'questao_verificada',prompt:'Motivação por remissão?',createdAt:'2026-11-14T20:00:00.000Z',status:'dispensado'},
   {id:'pc-leg13-card00001',lawId:null,articleId:null,unitId:null,cardId:'ri-adm-01',cardLabel:'Flashcard ri-adm-01 · ADM-06',topic:'ADM-06',origin:'flashcard_existente',prompt:'Quando avocar?',createdAt:'2026-11-14T20:00:00.000Z',status:'pendente'}
  ]}))},KEY);
  await p.goto(origin,{waitUntil:'load'});assert.match(await p.locator('#agu-home-notebook-count').innerText(),/2 marcações pendentes/);
  await p.evaluate(()=>{AGUStudy.start('L9784:art12:caput');AGUReview.deckStart('ADM-06');setView('dashboard')});
  const before=await p.evaluate(k=>({other:Object.fromEntries(Object.entries(localStorage).filter(([key])=>key!==k)),reader:AGULegal.peek(),study:AGUStudy.peek(),deck:AGUReview.deckSession()}),KEY);
  const a11y={};if(width===390||width===1280){await p.addScriptTag({content:axe.source});a11y.home=await audit(p,'home',width)}
  await p.screenshot({path:path.join(OUT,'home-'+width+'.png')});
  const home=p.locator('#agu-home-notebook-open');if(width===390)await home.tap();else await home.press(width===360||width===1280?'Space':'Enter');
  assertVisibleFocus('agu-caderno-list',await focusGeometry(p,'#agu-caderno-list'));
  assert.equal(await p.locator('#agu-caderno-list').count(),1);
  if(width===390||width===1280)a11y.list=await audit(p,'list',width);
  await p.screenshot({path:path.join(OUT,'lista-'+width+'.png')});
  await p.locator('#agu-caderno-filter-status').selectOption('todos');assert.equal(await p.locator('.agu-paper-item').count(),4);assert.equal(await p.evaluate(()=>document.activeElement?.id),'agu-caderno-filter-status');
  await p.locator('#agu-caderno-filter-topic').selectOption('sem_tema');assert.equal(await p.locator('.agu-paper-item').count(),1);
  await p.locator('#agu-caderno-filter-topic').selectOption('ADM-06');assert.equal(await p.locator('.agu-paper-item').count(),2);
  await p.locator('#agu-caderno-filter-status').selectOption('pendente');assert.equal(await p.locator('.agu-paper-item').count(),1);
  await p.locator('#agu-caderno-filter-topic').selectOption('todos');await p.locator('#agu-caderno-filter-status').selectOption('todos');
  const chosen=p.locator('.agu-paper-item').filter({hasText:'Motivo versus finalidade?'});await chosen.getByRole('button',{name:'Editar'}).click();
  assert.equal(await p.evaluate(()=>document.activeElement?.id),'agu-caderno-brief');await p.locator('#agu-caderno-brief').fill('Como identificar desvio de finalidade?');await p.locator('#agu-caderno-save').click();
  const ids=await p.evaluate(()=>AGULegal.peek().forNotebook.map(x=>x.id));assert.deepEqual(ids,before.reader.forNotebook.map(x=>x.id));
  const edited=p.locator('.agu-paper-item').filter({hasText:'Como identificar desvio de finalidade?'});
  await edited.getByRole('button',{name:'Marcar como anotado'}).press('Enter');assert.equal(await p.evaluate(()=>AGULegal.peek().forNotebook[0].status),'anotado');
  await p.locator('#agu-home-notebook-return').click();assert.equal(await p.evaluate(()=>document.activeElement?.id),'agu-home-notebook-open');
  assert.match(await p.locator('#agu-home-notebook-count').innerText(),/1 marcação pendente/);
  const after=await p.evaluate(k=>({other:Object.fromEntries(Object.entries(localStorage).filter(([key])=>key!==k)),study:AGUStudy.peek(),deck:AGUReview.deckSession()}),KEY);
  assert.deepEqual(after.other,before.other);assert.deepEqual(after.study,before.study);assert.deepEqual(after.deck,before.deck);
  await p.locator('#agu-home-notebook-open').click();await p.locator('#agu-caderno-filter-status').selectOption('todos');
  const again=p.locator('.agu-paper-item').filter({hasText:'Como identificar desvio de finalidade?'});
  await again.getByRole('button',{name:'Dispensar'}).click();await p.locator('.agu-paper-item').filter({hasText:'Como identificar desvio de finalidade?'}).getByRole('button',{name:'Manter pendente'}).click();
  assert.equal(await p.evaluate(()=>AGULegal.peek().forNotebook[0].status),'pendente');await p.locator('#agu-home-notebook-return').click();
  assert.match(await p.locator('#agu-home-notebook-count').innerText(),/2 marcações pendentes/);
  await p.evaluate(()=>{document.documentElement.style.fontSize='200%'});await p.locator('#agu-home-notebook-open').scrollIntoViewIfNeeded();
  const zoom=await p.evaluate(()=>({overflow:document.documentElement.scrollWidth>innerWidth+2,excessPx:document.documentElement.scrollWidth-innerWidth,button:(()=>{const r=document.querySelector('#agu-home-notebook-open').getBoundingClientRect();return {left:r.left,right:r.right,viewport:innerWidth}})(),
   offenders:[...document.querySelectorAll('body *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.right>innerWidth+2&&!e.closest('.secondary-nav')}).slice(0,12).map(e=>{const r=e.getBoundingClientRect();return {tag:e.tagName,id:e.id,className:typeof e.className==='string'?e.className.slice(0,65):'',right:Math.round(r.right),text:e.textContent?.trim().slice(0,45)}})}));
  assert.ok(zoom.button.left>=-1&&zoom.button.right<=width+2,'atalho fora do viewport após ampliação de fonte');
  await p.screenshot({path:path.join(OUT,'home-zoom-'+width+'.png')});
  await p.evaluate(()=>{document.documentElement.style.fontSize=''});
  await p.reload();assert.match(await p.locator('#agu-home-notebook-count').innerText(),/2 marcações pendentes/);
  assert.equal(await p.evaluate(()=>AGULegal.peek().forNotebook.length),4);assert.deepEqual(errors,[]);
  if(width===390||width===1280)fs.writeFileSync(path.join(OUT,'axe-'+width+'.json'),JSON.stringify(a11y,null,2));
  results.push({width,empty:true,origins:4,manualStates:true,focus:true,motorsPreserved:true,zoom,a11y});await ctx.close();
 }
 const adversarial=[];for(const kind of ['bad-json','invalid-topic','blocked','quota'])adversarial.push(await adverse(origin,390,kind));
 fs.writeFileSync(path.join(OUT,'jornada.json'),JSON.stringify({origin,browser:browser.version(),axe:axe.version,results,adversarial},null,2));
 console.log('LEG13_AXE',JSON.stringify(results.filter(x=>x.a11y.list).map(x=>({width:x.width,home:{violations:x.a11y.home.violations.length,incomplete:x.a11y.home.incomplete.reduce((n,v)=>n+v.nodes.length,0),passed:x.a11y.home.passed.length},list:{violations:x.a11y.list.violations.length,incomplete:x.a11y.list.incomplete.reduce((n,v)=>n+v.nodes.length,0),passed:x.a11y.list.passed.length,unresolved:x.a11y.list.unresolved.length}}))));
 console.log('LEG13_BROWSER_OK',JSON.stringify({origin,widths:results.map(r=>r.width),adversarial:adversarial.map(a=>a.kind),zoom:results.map(r=>r.zoom)}));
}
main().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{await browser?.close();SERVER.close()});
