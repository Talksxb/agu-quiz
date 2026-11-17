# AGU Quiz | Biblioteca de legislação — etapa 07 — lote ampliado

## Resultado e limite de certificação

**Escopo ampliado a pedido do estudante:** arts. 41–100 de **cada** código, mais os dispositivos interpolados com sufixo dentro desse intervalo. Foram confrontados **122 artigos presentes no espelho do Quiz** (120 numéricos + CC 48-A/49-A), e **um marcador adicional existente apenas na fonte oficial** (CC 69-A, vetado). Dos 122 artigos do Quiz: **101 textos normalizados coincidem**, **21 apresentam diferenças textuais a revisar**. O marcador CC 69-A permanece **ausente do espelho**, não sendo classificado como simples divergência editorial.

Não houve promoção da verificação de vigência, integralidade ou classificação curricular. As diferenças não foram convertidas em correções automáticas nem declaradas erros de direito. Esta é uma primeira passagem textual do lote ampliado, com itens divergentes preservados em quarentena editorial.

### Base e concorrência

- `main` confirmada em `31a47693b8f690e543f565c83208e3cdc637a547` no início. PRs #49, #50, #51 e #52 abertas em rascunho, não mescladas. Etapa 07 empilhada sobre a branch da PR #52 para preservar scripts, testes e resultados anteriores. Não houve rebase, merge ou force push.
- Checkpoints 03–06, extrator de cotejo e contratos de leitura e backup examinados. Não foi consultada nem exportada a auditoria privada `Talksxb/agu-auditoria`.

### Fontes oficiais e cadeia de bytes

HTMLs obtidos por `curl -fsSL -D` das páginas atualizadas da Câmara, sem credenciais nem contorno de CAPTCHA, em **17/11/2026 UTC** (16/11/2026 em Brasília), ambos HTTP/2 200, `text/html; charset=UTF-8`.

| Fonte | HTTP Date | Bytes | SHA-256 bruto |
| --- | --- | ---: | --- |
| [Código Civil — Lei 10.406/2002](https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html) | `Tue, 17 Nov 2026 02:55:52 GMT` | 1.571.920 | `6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90` |
| [CPC — Lei 13.105/2015](https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html) | `Tue, 17 Nov 2026 02:55:59 GMT` | 938.199 | `0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821` |

Os hashes permanecem iguais aos das etapas 04–06, permitindo repetição com a mesma versão. Os HTMLs estão somente em armazenamento temporário de trabalho, não no GitHub; não se presume licença de redistribuição. O estado de páginas consultadas em 16/11/2026 **não** constitui certificação da eficácia de todas as leis modificadoras naquela data.

### Ajuste importante do comparador

O extrator anterior interpretava `Art. 48-A`, `49-A` e `69-A` como continuação do artigo numérico anterior. A etapa 07 introduziu reconhecimento expresso do sufixo, inventário em separado e união de IDs presentes na Câmara ou no espelho. Isso eliminou falsos positivos dos arts. 48, 49 e 69 e revelou a lacuna de cobertura do **art. 69-A (vetado pela Lei 12.715/2012)** no espelho. Nenhum ID anterior foi removido ou reescrito; o marcador ausente merece tratamento próprio, com teste de migração/continuidade, antes de eventual inclusão no produto.

O script `scripts/cotejar-biblioteca-lote04.py` passou a devolver linhas individuais para artigos com sufixo, com hash do conteúdo e estados `mirror_present`/`official_present`. O teste sintético adicional comprova que um artigo 48-A não contamina o art. 48, além de verificar 49-A. O extrator preserva o resultado dos lotes 1–40.

### Matriz do lote ampliado

| Diploma | Comparação | IDs |
| --- | --- | --- |
| Código Civil | Diferenças textuais pendentes de revisão individual | `41`, `44`, `50`, `54`, `57`, `59`, `60`, `62`, `66`, `67`, `96`, `48-A`, `49-A` |
| CPC | Diferenças textuais pendentes de revisão individual | `46`, `52`, `53`, `63`, `75`, `77`, `82`, `85` |
| Código Civil | Dispositivo oficial sem correspondência no espelho | `69-A` — marcador **VETADO**, não texto normativo vigente |
| Ambos | Demais dispositivos numéricos 41–100, excluídas as diferenças acima | **101 representações coincidentes após normalização** |

