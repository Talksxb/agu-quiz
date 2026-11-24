"""Localizadores numéricos do caderno SUPER-A4. Não persiste enunciados."""
import hashlib,html,json,re,subprocess,sys,unicodedata
from pathlib import Path
p=Path(sys.argv[1]); out=Path(sys.argv[2]); manifest=json.loads(out.read_text())
digest=hashlib.sha256(p.read_bytes()).hexdigest()
assert manifest['sha256']==digest,'wrong PDF hash'
raw=subprocess.check_output(['pdftotext','-bbox-layout',str(p),'-']).decode('utf-8')
pages=re.findall(r'<page\b([^>]*)>(.*?)</page>',raw,re.S)
assert len(pages)==99, f'pages={len(pages)}'
def attr(s,k):
    return float(re.search(r'\b'+k+r'="([^"]+)"',s).group(1))
def decode_number(s):
    # A fonte de numeração desse PDF usa código 1 para 0, 2 para 1, ..., 10 para 9.
    # Nunca se aplica a texto do enunciado, apenas palavras na margem do número.
    s=html.unescape(s).strip(' \r')
    if 1<=len(s)<=3 and all(1<=ord(c)<=10 for c in s):
        return int(''.join(str(ord(c)-1) for c in s))
    if re.fullmatch(r'[0-9]{1,3}',s):return int(s)
    return None
loc=[];n=1
for i,(attrs,body) in enumerate(pages,1):
    if i<5:continue
    width=attr(attrs,'width')
    words=re.findall(r'<word\b([^>]*)>(.*?)</word>',body,re.S)
    candidates=[]
    for a,w in words:
        x=attr(a,'xMin')/width;y=attr(a,'yMin')
        if x>.105:continue
        num=decode_number(w)
        if num is not None:candidates.append((y,x,num,[ord(c) for c in html.unescape(w)]))
    candidates.sort()
    if i<=12:print('PAGE',i,'NUMBERS',[(round(x,3),num,codes) for _,x,num,codes in candidates])
    for _,x,num,codes in candidates:
        if num==n:
            loc.append(i);n+=1
    if n==201:break
if len(loc)!=200:
    print('EXPECTED_NEXT',n,'LAST_PAGES',loc[-10:])
    for i in range(max(5,(loc[-1] if loc else 5)-1),min(99,(loc[-1] if loc else 5)+2)+1):
        attrs,body=pages[i-1]; width=attr(attrs,'width')
        # Only character-code metadata from short margin words; no body text.
        print('MARGIN',i,[(round(attr(a,'xMin')/width,3),[ord(c) for c in html.unescape(w)]) for a,w in re.findall(r'<word\b([^>]*)>(.*?)</word>',body,re.S) if attr(a,'xMin')/width<.105 and len(html.unescape(w))<=3][:45])
assert len(loc)==200, f'only {len(loc)} markers located; no manifest published'
assert all(5<=v<=99 for v in loc) and loc==sorted(loc)
if manifest.get('pages') is not None:assert manifest['pages']==loc,'page locators mismatch'
manifest['pages']=loc
out.write_text(json.dumps(manifest,separators=(',',':'))+'\n')
print('AU2015_LOCATORS='+json.dumps(loc,separators=(',',':')))
