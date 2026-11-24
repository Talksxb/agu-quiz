"""Numeric locators derived from official PDF; output only metadata, never exam text."""
import hashlib,json,re,subprocess,sys,unicodedata,xml.etree.ElementTree as ET
from pathlib import Path
p=Path(sys.argv[1]); out=Path(sys.argv[2]); manifest=json.loads(out.read_text())
digest=hashlib.sha256(p.read_bytes()).hexdigest()
assert manifest['sha256']==digest,'wrong PDF hash'
def ordinal(s):
    s=unicodedata.normalize('NFKC',s or '').strip().replace('\u200b','').replace('\ufeff','')
    m=re.match(r'^(\d{1,3})(?!\d)',s)
    return int(m.group(1)) if m else None
xml=subprocess.check_output(['pdftotext','-bbox-layout',str(p),'-'])
root=ET.fromstring(xml); pages=root.findall('.//{*}page')
assert len(pages)==99
loc=[]; n=1
for i,page in enumerate(pages,1):
    if i<5:continue
    width=float(page.attrib['width'])
    words=sorted(page.findall('.//{*}word'),key=lambda w:(float(w.attrib['yMin']),float(w.attrib['xMin'])))
    for w in words:
        if float(w.attrib['xMin'])>width*.18:continue
        if ordinal(w.text)==n:
            loc.append(i); n+=1
            if n==201:break
    if n==201:break
if len(loc)!=200:
    for i in range(4,min(8,len(pages))):
        page=pages[i]; width=float(page.attrib['width'])
        candidates=[(ordinal(w.text),round(float(w.attrib['xMin'])/width,3),round(float(w.attrib['yMin']),1)) for w in page.findall('.//{*}word') if ordinal(w.text) is not None]
        print('PAGE',i+1,'NUMERIC',candidates[:30])
    raw=subprocess.check_output(['pdftotext','-layout',str(p),'-']).decode('utf-8')
    loc=[];n=1
    for i,page in enumerate(raw.split('\f'),1):
        if i<5: continue
        for line in page.splitlines():
            if ordinal(line)==n:
                loc.append(i);n+=1
                if n==201:break
        if n==201:break
assert len(loc)==200, f'only {len(loc)} markers located; no manifest published'
assert all(5<=v<=99 for v in loc) and loc==sorted(loc)
if manifest.get('pages') is not None:assert manifest['pages']==loc,'page locators mismatch'
manifest['pages']=loc
out.write_text(json.dumps(manifest,separators=(',',':'))+'\n')
print('AU2015_LOCATORS='+json.dumps(loc,separators=(',',':')))
