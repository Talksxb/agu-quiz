#!/usr/bin/env python3
"""LEG06: importa exclusivamente a Lei 4.717/1965 de captura oficial fixada.

--check é somente leitura; --write gera corpus e manifesto LEG06. Não
moderniza grafia, não reconstrói versões antigas nem certifica vigência.
"""
import argparse
import hashlib
import json
import re
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'fontes/acao-popular/camara-20261114.html.txt'
DIGEST = 'd8a1fc6018aef37449d62119277fcaeab9ea779d084b44c0a9cd620a59268234'
URL = 'https://www2.camara.leg.br/legin/fed/lei/1960-1969/lei-4717-29-junho-1965-377818-normaatualizada-pl.html'
DATE = '2026-11-14'
VERSION = 'L4717@2026-11-14-camara-d8a1fc60'
HEADINGS = {
    6: ('acao-popular', 'DA AÇÃO POPULAR'),
    50: ('competencia', 'DA COMPETÊNCIA'),
    56: ('sujeitos', 'DOS SUJEITOS PASSIVOS DA AÇÃO E DOS ASSISTENTES'),
    63: ('processo', 'DO PROCESSO'),
    95: ('gerais', 'DISPOSIÇÕES GERAIS'),
}


class Blocks(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.rows = []
        self.current = None

    def handle_starttag(self, tag, attrs):
        if tag in ('p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6'):
            assert self.current is None
            self.current = {'tag': tag, 'parts': [], 'links': []}
        elif self.current is not None:
            if tag == 'br':
                self.current['parts'].append('\n')
            if tag == 'a' and dict(attrs).get('href'):
                self.current['links'].append(dict(attrs)['href'])

    def handle_data(self, data):
        if self.current is not None:
            self.current['parts'].append(data)

    def handle_endtag(self, tag):
        if self.current is not None and tag == self.current['tag']:
            value = ' '.join(''.join(self.current['parts']).split())
            if value:
                self.rows.append({'tag': tag, 'text': value, 'links': self.current['links']})
            self.current = None


def split_note(value, links):
    match = re.search(r'\s*(\((?:Parágrafo|Artigo)\s+(?:com redação|acrescido)\b.*\))$', value)
    if match:
        return value[:match.start()].strip(), [{'text': match[1], 'sourceLinks': links}]
    return value, []


def capture():
    raw = SOURCE.read_bytes()
    assert len(raw) == 59036 and hashlib.sha256(raw).hexdigest() == DIGEST, 'Captura alterada: novo cotejo e versão necessários'
    parser = Blocks()
    parser.feed(raw.decode('utf-8'))
    assert len(parser.rows) == 105
    return parser.rows, raw


def extract():
    rows, raw = capture()
    assert [r['text'] for r in rows[:6]] == [
        'CÂMARA DOS DEPUTADOS', 'Centro de Documentação e Informação',
        'LEI Nº 4.717, DE 29 DE JUNHO DE 1965', 'Regula a Ação Popular.',
        'O PRESIDENTE DA REPÚBLICA',
        'Faço saber que o CONGRESSO NACIONAL decreta e eu sanciono a seguinte Lei:',
    ]
    structure = []
    articles = []
    section = None
    article = None
    paragraph = None
    item = None
    for ordinal, row in enumerate(rows[6:102], 6):
        if ordinal in HEADINGS:
            slug, label = HEADINGS[ordinal]
            assert row['text'] == label
            section = 'L4717:section-' + slug
            structure.append({'id': section, 'kind': 'section', 'parentId': None, 'label': label})
            article = None
            paragraph = item = None
            continue
        value, notes = split_note(row['text'], row['links'])
        if match := re.fullmatch(r'Art\.\s*(\d+)[º.]?\s+(.*)', value):
            number, body = match.groups()
            aid = 'L4717:art' + number
            article = {'id': aid, 'label': 'Art. ' + number, 'topic': None,
                       'contentKind': 'isolated_article', 'structurePath': [section], 'clauses': []}
            articles.append(article)
            uid, label, kind, parent = aid + ':caput', 'Caput', 'caput', aid
            paragraph = item = None
        else:
            assert article is not None, 'Dispositivo fora de artigo: ' + str(ordinal)
            aid = article['id']
            if match := re.fullmatch(r'§\s*(\d+)[º.]?\s+(.*)', value):
                number, body = match.groups()
                uid, label, kind, parent = aid + ':p' + number, '§ ' + number + ('º' if int(number) < 10 else '.'), 'paragraph', aid
                paragraph, item = uid, None
            elif value.startswith('Parágrafo único.'):
                body = value[len('Parágrafo único.'):].strip()
                uid, label, kind, parent = aid + ':pu', 'Parágrafo único', 'paragraph', aid
                paragraph, item = uid, None
            elif match := re.fullmatch(r'([IVXLCDM]+)\s*[-–]\s*(.*)', value):
                number, body = match.groups()
                uid, label, kind, parent = aid + ':' + number, 'Inciso ' + number, 'item', aid
                item, paragraph = uid, None
            elif match := re.fullmatch(r'([a-z])\)\s*(.*)', value):
                number, body = match.groups()
                parent = item or paragraph or aid
                uid, label, kind = parent + ':' + number, 'Alínea ' + number, 'subitem'
            else:
                raise AssertionError('Bloco não classificado ' + str(ordinal) + ': ' + value)
        unit = {'id': uid, 'label': label, 'text': body, 'kind': kind,
                'parentId': parent, 'sourceOrdinal': ordinal}
        if notes:
            unit['editorialNotes'] = notes
        if row['links']:
            unit['sourceLinks'] = row['links']
        article['clauses'].append(unit)

    assert [a['id'] for a in articles] == ['L4717:art' + str(n) for n in range(1, 23)]
    assert len(structure) == 5
    assert sum(len(a['clauses']) for a in articles) == 91
    assert rows[102]['text'].startswith('Brasília, 29 de junho de 1965')
    assert [r['text'] for r in rows[103:]] == ['H. CASTELLO BRANCO', 'Milton Soares Campos']
    law = {
        'id': 'L4717', 'title': 'Lei 4.717/1965 — Ação Popular', 'kind': 'law',
        'number': '4717', 'year': 1965, 'section': 'Texto integral · cinco divisões da fonte',
        'source': URL, 'sourceAuthority': 'Câmara dos Deputados — Centro de Documentação e Informação',
        'sourceVersion': 'Texto atualizado da Câmara; captura de 14/11/2026',
        'checkedOn': DATE, 'auditStatus': 'parcial_nao_certificado',
        'textVersionId': VERSION, 'contentCoverage': 'integral',
        'textVerification': {'status': 'compared', 'checkedOn': DATE, 'scope': 'full_norm',
                             'note': 'Cotejo textual integral da Câmara; não certifica vigência, recepção constitucional, aplicabilidade de regras processuais ou competência.'},
        'structure': structure, 'articles': articles,
        'frontMatter': [r['text'] for r in rows[:6]],
        'closingMatter': [r['text'] for r in rows[102:]],
        'sourceCapture': {'path': 'fontes/acao-popular/camara-20261114.html.txt',
                          'finalUrl': URL, 'bytes': len(raw), 'digest': 'sha256:' + DIGEST,
                          'normalization': 'Entidades HTML e espaços/quebras normalizados; rótulos separados; grafia, pontuação e remissões históricas preservadas; três notas editoriais apartadas do texto. Cinco cabeçalhos de divisão e fecho conservados. Sem inferência de vigência.'},
        'completeness': {'expectedArticleIds': [a['id'] for a in articles],
                         'checkedOn': DATE, 'sourceDigest': 'sha256:' + DIGEST,
                         'annexes': 'not_applicable'},
    }
    return law


def main():
    arg = argparse.ArgumentParser()
    group = arg.add_mutually_exclusive_group(required=True)
    group.add_argument('--check', action='store_true')
    group.add_argument('--write', action='store_true')
    opt = arg.parse_args()
    target = ROOT / 'dados/legislacao-s13.js'
    corpus = json.JSONDecoder().raw_decode(target.read_text().split('root.AGU_LEGAL_CORPUS=', 1)[1])[0]
    law = extract()
    if opt.check:
        assert next(l for l in corpus['laws'] if l['id'] == 'L4717') == law, 'L4717 diverge da captura'
        print('LEG06_SOURCE_CHECK_OK 22 artigos, 91 unidades, cinco divisões')
    else:
        assert not any(l['id'] == 'L4717' for l in corpus['laws']), 'Não sobrescrever corpus existente'
        corpus['laws'].append(law)
        corpus['cutoff'] = DATE
        target.write_text('/* Corpus público S13 — normas integrais LEG02–06 e seleção CF; IDs anteriores preservados. */\n'
                          "(function(root){'use strict';root.AGU_LEGAL_CORPUS=" +
                          json.dumps(corpus, ensure_ascii=False, indent=2) + ';})(window);\n')
        manifest = {'sourceDigest': 'sha256:' + DIGEST,
                    'sourceBytes': 59036,
                    'structure': structure_manifest(law),
                    'articles': [{'id': a['id'], 'path': a['structurePath'],
                                  'units': [{'id': u['id'], 'parentId': u['parentId'],
                                             'sourceOrdinal': u['sourceOrdinal'],
                                             'textSha256': hashlib.sha256(u['text'].encode()).hexdigest()}
                                            for u in a['clauses']]} for a in law['articles']]}
        (ROOT / 'tests/fixtures/leg06-manifesto.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
        print('LEG06 corpus/manifesto gerados: 22 artigos, 91 unidades, cinco divisões')


def structure_manifest(law):
    return [{'id': n['id'], 'label': n['label'], 'kind': n['kind'], 'parentId': n['parentId']}
            for n in law['structure']]


if __name__ == '__main__':
    main()
