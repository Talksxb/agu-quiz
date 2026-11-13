/* Sprint 19: questão oficial auditada na aba existente, mantendo API da Sprint 18. */
(function(root){
'use strict';
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const all=()=>[...(root.AGU_OFFICIAL_S18?.questions||[]),...(root.AGU_OFFICIAL_S19?.questions||[])]
 .filter(x=>x&&/^of-\d{4}-adv-\d{3}$/.test(x.id)&&x.status==='gabarito_definitivo'&&x.annulled===false&&
 ['C','E'].includes(x.key)&&x.type==='ce'&&x.deviceId&&x.historicReason&&x.currentReason&&
 /^https:\/\//.test(x.examUrl)&&/^https:\/\//.test(x.keyUrl));
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
  if(card)x+='<div class="agu-ctx-box"><h4>Responder e revisar</h4>'+card+'</div>';
  x+='<div class="agu-ctx-box"><h4>Dificuldade pessoal · Caderno AGU</h4><label>Minha dúvida ou dificuldade<textarea id="q18-note" maxlength="16000" rows="3" placeholder="Registre sua própria dúvida; comentários da banca não são copiados automaticamente."></textarea></label><button class="agu-light" type="button" onclick="AGUQuestions18.note()">Salvar dificuldade</button></div>';
 }
 return x;
}
function note(){
 const x=all().find(q=>q.id===selected),field=document.getElementById('q18-note'),content=field?.value?.trim();
 if(!x||!content)return false;
 try{
  const record=root.AGUCaderno?.create({deviceId:x.deviceId,title:'Dificuldade · AGU '+x.year+' Q'+x.number,
   content:'Questão oficial '+x.year+'/'+x.number+' · '+x.id+' · variante '+x.exam+
    '\nCaderno oficial: '+x.examUrl+'\nGabarito definitivo: '+x.keyUrl+'\nMinha dificuldade:\n'+content,
   type:'dificuldade',stage:'confrontacao',origin:'manual',sources:[]});
  if(!record)return false;
  root.AGUStudy?.syncNotes?.();root.render?.();return true;
 }catch(err){if(typeof alert==='function')alert('Não foi possível salvar: '+err.message);return false}
}
root.AGUQuestions18={panel,list,all,choose,note,selected:()=>selected};
})(window);
