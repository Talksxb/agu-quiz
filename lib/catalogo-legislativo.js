/* Contrato aditivo LEG-01. Validação offline; não busca normas nem escreve dados. */
'use strict';
const ID=/^[A-Za-z0-9][A-Za-z0-9:._-]*$/;
const date=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&new Date(x+'T00:00:00Z').toISOString().slice(0,10)===x;
const text=x=>typeof x==='string'&&x.trim().length>0;
function official(url){try{const u=new URL(url);return u.protocol==='https:'&&/\.(gov|leg|jus)\.br$/.test(u.hostname)&&!u.username&&!u.password}catch{return false}}
function validate(corpus,previous=null){
 const fail=m=>{throw Error('Catálogo legislativo: '+m)};
 if(corpus?.schema!=='agu-legal-reader-v1'||corpus.catalogContract!=='agu-legislation-leg01-v1'||!Array.isArray(corpus.laws)||!corpus.laws.length)fail('contrato incompatível');
 const seen=new Set(),units=new Map();
 const unique=id=>{if(!text(id)||!ID.test(id)||seen.has(id))fail('ID inválido ou repetido: '+id);seen.add(id)};
 for(const law of corpus.laws){
  unique(law.id);
  if(!text(law.title)||!text(law.kind)||!(law.number===null||text(law.number))||!Number.isInteger(law.year)||!official(law.source)||!text(law.sourceAuthority)||!date(law.checkedOn)||!text(law.sourceVersion)||!text(law.textVersionId)||!text(law.auditStatus))fail('metadados incompletos: '+law.id);
  if(!['partial','integral'].includes(law.contentCoverage)||!['pending','legacy_point_check','compared'].includes(law.textVerification?.status))fail('cobertura/verificação ausente: '+law.id);
  if(law.textVerification.status!=='pending'&&!date(law.textVerification.checkedOn))fail('consulta textual sem data');
  if(law.frontMatterEditorialNotes!==undefined&&(!Array.isArray(law.frontMatterEditorialNotes)||law.frontMatterEditorialNotes.some(n=>!text(n.text)||!Array.isArray(n.sourceLinks))))fail('nota editorial de ementa inválida');
  if(!Array.isArray(law.structure)||!Array.isArray(law.articles)||!law.articles.length)fail('estrutura vazia');
  const nodes=new Map();
  for(const n of law.structure){unique(n.id);if(!n.id.startsWith(law.id+':')||!['book','title','chapter','section','subsection','annex'].includes(n.kind)||!text(n.label))fail('divisão inválida');nodes.set(n.id,n)}
  for(const n of nodes.values()){
   const chain=new Set([n.id]);let parent=n.parentId;
   while(parent!==null){if(!nodes.has(parent)||chain.has(parent))fail('pai ausente ou ciclo');chain.add(parent);parent=nodes.get(parent).parentId}
  }
  const articleIds=[];
  for(const a of law.articles){
   unique(a.id);articleIds.push(a.id);
   if(!a.id.startsWith(law.id+':')||!text(a.label)||!(a.topic===null||text(a.topic))||!['isolated_article','excerpt'].includes(a.contentKind)||Boolean(a.excerpt)!==(a.contentKind==='excerpt'))fail('artigo/cobertura incoerente: '+a.id);
   if(!Array.isArray(a.structurePath)||a.structurePath.some((p,i)=>!nodes.has(p)||nodes.get(p).parentId!==(i?a.structurePath[i-1]:null)))fail('caminho estrutural inválido');
   if(a.sourceNotices!==undefined&&(!Array.isArray(a.sourceNotices)||a.sourceNotices.some(n=>!text(n.text)||!official(n.url))))fail('ressalva sem fonte oficial');
   if(!Array.isArray(a.clauses)||!a.clauses.length)fail('artigo sem dispositivos');
   const local=new Map(a.clauses.map(u=>[u.id,u]));
   for(const u of a.clauses){
    unique(u.id);
    if(u.textStatus!==undefined&&!['veto_placeholder','declared_unconstitutional_in_source','revoked_in_source'].includes(u.textStatus))fail('estado textual inválido');
    if(!u.id.startsWith(a.id+':')||!text(u.label)||!text(u.text)||!['caput','paragraph','item','subitem','point'].includes(u.kind))fail('dispositivo inválido');
    const chain=new Set([u.id]);let parent=u.parentId;
    while(parent!==a.id){if(!local.has(parent)||chain.has(parent))fail('hierarquia de dispositivo inválida');chain.add(parent);parent=local.get(parent).parentId}
    units.set(u.id,{article:a.id,topic:a.topic,text:u.text,version:law.textVersionId});
   }
  }
  if(law.contentCoverage==='integral'){
   const complete=law.completeness;
   if(law.articles.some(a=>a.excerpt)||law.textVerification.status!=='compared'||law.textVerification.scope!=='full_norm'||!complete||!date(complete.checkedOn)||!/^sha256:[0-9a-f]{64}$/.test(complete.sourceDigest||'')||!['included','not_applicable'].includes(complete.annexes)||!Array.isArray(complete.expectedArticleIds)||new Set(complete.expectedArticleIds).size!==articleIds.length||JSON.stringify(complete.expectedArticleIds)!==JSON.stringify(articleIds))fail('declaração integral sem manifesto de cotejo');
  }
 }
 if(previous){
  for(const law of previous.laws)for(const a of law.articles)for(const u of a.clauses){
   const next=units.get(u.id);
   if(!next||next.article!==a.id||next.topic!==a.topic)fail('ID/vínculo legado removido ou alterado: '+u.id);
   if(next.text!==u.text&&next.version===law.textVersionId)fail('texto alterado sem nova versão: '+u.id);
  }
 }
 return {laws:corpus.laws.length,articles:corpus.laws.reduce((n,l)=>n+l.articles.length,0),units:units.size,integral:corpus.laws.filter(l=>l.contentCoverage==='integral').length};
}
module.exports={validate,official};
