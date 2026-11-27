/* Rechecagem explícita de inconclusões axe no mesmo documento; sem ignorar regras/alvos. */
'use strict';
const assert=require('node:assert/strict');
async function resolveIncomplete(page,report,label,{explicitTargets=[]}={}){
 const rechecks=[],initialTargets=(report.incomplete||[]).flatMap(rule=>rule.nodes.map(target=>({id:rule.id,target})));
 const all=[...initialTargets,...explicitTargets].filter((x,i,a)=>a.findIndex(y=>y.id===x.id&&JSON.stringify(y.target)===JSON.stringify(x.target))===i);
 for(const {id,target} of all){
  const rec={rule:id,target,status:'unresolved',origin:initialTargets.some(x=>x.id===id&&JSON.stringify(x.target)===JSON.stringify(target))?'incomplete':'explicit'};
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
    const before=box(),active=document.activeElement;
    const same=n=>JSON.stringify(n.target)===JSON.stringify(target);
    const details=n=>({target:n.target,failureSummary:n.failureSummary,any:n.any?.map(x=>({id:x.id,message:x.message,data:x.data,relatedNodes:x.relatedNodes?.map(y=>y.target)})),all:n.all?.map(x=>({id:x.id,message:x.message,data:x.data})),none:n.none?.map(x=>({id:x.id,message:x.message,data:x.data}))});
    const attempts=[];
    try{
     for(const block of ['center','end','start','nearest']){
      el.scrollIntoView({block,inline:'center',behavior:'instant'});await wait();
      const after=box(),result=await axe.run(document,{runOnly:{type:'rule',values:[id]}});
      const nodes=kind=>result[kind].flatMap(v=>v.nodes.filter(same));
      const rects=[...el.getClientRects()].map(r=>({left:r.left,top:r.top,right:r.right,bottom:r.bottom}));
      const range=document.createRange();range.selectNodeContents(el);
      const textRects=[...range.getClientRects()].filter(r=>r.width&&r.height).map(r=>({left:r.left,top:r.top,right:r.right,bottom:r.bottom,stack:document.elementsFromPoint((r.left+r.right)/2,(r.top+r.bottom)/2).slice(0,6).map(e=>({tag:e.tagName,id:e.id,cls:typeof e.className==='string'?e.className:'',color:getComputedStyle(e).color,background:getComputedStyle(e).backgroundColor}))}));
      const trial={block,after,visible:after.width>0&&after.height>0&&after.bottom>0&&after.top<innerHeight&&after.right>0&&after.left<innerWidth,
       passed:nodes('passes').length,violations:nodes('violations').length,incomplete:nodes('incomplete').length,
       ruleViolations:result.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)})),diagnostics:nodes('incomplete').map(details),rects,textRects,
       focusPreserved:document.activeElement===active,active:active?.outerHTML?.slice(0,350),modal:el.closest('dialog')?.getBoundingClientRect().toJSON(),
       color:getComputedStyle(el).color,background:getComputedStyle(el).backgroundColor};
      attempts.push(trial);
      if(trial.violations||trial.ruleViolations.length||!trial.focusPreserved)break;
      if(trial.visible&&trial.passed>0&&!trial.incomplete)break;
     }
     return {before,...attempts[attempts.length-1],attempts};
    }finally{for(const [e,x,y] of saved){e.scrollLeft=x;e.scrollTop=y}await wait()}
   },{id,target});
   Object.assign(rec,evidence);
   if(evidence.visible&&evidence.passed>0&&!evidence.violations&&!evidence.incomplete&&Array.isArray(evidence.ruleViolations)&&!evidence.ruleViolations.length&&evidence.attempts?.every(a=>a.focusPreserved&&!a.violations&&!a.ruleViolations.length))rec.status='passed';
  }catch(e){rec.reason=String(e)}
  rechecks.push(rec);
 }
 report.afterScroll=rechecks;report.unresolved=rechecks.filter(x=>x.status!=='passed');
 console.log('LIVROS_AXE_RECHECK',JSON.stringify({label,initial:initialTargets.length,explicit:explicitTargets.length,checked:rechecks.length,passed:rechecks.length-report.unresolved.length,unresolved:report.unresolved,records:rechecks}));
 assert.deepEqual(report.violations,[],label+' violações axe');
 assert.deepEqual(report.unresolved,[],label+' inconclusões axe não resolvidas');
 return report;
}
async function fullScan(page,label){
 const result=await page.evaluate(async()=>{const r=await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']}});return {violations:r.violations.map(v=>({id:v.id,impact:v.impact,nodes:v.nodes.map(n=>n.target)})),incomplete:r.incomplete.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))}});
 return resolveIncomplete(page,result,label);
}
module.exports={resolveIncomplete,fullScan};
