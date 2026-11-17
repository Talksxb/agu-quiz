# UX Estudo Integrado 03 — rascunho preservado e navegação no Caderno

17/11/2026. Execução exclusiva da S03. Aulas e correção permanecem no ChatGPT. Nenhum conteúdo jurídico, vínculo curricular, identificador, agenda ou motor foi alterado.

## Estado real e continuidade

- Main e produção na retomada: `31a47693b8f690e543f565c83208e3cdc637a547`. HTML SHA-256 `71a30f8c930cbd254bc4d22b4d9d400b322dcf92e700a6afabda79419de75ded`; 21 assets publicados comparados byte a byte com main. Não se comparou Pages à branch que ainda não foi publicada.
- PR #54/S01 aberta, ready, HEAD `517dcd842a7ba7b93ba2c21d5a386a6ae402d163`. PR #57/S02 aberta, ready, HEAD `b6050894ec86874b776572a0185552da05e6d334`. Nenhuma foi presumida integrada.
- S03 na branch `feat/ux-estudo-integrado-03`, [PR #61](https://github.com/Talksxb/agu-quiz/pull/61), base S02. Produto: `7efcbeb7a4d413231bff5e34caf71d82fa3bf113`. Cadeia preservada #54 → #57 → #61, sem rebase/force push/merge/deploy. PRs documentais paralelas da Biblioteca não foram incorporadas.
- Reaproveitados diagnóstico, investigação oficial OpenAI, contrato `agu-aula-v1`, módulos e testes anteriores. Nenhuma consulta ou cópia de evidências da auditoria privada foi necessária.

## Defeito reproduzido e correção

Na prévia real de S02, preencher `Hipótese inicial / evolução` e `Aplicação AGU`, depois selecionar uma síntese, apagava os dois campos. O painel de importação redesenhava a página inteira. A reprodução usou apenas um arquivo sintético de 10.535 bytes, sem aula pessoal; o DOM mostrou ambos os valores vazios. A prévia desse arquivo media aproximadamente 2.400 px de altura no desktop observado, com o formulário manual a cerca de 3.000 px do início da página. Isso não é uma medição de Android.

O redesenho do importador agora conserva os valores dos **três campos já existentes** (tema, hipótese e aplicação) e os recoloca no formulário original. São valores transitórios da tela, sem chave, índice, autosave ou caderno adicional. Cancelar, recusar arquivo, trocar destino, atualizar prévia, confirmar e guardar a aula preservam o rascunho. A consolidação manual continua explícita; esta correção não promete sobrevivência de rascunhos ao sair da página ou recarregá-la.

Atalhos com foco levam a Importar aula, Registro manual e Ver registros. Na síntese longa, `Ir à confirmação` alcança o título da confirmação; não marca a caixa nem salva. Após salvar, `Ver aula guardada` expande e focaliza o registro correspondente. A prévia e o registro continuam integrais, sem truncamento ou rolagem interna imposta. Controles dos atalhos têm pelo menos 44 px de altura.

Na repetição real após o patch, os dois rascunhos permaneceram preenchidos após selecionar, confirmar e guardar a aula. O registro salvo foi aberto pelo botão, e o atalho voltou ao formulário com seus valores. Captura: `evidencias-ux-estudo-integrado-03/rascunho-preservado-desktop.jpg`. Tudo sintético; o histórico pessoal não foi limpo nem usado nos ensaios.

## Acessibilidade: diagnóstico específico

O artefato **final** S02 foi obtido da CI 44110971432, HEAD `b605089…`, artefato 14341576700, 16.028.466 bytes, digest conferido `f23fa8713c2f09de83b2bf696db1cb11d86874655c41b010932d0f4343b4e438`.

Nas 30 varreduras S02 não houve violations. Os únicos inconclusivos eram `color-contrast`, para Materiais e/ou Mais na borda da navegação horizontal de 320–430 px; no desktop não havia inconclusivos. A mensagem era `elmPartiallyObscured`: fundo não determinado por ocultação parcial. A captura de 390 px mostra o item cortado na extremidade da faixa com rolagem. Isso não prova contraste inadequado nem conformidade. Resumo e seletores: `evidencias-ux-estudo-integrado-03/ci-44110971432-inconclusivos-resumo.json`.

O ensaio S03 mantém os resultados integrais de axe, sem excluir os controles/rules. Um teste adicional focaliza cada um dos cinco controles da faixa nas cinco larguras, mede sua posição dentro da área visível e examina axe sobre o controle focado. Resultados desse fechamento devem ser lidos na CI atual da PR; nenhuma afirmação depende de um ensaio ainda não executado. Não foi feito patch global na navegação com base somente no inconclusivo.

## Validação e preservação

- 38 suítes Node locais aprovadas, incluindo 13 cenários S02; todas mantidas no workflow. Fixtures históricas intocadas. O delta S03 se encadeia ao S02 somente para `index.html`, `importar-aula.js` e `importar-aula.css`.
- Jornada S03 Chromium 320/360/390/430/1280: rascunho de tema diferente preservado, JSON recusado/cancelado, prévia longa integral, confirmação e foco, acesso ao registro, consolidação manual posterior, exportação Markdown integral e restauração idempotente de backups anterior e novo. Nove categorias preservadas; nenhuma tentativa/revisão/hora adicionada pela importação ou pelos atalhos.
- CI 44115557627 **aprovada** verifica o produto `7efcbeb…` com as 38 suítes e todas as regressões históricas. O fechamento adiciona documentação/evidências e a medição focalizada da faixa horizontal; os checks do HEAD final constam da PR.
- Todas as validações mutáveis usam contextos de navegador sintéticos independentes. Home/retomada, assunto, baralhos ↔ legislação, notas, lista Para meu caderno, revisão e plano continuam cobertos pelas suítes herdadas, sem duplicação de sistemas.
- Chromium local não iniciou por restrição de socket do ambiente. Foram usados o navegador cloud para reprodução interativa e GitHub Actions para a matriz repetível. Não se contornou o bloqueio, nem se declarou ensaio local inexistente.
- Android físico, TalkBack e desempenho em aparelho real não executados. Viewport/toque emulado e axe não equivalem a avaliação assistiva humana ou certificação WCAG.

## Uso e continuidade

Ver `ENCERRAMENTO_UX_ESTUDO_INTEGRADO.md` para instruções de uso, manutenção e preparação da cadeia de publicação. S03 encerra as entregas de desenvolvimento/validação/preparação desta frente após os checks atuais aprovarem. Integração e publicação são estados separados e continuam pendentes. Nenhuma S04 foi criada apenas para repetir testes sem hipótese nova.

### Evidência do produto

CI [44115557627](https://github.com/Talksxb/agu-quiz/actions/runs/44115557627) aprovada: 38 suítes Node e todas as regressões Chromium; nova jornada com 30 varreduras, zero violations, inconclusivos de contraste separados. Artefato 14343441564, SHA-256 `cbce03426c7bde0004151e938d83169efaa1991dc8ac3374cfc7a2741afb824b`, baixado e conferido; JSON e captura de 390 px inspecionados. Resumo em `evidencias-ux-estudo-integrado-03/ci-44115557627-resumo.json`. O ensaio focalizado foi acrescentado depois dessa execução; consultar os checks atuais da PR para sua prova. Produto permanece byte a byte igual no fechamento.
