# AGU Quiz — Sprint 21 | Evidência de navegador real, acessibilidade mobile e restauração segura

**Data local de referência:** 12/11/2026, America/Sao_Paulo (logs CI com data UTC 13/11/2026).  
**Estado:** implementação, navegador Chromium real, regressão Node real, verificação HTTP do GitHub Pages, testes de recuperação por arquivo, checkpoint e handoff publicados em `main`. **Android físico: `nao_testado_android_fisico`**. Nenhum dado pessoal de estudante foi publicado.

## 1. Diagnóstico de partida e repositórios

- **Aplicativo:** `Talksxb/agu-quiz`, branch `main`. Lidos os checkpoints das Sprints 19 e 20, `index.html`, Revisão, Planejamento, backup S20, Caderno, Sessões Integradas, Questões S18, Leitor Jurídico, Consolidação, dados auditados S18/S19, testes S19/S20 e workflow existente.
- **Auditoria privada:** `Talksxb/agu-auditoria`, `docs/PROTOCOLO.md`, `checkpoints/estado.json`, checkpoint mais recente reconsultado ao final: **AUD03-015**, `status=parcial_nao_certificado`, **0 tópicos integralmente certificados**. O checkpoint AUD03-015 contém reconciliação de merge concluída, item `INT-26`, matriz original preservada e **412 IDs válidos**. Não houve alteração na Auditoria nesta sprint.
- **Baseline mantido:** 4 questões 2015 com fundamentação pontual conferida, IDs `of-2015-adv-006`, `-007`, `-009`, `-048`; 36 flashcards; 24 referências oficiais legadas no motor (não confundir com 24 itens integralmente auditados); 4 destinos superiores: **Início, Estudar, Biblioteca Inteligente, Evolução**.
- A Q1 `of-2015-adv-001` **continua sem nova correção automática**, pendente de reconstituição histórica da variante e fundamentos de 2015. Nenhum ID histórico foi reescrito e nenhuma questão adicional foi promovida.

## 2. Evidência REAL recuperada da Sprint 20, não apenas simulada

A Sprint 20 havia terminado com testes publicados, mas sem resultado de Actions confirmado no checkpoint anterior. A Sprint 21 consultou GitHub Actions e recuperou **jobs, logs, conclusões e versões**:

- Workflow anterior `43345757830`: `integridade-node` **success**, `navegador-chromium` **failure**, com erro reproduzível `strict mode violation` ao localizar “Dados e backup” (dois botões homônimos no mesmo nível acessível).
- Após correção localizada em `tests/sprint20-browser.cjs`, workflow `43347043676`: **ambos jobs success**.
- Logs reais em Node **v22.23.4** executaram `node tests/sprint19-validacao.js` (26 verificações) e `node tests/sprint20-validacao.js` (41 verificações). Estas verificações usam **VM/DOM simulado dentro de Node real**; não devem ser chamadas E2E.
- Chromium headless real **158.0.8127.18** executou `node tests/sprint20-browser.cjs` com êxito nas larguras **320, 360, 390, 430 e 1280 px** (cinco fluxos). Nenhuma dessas resoluções equivale a aparelho Android físico.

## 3. Defeitos encontrados, reprodução e correção mínima

### S21-01 — Seletor E2E ambíguo (severidade teste: média)

A rota de Evolução expunha dois botões com nome acessível “Dados e backup” (atalho e navegação interna). O Playwright anterior usava `getByRole(...)` sem qualificador e falhou por ambiguidade, embora a interface estivesse funcional. **Corrigido apenas no teste:** `.secondary-nav-item` para o destino específico. Outro seletor do cartão “Questões Cebraspe” exigia igualdade exata com título, mas o nome acessível inclui subtítulo; passou a utilizar correspondência do prefixo/título. Sem alteração de rota ou menu.

### S21-02 — Overflow horizontal real na lista de 2023 a 320 px (severidade funcional: média)

O Chromium detectou `documentElement.scrollWidth=533` com `innerWidth=320`. Diagnóstico instrumentado localizou `#officialselect` com largura intrínseca de **509 px**, coordenada direita 533 px, sem quebra por tratar-se de `<select>` com textos longos. **Corrigido** em `index.html`: limite e largura de 100% no select e `min-width:0` no contêiner flexível específico; mantém o conteúdo e os rótulos. **Revalidado sem overflow** em lista, Leitor, Caderno e backup nas cinco larguras do E2E.

### S21-03 — Contraste insuficiente de texto auxiliar (severidade acessibilidade: média)

Cores pequenas de orientação `#708695` em fundo branco resultavam em razão ~**3,80:1** (inferior a 4,5:1). Outros textos de hub e notas tinham razões próximas/abaixo do mínimo. **Corrigido** em CSS sem reformulação visual:
- `.muted` e `.hub-entry span`: `#5b7280`;
- `.note` e `#main .agu-muted`: `#536d7a`;
- `.eyebrow`: `#536b79`.

