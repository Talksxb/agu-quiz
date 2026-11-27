/* UX-AGU-AUD-001-CORR-01: strict, contextual axe rechecks; no product mutation. */
'use strict';
const assert=require('node:assert/strict');
const checks=[];
async function recheck(page,root,report,label,width){
 const records=[],seen=new Set();
 for(const rule of report.incompleteTargets||report.incomplete||[]){
  for(const target of rule.nodes||rule.targets||[]){
   const key=JSON.stringify([rule.id,target]);
   if(seen.has(key))continue;
   seen.add(key);
   const rec={label,width,root,rule:rule.id,target,status:'unresolved'};
   try{
    if(!Array.isArray(target)||target.length!==1||typeof target[0]!=='string')throw Error('complex target needs manual review');
    const loc=page.locator(target[0]);
    if(await loc.count()!==1)throw Error('target not unique');
    if(!await loc.isVisible())throw Error('target not visible');
    const evidence=await loc.evaluate(async(node,{root,id,target})=>{
     const scope=document.querySelector(root);
     if(!scope||!scope.contains(node))throw Error('target outside original scope');
     const positions=[];
     for(let el=node.parentElement;el;el=el.parentElement)positions.push([el,el.scrollLeft,el.scrollTop]);
     const x=window.scrollX,y=window.scrollY;
     try{
      node.scrollIntoView({block:'center',inline:'nearest',behavior:'instant'});
      await new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve)));
      const rect=node.getBoundingClientRect(),style=getComputedStyle(node);
      const visible=rect.width>0&&rect.height>0&&rect.bottom>0&&rect.top<innerHeight&&rect.right>0&&rect.left<innerWidth&&style.visibility==='visible';
      const result=await axe.run(scope,{runOnly:{type:'rule',values:[id]}});
      const same=n=>JSON.stringify(n.target)===JSON.stringify(target);
      const hits=kind=>result[kind].filter(rule=>rule.id===id).flatMap(rule=>rule.nodes.filter(same)).length;
      return {visible,passed:hits('passes'),violations:hits('violations'),incomplete:hits('incomplete'),
       ruleViolations:result.violations.map(r=>({id:r.id,targets:r.nodes.map(n=>n.target)})),
       color:style.color,background:style.backgroundColor};
     }finally{
      for(const [el,left,top] of positions){el.scrollLeft=left;el.scrollTop=top}
      window.scrollTo({left:x,top:y,behavior:'instant'});
     }
    },{root,id:rule.id,target});
    Object.assign(rec,evidence);
    if(evidence.visible&&evidence.passed>0&&!evidence.violations&&!evidence.incomplete&&!evidence.ruleViolations.length)rec.status='passed';
   }catch(e){rec.reason=String(e)}
   records.push(rec);
  }
 }
 // A rule without target detail cannot silently pass.
 for(const rule of report.incompleteTargets||report.incomplete||[]){
  if(!(rule.nodes||rule.targets||[]).length)records.push({label,width,root,rule:rule.id||rule,status:'unresolved',reason:'missing target detail'});
 }
 const violations=report.violations||[];
 const unresolved=records.filter(r=>r.status!=='passed');
 const summary={label,width,root,initialRules:(report.incompleteTargets||report.incomplete||[]).length,targets:records.length,passed:records.length-unresolved.length,violations,unresolved,records};
 checks.push(summary);
 console.log('CORR_01_AXE_RECHECK',JSON.stringify(summary));
 return summary;
}
function assertResolved(){
 const unresolved=checks.flatMap(c=>c.unresolved);
 const violations=checks.flatMap(c=>c.violations.map(v=>({label:c.label,width:c.width,...v})));
 assert.equal(checks.length>0,true,'CORR-01 requires actual scans');
 assert.deepEqual(violations,[],'CORR-01 original scan violations');
 assert.deepEqual(unresolved,[],'CORR-01 unresolved rule/target/context');
 console.log('CORR_01_AXE_OK',JSON.stringify({scans:checks.length,targets:checks.reduce((s,c)=>s+c.targets,0),uniqueRuleTargets:new Set(checks.flatMap(c=>c.records.map(r=>JSON.stringify([r.rule,r.target])))).size,unresolved:0}));
}
module.exports={recheck,assertResolved};
