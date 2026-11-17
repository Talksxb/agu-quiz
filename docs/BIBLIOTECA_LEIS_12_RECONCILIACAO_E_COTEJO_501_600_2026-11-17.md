# AGU Quiz | Biblioteca de legislação — etapa 12

## Resultado e limites

Etapa documental de 17/11/2026: reconciliação primária dos arts. **404, 406 e 418 do Código Civil** com a Lei 14.905/2024, seguida de primeira comparação **CC/CPC 501–600**, por IDs independentes, com sufixos. **200** artigos numéricos do espelho comparados: **194** textos normalizados idênticos, **6** diferentes. Detectado ainda um marcador oficial adicional **`L13105:art529-A`**, sem ID no espelho, cujo conteúdo remete a legislação de eficácia futura; não é artigo substantivo vigente a importar. Nenhum corpus ou produto foi alterado; não há certificação jurídica.

### Retomada

`Talksxb/agu-quiz/main` em `31a47693b8f690e543f565c83208e3cdc637a547` na verificação de abertura. PRs #49–#53, #55, #56, #58 e #59 abertas em draft, sem merge na retomada. Esta etapa deve ser empilhada sobre a **#59**, sem alterar a `main`, rebase, force push ou mesclar frentes concorrentes. As bases de auditoria privadas não foram acessadas nem exportadas.

## Reconciliação jurídica: Lei 14.905/2024

