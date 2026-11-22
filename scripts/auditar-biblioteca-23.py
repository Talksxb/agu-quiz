#!/usr/bin/env python3
"""Biblioteca 23: compara os 1.148 IDs restantes e triageia os 111 divergentes da Biblioteca 22.
É cotejo textual, NÃO certificação de vigência nem revisão jurídica integral.
"""
import csv, hashlib, json, re, argparse, importlib.util
from collections import Counter
from difflib import SequenceMatcher
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
EXPECTED={'L10406':('6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90',1571920),
          'L13105':('0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821',938199)}
HIST=ROOT/'docs/dados/BIBLIOTECA_MATRIZ_TRANSICAO_2008_IDS_2026-11-21.csv'
AUTHORITIES={
 'L13105:art144':('STF ADI 5.953: inciso VIII declarado inconstitucional','https://portal.stf.jus.br/processos/detalhe.asp?incidente=5481637'),
 'L13105:art525':('STF AR 2.876: §§ 14 e 15; efeitos e coisa julgada','https://www.stf.jus.br/arquivo/informativo/documento/informativo1177.htm'),
 'L13105:art535':('STF ADI 5.492 e AR 2.876; §§ 3, 7 e 8','https://portal.stf.jus.br/processos/detalhe.asp?incidente=4959031'),
 'L13105:art840':('STF ADI 5.492: depósitos judiciais','https://portal.stf.jus.br/processos/detalhe.asp?incidente=4959031'),
 'L10406:art206':('Lei 15.040/2024: revogação apenas do §1º II','https://www2.camara.leg.br/legin/fed/lei/2024/lei-15040-9-dezembro-2024-796661-publicacaooriginal-173706-pl.html'),
 'L10406:art937':('Parágrafos vetados: controlar situação por unidade','https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html'),
 'L10406:art853-A':('Lei 14.711/2023: agente de garantia','https://www2.camara.leg.br/legin/fed/lei/2023/lei-14711-30-outubro-2023-794873-publicacaooriginal-169906-pl.html'),
}
for n in (927,932,979,988,998):
 AUTHORITIES[f'L13105:art{n}']=('Lei 15.484/2026: relevância do REsp; verificar vigência e aplicação temporal','https://www2.camara.leg.br/legin/fed/lei/2026/lei-15484-4-agosto-2026-799698-publicacaooriginal-180680-pl.html')
def manifest(path):
 with path.open(newline='',encoding='utf-8') as f: rows=list(csv.DictReader(f,delimiter=';'))
 ids=[r['id'] for r in rows]
 if len(ids)!=len(set(ids)):raise ValueError('IDs repetidos no manifesto')
 return set(ids)
def check_sources(cc,cpc):
 for law,p in [('L10406',cc),('L13105',cpc)]:
  raw=p.read_bytes();digest=hashlib.sha256(raw).hexdigest()
  if (digest,len(raw))!=EXPECTED[law]:raise ValueError(f'Snapshot alterado: {law}, bytes={len(raw)}, SHA={digest}')
def write(path,rows):
 if not rows:raise ValueError('Sem linhas')
 path.parent.mkdir(parents=True,exist_ok=True)
 with path.open('w',encoding='utf-8',newline='') as f:
  w=csv.DictWriter(f,fieldnames=list(rows[0]),delimiter=';',extrasaction='ignore');w.writeheader();w.writerows(rows)
def diff_excerpt(a,b):
 out=[]
 for tag,i,j,k,l in SequenceMatcher(None,a,b,autojunk=False).get_opcodes():
  if tag=='equal':continue
  out.append(tag+': espelho['+a[max(i-35,0):min(j+35,len(a))]+'] oficial['+b[max(0,k-35):min(len(b),l+35)]+']')
  if len(out)>=4:break
 return ' | '.join(out)
