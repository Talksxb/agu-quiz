/* Contrato compartilhado do registro de leitura; não grava nem cria aprendizagem. */
(function(root){
'use strict';
const forbidden=new Set(['__proto__','prototype','constructor']),id=x=>typeof x==='string'&&/^[a-z0-9][a-z0-9-]{0,139}$/.test(x)&&!forbidden.has(x);
const obj=x=>x!==null&&typeof x==='object'&&!Array.isArray(x),own=(o,k)=>Object.hasOwn(o,k);
const version=x=>typeof x==='string'&&x.length>0&&x.length<=120&&!/[\u0000-\u001f]/.test(x)&&!forbidden.has(x);
const refs=()=>root.AGU_METHOD_BOOK_REFERENCES?.chapters||{};
function date(x){if(typeof x!=='string'||!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?Z$/.test(x))return false;const d=new Date(x);return Number.isFinite(d.getTime())&&d.toISOString().slice(0,19)===x.slice(0,19)}
function inert(value,depth=0,budget={left:200000}){
 if(--budget.left<0||depth>12)return false;
 if(value===null||typeof value==='boolean')return true;
 if(typeof value==='number')return Number.isFinite(value);
 if(typeof value==='string')return value.length<=20000;
 if(Array.isArray(value))return value.length<=10000&&value.every(x=>inert(x,depth+1,budget));
 return obj(value)&&Object.keys(value).length<=10000&&Object.entries(value).every(([k,v])=>k.length<=200&&!forbidden.has(k)&&inert(v,depth+1,budget));
}
function recordValid(r,reference=null,archive=false){
 if(!obj(r))return false;
 const index=x=>Number.isInteger(x)&&x>=0&&x<10000;
 if(own(r,'page')&&!index(r.page))return false;
 if(own(r,'done')&&(!Array.isArray(r.done)||r.done.length>10000||!r.done.every(index)||new Set(r.done).size!==r.done.length))return false;
 if(own(r,'updated')&&!date(r.updated))return false;
 if(own(r,'sectionId')&&!id(r.sectionId))return false;
 if(own(r,'methodEdition')&&!version(r.methodEdition))return false;
 if(own(r,'preferences')){
  const p=r.preferences;if(!obj(p))return false;
  if(own(p,'size')&&(!Number.isInteger(p.size)||p.size<18||p.size>28))return false;
  if(own(p,'height')&&(typeof p.height!=='number'||p.height<1.5||p.height>2.3))return false;
 }
 if(own(r,'activities')){
  if(!obj(r.activities)||Object.keys(r.activities).length>1000)return false;
  for(const [key,a] of Object.entries(r.activities)){
   if(!id(key)||!obj(a)||(own(a,'draft')&&(typeof a.draft!=='string'||a.draft.length>12000))||(own(a,'edition')&&!version(a.edition))||(own(a,'performedAt')&&!date(a.performedAt)))return false;
   if(reference&&r.methodEdition===reference.edition&&a.edition===reference.edition&&!reference.activities.includes(key))return false;
  }
 }
 if(own(r,'readingEditions')){
  if(archive||!obj(r.readingEditions)||Object.keys(r.readingEditions).length>100)return false;
  if(!Object.entries(r.readingEditions).every(([edition,old])=>version(edition)&&recordValid(old,null,true)))return false;
 }
 // Só a edição conhecida pode ser cotejada com os índices atuais; outras edições são históricas.
 if(reference&&r.methodEdition===reference.edition){
  if((own(r,'page')&&r.page>=reference.sections.length)||(r.done||[]).some(n=>n>=reference.sections.length))return false;
  if(own(r,'sectionId')&&!reference.sections.includes(r.sectionId))return false;
 }
 return true;
}
function validate(value){return obj(value)&&Object.keys(value).length<=2000&&inert(value)&&Object.entries(value).every(([key,r])=>id(key)&&recordValid(r,refs()[key]))}
function needsArchive(r,edition){return !!((r?.methodEdition&&r.methodEdition!==edition)||Object.values(r?.activities||{}).some(a=>a?.edition&&a.edition!==edition))}
function assess(key,r){const reference=refs()[key];return {id:key,title:reference?.title||key,known:!!reference,edition:r.methodEdition||'não identificada',currentEdition:reference?.edition||null,mismatch:!!(reference&&needsArchive(r,reference.edition)),legacy:!r.methodEdition}}
function active(r,edition){return needsArchive(r,edition)?{...r,page:0,done:[],sectionId:undefined,activities:{}}:r}
function prepare(r,edition){
 if(!needsArchive(r,edition))return {...r,methodEdition:edition};
 const snapshot={...r};delete snapshot.readingEditions;
 const history={...(r.readingEditions||{})},base=r.methodEdition||'sem-edicao';let key=base,n=2;
 while(own(history,key)&&JSON.stringify(history[key])!==JSON.stringify(snapshot))key=base.slice(0,112)+'#'+n++;
 if(Object.keys(history).length>=100&&!own(history,key))throw Error('Histórico de edições atingiu o limite; exporte o backup antes de continuar.');
 history[key]=snapshot;
 const next={...r,page:0,done:[],activities:{},methodEdition:edition,readingEditions:history};delete next.sectionId;return next;
}
root.AGUMethodProgress={validate,assess,active,prepare,needsArchive};
})(window);
