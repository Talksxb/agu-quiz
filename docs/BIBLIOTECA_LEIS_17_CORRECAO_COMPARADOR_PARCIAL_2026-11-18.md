# AGU Quiz | Biblioteca de legislação — etapa 17: correção técnica, lote pendente

## Resultado verificado

Em 18/11/2026 (data de referência São Paulo), foram reproduzidos por testes **antes da correção** dois defeitos independentes de `scripts/cotejar-biblioteca-lote04.py`:

1. `Art. 1.000.` e `Art. 1.001.` eram anexados ao `Art. 999.`; `1000` não constava no mapa de artigos.
2. `Arts. 757 a 777`, `Arts. 778 a 788` e `Arts. 789 a 802`, expressamente revogados, eram anexados ao texto do art. 756.

O teste inicial com **7 testes, 2 falhas esperadas** foi registrado antes do patch. Depois da correção, **8 testes Python passaram**, incluindo um teste integrado de `run()` que classifica os **46 IDs** como `revogacao_agrupada_documentada`, com intervalo de origem identificado e `official_present: false`. A ausência de artigo individual na fonte consolidada **não** foi mascarada por texto normativo fabricado. A função `official_revoked_ranges` distingue apenas faixas com marcador explícito `Revogad...` e preserva a linha oficial. O extrator agora normaliza a numeração `1.000` para chave `1000`, mantendo o texto original na cláusula e encerrando corretamente o lote diante de `1.001`.

Também passaram as **36 suítes Node** do projeto e `git diff --check`. Nenhum corpus, UI ou dado do estudante foi alterado.

## Reconciliação histórica sem reescrita

O registro da Biblioteca 16 permanece **2.008/3.156 (63,62%)**, classes **brutas anteriores ao patch**: **1.846 coincidências, 113 diferenças, 1 diferença editorial, 48 ausências técnicas**; 1.148 IDs ainda sem primeira passagem. Essas 48 ausências correspondem a **46 artigos revogados agrupadamente** (`CC757–802`) e **2 artigos presentes** (`CC1000`, `CPC1000`) que o extrator anterior não reconhecia. A nova interpretação é **reconciliação técnica separada**, não alteração retroativa das estatísticas publicadas:

| Motivo bruto histórico | Registros | Interpretação após fixture | Restrição |
| --- | ---: | --- | --- |
| Faixas CC757–802 | 46 | `revogacao_agrupada_documentada`; houve comando revogatório, não lacuna de norma ativa | Não são 46 textos idênticos individuais |
| Numeração CC1000/CPC1000 | 2 | Artigos efetivamente existentes, agora capturáveis pela regex corrigida | É necessário recotejo do texto integral para classificá-los |

O falso positivo de `CC756` e as diferenças artificiais de `CC999/CPC999` precisam de **reexecução sobre fontes integrais oficiais** para medir a composição corrigida; não foram quantificados como correção automática nesta etapa.

## Fonte e bloqueio específico para cotejo 1001–1100

Fontes oficiais [CC consolidado](https://www2.camara.leg.br/legin/fed/lei/2002/lei-10406-10-janeiro-2002-432893-normaatualizada-pl.html) e [CPC consolidado](https://www2.camara.leg.br/legin/fed/lei/2015/lei-13105-16-marco-2015-780273-normaatualizada-pl.html) foram localizadas e consultadas via busca/web. Entretanto, as capturas **HTML integrais** usadas em Biblioteca 15–16, previamente em `/tmp/agu-bib15/`, deixaram de estar disponíveis após manutenção do ambiente. A tentativa de obter novamente os bytes por HTTPS no executor expirou; leitura web textual ou visita no navegador **não substitui** os arquivos de entrada byte a byte nem seus hashes. Portanto, **não foi executado nem contabilizado** o cotejo CC/CPC **1001–1100**. Evita-se número artificial ou comparação do espelho consigo mesmo.

Os hashes históricos das capturas anteriores (`CC: 6ed7c19586b21355e998746a0620cea5c2f3e6a24036d7f3743b7d30330e5d90`; `CPC: 0d7f8c9a0f67734cc047c3bea8bfabd57a7823f361d774041e11815822722821`) permanecem como **proveniência anterior**, não como prova de nova captura.

## Próxima ação condicionada

1. Reobter ambas as fontes consolidadas em HTML integral e registrar HTTP, data, bytes e SHA-256; comparar com hashes históricos e controlar alterações desde o corte jurídico de 04/11/2026.
2. Reexecutar 756–803 e 999–1001 para medir os efeitos reais da correção, mantendo lado a lado contagens brutas e reconciliadas; conferir `CC819-A` vetado, `CC853-A` vigente e `CC980-A` revogado.
3. Só então executar `run(CC, CPC, 1001, 1100)` com sufixos, remissões e texto oficial, classificando diferenças com revisão jurídica pontual. Atualizar acumulado de 3.156 IDs **apenas para itens efetivamente cotejados**.
4. Não há autorização implícita para alterar corpus/UI, mesclar PRs ou declarar certificação jurídica integral.

Este lote contém **patch técnico auditável e reconciliação**, mas a segunda fase **continua pendente de fonte integral**, sem handoff da etapa 18 como se a 17 estivesse concluída.
