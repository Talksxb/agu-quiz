/* Sprint 20: backup local completo, exportação e restauração apenas de chaves ausentes.
   Nenhuma rede, sincronização, coleta remota nem alteração de dados já armazenados. */
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
 ['agu_quiz_mapeamento_questoes_v1','Mapeamento curricular pessoal']
];
const keys=new Set(entries.map(x=>x[0]));
const isObj=x=>x&&typeof x==='object'&&!Array.isArray(x);
const capArr=(v,n=20000)=>Array.isArray(v)&&v.length<=n;
function validateRecord(key,obj){
 if(!isObj(obj))return false;
 switch(key){
 case 'agu_quiz_mvp1_2026':return obj.version===1&&isObj(obj.topic)&&capArr(obj.answers)&&capArr(obj.sessions)&&capArr(obj.reviews)&&capArr(obj.notebook);
 case 'agu_quiz_revisao_inteligente_v1':return obj.schema==='agu-review-v1'&&capArr(obj.attempts)&&isObj(obj.cards);
 case 'agu_quiz_planejamento_semanal_v1':{
  if(obj.schema!==1||!isObj(obj.weeks)||!Array.isArray(obj.settings?.dailyMinutes)||obj.settings.dailyMinutes.length!==7||!obj.settings.dailyMinutes.every(v=>Number.isInteger(v)&&v>=0&&v<=780))return false;
  try{return !!root.AGUPlanner?.validateBackupObject({schema:'agu-planner-backup-v1',data:obj})}catch(_){return false}
 }
 case 'agu_caderno_contextual_s15_v1':return obj.schema==='agu-context-notebook-v1'&&capArr(obj.records,3000)&&obj.records.every(x=>root.AGUCaderno?.valid?.(x));
 case 'agu_estudo_integrado_s16_v1':return obj.schema==='agu-integrated-study-v1'&&capArr(obj.sessions,3000)&&obj.sessions.every(x=>typeof x.id==='string'&&typeof x.deviceId==='string'&&Array.isArray(x.notes)&&Array.isArray(x.cardsSeen)&&Array.isArray(x.attemptIds));
 case 'agu_leitor_juridico_s13_v1':return typeof obj.article==='string'&&typeof obj.unit==='string'&&isObj(obj.notes)&&Object.keys(obj.notes).length<=500;
 case 'agu_consolidacao_s17_v1':return typeof obj.query==='string'&&obj.query.length<=150&&['todos','norma','jurisprudencia','questao','flashcard','caderno'].includes(obj.filter)&&['todos','confirmado','parcial','pendente','pessoal'].includes(obj.status)&&[90,100,115,130].includes(obj.size);
 case 'agu_quiz_curriculo_repo_v1':return capArr(obj.itens,412)&&obj.itens.length===412&&capArr(obj.disciplinas,14)&&obj.disciplinas.length===14&&new Set(obj.itens.map(x=>x.id)).size===412;
 case 'agu_quiz_mapeamento_questoes_v1':return Object.keys(obj).length<=2500&&Object.entries(obj).every(([k,v])=>typeof k==='string'&&k.length<=180&&typeof v==='string'&&/^[A-Z]+(?:-[A-Z]+)?-\d{2,3}$/.test(v));
 default:return false;
 }
}
function capture(){
 const items={};
 for(const [key] of entries){
  const value=localStorage.getItem(key);
  if(value===null)continue;
  if(value.length>MAX)throw Error('Uma categoria excede o limite de exportação: '+key);
  let parsed;try{parsed=JSON.parse(value)}catch(_){throw Error('Dados não são JSON válido: '+key)}
  if(!validateRecord(key,parsed))throw Error('Categoria com estrutura inconsistente: '+key+'. Preserve o navegador e faça o backup específico desse módulo.');
  items[key]=value;
 }
 const bundle={schema:'agu-portable-local-s20-v1',version:1,createdAt:new Date().toISOString(),items};
 if(JSON.stringify(bundle).length>MAX)throw Error('Backup completo excede 12 MB; exporte os módulos separadamente.');
 return bundle;
}
function validateBundle(raw){
 const b=typeof raw==='string'?JSON.parse(raw):raw;
 if(!isObj(b)||b.schema!=='agu-portable-local-s20-v1'||b.version!==1||!isObj(b.items)||Object.keys(b.items).length>keys.size)throw Error('Formato de backup local incompatível.');
 for(const [key,value] of Object.entries(b.items)){
  if(!keys.has(key)||typeof value!=='string'||value.length>MAX)throw Error('Categoria não autorizada ou excedendo limite.');
  let obj;try{obj=JSON.parse(value)}catch(_){throw Error('JSON inválido na categoria '+key)}
  if(!validateRecord(key,obj))throw Error('Categoria inválida: '+key);
 }
 return b;
}
function importMissing(raw){
 const b=validateBundle(raw);
 const missing=Object.entries(b.items).filter(([key])=>localStorage.getItem(key)===null);
 const written=[];
 try{
  for(const [key,value] of missing){if(localStorage.getItem(key)!==null)continue;localStorage.setItem(key,value);written.push(key)}
 }catch(e){
  for(const key of written)try{localStorage.removeItem(key)}catch(_){}
  throw Error('Armazenamento insuficiente; tentativa revertida: '+e.message);
 }
 return {added:written.length,skipped:Object.keys(b.items).length-written.length,keys:written};
}
function exportFile(){
 try{
  const str=JSON.stringify(capture(),null,2),blob=new Blob([str],{type:'application/json'});
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
  if(!confirm('Restaurar '+missing.length+' categoria(s) ausente(s)? Nenhum dado atual será substituído. O aplicativo precisará recarregar.'))return;
  const out=importMissing(raw);
  alert(out.added+' categoria(s) restaurada(s), '+out.skipped+' preservada(s). Recarregue a página para carregar o backup.');
 }catch(e){alert('Backup rejeitado: '+e.message)}
 finally{if(input)input.value=''}
}
function panel(){
 let count=0;try{for(const [key] of entries)if(localStorage.getItem(key)!==null)count++}catch(_){}
 return '<div class="card section"><h2>Backup local completo</h2>'+
 '<p>Cópia de '+count+' de '+entries.length+' categorias locais: histórico, questões, revisões, Caderno, sessões, planejamento, notas e matriz importada. O arquivo pode conter informações pessoais; guarde-o de forma privada. Nada é enviado a servidores.</p>'+
 '<p class="muted">A restauração completa só preenche categorias ausentes. <b>Não substitui nem mescla categorias existentes.</b> Para recuperar tentativas/notas dentro de uma categoria já usada, utilize a importação do módulo correspondente. Limite: 12 MB.</p>'+
 '<div class="btnrow"><button class="secondary" type="button" onclick="AGUBackup20.exportFile()">Exportar cópia completa</button>'+
 '<button class="secondary" type="button" onclick="document.getElementById(\'agu-s20-backup-file\').click()">Restaurar categorias ausentes</button>'+
 '<input class="hidden" type="file" id="agu-s20-backup-file" accept="application/json" onchange="AGUBackup20.readFile(this)"></div></div>';
}
root.AGUBackup20={panel,capture,validateBundle,importMissing,exportFile,readFile,keys:()=>entries.map(([key,label])=>({key,label}))};
})(window);
