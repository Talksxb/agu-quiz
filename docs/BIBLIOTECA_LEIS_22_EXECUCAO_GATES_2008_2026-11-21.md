# AGU QUIZ | BIBLIOTECA 22 — Gate da reexecução integral dos 2.008 IDs
**Verificação de 21/11/2026. Escopo exclusivo: Biblioteca 22.**

## 1. GitHub e retomada verificáveis
- PR #72: aberta, draft, não mesclada; HEAD consultado `105801ace7b5ca83163185b7c5e2ab543d218c99`; base `audit/biblioteca-leis-17-correcoes-comparador`.
- PR #73: aberta, draft, não mesclada; HEAD consultado `0183999398e986f1153a5a6241d95c8c43da11a4`; base `audit/biblioteca-leis-20-matriz-transicao-2008`.
- Biblioteca 22 criada como branch independente empilhada sobre a #73, sem merge, rebase nem alteração do corpus ou da UI.

## 2. Insumos oficiais e bloqueio atual
Fontes exatas requeridas (HTML completo da Câmara):
- CC (Lei 10.406/2002): https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html — **1.571.920 bytes**; SHA-256 `6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90`.
- CPC (Lei 13.105/2015): https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html — **938.199 bytes**; SHA-256 `0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821`.

**Recuperação binária nesta sessão não concluída.** A busca local em `/tmp` e `/mnt/data` não localizou as capturas HTML; HTTPS por Python `requests` falhou com `NameResolutionError` para `www2.camara.leg.br`. Consulta da página pública no navegador de pesquisa confirmou a disponibilidade de texto, mas não fornece os bytes integrais idênticos à fonte arquivada. Não houve cópia de texto renderizado para substituir HTML nem presunção de hash oficial validado em 21/11.

## 3. Matriz e comparador
A PR #73 conserva `docs/dados/BIBLIOTECA_HASHES_ESPELHO_2008_2026-11-21.csv` com 2.008 hashes SHA-256 reais do espelho (1.007 CC, 1.001 CPC), amarrados ao blob `d4b05b841beeb03851a89c8634b4ac9f097d9d5a`. A matriz histórica da #72 tem 2.008 chaves, incluindo oito sufixadas; controles impedem promoção de CC69-A vetado e CPC529-A prospectivo como normas ativas.

Não foi possível, neste executor, invocar `scripts/reexecutar-matriz-2008.py` contra **os dois arquivos oficiais validados**. Consequentemente: **zero novos hashes oficiais** gerados aqui, **zero pares integralmente recotejados nesta sessão** e **a única nota editorial do lote 901–1000 segue não identificada**. Não afirmar conclusão integral apenas com base nos 2.008 hashes do espelho.

## 4. Verificações executadas
- Inspeção da PR #73, do script `scripts/reexecutar-matriz-2008.py`, do comparador `scripts/cotejar-biblioteca-lote04.py` e do validador histórico.
- Quatro testes **sintéticos** do executor executados em Python local, com resultado **4/4 pass**: recusa de fonte com SHA errado e mesmo tamanho, recusa de tamanho errado, detecção de ID repetido, manifesto com 2.008 IDs e notas editoriais de *fixture* exportadas com hashes. O exemplo artificial `L13105:art945` empregado em teste NÃO é identificação da diferença editorial verdadeira.
- Repositório completo não foi clonado nesta sessão (DNS de `github.com` também falhou). Logo, não alegar que o conjunto de testes Node, CI, a execução real com HTMLs oficiais ou validação em checkout completo passaram.

## 5. Execução alternativa reproduzível no GitHub Actions
Arquivo novo `.github/workflows/biblioteca-22-cotejo.yml`: execução de testes no checkout, tentativa de download HTTP com timeout/retries, bloqueio por **bytes e SHA-256 exatos** dos dois HTMLs, execução do comparador integral para as mesmas 2.008 chaves, resumo com totais e **ID(s) editorial(is) medidos**, upload de artefato CSV somente após sucesso. Os HTMLs não são republicados. Workflow não altera corpus nem faz merge. Se os bytes oficiais tiverem mudado, a ação **falhará de propósito**; a mudança exige rebase documental da versão da fonte, não substituição silenciosa de hash.

**Importante:** a simples criação do workflow não prova que foi disparado, nem que conseguiu baixar ou processar a fonte; o resultado só se torna evidência mediante log de job concluído e artefato CSV.

## 6. Indicadores preservados e pendências
- Primeira passagem histórica: **2.008 de 3.156 IDs (63,62%)**; pendentes fora do lote: 1.148.
- Projeção da Biblioteca 20: **1.851 iguais, 110 diferenças textuais, 1 editorial, 46 revogações agrupadas**. **Projeção condicionada, não nova contagem efetivamente reexecutada**.
- Diferença textual não equivale a erro jurídico material; efeitos, vigência e decisões precisam de revisão jurídica própria.
- Continua pendente localizar por evidência o ID da diferença editorial, gerar os 2.008 SHA-256 oficiais, exportar matriz final de transições reexecutadas e conferir o artefato do job.

**Decisão:** entrega técnica/documental parcial, sem certificação integral; manter PR draft. Não executar Biblioteca 23 nem CC/CPC1001–1100.
