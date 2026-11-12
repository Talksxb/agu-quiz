# AGU Quiz — Sprint 15 | Caderno AGU Contextual
**Data:** 2026-11-12  
**Estado:** implementado na branch padrão de `Talksxb/agu-quiz`, 37/37 testes automatizados locais aprovados. **Android e GitHub Pages ao vivo ainda não validados por teste E2E.**

## Diagnóstico e fontes
- Lidos: `docs/CHECKPOINT_SPRINT14_RELACOES_2026-11-12.md`, `index.html`, `leitor-juridico.js`, `dados/legislacao-s13.js`, `dados/relacoes-juridicas-s14.js`, `revisao-inteligente.js` e `planejamento-semanal.js`.
- Em `Talksxb/agu-auditoria`: `docs/PROTOCOLO.md`, `checkpoints/estado.json` e `data/AGU_MATRIZ_CURRICULAR_2022_v3.json`.
- Último checkpoint geral de auditoria observado: **AUD03-005**, status `auditoria_documental_parcial_nao_certificada`. Matriz original 412 tópicos / 14 disciplinas. Nenhuma certificação nova foi atribuída.
- Caderno legado do aplicativo: `agu_quiz_mvp1_2026`, campo `notebook`, com `{id,title,topic,date,hypothesis,agu,summary,answers,revisions}` (campos variáveis). O tópico legado segue estrutura `ADM/Atos administrativos` ou similar: **não identifica automaticamente artigo ou inciso**.

## Arquivos entregues
1. **Novo** `caderno-contextual.js`: modelo privado `agu-context-notebook-v1`, persistido em `agu_caderno_contextual_s15_v1`, exclusivamente no armazenamento local do navegador.
2. **Atualizado** `leitor-juridico.js`: painel Caderno AGU ativo e estilos responsivos compatíveis com o painel lateral.
3. **Atualizado** `index.html`: carrega `caderno-contextual.js?v=20261112-s15a` antes de `leitor-juridico.js?v=20261112-s15a`. Não altera chaves históricas.
4. Nenhum arquivo do repositório privado ou dados pessoais foi publicado.

## Funcionalidades
- Registros contextuais vinculados a IDs de subdivisão como `L9784:art13:II` ou `CF88:art131:p3`; correspondência ao tópico curricular derivada do artigo, nunca inserida arbitrariamente.
- Criar, listar, editar, excluir com confirmação, filtrar por tipo e por uma das sete etapas pedagógicas do método AGU.
- Cada registro: `id`, `deviceId`, `topic`, `title`, `content`, `type`, `stage`, `origin`, `createdAt`, `updatedAt`, `sources[]`, `reviewStatus`, `version` e `legacyId?`.
- Tipos: hipótese, investigação, fundamentação, distinção de prova, aplicação, dificuldade, consolidação.
- Etapas: problematização, hipótese, investigação socrática, confrontação, sistematização, aplicação AGU, consolidação.
- **Fonte oficial opcional:** somente URL HTTPS presente entre os vínculos documentais previamente publicados pela Sprint 14 para o dispositivo selecionado; a fonte selecionada aparece como link no registro.
- **Caderno anterior:** apresenta candidatos pela disciplina (filtro amplo, não prova de relação). Requer seleção e confirmação do estudante antes de criar uma **cópia vinculada** ao dispositivo. Não modifica a chave ou o registro original; `legacyId` impede duplicação de vínculo do mesmo registro.
- **Backup:** exportação JSON local e importação validada em modo **aditivo**, sem sobrescrever registros existentes; rejeita IDs repetidos no arquivo, dispositivos desconhecidos e fontes que não pertencem aos vínculos do dispositivo. O limite de arquivo pela UI é 3 MB.
- Nenhuma anotação gerada automaticamente a partir de chats externos ou da Auditoria 03; distinção explícita entre nota pessoal e fonte jurídica auditada.

## Testes — 37/37
- Sintaxe: corpus normativo, relações, Caderno, leitor, revisão, planejamento e `index.html` inline.
- Interface: ordem dos scripts, menu preservado, sete etapas pedagógicas, painel contextual, seleção de fonte e visualização do link.
- Modelo: criação, ID granular, isolamento entre dispositivos, edição sem mudar ID, versão, rejeição de título inválido, exclusão com confirmação.
- Segurança: fontes externas não auditadas rejeitadas, IDs inexistentes rejeitados, mapeamento legado somente com escolha explícita, duplicidade de vínculo impedida.
- Backup: exportação e reimportação idempotente, importação aditiva de novo registro, rejeição de IDs repetidos e URL não vinculada.
- Integridade: recarregamento simulado; preservação intacta de `agu_quiz_mvp1_2026`, `agu_quiz_revisao_inteligente_v1` e `agu_quiz_planejamento_semanal_v1`. Corpus de 7 artigos, 18 unidades e 18 vínculos da Sprint 14 preservado.

**Limite dos testes:** execução JavaScript em ambiente simulado, sem Playwright, DOM real, dispositivo físico ou garantia de deploy atual já propagado.

## Limitações e decisões
1. Registros ficam **somente neste navegador**; não há login nem sincronização.
2. Comentários pessoais anteriores da própria Sprint 13 (`agu_leitor_juridico_s13_v1.notes`) continuam na aba Comentários; **não foram migrados automaticamente** para o novo Caderno.
3. O acervo de Cadernos em outros chats ou no projeto não é acessado automaticamente. O vínculo só inclui registros presentes no `localStorage` legado **do mesmo navegador**.
4. A importação de outro dispositivo requer arquivo exportado; não há mesclagem em nuvem.
5. `reviewStatus: nao_avaliado` não prova domínio e não gera flashcards/revisões por si só.
6. A opção de fonte oficial é referência a evidência já publicada, não certificação da conclusão redigida pelo estudante.
7. A inclusão de Caderno em backups gerais do aplicativo exige uma política de backup consolidado futura; nesta sprint o módulo fornece JSON próprio.

## Teste manual recomendado
No Android, abrir `https://talksxb.github.io/agu-quiz/` → Leitor Jurídico → Lei 9.784/1999 → Art. 13 → inciso II → Relacionados → Caderno. Criar anotação, vincular fonte, salvar e reabrir no mesmo navegador. Exportar JSON; testar importação aditiva.

## Handoff Sprint 16
Criar jornada **Texto normativo → Caderno → questões Cebraspe verificadas → flashcards → avaliação e revisão** em uma única interface. Reutilizar `leitor-juridico.js`, `caderno-contextual.js`, `revisao-inteligente.js`, `dados/relacoes-juridicas-s14.js` e os acervos de flashcards existentes. Não atribuir questões históricas a dispositivos sem gabarito e pertinência auditados. Preservar IDs e históricos e só criar interações entre módulos mediante registros reais; testar Android e sincronização de estado local. Produzir checkpoint e prompt da Sprint 17. **Não iniciar a Sprint 16 nesta execução.**
