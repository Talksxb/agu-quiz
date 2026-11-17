# AGU Quiz | Biblioteca de legislação — etapa 15 (handoff; NÃO EXECUTAR)

**Não executar durante Biblioteca 14.** Uma etapa por autorização expressa posterior.

## Retomada obrigatória

Reconfirmar `Talksxb/agu-quiz/main` e PRs abertas/mescladas/conflitantes, especialmente cadeia #49–#53, #55, #56, #58, #59, #60, #62 e PR da Biblioteca 14. Ler relatórios e handoffs 03–14, `scripts/cotejar-biblioteca-lote04.py`, testes, os contratos do leitor e do backup, e as fontes oficiais da Câmara. Não presumir merge nem realizar rebase/force push/merge automático; empilhar apenas sobre base confirmada.

## Missão delimitada

1. **Primeiro controlar a peculiaridade da revogação agrupada CC757–802** pela Lei 15.040/2024: verificar novamente art. de revogação e cláusula de vigência na publicação oficial, distinguir **44 IDs 757–800** com marcadores individuais no espelho de três faixas agregadas na Câmara; incluir **801–802** no próximo lote. Não considerar ausências brutas como lacunas jurídicas nem reativar textos revogados.
2. Investigar reprodutibilidade e propor teste do comparador para **intervalos revogados** e anexação indevida desses intervalos ao CC756, sem mudar código/produto ou classificações históricas salvo autorização expressa de patch do comparador e regressões. Se surgir defeito reprodutível, definir escopo mínimo e preservar comparabilidade retrospectiva.
3. Se o núcleo estiver documentalmente seguro, cotejar **CC/CPC 801–900**, com sufixos independentes, revogações, vetos, anotações prospectivas, remissões judiciais, hashes e classificação A/B/C. Distinguir artigos textualmente idênticos, discrepâncias, revogações agrupadas e ausências reais.
4. Atualizar contagem acumulada com denominador **3.156 IDs originalmente importados** e marcadores oficiais sem espelho em coluna separada; entregar relatório, PR draft empilhada e handoff autossuficiente da Biblioteca 16, **sem executar a 16**.

## Portões e integridade

Preservar oito diplomas, IDs, sufixos, notas, tags por matéria, `topic:null`, `pending`/`partial`/`mirror_unverified`, uma norma por vez, `forNotebook`, nove categorias S20, baralhos, backups e dados. Sem acesso à auditoria privada. Qualquer patch de produto precisa de autorização, teste falhando prévio, fixture/hash, cinco larguras Chromium, axe (`violations`, `incomplete`, `passed`), backup S20, Node/Python, CI e Pages após merge. Se a etapa permanecer documental, registrar esses ensaios como não aplicáveis.
