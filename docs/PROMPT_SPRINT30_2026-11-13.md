# AGU Quiz | PROMPT COMPLETO — Sprint 30
## Foco pós-ativação no Leitor, recuperação íntegra e acessibilidade humana condicionada

**Predecessora:** Sprint 29, com falha demonstrada na ativação por Espaço em `.agu-unit` do Leitor, correção mínima publicada, CI real aprovado e limites de Android/backup pessoal preservados. **Ler primeiro:** `docs/CHECKPOINT_SPRINT29_TECLADO_LEITOR_RECUPERACAO_2026-11-13.md`, `docs/GUIA_BACKUP_LOCAL_S21.md` e `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`. **Este documento é exclusivamente handoff: não executar a Sprint 30 durante o encerramento da Sprint 29.**

## 1. Missão e escopo permitido

Prosseguir, em **uma sprint por execução**, com a verificação de acessibilidade de navegação e recuperação local **sem migração**. A correção de Espaço/Enter do Leitor na S29 resolveu um defeito específico. Na S30, investigar principalmente a **retenção do foco e a ordem de teclado após ativar uma unidade** (a seleção provoca renderização do leitor), além de continuidade das regressões de backup e de contraste. **Não presumir** que exista defeito novo: reproduzir com cenário, esperado, observado, gravidade e evidência anterior; só editar código diante de falha demonstrada. Se não surgir falha, registrar checkpoint **sem patch**.

Não adicionar menus, destinos, perguntas, conteúdo jurídico não cotejado, fontes novas, certificações, login, backend, banco, sincronização, telemetria de dados pessoais, transferência entre aparelhos, migração, restauração sobrescrevendo categorias, compactação, particionamento ou fusão automática de históricos. Não elevar cobertura jurídica com base em dados candidatos.

## 2. Fontes da verdade, revalidação de HEAD e CI

