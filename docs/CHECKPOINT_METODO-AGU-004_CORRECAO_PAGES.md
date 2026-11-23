# MÉTODO-AGU-004 — correção do verificador público

23/11/2026, America/Sao_Paulo. Continuação da conferência de publicação, sem nova alteração do produto.

## Publicação realizada e falha observada

A PR #79 foi integrada no commit `f1705ab54d5ebcb12d9195c4f5d42ee5d67a265a`, árvore `d749d66fecf1ef0c265eafaf36ba923c720fc53d`, após CI 45193845764 aprovada no HEAD `1087b975a61981f494080e1fb0300f8fd1722737`. O deploy nativo 45195111547 concluiu com sucesso.

Na CI da main 45195112822, o job público conferiu **29 arquivos iguais ao checkout**. Em seguida, S21 parou sete vezes em `HTML sem a versão esperada`: o primeiro guard exigia `backup-local-s20.js?v=20261115-leg11`, enquanto o HTML publicado e a comparação posterior do próprio teste já usavam `20261123-metodo03`. O hash público da Home foi `365fbb8290f1456681849b32e1197ff5fdb746ab7b9a5ffb4050901aa05b01a9`, igual ao checkout. Não era falha de propagação após o cotejo dos 29 assets.

Essa expectativa antiga não havia sido alcançada pela CI da PR, cujo job de produção era omitido. A revisão anterior não a detectou. O verificador foi corrigido e a falha permanece registrada; não se reclassifica a CI antiga como sucesso.

## Correção preparada em branch própria

Branch `fix/metodo-agu-004-pages-check`, a partir da main publicada acima. O primeiro guard passa a obter a versão esperada do HTML local. Os hashes integrais, verificação HTTPS e comparações restantes continuam ativos.

`tests/metodo-agu-004-pages-validacao.cjs` executa o verificador real com respostas artificiais byte a byte. Antes do patch, até o caso inteiramente alinhado falhava; depois, ele passa e o caso com asset divergente continua rejeitado. O teste entra na integridade Node para detectar futuras expectativas de cache incompatíveis antes de publicar.

O job reutilizável `pages-revisao-compativel` confere o verificador e as jornadas na URL pública **somente** quando a PR altera S21 e mantém os arquivos de funcionamento iguais à base. Assim é possível validar a correção sem publicar outra versão do site ou usar perfil pessoal. Para PRs de produto ainda não publicado, o job omite essa comparação. O job normal `pages-publicado` da main permanece obrigatório e distinto.

Arquivos: verificador S21, teste novo, workflow e documentos de checkpoint/continuidade. Não há delta em HTML, JavaScript/CSS do produto, `dados`, `livros`, `lib` ou `fontes` desta correção.

## Autorização e fechamento

O prompt 004 autoriza integrar exclusivamente a PR #79 (“nenhuma outra PR é abrangida”). Por isso esta correção será entregue em **PR draft**, testada e reviewável, sem integrar outra PR nesta execução. O resultado final da CI, SHA/árvore, número da PR, artefatos e testes públicos será registrado em sua descrição e no fechamento da PR #79.

Próxima execução imediata: [MÉTODO-AGU-005](PROMPT_METODO-AGU-005.md), para revisar/integrar esta correção e concluir a CI da main, quando solicitada. A proposta de triagem Ambiental foi preservada como [MÉTODO-AGU-006](PROMPT_METODO-AGU-006.md), sem execução antecipada. Android físico/TalkBack e arquivo pessoal não testados; não há novos dados reais de aprendizagem.
