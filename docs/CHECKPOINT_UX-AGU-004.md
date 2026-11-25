# UX-AGU-004 — sistema visual e navegação mobile
Data: 25/11/2026, America/Sao_Paulo. Escopo: issue #97.
## Base conferida
- INTERFACE-AGU-003: PR #96, quatro workflows verdes no HEAD 51a0baa8099571e6fa47a481573595dbef8aadaa; merge 00ff1b86901ab93b98b25ace87da0a02019f27cd. A main havia avançado com sete arquivos independentes GOV-AGU-004, sem sobreposição com os seis arquivos da PR.
- Pages 45594148278: build, deploy e report-build-status concluídos com success para o commit integrado. A URL pública não pôde ser aberta diretamente pelas ferramentas desta sessão; não se certifica o cache/bytes no aparelho do estudante.
- Branch própria: feat/ux-agu-004-design-system, baseada no merge publicado acima.
## Diagnóstico e delta
A interface anterior já tinha quatro destinos e uma missão diária funcional. O CSS embutido em index.html e os módulos baralhos-ux.css e questoes-agu-bank.css ainda tinham azul-petróleo em navegação, botões, campos, seleções, superfícies e barras. O leitor já usa ameixa após 003.
- Acrescenta bloco UX-AGU-004 ao final de interface-agu.css: tokens de superfícies, tinta, ação, seleção, navegação, contraste de controles, foco, espaços, raios, tipografia e toque. Catálogo: botões/abas, campos, cards, chips, avisos neutros, barras, biblioteca, seleção do banco de questões e alguns controles dos baralhos.
- Home: reduz altura do cabeçalho e respiro excessivo em toque, reforça ação principal, agrupa contagens reais, retoma pelos atalhos originais, mantém a ordem DOM e os quatro destinos. Não altera cálculo da missão, contagens, textos ou estados.
- Mantém cores de disciplina, verde de sucesso, vermelho de erro, âmbar de revisão, feedback semântico e tema escuro próprio dos baralhos. Cores locais ainda presentes em CSS legado, leitores autônomos e módulos especializados não foram removidas globalmente; overrides restritos onde a função visual é não semântica. Consolidação dos leitores e sessões fica para #98/#99.
## Evidências e gate
- Delta de CSS apenas aditivo; teste verifica restituição byte a byte do blob 003 (8519013a7ab1abfb7612216bc5522ab91ee8a8ad). index.html, JS, corpus, fixtures históricas, gabaritos, persistência, motores, contratos de backup e dados privados intactos.
- Amplia tests/interface-agu-001-browser.cjs sem retirar asserções de produto: perfis anteriores + 1100px toque, capturas baseline em 390px das quatro telas e capturas novas nos perfis, contraste calculado de tokens e CTA, alvos de atalhos, reflow a 200% nos perfis solicitados. Artefatos sintéticos, não dados reais.
- WCAG: texto normal 4,5:1, limites de controle/foco 3:1, meta de projeto 44x44. Axe não substitui verificação manual e resultado inconclusivo não é aprovação. Android/TalkBack físico não disponível.
- Nenhuma CI deste lote, comparação visual efetiva ou publicação é declarada concluída antes da evidência do HEAD exato. PR, CI verde e escopo independente são condições para integração.
## Continuidade
Somente depois do fechamento efetivo: UX-AGU-005 (#98), leitura imersiva. Não executar neste lote.
