# AGU Quiz | Biblioteca de legislação — etapa 04

## Cotejo oficial delimitado: CC e CPC, arts. 1º–5º

**Data da consulta:** 16/11/2026 (horário de Brasília; download em 17/11/2026 UTC). **Resultado:** 10 artigos localizados, 8 coincidências integrais após normalização conservadora de espaços e 2 divergências editoriais nos textos completos. **Não se certifica vigência, integralidade dos códigos ou conformidade jurídica geral.**

### Continuidade

- Base `Talksxb/agu-quiz/main`: `31a47693b8f690e543f565c83208e3cdc637a547`, reconfirmada antes da execução. Etapas históricas: PR #44 e PR #45 mescladas.
- PR #49 (etapa 03) estava em rascunho, não integrada. Seu handoff foi lido diretamente da branch; este lote parte independentemente da `main` para não presumir seu merge.
- Branch: `audit/biblioteca-leis-04-cotejo-lote`. Nenhum arquivo de produto ou dataset foi alterado.

### Fonte oficial e prova de entrada

| Diploma | Fonte oficial da Câmara | Bytes HTML | SHA-256 bruto |
| --- | --- | ---: | --- |
| Código Civil, Lei 10.406/2002 | [texto atualizado](https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html) | 1.571.920 | `6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90` |
| CPC, Lei 13.105/2015 | [texto atualizado](https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html) | 938.199 | `0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821` |

As duas URLs retornaram HTTP 200 e HTML UTF-8 para captura direta via `curl -fsSL`, sem CAPTCHA ou autenticação. O Planalto permaneceu fonte de referência, não foi acessado por contorno de seus mecanismos de acesso. Direitos/licença de redistribuição dos HTMLs não foram demonstrados: os arquivos brutos foram mantidos **somente em `/tmp/agu-bib04/`**, fora do repositório. O relatório registra os hashes, não republica o conteúdo oficial.

Reprodução (em ambiente autorizado):

```bash
curl -fsSL 'https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html' -o /tmp/agu-bib04/cc.html
curl -fsSL 'https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html' -o /tmp/agu-bib04/cpc.html
sha256sum /tmp/agu-bib04/cc.html /tmp/agu-bib04/cpc.html
python scripts/cotejar-biblioteca-lote04.py /tmp/agu-bib04/cc.html /tmp/agu-bib04/cpc.html
```

O script extrai parágrafos HTML por biblioteca padrão Python, reconstitui cada artigo até o seguinte e lê o espelho publicado por Node. Compara o texto completo, incluindo subdivisões e notas editoriais. Normaliza espaços redundantes e espaços antes de pontuação, **sem** eliminar trechos, notas ou datas. Informa presença, hashes do texto normalizado e excertos para cada ID. São 10 comparações, sem amostragem aleatória ou inferência de cobertura adicional.

### Matriz de resultados

| ID | Resultado da comparação textual | Avaliação |
| --- | --- | --- |
| `L10406:art1` | Coincide | Sem divergência na representação normalizada |
| `L10406:art2` | Coincide | Sem divergência na representação normalizada |
| `L10406:art3` | Diverge | Notas de redação e revogação na Câmara são mais descritivas que as notas do espelho |
| `L10406:art4` | Diverge | Nota de alteração do caput e referências editoriais diferem em forma/detalhamento |
| `L10406:art5` | Coincide | Sem divergência na representação normalizada |
| `L13105:art1` | Coincide | Sem divergência na representação normalizada |
| `L13105:art2` | Coincide | Sem divergência na representação normalizada |
| `L13105:art3` | Coincide | Inclui §§ 1º–3º no cotejo da representação textual |
| `L13105:art4` | Coincide | Sem divergência na representação normalizada |
| `L13105:art5` | Coincide | Sem divergência na representação normalizada |

**Atenção:** coincidência textual não comprova autoria/validade jurídica de todas as alterações até um corte de efeitos, nem substitui controle de publicação e vigência. Os dois casos divergentes não foram automaticamente classificados como erro material de norma: há diferenças comprovadas de notas editoriais, mas a equivalência de cada segmento normativo requer cotejo específico de parágrafos/incisos e das remissões. Não substituir a anotação informativa da Câmara por mera semelhança de tema.

### Vigência e efeitos

Os arts. 3º–4º do CC apresentam anotações relativas à Lei 13.146/2015; a fonte oficial indica publicação em 07/07/2015 e regra de entrada em vigor após 180 dias. Esses dados **não** autorizam inferir efeitos retroativos nem atestam ausência de modificações posteriores em outros artigos. A etapa não auditou todas as leis modificadoras, seus dispositivos transitórios ou o estado de vigência em 16/11/2026; a expressão “texto atualizado” é a classificação editorial da fonte, não certificação do projeto.

### Preservação e testes

- **Zero alterações** em `dados/legislacao-s13.js`, `dados/codigos-cc-cpc.js`, `leitor-juridico.js`, `index.html`, tags, revisão, cronograma, questões, baralhos, `forNotebook`, nove categorias do backup S20 ou IDs de artigo. `topic:null`, `mirror_unverified`, `contentCoverage:'partial'`, `textVerification.status:'pending'` seguem preservados.
- 36 suítes locais `tests/*-validacao.js` passaram. O script de cotejo executou integralmente com os HTMLs capturados e localizou os dez IDs esperados.
- Não houve alteração de produto; portanto não se criou fixture de hashes de produto nem se executaram Chromium/axe ou ensaio mutável de navegador. Android físico e leitor de tela não testados. CI, Pages e hashes HTTPS pós-merge não são alegados como validados nesta execução.

### Próxima decisão

Expandir apenas outro lote documentado (por exemplo CC arts. 6º–20 e CPC arts. 6º–20), evoluindo o parser para divisão granular de notas/editorial versus texto normativo e registrando alterações posteriores ao snapshot LawCodex de 12/10/2026. Antes de ampliar para todo o código, revisar casos com leis supervenientes e guardar proveniência/horário dos novos downloads. **Não promover a verificação integral por uma amostra de dez artigos.**
