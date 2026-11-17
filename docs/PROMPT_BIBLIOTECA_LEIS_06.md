# AGU Quiz | Biblioteca de legislação — etapa 06 (handoff; NÃO EXECUTAR agora)

Somente mediante nova autorização expressa. Uma etapa por execução. Repositório: `Talksxb/agu-quiz`. Reconfirmar `main`, PRs #49/#50 e PR da etapa 05, CI/Pages, divergências e branch-base antes de editar. A etapa 05 foi empilhada sobre etapa 04 por depender do extrator; não rebasear ou mesclar automaticamente. Ler integralmente `docs/BIBLIOTECA_LEIS_05_COTEJO_06_20_2026-11-16.md`, relatório 04, script e testes Python e checkpoints de fonte/backup.

## Missão exclusiva

Executar próximo lote delimitado de cotejo oficial, preferencialmente CC e CPC arts. **21–40**, com obtenção direta das duas fontes atualizadas da Câmara via HTTPS, hashes SHA-256, horários, headers e corte de efeitos explicitado. Repetir regressões 1–5 e 6–20 com as novas fontes para detectar mudanças em captura. Não contornar CAPTCHA do Planalto.

Elevar o rigor do extrator: distinguir notas editoriais, remissões a julgados, texto normativo, parágrafos/incisos/alíneas, títulos estruturais e efeitos temporais. Testar casos adversariais com fixture sintética antes de classificar divergências; inspecionar individualmente diferenças e consultar os atos oficiais relevantes. A etapa 05 identificou 27 coincidências normalizadas e 3 diferenças aparentes em notas editoriais (CC 10/20, CPC 12), sem prova de divergência normativa material. A etapa 04 identificou 8 coincidências e 2 diferenças (CC 3/4). Não elevar status jurídico por essa amostra.

## Invariantes

Preservar oito normas, IDs, textos e notas do leitor sem alteração não demonstrada, `mirror_unverified`, `contentCoverage:'partial'`, `textVerification.status:'pending'`, `topic:null` dos códigos, uma norma de cada vez, tags por matéria, índice 49 e salto por número, uma lista `forNotebook` e nove categorias do backup S20. Não tocar revisão, aulas, questões, baralhos, cronograma nem auditoria privada. Nova legislação como CTN ou Lei 14.133 requer autorização e etapa próprias.

## Testes e entrega

Se houver correção de corpus, teste falhando primeiro, fixture SHA-256 nova sem reescrever baselines, regressões Node, Chromium em 320/360/390/430/1280, axe com violations/incomplete/passed separados e backup sintético. PR em rascunho sem force push/rebase/merge inseguro; merge somente após CI verde, Pages e hashes publicados verificados. Sem alteração de produto, fazer somente testes do extrator e regressões relevantes, sem declarar ensaios não realizados. Entregar matriz por dispositivo, referências/efeitos, relatório da etapa 06, estado de PR/CI e prompt da etapa 07 **sem executá-lo**.
