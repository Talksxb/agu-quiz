# AGU Quiz | PROMPT COMPLETO — Sprint 22
## Robustez de dados locais, acessibilidade comprovada e jornada diária sem atrito

**Predecessora:** Sprint 21 — navegador real, contraste, backup seguro e Pages, checkpoint `docs/CHECKPOINT_SPRINT21_NAVEGADOR_E_BACKUP_2026-11-12.md`.

**Limite de execução:** este arquivo é somente handoff. **Não executar Sprint 22 durante o fechamento da Sprint 21.**

### 1. Missão

Prosseguir a estabilização funcional, com foco no uso diário do AGU Quiz, recuperação de dados e acessibilidade **com evidência real**. Preservar quatro destinos principais — **Início, Estudar, Biblioteca Inteligente e Evolução** — e a arquitetura JavaScript/localStorage atual; não reconstruir a aplicação, não criar login, backend, sincronização ou novos menus. Evitar expandir o número de questões antes de consolidar os fluxos e auditar quaisquer mudanças jurídicas individualmente.

### 2. Fontes e reconhecimento obrigatório

- App: `https://github.com/Talksxb/agu-quiz`, branch `main`. Auditoria privada: `https://github.com/Talksxb/agu-auditoria`. Consultar `docs/PROTOCOLO.md`, `checkpoints/estado.json` e checkpoint AUD03 mais recente; no corte da Sprint 21, havia **AUD03-014**, parcial e **zero certificações integrais**. Conferir se progrediu.
- App: começar pelos checkpoints das Sprints 19–21, `index.html`, `revisao-inteligente.js`, `backup-local-s20.js`, `planejamento-semanal.js`, `caderno-contextual.js`, `estudo-integrado.js`, `leitor-juridico.js`, `questoes-leitor-s18.js`, `leitor-consolidacao.js`, dados S18/S19, `docs/GUIA_BACKUP_LOCAL_S21.md`.
- Testes: `tests/sprint19-validacao.js`, `tests/sprint20-validacao.js`, `tests/sprint20-browser.cjs`, `tests/sprint21-browser.cjs`, `tests/sprint21-pages.cjs`, `.github/workflows/agu-sprint20-ci.yml`.
- Preservar os **quatro itens auditados** (`of-2015-adv-006`, `-007`, `-009`, `-048`) e 36 flashcards; não equiparar as 24 referências oficiais do catálogo a 24 questões plenamente certificadas. Conservar resposta 2015 C/E e prova 2023 A–E, anuladas excluídas da pontuação.

### 3. Diagnóstico de partida e evidência

1. Ler o commit corrente e logs completos do último workflow GitHub Actions; **status verde só vale com jobs e conclusão**. Verificar Node 22 e Chromium real, incluindo capturas nas larguras 320/360/390/430/1280.
2. Confirmar GitHub Pages a partir do URL já apurado em logs oficiais `https://talksxb.github.io/agu-quiz/` e dos hashes e versões de script realmente servidos, não só do commit do GitHub.
3. Corrigir apenas falhas reproduzidas. Classificar: **falha comprovada**, **risco**, **não testado** ou **melhoria opcional**. Não alterar arquivos sem justificativa.
4. Android físico continua `nao_testado_android_fisico` até haver dispositivo, Chrome e capturas verificáveis. Chromium desktop estreito **não** equivale ao hardware Android.

### 4. Segurança e recuperação de dados — prioridade

- Validar as **nove categorias** do backup local `agu-portable-local-s20-v1`: histórico principal, revisão, planejamento, Caderno, sessões, notas do Leitor, preferências, matriz e mapeamento.
- Reproduzir em navegador real exportação de JSON e restauração em perfil limpo com recarga, confrontando tentativas, notas, sessões e calendários. Garantir idempotência e que importação completa **não sobrescreve categorias existentes**.
- Testar importação de versões antigas reais quando disponíveis, JSON truncado, campos incorretos, ID duplicado, dispositivo normativo inexistente, quota de armazenamento, arquivo de mais de 12 MB e conteúdo HTML de nota. Evitar migração destrutiva.
- Inspecionar a retenção do histórico ao alternar entre questão, Leitor Jurídico, Caderno, Evolução e volta. A mesma classificação deve gerar **uma única tentativa** e agendamento único, sem duplicidade após reload.
- Documentar explicitamente limites de backups dos módulos separados: Revisão e Caderno importam registros incrementalmente; backup completo somente restaura categorias ausentes. Quando duas categorias já possuem dados, não automatizar uma fusão com conflito sem política aprovada.

### 5. Acessibilidade e comportamento mobile

- Medir em Chromium os cinco tamanhos de viewport e em **Android físico** apenas quando disponível: largura efetiva, scroll horizontal em todas as telas, botões e alvos de toque (mínimo praticável de 44 px), tamanho da fonte, foco visível, tabulação, `<details>`, leitores de tela quando possível, teclado e `prefers-reduced-motion`.
- Verificar contraste calculado com cores e fundo efetivamente renderizados. Preservar as correções de Sprint 21 dos textos auxiliares, sem esconder falhas com `overflow-x:hidden`.
- Observar se dropdowns e selects longos continuam dentro do viewport. O seletor oficial de 2023 já sofreu correção específica de largura na Sprint 21; evitar regressão.
- Se ferramenta tipo axe-core estiver disponível, incorporar auditoria automatizada e classificar avisos; não alegar conformidade WCAG global por testes parciais.

### 6. Fidelidade jurídica e pedagógica

- Preservar o gabarito definitivo **histórico**. Estado da matéria em 2026 deve continuar rotulado à parte e `confirmado_pontualmente` não deve ser promovido a `certificado_integralmente`.
- A Q1 de 2015 `of-2015-adv-001` permanece **bloqueada para nova correção automática** enquanto não houver reconstrução independente da fundamentação vigente em 2015 e da variante; preservar tentativas antigas.
- Os recortes CF 37 X, CF 49 V e L9784 art. 50 caput I/§1º são **excertos**, não transcrição integral. Não inserir novas questões Cebraspe sem confronto do mesmo caderno, variante, gabarito e fundamentação, nem alterar a matriz de 412 IDs.

### 7. Critérios de aceitação

- Logs reais de Node e Chromium, URL do run, commit, versão de runtime e navegador.
- Todos os fluxos críticos em 320/360/390/430/1280, com registros de casos específicos ou riscos.
- Backup e recuperação sem perda ou sobrescrita validados com dados sintéticos; explicar limites da sincronização inexistente.
- Zero regressão nas quatro áreas principais, quatro itens auditados, 36 flashcards e motor D+1/7/21/45.
- Documentação de falhas abertas com severidade, reprodução e hipótese de correção; Android físico identificado como não testado quando aplicável.
- Todos os arquivos e commits publicados em `main`, lidos novamente após escrita.
- Checkpoint Markdown final e **prompt Sprint 23 completo**, sem executar Sprint 23.

### 8. Procedimento e princípio

Diagnóstico → reprodução → correções mínimas → testes reais → publicação → leitura posterior → checkpoint → handoff. Uma sprint por vez. **Rastreabilidade acima de expansão numérica.**