O Playwright passou a **calcular contraste a partir de cores e fundos efetivamente renderizados**, exigindo **≥4,5:1** em amostras da Biblioteca, lista e Leitor nas cinco larguras. Isso **não** é homologação WCAG integral nem teste de leitor de tela.

### S21-04 — Validação pouco profunda no backup local completo (severidade integridade: alta)

O backup completo S20 aceitava estruturalmente arrays de Revisão e Sessões sem rejeitar tentativas com IDs duplicados, referências normativas inexistentes ou registros duplicados no Caderno, apesar de importadores individuais mais rígidos. Corrigido `backup-local-s20.js` **sem migração** e preservando as **nove chaves** e o esquema `agu-portable-local-s20-v1`:
- Revisão: ID de tentativa único, forma e alternativa admissível; não eliminar estados antigos corretos.
- Caderno: `valid` do módulo + IDs de nota e IDs legados sem duplicidade; URLs e dispositivos continuam limitados por fonte permitida.
- Sessões integradas: IDs únicos, dispositivo presente no corpus, tópico correspondente, estágio/status, listas e referência de sessão ativa.
- Backup acima de 12 MB rejeitado também na API de validação, além do limite já implementado no campo de arquivo.

**Revalidado em Chromium real:** IDs duplicados, alternativa inválida, dispositivo de sessão inexistente, dispositivo do Caderno inexistente, versão antiga incompatível, JSON malformado, categoria não permitida, excesso de 12 MB e reversão de inserções após erro de quota. No caso de versões históricas **com esquema incompatível**, a operação é rejeitada **sem apaga-las**; não se promete migração retrocompatível não testada.

## 4. Testes de navegador e recuperação de arquivo

