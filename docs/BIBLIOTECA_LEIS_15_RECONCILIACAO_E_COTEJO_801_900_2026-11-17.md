# AGU Quiz | Biblioteca de legislação — etapa 15

## Escopo e resultado

Etapa **exclusivamente documental** autorizada em 17/11/2026. Revalidada a revogação agrupada **CC757–802** pela Lei 15.040/2024, investigado o falso positivo do comparador no art. 756, e realizada a primeira comparação CC/CPC **801–900**, inclusive dois artigos do CC com sufixo individual. **202 IDs examinados**: **194 textos normalizados coincidentes**, **6 diferenças textuais** e **2 ausências técnicas** (`CC801–802`) conciliadas documentalmente como revogações expressas. Nenhuma ausência substantiva de norma vigente demonstrada; nenhuma certificação jurídica integral.

### Continuidade

`Talksxb/agu-quiz/main` reconfirmada em `31a47693b8f690e543f565c83208e3cdc637a547`. PRs da Biblioteca #49–#53, #55, #56, #58, #59, #60, #62 e **#63** abertas, sem merge; #63 em draft, base `audit/biblioteca-leis-13-reconciliacao-601-700`, head `1b547dfaa298e40790526b575c25bbcb85aa15a7`, mergeable no momento da consulta. A PR desta etapa é empilhada sobre #63, sem merge, rebase ou force push. Frentes concorrentes #54, #57 e #61 abertas; sem alteração ou acesso à auditoria privada.

## Reconciliação obrigatória — revogação agrupada

