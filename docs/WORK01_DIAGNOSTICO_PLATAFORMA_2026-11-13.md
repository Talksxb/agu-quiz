# AGU WORK 01 — plataforma pessoal: diagnóstico e primeira integração

13/11/2026 · uso pessoal · primeira entrega incremental.

## 1. Corte e fontes realmente inspecionadas

Aplicativo: `Talksxb/agu-quiz`, `main` em `3017a9166d345b7f277b5c1161c50175458b2804`, com a Sprint 31 integrada. A listagem de branches retornou apenas `main`; a coleção de PRs do Quiz estava vazia. Não havia aplicação mais avançada em uma PR ignorada. Foram consultados README, código dos módulos, dados públicos, workflow, checkpoints S16/S20/S29/S30/S31, handoff S32, guia de backup S21 e roteiro Android S24. Este trabalho **não executa a Sprint 32**: é uma frente de produto solicitada expressamente após seu handoff.

Auditoria: `Talksxb/agu-auditoria`, privada, somente leitura, corte Git `56b93d4a0aab21910003f230a216cb770a922b96`. Lidos README, protocolo, estado, AUD03-023, árvore de arquivos e matriz-base; verificado o blob da matriz de trabalho. A matriz-base tem 412 IDs únicos e blob `0952205a07818cda0a9ccca6dacdf340afcc6db8`; a de trabalho tem blob `f00520a6fa702b67cb0716648eae7869eb818956`. **A matriz de trabalho não foi integralmente relida/reauditada nesta execução.** O último checkpoint integrado é AUD03-023, parcial, com zero tópicos certificados integralmente. Contagens documentais do checkpoint não são progresso do estudante.

Foram examinadas as branches e PRs abertas da auditoria, especialmente:

