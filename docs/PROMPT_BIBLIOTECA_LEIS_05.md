# AGU Quiz | Biblioteca de legislação — etapa 05 (handoff; NÃO EXECUTAR agora)

Executar apenas com nova autorização expressa, uma etapa por execução. Fonte de verdade: `Talksxb/agu-quiz/main`; confirmar HEAD, PRs concorrentes, CI e Pages atuais. Ler `docs/BIBLIOTECA_LEIS_04_COTEJO_LOTE_2026-11-16.md`, relatórios 01–03, `scripts/cotejar-biblioteca-lote04.py`, gerador dos códigos, fixtures e contratos do leitor/backup. A PR da etapa 03 (#49) pode ainda estar aberta; não assumir merge nem rebase automático.

## Missão exclusiva

Prosseguir com **lote delimitado e reproduzível**, sugeridos CC arts. 6º–20 e CPC arts. 6º–20, sem promoção de cobertura integral. Obter HTML oficial atualizado da Câmara em arquivos temporários, registrar data/hora, HTTP/headers, bytes/SHA-256 e corte jurídico de eficácia. Reexecutar lote04 e conferir estabilidade da base; distinguir divergência normativa, nota editorial, alteração de redação, revogação, veto, subdivisão, mudança superveniente e problema do extrator.

Na etapa 04, arts. 1º–5º de ambos os códigos tiveram 8 correspondências completas normalizadas e 2 diferenças editoriais (CC arts. 3º–4º); não declarar esses dois textos integralmente idênticos. Melhorar o parser de forma testável antes de afirmar equivalência de normas. Documentar leis modificadoras, publicação, vigência e produção de efeitos com referências oficiais específicas. Não contornar CAPTCHA do Planalto.

## Guardrails

Preservar oito normas e todos os IDs, uma norma aberta por vez, seletor recolhido, tags editoriais, limite de índice 49, uma lista `forNotebook`, nove categorias de backup e restaurar apenas categorias ausentes. Não alterar currículo, `topic:null`, estudo, revisão, questões ou cartas por semelhança. CC/CPC continuam `mirror_unverified`, `partial` e `pending` até cotejo integral verificável. Não importar CTN, Lei 14.133 ou Lei 8.112 sem escopo próprio autorizado.

Se houver correção real de corpus, escrever teste que falhe primeiro, gerar nova fixture de hashes encadeada, preservar notas/anotações locais, validar Node, Chromium nas cinco larguras, axe com violations/incomplete/passed separados e backup S20. Branch e PR próprias em rascunho; sem merge enquanto CI não estiver verde. Confirmar Pages HTTP 200/SHA após eventual merge. Se for apenas documentação/script offline, distinguir claramente testes executados de ensaios não aplicáveis e manter PR sem integração automática.

Entregar checkpoint com matriz por ID e fontes/hashes, PR/commits/CI/merge/Pages reais, pendências, e preparar prompt da etapa 06 sem executá-la.
