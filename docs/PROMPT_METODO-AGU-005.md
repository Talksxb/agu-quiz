# AGU QUIZ | WORK — MÉTODO-AGU-005

Consolidar a verificação pública do backup

Executar exclusivamente MÉTODO-AGU-005 quando solicitado em nova execução. Não executar este prompt no fechamento de 004.

## Missão e autorização

Revisar a PR da branch `fix/metodo-agu-004-pages-check` em `Talksxb/agu-quiz` e, se apta, integrar **somente essa PR** para corrigir o verificador público. A solicitação de executar 005 autoriza essa integração/publicação condicionada aos checks. Não abrange outras PRs ou ingresso de capítulos.

O backup já foi integrado pela PR #79 na etapa 004. A checagem dos 29 arquivos servidos passou, mas o teste histórico S21 ainda exigia um cache antigo no primeiro guard, apesar de a comparação posterior já esperar o novo. A correção altera o teste, não os arquivos de funcionamento do site. Não confundir falha do verificador com deploy não realizado.

## Retomada factual obrigatória

Reconfirmar main, HEAD da branch, número/estado da PR, diff, conflitos, comentários, revisões e CI. Ler integralmente sua descrição final, o fechamento atual da PR #79, `docs/CHECKPOINT_METODO-AGU-004_CORRECAO_PAGES.md`, `docs/CHECKPOINT_METODO-AGU-004.md`, `docs/METODO_AGU_003_BACKUP.md` e o workflow/testes atuais. Não presumir que a falha ainda existe ou repetir integração já feita.

Referências históricas a reconfirmar: main de publicação `f1705ab54d5ebcb12d9195c4f5d42ee5d67a265a`, árvore `d749d66fecf1ef0c265eafaf36ba923c720fc53d`; PR #79 integrada, deploy nativo 45195111547; CI 45195112822 teve falha no guard S21. O HEAD e a CI da correção constam da própria PR, não devem ser inferidos destes números antigos.

Aplicar os quatro documentos finais do Projeto AGU e `docs/AGU_PADRAO_EDITORIAL_CAPITULOS_v1.md`. Não consultar/importar a auditoria privada para este reparo de teste. Não usar dados ou perfil real do estudante.

## Revisão e critérios

1. Conferir que o verificador obtém a versão de cache do backup do HTML local conferido, mantendo HTTPS, comparação integral do HTML, versões explícitas restantes e SHA-256 de todos os assets. Não suprimir uma checagem apenas para tornar a CI verde.
2. Executar/reaproveitar a fixture que serve os bytes exatos do checkout: caso alinhado passa; alteração artificial do backup é rejeitada. Ela deve ter reproduzido a falha antes da correção.
3. Conferir o job `pages-revisao-compativel`: só testa a URL pública em PR quando o verificador mudou e os arquivos de funcionamento continuam iguais à base. Mudanças de produto não publicado devem omitir essa comparação, não gerar sucesso falso. Os ensaios usam contextos efêmeros e respostas artificiais.
4. Confirmar no HEAD final Node, exportação editorial, Chromium histórico e a verificação pública compatível. Conferir relatórios das jornadas Método e backup em 320/390/768/1280, inclusive inconclusivos. Reutilizar resultados do mesmo HEAD; repetir somente por mudança, falha ou dúvida concreta.
5. Confirmar que não há alteração de leitor, motor, dados jurídicos, agendas ou fontes do estudante nesta correção. Se aparecer delta de produto inesperado, examiná-lo antes de ampliar o escopo por inferência.

## Integração e comprovação

Com revisão/checks aprovados, retirar somente essa PR de draft e integrar pelo fluxo regular, protegendo o HEAD esperado, sem contornar regras de branch. Aguardar o deploy nativo do novo commit e a CI da main, incluindo `pages-publicado`.

Verificar HTTP/hash e jornadas realmente servidas em `https://talksxb.github.io/agu-quiz/`. O job público da PR é evidência de teste, não publicação da correção na main. A falha antiga deve permanecer registrada como histórica; não apagá-la ou classificá-la retroativamente como sucesso.

Em qualquer falha, investigar o log e corrigir o defeito demonstrado antes de declarar encerramento. Não reexecutar o mesmo SHA esperando que um literal errado mude sozinho. Não limpar dados do usuário, importar arquivo pessoal ou alegar Android físico/TalkBack indisponíveis.

## Entrega e próxima execução

Entregar URL, PR, commits, arquivos, CI/deploy, hashes, resultados, lacunas e checkpoint atualizado. O próximo prompt editorial está preparado em `docs/PROMPT_METODO-AGU-006.md`; reconfirmar sua necessidade e fornecer o prompt completo sem executá-lo neste lote.

Não reescrever obras, aprovar cartões, ingerir capítulos, modificar a auditoria privada, criar login/Azure/banco remoto ou sincronizar GPT Sites. Se a correção já estiver integrada, limitar-se a verificar o estado atual e registrar o resultado sem patch redundante.
