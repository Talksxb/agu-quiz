# AGU Quiz | Biblioteca de legislação — etapa 16

## Resultado e limites

Execução **documental**, em 17/11/2026, com corte de auditoria jurídica **04/11/2026**. Foram examinadas **201 identidades** de CC/CPC 901–1000: 200 artigos numéricos e `CC980-A` revogado. Resultado **bruto** do comparador: **173 textos normalizados idênticos, 25 diferenças textuais, uma diferença editorial e duas ausências técnicas**. Não alterar o corpus ou presumir que uma classe automática certifica vigência, integridade ou jurisprudência.

## Continuidade e proveniência

`Talksxb/agu-quiz/main` em `31a47693b8f690e543f565c83208e3cdc637a547` no início. PR #64 **aberta, draft, não mesclada, mergeable**, base `audit/biblioteca-leis-14-reconciliacao-701-800`, cabeça `audit/biblioteca-leis-15-reconciliacao-801-900`; esta etapa deve ser empilhada sobre #64, sem merge, rebase ou force push. Preservar cadeia #49–#53, #55, #56, #58–#60, #62–#64, sem afetar frentes concorrentes.

Comparação reexecutável: `scripts/cotejar-biblioteca-lote04.py`, função `run(CC, CPC, 901, 1000)`. Fontes oficiais arquivadas em captura da Câmara, idênticas por hash às capturas recentes:

| Documento | Bytes | SHA-256 bruto |
| --- | ---: | --- |
| [Código Civil, texto consolidado](https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html) | 1.571.920 | `6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90` |
| [CPC, texto consolidado](https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html) | 938.199 | `0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821` |

O sufixo `CC980-A` é contabilizado separadamente, com hash SHA-256 do texto oficial normalizado `02522d1b87dafe981d8ecd2be2955d895e4062ccff1ac6b2b3e9a859ba74741d`; o consolidado registra a revogação pela MP 1.085/2021 convertida na **Lei 14.382/2022**, e o espelho registra a revogação pela lei. Não reativar antiga EIRELI.

## Reconciliação jurídica herdada da etapa 15

