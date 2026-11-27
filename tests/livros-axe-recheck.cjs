/* Rechecagem explícita de inconclusões axe no mesmo documento; sem ignorar regras/alvos. */
'use strict';
const assert=require('node:assert/strict');
async function resolveIncomplete(page,report,label){
 const rechecks=[];
 for(const rule of report.incomplete||[])for(const target of rule.nodes){
  const rec={rule:rule.id,target,status:'unresolved'};
  try{
   if(target.length!==1||typeof target[0]!=='string')throw Error('alvo complexo exige inspeção');
   const evidence=await page.evaluate(async({id,target})=>{
    const matches=document.querySelectorAll(target[0]);
    if(matches.length!==1)return {reason:'alvo não único',count:matches.length};
    const el=matches[0],ancestors=new Set([document.scrollingElement]);
    for(let e=el;e;e=e.parentElement)ancestors.add(e);
    const saved=[...ancestors].filter(Boolean).map(e=>[e,e.scrollLeft,e.scrollTop]);
    const wait=()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    const box=()=>{const r=el.getBoundingClientRect();return {left:r.left,top:r.top,right:r.right,bottom:r.bottom,width:r.width,height:r.height}};
    const before=box();
    try{
     el.scrollIntoView({block:'center',inline:'center',behavior:'instant'});await wait();
     const after=box(),result=await axe.run(document,{runOnly:{type:'rule',values:[id]}});
     const same=n=>JSON.stringify(n.target)===JSON.stringify(target);
     const hits=kind=>result[kind].flatMap(v=>v.nodes.filter(same)).length;
     return {before,after,visible:after.width>0&&after.height>0&&after.bottom>0&&after.top<innerHeight&&after.right>0&&after.left<innerWidth,
       passed:hits('passes'),violations:hits('violations'),incomplete:hits('incomplete'),ruleViolations:result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),
       color:getComputedStyle(el).color,background:getComputedStyle(el).backgroundColor};
    }finally{for(const [e,x,y] of saved){e.scrollLeft=x;e.scrollTop=y}await wait()}
   },{id:rule.id,target});
   Object.assign(rec,evidence);
   if(evidence.visible&&evidence.passed>0&&!evidence.violations&&!evidence.incomplete&&Array.isArray(evidence.ruleViolations)&&!evidence.ruleViolations.length)rec.status='passed';
  }catch(e){rec.reason=String(e)}
  rechecks.push(rec);
 }
 report.afterScroll=rechecks;report.unresolved=rechecks.filter(x=>x.status!=='passed');
 console.log('LIVROS_AXE_RECHECK',JSON.stringify({label,initial:rechecks.length,passed:rechecks.length-report.unresolved.length,unresolved:report.unresolved,records:rechecks}));
 assert.deepEqual(report.violations,[],label+' violações axe');
 assert.deepEqual(report.unresolved,[],label+' inconclusões axe não resolvidas');
 return report;
}
async function fullScan(page,label){
 const result=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))}});
 return resolveIncomplete(page,result,label);
}
module.exports={resolveIncomplete,fullScan};
