/* UX-AGU-MOBILE-002: comparação com CSS base exato, perfis sintéticos. */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),crypto=require('node:crypto');
const strictAxe=require('./ux-agu-aud-001-axe-recheck.cjs');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(__dirname,'artifacts-ux-agu-mobile-002');
const current=fs.readFileSync(path.join(ROOT,'interface-agu.css'),'utf8'),marker='/* UX-AGU-MOBILE-002 —';
assert.equal(current.split(marker).length,2,'delta único');
const original=current.split(marker)[0].replace(/\n$/,'');
const blob=s=>crypto.createHash('sha1').update('blob '+Buffer.byteLength(s)+'\0').update(s).digest('hex');
assert.equal(blob(original),'bd9d3ac3981715d5f4fc7a7d76d17cbc9bb36881','base exata; não atualizar histórico');
const server=http.createServer((req,res)=>{
 const rel=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/+/,''),file=path.resolve(ROOT,rel||'index.html');
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('forbidden')}
 fs.readFile(file,(e,b)=>{res.writeHead(e?404:200,{'content-type':({'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml'})[path.extname(file)]||'application/javascript; charset=utf-8','cache-control':'no-store'});res.end(e?'missing':b)});
});
async function main(){
 fs.mkdirSync(OUT,{recursive:true});await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base='http://127.0.0.1:'+server.address().port+'/',browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 const results=[],before=new Map();
 try{
  for(const [width,baseline] of [[390,true],...[320,390,430,768,980,1100,1280].map(w=>[w,false])]){
   const touch=width<=1100,ctx=await browser.newContext({viewport:{width,height:900},hasTouch:touch,isMobile:touch,reducedMotion:'reduce',colorScheme:'light',timezoneId:'America/Sao_Paulo'});
   const p=await ctx.newPage(),errors=[],scans=[],prefix=baseline?'antes':'depois';p.on('pageerror',e=>errors.push(e.message));
   if(baseline)await p.route(u=>u.pathname.endsWith('/interface-agu.css'),r=>r.fulfill({status:200,contentType:'text/css',body:original}));
   const button=name=>p.getByRole('button',{name,exact:true}),act=async(l,keyboard=false)=>keyboard||!touch?l.press('Enter'):l.tap();
   const shot=async(label,selector)=>{await p.locator(selector).first().evaluate(e=>e.scrollIntoView({block:'start',inline:'nearest',behavior:'instant'}));await p.screenshot({path:path.join(OUT,prefix+'-'+label+'-'+width+'.png')})};
   const flow=async(label)=>{const g=await p.evaluate(()=>({w:innerWidth,s:document.documentElement.scrollWidth}));assert.ok(g.s<=g.w+2,label+' overflow '+width+' '+JSON.stringify(g));return g};
   const scan=async(label,root)=>{if(baseline)return;await flow(label);
    if(!await p.evaluate(()=>typeof axe!=='undefined'))await p.addScriptTag({content:axe.source});
    const report=await p.evaluate(async root=>{const r=await axe.run(document.querySelector(root),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(v=>({id:v.id,targets:v.nodes.map(n=>n.target)}))}},root);
    assert.deepEqual(report.violations,[],label+' violações '+width);
    const checked=await strictAxe.recheck(p,root,report,'mobile002-'+label,width);assert.deepEqual(checked.unresolved,[],label+' inconclusivos '+width);scans.push(checked);
   };
   const zoom=async(fn)=>{const n=await p.evaluate(()=>parseFloat(getComputedStyle(document.documentElement).fontSize)),style=await p.addStyleTag({content:':root{font-size:200% !important}'});try{assert.ok(await p.evaluate(()=>parseFloat(getComputedStyle(document.documentElement).fontSize))>=n*1.99);await fn()}finally{await style.evaluate(e=>e.remove())}};
   // MOB-03: overflow interno, affordance, acesso e foco sem alterar navegação.
   await p.goto(base);await act(button('Estudar'));
   const nav=p.locator('.secondary-nav');await nav.waitFor();
   const navState=()=>nav.evaluate(e=>({scroll:e.scrollWidth,client:e.clientWidth,left:e.scrollLeft,backgroundImage:getComputedStyle(e).backgroundImage,backgroundColor:getComputedStyle(e).backgroundColor,hint:getComputedStyle(e,'::before').content,scrollbar:getComputedStyle(e).scrollbarColor}));
   const navInitial=await navState();await shot('abas','#main .secondary-nav');
   const plan=nav.getByRole('button',{name:'Plano semanal',exact:true});
   if(baseline){assert.ok(navInitial.scroll>navInitial.client+1,'base: abas excedem faixa em 390px');before.set('nav',navInitial)}
   else{
    assert.equal(navInitial.backgroundImage,'none','superfície de contraste verificável sem gradiente');
    assert.notEqual(navInitial.backgroundColor,'rgba(0, 0, 0, 0)','fundo sólido');
    if(width<=530)assert.match(navInitial.hint,/Deslize.*↔/,'pista explícita de continuidade');
    else assert.equal(navInitial.hint,'none','sem pista desnecessária em tela ampla');
    assert.notEqual(navInitial.scrollbar,'auto');
    await nav.getByRole('button',{name:'Visão de estudo',exact:true}).focus();
    for(let i=0;i<3;i++)await p.keyboard.press('Tab');
    assert.ok(await plan.evaluate(e=>document.activeElement===e),'foco alcança última aba');
    const visible=await plan.evaluate(e=>{const r=e.getBoundingClientRect(),n=e.closest('nav').getBoundingClientRect();return r.left>=n.left-2&&r.right<=n.right+2});
    assert.ok(visible,'última aba visível ao receber foco');
    if(navInitial.scroll>navInitial.client+1)assert.ok((await navState()).left>0,'faixa rolada para foco');
    await scan('abas','#main');await zoom(async()=>{await flow('abas-200');await scan('abas-200','#main')});
    await plan.press('Enter');assert.match(await p.locator('#main h1').innerText(),/Plano|Planejamento/i);
   }
   // MOB-01: usar o leitor real, inclusive modo imersivo; uma palavra nunca em duas linhas.
   await p.goto(new URL('?abrir=lei&norma=L9784&dispositivo=L9784:art50:p1',base).href);
   const immersive=p.locator('#agu-ux-immersive');await immersive.waitFor();await act(immersive,true);
   const related=p.locator('#agu-reader .agu-mobile button').filter({hasText:'Relacionados'});
   await related.waitFor({state:'visible'});
   const word=()=>related.evaluate(e=>{const r=document.createRange();r.selectNodeContents(e);const b=e.getBoundingClientRect();return {lines:r.getClientRects().length,w:b.width,h:b.height,word:getComputedStyle(e).overflowWrap}});
   const initialWord=await word();await shot('leitor','#agu-reader .agu-mobile');
   if(baseline)before.set('word',initialWord);
   else{
    assert.equal(initialWord.lines,1,'Relacionados inteiro '+width);assert.ok(initialWord.w>=44&&initialWord.h>=44);
    await scan('leitor','#agu-reader');
    await zoom(async()=>{const x=await word();assert.equal(x.lines,1,'Relacionados inteiro a 200% '+width);await flow('leitor-200');await scan('leitor-200','#agu-reader')});
    await act(related,true);assert.equal(await related.getAttribute('aria-pressed'),'true');
    const legal=p.locator('#agu-reader .agu-mobile button').filter({hasText:'Texto legal'});await act(legal);assert.equal(await legal.getAttribute('aria-pressed'),'true');
   }
   // MOB-02: manter DOM e conteúdo; medir a pergunta desde o topo da sessão, sem scroll artificial.
   await p.goto(base);await act(button('Biblioteca Inteligente'));await act(button('Flashcards e revisões'));
   const tile=p.locator('.agu-deck-grid article').filter({has:p.locator('.agu-deck-code:text-is("CON-02")')});
   await act(tile.getByRole('button',{name:'Estudar baralho',exact:true}));
   const face=p.locator('#agu-deck-face'),initial=await p.evaluate(()=>AGUReview.attemptsInfo().length);
   const deck=()=>p.locator('.agu-deck-session').evaluate(e=>{const q=e.querySelector('.agu-deck-front .question-title'),r=q.getBoundingClientRect();return {offset:r.top-e.getBoundingClientRect().top,font:parseFloat(getComputedStyle(q).fontSize),meta:e.querySelector('.agu-deck-meta').innerText,state:e.querySelector('.agu-deck-study-state').innerText,faceWidth:e.querySelector('.agu-deck-front').getBoundingClientRect().width}});
   const deckInitial=await deck();await shot('flashcard','.agu-deck-session');
   if(baseline)before.set('deck',deckInitial);
   else{
    if(width===390){const b=before.get('deck');assert.ok(deckInitial.offset<=b.offset-20,'pergunta pelo menos 20px mais cedo: '+JSON.stringify({before:b.offset,after:deckInitial.offset}));assert.ok(deckInitial.font>=b.font-.1,'não reduzir a fonte da pergunta');assert.equal(deckInitial.meta,b.meta);assert.equal(deckInitial.state,b.state)}
    assert.equal(await p.locator('.agu-deck-back').count(),0);
    assert.equal(await p.locator('[id^="agu-deck-rating-"]').count(),0);
    await scan('flashcard','#main');await zoom(async()=>{await flow('flashcard-200');await scan('flashcard-200','#main')});
    await act(face,true);assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),initial);
    assert.equal(await p.evaluate(()=>document.activeElement.id),'agu-deck-rating-errei');
    await scan('verso','#main');await act(button('Lembrei'),true);
    assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),initial+1);
    const saved=await p.evaluate(()=>AGUReview.deckSession().index);
    await act(button('Pausar e voltar'));await act(button('Retomar sessão'),true);
    assert.equal(await p.evaluate(()=>AGUReview.deckSession().index),saved);assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),initial+1);
   }
   assert.deepEqual(errors,[]);results.push({width,baseline,nav:navInitial,related:initialWord,deck:deckInitial,scans:scans.map(s=>({label:s.label,targets:s.targets,passed:s.passed,unresolved:s.unresolved.length}))});await ctx.close();
  }
  fs.writeFileSync(path.join(OUT,'resultado.json'),JSON.stringify(results,null,2)+'\n');
  assert.equal(results.filter(x=>!x.baseline).length,7);
  assert.ok(results.filter(x=>!x.baseline).every(x=>x.scans.length===7&&x.scans.every(s=>!s.unresolved)));
  console.log('UX_AGU_MOBILE_002_OK',JSON.stringify({profiles:7,baseline390:before.get('deck').offset,after390:results.find(x=>x.width===390&&!x.baseline).deck.offset,scans:results.reduce((n,x)=>n+x.scans.length,0),unresolved:0,physicalAndroid:false,talkBackPhysical:false}));
 }finally{await browser.close();server.close()}
}
main().catch(e=>{console.error('UX_AGU_MOBILE_002_FAIL',e.stack||e);process.exitCode=1;server.close()});
