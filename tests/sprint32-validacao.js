/* Sprint 32 — regressão sintética dos controles que recriam o Leitor.
 * O teste documenta foco perdido no Chrome publicado antes do patch.
 * Não lê histórico real nem publica anotações pessoais.
 */
'use strict';
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..');
const data=new Map(),body={tagName:'BODY',id:'body'},focusLog=[];
const note='Nota sintética Sprint 32, apenas teste de foco.';
const fields={'agu-legal-note':{value:note},'agu-search-q':{value:'art. 13'},'agu-search-kind':{value:'todos'},'agu-search-status':{value:'todos'}};
const document={activeElement:body,
 getElementById:id=>fields[id]||null,createElement:()=>({}),head:{appendChild(){}},
 querySelector(selector){
  const targets={
   '#agu-save-note':'note-save',
   '#agu-reader .agu-s17-search > button':'search-toggle',
   '#agu-reader .agu-s17-fields button.agu-primary':'search-submit',
   '#agu-reader .agu-s17-fields button.agu-light':'search-clear',
   '#agu-search-q':'search-input',
   '#agu-reader .agu-s17-settings select':'text-size',
   '#agu-reader .agu-unit.selected':'result-unit'
  };
  const id=targets[selector];
  if(!id)return null;
  return {id,tagName:id==='text-size'?'SELECT':'BUTTON',focus(options){document.activeElement=this;focusLog.push({id,options})}};
 },querySelectorAll:()=>[]
};
const env={window:null,document,localStorage:{getItem:k=>data.get(k)||null,setItem:(k,v)=>data.set(k,String(v))},
 matchMedia:()=>({matches:false}),render(){document.activeElement=body;env.html=env.AGULegal.page()}};
env.window=env;vm.createContext(env);
for(const file of ['dados/legislacao-s13.js','leitor-consolidacao.js','leitor-juridico.js'])
 vm.runInContext(fs.readFileSync(path.join(ROOT,file),'utf8'),env,{filename:file});
env.render();
const results=[];
function scenario(name,action,expected){document.activeElement={id:'before:'+name};action();const observed=document.activeElement?.id||'body';results.push({name,expected,observed,ok:observed===expected})}
env.AGULegal.tab('comentarios');
scenario('salvar_nota',()=>env.AGULegal.note(true),'note-save');
assert.equal(JSON.parse(data.get('agu_leitor_juridico_s13_v1')).notes[env.AGULegal.peek().unit],note,'nota intacta');
scenario('alternar_filtros',()=>env.AGUConsolidation.toggle(true),'search-toggle');
scenario('buscar_enter',()=>env.AGUConsolidation.submit('input'),'search-input');
scenario('limpar_busca',()=>env.AGUConsolidation.clear('clear'),'search-clear');
scenario('tamanho_fonte',()=>env.AGUConsolidation.textSize(115,true),'text-size');
env.AGUConsolidation.setFilters('art. 13','todos','todos');
scenario('abrir_resultado',()=>env.AGUConsolidation.open('L9784:art13:I',true),'result-unit');
assert.equal(env.AGULegal.peek().unit,'L9784:art13:I','resultado aponta para unidade real');
assert.equal(env.AGULegal.peek().article,'L9784:art13','resultado mantém artigo coerente');
assert.equal(env.AGUConsolidation.peek().size,115,'tamanho persistiu');
assert.equal(env.AGUConsolidation.peek().query,'art. 13','busca válida reaplicada para abertura de resultado');
console.log('S32_CONTROLES_FOCO',JSON.stringify({results,focusLog:focusLog.length}));
assert.ok(results.every(x=>x.ok),'foco restaurado em todos os seis controles após render');
assert.ok(focusLog.every(x=>x.options?.preventScroll===false),'foco final deve ser revelado no viewport');
assert.match(env.html,/id="agu-save-note"[^>]*onclick="AGULegal\.note\(true\)"/,'handler do botão real preserva foco');
assert.match(env.html,/AGUConsolidation\.open\('L9784:art13:I',true\)/,'resultado real solicita foco');
