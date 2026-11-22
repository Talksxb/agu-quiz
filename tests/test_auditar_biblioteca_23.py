"""Regressões determinísticas Biblioteca 23 (fixtures, não legislação real)."""
import hashlib,importlib.util
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest import TestCase,main
from unittest.mock import patch
SCRIPT=Path(__file__).resolve().parents[1]/'scripts/auditar-biblioteca-23.py'
spec=importlib.util.spec_from_file_location('audit_b23',SCRIPT)
mod=importlib.util.module_from_spec(spec);spec.loader.exec_module(mod)
class Biblioteca23Tests(TestCase):
 def test_snapshot_alterado_bloqueia(self):
  with TemporaryDirectory() as td:
   a,b=Path(td)/'a',Path(td)/'b'
   a.write_bytes(b'1');b.write_bytes(b'2')
   with self.assertRaises(ValueError):
    mod.check_sources(a,b)
 def test_equal_snapshot_passa(self):
  with TemporaryDirectory() as td:
   a,b=Path(td)/'a',Path(td)/'b';a.write_bytes(b'1');b.write_bytes(b'2')
   with patch.dict(mod.EXPECTED,{'L10406':(hashlib.sha256(b'1').hexdigest(),1),
                                'L13105':(hashlib.sha256(b'2').hexdigest(),1)}):
    mod.check_sources(a,b)
 def test_manifesto_nao_admite_duplicatas(self):
  with TemporaryDirectory() as td:
   a=Path(td)/'x.csv'
   a.write_text('id;classe\nx;identico\nx;diferente\n',encoding='utf-8')
   with self.assertRaisesRegex(ValueError,'repetidos'):
    mod.manifest(a)
 def test_delta_nao_inventa_equivalencia_juridica(self):
  x=mod.diff_excerpt('Art. 10. Texto.','Art. 10. Texto (nota).')
  self.assertIn('espelho[',x)
  self.assertIn('oficial[',x)
 def test_reconhece_revogados_plural_sem_inventar_artigo(self):
  import tempfile
  from unittest.mock import patch as mock_patch
  spec2=importlib.util.spec_from_file_location('cotejo_plurais',SCRIPT.parents[1]/'scripts/cotejar-biblioteca-lote04.py')
  comparator=importlib.util.module_from_spec(spec2);spec2.loader.exec_module(comparator)
  with tempfile.TemporaryDirectory() as td:
   cc=Path(td)/'cc.html';cpc=Path(td)/'cpc.html'
   cc.write_text('<p>Arts. 1.620 a 1.629. (Revogados pela Lei nº 12.010, de 2009)</p>',encoding='utf-8')
   cpc.write_text('<p>Art. 1.620. Norma simulada.</p>',encoding='utf-8')
   mirror={'L10406':{'1620':'Art. 1.620. a 1.629. (Revogados pela Lei nº 12.010, de 2009)'},
           'L13105':{'1620':'Art. 1.620. Norma simulada.'}}
   with mock_patch.object(comparator,'mirror_articles',return_value=mirror):
    rows=comparator.run(str(cc),str(cpc),1620,1620)['rows']
  self.assertEqual(rows[0]['comparison_class'],'revogacao_agrupada_documentada')
  self.assertFalse(rows[0]['official_present'])
  self.assertEqual(rows[0]['official_revocation_range']['end'],1629)
if __name__=='__main__':main()
