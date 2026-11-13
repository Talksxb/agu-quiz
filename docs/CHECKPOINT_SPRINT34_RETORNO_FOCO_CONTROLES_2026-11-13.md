# AGU Quiz | CHECKPOINT — Sprint 34
## Retorno por teclado em controles reais, WORK 01 preservada e recuperação conservadora

**Data:** 13/11/2026, America/Sao_Paulo. **Produto:** https://github.com/Talksxb/agu-quiz, main. **Escopo:** apenas Sprint 34; Sprint 35 é handoff. **Decisão:** cinco cenários de perda de foco demonstrados em Chrome desktop público e VM sintética, correção proporcional dos controles. Sem alteração de conteúdo jurídico, schema de backup, layout especulativo ou integração de Work Sites.

### 1. Baseline, concorrência e fontes

- HEAD público de abertura **69367ace4088800f42bd276c1dbd02ee9373dfae**, árvore **2b16340188ca4484811a3ef9245ec1ede2c4994e**; worktree S34 isolado e limpo. Lidos checkpoint S33/S32, guia S21, roteiro S24, código dos módulos, testes e histórico S19–S33. CI S33 real **43486462994** SHA **764a5761**: Node 132096113411, Chromium 132096113891, Pages 132096114048, todos success, logs reabertos. ZIP sintético **14067482867**, 3.984.068 bytes, digest sha256:f9e18d7bf235e36e278cd9e9855cd358c35f8e92df5dd309a5ae9f3756e9746b, expira 20/11/2026 UTC; metadados/download reabertos, sem alegar inspeção manual de todos os itens.
- **Mudança concorrente relevante durante S34:** PR #1 WORK 01 foi mesclada em main no commit **4fa4d2955be60e8acf5e2d134e9d5b241f84f6c3**, árvore **776b1c2eb15a34e2c5303fb0f727d1482131d4de**; PR agora closed/merged. Introduziu 'meu-estudo.js', melhorias da home, testes próprios, sexto script Pages e E2E da URL publicada. Rebase S34 sobre esse main; conflitos de workflow/verificador Pages reconciliados mantendo **ambas** frentes. Nada da WORK 01 foi apagado. A camada **ChatGPT Work Sites** permanece decisão visual futura e separada.
- Código S34 publicado **63e9309389379f83c98359477917be3d961c9e12**, árvore **a7bf54233f370e5c3863fb4ce64331143a1ff436**, parent WORK 01 **4fa4d295**; nove blobs comparados a git hash-object local antes da publicação. Primeiro CI de código deste SHA **43490463679**: Node success, Pages success, Chromium failure **somente** por seletor de teste S34 ambiguamente resolvido em dois elementos summary. Falha real do teste registrada, **não** indisponibilidade do app.
- Correção **somente** do seletor de teste do catálogo: commit **dcf6b9e5ae0f840aef7e254348dafa1fe58acf15** (parent 63e93093), trocando seletor abrangente por summary com texto específico. Nenhum arquivo de produto alterado nesse segundo commit; nova execução CI requerida para aceite. Publicação via atualização de referência fast-forward com expected SHA, sem force e sem sobrepor mudanças concorrentes.

### 2. Reprodução pré-patch no Chrome desktop real

**Chrome compartilhado, 1363 × 936 CSS px**, origem HTTPS Pages, perfil com **somente registros de ensaio sintéticos** S33; não é Android/TalkBack. Ações via controles reais e teclado Enter/Espaço, leitor de estado DOM e retângulo. Novas páginas não exibiram informações pessoais. Antes do patch, em todos os cinco cenários a ação funcionava, mas 'document.activeElement' passava a **BODY**, sem foco contínuo no controle relevante:

| ID / classe / gravidade | Estado e ação | Esperado / observado antes |
|---|---|---|
| S34-001 · falha_reproduzida · média | Leitor → Caderno; Enter em **Editar** de nota fictícia | Título do formulário em edição focado e visível; observado BODY. |
| S34-002 · falha_reproduzida · média | Formulário de edição fictícia; Enter em **Cancelar edição** | Retorno ao **Editar** do mesmo registro; observado BODY, embora formulário voltasse a “Novo registro”. |
| S34-003 · falha_reproduzida · média | Estudo integrado com sessão de teste ativa; Enter em **Encerrar esta sessão** | Retorno ao botão **Iniciar / retomar** da unidade; observado BODY e sessão concluída, sem horas ou avaliação lançadas. |
| S34-004 · falha_reproduzida · média | Revisão → catálogo (summary aberto) → Enter em **Estudar cartão** | Foco em **Mostrar resposta** do cartão selecionado, sem registrar avaliação; observado BODY. |
| S34-005 · falha_reproduzida · média | Plano semanal de teste; Espaço em checkbox **Aula / continuidade** | Manter foco na caixa após reconstrução, Tab à matéria e Shift+Tab de volta; observado BODY. Alternância 1/18 → 0/18 devolveu o estado de marcação anterior, sem horas confirmadas. |

