# AGU Quiz | PROMPT COMPLETO — Sprint 25
## Verificação assistida de uso real, acessibilidade por dispositivo e recuperação local sem perda

**Predecessora:** Sprint 24 — contraste condicionado à visibilidade, rolagem do foco na navegação secundária e touch emulado. **Ler primeiro** `docs/CHECKPOINT_SPRINT24_CONTRASTE_FOCO_E_MOBILE_2026-11-13.md` e `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`. **Este documento é exclusivamente handoff: não executar a Sprint 25 no fechamento da Sprint 24.**

## 1. Missão e princípio de decisão

Validar com segurança os riscos que continuaram condicionados após S24, especialmente Android físico e backups históricos somente quando houver recursos **disponíveis e expressamente autorizados**. Se não houver, manter o estado `nao_testado` e concentrar o trabalho em regressão verificável, qualidade de evidência e defeitos genuinamente reproduzidos. Não reconstruir a interface nem adicionar novos destinos, autenticação, backend, sincronização, questões por aproximação, coleta remota ou migração em lote.

**Uma sprint por execução.** Para mudar código: reproduzir falha, registrar estado anterior, estimar impacto, realizar patch mínimo e reproduzir o comportamento posterior. Não implementar melhorias cosméticas ou inferir certificação a partir de amostras.

## 2. Fontes e estado a verificar novamente

**Aplicação:** `https://github.com/Talksxb/agu-quiz`, branch `main`; **Auditoria privada:** `https://github.com/Talksxb/agu-auditoria` em **somente leitura**, salvo pedido específico de outra frente.

