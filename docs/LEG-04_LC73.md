# LEG-04 — Lei Orgânica da AGU integral

Retomada: main `d072128a9d79fbe6c5bc555de6023479bd334c9e`, PR #5 mesclada, CI 43542373872 aprovado; nenhuma PR aberta. Branch própria `leg/leg04-lc73-integral`. Sem diagnóstico geral, reimportação das outras normas ou acesso à auditoria privada.

## Fonte e cobertura

**LC73: 73 artigos, 220 unidades, 7 títulos, 15 capítulos e 3 seções.** Inclui 12 marcadores de veto em suas grafias/pontuações originais, três unidades com notas editoriais (sete remissões), ementa/preâmbulo e fecho. Não há artigo com sufixo ou anexo normativo na captura. Nenhum texto anterior foi corrigido nesta sprint.

Fonte consolidada: https://www2.camara.leg.br/legin/fed/leicom/1993/leicomplementar-73-10-fevereiro-1993-354947-normaatualizada-pl.html — Câmara dos Deputados/CDI, consulta em **14/11/2026**, URL final idêntica, UTF-8, **99.345 bytes**. Captura `fontes/lc73/camara-20261114.html.txt`, SHA-256 `148726cf24d3704d3c89894ed0be64b2092c60a826dfbfedfbb45245e05966e7`. Versão `LC73@2026-11-14-camara-148726cf`. Página de dados da norma também consultada: https://www2.camara.leg.br/legin/fed/leicom/1993/leicomplementar-73-10-fevereiro-1993-354947-norma-pl.html . Planalto apresentou verificação humana; não foi usado como texto ou contornado.

Importador offline específico `scripts/importar-lc73.py --check|--write`. Captura blocos `p` e `h1..h6`: o título da lei é `h3` e **CAPÍTULO IX é `h2`**, diferentemente dos demais cabeçalhos. Os arts. 17–19 ficam no capítulo correto. `tests/leg04-source-check.py` reconstrói todos os 220 blocos normativos e notas, sem usar `extract()`, e confere os 25 cabeçalhos. Manifesto de IDs/pais/caminhos/hashes em `tests/fixtures/leg04-manifesto.json`.

Normalização limitada a entidades HTML e espaços/quebras; rótulos separados dos corpos; grafia/capitalização/pontuação preservadas. Notas de remissão ficam em metadados com os links da captura. Remissão à ADI 4.652/2011 no art. 28, III, **não** foi convertida em declaração de inconstitucionalidade. A UI alerta para a remissão e para prazos transitórios nos arts. 66/67/69, sem reiniciá-los ou certificar seus efeitos atuais. Não houve auditoria jurisprudencial ou certificação de vigência. `compared/full_norm` refere-se ao cotejo; `auditStatus=parcial_nao_certificado` permanece separado.

## Reutilização e preservação

Leitor, Consolidação, Estudo, Caderno, Revisão, Planejamento, S17 e Backup **sem alterações de código**. Novos artigos usam `topic:null`; Comentários disponíveis, sem sessões curriculares artificiais. IDs novos `LC73:artN:...`, com títulos/capítulos/seções como pais estruturais. Nenhuma nova questão ou gabarito.

Hashes dos objetos completos de CF88/L9784/LC101 e dos arquivos do Leitor/Backup preservados em `tests/fixtures/leg04-preservacao.json`, comparados ao baseline. Nove chaves, formatos, 12 MB UTF-8, 500 comentários e restauração apenas de categorias ausentes intactos. Teste aceita 500 notas incluindo LC73 e rejeita 501 sem escrita. Nenhum dado pessoal acessado ou migrado.

O corte global avança para 14/11/2026; versões/datas específicas das normas anteriores continuam em 13/11. Ajuste mínimo no `--check` de L9784: compara a norma integralmente, sem exigir que o corte global permaneça na data antiga. O texto/captura/metadados de L9784 não foram regenerados. Testes globais passam a **4 normas, 240 artigos, 996 unidades e 3 normas integrais**, preservando todas as verificações de identidade/literalidade anteriores.

## Validação e publicação

Node local: S19/S20/S25–27/S29–35, WORK01, LEG01/02/03 e 15 verificações LEG04 aprovados. Chromium configurado em cinco larguras (320/360/390/430/1280), com títulos/capítulos/seções, artigo extenso, inciso/alínea, vetos/remissões/prazos, busca, notas antigas/novas, sessão anterior, reload, exportação/restauração e teclado/foco. Axe distingue violations/incomplete/passed e reavalia após rolagem. Perfis descartáveis; sem Android físico/TalkBack ou backup pessoal.

CI mantém todas as regressões e acrescenta LEG04 no servidor isolado e na URL real via `AGU_TEST_URL`. Cache mudou apenas no corpus (`20261114-leg04`); arquivos não alterados mantêm suas versões. Produção antes da integração: LEG03 em https://talksxb.github.io/agu-quiz/ . A URL `?abrir=lei&norma=LC73` só deve ser anunciada como publicada após deploy, hashes e jornada verificados. O fechamento registra os resultados reais. Handoff LEG05 será gerado; não executar a próxima sprint.
