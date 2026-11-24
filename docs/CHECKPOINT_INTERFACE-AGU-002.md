# CHECKPOINT INTERFACE-AGU-002 — leitor de legislação no celular

Data de execução: 23/11/2026 (America/Sao_Paulo). Origem: `docs/PROMPT_INTERFACE-AGU-002.md`.

## Retomada efetivamente conferida
- Main de partida: `4b311dfdf44c3182e67c50c3f31133b8efc497b0`.
- INTERFACE-AGU-001: PR #84 integrada em `ee52ed2bc41a61cfd9db4ed803fd7a0840cfb1b6`, deploy Pages `45271753789` publicado, conforme PR e checkpoint.
- Branch desta etapa: `feat/interface-agu-002-reader-mobile`. PRs independentes #81, #83, #85, #87 e #88 não foram integradas por conveniência.
- Bases pedagógicas finais do Projeto consultadas em 23/11: Base Mestra v5.2, Leitura Completa v1.1, Caderno e Handoff v2.1 e Leia-me Primeiro v2. Não houve abertura da auditoria privada para esta mudança visual.

## Diagnóstico antes da mudança
O leitor `leitor-juridico.js` usava os painéis `index/text/related` com três botões móveis sem `aria-pressed` nem estilo do estado selecionado. A troca redesenhava o conteúdo sem salvar explicitamente a posição de rolagem por painel; o usuário voltava ao texto em uma posição sujeita ao reflow. A navegação de volta ao acervo dependia do menu secundário horizontal.

## Delta restrito
- `leitor-juridico.js`: estado visual + semântico dos três painéis (`aria-pressed`), linha de localização da norma/artigo, ação de volta ao acervo pela rota existente, estilos de toque e legibilidade em telas estreitas.
- A rolagem de cada painel é mantida **em memória, por artigo**, apenas durante a sessão do documento, sem alterar o armazenamento ou o contrato de backup. A seleção de artigo, unidade, aba, anotações e marcações usa os métodos preexistentes.
- `tests/interface-agu-002-browser.cjs`: cenários sintéticos 320/390/430/768/1280 px, percurso por Biblioteca, ida/volta entre painéis, teclado/foco, estado/nota, texto 200%, overflow, axe registrado e retorno ao acervo.
- CI existente ganhou apenas a execução e a coleta das evidências dessa regressão.

## Preservação
Nenhum corpo de norma, jurisprudência, questão/gabarito, carta, livro, ID, prazo, conteúdo de caderno ou dados de auditoria foi modificado. Nenhum acervo privado foi exportado/consultado. A interface de produção continua sendo o mesmo leitor e mesmo GitHub Pages.

## Verificação — preencher somente com evidência efetiva
- Revisão de escopo por diff: arquivos estritamente delimitados acima.
- Teste em Chromium / CI: **aguardando resultado após abertura da PR**.
- Teste Android físico e TalkBack: **não disponível nesta sessão; não realizado**.
- Axe incompleto não equivale a aprovação de contraste.
- Publicação: **não presumida**; condicionada à CI verde do HEAD exato e verificação de independência das demais PRs.

## Continuidade
Ver `docs/PROMPT_INTERFACE-AGU-003.md` — validação residual em dispositivo nativo e retornos contextuais, condicionada a evidência nova. Não executar no lote 002.
