# AGU QUIZ — Biblioteca 23 | Fechamento da primeira passagem e revisão jurídica delimitada

**Data de execução:** 22/11/2026 (São Paulo). **PR #77:** `audit/biblioteca-leis-23-triagem-1148` sobre `audit/biblioteca-leis-22-reexecucao-evidencias` (PR #76). **Execução validada:** [GitHub Actions #45020000077, tentativa 2](https://github.com/Talksxb/agu-quiz/actions/runs/45020000077), resultado `completed/success`, após tentativa 1 com timeout HTTP; testes e validação de SHA-256 passaram.

## Universo e evidência verificável

- **3.156 IDs importados no corpus:** 2.082 CC e 1.074 CPC. Os primeiros **2.008** foram verificados na Biblioteca 22; os **1.148 restantes** agora receberam primeira passagem textual (1.075 CC e 73 CPC), incluindo artigos interpolados com sufixo.
- Fontes: Câmara dos Deputados, HTML integral CC (1.571.920 bytes, SHA `6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90`) e CPC (938.199 bytes, SHA `0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821`). Ambos conferidos byte a byte, mesmos snapshots históricos.
- **Artefato da tentativa 2:** [primeira passagem 1.148 e fila 111](https://github.com/Talksxb/agu-quiz/actions/runs/45020000077/artifacts/14752884288). Arquivos: `primeira_passagem_1148.csv` (SHA-256 `27fae82b2cfe5654ab2d81ed34cc3e5f52534d10df7d9783c953b67d4733b722`), `triagem_juridica_111.csv` (SHA-256 `d089f0e8937be4ba1b00676e397f2bbe0893c0cb3d11943171d94db3e9f3ee78`), `resumo.json`. Todos contêm identidades verificáveis, SHA-256 de cada representação e classes; HTML oficial não redistribuído.
- Sem IDs duplicados, faltantes do conjunto de **1.148 importados** ou alterações do corpus. A categoria `revogacao_agrupada_documentada` não representa igualdade textual de artigo individual.

## Contagens efetivamente executadas

| Classe da representação | Biblioteca 22 (2.008) | Biblioteca 23 (1.148) | Total (3.156) |
|---|---:|---:|---:|
| Texto normalizado idêntico | 1.851 | **989** | **2.840** |
| Diferença textual pendente | 96 | **133** | **229** |
| Diferença aparente em nota editorial | 15 | **19** | **34** |
| Revogação agrupada documentada | 46 | **7** | **53** |
| Ausência técnica | 0 | **0** | **0** |
| **Total do corpus importado** | **2.008** | **1.148** | **3.156** |

**Cobertura de primeira passagem textual dos IDs importados: 3.156/3.156 (100%). Certificações jurídicas integrais: 0.** Os **263** itens com diferença (229 textual + 34 editorial) são **pendências de revisão**, não 263 erros materiais nem 263 artigos desatualizados.

### Achado técnico: CC1620–1629

Primeira extração marcou `L10406:art1620` como `dispositivo_ausente`, embora o registro importado contenha literalmente o agrupamento **`Art. 1.620. a 1.629. (Revogados pela Lei 12.010/2009)`** e a Câmara apresente **`Arts. 1.620 a 1.629. (Revogados...)`**. O detector aceitava `Revogado/Revogada` mas não `Revogados/Revogadas` no lado do espelho. O comparador foi corrigido com `Revogad[oa]s?` e teste específico; a tentativa 2 comprovou a reclassificação como `revogacao_agrupada_documentada`. A fonte é a [Lei 12.010/2009, publicação original](https://www2.camara.leg.br/legin/fed/lei/2009/lei-12010-3-agosto-2009-590057-publicacaooriginal-114978-pl.html).

**Atenção curricular:** o espelho contém **um ID importado CC1620** representando a faixa revogada 1620–1629; não possui nove IDs individuais 1621–1629. Essa granularidade não entra no denominador 3.156 e não implica lacuna de norma vigente; qualquer reparo de navegação exige tarefa própria, sem inventar conteúdo normativo.

Outros seis IDs **CC1768–1773** são marcadores individuais de revogação em bloco pelo CPC/2015. As **46** revogações CC757–802 da Biblioteca 22 permanecem classe própria. Soma de marcadores por ID: 46 + 1 + 6 = 53.

## Revisão jurídica — conteúdo efetivamente confirmado em fontes oficiais

Esta etapa gerou **111 linhas de triagem jurídica individual** da Biblioteca 22 (96 diferenças textuais + 15 editoriais), com hashes de ambos os lados, trechos de diferenças, prioridade, indicação de fundamento e `status=revisao_juridica_individual_pendente`. **Não** houve leitura integral de cada lei modificadora e de cada acórdão para todos os 111 IDs. Conclusões pontuais verificadas:

1. **CPC144 VIII — ADI 5.953:** STF declarou inconstitucional o inciso VIII. Texto promulgado e decisão devem ser apresentados em camadas distintas. [STF](https://portal.stf.jus.br/processos/detalhe.asp?incidente=5481637).
2. **CPC525 e CPC535 — AR 2.876 QO:** STF declarou incidentalmente inconstitucionais art. 525 §14 e art. 535 §7, e deu interpretação conforme, com efeitos ex nunc, ao art. 525 §15 e art. 535 §8. [STF, Informativo 1177/2025](https://www.stf.jus.br/arquivo/informativo/documento/informativo1177.htm). O art. 525 pode não apresentar diferença textual relevante da Câmara em alguns trechos, mas **sua anotação de eficácia deve ser checada independentemente da igualdade textual**.
3. **CPC535 §3 II / CPC840 I — ADI 5.492:** decisões sobre depósitos judiciais e RPV afastam a exclusividade de bancos públicos, preservando exigências constitucionais de seleção de instituição privada. [STF](https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=506742&tip=UN). Não confundir as duas expressões invalidadas nos diferentes dispositivos.
4. **CC206 §1 II / CC757–802 — Lei 15.040/2024:** revogação em vigor desde 2025, não se aplica ao art. 206 inteiro. [Câmara](https://www2.camara.leg.br/legin/fed/lei/2024/lei-15040-9-dezembro-2024-796661-publicacaooriginal-173706-pl.html).
5. **CPC927, 932, 979, 988, 998, 1030, 1035-A, 1039, 1042 — Lei 15.484/2026:** mudança referente à relevância do REsp. Lei publicada em 04/08/2026, vigência após 30 dias (art. 7º), controle transitório do art. 4º para acórdãos publicados após vigência. [Câmara](https://www2.camara.leg.br/legin/fed/lei/2026/lei-15484-4-agosto-2026-799698-publicacaooriginal-180680-pl.html). Os cinco últimos itens pertencem ao lote B23; texto literal e notas devem ser conferidos unidade por unidade.
6. **CC1790 — STF Temas 809 e 498:** o artigo que diferenciava sucessão de companheiro e cônjuge foi declarado inconstitucional; aplica-se o regime do art. 1829. **É item novo com diferença textual, mas o risco de ensinar direito incompatível com o STF é independente da diferença.** [STF Tema 809](https://portal.stf.jus.br/jurisprudenciaRepercussao/tema.asp?num=809), [Tema 498](https://portal.stf.jus.br/jurisprudenciaRepercussao/tema.asp?num=498).
7. **CC1641 II — STF Tema 1236:** a separação de bens para maiores de 70 anos pode ser afastada por manifestação expressa de vontade em escritura pública. [STF](https://portal.stf.jus.br/jurisprudenciaRepercussao/tema.asp?num=1236). Não retirar o texto promulgado, mas impedir leitura isolada sem ressalva da tese.
8. **CC1620–1629 — Lei 12.010/2009:** representação agrupada de dispositivos revogados, não omissão de normas vigentes.

Os demais IDs dos 263 itens divergentes permanecem **sob revisão editorial e jurídica**, a serem tratados por unidade normativa com rastreabilidade de fontes primárias. As comparações idênticas **não** dispensam controle jurisprudencial (ex.: CC1641, texto literal potencialmente coincidente). Não atualizar corpus ou status automaticamente.

## Testes e integridade

- GitHub Actions #45019666293: tentativa 1 `failure` por timeouts HTTPS (4 × 20s); tentativa 2 `success` com fontes íntegras, 1.148 IDs, 111 divergências e artefato.
- GitHub Actions #45020000077: `completed/success` após correção e regressão do plural `Revogados`; última classificação válida.
- Foram executados 8 testes Python anteriores, 4 do executor da Biblioteca 22, 5 de Biblioteca 23 (incluindo o novo), controle do manifesto histórico e validação dos resultados. **Não foram reexecutados aqui** testes E2E/axe/Chromium ou 36 suítes Node integrais de produto; sem alterações em corpus/UI, esses não foram alegados.
- Nenhum merge, rebase ou force push. Nenhum arquivo de lei, anotação de estudante, revisão, baralho, ID, `forNotebook` ou status `mirror_unverified/pending` foi alterado.
- **Próximo gate:** revisar juridicamente os **263 itens divergentes** por blocos críticos, incluir fichas de fonte, efeito temporal e decisão; só promover rótulos de certificação por evidência individual, nunca pelo 100% de cotejo textual. Não executar automaticamente Biblioteca 24 ou alterar o produto.
