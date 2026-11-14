# AGU QUIZ | WORK — LEG-08

## Recuperar “Para meu caderno” na revisão programada, sem criar agenda

**Execute exclusivamente LEG-08.** Integre as pendências já criadas pela LEG-07 ao fluxo preexistente de revisão inteligente, quando e somente quando o tema curricular comprovado estiver sendo revisado. Não importe outra norma, não modifique aulas, provas, gabaritos ou planejamento, não altere datas nem estágio de revisões, não antecipe a LEG-09. Ao encerrar, entregue `docs/PROMPT_LEG-09.md` completo e autossuficiente, sem executar LEG-09.

### 1. Repositório, estado e retomada verificável

- Repositório público: https://github.com/Talksxb/agu-quiz
- GitHub Pages: https://talksxb.github.io/agu-quiz/
- Auditoria privada `Talksxb/agu-auditoria`: somente leitura se indispensável para confirmar um vínculo, nunca copiar documentos ou dados privados para este repositório.
- Predecessora LEG-07: branch `leg/leg07-para-meu-caderno`, base verificada `8d6939ed9f6331c394cae93ee1328d8eb0b9b971`, commits `fab05a34ae63cc929ddc85734a18f7ff16e2d7c0`, `168fef01dd260bfa4e8c74457dd2c57da017f556`, HEAD `e07d94650e07fa685a8fd1713f417f264e0aa60b`; [PR #13](https://github.com/Talksxb/agu-quiz/pull/13), **merge confirmado `fa659e74634d48cf0ec897bfd91c519fff318072`**. CI da PR `43638613892` verde (20 suítes Node + Chromium); Pages `43638934666` verde; CI main `43638935197` verde nos três jobs (Node, Chromium e `pages-publicado`). **Reconfirmar o HEAD, CI, hashes e Pages em `docs/LEG-07_PARA_MEU_CADERNO.md` e no histórico remoto**, pois esses identificadores são referências históricas, não invariantes.
- Antes de alterar código, conferir `main`, PRs abertas, branches concorrentes, deployments, `docs/LEG-07_PARA_MEU_CADERNO.md`, `docs/LEG-06_ACAO_POPULAR.md`, `docs/LEG-05_LINDB.md`, `docs/PROMPT_LEG-08.md`, o workflow e os contratos de backup. Não reiniciar inventários, Sprints 4/20–42 ou cotejos legislativos já concluídos.

### 2. Estado funcional entregue pela LEG-07

A plataforma dispõe de um **único leitor jurídico**, `leitor-juridico.js`, cuja API mantém `openLaw(id,restart)`, `article(id)`, `unit(id)`, `chapter(id)`, `boundary(last)`, `tab`, `mobile` e `note`. O parâmetro público `?abrir=lei&norma=ID&dispositivo=ID` abre referência granular; `?abrir=lei&norma=ID` permanece válido. A LEG-07 adicionou a aba/ação contextual “Para meu caderno”, formulário de pergunta breve, lista filtrável por estado e tema, edição de texto, estados manuais, retorno à origem e persistência local. Não há novo caderno digital.

**Armazenamento**: chave local preexistente `agu_leitor_juridico_s13_v1` com subestrutura opcional `forNotebook`. O formato dos backups antigos continua válido, sem migração. Cada registro contém:

```json
{
  "id": "pc-<identificador-estavel-unico>",
  "lawId": "L4717",
  "articleId": "L4717:art2",
  "unitId": "L4717:art2:pu:e",
  "topic": null,
  "origin": "leitor",
  "prompt": "Como distinguir motivo de finalidade e desvio de finalidade?",
  "createdAt": "2026-11-14T20:00:00.000Z",
  "status": "pendente"
}
```

O exemplo é **sintético**. A plataforma não atribui automaticamente `topic` a L4717/LINDB por existência de cartão ou resumo. O campo `topic` só traz o ID que o próprio catálogo de lei vinculou, quando documentalmente comprovado. A marcação sem tema comprovado continua disponível para recuperação **manual**, sem ser injetada em revisão de tema errado. Estados permitidos: `pendente`, `anotado`, `dispensado`, sempre alterados **manualmente**. Limites da LEG-07: 300 marcações, 450 caracteres por gatilho; 500 comentários anteriores e 12 MB UTF-8 de backup inalterados. IDs das marcações não carregam versão da norma.

O leitor expõe `AGULegal.peek()` para leitura de estado sem mutação e operações `notebookSave`, `notebookFilter`, `notebookEdit`, `notebookCancel`, `notebookSetStatus`, `notebookOrigin`. Verificar a API e o estado efetivos antes de consumir. O validador de `backup-local-s20.js` aceita o campo opcional e rejeita IDs, referências, temas e estados inconsistentes. O backup mantém **nove** categorias e restaura **somente categorias ausentes**, sem mesclar/substituir dados atuais. Os arquivos legados permanecem válidos.

Hashes SHA-256 verificados em HTTPS após LEG-07: `index.html` `dcc0dac77e944c0789e495390ed2127f9084a3f6e85e7d7012635c63d3727f9a`; `leitor-juridico.js` `34768817511009ed069c9bab512165092036f6ed90ed3d2b3247f6932a8608bb`; `backup-local-s20.js` `11993873b63fb9df591eb43ddc8dbec9ba2923d1c8f76b029c91568ec3bace10`; corpus `dados/legislacao-s13.js` `c038fc9416d1b441aa710bb970eb8428a92008f197ca367ea09df53f6c45f51a`. Reconfirmar antes de alterar. Axe 4.14.0 em 390/1280: zero violações; um inconclusivo de contraste em 390 passou após rolagem, nenhum em 1280. Sem Android físico/TalkBack.

Corpus normativo após LEG-06/07, inalterado na LEG-07: schema `agu-legal-reader-v1`, contrato `agu-legislation-leg01-v1`, seis normas, 292 artigos, 1.176 unidades, cinco integrais. CF88 parcial (4 artigos/9 unidades); L9784 integral (80/222); LC101 integral (83/545); LC73 integral (73/220); DL4657 integral (30/89); L4717 integral (22/91), versão `L4717@2026-11-14-camara-d8a1fc60`, todos os artigos com `topic:null`. Preservar transcrição, fonte, notas editoriais e ressalvas e não certificar vigência jurídica.

### 3. Escopo funcional exclusivo da LEG-08

1. Localizar o ponto de entrada **já existente** das revisões programadas (`revisao-inteligente.js`, `planejamento-semanal.js`, `estudo-integrado.js`, `meu-estudo.js`, conforme inspeção) sem criar mecanismo paralelo.
2. Quando o aluno iniciar ou consultar uma **revisão já programada** para um tópico documentalmente identificado, recuperar somente as marcações `forNotebook` com `status:'pendente'` e `topic` exatamente igual ao ID curricular dessa revisão. Exibir gatilhos curtos, não resumos automáticos ou transcrições do texto jurídico.
3. Permitir consultar a marcação e, se houver origem normativa válida, abrir o **dispositivo exato** usando a navegação já implementada; o retorno deve preservar contexto, foco e estado da revisão.
4. Disponibilizar ações explícitas “Anotei no meu caderno” e “Dispensar” (e, quando adequado, “Manter pendente”), reutilizando o mesmo registro e validador de `forNotebook`; não criar cópia da pendência em outra categoria.
5. Ao marcar como anotado, manter ID, texto, data original, norma, dispositivo e tópico. Atualizar **somente** `status`, depois de confirmar a gravação local. A revisão concluída, respondida ou dispensada nunca altera automaticamente `status`.
6. Para `topic:null`, mostrar orientação de que a marcação está acessível pela **lista geral do leitor**, mas não integrá-la indevidamente em revisão temática; não atribuir currículo por proximidade textual ou código de cartão.
7. Se não houver marcações pendentes para determinado tópico, não mudar o fluxo de revisão. O recurso é opcional, complementar ao caderno físico e útil também quando o aluno estuda apenas pelo celular.

### 4. Proibições e preservação

- Não alterar prioridade, quantidade, programação, datas, fases, espaçamento ou algoritmo das revisões; nenhuma agenda paralela.
- Não criar um segundo caderno digital, exigir digitalização das páginas, importar norma, inventar questão/associação curricular ou criar novas aulas.
- Não alterar o modelo de marcas, limites, IDs normativos, estrutura de transcrição ou notas legadas sem prova de necessidade e deltas rastreados.
- Não criar chave nova, backend, autenticação, Supabase, sincronização, notificações ou serviço externo.
- Não sobrescrever categoria existente no backup, não fundir/restaurar parcialmente dados pessoais. Manter nove formatos e restauração só de categorias ausentes.
- Não navegar no perfil real do usuário. Use perfis sintéticos novos, notas e sessões fictícias.
- Não preparar ou executar a LEG-09 nesta sessão, exceto gerar seu prompt ao final.

### 5. Contratos e arquivos a conferir

- `leitor-juridico.js`: leitura e atualização explícita do `forNotebook`, abertura granular e foco.
- `backup-local-s20.js`: validação de campo opcional e limites; roundtrip, idempotência e arquivo antigo.
- `revisao-inteligente.js`: entradas de revisão, vínculo curricular, sem mudança de agendamento.
- `planejamento-semanal.js`: programação vigente, somente leitura no contexto deste recurso.
- `estudo-integrado.js`, `caderno-contextual.js`, `leitor-consolidacao.js`, `meu-estudo.js`: preservar APIs e a única lista de marcações.
- `dados/legislacao-s13.js`, `lib/catalogo-legislativo.js`: consulta, sem alteração.
- `tests/leg07-validacao.js`, `tests/leg07-browser.cjs`, `tests/fixtures/leg07-deltas.json`: baselines e jornada.
- `tests/leg06-{validacao,browser}.js`, `tests/fixtures/leg06-{manifesto,preservacao}.json` e LEG01–05; S19/S20/S25–27/S29–35, WORK01; `tests/sprint21-pages.cjs`.
- `.github/workflows/agu-sprint20-ci.yml`: todas as suítes e execução HTTPS em `AGU_TEST_URL` sem enfraquecer antigas verificações.

Qualquer adaptação de leitor/backup deve ser **aditiva**, com novo fixture de delta, sem regravar as referências anteriores. Não remover testes que detectem regressões.

### 6. Testes e critérios de aceitação da LEG-08

Node e browser em 320/360/390/430/1280 CSS px, exclusivamente em novos contextos sintéticos; Chromium e axe-core (registrar `violations`, `incomplete`, `passed` separadamente e reavaliar sobreposições após rolar). Testar teclado Enter/Espaço, foco, retorno à revisão, toque emulado e ausência de overflow. Não alegar Android físico/TalkBack sem teste.

Cenários obrigatórios:

1. Registrar no leitor uma marcação `pendente` de um **tópico comprovado** e outra com `topic:null` (por exemplo `L4717:art2:pu:e`).
2. Iniciar revisão **já programada** do tópico comprovado; conferir a exibição **somente** da marcação pendente com correspondência exata, sem modificar a data do cronograma.
3. Abrir a origem normativa exata e retornar à revisão, com foco e estado preservados.
4. Concluir a revisão sem acionar “Anotei”: marcação continua `pendente`.
5. Na revisão ou lista, acionar explicitamente “Anotei no meu caderno”; estado muda para `anotado` e não volta automaticamente a `pendente`.
6. Testar `dispensado`, reabertura para `pendente`, ausência de duplicatas e itens com outro tópico.
7. Confirmar que `topic:null` permanece recuperável pela lista geral, mas **não** é associado automaticamente a revisão de ADM-23 ou outra.
8. Após reload/home/nova sessão, recuperar estado e IDs, sem tocar em notas e sessões anteriores.
9. Exportar backup das nove categorias, restaurar em perfil limpo, recarregar, conferir dados e ausência de duplicação; repetir a importação em categoria existente e demonstrar que foi ignorada.
10. Testar limites, quota e registros adversariais; preservar arquivos antigos sem `forNotebook` e 500 comentários.

Executar todas as regressões Node/Chromium antigas, inclusive travessia LINDB→L4717, buscas, recuperação de sessões, notas, fonte e corpus. Não refazer pesquisas legais nem testes Android físicos impossíveis.

### 7. GitHub, CI, publicação e fechamento

Criar branch e PR próprias, preferencialmente em rascunho durante implementação. Confirmar base remota e PRs antes de escrever; evitar conflito com trabalho concorrente. Não forçar push, contornar proteção nem mesclar antes de CI aprovada. Após validar, integrar observando proteções; usar GitHub Pages atual. Conferir deploy e `tests/sprint21-pages.cjs` (HTTP 200, HTML, oito scripts e SHA-256 exatos), executar jornada sintética na URL publicada em perfis novos.

Relatório final objetivo com: base/branch/commits/PR/merge, mudanças reais nos contratos, provas de correspondência curricular correta, testes Node/Chromium/axe, itens inconclusivos, estado de produção, URL/hashes, riscos e pendências. Distinguir código em PR de código publicado se houver bloqueio. Manter documentação `docs/LEG-08_*.md` com o resultado e gerar `docs/PROMPT_LEG-09.md` autossuficiente, com estado verdadeiro ao final, **sem executar LEG-09**.

### Regra permanente

O aplicativo seleciona tema e momento da revisão conforme o cronograma vigente; “Para meu caderno” apenas recupera os gatilhos que o aluno salvou para escrever em seu caderno físico. **A revisão não é conclusão da anotação manuscrita.**
