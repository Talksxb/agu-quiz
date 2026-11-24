# AGU QUIZ | WORK — INTERFACE-AGU-003 — RETOMADA NATIVA CONDICIONADA

**Não é INTERFACE-AGU-004.** Retomar exclusivamente a pendência material de INTERFACE-AGU-003 **somente quando houver (a) acesso real e autorizado a um aparelho Android com TalkBack, ou (b) evidência nova, específica, reproduzível do leitor de legislação**. Não repetir suítes de emulação por rotina nem produzir PR artificial.

## Governança e ponto de partida

Repositório `Talksxb/agu-quiz`, Pages `https://talksxb.github.io/agu-quiz/`. Ler `docs/CHECKPOINT_INTERFACE-AGU-003.md` na branch `docs/interface-agu-003-native-a11y-checkpoint`, `docs/CHECKPOINT_INTERFACE-AGU-002.md` e PR #89. Reconfirmar `main`, SHA, CI e deploy **atuais**; não assumir que a documentação da branch já foi integrada. Aplicar AGU_BASE_MESTRA_v5.2_FINAL, AGU_PADRAO_LEITURA_COMPLETA_v1.1_FINAL, AGU_CADERNO_E_HANDOFF_v2.1_FINAL e AGU_LEIA_ME_PRIMEIRO_v2_FINAL.

O último checkpoint registrou `main=ce027ca3dd20755f1dcc621037cb55aff4e8787c`, CI pós-merge #45297373885 e deploy #45297372375 bem-sucedidos. O teste INTERFACE-AGU-002 reportou `axeInconclusive:1`. Esses valores são **históricos**, exigem reconfirmação para a nova data. Eles **não provam** conformidade WCAG, aprovação TalkBack ou defeito de contraste.

## Entrada necessária e evidência

Se houver **aparelho autorizado**, registrar modelo, Android, Chrome/navegador e versão, TalkBack/versão, fonte e zoom, data e SHA do site; fazer o percurso **Início → Biblioteca Inteligente → Legislação e materiais → artigo → índice/relacionados → retorno**. Examinar fala e ordem de leitura do contexto da norma/artigo, anúncio de `aria-pressed`, foco no artigo escolhido, leitura de artigo extenso, volta ao mesmo dispositivo e preservação de nota **sintética**. Não apagar dados pessoais nem importar backup; usar perfil de teste isolado.

Se houver **relato novo de defeito**, registrar passos, resultado esperado/obtido, captura ou descrição autorizada, navegador e versão, dispositivo e possibilidade de reproduzir. Diferenciar especificamente a falha da ausência de medição anterior. Para contraste, identificar nó e regra inconclusivos antes de medir as cores; axe incompleto por si só não é reprovação.

## Regras de execução

Sem aparelho nem defeito novo: fechar com diagnóstico de limitação, **sem code patch, PR, merge, deploy, repetição de navegador sintético ou nova contagem de testes**. Não avançar a próxima frente.

Se uma falha for reproduzida: corrigir somente apresentação/foco/navegação dos componentes existentes `leitor-juridico.js` e estilos; não trocar leitor ou contrato. Preservar texto legal, IDs, fontes, questões/gabaritos, livros, agenda, respostas, Caderno, progresso e backup. Trabalhar em branch própria, documentar antes/depois, testar o cenário real e apenas as regressões pertinentes; abrir PR com evidência, CI do HEAD exato e publicar no Pages existente somente após o gate aprovado. Reconfirmar que PRs independentes não foram misturadas.

## Saída obrigatória

Checkpoint curto e rastreável com escopo, SHA, fontes/checks realmente abertos, passos, dispositivo ou limitação, falhas e resultados, status de acesso/contraste, preservação, decisão motivada de patch/PR, CI, merge e deploy **somente se efetivos**. Próximo prompt integral apenas se restar pendência real, sem promover a etapa 004 por inércia.
