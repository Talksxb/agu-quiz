# LEG-03 — LRF integral no leitor existente

Base conferida: main `04314fe8103fd858d9b08cd949fbb3bf84d67064`; PRs #2–4 mescladas, nenhuma aberta na retomada. Branch própria `leg/leg03-lrf-integral`. Sem repetir inventários anteriores ou acessar conteúdo da auditoria privada.

## Corpus e fonte

`LC101` contém **83 artigos, 545 unidades, 10 capítulos, 24 seções e 7 subseções**. Inclui os oito artigos com sufixos, 21 marcadores de veto, quatro unidades com declaração de inconstitucionalidade registrada na fonte, 76 notas editoriais, ementa/preâmbulo e fecho. Os quatro itens do art. 55, III, b, originalmente no mesmo parágrafo HTML, são unidades filhas selecionáveis; texto e ordem preservados. Não há anexo próprio na captura: referências a anexos de futuras peças orçamentárias não são anexos omitidos desta lei.

- Fonte consolidada: https://www2.camara.leg.br/legin/fed/leicom/2000/leicomplementar-101-4-maio-2000-351480-normaatualizada-pl.html — Câmara/CDI, consulta 13/11/2026, URL final idêntica, 244.662 bytes UTF-8.
- Captura `fontes/lc101/camara-20261113.html.txt`; SHA-256 `9e178a491fd3ba44c4956316bc9ef602a5d544b2fa5d8a52abaa2e6bac3de691`; versão `LC101@2026-11-13-camara-9e178a49`.
- Página de dados da mesma norma capturada separadamente: `fontes/lc101/catalogo-camara-20261113.html.txt`, 61.376 bytes; SHA-256 `19fa027482676146b0e6d1b5fc1320560656252aa17c8ceeb88d537a4c61d854`. Rastreia a remissão à LC 235/2026 quanto ao art. 14-A, sem importar essa outra lei.
- Planalto abriu verificação humana; não usado como texto nem contornado. A fonte da Câmara foi usada como consolidação, não como certificação de vigência ou decisão judicial.

`python3 scripts/importar-lrf.py --check` reextrai a captura fixada, sem rede. `--write` incorpora apenas LC101, preservando as demais normas. Normalização: entidades HTML e espaços/quebras; rótulos separados do corpo; grafia e pontuação preservadas. Notas editoriais segregadas com seus links. `python3 tests/leg03-source-check.py` reconstrói cada um dos **541 parágrafos normativos** da captura a partir das 545 unidades e das notas, incluindo os quatro itens desdobrados; verifica ausência de omissão e literalidade inversa. Manifesto de IDs/pais/caminhos/hashes em `tests/fixtures/leg03-manifesto.json`.

## Leitor e proteção dos dados

Leitor único e controles LEG02 reutilizados. Divisões em três níveis funcionam no seletor existente. Ressalvas visíveis antes do texto afetado: inconstitucionalidade registrada pela fonte (art. 9º §3º, art. 23 §2º, caputs 56/57), remissão da Câmara à LC 235/2026 no art. 14-A e marco de 1º/1/2027 expresso no art. 41-A. As notas judiciais são reproduzidas, não revalidadas nesta sprint. Não se declara aplicável hoje um texto pela simples inclusão no corpus. `auditStatus` continua `parcial_nao_certificado`, separado de cotejo textual `compared/full_norm`.

CF88 e L9784, incluindo todos os IDs/textos/metadados, são idênticas à LEG02 por hash do objeto completo; nenhuma correção nova nos textos anteriores. Novos artigos usam `topic:null`: Comentários funcionam, sem sessão curricular fabricada. Total: **3 normas, 167 artigos, 776 unidades, 2 normas integrais**.

Arquivo de backup, nove chaves, formatos, limite de 12 MB UTF-8 e política de categorias ausentes intactos. **Limite legado de 500 chaves de comentários permanece**, embora o corpus agora tenha 776 unidades: não é exigido anotar todas; 500 notas validadas, 501 rejeitadas sem escrita. Ampliação eventual exige tarefa própria, sem contornar o limite ou editar/dividir backup pessoal. Nenhum dado pessoal foi acessado; testes usam perfis e textos sintéticos.

## Validação e publicação

Node local: S19/S20/S25–27/S29–35, WORK01, LEG01/02 aprovados; LEG03 tem 15 verificações de fonte, manifesto, pais, sufixos, vetos/ressalvas, compatibilidade, notas/reload/restauração e limite legado. Chromium e axe em CI: cinco larguras, artigos extensos, seleção de inciso/alínea/item, busca, ressalvas, notas antigas/novas, sessão anterior, download/restauração em contexto novo, teclado/foco e regressões completas. Sem Android físico/TalkBack.

CI incluirá LEG03 tanto em servidor estático isolado como no job Pages com `AGU_TEST_URL`. Cache alterado somente em corpus e leitor (`20261113-leg03`); Consolidação continua `leg02`. O fechamento da PR registra os resultados efetivos, commits e deploy. Enquanto a branch não for integrada e verificada, produção continua LEG02 em https://talksxb.github.io/agu-quiz/ ; a URL da LRF só deve ser anunciada após confirmação: `?abrir=lei&norma=LC101`. Nenhum novo serviço, banco, framework ou leitor.
