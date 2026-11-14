"""Cotejo inverso, sem usar extract(): recompõe todos os blocos legais da LC73."""
import importlib.util,json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('lc73',ROOT/'scripts/importar-lc73.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
p=m.Blocks();p.feed((ROOT/'fontes/lc73/camara-20261114.html.txt').read_text())
c=json.JSONDecoder().raw_decode((ROOT/'dados/legislacao-s13.js').read_text().split('root.AGU_LEGAL_CORPUS=',1)[1])[0];law=next(l for l in c['laws'] if l['id']=='LC73')
headings=set()
for i,r in enumerate(p.rows):
 if re.fullmatch(r'(TÍTULO|CAPÍTULO|Seção) [IVXLCDM]+',r['text']):headings.update([i,i+1])
expected=set(range(6,276))-headings;groups={}
for a in law['articles']:
 for u in a['clauses']:groups.setdefault(u['sourceOrdinal'],[]).append(u)
assert set(groups)==expected and len(expected)==220
for ordinal in sorted(expected):
 assert len(groups[ordinal])==1
 u=groups[ordinal][0];raw=p.rows[ordinal]['text'];body=re.sub(r'^(?:Art\.\s*\d+(?:-[A-Z])?[º.]?|§\s*\d+[º.]?|Parágrafo único\.|[IVXLCDM]+\s*[-–]|[a-z]\))\s*','',raw,count=1)
 assert u['text']+''.join(' '+n['text'] for n in u.get('editorialNotes',[]))==body,f'Divergência literal no bloco {ordinal}'
assert law['frontMatter']==[r['text'] for r in p.rows[2:6]]
assert law['closingMatter']==[r['text'] for r in p.rows[276:]]
assert any(r['tag']=='h2' and r['text']=='CAPÍTULO IX' for r in p.rows)
print('LEG04_REVERSE_CHECK_OK: 220 blocos legais, 25 divisões e notas preservados; Capítulo IX em h2 conferido')
