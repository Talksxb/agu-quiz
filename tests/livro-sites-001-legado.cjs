/* LIVRO-SITES-001 — isola a inclusão editorial dos hashes históricos do Quiz.
 * Toda alteração não autorizada no HTML legado continua fazendo a cadeia falhar. */
'use strict';
const assert=require('node:assert/strict');
const crypto=require('node:crypto');
const fs=require('node:fs');
const path=require('node:path');

const originalTiles="'<div class=\"hub-tiles\">'+[";
const sitesTiles="'<div class=\"hub-tiles\"><a class=\"hub-entry hub-book\" href=\"https://leitura-agu-caderno-2026.aleixo-taw.chatgpt.site/\" rel=\"noopener noreferrer\" aria-label=\"Abrir Apostila Leitura AGU\"><b>Apostila · Leitura AGU</b><span>Capítulos completos em leitor acessível, com diagramas e referências. ADM-53 disponível.</span></a>'+[";
const sitesStyle='.hub-book{background:#e9f4f2;border-color:#b7d7d1;text-decoration:none}.hub-book:hover,.hub-book:focus-visible{background:#dff0eb;border-color:#438e83}.hub-book b{color:#15545a}.hub-book span{color:#476d70}\n';

module.exports=function legacyIndexDigest(){
 const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
 assert.equal(html.split(sitesTiles).length,2,'O cartão Sites deve aparecer exatamente uma vez');
 assert.equal(html.split(sitesStyle).length,2,'O estilo Sites deve aparecer exatamente uma vez');
 const legacyHtml=html.replace(sitesTiles,originalTiles).replace(sitesStyle,'');
 return crypto.createHash('sha256').update(legacyHtml).digest('hex');
};
