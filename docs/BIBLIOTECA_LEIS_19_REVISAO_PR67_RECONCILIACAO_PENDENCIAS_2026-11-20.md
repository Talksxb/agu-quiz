# AGU Quiz | Revisão PR #67, ponte de indicadores e pendências (20/11/2026)

## Estado conferido
PR #67 em draft, aberta e não mesclada. HEAD `059d3ef347b8becfd744fa3bc042b1b9bfef1113`; base `audit/biblioteca-leis-16-reconciliacao-901-1000` no SHA `76c21b086c08246c4f104cfbfb1dc3a21c531cae`. Quatro arquivos modificados: dois relatórios, comparador Python e testes. Exame estático de arquivos reais da branch, sem alegar novo CI nem execução local.

## Parecer técnico
- Correções adequadas em princípio: `Art. 1.000` separado de 999; intervalos `Arts. 757 a 777`, `778 a 788` e `789 a 802` não são anexados ao 756; intervalos expressamente revogados têm proveniência sem texto individual inventado.
- Os oito testes registrados em Biblioteca 18 não demonstram, por si só, igualdade de *todo* o universo histórico; não existe no diff um teste de regressão com manifesto de todos os IDs previamente cotejados.
- O critério `grouped_revocation` depende também do espelho conter `Revogad[oa]`: se o espelho divergir ou estiver ausente, será classificado `dispositivo_ausente`, e a revisão deve distinguir ausência no espelho de revogação oficial.
- `official_articles` usa `raw.decode('utf-8', errors='replace')`; perda de bytes não dispara erro de encoding. Recomendável validar charset e falhar ou registrar caracteres de substituição em cotejos destinados a certificação.
- O detector de faixas exige `Arts. N a M` e `Revogad...` no mesmo parágrafo: formato distinto em futuras fontes exige novo teste, não extrapolação.
- `mirror_articles` seleciona `clauses[0].text`: confirmar no catálogo o contrato de que a primeira cláusula contém o texto a comparar; múltiplas cláusulas podem exigir revisão.
- `run` adiciona itens interpolados ao número de linhas. A documentação do ensaio 901–1000 informa 201 linhas, não 200; tratar ID interpolado como item de chave própria e nunca como novo artigo numérico.
- A documentação anterior da Biblioteca 17 ainda descreve bloqueio de fontes, enquanto Biblioteca 18 documenta sua resolução; marcar 17 como histórico e remeter ao relatório posterior, sem adulterar o checkpoint original.

## Conciliação com universos explícitos
### Fotografia histórica publicada, universo U_h
`U_h = 2.008` registros efetivamente classificados na primeira passagem; `U_total = 3.156` IDs no plano histórico. Partição **bruta** de U_h: 1.846 `texto_normalizado_identico` + 113 `diferenca_textual_exige_revisao` + 1 `diferenca_aparente_restrita_a_nota_editorial_revisar` + 48 `dispositivo_ausente` = 2.008. IDs sem primeira passagem 3.156 - 2.008 = 1.148. 2.008 / 3.156 = 63,6248% (63,62%). NÃO atualizar o total nem comparar classes de universos distintos.

### Ponte de saneamento individual identificado
Dentre as 48 ausências **históricas**, os 46 IDs CC757–802 são reconhecidos como `revogacao_agrupada_documentada` (não coincidência de texto individual), e CC1000/CPC1000 aparecem como textos normalizados idênticos no ensaio 999–1001. Assim, a ponte *apenas para o subconjunto histórico de 48* é 48 ausências brutas -> 46 revogações documentadas + 2 identidades textuais, condicionada à confirmação por chave de que os resultados recém-medidos correspondem aos mesmos 48 registros do snapshot. O valor bruto 48 não se apaga.

Outros IDs afetam a redistribuição: CC756, CC999 e CPC999 tinham contaminação anterior e foram reavaliados como parte dos recortes corrigidos, mas o arquivo Biblioteca 18 não inclui a lista íntegra de pares `id, classe_antiga, classe_nova`. Por isso, não é matematicamente auditável deduzir o total corrigido de 1.846 coincidências ou de 113 diferenças somando/subtraindo apenas os 48.

### Recortes novos: universos separados e sobrepostos
- `R_756_803`: 96 linhas = 48 textos idênticos + 46 revogações agrupadas + 2 diferenças textuais (CPC784/CPC799).
- `R_999_1001`: 6 linhas = 6 idênticos.
- `R_901_1000`: 201 linhas = 177 idênticos + 23 diferenças textuais + 1 diferença editorial; 200 artigos numéricos mais 1 chave interpolada. Sobrepõe-se a `R_999_1001` nos números 999–1000; não somar resultados.
Os recortes são verificações pontuais reportadas no documento Biblioteca 18 (18/11/2026), não um novo processamento completo de U_h nem certificação jurídica.

### Regra operacional para fechamento numérico
Materializar manifesto de U_h com `id` único, classificação bruta, classe nova e origem; executar comparador sobre as *mesmas 2.008 chaves* com snapshots CC/CPC e do espelho, preservando os hashes, identificando inclusões/exclusões de sufixos, e emitir uma tabela de transição `old_class x new_class` cuja soma de linhas e colunas seja 2.008. Somente então declarar novas classes globais. Se chaves não coincidirem, informar diferenças de conjuntos (`U_h - U_n`, `U_n - U_h`) e manter indicadores como não comparáveis.

## Registro separado de divergências remanescentes
| ID ou conjunto | Fonte do apontamento | Estado | Ação |
| --- | --- | --- | --- |
| `L13105:art784` | Ensaio 756–803 | diferença textual; causa não discriminada | diff de parágrafos, identificar se dispositivo ou nota |
| `L13105:art799` | Ensaio 756–803 | diferença textual; causa não discriminada | diff de parágrafos, identificar se dispositivo ou nota |
| 23 linhas em `R_901_1000` | Ensaio 901–1000 | diferenças textuais, IDs não enumerados no relatório | exportar 23 chaves e deltas, nunca tratá-las como 23 novos problemas sem deduplicação |
| 1 linha em `R_901_1000` | Ensaio 901–1000 | nota editorial aparente, ID não enumerado | localizar chave e confirmar nota |
| `CC819-A`, `CC853-A`, `CC980-A` | gate Biblioteca 17 | vetado/vigente/revogado a conferir; não verificado nesta revisão | conferência oficial pontual e teste com sufixos |
| Universo U_h completo | Biblioteca 16/17 | matriz de transição por ID ausente | reexecução homogênea antes de alterar KPI |

Não considerar os dois IDs CPC784/CPC799 como *adicionais* aos 113 históricos sem cruzamento de IDs.

## Decisão
**Revisão técnica: correção localizada plausível e documentada, aprovação global condicionada**. Deixar draft e sem merge. Exigir manifesto de transição por 2.008 chaves, registro dos deltas e controles de integridade/charset antes de atualizar o KPI e avançar ao lote 1001–1100. Nenhum corpus, UI, prova ou material pedagógico alterado. Não há certificação jurídica integral.
