#!/usr/bin/env python3
"""Cotejo reexecutável e conservador dos artigos 1–5 do CC e CPC.

Uso: python scripts/cotejar-biblioteca-lote04.py CC.html CPC.html
Requer apenas Python 3 e Node. O resultado é JSON na saída padrão.
Não modifica corpus, não atesta vigência e não suprime notas editoriais.
"""
import hashlib
import html
from html.parser import HTMLParser
from difflib import SequenceMatcher
import json
from pathlib import Path
import re
import subprocess
import sys


class Paragraphs(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.depth = 0
        self.current = []
        self.lines = []

    def handle_starttag(self, tag, attrs):
        if tag == 'p':
            if self.depth == 0:
                self.current = []
            self.depth += 1

    def handle_endtag(self, tag):
        if tag == 'p' and self.depth:
            self.depth -= 1
            if not self.depth:
                value = ' '.join(''.join(self.current).split())
                if value:
                    self.lines.append(value)

    def handle_data(self, data):
        if self.depth:
            self.current.append(data)


def normalize(value):
    value = html.unescape(value).replace('\u00a0', ' ')
    value = re.sub(r'\s+', ' ', value).strip()
    value = re.sub(r'\s+([,.;:!?])', r'\1', value)
    return value


EDITORIAL_CUES = re.compile(
    r'^\((?:[“\"\']?Caput|Artigo|Redação|Revogado|Revogada|Vigência|'
    r'Incluído|Incluída|Vide |Alterado|Alterada|NR\b)', re.I)


def note_ranges(text):
    return [(m.start(), m.end()) for m in re.finditer(r'\([^()]*\)', text)
            if EDITORIAL_CUES.match(m.group())]


def inside_note(ranges, start, end):
    # Uma inserção tem comprimento zero: exige que sua posição esteja dentro
    # de uma anotação (não basta ocorrer próxima a outra nota no artigo).
    return any(a <= start and end <= b for a, b in ranges)


def classify_difference(mirror, official):
    if mirror == official:
        return 'texto_normalizado_identico'
    a_ranges, b_ranges = note_ranges(mirror), note_ranges(official)
    changed = [(tag, i, j, k, l) for tag, i, j, k, l in
               SequenceMatcher(None, mirror, official, autojunk=False).get_opcodes()
               if tag != 'equal']
    if changed and all(inside_note(a_ranges, i, j) and inside_note(b_ranges, k, l)
                       for _, i, j, k, l in changed):
        return 'diferenca_aparente_restrita_a_nota_editorial_revisar'
    return 'diferenca_textual_exige_revisao'


def official_articles(raw, start=1, end=5):
    parser = Paragraphs()
    parser.feed(raw.decode('utf-8', errors='replace'))
    found = {}
    active = None
    for para in parser.lines:
        match = re.match(r'^Art\.\s*(\d+)[º°.]?\s', para, re.I)
        if match:
            active = int(match.group(1))
            if active > end:
                break
            if active >= start:
                found[active] = [para]
        elif active in found:
            # Títulos estruturais entre artigos não fazem parte do dispositivo anterior.
            # Mantém incisos/alinéas com redação, mesmo iniciados por numeral romano.
            if (para.startswith(('CAPÍTULO ', 'TÍTULO ', 'SEÇÃO ', 'LIVRO ', 'PARTE ', 'SUBSEÇÃO '))
                    or (len(para) < 180 and para.upper() == para and
                        not re.match(r'^(?:[IVXLCDM]+\s*[-–]|§\s*\d+)', para))):
                continue
            found[active].append(para)
    return {str(k): normalize(' '.join(v)) for k, v in found.items()}


def mirror_articles(start=1, end=5):
    js = r'''const fs=require('fs'),vm=require('vm');
const ctx={window:{}};
for(const f of ['dados/legislacao-s13.js','dados/codigos-cc-cpc.js'])
 vm.runInNewContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});
const out={};for(const law of ctx.window.AGU_LEGAL_CORPUS.laws){
 if(!['L10406','L13105'].includes(law.id))continue;
 out[law.id]={};for(let n=Number(process.argv[1]);n<=Number(process.argv[2]);n++){
  const a=law.articles.find(x=>x.id===law.id+':art'+n);
  out[law.id][n]=a?.clauses?.[0]?.text??null;
 }}process.stdout.write(JSON.stringify(out));'''
    return json.loads(subprocess.check_output(['node', '-e', js, str(start), str(end)], text=True))


def run(cc, cpc, start=1, end=5):
    mirror = mirror_articles(start, end)
    rows = []
    sources = [('L10406', cc), ('L13105', cpc)]
    for law, path in sources:
        raw = Path(path).read_bytes()
        official = official_articles(raw, start, end)
        for number in range(start, end + 1):
            left = normalize(mirror[law].get(str(number)) or '')
            right = official.get(str(number), '')
            rows.append({
                'id': f'{law}:art{number}',
                'mirror_present': bool(left),
                'official_present': bool(right),
                'exact_after_whitespace_normalization': bool(left and right and left == right),
                'comparison_class': classify_difference(left, right) if left and right else 'dispositivo_ausente',
                'mirror_sha256': hashlib.sha256(left.encode()).hexdigest(),
                'official_sha256': hashlib.sha256(right.encode()).hexdigest(),
                'mirror_excerpt': left[:180],
                'official_excerpt': right[:180],
            })
    return {'scope': f'artigos {start}–{end} de cada código, incluindo subdivisões e notas editoriais em parágrafos',
            'sources': {law: {'file': str(path), 'sha256': hashlib.sha256(Path(path).read_bytes()).hexdigest(),
                              'bytes': Path(path).stat().st_size} for law, path in sources},
            'rows': rows}


if __name__ == '__main__':
    if len(sys.argv) != 3:
        sys.exit('Uso: python scripts/cotejar-biblioteca-lote04.py CC.html CPC.html')
    print(json.dumps(run(*sys.argv[1:]), ensure_ascii=False, indent=2))