def run(cc,cpc,out):
 check_sources(cc,cpc)
 spec=importlib.util.spec_from_file_location('agu_cotejador23',ROOT/'scripts/cotejar-biblioteca-lote04.py')
 mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
 previous=manifest(HIST)
 if len(previous)!=2008:raise ValueError('Histórico não tem 2.008 IDs')
 all_mirror=mod.mirror_articles(1,2046)
 ids={law+':art'+key for law,vals in all_mirror.items() for key,value in vals.items() if value}
 if len(ids)!=3156 or not previous.issubset(ids):raise ValueError('Corpus diferente: '+str(len(ids)))
 new=ids-previous
 if len(new)!=1148:raise ValueError('Novos IDs !=1148')
 compared=mod.run(str(cc),str(cpc),1001,2046)
 byid={r['id']:r for r in compared['rows']}
 if len(byid)!=len(compared['rows']) or not new.issubset(byid):raise ValueError('Chave duplicada ou não cotejada')
 output=[]
 for id in sorted(new):
  r=byid[id];law=id.split(':')[0]
  output.append(dict(id=id,law=law,classe=r['comparison_class'],espelho_sha256=r['mirror_sha256'],
    oficial_sha256=r['official_sha256'],oficial_presente=r['official_present'],
    faixa_revogada=json.dumps(r.get('official_revocation_range'),ensure_ascii=False),
    trecho_espelho=r['mirror_excerpt'],trecho_oficial=r['official_excerpt'],
    sha256_fonte=EXPECTED[law][0],status='primeira_passagem_textual_sem_certificacao'))
 if len(output)!=1148:raise ValueError('Total inválido')
 prior=mod.run(str(cc),str(cpc),1,1000)
 diverg=[r for r in prior['rows'] if r['id'] in previous and r['comparison_class'] in
   ('diferenca_textual_exige_revisao','diferenca_aparente_restrita_a_nota_editorial_revisar')]
 if len(diverg)!=111:raise ValueError(f'Divergências esperadas 111, obtidas {len(diverg)}')
 mirror=mod.mirror_articles(1,1000)
 official={'L10406':mod.official_articles(cc.read_bytes(),1,1000),
           'L13105':mod.official_articles(cpc.read_bytes(),1,1000)}
 triage=[]
 for r in sorted(diverg,key=lambda row:row['id']):
  id=r['id'];law,k=id.split(':art')
  a=mod.normalize(mirror[law].get(k) or '');b=official[law].get(k,'')
  if hashlib.sha256(a.encode()).hexdigest()!=r['mirror_sha256'] or hashlib.sha256(b.encode()).hexdigest()!=r['official_sha256']:
   raise ValueError('Inconsistência hash: '+id)
  title,url=AUTHORITIES.get(id,('Ato modificador ou decisão não verificados individualmente',''))
  triage.append(dict(id=id,classe=r['comparison_class'],prioridade='alta' if id in AUTHORITIES else 'revisao',
    espelho_sha256=r['mirror_sha256'],oficial_sha256=r['official_sha256'],
    diferenca_contextual=diff_excerpt(a,b),referencia_para_conferencia=title,url_oficial=url,
    status='revisao_juridica_individual_pendente',observacao='Divergência de representação não comprova erro jurídico'))
 write(out/'primeira_passagem_1148.csv',output)
 write(out/'triagem_juridica_111.csv',triage)
 result=dict(total_importado=3156,primeira_passagem_anterior=2008,novo_cotejo=1148,
  novo_por_diploma=dict(Counter(r['law'] for r in output)),
  novas_classes=dict(Counter(r['classe'] for r in output)),
  divergencias_anteriores=dict(Counter(r['classe'] for r in triage)),
  revisao_juridica='triagem_inicial_sem_certificacao',
  extras_oficiais_sem_espelho=[id for id,r in byid.items() if id not in ids and r['official_present']])
 (out/'resumo.json').write_text(json.dumps(result,ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
 print(json.dumps(result,ensure_ascii=False,indent=2))
if __name__=='__main__':
 p=argparse.ArgumentParser();p.add_argument('cc',type=Path);p.add_argument('cpc',type=Path)
 p.add_argument('--saida',type=Path,default=Path('artefatos/biblioteca23'));a=p.parse_args()
 run(a.cc,a.cpc,a.saida)
