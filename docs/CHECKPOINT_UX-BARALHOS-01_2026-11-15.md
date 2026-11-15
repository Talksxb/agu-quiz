# AGU Quiz — UX-BARALHOS-01 | Biblioteca e sessões de flashcards

Data de execução: 15/11/2026 (Brasil). Escopo exclusivo: interface visual e sessão contínua do acervo já existente. Nenhuma questão, gabarito, conteúdo normativo, matriz curricular, tópico privado, intervalo de revisão, autenticação ou backend alterado.

## Reconhecimento e estado anterior

- Repositório público `Talksxb/agu-quiz`: `main` em `d8e37d4de26e6fd2fdc375bba89d598f3feb2d70` no começo da sprint. Integrações LEG-06/07/08 já presentes. Durante a implementação, **LEG-09 foi mesclada**, levando a `main` a `7c81b6b8e3cb8c1f3bd26519fdaf40637bba8beb`; a branch UX foi reconciliada com esse HEAD e preserva as novas origens do Estudo Integrado. Sprints WORK e flashcards anteriores preservadas.
- Acervo real: **36 flashcards de IDs únicos**, sendo 22 autorais anteriores e 14 do lote público AUD03. **Seis baralhos**: `ADM-06` (12), `ADM-13` (4), `ADM-23` (4), `CON-02` (2), `CON-50` (4), `PC-03` (10). Três disciplinas com conteúdo; catálogo visual preparatório cobre os **14 códigos públicos já existentes**.
- O metadado `level` aparece apenas nos 14 cartões AUD03, como **nível cognitivo original**: 7 de nível 2, 6 de nível 3 e 1 de nível 4. Outros 22 não informam nível. Sem correspondência comprovada à nova taxonomia 1–3; nenhum valor foi reclassificado ou inventado.
- A revisão existente grava em `agu_quiz_revisao_inteligente_v1` com `agu-review-v1`, D+1/D+7/D+21/D+45. Backup completo: nove categorias, até 12 MB; módulo de revisão mantém limite de 3 MB na importação própria e mesclagem de **tentativas**, sem substituir estágios.
- O GitHub Pages usa o workflow público de publicação e o teste `tests/sprint21-pages.cjs`. Não foi identificada configuração de sincronização GitHub ↔ GPT Sites no código, por isso nenhuma integração foi presumida ou modificada.

## Implementação UX01

- `catalogo-disciplinas.js`: código/nome e tokens visuais por disciplina (claro/escuro) acessíveis por `window.AGUDisciplines`; interface opcional `verifiedFrequency()` retorna `null` sem estatística expressamente marcada como verificada. Nenhuma classificação de incidência foi calculada.
- `baralhos-ux.css`: grade responsiva, contraste por tema, rótulo de cor acompanhado de texto, cartões clicáveis por botão nativo, estados de progresso e redução de movimento. Apenas área da biblioteca e cartões foi estilizada.
- `revisao-inteligente.js`: agrupamento pelos códigos **já existentes**; filtros por disciplina, título/código, nível cognitivo original e revisões vencidas; contagem real, inéditos, vencidos, progresso visto e seleção efetiva de cartões. Sessão sequencial com frente/verso, fontes e armadilhas quando presentes, avaliação individual, anterior/próximo, retomada e resumo.
- A sessão usa o campo **opcional** `librarySession` no mesmo objeto `agu-review-v1`/mesma chave; guarda somente IDs originais, posição, IDs das tentativas realizadas e estado da revelação. Não cria décima categoria. Uma simples revelação não grava tentativa; voltar a cartão já avaliado bloqueia segunda avaliação na mesma sessão. Gravação da nota e transição de sessão ocorre em uma mesma atualização local; falha na gravação não confirma a avaliação.
- Os caminhos antigos de revisão programada, avaliações oficiais, Estudo Integrado, leitor, planejamento e backup continuam utilizando as mesmas APIs e estados. Gabaritos Cebraspe e casos autorais permanecem distinguidos. Nenhuma evidência pontual foi promovida a certificação integral.
- “Para meu caderno”: o botão do baralho abre a aba **LEG-07** do leitor, sem criar uma lista paralela. Como os flashcards não carregam vínculo granular de `deviceId` individualmente comprovado, exige que o estudante escolha o dispositivo legal no leitor antes de guardar a pergunta. A recuperação LEG-08 continua condicionada às revisões já vencidas; o cronograma não foi antecipado.

## Contratos preservados e testes

- `tests/fixtures/leg08-preservacao.json` e `tests/fixtures/leg09-deltas.json` permanecem baselines históricos; `tests/fixtures/ux-baralhos-01-delta.json` encadeia os hashes do HTML e do motor após LEG-09. O teste S34 passou a localizar explicitamente o seletor de cartões legado (pois os novos filtros adicionam `<option>` antes dele), sem enfraquecer o teste de foco.
- Teste Node novo verifica 36 cartões/6 baralhos, 14 disciplinas, nível 4 não convertido, seleção de nível, perfil unitário **sintético**, nenhum acerto na abertura, rating único, retorno, reload, D+1/D+7/D+21, backup S20 idempotente, leitor e corpus preservados.
- Teste Chromium novo cobre 320/360/390/430/1280 CSS px, contraste/identidade visual, filtros, toque por botão, teclado, revelação, nota única, retorno, interrupção, reload, conclusão, integração ao leitor, captura sintética e axe em 390/1280. Incluído no CI e na verificação publicada.
- **Execução local:** 22 testes Node anteriores/novos aprovados. Chromium local disponível mas bloqueado pelo ambiente (`socket(): Operation not permitted`); não há alegação de teste Chromium local ou Android físico/TalkBack. Resultado do CI Chromium e inspeção das capturas devem constar do PR.

## Limites conhecidos / próxima revisão

1. Ausência de classificação validada dos 22 cartões sem nível e de tradução da escala cognitiva original 2–4 para os três níveis pedagógicos propostos.
2. Sem associação automática cartão → dispositivo da LEG-07, pois o catálogo existente não contém `deviceId` rigorosamente confirmado para cada cartão. Abrir o leitor é a integração segura disponível.
3. `librarySession` é portável na categoria **ausente** via backup completo S20. A importação parcial própria do motor mescla apenas tentativas; não sobrepõe sessão nem agendamento existente.
4. O app depende de armazenamento local por navegador. Não existe sincronização automática entre Android, desktop, GitHub Pages e GPT Sites.
5. Prioridade histórica por assunto aguarda investigação AUD02-FREQ-01 independente. A interface não exibe rankings.

Handoff: `docs/PROMPT_UX-BARALHOS-02.md`; exclusivamente instrução futura, **UX-BARALHOS-02 não executada**.
