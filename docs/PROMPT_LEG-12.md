# AGU QUIZ | WORK — LEG-12
## Acesso transversal à lista “Para meu caderno” pela Home, sem segundo caderno nem agenda

**Este arquivo é somente o handoff da LEG-11. NÃO executar LEG-12 durante o fechamento da LEG-11.** Execute exclusivamente LEG-12 em nova solicitação expressa. Ao encerrar a próxima sprint, preparar `docs/PROMPT_LEG-13.md` autossuficiente, mas **não executar LEG-13**. O escopo proposto é **consulta rápida da única lista já existente a partir da Home**, não outro lugar de armazenamento ou marcação automática.

## 1. Fonte da verdade, retomada e concorrência

Repositório público: https://github.com/Talksxb/agu-quiz
Produção GitHub Pages: https://talksxb.github.io/agu-quiz/
Auditoria privada `Talksxb/agu-auditoria`: leitura pontual somente quando indispensável; jamais copiar matriz, documentos ou dados privados para o repositório público.

Referência histórica de 15/11/2026, **sujeita a reconfirmação integral antes de editar**:

- LEG07: PR #13, merge `fa659e74634d48cf0ec897bfd91c519fff318072`; fechamento PR #14.
- LEG08: PR #15, merge `bdb03d4d19847178dbeab73d2faf773d18cbd71d`; fechamento PR #16.
- LEG09: PR #17, merge `bdefbf116a1e872c2a0378b49f2482db666a10e6`.
- LEG10: PR #20, merge `e324734088d6fdfbfa99c7159bcfcffcfa5ef713`, fechamento em `docs/LEG-10_QUESTOES_CADERNO.md`.
- UX-BARALHOS-01/02 já incorporadas. A main **antes da LEG11** era `a1fb2ca82f2985bda1a29d690dc52267fa3f994a`.
- LEG11: branch `leg/leg11-flashcards-para-caderno`, PR [#23](https://github.com/Talksxb/agu-quiz/pull/23), implementação `5273012f42b173730927bd915847371e508920c9`, ajuste apenas de teste `c236992b07589098f5613d0849ba1c1428b6eb28`; merge `f28a9c16e0a9d26032ca6a8fb210cb46fd4b774f`. A CI da PR [43735066470](https://github.com/Talksxb/agu-quiz/actions/runs/43735066470) passou em Node e Chromium. Pages [43735489237](https://github.com/Talksxb/agu-quiz/actions/runs/43735489237) aprovado. Main [43735490236](https://github.com/Talksxb/agu-quiz/actions/runs/43735490236) aprovada nos três jobs, inclusive `pages-publicado`. Eventual PR documental de fechamento deve ser verificada no histórico.

**Ações iniciais obrigatórias:** inspecionar `main` remota, PRs abertas, branches concorrentes, CI/deploys em andamento e hashes efetivamente publicados. Ler `docs/LEG-11_FLASHCARDS_CADERNO.md`, `docs/LEG-10_QUESTOES_CADERNO.md`, `docs/LEG-09_ESTUDO_CADERNO.md`, `docs/LEG-08_REVISAO_CADERNO.md`, `docs/LEG-07_PARA_MEU_CADERNO.md`, checkpoints UX01/UX02, este prompt, workflow e contratos. Não retomar inventários de lei, Auditorias ou Sprints 4/20–44. Se houver dependência aberta, usar a base confirmada, sem sobrescrever nem forçar merge.

## 2. Contrato consolidado após LEG-11

Existe **uma única lista** `forNotebook` em `agu_leitor_juridico_s13_v1`, uma das **nove categorias** de `backup-local-s20.js`. A lista é mantida e editada por `leitor-juridico.js`, com `AGULegal.peek()`, `notebookSetStatus`, `notebookOrigin`, `notebookCanOpenOrigin`, filtros e operações de gravação contextual. IDs próprios `pc-*`, `createdAt` ISO, `prompt` breve e status `pendente|anotado|dispensado` alterado **somente** pelo estudante.

Origens validadas, sem converter ou migrar registros anteriores:

1. `origin:'leitor'`: norma, artigo e unidade reais; `topic` somente quando o artigo comprovadamente se vincula ao ID granular; URL `?abrir=lei&norma=ID&dispositivo=ID`.
2. `origin:'estudo_integrado'`: `sessionId:'ags-*'` e `deviceId` existentes; campos normativos `null`; só retomar sessão `em_andamento` segura, caso contrário referência manual.
3. `origin:'questao_verificada'`: `questionId` e `questionLabel` documentais; apenas quatro questões oficiais S18/S19 pontualmente aptas; abrir somente quando a questão continua elegível, preservando referência se for retirada.
4. `origin:'flashcard_existente'`: `cardId` e `cardLabel` verificados no índice histórico fechado de **36 flashcards**; sem dispositivo normativo presumido. `AGUReview.notebookEligibleCard` verifica cartão ativo; `notebookHistoricCard` preserva referência legível após retirada. `topic` comprovado somente em `ADM-06` ou `CON-50`; nos outros códigos `ADM-13`, `ADM-23`, `PC-03` e `CON-02`, `topic:null`.

`topic:null` **não equivale** ao código exibido pelo baralho, à disciplina do planejamento ou a um cartão autoral. Não usar aproximação textual para transformar em vínculo curricular. Em particular, não atribuir tópico automaticamente a DL4657/LINDB ou L4717/Ação Popular.

LEG-08 recupera marcações **somente** em cartão com vencimento previamente registrado `due<=hoje`, `status:'pendente'` e correspondência **exata** `mark.topic===active.code`. Nenhuma marcação muda o vencimento, a fase, a agenda ou a avaliação. Concluir uma revisão não é confirmar que uma anotação foi feita no caderno físico.

Backup legado sem `forNotebook` permanece válido. `AGUBackup20.importMissing` aceita **somente categorias ausentes**; nunca substituir, mesclar ou apagar categoria já presente, mesmo numa segunda importação. Limites: **9 categorias**, **12 MB UTF-8** por arquivo, **500 comentários**, **300 marcações**, **450 caracteres por marcação**. Falha de quota deve conservar todos os bytes anteriores. Não criar décima chave, nova lista ou novo backend.

Corpus intocado: schema `agu-legal-reader-v1`, catálogo `agu-legislation-leg01-v1`; **6 normas, 292 artigos, 1.176 unidades, 5 integrais** — CF88 parcial (4/9), L9784 (80/222), LC101 (83/545), LC73 (73/220), DL4657 (30/89), L4717 (22/91; `L4717@2026-11-14-camara-d8a1fc60`, `topic:null`). Não alterar fontes, texto, IDs, editoriais ou declarar vigência nova.

Hashes da implementação LEG11 confirmados por HTTPS em 15/11/2026 — **reconfirmar antes de usar**:

| Asset | SHA-256 histórico |
| --- | --- |
| `index.html` | `8181f7c7fed7a83ee73736546a0088c7226ee9c26ce3e969bf704749fc27b446` |
| `revisao-inteligente.js` | `b12417eb7062a672e9236b600eaff01a361cdb68d8a8655ffcbbdee8ffd49419` |
| `leitor-juridico.js` | `1f119fb84c092b00a994943a1f0f09d85dcc6efabb6b85df536a3b3189a48c04` |
| `backup-local-s20.js` | `8f1884ab63c2d6e4bb3bca753d01607a29abedf07e60d61ecb6f1c464a07f4f9` |
| `dados/legislacao-s13.js` | `c038fc9416d1b441aa710bb970eb8428a92008f197ca367ea09df53f6c45f51a` |

O contrato publicado já possui nove scripts, CSS dos baralhos e módulo de questões; `tests/sprint21-pages.cjs` comprova HTTP 200 e hashes exatos, sem assumir que versões de cache antigas sejam permanentes.

## 3. Missão única proposta para LEG-12 — acesso rápido às pendências

Tawan estuda frequentemente **pelo celular sem o caderno físico**. A plataforma já armazena o que ele escolheu escrever à mão mais tarde, mas a lista geral hoje vive no leitor jurídico, exigindo abrir uma lei para consultá-la. O objetivo da LEG-12 é fornecer **um caminho curto e acessível a partir da Home atual** para abrir a **mesma lista** e seus filtros, sem recriar o componente, copiar marcações ou alterar o fluxo de estudo.

Implementar apenas:

1. Na Home `meu-estudo.js` (ou ponto de entrada verdadeiro após inspeção), adicionar controle discreto **“Para meu caderno”** para abrir diretamente a aba/lista já existente do leitor por `AGULegal.tab('para_caderno')` ou API equivalente **confirmada**. Preservar outros atalhos, navegação, sessões e tarefas. Não fazer redesign de dashboard.
2. Quando houver pendências, exibir **somente contagem confiável de itens `status:'pendente'`**, consultada de modo **somente leitura** no validador/estado atual. Não duplicar conteúdo ou criar outra persistência na Home. Se armazenamento estiver indisponível/inválido, usar mensagem neutra e abertura segura da lista, sem zerar dados.
3. A lista única mantém os filtros por estado, tema conhecido e sem tema, consulta, edição, ações manuais e abertura segura de origem já implementadas em LEG07–11. Preferir reuso direto, sem uma segunda lista e sem cálculo especulativo de disciplina.
4. Registrar retorno de foco e contexto da Home após consultar a lista, **sem apagar sessão ativa, avaliação, navegação anterior, parâmetros de lei nem histórico de revisão**. Adaptar minimamente somente se a API atual não oferecer uma volta segura; não criar roteamento paralelo, histórico fictício nem nova chave.
5. Sem marcar automaticamente como `anotado`, sem criar tarefa no cronograma, sem notificação ou badge insistente. A contagem é um atalho, não critério de prioridade.

Se a Home já tiver ação equivalente sob outro nome, **validar e corrigir apenas lacuna concreta**, documentando por que nenhuma duplicação é necessária. Se o retorno exigir mudança de contrato arriscada, limitar a ação à abertura da lista e registrar o limite em vez de inventar uma sessão.

## 4. Proibições e preservação

- **Não** criar ou modificar flashcards, questões, respostas, gabaritos, aulas, casos, legislação, inventários, vínculos curriculares, cronograma, agenda, revisão ou algoritmo de espaçamento.
- **Não** criar um segundo caderno digital, digitalizar páginas, copiar textos legais extensos, gerar automaticamente sínteses, adicionar uma nova categoria de backup, chave local, autenticação, banco, API, serviço, Supabase, login, sincronização ou notificações.
- **Não** alterar validação ou formato de `forNotebook` sem falha demonstrada. Se for imprescindível uma adaptação aditiva, usar **nova fixture de delta SHA-256**, mantendo intactas as fixtures LEG01–11/UX01–02 e seus testes.
- **Não** ler perfis, notas ou backups pessoais. Usar somente contextos sintéticos novos. Auditoria privada somente leitura se indispensável; nenhuma cópia de dados privados.
- **Não** executar LEG-13 durante a LEG-12.

## 5. Arquivos e testes que precisam ser inspecionados

`meu-estudo.js` e HTML da Home, `leitor-juridico.js`, `backup-local-s20.js`, `revisao-inteligente.js`, `estudo-integrado.js`, `caderno-contextual.js`, `planejamento-semanal.js`, `questoes-leitor-s18.js`, `leitor-consolidacao.js`, `index.html` e `.github/workflows/agu-sprint20-ci.yml`. Dados legislativos e `lib/catalogo-legislativo.js` apenas para verificação sem alteração.

Testes: `tests/leg07-*` a `tests/leg11-*`, `tests/fixtures/leg11-deltas.json`, `tests/ux-baralhos-01-*`, `tests/ux-baralhos-02-*`, suas fixtures e todas as regressões S19/S20/S25–27/S29–35/WORK01/LEG01–06, além de `tests/sprint21-pages.cjs`. O workflow contém 26 suítes Node e jornadas Chromium em 320/360/390/430/1280 CSS px, com `AGU_TEST_URL` na produção. Não remover, enfraquecer ou reescrever baselines.

## 6. Critérios de aceite verificáveis

Em Node e Chromium, usando contexto novo por caso e teclado/toque emulado nas cinco larguras:

1. Criar sinteticamente uma marcação de cada origem válida (lei, estudo, questão, flashcard), com estados mistos e itens `topic:null`, pela API já validada. Confirmar IDs e conteúdos distintos e nenhuma duplicação.
2. Abrir Home. Ver contagem exata **só de pendentes**; sem tema comprovado **também conta**, mas não vira vínculo curricular. Se não houver dados, exibir estado claro sem criar registros.
3. Acionar “Para meu caderno” pela tecla Enter, Espaço e toque. A **mesma lista** do leitor é aberta, com os mesmos IDs, edição, filtros, estados e origem segura; mudar manualmente um estado e voltar à Home deve atualizar a contagem **sem escrita automática**.
4. Estar numa sessão de baralho, revisão vencida, Estudo Integrado ou questão oficial, navegar à Home/lista e retornar quando seguro sem alterar respostas, sessão, estágio, datas ou foco. Nenhum componente deve fingir retomar uma origem indisponível.
5. Conferir que home/reload/nova sessão mantêm marcas e notas legadas, com quota e storage bloqueado tratados sem perda de dados. Variações adversariais: 300/301 marcas, 450/451 caracteres, origem retirada, tópico falso, duplicidade, data/status inválidos, 500/501 comentários, backup >12 MB.
6. Exportar backup das **nove categorias** em perfil sintético, restaurar em perfil sem categorias e repetir a importação em categorias presentes; bytes/IDs/estados intactos, nenhuma mescla ou duplicação.
7. Verificar foco restaurado, acessibilidade semântica, teclado, contraste e overflow em 320/360/390/430/1280, sem overlay que oculte ação. Axe-core em 390/1280: guardar **separadamente** `violations`, `incomplete` e `passed`; reexaminar elementos encobertos por rolagem e **não declarar inconclusivos aprovados**. Não alegar Android físico/TalkBack sem teste real.
8. Rodar todas as 26 regressões Node prévias, os navegadores LEG03–11/WORK01/UX01–02 e demais já presentes. Em `AGU_TEST_URL`, confirmar HTTP 200, HTML, nove scripts e CSS por SHA-256; publicar artefatos com globs explícitos, sem substituir prefixos de outras sprints.

## 7. Fluxo GitHub, fechamento e próxima etapa

Criar branch e PR próprias, inicialmente em rascunho, somente após revalidar a main e concorrentes. Usar base/empilhamento efetivo; não force push, não contornar proteção, não mesclar sem CI verde nem sobrescrever trabalho alheio. Após validação, integrar por merge permitido e confirmar GitHub Pages mais jornada HTTPS em contextos isolados. Se bloqueado, distinguir código testado em PR de produção e dizer a menor ação necessária.

Fechar objetivamente com: base/branch/commits/PR/merge; decisão de Home e contador; prova de não duplicação e backup; testes Node/Chromium/axe com inconclusivos; arquivos alterados; CI/deploy; hashes/URL; limitações concretas. Gerar `docs/LEG-12_*.md` e `docs/PROMPT_LEG-13.md` completos, **sem executar LEG-13**.

**Princípio permanente:** o cronograma seleciona o estudo; o caderno físico recebe a síntese. O AGU Quiz apenas guarda e facilita a recuperação do que o aluno escolheu anotar à mão, sem produzir outra agenda ou transformar dúvidas em conteúdo curricular certificado.
