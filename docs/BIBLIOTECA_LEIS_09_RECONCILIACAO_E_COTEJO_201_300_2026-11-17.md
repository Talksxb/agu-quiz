# AGU Quiz | Biblioteca de legislação — etapa 09

## Síntese e limites

Etapa documental autorizada em 17/11/2026. Resolução **de natureza documental** da fila crítica herdada da etapa 08 e extensão opcional da primeira comparação aos arts. **201–300** do CC e do CPC, incluindo identidades com sufixo. **Não houve alteração de texto, status ou anotações do corpus**, nem certificação jurídica integral. Correções futuras exigem revisão do modelo de representação e testes próprios.

`main` revalidada em `31a47693b8f690e543f565c83208e3cdc637a547`; PRs #49–#53 e #55 abertas em **draft** e não mescladas no início. A etapa 09 deve continuar empilhada sobre a #55, sem rebase, merge ou force push. Nenhum dado privado do repositório de auditoria foi consultado ou exportado.

## Fontes primárias, publicação, vigência e efeitos

| Identidade | Fonte oficial e evidência | Conclusão segura em 17/11/2026 |
| --- | --- | --- |
| `L13105:art144`, VIII | [STF, ADI 5.953 — andamento e decisão](https://portal.stf.jus.br/processos/detalhe.asp?incidente=5481637); [Informativo STF 1.104/2023](https://www.stf.jus.br/arquivo/informativo/documento/informativo1104.htm); [CPC atualizado pela Câmara](https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html) | Julgamento virtual finalizado em **21/08/2023** declarou **inconstitucional o inciso VIII** do art. 144 do CPC. O informativo do STF tem um aparente erro de digitação isolado (`art. 114`) em seu resumo, mas transcreve corretamente art. 144 na conclusão e no excerto. A Câmara indica publicação no DOU de **04/09/2023**. O espelho conserva o texto legal com nota genérica `Vide ADI 5953`: **insuficiente como explicação de eficácia**. Há diferença de anotação judicial, não autorização para suprimir o inciso ou alterar automaticamente seu ID. |
| `L13105:art196`, parágrafo único | [Lei 15.479/2026 — publicação original na Câmara](https://www2.camara.leg.br/legin/fed/lei/2026/lei-15479-29-julho-2026-799680-publicacaooriginal-180630-pl.html), arts. 2º e 4º; [índice do CPC na Câmara](https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-norma-pl.html) | Lei de **29/07/2026**, publicada no **DOU de 30/07/2026**, acrescenta parágrafo único de conteúdo substantivo ao art. 196 sobre formato interoperável de atos processuais eletrônicos e dados compartilháveis, observada a LGPD. **Art. 4º: entrada em vigor após um ano da publicação**, portanto **não em vigor no corte 04/11/2026 nem na observação 17/11/2026** (marco esperado 31/07/2027, sujeito a conferência da contagem). O HTML consolidado atual da Câmara apresenta apenas `Parágrafo único. (Vide Lei 15.479/2026)`, ou seja, sinal prospectivo, **não o conteúdo integral**. Não importar prematuramente para o espelho vigente. |
| `L10406:art69-A` | [Veto 34/2012 — Congresso Nacional, itens 34.12.050–054](https://www.congressonacional.leg.br/pt_BR/materias/vetos/-/veto/detalhe/3493); [CC consolidado — Senado](https://legis.senado.gov.br/norma/552282/publicacao/34620807) | Caput e §§ 1º–4º do dispositivo proposto sobre conversão de fundação em sociedade empresária foram **vetados** e seguem indicados no painel como não apreciados. O CC oficial traz marcador de veto; a ausência no espelho não equivale à falta de norma vigente. Qualquer futura representação seria apenas documental, **jamais texto normativo ativo**. |

### Identidade da fonte e recorte temporal

Os HTMLs consolidados da Câmara usados nas etapas 07/08 foram reusados em 17/11/2026 para regressão e lote novo, preservando a cadeia de hashes: CC `6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90` (1.571.920 bytes; HTTP Date original `Tue, 17 Nov 2026 14:43:45 GMT`); CPC `0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821` (938.199 bytes; `Tue, 17 Nov 2026 14:43:51 GMT`). [Lei 15.479/2026 — original](https://www2.camara.leg.br/legin/fed/lei/2026/lei-15479-29-julho-2026-799680-publicacaooriginal-180630-pl.html) foi obtida por HTTPS 200, HTTP Date `Tue, 17 Nov 2026 14:54:41 GMT`, SHA-256 **`db8e4f0cf7b8428fa6ee2b6ec523759cd42a0b95a898d80daeb09f2b4739324f`**. HTMLs permanecem em armazenamento temporário, não redistribuídos. A decisão do STF e painel de vetos foram consultados por suas páginas oficiais e links identificáveis; não há alegação de captura binária com hash dessas páginas.

## Primeiro cotejo do lote 201–300

Comparador `scripts/cotejar-biblioteca-lote04.py`, função `run(cc, cpc, 201, 300)`, executado sobre os mesmos HTMLs. Retornou **201 identidades presentes nas duas fontes** (200 artigos numéricos e **CC 206-A**). **189 coincidências textuais normalizadas** e **12 diferenças**: cinco aparentemente restritas a notas editoriais, sete classificadas como divergências textuais para revisão. Nenhum artigo ausente no intervalo. Os trechos discrepantes foram inspecionados sem apagar notas ou presumir correção jurídica.

| ID | Diferença localizada e próximo tratamento |
| --- | --- |
| `L10406:art206` | Nota de revogação pela Lei 15.040/2024: Câmara explicita DOU e vacatio de um ano; espelho tem marca abreviada “Vigência”. **Prioridade temporal**, conferir efeitos da lei de seguros antes de alegar atualidade. |
| `L10406:art206-A` | O espelho omite ponto após o número e abrevia o histórico de acréscimo/alteração pelas MPs 1.040/2021, 1.085/2021 e Leis 14.195/2021 e 14.382/2022. **Histórico legislativo prioritário**, preservar ID com sufixo. |
| `L10406:art227` | Nota de revogação do caput pelo CPC/2015 e vacatio mais detalhada na Câmara; parágrafo único não deve ser tratado automaticamente como revogado. **Revisão por unidade normativa**. |
| `L10406:art228` | Incisos revogados e transformação de parágrafo com notas mais detalhadas na Câmara, Lei 13.146/2015 e 180 dias. **Temporal/editorial**, não reativar incisos. |
| `L10406:art229`, `art230` | Revogações pela Lei 13.105/2015, com notas da Câmara sobre DOU e entrada em vigor. **Editorial/temporal**. |
| `L10406:art274` | Nota de redação pelo CPC/2015, detalhamento temporal na Câmara. **Editorial/temporal**. |
| `L10406:art288` | `§ 1º` no espelho versus `§ 1o` na Câmara. **Tipografia**, não alteração normativa demonstrada. |
| `L13105:art231` | Ponto e vírgula versus ponto no inciso VIII; nota de inclusão do inciso IX pela Lei 14.195/2021 mais detalhada na Câmara. **Pontuação e histórico**. |
| `L13105:art238` | Nota de acréscimo do parágrafo único mais detalhada na Câmara. **Editorial**. |
| `L13105:art246` | Espelho traz notas repetidas em incisos e parágrafos; Câmara as consolida/detalha e identifica revogações pela Lei 14.195/2021. **Alta complexidade de estrutura**: verificar caput, incisos I–V revogados e §§ individualmente, sem declarar equivalência integral. |
| `L13105:art247` | Nota de nova redação do caput pela Lei 14.195/2021 mais detalhada na Câmara. **Editorial**. |

Classificação algorítmica `diferenca_aparente_restrita_a_nota_editorial_revisar`: `CC227/229/230/274`, `CPC247`. As sete outras diferenças mantêm `diferenca_textual_exige_revisao` por prudência. **Fila A:** 189 coincidências normalizadas, ainda sem certificação de eficácia. **Fila B:** alterações de notas, grafia e histórico a reconciliar. **Fila C:** risco jurídico/temporal (`CC206`, `CC206-A`, `CC227/228`, `CPC246`), inspeção prioritária antes de edição.

### Regressão e acumulado

- Regressão 1–200, com os mesmos hashes: **402** identidades presentes no espelho, **363** iguais, **39** divergentes e **um** marcador oficial vetado (`CC69-A`) ausente. Sufixos `CC48-A`, `49-A` e `69-A` continuam independentes.
- Acumulado 1–300: **603** artigos/identidades do espelho triados, **552** coincidências textuais, **51** diferenças, mais **um** marcador documental vetado ausente. Entre os 3.156 artigos importados nos dois diplomas, **2.553** ainda não foram cotejados nesta trilha. Não é porcentagem de certificação jurídica.
- A Lei 15.479/2026 foi **publicada antes** do corte 04/11/2026, mas tem eficácia prospectiva: nenhum ajuste de conteúdo vigente é autorizado nesta etapa.

## Testes e portão de integração

Testes sintéticos Python do comparador e 36 validações Node executados localmente (ver descrição da PR e resultado da execução). `git diff --check` sem erros. Sem patch do produto, os ensaios Chromium em cinco larguras, axe, TalkBack, backup mutável e Pages pós-merge não são aplicáveis e **não são declarados executados**; CI remoto depende da PR. Preservados oito diplomas, IDs, leitor de uma norma por vez, tags, `topic:null`, `forNotebook`, status `mirror_unverified`/`partial`/`pending`, nove categorias de backup S20 e anotações históricas.

**Próximo trabalho somente por nova autorização:** `docs/PROMPT_BIBLIOTECA_LEIS_10.md`. Não executar etapa 10 agora.
