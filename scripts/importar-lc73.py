#!/usr/bin/env python3
"""LEG04: importação offline delimitada da LC73. --check não escreve; --write
altera apenas LC73 e o corte global. Captura inclui p e h1..h6 (Capítulo IX é h2).
"""
import argparse,hashlib,json,re
from html.parser import HTMLParser
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'fontes/lc73/camara-20261114.html.txt'
DIGEST='148726cf24d3704d3c89894ed0be64b2092c60a826dfbfedfbb45245e05966e7'
DATE='2026-11-14';VERSION='LC73@2026-11-14-camara-148726cf'
URL='https://www2.camara.leg.br/legin/fed/leicom/1993/leicomplementar-73-10-fevereiro-1993-354947-normaatualizada-pl.html'
class Blocks(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True);self.rows=[];self.current=None
    def handle_starttag(self,tag,attrs):
        if tag in ['p','h1','h2','h3','h4','h5','h6']:
            assert self.current is None,'Blocos normativos aninhados não previstos';self.current={'tag':tag,'parts':[],'links':[]}
        elif self.current is not None:
            if tag=='br':self.current['parts'].append('\n')
            if tag=='a' and dict(attrs).get('href'):self.current['links'].append(dict(attrs)['href'])
    def handle_data(self,data):
        if self.current is not None:self.current['parts'].append(data)
    def handle_endtag(self,tag):
        if self.current is not None and tag==self.current['tag']:
            text=' '.join(''.join(self.current['parts']).split())
            if text:self.rows.append({'tag':tag,'text':text,'links':self.current['links']})
            self.current=None

