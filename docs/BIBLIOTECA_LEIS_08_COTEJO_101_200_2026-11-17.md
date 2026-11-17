# AGU Quiz | Biblioteca de legislação — etapa 08 — CC/CPC 101–200

## Resultado: triagem textual, não certificação jurídica

Em 17/11/2026, compararam-se os arts. **101–200** do Código Civil (Lei 10.406/2002) e do CPC (Lei 13.105/2015) contra as páginas de texto atualizado da Câmara: **200 artigos-base**, todos presentes nas duas fontes. **188** coincidências após normalização restrita de espaços e pontuação adjacente, **12** diferenças; **nenhum artigo com sufixo** identificado dentro do intervalo por união das identidades das duas fontes. O comparador classificou duas diferenças como aparentemente restritas a notas editoriais e dez como diferenças textuais que exigem revisão. A inspeção humana dos trechos divergentes, abaixo, é uma **triagem**, não uma análise completa de vigência, eficácia e cadeia de alterações de cada dispositivo.

Não houve modificação do corpus do Quiz, nem atribuição automática de `verified`, `complete` ou status equivalente. Permanecem as ressalvas `mirror_unverified`, `partial`, `pending`; não houve certificação de conteúdo jurídico.

## Fonte, proveniência e reprodutibilidade

Download direto das páginas HTML oficiais da Câmara, HTTP/2 200, sem contornar bloqueios, com observação em 17/11/2026 (Brasília). As duas respostas reproduzem os **mesmos SHA-256** das etapas anteriores, reforçando a regressão de base, mas não provando inexistência de alterações legislativas posteriores ao corte de 04/11/2026.

| Diploma / fonte | HTTP Date (GMT) | Tamanho bruto | SHA-256 bruto |
| --- | --- | ---: | --- |
| [CC — texto atualizado da Câmara](https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html) | `Tue, 17 Nov 2026 14:43:45 GMT` | 1.571.920 bytes | `6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90` |
| [CPC — texto atualizado da Câmara](https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html) | `Tue, 17 Nov 2026 14:43:51 GMT` | 938.199 bytes | `0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821` |

Os HTMLs brutos são insumos temporários; não foram republicados no repositório. Para repetir, baixar as URLs e confrontar os hashes, depois executar `run(caminho_cc, caminho_cpc, 101, 200)` de `scripts/cotejar-biblioteca-lote04.py`. Cada linha do JSON de saída inclui ID, presença nas duas fontes, classificação, hashes SHA-256 do texto normalizado e excertos. Normalização apenas de entidades HTML, espaços e espaços antes de pontuação: não apaga notas, palavras ou incisos.

## Matriz de exceções por dispositivo

