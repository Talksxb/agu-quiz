# AGU Quiz | Biblioteca de legislação — etapa 05
## Cotejo oficial delimitado dos artigos 6º–20 — 16/11/2026 (Brasília)

**Resultado:** 30 artigos cotejados com fonte oficial da Câmara: **27 representações completas coincidentes** após normalização de espaços e **3 diferenças aparentes limitadas a notas editoriais**, ainda sujeitas a verificação humana. Nenhuma diferença normativa foi demonstrada no lote; isso não significa certificação jurídica, nem prova inexistência de divergências nos demais 3.116 artigos dos dois códigos.

### Continuidade e concorrência

- `main` reconfirmada em `31a47693b8f690e543f565c83208e3cdc637a547`. As PRs documentais #49 (etapa 03) e #50 (etapa 04) estavam **abertas, em rascunho e não mescladas** na abertura. Esta etapa depende do script da PR #50; branch própria `audit/biblioteca-leis-05-cotejo-lote`, proposta como PR empilhada sobre a etapa 04, sem mesclar nem alterar as PRs antecedentes.
- Fontes e corpus espelhado da etapa 01 mantidos. Script anterior reexecutado no mesmo corpo oficial; arts. 1º–5º: 8 exatos e 2 diferenças que continuam pendentes (CC 3º–4º), sem promoção retroativa.
- Não houve atualização de texto jurídico, UI, metadados, IDs, vínculos, notas pessoais ou banco de dados. Apenas extrator offline, teste sintético e documentação são alterados.

### Prova da fonte oficial

Captura direta HTTPS com `curl -fsSL -D` em **17/11/2026 UTC**, sem autenticação nem contorno de proteção do Planalto. URLs primárias:

| Diploma | URL oficial | Date HTTP/2 | Bytes | SHA-256 dos bytes |
| --- | --- | --- | ---: | --- |
| CC, Lei 10.406/2002 | https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html | `Tue, 17 Nov 2026 02:17:25 GMT` | 1.571.920 | `6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90` |
| CPC, Lei 13.105/2015 | https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html | `Tue, 17 Nov 2026 02:17:32 GMT` | 938.199 | `0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821` |

Ambas retornaram HTTP/2 200 com `content-type: text/html; charset=UTF-8`; não foi fornecido ETag ou Last-Modified. Os hashes coincidem com os bytes da etapa 04, evidenciando estabilidade dos downloads entre as duas capturas, **não** uma revisão jurídica externa ou garantia de atualizações futuras. Arquivos HTML oficiais permanecem em diretório temporário, não republicados por ausência de licença de redistribuição demonstrada.

### Método e melhoria de extrator

O `scripts/cotejar-biblioteca-lote04.py` agora aceita faixa parametrizada por função (padrão 1–5 preservado), remove títulos estruturais de capítulos/seções que anteriormente contaminavam o dispositivo precedente e identifica se mudanças textuais se situam dentro de parênteses com marcadores editoriais como “Redação dada”, “Revogado”, “Vide” e “Vigência”. A classificação **`diferenca_aparente_restrita_a_nota_editorial_revisar` é diagnóstico, nunca certificação automática**; parênteses substantivos como “(dezoito)” não são excluídos. A comparação integral de texto ainda inclui incisos, parágrafos e notas nas representações concatenadas; ela não atribui IDs granulares novos. Três testes Python sintéticos exercitam títulos, anotação e parênteses normativos.

Reprodução, a partir do checkout que contenha o extrator e das duas fontes baixadas:

```bash
python -m unittest discover -s tests -p 'test_biblioteca_leis_05.py'
python scripts/cotejar-biblioteca-lote04.py /tmp/agu-bib04/cc05.html /tmp/agu-bib04/cpc05.html
python -c "import importlib.util,json;s=importlib.util.spec_from_file_location('x','scripts/cotejar-biblioteca-lote04.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);print(json.dumps(m.run('/tmp/agu-bib04/cc05.html','/tmp/agu-bib04/cpc05.html',6,20),ensure_ascii=False,indent=2))"
```

### Matriz de lote

| Diploma | Coincidência textual normalizada | Diferença editorial aparente, revisão pendente |
| --- | --- | --- |
| CC | arts. **6, 7, 8, 9, 11, 12, 13, 14, 15, 16, 17, 18 e 19** | arts. **10 e 20** |
| CPC | arts. **6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19 e 20** | art. **12** |

As três diferenças residuais foram inspecionadas no texto completo:

1. **CC art. 10, inciso III:** ambos indicam revogação pela Lei 12.010/2009. A Câmara detalha data de 03/08/2009, publicação no DOU de 04/08/2009 e 90 dias até a entrada em vigor; o espelho informa a revogação de forma abreviada. É diferença de anotação, não se observou alteração do enunciado dos incisos I–II.
2. **CC art. 20:** o espelho indica “Vide ADIN 4815”, enquanto a Câmara identifica a ADI 4.815/2012 e informa publicação em 26/06/2015. O caput e parágrafo único coincidiram textualmente. Os efeitos do julgamento não foram auditados nesta etapa e não devem ser inferidos do mero link.
3. **CPC art. 12:** ambos exibem a regra de ordem cronológica preferencial e seus desdobramentos. A Câmara fornece anotação detalhada da Lei 13.256/2016 (04/02/2016) e informa entrada em vigor no começo da vigência do CPC; o espelho resume redação/“Vigência”. Não confundir a data da lei modificadora com efeitos do próprio CPC sem examinar a norma transitória.

### Corte jurídico e efeitos

Este cotejo usa o estado das páginas observado em 16/11/2026 (Brasília), mas **não certifica que cada emenda aplicável até esse instante esteja incorporada**. Foram verificadas, apenas na representação editorial dos artigos divergentes, referências à Lei 12.010/2009, à Lei 13.256/2016 e à ADI 4.815. Publicação e anotações temporais não foram confrontadas integralmente com cada ato original e seus dispositivos transitórios. Classificar os três itens como **pendentes de verificação jurídica de efeitos**, sem emitir conclusão de vigência global.

### Integridade, testes e escopo não executado

- **36 suítes Node históricas aprovadas** nesta base; **3 testes Python sintéticos aprovados**; lote de 30 artigos e regressão de 10 artigos anteriores executados com os HTMLs capturados.
- Não houve alteração de `dados/codigos-cc-cpc.js`, `dados/legislacao-s13.js`, `index.html`, `leitor-juridico.js`, `forNotebook` ou backup. Permanecem oito normas, `topic:null` nos códigos, `mirror_unverified`, `partial`, `pending`, identificadores e anotações locais. Nenhum conteúdo privado ou nova legislação foi importado.
- Sem patch de produto: Chromium/axe em cinco viewports, backup mutável e verificação Pages pós-merge **não executados** nesta etapa; não se declara conformidade WCAG, Android real ou produção atualizada. Não foi gerada nova fixture de hashes de produto porque esses arquivos não mudaram.

### Próxima etapa

O handoff da etapa 06 pode delimitar CC/CPC arts. 21º–40º, com prioridade na verificação dos atos modificadores e na melhoria do extrator para notas fora de parênteses/HTML semântico. Não extrapolar a certificação por acumulação de lotes sem cobertura de dispositivos e eficácia temporal. A etapa 06 não é executada aqui.
