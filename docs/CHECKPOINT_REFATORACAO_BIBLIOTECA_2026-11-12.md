# AGU Quiz | Refatoração da navegação e Biblioteca Inteligente

**Execução:** 2026-11-12 (após Sprint 17; Sprint 18 de questões não concluída nesta execução).  
**Estado:** alterações publicadas na branch padrão, **59/59 verificações automatizadas locais simuladas aprovadas**; validação de UX em dispositivo Android real e confirmação de propagação do GitHub Pages pendentes.

## Diagnóstico inicial

O `index.html` apresentava **13 botões de navegação principal**: Visão geral, Cartões C/E, Currículo, Matriz 2022, Estudar, Organização, Planejamento, Revisão Inteligente, Leitor Jurídico, Provas oficiais, Sessões, Caderno AGU e Dados. Alguns eram formatos de conteúdo, não destinos primários. Havia repetição de títulos/eyebrows e cartões decorativos; a missão diária aparecia depois de indicadores; a Revisão Inteligente concentrava resposta, notas de aplicação, armadilhas e proveniência simultaneamente abertas.

## Arquitetura publicada: quatro destinos

| Área principal | Conteúdo e rotas mantidas |
|---|---|
| **Início** (`dashboard`) | Missão recomendada, botão direto de continuidade, indicadores e registro de tempo expansíveis |
| **Estudar** (`study`) | Prática `quiz`, exploração `explore`, planejamento `planner` |
| **Biblioteca Inteligente** (`library`) | Revisão/flashcards `review`, provas `officialExam`, legislação e relações `legal`, Caderno `notebook`, currículo `curriculum`, matriz `matrix` |
| **Evolução** (`evolution`) | Organização de disciplinas `organization`, histórico de sessões `sessions`, dados e backups `settings` |

Navegação da Biblioteca: quatro acessos rápidos (**Acervo, Flashcards e revisões, Questões, Materiais**) mais botão expansível **Mais** para Caderno/Currículo/Matriz. O submenu secundário é rolável em telas estreitas; o menu principal contém só as quatro áreas. Todas as rotas pré-existentes continuam disponíveis por `setView` e não foram renomeadas/removidas. O acesso especial `?abrir=questao` continua no inicializador legado.

## Entregas de código

1. **`index.html`**: menu lateral/mobile de 4 destinos, rotas-agrupadoras `study`, `library`, `evolution`, navegação contextual com extras expansíveis, preservação do dashboard legado e das rotas individuais. 
2. **Início**: missão imediata no topo, com botão `Começar agora`, e indicadores detalhados em `<details>`; os cálculos e registros anteriores não foram apagados.
3. **`revisao-inteligente.js`**: cartão com resposta curta e seções expansíveis independentes para aplicação AGU, armadilha, rastreabilidade e fonte/status; histórico e exportação também em `<details>`; catálogo agrupado por código de disciplina/ID curricular em `<optgroup>`; seleção de qualquer um dos 36 cartões sem modificar seus IDs.
4. **Design**: títulos reduzidos, estilos discretos, espaçamentos compactos, foco visível, preferências de movimento reduzido, botões com altura confortável para toque, layout mobile-first das áreas.

## Preservação e decisões

- Mantidas as **16 rotas renderizáveis** (4 áreas novas + 12 vistas legadas), os IDs e todos os arquivos de legislação, jurisprudência, Caderno, planejamento, sessões, questões e revisão. Nenhum dado pessoal foi publicado.
- `agu_quiz_mvp1_2026`, `agu_quiz_revisao_inteligente_v1` e demais chaves continuam com o mesmo formato e lógica; nenhuma migração destrutiva.
- Revisões espaçadas e seu motor continuam inalterados. A nova organização do catálogo utiliza os códigos `ADM-06`, `CON-50` etc., não atribui IDs não verificados.
- Questões oficiais históricas não foram promovidas a juridicamente certificadas nesta refatoração. O leitor jurídico mantém separação de normas e evidências.
- **Sprint 18 — auditoria e integração de questões oficiais** continua pendente. Esta execução foi redirecionada à refatoração visual solicitada; não declarar concluída a Sprint 18.

## Testes executados

**59/59 verificações automatizadas locais simuladas:** sintaxe e carregamento dos módulos, 4 entradas de navegação principal, renderização de 16 rotas (incluindo `review`, `legal`, `planner`, `officialExam`, `notebook`, `matrix`), presença de destinos internos da Biblioteca, único `<h1>` na página acervo, missão do dia antes dos indicadores, componentes de resumo expansíveis, 36 cartões preservados, resposta ocultada antes de revelar, seções de fundamento expansíveis após revelar, avaliação `Errei`, persistência de uma tentativa e agendamento no motor de revisão anterior, manutenção das chaves de dados locais.

**Não testado:** navegação real no Android, rolagem touch, comportamento de menu expansível real com DOM/browser, GitHub Pages ao vivo, leitores de tela em dispositivo físico. Testes são simulações de JS/HTML com DOM mínimo.

## Próxima continuidade

1. Validar no Android a visibilidade de **Início | Estudar | Biblioteca Inteligente | Evolução**, o retorno entre subrotas e a abertura do menu expansível da Biblioteca.
2. Executar Sprint 18 em tarefa separada, lendo checkpoints mais recentes antes de selecionar questões e sem confundir provas AGU 2015/2023.
3. Como melhoria de UX posterior, considerar histórico de subrota de Biblioteca, foco/rolagem ao alternar painéis e verificação de contraste por ferramenta de acessibilidade.
