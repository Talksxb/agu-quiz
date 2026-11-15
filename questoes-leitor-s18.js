/* Sprint 19: questão oficial auditada na aba existente, mantendo API da Sprint 18. */
(function(root){
'use strict';
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const all=()=>[...(root.AGU_OFFICIAL_S18?.questions||[]),...(root.AGU_OFFICIAL_S19?.questions||[])]
 .filter(x=>x&&/^of-\d{4}-adv-\d{3}$/.test(x.id)&&x.status==='gabarito_definitivo'&&x.annulled===false&&
 ['C','E'].includes(x.key)&&x.type==='ce'&&x.deviceId&&x.historicReason&&x.currentReason&&
 /^https:\/\//.test(x.examUrl)&&/^https:\/\//.test(x.keyUrl));
// LEG10: referências históricas dos quatro itens PONTUALMENTE conferidos no corpus público.
// Não constituem novo banco de questões; preservam a legibilidade de marcações se o item sair de circulação.
// Uma referência histórica NÃO autoriza criar outra marcação sem a questão ainda elegível no catálogo.
const notebookReferences=Object.freeze({
 'of-2015-adv-006':Object.freeze({label:'AGU 2015 · Q6 · 187AGU_001_07',topic:'ADM-17',number:6,key:'E',deviceId:'L9784:art50:p1'}),
 'of-2015-adv-007':Object.freeze({label:'AGU 2015 · Q7 · 187AGU_001_07',topic:'ADM-27',number:7,key:'C',deviceId:'CF88:art49:V'}),
 'of-2015-adv-009':Object.freeze({label:'AGU 2015 · Q9 · 187AGU_001_07',topic:'ADM-27',number:9,key:'E',deviceId:'CF88:art37:X'}),
 'of-2015-adv-048':Object.freeze({label:'AGU 2015 · Q48 · 187AGU_001_07',topic:null,number:48,key:'C',deviceId:'CF88:art131:caput'})
});
const notebookHistoricReference=id=>notebookReferences[id]||null;
function notebookEligible(id){
 const q=all().find(x=>x.id===id),ref=notebookHistoricReference(id);
 if(!q||!ref||q.year!==2015||q.exam!=='187AGU_001_07'||q.number!==ref.number||q.key!==ref.key||q.deviceId!==ref.deviceId||
  !q.sourceVerified||!q.examLocator||!q.keyLocator||!q.evidenceStatus||
  !q.primaryCurricularId||!q.adaptedStem||!q.reference||!q.auditStatus)return null;
 // Somente vínculo direto e identidade curricular coincidente podem alimentar revisão LEG08.
 const topic=q.code===q.primaryCurricularId&&q.relationDegree==='direto_dispositivo_nuclear'?q.primaryCurricularId:null;
 return topic===ref.topic?q:null;
}
const list=(deviceId)=>all().filter(x=>x.deviceId===deviceId);
let selected=null;
function choose(id){
 const q=all().find(x=>x.id===id);if(!q||!root.AGUReview?.focusOfficial(id))return false;
 selected=id;root.AGUStudy?.trackOfficial?.(id,q.deviceId);
 root.render?.();return true;
}
function panel(deviceId){
 const items=list(deviceId);
 if(!items.length)return '<div class="agu-notice">Ainda não há questões oficiais com fundamentação histórica e atual suficientemente conferidas para este dispositivo. Itens meramente indexados não foram promovidos.</div>';
 let x='<p class="agu-muted">'+items.length+' questão(ões) vinculada(s) a este dispositivo, com gabarito histórico e fundamento pontualmente conferidos. Sem certificação integral do tópico.</p>';
 for(const q of items){
  const sec=(q.secondaryCurricularIds||[]).join(', ');
  x+='<article class="agu-notice"><b>AGU '+q.year+' · Questão '+q.number+' · '+esc(q.title)+'</b>'+
   '<p class="agu-muted">Cebraspe · '+esc(q.exam)+' · currículo principal '+esc(q.primaryCurricularId)+(sec?' · secundários '+esc(sec):'')+' · '+esc(q.deviceId)+' · Certo/Errado</p>'+
   '<p>'+esc(q.adaptedStem)+'</p>'+
   '<p class="agu-muted">'+esc(q.adaptedLabel||'Paráfrase autoral, não transcrição da banca. Consulte o item oficial no PDF.')+'</p>'+
   '<a href="'+esc(q.examUrl)+'" target="_blank" rel="noopener noreferrer">Caderno oficial</a> · <a href="'+esc(q.keyUrl)+'" target="_blank" rel="noopener noreferrer">Gabarito definitivo</a>'+
   '<p><button class="agu-primary" type="button" onclick="AGUQuestions18.choose(\''+esc(q.id)+'\')">Responder no Leitor</button></p></article>';
 }
 if(selected&&items.some(q=>q.id===selected)){
  const card=root.AGUReview?.focusedHTML?.()||'';
  if(card)x+='<div class="agu-ctx-box"><h4 id="agu-question-context" tabindex="-1">Responder e revisar</h4>'+card+'</div>';
  if(notebookEligible(selected))x+='<details class="agu-ctx-box agu-question-notebook"><summary>Para meu caderno · questão oficial '+esc(items.find(q=>q.id===selected).number)+'</summary>'+
   '<p class="agu-muted">Registre apenas uma dúvida, distinção ou pergunta breve para escrever depois à mão. Não registra resposta nem altera a revisão.</p>'+
   '<label for="q18-notebook">Minha pergunta para o caderno físico</label><textarea id="q18-notebook" maxlength="450" rows="3" placeholder="O que preciso distinguir nesta questão?"></textarea>'+
   '<button class="agu-light" id="q18-notebook-save" type="button" onclick="AGUQuestions18.notebookSave()">Guardar para meu caderno</button>'+
   '<p class="agu-muted" id="q18-notebook-status" tabindex="-1" role="status" aria-live="polite">'+esc(notebookMessage)+'</p></details>';
  x+='<div class="agu-ctx-box"><h4>Dificuldade pessoal · Caderno AGU</h4><label>Minha dúvida ou dificuldade<textarea id="q18-note" maxlength="16000" rows="3" placeholder="Registre sua própria dúvida; comentários da banca não são copiados automaticamente."></textarea></label><button class="agu-light" type="button" onclick="AGUQuestions18.note()">Salvar dificuldade</button></div>';
 }
 return x;
}
let notebookMessage='';
function notebookSave(){
 const field=document.getElementById('q18-notebook'),prompt=field?.value?.trim()||'';
 if(!notebookEligible(selected)||!prompt||prompt.length>450){
  notebookMessage='Escreva uma pergunta breve de até 450 caracteres para uma questão verificada.';
  const status=document.getElementById('q18-notebook-status');if(status)status.textContent=notebookMessage;
  return false;
 }
 if(root.AGULegal?.notebookSaveQuestion?.(selected,prompt)!==true){
  notebookMessage='Não foi possível salvar. Os dados anteriores foram preservados; confira o limite de marcações ou espaço local.';
  const status=document.getElementById('q18-notebook-status');if(status)status.textContent=notebookMessage;
  return false;
 }
 notebookMessage='Pendente registrada na mesma lista Para meu caderno.';root.render?.();
 const panel=document.querySelector?.('.agu-question-notebook');if(panel)panel.open=true;
 document.getElementById('q18-notebook-status')?.focus?.({preventScroll:false});return true;
}
// Abertura de origem NÃO chama trackOfficial: não afeta sessão, resposta nem data de revisão.
function openFromNotebook(id){if(!notebookEligible(id)||!root.AGUReview?.focusOfficial?.(id))return false;selected=id;return true}
function note(){
 const x=all().find(q=>q.id===selected),field=document.getElementById('q18-note'),content=field?.value?.trim();
 if(!x||!content)return false;
 try{
  const record=root.AGUCaderno?.create({deviceId:x.deviceId,title:'Dificuldade · AGU '+x.year+' Q'+x.number,
   content:'Questão oficial '+x.year+'/'+x.number+' · '+x.id+' · variante '+x.exam+
    '\nCaderno oficial: '+x.examUrl+'\nGabarito definitivo: '+x.keyUrl+'\nMinha dificuldade:\n'+content.slice(0,15000),
   type:'dificuldade',stage:'confrontacao',origin:'manual',sources:[x.examUrl,x.keyUrl]});
  if(!record)return false;
  root.AGUStudy?.syncNotes?.();root.render?.();return true;
 }catch(err){if(typeof alert==='function')alert('Não foi possível salvar: '+err.message);return false}
}
root.AGUQuestions18={panel,list,all,choose,note,selected:()=>selected,
 notebookSave,notebookEligible,notebookHistoricReference,openFromNotebook};
})(window);
