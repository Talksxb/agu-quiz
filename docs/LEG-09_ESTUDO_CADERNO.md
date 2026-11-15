# AGU Quiz — LEG-09 | “Para meu caderno” no Estudo Integrado

Data: 15/11/2026. **Escopo exclusivo:** permitir que o estudante marque uma pergunta curta, por ação explícita, durante uma sessão válida do Estudo Integrado. Não há um segundo caderno, agenda, mudança de conteúdo normativo, revisão, questões ou planejamento.

## Contrato e identidade de origem

`AGUStudy.active()` já fornece uma sessão com ID persistente `ags-*`, `deviceId` vinculado a unidade real da legislação, `topic` igual ao tema documentado no respectivo artigo, `stage` e `status`. A LEG-09 **não cria IDs curriculares nem sessões fictícias**. A marcação usa a mesma lista opcional `forNotebook` da chave `agu_leitor_juridico_s13_v1` da LEG-07, com ID `pc-*`, limite de 300 registros e 450 caracteres por pergunta.

O contrato novo — exclusivo de marcações originadas do estudo — é:

```json
{
  "id": "pc-<id-unico>",
  "lawId": null,
  "articleId": null,
  "unitId": null,
  "deviceId": "L9784:art12:caput",
  "sessionId": "ags-<id-da-sessao-ja-existente>",
  "topic": "ADM-06",
  "origin": "estudo_integrado",
  "prompt": "Quando a avocação é juridicamente possível?",
  "createdAt": "<data-ISO-8601>",
  "status": "pendente"
}
```

O modelo é ilustrativo, não dado de usuário. Os campos normativos são `null` porque a origem da marcação é **a sessão**, não uma afirmação de que a pergunta versa precisamente sobre o dispositivo. O `deviceId` rastreia a proveniência curricular **já comprovada** da sessão. O validador confronta `topic` com o artigo da unidade existente no corpus oficial; IDs de sessão têm sintaxe rígida, mas o **backup não exige** que a categoria de sessões já tenha sido restaurada antes da categoria do leitor. A ausência posterior da sessão não apaga nem invalida a marcação: ela continua legível, sem botão de navegação enganoso.

Registros LEG-07 `origin:'leitor'` permanecem aceitos e inalterados; nenhum deles recebe `sessionId` ou campos novos. `AGULegal.notebookSaveStudy` usa `AGUStudy.active()`, só grava após validação integral e salva a categoria inteira de modo atômico; quota recusada não muda referência em memória. `AGUStudy.saveNotebook` usa apenas estado efêmero do formulário `<details>` na sessão existente. Nenhuma marcação altera `stage`, `status` da sessão, `cardsSeen`, tentativas ou calendário.

## Navegação, revisão e persistência

- Na aba Estudo Integrado, a sessão **em andamento** oferece o campo opcional “Para meu caderno”. Enter/Espaço e foco são preservados no estado de confirmação.
- Na aba já existente do leitor “Para meu caderno”, a mesma lista exibe origem e identificador da sessão, edição e estados manuais `pendente`, `anotado`, `dispensado`.
- “Retomar sessão de origem” só aparece se a sessão identificada **existe, permanece em andamento e corresponde ao dispositivo e tema**. Se concluída, removida ou ainda não restaurada, a referência fica consultável e o botão não é oferecido.
- A LEG-08 continua recuperando apenas pendências de `topic===active.code` em cartão com `due` anterior ou igual a hoje. A única adaptação foi renderizar a origem de estudo e sua retomada segura; nenhuma mudança em `scheduledTopic`, datas, quantidade ou algoritmo.
- O backup S20 mantém **nove** categorias, 12 MB UTF-8 e restauração apenas das categorias ausentes. Os limites anteriores de 500 comentários/300 marcações/450 caracteres não mudaram. Arquivos antigos sem `forNotebook` seguem válidos.

Corpus preservado: seis normas, 292 artigos, 1.176 unidades, cinco textos integrais; CF88 parcial, L9784, LC101, LC73, DL4657 e L4717. Texto, fontes, versão e ressalvas jurídicos não sofreram alterações. `L4717` e `DL4657` não ganharam associações curriculares inferidas. Planejamento semanal e `caderno-contextual.js` não foram alterados.

`tests/fixtures/leg09-deltas.json` rastreia os hashes antes/depois de `estudo-integrado.js`, `leitor-juridico.js`, `backup-local-s20.js`, `revisao-inteligente.js` e `index.html`; preserva a cadeia histórica LEG05→LEG07→LEG08 e hashes integrais de planejamento e corpus, sem sobrescrever baselines anteriores.

