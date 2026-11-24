"""Generate numeric page locators only from the exact Cebraspe PDF; no text persisted."""
import hashlib,json,re,subprocess,sys
from pathlib import Path
p=Path(sys.argv[1]); out=Path(sys.argv[2])
manifest=json.loads(out.read_text())
digest=hashlib.sha256(p.read_bytes()).hexdigest()
assert manifest['sha256']==digest,'wrong PDF hash'
raw=subprocess.check_output(['pdftotext','-layout',str(p),'-']).decode('utf-8')
pages=raw.split('\f')
loc=[]; n=1
for i,page in enumerate(pages,1):
    if i<5: continue
    for line in page.splitlines():
        m=re.match(r'^\s*(\d{1,3})(?:\s|$)',line)
        if m and int(m.group(1))==n:
            loc.append(i); n+=1
            if n==201:break
    if n==201:break
assert len(loc)==200, f'only {len(loc)} markers located; no manifest published'
assert all(5<=p<=99 for p in loc) and loc==sorted(loc)
if manifest.get('pages') is not None:assert manifest['pages']==loc,'page locators mismatch'
manifest['pages']=loc
out.write_text(json.dumps(manifest,separators=(',',':'))+'\n')
print('AU2015_LOCATORS='+json.dumps(loc,separators=(',',':')))
