# AGU Quiz | PROMPT COMPLETO — Sprint 32
## Continuidade de teclado em formulários existentes, recuperação local íntegra e acessibilidade humana condicionada

**Predecessora:** Sprint 31, correção reproduzida de perda de foco após índice, abas, avançar artigo e painéis do Leitor, inclusive ajuste de revelação de foco fora do viewport. Ler primeiro `docs/CHECKPOINT_SPRINT31_CONTINUIDADE_FOCO_RECUPERACAO_2026-11-13.md`, `docs/CHECKPOINT_SPRINT30_FOCO_APOS_ATIVACAO_2026-11-13.md`, `docs/CHECKPOINT_SPRINT29_TECLADO_LEITOR_RECUPERACAO_2026-11-13.md`, `docs/GUIA_BACKUP_LOCAL_S21.md` e `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`. **Este documento é exclusivamente handoff: NÃO executar a Sprint 32 durante o encerramento da Sprint 31.**

## 1. Missão e disciplina

Executar **somente uma sprint**, preservando resultados e testando continuidade de navegação e foco nas renderizações **ainda não verificadas** dos módulos existentes. Começar pela navegação após **salvar comentário no Leitor** (`AGULegal.note`) e controles existentes de Consolidação, Caderno, Revisão e Plano. A S29 corrigiu ativação por Espaço; S30 corrigiu foco da unidade; S31 tratou artigo, aba, painel e deslocamento visível. **Não inferir que todo `render()` seja falho.** Investigar por teclado e registrar se a perda real de foco impede continuidade; se nenhuma falha surgir, encerrar por documentação, sem patch.

Para cada defeito: cenário, estado de origem, tecla e ações, `document.activeElement` antes/depois, papel e nome, coordenadas, viewport/scroll, esperado/observado, gravidade, screenshot sintético pré-patch, regressão mínima inicialmente falhando, correção proporcional e mesma prova posterior. Alterar somente o necessário. Não implementar melhorias cosméticas ou de cobertura artificial.

**Não autorizados:** quinto destino, menu/rota nova, novas questões ou fontes não cotejadas, certificação jurídica presumida, login, autenticação, backend, banco, sincronização, telemetria, transferência, migração, fusão ou importação em lote entre aparelhos, limpeza de histórico, compactação ou divisão de backup, sobrescrita, acesso público à matriz privada, alteração da política de correção de Q1.

## 2. Fontes da verdade — revalidar antes de operar

**Quiz:** repositório `https://github.com/Talksxb/agu-quiz`, branch `main`. Códigos da S31 publicados em `823584ac86deee9f8a1b3fe4fdeb7565c125de51` e `e472b9d3b360dd84b5d9ba601a5a26f1e83bd725`; haverá commits documentais S31 posteriores. Reabrir **HEAD atual**, blobs e diff. Não supor que o topo continue no mesmo SHA, nem reaplicar patch. No fechamento de código S31 o cache esperado do Leitor era `leitor-juridico.js?v=20261113-s31b`, backup `backup-local-s20.js?v=20261113-s27a`. **Conferir no Pages vivo** e atualizar apenas se script de fato mudar.

**Auditoria restrita:** `https://github.com/Talksxb/agu-auditoria`, **somente leitura**. Reabrir `docs/PROTOCOLO.md`, `checkpoints/estado.json`, o último `AUD03-###.json` efetivamente integrado, status da matriz de trabalho e listagem de lotes normativos. No fechamento S31, HEAD reconfirmado `56b93d4a0aab21910003f230a216cb770a922b96`, `AUD03-023` último integrado, **412 IDs únicos**, **356 com alguma evidência / 56 sem**, **127 lotes normativos integrados de 129 persistidos**, **5.994 referências integradas**, **837 pendências sem URL** e **zero temas integralmente certificados**; INT34 (`NORM-INT-031`) e INT35 (`NORM-INT-032`) persistidos, sem integração nesse corte. Reconsultar, pois integrações podem mudar. **Jamais copiar a matriz privada** ao Quiz ou a capturas/logs.

**Histórico e implementação:** checkpoints S19–S31, prioridade S27–S31; prompts S27–S31; guia S21, roteiro S24; inspecionar `index.html`, `leitor-juridico.js`, `backup-local-s20.js`, `leitor-consolidacao.js`, `revisao-inteligente.js`, `planejamento-semanal.js`, `caderno-contextual.js`, `estudo-integrado.js`, `questoes-leitor-s18.js`, corpus `dados/legislacao-s13.js`, questões auditadas S18/S19. Conferir `tests/sprint19-validacao.js`, S20, S25, S26, S27, S29, S30, S31; E2E S20–S24/S29/S30/S31; axe S22/S23/S24, `tests/sprint21-pages.cjs` e workflow `.github/workflows/agu-sprint20-ci.yml`.