- **Aplicativo público:** [`Talksxb/agu-quiz`](https://github.com/Talksxb/agu-quiz), branch `main`. O código S29 de referência estava em [`29296f83dba6858ce1c794e975416a29e7b57811`](https://github.com/Talksxb/agu-quiz/commit/29296f83dba6858ce1c794e975416a29e7b57811), mas **não assumir que ele continue no topo** após o checkpoint documental ou trabalhos concorrentes. Reconferir branch, último commit, diff, status local e hashes antes de agir.
- **Auditoria privada, estritamente leitura:** [`Talksxb/agu-auditoria`](https://github.com/Talksxb/agu-auditoria). Reabrir `docs/PROTOCOLO.md`, `checkpoints/estado.json`, último `AUD03-###.json` efetivamente integrado, matriz de trabalho **somente para status**, e registros normativos posteriores. Na S29, `main` era `e5430db0d84cc5f813e7771c7db02a600cf190d5`; último checkpoint `AUD03-021`, **412 IDs, 355 com evidência / 57 sem, 126 lotes normativos integrados de 127 persistidos** após `NORM-INT-030`, **zero integralmente certificados**. **Esses números são fotografia, não estado futuro garantido.** `NORM-INT-029` já integrado por `AUD03-020`; `NORM-INT-030` ainda não integrado em `AUD03-021`. Não copiar a matriz privada.
- Reabrir checkpoints S19–S29, com prioridade S27–S29; prompts S27–S29; `docs/GUIA_BACKUP_LOCAL_S21.md`; `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`. Examinar `index.html`, `leitor-juridico.js`, `backup-local-s20.js`, `revisao-inteligente.js`, `planejamento-semanal.js`, `caderno-contextual.js`, `estudo-integrado.js`, `leitor-consolidacao.js`, `questoes-leitor-s18.js` e dados S18/S19.
- Reabrir testes `tests/sprint19-validacao.js`, `sprint20-validacao.js`, `sprint25-validacao.js`, `sprint26-validacao.js`, `sprint27-validacao.js`, `sprint29-validacao.js`; E2E `sprint20-browser.cjs`, `sprint21-browser.cjs`, `sprint21-pages.cjs`, `sprint22-browser.cjs`, `sprint23-browser.cjs`, `sprint29-browser.cjs`; axe `sprint22-axe.cjs`, `sprint23-axe.cjs` e `sprint24-contrast.cjs`; `.github/workflows/agu-sprint20-ci.yml` e qualquer teste posterior realmente persistido.
- **Último CI de código efetivamente confirmado no fechamento S29:** [run **43446560793**](https://github.com/Talksxb/agu-quiz/actions/runs/43446560793), commit `29296f83`, jobs **integridade-node 131957419112**, **navegador-chromium 131957419098**, **pages-publicado 131957419017**, todos `success`; [artefato sintético **14048515948**](https://github.com/Talksxb/agu-quiz/actions/runs/43446560793/artifacts/14048515948), 3.680.601 bytes. Reabrir **logs e artefatos reais**; se houver run posterior, examinar antes de relatar. **Não chamar este run de CI novo da S30.**
- Na publicação S29: Pages [HTTPS 200](https://talksxb.github.io/agu-quiz/), HTML SHA-256 `0d521b3851a97254b03698ad0ac6f9a668422b37a31f6637c4b5882ae6a34fb0`; `leitor-juridico.js` SHA-256 `70f2530dc7219a8f6d08807839e9cea9c133b47c511bb5df9a070f7c7d6484b1`; `backup-local-s20.js` SHA-256 `d9f7705b490d041dd445701b0b619e39c6b2bb4d204cb5a966b27b98ca4d0d78`. Cache `leitor-juridico.js?v=20261113-s29a`, backup `backup-local-s20.js?v=20261113-s27a`. Reconferir cinco scripts e HTML, não confiar indefinidamente nos hashes do handoff.

## 3. Frentes da Sprint 30 e condições de teste

### A. Foco de teclado pós-ativação no Leitor

Em **desktop Chromium real**, se possível, testar 320/360/390/430/1280 CSS px em perfis descartáveis. Com corpus público e sem nota pessoal: abrir **Biblioteca Inteligente → Leitor**, navegar via Tab até a segunda subdivisão `.agu-unit` de um artigo com múltiplas unidades; registrar `document.activeElement`/nome/papel/ordem e coordenadas antes de pressionar **Espaço**. Verificar seleção, persistência local e foco **depois da rerenderização**; tentar Enter, tecla não ativadora, Shift+Tab, Tab seguinte, reload e retorno. Distinguir teste programático `.focus()`, navegação efetiva por teclado e toque emulado. **Não afirmar foco preservado** pelo simples êxito de `tests/sprint29-browser.cjs`: esse teste comprovou ativação e reload, mas não certificou a posição do foco posterior. Se falhar, capturar evidência sintética pré-patch (largura, sequência de teclas, `activeElement` esperado/observado, screenshot sem dados pessoais); aplicar correção mínima e testar no mesmo cenário. Não mudar CSS/semântica por preferência estética.

### B. Android físico, toque, teclado virtual e TalkBack — somente com autorização

Só operar aparelho **fisicamente disponível e expressamente autorizado**. Registrar modelo, Android, Chrome, orientação, viewport CSS **medido**, densidade se disponível, modo de acesso, perfil descartável/consentimento. Seguir [roteiro S24](ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md): quatro destinos, navegação horizontal e **Mais**, Plano semanal, seletor 2023, Revisão, Caderno, Leitor, backup sintético, retorno, recarga, scroll, teclado virtual e toque. Se TalkBack for disponibilizado/autorizado, documentar nome, papel, anúncio de título, ordem e manutenção de foco, especialmente após seleção por Espaço/duplo toque. Imagens e arquivos precisam ser **inteiramente sintéticos**. Sem meios físicos/autorização: `nao_testado_android_fisico`, sem preencher modelo/versão/viewport por suposição. Emulação desktop **não valida** Android físico nem TalkBack.

### C. Contraste, axe, sobreposição e foco

Repetir análises reais de contraste e geometria. Distinguir explicitamente:

- `violations` efetivas (com regra, nó, cor, largura, coordenadas e consequência);
- `incomplete` por elemento parcialmente oculto;
- `passed` **depois de rolar até total visibilidade**;
- conclusão de inspeção humana (se de fato executada).

Referência S29: axe-core **4.14.0**, **26 scans**, zero `violations` no recorte, **13 cenários/19 nós** `color-contrast incomplete` inicialmente, **19/19 passed** após rolagem; foco horizontal e toque emulado nos tamanhos documentados. Não declarar WCAG global nem corrigir cores sem reprovação reproduzida. Se houver falha objetiva, documentar screenshot sintético antes/depois, computação de cor e foco no mesmo estado.

### D. Backup local sintético e integridade

Preservar integralmente o contrato `agu-portable-local-s20-v1`: nove categorias catalogadas, somente `localStorage`, teto de **12.000.000 bytes UTF-8** por arquivo/categoria nos critérios aplicáveis, validação com `AGUValidateMatrix`, SHA-256 por categoria, quota/rollback, importação idempotente e **sem sobrescrever** categoria existente.

Repetir:

1. **Node S25:** 650 registros acentuados **13.213.211 bytes/6.712.561 caracteres**, JSON compacto **11.999.987** versus formatado **12.000.013 bytes**, rejeição coerente e restauração pequena hash-idêntica.
2. **Node S26:** notas do Leitor só strings de até **14.000 caracteres**; objeto, null, número, array, estrutura HTML representada por objeto e excesso rejeitados antes da escrita; caso válido conservado.
3. **Node S27:** artigos/unidades conhecidos e coerentes, chaves de notas de dispositivos presentes no corpus, tabs/mobile válidos; cinco estados falsificados rejeitados sem escrita; duas notas válidas preservadas/idempotentes. Não alegar que isso conserta armazenamento já corrompido.
4. **Chromium S20–S24:** nove categorias, perfis novos, hashes, quota e rollback, JSON truncado, versão/categoria incompatível, IDs duplicados, dispositivos falsos, matriz inconsistente, excesso, retorno/refresh sem tentativas fantasma.
5. **Node/Chromium S29:** teclas Espaço/Enter e persistência em cinco larguras.

Backup histórico **real** depende de entrega voluntária e consentimento específico para teste **local** em perfil isolado, com preservação do original e reporte restrito a contagens/hashes não identificáveis. **Jamais** anexar respostas, notas, matrizes, arquivos reais ou dados pessoais ao GitHub, Actions, Issues, PRs, screenshots públicos ou logs. Sem amostra autorizada: `nao_testado_backup_historico_real`. Havendo conflitos entre dispositivos, preservar ambas as cópias; **sem merge**. Backup >12 MB não dispõe de solução integral aprovada: não sugerir limpeza de navegador, edição/divisão manual, compactação ou migração improvisada.

### E. Jornada e conteúdo jurídico estáveis

Percorrer **Início → missão recomendada → Estudar/Planejamento → Revisão → Caderno/Leitor → Evolução**, com Voltar, Tab/Enter/Espaço quando pertinente e refresh. Não registrar tentativa não respondida ou duplicada. Preservar **quatro destinos** (Início, Estudar, Biblioteca Inteligente, Evolução), revisão **D+1/D+7/D+21/D+45**, formatos **2015 C/E** e **2023 A–E**, anuladas sem pontos, **36 flashcards**, **24 referências oficiais apenas catalogadas** e quatro questões auditadas `of-2015-adv-006/-007/-009/-048` (gabaritos históricos **E/C/E/C**). `of-2015-adv-001` continua fora da nova correção automática até cotejo independente de caderno/variante/gabarito/fundamentação. CF art. 37, X; CF art. 49, V; Lei 9.784 art. 50: somente **trechos identificados**. `confirmado_pontualmente` nunca significa `certificado_integralmente`.

## 4. Execução, decisão e publicação

1. Reconfirmar `main` e estado privado `AUD03` na abertura; inventariar riscos individualmente como `falha_reproduzida`, `risco`, `nao_testado` ou `melhoria_opcional`, com gravidade e roteiro observável.
2. Usar somente dados sintéticos e perfis descartáveis. Priorizar reprodução de foco pós-ativação e integridade de dados; **um patch apenas para defeito objetivo**. Não fabricar teste humano, screenshot, run CI ou certificação jurídica.
3. Executar **Node 22 real** S19 (26/26), S20 (41/41), S25/S26/S27/S29, e Chromium S20–S24/S29/axe sempre que o executor permitir. Identificar versão e distinguir **local x Actions**. Se houver erro de ambiente, citar mensagem específica. Na S29 local, Playwright não achou `chromium_headless_shell-1234`; Chromium instalado abortou em `socket() failed: Operation not permitted (1)`; o CI GitHub **foi real**. Não converter bloqueio local em aprovação fictícia.
4. **Somente se houver patch:** adicionar teste mínimo com falha pré-patch e aprovação pós-patch, publicar em `main` de modo seguro, reabrir blobs/SHAs, jobs/logs dos três jobs, ZIP e Pages após propagação (HTTPS 200; HTML e cinco scripts, cache). **Sem patch:** apenas documentação, não modificar aplicativo/workflow para disparar Actions.
5. Reabrir Auditoria 3 **somente leitura** no encerramento, reconhecendo merges e lotes normativos eventualmente posteriores; nunca sincronizar/publicar matriz privada.

## 5. Critérios de aceite e próximo handoff

Encerrar apenas com prova suficiente por afirmação: falha antes/depois ou ausência documentada de defeito, distinção de `incomplete`/`violation`/`passed`, testes sintéticos sem perda ou substituição, conteúdo jurídico estável, Android físico e backup histórico real honestamente classificados, commits/blobs/jobs/artefato realmente existentes e evidência atual de Pages.

Criar um **checkpoint Markdown da Sprint 30** com datas, repositório e HEAD, fontes, cenários, classes de risco, Node/Chromium/axe, hashes, publicações, estado AUD03 e limitações. Preparar um **prompt integral da Sprint 31 exclusivamente como handoff** — **não executar a Sprint 31**.

**Princípio permanente:** uma sprint por execução, primazia de dados privados e rastreabilidade, reprodução antes de intervenção, rigor jurídico antes de expansão funcional ou estética.
