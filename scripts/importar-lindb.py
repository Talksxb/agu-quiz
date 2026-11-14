#!/usr/bin/env python3
"""LEG05: LINDB da captura oficial fixada. --check não escreve; --write só
incorpora DL4657 e o corte global. Não cria divisões inexistentes na fonte.
"""
import argparse,hashlib,json,re
from html.parser import HTMLParser
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
SOURCE=ROOT/'fontes/lindb/camara-20261114.html.txt'
DIGEST='e2aa961baf8e36b8583c7b0a2b41b57b36f3ec02091ddbed571e4c41adbefca6'
DATE='2026-11-14';VERSION='DL4657@2026-11-14-camara-e2aa961b'
URL='https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-4657-4-setembro-1942-414605-normaatualizada-pe.html'
class Blocks(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True);self.rows=[];self.current=None
    def handle_starttag(self,tag,attrs):
        if tag in ['p','h1','h2','h3','h4','h5','h6']:
            assert self.current is None;self.current={'tag':tag,'parts':[],'links':[]}
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

def split_note(text,links):
    # Marcadores de veto/revogação não são removidos: são unidades sinalizadas.
    m=re.search(r'\s*(\((?:[“\"]?Caput[”\"]?|Ementa|Artigo|Parágrafo|Inciso|Alínea|Vide)\b.*)$',text,re.I)
    return (text[:m.start()].strip(),[{'text':m[1],'sourceLinks':links}]) if m else (text,[])

def extract():
    raw=SOURCE.read_bytes();assert hashlib.sha256(raw).hexdigest()==DIGEST,'Captura alterada: novo cotejo/versão exigidos'
    p=Blocks();p.feed(raw.decode('utf-8'));rows=p.rows;assert len(rows)==105
    articles=[];article=None;paragraph=item=None
    for ordinal,row in enumerate(rows[5:94],5):
        text,notes=split_note(row['text'],row['links'])
        m=re.match(r'Art\.\s*(\d+(?:-[A-Z])?)[ºo.]?\s+(.*)',text)
        if m:
            number,body=m.groups();aid='DL4657:art'+number
            article={'id':aid,'label':'Art. '+number,'topic':None,'contentKind':'isolated_article','structurePath':[],'clauses':[]};articles.append(article)
            paragraph=item=None;uid=aid+':caput';label='Caput';kind='caput';parent=aid
        else:
            aid=article['id'];m=re.match(r'§\s*(\d+)[ºo.]?\s+(.*)',text)
            if m:
                num,body=m.groups();uid=aid+':p'+num;label='§ '+num+('º' if int(num)<10 else '.');kind='paragraph';parent=aid;paragraph=uid;item=None
            elif text.startswith('Parágrafo único.'):
                body=text[len('Parágrafo único.'):].strip();uid=aid+':pu';label='Parágrafo único';kind='paragraph';parent=aid;paragraph=uid;item=None
            elif (m:=re.match(r'([IVXLCDM]+)\s*[-–]\s*(.*)',text)):
                num,body=m.groups();parent=paragraph or aid;uid=parent+':'+num;label='Inciso '+num;kind='item';item=uid
            elif (m:=re.match(r'([a-z])\)\s*(.*)',text)):
                # Art.15 tem alíneas diretamente subordinadas ao artigo.
                num,body=m.groups();parent=item or paragraph or aid;uid=parent+':'+num;label='Alínea '+num;kind='subitem'
            else:raise AssertionError(f'Bloco sem classificação {ordinal}: {text}')
        unit={'id':uid,'label':label,'text':body,'kind':kind,'parentId':parent,'sourceOrdinal':ordinal}
        if notes:unit['editorialNotes']=notes
        if row['links']:unit['sourceLinks']=row['links']
        if re.match(r'\(vetado\b',body,re.I):unit['textStatus']='veto_placeholder'
        elif re.match(r'\(revogado\b',body,re.I):unit['textStatus']='revoked_in_source'
        article['clauses'].append(unit)
    assert len(articles)==30
    next(a for a in articles if a['id']=='DL4657:art15')['sourceNotices']=[{'text':'Na alínea e, a própria fonte remete ao art. 105, I, i, da Constituição, com redação da EC 45/2004. A reprodução do corpo não reafirma a competência ali mencionada; confira a remissão oficial antes da aplicação.','url':URL}]
    next(a for a in articles if a['id']=='DL4657:art19')['sourceNotices']=[{'text':'O parágrafo único contém prazo transitório vinculado à publicação da lei que acresceu o artigo. A reprodução não reinicia esse prazo; confira a nota oficial.','url':URL}]
    ementa,ementa_notes=split_note(rows[3]['text'],rows[3]['links'])
    return {'id':'DL4657','title':'Decreto-Lei 4.657/1942 — LINDB','kind':'decree_law','number':'4657','year':1942,'section':'Texto integral · sem divisões formais','source':URL,'sourceAuthority':'Câmara dos Deputados — Centro de Documentação e Informação','sourceVersion':'Texto atualizado da Câmara; captura de 14/11/2026','checkedOn':DATE,'auditStatus':'parcial_nao_certificado','textVersionId':VERSION,'contentCoverage':'integral','textVerification':{'status':'compared','checkedOn':DATE,'scope':'full_norm','note':'Cotejo integral da captura oficial; não certifica vigência, competência judicial ou alcance das remissões.'},'structure':[],'articles':articles,'frontMatter':[rows[2]['text'],ementa,rows[4]['text']],'frontMatterEditorialNotes':ementa_notes,'closingMatter':[r['text'] for r in rows[94:]],'sourceCapture':{'path':'fontes/lindb/camara-20261114.html.txt','finalUrl':URL,'bytes':len(raw),'digest':'sha256:'+DIGEST,'normalization':'Entidades HTML e espaços/quebras normalizados; marcadores separados dos corpos, grafia/pontuação preservadas; notas de alteração/remissão segregadas. Vetos/revogações mantidos como marcadores editoriais sinalizados. Ementa e assinaturas em h1/h2/h3 capturadas.'},'completeness':{'expectedArticleIds':[a['id'] for a in articles],'checkedOn':DATE,'sourceDigest':'sha256:'+DIGEST,'annexes':'not_applicable'}}

def main():
    ap=argparse.ArgumentParser();g=ap.add_mutually_exclusive_group(required=True);g.add_argument('--check',action='store_true');g.add_argument('--write',action='store_true');opt=ap.parse_args()
    target=ROOT/'dados/legislacao-s13.js';c=json.JSONDecoder().raw_decode(target.read_text().split('root.AGU_LEGAL_CORPUS=',1)[1])[0];law=extract()
    if opt.check:
        assert next(l for l in c['laws'] if l['id']=='DL4657')==law,'DL4657 diverge da captura'
        print('LEG05_SOURCE_CHECK_OK',len(law['articles']),sum(len(a['clauses']) for a in law['articles']))
    else:
        i=next((i for i,l in enumerate(c['laws']) if l['id']=='DL4657'),None)
        if i is None:c['laws'].append(law)
        else:c['laws'][i]=law
        c['cutoff']=DATE
        target.write_text('/* Corpus público S13 — normas integrais LEG02–05 e seleção CF; IDs anteriores preservados. */\n(function(root){\'use strict\';root.AGU_LEGAL_CORPUS='+json.dumps(c,ensure_ascii=False,indent=2)+';})(window);\n')
        print('LEG05 corpus gerado',len(law['articles']),sum(len(a['clauses']) for a in law['articles']))
if __name__=='__main__':main()
