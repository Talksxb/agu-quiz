# LEG-05 — LINDB integral no leitor existente

Base conferida: main `0dec2670527f29f212f4aeb7bd4c24971e1790ce`, PR #7 mesclada, CI 43598512973 aprovado; nenhuma PR aberta. Branch própria `leg/leg05-lindb-integral`. Sem pesquisa da Sprint 4, diagnóstico geral ou acesso à auditoria privada.

## Fonte e integridade

**DL4657: 30 artigos, 89 unidades; nenhuma divisão formal ou anexo.** Inclui oito marcadores de veto e dois de revogação, ementa/preambulo e os 11 blocos do fecho. Art. 9º usa marcador `9o` no HTML; não é artigo com sufixo. Alíneas do art.15 são filhas diretas do artigo; incisos do art.26, §1º pertencem ao parágrafo.

Câmara/CDI, texto atualizado: https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-4657-4-setembro-1942-414605-normaatualizada-pe.html . Consulta **14/11/2026**, URL final idêntica; captura UTF-8 de **73.523 bytes** em `fontes/lindb/camara-20261114.html.txt`. SHA-256 `e2aa961baf8e36b8583c7b0a2b41b57b36f3ec02091ddbed571e4c41adbefca6`; versão `DL4657@2026-11-14-camara-e2aa961b`. Página de dados da norma consultada: https://www2.camara.leg.br/legin/fed/declei/1940-1949/decreto-lei-4657-4-setembro-1942-414605-norma-pe.html . Planalto apresentou verificação humana; não contornado ou usado como transcrição.

`python3 scripts/importar-lindb.py --check|--write`: importador específico, offline, limitado a DL4657/corte global. Captura p/h1..h6, inclusive ementa em h1 e assinaturas em h2/h3. Normaliza somente entidades HTML e espaços/quebras; rótulos separados dos corpos, sem modernizar palavras, grafia ou pontuação. `tests/leg05-source-check.py` recompõe todos os 89 blocos legais, ementa e fecho sem usar `extract()`. Manifesto de IDs/pais/caminhos/hashes em `tests/fixtures/leg05-manifesto.json`.

25 unidades têm notas editoriais de alteração/remissão separadas do corpo; a nota da ementa fica em `frontMatterEditorialNotes`. Os dois revogados são `art1:p2` e `art15:pu`: a consolidação oferece marcadores, não a antiga redação. Esses marcadores, assim como os vetos, foram preservados com `textStatus` e aviso explícito, sem apresentá-los como comandos vigentes nem inventar texto histórico ausente. A remissão constitucional do art.15, e, permanece visível; a transcrição não reafirma a competência citada no corpo. Art.19 sinaliza prazo transitório sem reinício. Não houve certificação de vigência, regime de homologação ou alcance jurisprudencial: `compared/full_norm` é cotejo textual e `auditStatus=parcial_nao_certificado` permanece separado.

## Intervenção mínima e preservação

`structure:[]`/`structurePath:[]`, sem capítulos artificiais. No leitor existente, seletor de divisão só aparece quando há divisões; LINDB mostra orientação pelo índice de artigos. Nota da ementa aparece no painel de ementa/preâmbulo. Mesmas APIs, teclado/foco e persistência. Novo campo de notas de ementa validado no catálogo. Alteração de hash do leitor rastreada em `tests/fixtures/leg05-leitor-delta.json`, com hash anterior e justificativa; fixture LEG04 original não foi sobrescrita.

Objetos completos CF88/L9784/LC101/LC73 idênticos ao baseline, por hash em `leg05-preservacao.json`. Tópicos novos `null`, Comentários disponíveis sem sessão curricular inventada. Corpus total **5 normas, 270 artigos, 1.085 unidades, 4 integrais**. Sem questões/gabaritos novos ou mudanças em Consolidação/S17/Estudo/Caderno/Revisão/Planejamento.

Backup intocado: nove chaves/formatos, 12 MB UTF-8, 500 comentários e restauração somente em categorias ausentes. Teste aceita 500 notas incluindo LINDB e rejeita 501 sem escrita. Nada no perfil/backup pessoal, sem migração ou limpeza. Cache alterado somente em corpus e leitor (`20261114-leg05`).

## Validação e publicação

Node local: S19/S20/S25–27/S29–35, WORK01 e LEG01–05 (18 suítes; LEG05 com 15 verificações próprias). Expectativas globais atualizadas sem apagar identidades anteriores; adaptação mínima do leitor rastreada por delta. Chromium configurado em contextos novos a 320/360/390/430/1280: seletor ausente na LINDB e presente nas outras, ementa, revogação/vetos, artigo extenso, alínea/inciso, primeiro/último dispositivo, busca, notas anteriores/novas, sessão anterior, reload, download/restauração e foco/teclado. Axe distingue violações/inconclusivos/aprovações após rolagem. Sem Android físico/TalkBack.

CI mantém regressões e acrescenta LEG05 no servidor isolado e na URL real por `AGU_TEST_URL`. A produção anterior continua LEG04 em https://talksxb.github.io/agu-quiz/ até integração/deploy verificados. A URL `?abrir=lei&norma=DL4657` só pode ser anunciada como publicada após confirmação; o fechamento registra resultados reais. `docs/PROMPT_LEG-06.md` será gerado; LEG06 não executada.
