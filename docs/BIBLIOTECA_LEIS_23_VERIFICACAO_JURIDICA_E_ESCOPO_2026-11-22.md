# AGU Quiz — Biblioteca 23 | Delimitação e verificação jurídica pontual (22/11/2026)

## Missão e status
Executar **primeira passagem textual dos 1.148 IDs restantes** e revisar a fila de **111 diferenças da Biblioteca 22**. A avaliação documental dos 111 artigos é uma triagem por dispositivo com excertos e hashes, **não certificação individual das normas ou acórdãos**. O corpus não será modificado.

### Universo efetivamente inspecionado no blob de CC/CPC
`dados/codigos-cc-cpc.js`, blob imutável `d4b05b841beeb03851a89c8634b4ac9f097d9d5a`:
- CC tem 2.082 registros, dos quais 1.007 em U22 e **1.075** pendentes.
- CPC tem 1.074 registros, dos quais 1.001 em U22 e **73** pendentes.
- Total **3.156 = 2.008 + 1.148**; artigos com sufixo contam como IDs próprios. A primeira passagem ao restante deve preservar os sufixos, inclusive CC1358-A a 1358-U e CPC1035-A; não basta varrer números até 1100.

### Integridade e escopo
A comparação é restrita às capturas HTML integrais já verificadas na Biblioteca 22:
- CC: SHA-256 `6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90`, **1.571.920 bytes**.
- CPC: SHA-256 `0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821`, **938.199 bytes**.

O script `scripts/auditar-biblioteca-23.py` recusa arquivo com hash/tamanho diferente; confere exatamente U=3.156, U_antigo=2.008, U_novo=1.148; exporta CSV individual de primeira passagem com hashes oficiais e do espelho, CSV de triagem das 111 divergências com diferenças contextuais e referências primárias, e `resumo.json`. O workflow em `.github/workflows/biblioteca-23-cotejo.yml` obtém as fontes no runner e exige testes antes do processamento; **criação do workflow não prova sucesso de execução**.

## Revisão jurídica pontual — fundamentos oficiais verificados
1. **CPC144, VIII — ADI 5.953:** o STF declarou inconstitucional o inciso VIII, conforme [andamento oficial](https://portal.stf.jus.br/processos/detalhe.asp?incidente=5481637) e [notícia STF](https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=512602&ori=). Uma remissão genérica não comunica adequadamente o efeito do julgamento; preservar texto promulgado e recomendar **anotação jurídica distinta**, com data do julgamento e publicação conferidas.
2. **CPC525 e CPC535 — AR 2.876 QO/DF, STF 2025:** [Informativo 1177/2025](https://www.stf.jus.br/arquivo/informativo/documento/informativo1177.htm) explicita interpretação conforme do art. 525 §15 e art. 535 §8 com efeitos ex nunc, declaração incidental de inconstitucionalidade do art. 525 §14 e art. 535 §7. Não confundir com ADI 5.492 sobre depósitos e RPV.
3. **CPC535 §3 II / CPC840 I — ADI 5.492:** [notícia oficial STF](https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=506742&tip=UN) confirma fim da exclusividade de bancos públicos para depósito judicial e RPV, respeitada licitação constitucional caso escolhido banco privado. Cada dispositivo contém **expressão específica** afetada; não transplantar o resultado de um inciso para outro.
4. **CC206 §1 II / CC757–802 — Lei 15.040/2024:** [publicação original](https://www2.camara.leg.br/legin/fed/lei/2024/lei-15040-9-dezembro-2024-796661-publicacaooriginal-173706-pl.html) revoga o inciso e os arts. 757–802, com vacatio já concluída no corte 04/11/2026. Não reativar artigos em apresentações por faixa.
5. **CPC927, 932, 979, 988, 998 e, no novo lote, CPC1030, 1035-A, 1039 e 1042 — Lei 15.484/2026:** [lei original](https://www2.camara.leg.br/legin/fed/lei/2026/lei-15484-4-agosto-2026-799698-publicacaooriginal-180680-pl.html), arts. 2º–4º e 7º. Publicação 04/08/2026, **vacatio de 30 dias**; a exigência de tópico de relevância no REsp incide sobre recursos contra acórdãos publicados após a entrada em vigor, conforme art. 4º. Necessária revisão por unidade do texto e do marco temporal, sem pressupor que a nota editorial do espelho descreva a aplicação da lei.
6. **CC853-A — agente de garantia**, [Lei 14.711/2023](https://www2.camara.leg.br/legin/fed/lei/2023/lei-14711-30-outubro-2023-794873-publicacaooriginal-169906-pl.html): não suprimir §§ em função de notas de origem repetidas.

O exame destes núcleos confirma **riscos jurídicos e fontes de referência**, mas não prova equivalência normativa completa de todos os demais 111 dispositivos. Para cada divergência o CSV exige revisão específica da cadeia de modificações, caput/incisos/parágrafos, eventual veto, decisão e eficácia temporal. Os chamados `diferença_textual` e `aparente_editorial` são **diagnósticos da representação**, não juízo de validade ou culpa do espelho.

## Regras de encerramento
- Se o workflow produzir CSV de 1.148 chaves, isso conclui **primeira passagem textual do universo importado**, não auditoria integral de Direito Civil/Processual ou certificação de vigência.
- Se houver ausência oficial extra, preservá-la como achado em `resumo.json`, sem inventar texto vigente. Separar revogação documentada de ausência real.
- A revisão jurídica de cada uma das 111 divergências **não é declarada integralmente resolvida** com triagem automática. Só declarar saneamento jurídico de artigo após leitura de fundamento oficial, decisão, e registro da conclusão individualizada.
- Manter draft, sem merge, sem editar corpus, dados do usuário ou interface; nenhum handoff autoriza executar automaticamente a próxima etapa.