## Validação, commits e produção

- Teste Node novo `tests/leg09-validacao.js`: origem comprovada, sessão válida, `topic:null` excluído, edição e estados manuais, origem indisponível, LEG08 com correspondência exata e vencimento real, limites 300/301 e 450/451, quota, adversários e backup idempotente. As **22 suítes Node** anteriores+LEG09 foram aprovadas localmente.
- Teste real `tests/leg09-browser.cjs`: perfis sintéticos novos em 320/360/390/430/1280 CSS px, toque emulado, teclado, foco, sessão válida, mesmo `forNotebook`, revisão temática, reload e backup. Axe-core em 390/1280 separa `violations`, `incomplete`, `passed` e reavalia sobreposições. Os demais testes de Sprints, WORK01 e LEG01–08 continuam no workflow. Android físico/TalkBack não foram ensaiados.
- Chromium local: binário disponível, mas o ambiente gerenciado recusou socket (`Operation not permitted`); testes reais do navegador são executados no GitHub Actions. Não confundir teste Node local, CI de PR e publicação.

**GitHub/CI:** base `d8e37d4de26e6fd2fdc375bba89d598f3feb2d70`, branch `leg/leg09-estudo-para-caderno`, implementação `94b1e4467f5aa81c9891fb2c8ffc1af3d92f5998`, ajuste **somente de teste mobile** `f4891cf518d443a144ffe1731feeea856e04d919` (HEAD da PR), [PR #17](https://github.com/Talksxb/agu-quiz/pull/17) incorporada em `bdefbf116a1e872c2a0378b49f2482db666a10e6`. A primeira CI `43726432300` falhou porque o teste novo tentou abrir a aba Estudo Integrado sem revelar antes o painel “Relacionados” no layout mobile; correção apenas no teste. [CI da PR `43726668867`](https://github.com/Talksxb/agu-quiz/actions/runs/43726668867) aprovada: 22 suítes Node e todas as regressões Chromium, cinco larguras.

**Acessibilidade Chromium:** versão `159.0.8154.6`, axe-core `4.14.0`. Em 390 px, **zero violações**, um inconclusivo inicial de contraste por sobreposição (`.secondary-more > summary`), aprovado após rolagem. Em 1280 px, **zero violações**, quatro nós inconclusivos de contraste (incluindo o resumo do novo painel), todos aprovados após rolagem e reavaliação (`violations:0`, `incomplete:0`, `passed:['color-contrast']` para cada). A auditoria axe detalhada ocorreu apenas em 390 e 1280; os cinco viewports passaram no percurso funcional. Evidências sintéticas na CI `14167365189`: `artifacts-leg09/jornada.json`, `axe-390.json`, `axe-1280.json` e capturas. Não houve Android físico/TalkBack ou acesso a perfil pessoal.

**Produção:** [deploy Pages `43727075022`](https://github.com/Talksxb/agu-quiz/actions/runs/43727075022) aprovado. `https://talksxb.github.io/agu-quiz/` retornou HTTP 200 e `tests/sprint21-pages.cjs` confirmou HTML e oito scripts por SHA-256: `index.html` `47c7c6195c6ffdfeaa63fbc5d65b82b6ba96cb0f9733609ffe0118d68fd08cfe`; `estudo-integrado.js` `82fafd24b164c5d5f4a9fc37ad2bcad90c81d1755bdb9b53ea853f23fd724fc9`; `leitor-juridico.js` `b6482d6087d03e55d7406beb18c1a2fc5c58f1cd2ce0541f4605d41276d32a83`; `backup-local-s20.js` `f3269fa682337fc314b3b78d7367afd2e95be586714dabdd0f56b3be1057785b`; `revisao-inteligente.js` `566217a961278d79c06d6005603646ff2b5a3d73ce9cdf885578e27455816f5a`. O corpus continua SHA `c038fc9416d1b441aa710bb970eb8428a92008f197ca367ea09df53f6c45f51a`. [CI da main `43727075813`](https://github.com/Talksxb/agu-quiz/actions/runs/43727075813) **aprovada nos três jobs**: 22 suítes Node, Chromium com regressões anteriores e `pages-publicado` executando LEG09/08/07/06/05/04/03 e WORK01 na URL HTTPS em cinco larguras; artefato publicado `agu-work01-publicado`, ID `14167196939`. Sem bloqueio conhecido ao uso no navegador testado.

**Handoff:** `docs/PROMPT_LEG-10.md`, gerado sem executar LEG-10.
