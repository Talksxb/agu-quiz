# AGU Quiz | Biblioteca de legislação — etapa 03 (handoff; NÃO EXECUTAR agora)

Executar apenas em nova autorização expressa. Uma etapa por execução. Repositório público `https://github.com/Talksxb/agu-quiz`, produção `https://talksxb.github.io/agu-quiz/`. A auditoria privada `Talksxb/agu-auditoria` só pode ser consultada pontualmente e em leitura quando estritamente indispensável; não copiar matriz, documentos, casos nem dados privados para o app.

## Estado de partida a reconfirmar

A etapa 01 (PR #44, merge histórico `164ad3446acd2cd23f53e41c96777312ae15aec0`) incorporou CC e CPC como espelhos referenciais não cotejados. A etapa 02 adicionou etiquetas **editoriais por matéria** na interface, filtragem transitória das oito leis e explicação da busca limitada a 49 artigos, sem alterar os textos. Consultar `docs/BIBLIOTECA_LEIS_02_MATERIAS_E_COTEJO_2026-11-16.md`, `docs/CODIGOS_CC_CPC_NAVEGACAO_2026-11-16.md`, `tests/fixtures/codigos-cc-cpc-deltas.json` e `tests/fixtures/biblioteca-leis-02-deltas.json`; confirmar PR, merge, CI, Pages e hashes atuais antes de editar. Nenhum SHA histórico dispensa conferência na abertura.

## Missão condicionada

**Prioridade 1:** obter de fonte primária oficial e cotejar artigo por artigo (e, quando viável, parágrafos/incisos/alíneas) a Lei 10.406/2002 e a Lei 13.105/2015 contra os espelhos importados, incluindo emendas e produção de efeitos **até a data de corte explicitamente adotada**. Preservar IDs, notas e anotações locais. Documentar URL oficial, data/hora, licença/proveniência, método reprodutível, HTML/bytes ou hashes de entrada, divergências, correções e lacunas. O acesso ao CC foi bloqueado por verificação humana na etapa 02; não contornar CAPTCHA nem tratar excertos de busca como cotejo integral. Se não houver meio lícito e verificável, encerrar documentalmente, sem elevar `textVerification`, `contentCoverage` ou `auditStatus`.

**Prioridade 2, somente após autorização inequívoca para novo conteúdo:** examinar o edital literal e fontes primárias para selecionar **um lote pequeno** de legislação adicional, como Lei 14.133/2021, Lei 8.112/1990 e CTN. Não importá-las automaticamente por constarem como candidatas; distinguir recortes pedidos pelo edital de textos integrais e confirmar todas as atualizações. Sem atribuição de `topic` granular por matéria ampla, e sem gerar novos flashcards, questões ou cronograma.

## Contratos obrigatórios

- Biblioteca do Leitor com **uma norma aberta por vez**, seletor inicialmente recolhido, filtros editoriais por matéria e salto por número. Etiquetas classificam diplomas para navegação e **não certificam artigo, currículo ou legislação**.
- Manter uma única lista `forNotebook` em `agu_leitor_juridico_s13_v1`, entre as nove categorias S20; nenhuma nova chave, categoria ou backend. IDs `pc-*`, edição e status manuais, backups antigos e restauração só de categorias ausentes.
- Preservar seis diplomas históricos, corpus schema `agu-legal-reader-v1`, catálogo `agu-legislation-leg01-v1` e os dois códigos com marcadores de espelho enquanto não houver prova de cotejo. Não alterar outros motores (planejamento, estudo, revisão, questões, baralhos).
- Se houver alteração de produto, adicionar fixture SHA-256 nova encadeando as anteriores, sem reescrever baselines LEG/UX nem os deltas CC/CPC/etapa 02.
- Reconfirmar `main`, PRs/branches concorrentes, checks e deploy antes de criar branch e PR próprias em rascunho; sem force push ou merge sem CI verde.

## Aceite

Exigir comparação documental rastreável, regressões Node antigas, testes Chromium com perfis sintéticos em 320/360/390/430/1280 CSS px, teclado/toque, filtros, foco e overflow. Axe em 390/1280 com `violations`, `incomplete`, `passed` separados; incomplete não é aprovação. Provar preservação de conteúdo antigo, IDs, tags, `topic:null` quando não demonstrado, notas e backup S20. Após merge, validar GitHub Pages por HTTP 200 e SHA-256 de HTML/scripts/CSS/módulo de questões com o checkout realmente publicado. Não alegar Android físico ou leitor de tela real sem execução em dispositivo genuinamente independente.

Encerrar em relatório `docs/BIBLIOTECA_LEIS_03_*.md` com base/branch/commits/PR/merge, fontes, divergências, cobertura realmente cotejada, hashes, testes, deploy e limitações; preparar `docs/PROMPT_BIBLIOTECA_LEIS_04.md` autossuficiente, sem executar a etapa 04.
