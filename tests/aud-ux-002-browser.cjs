'use strict';
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const u=require('./aud-ux-browser-utils.cjs'),root=path.resolve(__dirname,'..'),out=path.join(__dirname,'artifacts-aud-ux-002');
let browser,server;const results=[],started=Date.now();
async function open(p,base){await p.goto(base);await p.evaluate(()=>setView('review'));await p.evaluate(()=>document.fonts.ready)}
(async()=>{
 fs.mkdirSync(out,{recursive:true});server=await u.server(root);browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 const old=require('./aud-ux-002-legado.cjs')(fs.readFileSync(path.join(root,'revisao-inteligente.js'),'utf8'));
 for(const width of [320,360,390,430,1280]){
  const config={viewport:{width,height:900},hasTouch:width<500,timezoneId:'America/Sao_Paulo',reducedMotion:'reduce'};
  const prior=await browser.newContext(config),bp=await prior.newPage();await bp.route(url=>url.pathname.endsWith('/revisao-inteligente.js'),r=>r.fulfill({status:200,contentType:'application/javascript',body:old}));await open(bp,server.base);
  const beforeY=await bp.locator('.agu-deck-grid article button').first().evaluate(n=>n.getBoundingClientRect().y);await prior.close();
  const ctx=await browser.newContext(config),p=await ctx.newPage();const errors=[];p.on('pageerror',e=>errors.push(e.message));await open(p,server.base);
  const afterY=await p.locator('.agu-deck-grid article button').first().evaluate(n=>n.getBoundingClientRect().y);assert.ok(afterY<beforeY,'primeiro estudo mais próximo '+width);
  assert.equal(await p.locator('#agu-deck-options').getAttribute('open'),null);assert.ok(await p.locator('#agu-deck-filter-discipline').isVisible());assert.ok(await p.locator('#agu-deck-filter-topic').isVisible());
  const state=await p.evaluate(()=>JSON.stringify(localStorage));await p.locator('#agu-deck-options > summary').press('Enter');assert.ok(await p.locator('#agu-deck-filter-status').isVisible());
  await p.locator('#agu-deck-filter-status').selectOption('futuros');assert.equal(await p.locator('.agu-deck-grid article').count(),0);assert.match(await p.locator('#agu-deck-options summary').innerText(),/ativos/);assert.equal(await p.evaluate(()=>document.activeElement.id),'agu-deck-filter-status');
  await p.getByRole('button',{name:'Limpar filtros',exact:true}).press('Enter');assert.equal(await p.locator('.agu-deck-grid article').count(),11);
  assert.equal(await p.evaluate(()=>JSON.stringify(localStorage)),state,'filtros não gravam aprendizado');
  await p.locator('#agu-deck-filter-discipline').selectOption('CON');await p.locator('#agu-deck-filter-topic').fill('CON-02');await p.locator('#agu-deck-filter-topic').press('Tab');assert.equal(await p.locator('.agu-deck-grid article').count(),1);
  const axe=await u.scan(p);if(width<500)await p.locator('.agu-deck-grid article button').tap();else await p.locator('.agu-deck-grid article button').press('Space');
  await p.locator('#agu-deck-face').press('Enter');await p.getByRole('button',{name:'Errei',exact:true}).press('Enter');assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),1);
  const session=await p.evaluate(()=>AGUReview.deckSession());await p.getByRole('button',{name:'Pausar e voltar',exact:true}).press('Enter');await p.reload();await p.evaluate(()=>setView('review'));await p.getByRole('button',{name:'Retomar sessão',exact:true}).press('Enter');assert.deepEqual(await p.evaluate(()=>AGUReview.deckSession()),session);
  assert.deepEqual(errors,[]);results.push({width,beforeY,afterY,axe,filtersNoWrite:true,keyboard:true,touch:width<500,resume:true});await p.screenshot({path:path.join(out,'sessao-'+width+'.png')});await ctx.close();
 }
 console.log('AUD_UX_002_OK',JSON.stringify(results.map(({axe,...x})=>x)));
})().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{fs.mkdirSync(out,{recursive:true});fs.writeFileSync(path.join(out,'jornada.json'),JSON.stringify({seconds:(Date.now()-started)/1000,browser:browser?.version(),results},null,2));await browser?.close();server?.close()});
