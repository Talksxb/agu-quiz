# AGU Quiz | Biblioteca de legislação — etapa 14

## Resultado, escopo e portão de integridade

Etapa **exclusivamente documental**, autorizada em 17/11/2026. Reconciliação primária de CC693/698, CPC627/699-A e primeira comparação de **CC/CPC arts. 701–800** com o comparador reexecutável da Biblioteca. O comparador bruto retornou **200 IDs numéricos**, classificados em **152 textos normalizados iguais**, **4 diferenças textuais** e **44 “ausências” oficiais**. O achado crucial é que as 44 supostas ausências correspondem a **CC757–800, revogados expressamente em bloco e representados individualmente no espelho como revogados**. São diferenças de **granularidade da representação de revogação**, não lacunas de conteúdo legislativo vigente.

Não foi criado ou restaurado conteúdo revogado, nem editado texto legal da aplicação. Igualdade de strings **não** constitui certificação jurídica.

### Continuidade e concorrência

`Talksxb/agu-quiz/main` reconfirmada em `31a47693b8f690e543f565c83208e3cdc637a547`. PRs da Biblioteca #49–#53, #55, #56, #58, #59, #60 e **#62** abertas, sem merge na retomada; #62 em **draft**, head `09977b12744863aea370fcf6d516f9030e6e5c84`, base `audit/biblioteca-leis-12-reconciliacao-501-600`, mergeable no momento da consulta. PR #61 de frente concorrente também aberta. Empilhar esta etapa sobre **#62**, sem merge/rebase/force push. Não houve acesso à auditoria privada.

## Núcleo histórico e jurídico anterior

