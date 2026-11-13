# AGU Quiz | PROMPT COMPLETO — Sprint 29
## Verificação de recuperação sem migração, acessibilidade humana condicionada e preservação jurídica

**Predecessora:** Sprint 28 — regressão de recuperação local e acessibilidade sem defeito novo reproduzido. **Ler primeiro** `docs/CHECKPOINT_SPRINT28_REGRESSAO_SEM_PATCH_2026-11-13.md`, `docs/GUIA_BACKUP_LOCAL_S21.md` e `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`. Este documento é **exclusivamente handoff**: **não executar a Sprint 29 no fechamento da Sprint 28**.

## 1. Missão e disciplina da mudança

Continuar a verificação assistida dos riscos da recuperação no navegador, da navegação por teclado e toque, e da acessibilidade no uso real. **Uma sprint por execução**. Reproduzir antes de corrigir e só modificar código quando houver defeito demonstrado com cenário, esperado/observado, gravidade e prova posterior. Se todos os ensaios disponíveis passarem, encerrar com **checkpoint documental, sem patch cosmético ou funcional**.

Não adicionar destinos, novos menus, perguntas aproximadas, fontes não cotejadas, certificações indevidas, autenticação, banco, backend, sincronização, transferência de histórico, importação em lote, fusão automática de aparelhos, migração ou compactação improvisada. Dados privados e evidências da Auditoria permanecem protegidos.

## 2. Fontes, versão dinâmica e responsabilidades

- Aplicativo: `https://github.com/Talksxb/agu-quiz`, branch `main`; Auditoria privada: `https://github.com/Talksxb/agu-auditoria`, **somente leitura**. Reconfirmar HEAD/commit e hashes; não assumir que o último HEAD do checkpoint S28 permaneceu no topo.
- Ler checkpoints S19–S28 com prioridade a S27 e S28; prompts S27/S28; guia backup S21; roteiro Android S24; fonte e testes vigentes. Inspecionar `index.html`, `backup-local-s20.js`, `leitor-juridico.js`, `revisao-inteligente.js`, `planejamento-semanal.js`, `caderno-contextual.js`, `estudo-integrado.js`, `leitor-consolidacao.js`, `questoes-leitor-s18.js` e dados S18/S19.
- Inspecionar `tests/sprint19-validacao.js`, `tests/sprint20-validacao.js`, `tests/sprint20-browser.cjs`, `tests/sprint21-browser.cjs`, `tests/sprint21-pages.cjs`, `tests/sprint22-browser.cjs`, `tests/sprint22-axe.cjs`, `tests/sprint23-browser.cjs`, `tests/sprint23-axe.cjs`, `tests/sprint24-contrast.cjs`, `tests/sprint25-validacao.js`, `tests/sprint26-validacao.js`, `tests/sprint27-validacao.js`, `.github/workflows/agu-sprint20-ci.yml` e quaisquer testes posteriores realmente persistidos.
- Reabrir o **último run GitHub Actions real** e os três jobs `integridade-node`, `navegador-chromium`, `pages-publicado`. No fechamento S28, o último CI completo de código era o run S27 **43437067178**, em commit `3031138f0a4a17b984b3a309fbeb28968b201e7e`, com três jobs `success` e artefato sintético **14043993148**; isso **não** é rerun S28. Se aparecer execução posterior, ler status/logs/artefatos dela antes de relatar. Conferir Pages HTTPS 200 e SHA do HTML/quatro scripts; cache conhecido `backup-local-s20.js?v=20261113-s27a`, até mudança justificada.
- Na Auditoria 3, reabrir `docs/PROTOCOLO.md`, `checkpoints/estado.json`, checkpoint `AUD03` mais recente efetivamente integrado, matriz de trabalho **somente para status** e evidências normativas posteriores. No encerramento S28, estava `AUD03-019`: 412 IDs únicos, 125 lotes normativos integrados de 126 persistidos, 354 IDs com alguma evidência, 58 sem e **zero tópicos integralmente certificados**; `NORM-INT-029` persistido e ainda não integrado nessa fotografia. **Reconferir merge, SHA e números**; não publicar a matriz privada.

## 3. Testes condicionais e evidência honesta

### A. Android físico, toque e TalkBack

**Somente se um aparelho estiver fisicamente acessível e houver autorização específica**: registrar modelo, Android/Chrome, orientação, viewport CSS, densidade quando disponível, meio de conexão, perfil descartável, consentimento e dados sintéticos. Executar roteiro S24: quatro destinos, Mais e navegação horizontal, Plano semanal, seletor 2023, Revisão, Caderno, Leitor, backup local sintético, retorno, refresh, teclado virtual, rolagem e toque. Se TalkBack disponível/autorizado, aferir nomes, papéis, título anunciado, foco/ordem e elementos parcialmente ocultos. Fotos/capturas nunca podem conter dados pessoais.

Sem aparelho, manter **`nao_testado_android_fisico`**. Desktop Chromium/touch emulado **não** demonstram Android físico, densidade, teclado virtual nem TalkBack. No Chromium desktop, manter quando possível viewports **320/360/390/430/1280 px** e registrar teclas, foco e toque emulado separadamente.

### B. Axe, foco e contraste

