#!/usr/bin/env python3
"""Importação OFFLINE delimitada à captura oficial LEG-02. --check não escreve arquivos.
Normalização: entidades HTML decodificadas e espaços/quebras colapsados; palavras,
pontuação e grafia da Câmara preservadas. Notas editoriais segregadas, nunca apagadas.
"""
import argparse, hashlib, json, re
from html.parser import HTMLParser
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'fontes/lei9784/camara-20261113.html.txt'
DIGEST = '87cd4730fda84e28bdfc490c4cd6635b8eb86c98a4ab2daf29e380eb62c0a80b'
DATE = '2026-11-13'
VERSION = 'L9784@2026-11-13-camara-87cd4730'
URL = 'https://www2.camara.leg.br/legin/fed/lei/1999/lei-9784-29-janeiro-1999-322239-normaatualizada-pl.html'
class Paragraphs(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True); self.rows=[]; self.current=None
    def handle_starttag(self, tag, attrs):
        if tag=='p': self.current={'parts':[], 'links':[]}
        elif self.current is not None:
            if tag=='br': self.current['parts'].append('\n')
            if tag=='a' and dict(attrs).get('href'): self.current['links'].append(dict(attrs)['href'])
    def handle_data(self, data):
        if self.current is not None: self.current['parts'].append(data)
    def handle_endtag(self, tag):
        if tag=='p' and self.current is not None:
            text=' '.join(''.join(self.current['parts']).split())
            if text: self.rows.append({'text':text,'links':self.current['links']})
            self.current=None

def load_corpus():
    text=(ROOT/'dados/legislacao-s13.js').read_text()
    return json.JSONDecoder().raw_decode(text.split('root.AGU_LEGAL_CORPUS=',1)[1])[0]

def extract():
    raw=SOURCE.read_bytes(); assert hashlib.sha256(raw).hexdigest()==DIGEST, 'Captura diferente: requer novo cotejo e versão'
    p=Paragraphs(); p.feed(raw.decode('utf-8')); rows=p.rows
    assert len(rows)==271
    articles=[]; structure=[]; chapter=None; article=None; paragraph=None
    for ordinal,row in enumerate(rows[6:267],6):
        text=row['text']; notes=[]
        # Apenas notas editoriais identificadas, com parênteses internos preservados.
        note=re.search(r'\s*(\((?:Artigo|Parágrafo|Capítulo|Inciso) acrescido.*)$',text)
        if note:
            notes=[{'text':note[1], 'sourceLinks':row['links']}]; text=text[:note.start()].strip()
        if text.startswith('CAPÍTULO '):
            chapter={'id':'L9784:chapter'+text.split(' ',1)[1], 'kind':'chapter','parentId':None,'label':text+' — '+rows[ordinal+1]['text']}
            structure.append(chapter); continue
        if ordinal>6 and rows[ordinal-1]['text'].startswith('CAPÍTULO '): continue
        if not text:
            assert notes; chapter['editorialNotes']=notes; continue
        m=re.match(r'Art\.\s*(\d+(?:-[A-Z])?)[º.]?\s+(.*)',text)
        if m:
            number,body=m.groups(); aid='L9784:art'+number
            article={'id':aid,'label':'Art. '+number,'topic':{'11':'ADM-06','12':'ADM-06','13':'ADM-06','14':'ADM-06','15':'ADM-06','50':'ADM-17'}.get(number), 'contentKind':'isolated_article','structurePath':[chapter['id']], 'clauses':[]}
            articles.append(article); paragraph=None; uid=aid+':caput'; label='Caput'; kind='caput'; parent=aid
        else:
            aid=article['id']
            m=re.match(r'§\s*(\d+)[º.]?\s+(.*)',text)
            if m:
                num,body=m.groups(); uid=aid+':p'+num; label='§ '+num+'º'; kind='paragraph'; parent=aid; paragraph=uid
            elif text.startswith('Parágrafo único.'):
                body=text[len('Parágrafo único.'):].strip(); uid=aid+':pu'; label='Parágrafo único'; kind='paragraph'; parent=aid; paragraph=uid
            else:
                m=re.match(r'([IVXLCDM]+)\s*-\s*(.*)',text)
                assert m, f'Parágrafo não classificado {ordinal}: {text}'
                num,body=m.groups(); parent=paragraph or aid; uid=parent+':'+num; label='Inciso '+num; kind='item'
        unit={'id':uid,'label':label,'text':body,'kind':kind,'parentId':parent,'sourceOrdinal':ordinal}
        if notes: unit['editorialNotes']=notes
        if row['links']: unit['sourceLinks']=row['links']
        if body.startswith('(VETADO'): unit['textStatus']='veto_placeholder'
        article['clauses'].append(unit)
    assert len(articles)==80 and len(structure)==19
    assert articles[-1]['id']=='L9784:art70'
    return {'articles':articles,'structure':structure,'frontMatter':[r['text'] for r in rows[2:6]],'closingMatter':[r['text'] for r in rows[267:]]}

def build(corpus):
    law=next(l for l in corpus['laws'] if l['id']=='L9784')
    law.update(extract())
    law.update(section='Texto integral · 19 capítulos', checkedOn=DATE,source=URL,sourceAuthority='Câmara dos Deputados — Centro de Documentação e Informação',sourceVersion='Texto atualizado da Câmara; captura de 13/11/2026 (inclui Lei 14.210/2021)',textVersionId=VERSION,contentCoverage='integral',textVerification={'status':'compared','checkedOn':DATE,'scope':'full_norm','note':'Cotejo de todos os parágrafos da captura; normalização apenas de espaços/HTML. Não certifica vigência nem auditoria jurídica.'},sourceCapture={'path':'fontes/lei9784/camara-20261113.html.txt','finalUrl':URL,'bytes':SOURCE.stat().st_size,'digest':'sha256:'+DIGEST,'normalization':'HTML entities decoded; whitespace collapsed; editorial amendment notes separated; spelling/case/punctuation unchanged'},completeness={'expectedArticleIds':[a['id'] for a in law['articles']],'checkedOn':DATE,'sourceDigest':'sha256:'+DIGEST,'annexes':'not_applicable'})
    corpus['cutoff']=DATE
    return corpus

def main():
    args=argparse.ArgumentParser(); args.add_argument('--check',action='store_true'); opt=args.parse_args()
    corpus=load_corpus(); actual=build(json.loads(json.dumps(corpus)))
    if opt.check:
        assert corpus==actual, 'Corpus diverge da extração da fonte oficial capturada'
        print('LEG02_SOURCE_CHECK_OK: 80 artigos, 19 capítulos; todos os textos, notas editoriais e ordem conferidos')
    else:
        target=ROOT/'dados/legislacao-s13.js'
        target.write_text('/* Corpus público S13 — Lei 9.784 integral LEG-02; IDs e vínculos legados preservados. */\n(function(root){\'use strict\';root.AGU_LEGAL_CORPUS='+json.dumps(actual,ensure_ascii=False,indent=2)+';})(window);\n')
        print('LEG02 corpus gerado offline a partir da captura oficial fixada')
if __name__=='__main__': main()
