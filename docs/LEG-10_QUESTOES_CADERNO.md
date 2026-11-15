# AGU Quiz — LEG-10 | “Para meu caderno” em questões oficiais verificadas

Data: 15/11/2026. Escopo **exclusivo**: registro seletivo de perguntas breves pelo estudante ao consultar uma questão oficial já publicada e documentalmente verificada no AGU Quiz. Nenhuma questão, gabarito, prova, aula, lei, cronograma ou revisão foi criada ou modificada. LEG-11 **não foi executada**.

## Proveniência e escolha conservadora

O módulo público `questoes-leitor-s18.js` já exibia quatro questões oficiais da prova de Advogado da União de 2015, com IDs estáveis, provas e gabaritos oficiais e ligação pontual auditada às fontes públicas S18/S19. São as **únicas** que receberam a ação:

| ID público | Item histórico | Tema da marcação | Proveniência pontual |
| --- | --- | --- | --- |
| `of-2015-adv-006` | Q6, chave E | `ADM-17` | `187AGU_001_07`, L9784 art. 50 § 1º |
| `of-2015-adv-007` | Q7, chave C | `ADM-27` | `187AGU_001_07`, CF art. 49 V |
| `of-2015-adv-009` | Q9, chave E | `ADM-27` | `187AGU_001_07`, CF art. 37 X |
| `of-2015-adv-048` | Q48, chave C | **`null`** | `187AGU_001_07`, CF art. 131 caput; código curricular no registro público não é correspondência granular comprovada |

O texto, as alternativas, o gabarito, a fundamentação histórica, a correção de prova e os documentos de auditoria pública foram preservados. Não foi usada a auditoria privada. `AGUQuestions18.notebookEligible(questionId)` exige existência no catálogo público, identidade exata, fonte, localizador, gabarito, status permitido e verificação. A referência histórica imutável `notebookHistoricReference` permite preservar uma marcação mesmo se a questão depois deixar de ser elegível; a interface então exibe a referência textual, **sem link enganoso** ou nova criação para o item retirado.

## Modelo e integração da lista única

`AGULegal.notebookSaveQuestion(questionId,prompt)` faz a gravação atômica na mesma lista `forNotebook` dentro da chave **preexistente** `agu_leitor_juridico_s13_v1`. Exemplo sintético:

```json
{
  "id": "pc-<id-unico>",
  "lawId": null,
  "articleId": null,
  "unitId": null,
  "questionId": "of-2015-adv-006",
  "questionLabel": "AGU 2015 · Q6 · 187AGU_001_07",
  "topic": "ADM-17",
  "origin": "questao_verificada",
  "prompt": "Quando a motivação por remissão é juridicamente suficiente?",
  "createdAt": "<data-ISO-8601>",
  "status": "pendente"
}
```

É um gatilho curto escrito pelo usuário, não transcrição do enunciado ou comentário automático. A ação contextual aparece no painel da questão elegível, sem salvar ao responder, errar, revelar ou concluir. Campos normativos são `null`: a origem imediata é a **questão**, e não se presume que o gatilho trate exatamente do dispositivo associado à prova. `topic` é direto e comprovado quando existe; do contrário, `null`.

O leitor continua exibindo uma **única lista**, com edição, estados manuais `pendente/anotado/dispensado`, retorno à questão somente quando segura e fallback quando retirada. A abertura da questão de origem não registra tentativa ou altera resposta. Registros anteriores de `origin:'leitor'` e `origin:'estudo_integrado'` preservam os próprios bytes e campos; o validador S20 foi ampliado apenas aditivamente para `questao_verificada`. O painel LEG-08 pode mostrar a origem, mas conserva o portão já implementado de cartão **vencido** com `topic===active.code`, sem mudar nenhuma data, etapa ou algoritmo.

Sem chave adicional, migração, backend ou sincronização. Mantidos os **nove formatos** de backup, restauração apenas de categorias ausentes e limites originais: 12 MB UTF-8, 500 comentários, 300 marcações e 450 caracteres por pergunta. Erro de quota ou validação deixa os dados anteriores intactos. Um backup antigo sem `forNotebook` continua válido.

O corpus oficial permanece **6 normas, 292 artigos, 1.176 unidades, 5 integrais**, esquema `agu-legal-reader-v1` e catálogo `agu-legislation-leg01-v1`: CF88 parcial, L9784, LC101, LC73, DL4657 e L4717. Nenhuma fonte, versão, nota editorial ou `topic:null` da LINDB/Ação Popular foi alterado; nenhuma vigência foi certificada nesta entrega.

## Alterações e regressões

Arquivos de aplicação alterados:

- `questoes-leitor-s18.js`: identidade documental, seleção e formulário contextual.
- `leitor-juridico.js`: nova origem, gravação e abertura segura na lista única.
- `backup-local-s20.js`: validação retrospectivamente compatível.
- `revisao-inteligente.js`: apenas rótulo/navegação de origem LEG-08, sem programação.
- `index.html`: atualizar versões de cache somente dos quatro scripts alterados.

Testes e infraestrutura:

- `tests/leg10-validacao.js` e `tests/leg10-browser.cjs`: validação de fonte e contrato, cenários adversariais, jornada mobile/desktop, teclas/foco, restauração e origem.
- `tests/fixtures/leg10-deltas.json`: hashes antes/depois, cadeia LEG09→UX-BARALHOS-01→LEG10, corpus e planejamento intactos. As fixtures LEG01–09 e UX01 **não foram sobrescritas**.
- `tests/sprint21-pages.cjs`: verificação publicada de HTML, scripts da árvore real e CSS da UX01, por SHA-256.
- `.github/workflows/agu-sprint20-ci.yml`: LEG10 em Node, Chromium e `AGU_TEST_URL`; artefatos por globs explícitos.
- Ajustes mínimos de **expectativas históricas de hash**, sem remover regressões, em `tests/{leg03,leg04,leg05,leg06,leg07,leg08,leg09,ux-baralhos-01,work01}-validacao.js`.

As **24 suítes Node** passaram localmente e na [CI da PR #20, execução 43731636481](https://github.com/Talksxb/agu-quiz/actions/runs/43731636481). Chromium real `159.0.8154.6` passou a LEG10 e todas as regressões anteriores nas larguras 320/360/390/430/1280 CSS px. O Chromium local do ambiente gerenciado recusou socket; a prova de navegador é a CI do GitHub, com perfis sintéticos isolados. O teste incluiu registro sem responder, transição manual de status, edição, retorno sem resposta, portão de revisão vencida, novo reload, backup com nove categorias, restauração em perfil vazio e importação repetida ignorada. Nenhum teste em Android físico ou TalkBack foi executado.

**Axe-core 4.14.0** da jornada LEG10: em 390 e 1280, `violations:0`; em 390 houve **um** nó `incomplete` inicial por sobreposição de contraste, em 1280 houve **cinco**; **todos** foram reavaliados após rolagem e passaram `color-contrast`, com `violations:0` e `incomplete:0` nessas reavaliações. A CI preservou também varreduras axe das sprints anteriores, com seus próprios inconclusivos registrados. Capturas 390/1280 inspecionadas, legíveis e sem overflow; artefato sintético `agu-s20-chromium-viewports` ID **14168307793** com `artifacts-leg10/jornada.json`, `axe-{390,1280}.json` e cinco capturas. Os testes não demonstram conformidade absoluta com WCAG em hardware real.

## GitHub, publicação e handoff

Base de implementação: `ac19569af131b4196b25229c6a0318148c18016e` (UX-BARALHOS-01 já integrada; main avançou depois com documentação S44). Branch `leg/leg10-questoes-para-caderno`. Implementação `2434b35f9223b7bbb66ee5e330ea9e8cd0d7ba8a`; correções **somente do roteiro de teste** `4956ee27014c3b4ee561e4698c1f76744e9ecb90` e `285ee0d04024abddd51a363ce51fb279c5c6dcb0`. [PR #20](https://github.com/Talksxb/agu-quiz/pull/20) aprovada e integrada em `e324734088d6fdfbfa99c7159bcfcffcfa5ef713`, sem force push. O primeiro teste remoto falhou por variável de teste fora do contexto do navegador; o segundo por rótulo de botão de flashcard usado indevidamente para questão oficial. Ambos foram corrigidos **exclusivamente no teste** e a CI final passou.

**Produção confirmada:** [GitHub Pages, execução 43732032180](https://github.com/Talksxb/agu-quiz/actions/runs/43732032180) aprovada. Em `https://talksxb.github.io/agu-quiz/`, o teste `tests/sprint21-pages.cjs` retornou HTTP 200 para HTML, **nove scripts** da árvore real após UX01, CSS da biblioteca e módulo de questões, todos com SHA-256 idêntico ao código mesclado. SHA-256: `index.html` `534474118576b91ac6e21ec43ead2138b4e4f7feb751fc006d38b0198929aca0`; `questoes-leitor-s18.js` `f4095116ca5bf0b31bd76ca323a88a7b8a1e0b079d100da9981d1f8f6d943c3f`; `leitor-juridico.js` `74af85f5eb6160ecd5e07b00beb2043a882de288e87f6615d6c8b32deb6e86d3`; `backup-local-s20.js` `e2c0e6af69dd8c9c7bc8a35c511a2960a339e8935a51c2fb9be98725893c633e`; `revisao-inteligente.js` `f65f6ece47eaaf70d9ee46e0b3304358e260d81f94e40569669ff0fe196c826d`. Corpus `dados/legislacao-s13.js` `c038fc9416d1b441aa710bb970eb8428a92008f197ca367ea09df53f6c45f51a`, idêntico à predecessora.

[CI da main, execução 43732032889](https://github.com/Talksxb/agu-quiz/actions/runs/43732032889): **três jobs aprovados** — 24 suítes Node, Chromium completo e `pages-publicado`. Este último executou `LEG10_BROWSER_OK` na própria URL HTTPS, além das regressões LEG09–03, WORK01 e demais verificações publicadas, nas cinco larguras. Artefato `agu-work01-publicado` **14168767960** e `agu-s20-chromium-viewports` **14168857574**. Nenhum bloqueio conhecido em desktop ou emulação de toque; não houve Android físico/TalkBack.

**Handoff:** `docs/PROMPT_LEG-11.md`, prompt completo para próxima execução, **não executada**. O fechamento documental não modifica o código já publicado.
