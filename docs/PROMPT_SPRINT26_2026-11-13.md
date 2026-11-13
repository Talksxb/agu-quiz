# AGU Quiz | PROMPT COMPLETO — Sprint 26
## Recuperação local verificável, testes condicionais em aparelho e robustez do armazenamento

**Predecessora:** Sprint 25 — validação do limite real em bytes UTF-8 para backup, regressões de acessibilidade e preservação do histórico. **Ler primeiro** `docs/CHECKPOINT_SPRINT25_BACKUP_UTF8_ACESSIBILIDADE_2026-11-13.md` e `docs/GUIA_BACKUP_LOCAL_S21.md`. **Este arquivo é exclusivamente handoff: não executar Sprint 26 no fechamento da Sprint 25.**

## 1. Missão e prioridades

Concluir, se houver condições e autorização, avaliações de recuperação e acessibilidade ainda não comprovadas em hardware real. Monitorar apenas defeitos reproduzíveis de exportação/restauração local e de navegação por teclado/toque. Manter fidelidade documental da preparação para Advogado da União.

**Regras:** uma sprint por execução; reproduzir antes de alterar; não mudar código por estética ou hipótese não demonstrada; não ampliar telas, destinos, menu, questões, fontes por aproximação, backend, banco, autenticação, sincronização, importação em lote, transferência remota ou fusão automática de históricos. Preservar tudo das Sprints 19–25.

## 2. Fontes obrigatórias e estado inicial

**Aplicativo:** `https://github.com/Talksxb/agu-quiz`, `main`. **Auditoria privada:** `https://github.com/Talksxb/agu-auditoria`, somente leitura até autorização específica.

