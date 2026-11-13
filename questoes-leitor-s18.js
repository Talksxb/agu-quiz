/* AGU Quiz Sprint 18: exibição integrada de itens oficiais conferidos */
(function(root){
'use strict';
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const all=()=>Array.isArray(root.AGU_OFFICIAL_S18?.questions)?root.AGU_OFFICIAL_S18.questions.filter(x=>x&&x.id==='of-2015-adv-048'&&x.key==='C'&&x.status==='gabarito_definitivo'&&x.deviceId==='CF88:art131:caput'):[];
const list=(deviceId)=>all().filter(x=>x.deviceId===deviceId);
let selected=null;
function choose(id){
 const q=all().find(x=>x.id===id);if(!q||!root.AGUReview?.focusOfficial(id))return false;
 selected=id;root.AGUStudy?.trackOfficial?.(id,q.deviceId);
 root.render?.();return true;
}
function panel(deviceId){
 const items=list(deviceId);
 if(!items.length)return '<div class="agu-notice">Ainda não há questões oficiais com fundamentação histórica e atual suficientemente conferidas para este dispositivo. Os demais itens continuam no acervo original, sem vínculo inventado.</div>';
 let x='<p class="agu-muted">'+items.length+' questão oficial auditada por confronto de caderno, gabarito definitivo e fundamento. Direito atual verificado apenas pontualmente.</p>';
 for(const q of items){
  x+='<article class="agu-notice"><b>AGU '+q.year+' · Item '+q.number+' · '+esc(q.title)+'</b>'+
   '<p class="agu-muted">Cebraspe · caderno '+esc(q.exam)+' · '+esc(q.code)+' (relação secundária a '+esc(q.primaryCurricularId)+') · C/E</p>'+
   '<p>'+esc(q.adaptedStem)+'</p>'+
   '<p class="agu-muted">Paráfrase autoral da questão histórica; confira a formulação original e os documentos oficiais antes de estudar.</p>'+
   '<a href="'+esc(q.examUrl)+'" target="_blank" rel="noopener noreferrer">Caderno oficial</a> · <a href="'+esc(q.keyUrl)+'" target="_blank" rel="noopener noreferrer">Gabarito definitivo</a>'+
   '<p><button class="agu-primary" onclick="AGUQuestions18.choose(\''+esc(q.id)+'\')">Responder este item</button></p></article>';
 }
 if(selected&&items.some(q=>q.id===selected)){
  const card=root.AGUReview?.focusedHTML?.()||'';
  if(card)x+='<div class="agu-ctx-box"><h4>Responder e revisar</h4>'+card+'</div>';
  x+='<div class="agu-ctx-box"><h4>Registrar dificuldade no Caderno</h4><label>Minha dúvida ou erro<textarea id="q18-note" maxlength="16000" rows="3" placeholder="Explique a dificuldade observada, sem copiar a justificativa automaticamente."></textarea></label><button class="agu-light" onclick="AGUQuestions18.note()">Salvar dificuldade</button></div>';
 }
 return x;
}
function note(){
 const x=all().find(q=>q.id===selected),field=document.getElementById('q18-note'),content=field?.value?.trim();
 if(!x||!content)return false;
 try{
  root.AGUCaderno?.create({deviceId:x.deviceId,title:'Dificuldade · AGU '+x.year+' Q'+x.number,
  content:'Questão oficial '+x.year+'/'+x.number+' ('+x.id+'):\n'+content,
  type:'dificuldade',stage:'confrontacao',origin:'manual',sources:[]});
  root.AGUStudy?.syncNotes?.();root.render?.();return true;
 }catch(err){if(typeof alert==='function')alert('Não foi possível salvar: '+err.message);return false}
}
root.AGUQuestions18={panel,list,choose,note,selected:()=>selected};
})(window);