| ID | Fonte e reconciliação | Estado |
| --- | --- | --- |
| `L13105:art627` | Texto consolidado oficial da [Câmara](https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html) contém `II - reclamar contra a nomeação de inventariante; III - ...`, mas o espelho omite o **ponto e vírgula** entre esses incisos. São disposições mantidas em IDs próprios; a omissão altera pontuação, não há demonstração de supressão do inciso III. | **Correção editorial literal futura** condicionada a patch autorizado e fixture, sem adulterar o espelho neste lote. |
| `L10406:art693` e `:art698` | [Lei 14.690/2023, art. 30, e cláusula de eficácia](https://www2.camara.leg.br/legin/fed/lei/2023/lei-14690-3-outubro-2023-794773-publicacaooriginal-169565-pl.html): nova redação do art. 693 e parágrafo único no art. 698; produção de efeitos **180 dias após a publicação** de 03/10/2023. O espelho preserva os textos, mas abrevia as notas de origem e de vigência. | **Editorial-temporal**; efeitos já produzidos no corte de 04/11/2026. |
| `L13105:art699-A` | [Lei 14.713/2023, art. 2º](https://www2.camara.leg.br/legin/fed/lei/2023/lei-14713-30-outubro-2023-794875-publicacaooriginal-169909-pl.html) incluiu **artigo autônomo** sobre indagação de risco de violência doméstica ou familiar antes da audiência em ação de guarda; art. 3º prevê vigência na publicação (DOU 31/10/2023). Espelho contém corpo, mas `Art. 699-A` sem ponto final e nota abreviada. | **Tipografia/proveniência**, ID com sufixo preservado, vigente no corte. |

Não há base para promover esses três conjuntos à certificação integral. Um patch textual no espelho exigiria teste anterior e verificação de preservação de notas e dados.

## Achado crítico — Lei 15.040/2024 e CC757–802

Fontes primárias: [Lei 15.040/2024, publicação original na Câmara](https://www2.camara.leg.br/legin/fed/lei/2024/lei-15040-9-dezembro-2024-796661-publicacaooriginal-173706-pl.html), [ficha de alterações do Código Civil](https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-norma-pl.html) e [ficha no Senado](https://legis.senado.leg.br/norma/39893545). DOU **10/12/2024**; entrada em vigor **10/12/2025** conforme o Senado, após um ano da publicação. A lei revogou expressamente **CC757–802** e **CC206, § 1º, II**. Essa revogação **já estava vigente no corte 04/11/2026**.

- Na consolidação da Câmara, a revogação é apresentada em **três linhas agrupadas**, após o art. 756: `Arts. 757 a 777`, `Arts. 778 a 788` e `Arts. 789 a 802` (todos revogados pela Lei 15.040/2024). Isso explica por que o extrator de artigos individuais não encontra CC757–800.
- No espelho, cada um dos **44 IDs CC757–800** contém exclusivamente marcador `Art. N. (Revogado pela Lei nº 15.040, de 2024) Vigência`, sem fingir conteúdo normativo ativo. **A ausência apontada pelo comparador é estrutural** (blocos versus IDs), não omissão jurídica e não autoriza recriação de artigos.
- CC801–802, fora desta faixa, também aparecem como revogados no espelho e estão dentro do mesmo comando legal. Ficam registrados no controle prospectivo de cotejo **801–900**, sem antecipar sua execução.
- A diferença de `L10406:art756` resulta justamente de o extrator **anexar as três linhas de revogação ao texto normalizado do art. 756**. Portanto, não é evidência de alteração do conteúdo próprio do art. 756; é uma limitação conhecida do mecanismo de extração. Recomenda-se teste específico de reconhecimentos de intervalos revogados em tarefa posterior, sem mudar o algoritmo durante esta etapa documental.

Esta verificação evita falso positivo massivo, mas não certifica automaticamente cada artigo revogado: a **Lei 15.040/2024** é o fundamento comum e o estado documental é **revogação confirmada, representação divergente**.

## Proveniência e matriz 701–800

Comparador `scripts/cotejar-biblioteca-lote04.py`, `run(CC.html, CPC.html, 701, 800)`. Capturas oficiais HTTP 200 de 17/11/2026, preservadas sem republicar:

| Texto consolidado | Data do cabeçalho HTTP GMT | Bytes | SHA-256 bruto |
| --- | --- | ---: | --- |
| [Código Civil — Câmara](https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html) | `Tue, 17 Nov 2026 14:43:45 GMT` | 1.571.920 | `6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90` |
| [CPC — Câmara](https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html) | `Tue, 17 Nov 2026 14:43:51 GMT` | 938.199 | `0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821` |

| Identidade ou intervalo | Diferença e fila |
| --- | --- |
| `L10406:art723` | Caput e parágrafo único coincidem; notas da Lei 12.236/2010 aparecem em dois pontos no espelho e nota única na Câmara. **B — proveniência editorial.** |
| `L10406:art756` | Conteúdo próprio coincide; o consolidado anexou ao extrator três intervalos **757–802 revogados**. **C — falso positivo estrutural do extrator**; separar antes de qualquer classificação de artigo ativo. |
| `L10406:art757` a `:art800` | **44** IDs com revogação individual expressa no espelho, agrupada na Câmara. O comparador marcou `dispositivo_ausente` por não reconhecer intervalos; **C — revogação confirmada, ausência técnica**, não norma vigente ausente. |
| `L13105:art784` | Inciso **XI-A** sobre contragarantia preservado; anotação da Lei 14.711/2023 mais detalhada na Câmara. **B — editorial/histórico**; conferir demais parágrafos antes de qualquer patch. |
| `L13105:art799` | No espelho, ponto final após inciso IX, em vez de ponto e vírgula, e notas resumidas nos incisos X/XI, acrescidos pela Lei 13.465/2017. **B — pontuação/proveniência**. |

Contagem **bruta** da ferramenta: **152 coincidências textuais + 4 diferenças textuais + 44 ausências técnicas = 200 IDs**. Contagem **reconciliada**: **152 coincidências textuais**, **4 diferenças que exigem revisão** (uma estrutural), **44 representações individuais de revogação válidas, porém incompatíveis com o modo de agrupamento oficial**. Não somar as 44 revogações à categoria de “textos idênticos”. Nenhum sufixo novo foi identificado no lote.

## Totais, preservação e testes

- Acumulado de **1.605/3.156** IDs do CC/CPC com primeira passagem (**50,86%**): **1.479** coincidências normalizadas, **82** diferenças textuais acumuladas e **44** marcadores individuais de revogação conciliados externamente com a lei, mas não comparáveis linha a linha pelo extrator. **1.551** IDs ainda sem primeira passagem. Marcadores **CC69-A vetado** e **CPC529-A prospectivo** continuam fora do denominador de IDs espelhados.
- A classificação histórica anterior não foi sobrescrita: este relatório introduz subcategoria **revogação agrupada** para evitar tratar 44 IDs como lacunas reais ou como texto certificado. Manter acompanhamento de CC801–802 e dos efeitos temporais da Lei 15.040/2024.
- Oito diplomas, `topic:null`, estados `mirror_unverified`/`pending`/`partial`, IDs, notas, sufixos, tags por matéria, uma lei por vez, `forNotebook`, nove categorias S20, backups, baralhos e dados do estudante preservados. Sem acesso/exportação de auditoria privada; sem patch de corpus, UI ou algoritmo.
- Verificações locais e PR registradas no fechamento. Chromium cinco larguras, axe (`violations`, `incomplete`, `passed`), TalkBack, backup mutável, CI de produto e Pages pós-merge **não aplicáveis**, sem alegação de execução.

Próximo handoff: `docs/PROMPT_BIBLIOTECA_LEIS_15.md`, **não executado**.
