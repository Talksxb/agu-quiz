import hashlib,json,re,subprocess,sys
from pathlib import Path
pdf,key,manifest=map(Path,sys.argv[1:])
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def text(p):return subprocess.check_output(['pdftotext','-layout',str(p),'-']).decode()
t=text(key)
assert '806_AGU_PF_001_01' in t
rows=[]
for line in t.splitlines():
 if 'Gabarito' in line:
  r=re.findall(r'\b[A-EX]\b',line)
  if len(r)==20: rows.extend(r)
expected=["A","D","C","B","E","E","B","A","D","C","E","B","C","E","D","C","B","C","B","A","D","E","X","D","A","A","A","B","C","A","C","B","D","X","B","D","B","D","E","A","C","E","B","A","C","A","C","E","X","B","B","C","D","A","C","C","B","B","E","C","E","A","D","A","E","B","D","E","X","D","B","A","B","A","C","E","E","D","C","D","E","C","C","C","D","E","D","E","C","E","C","C","E","A","D","B","A","B","D","C"]
assert rows==expected, (len(rows),[(i+1,x,y) for i,(x,y) in enumerate(zip(rows,expected)) if x!=y])
info=subprocess.check_output(['pdfinfo',str(pdf)]).decode()
pages=int(re.search(r'^Pages:\s+(\d+)',info,re.M).group(1))
m=json.loads(manifest.read_text())
for k,v in {'sha256':sha(pdf),'keySha256':sha(key),'pageCount':pages}.items():
 assert m[k] in (None,v),(k,m[k],v)
 m[k]=v
manifest.write_text(json.dumps(m,indent=2)+'\n')
print('PF_MANIFEST='+json.dumps(m,separators=(',',':')))
