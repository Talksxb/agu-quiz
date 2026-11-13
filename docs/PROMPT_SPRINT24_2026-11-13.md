# AGU Quiz | PROMPT COMPLETO — Sprint 24
## Validação humana guiada, recuperação histórica condicionada e resiliência móvel

**Predecessora:** Sprint 23 — recuperação segura, foco e semântica de navegação, investigação dos nós axe inconclusivos. **Ler primeiro** `docs/CHECKPOINT_SPRINT23_RECUPERACAO_ACESSIBILIDADE_MOBILE_2026-11-13.md`. Este documento é exclusivamente **handoff**: **não executar a Sprint 24 no fechamento da Sprint 23**.

## 1. Missão e prioridade

Concluir as verificações de uso real que dependem de hardware ou arquivos históricos autorizados e investigar apenas riscos remanescentes com reprodução verificável. Priorizar segurança da recuperação local, interação por teclado/toque e acessibilidade de navegação, sem reconstruir a interface, sem ampliar menu, sem novos conteúdos jurídicos por aproximação e sem declarações globais de certificação.

**Princípio:** uma sprint por execução. Mudar código só diante de defeito reproduzido, com evidência anterior e posterior, testes mínimos, CI e rastreabilidade. Preservar todos os resultados S19–S23.

## 2. Repositórios, fontes e estado inicial

**Aplicação:** `https://github.com/Talksxb/agu-quiz`, branch `main`.
**Auditoria privada:** `https://github.com/Talksxb/agu-auditoria`, somente leitura salvo autorização específica de outra frente.

Ler, sem presumir estado estático:

