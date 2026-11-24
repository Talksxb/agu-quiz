# AGU QUIZ | WORK — INTERFACE-AGU-003

Executar **exclusivamente INTERFACE-AGU-003**, revisão de acessibilidade contextual e fidelidade em dispositivo real do leitor jurídico, **somente com evidência nova**.

## Retomada
Repositório `Talksxb/agu-quiz`, produção `https://talksxb.github.io/agu-quiz/`. Ler `docs/CHECKPOINT_INTERFACE-AGU-002.md` e a PR da branch `feat/interface-agu-002-reader-mobile`. Reconfirmar main, HEAD, CI e deploy efetivamente publicados antes de qualquer conclusão. Aplicar Base Mestra v5.2 FINAL, Padrão Leitura Completa v1.1 FINAL, Caderno e Handoff v2.1 FINAL e Leia-me Primeiro v2 FINAL, sem presumir sincronização entre ferramentas.

## Pendência real
O ensaio móvel da 002 usa Chromium emulado. Não houve teste material em Android físico ou TalkBack; axe inconclusivo não certifica contraste. Não repetir a mesma emulação sem pergunta nova. Se houver acesso autorizado a Android/TalkBack, verificar leitura do contexto de norma/artigo, anúncio do painel ativo, leitura de dispositivos extensos, navegação por cabeçalhos e retorno ao acervo; registrar aparelho, SO, navegador, versões, sequência e falhas observadas. Se não houver dispositivo, produzir diagnóstico/documentação sem patch artificial.

## Escopo de eventual correção
Corrigir apenas defeito reproduzível no fluxo Início → Biblioteca → Legislação e materiais → artigo → relacionados/índice → retorno, sem trocar o leitor nem o contrato de dados. Emular 320/390/430/768/1280 px, texto 200%, foco e rolagem horizontal somente quando fundamentado por defeito novo. Preservar seleção de norma/artigo/unidade, notas e histórico. Não alterar corpus, fontes, conteúdo jurídico, questões, livros, gabaritos, auditoria, Caderno, backup ou progresso de domínio.

## Governança e entrega
Branch própria; evidência antes/depois, regressões e CI do HEAD exato. Abrir PR apenas se houver delta verificável. Publicar em Pages somente depois de CI verde, confirmar que nenhuma PR independente foi misturada e verificar o deploy efetivo. Registrar checkpoint com fontes/checks acessados, limitações, SHA, resultado, links e prompt integral subsequente somente se restar pendência material. Não declarar conformidade WCAG ou aprovação de TalkBack sem medição direta.
