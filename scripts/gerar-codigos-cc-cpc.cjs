/* Gerador determinístico a partir de espelho do Planalto, SEM certificação jurídica.
 * Uso: node scripts/gerar-codigos-cc-cpc.cjs /caminho/para/LawCodex/br/codigos
 * O material de entrada deve corresponder ao commit e aos SHA-256 abaixo.
 */
'use strict';
const fs=require('node:fs');
const path=require('node:path');
const crypto=require('node:crypto');
const assert=require('node:assert/strict');

const SOURCES=[
 {id:'L10406',title:'Código Civil — Lei 10.406/2002',number:'10406',year:2002,
  file:'codigo-civil-lei-10406-2002.md',sha:'02f30e533422f8aed9566953b7a731642b3d2293de3c373f5646c8d799ee7137',
  source:'https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm',min:2082},
 {id:'L13105',title:'Código de Processo Civil — Lei 13.105/2015',number:'13105',year:2015,
  file:'codigo-de-processo-civil-lei-13105-2015.md',sha:'39006ac91e7e93548cbdcbf167d69746f6b4d0ca45d5d81ffe19a27a193d910c',
  source:'https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105compilada.htm',min:1074}
];
const mirrorCommit='e2a0e14bfc5cddf9a88b2aa05c66536cdb547aa1';
const sha256=s=>crypto.createHash('sha256').update(s).digest('hex');
const plain=s=>s.replace(/\*\*/g,'').replace(/\[([^\]]+)\]\([^)]+\)/g,'$1').trim();
const articleLine=/^\*\*Art\.\s*([\d.]+(?:-[A-Z])?)(?:º|\.)?/;

function parse(source,text){
 const lines=text.replace(/\r\n/g,'\n').split('\n');
 const items=[],structure=[],stack=[];let article=null;
 let inBody=false,done=false;
 const flush=()=>{
  if(!article)return;
  const body=article.lines.join('\n').replace(/\n{3,}/g,'\n\n').trim();
  assert.ok(body.length>15,'Artigo sem conteúdo '+article.id);
  article.clauses=[{id:article.id+':texto',label:'Texto do artigo e desdobramentos',kind:'caput',parentId:article.id,text:body}];
  delete article.lines;items.push(article);article=null;
 };
 for(const line of lines){
  if(!inBody){if(/^##\s+/.test(line))inBody=true;else continue;}
  if(/^Brasília,/.test(line)){flush();done=true;break;}
  const heading=line.match(/^(#{2,6})\s+(.+)/);
  if(heading){
   flush();const level=heading[1].length,label=plain(heading[2]);
   while(stack.length&&stack.at(-1).level>=level)stack.pop();
   const parentId=stack.length?stack.at(-1).id:null,id=source.id+':div'+(structure.length+1);
   const kind=/CAP[IÍ]TULO/i.test(label)?'chapter':/SE[CÇ][AÃ]O/i.test(label)?'section':/SUBSE[CÇ][AÃ]O/i.test(label)?'subsection':/T[IÍ]TULO/i.test(label)?'title':'book';
   structure.push({id,kind,label,parentId});stack.push({id,level});continue;
  }
  const match=line.match(articleLine);
  if(match){
   flush();const articleNo=match[1],id=source.id+':art'+articleNo.replace(/\./g,'');
   article={id,label:'Art. '+articleNo+(articleNo.includes('-')?'':Number(articleNo.replace(/\./g,''))<10?'º':''),topic:null,
    contentKind:'isolated_article',excerpt:false,structurePath:stack.map(s=>s.id),lines:[plain(line)]};
  }else if(article){article.lines.push(plain(line))}
 }
 flush();
 assert.ok(done,'Fecho da norma não encontrado: '+source.id);
 assert.equal(items.length,source.min,'Quantidade mudou, exige novo cotejo: '+source.id);
 assert.equal(new Set(items.map(x=>x.id)).size,items.length,'IDs de artigos repetidos');
 return {id:source.id,title:source.title,kind:'lei',number:source.number,year:source.year,
  section:'Texto compilado — leitura referencial',source:source.source,sourceAuthority:'Presidência da República — Planalto (origem indicada no espelho)',
  sourceVersion:'Espelho público LawCodex do texto compilado, coletado em 12/10/2026; não cotejado integralmente com o Planalto',
  checkedOn:'2026-10-12',textVersionId:source.id+'@2026-10-12-lawcodex-'+source.sha.slice(0,12),
  auditStatus:'espelho_sem_cotejo_oficial',contentCoverage:'partial',contentImport:'mirror_unverified',
  textVerification:{status:'pending'},sourceMirror:{repository:'https://github.com/LawCodex/br',commit:mirrorCommit,file:'codigos/'+source.file,sha256:source.sha},
  structure,articles:items};
}

function generate(inputDir){
 assert.ok(inputDir&&fs.existsSync(inputDir),'Informe a pasta codigos do espelho fixado');
 const laws=SOURCES.map(s=>{
  const value=fs.readFileSync(path.join(inputDir,s.file));
  assert.equal(sha256(value),s.sha,'SHA de origem inesperado: '+s.file);
  return parse(s,value.toString('utf8'));
 });
 const data='/* CC/CPC: espelho 12/10/2026; cotejo oficial pendente. Não declarar norma integral auditada. */\n'+
  '(function(root){\'use strict\';const base=root.AGU_LEGAL_CORPUS;if(!base||base.schema!==\'agu-legal-reader-v1\')return;'+
  'const laws='+JSON.stringify(laws)+';for(const law of laws){if(!base.laws.some(x=>x.id===law.id))base.laws.push(law)}'+
  '})(window);\n';
 return {data,laws};
}
if(require.main===module){
 const {data,laws}=generate(process.argv[2]);const out=path.join(__dirname,'..','dados','codigos-cc-cpc.js');
 fs.writeFileSync(out,data); // geração mecânica de bundle versionado; não edita o corpus legado
 process.stdout.write(JSON.stringify({file:out,sha256:sha256(data),laws:laws.map(x=>({id:x.id,articles:x.articles.length,divisions:x.structure.length}))})+'\n');
}
module.exports={generate,parse,SOURCES};
