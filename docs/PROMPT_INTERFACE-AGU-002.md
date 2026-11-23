# AGU QUIZ | WORK — INTERFACE-AGU-002

Executar exclusivamente INTERFACE-AGU-002 — legibilidade e navegação na legislação pelo celular.

## Retomada

Repositório: `Talksxb/agu-quiz`. Produção: `https://talksxb.github.io/agu-quiz/`. Ler `docs/CHECKPOINT_INTERFACE-AGU-001.md`, o fechamento efetivo da PR da branch `feat/interface-agu-001-mobile`, README, instruções do repositório e as quatro regras pedagógicas finais disponíveis no Projeto. Reconfirmar main, PRs e publicação; não presumir que a versão anterior foi integrada. Se ainda não foi, avaliar primeiro sua CI e seus conflitos. Não integrar outras PRs por conveniência.

## Missão delimitada

Verificar o percurso **Início → Biblioteca Inteligente → Legislação e materiais → dispositivo → retorno** no celular. Partir dos componentes reais de `leitor-juridico.js` e seus estilos. Identificar dificuldades concretas de leitura, excesso de controles simultâneos ou retorno ao contexto. Se houver defeito reproduzível, corrigir somente a apresentação e a navegação necessárias, preservando seleção da norma, dispositivo, posição de leitura e notas. Não criar segundo leitor nem trocar os contratos de dados.

Telas de 320, 390 e 430 px; tablet 768 px; desktop 1280 px; texto a 200%; teclado e foco. Havendo Android/TalkBack realmente disponível e autorizado, registrar observações específicas. Caso contrário, declarar a limitação e não repetir ensaios idênticos só para gerar nova contagem.

## Preservação e evidência

Não alterar conteúdo jurídico, origem/gabarito de questões, IDs, capítulos, agenda, respostas, Caderno, backup ou status de auditoria. Não consultar/exportar acervo privado para um ajuste visual. Não inferir domínio a partir de acesso ou leitura. Preservar fixtures históricas e encadear somente deltas explícitos necessários.

Testar o defeito e a correção, ausência de rolagem horizontal, alvos e foco, mais as regressões pertinentes. Axe inconclusivo não é aprovação de contraste. Trabalhar em branch própria e abrir PR. Publicar a alteração desta execução no Pages existente somente depois de CI verde do HEAD exato e de confirmar que nenhuma frente independente será integrada. Se não houver defeito novo ou melhoria delimitada verificável, encerrar com diagnóstico concreto, sem patch artificial.

Entregar checkpoint, link do resultado efetivo e prompt completo da próxima execução com fundamento em pendência real. Não executar INTERFACE-AGU-003 neste lote.
