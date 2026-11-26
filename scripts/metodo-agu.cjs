/* MÉTODO-AGU-001: compilador estático, sem rede e sem aprovação implícita. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),vm=require('node:vm');
const ROOT=path.resolve(__dirname,'..');
const hash=x=>crypto.createHash('sha256').update(typeof x==='string'||Buffer.isBuffer(x)?x:JSON.stringify(x)).digest('hex');
const read=(root,p)=>fs.readFileSync(safePath(root,p),'utf8');
const json=(root,p)=>JSON.parse(read(root,p));
const assert=(ok,message)=>{if(!ok)throw Error(message)};
const id=x=>typeof x==='string'&&/^[a-z0-9][a-z0-9-]{1,100}$/.test(x);
const date=x=>typeof x==='string'&&/^\d{4}-\d{2}-\d{2}$/.test(x)&&!Number.isNaN(Date.parse(x))&&new Date(x+'T00:00:00.000Z').toISOString().slice(0,10)===x;
function safePath(root,p){assert(typeof p==='string'&&!p.includes('\\')&&!path.isAbsolute(p),'Caminho relativo obrigatório');const f=path.resolve(root,p);assert(f.startsWith(path.resolve(root)+path.sep),'Caminho fora do projeto');return f}
function official(url){try{const u=new URL(url);return u.protocol==='https:'&&!u.username&&!u.password&&(/\.(gov|leg|jus)\.br$/.test(u.hostname)||u.hostname==='cdn.cebraspe.org.br')}catch{return false}}
function frontMatter(md){
 const m=md.match(/^---\n([\s\S]*?)\n---\n/);assert(m,'Front matter ausente');
 if(m[1].trim().startsWith('{'))return JSON.parse(m[1]);
 const out={};for(const line of m[1].split('\n')){if(!line.trim()||line.startsWith('#'))continue;const v=line.match(/^([a-z_]+):\s*(.*)$/);assert(v,'YAML simples não reconhecido: '+line);let s=v[2];if(s.startsWith('['))s=s.slice(1,-1).split(',').map(x=>x.trim().replace(/^['"]|['"]$/g,''));else if(s==='null')s=null;else s=s.replace(/^['"]|['"]$/g,'');out[v[1]]=s}return out;
}
function sections(md,defs){
 const found=[...md.matchAll(/<!-- AGU_EDITOR_SECTION_START:([a-zA-Z0-9-]+) -->\n([\s\S]*?)\n<!-- AGU_EDITOR_SECTION_END:\1 -->/g)];
 assert(found.length===defs.length,'Seções ausentes, extras ou delimitadores quebrados');
 assert(new Set(found.map(m=>m[1])).size===found.length,'Marcador duplicado');
 return defs.map((s,i)=>{assert(id(s.id)&&s.marker===found[i][1]&&typeof s.title==='string','ID/ordem de seção inválida');return {...s,page:i,text:found[i][2],sha256:hash(found[i][2]),headings:[...found[i][2].matchAll(/^(#{1,6})\s+(.+)$/gm)].map((h,n)=>({id:s.id+'-h'+(n+1),level:h[1].length,title:h[2]}))}});
}
function sourceOK(s){return s&&id(s.id)&&official(s.url)&&typeof s.locator==='string'&&s.locator.trim().length>2&&date(s.consultedAt)&&typeof s.scope==='string'&&s.scope.length>4&&['confirmado_pontualmente','parcial','pendente'].includes(s.status)}
function validateMetadata(m,md,{fixture=false}={}){
 assert(m.schema==='agu-chapter-v1'&&id(m.id),'Schema/ID do capítulo inválido');
 assert(m.fixture!==true||fixture,'Fixture não pode ser publicada');
 assert(m.editorialId&&m.title&&m.discipline?.id&&m.discipline?.name&&m.edition,'Metadados incompletos');
 assert(date(m.dates?.edition)&&date(m.dates?.auditCutoff)&&typeof m.dates?.legalConsultation==='string','Datas editoriais incompletas');
 assert(Array.isArray(m.curricularIds)&&m.curricularIds.length&&m.curricularIds.every(c=>/^[A-Z]+(?:-[A-Z]+)?-\d+[a-z]?$/.test(c)),'IDs curriculares inválidos');
 const f=frontMatter(md);assert(f.editorial_id===m.editorialId&&String(f.edition)===m.edition&&JSON.stringify(f.curricular_ids)===JSON.stringify(m.curricularIds),'Identidade diverge do Markdown');
 assert((md.match(/^# /gm)||[]).length===1,'A fonte editorial precisa de um H1 único');
 assert(Array.isArray(m.sections)&&new Set(m.sections.map(s=>s.id)).size===m.sections.length,'Seções duplicadas');
 const ss=sections(md,m.sections),ids=new Set(ss.map(s=>s.id));
 assert(m.coverage?.length&&m.coverage.every(c=>m.curricularIds.includes(c.curricularId)&&typeof c.subitem==='string'&&c.subitem.length>2&&c.sections.length&&c.sections.every(s=>ids.has(s))&&['delimitado','parcial','planejado'].includes(c.status)),'Cobertura curricular sem vínculo válido');
 assert(Array.isArray(m.sources)&&m.sources.every(sourceOK)&&new Set(m.sources.map(s=>s.id)).size===m.sources.length,'Fonte sem URL oficial, localizador, data ou alcance');
 const refs=new Set(m.sources.map(s=>s.id));
 assert(new Set((m.activities||[]).map(a=>a.id)).size===(m.activities||[]).length,'Atividade duplicada');
 for(const r of m.resources||[]){assert(id(r.id)&&ids.has(r.sectionId)&&r.alt?.length>25,'Recurso sem seção/alternativa substantiva');assert(['figure','table'].includes(r.type),'Recurso desconhecido');if(r.type==='figure')assert(/^livros\/recursos\/[a-z0-9/-]+\.svg$/.test(r.src)&&['horizontal','vertical'].includes(r.orientation),'Figura inválida');else assert(r.rows?.length>1&&r.rows.every(row=>Array.isArray(row)&&row.length===r.rows[0].length),'Tabela irregular')}
 for(const a of m.activities||[]){assert(id(a.id)&&ids.has(a.sectionId)&&['aplicar','recuperar'].includes(a.type)&&['autoral','adaptada','oficial'].includes(a.nature),'Atividade sem origem válida');assert(a.prompt?.length&&a.answer?.length,'Atividade sem seletores de pergunta/resposta');if(a.nature==='oficial')assert(a.officialEvidence?.examUrl&&a.officialEvidence?.keyUrl&&a.officialEvidence?.item,'Atividade oficial sem prova/gabarito');extract(ss,a.prompt);extract(ss,a.answer)}
 for(const p of m.propositions||[]){assert(id(p.id)&&ids.has(p.sectionId)&&p.sourceRefs?.length&&p.sourceRefs.every(r=>refs.has(r)),'Proposição sem fundamento rastreável');assert(p.category&&p.cognitiveType&&p.semanticKey&&p.activityId,'Proposição incompleta');assert(m.activities.some(a=>a.id===p.activityId),'Proposição sem atividade');}
 assert(m.verification?.status&&Array.isArray(m.verification.gaps),'Status/lacunas ausentes');return ss;
}
// Intervalos exatos no texto canônico; qualquer ambiguidade bloqueia a publicação.
function extract(ss,ranges){return ranges.map(r=>{const s=ss.find(s=>s.id===r.sectionId);assert(s,'Seletor sem seção');const from=r.start===undefined?0:s.text.indexOf(r.start);assert(from>=0,'Início de seletor não encontrado');assert(r.start===undefined||s.text.indexOf(r.start,from+1)<0,'Início de seletor ambíguo');const to=r.end===undefined?s.text.length:s.text.indexOf(r.end,from+(r.start?.length||0));assert(to>from,'Fim de seletor não encontrado');return s.text.slice(from,to).trim()}).join('\n\n')}
function legacyCards(root=ROOT){
 const context={Date,Math,console,localStorage:{getItem:()=>null}};context.window=context;vm.createContext(context);
 for(const f of ['catalogo-disciplinas.js','dados/flashcards-aud03-lote01.js','dados/flashcards-aud02-2015-atualizados-lote01.js','dados/flashcards-aud02-2015-atualizados-lote02.js','dados/flashcards-aud02-2015-atualizados-lote03.js','revisao-inteligente.js'])vm.runInContext(read(root,f),context,{filename:f});
 return JSON.parse(JSON.stringify(context.AGUReview.searchCards().map(x=>context.AGUReview.notebookEligibleCard(x.id))));
}
const normalized=s=>s.normalize('NFKD').replace(/\p{Diacritic}/gu,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
function candidate(m,ss,p){const a=m.activities.find(a=>a.id===p.activityId);return {schema:'agu-card-candidate-v1',id:p.id,chapterId:m.id,sectionId:p.sectionId,curricularIds:m.curricularIds,front:p.front||extract(ss,a.prompt),back:p.back||extract(ss,a.answer),sources:p.sourceRefs.map(id=>m.sources.find(s=>s.id===id)),chapterEdition:m.edition,cardVersion:p.version||'1.0',status:'candidato',nature:a.nature,...(a.officialEvidence?{officialEvidence:a.officialEvidence}:{}),cognitiveType:p.cognitiveType,category:p.category,semanticKey:p.semanticKey,relation:p.relation||'recuperacao_da_secao',dependencies:{sections:{[p.sectionId]:ss.find(s=>s.id===p.sectionId).sha256},sources:Object.fromEntries(p.sourceRefs.map(id=>[id,hash(m.sources.find(s=>s.id===id))]))}}}
function validateCandidate(c){assert(c.schema==='agu-card-candidate-v1'&&['autoral','adaptada','oficial'].includes(c.nature),'Schema/natureza de cartão inválida');assert(id(c.id)&&c.front?.length>8&&c.back?.length>8&&c.sources?.length&&c.sources.every(sourceOK),'Cartão sem pergunta, resposta ou fundamento verificável');assert(c.chapterId&&c.sectionId&&c.curricularIds?.length&&c.chapterEdition&&c.cardVersion&&c.category&&c.cognitiveType,'Proveniência de cartão incompleta');assert(['candidato','em_revisao','aprovado','suspenso','obsoleto'].includes(c.status),'Estado editorial inválido');if(c.nature==='oficial')assert(c.officialEvidence?.examUrl&&c.officialEvidence?.keyUrl&&c.officialEvidence?.item,'Cartão oficial sem identificação/gabarito comprovados');if(c.status==='aprovado')assert(c.approval?.reviewer&&date(c.approval.at)&&c.approval.scope&&/^[a-f0-9]{64}$/.test(c.approval.evidenceSha256),'Aprovação humana/documental ausente');return true}
function deduplicate(cards,existing=[]){
 const seen=new Map(existing.map(c=>[normalized(c.front),c.id])),semantics=new Map(),exact=new Map();
 return cards.map(c=>{validateCandidate(c);const q=normalized(c.front),qa=q+'|'+normalized(c.back);const duplicateOf=exact.get(qa)||seen.get(q)||semantics.get(c.semanticKey)||null;exact.set(qa,c.id);seen.set(q,seen.get(q)||c.id);semantics.set(c.semanticKey,semantics.get(c.semanticKey)||c.id);return {...c,duplicateOf,deduplication:duplicateOf?'revisar_reuso_ou_excecao':'sem_duplicata_exata_detectada'}});
}
function affected(previous,next,cards){
 if(!previous)return [];const old=new Map(previous.sections.map(s=>[s.id,s.sha256])),ss=new Map(next.sections.map(s=>[s.id,s.sha256]));
 return cards.filter(c=>Object.entries(c.dependencies?.sections||{}).some(([id,h])=>old.has(id)&&ss.get(id)!==h)||Object.entries(c.dependencies?.sources||{}).some(([id,h])=>hash(next.sources.find(s=>s.id===id)||null)!==h)).map(c=>({id:c.id,chapterId:next.id,status:'em_revisao',previousStatus:c.status,reason:'Seção/fonte dependente alterada; revalidação explícita necessária',preserveHistory:true}));
}
function approvedEditorial(records,all,candidates,legacy){
 const ids=new Set(legacy.map(c=>c.id));return records.map(record=>{
  const c=record.card;validateCandidate(c);assert(c.status==='aprovado'&&c.sources.every(s=>s.status==='confirmado_pontualmente'),'Cartão novo sem aprovação e fontes pontualmente conferidas');
  assert(!ids.has(c.id),'ID já existente: reutilizar vínculo, sem cópia');ids.add(c.id);
  const current=candidates.find(x=>x.id===c.id),chapter=all.find(x=>x.m.id===c.chapterId);assert(chapter,'Cartão sem capítulo aprovado');assert(!current?.duplicateOf,'Duplicata: decidir reuso de ID antes da aprovação');
  const frozenHash=hash({front:c.front,back:c.back,sources:c.sources,chapterEdition:c.chapterEdition,cardVersion:c.cardVersion});assert(record.contentSha256===frozenHash,'Snapshot aprovado divergente');
  const dependenciesChanged=!current||current.front!==c.front||current.back!==c.back||Object.entries(c.dependencies.sections).some(([id,h])=>chapter.data.sections.find(s=>s.id===id)?.sha256!==h)||Object.entries(c.dependencies.sources).some(([id,h])=>hash(chapter.data.sources.find(s=>s.id===id)||null)!==h);
  return {id:c.id,kind:'flashcard',code:c.curricularIds[0],front:c.front,back:c.back,source:c.sources.map(s=>s.locator).join('; '),link:c.sources[0].url,origin:'flashcard_editorial_'+c.nature,notOfficial:c.nature!=='oficial',validation:'aprovacao_editorial_documentada_sem_certificacao_integral',reviewedAt:c.approval.at,editorialStatus:dependenciesChanged||record.suspended?'suspenso':'aprovado',editorialVersion:c.cardVersion,chapterId:c.chapterId,sectionId:c.sectionId,approval:c.approval,contentSha256:frozenHash,previousVersions:record.previousVersions||[]};
 });
}
function validateBinding(b,inventory,all){
 const old=inventory.find(c=>c.id===b.cardId);assert(old,'Cartão existente não encontrado');
 assert(hash({front:old.front,back:old.back,source:old.source,link:old.link})===b.contentSha256,'Cartão existente alterado sem revisão');
 assert(b.status==='aprovado'&&b.approval?.reviewer&&date(b.approval.at)&&sourceOK(b.source)&&b.source.status==='confirmado_pontualmente','Vínculo sem revisão/fonte conferida');
 for(const ref of b.chapters){const c=all.find(c=>c.m.id===ref.chapterId);assert(c?.data.sections.some(s=>s.id===ref.sectionId),'Vínculo capítulo/seção inexistente')}
 return {...b,availableStatus:old.editorialStatus||'aprovado'};
}
function inputHash(root,m,md){const {approval,...rest}=m;return hash({markdown:md,metadata:rest,assets:(m.resources||[]).filter(r=>r.type==='figure').map(r=>({src:r.src,sha256:hash(fs.readFileSync(safePath(root,r.src)))}))})}
function compile(root,m,{fixture=false}={}){
 const md=read(root,m.canonical),ss=validateMetadata(m,md,{fixture});
 for(const r of m.resources||[])if(r.type==='figure'){const svg=read(root,r.src);assert(!/<(?:script|foreignObject|iframe)\b|\bon\w+\s*=|(?:href|url)\s*[:=(]/i.test(svg),'SVG ativo/externo recusado');assert(/<svg\b/.test(svg)&&/view[Bb]ox=/.test(svg),'SVG sem viewport')}
 const digest=inputHash(root,m,md);assert(m.approval?.status==='aprovado'&&m.approval.inputSha256===digest&&m.approval.record,'Edição sem aprovação correspondente ao hash de entrada');
 const reader={...m.reader,pages:ss.map(s=>({label:s.title,text:s.text}))};
 assert(reader.id===m.id&&m.curricularIds.includes(reader.curricular_id),'Leitor com identidade divergente');
 const activities=m.activities.map(a=>({...a,prompt:extract(ss,a.prompt),answer:extract(ss,a.answer)}));
 const data={...m,inputSha256:digest,sourceSha256:hash(md),sections:ss.map(({text,...s})=>s),activities};
 const candidates=m.propositions.map(p=>candidate(m,ss,p));
 const fidelity={id:m.id,edition:m.edition,sourceSha256:hash(md),inputSha256:digest,sections:ss.map(s=>({id:s.id,sha256:s.sha256,characters:s.text.length})),textualLosses:[],visualDifferences:m.visualDifferences||[],resources:(m.resources||[]).map(r=>({id:r.id,type:r.type,sectionId:r.sectionId,sha256:r.src?hash(fs.readFileSync(safePath(root,r.src))):hash(r.rows)}))};
 return {reader,data,candidates,fidelity};
}
function write(root,p,value,{check=false,semantic=false}={}){const f=safePath(root,p),out=typeof value==='string'?value:JSON.stringify(value,null,2)+'\n';if(fs.existsSync(f)){const old=fs.readFileSync(f,'utf8');if(old===out||(semantic&&JSON.stringify(JSON.parse(old))===JSON.stringify(value)))return false}assert(!check,'Artefato desatualizado: '+p);fs.mkdirSync(path.dirname(f),{recursive:true});fs.writeFileSync(f,out);return true}
function build({root=ROOT,check=false,fixture=false,config='livros/editorial/catalogo.json',only=null}={}){
 const cfg=json(root,config),existing=legacyCards(ROOT),registry=json(root,'livros/editorial/cartoes-vinculados.json');
 const all=cfg.chapters.map(p=>{const m=json(root,p);return {m,...compile(root,m,{fixture})}}),candidates=deduplicate(all.flatMap(c=>c.candidates),existing),catalog={schema:'agu-method-catalog-v1',disciplines:[],collections:cfg.collections};
 const ids=new Set();for(const c of all){assert(!ids.has(c.m.id),'Capítulo duplicado no manifesto');ids.add(c.m.id);let d=catalog.disciplines.find(d=>d.id===c.m.discipline.id);if(!d){d={...c.m.discipline,chapters:[]};catalog.disciplines.push(d)}d.chapters.push({id:c.m.id,title:c.m.title,edition:c.m.edition,curricularIds:c.m.curricularIds,reader:c.m.readerPath,method:'livros/metodo/'+c.m.id+'.json',status:'publicado'})}
 for(const c of candidates)assert(candidates.filter(x=>x.id===c.id).length===1,'ID de candidato duplicado');
 const editorial=approvedEditorial(json(root,'livros/editorial/cartoes-aprovados.json').records,all,candidates,existing);
 const bindings=registry.cards.map(b=>validateBinding(b,[...existing,...editorial],all));
 let changed=0;const plannedWrites=[];const emit=(p,v,o={})=>plannedWrites.push([p,v,o]);
 const revalidation=[];let previousCandidates=[];try{previousCandidates=json(root,'livros/candidatos/cartoes.json').cards}catch(e){if(e.code!=='ENOENT')throw e}
 for(const c of all){if(only&&c.m.id!==only)continue;const output='livros/metodo/'+c.m.id+'.json';let prior;try{prior=json(root,output)}catch(e){if(e.code!=='ENOENT')throw e}
  if(prior&&prior.sourceSha256!==c.data.sourceSha256){const bodyChanged=JSON.stringify(prior.sections.map(s=>[s.id,s.sha256]))!==JSON.stringify(c.data.sections.map(s=>[s.id,s.sha256]));assert(!bodyChanged||prior.edition!==c.m.edition,'Texto mudou: incrementar edição antes de publicar');if(bodyChanged)emit('livros/historico/'+c.m.id+'/'+prior.edition+'.json',prior);else assert(prior.metadataVersion!==c.m.metadataVersion,'Mudança de aparato sem nova versão de metadados')}
  const dependencies=bindings.flatMap(b=>b.chapters.filter(ref=>ref.chapterId===c.m.id).map(ref=>({id:b.cardId,status:b.status,dependencies:ref.dependencies})));
  revalidation.push(...affected(prior,c.data,[...previousCandidates.filter(x=>x.chapterId===c.m.id),...dependencies]));
  // Associações aprovadas têm hash de seção/fonte; alterações retiram o vínculo da revisão.
  c.data.reviewCards=bindings.filter(b=>b.chapters.some(r=>r.chapterId===c.m.id)).map(b=>{const ref=b.chapters.find(r=>r.chapterId===c.m.id),dirty=Object.entries(ref.dependencies.sections).some(([id,h])=>c.data.sections.find(s=>s.id===id)?.sha256!==h)||Object.entries(ref.dependencies.sources||{}).some(([id,h])=>hash(c.data.sources.find(s=>s.id===id)||null)!==h);return {cardId:b.cardId,sectionId:ref.sectionId,relation:ref.relation,label:ref.label,status:b.availableStatus==='suspenso'?'suspenso':dirty?'em_revisao':b.status,source:b.source,approval:b.approval}});
  c.data.reviewCards.push(...editorial.filter(x=>x.chapterId===c.m.id).map(x=>({cardId:x.id,sectionId:x.sectionId,relation:'proposicao_editorial_revisada',label:'Cartão da edição '+x.editorialVersion,status:x.editorialStatus,approval:x.approval})));
  emit(c.m.readerPath,c.reader,{semantic:true});emit(output,c.data);emit('livros/relatorios/'+c.m.id+'.json',c.fidelity);
 }
 for(const p of cfg.collections){const collection=json(root,p);assert(collection.schema==='agu-collection-v1'&&Array.isArray(collection.chapters),'Coleção inválida');assert(new Set(collection.chapters.map(c=>c.editorialId)).size===collection.chapters.length,'Obra duplicada na coleção');for(const c of collection.chapters)if(c.status.publication==='publicado')assert(ids.has(c.chapterId),'Coleção aponta obra não publicada')}
 emit('livros/catalogo.json',catalog);emit('livros/candidatos/cartoes.json',{schema:'agu-candidates-v1',cards:candidates});
 emit('dados/metodo-agu-referencias.js','/* Gerado dos índices publicados; não contém dados do estudante. */\nwindow.AGU_METHOD_BOOK_REFERENCES = '+JSON.stringify({schema:'agu-method-book-references-v1',chapters:Object.fromEntries(all.map(c=>[c.m.id,{title:c.m.title,edition:c.m.edition,curricularIds:c.m.curricularIds,sections:c.data.sections.map(s=>s.id),activities:c.data.activities.map(a=>a.id)}]))},null,2)+';\n');
 let priorEditorial=[];try{const context={};context.window=context;vm.runInNewContext(read(root,'dados/flashcards-editoriais.js'),context);priorEditorial=context.AGU_EDITORIAL_CARDS||[]}catch(e){if(e.code!=='ENOENT')throw e}
 for(const old of priorEditorial){const newer=editorial.find(c=>c.id===old.id);assert(newer,'Cartão já publicado removido: conservar snapshot suspenso e histórico');if(newer.contentSha256!==old.contentSha256)assert(newer.editorialVersion!==old.editorialVersion&&newer.previousVersions.some(v=>v.contentSha256===old.contentSha256),'Mudança de cartão exige versão e snapshot anterior')}
 emit('dados/flashcards-editoriais.js','/* Gerado pelo pipeline; candidatos nunca entram neste arquivo. */\nwindow.AGU_EDITORIAL_CARDS = '+JSON.stringify(editorial,null,2)+';\n');
 // Mantém pendências de revalidação até decisão editorial, inclusive ao reprocessar.
 let retained=[];try{retained=json(root,'livros/relatorios/revalidacao.json').items}catch(e){if(e.code!=='ENOENT')throw e}
 const pending=[...new Map([...retained,...revalidation].map(x=>[x.chapterId+':'+x.id,x])).values()];for(const c of candidates)if(pending.some(x=>x.id===c.id&&x.chapterId===c.chapterId))c.status='em_revisao';
 emit('livros/relatorios/revalidacao.json',{schema:'agu-revalidation-v1',items:pending});
 for(const [p,v,o] of plannedWrites)changed+=Number(write(root,p,v,{check,...o}));
 return {chapters:all.length,candidates:candidates.length,legacyCards:existing.length,approvedEditorial:editorial.filter(c=>c.editorialStatus==='aprovado').length,changed,revalidation:revalidation.length};
}
module.exports={hash,frontMatter,sections,extract,validateMetadata,sourceOK,official,legacyCards,candidate,validateCandidate,deduplicate,affected,approvedEditorial,validateBinding,inputHash,compile,build,safePath};
if(require.main===module){try{const args=process.argv.slice(2),arg=k=>args.includes(k)?args[args.indexOf(k)+1]:null;console.log('METODO_AGU_PIPELINE_OK',JSON.stringify(build({root:arg('--root')||ROOT,config:arg('--config')||undefined,check:args.includes('--check'),only:arg('--chapter')})))}catch(e){console.error('METODO_AGU_PIPELINE_REJEITADO:',e.message);process.exitCode=1}}
