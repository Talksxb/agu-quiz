# AGU Quiz | PROMPT COMPLETO — Sprint 21
## Evidência de navegador real, acessibilidade mobile e restauração segura

**Predecessora:** Sprint 20, checkpoint `docs/CHECKPOINT_SPRINT20_CONFIABILIDADE_2026-11-12.md` (2026-11-12). **Não iniciar durante o fechamento da Sprint 20.**

### 1. Missão e prioridade

Consolidar a confiabilidade comprovada **em ambiente real** do fluxo jurídico e do backup. A Sprint 20 corrigiu falhas reproduzidas em simulação e publicou testes Node e Playwright, mas **não obteve nesta execução resultado autenticado de GitHub Actions/Chromium, de Android físico ou confirmação de GitHub Pages atualizado**. A prioridade é obter evidência verificável e corrigir defeitos que ela revele, sem expandir questões ou criar telas adicionais.

Conservar **Início, Estudar, Biblioteca Inteligente e Evolução**, os IDs históricos, quatro questões auditadas de Sprint 18/19, 36 flashcards, 24 referências oficiais históricas e o motor de revisão. Não confundir índice com certificação jurídica, nem atualizar gabarito histórico por direito superveniente.

### 2. Reconhecimento obrigatório

- Repositórios: https://github.com/Talksxb/agu-quiz (aplicativo); https://github.com/Talksxb/agu-auditoria (auditoria privada).
- No aplicativo, ler `docs/CHECKPOINT_SPRINT20_CONFIABILIDADE_2026-11-12.md`, `docs/CHECKPOINT_SPRINT19_QUESTOES_2026-11-12.md`, `index.html`, `revisao-inteligente.js`, `planejamento-semanal.js`, `backup-local-s20.js`, `caderno-contextual.js`, `estudo-integrado.js`, `questoes-leitor-s18.js`, `leitor-juridico.js`, `leitor-consolidacao.js`, arquivos de dados S18/S19, `tests/sprint19-validacao.js`, `tests/sprint20-validacao.js`, `tests/sprint20-browser.cjs` e `.github/workflows/agu-sprint20-ci.yml`.
- Na Auditoria ler `docs/PROTOCOLO.md`, `checkpoints/estado.json` e o checkpoint AUD03 mais recente. Em 12/11/2026, havia informação `AUD03-011` com status parcial; confirmar de novo e não alterar a matriz-base de 412 IDs.
- Consultar status do commit e GitHub Actions. Distinguir **workflow definido** de **workflow executado, aprovado e com logs**. Não inferir sucesso sem job ID, log e conclusão.

### 3. Diagnóstico de falhas e prioridades

1. Executar em Node 22 (ou versão declarada): `node tests/sprint19-validacao.js` e `node tests/sprint20-validacao.js`. Registrar comandos, versão, saída completa, commit e erros reais.
2. Executar `node tests/sprint20-browser.cjs` com Playwright Chromium instalado, registrar versão de browser, viewport, screenshots e eventuais falhas de seletor/overflow/404.
3. Conferir em GitHub Pages o carregamento efetivo dos scripts com `?v=20261112-s20b`, resoluções de rede e cache. Se o Pages não estiver ativo, declarar e registrar caminho oficial de publicação; não inventar URL nem confundir acesso ao GitHub com acesso ao site.
4. Reproduzir no Android físico apenas se o dispositivo estiver disponível e autorizado; registrar modelo, Chrome, largura útil, captura sem dados pessoais e problemas touch reais. Na ausência, declarar `nao_testado_android_fisico`.

### 4. Cenários E2E e acessibilidade

Navegar Início → Estudar → Biblioteca Inteligente → Questões Cebraspe → Q6/Q7/Q9/Q48 → responder → revelar gabarito histórico → expandir fundamento 2015 e 2026 → classificar → observar agendamento D+1/D+7/D+21/D+45 → Caderno com anotação manual e links oficiais → Evolução → Dados e backup. Repetir em 320, 360, 390, 430 e 1280 px. Validar sem overflow horizontal, botão com área de toque adequada, focos visíveis, teclado/Enter, ordem lógica de tabulação, expandir/recolher `<details>`, texto sem truncamento e aviso de excerto normativo. Validar responsividade com CSS real; a existência de uma regra `@media` não substitui visualização.

### 5. Recuperação e privacidade dos dados

- O backup local completo `agu-portable-local-s20-v1` contempla exatamente nove chaves de `localStorage`, sem servidor. Validar captura, arquivo, reimportação em perfil novo de navegador, recarregamento, integridade estrutural e idempotência.
- Restaurar **apenas chaves ausentes**, preservando estados já existentes. Testar rollback de quota/erro, arquivo maior que 12 MB, JSON quebrado, esquema incompatível, chaves não autorizadas e dados internos inválidos. Não introduzir mecanismo automático de sobrescrita em massa.
- Conferir que o backup do módulo Revisão rejeita IDs repetidos e alternativas inválidas e que Planejamento rejeita tarefas/dias inconsistentes. Testar importações repetidas e backups históricos legítimos.
- Diferenciar estratégia de *restauração de categoria ausente* (backup completo) de *importação incremental de registros* (módulos Revisão, Caderno, Sessões, Planejamento). Preservar histórico antes de qualquer migração. Elaborar orientação curta para usuário sobre armazenamento local e riscos de limpeza do navegador.
- Sem autenticação ou sincronização remota sem autorização específica e estudo de privacidade, conflitos e recuperação.

### 6. Fidelidade e risco jurídico

A questão legada `of-2015-adv-001` teve a correção automática suspensa na Sprint 20 porque sua justificativa atual de 2025 não substitui reconstrução jurídica de 2015. Não reativá-la sem cotejo oficial de caderno, variante, gabarito e legislação/jurisprudência **na data da prova**; preservar tentativas preexistentes e deixar pendência visível. Outras questões legado não equivalem às quatro plenamente integradas à aba auditada.

Manter 2015 como Certo/Errado e 2023 como múltipla escolha A–E; anulações excluídas da pontuação. Os dispositivos CF37 X, CF49 V e L9784 art50 são **excertos**, não artigos completos. Evitar alteração da matriz original, da Auditoria ou de gabaritos definitivos sem fonte documental.

### 7. Critérios de aceitação

- Node executado de fato e saída preservada.
- E2E Chromium realizado de fato, com capturas e registro de cada largura, **ou** pendência específica quando ambiente não disponibilizar.
- Pages com carregamento real aferido, se publicado; não inferir.
- Zero regressões nos quatro IDs auditados, 36 flashcards, quatro áreas principais, dados locais e calendário.
- Backup e restauração sem sobrescrita de categorias existentes demonstrados em navegador real.
- Diferença clara entre teste automatizado em desktop, viewport mobile e Android físico; não trocar um pelo outro.
- Alterações mínimas e motivadas por bugs reproduzíveis; sem crescimento cosmético do menu.
- Checkpoint contendo status, arquivos, commits, falhas, riscos, CI e fontes; prompt integral Sprint 22, **sem iniciar Sprint 22**.

### 8. Procedimento

Diagnóstico → reprodução real → correção mínima → testes → GitHub → leitura posterior do commit → checkpoint Markdown → handoff Sprint 22. **Uma sprint por vez. Mais profundidade funcional, menos complexidade visual.**
