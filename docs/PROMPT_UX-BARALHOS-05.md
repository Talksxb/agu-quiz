# AGU QUIZ | WORK — UX-BARALHOS-05

## Handoff autossuficiente — validação assistiva em aparelho independente e decisão curricular sob evidência

**NÃO EXECUTAR** este prompt no encerramento da UX04. Exigir solicitação expressa posterior. Executar exclusivamente UX-BARALHOS-05, uma sprint, sem antecipar UX06. Nenhuma geração de cartões, provas, gabaritos, comentários jurídicos ou legislação; nenhuma mudança na matriz de 412 IDs, nos dados privados de auditoria, nos intervalos de revisão, em notas pessoais, no status das fontes, em autenticação, backend, analytics, sincronização ou GPT Sites. Não criar segundo caderno ou mecanismo paralelo de revisão.

### 1. Repositórios e fonte de verdade

- Código: https://github.com/Talksxb/agu-quiz
- Produção estática: https://talksxb.github.io/agu-quiz/
- Auditoria privada: `Talksxb/agu-auditoria`, **somente leitura se absolutamente indispensável e autorizada**; não publicar matriz, evidências ou rankings provisórios.

Antes de editar, confirmar `main`/HEAD real, branches, PRs abertas, conflitos, checks e mecanismo GitHub Pages. Ler integralmente `docs/CHECKPOINT_UX-BARALHOS-01_2026-11-15.md`, `...02...`, `...03...`, `docs/CHECKPOINT_UX-BARALHOS-04_2026-11-15.md`, `docs/PROMPT_UX-BARALHOS-05.md`, checkpoints LEG07–11, WORK01 e mudanças concorrentes. Inspecionar `revisao-inteligente.js`, `catalogo-disciplinas.js`, `baralhos-ux.css`, `planejamento-semanal.js`, `meu-estudo.js`, `estudo-integrado.js`, `leitor-juridico.js`, `backup-local-s20.js`, `questoes-leitor-s18.js`, `index.html`, `tests/ux-baralhos-01/02/03/04-*`, LEG10/11 e fixtures de hashes. Confirmar merge e publicação da UX04 por HTTPS e SHA-256; PR isolada **não equivale** a produção.

Fotografia histórica UX04 — reconfirmar em cada nova execução: `main` inicial `7fe92d1ffc0b3b7cfe398d90d1172feefb778621`; 36 cartões e seis baralhos (ADM-06 12, ADM-13 4, ADM-23 4, CON-02 2, CON-50 4, PC-03 10), 14 níveis cognitivos originais (2:7, 3:6, 4:1), 22 sem nível, nove categorias S20. UX04 corrigiu **apenas o rótulo do modo legado** para distinguir tentativas importadas sem agenda de cartões efetivamente inéditos; incrementou `?v=20261115-ux04`, criou delta próprio e testes sintéticos. Consultar o checkpoint final, PR e CI para o status definitivo. A UX01 estabeleceu biblioteca; UX02 seleção combinada e progresso; UX03 histórico derivado, `sem_data` e `AGUReview.exactDeck()` estritamente literal. LEG11 integrava `flashcard_existente` na lista única de caderno.

### 2. Gatilhos reais da UX05 — não implementar hipótese não demonstrada

**A. Android/TalkBack e compreensão pedagógica.** Se o usuário disponibilizar aparelho Android ou ambiente verdadeiramente independente, executar manualmente com **perfil sintético e isolado**: filtros `vencidos` (data anterior a hoje), `hoje`, `ineditos`, `sem_data`, histórico importado, múltiplas sessões, tecla/gestos/leitor de tela, contraste e foco. Obter observações concretas sobre rótulos no viewport 320–430 antes de alterar texto. Caso não haja Android físico ou TalkBack, manter o trabalho com Chromium como validação parcial e registrar o bloqueio com precisão; **não simular ter testado hardware ou assistência real**.

