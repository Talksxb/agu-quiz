"""Testes determinísticos do extrator offline, sem rede e sem dados pessoais."""
import importlib.util
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch


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

    def test_artigos_interpolados_nao_contaminam_artigo_anterior(self):
        text = '''<p>Art. 48. Texto-base.</p>
        <p>Art. 48-A. Dispositivo acrescido.</p>
        <p>Art. 49. Texto seguinte.</p>
        <p>Art. 49-A. Parágrafo novo.</p>
        <p>Art. 50. Limite.</p>'''
        found = mod.official_articles(text.encode(), 48, 49)
        self.assertEqual(found['48'], 'Art. 48. Texto-base.')
        self.assertEqual(found['48-A'], 'Art. 48-A. Dispositivo acrescido.')
        self.assertEqual(found['49-A'], 'Art. 49-A. Parágrafo novo.')
        self.assertEqual(found['49'], 'Art. 49. Texto seguinte.')

    def test_separador_milhar_respeita_limite_e_nao_anexa_artigos(self):
        html = '''<p>Art. 999. Artigo anterior.</p>
        <p>Art. 1.000. Conteúdo mil.</p><p>Parágrafo único. Parte do mil.</p>
        <p>Art. 1.001. Artigo posterior.</p>'''
        found = mod.official_articles(html.encode(), 999, 1000)
        self.assertEqual(found['999'], 'Art. 999. Artigo anterior.')
        self.assertEqual(found['1000'], 'Art. 1.000. Conteúdo mil. Parágrafo único. Parte do mil.')
        self.assertNotIn('1001', found)

    def test_faixas_revogadas_nao_contaminam_artigo_756(self):
        html = '''<p>Art. 756. Dispositivo anterior.</p>
        <p>Arts. 757 a 777. (Revogados pela Lei nº 15.040, de 2024)</p>
        <p>Arts. 778 a 788. (Revogados pela Lei nº 15.040, de 2024)</p>
        <p>Arts. 789 a 802. (Revogados pela Lei nº 15.040, de 2024)</p>
        <p>Art. 803. Dispositivo seguinte.</p>'''
        found = mod.official_articles(html.encode(), 756, 803)
        self.assertEqual(found['756'], 'Art. 756. Dispositivo anterior.')
        self.assertEqual(found['803'], 'Art. 803. Dispositivo seguinte.')
        ranges = mod.official_revoked_ranges(html.encode(), 756, 803)
        self.assertEqual(len(ranges), 46)
        self.assertEqual((ranges[757]['start'], ranges[757]['end']), (757, 777))
        self.assertEqual((ranges[802]['start'], ranges[802]['end']), (789, 802))
        self.assertNotIn(756, ranges)
        self.assertNotIn(803, ranges)

    def test_reconciliacao_nao_fabrica_texto_normativo_individual(self):
        cc_html = '''<p>Art. 756. Último dispositivo.</p>
        <p>Arts. 757 a 777. (Revogados pela Lei nº 15.040, de 2024)</p>
        <p>Arts. 778 a 788. (Revogados pela Lei nº 15.040, de 2024)</p>
        <p>Arts. 789 a 802. (Revogados pela Lei nº 15.040, de 2024)</p>
        <p>Art. 803. Próximo dispositivo.</p>'''
        with tempfile.TemporaryDirectory() as folder:
            cc, cpc = Path(folder) / 'cc.html', Path(folder) / 'cpc.html'
            cc.write_text(cc_html, encoding='utf-8')
            cpc.write_text('<p>Art. 757. Norma processual.</p>', encoding='utf-8')
            mirror = {'L10406': {str(i): 'Art. ' + str(i) + '. (Revogado pela Lei nº 15.040, de 2024)'
                                   for i in range(757, 803)},
                      'L13105': {'757': 'Art. 757. Norma processual.'}}
            with patch.object(mod, 'mirror_articles', return_value=mirror):
                result = mod.run(str(cc), str(cpc), 757, 802)
        revoked = [row for row in result['rows'] if row['comparison_class'] ==
                   'revogacao_agrupada_documentada']
        self.assertEqual(len(revoked), 46)
        self.assertTrue(all(not row['official_present'] for row in revoked))
        self.assertEqual(revoked[-1]['official_revocation_range']['end'], 802)


if __name__ == '__main__':
    unittest.main()