**CPC840, I — ADI 5.492.** O STF declarou inconstitucional a expressão **“na falta desses estabelecimentos”** e conferiu interpretação conforme à disciplina dos depósitos judiciais, admitindo instituições públicas ou privadas mediante observância das exigências constitucionais de contratação. A [notícia oficial do STF](https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=506742&tip=UN), o [andamento da ADI 5.492](https://portal.stf.jus.br/processos/detalhe.asp?incidente=4959031) e o [texto consolidado do CPC](https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html) sustentam a distinção. No **CPC535, §3º, II**, a controvérsia e o dispositivo recaem sobre **“de banco oficial”** no regime de pagamento requisitado: não intercambiar frases, incisos ou efeitos. O espelho mantém a literalidade promulgada e remissão genérica à ADI; recomendar nota jurídica rastreável separada, não reescrever a lei. **Não foi obtida nesta etapa transcrição integral certificada do acórdão nem comprovada a data precisa de publicação do trânsito**; pendência de validação fina em fonte STF antes de rotular nota como integralmente certificada.

**CC819-A.** O consolidado assinala `VETADO na Lei nº 10.931, de 2/8/2004`; o espelho traz `VETADO` com anotação de inclusão. O comando normativo é inexistente por veto: reter o identificador e status vetado, não produzir obrigação ativa. **CC853-A.** Agente de garantia, introduzido pela [Lei 14.711/2023](https://www2.camara.leg.br/legin/fed/lei/2023/lei-14711-30-outubro-2023-794873-normaatualizada-pl.html): preservar caput, §§ 1º–8º e incisos, ainda que as notas de origem estejam distribuídas diferentemente no espelho e na Câmara. Sem simplificação automática.

## Limitações do extrator — duas situações distintas

1. **Intervalos CC757–802:** 46 artigos expressamente revogados pela Lei 15.040/2024, em vigor desde 10/12/2025, mas consolidados na Câmara como `Arts. 757 a 777`, `Arts. 778 a 788`, `Arts. 789 a 802`. O extrator só reconhece `Art. N`, anexa as três linhas ao art. 756 e aponta ausências artificiais. Fixture sugerida: HTML pequeno com art. 756, três intervalos revogados e art. 803; teste inicialmente falhando deve exigir `CC756` sem os intervalos, `range_revoked` separado cobrindo os **46 IDs**, nenhuma norma reativada e manutenção das contagens brutas históricas. **Proposta, não patch implementado.**
2. **Separador de milhar:** `official_articles` aceita `Art. 999.` mas não `Art. 1.000.`; neste lote tanto `CC1000` quanto `CPC1000` aparecem como `dispositivo_ausente` apesar de estarem presentes no espelho e no consolidado. Seu texto, e artigos `1.001+`, são indevidamente anexados ao **art. 999**, gerando duas diferenças artificiais adicionais. Fixture sugerida com `Art. 999.`, `Art. 1.000.`, `Art. 1.001.` em ambos os diplomas, garantindo encerramento correto do 999, captura do 1000, rejeição de anexação do 1001 e controle do limite de lote. **Não aplicar correção e não reclassificar formalmente estatísticas sem teste regressivo.**

## Triagem de divergências 901–1000

| Grupo | IDs | Observação técnica/jurídica |
| --- | --- | --- |
| CC com diferenças (10, inclusive sufixo) | 927, 937, 964, 968, 971, 974, 985, 996, 999, 980-A | 927: referência editorial às ADIs 6.792/7.055; **937: §§1º e 2º vetados visíveis apenas na Câmara**; 964, 968, 971, 974: pontuação/notas de origem a conferir; 985 e 996: subtítulos anexados ao espelho; 999: contaminação pelo art. 1000 e seguintes; 980-A: histórico de revogação mais completo na Câmara. |
| CPC com diferenças (15) | 913, 916, 921, 927, 932, 958, 966, 967, 979, 982, 983, 986, 988, 998, 999 | 913: remissão editorial à **Lei 15.479/2026** presente só na Câmara; 916: pontuação; 921, 966, 988: notas de alteração; 927, 932, 979, 998: modificações **Lei 15.484/2026** já refletidas no espelho com detalhes editoriais distintos, exigir conferência de texto/vigência e eventual vacatio; 958, 982, 983, 986: hifenização incorreta na extração oficial; **967**: Câmara apresenta `parttes, afim` versus espelho `partes, a fim`, provável erro gráfico na fonte oficial, não corrigir espelho automaticamente; 999: contaminação pelo 1000+. |
| CPC divergência restrita à nota editorial (1) | 945 | Revogação pela Lei 13.256/2016 em ambos; nota oficial mais extensa sobre vigência. |
| Ausências técnicas (2) | CC1000 e CPC1000 | Limitação por `1.000` no parser, **não** artigos omitidos ou revogados; o espelho os contém. |

O lote inclui temas de responsabilidade civil, empresário e sociedades, execução, precedentes obrigatórios, incidente de resolução de demandas repetitivas, ação rescisória e recursos. A predominância de diferenças de notas **não autoriza** classificar automaticamente as 25 como juridicamente irrelevantes: marcar **C** para controle da lei 15.484/2026 e da ADI vinculada a CC927; **B/C** para CC937 vetos, CPC913 e CPC967; **B** para discrepâncias meramente gráficas e estruturais quando confirmadas. Fazer revisão humana pontual antes de qualquer alteração da Biblioteca.

## Estado cumulativo e integridade

Primeira passagem **2.008/3.156 = 63,62%**, restando **1.148 IDs**. Classes **brutas**, sem recontagem retroativa: **1.846 idênticos** (1.673+173), **113 diferenças textuais** (88+25), **1 diferença editorial**, **48 marcadores/ausências técnicas** (46 de intervalos revogados + 2 de separador de milhar). Soma **2.008**. A interpretação reconciliada dos 46 revogados e 2 artigos existentes fica em trilha documental própria; não os inflar como idênticos. Dois marcadores oficiais fora do denominador: CC69-A vetado e CPC529-A prospectivo.

Permanecem oito diplomas, IDs, sufixos, notas, tags, `topic:null`, estados `pending`/`partial`/`mirror_unverified`, `forNotebook`, categorias S20, baralhos, backups e dados do estudante. Sem consultar auditoria privada, sem modificar produto, extrator ou corpus. Ensaios Chromium cinco larguras, axe completo, TalkBack, backup S20 mutável, CI do produto e Pages pós-merge não se aplicam à documentação; apenas testes locais de regressão e `git diff --check` cabem nesta etapa.

Handoff em `docs/PROMPT_BIBLIOTECA_LEIS_17.md` — **preparado, não executado**.