1. Ler checkpoints S19–S25, especialmente S25; guia de backup S21 atualizado em S25, roteiro Android S24, prompt S25 e este handoff. Verificar branch/HEAD e comparar hashes; não assumir que commits registrados no handoff continuam no topo.
2. Ler `index.html`, `backup-local-s20.js`, `revisao-inteligente.js`, `planejamento-semanal.js`, `caderno-contextual.js`, `estudo-integrado.js`, `leitor-juridico.js`, `leitor-consolidacao.js`, `questoes-leitor-s18.js` e dados S18/S19. Consultar scripts S19/S20 e E2E S20–S24, `tests/sprint25-validacao.js`, `tests/sprint21-pages.cjs` e `.github/workflows/agu-sprint20-ci.yml`.
3. Reabrir run final de código S25 [43415797662](https://github.com/Talksxb/agu-quiz/actions/runs/43415797662), os três jobs individuais e artefatos do Chromium; verificar também qualquer run posterior em `main` e o HTTPS Pages, incluindo versão de cache `backup-local-s20.js?v=20261113-s25a` e hashes do HTML/scripts. Não inferir sucesso de configuração ou de run anterior.
4. Na Auditoria 3, ler `docs/PROTOCOLO.md`, `checkpoints/estado.json`, checkpoint AUD03 mais recente **realmente persistido/integrado**, matriz de trabalho somente para conferir status e evidências normativas posteriores. **O estado mudou durante a S25:** começou em AUD03-016 (121 lotes integrados), mas ao fechar já constava **AUD03-017** reconciliado após PR 142: **412 IDs únicos, 123 lotes normativos integrados de 124 persistidos, 352 IDs com alguma evidência, 60 sem e zero tópicos integralmente certificados**; `NORM-INT-025/026` foram integrados e `NORM-INT-027` (INT30) permanece pendente. **Reconferir eventuais avanços**. Não publicar matriz privada, não promover evidência pontual.

## 3. Investigações condicionais

### A. Android físico, TalkBack e acessibilidade

- **Somente com aparelho fisicamente disponível e uso autorizado:** documentar modelo, Android, Chrome, orientação, viewport CSS medida, densidade se aferível, condições e meio de teste. Usar perfil isolado e respostas/arquivos sintéticos.
- Aplicar `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`: os quatro destinos, menu horizontal, `Plano semanal`, `Mais`, seletor de 2023, revisão, caderno, backup local, refresh, teclado virtual e toque. Quando autorizado/disponível, aferir nomes, papéis, foco, anúncio de títulos e ordem de navegação no TalkBack. Capturas nunca devem mostrar dados pessoais.
- Se não houver hardware autorizado, manter exatamente **`nao_testado_android_fisico`**. Emulação no Chromium é diagnóstico complementar, nunca prova de aparelho físico/TalkBack. Cobrir 320/360/390/430/1280 px no desktop quando possível.
- Continuar a distinção entre axe `incomplete`, `violation`, item que passou após rolagem e inspeção humana. Na S24 foram **13 cenários/19 nós** inicialmente inconclusivos por `elmPartiallyObscured`, mas **19/19 passaram após exposição completa**. Nenhuma certificação WCAG global por esse recorte.

### B. Backup real e limite físico

- A S25 identificou, com dados sintéticos válidos de Caderno, arquivo de **13,2 MB em UTF-8** apesar de possuir cerca de **6,7 milhões de caracteres**; antes o exportador o baixava, e o importador recusava por `file.size`. A correção passou a medir bytes reais na captura, validação e exportação formatada; um segundo ensaio verificou que JSON compacto próximo de 12 MB pode ultrapassar o limite após indentação. **Revalidar ambos sem usar dados pessoais.**
- Preservar `agu-portable-local-s20-v1`, nove chaves catalogadas, limite de **12.000.000 bytes**, `localStorage` somente local, validação de matriz por `AGUValidateMatrix`, categorias ausentes apenas, SHA-256, importação idempotente e não sobrescrita. Cobrir JSON truncado, campo falso, duplicata, versão desconhecida, categoria indevida, sessão/dispositivo inválido, matriz inconsistente e rollback de quota.
- A recusa de exportar arquivo acima de 12 MB **evita cópia inutilizável, mas não produz automaticamente um backup para estados maiores**. Não inventar particionamento/compactação/migração sem especificação e consentimento. Limites dos importadores específicos podem ser menores; não recomendar divisão manual nem limpeza do navegador como solução presumida.
- **Somente com arquivo histórico real voluntariamente fornecido e autorização explícita:** avaliar esquema e compatibilidade em perfil local descartável, preservar as cópias, anotar dados não identificáveis (tamanho, hashes, contagens). Nunca enviar backup pessoal, matriz privada, notas ou respostas ao GitHub, Actions, Issue, PR ou artefato. Sem amostra, registrar **`nao_testado_backup_historico_real`**.
- Conflitos entre aparelhos exigem orientação para guardar ambas as cópias, não merge automático. Não criar contas, backend ou sincronização sem política e autoridade específicas.

### C. Jornada e integridade jurídica

- Repercorrer Início → missão recomendada → Estudar/Planejamento → Revisão → Caderno/Leitor → Evolução, inclusive volta, refresh e uso de teclado. Não criar tentativas sem resposta nem duplicadas.
- Manter exatamente **quatro destinos**: Início, Estudar, Biblioteca Inteligente e Evolução. Manter **quatro questões auditadas** `of-2015-adv-006/-007/-009/-048`, gabaritos históricos **E/C/E/C**, **36 flashcards** e **24 referências oficiais catalogadas** (não 24 certificações integrais). Manter formatos **2015 C/E**, **2023 A–E**, anuladas sem pontuação e calendário **D+1/D+7/D+21/D+45**.
- `of-2015-adv-001` permanece fora da nova correção automática até cotejo histórico de variante, caderno, gabarito e fundamento. Excertos CF art. 37, X, CF art. 49, V, e Lei 9.784 art. 50 continuam explicitamente identificados como recortes. Nenhuma questão `confirmado_pontualmente` vira `certificado_integralmente` sem trabalho independente de Auditoria.

## 4. Método técnico, execução e publicação

1. Comparar `main`/HEAD, checkpoint, workflow, artefatos e auditoria atual. Classificar ocorrências como `falha_reproduzida`, `risco`, `nao_testado` ou `melhoria_opcional` com gravidade, passos, versão, largura, esperado/observado e dados de teste.
2. Reproduzir antes de qualquer patch em estado **sintético**. Se nada falhar, não forçar alteração do produto; registrar somente achados e limites.
3. Executar no **Node 22 real** S19 **26/26**, S20 **41/41** e regressão S25 dos três casos de bytes UTF-8/JSON formatado/restauração. Executar **Chromium real** E2E S20–S24, axe S22/S23/S24, cinco viewports e arquivo sintético. Criar S26 test específico apenas se surgir defeito reproduzido ou verificação nova comprovável.
4. Conferir os **três jobs reais** `integridade-node`, `navegador-chromium`, `pages-publicado` (status e logs individualizados), versões, SHA/HEAD, HTTPS 200, hash do HTML e dos quatro scripts e cache da versão `s25a` ou superior, além de baixar o artefato. Runner desktop não é Android real.
5. Se houver patch, publicar código/teste mínimo em `main`, reabrir blob e confirmar run posterior ao commit. Se não houver alteração, registrar logs/execuções atuais e evidenciar eventuais limitações de CI, sem afirmar rerun que não ocorreu.
6. Não tocar no repositório de Auditoria, não publicar material privado e não adicionar infraestrutura ou compartilhamento de progresso sem consentimento e política de conflito.

## 5. Aceite, limites e handoff

- Correção de falha só com reprodução antes/depois, regressão e rastreabilidade. Backup não destrutivo de nove categorias, medido em **bytes UTF-8**, com alerta honesto quando >12 MB e sem falsear recuperação garantida de dados antigos.
- Teste real de aparelho e teste de backup histórico somente se realizados, senão marcadores `nao_testado`. Contraste `incomplete` não é `violation`, zero violação pontual não é certificação WCAG.
- Persistência dos quatro destinos, quatro questões, fontes catalogadas, flashcards, agenda e Q1 bloqueada.
- Checkpoint Markdown S26 com tabelas de arquivos, commits, fontes, logs, classes de falhas e riscos residuais; **prompt integral Sprint 27, sem iniciar Sprint 27**.

**Princípio permanente:** segurança das respostas pessoais, rastreabilidade, fidelidade jurídica e uma sprint por execução têm prioridade sobre expansão numérica ou visual.
