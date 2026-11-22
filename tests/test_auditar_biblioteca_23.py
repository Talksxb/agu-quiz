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
if __name__=='__main__':main()