**Natureza das diferenças examinadas:** várias residem em notas de autoria ou emenda com datas mais detalhadas na Câmara, abreviações de referências a julgados, pontuação tipográfica ou número ordinal; porém nem todos os 21 casos foram cotejados manualmente inciso por inciso. Portanto foram mantidos como `diferenca_textual_exige_revisao`, mesmo quando a hipótese editorial é forte. Não é correto rotular todo o lote como equivalência normativa certificada.

Pontos concretos que exigem atenção:

1. **CC 48-A:** há texto normativo aparentemente correspondente, mas a Câmara explicita a inclusão pela Lei 14.195/2021 e posterior redação pela MP 1.085/2021 convertida na Lei 14.382/2022; o espelho resume o histórico como inclusão pela Lei 14.382/2022. A divergência de cadeia legislativa não deve ser apagada por equivalência aproximada.
2. **CC 49-A:** o espelho repete anotação de inclusão em caput e parágrafo; a Câmara a associa ao artigo acrescido pela Lei 13.874/2019. Conferir escopo e efeito da anotação antes de correção editorial.
3. **CC 69-A:** a Câmara apresenta indicação de veto na Lei 12.715/2012, não encontrada como artigo importado no espelho. Não gerar artigo normativo ativo para suprir essa lacuna; primeiro decidir se o leitor deve representar vetos documentais.
4. **CPC 46/52/53:** diferenças incluem referências a atos judiciais e suas abreviações; conferir os julgados e a redação normativa separadamente.

### Reprodutibilidade

Após baixar as duas URLs para `/tmp/agu-bib04/cc07.html` e `/tmp/agu-bib04/cpc07.html`, conferir seus hashes acima e executar:

```bash
python -m unittest discover -s tests -p 'test_biblioteca_leis_05.py'
python -c "import importlib.util,json;s=importlib.util.spec_from_file_location('x','scripts/cotejar-biblioteca-lote04.py');m=importlib.util.module_from_spec(s);s.loader.exec_module(m);print(json.dumps(m.run('/tmp/agu-bib04/cc07.html','/tmp/agu-bib04/cpc07.html',41,100),ensure_ascii=False,indent=2))"
```

O JSON resultante contém IDs, presença em cada fonte, classes, excertos e SHA-256 do texto normalizado. A representação textual não substitui comparação dos metadados de publicação e efeitos dos atos modificadores.

### Integridade, regressões e testes

- **5 testes Python sintéticos passaram**, incluindo sufixos; **36 suítes Node existentes passaram**.
- Regressão 1–40: 74 identidades textuais e seis diferenças históricas, todas preservadas; fontes HTML com hashes idênticos aos lotes anteriores.
- Nenhuma alteração em `dados/codigos-cc-cpc.js`, `dados/legislacao-s13.js`, leitor, UI, IDs, `topic:null`, tags editoriais, sessão, revisão, questões, baralhos, cronograma, `forNotebook` ou backup S20 de nove categorias. Permanecem `mirror_unverified`, `partial`, `pending` para os códigos.
- Sem patch do produto, **não** houve Chromium/axe em viewports, TalkBack real, backup mutável ou verificação de Pages pós-merge. Não se declara CI remoto aprovado antes de sua execução, nem certificação WCAG ou vigência.

### Progresso acumulado e decisão de próximo lote

Etapas 04–07: **202 artigos efetivamente presentes no espelho examinados** (80 anteriores + 122 novos), dos quais **175 coincidem textualmente** e **27 exigem revisão das diferenças**; **um dispositivo oficial vetado** adicional foi identificado sem representação no espelho. Entre os 3.156 artigos importados originalmente nos dois códigos, permanecem **2.954 sem primeira comparação textual neste fluxo**. Esse progresso não é porcentagem de certificação.

Próxima etapa recomendada: **não** aumentar cegamente a certificação. É possível rastrear em lotes de 100–200 artigos com triagem automatizada, mantendo uma fila separada para divergências e anotações legislativas, desde que se preserve verificação jurídica individual e uma revisão específica da lacuna 69-A. A etapa 08 não é executada aqui.
