# AGU QUIZ | WORK — LEG-09

## “Para meu caderno” no Estudo Integrado — expansão seletiva, sem segundo caderno

**Execute somente LEG-09.** A missão proposta é permitir que o estudante registre dúvidas e perguntas breves para seu caderno **físico** durante uma sessão válida do Estudo Integrado, reaproveitando a mesma lista persistida pela LEG-07 e recuperada em revisões já agendadas pela LEG-08. Não importar legislação, alterar gabaritos, inventar aula, alterar o cronograma, iniciar LEG-10, criar backend ou duplicar registros. Ao encerrar, gerar `docs/PROMPT_LEG-10.md` autossuficiente, sem executar LEG-10.

### 1. Estado real e retomada

- Repositório público: https://github.com/Talksxb/agu-quiz
- Publicação: https://talksxb.github.io/agu-quiz/
- Auditoria privada `Talksxb/agu-auditoria`: apenas leitura se indispensável e **sem** reproduzir dados privados.
- LEG-07 integrada na [PR #13](https://github.com/Talksxb/agu-quiz/pull/13), merge `fa659e74634d48cf0ec897bfd91c519fff318072`; fechamento [PR #14](https://github.com/Talksxb/agu-quiz/pull/14), merge `5385190d6aace2bbc0c2be0877f60c47c47eb04c`.
- LEG-08: branch `leg/leg08-revisao-para-caderno`, base inicial `5385190d6aace2bbc0c2be0877f60c47c47eb04c`, implementação `b798543051564fd14cbcdb6e9cd5ec42439c3838`, ajuste apenas de teste `1066880722d45403a3f068f0ddbbb5630e94238d`, [PR #15](https://github.com/Talksxb/agu-quiz/pull/15), **merge `bdb03d4d19847178dbeab73d2faf773d18cbd71d`**. [CI da PR `43675219323`](https://github.com/Talksxb/agu-quiz/actions/runs/43675219323) aprovada (21 suítes Node + Chromium nas cinco larguras); [Pages `43675530272`](https://github.com/Talksxb/agu-quiz/actions/runs/43675530272) aprovada; CI principal [`43675530557`](https://github.com/Talksxb/agu-quiz/actions/runs/43675530557) aprovada nos **três jobs**, inclusive a jornada HTTPS `pages-publicado`. HTML publicado SHA-256 `68a789ac6f4544fdf3e49be73292008d8d39865bde7e0c3cb7ee986780b8a215`, revisão `64267e9a5f1167931d23a9cc2a3b42d769ad5b2dec6883ba11194a647690e8cb`. Todos os identificadores são históricos: **reconfirmar HEAD, CI, deploy e hashes em `docs/LEG-08_REVISAO_CADERNO.md` e no GitHub antes de agir**, sem sobrescrever trabalho concorrente.
- Antes de editar, confirmar `main` remota, PRs abertas, branches concorrentes, workflows e Pages. Ler `docs/LEG-08_REVISAO_CADERNO.md`, `docs/LEG-07_PARA_MEU_CADERNO.md`, `docs/LEG-06_ACAO_POPULAR.md`, `docs/PROMPT_LEG-09.md`, contratos, testes e fixtures. Não reiniciar Sprints 4/20–42 nem inventários de fontes.

### 2. Estado funcional e contratos que não podem regredir

O AGU Quiz usa `leitor-juridico.js` como único leitor legal, com navegação por lei, artigo, subdivisão e `?abrir=lei&norma=ID&dispositivo=ID`. Na LEG-07, a ação contextual “Para meu caderno” criou uma lista seletiva no campo opcional `forNotebook` da chave legada `agu_leitor_juridico_s13_v1`, **uma das nove categorias** do backup S20. Cada registro do leitor tem `id` estável `pc-*`, `lawId`, `articleId`, `unitId`, `topic` curricular ou `null`, `origin:'leitor'`, `prompt` breve, `createdAt` e `status:'pendente'|'anotado'|'dispensado'`.

LEG-08 adicionou a consulta somente leitura das marcações pendentes na revisão de cartão com **vencimento já registrado** (`AGUReview`), quando `mark.topic === active.code` e o tema está comprovado no corpus. A mudança para `anotado` ou `dispensado` é exclusivamente manual e usa a API existente `AGULegal.notebookSetStatus`. O retorno da origem normativa preserva o cartão e o foco, sem nova agenda. Não tratar um cartão inédito ou ainda não vencido como revisão programada. A escala ampla do planejamento (`ADM/Atos administrativos`) **não** corresponde automaticamente ao ID curricular granular (`ADM-06`): jamais criar esse mapeamento por aproximação.

O corpus oficial permanece: schema `agu-legal-reader-v1`, catálogo `agu-legislation-leg01-v1`, seis normas / 292 artigos / 1.176 unidades / cinco normas integrais. CF88 parcial (4/9); L9784 integral (80/222); LC101 integral (83/545); LC73 integral (73/220); DL4657 integral (30/89); L4717 integral (22/91), versão `L4717@2026-11-14-camara-d8a1fc60`, artigos `topic:null`. Não alterar fontes, transcrição, IDs, editorial notes, `textVersionId` ou certificar vigência.

Persistência: nove categorias S20, restauração **somente de categoria ausente**, sem substituição, mescla, migração destrutiva ou décima chave; 12 MB UTF-8, 500 comentários, 300 marcações e 450 caracteres por gatilho. Não aumentar sem prova concreta e testes. Backup anterior sem `forNotebook` permanece válido. Dados reais e perfis pessoais não devem ser acessados.

### 3. Escopo exclusivo da LEG-09

1. Identificar o ponto de ação já existente de uma **sessão ativa do Estudo Integrado** (`estudo-integrado.js`, `AGUStudy.active()`, estágios existentes). A marcação só poderá ser criada por ação explícita do usuário, sem conclusão ou agendamento automático.
2. Adicionar uma ação discreta “Para meu caderno” no contexto de sessão, sem criar outra tela de caderno ou nova agenda. Texto livre breve — dúvida, conceito, distinção ou pergunta de recuperação ativa — até o limite vigente; não duplicar transcrições legais ou resumos extensos.
3. Reutilizar a lista `forNotebook` e sua identidade `pc-*`. Para origem de estudo sem dispositivo legal, projetar **adaptação mínima e validada** do contrato: origem distinta e comprovada (`estudo_integrado` ou equivalente bem definido), identificador estável de sessão e `topic` apenas quando o módulo expuser ID curricular validado. Campos normativos não aplicáveis devem ser explicitamente `null`, jamais fabricar artigo ou dispositivo.
4. Preservar os registros `origin:'leitor'` byte a byte, seus IDs, estados, notas e data. Expandir o validador `backup-local-s20.js` de forma retrospectivamente compatível; revisar também as invariantes da lista já usada por `revisao-inteligente.js` sem ampliar a semântica de revisão além do ID comprovado.
5. Na lista única “Para meu caderno”, permitir consultar e alterar estados de marcações de estudo. Para marcações sem origem normativa, abrir a sessão apenas **se** o identificador existir e a retomada for segura; caso contrário, exibir a referência textual, sem redirecionamento fictício.
6. Não modificar a regra LEG-08: somente registros pendentes com ID curricular exatamente igual ao cartão **já vencido** são recuperados durante essa revisão. Uma marcação sem tema comprovado continua recuperável **manualmente** na lista, sem agendamento.
7. Falha de quota, importação ou validação deve preservar todos os dados anteriores; nenhuma gravação parcial ou duplicação.

Se o Estudo Integrado não oferecer identidade estável suficiente para criar uma referência segura, **não invente uma**. Registre a limitação técnica e proponha a menor adaptação dentro da LEG-09. Não expandir para questões ou aulas independentes nesta sprint.

### 4. Limites negativos

- Não implementar marcação contextual em questões oficiais, aulas externas, flashcards avulsos ou planejamento; isso exigiria nova decisão e sprint própria.
- Não importar norma, alterar texto, questão, gabarito, cronograma, dias, estágios, ponderação de revisão, prioridades ou geração de tarefas.
- Não criar conta, backend, autenticação, Supabase, banco, sincronização, segundo caderno digital ou rotina de digitalização manuscrita.
- Não transformar associação temática aproximada em `topic` confirmado; L4717 e LINDB continuam sem vínculos granulares artificiais.
- Não sobrescrever baselines LEG01–08; alterações aditivas de leitor/backup/revisão exigem **novo fixture de delta**, testes retrospectivos e justificativa.
- Não acessar perfil ou backup pessoal do usuário; usar somente contextos sintéticos e isolados.

### 5. Fontes de código e validações a consultar

- `estudo-integrado.js`: `AGUStudy.active`, estágios, persistência e recuperação de sessão.
- `leitor-juridico.js`: `forNotebook`, lista, IDs, estado, ação manual e referência normativa.
- `backup-local-s20.js`: validação, contrato das nove categorias, quota e restauração de categorias ausentes.
- `revisao-inteligente.js`: recuperação de pendências já programadas e retorno à origem.
- `caderno-contextual.js`, `planejamento-semanal.js`, `meu-estudo.js`: APIs preservadas, sem agenda paralela.
- `dados/legislacao-s13.js`, `lib/catalogo-legislativo.js`: somente leitura.
- `tests/leg07-*`, `tests/leg08-*`, `tests/fixtures/leg07-deltas.json`, `tests/fixtures/leg08-preservacao.json`, fixtures LEG01–06 e demais suítes S19/S20/S25–27/S29–35/WORK01.
- `.github/workflows/agu-sprint20-ci.yml`, `tests/sprint21-pages.cjs` e testes de publicação em `AGU_TEST_URL`.

### 6. Critérios de aceite verificáveis

Em perfis novos sintéticos de Chromium nas larguras 320/360/390/430/1280 CSS px, e em Node:

1. Iniciar uma sessão **realmente válida** do Estudo Integrado com tema comprovado e gerar uma marcação breve por clique.
2. Confirmar ID único `pc-*`, data consistente, origem identificável, tópico apenas comprovado, texto e estado `pendente` recuperáveis após home/reload.
3. Encontrar a nova marcação na **mesma** lista do leitor, sem substituir marcações prévias originadas de L9784/L4717 e sem duplicar caderno digital.
4. Alterar manualmente para `anotado`, `dispensado`, de volta a `pendente`; encerrar estudo/revisão sem clicar e confirmar que nada mudou no estado da marcação.
5. Se o tema corresponder exatamente a revisão de cartão vencido, verificar recuperação; se não houver vencimento ou `topic:null`, não injetar pendência na revisão.
6. Exercitar sessões inválidas, referência extinta, tópicos inconsistentes, IDs repetidos, 300/301 registros, 450/451 caracteres, quota e dados legados.
7. Exportar backup S20, restaurar em perfil vazio e repetir importação: dados idênticos, nenhuma duplicação, nenhuma categoria presente substituída. Preservar 500 comentários e 12 MB.
8. Verificar Enter/Espaço, foco, mobile e retorno seguro; axe com `violations`, `incomplete` e `passed` distintos; revelar elementos encobertos antes de concluir inconclusivos.
9. Executar **todas** as regressões Node e Chromium anteriores e verificar o site publicado em HTTPS, oito scripts e SHA-256 exatos. Não afirmar Android físico/TalkBack sem teste real.

### 7. GitHub e fechamento

Criar branch e PR próprias depois de conferir `main` e trabalhos concorrentes. Manter PR em rascunho até CI aprovada; não forçar push nem contornar proteções. Integrar só após ausência de conflitos e validação; verificar Pages, fluxos em URL pública, hashes e artefatos visuais. Fechar com base/branch/commits/PR/merge, decisões de modelo e armazenamento, Node/Chromium/axe, limites reais e pendências. Gerar `docs/LEG-09_*.md` e `docs/PROMPT_LEG-10.md` completos e autossuficientes. **Não executar LEG-10.**

### Princípio pedagógico permanente

O caderno **físico** permanece o espaço principal de síntese. A plataforma oferece recuperação ativa e marcações selecionadas pelo aluno, sem substituí-lo, sem transcrição automática e sem criar mais um cronograma.
