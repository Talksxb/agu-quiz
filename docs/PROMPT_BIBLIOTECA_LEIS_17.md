# AGU Quiz | Biblioteca de legislação — etapa 17 (handoff; NÃO EXECUTAR)

**Apenas para uma autorização expressa posterior.** Não iniciar a etapa 17 durante a etapa 16; uma execução por autorização.

## Retomada obrigatória

1. Revalidar `Talksxb/agu-quiz/main` e PRs abertas, fechadas e mescladas, especialmente Biblioteca #49–#53, #55, #56, #58–#60, #62–#64 e PR criada na etapa 16. Checar SHA, base empilhada, CI, conflitos e frentes concorrentes. Não presumir que `main` ficou parada.
2. Ler `docs/BIBLIOTECA_LEIS_16_RECONCILIACAO_E_COTEJO_901_1000_2026-11-17.md`, relatórios 03–15, `scripts/cotejar-biblioteca-lote04.py`, testes, contrato do leitor e backup. Preservar corte jurídico 04/11/2026 e notas pós-corte segregadas.
3. Não fazer merge, rebase ou force push; não abrir PR direta para `main` sem novo motivo. Não acessar auditoria privada.

## Missão proposta

1. **Prioridade técnica do lote 16:** tratar documentalmente o erro do parser em `Art. 1.000.`: `CC1000/CPC1000` são presentes na lei e no espelho, porém ausentes no mapa extraído; textos de `1000+` contaminam `999`. Criar fixture mínima e teste falhando antes de eventual correção expressamente autorizada do comparador. Também propor/validar fixture para revogações agrupadas `CC757–802` e falso positivo `CC756`, preservando contagens brutas versus reconciliadas. Nenhuma edição automática do corpus/UI.
2. **Prioridade jurídica:** validar texto integral da ADI 5.492 (CPC840 I versus 535 §3 II), decisão/publicação e remissões; CC937 §§1º–2º vetados; CC927 ADIs 6792/7055; CPC913 Lei 15.479/2026; e Lei 15.484/2026 em CPC927, 932, 979 e 998, com controle de vigência e notas. Separar texto normativo de anotações editoriais. CC819-A continua vetado, CC853-A vigente com parágrafos, CC980-A revogado.
3. Se as questões anteriores estiverem documentalmente controladas, comparar **CC/CPC 1001–1100**, incluindo sufixos individuais, nomes com milhares, revogações e alterações. Não aceitar resultados contaminados pelo regex atual. Atualizar o acumulado sobre **3.156 IDs espelhados**, sem contar marcadores externos à base. A etapa 16 terminou em **2.008/3.156 (63,62%)**, brutos: 1.846 idênticos, 113 diferenças, 1 diferença editorial, 48 ausências técnicas (46 revogações + 2 parse).
4. Publicar apenas relatório/fixture ou patch isolado e testado conforme a autorização, em **PR draft empilhada**. Documentar evidências, fonte, hash, resultado bruto/reconciliado, testes, divergências e handoff da etapa 18. **Não executar a etapa 18**.

## Barreiras e testes

Preservar oito diplomas, IDs e sufixos, `topic:null`, notas e vigências, tags, estados pendentes, `forNotebook`, categorias S20, baralhos, backup e dados do estudante. Para patch de comparador: demonstrar teste inicialmente falhando, regressões Python/Node e diferenças deliberadas no cálculo; não sobrescrever estatística histórica. Para patch de UI/produto: exigir autorização específica, Chromium cinco larguras, axe integral (`violations`, `incomplete`, `passed`), backup S20, CI e Pages pós-merge. Não proclamar certificação jurídica integral sem comprovação.