| ID | Natureza observada e hipótese | Fila / ação pendente |
| --- | --- | --- |
| `L10406:art113` | O espelho repete notas “Incluído pela Lei 13.874/2019” nos incisos, enquanto a Câmara as omite em algumas posições e detalha acréscimos nos parágrafos. Trechos normativos comparados aparentemente coincidem. | **Editorial com cadeia legislativa**: conferir posicionamento e efeitos das inclusões antes de reconciliar. |
| `L10406:art186` | Remissão judicial em nota: espelho usa duas menções separadas às ADIs 7055/6792; Câmara usa uma nota agregada. | **Judicial/editorial**: validar julgados e alcance, sem suprimir informação. |
| `L10406:art194` | Ambos indicam revogação pela Lei 11.280/2006, mas a Câmara acrescenta publicação no DOU e vacatio de 90 dias. | **Editorial/temporal**: preservar data de efeitos e não reativar artigo revogado. |
| `L10406:art198` | Espelho escreve `art. 3º`, Câmara `art. 3o`. | **Tipográfica**, ainda demanda conferência da fonte oficial. |
| `L13105:art107` | Difere a nota de inclusão da Lei 13.793/2019: a Câmara especifica parágrafo acrescido e data da lei. | **Editorial/temporal**, rever metadados. |
| `L13105:art112` | Ausência de ponto final no espelho após “prejuízo”, antes do § 2º. | **Pontuação**; não corrigir silenciosamente sem teste de preservação. |
| `L13105:art143` | Espelho traz nota `Vide ADPF 774` após caput; Câmara não a apresenta nesse ponto. | **Remissão judicial**: apurar proveniência e efeito. |
| `L13105:art144` | Espelho refere `Vide ADI 5953`; Câmara registra **declaração de inconstitucionalidade** de inciso pela ADI 5.953 e publicação no DOU de 04/09/2023. | **Prioridade alta — efeito judicial**: conferir dispositivo, decisão, eficácia e consequência para estudo, sem certificar equivalência. |
| `L13105:art153` | Variação de nota sobre redação pela Lei 13.256/2016; Câmara detalha entrada em vigor atrelada ao CPC. | **Editorial/temporal**, sem alteração presumida do caput. |
| `L13105:art171` | Ponto final na Câmara ausente no espelho. | **Pontuação**, baixa prioridade. |
| `L13105:art184` | Ponto final na Câmara ausente no espelho. | **Pontuação**, baixa prioridade. |
| `L13105:art196` | Câmara contém linha separada `Parágrafo único. (Vide Lei nº 15.479, de 29/7/2026)` ausente no espelho. O texto exibido é **remissão editorial com cabeçalho de parágrafo**, não é seguro inferir redação substantiva do dispositivo. | **Prioridade alta — cobertura e vigência**: consultar [Lei 15.479/2026](https://www2.camara.leg.br/legin/fed/lei/2026/lei-15479-29-julho-2026-799680-publicacaooriginal-180630-pl.html), publicação, objeto e efeitos; cotejar outras fontes oficiais. Não inventar texto nem declarar que o espelho já está atualizado. |

**Distribuição:** CC 96/100 idênticos e 4 divergentes; CPC 92/100 idênticos e 8 divergentes. As linhas `L10406:art194` e `L13105:art153` tiveram classificação algorítmica `diferenca_aparente_restrita_a_nota_editorial_revisar`; as outras dez `diferenca_textual_exige_revisao`. A descrição de hipótese editorial não substitui revisão humana integral de dispositivos e histórico.

**Três filas operacionais:** (A) 188 textos normalizados idênticos, *sem certificado de validade*; (B) diferenças predominantemente editoriais/forma, com revisão de proveniência (`CC113/186/194/198`, `CPC107/112/143/153/171/184`); (C) itens com risco de efeito judicial ou atualização de cobertura (`CPC144/196`) — manter bloqueados para eventual patch até exame dos atos primários. A fila B também permanece não certificada.

## Marco temporal, histórico e integridade

- **Corte jurídico histórico 04/11/2026:** a menção à Lei 15.479, de 29/07/2026, não é automaticamente uma atualização *posterior* ao corte. Exige separar edição, publicação, vigência e produção de efeitos. O comparador não extrai metadados de vigência nem substitui exame do ato modificador ou do julgamento do STF.
- **Regressão 1–100:** refeita com os mesmos HTMLs. Permanecem **203 linhas** (202 artigos presentes no espelho + marcador oficial `L10406:art69-A`, vetado, sem espelho): 175 idênticas, 27 diferentes, 1 ausente. Os sufixos `48-A`, `49-A`, `69-A` continuam individuais; o marcador vetado não é interpretado como norma ativa.
- **Acumulado 1–200:** 402 artigos efetivamente presentes no espelho triados, **363** coincidentes e **39** com diferenças a investigar; **1 marcador vetado oficial sem representação**. De 3.156 artigos originalmente importados em CC/CPC, **2.754** ainda não passaram por esta comparação textual. Não confundir 402 comparações com 402 artigos juridicamente verificados.
- **Contratos do aplicativo:** nenhum patch em oito diplomas, IDs, anotações, tags, pesquisa, janela de índice, uma norma aberta por vez, `topic:null`, `forNotebook`, nove categorias de backup S20, leitor, questão, baralho ou caderno. Repositório privado de auditoria não consultado nem exportado.

## Testes, integração e bloqueios

Regressões locais: testes determinísticos Python do extrator e suítes Node da aplicação (resultados da execução registrados no PR). Sem alteração no produto, não se aplicam E2E mutáveis, TalkBack, matriz Chromium/axe nas cinco larguras, backup restaurado ou Pages pós-merge; **não** apresentar tais portões como aprovados. Etapa 08 deve permanecer em PR **draft empilhada**, sem merge/rebase/force push. Concluir a revisão jurídica da fila C antes de qualquer alteração textual no corpus.

Handoff: `docs/PROMPT_BIBLIOTECA_LEIS_09.md` somente proposta de etapa futura, **não executada**.
