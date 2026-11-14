"""Cotejo inverso: recompõe todos os 89 blocos legais sem usar extract()."""
import importlib.util,json,re
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('lindb',ROOT/'scripts/importar-lindb.py');m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
p=m.Blocks();p.feed((ROOT/'fontes/lindb/camara-20261114.html.txt').read_text())
c=json.JSONDecoder().raw_decode((ROOT/'dados/legislacao-s13.js').read_text().split('root.AGU_LEGAL_CORPUS=',1)[1])[0];l=next(l for l in c['laws'] if l['id']=='DL4657');groups={}
for a in l['articles']:
 for u in a['clauses']:groups.setdefault(u['sourceOrdinal'],[]).append(u)
assert set(groups)==set(range(5,94)) and len(groups)==89
for i in range(5,94):
 assert len(groups[i])==1
 u=groups[i][0];body=re.sub(r'^(?:Art\.\s*\d+(?:-[A-Z])?[ºo.]?|§\s*\d+[ºo.]?|Parágrafo único\.|[IVXLCDM]+\s*[-–]|[a-z]\))\s*','',p.rows[i]['text'],count=1)
 assert u['text']+''.join(' '+n['text'] for n in u.get('editorialNotes',[]))==body,f'Diferença literal no bloco {i}'
assert l['frontMatter'][0]==p.rows[2]['text']
assert l['frontMatter'][1]+''.join(' '+n['text'] for n in l['frontMatterEditorialNotes'])==p.rows[3]['text']
assert l['frontMatter'][2]==p.rows[4]['text']
assert l['closingMatter']==[r['text'] for r in p.rows[94:]]
assert not any(re.match(r'^(?:TÍTULO|CAPÍTULO|Seção) ',r['text']) for r in p.rows)
print('LEG05_REVERSE_CHECK_OK: 89 blocos legais, ementa/notas e 11 blocos do fecho preservados; sem divisões formais')