def extract():
    raw=SOURCE.read_bytes();assert hashlib.sha256(raw).hexdigest()==DIGEST,'Captura alterada: exige nova versão e cotejo'
    p=Blocks();p.feed(raw.decode('utf-8'));rows=p.rows;assert len(rows)==279
    articles=[];structure=[];title=chapter=section=None;article=None;paragraph=item=None
    for ordinal,row in enumerate(rows[6:276],6):
        text=row['text'];notes=[]
        note=re.search(r'\s*(\((?:Vide|Artigo|Parágrafo|Inciso|Alínea|Caput)\b.*)$',text,re.I)
        if note:notes=[{'text':note[1],'sourceLinks':row['links']}];text=text[:note.start()].strip()
        m=re.fullmatch(r'(TÍTULO|CAPÍTULO|Seção) ([IVXLCDM]+)',text)
        if m:
            kind,num=m.groups()
            if kind=='TÍTULO':node={'id':'LC73:title'+num,'kind':'title','parentId':None};title=node;chapter=section=None
            elif kind=='CAPÍTULO':node={'id':title['id']+':chapter'+num,'kind':'chapter','parentId':title['id']};chapter=node;section=None
            else:
                assert chapter;node={'id':chapter['id']+':section'+num,'kind':'section','parentId':chapter['id']};section=node
            node['label']=text+' — '+rows[ordinal+1]['text'];structure.append(node);continue
        if re.fullmatch(r'(TÍTULO|CAPÍTULO|Seção) [IVXLCDM]+',rows[ordinal-1]['text']):continue
        m=re.match(r'Art\.\s*(\d+(?:-[A-Z])?)[º.]?\s+(.*)',text)
        if m:
            number,body=m.groups();aid='LC73:art'+number
            article={'id':aid,'label':'Art. '+number,'topic':None,'contentKind':'isolated_article','structurePath':[x['id'] for x in [title,chapter,section] if x],'clauses':[]};articles.append(article)
            paragraph=item=None;uid=aid+':caput';label='Caput';kind='caput';parent=aid
        else:
            aid=article['id'];m=re.match(r'§\s*(\d+)[º.]?\s+(.*)',text)
            if m:
                num,body=m.groups();uid=aid+':p'+num;label='§ '+num+('º' if int(num)<10 else '.');kind='paragraph';parent=aid;paragraph=uid;item=None
            elif text.startswith('Parágrafo único.'):
                body=text[len('Parágrafo único.'):].strip();uid=aid+':pu';label='Parágrafo único';kind='paragraph';parent=aid;paragraph=uid;item=None
            elif (m:=re.match(r'([IVXLCDM]+)\s*[-–]\s*(.*)',text)):
                num,body=m.groups();parent=paragraph or aid;uid=parent+':'+num;label='Inciso '+num;kind='item';item=uid
            elif (m:=re.match(r'([a-z])\)\s*(.*)',text)):
                num,body=m.groups();assert item;parent=item;uid=parent+':'+num;label='Alínea '+num;kind='subitem'
            else:raise AssertionError(f'Bloco sem classificação {ordinal}: {text}')
        unit={'id':uid,'label':label,'text':body,'kind':kind,'parentId':parent,'sourceOrdinal':ordinal}
        if notes:unit['editorialNotes']=notes
        if row['links']:unit['sourceLinks']=row['links']
        if re.match(r'\(vetado\b',body,re.I):unit['textStatus']='veto_placeholder'
        article['clauses'].append(unit)
    assert len(articles)==73 and len(structure)==25
    assert articles[-1]['id']=='LC73:art73'
    for number in [66,67,69]:
        next(a for a in articles if a['id']=='LC73:art'+str(number))['sourceNotices']=[{'text':'Disposição transitória com prazo contado da vigência/publicação da lei de 1993. A reprodução não reinicia esse prazo. Confira o texto e as remissões oficiais; seus efeitos atuais não foram certificados.','url':URL}]
    next(a for a in articles if a['id']=='LC73:art28')['sourceNotices']=[{'text':'A nota da Câmara remete à ADI 4.652/2011 no inciso III. A reprodução literal não substitui a consulta à decisão e ao alcance da interpretação constitucional. Não houve revalidação jurisprudencial nesta sprint.','url':URL}]
    return {'id':'LC73','title':'Lei Complementar 73/1993 — Lei Orgânica da AGU','kind':'complementary_law','number':'73','year':1993,'section':'Texto integral · títulos, capítulos e seções','source':URL,'sourceAuthority':'Câmara dos Deputados — Centro de Documentação e Informação','sourceVersion':'Texto atualizado da Câmara; captura de 14/11/2026','checkedOn':DATE,'auditStatus':'parcial_nao_certificado','textVersionId':VERSION,'contentCoverage':'integral','textVerification':{'status':'compared','checkedOn':DATE,'scope':'full_norm','note':'Cotejo integral da captura oficial; não certifica vigência, remissões ou alcance jurisprudencial.'},'structure':structure,'articles':articles,'frontMatter':[r['text'] for r in rows[2:6]],'closingMatter':[r['text'] for r in rows[276:]],'sourceCapture':{'path':'fontes/lc73/camara-20261114.html.txt','finalUrl':URL,'bytes':len(raw),'digest':'sha256:'+DIGEST,'normalization':'Entidades HTML decodificadas e espaços/quebras colapsados; p e h1..h6 capturados, incluindo Capítulo IX em h2; rótulos separados do corpo, grafia/pontuação preservadas; notas de remissão segregadas.'},'completeness':{'expectedArticleIds':[a['id'] for a in articles],'checkedOn':DATE,'sourceDigest':'sha256:'+DIGEST,'annexes':'not_applicable'}}

def main():
    ap=argparse.ArgumentParser();g=ap.add_mutually_exclusive_group(required=True);g.add_argument('--check',action='store_true');g.add_argument('--write',action='store_true');opt=ap.parse_args()
    target=ROOT/'dados/legislacao-s13.js';corpus=json.JSONDecoder().raw_decode(target.read_text().split('root.AGU_LEGAL_CORPUS=',1)[1])[0];law=extract()
    if opt.check:
        assert next(l for l in corpus['laws'] if l['id']=='LC73')==law,'LC73 diverge da captura'
        print('LEG04_SOURCE_CHECK_OK',len(law['articles']),sum(len(a['clauses']) for a in law['articles']),len(law['structure']))
    else:
        i=next((i for i,l in enumerate(corpus['laws']) if l['id']=='LC73'),None)
        if i is None:corpus['laws'].append(law)
        else:corpus['laws'][i]=law
        corpus['cutoff']=DATE
        target.write_text('/* Corpus público S13 — normas integrais LEG02–04 e seleção CF; IDs anteriores preservados. */\n(function(root){\'use strict\';root.AGU_LEGAL_CORPUS='+json.dumps(corpus,ensure_ascii=False,indent=2)+';})(window);\n')
        print('LEG04 corpus gerado',len(law['articles']),sum(len(a['clauses']) for a in law['articles']),len(law['structure']))
if __name__=='__main__':main()
