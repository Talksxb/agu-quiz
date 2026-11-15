# AGU Quiz — Checkpoint UX-BARALHOS-04

Data: 15/11/2026, horário de São Paulo. Uma única sprint, sem execução de UX05. Este checkpoint registra o conteúdo do patch e os portões de aceite; estado remoto, CI e publicação devem ser atualizados apenas com evidências posteriores ao envio.

## Ponto de partida comprovado

- Repositório: `Talksxb/agu-quiz`. `origin/main` confirmado em `7fe92d1ffc0b3b7cfe398d90d1172feefb778621` (merge UX03), nenhuma PR aberta no reconhecimento; branch criada localmente `ux/baralhos-04` diretamente desse HEAD. UX01–03, LEG07–11 e WORK01 integradas. A LEG11 não era mais PR concorrente.
- Checkpoints UX01/02/03, prompt UX04, documentos LEG07–11, módulos de flashcards, planejamento, leitor, revisão, Estudo Integrado, backup S20, questões e testes relacionados foram consultados. Nenhuma evidência da Auditoria privada foi necessária.
- Acervo público real no reconhecimento: **36 flashcards e seis baralhos** (`ADM-06` 12; `ADM-13` 4; `ADM-23` 4; `CON-02` 2; `CON-50` 4; `PC-03` 10), três disciplinas com cartões; 14 níveis cognitivos originais (2:7, 3:6, 4:1) e 22 não informados. Não equivalem automaticamente aos níveis pedagógicos 1–3. Catálogo geral tem 14 disciplinas.
- Persistência: `agu_quiz_revisao_inteligente_v1`, versão `agu-review-v1` com `librarySession` opcional, `cards`, `attempts`; motor com `DAYS=[1,7,21,45]`; backup S20 de nove categorias, limite de 12 MB UTF-8 e restauração apenas das categorias ausentes; importação parcial de revisão até 3 MB só acrescenta tentativas. Nenhuma migração ou nova chave.
- `AGUPlanner` usa tópicos amplos, como `ADM/Atos administrativos`, incompatíveis com o código granular `ADM-06`. `AGUReview.exactDeck(topic)` responde apenas a igualdade literal com um baralho existente. Não houve prova de par tarefa→baralho autorizado; **nenhum atalho foi criado**. `AGUHome`, minutos e marcações de tarefa não mudaram.
- LEG11 já oferece a origem `flashcard_existente` na única lista `forNotebook` da categoria `agu_leitor_juridico_s13_v1`. Cartões individuais não trazem `deviceId` granular comprovado; `topic` não se transforma em dispositivo. Leitor, questões oficiais, Estudo Integrado e marcações foram preservados.
- Sem evidência de sincronização GitHub ↔ GPT Sites no código/configuração verificada. O código continua no GitHub, com publicação estática via Pages; nenhuma integração Sites foi modificada.

## Evidência nova e alteração mínima

O teste sintético falhou **antes do patch**: `AGUReview.select('ri-con-01')`, após carregar duas tentativas históricas importadas e nenhum `cards[id].seen/due`, mostrava na visão **legada** `Revisão anterior: 0 · próxima inédita`. A biblioteca UX03 classificava corretamente o mesmo item como “avaliado sem data”. A contradição deriva do uso de `stat(id).seen` exclusivamente no chip legado.

Corrigido apenas o chip de `revisao-inteligente.js` para usar o índice histórico de leitura já existente, sem modificar estado:

- `Avaliações anteriores: N · sem agenda local` para avaliação histórica e nenhuma data local;
- `Avaliações anteriores: 0 · ainda inédito` para item realmente sem avaliação;
- `Avaliações anteriores: N · próxima AAAA-MM-DD` quando há data local registrada.

Não se cria vencimento, estágio ou domínio. `reviewInfo.seen/due`, `attemptsInfo`, avaliações únicas por sessão, D+1/D+7/D+21/D+45 e código curricular permanecem intactos. A etiqueta também funciona após reload e com 1.400 tentativas sintéticas. `index.html` altera somente o parâmetro de cache do motor para `?v=20261115-ux04`; CSS, planejamento, leitor, notas, corpus, perguntas e demais módulos ficam inalterados.

O delta aditivo `tests/fixtures/ux-baralhos-04-delta.json` encadeia UX03→UX04; os fixtures históricos permanecem intactos. Cinco suites antigas foram ajustadas **somente nas expectativas do hash atual**, verificando expressamente a cadeia antes/depois.

## Cobertura, limites e aceite

- **28 suítes `tests/*validacao.js` passaram localmente**: S19–35 disponíveis, LEG01–11, WORK01 e UX01–04. Incluem nove categorias do backup S20, importação/restauração não destrutiva, preservação da agenda e da origem do caderno. `tests/ux-baralhos-04-validacao.js` testou falha original, histórico importado e sem data, cartão inédito, data agendada, 1.400 tentativas, reload, igualdade literal, backup e hashes.
- `tests/ux-baralhos-04-browser.cjs` criado para executar em **Chromium real na CI** nas larguras 320/360/390/430/1280, com perfil isolado sintético: biblioteca, leitura legada, filtro `sem_data`, baralho único, tecla Espaço, foco, ação LEG11 voluntária, rating único, pausa/reload/retomada, restauração, planejamento intocado, movimento reduzido, overflow e axe em 390/1280. As suites Chromium UX01–03/LEG/WORK anteriores foram mantidas no workflow. Artefatos por viewport e diagnósticos axe são publicados pelo workflow; violações e casos inconclusivos são registrados separadamente.
- **Chromium local não executado**: o binário abortou por bloqueio do socket de processo no sandbox, não por falha da aplicação. Não afirmar validação visual completa até os jobs Chromium/Pages concluírem. **Android físico e TalkBack não testados**; Chrome com viewport móvel não é substituto equivalente.
- Requisitos de merge: CI Node/Chromium verde, ausência de conflito, nenhum defeito de backup/privacidade/revisão. Após merge, verificação HTTPS do Pages deve cotejar SHA-256 de HTML, motor, CSS e outros assets; `tests/sprint21-pages.cjs` exige a nova versão cache.

## Decisões preservadas / pendências reais

1. **Validação Android/TalkBack por pessoa em dispositivo independente**: medir compreensão de “vencidos antes de hoje”, “hoje”, “avaliado sem agenda local” e histórico, sem registrar dados pessoais nos artefatos de teste. Sem aparelho disponibilizado, registrar limitação, não atribuir conformidade assistiva integral.
2. **Ponte curricular**: para autorizar atalho específico, exigir campo da própria tarefa com código granular literal comprovado e aceitar apenas igualdade por `exactDeck`. Se precisar mapear códigos amplos, requer decisão pedagógica formal distinta; não deduzir de nome, frequência ou artigo.
3. **Níveis e recorrência**: não converter `level` 2/3/4 automaticamente, não criar ranking AUD02-FREQ nem priorização sem conclusão/verificação.
4. **LEG11**: manter a lista única e as marcações de origem; não inferir dispositivo jurídico a partir do `topic` do cartão.
5. **GPT Sites**: ausência de configuração de sync verificável; testar somente mediante integração expressa e acessível, sem alterar nesta sprint.

O único handoff autorizado nesta execução é `docs/PROMPT_UX-BARALHOS-05.md`, sem implementar a UX05.