**CI e publicação:** último run definitivo S31 comprovado [`43472332230`](https://github.com/Talksxb/agu-quiz/actions/runs/43472332230), commit `e472b9d3b360dd84b5d9ba601a5a26f1e83bd725`: `integridade-node` **132047152397**, `navegador-chromium` **132047152340**, `pages-publicado` **132047151825**, todos **success**. Artefato sintético **14061806796**, **3.847.979 bytes**, digest `sha256:a1e105b35e008830b7ead44c6f29436c6340d98a150ed33f547ec32c275affcf`, expiração 20/11/2026. Não tratar a execução S30 `43468054810` nem este run S31 como nova CI S32. S31 teve um primeiro run intermediário `43471941415` com Chromium **failure** real de botão focado fora do viewport; houve segundo patch `e472b9d`. Se aparecer CI mais nova, verificar SHA/status/logs/artefatos antes de relatar.

**Pages publicado no fechamento S31:** HTTPS 200, HTML SHA-256 `8d0d82b39ca88c7ce9315e4cb13652780d8fab13c825d652af55276763e077df`; Leitor `9c8c300eb65559d80827b1f997783e067f53cc82c71af4a8ed5540d74bba6185`; backup `d9f7705b490d041dd445701b0b619e39c6b2bb4d204cb5a966b27b98ca4d0d78`. Scripts restantes e hashes no checkpoint S31. Esses valores são fotografias: reconferir atualidade de HTML e cinco scripts antes de mudança.

## 3. Ensaios e prioridades

### A. Continuidade de teclado nas renderizações não cobertas

No Chromium desktop real, sempre que possível, usar perfis descartáveis e **320/360/390/430/1280 CSS px**. Registrar Tab, Shift+Tab, Enter e Espaço, foco efetivo e visibilidade (retângulo, scroll), distinguindo de `.focus()` programático. **Prioridade 1:** no Leitor, selecionar unidade, abrir Comentários, escrever apenas uma anotação sintética curta, salvar pelo botão existente e verificar o foco depois do `render()` e a persistência/reload. Separar o teste do texto real do estudante; nenhuma anotação pessoal.

**Prioridade 2:** controles de versão, busca jurídica e ajustes de tamanho existentes (`AGUConsolidation`), Caderno contextual, Estudo integrado e botões de retorno. **Prioridade 3:** navegação secundária Biblioteca/Estudar, Plano semanal/seletor 2023, Revisão (sem responder acidentalmente), Evolução/backup e volta. Verificar que mudar de vista ou painel não registra tentativa sem resposta, não duplica e não perde dados. Não ajustar todos os pontos sem falha observada.

**Regressões S29–S31 obrigatórias:** `.agu-unit` Espaço/Enter, foco restaurado S30, índice de artigos S31, abas Jurisprudência/Questões/Caderno/Flashcards/Comentários/Estudo, painéis Índice/Texto legal/Relacionados, botão anterior/próximo inclusive **visibilidade após mudança para artigo mais longo**, último artigo com botão desabilitado, reload e Tab/Shift+Tab. Observar que em mobile o índice se oculta ao escolher artigo; o título deve ficar focável e visível, enquanto no desktop o índice selecionado continua foco. Evitar falsos positivos baseados apenas em propriedades sem geometria.

### B. Android físico e TalkBack — condicionais

Somente se aparelho **fisicamente disponível** e autorização **específica**. Registrar modelo, Android/Chrome, orientação, viewport CSS medida, densidade (se acessível), perfil descartável, consentimento e dados sintéticos. Executar roteiro S24 completo nos quatro destinos, Mais/navegação horizontal, Plano, seletor de 2023, Revisão, Caderno/Leitor, backup sintético, Voltar, refresh, toque/teclado virtual/rolagem. TalkBack se disponível e autorizado: nomes, papéis, anúncio de título, ordem de foco, painéis ocultos, foco em transição. Sem condições reais, registrar exatamente `nao_testado_android_fisico`. Não atribuir ao Chrome desktop os recursos de Android/TalkBack, nem inventar dimensões.

### C. Axe, contraste e foco visível

Repetir S22/S23/S24 em Chromium real, separar **`violations`**, **`incomplete`** por `elmPartiallyObscured`, **`passed` após rolagem** e inspeção humana efetivamente realizada. Referência S30/S31: axe-core 4.14.0, 26 varreduras, zero violations no recorte; 13 cenários/19 nós inicialmente color-contrast incomplete e 19/19 passed após expor. Essas métricas **não** certificam WCAG global. Se houver nova falha, documentar largura, nó, cores computadas/retângulo, ação, screenshot pré/pós e reprovação objetiva antes de alterar CSS. Comparar rolagem horizontal/vertical e foco em 5 larguras; toque emulado não equivale a físico.

### D. Recuperação local e integridade — sem migração

Preservar `agu-portable-local-s20-v1`, nove categorias catalogadas exclusivamente em `localStorage`, teto **12.000.000 bytes UTF-8** conforme tamanho de categoria/pacote/JSON formatado, `AGUValidateMatrix`, SHA-256 por categoria, importação apenas de categorias **ausentes**, quota/rollback, idempotência, **nunca sobrescrever**. Repetir:

- **Node S25:** 650 registros sintéticos acentuados, **13.213.211 bytes** / **6.712.561 caracteres**; compacto **11.999.987** contra formatado **12.000.013 bytes**, exportação rejeitada coerentemente; restauração pequena hash-idêntica.
- **Node S26:** notas do Leitor apenas strings ≤14.000 caracteres; rejeitar objeto, null, número, array, HTML representado por objeto e excesso antes de escrever. Caso positivo íntegro.
- **Node S27:** artigo/unidade coerentes com o corpus; chaves de notas conhecidas, tab/mobile válidos; cinco casos falsificados recusados; duas notas de artigos diferentes válidas, preservadas e idempotentes. Nada disso corrige `localStorage` já corrompido.
- **Node/Chromium S29/S30/S31:** Espaço/Enter, foco e visibilidade das renderizações, persistência e reload.
- **Chromium S20–S24:** nove categorias, perfis novos, hash, JSON truncado, versão/categoria imprópria, IDs repetidos, dispositivo falso, matriz inconsistente, excesso, quota/rollback e ausência de tentativas fantasma.

Backup pessoal histórico real **somente com arquivo voluntariamente enviado e consentimento específico para teste local em perfil isolado**; preservar original, publicar apenas métricas/hashes anônimos. Sem amostra: `nao_testado_backup_historico_real`. Nunca enviar resposta, nota, matriz privada ou arquivo pessoal a GitHub, CI, Issues, PR, ZIP ou capturas. Conflito entre aparelhos: preservar ambas as cópias **sem merge**. Backup acima de 12 MB não tem solução integral aprovada; não orientar limpeza do navegador, edição/divisão manual, compactação ou migração improvisada.

### E. Conteúdo jurídico e percurso

Percorrer **Início → missão recomendada → Estudar/Plano → Revisão → Caderno/Leitor → Evolução → Voltar/refresh**; quatro destinos exclusivamente: Início, Estudar, Biblioteca Inteligente, Evolução. Preservar revisão D+1/D+7/D+21/D+45; formatos C/E (2015), A–E (2023); anuladas sem pontos; **36 flashcards**; **24 fontes catalogadas, não certificadas**; `of-2015-adv-006/-007/-009/-048` com gabaritos históricos **E/C/E/C**. `of-2015-adv-001` continua excluída da nova correção automática até cotejo independente de caderno/variante/gabarito/fundamentação. CF art. 37, X; CF art. 49, V; Lei 9.784 art. 50: trechos identificados, não íntegra certificada. `confirmado_pontualmente` nunca é `certificado_integralmente`.

## 4. Procedimento técnico, decisão e publicação

1. Reconfirmar `main`/HEAD, hashes, worktree, CI anterior real, Pages e estado integrado AUD03 antes de tocar código. Registrar classes `falha_reproduzida`, `risco`, `nao_testado`, `melhoria_opcional`, com gravidade.
2. Testar apenas em perfis e arquivos sintéticos. Se falha reproduzida, registrar esperado/observado e prova antes, criar regressão que falhe no código original; corrigir minimamente e rodar o mesmo cenário depois. Se nada falhar, documentar sem patch funcional/cosmético.
3. Executar Node **22 real** S19 (26/26), S20 (41/41), S25/S26/S27/S29/S30/S31, e Chromium real S20–S24/S29/S30/S31/axe, no ambiente possível. Distinguir local, Chrome remoto, Actions e Android físico. Local S31 havia falhado ao inicializar Playwright por `chromium_headless_shell-1234` ausente e `/usr/bin/chromium` com `socket() failed: Operation not permitted (1)`; não converter isso em aprovação local fictícia.
4. **Com patch:** atualizar cache do script modificado, teste e workflow somente se exigidos; publicar em `main` com controle de concorrência e reabrir blobs/commits; consultar run posterior ao SHA com logs dos três jobs (`integridade-node`, `navegador-chromium`, `pages-publicado`), ZIP sintético, Pages HTTPS 200, hashes do HTML e **cinco scripts**. Evitar falso negativo por verificador de cache obsoleto. **Sem patch:** checkpoint documental sem disparar Actions artificialmente.
5. Reconsultar Auditoria 3 **somente leitura** no fechamento. Não confundir lote persistido, lote integrado e tema integralmente certificado; não copiar nem sincronizar matriz privada.

## 5. Aceite e próximo handoff

Entregar checkpoint Markdown **S32** com data, repositório, HEAD e blobs, riscos/reproduções, versionamento do browser/Node, cinco viewports, violação versus incomplete versus passed, screenshots sintéticas, backup idempotente sem sobrescrita, execução CI/ZIP e Pages efetivos, situação AUD03 por SHA e limitações honestas (`nao_testado_android_fisico`, `nao_testado_backup_historico_real`). Criar **prompt integral Sprint 33 somente como handoff**, sem executar a S33.

**Princípio permanente:** uma sprint por execução, reprodução antes de alteração, privacidade de histórico, rastreabilidade e rigor jurídico acima de expansão funcional, estética ou numérica.
