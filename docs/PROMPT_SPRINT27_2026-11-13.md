# AGU Quiz | PROMPT COMPLETO — Sprint 27
## Recuperação assistida por evidências, acessibilidade real condicionada e regressão do Leitor

**Predecessora:** Sprint 26 — recusa não destrutiva de anotações não textuais no backup do Leitor Jurídico e regressão de limites UTF-8. **Ler primeiro** `docs/CHECKPOINT_SPRINT26_LEITOR_BACKUP_ACESSIBILIDADE_2026-11-13.md`, `docs/GUIA_BACKUP_LOCAL_S21.md` e `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`. Este arquivo é **apenas handoff**: **não executar a Sprint 27 no fechamento da Sprint 26**.

## 1. Missão, segurança e limite da execução

Verificar as pendências com a menor intervenção possível. Dar prioridade a ensaio humano de Android/TalkBack e a backups históricos reais **apenas se forem voluntariamente disponibilizados e expressamente autorizados**, mantendo dados pessoais e matrizes fora de repositório, Issues, Actions e artefatos. Sem tais condições, classificar `nao_testado` e concentrar-se em regressão real e riscos demonstráveis.

**Uma sprint por execução.** Reproduzir qualquer defeito antes de escrever código; guardar resultado esperado/observado, largura, versão, passos e dados sintéticos. Se não houver falha reproduzida, não modificar produto por estética ou hipótese. Não criar autenticação, banco, backend, sincronização, fusão de históricos, importação em lote, coleta remota, novas telas/menus, conteúdos jurídicos aproximados ou migrações não especificadas.

## 2. Repositórios e fontes obrigatórias

- App: `https://github.com/Talksxb/agu-quiz`, branch `main`. Confirmar HEAD, diff, logs e blobs; **não assumir** o commit citado no checkpoint S26 como HEAD atual. Auditoria privada: `https://github.com/Talksxb/agu-auditoria`, **somente leitura** salvo autorização de outra frente.
- Ler checkpoints S19–S26, especialmente S26; prompts S25/S26 e este handoff; guia S21 e roteiro S24.
- Ler `index.html`, `backup-local-s20.js`, `leitor-juridico.js`, `revisao-inteligente.js`, `planejamento-semanal.js`, `caderno-contextual.js`, `estudo-integrado.js`, `leitor-consolidacao.js`, `questoes-leitor-s18.js`, dados S18/S19 e os importadores específicos.
- Ler `tests/sprint19-validacao.js`, `tests/sprint20-validacao.js`, `tests/sprint20-browser.cjs`, `tests/sprint21-browser.cjs`, `tests/sprint21-pages.cjs`, `tests/sprint22-browser.cjs`, `tests/sprint22-axe.cjs`, `tests/sprint23-browser.cjs`, `tests/sprint23-axe.cjs`, `tests/sprint24-contrast.cjs`, `tests/sprint25-validacao.js`, `tests/sprint26-validacao.js` e `.github/workflows/agu-sprint20-ci.yml`.
- Reabrir o **último run S26 real** citado no checkpoint, seus jobs individuais `integridade-node`, `navegador-chromium` e `pages-publicado`, logs e ZIP sintético. Conferir HTTPS 200, SHA do HTML e quatro scripts e `backup-local-s20.js?v=20261113-s26a`, ou versão posterior justificada. Não presumir sucesso por configuração ou run antigo.
- Na Auditoria 3, ler `docs/PROTOCOLO.md`, `checkpoints/estado.json`, último `AUD03` efetivamente integrado, matriz de trabalho **somente para conferência**, registros normativos posteriores. Durante S26 houve progressão de `AUD03-018` para `AUD03-019`: **412 IDs**, **125 lotes normativos integrados de 126 persistidos**, **354 IDs com alguma evidência**, 58 sem, zero tópicos integralmente certificados. `NORM-INT-028` (INT31) foi integrado em AUD03-019; `NORM-INT-029` (INT32) persistido seguia pendente. **Reconferir:** lotes podem avançar; persistido não é integrado.

## 3. Frentes condicionais e critérios de prova

### A. Hardware Android, foco, toque e TalkBack

Somente com aparelho físico **acessível e autorizado**: registrar modelo, versão Android/Chrome, orientação, viewport CSS, densidade quando aferível, conexão, perfil de teste e consentimento. Usar apenas respostas sintéticas. Seguir roteiro S24: Início, Estudar, Biblioteca Inteligente, Evolução; barra horizontal, Mais, Plano semanal, seletor 2023, teclado virtual, leitor, Caderno, revisão e backup sintético, inclusive retorno e refresh. Se TalkBack disponível/autorizado: papéis, nomes, foco ativo, ordem, leitura de títulos após mudar seção e controle parcialmente oculto. Capturas sem dados pessoais.

Na falta do dispositivo, manter **`nao_testado_android_fisico`**; Chromium desktop/emulado não prova toque, densidade ou TalkBack físicos. Quando possível, repetir desktop Chromium em 320/360/390/430/1280 px e rotular toque **emulado**. Separar `color-contrast incomplete`, `violation`, passagem após rolagem e observação humana. Referência S24–S26: 13 cenários/19 nós inicialmente `elmPartiallyObscured`; 19/19 passaram expostos; zero violations nos recortes, **sem certificação WCAG global**.

