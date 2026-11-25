/* UX-AGU-006: jornada sintética; comparação de CSS por restituição exata da base.
 * Não substitui LEG, S33 ou UX-BARALHOS. Sem histórico pessoal, sem Android físico. */
'use strict';
const {chromium}=require('playwright'),axe=require('axe-core'),assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),crypto=require('node:crypto');
const ROOT=path.resolve(__dirname,'..'),OUT=path.join(__dirname,'artifacts-ux-agu-006');
const REVIEW='agu_quiz_revisao_inteligente_v1',VIG='agu_gov_003_treino_vigente_v1';
const blob=s=>crypto.createHash('sha1').update('blob '+Buffer.byteLength(s)+'\0').update(s).digest('hex');
const files={
 'interface-agu.css':'22dccba50b1f7d20737fb5d8d82c49939f2bc155',
 'questoes-vigentes.css':'a6c8d55e35b8fe198083e041013d88c4df81d762'
};
const original={};
for(const [file,sha] of Object.entries(files)){
 const css=fs.readFileSync(path.join(ROOT,file),'utf8'),mark='/* UX-AGU-006 —';
 assert.equal(css.split(mark).length,2,'delta visual único: '+file);
 original[file]=css.split(mark)[0].replace(/\n$/,'');
 assert.equal(blob(original[file]),sha,'CSS da base restituído byte a byte: '+file);
}
// Revert the exact GOV addition too, retaining the pre-GOV historical pin.
const govSuffix="\nfieldset.multiple-choice{grid-template-columns:1fr;min-width:0}fieldset.multiple-choice label{align-items:flex-start;min-width:0}fieldset.multiple-choice label span{min-width:0;overflow-wrap:anywhere;white-space:pre-wrap}fieldset.multiple-choice input{flex:0 0 auto;margin-top:.4em}\n";
assert.ok(original['questoes-vigentes.css'].endsWith(govSuffix),'GOV-AGU-006 delta preserved');
assert.equal(blob(original['questoes-vigentes.css'].slice(0,-govSuffix.length)),'52a8791d62fa6b7b16fa801d5bc153eb43aa479f','pre-GOV CSS restored exactly');
const server=process.env.AGU_TEST_URL?null:http.createServer((req,res)=>{
 const rel=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\/+/,''),f=path.resolve(ROOT,rel||'index.html');
 if(!f.startsWith(ROOT+path.sep)){res.writeHead(403);return res.end('forbidden')}
 fs.readFile(f,(e,b)=>{res.writeHead(e?404:200,{'content-type':({'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json','.svg':'image/svg+xml'})[path.extname(f)]||'application/javascript; charset=utf-8','cache-control':'no-store'});res.end(e?'missing':b)});
});
async function main(){
 fs.mkdirSync(OUT,{recursive:true});
 if(server)await new Promise(r=>server.listen(0,'127.0.0.1',r));
 const base=process.env.AGU_TEST_URL||'http://127.0.0.1:'+server.address().port+'/',browser=await chromium.launch({headless:true,args:['--no-sandbox'],executablePath:process.env.AGU_CHROMIUM_BIN||undefined}),results=[];
 try{
  for(const [width,baseline] of [[390,true],...[320,390,430,768,980,1100,1280].map(w=>[w,false])]){
   const touch=width<=1100,ctx=await browser.newContext({viewport:{width,height:900},hasTouch:touch,isMobile:touch,reducedMotion:'reduce',colorScheme:'light',timezoneId:'America/Sao_Paulo'});
   const p=await ctx.newPage(),errors=[],scans=[],actions={};let stage='entrada';
   p.on('pageerror',e=>errors.push(e.message));
   if(baseline)for(const [file,css] of Object.entries(original))await p.route(u=>u.pathname.endsWith('/'+file),r=>r.fulfill({status:200,contentType:'text/css',body:css}));
   const btn=name=>p.getByRole('button',{name,exact:true});
   const act=async(l,keyboard=false)=>{actions[stage]=(actions[stage]||0)+1;if(keyboard||!touch)await l.press('Enter');else await l.tap()};
   const scan=async(label,selector,zoom=false)=>{
    const target=p.locator(selector).first();await target.waitFor({state:'visible'});await target.scrollIntoViewIfNeeded();
    const geometry=await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
    assert.ok(geometry.scroll<=geometry.width+2,label+' overflow '+width+' '+JSON.stringify(geometry));
    if(width===390||width===1280)await p.screenshot({path:path.join(OUT,(baseline?'antes':'depois')+'-'+label+'-'+width+'.png')});
    let access=null;
    if(!baseline&&(width===390||width===1280)){
     if(!await p.evaluate(()=>typeof axe!=='undefined'))await p.addScriptTag({content:axe.source});
     access=await p.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return {violations:r.violations.map(x=>({id:x.id,nodes:x.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(x=>({id:x.id,nodes:x.nodes.map(n=>n.target)}))}});
     assert.deepEqual(access.violations,[],label+' axe '+width);
     // Re-evaluate every initially incomplete target in its original document after scrolling.
     // Only an explicit pass for the identical rule AND target counts as resolved.
     access.afterScroll=[];
     for(const rule of access.incomplete)for(const targets of rule.nodes){
      const rec={rule:rule.id,target:targets,status:'unresolved'};
      try{
       if(targets.length!==1||typeof targets[0]!=='string')throw Error('complex target requires manual inspection');
       const loc=p.locator(targets[0]);
       if(await loc.count()!==1)throw Error('target not uniquely located');
       await loc.scrollIntoViewIfNeeded();
       const evidence=await p.evaluate(async({id,targets})=>{
        const node=document.querySelector(targets[0]),r=node.getBoundingClientRect();
        const result=await axe.run(document,{runOnly:{type:'rule',values:[id]}});
        const same=n=>JSON.stringify(n.target)===JSON.stringify(targets);
        const hits=kind=>result[kind].flatMap(v=>v.nodes.filter(same));
        return {visible:r.width>0&&r.height>0&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth,
         passed:hits('passes').length,violations:hits('violations').length,incomplete:hits('incomplete').length,
         ruleViolations:result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),
         color:getComputedStyle(node).color,background:getComputedStyle(node).backgroundColor};
       },{id:rule.id,targets});
       Object.assign(rec,evidence);
       if(evidence.visible&&evidence.passed>0&&!evidence.violations&&!evidence.incomplete&&!evidence.ruleViolations.length)rec.status='passed';
      }catch(e){rec.reason=String(e)}
      access.afterScroll.push(rec);
     }
     access.unresolved=access.afterScroll.filter(x=>x.status!=='passed');
     fs.writeFileSync(path.join(OUT,'axe-'+label+'-'+width+'.json'),JSON.stringify(access,null,2)+'\\n');
     console.log('UX_AGU_006_AXE_RECHECK',JSON.stringify({label,width,initialRules:access.incomplete.length,targets:access.afterScroll.length,passed:access.afterScroll.filter(x=>x.status==='passed').length,unresolved:access.unresolved}));
     assert.deepEqual(access.unresolved,[],label+' axe unresolved '+width);

    }
    if(!baseline&&zoom){
     const before=await p.evaluate(()=>parseFloat(getComputedStyle(document.documentElement).fontSize));
     const z=await p.addStyleTag({content:':root{font-size:200% !important}'});
     const after=await p.evaluate(()=>({font:parseFloat(getComputedStyle(document.documentElement).fontSize),w:innerWidth,s:document.documentElement.scrollWidth}));
     assert.ok(after.font>=before*1.99,label+' fonte raiz realmente ampliada');
     assert.ok(after.s<=after.w+2,label+' reflow 200% '+width+' '+JSON.stringify(after));
     await z.evaluate(e=>e.remove());
    }
    scans.push({label,geometry,access,zoom200:!baseline&&zoom});
   };
   await p.goto(base,{waitUntil:'load'});
   stage='baralho';
   await act(btn('Biblioteca Inteligente'));await act(btn('Flashcards e revisões'));
   const tile=p.locator('.agu-deck-grid article').filter({has:p.locator('.agu-deck-code:text-is("CON-02")')});
   await act(tile.getByRole('button',{name:'Estudar baralho',exact:true}));
   const face=p.locator('#agu-deck-face'),initial=await p.evaluate(()=>AGUReview.attemptsInfo().length);
   assert.equal(await p.locator('.agu-deck-back').count(),0);
   assert.equal(await p.locator('[id^="agu-deck-rating-"]').count(),0);
   await scan('baralho-frente','#agu-deck-face',true);
   await act(face,true);
   assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),initial);
   assert.equal(await p.evaluate(()=>document.activeElement.id),'agu-deck-rating-errei');
   assert.equal(await p.locator('.agu-deck-back').getAttribute('role'),'group','verso com papel semântico explícito');
   assert.equal(await p.getByRole('group',{name:'Verso do cartão',exact:true}).count(),1,'verso nomeado acessivelmente');
   await scan('baralho-verso','.agu-deck-back');
   await act(btn('Lembrei'),true);
   assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),initial+1);
   const saved=await p.evaluate(()=>AGUReview.deckSession());
   await act(btn('Pausar e voltar'));await act(btn('Retomar sessão'),true);
   assert.equal(await p.evaluate(()=>AGUReview.deckSession().index),saved.index);
   assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),initial+1);
   await act(btn('Pausar e voltar'));
   stage='revisao';
   await act(btn('Flashcards'),true);
   assert.equal(await p.locator('.feedback').count(),0);
   await scan('revisao-hipotese', 'button[onclick^="AGUReview.reveal("]');
   await act(btn('Mostrar resposta'),true);
   assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),initial+1);
   await scan('revisao-feedback','.feedback',true);
   await act(btn('Lembrei'),true);
   assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),initial+2);
   stage='historica';
   await p.goto(new URL('?abrir=lei&norma=L9784&dispositivo=L9784:art50:p1',base).href);
   if(await p.locator('.agu-mobile').isVisible())await act(p.locator('.agu-mobile button').nth(2));
   await act(p.locator('.agu-tabs').getByRole('button',{name:'Questões',exact:true}),true);
   await act(btn('Responder no Leitor'),true);
   const question=p.locator('.agu-related .agu-ctx-box').filter({has:p.locator('#agu-question-context')});
   assert.equal(await question.locator('.feedback').count(),0);
   assert.equal(await question.getByRole('button',{name:'Conferir resposta',exact:true}).isDisabled(),true);
   await scan('historica-hipotese','#agu-question-context');
   await act(question.getByRole('button',{name:'ERRADO',exact:true}),true);
   await act(question.getByRole('button',{name:'Conferir resposta',exact:true}),true);
   assert.match(await question.locator('.feedback').innerText(),/Gabarito definitivo da questão original/);
   assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),initial+2);
   await scan('historica-feedback','.agu-related .feedback');
   const beforeMark=await p.evaluate(()=>AGULegal.peek().forNotebook?.length||0);
   await act(p.locator('.agu-question-notebook summary'),true);
   await p.locator('#q18-notebook').fill('Qual a origem do fundamento? Fixture UX006.');
   await act(p.locator('#q18-notebook-save'),true);
   assert.equal(await p.evaluate(()=>AGULegal.peek().forNotebook.length),beforeMark+1);
   assert.equal(await p.evaluate(()=>AGULegal.peek().forNotebook.at(-1).origin),'questao_verificada');
   assert.equal(await p.evaluate(()=>AGUReview.attemptsInfo().length),initial+2);
   stage='estudo-integrado';
   await p.goto(new URL('?abrir=lei&norma=L9784&dispositivo=L9784:art12:caput',base).href);
   if(await p.locator('.agu-mobile').isVisible())await act(p.locator('.agu-mobile button').nth(2));
   await act(p.locator('.agu-tabs').getByRole('button',{name:'Estudo integrado',exact:true}),true);
   await act(btn('Iniciar / retomar estudo deste dispositivo'),true);
   const session=await p.evaluate(()=>AGUStudy.active());
   assert.equal(session.stage,'norma');assert.equal(session.deviceId,'L9784:art12:caput');
   await scan('estudo-norma','[data-agu-study-stage="norma"]',true);
   await act(btn('Continuar para Caderno'),true);
   assert.equal(await p.evaluate(()=>AGUStudy.active().stage),'caderno');
   await act(btn('Abrir Caderno'),true);
   stage='caderno';
   await p.locator('#ctx-title').fill('Hipótese sintética UX006');await p.locator('#ctx-content').fill('Fundamento e retorno à prática: registro de teste.');
   const count=await p.evaluate(()=>AGUCaderno.peek().records.length);
   await scan('caderno-formulario','#ctx-title',true);
   await act(btn('Adicionar ao Caderno'),true);
   assert.equal(await p.evaluate(()=>AGUCaderno.peek().records.length),count+1);
   await act(p.locator('.agu-tabs').getByRole('button',{name:'Estudo integrado',exact:true}),true);
   assert.equal(await p.evaluate(()=>AGUStudy.active().id),session.id);
   assert.equal(await p.evaluate(()=>AGUStudy.active().stage),'caderno');
   await act(p.locator('.agu-tabs').getByRole('button',{name:'Para meu caderno',exact:true}),true);
   assert.equal(await p.locator('.agu-paper-item').filter({hasText:'Qual a origem do fundamento? Fixture UX006.'}).count(),1);
   await scan('caderno-origem','.agu-paper-item');
   await p.reload();
   assert.equal(await p.evaluate(()=>AGUCaderno.peek().records.length),count+1);
   assert.equal(await p.evaluate(()=>AGULegal.peek().forNotebook.length),beforeMark+1);
   assert.equal(await p.evaluate(id=>AGUStudy.peek().sessions.filter(s=>s.id===id).length,session.id),1);
   const reviewBytes=await p.evaluate(k=>localStorage.getItem(k),REVIEW);
   stage='vigente';
   await p.goto(new URL('questoes-vigentes.html',base).href);
   await p.locator('#vig-stem').waitFor();
   assert.equal(await p.locator('#vig-feedback').count(),0);
   assert.equal(await p.locator('#vig-submit').isDisabled(),true);
   await scan('vigente-hipotese','#vig-stem',true);
   await p.getByRole('radio',{name:'Certo',exact:true}).check();actions[stage]=(actions[stage]||0)+1;
   await act(p.locator('#vig-submit'),true);
   assert.equal(await p.evaluate(k=>JSON.parse(localStorage.getItem(k)).attempts.length,VIG),1);
   assert.match(await p.locator('#vig-feedback').innerText(),/Na época da prova/);
   assert.match(await p.locator('#vig-feedback').innerText(),/Direito vigente/);
   await scan('vigente-feedback','#vig-feedback',true);
   assert.equal(await p.evaluate(k=>localStorage.getItem(k),REVIEW),reviewBytes);
   await p.reload();
   assert.equal(await p.evaluate(k=>JSON.parse(localStorage.getItem(k)).attempts.length,VIG),1);
   assert.deepEqual(errors,[]);
   results.push({width,touch,baseline,actions,errors,scans,explicitRatings:2,oneContextNote:true,oneOriginMark:true,oneIntegratedSession:true,oneCurrentQuestion:true,androidPhysical:false,talkBackPhysical:false});
   await ctx.close();
  }
  fs.writeFileSync(path.join(OUT,'jornada.json'),JSON.stringify(results,null,2)+'\n');
  console.log('UX_AGU_006_BROWSER_OK',JSON.stringify(results.map(x=>({width:x.width,baseline:x.baseline,actions:x.actions,scans:x.scans.length,axeIncomplete:x.scans.flatMap(s=>s.access?.incomplete||[]).length,axeTargetsRechecked:x.scans.flatMap(s=>s.access?.afterScroll||[]).length,axeUnresolved:x.scans.flatMap(s=>s.access?.unresolved||[]).length}))));
 }finally{await browser.close();if(server)server.close()}
}
main().catch(e=>{console.error('UX_AGU_006_BROWSER_FAIL',e.stack||e);process.exitCode=1;if(server)server.close()});
