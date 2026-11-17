# AGU Quiz | Biblioteca de legislação — etapa 10

## Escopo e limites

Etapa 10 **documental**, autorizada em 17/11/2026. Inspeção prioritária de CC arts. 206 e 206-A e CPC art. 246; extensão da primeira comparação textual aos arts. **301–400 de ambos os códigos**. Nenhuma modificação no corpus, textos, IDs, notas ou status do AGU Quiz. Comparação textual **não certifica** vigência jurídica, compatibilidade de todas as remissões, completude de incisos nem acessibilidade.

Base: `main` revalidada em `31a47693b8f690e543f565c83208e3cdc637a547`. PRs #49–#53, #55 e #56 constatadas abertas em rascunho, não mescladas. Esta etapa deve ser PR empilhada sobre #56; nenhum merge, rebase ou force push. Não acessar corpus privado de auditorias.

## Reconciliação jurídica prioritária — fontes primárias

| Dispositivo | Cadeia, vigência e efeito observados | Resolução documental / risco residual |
| --- | --- | --- |
| `L10406:art206`, § 1º, II | [Lei 15.040/2024, arts. 133 e 134](https://www2.camara.leg.br/legin/fed/lei/2024/lei-15040-9-dezembro-2024-796661-publicacaooriginal-173706-pl.html): revogação expressa **do inciso II do § 1º**, não do artigo inteiro. Lei de 09/12/2024, DOU **10/12/2024**, vacatio de um ano. Marco de eficácia já transcorrido em **04/11/2026**. | Espelho identifica revogação de forma abreviada; Câmara registra publicação e prazo. Preservar demais incisos e parágrafos. Uma futura correção editorial deve testar status e estrutura do inciso, sem retirar o art. 206. |
| `L10406:art206-A` | [Lei 14.382/2022, art. 14](https://www2.camara.leg.br/legin/fed/lei/2022/lei-14382-27-junho-2022-792893-publicacaooriginal-165616-pl.html) deu a redação; [CC atualizado pela Câmara](https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html) aponta acréscimo pela MP 1.040/2021, conversão Lei 14.195/2021, alteração pela MP 1.085/2021, conversão Lei 14.382/2022. A Lei 14.382 entrou em vigor na publicação para esse dispositivo (art. 21, II). | Texto normativo comparado parece correspondente; espelho não registra toda a cadeia e omite ponto depois de `206-A`. Manter ID com sufixo próprio e diferença em quarentena editorial/histórica. |
| `L13105:art246` | [Lei 14.195/2021, art. 44 e revogações do art. 57, XXXII](https://www2.camara.leg.br/legin/fed/lei/2021/lei-14195-26-agosto-2021-791684-publicacaooriginal-163359-pl.html): citação preferencial eletrônica; incisos I–V **do caput** revogados; § 1º-A contém novos incisos I–IV sobre vias alternativas, que **não** são aqueles incisos revogados. O texto atualizado da Câmara confirma essa estrutura. | Espelho e fonte usam anotações editoriais com escopos diferentes e datas mais detalhadas. Não declarar sem leitura inciso a inciso que todo o art. 246 é idêntico; não remover os incisos do § 1º-A. Texto do caput, incisos e parágrafos fica conservado. |

**Distinções temporais mantidas:** CPC 144, VIII foi declarado inconstitucional na ADI 5.953; CPC 196, parágrafo único acrescido pela Lei 15.479/2026 tem vigência futura (após um ano do DOU de 30/07/2026); CC 69-A é marcador vetado, não norma em vigor. Nenhum desses elementos autoriza edição automática. Corte de referência: 04/11/2026.

## Proveniência do cotejo 301–400

Reexecutado `run(CC.html, CPC.html, 301, 400)` do `scripts/cotejar-biblioteca-lote04.py` sobre os HTMLs oficiais da Câmara obtidos em 17/11/2026 e já utilizados nas etapas 07–09. CC: **1.571.920 bytes**, SHA-256 `6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90`, HTTP Date `Tue, 17 Nov 2026 14:43:45 GMT`; CPC: **938.199 bytes**, SHA-256 `0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821`, HTTP Date `Tue, 17 Nov 2026 14:43:51 GMT`. URLs: [CC](https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html), [CPC](https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html). HTMLs não republicados.

**200 identidades** numéricas existentes em ambas as fontes, **192 coincidências textuais normalizadas**, **8 diferenças**, nenhum sufixo novo ou ausência. O comparador reconheceu uma aparente diferença só em nota editorial (`CC374`) e sete diferenças textuais a revisar. Inspeção pontual dos trechos divergentes:

| ID | Tipo de diferença e fila |
| --- | --- |
| `L10406:art374` | Data de remissão editorial à Lei 10.677/2003: `22.5.2003` versus `22/5/2003`. **Editorial**. |
| `L10406:art389`, `art395` | [Lei 14.905/2024](https://www2.camara.leg.br/legin/fed/lei/2024/lei-14905-28-junho-2024-795872-publicacaooriginal-172245-pl.html): Câmara detalha redação/acréscimo, DOU **01/07/2024** e entrada em vigor em **60 dias** (regra geral relevante); espelho usa notas breves de “Produção de efeitos”. **Prioridade jurídico-temporal**, conferir unidades e regime da lei antes de atualização de metadados. |
| `L10406:art397`, `art398` | Espelho apresenta remissão `Vide Lei 13.105/2015 (Vigência)`, ausente nesses pontos da Câmara. **Anotação de proveniência**, texto legal aparentemente correspondente, pendente confirmação de pertinência. |
| `L13105:art313` | Ponto e vírgula antes de inciso IX; notas e data da Lei 13.363/2016 sobre incisos IX/X e §§, e grafia `§ 7 º` versus `§ 7º`. **Pontuação/legislativo**, revisar alcance do acréscimo. |
| `L13105:art377` | Aspas curvas versus retas em remissão `alínea “b”`. **Tipografia**. |
| `L13105:art397` | Datas e qualificação da alteração dos incisos I–III pela Lei 14.195/2021 aparecem mais completas na Câmara. **Histórico/editorial**. |

Filas: **A** = 192 identidades normalizadas, sem certificado; **B** = `CC374/397/398`, `CPC313/377/397`, diferenças de edição e remissão sob revisão; **C** = `CC389/395`, exigindo verificação de efeitos e aplicação intertemporal. Não remover notas ou classificar diferenças apenas com regex como equivalência legal.

## Progresso, integridade e validação

- Regressão cumulativa 1–300 reproduzida a partir das fontes idênticas: **603** identidades do espelho comparadas, **552** coincidentes e **51** diferenças; adicionalmente, marcador vetado `CC69-A` ausente.
- Acumulado até 400: **803** identidades do espelho com primeira comparação, **744** coincidências, **59** diferenças; marcador vetado adicional ausente. De **3.156** artigos importados em CC/CPC, **2.353** permanecem sem primeira comparação textual. Estes números **não são certificação**.
- Preservados oito diplomas, uma norma aberta por vez, IDs/sufixos, tags por matéria, saltos, índice, `topic:null`, `mirror_unverified`, `partial`, `pending`, `forNotebook`, nove categorias de backup S20 e anotações.
- Testes: 5 testes Python do comparador, 36 suítes Node, `git diff --check` (registrar execução no PR). Sem patch do produto: ensaios Chromium/axe/TalkBack, backup mutável e Pages pós-merge são **não aplicáveis**, não “aprovados”. CI remoto não presumido.

Handoff: `docs/PROMPT_BIBLIOTECA_LEIS_11.md` preparado, **não executado**.
