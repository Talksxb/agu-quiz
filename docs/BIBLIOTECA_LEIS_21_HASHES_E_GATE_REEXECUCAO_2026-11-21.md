# AGU Quiz | Biblioteca 21 — hashes individuais e gate da reexecução integral (21/11/2026)

## Estado efetivamente executado

- Branch derivada de `audit/biblioteca-leis-20-matriz-transicao-2008`, sem alterar PR #72 ou #67.
- O **blob efetivo do corpus** `dados/codigos-cc-cpc.js` foi recuperado pelo GitHub com SHA de objeto `d4b05b841beeb03851a89c8634b4ac9f097d9d5a` (o endpoint anterior `fetch_file` não retornava conteúdo por tamanho, enquanto `fetch_blob` retornou **2.293.778 caracteres**).
- O objeto JSON `laws` do arquivo foi lido sem avaliação de JavaScript, e foram filtradas exatas **2.008 identidades**: **1.007 CC** (1.000 numéricas + sete sufixadas) e **1.001 CPC** (1.000 numéricas + CPC699-A), **zero IDs duplicados, zero cláusulas vazias**.
- SHA-256 do texto da primeira cláusula, depois de **normalização idêntica à função `normalize` do comparador**, foi calculado por ID e registrado em `docs/dados/BIBLIOTECA_HASHES_ESPELHO_2008_2026-11-21.csv`. A implementação SHA-256 foi testada contra vetor `abc` e verificada também para o art. 1º CC por comparação com Python `hashlib.sha256` (hash `b1e4cd52e584fc864fd11cbd5f7290f977ff4293804f62fccf746d77ab9886fe`).
- Fonte do espelho: blob imutável referido; não alterar nem declarar `pending` promovido.

## Segunda perna do cotejo — NÃO EXECUTADA neste ambiente

**Ainda não foi possível identificar a única diferença editorial do lote 901–1000 nem produzir hashes do lado oficial para os 2.008 IDs.** Razão verificável: os HTMLs completos recuperados em Biblioteca 18 não persistiram neste executor, e a tentativa de conectar a `www2.camara.leg.br` pelo ambiente Python/container falhou em resolução DNS. A consulta web abriu as páginas consolidadas em texto, mas **não forneceu o mesmo arquivo HTML byte a byte** que originou os hashes históricos. Reconstituir HTML de texto renderizado, copiar hashes do espelho para a coluna oficial ou selecionar a nota editorial por hipótese seria falsificar evidência.

### Executor preparado (código entregue, não alegar execução integral)

`scripts/reexecutar-matriz-2008.py` recebe dois arquivos HTML locais, **bloqueia** a execução se os hashes e tamanhos não coincidirem com os registrados em Biblioteca 18:

| Fonte | Tamanho | SHA-256 requerido |
| --- | ---: | --- |
| CC | 1.571.920 bytes | `6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90` |
| CPC | 938.199 bytes | `0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821` |

Depois exige o mesmo conjunto de 2.008 IDs do CSV histórico, preserva 69-A do CC e 529-A do CPC como marcadores extras fora do denominador, calcula os **2.008 SHA-256 oficiais normalizados**, compara cada hash do espelho ao manifesto capturado agora, grava CSV com classes novas e matriz de transição e lista as identidades com diferença editorial.

Exemplo reprodutível, **quando os dois HTMLs estiverem disponíveis no checkout**:

```bash
python scripts/validar-matriz-transicao-biblioteca.py
python scripts/reexecutar-matriz-2008.py /caminho/cc.html /caminho/cpc.html --saida matriz-2008-reexecutada.csv
```

Os HTMLs e o CSV de saída não foram fabricados nem importados nesta sessão. Se a página oficial mudar, o programa deve recusar o hash histórico: uma recaptura nova requer trilha de versão própria, não substituir silenciosamente a entrada.

## Resultado numérico e cautelas

Até o presente checkpoint, **não promover** a projeção da Biblioteca 20 (1.851 iguais, 110 diferenças textuais, 1 editorial, 46 revogações) a contagem integralmente reexecutada. São **2.008 registros com hash do lado do espelho**, **0 pares com hash oficial recém-calculado nesta execução**. A diferença editorial entre 174 candidatos no lote 901–1000 **permanece sem ID demonstrado**.

A tarefa atual deixa um componente concluído (manifesto do espelho, hashes auditáveis e validador com gate de fontes) e outro pendente por indisponibilidade de insumo oficial. Sem merge, sem alteração do corpus ou certificação de vigência.