**Prova vermelha antes do patch:** Node local v24.22.1, 'tests/sprint34-validacao.js' exit 1, **5/5 casos** com esperado específico e observado body. VM usa uma nota sintética, uma sessão concluída, zero avaliação e tarefa marcada/desmarcada; não acessa armazenamento habitual. Captura visual da interface sintética no Chrome compartilhado foi observada, mas nenhuma captura sem prova geométrica é rotulada como screenshot pré-patch certificador.

### 3. Patch mínimo e regressão

- 'caderno-contextual.js': Editar por teclado → campo Título recriado; Cancelar → botão Editar do **mesmo registro**, identificado por atributo de foco técnico. Não altera gravação, conteúdo, IDs nem exclusão.
- 'estudo-integrado.js': Encerrar por teclado → Iniciar/retomar da mesma unidade após render; não registra horas nem inventa avaliação.
- 'revisao-inteligente.js': botão Estudar cartão por teclado → Mostrar resposta do cartão selecionado; não altera acerto, gabarito, pontuação ou agenda.
- 'planejamento-semanal.js': checkbox que muda estado preserva foco ao renderizar; marcação manual não equivale a tempo confirmado. Sem mudança de seleção/generação/movimento.
- 'index.html': versões **s34a somente** nos quatro scripts editados; Leitor e Consolidação permanecem s32a, backup s27a, WORK 01 work01b. 'tests/sprint21-pages.cjs' verifica os **seis** scripts, mantendo o sexto da WORK01. Workflow mantém regressões WORK01 e adiciona Node/Chromium/artefato sintético S34.
- **Node pós-patch:** 'tests/sprint34-validacao.js' exit 0, **5/5 focos esperados**, uma nota sintética, zero tentativa, tarefa restaurada a desmarcada. Todas as suites Node locais S19/S20/S25–S27/S29–S34 e WORK01 passaram sob **Node 24.22.1** (não chamar de Node22 local). 'git diff --check' exit 0.
- **Chromium local:** 'tests/sprint34-browser.cjs' falhou ao iniciar por **Executable doesn't exist at /home/agent/.cache/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-linux64/chrome-headless-shell**. O diagnóstico anterior de '/usr/bin/chromium' foi 'socket() failed: Operation not permitted (1)' / SIGABRT. Nenhum E2E local foi declarado aprovado; CI GitHub Node22/Chromium real executa a prova em cinco viewports.

### 4. CI, Pages, axe e artefatos reais

