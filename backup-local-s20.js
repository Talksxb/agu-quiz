/* Backup S20: nove categorias históricas preservadas. MÉTODO-AGU-003 acrescenta
   livros opcionais e adição explícita de capítulos ausentes, sem substituir registros. */
(function(root){
'use strict';
const MAX=12000000;
const entries=[
 ['agu_quiz_mvp1_2026','Histórico principal'],
 ['agu_quiz_revisao_inteligente_v1','Revisão inteligente'],
 ['agu_quiz_planejamento_semanal_v1','Planejamento semanal'],
 ['agu_caderno_contextual_s15_v1','Caderno contextual'],
 ['agu_estudo_integrado_s16_v1','Sessões integradas'],
 ['agu_leitor_juridico_s13_v1','Comentários do Leitor Jurídico'],
 ['agu_consolidacao_s17_v1','Preferências da Biblioteca'],
 ['agu_quiz_curriculo_repo_v1','Matriz curricular importada'],
 ['agu_quiz_mapeamento_questoes_v1','Mapeamento curricular pessoal'],
 ['agu_livros_reader_v1','Percurso do Método AGU']
];
const keys=new Set(entries.map(x=>x[0]));
const isObj=x=>x&&typeof x==='object'&&!Array.isArray(x);
const capArr=(v,n=20000)=>Array.isArray(v)&&v.length<=n;
// O limite do arquivo é em bytes UTF-8 (Blob.size), não em unidades UTF-16 de String.length.
const fileBytes=value=>new Blob([value]).size;
function validateRecord(key,obj){
 if(!isObj(obj))return false;
 switch(key){
 case 'agu_livros_reader_v1':return root.AGUMethodProgress?.validate(obj)===true;
 case 'agu_quiz_mvp1_2026':{
  if(obj.version!==1||!isObj(obj.topic)||!capArr(obj.answers)||!capArr(obj.sessions)||!capArr(obj.reviews)||!capArr(obj.notebook))return false;
  const hasUniqueIds=arr=>new Set(arr.map(x=>x.id)).size===arr.length;
  const date=x=>typeof x==='string'&&Number.isFinite(Date.parse(x));
  if(!hasUniqueIds(obj.answers)||!hasUniqueIds(obj.sessions)||!hasUniqueIds(obj.notebook))return false;
  if(obj.answers.some(x=>!isObj(x)||typeof x.id!=='string'||!x.id||typeof x.question!=='string'||typeof x.topic!=='string'||!date(x.date)||![true,false,null].includes(x.correct)))return false;
  if(obj.sessions.some(x=>!isObj(x)||typeof x.id!=='string'||!x.id||typeof x.topic!=='string'||!date(x.started)||!Number.isInteger(x.minutes)||x.minutes<0||x.minutes>780||typeof x.mode!=='string'))return false;
  if(obj.reviews.some(x=>!isObj(x)||typeof x.topic!=='string'||!date(x.due)||!Number.isInteger(x.stage)||x.stage<0||x.stage>4))return false;
  if(obj.notebook.some(x=>!isObj(x)||typeof x.id!=='string'||!x.id||typeof x.title!=='string'||typeof x.topic!=='string'||!date(x.date)||typeof x.summary!=='string'||!Array.isArray(x.revisions)))return false;
  return Object.values(obj.topic).every(v=>isObj(v)&&(!v.state||typeof v.state==='string'));
 }
 case 'agu_quiz_revisao_inteligente_v1':{
  if(obj.schema!=='agu-review-v1'||!capArr(obj.attempts)||!isObj(obj.cards))return false;
  const ids=new Set();
  return obj.attempts.every(a=>{
   if(!isObj(a)||typeof a.id!=='string'||!/^rv-[a-zA-Z0-9-]+$/.test(a.id)||a.id.length>140||ids.has(a.id)||typeof a.itemId!=='string'||a.itemId.length>140)return false;
   if(a.selected!==undefined&&!['C','E','A','B','D',null].includes(a.selected))return false;
   if(a.correct!==undefined&&![true,false,null].includes(a.correct))return false;
   if(a.rating!==undefined&&!['errei','dificil','lembrei','facil'].includes(a.rating))return false;
   ids.add(a.id);return true;
  });
 }
 case 'agu_quiz_planejamento_semanal_v1':{
  if(obj.schema!==1||!isObj(obj.weeks)||!Array.isArray(obj.settings?.dailyMinutes)||obj.settings.dailyMinutes.length!==7||!obj.settings.dailyMinutes.every(v=>Number.isInteger(v)&&v>=0&&v<=780))return false;
  try{return !!root.AGUPlanner?.validateBackupObject({schema:'agu-planner-backup-v1',data:obj})}catch(_){return false}
 }
 case 'agu_caderno_contextual_s15_v1':{
  if(obj.schema!=='agu-context-notebook-v1'||!capArr(obj.records,3000))return false;
  const ids=new Set(),legacyIds=new Set();
  return obj.records.every(x=>{
   if(!root.AGUCaderno?.valid?.(x)||ids.has(x.id)||(x.legacyId&&legacyIds.has(x.legacyId)))return false;
   ids.add(x.id);if(x.legacyId)legacyIds.add(x.legacyId);return true;
  });
 }
 case 'agu_estudo_integrado_s16_v1':{
  if(obj.schema!=='agu-integrated-study-v1'||!capArr(obj.sessions,3000))return false;
  const units=new Map((root.AGU_LEGAL_CORPUS?.laws||[]).flatMap(l=>l.articles.flatMap(a=>a.clauses.map(c=>[c.id,a.topic]))));
  const ids=new Set();
  if(obj.sessions.some(x=>{
   if(!isObj(x)||typeof x.id!=='string'||!/^ags-[a-zA-Z0-9-]+$/.test(x.id)||x.id.length>130||ids.has(x.id)||!units.has(x.deviceId)||x.topic!==units.get(x.deviceId))return true;
   if(!['em_andamento','concluida'].includes(x.status)||!['norma','caderno','questoes','flashcards','revisao'].includes(x.stage))return true;
   if(typeof x.createdAt!=='string'||typeof x.updatedAt!=='string')return true;
   for(const list of [x.notes,x.cardsSeen,x.attemptIds,...(x.questionsSeen?[x.questionsSeen]:[])]){
    if(!Array.isArray(list)||list.length>3000||list.some(z=>typeof z!=='string'||z.length>140)||new Set(list).size!==list.length)return true;
   }
   ids.add(x.id);return false;
  }))return false;
  return obj.activeId===null||obj.activeId===undefined||ids.has(obj.activeId);
 }
 case 'agu_leitor_juridico_s13_v1':{
  const articles=(root.AGU_LEGAL_CORPUS?.laws||[]).flatMap(l=>l.articles.map(a=>({...a,lawId:l.id})));
  const article=articles.find(a=>a.id===obj.article);
  const units=new Set(articles.flatMap(a=>a.clauses.map(c=>c.id)));
  const lookup=new Map(articles.flatMap(a=>a.clauses.map(c=>[c.id,a])));
  const marks=obj.forNotebook;
  if(marks!==undefined){
   if(!Array.isArray(marks)||marks.length>300)return false;
   const ids=new Set();
   for(const m of marks){
    if(!isObj(m)||typeof m.id!=='string'||!/^pc-[a-zA-Z0-9-]{8,130}$/.test(m.id)||ids.has(m.id)||typeof m.prompt!=='string'||!m.prompt.trim()||m.prompt.length>450||typeof m.createdAt!=='string'||!Number.isFinite(Date.parse(m.createdAt))||!['pendente','anotado','dispensado'].includes(m.status))return false;
    if(m.origin==='leitor'){
     const ref=lookup.get(m.unitId);
     if(!ref||m.articleId!==ref.id||m.lawId!==ref.lawId||m.topic!==(ref.topic||null))return false;
    }else if(m.origin==='estudo_integrado'){
     // Uma marcação importada pode anteceder a restauração da categoria de sessões.
     // Validar o dispositivo e o tópico oficiais, sem exigir que a sessão já exista no navegador.
     const ref=lookup.get(m.deviceId);
     if(!ref?.topic||m.topic!==ref.topic||m.lawId!==null||m.articleId!==null||m.unitId!==null||typeof m.sessionId!=='string'||!/^ags-[a-zA-Z0-9-]+$/.test(m.sessionId)||m.sessionId.length>130)return false;
    }else if(m.origin==='questao_verificada'){
     // Lista fechada de referências públicas já conferidas: a questão pode ter sido retirada da interface,
     // mas seu ID e rótulo históricos persistem sem exigir um estado de resposta ou revisão.
     const ref=root.AGUQuestions18?.notebookHistoricReference?.(m.questionId);
     if(!ref||m.questionLabel!==ref.label||m.topic!==ref.topic||m.lawId!==null||m.articleId!==null||m.unitId!==null)return false;
    }else if(m.origin==='flashcard_existente'){
     // Lista fechada da LEG11: aceitar arquivo antigo se o cartão foi retirado da interface,
     // mas recusar IDs inventados, rótulos adulterados e vínculos curriculares por inferência.
     const ref=root.AGUReview?.notebookHistoricCard?.(m.cardId);
     if(!ref||m.cardLabel!==ref.label||m.topic!==ref.topic||m.lawId!==null||m.articleId!==null||m.unitId!==null)return false;
    }else return false;
    ids.add(m.id);
   }
  }
  return !!article&&article.clauses.some(c=>c.id===obj.unit)&&isObj(obj.notes)&&Object.keys(obj.notes).length<=500&&
   Object.entries(obj.notes).every(([unit,note])=>units.has(unit)&&typeof note==='string'&&note.length<=14000)&&
   (obj.tab===undefined||['juris','questoes','caderno','flashcards','comentarios','estudo','para_caderno'].includes(obj.tab))&&
   (obj.mobile===undefined||['text','index','related'].includes(obj.mobile));
 }
 case 'agu_consolidacao_s17_v1':return typeof obj.query==='string'&&obj.query.length<=150&&['todos','norma','jurisprudencia','questao','flashcard','caderno'].includes(obj.filter)&&['todos','confirmado','parcial','pendente','pessoal'].includes(obj.status)&&[90,100,115,130].includes(obj.size);
 case 'agu_quiz_curriculo_repo_v1':{
  // A fonte curricular local deve passar nas mesmas regras que a importação normal.
  // Se o validador do aplicativo não estiver disponível, rejeitar (nunca aceitar por contagem apenas).
  if(typeof root.AGUValidateMatrix!=='function')return false;
  try{return root.AGUValidateMatrix(obj)===true}catch(_){return false}
 }
 case 'agu_quiz_mapeamento_questoes_v1':return Object.keys(obj).length<=2500&&Object.entries(obj).every(([k,v])=>typeof k==='string'&&k.length>0&&k.length<=180&&typeof v==='string'&&/^[A-Z]+(?:-[A-Z]+)*-\d{2,3}$/.test(v));
 default:return false;
 }
}
function capture(){
 const items={};
 for(const [key] of entries){
  const value=localStorage.getItem(key);
  if(value===null)continue;
  if(fileBytes(value)>MAX)throw Error('Categoria excede 12 MB; não apague os dados locais. Verifique o limite do backup específico: '+key);
  let parsed;try{parsed=JSON.parse(value)}catch(_){throw Error('Dados não são JSON válido: '+key)}
  if(!validateRecord(key,parsed))throw Error('Categoria com estrutura inconsistente: '+key+'. Preserve o navegador e faça o backup específico desse módulo.');
  items[key]=value;
 }
 const bundle={schema:'agu-portable-local-s20-v1',version:1,createdAt:new Date().toISOString(),items};
 if(fileBytes(JSON.stringify(bundle))>MAX)throw Error('Backup completo excede 12 MB; preserve os dados e verifique os limites de cada módulo.');
 return bundle;
}
function validateBundle(raw){
 if(typeof raw==='string'&&fileBytes(raw)>MAX)throw Error('Backup ultrapassa o limite de 12 MB.');
 const b=typeof raw==='string'?JSON.parse(raw):raw;
 if(!isObj(b)||b.schema!=='agu-portable-local-s20-v1'||b.version!==1||!isObj(b.items)||Object.keys(b.items).length>keys.size)throw Error('Formato de backup local incompatível.');
 if(['__proto__','prototype','constructor'].some(k=>Object.hasOwn(b,k)||Object.hasOwn(b.items,k)))throw Error('Chave perigosa no formato de backup.');
 for(const [key,value] of Object.entries(b.items)){
  if(!keys.has(key)||typeof value!=='string'||fileBytes(value)>MAX)throw Error('Categoria não autorizada ou excedendo limite.');
  let obj;try{obj=JSON.parse(value)}catch(_){throw Error('JSON inválido na categoria '+key)}
  if(!validateRecord(key,obj))throw Error('Categoria inválida: '+key);
 }
 if(fileBytes(JSON.stringify(b))>MAX)throw Error('Backup ultrapassa o limite de 12 MB.');
 return b;
}
const BOOKS='agu_livros_reader_v1';
function previewRestore(raw,{mergeBooks=false}={}){
 const b=validateBundle(raw),expected={},operations=[],categories=[],books={added:[],kept:[],skipped:[],conflicts:[],references:[]};
 for(const [key,value] of Object.entries(b.items)){
  const previous=localStorage.getItem(key);expected[key]=previous;
  categories.push({key,label:entries.find(x=>x[0]===key)[1],action:previous===null?'adicionar':'preservar'});
  if(previous===null)operations.push({key,previous,value});
  if(key!==BOOKS)continue;
  const incoming=JSON.parse(value);let current={};
  if(previous!==null&&mergeBooks){try{current=JSON.parse(previous)}catch{throw Error('Percurso local inválido; os dados anteriores foram preservados.')}if(!validateRecord(BOOKS,current))throw Error('Percurso local inconsistente; preserve os dados anteriores.');}
  for(const [id,record] of Object.entries(incoming)){
   books.references.push(root.AGUMethodProgress.assess(id,record));
   if(previous!==null&&!mergeBooks)books.skipped.push(id);
   else if(previous===null||!Object.hasOwn(current,id))books.added.push(id);
   else{books.kept.push(id);if(JSON.stringify(current[id])!==JSON.stringify(record))books.conflicts.push(id);}
  }
  if(previous!==null&&mergeBooks&&books.added.length){
   const merged={...current};for(const id of books.added)merged[id]=incoming[id];
   const value=JSON.stringify(merged);if(fileBytes(value)>MAX)throw Error('Percurso combinado excede 12 MB; nenhum dado foi alterado.');
   operations.push({key,previous,value});categories[categories.length-1].action='adicionar capítulos ausentes';
  }
 }
 // Somente livros podem modificar uma categoria existente, e sempre na última escrita.
 operations.sort((a,b)=>Number(a.previous!==null)-Number(b.previous!==null));
 return {expected,operations,categories,books};
}
function restore(raw,{mergeBooks=false,expected=null}={}){
 const plan=previewRestore(raw,{mergeBooks});
 if(expected&&(Object.keys(expected).length!==Object.keys(plan.expected).length||Object.keys(plan.expected).some(k=>expected[k]!==plan.expected[k])))throw Error('Os dados locais mudaram desde a prévia. Selecione o arquivo novamente para conferir.');
 const written=[];
 try{
  for(const op of plan.operations){
   if(localStorage.getItem(op.key)!==op.previous)throw Error('Os dados locais mudaram durante a restauração.');
   localStorage.setItem(op.key,op.value);written.push(op);
  }
 }catch(e){
  const pending=[];
  for(const op of [...written].reverse()){
   try{if(localStorage.getItem(op.key)===op.value){if(op.previous===null)localStorage.removeItem(op.key);else localStorage.setItem(op.key,op.previous)}}catch{pending.push(op.key)}
  }
  throw Error(pending.length?'Restauração parcial: não foi possível desfazer '+pending.length+' inserção(ões). Preserve o arquivo e este navegador. '+e.message:'Armazenamento indisponível ou dados alterados; tentativa revertida: '+e.message);
 }
 const added=written.filter(op=>op.previous===null).length;
 return {added,skipped:plan.categories.length-added,keys:written.map(op=>op.key),chaptersAdded:plan.books.added.length,chaptersKept:plan.books.kept.length,chaptersSkipped:plan.books.skipped.length};
}
function importMissing(raw){const {added,skipped,keys}=restore(raw);return {added,skipped,keys}}
function exportFile(){
 try{
  const str=JSON.stringify(capture(),null,2),blob=new Blob([str],{type:'application/json'});
  // A formatação do arquivo também aumenta seu tamanho; conferir o JSON final exportado.
  if(blob.size>MAX)throw Error('Arquivo gerado excede 12 MB; preserve os dados e verifique os limites de cada módulo.');
  const url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download='AGU_Backup_Local_Completo.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),2000);
 }catch(e){alert('Não foi possível exportar: '+e.message)}
}
async function readFile(input){
 const file=input?.files?.[0];if(!file)return;
 try{
  if(file.size>MAX)throw Error('Arquivo maior que 12 MB.');
  const raw=await file.text();if(raw.length>MAX)throw Error('Arquivo maior que 12 MB.');
  const b=validateBundle(raw),missing=Object.keys(b.items).filter(k=>localStorage.getItem(k)===null);
  if(Object.hasOwn(b.items,BOOKS)){showPreview(raw);return;}
  if(!confirm('Restaurar '+missing.length+' categoria(s) ausente(s)? Nenhum dado atual será substituído. O aplicativo precisará recarregar.'))return;
  const out=importMissing(raw);
  alert(out.added+' categoria(s) restaurada(s), '+out.skipped+' preservada(s). Recarregue a página para carregar o backup.');
 }catch(e){alert('Backup rejeitado: '+e.message)}
 finally{if(input)input.value=''}
}
function showPreview(raw){
 const make=(tag,text)=>{const node=document.createElement(tag);if(text!==undefined)node.textContent=text;return node};
 document.getElementById('agu-backup-preview')?.remove();
 const dialog=make('dialog');dialog.id='agu-backup-preview';dialog.className='agu-backup-preview';dialog.setAttribute('aria-labelledby','agu-backup-preview-title');
 const title=make('h2','Conferir restauração');title.id='agu-backup-preview-title';title.tabIndex=-1;
 const intro=make('p','Seus dados continuam locais. As nove categorias anteriores só são adicionadas quando ausentes. Capítulos existentes serão preservados por inteiro, inclusive seus rascunhos, edições e campos adicionais.');
 const label=make('label'),merge=make('input');merge.type='checkbox';merge.id='agu-backup-merge-books';label.htmlFor=merge.id;label.append(merge,document.createTextNode(' Adicionar também capítulos ausentes no percurso já existente'));
 const list=make('ul'),detail=make('p'),warnings=make('ul'),error=make('p'),row=make('div'),cancel=make('button','Cancelar'),apply=make('button','Confirmar restauração');
 error.setAttribute('role','alert');error.tabIndex=-1;detail.setAttribute('role','status');row.className='btnrow';cancel.type=apply.type='button';cancel.className=apply.className='secondary';
 let plan,completed=false;
 function refresh(){
  error.textContent='';list.replaceChildren();warnings.replaceChildren();
  try{plan=previewRestore(raw,{mergeBooks:merge.checked});apply.disabled=false;
   for(const c of plan.categories)list.appendChild(make('li',c.label+': '+c.action+'.'));
   detail.textContent=plan.books.added.length+' capítulo(s) a adicionar; '+plan.books.kept.length+' registro(s) local(is) preservado(s); '+plan.books.skipped.length+' registro(s) do arquivo não aplicado(s). Nenhum registro existente será substituído.';
   for(const id of plan.books.kept)warnings.appendChild(make('li',id+': registro atual preservado; a cópia do arquivo não será aplicada.'));
   for(const id of plan.books.skipped)warnings.appendChild(make('li',id+': não será importado; o percurso local será mantido como está.'));
   for(const r of plan.books.references){if(!r.known)warnings.appendChild(make('li',r.id+': capítulo fora do catálogo atual. Registro será guardado sem abrir conteúdo ou atribuir aprendizagem.'));else if(r.mismatch)warnings.appendChild(make('li',r.title+': registro da edição '+r.edition+'; edição atual '+r.currentEdition+'. O histórico será preservado e não marcará a edição atual como lida.'));else if(r.legacy)warnings.appendChild(make('li',r.title+': registro antigo sem edição identificada. Confira a posição ao retomar.'));}
  }catch(e){apply.disabled=true;plan=null;error.textContent=e.message;}
 }
 merge.addEventListener('change',refresh);cancel.addEventListener('click',()=>dialog.close());
 apply.addEventListener('click',()=>{if(!plan)return;try{const result=restore(raw,{mergeBooks:merge.checked,expected:plan.expected});const status=document.getElementById('agu-backup-status');if(status)status.textContent=result.added+' categoria(s) restaurada(s); '+result.chaptersAdded+' capítulo(s) adicionado(s), '+result.chaptersKept+' preservado(s), '+result.chaptersSkipped+' não aplicado(s). Recarregue a página ou retome o capítulo para carregar os registros.';completed=true;dialog.close();}catch(e){error.textContent=e.message;error.focus();}});
 dialog.addEventListener('close',()=>{dialog.remove();document.getElementById(completed?'agu-backup-status':'agu-s20-restore')?.focus();});
 row.append(cancel,apply);dialog.append(title,intro,label,list,detail,warnings,error,row);document.body.appendChild(dialog);refresh();dialog.showModal();title.focus();
}
function panel(){
 let count=0;try{for(const [key] of entries)if(localStorage.getItem(key)!==null)count++}catch(_){}
 const p=typeof URLSearchParams==='function'?new URLSearchParams(root.location?.search||''):null,id=p?.get('livro'),back=p?.get('retorno')==='metodo'?'<p><a href="livros-agu.html'+(id&&/^[a-z0-9][a-z0-9-]{0,139}$/.test(id)?'?livro='+encodeURIComponent(id):'')+'">Retomar o Método AGU</a></p>':'';
 return '<style>.agu-backup-preview{box-sizing:border-box;width:680px;max-width:calc(100vw - 24px);max-height:calc(100dvh - 24px);overflow:auto;border:1px solid #aebfc5;border-radius:12px;padding:20px;color:#172b39;background:#fff;overflow-wrap:anywhere}.agu-backup-preview::backdrop{background:#102b3baa}.agu-backup-preview h2{font-size:22px}.agu-backup-preview input[type=checkbox]{width:auto;min-height:24px}.agu-backup-preview label{display:block;margin:18px 0}.agu-backup-preview button{min-height:44px}.agu-backup-preview .btnrow{display:flex;flex-wrap:wrap;gap:10px}</style><div class="card section"><h2 id="agu-s20-backup-title" tabindex="-1">Backup local completo</h2>'+back+
 '<p>Cópia de '+count+' de '+entries.length+' categorias locais: histórico, questões, revisões, Caderno, sessões, planejamento, notas, matriz importada e percurso do Método AGU. O arquivo pode conter informações pessoais; guarde-o de forma privada. Nada é enviado a servidores.</p>'+
 '<p class="muted">A restauração preenche categorias ausentes. <b>As nove categorias anteriores não são substituídas nem mescladas.</b> No percurso, você pode escolher adicionar capítulos ausentes; capítulos existentes permanecem inteiros. Confira a prévia. Limite: 12 MB.</p><p id="agu-backup-status" role="status" tabindex="-1"></p>'+
 '<div class="btnrow"><button class="secondary" type="button" onclick="AGUBackup20.exportFile()">Exportar cópia completa</button>'+
 '<button class="secondary" id="agu-s20-restore" type="button" onclick="document.getElementById(\'agu-s20-backup-file\').click()">Restaurar categorias ausentes</button>'+
 '<input class="hidden" type="file" id="agu-s20-backup-file" accept="application/json" onchange="AGUBackup20.readFile(this)"></div></div>';
}
root.AGUBackup20={panel,capture,validateBundle,validateRecord,previewRestore,restore,importMissing,exportFile,readFile,keys:()=>entries.map(([key,label])=>({key,label}))};
})(window);

