# AGU Quiz | Biblioteca de legislação — etapa 06
## Cotejo oficial CC/CPC, arts. 21º–40º — corte de observação 16/11/2026 (Brasília)

**Resultado:** 40 artigos confrontados com os HTMLs atualizados da Câmara, 39 representações coincidentes após normalização conservadora e uma diferença aparente de nota editorial (CC art. 21). **Não foi demonstrada divergência material no texto normativo desse lote.** A ausência de diferença detectada não certifica vigência, integralidade do diploma, validez de todas as alterações ou classificação curricular.

### Continuidade verificada

- `main` no início: `31a47693b8f690e543f565c83208e3cdc637a547`. PRs #49, #50 e #51 abertas em rascunho, nenhuma mesclada. A etapa 06 é proposta como PR independente **empilhada sobre a branch da #51**, porque depende de seu extrator e testes. Não houve merge, rebase, force push ou alteração das branches anteriores.
- Relatórios 04/05 e scripts lidos. Regresso com os novos bytes: lote 04 **8/10 exatos, 2 diferenças** (CC 3–4); lote 05 **27/30 exatos, 3 diferenças editoriais aparentes** (CC 10/20; CPC 12). A classificação histórica não foi promovida.

### Evidência de fonte primária

Captura direta HTTP/2 200, sem autenticação, com `curl -fsSL -D`, em 17/11/2026 UTC (ainda 16/11 em Brasília). Os dois documentos apresentam `content-type: text/html; charset=UTF-8`. Nenhum CAPTCHA do Planalto foi contornado.

| Norma e endereço oficial | Date HTTP/2 | Bytes | SHA-256 do HTML bruto |
| --- | --- | ---: | --- |
| [Código Civil, Lei 10.406/2002 — Câmara](https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html) | `Tue, 17 Nov 2026 02:52:00 GMT` | 1.571.920 | `6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90` |
| [CPC, Lei 13.105/2015 — Câmara](https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html) | `Tue, 17 Nov 2026 02:52:06 GMT` | 938.199 | `0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821` |

Os hashes são iguais aos capturados nas etapas 04/05. Isso comprova identidade dos downloads nesses instantes, não que a fonte tenha sido atualizada até o último ato vigente. Os HTMLs foram mantidos somente em `/tmp/agu-bib04/`, não republicados em repositório por ausência de comprovação específica de licença de redistribuição.

### Correção controlada de classificação

Na primeira extração, **33/40** artigos coincidiam; seis falsos positivos provinham de subtítulos estruturais da fonte da Câmara (por exemplo, `Seção II` e `Da Sucessão Provisória`) indevidamente anexados ao dispositivo precedente. O parser agora reconhece parágrafos centralizados por `align="center"`/`text-align: center` e os exclui da transcrição normativa; também mantém o filtro existente para cabeçalhos. Novo teste sintético garante que o título seja removido mas parágrafos e incisos normativos continuem presentes. Resultado após correção: **39/40** iguais e **1/40** diferente por referência editorial.

Essa correção altera **somente o script de cotejo offline**. Não altera a transcrição publicada no AGU Quiz nem seus IDs ou arquivos de dados. A função `classify_difference` continua identificando diferença em parênteses com indicativos editoriais, sem eliminar parênteses normativos; seu resultado permanece hipótese a revisar, não equivalência certificada.

### Matriz individual consolidada deste lote

| Diploma | Artigos com representação textualmente idêntica após normalização | Pendência |
| --- | --- | --- |
| CC | **22–40** (19 artigos) | **21**, referência à ADI 4.815 |
| CPC | **21–40** (20 artigos) | Nenhuma divergência textual detectada |

**CC art. 21:** o espelho inclui referência abreviada à ADI 4.815; a Câmara a descreve como `ADI 4.815/2012`, incluindo publicação no DOU em 26/06/2015. O comando principal do art. 21 coincide em ambas as fontes. O significado jurídico da decisão, seus limites e efeitos não foram revalidados contra o acórdão nesta etapa. Classificação: `diferenca_aparente_restrita_a_nota_editorial_revisar`.

O lote anterior já apontara nota semelhante no art. 20. A repetição do marcador não é duas decisões distintas e não autoriza concluir automaticamente os efeitos da ADI para ambos os artigos.

### Publicação, vigência e produção de efeitos

**Corte de observação:** 16/11/2026 no horário de Brasília. A expressão “texto atualizado” e os hashes são evidências de versão da página consultada. Não houve inventário completo das leis modificadoras dos arts. 21–40 nem análise autônoma dos seus dispositivos transitórios. Para a única nota jurídica nova — ADI 4.815 — a data de publicação foi transcrita da referência editorial da Câmara; os efeitos da decisão permaneceram pendentes de leitura da decisão oficial. Não se afirma vigência global dos códigos até o corte.

### Testes e invariantes

- **4 testes Python sintéticos aprovados**, incluindo novo caso de títulos centralizados em caixa mista. **36 suítes Node históricas aprovadas**. Regresso completo dos 40 artigos anteriores executado com as mesmas duas capturas oficiais; novo lote 21–40 totalizou 40 artigos presentes.
- Inalterados `dados/codigos-cc-cpc.js`, `dados/legislacao-s13.js`, `leitor-juridico.js`, `index.html`, IDs, tags, uma norma aberta por vez, `topic:null`, `forNotebook`, backup S20 (nove categorias), revisão, baralhos e cronograma. CC/CPC continuam `mirror_unverified`, `contentCoverage:'partial'` e `textVerification.status:'pending'`.
- Não foi executado Chromium/axe, teste com Android real, backup mutável ou comparação Pages pós-merge, pois **não houve patch de produto e não houve merge**. Sem alegações artificiais de certificação WCAG, implantação ou certificação curricular.

### Cobertura acumulada descritiva

Etapas 04–06: **80 artigos distintos confrontados**, sendo 74 com texto normalizado idêntico e seis com diferenças registradas (CC 3, 4, 10, 20, 21; CPC 12). Restam **3.076** dos 3.156 artigos importados de CC/CPC sem cotejo neste fluxo. Este indicador descreve apenas trabalho de comparação textual, não percentual de certificação jurídica.

### Continuidade

Preparar um lote 07 com CC/CPC arts. 41–60, exame de fontes normativas e decisões oficiais quando houver remissões, além de prova adversarial para títulos estruturais não centralizados e notas fora de parênteses. Só corrigir corpus em presença de divergência material comprovada e teste que falhe. **Não executar etapa 07 neste lote.**
