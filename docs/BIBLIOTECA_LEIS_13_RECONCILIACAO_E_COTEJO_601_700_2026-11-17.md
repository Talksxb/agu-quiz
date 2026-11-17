# AGU Quiz | Biblioteca de legislação — etapa 13

## Delimitação e resultado

Etapa documental autorizada em 17/11/2026. Reconciliadas, com fontes primárias, **ADI 5.492 e ADI 5.534** no contexto do art. 535 do CPC e **Lei 15.479/2026** no CPC arts. 196/529-A. Realizada primeira comparação dos **arts. 601–700 do CC e do CPC**, incluindo sufixos próprios: **201 IDs espelhados**, **196 textos normalizados idênticos**, **5 diferenças**, **zero ausências**. Inclui **`L13105:art699-A`** como identidade independente. Não houve patch do corpus nem certificação jurídica.

### Retomada e concorrência

`main` histórica reconfirmada em `31a47693b8f690e543f565c83208e3cdc637a547`, sem evidência de integração da cadeia Biblioteca. PRs #49–#53, #55, #56, #58, #59 e **#60** abertas; #60, criada em draft, permaneceu **open**, **merged=false**, head `5010d2bf8ef3133ff9f1c14e1d8a9d7056ff2ea7`, base `audit/biblioteca-leis-11-reconciliacao-401-500`, mergeable na consulta. Esta etapa é empilhada sobre #60; outras frentes do Quiz não foram alteradas. CI e Pages pós-merge não são pressupostos: produto/main sem alteração neste lote.

## Núcleo jurídico 1 — CPC 535, § 3º, II: ADIs distintas

