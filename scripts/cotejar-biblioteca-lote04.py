#!/usr/bin/env python3
"""Cotejo reexecutável e conservador dos artigos 1–5 do CC e CPC.

Uso: python scripts/cotejar-biblioteca-lote04.py CC.html CPC.html
Requer apenas Python 3 e Node. O resultado é JSON na saída padrão.
Não modifica corpus, não atesta vigência e não suprime notas editoriais.
"""
import hashlib
import html
from html.parser import HTMLParser
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


def official_articles(raw):
    parser = Paragraphs()
    parser.feed(raw.decode('utf-8', errors='replace'))
    found = {}
    active = None
    for para in parser.lines:
        match = re.match(r'^Art\.\s*(\d+)[º°.]?\s', para, re.I)
        if match:
            active = int(match.group(1))
            if active > 5:
                break
            found[active] = [para]
        elif active in found:
            # Exclui títulos estruturais que interrompem a sequência de dispositivos.
            if para.startswith(('CAPÍTULO ', 'TÍTULO ', 'SEÇÃO ', 'LIVRO ')):
                continue
            found[active].append(para)
    return {str(k): normalize(' '.join(v)) for k, v in found.items()}


def mirror_articles():
    js = r'''const fs=require('fs'),vm=require('vm');
const ctx={window:{}};
for(const f of ['dados/legislacao-s13.js','dados/codigos-cc-cpc.js'])
 vm.runInNewContext(fs.readFileSync(f,'utf8'),ctx,{filename:f});
const out={};for(const law of ctx.window.AGU_LEGAL_CORPUS.laws){
 if(!['L10406','L13105'].includes(law.id))continue;
 out[law.id]={};for(let n=1;n<=5;n++){
  const a=law.articles.find(x=>x.id===law.id+':art'+n);
  out[law.id][n]=a?.clauses?.[0]?.text??null;
 }}process.stdout.write(JSON.stringify(out));'''
    return json.loads(subprocess.check_output(['node', '-e', js], text=True))


def run(cc, cpc):
    mirror = mirror_articles()
    rows = []
    sources = [('L10406', cc), ('L13105', cpc)]
    for law, path in sources:
        raw = Path(path).read_bytes()
        official = official_articles(raw)
        for number in range(1, 6):
            left = normalize(mirror[law].get(str(number)) or '')
            right = official.get(str(number), '')
            rows.append({
                'id': f'{law}:art{number}',
                'mirror_present': bool(left),
                'official_present': bool(right),
                'exact_after_whitespace_normalization': bool(left and right and left == right),
                'mirror_sha256': hashlib.sha256(left.encode()).hexdigest(),
                'official_sha256': hashlib.sha256(right.encode()).hexdigest(),
                'mirror_excerpt': left[:180],
                'official_excerpt': right[:180],
            })
    return {'scope': 'artigos 1–5 de cada código, incluindo subdivisões e notas editoriais em parágrafos',
            'sources': {law: {'file': str(path), 'sha256': hashlib.sha256(Path(path).read_bytes()).hexdigest(),
                              'bytes': Path(path).stat().st_size} for law, path in sources},
            'rows': rows}


if __name__ == '__main__':
    if len(sys.argv) != 3:
        sys.exit('Uso: python scripts/cotejar-biblioteca-lote04.py CC.html CPC.html')
    print(json.dumps(run(*sys.argv[1:]), ensure_ascii=False, indent=2))
