/* Sprint 31 — foco previsível nos controles que recriam o Leitor.
 * DOM e storage sintéticos; a observação Chrome pré-patch fica no checkpoint.
 */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..');
const records=new Map(),body={tagName:'BODY',id:'body'};
let narrow=false;
const document={activeElement:body,focusLog:[],
 getElementById(){return null},createElement(){return {}},head:{appendChild(){}},
 querySelector(selector){
  const s=env.AGULegal.peek();
  if(selector==='#agu-reader .agu-index-entry.selected')return element('index:'+s.article);
  if(selector==='#agu-reader .agu-tabs button[aria-pressed="true"]')return element('tab:'+s.tab);
  if(selector==='#agu-reader .agu-document h2')return element('heading:'+s.article);
  if(selector==='#agu-reader .agu-unit.selected')return element('unit:'+s.unit);
  return null;
 },
 querySelectorAll(selector){
  if(selector==='#agu-reader .agu-document button.agu-light')return [element('step:previous'),element('step:next')];
  if(selector==='#agu-reader .agu-mobile button')return ['index','text','related'].map(x=>element('mobile:'+x));
  return [];
 }
};
function element(id){return{tagName:'BUTTON',id,disabled:false,focus(options){document.activeElement=this;document.focusLog.push({id,options})}}}
const env={window:null,document,matchMedia:()=>({matches:narrow}),
 localStorage:{getItem:k=>records.get(k)||null,setItem:(k,v)=>records.set(k,String(v))},
 render(){document.activeElement=body;env.html=env.AGULegal.page()}};
env.window=env;vm.createContext(env);
for(const file of ['dados/legislacao-s13.js','leitor-juridico.js'])
 vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),env,{filename:file});
env.render();

const articles=env.AGU_LEGAL_CORPUS.laws.flatMap(l=>l.articles);
assert.ok(articles.length>=4,'corpus precisa de artigos suficientes');
function button(label){
 const found=[...env.html.matchAll(/<button\b([^>]*)>([^<]*)<\/button>/g)].find(x=>x[2].trim()===label);
 assert.ok(found,'controle existente: '+label);
 const handler=found[1].match(/onclick="([^"]+)"/);
 assert.ok(handler,'handler do controle: '+label);
 return handler[1];
}
function action(name,label,expected){
 document.activeElement=element('before:'+name);
 vm.runInContext(button(label),env,{filename:'leitor-juridico.js#onclick'});
 const observed=document.activeElement.id||'body';
 return {name,label,expected,observed,ok:expected===observed};
}
const results=[];
results.push(action('indice','Art. 49 (excerto: inciso V) · ADM-27','index:CF88:art49'));
results.push(action('abas','Questões','tab:questoes'));
results.push(action('proximo_artigo','Próximo artigo →','step:next'));
narrow=true;
results.push(action('mobile_indice','Índice','mobile:index'));
results.push(action('mobile_texto','Texto legal','mobile:text'));
results.push(action('indice_mobile','Art. 132 · CON-51','heading:CF88:art132'));
const all=results.every(x=>x.ok);
console.log(all?'S31_FOCO_RENDER_OK':'S31_FOCO_RENDER_FALHAS',JSON.stringify({results,focusLog:document.focusLog.length}));
assert.ok(all,'foco em artigo/aba/avanço/painel após rerenderização');
assert.ok(document.focusLog.every(x=>x.options?.preventScroll===true),'foco sem deslocar scroll');
assert.equal(env.AGULegal.peek().article,'CF88:art132','troca mobile mantém artigo');
assert.equal(env.AGULegal.peek().mobile,'text','troca de artigo abre painel de texto no mobile');
assert.equal(JSON.parse(records.get('agu_leitor_juridico_s13_v1')).article,'CF88:art132','estado local preservado');
