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

## Fechamento remoto

Base local inicial: `main` em `18a4f76e430ed8846d131dfe1900ecc3fa1a3cee`, nenhuma PR aberta; branch `leg/leg06-acao-popular-integral`. **Atualizar esta seção conforme commits, PR, CI, Pages e hashes publicados realmente confirmados.** A versão em branch não deve ser apresentada como produção até o deploy e a conferência HTTP efetivos.

Handoff: `docs/PROMPT_LEG-07.md` descreve exclusivamente a futura funcionalidade opcional “Para meu caderno”. **LEG-07 não foi executada na LEG-06.**
