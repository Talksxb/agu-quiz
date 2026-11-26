# AGU Quiz | Biblioteca de legislação — etapa 04 (handoff; NÃO EXECUTAR agora)

Executar somente mediante nova autorização expressa; uma etapa por execução. Repositório público `Talksxb/agu-quiz`. Reconfirmar o HEAD da `main`, PRs e CI/Pages antes de qualquer escrita. Ler `docs/BIBLIOTECA_LEIS_03_FONTES_OFICIAIS_2026-11-16.md`, os checkpoints das etapas 01/02, o gerador `scripts/gerar-codigos-cc-cpc.cjs`, sua fixture e o contrato do leitor/backup.

## Missão
Realizar **cotejo oficial reproduzível em lote delimitado** do CC e CPC. A etapa 03 localizou textos atualizados oficiais da Câmara acessíveis em leitura web, mas **não** obteve arquivos brutos nem realizou comparação integral. URLs:
- CC: https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html
- CPC: https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html

**Portão:** somente executar comparação ou alterações de texto quando for possível capturar integralmente bytes oficiais com provenance, data/hora, hashes SHA-256 e método reexecutável. Não contornar CAPTCHA do Planalto. Sem captura, encerrar de modo documental e sem repetição artificial. Fixar corte jurídico temporal e verificar separadamente vigência/eficácia.

Priorizar primeiro lote controlável, com cobertura explícita e comparação de cada artigo/parágrafo/inciso/alínea pertinente; registrar omissões, divergências, revogações, notas editoriais e atos posteriores a 12/10/2026. Não promover `textVerification`, `contentCoverage` ou `auditStatus` integralmente por amostra.

## Invariantes
Uma norma aberta por vez, seletor recolhido, tags editoriais de matéria, busca/salto e limites de 49 artigos. Manter oito diplomas e IDs, `topic:null` nos códigos sem vínculo certificado, uma lista `forNotebook` e nove categorias S20, restauração somente de ausentes, nenhuma mudança em cronograma, revisão, questões, baralhos ou material privado. Fontes espelhadas continuam `mirror_unverified` enquanto faltar prova.

Nova legislação (Lei 14.133/2021, Lei 8.112/1990, CTN) somente sob autorização inequívoca e confronto literal com o edital; não incluí-la neste lote.

## Aceite
Documentar origem, bytes/hashes, normalização, matriz de comparação, alterações por ID e efeitos temporais; se houver patch, fixture SHA-256 encadeada sem regravar anteriores, regressões Node e Chromium com dados sintéticos nas cinco larguras 320/360/390/430/1280, axe separado em violations/incomplete/passed, backup local, CI verde, Pages HTTP 200 e SHA de assets após eventual merge. Não alegar testes ausentes. Abrir PR própria em rascunho, sem force push/rebase/merge inseguro. Entregar relatório da etapa 04 e preparar prompt da 05 sem executá-la.
