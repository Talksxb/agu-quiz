# AGU QUIZ | WORK — LEG-15
## Verificação assistiva do acesso “Para meu caderno” — retomada apenas com evidência nova

**Este arquivo é o handoff da LEG-14. NÃO executar LEG-15 no encerramento da LEG-14.** Uma nova execução exige autorização expressa de Tawan. Executar exclusivamente LEG-15, uma única sprint, sem antecipar LEG-16; no fechamento preparar `docs/PROMPT_LEG-16.md` completo e autossuficiente, **sem executar LEG-16**.

### 1. Missão e portão anti-repetição

O trabalho pendente é verificar a navegação **Home ⇄ lista única “Para meu caderno”** com tecnologia assistiva em aparelho/perfil genuinamente independente, ou investigar um **defeito novo, localizado e reproduzível** desse acesso. O caderno principal é físico; o aplicativo só guarda gatilhos curtos escolhidos pelo estudante para anotação posterior. **Revisão concluída não altera automaticamente o estado de anotação manuscrita.**

**Condição de entrada:** antes de qualquer ensaio mutável, demonstrar pelo menos um destes fatos novos:

1. Android/iOS realmente independente, leitor de tela ativo (TalkBack/VoiceOver ou equivalente), usuário/perfil de teste novo e autorizado, partição de armazenamento separada, dados fictícios e descarte seguro; ou serviço de teste assistivo autorizado com as mesmas garantias, registrando modelo, SO, versão e permissões; **ou**
2. Defeito novo do atalho, foco, ordem de leitura, contraste/oclusão, retorno Home/lista ou tolerância a storage, comprovado por passos mínimos, evidência inspecionável e impacto, ainda não coberto/resolvido por LEG12–14.

**Se ambos faltarem, não abrir Chrome/CDP compartilhado, não recriar contextos sintéticos idênticos e não iniciar infraestrutura nova.** Registrar estado atualizado do portão **sem patch**, sem alegar teste de Android ou conformidade assistiva. A repetição da mesma CI anterior não cria evidência nova. Não usar o perfil real de Tawan ou backups pessoais.

### 2. Fonte da verdade e predecessor — conferir, não assumir