Separar `violation`, `incomplete`, elementos `passed` depois de rolar e inspeção humana. Referência verificável S23–S28: **13 cenários/19 nós** `color-contrast incomplete` por `elmPartiallyObscured` inicialmente; **19/19 `passed`** após rolagem horizontal, zero violations nos recortes, **sem certificação WCAG global**. Se surgir reprovação efetiva de cor/foco/sobreposição, documentar largura, coordenadas, cor calculada, ações, screenshot sintético anterior e pós-patch. Não alterar CSS apenas por hipótese.

### C. Backup local e integridade de dados

- Preservar `agu-portable-local-s20-v1`, **nove categorias catalogadas**, exclusivamente `localStorage`, limite de **12.000.000 bytes UTF-8** da categoria, pacote e arquivo JSON formatado, validação da matriz por `AGUValidateMatrix`, restauração **apenas de categorias ausentes**, hash SHA-256 por categoria, quota com rollback, importação idempotente e nenhuma sobrescrita.
- Repetir Node S25: 650 registros sintéticos acentuados de **13.213.211 bytes** apesar de 6.712.561 caracteres, JSON compacto **11.999.987** vs formatado **12.000.013 bytes**, e restauração pequena com hash preservado. Não fabricar nota de Leitor com tamanho que o próprio módulo não admite.
- Repetir Node S26: `notes` do Leitor são strings de até 14.000 caracteres; objeto, null, número, array, HTML como objeto e excesso rejeitados antes da escrita.
- Repetir Node S27: artigo e unidade conhecidos e coerentes, chaves de notas pertencentes ao corpus, estados `tab/mobile` válidos; cinco casos falsificados rejeitados, caso válido com notas de dois artigos restaurado e idempotente. **Não** inferir que o patch repara localStorage já corrompido.
- Repetir Chromium S20–S24: jornada, nove categorias, perfil novo, hashes, rejeição de JSON truncado, versão/categoria indevida, IDs repetidos, dispositivo desconhecido, matriz inconsistente, excesso, quota e rollback, retorno e refresh sem tentativas falsas. Usar **somente arquivos sintéticos**.
- Backup pessoal histórico real exige arquivo **voluntariamente fornecido** e **autorização explícita** para teste local em perfil descartável. Não anexar respostas, notas, dados privados ou matriz a GitHub, Actions, Issues, PRs ou artefatos. Sem amostra, manter **`nao_testado_backup_historico_real`**. Em conflito entre aparelhos, preservar ambas as cópias sem merge. Backup >12 MB não tem solução integral autorizada; não recomendar limpeza do navegador ou divisão manual.

### D. Jornada e conteúdo jurídico estável

Percorrer Início → missão recomendada → Estudar/Planejamento → Revisão → Caderno/Leitor → Evolução com voltar, teclado e reload. Não criar tentativa sem resposta ou duplicada. Preservar **quatro destinos** (Início, Estudar, Biblioteca Inteligente, Evolução); **quatro questões auditadas** `of-2015-adv-006/-007/-009/-048` e gabaritos históricos **E/C/E/C**; **36 flashcards**; **24 referências oficiais catalogadas**, não certificações integrais; revisão **D+1/D+7/D+21/D+45**; formatos 2015 **C/E** e 2023 **A–E**, anuladas sem pontuação.

`of-2015-adv-001` continua excluída da nova correção automática até cotejo independente de caderno, variante, gabarito e fundamentação. CF art. 37, X; CF art. 49, V; Lei 9.784 art. 50 são **trechos identificados**. `confirmado_pontualmente` não equivale a `certificado_integralmente`; nenhuma promoção sem Auditoria documental.

## 4. Procedimento e publicação

1. Revalidar `main`/HEAD e status AUD03 no início. Inventariar riscos como `falha_reproduzida`, `risco`, `nao_testado` ou `melhoria_opcional`, com gravidade e reprodução.
2. Testar sem dados privados. Em caso de defeito, obter falha **antes do patch**, corrigir minimamente e demonstrar depois no mesmo cenário. Adicionar teste S29 **somente** para erro comprovado ou prova humana nova.
3. Executar **Node 22 real** S19 (26/26), S20 (41/41), S25, S26, S27, e **Chromium real** E2E S20–S24/axe S22/S23/S24 quando o ambiente permitir. Registrar versão, execução local vs CI, cinco viewports, artefato. Se um ambiente impedir, indicar o erro preciso e evidência anterior claramente rotulada; **não inventar nova execução CI**.
4. **Se houver patch**, publicar código/teste mínimo em `main`, reabrir blobs/commits e conferir run posterior ao SHA; status individual/logs dos três jobs, ZIP e Pages HTTPS 200/hash/cache. **Se não houver patch**, não tocar no produto apenas para disparar workflow: checkpoint documental com resultados locais e limites reais, distinguindo o último CI comprovado.
5. Reconsultar Auditoria privada em leitura no fechamento; preservar privacidade e status jurídico sem sincronização/infraestrutura nova.

## 5. Aceite e próximo handoff

O encerramento exige evidência suficiente para cada afirmação, classificação honesta de Android físico, backup real e axe, testes sintéticos sem perda/sobrescrita, conteúdo estável e distinção de `incomplete` e `violation`. Criar **checkpoint Markdown S29** com arquivos/commits, fontes, testes, jobs/artifacts reais, resultados, pendências e limitações; preparar **prompt integral da Sprint 30 como handoff**, **sem executar a Sprint 30**.

**Princípio permanente:** uma sprint por execução, proteção de dados pessoais, rastreabilidade e rigor jurídico antes de expansão funcional, estética ou numérica.
