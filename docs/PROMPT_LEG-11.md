# AGU QUIZ | WORK — LEG-11

**Proposta de continuidade:** “Para meu caderno” nos flashcards existentes, sem criar cartões, alterar revisões ou duplicar listas.

Execute exclusivamente a LEG-11 quando houver autorização expressa. Este documento é o handoff da LEG-10; **não executar LEG-11 durante o fechamento da LEG-10**. Reconfirmar todos os estados históricos antes de editar.

## 1. Repositórios e ponto de partida obrigatório

- Aplicação pública: https://github.com/Talksxb/agu-quiz
- Produção: https://talksxb.github.io/agu-quiz/
- Auditoria `Talksxb/agu-auditoria`: privada e estritamente somente leitura quando indispensável para conferência pontual de vínculo; não transpor conteúdo, matriz ou dados pessoais.

**Estado de referência a confirmar:** LEG-07 PR #13 integrada (`fa659e746`), LEG-08 PR #15 (`bdb03d4d`), LEG-09 PR #17 (`bdefbf11`). LEG-10 desenvolvida em `leg/leg10-questoes-para-caderno`, PR #20, a partir da main após UX-BARALHOS-01; o fechamento definitivo de commit/merge, CI e Pages consta de `docs/LEG-10_QUESTOES_CADERNO.md`. Essa documentação deve ser lida como registro histórico; verificar HEAD da main, branches, PRs abertas, deploys, workflow e eventuais alterações concorrentes antes de qualquer ação.

Ler integralmente, conforme pertinentes:

1. `docs/LEG-10_QUESTOES_CADERNO.md`, `docs/LEG-09_ESTUDO_CADERNO.md`, `docs/LEG-08_REVISAO_CADERNO.md`, `docs/LEG-07_PARA_MEU_CADERNO.md`.
2. `docs/PROMPT_LEG-11.md` (este arquivo), o checkpoint/documentação da UX-BARALHOS-01, testes e seu delta.
3. `leitor-juridico.js`, `backup-local-s20.js`, `revisao-inteligente.js`, `questoes-leitor-s18.js`, `estudo-integrado.js`, `caderno-contextual.js`, `planejamento-semanal.js` e `.github/workflows/agu-sprint20-ci.yml`.
4. `tests/leg07-*`, `tests/leg08-*`, `tests/leg09-*`, `tests/leg10-*`, fixtures de preservação e de delta anteriores, testes UX-BARALHOS-01, `tests/sprint21-pages.cjs` e demais regressões S19–35/WORK01/LEG01–06.

Não reiniciar inventários jurídicos, Sprints 4/20–44, nem trabalhos de UX. Trabalhos concorrentes sobre `revisao-inteligente.js` exigem base confirmada e integração sem sobrescrever.

## 2. Contratos preservados

O AGU Quiz usa a única lista opcional `forNotebook` dentro da chave preexistente `agu_leitor_juridico_s13_v1`, uma das **nove categorias** de backup S20. Persistência local, gravação atômica, restauração apenas de categorias ausentes, arquivos antigos sem `forNotebook` válidos; **sem décima chave**. Limites inalterados: até 300 marcações, 450 caracteres por pergunta, 500 comentários do leitor e backup de até 12 MB UTF-8. IDs `pc-*` únicos e estáveis, datas ISO, status manuais `pendente`, `anotado`, `dispensado`.

Três origens anteriores:

- `origin:'leitor'`: lei/artigo/unidade reais, `topic` comprovado ou `null`, abertura granular.
- `origin:'estudo_integrado'`: `sessionId:'ags-*'` e `deviceId` válidos; `lawId/articleId/unitId:null`; retorno só à sessão ainda existente e em andamento.
- `origin:'questao_verificada'`: `questionId` de item oficial inequivocamente verificado e `questionLabel` histórico, campos normativos `null`; retorno só se a questão ainda é elegível; referência textual preservada caso tenha sido despublicada. LEG-10 confirmou apenas quatro itens históricos S18/S19, com `topic:null` onde o vínculo granular não foi comprovado.

O leitor permanece o único catálogo/lista de marcações e expõe `AGULegal.peek()`, `notebookSetStatus`, `notebookOrigin`, `notebookCanOpenOrigin` e rotinas específicas de gravação, todas a revalidar no código real. Nenhuma marcação altera por si só estudo, questão, resposta, revisão, cronograma ou estágio. A LEG-08 exibe somente registros `pendente` cujo `topic` é **exatamente** o ID granular de um cartão com vencimento registrado `due<=hoje`; `topic:null` fica somente na lista geral. Nunca mapear `ADM/Atos administrativos` automaticamente a `ADM-06` ou usar aproximação verbal.

Corpus normativo congelado para esta missão: `agu-legal-reader-v1` / `agu-legislation-leg01-v1`, 6 normas, 292 artigos, 1.176 unidades, cinco integrais; CF88 parcial, L9784, LC101, LC73, DL4657 e L4717. Fontes, `textVersionId`, notas, `topic:null` de L4717 e ressalvas jurídicas devem ficar intocados.

## 3. Missão exclusiva proposta para LEG-11

Adicionar ação discreta e opcional **“Para meu caderno”** ao contexto **de flashcards já existentes** na biblioteca/sessão contínua entregue pela UX-BARALHOS-01, sem alterar conteúdo ou mecanismo de avaliação. Antes de implementar:

