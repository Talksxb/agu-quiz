# AGU QUIZ | WORK — LEG-10

## “Para meu caderno” em questões oficiais já verificadas — registro seletivo sem alterar provas

**Execute exclusivamente LEG-10. Não executar LEG-11.** Objetivo: permitir que Tawan marque, por decisão explícita, uma dúvida curta ou distinção para seu **caderno físico** enquanto consulta ou resolve uma questão oficial já incorporada e verificada no AGU Quiz. Reutilizar a **mesma lista** `forNotebook` da LEG-07/08/09; não criar outro caderno, calendário, agendamento, questão, comentário longo, backend ou nova chave. No encerramento, gerar `docs/PROMPT_LEG-11.md` completo e autossuficiente, sem implementar LEG-11.

### 1. Retomada obrigatória e proveniência

- Repositório público: https://github.com/Talksxb/agu-quiz
- Produção: https://talksxb.github.io/agu-quiz/
- Auditoria `Talksxb/agu-auditoria`: estritamente **somente leitura** se indispensável; nunca reproduzir dados privados ou pessoais.
- LEG-07: [PR #13](https://github.com/Talksxb/agu-quiz/pull/13) integrada `fa659e74634d48cf0ec897bfd91c519fff318072`; documentação PR #14, `5385190d6aace2bbc0c2be0877f60c47c47eb04c`.
- LEG-08: [PR #15](https://github.com/Talksxb/agu-quiz/pull/15) integrada `bdb03d4d19847178dbeab73d2faf773d18cbd71d`, documentação PR #16, `d8e37d4de26e6fd2fdc375bba89d598f3feb2d70`. [CI `43675530557`](https://github.com/Talksxb/agu-quiz/actions/runs/43675530557) aprovada nos três jobs.
- LEG-09: branch `leg/leg09-estudo-para-caderno`, base `d8e37d4de26e6fd2fdc375bba89d598f3feb2d70`, implementação `94b1e4467f5aa81c9891fb2c8ffc1af3d92f5998`, correção estritamente de teste mobile `f4891cf518d443a144ffe1731feeea856e04d919`, [PR #17](https://github.com/Talksxb/agu-quiz/pull/17), **merge `bdefbf116a1e872c2a0378b49f2482db666a10e6`**. [CI da PR `43726668867`](https://github.com/Talksxb/agu-quiz/actions/runs/43726668867) aprovada (22 suítes Node e Chromium nas cinco larguras), [Pages `43727075022`](https://github.com/Talksxb/agu-quiz/actions/runs/43727075022) aprovado; [CI da main `43727075813`](https://github.com/Talksxb/agu-quiz/actions/runs/43727075813) **aprovada nos três jobs**, incluindo LEG09 na URL pública. Hashes publicados: HTML `47c7c6195c6ffdfeaa63fbc5d65b82b6ba96cb0f9733609ffe0118d68fd08cfe`, Estudo `82fafd24b164c5d5f4a9fc37ad2bcad90c81d1755bdb9b53ea853f23fd724fc9`, Leitor `b6482d6087d03e55d7406beb18c1a2fc5c58f1cd2ce0541f4605d41276d32a83`, Backup `f3269fa682337fc314b3b78d7367afd2e95be586714dabdd0f56b3be1057785b`. **Reconfirmar `main`, CI, deploy e hashes antes de agir;** estes são identificadores históricos, nunca autorização para sobrescrever trabalho concorrente.
- Antes de agir: confirmar `main`, PRs abertas, branches concorrentes, workflows e Pages; ler `docs/LEG-09_ESTUDO_CADERNO.md`, `docs/LEG-08_REVISAO_CADERNO.md`, `docs/LEG-07_PARA_MEU_CADERNO.md`, `docs/PROMPT_LEG-10.md`, os contratos e fixtures. Não reiniciar Sprints 4/20–42 nem inventários legislativos.

### 2. Estado funcional que não pode regredir

O único leitor jurídico continua `leitor-juridico.js`, com `openLaw(id,restart)`, `article`, `unit`, `tab`, `notebookSave`, `notebookSaveStudy`, `notebookSetStatus`, `notebookOrigin`, `notebookCanOpenOrigin` e `peek`. A lista opcional `forNotebook` pertence à chave **preexistente** `agu_leitor_juridico_s13_v1`, uma das **nove categorias** de backup S20, com IDs independentes `pc-*`, pergunta até 450 caracteres, limite de 300 marcações e estados manuais `pendente|anotado|dispensado`. A restauração global preenche **apenas categorias ausentes**, sem substituir ou mesclar silenciosamente dados já presentes.

Há duas origens admitidas até LEG-09:

1. `origin:'leitor'`: lei/artigo/unidade reais e `topic` documentalmente associado ou `null`, sem inventar vínculos.
2. `origin:'estudo_integrado'`: `sessionId:'ags-*'` e `deviceId` efetivamente existentes em `AGUStudy`, `topic` exatamente igual ao artigo documentalmente vinculado ao dispositivo; `lawId`, `articleId`, `unitId` são **null** nessa origem de sessão. A referência é recuperável manualmente quando a sessão já foi concluída ou não está restaurada; somente sessão existente e `em_andamento` admite retomada. As marcações de leitor continuam inalteradas.

LEG-08 mantém a recuperação **apenas** de marcações `pendente` e `topic===active.code` em cartão de revisão com vencimento **já registrado** (`due<=hoje`). Nenhum item inicia, antecipa ou conclui revisão automaticamente; marcar como anotado só por clique explícito. O planejamento em temas amplos **não** deve ser equiparado a identificadores granulares.

Corpus oficial preservado: `agu-legal-reader-v1` / `agu-legislation-leg01-v1`, seis normas, 292 artigos, 1.176 unidades, cinco integrais: CF88 parcial, L9784, LC101, LC73, DL4657 e L4717 (22/91, `L4717@2026-11-14-camara-d8a1fc60`, `topic:null`). Nenhuma vigência jurídica adicional certificada. Backup 12 MB UTF-8; limite de 500 comentários anteriores; sem nova chave, migração destrutiva, banco, autenticação ou sincronização.

### 3. Escopo exclusivo da LEG-10

1. Identificar a **interface e identidade real** de questão oficial que já tenha texto, gabarito e proveniência verificáveis no código existente (`questoes-oficiais-s18.js`, `AGUQuestions18`, `revisao-inteligente.js` ou módulos efetivamente existentes). Não inventar item, gabarito, fundamentação, revisão ou vínculo granular.
2. Acrescentar uma ação **opcional e contextual** “Para meu caderno” na questão elegível. A pergunta/gatilho é escrita pelo estudante, de até 450 caracteres, sem copiar automaticamente enunciado ou longas fundamentações. Nenhuma captura silenciosa ao responder/errar/acertar.
3. Reutilizar `forNotebook`, IDs `pc-*` e persistência local **atômica** da LEG-07/09. Propor adaptação estritamente necessária do registro com origem distinta, por exemplo `origin:'questao_verificada'`, `questionId` estável já existente e campos de lei/artigo/unidade **null** quando não houver relação documental específica. `topic` só será preenchido se o **registro da questão** comprovar exatamente seu ID curricular; caso contrário, `topic:null` e recuperação **somente manual**.
4. Validar a origem e ID no próprio banco público de questões do app; não aceitar ID, código curricular ou status de verificação arbitrário. Definir comportamento seguro quando questão for removida, despublicada ou deixar de ser elegível: conservar marcação e referência textual, sem redirecionamento inventado.
5. Integrar origem, edição, estados e eventual retorno seguro na **lista única** do leitor, preservando **todos** os campos das marcas anteriores (`leitor` e `estudo_integrado`). Não criar lista paralela em módulo de questões. Retornar à questão somente se rota, identidade e estado permitirem navegação sem alterar respostas.
6. Se uma marcação da questão tiver ID curricular **efetivamente comprovado**, a LEG-08 poderá recuperá-la **somente** ao revisar cartão já vencido com correspondência exata; ajustar apenas a apresentação de origem, sem alterar o algoritmo ou agendamento.
7. Expandir validadores em `backup-local-s20.js` e `leitor-juridico.js` com retrocompatibilidade, quota e limites intocados. Manter backups antigos, nove formatos e restauração de categorias ausentes.

Se **não existir** identidade ou elegibilidade verificável de questão oficial com estabilidade suficiente, registrar essa limitação e restringir a implementação à menor adaptação fundamentada. Não contornar a ausência com textos ou IDs fictícios.

### 4. Proibições obrigatórias

- Não importar lei, criar questão, alterar enunciado, gabarito, fundamento, status de auditoria, nota ou correção histórica de prova.
- Não modificar aulas, Estudo Integrado, cronograma, revisões, prioridade, estágio, espaçamento, calendário ou tarefa.
- Não criar mais um caderno, banco, login, Supabase, autenticação, sincronização, notificações ou armazenamento remoto.
- Não associar `L4717`, `DL4657` ou uma questão a tema por proximidade verbal, cartão autoral ou resumo não comprovado.
- Não alterar a semântica de backup S20, nem sobrescrever fixtures LEG01–09. Mudanças em leitor/backup/revisão exigem **novo fixture de delta** com hashes antes/depois e regressões.
- Não testar em navegador pessoal ou utilizar dados reais; perfis e marcas exclusivamente sintéticos.
- Não implementar LEG-11; somente criar seu prompt no fechamento.

### 5. Arquivos e evidências a conferir

Inspecionar conforme estado real: módulos de questões oficiais e suas fontes de validação; `revisao-inteligente.js`; `leitor-juridico.js`; `backup-local-s20.js`; `estudo-integrado.js`; `caderno-contextual.js`; `planejamento-semanal.js`; `dados/legislacao-s13.js` (somente leitura); `lib/catalogo-legislativo.js`; `tests/leg07-*`, `tests/leg08-*`, `tests/leg09-*`, `tests/fixtures/leg07-deltas.json`, `leg08-preservacao.json`, `leg09-deltas.json`, todas as regressões LEG01–06/S19–35/WORK01; `.github/workflows/agu-sprint20-ci.yml`, `tests/sprint21-pages.cjs`.

### 6. Critérios de aceite

Node e Chromium em perfis **novos sintéticos**, larguras 320/360/390/430/1280 CSS px, com toque emulado e teclado Enter/Espaço:

1. Abrir questão realmente elegível e criar marcação breve por ação explícita, sem responder, agendar ou concluir a questão.
2. Confirmar identidade, origem, ID curricular **somente quando documentado**, texto e estado `pendente` após reload e home; nenhuma cópia em outro módulo.
3. Encontrar e editar na lista única, alternar `anotado`, `dispensado`, `pendente`, com retorno seguro à questão se elegível e fallback legível se indisponível.
4. Preservar byte a byte registros anteriores de leitor/estudo, notas, sessões, respostas, gabaritos e planejamento.
5. Confirmar a regra LEG-08 de vencimento e correspondência exata; `topic:null`, outra disciplina e cartão futuro não recebem a marcação.
6. Rejeitar duplicatas, origem inválida, questão ausente, currículo falso, data/estado adulterados, limite 300/301 e 450/451, quota, backup acima de 12 MB e 501 comentários sem perda de dados.
7. Exportar e restaurar backup de nove categorias em perfil vazio e repetir importação em categoria existente: nenhum dado perdido, duplicado ou sobrescrito.
8. Verificar retorno do foco, acessibilidade, contraste e overflow, com axe separando `violations`, `incomplete`, `passed` e reavaliando itens sobrepostos após rolagem. Não alegar Android físico/TalkBack sem teste.
9. Executar todas as regressões Node/Chromium anteriores e validar URL publicada (`AGU_TEST_URL`), HTTP 200, HTML e oito scripts por SHA-256 exatos.

### 7. GitHub, entrega e encerramento

Criar branch/PR próprias após conferir `main` e trabalho concorrente. PR em rascunho até CI verde, sem force push nem contorno de proteção. Mesclar apenas após testes e ausência de conflitos, conferir deploy e jornada HTTPS na URL pública. Fechar com commits, PR/merge, armazenamento, testes Node/Chromium/axe, inconclusivos, hashes, riscos e URLs efetivos. Gerar `docs/LEG-10_*.md` e **`docs/PROMPT_LEG-11.md`** completos, autossuficientes; **não executar LEG-11**.

**Regra pedagógica:** o AGU Quiz lembra o que o estudante escolheu escrever depois, mas não substitui seu caderno físico nem cria agenda própria.
