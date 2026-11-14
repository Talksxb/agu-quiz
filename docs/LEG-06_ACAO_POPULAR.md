# LEG-06 — Lei 4.717/1965 integral no leitor existente

## Proveniência e cobertura

- Fonte **efetivamente consultada**: Câmara dos Deputados, Centro de Documentação e Informação, **texto atualizado** da Lei nº 4.717, de 29/06/1965, em https://www2.camara.leg.br/legin/fed/lei/1960-1969/lei-4717-29-junho-1965-377818-normaatualizada-pl.html . Consulta e captura em **14/11/2026**, URL final idêntica, HTTP 200.
- Captura UTF-8: `fontes/acao-popular/camara-20261114.html.txt`, **59.036 bytes**, SHA-256 `d8a1fc6018aef37449d62119277fcaeab9ea779d084b44c0a9cd620a59268234`.
- Versão do corpus: `L4717@2026-11-14-camara-d8a1fc60`; ID estável `L4717`, independente da versão textual.
- **22 artigos, 91 unidades, cinco divisões textuais não numeradas** (Da Ação Popular; Da Competência; Dos Sujeitos Passivos da Ação e dos Assistentes; Do Processo; Disposições Gerais), sem sufixos de artigos e sem anexo. Ementa, preâmbulo e fecho com assinaturas preservados.
- Três notas editoriais da fonte (`art1:p1`, `art5:p4`, `art19:p2`) apartadas do texto normativo, mantendo URLs tal como capturadas; sem marcadores de veto, revogação ou inconstitucionalidade explícitos nesta consolidação. Nenhuma reconstrução de redação antiga.
- `scripts/importar-lei4717.py --write|--check` é específico dessa lei; `--check` é só leitura. `tests/leg06-source-check.py` reconstrói independentemente os **91 blocos** e verifica as cinco divisões e o fecho. `tests/fixtures/leg06-manifesto.json` fixa ordem, pais, ordinais e hashes; `leg06-preservacao.json` trava hashes das cinco normas antigas e dos arquivos do leitor/backup.

## Separação entre transcrição e certificação

`textVerification.status=compared`, `scope=full_norm`, `completeness.expectedArticleIds`, digest e `annexes=not_applicable` exprimem **cotejo textual** com o texto atualizado da Câmara. `auditStatus=parcial_nao_certificado` permanece. Remissões à Constituição, ao CPC e regras de competência/processo não foram certificadas quanto à recepção, vigência, jurisprudência ou aplicabilidade contemporânea. Nenhum tópico curricular foi inferido: todos os `topic:null`, inclusive o art. 2º, parágrafo único, alíneas d/e; os cartões ADM-23 são referências de estudo, não prova de vínculo granular.

## Preservação, intervenção e resultados

O corpus soma **6 normas, 292 artigos, 1.176 unidades e 5 normas integrais**; CF88 continua parcial. As cinco normas anteriores são idênticas em objetos serializados SHA-256 ao fechamento LEG05. `leitor-juridico.js`, backup, Consolidação, S17, Estudo, Caderno, Revisão e Planejamento **não foram modificados**. Os cabeçalhos reais alimentam o seletor de divisões já existente; sem novo leitor ou estrutura fictícia. A troca do cache em `index.html` é apenas para `dados/legislacao-s13.js?v=20261114-leg06`.

As verificações de LEG06 incluem importação/reextração offline, reconstrução literal inversa, hierarquia dos arts. 2/4/7/20, teste negativo de contrato, leitura/busca/navegação, nota sem tópico, continuidade de sessão, 500 notas aceitas/501 rejeitadas, nove chaves de backup e restauração idempotente. As 18 suítes Node anteriores permanecem e somou-se a 19ª, LEG06. As expectativas globais anteriores foram atualizadas de forma localizada, sem tocar nos baselines LEG01–05; LEG05 testa agora a passagem LINDB → L4717 e o retorno, preservando sua anotação.

Workflow inclui LEG06 em Node, Chromium e validação da URL publicada, cinco viewports 320/360/390/430/1280 e axe separado em `violations`, `incomplete` e `passed` (com rechecagem após rolagem). Evidências sintéticas ficam em `tests/artifacts-leg06/` na CI, não versionadas. Nenhum Android físico, TalkBack, perfil pessoal ou backup pessoal foi testado.

## Fechamento remoto confirmado — 14/11/2026

Base inicial `main=18a4f76e430ed8846d131dfe1900ecc3fa1a3cee`, nenhuma PR aberta; branch `leg/leg06-acao-popular-integral`. PR [#11](https://github.com/Talksxb/agu-quiz/pull/11), **incorporada** em `2f86ca39419dd6bef95c80df50185abe32cfbf13`. Commit de implementação remoto `0d25b36ae309096876c05b3df306915970873731`; correções estritamente de teste `608fe371ccf195cbf6b657470c1436776a436fdb`, `faa64110a97a8f4b60ffefc5a558c76d0ed1b983` e HEAD final da PR `9fe9aeeaf0b34c606434d6ca700cefb5fc2adb74`. Nenhuma mudança adicional no produto durante os ajustes de CI.

CI da PR [43634382122](https://github.com/Talksxb/agu-quiz/actions/runs/43634382122) **aprovada**: 19 suítes Node e Chromium 159.0.8154.6 em cinco larguras, com LEG01–06 e regressões WORK/Sprint preservadas; evidências sintéticas no artefato `agu-s20-chromium-viewports`, ID `14129930524`. Axe 4.14.0: em 390/1280, zero violações; em 390, um inconclusivo de contraste por sobreposição (`.secondary-more > summary`) foi reavaliado após rolagem e **aprovado**; em 1280, nenhum inconclusivo. Capturas 390/1280 inspecionadas. Chromium local indisponível por restrição de socket do ambiente gerenciado; a execução remota real foi bem-sucedida.

Deploy [43634719318](https://github.com/Talksxb/agu-quiz/actions/runs/43634719318) **aprovado**. CI `main` [43634719904](https://github.com/Talksxb/agu-quiz/actions/runs/43634719904) **inteiramente aprovada**: Node, Chromium e `pages-publicado`, este último testando LEG06/05/04/03 e WORK01 diretamente em HTTPS. Artefatos da `main`: `agu-work01-publicado` ID `14129347124`, `agu-s20-chromium-viewports` ID `14128883880`.

Publicação **utilizável e confirmada**: https://talksxb.github.io/agu-quiz/?abrir=lei&norma=L4717 . HTTP 200; HTML e os oito scripts idênticos por SHA-256 ao checkout integrado, conferidos fora da CI por `node tests/sprint21-pages.cjs`. SHA-256 HTML `cf9f876b48d892ce163293846ed69d01093ee438771c02c07866dcbeec723ce6`; corpus `c038fc9416d1b441aa710bb970eb8428a92008f197ca367ea09df53f6c45f51a`; leitor **inalterado** `955df3f7269730fb8fd429912dd82c7c6f1e861f640e1596fc75230383a0ec00`; backup **inalterado** `d9f7705b490d041dd445701b0b619e39c6b2bb4d204cb5a966b27b98ca4d0d78`. Sem bloqueio conhecido ao uso; não testados Android físico/TalkBack ou backup pessoal.

Handoff: `docs/PROMPT_LEG-07.md` descreve exclusivamente a futura funcionalidade opcional “Para meu caderno”. **LEG-07 não foi executada na LEG-06.**
