#!/usr/bin/env python3
"""LEG-03: extração offline específica da captura consolidada oficial da LRF.
Não acessa rede nem dados pessoais. --check apenas compara; --write incorpora LC101.
"""
import argparse, hashlib, json, re
from html.parser import HTMLParser
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'fontes/lc101/camara-20261113.html.txt'
DIGEST='9e178a491fd3ba44c4956316bc9ef602a5d544b2fa5d8a52abaa2e6bac3de691'
DATE='2026-11-13'
URL='https://www2.camara.leg.br/legin/fed/leicom/2000/leicomplementar-101-4-maio-2000-351480-normaatualizada-pl.html'
VERSION='LC101@2026-11-13-camara-9e178a49'
class Paragraphs(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True);self.rows=[];self.current=None
    def handle_starttag(self,tag,attrs):
        if tag=='p':self.current={'parts':[],'links':[]}
        elif self.current is not None:
            if tag=='br':self.current['parts'].append('\n')
            if tag=='a' and dict(attrs).get('href'):self.current['links'].append(dict(attrs)['href'])
    def handle_data(self,data):
        if self.current is not None:self.current['parts'].append(data)
    def handle_endtag(self,tag):
        if tag=='p' and self.current is not None:
            text=' '.join(''.join(self.current['parts']).split())
            if text:self.rows.append({'text':text,'links':self.current['links']})
            self.current=None

