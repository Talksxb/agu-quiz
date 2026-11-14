"""Cotejo inverso de todos os 91 blocos da Lei 4.717, sem chamar extract()."""
import importlib.util
import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('lei4717', ROOT / 'scripts/importar-lei4717.py')
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)
rows, _ = module.capture()
corpus = json.JSONDecoder().raw_decode((ROOT / 'dados/legislacao-s13.js').read_text().split('root.AGU_LEGAL_CORPUS=', 1)[1])[0]
law = next(l for l in corpus['laws'] if l['id'] == 'L4717')
groups = {}
for a in law['articles']:
    for unit in a['clauses']:
        groups.setdefault(unit['sourceOrdinal'], []).append(unit)
legal_ordinals = set(range(7, 102)) - {50, 56, 63, 95}
assert set(groups) == legal_ordinals and len(legal_ordinals) == 91
for ordinal in sorted(legal_ordinals):
    assert len(groups[ordinal]) == 1
    unit = groups[ordinal][0]
    body = re.sub(r'^(?:Art\.\s*\d+[º.]?|§\s*\d+[º.]?|Parágrafo único\.|[IVXLCDM]+\s*[-–]|[a-z]\))\s*', '', rows[ordinal]['text'], count=1)
    actual = unit['text'] + ''.join(' ' + note['text'] for note in unit.get('editorialNotes', []))
    assert actual == body, f'Divergência literal no ordinal {ordinal}'
    assert unit.get('sourceLinks', []) == rows[ordinal]['links']
assert law['frontMatter'] == [r['text'] for r in rows[:6]]
assert law['closingMatter'] == [r['text'] for r in rows[102:]]
assert [n['label'] for n in law['structure']] == [rows[i]['text'] for i in (6, 50, 56, 63, 95)]
assert sum(len(u.get('editorialNotes', [])) for a in law['articles'] for u in a['clauses']) == 3
print('LEG06_REVERSE_CHECK_OK: 91 blocos, cinco divisões, front matter e fecho completos')
