# AGU Quiz — LEG-07 | “Para meu caderno” no leitor jurídico

Data de corte: 14/11/2026. Escopo exclusivo: registro seletivo de pontos para anotação **manuscrita posterior** no leitor existente. Nenhuma mudança de legislação, questão, aula, cronograma, revisão programada, backend ou autenticação.

## Decisões técnicas

- Reaproveitada a chave `agu_leitor_juridico_s13_v1`, uma das **nove** categorias do backup local S20. O campo opcional `forNotebook` não está presente nos arquivos legados, que permanecem aceitos sem migração. O arquivo de backup e a semântica de restauração por **categorias ausentes** não foram modificados.
- `forNotebook` é uma lista de até 300 objetos; texto breve de até 450 caracteres. IDs independentes e estáveis `pc-...` não contêm versão textual. Os IDs normativos não mudaram. O limite anterior de 500 comentários e 12 MB de backup continua igual.
- Cada item tem `{id,lawId,articleId,unitId,topic,origin,prompt,createdAt,status}`. O validador confere `unitId` no corpus oficial, consistência de norma/artigo, tópico exatamente igual ao do artigo já documentado (ou `null`), origem `leitor`, unicidade e estados `pendente|anotado|dispensado`. Não há vínculo curricular inferido.
- Só uma ação explícita muda o estado, inclusive depois de concluir sessões. O cronograma e as revisões não leem `forNotebook` durante LEG-07.
- Ação contextual na unidade selecionada, aba no leitor existente, formulário breve, edição de texto, filtros por tema/sem tema e estado, botão de retorno à origem granular e leitura de `?abrir=lei&norma=ID&dispositivo=ID`. O estado e os comentários originais persistem.
- Gravação de marcações é atômica: só troca a referência em memória após `localStorage.setItem` bem-sucedido; quota/inconsistência geram aviso e não excluem dados existentes. Não há armazenamento externo.

## Preservação e regressão

Corpus intocado: seis normas, 292 artigos, 1.176 unidades, cinco íntegras; a CF88 continua parcial. Ação Popular `L4717` integral, 22 artigos/91 unidades, versão `L4717@2026-11-14-camara-d8a1fc60`. Seu `topic:null` foi preservado. Fonte e transcrição textual da LEG-06 não foram alteradas.

O arquivo `tests/fixtures/leg07-deltas.json` registra SHA-256 anterior e posterior de `leitor-juridico.js` e `backup-local-s20.js`. Os fixtures originais LEG01–06 não foram sobrescritos. Os testes LEG03–06 agora validam a cadeia de deltas, mantendo as expectativas antigas como referências verificáveis.

O teste Node LEG-07 cobre: corpus sem regressão; backups antigos; `topic:null`; origem exata `L4717:art2:pu:e`; marcas estáveis; edição/filtros; estados explícitos; retorno ao dispositivo; roundtrip S20 idempotente e não destrutivo; quota; 300/301 marcações; 450/451 caracteres; 500/501 comentários; validação adversarial.

O teste Chromium LEG-07 percorre 320/360/390/430/1280 CSS px com perfis novos e dados exclusivamente sintéticos; inclui teclado, seleção, criação, edição, home, reload, origem, estados, download/restore, sessão anterior e axe 4.x em 390/1280, separando violações, inconclusivos e aprovações. Rodar também as suítes anteriores e as jornadas em URL HTTPS publicada. **Sem Android físico ou TalkBack.**

## Publicação e continuidade

Implementação em `leg/leg07-para-meu-caderno`, base `8d6939ed9f6331c394cae93ee1328d8eb0b9b971`, commits `fab05a34ae63cc929ddc85734a18f7ff16e2d7c0`, `168fef01dd260bfa4e8c74457dd2c57da017f556` e `e07d94650e07fa685a8fd1713f417f264e0aa60b`, [PR #13](https://github.com/Talksxb/agu-quiz/pull/13) mesclada em `fa659e74634d48cf0ec897bfd91c519fff318072` (14/11/2026).

CI PR: [run 43638613892](https://github.com/Talksxb/agu-quiz/actions/runs/43638613892) **aprovada**, com 20 suítes Node e todo o fluxo Chromium S20–35, WORK01 e LEG01–07. Houve duas execuções intermediárias reprovadas: sintaxe no novo teste (`fab05a34`) e ambiguidade de seletor antigo “Caderno” após adicionar “Para meu caderno” (`168fef01`); ambas corrigidas sem apagar regressões. Os testes S33/S34/S35 agora selecionam precisamente a aba histórica “Caderno”.

Chromium 159.0.8154.6: cinco larguras (320/360/390/430/1280); marcação no dispositivo `L4717:art2:pu:e`, edição, `topic:null`, reload, abertura granular, estado `anotado` somente por clique, exportação/restauração, notas de CF/L9784/LC101/LC73/LINDB e sessão anterior preservadas. Capturas inspecionadas. Axe 4.14.0 em 390/1280: **zero violações**; em 390 um item inconclusivo de contraste por sobreposição passou após rolagem; em 1280 nenhum inconclusivo. Não houve teste em Android físico/TalkBack.

Deploy Pages [run 43638934666](https://github.com/Talksxb/agu-quiz/actions/runs/43638934666) aprovado. [CI da main 43638935197](https://github.com/Talksxb/agu-quiz/actions/runs/43638935197) **aprovada nos três jobs** (Node, Chromium e `pages-publicado`), incluindo a jornada LEG-07 diretamente na URL publicada em HTTPS. Verificação independente `node tests/sprint21-pages.cjs`: HTTP 200, HTML com SHA-256 `dcc0dac77e944c0789e495390ed2127f9084a3f6e85e7d7012635c63d3727f9a` e os oito scripts por hash, correspondendo à implementação. Hashes dos assets modificados: leitor `34768817511009ed069c9bab512165092036f6ed90ed3d2b3247f6932a8608bb`; backup `11993873b63fb9df591eb43ddc8dbec9ba2923d1c8f76b029c91568ec3bace10`. Corpus anterior `c038fc9416d1b441aa710bb970eb8428a92008f197ca367ea09df53f6c45f51a`, inalterado. URL: https://talksxb.github.io/agu-quiz/?abrir=lei&norma=L4717

Handoff obrigatório: `docs/PROMPT_LEG-08.md`. LEG-08 fará **somente** a recuperação contextual das pendências existentes durante a revisão programada do tema com ID comprovado. Nenhuma funcionalidade LEG-08 foi implementada aqui.