def extract():
    raw=SOURCE.read_bytes();assert hashlib.sha256(raw).hexdigest()==DIGEST,'Captura mudou: novo cotejo/versão obrigatórios'
    p=Paragraphs();p.feed(raw.decode('utf-8'));rows=p.rows;assert len(rows)==633
    articles=[];structure=[];chapter=section=subsection=None;article=None;paragraph=item=subitem=None
    for ordinal,row in enumerate(rows[6:629],6):
        text=row['text'];notes=[]
        note=re.search(r'\s*(\((?:[“\"]?Caput[”\"]?|Artigo|Parágrafo|Inciso|Alínea|Expressão|Vide|Seção|Subseção)\b.*)$',text,re.I)
        if note:notes=[{'text':note[1],'sourceLinks':row['links']}];text=text[:note.start()].strip()
        m=re.fullmatch(r'(CAPÍTULO|Seção|Subseção) ([IVXLCDM]+)',text)
        if m:
            kind,num=m.groups()
            if kind=='CAPÍTULO':node={'id':'LC101:chapter'+num,'kind':'chapter','parentId':None};chapter=node;section=subsection=None
            elif kind=='Seção':node={'id':chapter['id']+':section'+num,'kind':'section','parentId':chapter['id']};section=node;subsection=None
            else:
                assert section;node={'id':section['id']+':subsection'+num,'kind':'subsection','parentId':section['id']};subsection=node
            node['label']=text+' — '+rows[ordinal+1]['text'];structure.append(node);continue
        if re.fullmatch(r'(CAPÍTULO|Seção|Subseção) [IVXLCDM]+',rows[ordinal-1]['text']):continue
        assert text, f'Nota sem dispositivo em {ordinal}'
        m=re.match(r'Art\.\s*(\d+(?:-[A-Z])?)[º.]?\s+(.*)',text)
        if m:
            number,body=m.groups();aid='LC101:art'+number
            article={'id':aid,'label':'Art. '+number,'topic':None,'contentKind':'isolated_article','structurePath':[x['id'] for x in [chapter,section,subsection] if x],'clauses':[]}
            articles.append(article);paragraph=item=subitem=None;uid=aid+':caput';label='Caput';kind='caput';parent=aid
        else:
            aid=article['id'];m=re.match(r'§\s*(\d+)[º.]?\s+(.*)',text)
            if m:
                num,body=m.groups();uid=aid+':p'+num;label='§ '+num+('º' if int(num)<10 else '.');kind='paragraph';parent=aid;paragraph=uid;item=subitem=None
            elif text.startswith('Parágrafo único.'):
                body=text[len('Parágrafo único.'):].strip();uid=aid+':pu';label='Parágrafo único';kind='paragraph';parent=aid;paragraph=uid;item=subitem=None
            elif (m:=re.match(r'([IVXLCDM]+)\s*[-–]\s*(.*)',text)):
                num,body=m.groups();parent=paragraph or aid;uid=parent+':'+num;label='Inciso '+num;kind='item';item=uid;subitem=None
            elif (m:=re.match(r'([a-z])\)\s*(.*)',text)):
                num,body=m.groups();assert item;parent=item;uid=parent+':'+num;label='Alínea '+num;kind='subitem';subitem=uid
            elif (m:=re.match(r'(\d+)[.)]\s*(.*)',text)):
                num,body=m.groups();assert subitem;parent=subitem;uid=parent+':n'+num;label='Item '+num;kind='point'
            else:raise AssertionError(f'Parágrafo não classificado {ordinal}: {text}')
        unit={'id':uid,'label':label,'text':body,'kind':kind,'parentId':parent,'sourceOrdinal':ordinal}
        if notes:unit['editorialNotes']=notes
        if row['links']:unit['sourceLinks']=row['links']
        if body.startswith('(VETADO'):unit['textStatus']='veto_placeholder'
        elif re.search(r'declarad[oa] inconstitucional',' '.join(n['text'] for n in notes),re.I):unit['textStatus']='declared_unconstitutional_in_source'
        elif re.match(r'\(?revogad[oa]',body,re.I):unit['textStatus']='revoked_in_source'
        # A Câmara mantém os quatro itens do art. 55, III, b no mesmo <p>.
        # Desdobramento explícito: nenhum texto desaparece; ordem/ordinal comuns.
        points=list(re.finditer(r' (?P<n>[1-4])\) ',body)) if uid=='LC101:art55:III:b' else []
        if points:
            assert [m['n'] for m in points]==['1','2','3','4']
            unit['text']=body[:points[0].start()];unit['sourcePart']=0
        article['clauses'].append(unit)
        for j,m in enumerate(points):
            article['clauses'].append({'id':uid+':n'+m['n'],'label':'Item '+m['n'],'text':body[m.end():points[j+1].start() if j+1<len(points) else len(body)],'kind':'point','parentId':uid,'sourceOrdinal':ordinal,'sourcePart':j+1})
    assert len(articles)==83
    assert len({u['id'] for a in articles for u in a['clauses']})==sum(len(a['clauses']) for a in articles),'ID duplicado'
    next(a for a in articles if a['id']=='LC101:art14-A')['sourceNotices']=[{'text':'A página de dados da Câmara registra não aplicação do art. 14-A pela LC 235/2026. Consulte a norma específica; o alcance jurídico dessa ressalva não foi auditado.','url':'https://www2.camara.leg.br/legin/fed/leicom/2026/leicomplementar-235-27-agosto-2026-799870-norma-pl.html'}]
    next(a for a in articles if a['id']=='LC101:art41-A')['sourceNotices']=[{'text':'O próprio caput prevê aplicação a partir de 1º de janeiro de 2027. A inclusão no corpus não antecipa esse marco temporal.','url':URL}]
    return {'id':'LC101','title':'Lei Complementar 101/2000 — LRF','kind':'complementary_law','number':'101','year':2000,'section':'Texto integral com capítulos, seções e subseções','source':URL,'sourceAuthority':'Câmara dos Deputados — Centro de Documentação e Informação','sourceVersion':'Texto atualizado da Câmara; captura de 13/11/2026','checkedOn':DATE,'auditStatus':'parcial_nao_certificado','textVersionId':VERSION,'contentCoverage':'integral','textVerification':{'status':'compared','checkedOn':DATE,'scope':'full_norm','note':'Cotejo da captura oficial completa; não certifica vigência ou alcance das ressalvas judiciais/temporais.'},'structure':structure,'articles':articles,'frontMatter':[r['text'] for r in rows[2:6]],'closingMatter':[r['text'] for r in rows[629:]],'sourceCapture':{'path':'fontes/lc101/camara-20261113.html.txt','finalUrl':URL,'bytes':len(raw),'digest':'sha256:'+DIGEST,'normalization':'Entidades HTML decodificadas; espaços/quebras colapsados; marcadores separados dos corpos; notas editoriais segregadas; grafia/capitalização/pontuação do corpo preservadas.'},'completeness':{'expectedArticleIds':[a['id'] for a in articles],'checkedOn':DATE,'sourceDigest':'sha256:'+DIGEST,'annexes':'not_applicable'}}

def main():
    ap=argparse.ArgumentParser();g=ap.add_mutually_exclusive_group(required=True);g.add_argument('--check',action='store_true');g.add_argument('--write',action='store_true');opt=ap.parse_args()
    target=ROOT/'dados/legislacao-s13.js';corpus=json.JSONDecoder().raw_decode(target.read_text().split('root.AGU_LEGAL_CORPUS=',1)[1])[0];law=extract()
    if opt.check:
        assert next(l for l in corpus['laws'] if l['id']=='LC101')==law,'LC101 difere da extração oficial fixada'
        print('LEG03_SOURCE_CHECK_OK',len(law['articles']),sum(len(a['clauses']) for a in law['articles']),len(law['structure']))
    else:
        index=next((i for i,l in enumerate(corpus['laws']) if l['id']=='LC101'),None)
        if index is None:corpus['laws'].append(law)
        else:corpus['laws'][index]=law
        target.write_text('/* Corpus público S13 — normas integrais LEG02/LEG03 e seleção CF, com IDs preservados. */\n(function(root){\'use strict\';root.AGU_LEGAL_CORPUS='+json.dumps(corpus,ensure_ascii=False,indent=2)+';})(window);\n')
        print('LEG03 corpus gerado',len(law['articles']),sum(len(a['clauses']) for a in law['articles']),len(law['structure']))
if __name__=='__main__':main()
