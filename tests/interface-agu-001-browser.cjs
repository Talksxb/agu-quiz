/* Regressão do vazio vertical e do reflow. Perfis novos; nenhum dado pessoal. */
'use strict';
const {chromium} = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const http = require('node:http');
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(__dirname, 'artifacts-interface-agu-001');
const server = process.env.AGU_TEST_URL ? null : http.createServer((req, res) => {
  const file = path.resolve(ROOT, '.' + new URL(req.url, 'http://localhost').pathname.replace(/\/$/, '/index.html'));
  if (!file.startsWith(ROOT + path.sep)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, bytes) => {
    const ext = path.extname(file);
    res.writeHead(err ? 404 : 200, {'content-type': ({'.html':'text/html; charset=utf-8','.css':'text/css','.json':'application/json','.svg':'image/svg+xml'})[ext] || 'application/javascript'});
    res.end(err ? 'missing' : bytes);
  });
});
const currentCss=fs.readFileSync(path.join(ROOT,'interface-agu.css'),'utf8');
const marker="/* UX-AGU-004 — sistema visual compartilhado;";
assert.equal(currentCss.split(marker).length,2,'delta visual 004 único');
const baselineCss=currentCss.split(marker)[0].replace(/\n$/,'');
const fixture = JSON.stringify({version:1,created:'2026-11-20T12:00:00Z',topic:{},answers:[],sessions:[],reviews:[],notebook:[],seed:false});
async function main() {
  fs.mkdirSync(OUT, {recursive:true});
  if (server) await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = process.env.AGU_TEST_URL || 'http://127.0.0.1:' + server.address().port + '/';
  const browser = await chromium.launch({headless:true, args:['--no-sandbox'], executablePath:process.env.AGU_CHROMIUM_BIN || undefined});
  const results = [];
  try {
    for (const [width, height, touch] of [[320,740,true],[360,800,true],[390,844,true],[430,932,true],[768,1024,true],[980,1920,true],[980,1920,false],[1100,900,true],[1280,900,false]]) {
      const context = await browser.newContext({viewport:{width,height},hasTouch:touch,isMobile:touch,timezoneId:'America/Sao_Paulo',reducedMotion:'reduce'});
      const page = await context.newPage(), errors = [];
      page.on('pageerror', error => errors.push(error.message));
      await page.addInitScript(value => { localStorage.setItem('agu_quiz_mvp1_2026', value); }, fixture);
      if(width===390&&touch){
        const match=url=>url.pathname.endsWith('/interface-agu.css');
        await page.route(match,route=>route.fulfill({status:200,contentType:'text/css',body:baselineCss}));
        await page.goto(base);
        await page.locator('#continue-study').waitFor();
        for(const [name,file] of [['Início','inicio'],['Estudar','estudar'],['Biblioteca Inteligente','biblioteca'],['Evolução','evolucao']]){
          await page.getByRole('button',{name,exact:true}).click();
          await page.screenshot({path:path.join(OUT,'ux004-antes-'+file+'-390.png'),fullPage:true});
        }
        await page.unroute(match);
      }
      await page.goto(base);
      await page.locator('#continue-study').waitFor();
      const snapshots = [];
      async function scan(label) {
        const geometry = await page.evaluate(() => {
          const box = selector => {const r=document.querySelector(selector).getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height,bottom:r.bottom};};
          return {width:innerWidth,scroll:document.documentElement.scrollWidth,title:box('#main h1'),nav:box('.side'),navPosition:getComputedStyle(document.querySelector('.side')).position,targets:[...document.querySelectorAll('.side .nav')].map(e=>({width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height})),bodyFont:parseFloat(getComputedStyle(document.body).fontSize)};
        });
        assert.ok(geometry.scroll <= geometry.width + 1, label + ': sem rolagem horizontal');
        assert.ok(geometry.title.y < 190, label + ': título no topo, inclusive em tela alta');
        assert.ok(geometry.bodyFont >= 16, label + ': texto base legível');
        assert.ok(geometry.targets.every(r => r.width >= 44 && r.height >= 44), label + ': quatro alvos de toque');
        if (width <= 860 || touch) {
          assert.equal(geometry.navPosition, 'fixed');
          assert.ok(Math.abs(geometry.nav.bottom - height) <= 1, label + ': navegação inferior');
        }
        await page.addScriptTag({path:require.resolve('axe-core/axe.min.js')});
        const axe = await page.evaluate(async () => {
          const r = await window.axe.run(document, {runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});
          return {violations:r.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))};
        });
        assert.deepEqual(axe.violations, [], label);
        snapshots.push({label,geometry,...axe});
      }
      await scan('Início');
      if (width === 320) {
        const navLabels = await page.locator('.side .nav > span').evaluateAll(labels => labels.map(e=>({height:e.getBoundingClientRect().height,line:parseFloat(getComputedStyle(e).lineHeight)})));
        assert.ok(navLabels.every(r=>r.height<=r.line+1), 'quatro rótulos inteiros em 320 px: '+JSON.stringify(navLabels));
      }
      const design=await page.evaluate(()=>{
        const root=getComputedStyle(document.documentElement),token=n=>root.getPropertyValue('--ui-'+n).trim();
        const rgb=x=>x.startsWith('#')?[1,3,5].map(i=>parseInt(x.slice(i,i+2),16)):x.match(/[\d.]+/g).slice(0,3).map(Number);
        const lum=x=>rgb(x).map(v=>v/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4).reduce((s,v,i)=>s+v*[.2126,.7152,.0722][i],0);
        const ratio=(a,b)=>(Math.max(lum(a),lum(b))+.05)/(Math.min(lum(a),lum(b))+.05);
        const button=document.querySelector('#continue-study'),cs=getComputedStyle(button);
        const target=[...document.querySelectorAll('.today-links .secondary')].map(e=>{const r=e.getBoundingClientRect();return {w:r.width,h:r.height}});
        return {accent:token('accent'),ctaBackground:cs.backgroundColor,ctaContrast:ratio(cs.color,cs.backgroundColor),target,pairs:[
          ['text/surface','ink','surface',4.5],['muted/canvas','muted','canvas',4.5],['accent/white','accent','surface',4.5],['selected','accent-text','accent-soft',4.5],
          ['success','success','success-bg',4.5],['review','review','review-bg',4.5],['error','error','error-bg',4.5],['control border','control-line','surface',3],['focus','focus','canvas',3]
        ].map(([name,a,b,min])=>({name,ratio:ratio(token(a),token(b)),min}))};
      });
      assert.equal(design.accent,'#633c69');
      assert.equal(design.ctaBackground,'rgb(99, 60, 105)');
      assert.ok(design.ctaContrast>=4.5,'contraste botão principal');
      assert.ok(design.pairs.every(x=>x.ratio>=x.min),'contraste tokens '+JSON.stringify(design.pairs));
      assert.ok(design.target.every(x=>x.w>=44&&x.h>=44),'atalhos de Home com área útil >=44');
      const cta = await page.locator('#continue-study').boundingBox();
      assert.ok(cta.y >= 0 && cta.y + cta.height < height - (touch || width <= 860 ? 78 : 0), 'continuar visível sem rolagem');
      await page.screenshot({path:path.join(OUT,`inicio-${width}-${touch?'toque':'mouse'}.png`),fullPage:true});
      for (const [name,title] of [['Estudar','Estudar'],['Biblioteca Inteligente','Biblioteca Inteligente'],['Evolução','Evolução']]) {
        await page.getByRole('button',{name,exact:true}).click();
        assert.equal(await page.locator('#main h1').innerText(), title);
        assert.equal(await page.getByRole('button',{name,exact:true}).getAttribute('aria-current'), 'page');
        await scan(name);
        await page.screenshot({path:path.join(OUT,'ux004-depois-'+title.replace(/\s+/g,'-').toLowerCase()+'-'+width+'-'+(touch?'toque':'mouse')+'.png'),fullPage:true});
      }
      await page.getByRole('button',{name:'Início',exact:true}).click();
      await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
      await page.getByRole('button',{name:'Estudar',exact:true}).click();
      assert.equal(await page.evaluate(()=>scrollY), 0, 'navegação principal retorna ao topo');
      await page.getByRole('button',{name:'Início',exact:true}).click();
      assert.equal(await page.evaluate(()=>localStorage.getItem('agu_quiz_mvp1_2026')), fixture, 'navegar não muda histórico');
      await page.reload();
      assert.equal(await page.evaluate(()=>localStorage.getItem('agu_quiz_mvp1_2026')), fixture);
      if ([320,390,430,768,980,1100,1280].includes(width)) {
        await page.addStyleTag({content:':root{font-size:200%}'});
        const reflow = await page.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth}));
        assert.ok(reflow.scroll <= reflow.width + 1, 'reflow com texto a 200%');
        if (width === 320) {
          const flow = await page.evaluate(()=>({navRows:new Set([...document.querySelectorAll('.side .nav')].map(e=>e.getBoundingClientRect().y)).size,summaryColumns:getComputedStyle(document.querySelector('.today-summary')).gridTemplateColumns.split(' ').length,linkColumns:getComputedStyle(document.querySelector('.today-links')).gridTemplateColumns.split(' ').length}));
          assert.deepEqual(flow,{navRows:2,summaryColumns:1,linkColumns:1},'texto ampliado reorganiza os grupos');
        }
        await page.locator('.hub-details summary').focus();
        const focus = await page.evaluate(()=>({focused:document.activeElement===document.querySelector('.hub-details summary'),bottom:document.activeElement.getBoundingClientRect().bottom,navTop:document.querySelector('.side').getBoundingClientRect().top}));
        assert.equal(focus.focused, true);
        if (touch || width <= 860) assert.ok(focus.bottom <= focus.navTop, 'foco final não fica sob a navegação');
        await page.screenshot({path:path.join(OUT,`texto-200-${width}-${touch?'toque':'mouse'}.png`),fullPage:true});
      }
      assert.deepEqual(errors, []);
      results.push({width,height,touch,snapshots,design,historicalStatePreserved:true});
      await context.close();
    }
    fs.writeFileSync(path.join(OUT,'resultado.json'), JSON.stringify(results,null,2)+'\n');
    console.log('INTERFACE_AGU_001_OK', JSON.stringify({profiles:results.length,scans:results.reduce((n,r)=>n+r.snapshots.length,0),physicalAndroid:false}));
  } finally { await browser.close(); if(server)server.close(); }
}
main().catch(error=>{console.error(error.stack||error);process.exitCode=1;if(server)server.close();});
