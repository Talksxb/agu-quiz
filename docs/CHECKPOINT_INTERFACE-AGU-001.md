# INTERFACE-AGU-001 — início no topo e uso no celular

23/11/2026, America/Sao_Paulo. Solicitação: “Melhorar a interface”, acompanhada de captura do AGU Quiz com navegação lateral, conteúdo reduzido e grande espaço vazio.

## Base e diagnóstico

Main consultada: `1191267482ace4429cfd9d5f559a626461b29493`. PRs #81 (triagem editorial) e #82 (simulados) estavam abertas e independentes. Branch própria `feat/interface-agu-001-mobile`; não integra essas frentes. Instruções pedagógicas finais do Projeto consultadas; não houve consulta ou modificação da auditoria privada, produção jurídica ou atividade do estudante.

O `margin:auto` em `.main`, dentro do grid com `min-height:100vh`, centralizava verticalmente as páginas curtas. Em tela alta, o vazio crescia com a altura disponível. A captura também mostrava a apresentação de desktop reduzida no telefone; não se presume a configuração do navegador do usuário.

## Implementação

- Folha `interface-agu.css`: `.main` no topo, grid sem largura mínima implícita, tipografia base 16 px, textos auxiliares proporcionais e foco visível.
- Navegação principal inferior em telas até 860 px e, até 1100 px, em dispositivos que informem ponteiro de toque. A apresentação lateral permanece em telas maiores. Quatro destinos originais e nomes acessíveis preservados; ícones decorativos, área segura inferior e espaço para o conteúdo.
- Missão com hierarquia visual, botão principal amplo, três indicadores e atalhos em grid. Contagens e escolha da próxima atividade continuam nos motores existentes.
- Link “Ir para o conteúdo”. Navegação principal volta ao topo ao trocar de destino; rotas e foco dos fluxos internos continuam existentes.
- Delta exato de HTML encadeado antes dos hashes históricos. Não substitui baselines anteriores; a cadeia verifica a reversão integral dos trechos visuais.

Não altera corpus, cartões, capítulos, respostas, agenda, plano, Caderno, contratos de backup ou chaves de armazenamento.

## Validação e publicação

Os 44 comandos do job Node vigente passaram localmente após a mudança visual inicial; a cadeia e a suíte MÉTODO-AGU-001 foram reconferidas depois do ajuste de rolagem. A prévia no navegador confirmou título a 40 px do topo em 1363 px, o novo painel e a navegação Biblioteca/Início.

Regressão específica na CI: 320/360/390/430/768 px, 980 px com toque e mouse e altura de 1920 px, e 1280 px; geometria, reflow a 200%, alvos, foco final, rolagem, estado principal preservado e axe nas quatro páginas. A CI mantém todas as jornadas anteriores. Capturas e relatório são artefatos, não dados pessoais. Resultado final, SHA da PR, merge e publicação devem ser registrados na descrição da PR após efetivamente verificados; este documento não antecipa esses resultados.

Publicação pretendida exclusivamente pelo fluxo GitHub Pages existente, após aprovação dos checks do HEAD exato. Não há migração para outro domínio. Android físico, TalkBack e a configuração específica do navegador da captura não foram testados; axe e emulação não certificam conformidade integral.

A primeira CI (`45267376424`) confirmou os oito perfis e as 32 varreduras novas, Node e exportação. A regressão histórica Biblioteca 02 identificou overflow a 200% em 320 px: o span do contexto “Dispositivo selecionado” atingia 346 px. Correção restrita em CSS permite encolher e quebrar o texto desse contexto; o teste histórico permanece inalterado. A execução seguinte deve confirmar a correção e concluir as demais jornadas antes de publicar.

A inspeção das capturas também motivou um ajuste delimitado: “Biblioteca” cabe em uma linha a 320 px; quando a fonte duplica, a navegação passa a duas linhas e indicadores/atalhos passam a uma coluna, evitando colunas estreitas com palavras fragmentadas. As regressões verificam esses arranjos, sem reduzir a fonte para caber.

Continuidade em `docs/PROMPT_INTERFACE-AGU-002.md`, não executada neste lote.
