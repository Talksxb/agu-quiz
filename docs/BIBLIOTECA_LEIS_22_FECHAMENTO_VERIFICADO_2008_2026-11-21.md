# AGU Quiz — Biblioteca 22: fechamento verificado da matriz dos 2.008 IDs

**Data:** 21/11/2026. **Execução independente:** [GitHub Actions #44957000610](https://github.com/Talksxb/agu-quiz/actions/runs/44957000610), conclusão `success`, commit `e330834587c67dbc9cf0f4a31ab050e5ba389c21`, branch `audit/biblioteca-leis-22-reexecucao-evidencias`. **PR #76 draft**, base #73, cadeia #72 → #73 → #76. Sem merge.

## 1. Fontes oficiais byte a byte

Os HTMLs da Câmara foram obtidos no runner remoto diretamente das URLs oficiais, via `curl`, após bloqueio de DNS no executor local. `wc -c`, `sha256sum -c` e `validate_source()` passaram. Os hashes e tamanhos coincidem **exatamente** com as capturas históricas:

| Lei | URL de origem | Bytes | SHA-256 |
|---|---|---:|---|
| Código Civil, Lei nº 10.406/2002 | https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html | 1.571.920 | `6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90` |
| CPC, Lei nº 13.105/2015 | https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html | 938.199 | `0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821` |

Os próprios HTMLs **não foram republicados** no repositório nem no artefato.

## 2. Cotejo efetivo e universo

O runner executou `scripts/reexecutar-matriz-2008.py`, com os documentos oficiais íntegros e os manifestos de #72/#73. A saída contém **2.008 IDs únicos**, sendo **1.007 CC** e **1.001 CPC**, com texto do espelho e texto oficial normalizados individualmente, seus SHA-256 e classificações. Há 2.000 artigos numéricos e oito artigos interpolados. Os marcadores oficiais `L10406:art69-A` (veto) e `L13105:art529-A` (prospecção) foram corretamente identificados **fora** do universo de 2.008. Não houve IDs inesperados, ausentes ou duplicados.

| Classe textual efetivamente calculada | CC | CPC | Total |
|---|---:|---:|---:|
| `texto_normalizado_identico` | 903 | 948 | **1.851** |
| `diferenca_textual_exige_revisao` | 47 | 49 | **96** |
| `diferenca_aparente_restrita_a_nota_editorial_revisar` | 11 | 4 | **15** |
| `revogacao_agrupada_documentada` | 46 | 0 | **46** |
| **Soma** | **1.007** | **1.001** | **2.008** |

Todos os 2.008 registros têm SHA-256 de espelho e oficial com 64 caracteres; em **1.851** os dois hashes coincidem. Os **46** registros de revogação agrupada em CC757–802 têm `oficial_presente_individualmente=False` e origem em intervalo; não se simulou um dispositivo oficial individual. Não existem ausências técnicas restantes **dentro deste universo e desta versão de fonte**.

## 3. Diferença editorial antes não identificada

**Identidade localizada:** `L13105:art945` (**CPC art. 945**, revogado).

- Espelho: `Art. 945. (Revogado pela Lei nº 13.256, de 2016)`.
- Câmara: identifica revogação pela Lei nº 13.256, **de 4/2/2016**, e esclarece que entrou em vigor **no início da vigência da Lei nº 13.105/2015**.
- SHA-256 do espelho normalizado: `ba43c9b91595d1791f5147c43cfebbc7773e20283eee9ad85d0d9eabf8f1d36b`.
- SHA-256 oficial normalizado: `5de5fd558f673da6309fdcca6b4b9c04ef6f777f0d52057f3f65f6b2a273923a`.

Esta classificação decorre da **reexecução real**, não da fixture do teste sintético (que usa mesmo ID apenas como exemplo). O art. 945 permanece revogado; não inserir norma substantiva ativa.

## 4. Transições históricas realmente conciliadas

| Classe histórica reconstruída | Nova classe | IDs |
|---|---|---:|
| `texto_identico` | `texto_normalizado_identico` | 1.673 |
| `identico_ou_editorial_nao_individualizado` | `texto_normalizado_identico` | 173 |
| `identico_ou_editorial_nao_individualizado` | `diferenca_aparente_restrita_a_nota_editorial_revisar` | **1 (CPC945)** |
| `diferenca_textual` | `diferenca_textual_exige_revisao` | 96 |
| `diferenca_textual` | `diferenca_aparente_restrita_a_nota_editorial_revisar` | **14** |
| `diferenca_textual` | `texto_normalizado_identico` | **3** (CC756; CC999; CPC999) |
| `dispositivo_ausente` | `texto_normalizado_identico` | **2** (CC1000 e CPC1000) |
| `dispositivo_ausente` | `revogacao_agrupada_documentada` | **46** (CC757–802) |
| **Soma** | | **2.008** |

Diferenças textuais reportadas **não** equivalem a 96 erros jurídicos materiais. As 15 divergências classificadas como *aparentemente editoriais* requerem validação humana do conteúdo de cada parágrafo e seus efeitos. Os 46 marcadores de revogação permanecem classe separada de identidade textual.

## 5. Testes e artefato

Na execução do GitHub Actions #44957000610:
- **8 testes Python** históricos do extrator passaram;
- **4 testes Python** novos do executor passaram;
- validador de 2.008 IDs históricos concluiu;
- downloads com SHA-256 exatos passaram;
- reexecução dos **2.008 IDs** passou;
- exportação e upload do CSV passaram;
- job encerrou **`completed / success`**.

Artefato: [Matriz Biblioteca 22 — 2.008 IDs](https://github.com/Talksxb/agu-quiz/actions/runs/44957000610/artifacts/14728630161), ID GitHub `14728630161`; CSV extraído com **532.472 bytes** e SHA-256 `225b6f3832431288e4e502ea571dd9f62caa3dd884cf6e6021e7fa999ef78c84`. ZIP do GitHub: SHA-256 `e874f65765c6121697f443ad1c49d668f4b969ad29e3df02f6e66d7654f8d409`. Artefato configurado para expirar em **21/12/2026**: preservar cópia controlada do CSV para auditoria longitudinal. Somente o CSV foi exportado, não o HTML oficial.

## 6. Estado final e escopo

- Primeira passagem histórica **2.008/3.156 = 63,62%**; **1.148** sem primeira passagem. A Biblioteca 22 **não** adicionou itens fora de U=2.008.
- Estados do corpus `mirror_unverified`, `partial` e `pending` **não foram alterados**, nem textos, IDs, questões, leitor, notas e dados de estudante.
- **Não há certificação jurídica integral**. Cotejo textual não determina vigência individual, recepção constitucional, alcance de ADIs ou suficiência do histórico legislativo.
- O relatório `BIBLIOTECA_LEIS_22_EXECUCAO_GATES_2008_2026-11-21.md` registra o **bloqueio do executor local ANTES da conclusão remota** e deve ser lido como checkpoint intermediário, superado pelo run #44957000610 e por este fechamento.
- Nenhum merge/rebase/force push. **Biblioteca 23 e cotejo 1001–1100 não executados.**
