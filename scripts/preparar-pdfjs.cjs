// Copia exclusivamente assets de uma instalação npm local revisada.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const base=path.resolve(__dirname,'..');const pkg=path.join(base,'node_modules','pdfjs-dist');
const info=JSON.parse(fs.readFileSync(path.join(pkg,'package.json'),'utf8'));assert.equal(info.version,'4.10.38');
const out=path.join(base,'vendor','pdfjs');fs.mkdirSync(out,{recursive:true});
for(const f of ['pdf.mjs','pdf.worker.mjs'])fs.copyFileSync(path.join(pkg,'build',f),path.join(out,f));
fs.copyFileSync(path.join(pkg,'LICENSE'),path.join(out,'LICENSE'));
console.log('PDF.js preparado localmente:',info.version);