1. Checkpoints S19–S23, especialmente o checkpoint S23; `docs/GUIA_BACKUP_LOCAL_S21.md`, prompt S23 e este handoff.
2. `index.html`, `backup-local-s20.js`, `revisao-inteligente.js`, `planejamento-semanal.js`, `caderno-contextual.js`, `estudo-integrado.js`, `leitor-juridico.js`, `leitor-consolidacao.js`, `questoes-leitor-s18.js` e dados S18/S19.
3. Testes `tests/sprint19-validacao.js`, `tests/sprint20-validacao.js`, `tests/sprint20-browser.cjs`, `tests/sprint21-browser.cjs`, `tests/sprint21-pages.cjs`, `tests/sprint22-browser.cjs`, `tests/sprint22-axe.cjs`, `tests/sprint23-browser.cjs`, `tests/sprint23-axe.cjs` e workflow `.github/workflows/agu-sprint20-ci.yml`.
4. Logs individuais do último GitHub Actions CI real, especialmente run [43410431814](https://github.com/Talksxb/agu-quiz/actions/runs/43410431814) e [artefato 14029197398](https://github.com/Talksxb/agu-quiz/actions/runs/43410431814/artifacts/14029197398), e estado HTTPS de Pages. Não inferir sucesso apenas porque um job está configurado.
5. Na Auditoria 3, `docs/PROTOCOLO.md`, `checkpoints/estado.json` e checkpoint `AUD03` mais recente de fato persistido. No encerramento da S23 era `AUD03-016`, com 412 IDs únicos, 121 lotes normativos integrados e **zero tópicos certificados integralmente**; havia NORM-INT-025/026 posteriores sem integração. **Reconferir números e merge** em vez de repetir fotografia histórica.

## 3. Questões pendentes e limites de autoridade

### A. Android físico e acessibilidade real

- **Somente se houver dispositivo fisicamente conectado e autorizado:** identificar modelo, Android/Chrome, viewport CSS, densidade, orientação e estado de conexão. Testar menu horizontal, foco, botões de backup, seletor de 2023, teclado virtual, toque, rolagem, importação local com arquivo **sintético** e contraste visual. Quando viável e autorizado, examinar leitura por TalkBack e ordem de navegação. Anexar capturas **sem dados pessoais**.
- Sem aparelho acessível/autorizado, registrar explicitamente `nao_testado_android_fisico`, sem alegar que Chromium desktop ou Chrome remoto substituem toque/TalkBack. Não pedir credenciais nem acesso remoto não autorizado.
- Cobrir, quando possível, 320/360/390/430/1280 px no Chromium desktop e documentar que essas medidas não são as do aparelho.

### B. Axe-core e contraste parcialmente recortado

- A S23 removeu os **21 cenários** `aria-prohibited-attr` ao trocar a navegação interna para `<nav>`.
- Permaneceram **13 cenários/18 nós `color-contrast` incomplete** por `elmPartiallyObscured`, ligados a itens/summary parcialmente escondidos pelo menu horizontal. O relatório S23 contém nós exatos e **93 medições de CSS com mínimo 5,99:1**, mas não estabelece WCAG global.
- Investigar com controles integralmente visíveis após rolagem horizontal, estados ativo/hover/foco, medição visual quando disponível, regras de contraste e nomes acessíveis; preservar diferenças entre `incomplete`, `violation` e cálculo CSS. Somente corrigir CSS se houver falha concreta reproduzida. Evitar declarar conformidade global.

### C. Backups históricos reais e conflitos entre aparelhos

- **Somente se o usuário fornecer voluntariamente um backup próprio e autorizar esse teste:** testar versão/esquema de arquivo histórico localmente, isolado e sem upload público. Nunca anexar backup com notas, matrizes ou respostas reais a GitHub Actions, issues, repositório ou artefatos.
- Sem amostra, manter `nao_testado_backup_historico_real`; não fabricar retrocompatibilidade e não extrapolar testes sintéticos.
- Rejeitar JSON truncado, acima de 12 MB, versão desconhecida, categoria não autorizada, campos falsos, ID duplicado, dispositivo inexistente e matriz importada inconsistente sem modificação de dados preexistentes. Conferir rollback por quota e hashes SHA-256 por **nove categorias** após perfil novo, idempotência e não sobrescrita.
- Não criar fusão automática de versões concorrentes, login, banco, sincronização, backend, importação em lote ou coleta remota sem consentimento explícito e política de conflito/recuperação definida separadamente. Preferir procedimento manual seguro com preservação de ambos os arquivos.

### D. Jornada diária e conteúdo estável

- Repercorrer Início → missão recomendada → Estudar/Planejamento → Revisão → Caderno/Leitor → Evolução, incluindo retorno, refresh e navegação por teclado. Testar que não se criam tentativas sem resposta nem duplicatas em reload ou volta de seção.
- Manter exatamente os quatro destinos, quatro questões auditadas `of-2015-adv-006/-007/-009/-048`, gabaritos históricos E/C/E/C, 36 flashcards, 24 referências oficiais catalogadas (não certificadas integralmente), calendário D+1/D+7/D+21/D+45, 2015 C/E, 2023 A–E, anulações sem pontuação.
- Q1 `of-2015-adv-001` continua fora da nova correção automática até cotejo do caderno, variante, gabarito e fundamentação histórica independente. Excertos CF37 X, CF49 V e Lei 9.784 art. 50 permanecem trechos identificados, não textos completos.

## 4. Método de execução

1. **Revalidar baseline:** branch/HEAD, checkpoints e estado AUD03, relatórios, artefatos e problemas remanescentes. Classificar cada caso `falha_reproduzida`, `risco`, `nao_testado`, `melhoria_opcional` com severidade, dados de reprodução e impacto.
2. **Diagnosticar antes do patch:** registrar versão do navegador, largura, ação, resultado esperado/observado e estado local sintético. Nenhuma alteração cosmética baseada só em intuição.
3. **Executar Node 22 e Chromium reais:** S19 26/26, S20 41/41 e E2E S20–S23, axe S22/S23. Acrescentar teste S24 somente para o problema novo efetivamente identificado. Manter arquivos sintéticos sem histórico pessoal.
4. **Preservar contrato do backup:** esquema `agu-portable-local-s20-v1`, nove chaves catalogadas, armazenamento `localStorage` sem sincronização, importação só de categorias ausentes, validação curricular unificada por `AGUValidateMatrix`, `backup-local-s20.js?v=20261112-s22a` até alteração justificada. Se alterar o script, atualizar querystring e teste HTTPS/hash de Pages.
5. **Verificar CI e publicação:** abrir o run GitHub Actions final, ler logs individuais Node/Chromium/Pages e baixar artefatos. Conferir URL Pages com HTTPS HTTP 200, correspondência de hash do HTML e scripts e cache; não confundir runner de CI com Android real.
6. **Revisar impacto jurídico e de privacidade:** não mexer na Auditoria privada sem tarefa específica; não promover `confirmado_pontualmente` a `certificado_integralmente`, nem publicar matriz, questões não cotejadas ou backups pessoais.

## 5. Critérios de aceite e encerramento

- Reprodução antes e depois de cada falha corrigida, testes automatizados pertinentes e evidência auditável; mudanças pequenas e localizadas em `main`.
- Logs reais com Node/Chromium/axe, status **individual** dos jobs, correspondência Pages e artefatos sintéticos; reabrir blobs/commits para verificar persistência.
- Backup completo sem perda ou sobrescrita, tratamentos de arquivo inválido/quota, hashes por categoria, reimportação idempotente e status honesto de compatibilidade histórica.
- Distinguir `nao_testado_android_fisico`, `nao_testado_backup_historico_real`, `color-contrast incomplete`, inspeção manual e quaisquer violações realmente detectadas. Sem certificação WCAG global por amostragem.
- Checkpoint Markdown S24 com tabela de arquivos, commits, classes de falhas, reproduções, fontes e riscos residuais, e **prompt integral para Sprint 25 sem iniciar Sprint 25**.

**Regra permanente:** profundidade verificável, segurança das respostas pessoais e fidelidade à evidência jurídica prevalecem sobre novas telas, números de perguntas ou rótulos de certificação.
