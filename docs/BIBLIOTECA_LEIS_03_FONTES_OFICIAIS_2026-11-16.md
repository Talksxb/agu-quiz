# AGU Quiz | Biblioteca de legislação — etapa 03
## Levantamento de fontes oficiais e portão de cotejo — 16/11/2026

**Resultado: cotejo integral não concluído; nenhum texto legal, vínculo curricular ou metadado de verificação alterado.** Esta etapa documenta uma fonte primária alternativa acessível para ambos os códigos e a limitação técnica da comparação exaustiva. Não se declara integralidade, vigência consolidada nem validação artigo por artigo.

### Base e limites
- Repositório: `Talksxb/agu-quiz`, base `main` identificada como `31a47693b8f690e543f565c83208e3cdc637a547` na abertura; pesquisa de PRs abertas sem resultados.
- Marcos históricos: etapa 01 PR #44 (merge `164ad3446acd2cd23f53e41c96777312ae15aec0`), etapa 02 PR #45 (merge `aeedd9e1a3e7f3d00a8291516f30571e8c58942b`).
- Branch documental: `docs/biblioteca-leis-03-fontes-oficiais`. Alterações unicamente em documentação e handoff; CI, Pages e eventual merge permanecem a conferir.
- Corte de observação das páginas: 16/11/2026, horário de consulta não capturado com precisão; **não** é corte jurídico certificado de efeitos de emendas. Para futuro cotejo, fixar explicitamente a data e separar publicação, vigência e produção de efeitos.

### Fontes examinadas
1. Código Civil — Lei 10.406/2002, texto atualizado da Câmara dos Deputados: https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html . A ferramenta de leitura retornou página estruturada com aproximadamente 7.775 linhas; os primeiros artigos e referências editoriais de alteração estão disponíveis.
2. CPC — Lei 13.105/2015, texto atualizado da Câmara dos Deputados: https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html . A ferramenta de leitura retornou página estruturada com aproximadamente 7.596 linhas; os artigos iniciais, parágrafos e referências estão disponíveis.
3. Planalto, CC: https://www.planalto.gov.br/ccivil_03/leis/2002/l10406compilada.htm ; CPC: https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2015/lei/l13105.htm . Ambas as aberturas nesta execução retornaram desafio anti-automação (verificação humana). Nenhum CAPTCHA foi contornado.

**Método efetivamente realizado:** leitura de abertura de fontes oficiais por ferramenta web, conferência da identificação dos diplomas e observação de presença de artigos. **Não** foram obtidos bytes HTML brutos autenticados, ETag/Last-Modified nem SHA-256 das respostas; a representação textual da ferramenta não substitui os arquivos originais. Não houve extração completa, normalização, alinhamento ou comparação com os 2.082 artigos do CC e os 1.074 artigos do CPC do espelho LawCodex. Portanto **não existe lista demonstrada de divergências ou de coincidências artigo a artigo**. A alternativa oficial da Câmara melhora a viabilidade da etapa seguinte, não a certificação desta.

### Situação do corpus
- Mantêm-se oito normas, 3.448 artigos e 4.332 unidades conforme checkpoint da etapa 02.
- CC e CPC permanecem `contentImport:'mirror_unverified'`, `contentCoverage:'partial'`, `textVerification.status:'pending'` e `topic:null`. Não houve modificação dos arquivos `dados/codigos-cc-cpc.js`, `dados/legislacao-s13.js`, leitor, índice, testes, fixtures, `forNotebook` ou categorias de backup.
- Nenhum novo diploma (Lei 14.133, Lei 8.112, CTN) foi importado: o handoff exigia autorização inequívoca para novo conteúdo, além de exame do edital literal.
- Nenhum teste Node, Chromium, axe, Android físico, TalkBack ou ensaio de backup foi executado nesta etapa documental, pois não existe patch de produto. Sem evidência, não registrar aprovação. Nenhum SHA de produção foi comparado nesta execução.

### Método exigido para completar o cotejo
1. Em ambiente permitido, baixar legalmente ambas as páginas oficiais da Câmara com metadados de resposta, data/hora e SHA-256 dos bytes, sem contornar barreiras de acesso. Registrar versão de cada fonte e a data de corte jurídica.
2. Preservar o snapshot LawCodex referenciado na etapa 01 (commit `e2a0e14bfc5cddf9a88b2aa05c66536cdb547aa1`) e confirmar seus SHA-256 de origem (`02f30e533422f8aed9566953b7a731642b3d2293de3c373f5646c8d799ee7137` CC; `39006ac91e7e93548cbdcbf167d69746f6b4d0ca45d5d81ffe19a27a193d910c` CPC).
3. Transformar cada fonte em uma sequência ordenada de dispositivos, distinguindo artigo principal, artigo acrescido (sufixo), parágrafo, inciso, alínea, revogação, veto, nota editorial e remissões. Testar que não há IDs duplicados, faltantes ou fora de ordem; não apagar notas editoriais silenciosamente.
4. Comparar integralmente cada artigo e subdivisão, com relatório de divergência por ID, trecho, fonte e confiança. Verificar atos supervenientes e eficácia temporal, sem confundir redação atual com aplicabilidade ao corte.
5. Se divergências forem comprovadas, propor patch mínimo e versionado, preservar identificadores e notas dos usuários, acrescentar fixture SHA nova (sem reescrever baselines) e executar regressões Node/Chromium/axe/Pages antes de qualquer promoção de status.

### Conclusão
**Etapa 03: levantamento oficial documentado; cotejo jurídico integral pendente.** Não há base técnica para afirmar conclusão do objetivo principal nem para editar o texto legal. A próxima autorização deve delimitar um lote reproduzível de comparação ou oferecer o ambiente capaz de capturar e preservar as duas fontes integrais. 