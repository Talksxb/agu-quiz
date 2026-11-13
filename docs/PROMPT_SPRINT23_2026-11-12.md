# AGU Quiz | PROMPT COMPLETO — Sprint 23
## Recuperação assistida, acessibilidade remanescente e uso móvel verificável

**Predecessora:** Sprint 22 — diagnóstico e validação das nove categorias locais. Ler `docs/CHECKPOINT_SPRINT22_DADOS_E_ACESSIBILIDADE_2026-11-12.md` antes de agir. **Este arquivo é somente handoff: não executar Sprint 23 no fechamento da Sprint 22.**

### 1. Missão e prioridade
Consolidar a recuperação segura dos dados e a acessibilidade em situações de uso não cobertas pelos cenários automatizados. Evitar mudanças cosméticas, reconstrução, novo menu, autenticação, backend, sincronização, coleta remota ou ampliação de questões sem cotejo independente. Dar preferência à correção de defeitos reproduzidos, com evidência, testes e mínimo impacto.

Manter os quatro destinos **Início, Estudar, Biblioteca Inteligente e Evolução**, 4 questões auditadas `of-2015-adv-006`, `-007`, `-009`, `-048`, 36 flashcards, 24 referências oficiais catalogadas (não equivalentes a 24 certificações jurídicas), histórico e agenda D+1/D+7/D+21/D+45.

### 2. Fontes e estado de partida
- GitHub aplicativo: https://github.com/Talksxb/agu-quiz (`main`). Auditoria privada: https://github.com/Talksxb/agu-auditoria. Ler `docs/PROTOCOLO.md`, `checkpoints/estado.json` e o checkpoint AUD03 mais recente; no fechamento da Sprint 22, `AUD03-016` (item `INT-27`) registrava **412 IDs válidos e zero tópicos certificados integralmente**. Não presumir persistência do número.
- Ler checkpoints S19–S22, `docs/GUIA_BACKUP_LOCAL_S21.md`, `index.html`, `backup-local-s20.js`, `revisao-inteligente.js`, `planejamento-semanal.js`, `caderno-contextual.js`, `estudo-integrado.js`, `leitor-juridico.js`, `leitor-consolidacao.js`, `questoes-leitor-s18.js` e dados S18/S19.
- Ler scripts `tests/sprint19-validacao.js`, `tests/sprint20-validacao.js`, `tests/sprint20-browser.cjs`, `tests/sprint21-browser.cjs`, `tests/sprint21-pages.cjs`, `tests/sprint22-browser.cjs`, `tests/sprint22-axe.cjs` e `.github/workflows/agu-sprint20-ci.yml`.
- Examinar o último run real GitHub Actions (jobs Node, Chromium e Pages) e o relatório `axe-diagnostico.json` publicado como artefato, inclusive os cenários `incomplete`. Não inferir conclusão se o job foi apenas configurado.

### 3. Falhas residuais e prioridade para diagnóstico
1. **Acessibilidade inconclusiva:** reproduzir, classificar e investigar as regras que o axe-core sinalizou como `incomplete` na Sprint 22. Verificar, manualmente quando possível, contraste, foco em botões, dropdowns, inputs ocultos de backup, ordem de navegação, voz/leitor de tela, nomes acessíveis e desenho em 320/360/390/430/1280 px. Zero violação automatizada em um recorte não equivale a aprovação WCAG completa.
2. **Android físico ainda não aferido:** se houver dispositivo conectado e autorizado, registrar modelo, Chrome, densidade/viewport, capturas sem dados reais e problemas touch. Caso contrário, manter o estado explícito `nao_testado_android_fisico`; emulação de Chromium em desktop não substitui esse teste.
3. **Backups históricos reais:** quando o estudante disponibilizar arquivos próprios, com autorização e sem publicação de dados pessoais, testar compatibilidade de versão, tratamento de formatos antigos e rejeição não destrutiva. Sem arquivos, registrar `nao_testado_backup_historico_real` e NÃO fabricar migração como se fosse comprovada.
4. **Nove categorias de storage:** reexecutar exportação/restauração do arquivo JSON em perfil novo, hash por categoria, reimportação idempotente, falta de quota, arquivo truncado/excessivo, campos inconsistentes, referência de dispositivo inválida e matriz curricular importada. A Sprint 22 passou a aplicar a mesma validação da importação normal da matriz ao backup. Não enfraquecer essa regra nem republicar a matriz privada.
5. **Jornada diária:** observar o início, a missão recomendada, o planejamento, a revisão e a volta ao Caderno/Evolução; confirmar não duplicação de tentativas ao reabrir ou recarregar.

### 4. Ações e testes
- Reproduzir bugs antes de qualquer patch. Classificar `falha_reproduzida`, `risco`, `nao_testado` ou `melhoria_opcional`, com gravidade, impacto e reproduções.
- Executar em Node 22 os testes S19/S20 e em Chromium real os E2E S20/S21/S22; registrar versão, commit, saída, run e links de artefatos. Verificar páginas HTTPS, hash e querystring `?v=20261112-s22a` para `backup-local-s20.js`.
- Considerar rodar axe-core e inspeção manual com foco nos cenários inconclusivos; anexar relatório. Investigar qualquer violação sem declarar certificação global por amostragem.
- Só implementar correções mínimas demonstráveis; manter localStorage sem sincronização e sem envio de dados privados. Sem consentimento e política de conflito/recuperação não criar banco, login ou migração em lote.
- Garantir invariantes: quatro navegações, quatro perguntas, 36 flashcards, gabaritos definitivos históricos, 2015 C/E, 2023 A–E e anulações sem pontuação; questões com `confirmado_pontualmente` não são `certificado_integralmente`.
- Q1 `of-2015-adv-001` permanece fora da nova correção automática até fundamentação histórica cotejada e variante validada. Excertos normativos CF37 X, CF49 V, L9784 art50 permanecem identificados como trechos.

### 5. Critérios de aceitação e encerramento
- Logs reais de Node/Chromium, status individual dos jobs, comparação real Pages e capturas sintéticas quando disponíveis.
- Backup local sem perda ou sobrescrita, critérios de validação unificados, compatibilidade de arquivos históricos apenas se realmente testados.
- Distinção entre resultados automatizados, casos inconclusivos e Android físico.
- Código e testes publicados em `main`, leitura posterior dos blobs/commits e registro de limitações/risco residual.
- Checkpoint Markdown com tabela de arquivos, commits, classificação de falhas e fontes verificadas; **prompt integral Sprint 24**, sem iniciar Sprint 24.

**Princípio permanente:** uma sprint por execução; profundidade verificável, dados privados, rastreabilidade superior à expansão numérica.