Fonte primária: [Lei 15.040/2024 (publicação original, Câmara)](https://www2.camara.leg.br/legin/fed/lei/2024/lei-15040-9-dezembro-2024-796661-publicacaooriginal-173706-pl.html); publicação DOU **10/12/2024**; entrada em vigor **10/12/2025** após um ano, conforme a [ficha oficial do Senado](https://legis.senado.leg.br/norma/39893545). Seu comando revogatório alcança **todos os CC757–802**, além do CC206, § 1º, II, já antes do corte de **04/11/2026**.

- A consolidação da Câmara traz três intervalos após o art. 756: `757 a 777`, `778 a 788`, `789 a 802`, todos expressamente **revogados**. O extrator `official_articles` reconhece artigo individual `Art. N`, mas não `Arts. N a M`, deixando **46 IDs** sem ocorrência oficial individual na captura de 757–802.
- A Biblioteca 14 já havia conferido **44 IDs 757–800**: o espelho contém em cada um a indicação de revogação pela Lei 15.040/2024 e **não** mantém conteúdo normativo como vigente. Nesta etapa foram conferidos **CC801 e CC802**, também com indicação individual de revogação, compatível com o comando legal e a consolidação agrupada.
- O texto oficial extraído para **CC756** incorpora indevidamente três linhas seguintes de revogação, pois não as reconhece como marcadores estruturais de intervalo. Essa é a causa reprodutível do falso positivo anterior; não é alteração do conteúdo normativo do art. 756.
- **Diagnóstico técnico:** sugerir fixture de HTML contendo artigo 756 seguido de `Arts. 757 a 777. (Revogados...)` etc., com teste que (a) encerre o art. 756 antes dessas linhas, (b) gere manifesto separado `range_revoked` para cada ID, (c) preserve IDs e semântica de revogação, (d) mantenha as contagens históricas brutas consultáveis. O patch do comparador não foi feito nesta etapa para não confundir relatório de continuidade com mudança não testada do algoritmo.

Assim, as **46 ausências técnicas de CC757–802** permanecem **em subcategoria própria de revogação agrupada**, jamais somadas a textos literalmente iguais nem tratadas como 46 artigos ativos em falta. Estado documental de revogação confirmado, sem certificação do restante do diploma.

## Fontes oficiais e cotejo 801–900

Comparador conservador `scripts/cotejar-biblioteca-lote04.py`, `run(CC.html, CPC.html, 801, 900)`. Textos oficiais da Câmara recapturados via HTTPS HTTP 200, com **hash bruto idêntico** às etapas anteriores (sem mudança de conteúdo entre as capturas):

| Fonte | Bytes | SHA-256 bruto |
| --- | ---: | --- |
| [CC — Câmara, consolidado](https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html) | 1.571.920 | `6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90` |
| [CPC — Câmara, consolidado](https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html) | 938.199 | `0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821` |

O lote tem **200 IDs numéricos e 2 sufixados do CC**, contabilizados separadamente: `L10406:art819-A` (veto) e `L10406:art853-A` (agente de garantia). Manifesto oficial SHA-256 normalizado: `819-A`: `1c393ed0fb3065d516e078d40df498ce27031fc0bbf59708d20b6e9ec9f5ebe7`; `853-A`: `50457b0ee667c59914b7675edc7add8f0be797da8bdef643370d002dc5c3940e`.

### Matriz de divergências e riscos

| ID | Evidência e classificação |
| --- | --- |
| `L10406:art801` e `:art802` | Comparador: `dispositivo_ausente`, porque Câmara apresenta `789 a 802` em uma linha de **revogação agrupada**. Espelho: marcador individual revogado pela Lei 15.040/2024, sem texto ativo. **Revogação conciliada, não omissão legislativa**. |
| `L10406:art898` | `§ 1º` com espaço no espelho e `§1º` no consolidado. **B — tipografia**, conteúdo aparentemente correspondente. |
| `L10406:art899` | Marcador `§ 1°` versus `§ 1º`; **B — grafia do ordinal**, conteúdo aparentemente correspondente. |
| `L10406:art819-A` | Artigo com sufixo **vetado**, presente em ambos; espelho diz `Art. 819-A (VETADO) (Incluído pela Lei nº 10.931, de 2004)`, Câmara `Art. 819-A. (VETADO na Lei nº 10.931, de 2/8/2004)`. **B — redação de marcador vetado**, não converter em norma ativa. |
| `L10406:art853-A` | Artigo autônomo sobre **agente de garantia**, acrescido pela [Lei 14.711/2023](https://www2.camara.leg.br/legin/fed/lei/2023/lei-14711-30-outubro-2023-794873-publicacaooriginal-169906-pl.html); espelho repete notas de origem nos parágrafos, Câmara concentra anotação editorial. Preservar todos os parágrafos; **B/C — estrutural/editorial a revisar sem simplificação automática**. |
| `L13105:art809` | Espaço indevido no consolidado (`sujeitando- a`) contra hífen sem espaço no espelho (`sujeitando-a`). **B — anomalia tipográfica de fonte**, não presumir falha do espelho. |
| `L13105:art840` | **C — risco jurisprudencial**: Câmara explicita que, na **ADI 5.492**, o STF declarou inconstitucional a expressão **“na falta desses estabelecimentos”** no inciso I e estabeleceu interpretação conforme sobre depósitos judiciais em banco público ou privado, observadas condições constitucionais/licitatórias. Espelho mantém o texto promulgado e apenas `(Vide ADI nº 5492)`. [Dispositivo oficial STF](https://portal.stf.jus.br/processos/detalhe.asp?incidente=4959031) e [Informativo 1092](https://www.stf.jus.br/arquivo/informativo/documento/informativo1092.htm). Não substituir a lei literal pela decisão: futura anotação jurídica rastreável separada. |

**Fila A:** 194 coincidências textuais sem certificação. **Fila B:** CC898/899/819-A/853-A e CPC809 por tipografia/proveniência; **fila C:** CPC840 por significado decisório de controle concentrado, e 2 revogações agrupadas como limitação técnica conciliada. A questão do CPC535/ADI 5.492 permanece resolvida apenas **documentalmente**, não transformada em nota de produto.

## Progresso, integridade e verificação

- Acumulado com primeira passagem: **1.807/3.156 IDs espelhados = 57,26%**. Classes separadas: **1.673 coincidências textuais**, **88 diferenças textuais** e **46 marcadores individuais de revogação agrupada**, classificados por comando legal mas não comparáveis linha a linha; **1.349** IDs ainda não cotejados. Marcadores oficiais adicionais fora do espelho (**CC69-A vetado** e **CPC529-A prospectivo**) permanecem fora do denominador.
- O acumulado anterior (**1.605**, sendo 1.479 iguais, 82 diferenças e 44 revogações agrupadas) não foi reescrito. A fase 15 adiciona 202 identidades (194 + 6 + 2). Não há certificação jurídica integral nem importação automática de normas.
- Preservados os oito diplomas, IDs e sufixos, notas, tags por matéria, `topic:null`, `pending`/`partial`/`mirror_unverified`, uma norma por vez, `forNotebook`, nove categorias S20, baralhos, backups e dados do estudante. Sem acesso à auditoria privada, sem patch de produto/comparador.
- Testes locais efetivamente executados e estado da PR no fechamento. Sem alteração de produto, Chromium cinco larguras, axe (`violations`, `incomplete`, `passed`), TalkBack, backup mutável, CI de produto e Pages pós-merge **não aplicáveis**.

Handoff autossuficiente da etapa 16 em `docs/PROMPT_BIBLIOTECA_LEIS_16.md`, **não executado**.
