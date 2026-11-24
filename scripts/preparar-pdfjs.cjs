// Verifica os assets versionados contra a distribuição npm oficial instalada.
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const base=path.resolve(__dirname,'..');const pkg=path.join(base,'node_modules','pdfjs-dist');
const info=JSON.parse(fs.readFileSync(path.join(pkg,'package.json'),'utf8'));assert.equal(info.version,'4.10.38');
const out=path.join(base,'vendor','pdfjs');const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
for(const f of ['pdf.mjs','pdf.worker.mjs']){const npm=fs.readFileSync(path.join(pkg,'build',f)),local=fs.readFileSync(path.join(out,f));assert(npm.equals(local),'Distribuição diverge do npm: '+f);console.log(f,hash(local))}
const license=fs.readFileSync(path.join(out,'LICENSE'),'utf8');assert(license.includes('Apache License')&&license.includes('Version 2.0'));
console.log('PDF.js verificado byte a byte:',info.version);
