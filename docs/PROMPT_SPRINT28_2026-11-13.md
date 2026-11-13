# AGU Quiz | PROMPT COMPLETO — Sprint 28
## Validação condicionada de históricos reais, navegação acessível e recuperação íntegra

**Predecessora:** Sprint 27 — validação do artigo, dispositivo, notas e estado do Leitor Jurídico ao restaurar backup portátil. **Ler primeiro** `docs/CHECKPOINT_SPRINT27_INTEGRIDADE_LEITOR_RECUPERACAO_2026-11-13.md`, `docs/GUIA_BACKUP_LOCAL_S21.md` e `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`. Este documento é **somente handoff**: **não executar a Sprint 28 no encerramento da Sprint 27**.

## 1. Objetivo e limites

Investigar riscos residuais de recuperação local e acessibilidade sem expandir o produto. Priorizar hardware Android/TalkBack e backup histórico **somente quando os meios estiverem disponíveis e houver autorização específica**. Sem esses recursos, manter `nao_testado_android_fisico` e `nao_testado_backup_historico_real`, fazer regressões sintéticas e não declarar comprovações impossíveis.

**Regra: uma sprint por execução.** Antes de qualquer patch, registrar falha reproduzida com contexto, dados sintéticos, resultado esperado/observado, versão, largura, gravidade e impacto. Se não existir defeito reproduzido, **não forçar alteração de código ou cosmética**. Proibidos novos destinos, reestruturação da interface, questões por aproximação, autenticação, banco, backend, sincronização, coleta remota, migração em lote, fusão automática de dispositivos e mudanças privadas da Auditoria sem pedido específico.

## 2. Fonte de verdade e baseline dinâmico

- Aplicação `https://github.com/Talksxb/agu-quiz`, branch `main`. Confirmar SHA/HEAD efetivo, diff, blobs, execução do GitHub Actions e Pages. Auditoria privada `https://github.com/Talksxb/agu-auditoria`, **apenas leitura**.
- Ler checkpoints S19–S27 (com prioridade à S27), guia de backup S21, roteiro Android S24, prompts S26/S27 e este handoff. Não tratar versões/contagens informadas como permanentes.
- Revisar `index.html`, `backup-local-s20.js`, `leitor-juridico.js`, `revisao-inteligente.js`, `planejamento-semanal.js`, `caderno-contextual.js`, `estudo-integrado.js`, `leitor-consolidacao.js`, `questoes-leitor-s18.js`, dados S18/S19 e importadores específicos, respeitando contratos atuais.
- Revisar `tests/sprint19-validacao.js`, `tests/sprint20-validacao.js`, `tests/sprint20-browser.cjs`, `tests/sprint21-browser.cjs`, `tests/sprint21-pages.cjs`, `tests/sprint22-browser.cjs`, `tests/sprint22-axe.cjs`, `tests/sprint23-browser.cjs`, `tests/sprint23-axe.cjs`, `tests/sprint24-contrast.cjs`, `tests/sprint25-validacao.js`, `tests/sprint26-validacao.js`, `tests/sprint27-validacao.js` e `.github/workflows/agu-sprint20-ci.yml`.
- Reabrir o run **S27 real** citado no checkpoint, os três jobs `integridade-node`, `navegador-chromium`, `pages-publicado`, logs completos, artefato sintético e o deploy Pages mais recente. Confirmar HTTPS HTTP 200, hashes do HTML + quatro scripts, versão do backup `backup-local-s20.js?v=20261113-s27a` ou posterior com justificativa. Não deduzir execução por haver workflow configurado.
- Auditoria 3: ler `docs/PROTOCOLO.md`, `checkpoints/estado.json`, último `AUD03` efetivamente integrado, matriz de trabalho somente para averiguar status, evidências normativas persistidas após o checkpoint e eventual merge de PR. **No início da S27**: AUD03-019, 412 IDs únicos, 125 lotes normativos integrados de 126 persistidos, 354 IDs com alguma evidência, 58 sem, zero tópicos certificados integralmente; `NORM-INT-029` (INT32) ainda pendente de integração. **Reconferir o estado no início da S28 e no encerramento**, distinguindo persistência de integração.

## 3. Frentes de verificação

### A. Android físico e acessibilidade humana

Com aparelho **fisicamente conectado e autorizado**, registrar modelo, versões Android/Chrome, orientação, viewport CSS, densidade quando mensurável, conexão e perfil isolado, usando somente dados sintéticos. Seguir `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`: quatro destinos, menu horizontal e Mais, Plano semanal, seletor 2023, revisão, leitor, Caderno, backup sintético, retorno e refresh, teclado virtual, toque e rolagem. Havendo autorização e TalkBack, aferir papéis, nomes, foco, anúncio do título e ordem de navegação, inclusive menu parcialmente escondido. Capturas sem respostas pessoais.

Sem hardware, marcar **`nao_testado_android_fisico`**; emulação Chromium **não** valida toque físico, Android ou TalkBack. No desktop, cobrir quando viável 320/360/390/430/1280 px e separar testes de `Tab`, `.focus()`, touch emulado e inspeção visual. Axe S24–S27: 13 cenários/19 nós `color-contrast incomplete` por `elmPartiallyObscured` no primeiro recorte; 19/19 passaram após rolagem completa. **`incomplete` não é `violation`, e zero violations automatizadas não é conformidade WCAG global.** Corrigir contraste ou foco apenas diante de falha concreta reproduzida.

### B. Backup e integridade do Leitor