Fontes **STF**, primárias: [processo e dispositivo da ADI 5.492](https://portal.stf.jus.br/processos/detalhe.asp?incidente=4959031), [Informativo STF 1092](https://www.stf.jus.br/arquivo/informativo/documento/informativo1092.htm), [notícia STF de 04/05/2023](https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=506742&ori=1); [processo da ADI 5.534](https://portal.stf.jus.br/processos/detalhe.asp?incidente=4989940) e [notícia STF sobre o julgamento em 2020](https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=457881&ori=1). As páginas de tramitação e o dispositivo publicado do STF são a base para o **alcance decisório**; não se afirma conferência linha a linha de todos os votos do inteiro teor.

| Julgado | Controvérsia, resultado e limite documental |
| --- | --- |
| **ADI 5.492**, rel. Min. Dias Toffoli, Tribunal Pleno, julgamento em **25/04/2023**, acórdão divulgado em **08/08/2023** e publicado no **DJe de 09/08/2023** | O STF declarou inconstitucional **somente a expressão “de banco oficial”** do CPC **art. 535, § 3º, II** e conferiu interpretação conforme: a agência de depósito de RPV pode pertencer a instituição financeira **pública ou privada**. O acórdão também tratou de outros dispositivos do CPC, especialmente art. 840, I. **Não** declarou inconstitucional todo o art. 535, nem aboliu o prazo de dois meses. A Câmara exibe anotação com DOU de 04/05/2023, relacionada à divulgação da decisão; distinguir essa informação da publicação do inteiro acórdão no DJe em agosto. |
| **ADI 5.534**, julgamento colegiado concluído em **18/12/2020**, relatoria indicada no processo STF | Controvérsia distinta: prazo de **dois meses** para RPV e regime da **parte incontroversa**. O STF manteve a constitucionalidade do art. 535, § 3º, II quanto à matéria impugnada e deu interpretação conforme ao **§ 4º** para considerar o valor **total da condenação** na determinação do regime de pagamento da parte incontroversa. Não há contradição necessária com a ADI 5.492: os objetos normativos julgados são diferentes. |

O **texto histórico promulgado** do CPC ainda contém a expressão “de banco oficial”; a decisão vinculante altera sua **aplicabilidade constitucional**, sem autorizar substituir o teor literal da fonte consolidada por paráfrase jurisprudencial. O espelho do Quiz registra remissões genéricas às ADIs, mas não fornece esses escopos explicativos. Recomenda-se, mediante futura tarefa específica de produto, uma **nota jurídica distinta do texto literal**, com tribunal, ação, data, dispositivo afetado e fonte. Esta etapa não elimina frases nem modifica IDs.

## Núcleo jurídico 2 — Lei 15.479/2026: efeitos futuros

Fonte primária: [Lei 15.479/2026 — publicação original da Câmara](https://www2.camara.leg.br/legin/fed/lei/2026/lei-15479-29-julho-2026-799680-publicacaooriginal-180630-pl.html), publicada no **DOU de 30/07/2026**, confirmado também pelo [Senado](https://legis.senado.leg.br/norma/43611689). O **art. 4º** determina entrada em vigor **após decorrido um ano** da publicação oficial — portanto **posterior a 04/11/2026**, corte documental obrigatório.

- **CPC art. 529-A:** novo dispositivo material sobre transferência automática de prestação alimentícia, com incisos e parágrafo único, mas **ainda não vigente** em 04/11/2026. A indicação `Art. 529-A. (Vide Lei nº 15.479, de 29/7/2026)` na página consolidada é um **marcador prospectivo**, não uma lacuna ativa do corpus a suprir.
- **CPC art. 196:** a lei acrescenta parágrafo único sobre atos processuais eletrônicos, LGPD, coleta e compartilhamento de dados. Também **não vigente** no corte. A anotação prospectiva não altera o texto aplicável em 04/11/2026.
- A mesma lei alcança o **art. 913** do CPC: registrar para controle de passagem futura, sem antecipar seu cotejo ou criar norma vigente.

Preservar o texto original da lei para futura atualização após eficácia, com verificação temporal independente. **Não** inserir o art. 529-A no espelho nem atribuir certificação à remissão.

## Proveniência e comparação 601–700

Comparador reexecutável: `scripts/cotejar-biblioteca-lote04.py`, função `run('/tmp/agu-bib04/cc08.html', '/tmp/agu-bib04/cpc08.html', 601, 700)`. Mesmas capturas oficiais HTTP 200 de 17/11/2026, conteúdo integral SHA-256 bruto:

| Documento | HTTP Date GMT | Bytes | SHA-256 |
| --- | --- | ---: | --- |
| [CC — Câmara, texto consolidado](https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html) | `Tue, 17 Nov 2026 14:43:45 GMT` | 1.571.920 | `6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90` |
| [CPC — Câmara, texto consolidado](https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html) | `Tue, 17 Nov 2026 14:43:51 GMT` | 938.199 | `0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821` |
| [Lei 15.479/2026 — Câmara, publicação original](https://www2.camara.leg.br/legin/fed/lei/2026/lei-15479-29-julho-2026-799680-publicacaooriginal-180630-pl.html) | `Tue, 17 Nov 2026 14:54:41 GMT` | arquivo local capturado anteriormente | `db8e4f0cf7b8428fa6ee2b6ec523759cd42a0b95a898d80daeb09f2b4739324f` |

O comparador computa IDs, presenças e hashes normalizados; **igualdade textual não assegura vigência, constitucionalidade ou certificação**. Manifesto oficial do sufixo `CPC699-A`: `8f3e12871aeac43b95c4dd10cb0be41db584045df53bdf2b2ff820123e2b4b02`.

### Matriz de cinco diferenças

| ID | Resultado de inspeção e classificação |
| --- | --- |
| `L10406:art693` | Corpo do artigo coincide; nota da Lei 14.690/2023 é abreviada no espelho, enquanto Câmara documenta DOU de 03/10/2023 e produção de efeitos 180 dias depois. **Editorial-temporal**. |
| `L10406:art698` | Caput e parágrafo único correspondem; a nota sobre inclusão do parágrafo único pela Lei 14.690/2023 e sua vacatio de 180 dias está reduzida no espelho. **Editorial-temporal**. |
| `L13105:art627` | **Erro de pontuação literal**: espelho omite o ponto e vírgula após `II - reclamar contra a nomeação de inventariante` antes do inciso III, presente na Câmara. **Revisão editorial pontual necessária**, não altera estrutura por inferência. |
| `L13105:art698` | Texto normativo coincide; nota do parágrafo único pela Lei 13.894/2019 mais breve no espelho que na Câmara (29/10/2019). **Editorial-histórica**. |
| `L13105:art699-A` | **Sufixo próprio presente nos dois lados**; espelho traz `Art. 699-A` sem ponto final após a letra e referência abreviada à Lei 14.713/2023; Câmara tem `Art. 699-A.` e data de 30/10/2023. **Tipografia/proveniência**, preservar identidade separada do art. 699. |

**Fila A:** 196 coincidências textuais, ainda sem certificação. **Fila B:** cinco diferenças com ação editorial condicionada a patch próprio e teste, incluindo duas notas temporais. **Fila C:** risco jurídico do CPC535 resolvido **documentalmente**, mas permanece pendente anotação de produto; CPC529-A/196 continuam em **quarentena prospectiva** até vigência efetiva. Nenhuma ausente no lote 601–700.

## Progresso e preservação

- Acumulado de primeira passagem textual CC/CPC **1.405 IDs espelhados** = **1.327 coincidências normalizadas** + **78 divergências**. Cobertura aritmética: **1.405/3.156 ≈ 44,52%** dos artigos originalmente importados; **1.751** ainda não cotejados. Contam-se separadamente **dois marcadores oficiais adicionais fora do espelho**: CC69-A vetado e CPC529-A ainda futuro. Nenhum desses percentuais equivale à certificação jurídica.
- Preservados oito diplomas, `topic:null`, estados `pending`/`partial`/`mirror_unverified`, notas, tags, IDs e sufixos, uma norma por vez, `forNotebook`, nove categorias S20, baralhos, backups e dados do estudante. Nenhuma alteração de produto, nenhum acesso ou exportação da auditoria privada.
- Testes locais e PR registradas no fechamento. Chromium em cinco larguras, axe (`violations`/`incomplete`/`passed`), TalkBack, backup mutável, CI de produto e Pages após merge **não aplicáveis** nesta etapa documental, sem alegação de execução.

Próximo handoff: `docs/PROMPT_BIBLIOTECA_LEIS_14.md`, **não executado**.
