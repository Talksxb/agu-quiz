# AGU Quiz | Sprint 17 — Consolidação do Leitor Jurídico

**Data:** 2026-11-12  
**Status:** código implementado na branch padrão, leitura pós-escrita confirmada; **61/61 testes automatizados locais simulados aprovados**. Não houve teste visual em Android, E2E com navegador real ou confirmação do deploy ao vivo (DNS externo indisponível no ambiente).

## 1. Estado e evidências consultados

- `docs/CHECKPOINT_SPRINT16_ESTUDO_2026-11-12.md`, `index.html`, `leitor-juridico.js`, `estudo-integrado.js`, `caderno-contextual.js`, `revisao-inteligente.js`, `planejamento-semanal.js`, `dados/legislacao-s13.js`, `dados/relacoes-juridicas-s14.js`, `dados/flashcards-aud03-lote01.js`.
- Auditoria privada: `docs/PROTOCOLO.md`, `checkpoints/estado.json`, `data/AGU_MATRIZ_CURRICULAR_2022_v3.json`, 412 IDs. Último checkpoint geral: **AUD03-005**, status `auditoria_documental_parcial_nao_certificada`; nenhum conteúdo promovido a certificação integral.
- Evidências aproveitadas por referência pública já publicada: `NORM-ADM-002` (ADM-06), `NORM-CON-017` (CON-50 e CON-51); sem copiar arquivos privados.
- Corpus atual: CF/1988 arts. 131–132 e Lei 9.784/1999 arts. 11–15, 7 artigos, 18 subdivisões, 18 vínculos documentais individuais da Sprint 14.

## 2. Alterações publicadas

1. **Novo `leitor-consolidacao.js`**: busca por texto normativo, número/ID do dispositivo, tópicos curriculares, jurisprudência registrada, flashcards com vínculo temático e notas contextuais armazenadas localmente. Pesquisa insensível a acentos. Resultados identificam natureza, estado, vínculo e dispositivo; abrir resultado seleciona a unidade e, no mobile, a tela de texto.
2. **Novo `dados/versoes-normativas-s17.js`**: 18 registros de versão correspondentes às unidades já incorporadas; `versionId`, ponteiro para o texto normativo original, URL oficial, data de consulta, data de publicação/vigência ainda não verificada, eventual ato modificador (lista vazia), histórico de redações (lista vazia) e status explícito de cadeia normativa não certificada. **Não existe comparação histórica nesta sprint**: UI exibe essa limitação e a fonte oficial.
3. **Atualizado `leitor-juridico.js`**: pesquisa e filtros no índice; controle de tamanho da fonte (90%, 100%, 115%, 130%); cartão de versão documental no painel de texto; indicadores reais de atividade e ajustes mínimos de áreas de toque/mobile; preservação de seleção granular.
4. **Atualizado `estudo-integrado.js`**: JSON de backup `agu-integrated-backup-v1`, importação aditiva validada por schema/ID/dispositivo, com limite de 3 MB na UI; não sobrescreve sessões preexistentes. Detecta referências órfãs a notas e flashcards e informa sem remover ID histórico. Preserva vínculo ao mecanismo original de avaliação D+1/D+7/D+21/D+45.
5. **Atualizado `revisao-inteligente.js`**: API somente leitura de tentativas e catálogo dos **36 flashcards**; sem modificar agendamento, gabarito ou dados existentes.
6. **Atualizado `index.html`**: carrega versões, consolidação e leitor na ordem correta, com controle de cache de scripts.

## 3. Cobertura real

- Acervo Revisão Inteligente: **36 flashcards** preservados.
- **16 flashcards** vinculáveis por tópico a algum dos artigos incluídos no corpus atual; demais cartões permanecem na Revisão Inteligente, **sem criação de vinculação artificial**.
- 18 subdivisões no índice formal de versões, 18 vínculos jurídicos preexistentes, nenhuma questão oficial nova vinculada.
- Pesquisa de notas pessoais somente no navegador do estudante; nada é publicado no GitHub.
- Estado documental de um item: `confirmado` é **pontual**, não equivalente a certificação jurídica ou domínio do estudante; flashcard temático é **parcial** para relação granular.