Fonte primária: [Lei 14.905/2024 — publicação original, Câmara](https://www2.camara.leg.br/legin/fed/lei/2024/lei-14905-28-junho-2024-795872-publicacaooriginal-172245-pl.html), publicada no DOU de **01/07/2024**. O **art. 5º** diferencia a **entrada em vigor na publicação** da **produção de efeitos**: o **§ 2º do art. 406 do CC** produziu efeitos na data da publicação, enquanto os demais dispositivos alterados produziram efeitos **60 dias após a publicação**. Todas essas datas antecedem o corte de **04/11/2026**.

| Dispositivo | Reconciliação normativa | Tratamento |
| --- | --- | --- |
| `L10406:art404` | Caput modificado para disciplinar perdas e danos nas obrigações pecuniárias, atualização monetária, juros, custas, honorários e pena convencional; notas resumidas no espelho não explicitam integralmente a cronologia do art. 5º. | **Temporal/editorial**. Conservar parágrafo único e texto literal; nenhuma edição automática. |
| `L10406:art406` | Taxa legal referida à Selic deduzida do índice de atualização do art. 389, parágrafo único; **§ 2º** atribui ao CMN metodologia de cálculo e divulgação pelo Banco Central e foi a **exceção temporal** com efeitos imediatos; §§ 1º/3º integram o novo regime. | **Prioridade normativa-temporal**. Preservar §§ e notas; anotação jurídica futura condicionada a patch autorizado. |
| `L10406:art418` | Regime de arras com hipóteses dos incisos I e II, pela Lei 14.905/2024, observado o regime de efeitos diferidos. | **Temporal/editorial**. Conservar caput, incisos e cadeia legislativa. |

A coincidência de redação principal não resolve a aplicação intertemporal a relações anteriores ou condições contratuais específicas. Não há substituição de juízo jurídico por comparação de strings.

## Proveniência do lote 501–600

Comparador reexecutável `scripts/cotejar-biblioteca-lote04.py`, função `run(CC.html, CPC.html, 501, 600)`, com arquivos oficiais capturados via HTTP/2 200 em 17/11/2026. Mantidas as mesmas capturas e hashes das etapas anteriores:

| Fonte oficial | HTTP Date (GMT) | Bytes | SHA-256 bruto |
| --- | --- | ---: | --- |
| [CC consolidado — Câmara](https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html) | `Tue, 17 Nov 2026 14:43:45 GMT` | 1.571.920 | `6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90` |
| [CPC consolidado — Câmara](https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html) | `Tue, 17 Nov 2026 14:43:51 GMT` | 938.199 | `0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821` |

O arquivo JSON do comparador é reprodutível pelos mesmos HTMLs; contém presença e hash normalizado de cada ID. Uma fonte consolidada capturada em 2026 pode conter anotações prospectivas que **não** devem ser consideradas normas vigentes no corte histórico.

## Matriz de diferenças e prioridade

| ID | Achado, risco e encaminhamento |
| --- | --- |
| `L10406:art591` | Anotação de alteração pela Lei 14.905/2024 mais abreviada no espelho; diferença **editorial/temporal**, não autoriza atualizar texto sem cotejo individual. |
| `L13105:art513` | Diferença de pontuação na enumeração (ponto e vírgula junto ao inciso IV); **tipografia**, reter na matriz. |
| `L13105:art521` | Hifenização e nota de alteração do inciso III pela Lei 13.256/2016 com proveniência distinta; **editorial/histórica**. |
| `L13105:art525` | Espaçamento em `cumprir-lhe-á`, pontuação antes de § 8º e remissões `(Vide AR 2876)` no espelho ausentes no consolidado da Câmara; **editorial/remissão judicial**, sem exclusão automática. |
| `L13105:art535` | **RISCO JURÍDICO PRIORITÁRIO**: a Câmara explicita a decisão do STF na **ADI 5.492** sobre a inconstitucionalidade da expressão **“de banco oficial”**, no art. 535, § 3º, II, e interpretação conforme para permitir instituição financeira pública ou privada. O espelho contém remissões genéricas às ADIs 5.534 e 5.492, sem explicitar esse alcance. STF, [Informativo 1092](https://www.stf.jus.br/arquivo/informativo/documento/informativo1092.htm) e [notícia oficial de 04/05/2023](https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=506742&ori=1). **Não apagar o literal nem reescrever decisão por inferência**; requer anotação jurídica rastreável em tarefa própria. |
| `L13105:art537` | Anotações sobre Lei 13.256/2016 e efeitos do CPC diferem em detalhamento; **editorial/histórica**. |
| `L13105:art529-A` | **Marcador oficial de sufixo sem espelho**, texto consolidado: `Art. 529-A. (Vide Lei nº 15.479, de 29/7/2026)`, hash normalizado `226c9b83391e601e59b8f365b61f884c3e81fbd941c8c3c4f72ee577db913d3c`. Remissão à Lei 15.479/2026 com eficácia futura (vacatio de um ano); **não confundir marcador prospectivo com dispositivo substantivo vigente em 04/11/2026**. Não criar ID automaticamente. |

Fila A: **194** coincidências normalizadas, ainda não certificadas. Fila B: `CC591`, `CPC513/521/525/537` por divergências editoriais ou remissões; fila C: `CPC535` pelo alcance da ADI 5.492, e `CPC529-A` para controle prospectivo de eficácia. Os achados anteriores (inclusive `CC69-A` vetado e `CPC196` prospectivo) seguem preservados.

## Progresso, integridade e verificação

- Acumulado da **primeira comparação textual CC/CPC**: **1.204** IDs de artigos no espelho, **1.131** com texto normalizado idêntico e **73** diferenças. **Dois marcadores adicionais oficiais sem espelho**, não somados aos 1.204: `CC69-A` vetado e `CPC529-A` prospectivo. De **3.156** artigos importados originalmente nos dois diplomas, **1.952** ainda não foram cotejados. Isso **não** mede certificação jurídica integral.
- Preservados os oito diplomas, status pendentes (`mirror_unverified`, `partial`, `pending`), `topic:null`, IDs/âncoras, notas, sufixos, tags por matéria, leitura de uma norma por vez, `forNotebook`, nove categorias S20, baralhos, backups e dados do estudante.
- Sem patch de produto: testes Chromium em cinco larguras, axe (`violations`/`incomplete`/`passed`), TalkBack, backup mutável, CI de produto e Pages pós-merge **não aplicáveis** nesta etapa documental. Execução efetiva dos testes locais e estado da PR registrados no fechamento.

Próximo handoff autossuficiente: `docs/PROMPT_BIBLIOTECA_LEIS_13.md`. **A etapa 13 não foi executada.**
