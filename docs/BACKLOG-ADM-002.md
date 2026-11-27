# BACKLOG-ADM-002 — Responsabilidade civil do Estado

26/11/2026, America/Sao_Paulo. Continuidade autorizada de BACKLOG-ADM-001. Base reconfirmada: main `50c35478320370ba1988824d9160c2f5fd1e0ba7`, com CI e Pages verdes. Branch própria: `work/backlog-adm-002`.

## Acervo e lacuna comprovada

O mapa legado tinha zero desafios de Responsabilidade civil do Estado. O banco principal continha 44 questões; o módulo de simulados, 24, distribuídas entre LGPD, agentes públicos e competências ambientais, sem ADM-53. Não foi confundida ausência de desafios com ausência de material: o capítulo publicado `adm-53`, edição 1.0, tem vinte seções e atividades abertas de aplicação/recuperação. Foram examinadas as páginas 3, 7 e 8 pertinentes ao novo lote.

O catálogo publicado possui sete capítulos. O ADM-53 está aprovado como transposição de edição pública, com verificação jurídica parcial; essa aprovação não significa reconferência integral atual. O capítulo, suas fontes editoriais, seus hashes e sua edição permanecem intactos.

O código **ADM-53 — Responsabilidade estatal no direito brasileiro** foi cotejado com o recorte pertinente da matriz privada na main `89da8b6a4926355326c70ca4c4356c7d7e0439a1`. Consultados protocolo e estado, que identifica AUD03-046. Essa consulta serve à identidade e ao estado documental, sem elevar o ID a certificado. Não foram exportadas matriz ou evidências privadas, alterados checkpoints ou utilizados pareceres de PRs jurídicas ainda não aprovadas.

## Entrega

Quatro casos C/E originais. Banco principal **44 → 48**, com as 44 questões anteriores integralmente preservadas. O grupo legado passa de **0 → 4**; o painel do ID ADM-53 mostra as mesmas quatro questões, o capítulo já publicado e os demais recursos existentes.

Cada correção oferece **Revisar fundamento no capítulo**, abrindo a seção pertinente. Esse link só aparece após responder. A integração usa o banco, a atribuição curricular, a correção, os intervalos, a agenda, o armazenamento local e o backup existentes. Abrir questão ou capítulo não cria resposta nem domínio. O mapeamento manual do estudante mantém prioridade sobre o ID editorial, conforme o comportamento já existente.

| Questão | Recorte e resposta | Capítulo existente | Fundamento decisivo conferido |
|---|---|---|---|
| bkl-adm53-01 | Legitimidade na reparação do dano funcional — Errado | adm-53-s07 | [STF, Tema 940, RE 1027633/SP](https://portal.stf.jus.br/jurisprudenciaRepercussao/verAndamentoProcesso.asp?classeProcesso=RE&incidente=5136782&numeroProcesso=1027633&numeroTema=940), Plenário, 14/08/2019. Tese e andamentos lidos; acórdão publicado em 06/12/2019, trânsito indicado em 14/12/2019. A hipótese é de ato funcional, sem estender o resultado a ilícito estritamente privado ou à responsabilidade penal/disciplinar |
| bkl-adm53-02 | Dolo ou culpa no regresso — Certo | adm-53-s03 | [CF, art. 37, § 6º](https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm#art37). Conferida a distinção do elemento subjetivo na relação regressiva. Não resolve prescrição, rito ou todas as modalidades de ressarcimento |
| bkl-adm53-03 | Dever específico de proteger o detento — Errado | adm-53-s08 | [Tema 592](https://portal.stf.jus.br/jurisprudenciaRepercussao/tema.asp?num=592), RE 841526/RS, e [notícia oficial do julgamento de 30/03/2016, que transcreve a tese](https://portal.stf.jus.br/noticias/verNoticiaDetalhe.asp?idConteudo=313198). A hipótese afirma dever, possibilidade de agir, dano e nexo; não exige culpa individual para a responsabilidade objetiva nem presume indenização em todo óbito |
| bkl-adm53-04 | Ausência de nexo direto após fuga — Certo | adm-53-s08 | [STF, Informativo 993](https://www.stf.jus.br/arquivo/informativo/documento/informativo993.htm), tese e ementa do RE 608880/MT, Tema 362, sessão virtual de 28/08 a 04/09/2020. Relator Marco Aurélio, redator Alexandre de Moraes. Não cria prazo automático de ruptura do nexo |

Fontes oficiais abertas em 26/11/2026, horário de São Paulo. As páginas de andamentos dos Temas 592 e 362 retornaram erro; foram usados, respectivamente, a tese transcrita na notícia institucional e a tese/ementa no Informativo oficial. As páginas de identificação dos temas estavam acessíveis. Não se alegam leitura integral de votos, atualização de todo o capítulo, homologação independente do lote ou certificação curricular global. A página informativa não é tratada como norma autônoma.

Os enunciados são originais e não reproduzem questões oficiais. Os sete itens oficiais do treino vigente, as 400 referências históricas, anulações e gabaritos de banca permanecem separados e intactos. O lote não cria livros, cartões, Caderno ou motor de revisão. A produção de Constitucional em outro chat permanece fora do escopo.

## Verificação e gates

O teste Node próprio compara as 44 questões anteriores objeto a objeto, confere os quatro IDs, os gabaritos, as seções efetivamente publicadas e a identidade exata ADM-53. O delta do HTML é revertido e comparado por SHA-256, com recusa de adulteração. A cadeia dos testes anteriores é mantida. No browser do lote 001, apenas a expectativa exata do contador passa de 44 para 48, pois o contador é calculado pelo banco real; as demais assertivas permanecem iguais.

As **54 rotinas/comandos Node** passaram localmente. O browser do lote anterior passou novamente em 320/360/390/430/1280 (6,974 s). A jornada própria nova passou nas cinco larguras (8,935 s), com quinze scans axe sem violações ou inconclusivos remanescentes após reconferência: histórico anterior não vazio, entrada pelo mapa e por ID, quatro gabaritos, erro seguido de acerto, seções do capítulo, recarga, preservação do registro anterior e da agenda, ausência de avaliação nos flashcards, backup/restauração e axe estrito.

A mesma jornada nova está configurada no workflow para a branch/main e para a URL publicada, com 320/360/390/430/1280. Perfis sintéticos independentes; sem uso de dados reais do aluno e sem teste Android físico/TalkBack. CI do HEAD exato, revisão do escopo, merge com `expected_head_sha`, Pages build/deploy/report e gates após integração devem ser confirmados e registrados na PR antes de declarar o lote publicado.

## Continuidade

Dos 27 agrupamentos legados antes sem desafios, este lote atende um, restando **26**. Todos os seis grupos de Administrativo passam a oferecer ao menos um desafio; isso não equivale a cobertura integral da disciplina ou dos 412 IDs.

Próxima prioridade proposta: **SEG-01 — Seguridade social e EC 103/2019**, identidade localizada na matriz. Antes de qualquer produção, reconfirmar subitens, material disponível, questões elegíveis e fontes decisivas; selecionar um recorte pequeno e útil. Não preencher lacunas por prefixo nem confundir os rótulos legados PREV com os IDs originais SEG. Esse próximo lote não é executado no fechamento de BACKLOG-ADM-002.

Tempo efetivo total não cronometrado; duração de testes ou espera de CI não é apresentada como tempo de trabalho. A integração/publicação depende dos gates acima; resultados finais e limitações ficam na PR.
