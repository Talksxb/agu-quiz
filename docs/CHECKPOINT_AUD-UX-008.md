# AUD-UX-008 — FC-07: ocultar verso

27/11/2026 BRT. Base a750b32c7d36c731a580d2d2ab07d76b1c97ab1d; PR #121 encerrada (comentário 7224929673), Pages 46044315065 e HTTP 140659619169: 86354 bytes, SHA256 c76f362bd4fcf271344505e95e4c599191ffd5d4999efcd5b891fe09cbca1c1c. Escopo recuperado do diagnóstico AUD-UX-001, roadmap e checkpoint 005/007. Não antecipar FC-08/QT-06.

Reprodução estática anterior à alteração: sessionHTML apresenta frente como botão e verso como grupo sem comando de ocultar; reveal grava true; render e resume forçam verso se avaliado. Teste cumulativo reproduz a ausência também no navegador com base restituída por hash; execução remota ainda pendente.

Decisão: botão Ocultar resposta no verso de sessão de baralho e curta, teclado/toque, área mínima 44px, foco na frente ao ocultar e no botão de ocultar quando reexibe cartão já avaliado. Somente flag revealed existente é alterada, preservada em pausa/recarga/backup; navegar entre cartões conserva comportamento legado (avaliados reabrem no verso). Reexibir não reavalia; bloqueio de duplicidade original intacto; fila legada avulsa, ranking, prazos, histórico, chaves, conteúdo e demais fluxos inalterados. Sem nova chave.

Teste: base sem controle, ambos modos, alternância ida/volta por toque/teclado, comparação completa de storage, ocultação de cartão avaliado, retomada e restauração, tentativa duplicada bloqueada, continuidade de índice, axe estrito em quatro estados por modo nas cinco larguras, overflow. Preservar 108 assertivas prévias e exigir cinco marcadores AUD_UX_008_FC07_OK, CI verde, merge protegido e Pages build/deploy/report/HTTP. Sem Android físico/TalkBack ou inspeção humana. Ainda não certificado ou publicado.
