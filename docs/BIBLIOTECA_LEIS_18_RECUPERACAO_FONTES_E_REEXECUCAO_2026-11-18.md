# AGU Quiz — Biblioteca 18 | Fontes oficiais recuperadas e reexecução

Data da verificação: 18/11/2026. Escopo: recuperação dos HTMLs usados no cotejo e reexecução pontual do comparador corrigido na Biblioteca 17; sem atualização automática do corpus, sem nova certificação jurídica e sem avanço ao lote 1001–1100.

## Integridade das fontes

Arquivos HTML integrais recuperados por salvamento da página da Câmara dos Deputados e conferidos contra o registro histórico de bytes e SHA-256:

| Fonte | URL oficial | Bytes recuperados | SHA-256 recuperado | Correspondência histórica |
| --- | --- | ---: | --- | --- |
| Código Civil, Lei 10.406/2002 | https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html | 1.571.920 | `6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90` | Exata |
| CPC, Lei 13.105/2015 | https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html | 938.199 | `0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821` | Exata |

A correspondência binária com as fontes anteriormente registradas elimina dúvida de mudança de versão entre os dois ensaios. Os HTMLs brutos são insumos transitórios da reexecução, não documentos normativos certificados nem conteúdo a publicar no site.

## Ensaios executados

- `python -m unittest discover -s tests -p 'test_biblioteca_leis_05.py' -v`: 8/8 testes aprovados.
- Reexecução de `run(cc, cpc, 756, 803)`: 96 linhas (48 artigos de cada código): 48 textos normalizados idênticos, 46 `revogacao_agrupada_documentada`, 2 diferenças textuais a revisar (`L13105:art784`, `L13105:art799`). As 46 revogações são IDs CC757–802, com origem em intervalos expressos do documento oficial; não foram fabricados dispositivos individuais.
- Reexecução de `run(cc, cpc, 999, 1001)`: 6/6 textos normalizados idênticos. CC e CPC artigos 999, 1000 e 1001 são individualizados; `Art. 1.000.` não é extensão de 999.
- Controle abrangente `run(cc, cpc, 901, 1000)`: 201 linhas, sendo 177 textos normalizados idênticos, 23 diferenças textuais a revisar e 1 diferença aparente limitada a nota editorial a revisar. A linha adicional decorre de dispositivo interpolado; não representa novo artigo numérico.

## Reconciliação e limites

As contagens históricas da Biblioteca 16/17 (2.008/3.156 IDs na primeira passagem, 1.846 idênticos, 113 divergências, 1 nota editorial e 48 ausências técnicas) ficam **preservadas como fotografia anterior à correção**, sem sobrescrita retroativa. Os novos números acima são recortes de reexecução, não totais globais comparáveis nem revisão automática daqueles indicadores.

A reclassificação dos 46 IDs revogados e dos artigos 1000 do CC/CPC remove a causa técnica das 48 ausências identificadas, mas não autoriza declarar automaticamente zero pendências globais: isso exigiria um processamento integral reconciliado, com igualdade de universo e critérios. Os dois pontos de diferença textual do CPC 784 e 799 permanecem em aberto para análise jurídica/editorial independente.

**Próximo gate:** revisar a PR de correção do comparador com estes resultados e reconciliar integralmente as métricas de mesmo universo antes do cotejo dos artigos 1001–1100. Não houve merge, rebase ou modificação do corpus.
