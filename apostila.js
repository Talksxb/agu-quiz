/* LIVRO-INT-001 | Interface pública sem capítulo embutido. API privada obrigatória. */
(function(root){
'use strict';
const API='/api/livro';
const STORE='agu_apostila_progresso_v1';
const validId=x=>/^[A-Z]{2,5}-\d{2,3}$/.test(String(x||''));
const esc=x=>String(x??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const state={status:'initial',entries:[],openId:null,message:'',working:false};
let lastFrame=null;
function bookmark(id){
 try{const all=JSON.parse(localStorage.getItem(STORE)||'{}');const x=all[id];return Number.isFinite(x?.ratio)?Math.max(0,Math.min(1,x.ratio)):0}catch(_){return 0}
}
function storeBookmark(id,ratio){
 if(!validId(id)||!Number.isFinite(ratio))return;
 try{
  const all=JSON.parse(localStorage.getItem(STORE)||'{}');
  const safe=all&&typeof all==='object'&&!Array.isArray(all)?all:{};
  safe[id]={ratio:Math.max(0,Math.min(1,ratio)),savedAt:new Date().toISOString()};
  localStorage.setItem(STORE,JSON.stringify(safe));
 }catch(_){/* armazenamento indisponível: leitura permanece possível */}
}
function repaint(){if(root.document?.getElementById('agu-book-root'))root.render?.()}
async function request(path,options={}){
 const response=await root.fetch(API+path,{credentials:'same-origin',cache:'no-store',...options});
 if(!response.ok){const error=new Error('HTTP '+response.status);error.status=response.status;throw error}
 return response.json();
}
async function refresh(){
 if(state.working)return;
 state.working=true;state.status='checking';repaint();
 try{
  const data=await request('/catalog');
  if(!Array.isArray(data?.chapters)||!data.chapters.every(c=>validId(c.id)&&typeof c.title==='string'))throw Error('Catálogo inválido');
  state.entries=data.chapters;state.status='ready';state.message='';
 }catch(error){
  state.entries=[];state.openId=null;
  state.status=error.status===401?'locked':error.status===404?'unconfigured':'error';
  state.message=error.status===404?'A biblioteca privada ainda não está conectada a um servidor autorizado.':error.status===401?'Faça a autenticação para consultar os capítulos privados.':'Falha ao obter catálogo privado. Nenhum capítulo foi carregado.';
 }finally{state.working=false;repaint()}
}
function activate(){if(state.status==='initial')refresh()}
async function login(){
 if(state.working)return;
 const field=root.document?.getElementById('agu-book-access');
 const code=field?.value||'';if(field)field.value='';
 if(!code){state.message='Informe a chave temporária de demonstração.';repaint();return}
 state.working=true;state.message='Verificando acesso…';repaint();
 try{
  await request('/session',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({code})});
  state.working=false;await refresh();
 }catch(_){state.status='locked';state.message='Acesso não autorizado. A chave não foi armazenada no navegador.';state.working=false;repaint()}
}
async function logout(){
 if(state.working)return;
 state.working=true;
 try{await request('/logout',{method:'POST'})}catch(_){}
 state.openId=null;state.entries=[];state.status='locked';state.message='Sessão encerrada.';state.working=false;repaint();
}
function open(id){
 if(state.status!=='ready'||!state.entries.some(e=>e.id===id)||!validId(id))return;
 state.openId=id;repaint();
 const focus=root.document?.getElementById('agu-book-reader-heading');
 if(focus){focus.tabIndex=-1;focus.focus({preventScroll:true})}
}
function close(){state.openId=null;lastFrame=null;repaint()}
function frameLoaded(){
 const frame=root.document?.getElementById('agu-book-frame'),id=state.openId;
 if(!frame||!validId(id)||frame===lastFrame)return;
 lastFrame=frame;
 try{
  const doc=frame.contentDocument,win=frame.contentWindow;
  if(!doc||!win)return;
  const max=()=>Math.max(0,doc.documentElement.scrollHeight-win.innerHeight);
  const old=bookmark(id),maximum=max();if(maximum&&old)win.scrollTo(0,maximum*old);
  let queued=false;
  win.addEventListener('scroll',()=>{
   if(queued)return;queued=true;
   root.setTimeout(()=>{queued=false;const m=max();storeBookmark(id,m?win.scrollY/m:0)},300);
  },{passive:true});
 }catch(_){/* quadro protegido permanece visível; sem retorno de progresso */}
}
function page(){
 const intro='<section class="agu-book-head"><div class="agu-book-kicker">BIBLIOTECA AGU / MODO LEITURA</div><h1>Apostila de leitura</h1><p>Capítulos completos, diagramas e fundamentos na sequência de uma folha de caderno. Leitura não equivale a domínio ou certificação de auditoria.</p></section>';
 let body='';
 if(state.status==='ready'){
  if(state.openId){
   const entry=state.entries.find(x=>x.id===state.openId);
   if(!entry){state.openId=null;return intro+'<p role="alert">Capítulo indisponível.</p>'}
   body='<div class="agu-book-controls"><button type="button" class="secondary" onclick="AGUBookReader.close()">Voltar aos capítulos</button><button type="button" class="secondary" onclick="AGUBookReader.logout()">Encerrar acesso</button></div>'+
    '<section class="agu-book-reader"><h2 id="agu-book-reader-heading">'+esc(entry.title)+'</h2><p class="agu-book-meta">'+esc(entry.id)+' · Texto '+esc(entry.textVersion||'')+' · Visual '+esc(entry.visualVersion||'')+' · Última conferência '+esc(entry.checkedAt||'não informada')+'</p>'+
    '<iframe id="agu-book-frame" title="Leitura integral de '+esc(entry.title)+'" src="'+API+'/chapter/'+encodeURIComponent(entry.id)+'" sandbox="allow-same-origin allow-popups allow-popups-to-escape-sandbox" referrerpolicy="no-referrer" onload="AGUBookReader.frameLoaded()"></iframe>'+
    '<p class="agu-book-note">O ponto de leitura pode ser salvo somente neste navegador. O texto é entregue por uma rota autenticada e não integra os arquivos públicos do Quiz.</p></section>';
  }else{
   body='<div class="agu-book-row"><span class="agu-book-access">Acesso privado ativo</span><button type="button" class="secondary" onclick="AGUBookReader.logout()">Encerrar acesso</button></div><div class="agu-book-grid">'+
    state.entries.map(e=>'<article class="agu-book-card"><div class="agu-book-sub">'+esc(e.discipline||'Disciplina')+' · '+esc(e.id)+'</div><h2>'+esc(e.title)+'</h2><p>'+esc(e.description||'Leitura integral e materiais de apoio')+'</p><div class="agu-book-badges"><span>Texto '+esc(e.textVersion||'')+'</span><span>Visual '+esc(e.visualVersion||'')+'</span><span>'+Math.round(bookmark(e.id)*100)+'% neste aparelho</span></div><button type="button" class="primary" onclick="AGUBookReader.open(\''+esc(e.id)+'\')">'+(bookmark(e.id)>0?'Continuar leitura':'Começar leitura')+'</button></article>').join('')+
    '</div><p class="agu-book-note">Somente capítulos autorizados por esta sessão aparecem no catálogo. A matriz curricular privada não é carregada nesta página.</p>';
  }
 }else if(state.status==='checking'||state.status==='initial'){
  body='<div class="agu-book-gate" role="status">Conferindo se há uma sessão de leitura autorizada…</div>';
 }else if(state.status==='locked'){
  body='<form class="agu-book-gate" onsubmit="event.preventDefault();AGUBookReader.login()"><h2>Leitura privada</h2><p>O conteúdo não é enviado junto com o site público. Acesso temporário de demonstração; o serviço definitivo exigirá identidade verificada.</p><label for="agu-book-access">Chave de acesso do protótipo</label><input id="agu-book-access" type="password" autocomplete="off" inputmode="text" maxlength="160" required><button type="submit" class="primary"'+(state.working?' disabled':'')+'>Entrar na biblioteca</button></form>';
 }else{
  body='<div class="agu-book-gate"><h2>Biblioteca protegida indisponível</h2><p>Esta interface não contém capítulo privado, credencial ou catálogo incorporado. A leitura depende de um serviço autenticado separado do GitHub Pages.</p><button type="button" class="secondary" onclick="AGUBookReader.retry()">Verificar novamente</button></div>';
 }
 return '<div id="agu-book-root">'+intro+body+(state.message?'<p class="agu-book-message" role="status">'+esc(state.message)+'</p>':'')+'</div>';
}
root.AGUBookReader={page,activate,refresh,login,logout,open,close,frameLoaded,retry:refresh,peek:()=>({...state,entries:state.entries.map(e=>({id:e.id,title:e.title}))}),bookmark};
})(window);