- Repositório público: https://github.com/Talksxb/agu-quiz; GitHub Pages: https://talksxb.github.io/agu-quiz/.
- Auditoria privada `Talksxb/agu-auditoria`: somente leitura pontual quando estritamente indispensável e autorizado; nunca exportar matriz, prova, evidências, dados pessoais ou arquivos privados ao Quiz. Para esta tarefa normalmente **não há motivo para consultá-la**.
- LEG07–11 implantaram uma única lista `forNotebook`; LEG12 [PR #27](https://github.com/Talksxb/agu-quiz/pull/27) criou o acesso da Home, merge `cb764e3071dc7ac0cc00d60999f9a53cfe77cbcb`. LEG13 [PR #29](https://github.com/Talksxb/agu-quiz/pull/29), merge `60bf27b0c170ed003d0eec1c5fb22abe15859e79`, corrigiu apenas o botão “Continuar estudando” que truncava com fonte 200% em tela estreita. Seu fechamento documental foi integrado em `253f658a8e8fe23cd4660379cc2eca8756f0d22d`.
- **LEG14:** [`docs/LEG-14_PORTAO_ASSISTIVO_SEM_PATCH_2026-11-15.md`](LEG-14_PORTAO_ASSISTIVO_SEM_PATCH_2026-11-15.md) documenta que o Linux gerenciado não oferecia Android/iOS/Orca/TalkBack/VoiceOver, emulador ou sessão autorizada independente, nem falha nova demonstrada. Por isso **não houve patch de produto nem teste assistivo na LEG14**. Base de abertura: `main` `72669bd35ad08d0eb1d7be344cdb8ba37d3b7ea2` (UX06 PR #34 integrada), Pages `43749630708` verde, nenhuma PR aberta na consulta inicial. Durante a CI documental [PR LEG14 #36](https://github.com/Talksxb/agu-quiz/pull/36), a UX07 [PR #35](https://github.com/Talksxb/agu-quiz/pull/35) foi mesclada na `main` em `3bf0c1b4c11af7e40a12cf18e6b6304c8b81abe2`, somente com dois documentos; a branch LEG14 foi reconciliada sem sobrescrever. **Os identificadores são referências históricas; conferir o fechamento GitHub/PR/merge/CI da LEG14 e o novo HEAD real antes de editar.**
- CI do código LEG13 [43748256376](https://github.com/Talksxb/agu-quiz/actions/runs/43748256376) passou em três jobs, inclusive jornada `AGU_TEST_URL`; o Pages LEG14 inicialmente reconfirmado tinha HTML SHA-256 `e33885e0469ce760408e1b7d7d03c2d8bcaa753dad0f237bfd745777bf0aef24` e revisão `fe6b8dcacc7363fd661055e737c73c443f1428d2b97e807faeb37e447650252c`. **Não presumir que esses hashes ainda sejam os atuais.**

Na abertura, consultar: `main`/HEAD/PRs/branches concorrentes, CI em andamento, proteções, Pages e SHA-256 por HTTPS; `docs/LEG-14_PORTAO_ASSISTIVO_SEM_PATCH_2026-11-15.md`, `docs/LEG-13_PORTAO_HOME_CADERNO.md`, `docs/LEG-12_HOME_CADERNO.md`, relatórios LEG07–11, checkpoints UX01–07, portões de isolamento S39–S45 (e posteriores), `docs/PROMPT_LEG-15.md`, workflow e testes pertinentes. Não reiniciar inventário jurídico, AUD01–04, Sprints 4/20–45, outras LEG ou UX.

### 3. Contratos obrigatórios preservados

- **Lista única:** campo opcional `forNotebook` em `agu_leitor_juridico_s13_v1`, uma das **nove** categorias S20. Leitor `leitor-juridico.js` fornece `AGULegal.peek`, `tab('para_caderno')`, filtros, edição, `notebookSetStatus`, `notebookOrigin`, `notebookCanOpenOrigin`; Home `meu-estudo.js` só conta pendentes via `AGUBackup20.validateRecord` e devolve foco ao botão da Home após consultar a **mesma lista**. Modo demo oculta contagem real; storage inválido gera aviso e preservação, não reparo destrutivo.
- **Quatro origens:** `leitor` (dispositivo normativo real), `estudo_integrado` (sessão/dispositivo reais), `questao_verificada` (somente quatro questões públicas S18/S19 elegíveis) e `flashcard_existente` (histórico de 36 IDs). IDs `pc-*` únicos e estáveis; data ISO, pergunta até 450 caracteres, status manual `pendente|anotado|dispensado`. Origem despublicada/concluída mantém referência textual sem redirecionamento falso.
- **Tópico curricular:** somente ID granular documentalmente comprovado ou `null`. Flashcards com vínculo ao corpus somente ADM-06 e CON-50; L4717 e DL4657/LINDB seguem sem vínculo presumido. Uma disciplina ampla do plano ou o código visual do baralho não transforma `null` em tema certificado.
- **LEG08:** mostra apenas marcas `pendente` com `mark.topic===active.code` em cartão com `due` previamente registrado e vencido (`due<=hoje`). Não criar, antecipar, concluir ou alterar revisão, respostas, fase, agendamento, plano ou tarefa.
- **Backup/local:** até 300 marcações, 450 caracteres, 500 comentários, 12 MB UTF-8, nove categorias, importação S20 **somente de categorias ausentes**. Backups legados sem `forNotebook` válidos; falha de quota, validação ou leitura não pode sobrescrever bytes anteriores. Sem migração, décima chave, servidor, backend, conta, login, Supabase, sincronização, notificação ou novo caderno.
- **Corpus imutável:** `agu-legal-reader-v1`, `agu-legislation-leg01-v1`, seis normas, 292 artigos, 1.176 unidades, cinco integrais (CF88 parcial, L9784, LC101, LC73, DL4657, L4717). Não importar ou editar texto, artigos, versões, notas, provas, gabaritos, questões, flashcards, aulas, prioridades, pesos ou matriz; não certificar vigência nova.

### 4. Jornada autorizada **somente se** o portão abrir

Em perfil sintético *comprovadamente independente*, documentar a cadeia de evidências da independência e testar Home vazia, quatro marcas fictícias com estados mistos e `topic:null`, categoria JSON inválida, `SecurityError` e quota. Confirmar rótulo/anúncio assistivo e contagem exata de pendentes, inclusive sem tema, sem vazamento no modo demo. Um novo contexto do mesmo Chrome/CDP não é evidência suficiente.

Verificar leitor de tela e/ou teclado linear: anúncio e ordem do botão “Para meu caderno”, título focado, filtros pendente/anotado/dispensado/todos e temas/sem_tema; editar pergunta curta, mudança **explícita** `pendente→anotado→dispensado→pendente`, abertura de origem segura e fallback quando ausente; “Voltar ao meu estudo de hoje” restaura foco sem alterar motor de Estudo Integrado, cartão vencido, baralho ou questão oficial. Conferir Enter/Espaço, toque, rolagem, contraste, controle sob cabeçalho/overlay e fonte/zoom **200% e 400%**, em larguras **320/360/390/430/1280 CSS px** onde tecnicamente mensuráveis. Não afirmar emulação CSS como Android físico.

Revalidar backup S20 com nove categorias sintéticas em destino vazio e importação repetida idempotente; rejeitar 300/301 marcas, 450/451 caracteres, 500/501 comentários, arquivo >12 MB, ID/tópico/status adulterados, duplicatas, leitura bloqueada e quota, com prova de rollback. Nada disso autoriza tocar dados pessoais.

Se houver defeito reproduzido, guardar passos, modelo/versões, árvore acessível ou anúncios, capturas sem dados pessoais, log e comparação esperado/observado. Axe-core em 390/1280 deve separar contagem de **`violations`**, nós **`incomplete`** e regras **`passed`**, reavaliando inconclusivos após revelar por rolagem; nunca declarar `incomplete` como aprovado. LEG13 teve 0 violações na Home/lista; na lista 1/5 inicialmente inconclusivos, 0 persistentes após rolagem. LEG11 manteve 12 nós inconclusivos persistentes em flashcards por largura; UX05 nove por largura, fora do escopo do acesso. Não apagar esses riscos por silêncio.

### 5. Correção, regressões e GitHub

**Sem defeito novo:** nenhum patch de runtime, fixture artificial ou repetição de bateria idêntica. Publicar checkpoint honesto e indicar a menor ação necessária para abrir o portão. **Com defeito novo e dentro do escopo:** aplicar correção mínima e aditiva somente no acesso/retorno da Home/lista, precedida de teste que falha antes e passa depois. Não redesenhar baralhos, alterar questões ou leitor por suposição.

Se o runtime mudar, criar **novo fixture de SHA LEG15**, encadeando LEG13/14 e UX sem reescrever baselines; executar todos os Node anteriores, Chromium 320/360/390/430/1280, axe 390/1280, testes de backup e regressões S19/S20/S25–27/S29–35/WORK01/LEG01–14/UX01–06, além de HTTPS `AGU_TEST_URL`, `tests/sprint21-pages.cjs` (HTTP 200, HTML, nove scripts, CSS e módulo de questões, hashes exatos). Não enfraquecer workflow ou testes anteriores. Em sprint documental, CI de PR é validação do código existente, **não** substitui evidência assistiva independente.

Criar branch e PR próprias em rascunho sobre base remota verificada, respeitar concorrência, não usar force push, rebase destrutivo ou contornar proteções. Só integrar com CI verde e sem conflito; confirmar Pages e produção após merge. Se bloqueado, distinguir PR de código publicado.

### 6. Relatório e próxima autorização

Documentar `docs/LEG-15_*.md`: base/branch/commits/PR/merge, evidência de isolamento e do defeito (ou ausência), testes realmente executados, resultados Node/Chromium/axe/assistivos e inconclusivos, backup, riscos, CI/Pages, URL/hashes e ações pendentes. Preparar `docs/PROMPT_LEG-16.md` autossuficiente **sem executar LEG-16**. Se não houver condição nova, recomendar **suspender novas rodadas idênticas** até que Tawan disponibilize ambiente assistivo independente ou uma falha concreta inspecionável.

**Princípio permanente:** o cronograma define o estudo; o caderno físico recebe a síntese; o AGU Quiz apenas lembra o que o estudante escolheu escrever, sem agenda paralela.
