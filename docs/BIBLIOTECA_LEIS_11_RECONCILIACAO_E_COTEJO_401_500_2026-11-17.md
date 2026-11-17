# AGU Quiz | Biblioteca de legislação — etapa 11

## Missão e resultado

Etapa 11 documental, autorizada em 17/11/2026: verificação primária da Lei 14.905/2024 nos CC arts. 389/395, mais primeira triagem textual **CC/CPC 401–500**, incluindo artigos interpolados. **201** identidades do espelho e Câmara comparadas: **193** textos normalizados idênticos, **8** diferenças e **0** ausentes. Há um artigo com sufixo próprio, **`L10406:art421-A`**, contado separadamente. Sem mudança de corpus, sem certificação automática.

### Base e concorrência

`main` reconfirmada em `31a47693b8f690e543f565c83208e3cdc637a547`. PRs #49–#53, #55, #56 e #58 abertas em **draft**, não mescladas na retomada; esta etapa deve ser empilhada sobre #58. Sem merge, rebase ou force push; não houve acesso/exportação da auditoria privada. Preservados os oito diplomas e todos os contratos de dados e navegação do Quiz.

## Reconciliando vigência e efeitos — Lei 14.905/2024

Fonte primária: [Lei 14.905, de 28/06/2024, publicação original da Câmara](https://www2.camara.leg.br/legin/fed/lei/2024/lei-14905-28-junho-2024-795872-publicacaooriginal-172245-pl.html), publicada no **DOU de 01/07/2024**. Seu art. 2º atualizou dispositivos do CC sobre atualização monetária, juros e obrigações; seu **art. 5º distingue vigência formal e produção de efeitos**:

- A lei **entrou em vigor na publicação** (01/07/2024).
- O **§ 2º do art. 406** do CC, sobre metodologia de cálculo e divulgação da taxa legal pelo CMN/Banco Central, produziu efeitos **na publicação**.
- **Os demais dispositivos** passaram a produzir efeitos **60 dias após a publicação**. Portanto, CC **389** (inclusive parágrafo único sobre IPCA) e **395** (mora, juros e atualização monetária) já tinham efeitos no corte histórico **04/11/2026**.
- A interpretação intertemporal em casos concretos e o eventual regime contratual específico não são atestados aqui. O espelho reproduz redação correspondente nesses dois dispositivos, mas as notas genéricas `Produção de efeitos` não explicitam a regra temporal nem a exceção do art. 406 § 2º. Recomendação: anotação jurídica explicativa com fonte e recorte, somente após tarefa específica de alteração de produto com testes de persistência/backup; **não patch nesta etapa**.

Permanecem registrados, sem recriação ou descarte, os estados de `CC206` (revogação pontual em vigor), `CC206-A` (cadeia legislativa), `CPC246` (caput I–V revogados, incisos do § 1º-A não confundidos), `CPC144 VIII` (ADI 5.953) e `CPC196` (Lei 15.479/2026 com efeitos futuros). O marcador vetado `CC69-A` continua documental, não norma ativa.

## Proveniência dos textos oficiais 401–500

Comparador reexecutável `scripts/cotejar-biblioteca-lote04.py`, `run(CC.html, CPC.html, 401, 500)`, usando a mesma captura HTTP/2 200 das etapas 07–10 em 17/11/2026:

| Fonte | HTTP Date (GMT) | Bytes | SHA-256 bruto |
| --- | --- | ---: | --- |
| [CC — consolidado Câmara](https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html) | `Tue, 17 Nov 2026 14:43:45 GMT` | 1.571.920 | `6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90` |
| [CPC — consolidado Câmara](https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html) | `Tue, 17 Nov 2026 14:43:51 GMT` | 938.199 | `0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821` |

Os arquivos oficiais não foram republicados. A igualdade de hashes com a trilha anterior permite repetir o cotejo, mas não determina vigência individual. O resultado JSON do comparador contém IDs, presença, excertos e hashes do texto normalizado.

## Matriz de diferenças por dispositivo

| ID | Natureza localizada e fila |
| --- | --- |
| `L10406:art404` | Redação do caput pela Lei 14.905/2024: anotações de data, publicação e efeitos detalhadas na Câmara; espelho abrevia. **Temporal/editorial**, preservar conteúdo do parágrafo único. |
| `L10406:art406` | Caput e §§ 1º–3º com anotações distintas; **atenção especial ao § 2º**, que produziu efeitos na publicação, ao contrário dos demais dispositivos alterados pela Lei 14.905. **Prioridade normativa-temporal**, nenhuma reescrita automática. |
| `L10406:art418` | Incisos I/II e caput com notas de acréscimo/redação da Lei 14.905/2024 resumidas no espelho. **Temporal/editorial**. |
| `L10406:art421` | Histórico de MP 881/2019 convertida na Lei 13.874/2019 no parágrafo único aparece com detalhe diferente. **Proveniência**, texto aparentemente correspondente. |
| `L10406:art421-A` | **ID individual com sufixo**. Ponto após o identificador e notas repetidas por inciso no espelho versus nota de artigo acrescido pela Lei 13.874/2019 na Câmara. **Estrutural/editorial**, preservar índice/âncora e não incorporar ao art. 421. |
| `L10406:art456` | Ambos registram revogação pelo CPC/2015; Câmara detalha DOU/vacatio. **Aparentemente restrito a nota editorial**, não reativar artigo. |
| `L13105:art478` | Espaço tipográfico em `§ 1º` versus `§ 1 º`. **Tipografia**, manter diferença na matriz até revisão. |
| `L13105:art499` | Anotação do parágrafo único acrescido pela Lei 14.833/2024 (data explícita na Câmara versus resumida no espelho). **Editorial/histórico**, confirmar pertinência temporal antes de qualquer patch. |

O classificador marcou `CC456` como `diferenca_aparente_restrita_a_nota_editorial_revisar`, as outras sete como `diferenca_textual_exige_revisao`. A inspeção pontual indica que muitas diferenças se concentram em notas/formatos, mas **não** demonstra equivalência normativa integral linha por linha. Fila A: **193** coincidências textuais sem certificação; B: `CC421/421-A/456`, `CPC478/499`, com revisão editorial/proveniência; C: `CC404/406/418`, exigindo atenção temporal e preservação de estrutura.

## Regressão, progresso e testes

- Regresso com mesmos HTMLs de 1–400: **803** identidades presentes no espelho triadas, **744** iguais e **59** com diferenças, mais marcador vetado `CC69-A` oficial ausente.
- Acumulado 1–500: **1.004** identidades do espelho em primeira comparação, **937** idênticas normalizadas, **67** com diferenças, e **um** marcador oficial vetado sem espelho. Dos **3.156** artigos importados no CC/CPC, **2.152** permanecem sem primeira comparação textual. O percentual de cobertura **não é** certificação jurídica.
- Preservados oito diplomas, `topic:null`, `mirror_unverified`, `partial`, `pending`, IDs, sufixos, tags, uma norma por vez, saltos, janela de índice, `forNotebook`, nove categorias S20, leitor, baralhos e caderno.
- Testes locais do extrator Python e 36 suítes Node, além de `git diff --check` (resultados na PR). Sem patch do produto, Chromium em cinco larguras, axe, TalkBack, backup mutável e Pages após merge **não aplicáveis** e não executados. CI remoto não presumido.

Próxima etapa autossuficiente em `docs/PROMPT_BIBLIOTECA_LEIS_12.md`, **não executada**.
