/* UX-BARALHOS-02 — Chromium, contextos virgens e avaliações sintéticas. */
'use strict';
async function advanced(p){if(!await p.locator('#agu-deck-filter-status').isVisible())await p.locator('#agu-deck-options > summary').click()}
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests','artifacts-ux-baralhos-02');
const server=http.createServer((req,res)=>{
 const requested=decodeURIComponent((req.url||'/').split('?')[0]).replace(/^[/\\]+/,'')||'index.html';
 const file=path.resolve(ROOT,requested);
 if(!file.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('forbidden')}
 fs.readFile(file,(error,data)=>{res.writeHead(error?404:200,{'content-type':file.endsWith('.html')?'text/html;charset=utf-8':file.endsWith('.css')?'text/css;charset=utf-8':'application/javascript;charset=utf-8','cache-control':'no-store'});res.end(error?'missing':data)});
});
const KEY='agu_quiz_revisao_inteligente_v1';
let browser;
async function main(){
 await new Promise(ok=>server.listen(0,'127.0.0.1',ok));
 browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});
 const origin=process.env.AGU_TEST_URL||'http://127.0.0.1:'+server.address().port+'/';
 const results=[];fs.mkdirSync(OUT,{recursive:true});
 for(const width of [320,360,390,430,1280]){
  const context=await browser.newContext({viewport:{width,height:850},reducedMotion:'reduce'});
  const page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.addInitScript(()=>{
   const k='agu_quiz_revisao_inteligente_v1';if(localStorage.getItem(k)!==null)return;
   const iso=n=>{const d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+n);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
   localStorage.setItem(k,JSON.stringify({schema:'agu-review-v1',created:new Date().toISOString(),attempts:[],cards:{
    'ri-con-01':{stage:1,seen:1,due:iso(-1),errors:0,ease:'lembrei'},
    'ri-con-02':{stage:1,seen:1,due:iso(0),errors:0,ease:'dificil'},
    'ri-adm-01':{stage:1,seen:1,due:iso(1),errors:0,ease:'facil'}}}));
  });
  await page.goto(origin,{waitUntil:'load'});
  await page.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();
  await page.getByRole('button',{name:'Flashcards e revisões',exact:true}).click();
  assert.match(await page.locator('#agu-deck-library').innerText(),/53 cartões · 12 baralhos/);
  const con=page.locator('.agu-deck-grid article').filter({has:page.locator('.agu-deck-code:text-is("CON-02")')});
  assert.match(await con.innerText(),/1 vencidos/);assert.match(await con.innerText(),/1 vencem hoje/);
  await page.locator('#agu-deck-filter-discipline').selectOption('CON');
  await page.locator('#agu-deck-filter-topic').fill('CON-02');await page.locator('#agu-deck-filter-topic').press('Tab');
  await advanced(page);await page.locator('#agu-deck-filter-status').selectOption('vencidos');
  assert.match(await page.locator('.agu-deck-filter-result').innerText(),/1 baralho · 1 cartão selecionável/);
  await advanced(page);await page.locator('#agu-deck-filter-status').selectOption('futuros');
  assert.equal(await page.locator('.agu-deck-grid article').count(),0);
  assert.ok(await page.getByText('Nenhum cartão corresponde à combinação de filtros').isVisible());
  await page.getByRole('button',{name:'Limpar filtros'}).click();
  assert.equal(await page.locator('.agu-deck-grid article').count(),12);
  await page.locator('#agu-deck-filter-discipline').selectOption('CON');
  await page.locator('#agu-deck-filter-topic').fill('CON-02');await page.locator('#agu-deck-filter-topic').press('Tab');
  await advanced(page);await page.locator('#agu-deck-filter-status').selectOption('pendentes');
  assert.match(await page.locator('.agu-deck-filter-result').innerText(),/2 cartões selecionáveis/);
  await page.locator('.agu-deck-grid article').getByRole('button',{name:'Estudar baralho'}).click();
  assert.equal(await page.locator('.agu-deck-grid article').count(),0);
  assert.match(await page.locator('.agu-deck-study-state').innerText(),/Revisão vencida/);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+2),'sem overflow sessão '+width);
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),0);
  const face=page.locator('#agu-deck-face');await face.focus();await face.press('Enter');
  assert.equal(await page.evaluate(()=>document.activeElement.id),'agu-deck-rating-errei','foco teclado na avaliação');
  assert.ok(await page.getByText('Verso · resposta').isVisible());
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),0);
  await page.getByRole('button',{name:'Lembrei',exact:true}).click();
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),1);
  await page.getByRole('button',{name:'← Anterior'}).click();
  assert.ok(await page.getByText('Avaliado nesta sessão').isVisible());
  assert.equal(await page.getByRole('button',{name:'Lembrei',exact:true}).count(),0);
  await page.getByRole('button',{name:'Próximo →'}).click();
  await page.getByRole('button',{name:'Pausar e voltar'}).click();
  const original=await page.evaluate(k=>localStorage.getItem(k),KEY);
  await advanced(page);await page.locator('#agu-deck-filter-status').selectOption('hoje');
  await page.locator('.agu-deck-grid article').getByRole('button',{name:'Escolher sessão'}).click();
  assert.ok(await page.getByText('Escolha como continuar').isVisible());
  assert.equal(await page.evaluate(k=>localStorage.getItem(k),KEY),original,'escolha não grava histórico');
  await page.getByRole('button',{name:'Cancelar',exact:true}).click();
  assert.equal(await page.evaluate(k=>localStorage.getItem(k),KEY),original);
  await page.locator('.agu-deck-grid article').getByRole('button',{name:'Escolher sessão'}).click();
  await page.getByRole('button',{name:'Retomar sessão anterior'}).click();
  assert.match(await page.locator('.agu-deck-stage').first().innerText(),/cartão 2 de 2/i);
  await page.getByRole('button',{name:'Pausar e voltar'}).click();
  await page.locator('.agu-deck-grid article').getByRole('button',{name:'Escolher sessão'}).click();
  await page.getByRole('button',{name:'Iniciar nova seleção (1)'}).click();
  assert.match(await page.locator('.agu-deck-stage').first().innerText(),/cartão 1 de 1/i);
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),1,'primeira avaliação retida');
  await page.reload({waitUntil:'load'});
  await page.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();
  await page.getByRole('button',{name:'Flashcards e revisões',exact:true}).click();
  assert.ok(await page.getByRole('button',{name:'Retomar sessão'}).isVisible());
  await page.getByRole('button',{name:'Retomar sessão'}).press('Enter');
  assert.equal(await page.evaluate(()=>AGUReview.deckSession().order.length),1);
  if(width===390||width===1280){
   await page.addScriptTag({content:axe.source});
   const audit=await page.evaluate(async()=>axe.run(document.querySelector('#main'),{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}}));
   assert.equal(audit.violations.length,0,'axe cartão '+width+': '+audit.violations.map(x=>x.id).join('; '));
  }
  assert.ok(await page.locator('.agu-deck-surface').isVisible());
  assert.equal(await page.evaluate(()=>matchMedia('(prefers-reduced-motion: reduce)').matches),true);
  await page.getByRole('button',{name:'Para meu caderno · abrir leitor'}).click();
  assert.equal(await page.evaluate(()=>AGULegal.peek().tab),'para_caderno');
  await page.getByRole('button',{name:'Flashcards e revisões',exact:true}).click();
  assert.equal(await page.evaluate(()=>AGUReview.deckSession().order.length),1,'leitor não reescreve sessão');
  await page.locator('#agu-deck-face').press('Space');
  await page.getByRole('button',{name:'Fácil',exact:true}).click();
  assert.ok(await page.getByText('Baralho concluído').isVisible());
  assert.match(await page.locator('.agu-deck-session').innerText(),/Fácil 1/);
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),2);
  const full=await page.evaluate(()=>AGUBackup20.capture());
  assert.deepEqual(Object.keys(full.items).sort(),['agu_leitor_juridico_s13_v1',KEY]);
  assert.equal(JSON.parse(full.items[KEY]).librarySession.status,'concluida');
  await page.getByRole('button',{name:'Reestudar a mesma seleção'}).click();
  assert.equal(await page.evaluate(()=>AGUReview.deckSession().order.length),1);
  assert.equal(await page.evaluate(()=>AGUReview.attemptsInfo().length),2);
  await page.getByRole('button',{name:'Pausar e voltar'}).click();
  await page.getByRole('button',{name:'Limpar filtros'}).click();
  await advanced(page);await page.locator('#agu-deck-filter-difficulty').selectOption('original:4');
  assert.equal(await page.locator('.agu-deck-grid article').count(),1);
  await page.locator('.agu-deck-grid article').getByRole('button',{name:'Estudar baralho'}).click();
  assert.ok(await page.getByText('Escolha como continuar').isVisible());
  await page.getByRole('button',{name:'Iniciar nova seleção (1)'}).click();
  assert.match(await page.locator('.agu-deck-study-state').innerText(),/Inédito/);
  assert.match(await page.locator('.agu-deck-session').innerText(),/Nível cognitivo original 4/);
  if(width===390||width===1280){
   await page.locator('#agu-deck-library').screenshot({path:path.join(OUT,'sessao-'+width+'.png')});
  }
  const spill=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,viewport:innerWidth,
   elements:[...document.querySelectorAll('#main *')].filter(el=>el.getBoundingClientRect().right>innerWidth+2).slice(0,7)
    .map(el=>({tag:el.tagName,cls:el.className,right:Math.round(el.getBoundingClientRect().right),text:(el.textContent||'').trim().slice(0,85)}))}));
  assert.ok(spill.scrollWidth<=spill.viewport+2,'sem overflow final '+width+': '+JSON.stringify(spill));
  assert.deepEqual(errors,[]);
  results.push({width,baralhos:12,cartoes:53,selectedOne:true,graded:2,filters:true,choose:true,reload:true,backup:true,axe:width===390||width===1280});
  await context.close();
 }
 console.log('UX_BARALHOS_02_BROWSER_OK',JSON.stringify({target:origin,chromium:browser.version(),results}));
}
main().catch(e=>{console.error(e.stack);process.exitCode=1}).finally(async()=>{await browser?.close();server.close()});
