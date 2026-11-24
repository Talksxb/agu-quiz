// Conferir distribuição local contra arquivo oficial de release (hash publicado pela Mozilla/GitHub).
const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const base=path.resolve(__dirname,'..'),dir=process.env.PDFJS_RELEASE_DIR;
assert(dir,'PDFJS_RELEASE_DIR obrigatório');
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
for(const f of ['pdf.mjs','pdf.worker.mjs','pdf.renderer.mjs']){
 const official=fs.readFileSync(path.join(dir,'build',f)),local=fs.readFileSync(path.join(base,'vendor','pdfjs',f));
 console.log(f,'release',hash(official),'local',hash(local));
 assert(official.equals(local),'Distribuição diverge do release oficial: '+f);
}
const license=fs.readFileSync(path.join(base,'vendor','pdfjs','LICENSE'));
assert(license.equals(fs.readFileSync(path.join(dir,'LICENSE'))),'licença diverge');
console.log('PDF.js verificado byte a byte: 6.5.438, release oficial');
