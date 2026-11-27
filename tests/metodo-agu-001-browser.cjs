/* Ensaio sintético automatizado; não é Android físico nem TalkBack. */
'use strict';
const {chromium}=require('playwright'),assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(ROOT,'tests/artifacts-metodo-agu'),REVIEW='agu_quiz_revisao_inteligente_v1',READER='agu_livros_reader_v1';
const server=process.env.AGU_TEST_URL?null:http.createServer((req,res)=>{const p=path.resolve(ROOT,'.'+decodeURIComponent(new URL(req.url,'http://localhost').pathname.replace(/\/$/,'/index.html')));if(!p.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end()}fs.readFile(p,(e,b)=>{res.writeHead(e?404:200,{'content-type':p.endsWith('.html')?'text/html; charset=utf-8':p.endsWith('.css')?'text/css':p.endsWith('.svg')?'image/svg+xml':p.endsWith('.json')?'application/json':'application/javascript','cache-control':'no-store'});res.end(e?'missing':b)})});
const seedReview=JSON.stringify({schema:'agu-review-v1',cards:{'ri-adm-01':{seen:3,stage:2,due:'2099-05-01',errors:1,ease:'lembrei'}},attempts:[],created:'2026-11-10T12:00:00Z'});
const seedReader={'adm-53':{page:2,done:[0],updated:'2026-11-20T12:00:00Z'},'registro-externo':{preservar:'bytes de teste'}};
const squeeze=s=>s.replace(/\s+/g,'');
function expected(text,format){if(format!=='markdown')return squeeze(text);return squeeze(text.split('\n').map(line=>/^#{1,4}\s/.test(line)?line.replace(/^#{1,4}\s+/,''):line.replace(/^\s*(?:[-*•]|\d+\.)\s+/,'')).join('\n').replace(/\*\*([^*]+)\*\*/g,'$1').replace(/`([^`]+)`/g,'$1').replace(/\[([^\]]+)\]\((https?:\/\/[^)]+)\)/g,'$1'))}
async function main(){fs.mkdirSync(OUT,{recursive:true});if(server)await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=process.env.AGU_TEST_URL||'http://127.0.0.1:'+server.address().port+'/';const browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined});const results=[];
 try{for(const width of [320,390,768,1280]){
  const context=await browser.newContext({viewport:{width,height:850},reducedMotion:'reduce',timezoneId:'America/Sao_Paulo'}),page=await context.newPage(),errors=[],scans=[];
  const network=[],consoleErrors=[];page.on('requestfailed',r=>network.push({url:r.url(),failure:r.failure()?.errorText}));page.on('response',r=>{if(r.status()>=400)network.push({url:r.url(),status:r.status()})});page.on('console',m=>{if(m.type()==='error')consoleErrors.push(m.text())});
  page.on('pageerror',e=>errors.push(e.message));await page.goto(base);await page.evaluate(([r,s,key,reader])=>{localStorage.clear();localStorage.setItem(key,r);localStorage.setItem(reader,JSON.stringify(s));localStorage.setItem('agu_dado_legado_fixture','preservar')},[seedReview,seedReader,REVIEW,READER]);
  await page.getByRole('button',{name:'Biblioteca Inteligente',exact:true}).click();assert.equal(await page.locator('.hub-book').count(),1);await page.getByRole('link',{name:/Método AGU/}).click();
  try{await page.locator('#discipline-AMB').waitFor()}catch(e){await page.screenshot({path:path.join(OUT,'catalog-failure-'+width+'.png')});const state=await page.evaluate(()=>({url:location.href,title:document.title,status:document.getElementById('method-status')?.textContent,method:typeof window.AGUMethod,progress:typeof window.AGUMethodProgress,catalogHidden:document.getElementById('catalog')?.hidden,cards:document.getElementById('cards')?.textContent}));console.error('METODO_CATALOGO_DIAGNOSTICO',JSON.stringify({width,state,errors,network:network.slice(0,30),consoleErrors:consoleErrors.slice(0,20)}));throw e}
  async function scan(label){const dim=await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));assert.ok(dim.scroll<=dim.width+1,label+' overflow '+JSON.stringify(dim));await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});const x=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))}});assert.deepEqual(x.violations,[],label);await require('./livros-axe-recheck.cjs').resolveIncomplete(page,x,width+' '+label);scans.push({label,...x,dim})}
  await scan('catalogo');
  for(const bid of ['lgpd-adm64b','adm-53','adm-54','amb-03']){
   const book=JSON.parse(fs.readFileSync(path.join(ROOT,'livros',bid+'.json')));await page.locator('[data-book="'+bid+'"]').click();await page.locator('#method-tabs').waitFor();await page.waitForFunction(([id,n])=>document.querySelector('#book').dataset.chapterId===id&&document.querySelectorAll('[data-source-section]').length===n,[bid,book.pages.length]);
   const dom=await page.locator('[data-source-section]').allInnerTexts();for(let i=0;i<book.pages.length;i++)assert.ok(squeeze(dom[i]).startsWith(expected(book.pages[i].text,book.source_format)),bid+' fidelidade DOM seção '+i);
   if(bid==='amb-03'){
    const captions=await page.evaluate(async()=>{
     const boxes=[...document.querySelectorAll('.method-table')],out=[];
     for(const region of boxes){
      const caption=region.querySelector('table > caption'),table=region.querySelector('table');
      const prior=region.scrollLeft,geometry=()=>{const a=caption.getBoundingClientRect(),b=region.getBoundingClientRect();return {width:a.width,available:region.clientWidth,left:a.left,right:a.right,innerLeft:b.left+region.clientLeft,innerRight:b.left+region.clientLeft+region.clientWidth}};
      try{region.scrollLeft=0;await new Promise(r=>requestAnimationFrame(r));const start=geometry();
       region.scrollLeft=region.scrollWidth;await new Promise(r=>requestAnimationFrame(r));out.push({native:table.caption===caption,label:caption.textContent,start,end:geometry(),overflow:region.scrollWidth>region.clientWidth});
      }finally{region.scrollLeft=prior}
     }return out
    });
    assert.equal(captions.length,2);
    for(const c of captions){assert.ok(c.native&&c.label.trim().length>0,'legenda nativa preservada');for(const g of [c.start,c.end])assert.ok(g.width<=g.available+1&&g.left>=g.innerLeft-1&&g.right<=g.innerRight+1,'legenda visível '+width+' '+JSON.stringify(c));if(width===320||width===390)assert.ok(c.overflow,'rolagem das colunas preservada')}
    console.log('LIVROS_CAPTION_GEOMETRY',JSON.stringify({width,captions}));
   }
   await scan(bid+' estudar');
   if(bid==='amb-03'&&(width===320||width===390)){
    const explicitTargets=await page.evaluate(()=>[...document.querySelectorAll('.method-table table > caption')].map(e=>({id:'color-contrast',target:['#'+e.closest('[data-source-section]').id+' > .method-table[role="region"] > table > caption']})));
    assert.equal(explicitTargets.length,2);
    // Confirm the exact original axe selector is still used; require a rule pass even if the initial scan no longer reports it incomplete.
    for(const r of explicitTargets){assert.equal(await page.locator(r.target[0]).count(),1,'alvo explícito da legenda');}
    const evidence={violations:[],incomplete:[]};
    await require('./livros-axe-recheck.cjs').resolveIncomplete(page,evidence,width+' amb-03 legendas explícitas',{explicitTargets});
    scans[scans.length-1].captionRuleEvidence=evidence;
   }
   await page.getByRole('button',{name:'Aplicar',exact:true}).click();assert.equal(await page.locator('.method-answer:visible').count(),0);assert.equal(await page.locator('.method-answer').innerText(),'');await scan(bid+' aplicar');
   await page.getByRole('button',{name:'Recuperar',exact:true}).click();assert.equal(await page.locator('.method-answer:visible').count(),0);await page.getByRole('button',{name:'Conferir respostas',exact:true}).click();assert.ok((await page.locator('.method-answer').innerText()).length>100);await scan(bid+' recuperar');
   await page.getByRole('button',{name:'Revisar',exact:true}).click();assert.ok(await page.locator('[data-card-id="aud03-flc-013"]').isVisible());await scan(bid+' revisar');assert.equal(await page.evaluate(k=>localStorage.getItem(k),REVIEW),seedReview,'Abrir/revelar atividades não altera agenda');
   if(bid==='amb-03'){
    await page.getByRole('button',{name:'Estudar',exact:true}).click();await page.getByRole('button',{name:/Ampliar: Constituição/}).click();assert.equal(await page.locator('#figure-dialog').isVisible(),true);await page.locator('#figure-scale').press('End');await page.locator('#figure-orientation').selectOption('horizontal');await scan('figura ampliada');await page.keyboard.press('Escape');assert.equal(await page.locator('#figure-dialog').isVisible(),false);assert.match(await page.evaluate(()=>document.activeElement.textContent),/Ampliar/);
   }
   await page.getByRole('button',{name:'Voltar aos livros',exact:true}).click();
  }
  // Rascunho e marcas de leitura usam a mesma chave, preservando os campos antigos.
  await page.locator('[data-book="adm-53"]').click();await page.locator('#method-tabs').waitFor();assert.equal(await page.locator('#page').inputValue(),'2');await page.getByRole('button',{name:'Aplicar',exact:true}).click();await page.locator('textarea[id^="draft-"]').fill('<script>fixture sem execução</script>');await page.getByRole('button',{name:'Guardar rascunho',exact:true}).click();assert.match(await page.locator('.method-result').innerText(),/guardado/);await page.reload();await page.locator('#method-tabs').waitFor();await page.getByRole('button',{name:'Aplicar',exact:true}).click();assert.equal(await page.locator('textarea[id^="draft-"]').inputValue(),'<script>fixture sem execução</script>');
  const stored=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),READER);assert.deepEqual(stored['adm-53'].done,[0]);assert.deepEqual(stored['registro-externo'],seedReader['registro-externo']);assert.equal(stored['adm-53'].activities['adm-53-caso'].performedAt,undefined);
  await page.getByRole('button',{name:'Registrar atividade realizada',exact:true}).click();const performed=await page.evaluate(k=>JSON.parse(localStorage.getItem(k))['adm-53'],READER);assert.ok(performed.activities['adm-53-caso'].performedAt);assert.equal(performed.mastery,undefined);assert.equal(await page.evaluate(k=>localStorage.getItem(k),REVIEW),seedReview);
  await page.getByRole('button',{name:'Estudar',exact:true}).click();await page.locator('#page').selectOption('3');await page.locator('#mode').selectOption('guided');await page.getByRole('button',{name:'Iniciar leitura',exact:true}).click();await page.getByRole('button',{name:'Pausar',exact:true}).click();await page.locator('#mode').selectOption('integral');await page.reload();await page.locator('#method-tabs').waitFor();assert.equal(await page.locator('#page').inputValue(),'3','Retomada mantém página e âncora da mesma seção');
  // Mesma carta, mesma agenda: avaliar uma vez e observar em outro capítulo.
  await page.getByRole('button',{name:'Revisar',exact:true}).click();await page.locator('[data-card-id="aud03-flc-013"]').click();await page.locator('[onclick^="AGUReview.reveal("]').click();assert.equal(await page.evaluate(k=>localStorage.getItem(k),REVIEW),seedReview);await page.locator('button[onclick^="AGUReview.rate(\'lembrei\'"]').click();const rated=await page.evaluate(k=>JSON.parse(localStorage.getItem(k)),REVIEW);assert.equal(rated.attempts.length,1);assert.equal(rated.cards['aud03-flc-013'].seen,1);assert.deepEqual(rated.cards['ri-adm-01'],JSON.parse(seedReview).cards['ri-adm-01']);
  await page.getByRole('button',{name:'Voltar aos livros',exact:true}).click();await page.locator('[data-book="amb-03"]').click();await page.locator('#method-tabs').waitFor();await page.getByRole('button',{name:'Revisar',exact:true}).click();assert.match(await page.locator('#review-list').innerText(),/1 avaliação/);assert.equal(await page.evaluate(()=>localStorage.getItem('agu_dado_legado_fixture')),'preservar');
  // PUB-LIVROS AMB-08: conferir acesso direto, integridade, atividade e ausencia de cartoes aprovados.
  await page.getByRole('button',{name:'Voltar aos livros',exact:true}).click();
  assert.equal(await page.locator('[data-book="amb-08"]').count(),1,'AMB-08 deve aparecer uma vez no catalogo');
  await page.locator('[data-book="amb-08"]').click();
  await page.locator('#method-tabs').waitFor();const biodiversity=JSON.parse(fs.readFileSync(path.join(ROOT,'livros/amb-08.json')));
  await page.waitForFunction(n=>document.querySelectorAll('[data-source-section]').length===n,biodiversity.pages.length);
  assert.equal(biodiversity.pages.length,20);assert.equal(await page.locator('#book').getAttribute('data-chapter-id'),'amb-08');
  assert.match(await page.locator('#book-status').innerText(),/edição pública 1\.1/);
  const beforeNew=await page.evaluate(k=>localStorage.getItem(k),REVIEW);
  await scan('amb-08 estudar');await page.getByRole('button',{name:'Aplicar',exact:true}).click();
  assert.equal(await page.locator('.method-answer:visible').count(),0);await scan('amb-08 aplicar');
  await page.getByRole('button',{name:'Recuperar',exact:true}).click();await page.getByRole('button',{name:'Conferir respostas',exact:true}).first().click();
  assert.ok((await page.locator('.method-answer').first().innerText()).length>100);await scan('amb-08 recuperar');
  await page.getByRole('button',{name:'Revisar',exact:true}).click();
  assert.match(await page.locator('#review-list').innerText(),/Ainda não há cartões aprovados/);
  assert.equal(await page.evaluate(k=>localStorage.getItem(k),REVIEW),beforeNew,'AMB-08 nao cria dominio por abertura');
  await page.getByRole('button',{name:'Voltar aos livros',exact:true}).click();
  await page.goto(new URL('livros-agu.html?livro=amb-08',base).href);await page.waitForFunction(()=>document.querySelector('#book')?.dataset.chapterId==='amb-08');
  assert.equal(new URL(page.url()).searchParams.get('livro'),'amb-08');await page.getByRole('button',{name:'Voltar aos livros',exact:true}).click();
  assert.deepEqual(errors,[]);await page.screenshot({path:path.join(OUT,'metodo-'+width+'.png')});results.push({width,chapters:4,scans,legacyCards:51,ratings:1,physicalAndroid:false});await context.close();
 }

 // Multi-ID sintético, injetado somente na resposta do método no teste. Nada no catálogo real é alterado.
 for(const width of [320,1280]){
  const context=await browser.newContext({viewport:{width,height:850}}),page=await context.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/livros/metodo/adm-53.json',async route=>{const res=await route.fetch();assert.ok(res.ok());const body=await res.json();body.curricularIds=['ADM-53','ADM-54','CON-01','CON-02','CON-03','CON-04'];await route.fulfill({response:res,json:body})});
  await page.goto(new URL('livros-agu.html?livro=adm-53',base).href);
  await page.waitForFunction(()=>document.querySelector('#book-category').textContent.includes('CON-04'));
  assert.match(await page.locator('#book-category').innerText(),/ADM-53, ADM-54, CON-01, CON-02, CON-03, CON-04/);
  await page.evaluate(k=>{const d=JSON.parse(localStorage.getItem(k)||'{}');d['fixture-externa']={page:1,done:[0],campo:'preservar'};localStorage.setItem(k,JSON.stringify(d))},READER);
  await page.locator('#page').selectOption('1');
  await page.waitForFunction(k=>JSON.parse(localStorage.getItem(k)||'{}')['adm-53']?.page===1,READER);
  await page.reload();await page.waitForFunction(()=>document.querySelector('#book-category').textContent.includes('CON-04'));
  assert.equal(await page.locator('#page').inputValue(),'1');
  assert.deepEqual(await page.evaluate(k=>JSON.parse(localStorage.getItem(k))['fixture-externa'],READER),{page:1,done:[0],campo:'preservar'});
  await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
  const scan=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))}});
  assert.deepEqual(scan.violations,[]);await require('./livros-axe-recheck.cjs').resolveIncomplete(page,scan,width+' multi-ID fixture');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.getByRole('button',{name:'Voltar aos livros',exact:true}).click();await page.locator('[data-book="adm-54"]').click();
  await page.waitForFunction(()=>document.querySelector('#book').dataset.chapterId==='adm-54');
  assert.match(await page.locator('#book-category').innerText(),/ADM-54$/);assert.ok(!(await page.locator('#book-category').innerText()).includes('CON-04'));
  assert.deepEqual(errors,[]);results.push({multiIdFixture:true,width,scan,persistence:true,switchToSingle:true});await context.close();
 }

 // JSON inválido e quota sintética preservam os bytes anteriores.
 for(const kind of ['invalido','quota']){const context=await browser.newContext(),page=await context.newPage();await page.goto(base);const original=kind==='invalido'?'{invalido':JSON.stringify(seedReader);await page.evaluate(([k,v])=>localStorage.setItem(k,v),[READER,original]);if(kind==='quota')await page.addInitScript(k=>{const set=Storage.prototype.setItem;Storage.prototype.setItem=function(key,value){if(key===k)throw new DOMException('Quota fixture','QuotaExceededError');return set.call(this,key,value)}},READER);await page.goto(new URL('livros-agu.html?livro=adm-53',base).href);await page.locator('#method-tabs').waitFor();await page.getByRole('button',{name:'Aplicar',exact:true}).click();await page.locator('textarea[id^="draft-"]').fill('Rascunho sintético');await page.getByRole('button',{name:'Guardar rascunho',exact:true}).click();assert.equal(await page.evaluate(k=>localStorage.getItem(k),READER),original);results.push({storage:kind,preserved:true});await context.close()}
 fs.writeFileSync(path.join(OUT,'resultado.json'),JSON.stringify(results,null,2)+'\n');console.log('METODO_AGU_001_CHROMIUM_OK',JSON.stringify({widths:[320,390,768,1280],chapters:4,scans:results.flatMap(r=>r.scans||[]).length,storageAdversarial:2,androidPhysical:false}));
 }finally{await browser.close();if(server)server.close()}
}
main().catch(e=>{console.error(e.stack||e);process.exitCode=1;if(server)server.close()});