**CI definitivo S34**: [run **43491027218**](https://github.com/Talksxb/agu-quiz/actions/runs/43491027218), SHA de teste final **dcf6b9e5ae0f840aef7e254348dafa1fe58acf15** (produto do commit anterior **63e93093**); três jobs **success**, status/logs individuais reabertos:

| Job real | ID | Conclusão e prova |
|---|---|---|
| integridade-node | **132111940068** | **success**, Node **22.23.4**, S19 26/26, S20 41/41, S25–S27, S29–S34 e WORK01. S34 5/5 focos, uma nota sintética, zero avaliação e tarefa desmarcada; UTF-8/quota/idempotência preservados. |
| navegador-chromium | **132111939738** | **success**, Chromium **158.0.8127.18**, axe-core **4.14.0**, E2E S20–S24/S29–S34 e WORK01. 'S34_BROWSER_FOCO_OK' em **320, 360, 390, 430 e 1280 CSS px**, subcenários editar/cancelar/encerrar/catálogo/checkbox, Tab/Shift+Tab, todos com foco visível, reload sem duplicar e zero tentativa fantasma. |
| pages-publicado | **132111939335** | **success**, HTTPS **200**, 'PAGES_VERIFICADO' com HTML e seis scripts hash idênticos; 'WORK01_BROWSER_OK' na URL publicada, cinco larguras, sem overflow e retomada funcional. |

**Run intermediário falho, não omitido:** [43490463679](https://github.com/Talksxb/agu-quiz/actions/runs/43490463679), SHA **63e93093**: Node **132109970806 success**, Pages **132109971439 success**, Chromium **132109971297 failure** apenas por 'strict mode violation' no seletor 'summary' do novo teste S34; não indica falha do produto. A correção de seletor em dcf6b9e5 foi exclusivamente de teste, e o run posterior acima passou. Não houve rollback de WORK 01 nem novo cache por alteração só de teste.

**Artefatos sintéticos do CI definitivo, consultados via metadados e download de ZIP**, sem alegar conferência manual de todos os arquivos:

- [ZIP Chromium 14069925668](https://github.com/Talksxb/agu-quiz/actions/runs/43491027218/artifacts/14069925668), 'agu-s20-chromium-viewports', **4.128.658 bytes**, digest **sha256:75723cc5814fe7659e81024685ccaf0a96446ca24e8f22cab19e7f265ebf49c1**, expira **20/11/2026 19:20:38 UTC**. Inclui 'tests/artifacts-s34/foco-controles-s34.json' e captura sintética 'foco-tarefa-s34-390.png' além das regressões históricas.
- [ZIP WORK 01 14069223678](https://github.com/Talksxb/agu-quiz/actions/runs/43491027218/artifacts/14069223678), 'agu-work01-publicado', **68.429 bytes**, digest **sha256:14afe17d974209f1bfba5629b2202e94d02844f3918ced7bd3edc18e3cc6a191**, expira **20/11/2026 19:19:33 UTC**. Somente evidências sintéticas da URL.

**Axe/contraste efetivos no Chromium CI:** 26 scans, **zero violations no recorte**, **13 cenários/19 nós color-contrast incomplete** inicialmente por 'elmPartiallyObscured', **19/19 passed após rolagem e visibilidade total**. O CI distinguiu foco programático de teclado real e toque **emulado** em 320/390/430. Não são resultados de Android físico, TalkBack, inspeção humana completa ou certificação WCAG global. Nenhuma cor/CSS mudou sem reprovação.

**Chrome compartilhado pós-publicação** (desktop 1363×936 CSS, somente nota sintética do perfil de teste): scripts Caderno, Estudo, Revisão e Plano realmente carregados com cache **s34a**; tecla Enter em **Editar** levou a '#ctx-title' focado/visível (retângulo x≈1001,5, y≈447,9, 259×40). Enter em **Cancelar edição** refocou botão **Editar** do **mesmo** registro (ID sintético 'aguc-a400d74f-0e61-4dda-94c1-5769bdda4ace'), retângulo dentro do viewport. Esse ensaio desktop público é separado do E2E CI; não houve teste de toque físico.

**Pages verificado independentemente no executor após código S34:** HTTPS 200, 'node tests/sprint21-pages.cjs' exit 0 para HTML e seis scripts, com os hashes:

| Arquivo | SHA-256 efetivo |
|---|---|
| HTML index.html | 5a5783d30dbbc68d03171ab2556adc405e20da168509b5d40033caaf47dea578 |
| Revisão | f548ac8d40624419552ff61b70a48392c52164358570e93648e9bd3dfbad4d0d |
| Plano | 140c066ee2265cb990af75722dfdf7e6601ee7385edea1ba123b3dad3b3a8030 |
| Consolidação | 3c64085c0077637f476697b0817a34a22a8f6315095b423a1d00963d1f1e4f88 |
| Backup | d9f7705b490d041dd445701b0b619e39c6b2bb4d204cb5a966b27b98ca4d0d78 |
| Leitor | 8045194f8a8ec2bbd10e95fff8ce04c39042d5f7957ad780200433793911f2e1 |
| Meu Estudo WORK01 | a6c8d9d8c706bee481517e37c18b141985f3737422270ca919e78b3d9b035fc0 |
| Caderno (fetch HTTPS separado) | 5ab89801bc4a37b5300edb47e5c84e557107e757cf7135ef7f31e3d0e0a9a9ce |
| Estudo Integrado (fetch HTTPS separado) | 969232776cc271538dad852c22d134425f41c1c56c5f0ea8d44a73a5df607618 |

HTTP 200 e SHA do HTML/seis scripts idênticos à cópia local S34 rebaseada; dois módulos extras também SHA idêntico. Versões de cache Caderno/Estudo/Revisão/Plano s34a, Leitor/Consolidação s32a, backup s27a e WORK work01b.

### 5. Backup, privacidade e rigor jurídico

- Contrato 'agu-portable-local-s20-v1' intacto: nove categorias somente localStorage, teto 12.000.000 bytes UTF-8 por categoria/pacote/arquivo formatado conforme critérios, AGUValidateMatrix, SHA-256 por categoria, apenas categorias ausentes, quota/rollback, idempotência, **nunca sobrescrever**. Node S25 confirma 650 registros acentuados, 13.213.211 bytes e 6.712.561 caracteres; compacto 11.999.987 vs formatado 12.000.013; restituição pequena hash-idêntica. S26 rejeita seis notas com tipo/tamanho inválido antes da escrita, aceita texto de 14.000 caracteres; S27 rejeita cinco estados forjados e preserva duas notas válidas/idempotentes. E2E S20–S24 testa nove categorias, versões/IDs/dispositivos falsos, truncamento, matriz, quota/rollback, refresh sem tentativa fantasma. Nenhum backup real ou conteúdo privado publicado.
- **nao_testado_backup_historico_real**: nenhum arquivo histórico pessoal entregue com autorização para perfil isolado. Conflitos entre aparelhos preservam ambas as cópias, sem merge; para estado >12 MB ou corrupção prévia não há solução integral autorizada. Não limpar navegador, editar/dividir/compactar nem migrar JSON por improviso.
- **nao_testado_android_fisico**: nenhum aparelho acessível com autorização expressa. Nenhum modelo, versão, densidade, viewport físico, toque real, teclado virtual ou TalkBack foi inferido do Chromium desktop. Roteiro S24 segue condicionado.
- Conteúdo estável: quatro destinos **Início, Estudar, Biblioteca Inteligente, Evolução**, 36 flashcards, 24 referências oficiais **catalogadas**, revisão D+1/D+7/D+21/D+45, formatos 2015 C/E e 2023 A–E, anuladas sem pontos, questões auditadas of-2015-adv-006/-007/-009/-048 gabaritos históricos **E/C/E/C**. of-2015-adv-001 excluída da nova correção automática até cotejo independente; CF art. 37, X; CF art. 49, V; Lei 9.784 art. 50 são trechos identificados. confirmado_pontualmente ≠ certificado_integralmente.

### 6. Auditoria privada e riscos remanescentes

Consultado em leitura 'Talksxb/agu-auditoria', protocolo, estado e AUD03-023; HEAD reconfirmado **também no fechamento**: **d0823c40ec4a06b93e69a06bc1504a6dec08e220**, árvore **0ac373275af7e4bba9137610a6692d19f8e289c4**, sem alteração desde a abertura. Último AUD03-023 efetivamente integrado, 412 IDs únicos, 356 com evidência/56 sem, 127 normativos integrados de **131 persistidos**, 5.994 referências, 837 pendências sem URL, **zero** integralmente certificados; NORM-INT-031..034 ainda não reconciliados naquele checkpoint. Nenhuma matriz privada copiada ou sincronizada.

| Classe e gravidade | Estado |
|---|---|
| falha_reproduzida / média | S34-001 a S34-005: prova BODY pré-patch, 5/5 Node verde depois; E2E CI final indicado acima. |
| risco / média | Excluir e vincular legado Caderno; retomar/vincular Estudo; escolha de alternativa oficial; mover/regenerar Plano ainda não reproduzidos, sem correção especulativa. |
| risco / alta | Quota 12 MB, corrupção histórica e conflito de aparelhos sem solução geral autorizada; nenhum dado pessoal migrado. |
| nao_testado_android_fisico / média | Exige hardware e autorização específica. |
| nao_testado_backup_historico_real / média-alta | Exige arquivo voluntário e consentimento. |
| risco_juridico / alta | Zero certificações integrais, evidência parcial; nenhum novo gabarito/fonte promovido. |
| melhoria_opcional / futuro | ChatGPT Work Sites visual separado, com decisão de arquitetura/privacidade antes de implementação. |

**Handoff:** 'docs/PROMPT_SPRINT35_RETORNO_SEGURO_CONTROLES_2026-11-13.md' é o prompt integral S35, **não executada**. Uma sprint por execução; reprodução antes de alteração, privacidade e rigor jurídico em primeiro lugar.