1. Verificar a **identidade estável** do flashcard real em `revisao-inteligente.js` e eventuais módulos da UX-BARALHOS-01, sua existência nos dados públicos e distinção inequívoca entre cartão autoral e questão oficial.
2. Identificar onde uma sessão/visualização legítima de cartão oferece contexto suficiente para uma marcação. Não permitir IDs forjados ou cartões inexistentes.
3. Definir origem nova e distinta, por exemplo `origin:'flashcard_existente'`, com `cardId` verificado e referência textual curta. Os campos de lei/artigo/unidade devem ser `null` se a vinculação legal granular não estiver documentada. `topic` somente quando o próprio cartão possuir um código curricular válido, direto e verificado; senão `null`.
4. Salvar pergunta/gatilho de recuperação ativa **escrita pelo aluno** (até 450 caracteres), exclusivamente por ação explícita. Não copiar automaticamente frente/verso, comentário nem explicações extensas. Não marcar ao errar, acertar, revelar ou concluir sessão.
5. Reutilizar a mesma lista, IDs, estados manuais, edição e API de gravação atômica. Referência na lista geral deve ser legível e abrir o cartão somente quando a identidade e a rota forem seguras; caso contrário, mostrar referência textual, sem navegação fictícia ou reinício involuntário de sessão.
6. Preservar LEG-08 sem nova agenda: somente a correspondência curricular exata em revisão **já vencida** poderá revelar essa pendência; nunca alterar prazo, fase, número de cartões, pesos ou histórico de acerto.

Caso a UX de flashcards não forneça identidade, contexto ou rota suficientemente estáveis, documentar a limitação com evidência e implementar apenas adaptação mínima comprovada no escopo. **Não inventar IDs, vínculos curriculares, cartões ou sessão.**

## 4. Proibições e isolamento

Não importar legislação; não criar, reescrever ou reclassificar cartões, questões, aulas, gabaritos, provas, temas ou fundamentos; não alterar algoritmo, agendamento, cronograma, prioridades, fases, espaçamento, histórico de respostas ou planejamento. Não construir segundo caderno, sincronização, conta, backend, autenticação, banco, Supabase, notificações ou rotina de digitalização do caderno físico.

Não tocar em perfis ou backups reais. Apenas perfis novos sintéticos, dados fictícios e restauração em categoria inicialmente ausente. Não regravar baselines LEG01–10 ou UX01; mudanças no leitor/backup/revisão pedem fixture **novo** de deltas SHA-256 antes/depois e regressões retrospectivas. Respeitar PRs abertas, proteções, e não usar force push.

## 5. Aceite obrigatório

Em Node e Chromium com perfis novos 320/360/390/430/1280 CSS px:

1. Abrir um flashcard **real já existente** e criar pergunta curta por clique, sem revelar ou responder automaticamente. Confirmar ID `pc-*`, `origin`, `cardId`, `topic` só quando provado, data e `pendente`.
2. Home/reload/nova sessão conservam exatamente o registro na lista única do leitor, ao lado de marcas de lei, estudo integrado e questão oficial, sem duplicação.
3. Editar, alterar manualmente `pendente → anotado → dispensado → pendente`; revelar, errar, concluir sessão e revisão não alteram status.
4. Recuperar origem com segurança se existente; remover cartão em fixture sintético e comprovar fallback legível sem redirecionamento ou perda.
5. Rejeitar ID falso, tipo errado, `topic` forjado, registro duplicado, status/data inválidos, 301 marcas, texto 451, 501 comentários, arquivo acima de 12 MB e quota; rollback sem escrita parcial.
6. Revisão de cartão **vencido com ID granular exato** recupera somente as pendências; cartão futuro, outro tópico e `topic:null` não recuperam. Agenda e respostas preservadas.
7. Exportar nove categorias S20; restaurar em perfil vazio; repetir importação com categoria já presente e demonstrar que não substitui, não mescla nem duplica.
8. Teclado Enter/Espaço, foco e retorno, toque emulado, contraste e ausência de overflow. Axe em 390/1280: informar `violations`, `incomplete` e `passed` separadamente; reavaliar sobreposições após rolagem. Não alegar Android físico/TalkBack sem teste.
9. Executar regressões anteriores completas S19/S20/S25–27/S29–35/WORK01/LEG01–10/UX01 e validar HTTPS via `AGU_TEST_URL`, HTTP 200, HTML e hashes de todos os scripts exigidos por `tests/sprint21-pages.cjs`.

## 6. Fluxo GitHub e fechamento

Conferir main, PRs, ramos concorrentes, CI e Pages; criar branch e PR próprias em rascunho; validar localmente e em GitHub Actions antes de integrar, respeitando proteções. Após merge, confirmar deploy Pages e jornada sintética HTTPS, com SHA-256 dos assets reais. Distinguir PR testada de produção se bloqueio. Fechar com base/commits/PR/merge, dados e decisões de modelo, provas de identidade curricular, Node/Chromium/axe com inconclusivos, arquivos, testes de backup, hashes, URLs, limitações.

Gerar `docs/LEG-11_*.md` com resultado e **`docs/PROMPT_LEG-12.md`** completo e autossuficiente, sem executar LEG-12. Não modificar módulos fora da LEG-11.

**Princípio:** o caderno físico é o espaço de síntese; o AGU Quiz apenas retém perguntas que Tawan escolhe anotar posteriormente, no momento definido pelo próprio estudo, sem cronograma paralelo.