- [PR 147](https://github.com/Talksxb/agu-auditoria/pull/147), `audit/aud04-001-enap`, aberta contra main, SHA `a626559aa6400b613d9192217641ba8c31a85689`.
- [PR 155](https://github.com/Talksxb/agu-auditoria/pull/155), `audit/aud04-002-digital`, aberta **contra a branch da PR 147**, SHA `9dd4592da4cbeda047537b93eeb3f09248c1b44a`.

A matriz complementar lida na PR 155 tem 27 tópicos (DIG/DH/TGPFH, 9 por área), natureza `PROPOSTA_PEDAGOGICA_PROVISORIA_NAO_EDITAL`, sem certificação e sem questões oficiais ENAP. Seus campos registram pendências de fonte instituidora: a interface futura deve preservar essa qualificação. Esta é uma inspeção de contratos, **não nova verificação jurídica da Portaria ou de precedentes**.

Também foram lidas as referências pedagógicas anexadas ao projeto, sobretudo a Base Mestra v5.1, Método Cognitivo v2 e Caderno/Handoff v2. Base Mestra v5.1 prevalece sobre os avisos antigos do Leia-me que mencionam v4. Não foram alterados os anexos.

## 2. Inventário objetivo

| Recurso | Estado observado | Decisão |
| --- | --- | --- |
| `agu-auditoria` | Fonte privada de matrizes, evidências, checkpoints e histórico. Main e propostas em branches são distintos | **Reutilizar**, sem escrita por UI |
| `agu-quiz` | Aplicação já funcional em HTML/CSS/JavaScript nativo, sem framework, bundler ou dependências de produção; quatro destinos | **Melhorar** sobre o código existente |
| Outros repositórios da conta | Busca de nome/descrição e inventário da conta localizaram apenas esses dois relacionados ao AGU; os demais tratam de outros projetos | **Adiar** qualquer reaproveitamento não demonstrado |
| Leitor `leitor-juridico.js` | Índice granular, artigos/incisos, abas, fontes, busca, notas, fonte ampliável, painéis mobile e retomada local; correções S29–31 | **Reutilizar** integralmente |
| `leitor-consolidacao.js` | Pesquisa transversal, filtros de confiabilidade, metadados de versão, tamanho e métricas locais | **Integrar** na jornada, sem reimplementar busca |
| `planejamento-semanal.js` | Disponibilidade editável, geração por prioridade/rotação, tarefas manuais, importação conservadora; não é matriz curricular integral | **Reutilizar**; usar `current/next`, sem segundo calendário |
| `estudo-integrado.js` | Sessão por dispositivo, ID/etapa persistentes, notas e tentativas referenciadas; cinco etapas, sem professor conversacional | **Integrar** à tela inicial |
| `revisao-inteligente.js` | Agenda D+1/7/21/45, erros, flashcards e questões com política de correção própria | **Reutilizar**, sem segunda agenda |
| Questões S18/S19 | Quatro itens com cotejo pontual e fontes/fundamentos; painel informa adaptação quando o enunciado não é literal | **Reutilizar**; não promover inventário a banco integralmente verificado |
| Banco legado em `index.html` | Questões autorais e abertas, fontes de diferentes graus de verificação | **Melhorar** apresentação; preservar identificação da origem |
| `caderno-contextual.js` | Notas por unidade com proveniência e vínculo à sessão; coexistência com Caderno legado | **Reutilizar**; integração de cadernos exige decisão de contrato, sem fusão automática |
| Backup S20–27 | Nove categorias, hashes, quota/rollback, importação apenas nas ausentes; 12 MB UTF-8 | **Reutilizar** sem migração |
| Matriz AGU 2022 na UI | Importação estrutural local, busca e detalhe, 412 IDs, vínculos manuais; não consome automaticamente as integrações AUD03 | **Integrar** por camada privada derivada |
| Matriz ENAP das PRs 147/155 | Contrato complementar disponível, fora de main, relações por IDs originais; programa provisório | **Integrar** depois do acesso privado e da política explícita de refs |
| Professor socrático | Não existe motor conversacional no código; etapa Caderno permite hipótese/objeção/aplicação, mas não corrige raciocínio | **Construir** incrementalmente; não vender o fluxo atual como aula adaptativa completa |
| Modo escuro | Estilos atuais usam cores claras fixas em vários módulos | **Adiar** para intervenção coerente e teste de contraste, evitando inversão parcial |
| Sincronização entre aparelhos | Não implementada no AGU | **Adiar** até ter acesso autenticado; backup atual permanece disponível |

## 3. Deploy, autenticação e infraestrutura

O [GitHub Pages existente](https://talksxb.github.io/agu-quiz/) respondeu HTTP 200; seu HTML foi comparado por SHA-256 e bytes ao baseline de main, com igualdade. Ele serve o site público. A coleção de Actions confirmou deploy concluído com sucesso sobre `3017a916`; a CI de produto anterior `43472332230`, sobre `e472b9d3`, terminou com sucesso. Esses runs são **baseline**, não teste desta mudança.

Não há servidor, banco, autenticação, SDK Supabase, integração de Sheets ativa ou configuração Render no repositório. Nenhuma infraestrutura de outro projeto foi presumida como parte do AGU. O progresso pertence à origem/navegador via `localStorage`. Clonar a auditoria privada via Git local falhou por ausência de credencial CLI; sua inspeção foi possível pelo conector autenticado, sem copiar credenciais para o código.

A versão WORK01 fica em branch/PR: não altera o deploy de main automaticamente. Antes de mudar de origem para testar, exportar backup completo na origem atual e usar dados sintéticos na revisão. **Não importar histórico pessoal numa demonstração pública.**

## 4. Obstáculos de experiência comprovados no código

1. Início e Estudar encaminhavam sempre para `startQuiz(recommended())`, ignorando `AGUStudy.active()` e `AGUPlanner.next()` — fragmentação real entre componentes já existentes.
2. A missão não mostrava a etapa salva nem os minutos previstos da tarefa existente. Os indicadores de tempo usavam uma meta fixa de 780 min, mesmo com disponibilidade configurável no Plano.
3. O plano pode sugerir matérias sem material/questões no corpus público. Isso precisa ficar explícito, sem quiz vazio ou falsa cobertura.
4. A matriz importada é uma fotografia local: o site não acompanha automaticamente evidências integradas nem proposals ENAP. Isso impede hoje a experiência completa de “abrir e estudar todo o conhecimento privado” sem importação.
5. Duas famílias de cadernos/revisões coexistem. Somá-las sem contrato pode contar conceitos diferentes e duplicar progresso aparente.
6. Comentários do Leitor ainda têm salvamento explícito e pontos de continuidade de foco pendentes no handoff S32. WORK01 preserva seu código; não presume que toda renderização perdeu foco.

Android físico, TalkBack e backup histórico pessoal permanecem não testados. Emulação de viewport não equivale a esses ensaios.

## 5. Arquitetura mínima

**Agora:** manter a aplicação estática e acrescentar somente um apresentador `meu-estudo.js`. Ele consulta os motores existentes, não mantém estado próprio e não cria nenhuma chave de armazenamento. Prioridade de entrada: sessão válida em andamento (ativa ou última atualizada), próxima tarefa devolvida pelo planejador já salvo, agenda de revisão, revisão legada e sugestão inicial existente. Ler a home não gera semana nem registra tempo/resposta.

Os atalhos temáticos de Atos Administrativos → Lei 9.784 art. 11 e Funções Essenciais à Justiça → CF art. 131 são rotas para material público já existente. **Não são equivalência curricular integral, vínculo de respostas nem certificação**. Outros tópicos usam treino já disponível ou abrem o roteiro com a lacuna informada. Tarefas continuam sendo marcadas pelo usuário no Plano; abrir/encerrar sessão não as conclui automaticamente.

**Próximo incremento:** um serviço pequeno, autenticado e restrito ao único dono, para ler GitHub no servidor e entregar uma projeção por commit. Sessão segura e allowlist do dono; token somente no servidor, leitura restrita ao repositório; sem API que escreva evidência, checkpoint ou certificação. Não usar GitHub Pages para hospedar snapshots privados. Não introduzir banco para a auditoria.

Contratos da projeção proposta:

| Entrada versionada | Contrato preservado | Projeção de leitura |
| --- | --- | --- |
| Matriz-base | `disciplinas`, `itens`, `id`, `disciplina_codigo`, 14 disciplinas/412 IDs únicos | Estrutura AGU original, texto operacional distinto de literal |
| Matriz de trabalho/checkpoint | Integração identificada por SHA/blob e rodada; evidência ≠ certificação | Estado documental com links ao arquivo/commit e limite do corte |
| Evidência | `item_id`, dimensão, URL oficial, localizador, data, status e observações | Referências por ID; sem copiar a pesquisa para outro sistema editorial |
| Matriz ENAP | `topicos`, IDs `ENAP-*`, `status_curricular`, `sobreposicoes_matriz_2022` | Vista complementar com referências cruzadas; badge provisório obrigatório |
| Uso pessoal | Nove categorias locais atuais e IDs existentes | Progresso separado de cobertura documental; nenhum percentual inferido |

A projeção deve validar estrutura/IDs/refs, informar commit/data, manter o último corte válido e exibir erro compreensível se fonte estiver ausente. Uma PR aberta só entra como proposta explicitamente selecionada; jamais como main certificada. Links privados exigem sessão GitHub do dono. Nenhum artefato privado entra no repo público, Actions ou screenshots.

Não foi criado serviço nesta entrega: o AGU não tem autenticação ou credencial de hospedagem vinculada no código. O serviço precisa ser configurado concretamente antes de substituir a importação local. Isso é uma pendência técnica, não falta de currículo ou necessidade de reconstruir o leitor.

## 6. Método pedagógico e escopo da primeira versão

WORK01 permite continuar a sessão por dispositivo, consultar fontes e usar questões/revisão originais. Não implementa correção discursiva, tutor de IA ou sete etapas socráticas completas. O fluxo de cinco etapas do estudo integrado não deve ser renomeado como se cumprisse integralmente o método de sete movimentos.

Para a próxima aula, a opção sem serviço adicional é um roteiro versionado com pergunta única, campo para hipótese, avanço consciente para fonte/objeção e registro no Caderno existente, sem pontuação semântica automática. O roteiro deve ter autoria/origem e fontes verificáveis. Um tutor conversacional acrescentaria endpoint servidor, custo de inferência e protocolo de fontes; não há chave de modelo no cliente. Nenhuma dessas capacidades é alegada como implementada nesta PR.

## 7. Implementação e validação

Arquivos de produto: `index.html` (home/Estudar/meta configurada) e novo `meu-estudo.js`. O módulo original do Leitor, recuperação, dados jurídicos, matrizes e políticas de correção não foram alterados. Mantidas as quatro áreas de navegação.

Verificadores: `tests/work01-validacao.js`, `tests/work01-browser.cjs`; verificador Pages inclui o novo módulo e seletor da ação principal atualizado em S23 para o novo texto; workflow habilitado também em PR, com Pages omitido nas PRs para não comparar uma branch inédita ao deploy de main. Artefatos somente sintéticos.

Local Node v24.22.1: S19 (26), S20 (41), S25, S26, S27, S29, S30, S31 e WORK01 (13 cenários) passaram. WORK01 verifica ausência de escrita na home, retomada de ID/etapa, simulação isolada, plano manual preservado, fallback sem material e agenda original sem tentativa fantasma.

Limitação local de browser: Playwright sem `chromium_headless_shell-1234`; tentativa adicional com `/usr/bin/chromium` abortou em `socket() failed: Operation not permitted`. Portanto **nenhum E2E local aprovado**. O teste novo de CI exige cinco larguras (320/360/390/430/1280), ação visível, foco após entrada, retomada por Enter/Espaço e uma resposta Q48 preservada após reload. Resultado remoto e limitações serão registrados após execução, sem reutilizar como prova os runs S31.

## 8. Riscos e próximos passos concretos

| Risco | Tratamento nesta entrega |
| --- | --- |
| Perder histórico por troca de origem/aparelho | Não houve migração nem nova origem de produção; guia de backup preservado |
| Sobrescrever planos/notas ao abrir home | Apresentador só lê; não chama `ensure()` para montar missão |
| Novas tentativas por retomar | Reusa sessão original; testes verificam ausência de duplicação |
| Evidência ou proposta parecer certificação | Não se publica matriz privada nem altera status; propostas só documentadas |
| Quota/corrupção de storage | Sem limpeza ou reparo automático; mensagem de erro de continuidade e backup existente |
| Histórico acima de 12 MB | Continua pendente; sem compactação/divisão/migração improvisada |
| Reduzir leitor a uma UI inferior | Módulo e correções S29–31 preservados e incluídos na regressão |

Próxima entrega: validar a PR e o percurso no telefone; em seguida implementar o acesso privado por commit e a projeção de Biblioteca, incluindo as propostas ENAP sem alterar os 412 IDs. Depois, roteiro de aula ativa no Caderno. Modo escuro e sincronização vêm após esses fluxos, com contraste e recuperação comprovados.

Teste reproduzível: `python3 -m http.server 8080` na raiz do checkout e abrir `http://localhost:8080`. Em navegador novo/sintético: Início → Continuar estudando → Caderno AGU → recarregar → Continuar estudando. Para regressão Node: executar os scripts `tests/*-validacao.js`; para E2E usar o workflow da PR com Playwright/Chromium. O servidor HTTP local serve apenas os arquivos públicos do Quiz; nunca copiar a auditoria privada para sua raiz.

## 9. Falhas intermediárias tratadas

- Run `43476260726`, SHA `a5b3cfb7`: Node passou; navegador falhou no teste S22 ao procurar o atalho Planejamento retirado da tela Estudar. O atalho foi restaurado, preservando o acesso anterior; não se enfraqueceu o teste.
- Run `43476628982`, SHA `288d1106`: S20/S21/S22/S23 de jornada passaram; S23 axe apontou `aria-prohibited-attr incomplete` em 10 cenários (Início/Estudar em cinco larguras), alvo `.today-summary`. O artefato foi baixado e o JSON inspecionado: `aria-label` num `div` sem papel válido. Corrigido com região nomeada. As 26 varreduras tinham zero `violations`, mas o aviso semântico **não foi ignorado** nem reclassificado como aprovação; uma nova execução completa é exigida.
- O verificador de publicação foi estendido para incluir `meu-estudo.js` e sua versão de cache; o job continua omitido nas PRs, porque a versão de produção ainda é main.

O resultado definitivo, SHA testado e link da execução ficam registrados na descrição da PR WORK01. Runs intermediários falhos não constituem aceite.