**B. Ponte curricular.** Examinar as tarefas reais públicas de `AGUPlanner` e `AGUHome`. Permitir atalho específico somente quando a **própria tarefa** tiver código granular literal idêntico a um baralho existente e comprovado por metadados públicos, usando o contrato `AGUReview.exactDeck(topic)`. O planejamento histórico usa `ADM/Atos administrativos`, que **não** equivale por inferência a `ADM-06`; não criar mapeamentos por título, afinidade, dispositivo jurídico ou volume de questões. Se nenhum par inequívoco existir, não criar atalho e registrar a decisão pedagógica necessária. Navegar jamais marca tarefa, minutos, revisão ou domínio.

**C. Robustez e LEG11.** Exercitar em perfis sintéticos: histórico longo, importação parcial de até 3 MB com tentativas sem agenda, restauração S20 de até 12 MB UTF-8 e nove categorias (somente categorias ausentes), notas LEG07–11 de origens distintas na mesma `forNotebook`, `librarySession` opcional, sessão de um e vários cartões, avaliação única por cartão/sessão, interrupção, reload, troca deliberada de subconjunto, conclusão e reestudo. Confirmar `DAYS=[1,7,21,45]` sem alteração, `cards[id].seen/due/stage` preservados até avaliação explícita. Cartões sem `deviceId` literalmente comprovado não ganham navegação contextual automática para artigo.

**D. Etiquetas e recorrência.** Dificuldade cognitiva original 2/3/4 não é a taxonomia proposta 1/2/3. Não classificar automaticamente. `AGUDisciplines.verifiedFrequency()` é interface vazia/opcional; AUD02-FREQ pode não ter ranking final confiável. Nenhum selo de “alta incidência”, ranking, prioridade ou oficialidade Cebraspe deve ser inventado. Conteúdo autoral continua autoral, e `conferido_pontualmente` não significa certificação jurídica integral.

### 3. Limites de implementação e testes

- Não apagar, migrar, copiar ou consultar histórico pessoal. Sem nova chave de storage, backend, caderno, login, sync ou troca do motor de revisão. Não alterar questões oficiais, gabaritos, matrizes, legislação ou comentários jurídicos.
- Preservar todas as suítes Node/Chromium, fixtures históricos e padrões de backup. Se modificar assets protegidos, criar **novo delta encadeado** ao fixture UX04; ajustar apenas expectativas de hash em testes antigos, sem reescrever seu histórico.
- Executar 28 ou mais suítes Node existentes, mais novas adequadas, e Chromium real isolado nas larguras 320, 360, 390, 430 e 1280 CSS px: biblioteca/filtros, estados, frente/verso, LEG11 voluntária, teclado Enter/Espaço, foco, `aria-live`, `prefers-reduced-motion`, overflow, pausa/retomada/recarga, backup e axe em 390/1280. Distinguir violações efetivas de `incomplete` inconclusivos e registrar capturas. Verificar WORK, leitor, questões oficiais, Estudo Integrado, planejamento e todas as sprints LEG.
- Se houver falha de privacidade, backup, revisão, CI ou proveniência jurídica, manter PR em rascunho e não mesclar. Sem Android/TalkBack, não afirmar teste físico/assistivo.

### 4. Entrega e publicação

Criar branch exclusiva `ux/baralhos-05` e PR. Esperar CI verde, ausência de conflito e critérios de aceite antes de merge conforme proteções. Confirmar após merge Pages via HTTPS e hashes SHA-256 de HTML, motor, CSS e assets alterados; executar jornada no endpoint publicado. Distinguir claramente código em PR de produção. Não presumir integração GitHub ↔ GPT Sites; não modificá-la. Documentar HEAD inicial/final, concorrências, commits, PR/CI, arquivos, contagens verificadas, execução local/navegador/Android, hashes, limites e decisões ainda não autorizadas. Criar `docs/PROMPT_UX-BARALHOS-06.md` autossuficiente como **único próximo handoff**, sem executar UX06. Encerrar após uma sprint.
