# Biblioteca de legislação — CC, CPC e seleção de uma norma por vez

**Data do trabalho:** 16/11/2026. **Escopo:** navegação do leitor e adição referencial do Código Civil (Lei 10.406/2002) e do Código de Processo Civil (Lei 13.105/2015). Este documento não certifica vigência nem correspondência integral com o texto oficial.

**Concorrência:** partida histórica `faad877`, reconciliada por merge da `main` `5329e4b` (CARTOES-AUD-01). Mantidos os oito cartões autorais e seu script, cache, suíte Node/Chromium e fixture de delta, sem sobrescrever os artefatos dessa frente.

## Decisão de interface

- A lista de normas permanece no **Leitor Jurídico**, agora em um seletor `<details>` inicialmente recolhido. O estudante escolhe explicitamente a norma; o índice mostra **somente** seus artigos.
- Para CC/CPC, o índice apresenta uma janela de até 49 artigos próximos ao selecionado, evitando milhares de controles simultâneos. O campo **Ir diretamente ao artigo** aceita numeração como `489` ou `1.228`. A ação **Trocar norma** revela e foca o seletor, inclusive em viewport estreito.
- Anterior/próximo não atravessa automaticamente o limite de uma norma. A navegação das outras seis normas e os acessos contextuais foram preservados.
- Nenhuma segunda lista de anotações ou nova chave foi criada. `forNotebook`, comentários, estudos, revisões, questões e flashcards mantêm os formatos e operações originais. Novos artigos não recebem `topic` curricular por aproximação.

## Fonte, cobertura e limite jurídico

Os textos foram obtidos do **espelho público LawCodex**, repositório `https://github.com/LawCodex/br`, commit `e2a0e14bfc5cddf9a88b2aa05c66536cdb547aa1`, com atribuição declarada à versão compilada do Planalto coletada em **12/10/2026**. SHA-256 do Markdown de origem:

| Diploma | Artigos importados | SHA-256 do espelho |
| --- | ---: | --- |
| CC, Lei 10.406/2002 | 2.082 | `02f30e533422f8aed9566953b7a731642b3d2293de3c373f5646c8d799ee7137` |
| CPC, Lei 13.105/2015 | 1.074 | `39006ac91e7e93548cbdcbf167d69746f6b4d0ca45d5d81ffe19a27a193d910c` |

**Restrição relevante:** uma conferência integral diretamente com o Planalto não foi possível nesta execução. Os arquivos importados contêm os artigos identificados no espelho, mas ainda **não são declarados textos integrais oficialmente cotejados, atualizados ou aptos à certificação jurídica**. O app explicita isso antes da leitura, guarda `contentImport:'mirror_unverified'`, `contentCoverage:'partial'`, `textVerification.status:'pending'` e aponta para o texto oficial. Além disso, cada artigo importado é uma unidade de leitura com seu corpo inteiro; parágrafos, incisos e alíneas não têm IDs granulares próprios nesta fase. Não atribuir a eles vínculos ou julgamentos curriculares automáticos.

O gerador determinístico `scripts/gerar-codigos-cc-cpc.cjs` exige o SHA-256 exato de cada arquivo de origem; só em seguida gera `dados/codigos-cc-cpc.js`. O corpus anterior `dados/legislacao-s13.js` e seus seis diplomas permanecem byte a byte inalterados. O catálogo ampliado soma oito normas, **3.448 artigos e 4.332 unidades**, mantendo **cinco** diplomas anteriores classificados como integrais. Os dois códigos novos não elevam esse indicador.

## Preservação e validação

- Teste Node específico: seis normas idênticas, códigos sem `topic`, seleção recolhida, índice limitado, salto numérico, limites anterior/próximo, criação sintética de marcação `pc-*`, validação S20, reload e nenhuma décima chave.
- Foram executadas todas as suítes Node `tests/*-validacao.js` disponíveis nesta base, sem alteração das fixtures históricas. O arquivo `tests/fixtures/codigos-cc-cpc-deltas.json` registra hashes e proveniência adicionais.
- Teste Chromium novo: perfis sintéticos isolados, viewports 320/360/390/430/1280, seleção, salto, edição manual de gatilho, persistência, overflow, screenshots e axe diagnóstico em 390/1280. A execução local de Chromium foi bloqueada pela restrição de `socket()` do ambiente, **não é evidência de aprovação nem falha do produto**. Exigir resultado efetivo do job GitHub Actions antes de integrar. Incompletos do axe não equivalem a aprovação e devem ser mantidos no relatório do job.
- `tests/sprint21-pages.cjs` confere, em produção após merge, HTTP 200 e SHA-256 do HTML, scripts, CSS e módulo de questões contra o checkout. A verificação deve passar novamente após o deploy, não apenas em PR.

## Continuidade em lotes separados

O índice de fontes do projeto (`AGU_FONTES_OFICIAIS_REFERENCIA_v1`) é inicial, **não uma lista exaustiva do edital**. Fases candidatas após validação de fonte oficial e confronto com edital literal: Lei 14.133/2021 e Lei 8.112/1990; CTN; CLT; Lei 8.429/1992 e Lei 13.303/2016; mandado de segurança e ação civil pública; legislação tributária, previdenciária e demais leis expressamente previstas. Prioridade, extensão e legitimidade da transcrição devem ser definidas em nova execução, sem alterar a certificação curricular da Auditoria.

## Conclusão condicionada

Esta etapa incorpora um **acervo de consulta referencial**, e não substitui o cotejo legal. A publicação somente é considerada verificada quando PR, CI de Node/Chromium, Pages e validação HTTPS passarem no commit efetivamente mesclado. Caso contrário, distinguir explicitamente a branch testada da produção.
