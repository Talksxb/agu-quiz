"""Testes determinísticos do extrator offline, sem rede e sem dados pessoais."""
import importlib.util
from pathlib import Path
import unittest


SCRIPT = Path(__file__).resolve().parents[1] / 'scripts/cotejar-biblioteca-lote04.py'
spec = importlib.util.spec_from_file_location('biblioteca_cotejo', SCRIPT)
mod = importlib.util.module_from_spec(spec)
spec.loader.exec_module(mod)


class CotejoTests(unittest.TestCase):
    def test_ignora_titulos_sem_apagar_paragrafos_e_inciso(self):
        html = '''<p>Art. 6º A regra geral.</p><p>Parágrafo único. Detalhe.</p>
        <p>CAPÍTULO II</p><p>DOS DIREITOS DA PERSONALIDADE</p>
        <p>Art. 7º A regra especial.</p><p>I - Hipótese especial.</p>
        <p>Art. 8º Encerramento.</p>'''
        out = mod.official_articles(html.encode(), 6, 7)
        self.assertEqual(out['6'], 'Art. 6º A regra geral. Parágrafo único. Detalhe.')
        self.assertEqual(out['7'], 'Art. 7º A regra especial. I - Hipótese especial.')

    def test_nota_editorial_nao_equivale_a_texto_certificado(self):
        left = 'Art. 10. Norma. (Redação dada pela Lei nº 10, de 2000)'
        right = 'Art. 10. Norma. (Redação dada pela Lei nº 10, de 2000, publicada no DOU)'
        self.assertEqual(mod.classify_difference(left, right),
                         'diferenca_aparente_restrita_a_nota_editorial_revisar')
        self.assertEqual(mod.classify_difference('Art. 10. Norma A.', 'Art. 10. Norma B.'),
                         'diferenca_textual_exige_revisao')

    def test_parenteses_normativos_nao_sao_descartados(self):
        self.assertEqual(mod.classify_difference('Art. 3º Até 16 (dezesseis) anos.',
                                                 'Art. 3º Até 18 (dezoito) anos.'),
                         'diferenca_textual_exige_revisao')

    def test_titulos_centralizados_em_caixa_mista_nao_viram_artigo(self):
        html = '''<p align="justify">Art. 25. Texto válido.</p>
        <p align="center"><b>Seção II</b></p>
        <p align="center"><b>Da Sucessão Provisória</b></p>
        <p align="justify">Art. 26. Outro texto.</p>
        <p align="justify">I - Inciso normativo.</p>
        <p align="justify">Art. 27. Limite.</p>'''
        out = mod.official_articles(html.encode(), 25, 26)
        self.assertEqual(out['25'], 'Art. 25. Texto válido.')
        self.assertEqual(out['26'], 'Art. 26. Outro texto. I - Inciso normativo.')


if __name__ == '__main__':
    unittest.main()