1. Ler checkpoints S19–S24, com atenção especial à S24; `docs/GUIA_BACKUP_LOCAL_S21.md`, roteiro humano S24, prompt S24 e este handoff.
2. Ler `index.html`, `backup-local-s20.js`, `revisao-inteligente.js`, `planejamento-semanal.js`, `caderno-contextual.js`, `estudo-integrado.js`, `leitor-juridico.js`, `leitor-consolidacao.js`, `questoes-leitor-s18.js` e dados S18/S19. Verificar as versões reais da branch.
3. Ler `tests/sprint19-validacao.js`, `tests/sprint20-validacao.js`, `tests/sprint20-browser.cjs`, `tests/sprint21-browser.cjs`, `tests/sprint21-pages.cjs`, `tests/sprint22-browser.cjs`, `tests/sprint22-axe.cjs`, `tests/sprint23-browser.cjs`, `tests/sprint23-axe.cjs`, `tests/sprint24-contrast.cjs` e `.github/workflows/agu-sprint20-ci.yml`.
4. Inspecionar o run real [S24 `43413057667`](https://github.com/Talksxb/agu-quiz/actions/runs/43413057667), jobs individuais e [artefato `14030711429`](https://github.com/Talksxb/agu-quiz/actions/runs/43413057667/artifacts/14030711429), além de commits posteriores, URL HTTPS do Pages e igualdade dos hashes do HTML/scripts. A S24 encerrou o código em `d871ea6e4a8b1d64dc87479cb93fb6d9997018a4` antes da documentação final; **não presumir que esse seja o HEAD atual**.
5. Na Auditoria 3, reabrir `docs/PROTOCOLO.md`, `checkpoints/estado.json`, checkpoint AUD03 mais recente realmente integrado e arquivos de evidência normativos pertinentes. Na reconsulta S24: **AUD03-016**, 412 IDs curriculares, 121 lotes normativos integrados, 351 IDs com alguma evidência, **zero certificados integralmente**; `NORM-INT-025`, `026` e `027` já persistidos mas ainda não incorporados à matriz de trabalho. Não congelar essa fotografia nem confundir lote persistido com integrado.

## 3. Prioridades condicionais

### A. Android físico, toque, teclado virtual e TalkBack

- **Somente com dispositivo fisicamente acessível e operação autorizada:** documentar modelo, Android, Chrome, orientação, viewport CSS medida, densidade se disponível, e modo de conexão. Usar perfil isolado e dados **sintéticos**. Seguir o roteiro S24: quatro destinos, navegação horizontal, botões de backup, seletor 2023, teclado virtual, toque, rolagem, importação de arquivo sintético, retorno e refresh. Não abrir nem fotografar respostas reais.
- Se TalkBack estiver disponível/autorizado, testar nomes, papéis semânticos, estados ativos, leitura de título após troca de seção, ordem de foco e controle **Plano semanal** quando parcialmente oculto. Capturas/descrições devem estar livres de dados pessoais e vinculadas ao modelo/versão.
- Sem aparelho físico, registrar **`nao_testado_android_fisico`** e não transformar emulação Chromium, acesso remoto genérico ou `adb` indisponível em evidência física. Não pedir credenciais ou acesso não autorizado.
- Manter E2E de viewport desktop em **320/360/390/430/1280 px** e, se relevante, touch emulado claramente rotulado como emulado. Não extrapolar densidade/teclado virtual.

### B. Foco horizontal e axe inconclusivo

- S24 reproduziu bug de foco em 360/390/430 px e o corrigiu por `focusin` restrito a `.secondary-nav-item` e `.secondary-more > summary`; testes finais revelaram **Plano semanal por teclado e `.focus()` nos cinco tamanhos**. Revalidar sem alargar a atuação do handler ou provocar salto indevido na página.
- No relatório final S24, **13 cenários e 19 nós `color-contrast` estavam `incomplete` inicialmente** por `elmPartiallyObscured`, mas **19/19 passaram** quando expostos integralmente por rolagem; axe não detectou violação no recorte. Diferenciar explicitamente o estado inicial `incomplete`, a medição depois de rolar, a inspeção visual, *violations* e conformidade WCAG global.
- Se houver reprodução real de contraste insuficiente em estados ativo/hover/foco ou sobreposição, registrar largura, coordenadas, captura sintética, cor computada e ação anterior à eventual correção mínima. Não alterar cores sem reprovação concreta; nenhuma declaração de certificação total.

### C. Backup histórico e conflito entre dispositivos

- **Somente se o estudante entregar voluntariamente arquivo histórico próprio e autorizar a avaliação local:** isolar, identificar esquema/versão, comparar chaves e validar importação não destrutiva em perfil descartável **sem enviar cópia com dados reais a GitHub, CI, Issues, PRs, Actions ou artefatos públicos**. Documentar apenas contagens/hashes ou características não identificáveis; não copiar respostas, notas, histórico ou matriz privada.
- Sem tal arquivo, manter **`nao_testado_backup_historico_real`**. Não criar ou alegar migração histórica demonstrada a partir de fixtures sintéticas.
- Reexecutar o contrato existente do esquema **`agu-portable-local-s20-v1`**: nove categorias, SHA-256 por chave, exportação de JSON em perfil novo, idempotência, preservação de categorias já preenchidas, matriz importada validada por **`AGUValidateMatrix`** e rollback completo na quota. Rejeitar arquivo truncado, >12 MB, versão desconhecida, categoria inesperada, campos/IDs inválidos ou duplicados, dispositivo inexistente e matriz curricular inconsistente.
- Em conflito entre aparelhos ou versões, **preservar ambos os backups** e não sobrescrever/fundir automaticamente. Política de conflitos e qualquer sincronização exigem consentimento e tarefa separados. Manter `localStorage` sem banco, login ou envio remoto.
- Preservar `backup-local-s20.js?v=20261112-s22a` até modificação demonstrada; se alterado, atualizar versão de cache, E2E e hashes reais de Pages.

### D. Jornada diária, conteúdo e juridicidade

- Percorrer Início → missão recomendada → Estudar/Planejamento → Revisão → Caderno/Leitor → Evolução com retorno, teclado e refresh. Confirmar que não há tentativa duplicada nem tentativa criada sem resposta.
- Preservar os **quatro destinos** (Início, Estudar, Biblioteca Inteligente e Evolução), os quatro itens auditados `of-2015-adv-006/-007/-009/-048` com gabaritos históricos **E/C/E/C**, **36 flashcards**, **24 referências oficiais catalogadas** sem certificação integral, agenda **D+1/D+7/D+21/D+45**, formatos **2015 C/E** e **2023 A–E**, anuladas sem pontuação.
- `of-2015-adv-001` continua fora da nova correção automática até cotejo independente de variante, caderno, gabarito e fundamentação. CF37 X, CF49 V e Lei 9.784 art. 50 são **excertos**, não textos integrais. Nunca elevar `confirmado_pontualmente` a `certificado_integralmente`.

## 4. Procedimento de execução e evidência

1. Confirmar branch/HEAD e diff, ler checkpoints e estado AUD03 sem presumir merges, e inventariar pendências. Classificar cada um como `falha_reproduzida`, `risco`, `nao_testado` ou `melhoria_opcional`, com severidade, resultado esperado/observado e passos.
2. Reproduzir antes de editar; testar o menor patch para defeito observado. Não expandir alcance funcional, conteúdo jurídico ou tratamento de dados pessoais para compensar lacunas de evidência.
3. Executar **Node 22 real**: S19 26/26 e S20 41/41. Executar **Chromium real**: E2E S20–S24 e axe S22/S23/S24, inclusive cinco viewports e arquivos sintéticos. Adicionar S25 apenas para falha nova comprovada ou verificação humana comprovável, com controle de falso positivo.
4. Se hardware e/ou backup histórico não estiverem disponíveis, registrar o bloqueio como `nao_testado`, deixar roteiro acionável ao usuário e validar apenas o que está ao alcance. Não publicar gravações de aparelho nem arquivos históricos com dados reais.
5. Publicar código/testes mínimos em `main` se houver patch; ler blobs/commits após push. Confirmar run GitHub Actions **final** e status individual Node, Chromium e Pages, ler logs, baixar e inspecionar artefatos sintéticos e conferir HTTPS 200/hash/versão no site publicado. Não inferir execução pela existência de workflow.
6. Revalidar privacidade e qualidade jurídica: Auditoria privada permanece leitura, nenhum registro privado ou matriz pública sem autorização explícita, nenhuma promoção de certificação por mera cobertura.

## 5. Critérios de aceite e encerramento

- Caso corrigido somente com reprodução **antes/depois** no mesmo cenário, gravidade, patch mínimo, regressão e artefatos verificáveis. Se nenhum defeito for reproduzido, não alterar o produto para forçar mudança.
- Acessibilidade separada em **resultado axe automatizado**, controles que passaram **após rolagem**, inspeção humana, `incomplete`, `violation` e **Android físico**. Zero *violations* em recorte não equivale a WCAG integral.
- Backup de nove categorias sem perda/sobrescrita, matriz validada pelo mesmo validador, quota com rollback e compatibilidade histórica **só quando testada com arquivo autorizado**; sem fusão de dispositivos.
- Manter integralmente quatro destinos, quatro questões auditadas, 36 flashcards, 24 referências catalogadas, gabaritos históricos, agenda e bloqueio Q1.
- Logs de Node/Chromium/axe, estado dos jobs e Pages, commit/HEAD e links de artefatos. Criar checkpoint Markdown S25 com tabela de arquivos, commits, fontes, classes de falha, riscos residuais e **prompt integral para Sprint 26 sem iniciar a Sprint 26**.

**Regra permanente:** uma sprint por execução; proteção das respostas pessoais, rastreabilidade verificável e rigor jurídico prevalecem sobre novas telas, conteúdo não cotejado e números de certificação.
