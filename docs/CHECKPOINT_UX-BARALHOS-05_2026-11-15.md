# AGU Quiz — checkpoint UX-BARALHOS-05

Data: 15/11/2026. Escopo executado: **validação adversarial isolada e decisão curricular conservadora**. UX-BARALHOS-06 **não executada**.

## Reconhecimento e ponto de partida

- Repositório principal: `Talksxb/agu-quiz`. `main` revalidada no início: `c33716434b42a5656fa1fada62ba754f98b8c93d`; branch exclusiva `ux/baralhos-05`, criada dessa base. Nenhuma PR aberta concorrente no reconhecimento inicial. A `main` já continha UX01–04 e LEG07–12; a LEG12 havia sido integrada em `cb764e3071dc7ac0cc00d60999f9a53cfe77cbcb`, e o merge documental mais recente era `c337164`.
- Conferidos checkpoints UX01–04, prompt UX05, LEG07–12 e WORK01, além dos módulos de revisão, disciplina, planejamento, Home, Estudo Integrado, leitor, questões, CSS e backup e testes anteriores. `docs/PROMPT_UX-BARALHOS-05.md` foi preservado.
- Produção **antes da sprint**, confirmada por `node tests/sprint21-pages.cjs`: HTTP 200 para HTML, nove scripts, CSS de baralhos e questões; SHA-256 dos bytes em HTTPS igual ao checkout de `c337164`. `index.html` `b15be4310bb20ab842aab91804c107ce97dd8819d18e7a84e0d00a630bb974a1`; `revisao-inteligente.js` `fe6b8dcacc7363fd661055e737c73c443f1428d2b97e807faeb37e447650252c`; `baralhos-ux.css` `de772af0e639f70f57bc4ea8d6bf59fd9cd6971463ae936f9a74d390be42d3b7`; `meu-estudo.js` `e88aa5ee7cb77a5f4e193f690830c803604dcda1b3d2e6fe53e0d8285bed43de`.
- Sem integração GitHub ↔ GPT Sites demonstrada por configuração explícita; nenhuma sincronização inferida nem alteração em Sites. Auditoria privada não consultada: o corpus público bastou.

## Acervo e decisões

- **36 flashcards autorais, seis baralhos**: `ADM-06` 12, `ADM-13` 4, `ADM-23` 4, `CON-02` 2, `CON-50` 4, `PC-03` 10. Metadado cognitivo original em **14**: nível 2 (7), nível 3 (6), nível 4 (1); **22 sem nível**. Catálogo de 14 disciplinas públicas, três com baralhos. Nenhum ID criado, duplicado, reclassificado ou excluído.
- `AGUPlanner` propõe tarefas como `ADM/Atos administrativos` e `CON/Funções essenciais à Justiça`; `AGUHome` navega por categorias amplas. O contrato `AGUReview.exactDeck(topic)` aceita somente ID granular literal como `ADM-06`. **Não existe par automático confirmado** entre os IDs efetivos das tarefas e baralhos. Decisão: **nenhum atalho curricular específico**; é necessária autorização pedagógica de um contrato público granular caso se queira ampliar a função.
- As quatro origens da lista única `forNotebook` permanecem `leitor`, `estudo_integrado`, `questao_verificada`, `flashcard_existente`. Nenhum `topic` foi convertido em `deviceId`; a Home LEG12 mantém o contador validado com retorno ao mesmo leitor.
- Histórico importado sem `cards[id].seen/due` permanece `avaliado sem data`, sem novo prazo. Abertura e revelação não contam como avaliação, e nenhuma tentativa ou nota é criada sem ato explícito. Mantidos D+1/D+7/D+21/D+45, `librarySession` opcional e as nove categorias S20, 12 MB UTF-8 e restauração de ausências; importação de revisão até 3 MB e somente tentativas.
- Sem dados públicos verificados de recorrência via `AGUDisciplines.verifiedFrequency()`. Nenhuma transposição AUD02-FREQ ou classificação level→nível pedagógico; nenhum selo de oficialidade para cartões autorais.

## Resultado técnico e limites

- **Nenhum defeito novo reproduzido no produto** com evidência suficiente para editar `index.html`, JS/CSS de produção, matriz, cronograma, backups ou leitor. A entrega de código da UX05 consiste **apenas em testes novos e integração à CI**, sem alterações ao runtime e sem novo delta de hashes de assets protegidos. Os fixtures anteriores permanecem intactos.
- Nova suíte `tests/ux-baralhos-05-validacao.js`: seis verificações sintéticas — contagem e níveis, 1.900 tentativas importadas sem agenda, arquivo acima de 3 MB rejeitado, importação idempotente sem sobrescrever seen/due/stage, troca de sessão e avaliação única, quatro origens LEG11–12 e S20 idempotente, planejamento amplo sem equivalência inventada.
- Nova jornada `tests/ux-baralhos-05-browser.cjs`: cinco larguras 320/360/390/430/1280, histórico sintético de 1.200 tentativas, estados da revisão, um/dois cartões, teclado, nota LEG11 voluntária, pausa/recarga/troca, Home LEG12, backup S20 em perfil vazio, foco, `aria-live`, `prefers-reduced-motion`, overflow, axe 390/1280 e capturas. Qualquer `incomplete` de axe é separado de violação confirmada e fica no JSON da jornada.
- Antes de editar: **29/29 suítes Node aprovadas**. Após adicionar a nova suíte, `node tests/ux-baralhos-05-validacao.js`: **6/6 cenários aprovados**; todos os anteriores deverão permanecer no CI.
- **Chromium local não foi executável**: primeiro faltou o executável do Playwright; com `/usr/bin/chromium` o ambiente retornou `socket() failed: Operation not permitted`. A aprovação da jornada deve vir da CI remota e **não deve ser atribuída ao ambiente local**.
- **Android físico e TalkBack não testados**; não houve aparelho nem perfil assistivo independente disponibilizado. Chromium com `hasTouch` e largura móvel não é equivalente a Android/TalkBack. Não se corrigiram rótulos sem observação real. Permanecem inconclusivos históricos de contraste da LEG11 e da UX04, sujeitos a avaliação manual.

## Entrega GitHub e publicação

Estado final remoto, CI da PR, CI da `main`, revisão das capturas, hash HTTPS após merge e eventuais limites adicionais: **registrar após a execução verificável**, sem presumir que uma PR é produção.

Handoff único: `docs/PROMPT_UX-BARALHOS-06.md`, **somente preparação**. Não iniciar UX06 neste lote.