### B. Backup local, dados inválidos e histórico autorizado

- Esquema `agu-portable-local-s20-v1`, **nove categorias** catalogadas, somente `localStorage`, arquivo final e categoria limitados a **12.000.000 bytes UTF-8**; script com cache `s26a` até mudança demonstrada. A validação curricular deve continuar unificada por `AGUValidateMatrix`.
- Repetir os três ensaios S25: 650 registros sintéticos acentuados acima de 12 MB; JSON compacto de **11.999.987 bytes** que se torna **12.000.013** após formatação; arquivo pequeno e importação idempotente. A massa do caso de formatação é um Caderno **válido**, não nota fictícia gigante do Leitor.
- Repetir o contrato S26 do Leitor: valores de `notes` devem ser **strings com até 14.000 caracteres**. Objetos, `null`, números, arrays e texto maior são rejeitados **sem escrita**. O teste corrige a aceitação de dados inválidos na importação; **não** promete saneamento automático de localStorage antigo já corrompido. Se ocorrer problema com dados antigos, diagnosticar sem sobrescrever.
- Cobrir JSON truncado, versão/categoria não autorizada, chaves falsas, ID duplicado, sessão/dispositivo desconhecido, matriz inconsistente, quota com rollback e preservação de cada categoria presente. Comparar SHA-256 por nove chaves e reimportação idempotente em perfil novo, usando somente material sintético.
- **Backup histórico real só com arquivo voluntário e autorização específica**: teste isolado local e descartável, registro de contagem/tamanho/hash sem conteúdo identificável, nenhuma postagem externa de dados. Na ausência, manter **`nao_testado_backup_historico_real`** e não alegar retrocompatibilidade. Em conflito entre aparelhos, guardar **as duas cópias**, sem fusão automática. Estado acima de 12 MB continua **sem solução integral de backup**; preservar navegador, não orientar limpeza ou divisão manual improvisada.

### C. Jornada e fidelidade jurídica

Percorrer Início → missão recomendada → Estudar/Planejamento → Revisão → Caderno/Leitor → Evolução com retorno, teclado e reload, sem tentativa gerada sem resposta ou duplicada. Preservar **exatamente quatro destinos**, quatro questões auditadas `of-2015-adv-006/-007/-009/-048` com gabaritos **E/C/E/C**, 36 flashcards, 24 referências oficiais **catalogadas**, revisão **D+1/D+7/D+21/D+45**, formatos 2015 **C/E** e 2023 **A–E**, anuladas sem pontuação.

`of-2015-adv-001` continua excluída da nova correção automática até cotejo independente de caderno, variante, gabarito e fundamento. CF art. 37, X; CF art. 49, V; Lei 9.784 art. 50 são **excertos**, não transcrições integrais. `confirmado_pontualmente` não vira `certificado_integralmente` sem auditoria independente; manter Auditoria privada em leitura.

## 4. Ordem da execução e publicação

1. Revalidar `main`/HEAD, estado AUD03, checkpoint S26, arquivos e jobs reais, sem confundir lote normativo persistido com integrado.
2. Registrar cada pendência como `falha_reproduzida`, `risco`, `nao_testado` ou `melhoria_opcional`, com gravidade, cenário e resultado. Reproduzir antes de corrigir; manter patch mínimo e teste de regressão correspondente. Se nada falhar, **não forçar mudanças de código**.
3. Executar **Node 22 real** S19 (26/26), S20 (41/41), S25 (3 casos) e S26 (rejeição não destrutiva + importação válida). Executar **Chromium real** E2E S20–S24, axe S22/S23/S24, cinco larguras e importação sintética. Novo teste S27 somente se houver falha ou verificação comprovável, com falso positivo controlado.
4. Se houver patch, publicar somente os arquivos necessários em `main`, reabrir blobs/commit, conferir novo CI após esse SHA e os **três jobs individualmente**, logs, ZIP/relatórios e Pages HTTPS 200 com SHA de HTML/quatro scripts e versão de cache. Sem patch, registrar apenas execuções realmente feitas, nunca inventar rerun.
5. Revisar privacidade e qualidade jurídica; não gravar nem divulgar dados pessoais/matriz privada, não criar infraestrutura sem política de conflito e consentimento.

## 5. Aceite e handoff da Sprint 27

Evidência de antes/depois para cada correção; regressões Node/Chromium, diagnóstico axe honesto, hash e CI real; backup não destrutivo das nove categorias dentro de seus limites; distinção entre Android físico, emulação e não testado; manutenção dos quatro destinos, conteúdo e bloqueios jurídicos.

Criar **checkpoint Markdown S27**, com tabela de arquivos, SHA/commits, fontes verificadas, jobs individuais, artefatos, falhas classificadas e riscos residuais, além de **prompt integral para Sprint 28 exclusivamente como handoff — sem executar Sprint 28**.

**Princípio permanente:** respostas pessoais e documentos privados protegidos; rigor jurídico, rastreabilidade e uma sprint por execução acima de expansão estética ou numérica.