## 4. Testes

**61/61 verificações locais aprovadas** após correção das expectativas de cobertura da busca: sintaxe dos 11 scripts/arquivos, conteúdo e unicidade de 18 registros de versão, fontes, ausência de cronologia inventada, busca por ID/artigo/texto, pesquisa sem acentos, filtros de estado e categoria, 36 flashcards preservados e 16 relações temáticas válidas, busca de nota privada, abertura no mobile com retorno ao texto, controle de tipografia, sessões persistentes, nota vinculada, avaliação real Errei com uma única tentativa e vencimento no mecanismo original, backup aditivo/idempotente, rejeição de dispositivo inválido, referências órfãs, persistência após simular reinício, preservação da chave `agu_quiz_mvp1_2026` e do planejamento, carregamento/cache dos scripts.

Uma bateria intermediária com 44/46 havia assumido incorretamente que todos os 36 flashcards deveriam ser indexados nos sete artigos — essa hipótese foi rejeitada, pois 20 cartões não se relacionam com tópicos do corpus. A versão final foi testada e passou com expectativa de 16 resultados pertinentes.

**Limitação:** Chromium disponível no ambiente, mas o DNS externo para `talksxb.github.io` não resolve. Portanto, publicação no GitHub foi confirmada por leitura da API de conteúdos, **não** por navegação real ou teste Android. A aplicação precisa de conferência manual de UX (foco, rolagem, seleção e visualização do painel lateral).

## 5. Segurança, histórico e pendências

- Sem backend novo, login, sincronização ou dados pessoais no repositório.
- Sessões exportadas **não contêm** as notas completas ou respostas de revisão: exigem backups próprios do Caderno e da Revisão Inteligente para recuperação completa em outro navegador.
- Indicação de versões é documental; nenhum texto histórico foi inventado. Reconstrução legislativa de redações anteriores depende de pesquisa específica na fonte oficial.
- A expansão do corpus de apenas sete artigos continua pendente.
- Nenhuma questão Cebraspe adicional foi liberada no leitor por ausência de conciliação entre item/caderno/gabarito definitivo/justificativa histórica e vigente/dispositivo.
- Não confundir filtros de confiabilidade com certificação integral da Auditoria 03.
- Referências órfãs não são apagadas. Não há remoção ou conserto automático de registro histórico.

## 6. Validação manual sugerida

1. Acessar `https://talksxb.github.io/agu-quiz/`, menu **§ Leitor Jurídico**, abrir **Índice** no Android.
2. Expandir **Pesquisa jurídica e filtros**, buscar **delegação**, depois **PGFN**; escolher resultado; verificar retorno ao **Texto legal**.
3. Filtrar `Jurisprudência` / `Parcial` e confirmar status e fonte de uma decisão.
4. Conferir **Lei 9.784/1999, art. 13, inciso II**; aumentar texto para **130%**.
5. Abrir **Estudo integrado**, iniciar sessão, registrar Caderno e avaliar flashcard.
6. Exportar sessões; recarregar a página, verificar persistência; importar o mesmo JSON e confirmar ausência de duplicação.
7. Retomar a sessão e verificar que as referências do Caderno não desaparecem quando presentes.

## 7. Handoff — Sprint 18

Prioridade proposta: **questões Cebraspe juridicamente auditadas no Leitor Jurídico**, devido à lacuna comprovada de zero questões oficiais vinculadas. Antes de publicar, reconciliar cada identificador de prova (AGU 2015, AGU 2022/2023, depois PF/PGFN) com caderno oficial e gabarito definitivo, verificar anulações, fundamento histórico e atual, localizador de dispositivo, e status da Auditoria 03. Apenas depois vincular, mantendo adaptação autoral identificada. Não presumir que a Auditoria 03 certificou integralmente questões, nem publicar conteúdo privado. Preservar todas as sprints 13–17, executar testes, checkpoint e prompt da Sprint 19 sem iniciá-la.