**Run final com os três jobs aprovados:** [GitHub Actions 43349807109](https://github.com/Talksxb/agu-quiz/actions/runs/43349807109), commit testado `cff85c96650b555135b0989b3a12b8597051acee`.

- **`integridade-node`**: job `131637834424`, **success**; Node v22.23.4; testes S19 26/26 e S20 41/41. São testes Node que usam simulação de DOM/VM para lógica de módulos.
- **`navegador-chromium`**: job `131637834027`, **success**; Chromium 158.0.8127.18. S20 executou 5 viewports. S21 executou **quatro itens auditados em cada uma das 5 viewports** = 20 verificações de item (além da repetição S20).
- Para Q6/Q7/Q9/Q48: gabarito oculto antes da resposta, correção histórica, `details` por Enter, fundamento atual separado, avaliação, agenda D+1/D+7/D+21 conforme cenário, Caderno com ID estável, duas URLs oficiais, anotação HTML adversarial escapada, tentativas únicas e releitura após `reload`. D+45 também passa na suíte unitária S20.
- Para 2023: item Q7 marcado anulado **não** pode ser corrigido/pontuado; Q1 responde com alternativa `A`, sem confundir A–E com C/E de 2015.
- **E2E do arquivo JSON:** Chrome efetivamente acionou **“Exportar cópia completa”**, salvou `AGU_Backup_Local_Completo.json` sintético, e um **novo contexto de navegador independente** importou o arquivo via `<input type=file>` com confirmação e alerta. Após `reload`, verificou registros, tentou importação repetida sem novas entradas, preservou existentes. Testou também arquivo falso de mais de 12 MB na própria interface.
- Testou rollback em navegador real com erro artificial de quota na segunda `Storage.setItem`; a primeira categoria restaurada foi revertida. Sem sincronização remota nem envio do JSON a terceiros.
- **Acessibilidade avaliada:** foco visível por Tab, operação de `<summary>` com Enter, `prefers-reduced-motion`, altura dos quatro alvos do menu em mobile, reflow/sem overflow nas páginas do teste e amostras de contraste ≥4,5:1. Não constitui teste completo de tela/teclado ou de leitor de tela.
- Capturas de viewport **apenas com dados sintéticos**: [artefato do workflow 14003032869](https://github.com/Talksxb/agu-quiz/actions/runs/43349807109/artifacts/14003032869). O JSON sintético de backup foi temporário no runner e não incluído no artefato.

**Rastreabilidade das rodadas intermediárias:** `43347661687` e `43347878438` revelaram seletores de teste; `43348072475` confirmou o overflow com detalhes do DOM; `43348204872` confirmou sua correção e identificou expectativa de teste prematura de quatro categorias; `43348347939` encontrou seletor de segundo acesso; `43348557671`, `43348992403` e `43349408920` passaram testes progressivamente ampliados. **Não contabilizar rodadas com falha como aprovação.**

## 5. GitHub Pages: comprovação de entrega HTTPS real

- URL oficial derivada do log de deploy do Pages (run `43346114364`, job `131625843932`): **https://talksxb.github.io/agu-quiz/**.
- A Sprint 21 publicou `tests/sprint21-pages.cjs` e adicionou job `pages-publicado` ao GitHub Actions. No run final `43349807109`, job `131637834695` **success**; HTML recebido por HTTPS com **HTTP 200**, e scripts `revisao-inteligente.js`, `planejamento-semanal.js`, `leitor-consolidacao.js` e `backup-local-s20.js` também **HTTP 200**.
- Arquivo HTML e quatro scripts foram confrontados com os **hashes SHA-256** dos arquivos do checkout; versões de cache **`?v=20261112-s20b`** nos módulos anteriores e **`?v=20261112-s21a`** no backup alterado. Resultado de log: `PAGES_VERIFICADO`.
- Logs de implantação Pages também mostram deploys bem-sucedidos; estes, isoladamente, não substituem a comprovação HTTP/hashes acima.
- Cache HTTP `max-age=600` nas respostas examinadas; versões na querystring reduzem risco de usuário continuar com JS antigo após atualização, mas não garantem ausência absoluta de cache em todo dispositivo.

## 6. Arquivos publicados e commits

| Arquivo | Commit de referência | Função |
|---|---|---|
| `tests/sprint20-browser.cjs` | `6ca95f4ee170a2ffce5f396e1c60374731aae0f7` | Seletor de rota não ambíguo; grava versão Chromium |
| `index.html` | `7aef5daf862b6944b6b7ab7a99dcebe4eab38e47` | Reflow do select, melhoria de contraste, cache de backup `s21a` |
| `backup-local-s20.js` | `cdfb2936c8b8ed805640d961ac6d2ce3b358da6f` | Validação de duplicatas, dispositivos, formato e limite |
| `tests/sprint21-browser.cjs` | `cff85c96650b555135b0989b3a12b8597051acee` | E2E real de 20 questões, teclado, contraste, arquivo/recuperação |
| `tests/sprint21-pages.cjs` | `450c0dc3bd574e9afee2a44599b7e3fab821e1b1` | Pages real por HTTPS, versão e SHA-256 |
| `.github/workflows/agu-sprint20-ci.yml` | `755a4c8a26183204315cd31e4e516b598b6b1f54` | CI Node, Chromium, Pages e artefatos |
| `docs/GUIA_BACKUP_LOCAL_S21.md` | `a4b475bd3fa3bf995e16d3a349cd8ed9da6a8005` | Orientação curta ao estudante |
| `docs/PROMPT_SPRINT22_2026-11-12.md` | `414f975fb87e16f49778b301cd0d4ebf9a872057` | Handoff completo, sem execução da Sprint 22 |

Arquivos de dados S18/S19, legislação, motor de planejamento e de revisão, Caderno, Sessões Integradas e Auditoria permaneceram **sem alterações** nesta sprint. Nenhuma nova entrada foi criada na navegação principal. Os 36 flashcards e 24 referências oficiais foram preservados.

## 7. Limitações e riscos residuais honestamente classificados

- **`nao_testado_android_fisico` (prioridade média):** não houve dispositivo Android real conectado para teste touch, Chrome e captura. Os testes Playwright usaram Chromium desktop com larguras mobile, sem equivalência de hardware.
- **Leitor de tela, WCAG integral e navegação de teclado em 100% das rotas (prioridade média):** apenas amostras de contraste, foco, `details` e reflow foram validadas em browser real; auditoria formal de acessibilidade permanece necessária.
- **Q1 2015 pendente (prioridade jurídica alta para reativação, impacto funcional contido):** não reativar `of-2015-adv-001` sem cotejo histórico independente; tentativas legadas estão preservadas.
- **Recuperação entre históricos concorrentes (prioridade média):** backup completo restaura só categorias ausentes; fusão de categorias já existentes é responsabilidade de importadores específicos. Nenhum algoritmo automático de conflito/sincronização foi implantado.
- **Limpeza de dados de navegador/quota real em diferentes dispositivos (prioridade média):** rollback foi testado sob exceção de quota induzida, não com esgotamento físico de armazenamento do Android; orientar backup externo.
- **Rede e uso offline (prioridade baixa):** o Pages foi validado por HTTP online. Não há serviço offline garantido, nem servidor para armazenamento de progresso.

## 8. Handoff e conclusão

- Instruções de backup para o estudante: `docs/GUIA_BACKUP_LOCAL_S21.md`.
- Próxima etapa, **somente como prompt persistido**: `docs/PROMPT_SPRINT22_2026-11-12.md`, voltada a robustez de dados, acessibilidade adicional e jornada sem atrito.
- **Sprint 21 concluída**, com E2E e Pages reais demonstrados, sem afirmar Android físico ou conformidade WCAG total. **Sprint 22 NÃO iniciada.**
