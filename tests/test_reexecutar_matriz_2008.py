"""Testes determinísticos do executor da Biblioteca 22 — sem rede ou corpus real."""
import csv
import hashlib
import importlib.util
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest import TestCase, main
from unittest.mock import patch

SCRIPT = Path(__file__).resolve().parents[1] / 'scripts/reexecutar-matriz-2008.py'
spec = importlib.util.spec_from_file_location('reexecutar_2008', SCRIPT)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)


class Matriz22Tests(TestCase):
    def test_recusa_snapshot_diferente_mesmo_com_tamanho_correto(self):
        with TemporaryDirectory() as td:
            original = Path(td) / 'original.html'
            original.write_bytes(b'abc')
            with patch.dict(mod.EXPECTED_SOURCE, {'L10406': (hashlib.sha256(b'abd').hexdigest(), 3)}):
                with self.assertRaisesRegex(ValueError, 'não reproduz snapshot'):
                    mod.validate_source(original, 'L10406')

    def test_validacao_historica_confere_tamanho_e_hash(self):
        with TemporaryDirectory() as td:
            original = Path(td) / 'original.html'
            original.write_bytes(b'abc')
            sha = hashlib.sha256(b'abc').hexdigest()
            with patch.dict(mod.EXPECTED_SOURCE, {'L10406': (sha, 3)}):
                self.assertEqual(mod.validate_source(original, 'L10406'), sha)
            with patch.dict(mod.EXPECTED_SOURCE, {'L10406': (sha, 4)}):
                with self.assertRaises(ValueError):
                    mod.validate_source(original, 'L10406')

    def test_manifesto_rejeita_id_duplicado(self):
        with TemporaryDirectory() as td:
            p = Path(td) / 'duplicados.csv'
            p.write_text('id;valor\nL10406:art1;a\nL10406:art1;b\n', encoding='utf-8')
            with self.assertRaisesRegex(ValueError, 'repetidos'):
                mod.load_csv(p)

    def test_saida_integral_somente_com_universo_e_hashes_validos(self):
        with TemporaryDirectory() as td:
            root = Path(td)
            cc, cpc = root / 'cc.html', root / 'cpc.html'
            cc.write_bytes(b'cc-html')
            cpc.write_bytes(b'cpc-html')
            ids = [f'{law}:art{number}' for law in ('L10406', 'L13105') for number in range(1, 1001)]
            ids += [f'L10406:art{n}' for n in ('48-A', '49-A', '206-A', '421-A', '819-A', '853-A', '980-A')]
            ids.append('L13105:art699-A')
            history, mirror = root / 'hist.csv', root / 'mirror.csv'
            with history.open('w', encoding='utf-8', newline='') as out:
                writer = csv.writer(out, delimiter=';')
                writer.writerow(('id', 'classe_historica_por_id'))
                writer.writerows((id, 'texto_identico') for id in ids)
            with mirror.open('w', encoding='utf-8', newline='') as out:
                writer = csv.writer(out, delimiter=';')
                writer.writerow(('id', 'espelho_sha256_normalizado'))
                writer.writerows((id, hashlib.sha256(id.encode()).hexdigest()) for id in ids)
            fake_rows = []
            for id in ids:
                fake_rows.append({
                    'id': id, 'mirror_sha256': hashlib.sha256(id.encode()).hexdigest(),
                    'official_sha256': hashlib.sha256((id + '-oficial').encode()).hexdigest(),
                    'mirror_present': True, 'official_present': True,
                    # Art. 945 é SOMENTE UMA FIXTURE INVENTADA, não o resultado do cotejo jurídico.
                    'comparison_class': ('diferenca_aparente_restrita_a_nota_editorial_revisar'
                                         if id == 'L13105:art945' else 'texto_normalizado_identico'),
                    'official_revocation_range': None,
                })
            fake_rows += [{
                'id': id, 'mirror_sha256': '', 'official_sha256': 'x',
                'mirror_present': False, 'official_present': True,
                'comparison_class': 'dispositivo_ausente', 'official_revocation_range': None
            } for id in ('L10406:art69-A', 'L13105:art529-A')]

            class FakeComparator:
                @staticmethod
                def run(*args):
                    return {'rows': fake_rows}

            class FakeSpec:
                pass

            reference = {
                'L10406': (hashlib.sha256(cc.read_bytes()).hexdigest(), len(cc.read_bytes())),
                'L13105': (hashlib.sha256(cpc.read_bytes()).hexdigest(), len(cpc.read_bytes())),
            }
            with patch.object(mod, 'MATRIX', history), patch.object(mod, 'MIRROR', mirror), \
                 patch.object(mod, 'EXPECTED_SOURCE', reference), \
                 patch.object(mod.importlib.util, 'spec_from_file_location', return_value=FakeSpec()), \
                 patch.object(mod.importlib.util, 'module_from_spec', return_value=FakeComparator), \
                 patch.object(FakeSpec, 'loader', create=True) as loader:
                loader.exec_module.return_value = None
                output = root / 'saida.csv'
                mod.run(cc, cpc, output)
                rows = mod.load_csv(output)
                self.assertEqual(len(rows), 2008)
                self.assertEqual(rows['L13105:art945']['classe_nova'],
                                 'diferenca_aparente_restrita_a_nota_editorial_revisar')
                self.assertEqual(rows['L10406:art1']['espelho_sha256'],
                                 hashlib.sha256(b'L10406:art1').hexdigest())
                self.assertNotIn('L10406:art69-A', rows)
                self.assertNotIn('L13105:art529-A', rows)


if __name__ == '__main__':
    main()
