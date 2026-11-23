# AGU QUIZ | WORK — SIMULADOS-AGU-003

## Missão única

Executar exclusivamente SIMULADOS-AGU-003 quando solicitado em nova execução. Este documento é o handoff de 002 e não autoriza antecipar 003 no mesmo lote.

Preparar uma primeira amostra pequena de estudo reverso baseada em provas públicas: **no máximo quatro itens históricos**, com origem e gabarito verificáveis, vínculo curricular literal, material público efetivo e eventual adaptação autoral atual claramente separada. Aproveitar a estrutura de simulados e o pipeline de cartões já existentes. Abrir PR draft com CI; **não mesclar nem publicar nesta etapa**.

## Retomada obrigatória e estado real

Repositório: `https://github.com/Talksxb/agu-quiz`; produção esperada, a reconfirmar: `https://talksxb.github.io/agu-quiz/`. Não presumir que uma PR mesclada já foi publicada.

1. Reconfirmar `main`, implantação, PRs e checks. Ler integralmente `docs/CHECKPOINT_SIMULADOS-AGU-002.md` e o fechamento factual da PR #82, `docs/SIMULADOS_AGU_001.md`, ingestão Método AGU, contrato de backup e protocolos de cartões aplicáveis. A base histórica inicial de 002 era `1191267482ace4429cfd9d5f559a626461b29493`; o HEAD final e o merge constam da PR e devem ser lidos, não inventados. Não duplicar trabalho já integrado nem incorporar outra PR por conveniência.
2. Aplicar AGU_BASE_MESTRA_v5.2_FINAL, AGU_PADRAO_LEITURA_COMPLETA_v1.1_FINAL, AGU_CADERNO_E_HANDOFF_v2.1_FINAL e AGU_LEIA_ME_PRIMEIRO_v2_FINAL. Recuperar Caderno apenas se necessário e efetivamente disponível. Não inferir progresso ou domínio de leitura/navegação/testes.
3. Ler banco editorial, aprovações, compilador e motor reais, além dos três lotes históricos de cartões e das quatro paráfrases públicas existentes no Leitor. O lote de simulados de 002 mantém 24 itens autorais, edição 1.1, cinco alternativas, ligados a ADM-64b/ADM-54/AMB-03. Confirmar esse estado. Quatro paráfrases no Leitor não equivalem a quatro originais oficiais já aptos a publicação como simulado.
4. `Talksxb/agu-auditoria` é privado. Esta etapa usa somente material que já é público e fontes oficiais públicas. Não exportar matriz, evidências, transcrições ou notas privadas. Se um vínculo literal depender de dado privado, registrar a lacuna e manter o candidato fora do banco público; não publicar para completar a meta.

## Seleção e evidência por questão

Priorizar Advogado da União e os recortes que tenham capítulo público suficiente. Não tratar Procurador Federal, Procurador da Fazenda ou cargo distinto como Advogado da União. Tentar reaproveitar a pequena base pública existente antes de criar coleta nova. No máximo quatro candidatos; entregar menos se as evidências não sustentarem quatro.

Para cada candidato, manter em campos distintos:

- concurso, cargo exato, banca, ano, fase, caderno/tipo, número e formato original;
- URL oficial acessada, data e página/localizador do enunciado;
- gabarito **definitivo** com URL e identificação exata do caderno, letra/C–E ou anulação; gabarito preliminar não substitui o definitivo;
- eventual anulação ou alteração de gabarito, sem converter o item anulado em erro do aluno;
- conclusão histórica e marco temporal da prova;
- redação atual aplicável na data da produção, com fonte primária efetivamente aberta, dispositivo e alteração decisiva; precedente apenas se verificado e necessário;
- ID curricular literal, capítulo público, seção e edição/hash reais que sustentem o fundamento;
- natureza de cada registro: histórico, paráfrase ou adaptação autoral atual. Preservar a identidade do original e a relação entre os registros, com deduplicação semântica.

Sem origem, gabarito definitivo ou material suficiente, deixar o item como candidato pendente com motivo concreto. Não preencher evidência por memória nem declarar auditoria integral. Nenhuma questão pendente pode entrar silenciosamente no compilado de treino.

## Adaptação e qualidade pedagógica

O motor atual aceita cinco alternativas. Se o original for Certo/Errado, **não inventar cinco alternativas e chamá-las de prova oficial**. Preservar o formato/gabarito histórico na ficha. Quando houver base suficiente, produzir uma questão autoral adaptada com cinco alternativas, marcada como adaptação, vinculada à ficha histórica e aprovada separadamente. Não ampliar o motor para outro formato apenas para completar este lote.

Partir de um problema concreto pertinente à atuação da AGU. Construir comando claro, uma resposta correta, alternativas plausíveis fundadas em erros jurídicos identificáveis, feedback específico de todas as alternativas, explicação completa e cartão que recupere regra e limite. Evitar alternativas absurdas ou pistas de tamanho/linguagem. Reexaminar original e adaptação quando uma mudança normativa alterar a conclusão. Nunca substituir silenciosamente o gabarito histórico pela regra atual.

O fundamento precisa ser legível na seção vinculada. Se o capítulo não cobrir a distinção necessária, registrar a lacuna; não criar vínculo apenas temático ou alterar capítulo fora do escopo para satisfazer contagem. Questões já respondidas mantêm seus snapshots, chaves e pontuações; IDs novos não podem colidir com os existentes.

## Cartões, compilação e preservação

Reutilizar os contratos de fonte, candidato, aprovação e identidade do pipeline existente. Avaliar se cada adaptação acrescenta proposição útil ou duplica um dos 51 cartões históricos. Encaminhar candidatos ao fluxo editorial existente com fonte, regra temporal e vínculo; não criar outra agenda, avaliar cartões automaticamente nem sobrescrever históricos. Se a ponte efetiva para publicação de cartões exigir outra sprint, entregar candidatos rastreáveis e a lacuna, sem alegar integração inexistente.

O compilador monta sessões, correções e cartões de unidades aprovadas por hash; não é gerador de novas proposições jurídicas por IA. Não instalar backend, API paga, login, sincronização, agendamento ou geração em segundo plano. Não ampliar o backup geral nesta etapa: há exportação/importação próprias do simulado e esse limite deve continuar visível.

Preservar os 24 itens atuais, capítulos, cartões históricos, agendas, contratos do Método AGU, dados anteriores e exportações. Só mudar código se houver necessidade demonstrável para a rastreabilidade deste pequeno lote. Nenhuma alteração cosmética ampla, nova auditoria privada ou expansão massiva de provas.

## Validação e entrega

Trabalhar em branch própria. Rodar compilador `--check`, validações de simulados e do pipeline editorial/cartões pertinente. Testar a distinção de natureza e temporalidade, recusa de candidato sem evidência, suspensão por mudança de fonte/seção, deduplicação e preservação de sessão antiga quando isso tocar a implementação. Verificar a experiência efetiva: selecionar o novo recorte, responder sem gabarito antecipado, corrigir, revelar fundamento e abrir a seção adequada. Usar contextos sintéticos independentes.

Conferir a CI do HEAD final e o diff, e ler o relatório Chromium/axe incluindo inconclusivos. Não alegar Android físico/TalkBack. Se não houver item apto, fechar documentalmente com evidências e pendências; não inventar conteúdo para produzir patch.

Entregar PR draft, HEAD, CI, matriz pequena de candidatos com status e fontes, quantidade efetivamente integrada, limites, checkpoint e prompt completo autossuficiente da próxima execução com base na lacuna encontrada. **Não mesclar, não publicar e não executar a próxima etapa neste lote.**
