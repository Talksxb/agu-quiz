# AGU Quiz | CHECKPOINT — Sprint 25
## Tamanho real do backup, recuperação não destrutiva e regressões de acessibilidade

**Data:** 13/11/2026 (America/Sao_Paulo). **Aplicativo:** `Talksxb/agu-quiz`, branch `main`.  
**Predecessora lida:** `docs/CHECKPOINT_SPRINT24_CONTRASTE_FOCO_E_MOBILE_2026-11-13.md`, roteiro Android S24, guia backup S21, checkpoints S19–S23 e prompt integral S25.  
**Status:** falha concreta de exportação reproduzida e corrigida; CI Node/Chromium/Pages **concluído com três jobs `success`**; dados jurídicos e privados preservados. **Sprint 26 não iniciada.**

## 1. Fontes e baseline reconfirmado

- `main` inicial S25: commit de documentação S24 **`07ba8716fffbf06efee16c89f4af07192d42482f`**. O código S24 havia sido testado no run [43413057667](https://github.com/Talksxb/agu-quiz/actions/runs/43413057667), com relatório [14030711429](https://github.com/Talksxb/agu-quiz/actions/runs/43413057667/artifacts/14030711429). O commit foi reaberto e os arquivos reais da branch foram conferidos antes da correção.
- Foram inspecionados `index.html`, `backup-local-s20.js`, Revisão, Planejamento, Caderno, Sessões Integradas, Leitor Jurídico, Consolidação, Questões S18, dados S18/S19, testes S19/S20, E2E S20–S24, scripts axe S22/S23/S24, verificador Pages e workflow. Lidos os limites de importação de cada módulo e as invariantes do backup.
- Auditoria privada `Talksxb/agu-auditoria` consultada **somente em leitura**: `docs/PROTOCOLO.md`, `checkpoints/estado.json`, `checkpoints/AUD03-016.json`, `checkpoints/AUD03-017.json` e `evidencias/normativa/NORM-INT-025.json`, `026.json`, `027.json`. **O estado avançou durante a S25**: no diagnóstico inicial, `AUD03-016` (PR 136) tinha 121 lotes integrados, 351 IDs com evidência, 61 sem, 5.722 ponteiros, 823 pendências sem URL. **Na reconsulta de fechamento, o último integrador já era `AUD03-017`, com merge do PR 142 verificado no commit `eeab351730a4c1ff5dbf5aa97e00191e825b4fcf`**: **412 IDs únicos**, 14 disciplinas, **123 lotes normativos integrados**, 352 IDs com alguma evidência, 60 sem, 5.821 ponteiros, 832 pendências sem URL, quatro reusos em quarentena e **zero tópicos certificados integralmente**. O último lote normativo persistido continuava `NORM-INT-027`, com **124 lotes persistidos**: `025` (INT28) e `026` (INT29) integrados em AUD03-017; apenas `027` (INT30) ainda aguarda integração. O SHA da matriz-base permanece `0952205a07818cda0a9ccca6dacdf340afcc6db8`; o SHA de trabalho final é `c4606869e6a150b807f2862ca26fa24bba60cba0`. Sem publicação da matriz privada.
- Não houve Android físico conectado/autorizado ou backup histórico pessoal disponibilizado. O `adb` não estava disponível. O Chromium local não inicializou na sandbox (`socket(): Operation not permitted`); o teste de navegador **real** é o GitHub Actions documentado abaixo, não uma execução local inventada.

## 2. Falhas, reproduções, decisões e riscos

| ID | Classe | Gravidade / efeito | Evidência anterior, solução e resultado posterior |
|---|---|---|---|
| S25-001 | **falha_reproduzida → corrigida** | **Alta** para confiar em exportação/restauração de histórico extenso | O exportador comparava `String.length` com 12.000.000, mas o importador barrava `file.size` **em bytes**. Em VM Node com 650 registros de Caderno **sintéticos** que passaram `AGUCaderno.valid`, o JSON compacto tinha **6.712.561 caracteres** e **13.213.211 bytes UTF-8**; a versão anterior baixava o JSON formatado de aproximadamente **13,2 MB sem alerta**, que a importação recusaria. Correção: medir com `Blob.size` no conteúdo de cada categoria, conjunto, validação e arquivo final. Após o patch, `capture`/`validateBundle` recusam o tamanho e `exportFile` alerta sem iniciar download, sem alterar o Caderno. |
| S25-002 | **falha_reproduzida → corrigida** | Média/alta — arquivo aparentemente dentro do limite antes da formatação | Fixture sintética distinta: JSON **compacto de 11.999.987 bytes**, porém a indentação elevava o arquivo final a **12.000.013 bytes**. A versão anterior exportaria arquivo que `readFile` rejeitaria. O novo `exportFile` verifica o `Blob.size` **depois** de `JSON.stringify(..., null, 2)` e não gera arquivo acima de 12 MB. |
| S25-003 | **risco controlado por regressão** | Alta se pequenos arquivos deixassem de restaurar | JSON pequeno com acentuação (**640 bytes de arquivo exportado**) permaneceu válido, restaurou categoria ausente com SHA-256 idêntico (`4f6668f2ae4cf38e8400d32d9795b04b19340bccbe1d24596ae8bbdbd872dfd0`), reimportação adicionou **zero** e conteúdo já existente não foi sobrescrito. E2E S22 repetiu **nove categorias** com SHA por chave em perfil Chromium novo; S21/S23 cobriram quota simulada com rollback, arquivo inválido, dispositivo inexistente e matriz importada inconsistente. |
| S25-004 | **risco residual: limite de capacidade** | Média/alta em histórico extenso | A recusa evita gerar backup completo **inutilizável**; **não cria** estratégia de exportação/recuperação para estados realmente acima de 12 MB. Importadores específicos também podem impor limites menores. Orientação revisada: preservar o navegador, conferir limites de cada módulo, não apagar dados nem dividir JSON manualmente como se fosse migração testada. Sem compactação, particionamento, fusão ou backend não autorizados. |
| S25-005 | **risco / `axe_color_contrast_incomplete`** | Média — acessibilidade amostral | Chromium S25 repetiu 26 scans S24 e 26 scans S23 com axe-core 4.14.0; **zero `violations` automáticas no recorte**; **13 cenários/19 nós** `color-contrast` permanecem `incomplete` se parcialmente recortados. Ao rolar até ficarem integralmente visíveis, **19/19 passaram**. Navegação por `Tab`/foco ficou visível nos cinco tamanhos; touch **emulado** passou em 320/390/430 px com zero tentativas novas sem resposta. **Não é WCAG integral.** |
| S25-006 | **`nao_testado_android_fisico`** | Média — hardware e leitor de tela | Não havia aparelho conectado e autorizado; nenhum modelo/Android/Chrome/viewport físico/densidade/teclado virtual/TalkBack foi aferido. A emulação Playwright no runner desktop **não substitui** toque e TalkBack no aparelho. Roteiro preparado desde S24 e preservado. |
| S25-007 | **`nao_testado_backup_historico_real`** | Média/alta — retrocompatibilidade | Nenhuma amostra histórica pessoal foi entregue com autorização. Apenas fixtures sintéticas; não prometer migração, fusão de dispositivos nem recuperação de registros concorrentes. Conservar ambas as cópias. |
| S25-008 | **risco jurídico preservado** | Alta se Q1 fosse reativada | `of-2015-adv-001` segue fora da nova correção automática; gabaritos de Q6/Q7/Q9/Q48 preservados **E/C/E/C**; referências 2023 A–E e anulações sem pontuação, excertos CF37 X, CF49 V e L9784 art50 identificados. `confirmado_pontualmente` não é certificação integral. |

**Adaptação exclusiva do teste S20:** depois de adicionar medição nativa por `Blob`, o harness `vm` da S20 inicialmente falhou com `ReferenceError: Blob is not defined` porque seu contexto fictício não incluía essa API padrão do navegador. Foi adicionada `Blob` **apenas ao contexto do teste** (`tests/sprint20-validacao.js`), sem afrouxar a aplicação. S19 **26/26**, S20 **41/41** e os três cenários S25 passaram depois. Essa falha foi de simulação de ambiente, não um novo bug do navegador.

## 3. Execução real e prova de publicação

**Commit do código testado:** [`b2d94ef5d87ebb515d9b66f46a51f9278ff6b5d8`](https://github.com/Talksxb/agu-quiz/commit/b2d94ef5d87ebb515d9b66f46a51f9278ff6b5d8).  
**Run de CI final do código:** [GitHub Actions **43415797662**](https://github.com/Talksxb/agu-quiz/actions/runs/43415797662). Os jobs foram **individualmente consultados e seus logs lidos**:

| Job / ID | Resultado real | Conteúdo observado |
|---|---|---|
| `integridade-node` / `131853248574` | **success** | **Node v22.23.4**; S19 **26/26**, S20 **41/41**, S25 **3 cenários** de bytes UTF-8, JSON formatado e restauração idempotente. Os testes Node de módulos usam VM/DOM simulado, não navegador. |
| `navegador-chromium` / `131853248597` | **success** | **Chromium 158.0.8127.18**, axe-core **4.14.0**; E2E S20–S24 e axe S22/S23/S24, cinco larguras. S22: nove categorias importadas com SHA por categoria, reload e não sobrescrita. S23: rejeições adversariais/quota. S24: 26 cenários, 19/19 nós de contraste aprovados após exposição, foco revelado por Tab nos cinco tamanhos, toque emulado em três tamanhos, zero tentativas sem resposta. |
| `pages-publicado` / `131853248304` | **success** | HTTPS [AGU Quiz publicado](https://talksxb.github.io/agu-quiz/) respondeu **HTTP 200** e os **SHA-256 do HTML e dos quatro scripts** ficaram iguais ao checkout. Duas primeiras leituras do HTML ainda refletiam cache/propagação da versão anterior; **terceira** leitura recebeu o hash novo e `PAGES_VERIFICADO`. Cache declarado `max-age=600`; versão do script alterado: **`backup-local-s20.js?v=20261113-s25a`**. |

**Artefato real do run:** [ID **14031433418**](https://github.com/Talksxb/agu-quiz/actions/runs/43415797662/artifacts/14031433418), ZIP baixado e inspecionado. Contém **16 arquivos sintéticos**, incluindo `artifacts-s22/axe-diagnostico.json`, `artifacts-s23/axe-elementos-inconclusivos.json`, `artifacts-s24/contraste-rolagem-teclado-touch.json` e capturas PNG de 320/360/390/430/1280 (E2E prévios) e touch emulado 320/390/430. Resumo JSON realmente lido: `scans=26`, `initiallyIncomplete=19`, `afterScroll.passed=19`, `offscreenBecameVisible=19`, `focusComplete=true`, `touches=3`, `attempts=0`. Captura emulada de 320 px também foi inspecionada visualmente, **sem dados pessoais**.

**Limite de evidência:** o Chromium local disponível era 156.0.8078.79, mas falhou ao criar socket dentro da sandbox, e escalada de permissões não foi autorizada pela política do ambiente. Por isso a evidência de navegador é exclusivamente o runner GitHub Actions. No executor local, Node v24.22.1 rodou 26/26 + 41/41 + três cenários S25; no CI, a versão **Node 22** requisitada foi verificada por log. Nenhum ensaio físico Android ou TalkBack real foi feito.

## 4. Contrato de dados e invariantes preservados

- Esquema **`agu-portable-local-s20-v1`**, **nove chaves catalogadas**, armazenamento exclusivamente em **`localStorage`**, sem sincronização, conta, banco, backend ou coleta remota. Restauração acrescenta **somente categorias ausentes**, sem sobrescrever dados existentes. Quota simulada reverte novas gravações; arquivo inválido não destrói estado.
- **12 MB = 12.000.000 bytes UTF-8**, tanto para categoria e JSON agregado quanto para o arquivo de exportação *formatado*. Importação conserva validação unificada da matriz **`AGUValidateMatrix`**. Erros alertam para **não apagar dados locais** e conferir limite de módulo; nenhuma recuperação de estado acima do limite foi implementada.
- Exatamente quatro destinos **Início, Estudar, Biblioteca Inteligente, Evolução**; quatro itens juridicamente auditados `of-2015-adv-006/-007/-009/-048`, gabaritos históricos **E/C/E/C**; **36 flashcards**, **24 referências oficiais catalogadas**, formatos **2015 C/E** e **2023 A–E**, anuladas sem pontuação; revisão **D+1/D+7/D+21/D+45**.
- Trechos de CF art. 37, X, CF art. 49, V e Lei 9.784 art. 50 **não** são textos integrais. Q1 legada e certificação jurídica integral continuam bloqueadas; zero tópicos certificados na Auditoria 3. Nenhum dado de pessoa ou matriz privada foi enviado a GitHub/CI.

## 5. Arquivos, commits e escopo de mudança

| Caminho | Commit S25 | Alteração efetiva |
|---|---|---|
| `backup-local-s20.js` | `b2d94ef5d87ebb515d9b66f46a51f9278ff6b5d8` | Medição em bytes reais via `Blob.size` para categoria, pacote, importação e arquivo final; aviso não destrutivo se >12 MB. |
| `index.html` | `b2d94ef5d87ebb515d9b66f46a51f9278ff6b5d8` | Somente versão de cache do script de backup **s25a**; sem UI nova. |
| `tests/sprint25-validacao.js` | `b2d94ef5d87ebb515d9b66f46a51f9278ff6b5d8` | Três casos sintéticos reproduzíveis, Caderno com `AGUCaderno.valid`, arquivo formatado no limite e restauração. |
| `tests/sprint20-validacao.js` | `b2d94ef5d87ebb515d9b66f46a51f9278ff6b5d8` | Expõe `Blob` ao ambiente simulado existente; mantém 41 verificações. |
| `tests/sprint21-pages.cjs` | `b2d94ef5d87ebb515d9b66f46a51f9278ff6b5d8` | Exige versão `s25a` e hashes reais de Pages. |
| `.github/workflows/agu-sprint20-ci.yml` | `b2d94ef5d87ebb515d9b66f46a51f9278ff6b5d8` | Inclui nova regressão Node S25, preserva E2E e diagnóstico Chromium. |
| `docs/GUIA_BACKUP_LOCAL_S21.md` | Commit documental de fechamento S25 | Orientação concreta: bytes UTF-8, preservar histórico se >12 MB e limites dos módulos. |
| `docs/CHECKPOINT_SPRINT25_BACKUP_UTF8_ACESSIBILIDADE_2026-11-13.md` | Commit documental de fechamento S25 | Evidências, classificação, logs e riscos deste checkpoint. |
| `docs/PROMPT_SPRINT26_2026-11-13.md` | Commit documental de fechamento S25 | Handoff integral sem início da Sprint 26. |

**Sem edição de** `revisao-inteligente.js`, `planejamento-semanal.js`, `caderno-contextual.js`, `estudo-integrado.js`, `leitor-juridico.js`, `leitor-consolidacao.js`, `questoes-leitor-s18.js`, dados S18/S19, gabaritos, matriz curricular privada ou Auditoria. Sem migração, fusão, login, banco, sincronização, nova rota ou expansão do acervo.

## 6. Pendências, decisão de encerramento e handoff

| Pendência | Classe / gravidade | Próxima prova necessária |
|---|---|---|
| Android real, teclado virtual, toque e TalkBack | `nao_testado_android_fisico` — média | Aparelho conectado e autorizado, perfil sintético, versão e captura sem dados privados. |
| Backup pessoal histórico e conflito entre aparelhos | `nao_testado_backup_historico_real` / `risco` — média/alta | Arquivo voluntário com autorização, teste local isolado e preservação das duas cópias. |
| Estado local realmente maior que 12 MB | `risco` — média/alta | Plano de recuperação separado e consentido; exportação atual recusa arquivo irrestaurável e preserva o estado. |
| Contraste inicialmente recortado, avaliação WCAG integral | `risco_incomplete` — média | Teste humano/foco/visibilidade e dispositivo real; 19/19 `passed` depois de rolar não é certificado WCAG. |
| Q1 de 2015 e lote `NORM-INT-027` ainda não integrado | `risco_juridico` — alta para certificação | Cotejo independente pela Auditoria; `AUD03-017` incorporou `025/026` mas segue com zero certificações integrais. Não publicar fonte privada nem reativar Q1 por aproximação. |

**Handoff exclusivamente documental:** `docs/PROMPT_SPRINT26_2026-11-13.md`. A Sprint 25 concluiu o problema verificado e suas regressões, preservou dados privados e registrou limites sem alegar testes impossíveis. **Sprint 26 NÃO iniciada neste fechamento.**