- Preservar esquema **`agu-portable-local-s20-v1`**, **nove categorias** do `localStorage`, limite de **12.000.000 bytes UTF-8** para categoria, conjunto e arquivo JSON formatado, validação curricular normal via **`AGUValidateMatrix`**, importação apenas de categorias ausentes, quota com rollback, reimportação idempotente, SHA-256 por categoria e nenhuma sobrescrita. O arquivo de backup e as notas pessoais nunca devem ser enviados ao GitHub ou a artefatos.
- Reexecutar S25: 650 registros sintéticos acentuados acima de 12 MB, diferença entre **11.999.987** bytes compacto e **12.000.013** bytes formatado, arquivo pequeno importável. A massa do caso de formatação deve permanecer composta por registros válidos do Caderno; não usar notas irreais como se fossem aceitas pelo Leitor.
- Reexecutar S26: `notes` apenas strings de até **14.000 caracteres**; tipos falsos e excesso devem ser rejeitados antes da escrita.
- Reexecutar S27: rejeitar artigo desconhecido, unidade inexistente ou não pertencente ao artigo, notas associadas a dispositivo inexistente e abas ou painéis mobile falsificados. A falha S27 pré-patch aceitava artigo inexistente e, ao carregar o Leitor, reinicializava `notes={}`, ocultando notas sintéticas; agora o backup deve ser recusado **antes da restauração**, sem alterar categorias presentes. Confirmar positivo com anotações de dois artigos reais, SHA, idempotência e preservação após reload.
- Cobrir JSON truncado, tamanho excessivo, versão/categoria indevida, IDs repetidos, dispositivo/sessão inválidos, matriz inconsistente, falta de quota e rollback. Verificar em Chromium com perfil descartável, arquivos totalmente sintéticos; jamais publicar matriz privada.
- A recusa de backup >12 MB evita exportação irrestaurável, mas **não fornece** solução para estado genuinamente acima do limite; não inventar compressão, divisão manual ou limpeza de navegador. O patch S27 impede **importar** estado inválido; não repara automaticamente armazenamento antigo já corrompido.
- Se o usuário fornecer **voluntariamente backup histórico real e autorizar** avaliação local isolada, preservar cópia original, registrar somente hashes, tamanhos, contagens e características não identificáveis, sem anexar ao GitHub/CI/Issues/artefatos públicos. Sem amostra, manter `nao_testado_backup_historico_real`. Em conflito de aparelhos, conservar ambas as cópias, nunca mesclar por suposição.

### C. Jornada e fidelidade jurídica

Percorrer Início → missão recomendada → Estudar/Planejamento → Revisão → Caderno/Leitor → Evolução, com retorno, teclado e refresh. Assegurar ausência de tentativas sem resposta e de duplicatas.

Preservar **exatamente quatro destinos** — Início, Estudar, Biblioteca Inteligente, Evolução —, os **quatro itens auditados** `of-2015-adv-006/-007/-009/-048` (gabaritos históricos **E/C/E/C**), **36 flashcards**, **24 referências oficiais catalogadas** (não certificadas integralmente), revisão **D+1/D+7/D+21/D+45**, formatos 2015 **C/E**, 2023 **A–E**, anuladas sem pontuação.

`of-2015-adv-001` continua bloqueada na nova correção automática até cotejo independente de variante, caderno, gabarito e fundamentação. CF art. 37, X; CF art. 49, V e Lei 9.784 art. 50 permanecem **excertos**. `confirmado_pontualmente` nunca deve ser promovido a `certificado_integralmente` por simples cobertura ou contagem.

## 4. Execução, publicação e aceitação

1. Reconferir branch/HEAD, documentos, estado AUD03, jobs/artifact S27 e pendências. Classificar individualmente `falha_reproduzida`, `risco`, `nao_testado` ou `melhoria_opcional`, com gravidade e reprodução.
2. Reproduzir antes de qualquer patch. Só editar o menor escopo necessário; adicionar S28 test apenas se houver nova falha demonstrada ou uma verificação humana comprovável. Sem falha, **não alterar o produto**.
3. Executar **Node 22 real** S19 (26/26), S20 (41/41), S25 (3 casos), S26 e S27; executar **Chromium real** E2E S20–S24 e axe S22/S23/S24, cinco viewports, backup sintético e navegação diária. Identificar claramente execuções locais, CI, emulação, testes não realizados e limitações de ambiente.
4. Havendo patch, publicar código/teste mínimo em `main`, reabrir os blobs e o commit, conferir novo run de CI posterior ao SHA e resultados dos **três jobs individualmente**, com logs, ZIP, hashes e Pages HTTPS 200. Sem patch, documentar somente runs e testes realmente executados, sem afirmar rerun inexistente. Se houver mudança em `backup-local-s20.js`, atualizar querystring de cache e verificador Pages.
5. Garantir confidencialidade de históricos, respostas, notas e matriz privada. Não tocar na Auditoria 3 nem criar infraestrutura/sincronização sem autorização distinta e política formal de recuperação de conflitos.

## 5. Fechamento e próximo handoff

Criar **checkpoint Markdown S28** com baseline, commit/HEAD final, tabela de arquivos e hashes, fontes, reproduções anteriores/posteriores, logs reais dos jobs, status Android e backup histórico, limites WCAG, auditoria reconferida e riscos residuais. Preparar **prompt integral da Sprint 29 como handoff**, **sem iniciar a Sprint 29**.

**Princípio permanente:** uma sprint por execução; dados pessoais protegidos, rastreabilidade verificável e rigor jurídico acima de expansão visual, quantitativa ou tecnológica.
