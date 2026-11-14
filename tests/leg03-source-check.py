"""Cotejo inverso: reconstrói cada parágrafo da captura usando o corpus incorporado.
Independente da classificação/hierarquia do importador: não utiliza extract().
"""
import importlib.util,json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('lrf',ROOT/'scripts/importar-lrf.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
p=m.Paragraphs();p.feed((ROOT/'fontes/lc101/camara-20261113.html.txt').read_text())
c=json.JSONDecoder().raw_decode((ROOT/'dados/legislacao-s13.js').read_text().split('root.AGU_LEGAL_CORPUS=',1)[1])[0]
law=next(l for l in c['laws'] if l['id']=='LC101');groups={}
for a in law['articles']:
 for u in a['clauses']:groups.setdefault(u['sourceOrdinal'],[]).append(u)
headings=set()
for i,row in enumerate(p.rows):
 if re.fullmatch(r'(CAPÍTULO|Seção|Subseção) [IVXLCDM]+',row['text']):headings.update([i,i+1])
expected=set(range(6,629))-headings
assert set(groups)==expected and len(expected)==541,'Parágrafo omitido ou indevidamente importado'
for ordinal in sorted(expected):
 units=groups[ordinal];raw=p.rows[ordinal]['text']
 body=re.sub(r'^(?:Art\.\s*\d+(?:-[A-Z])?[º.]?|§\s*\d+[º.]?|Parágrafo único\.|[IVXLCDM]+\s*[-–]|[a-z]\))\s*','',raw,count=1)
 reconstructed=units[0]['text']
 if len(units)>1:
  assert ordinal==520 and [u['sourcePart'] for u in units]==list(range(5))
  reconstructed+=''.join(' '+u['id'].rsplit(':n',1)[1]+') '+u['text'] for u in units[1:])
 reconstructed+=''.join(' '+n['text'] for u in units for n in u.get('editorialNotes',[]))
 assert reconstructed==body, f'Divergência literal na linha documental {ordinal}'
print('LEG03_REVERSE_CHECK_OK: 541 parágrafos oficiais reconstruídos integralmente a partir de 545 unidades; notas e pontuação preservadas')
