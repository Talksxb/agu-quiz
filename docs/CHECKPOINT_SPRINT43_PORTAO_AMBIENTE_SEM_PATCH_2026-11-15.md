# AGU Quiz | Checkpoint Sprint 43 — portão de ambiente e continuidade

**Data:** 15/11/2026 (`America/Sao_Paulo`). **Decisão:** Sprint 43 encerrada **somente documentalmente**, sem patch de produto, CSS, teste, cache, workflow, schema ou conteúdo. **Nenhum defeito novo foi reproduzido no navegador real independente**, pois esse ambiente não foi disponibilizado. A Sprint 44 é apenas handoff, não executada.

## 1. Corte dinâmico, concorrência e integridade

- Repositório público: `Talksxb/agu-quiz`, branch `main`, checkout **novo e limpo** `agu-quiz-s43`; o checkout antigo `agu-quiz-s42` com alterações locais pré-existentes não foi tocado.
- Na primeira consulta remota S43, `HEAD=bdefbf116a1e872c2a0378b49f2482db666a10e6`, árvore `b6ca35df1133c1a1cec888821028a1169f3ebba1`, merge de código LEG-09. Durante a inspeção, a main avançou por **fast-forward** para **`7c81b6b8e3cb8c1f3bd26519fdaf40637bba8beb`**, árvore **`2e59a94ac03984be92352b2379541d9fa5ad57f8`**, fechamento documental LEG-09 e `PROMPT_LEG-10.md`. `git status --short --branch`: `## main...origin/main`, nenhuma mudança antes de criar esta documentação.
- API GitHub: **zero PRs abertas** no Quiz no corte reconsultado. Branches LEG-01–09 e WORK01 historicamente presentes, inclusive `docs/leg09-fechamento-leg10`; não são PRs de código pendentes. Não houve reaplicação dos patches S29–S35 ou escrita sobre frentes concorrentes.
- WORK01 continua integrada desde `4fa4d2955be60e8acf5e2d134e9d5b241f84f6c3`; **LEG-01–09 integradas** ao código até o merge `bdefbf1`, com fechamento LEG-09 em `7c81b6b`. Diferente da S42, a lista única “Para meu caderno” existe no leitor, na revisão programada e em sessão válida do Estudo Integrado. LEG-10 **não** foi executada nesta S43.

**Blobs Git na main `7c81b6b` (SHA-1 Git, não SHA-256 HTTP):** `index.html` `526437b50bd6bea9d2a9c36802b35a4564a0bcaa`; `revisao-inteligente.js` `338f6b6d1850a2e2be6dc00a6adb82340df71771`; `planejamento-semanal.js` `2fc25101f898ecf7c64e8acf42621c7f84e542f7`; `caderno-contextual.js` `fedee578b3ec54d217b5e6338c016adf287db774`; `estudo-integrado.js` `1dc5473c9be16149b2948c382850e10036df334d`; `leitor-juridico.js` `20f14f10f166aca1541860653cd9ee0b161254cf`; `leitor-consolidacao.js` `7f02d3e95453a09f4109fcdb06ba76f4da59c657`; `backup-local-s20.js` `eabfdb01d5a2bd4eb30d4eab13507b7bb2b53b66`; `meu-estudo.js` `14a0f85ace72ed8415f7f4eb8c90ae7b8d953e83`; `questoes-leitor-s18.js` `75251efad04e9dde7295dd0010619eb08354c663`; `dados/legislacao-s13.js` `f875efffabbe9d9478cb17f32ccfa3bd6de11f52`; workflow `f78a2ce4453291fe6466eb6afcdb874dc7d720f6`.

Fontes revisitadas: checkpoint S42 primeiro, S41–S35, guia de recuperação S21, roteiro físico S24, handoffs e relatórios LEG-06–09, scripts existentes, cache HTML, regressões Node, fontes/fixtures e workflow. Matriz privada não foi sincronizada.

## 2. Portão de isolamento: não cumprido

O ambiente disponível nesta execução **não apresentou mecanismo novo autorizado e comprovado para iniciar um perfil descartável separado**. Inspeção não mutável do runtime: Node `v24.22.1`, pacote Playwright resolvível globalmente, `/usr/bin/chromium` presente, **sem executável Playwright padrão de Chromium disponível** no cache pesquisado e sem mecanismo de perfil independente demonstrado. Não se relançou o Chromium local após `socket() failed: Operation not permitted (1)` documentado na S39, nem se tentou alterar sandbox, política de Incognito, usuário, armazenamento ou Chrome gerenciado. Não foi reutilizada a navegação interativa do Chrome/CDP compartilhado, que na S42 continha 2 avaliações e 2 notas cujo caráter pessoal/fictício não pode ser presumido.

**Sites privados existentes, fora da S43:** `agu-quiz-pessoal-estudo.aleixo-taw.chatgpt.site` e `agu-quiz-homologacao.aleixo-taw.chatgpt.site` são publicações visuais privadas de cópias estáticas geradas anteriormente, ambas a partir do GitHub SHA **`d8e37d4`**. A origem HTTPS de um Site difere da origem do Pages e da do outro Site; isso segrega `localStorage` por *origem*, mas **não demonstra um novo perfil/partição de browser administrado independente** nem valida os nove estados iniciais em um perfil descartável. Os Sites **não sincronizam automaticamente** atualizações da main. Portanto, **ambos antecedem a incorporação LEG-09** e exigiriam atualização separada e autorização própria. Nenhum Site foi inspecionado, alterado ou usado para gravar fixture nesta sprint.

Não foi possível demonstrar conjuntamente: autorização específica do meio; identidade de browser/namespace e partição novos; origem da aplicação correta; **nove categorias inicialmente vazias**; ausência de histórico; descarte sem impacto no perfil principal. **`nao_testado_browser_isolado`**. GitHub Actions efêmero fornece teste automatizado real, mas um **CI histórico em outro runner não é um ensaio humano novo S43**.

| Ensaio S43 | Classificação | Gravidade / evidência e limite |
| --- | --- | --- |
| Isolamento de perfil e armazenamento novo descartável | `nao_testado_browser_isolado` | **Alta (privacidade/histórico):** mecanismo não fornecido; nenhuma escrita em browser. |
| Caderno Excluir cancelar/aceitar, legado, foco após diálogo; Estudo sessão/retomada; Revisão C/E; Plano mover/regenerar | `nao_testado` | **Alta (integridade):** só há regressões sintéticas Node e CI independente histórico. |
| Cinco viewports **reais S43** 320/360/390/430/1280, `innerWidth/innerHeight`, Tab/Shift+Tab/Enter/Espaço, `activeElement`, role/nome/ID, retângulo/scroll, Voltar/reload | `nao_testado` | **Moderada:** nenhuma medição, comando ou screenshot S43 em perfil isolado. Larguras CI `43727075813` são de **outra execução**. |
| Axe/contraste novo em perfil independente S43 | `nao_testado` | **Moderada:** sem scan novo; logs CI LEG-09 detalhados adiante. |
| Android físico/TalkBack | `nao_testado_android_fisico` | **Alta (acesso móvel):** aparelho/consentimento específicos não oferecidos; sem inferir versão, densidade, toque ou anúncio. |
| Backup pessoal antigo em dispositivo real | `nao_testado_backup_historico_real` | **Alta (dados):** não houve oferta voluntária nem autorização; nenhum arquivo privado acessado. |
| Correção individual nova A–E de 2023 | `nao_testado_ae_auditado` | **Jurídica:** nenhum gabarito/conteúdo candidato promovido. |
| Cópias Sites desatualizadas face à main LEG-09 | `risco` | **Moderada (produto):** cópia independente, sem atualização automática; não é problema de isolamento resolvido. |
| Regressões locais Node/VM e Pages | `risco` residual | **Baixa no recorte testado:** 22 suítes + 4 verificadores + HTTPS aprovados; não substituem diálogo nativo/hardware. |

**`falha_reproduzida`: 0.** `melhoria_opcional`: atualização futura e intencional de Sites privados em frente separada, sem tocar histórico. Nenhuma captura sintética foi produzida; não houve cenário vermelho, motivo para patch ou disparo artificial de CI. `BODY` após reload integral não foi tratado como falha.

## 3. Provas locais e CI atual, com autoria de cada execução

**S43 local — Node.js `v24.22.1`, não Node 22:** todas as **22 suítes** JavaScript efetivamente integradas passaram, `exit 0`: S19 **26/26**, S20 **41/41**, S25–S27, S29–S35, WORK01 **14/14** e LEG01–09 (inclusive LEG09 `checks:10`, `backups:9`, marcas `300`, pergunta `450` caracteres). Quatro verificadores Python LEG03–06 passaram: reconstrução de 541 parágrafos LRF, 220 blocos LC73, 89 blocos LINDB e 91 blocos Ação Popular. Sem leitura de estado de browser ou dados pessoais; são provas de **Node/VM/fonte pública**.

**Último CI de código efetivamente conferido**, não criado na S43: [Actions run **43727075813**](https://github.com/Talksxb/agu-quiz/actions/runs/43727075813), SHA de **código LEG-09 `bdefbf116a1e872c2a0378b49f2482db666a10e6`**, `completed/success` em 15/11/2026. Logs **individuais** reabertos:

| Job | ID | Prova delimitada |
| --- | --- | --- |
| `integridade-node` | **132851241532** | `success`, **Node 22.23.4**, 22 suítes do workflow. |
| `navegador-chromium` | **132851241784** | `success`, **Chromium 159.0.8154.6**, axe-core **4.14.0**, 320/360/390/430/1280 em testes Playwright sintéticos, S29–S35, WORK01, LEG01–09. `S35_BROWSER_FOCO_OK noGhost:true`. |
| `pages-publicado` | **132851241736** | `success`, URL HTTPS real, LEG09/08/07/06/05/04/03 e WORK01. **Quatro tentativas transitórias** de verificar HTML novo falharam durante propagação; a quinta verificou os hashes, seguida de cenários verdes. Não esconder as tentativas intermediárias. |

No job Chromium, **26 scans S23, zero `violations` nos recortes**, 13 cenários/19 nós `color-contrast incomplete`; S24 expôs os 19 por rolagem e **19/19 passaram**. Não é WCAG global nem inspeção humana S43. A PR LEG-09 também teve teste intermediário falho [43726432300](https://github.com/Talksxb/agu-quiz/actions/runs/43726432300) por painel mobile oculto no teste; ajuste de teste `f4891cf` e [CI PR **43726668867**](https://github.com/Talksxb/agu-quiz/actions/runs/43726668867) aprovada. A falha intermediária não foi falsamente reclassificada.

**Artefatos do run `43727075813`, informados pela API (não baixados nem abertos visualmente na S43):**

| Nome | Artifact ID / bytes | Digest SHA-256 da API | Expiração (UTC) |
| --- | --- | --- | --- |
| `agu-s20-chromium-viewports` | **14166962697** / **6.515.527** | `041235c4c2256f334b8dc27b5bc652a389f42466fbf208517adc76991e68d620` | **22/11/2026 14:59:18** |
| `agu-work01-publicado` | **14167196939** / **2.027.474** | `c5998a88015b8da83ec53a795bc7c7baf30eca97d00ef21bdb30073b2d68a8fb` | **22/11/2026 14:58:35** |

Digest/bytes/expiração são metadados do GitHub, **não SHA local revalidado nem prova de inspeção visual das imagens**. Deploy de código LEG-09 [**43727075022**](https://github.com/Talksxb/agu-quiz/actions/runs/43727075022), e deploy posterior **documental** LEG-09 [**43727517590**](https://github.com/Talksxb/agu-quiz/actions/runs/43727517590), ambos `completed/success`. O segundo não é CI novo de código.

## 4. Pages atual, caches e regras de continuidade

`node tests/sprint21-pages.cjs` **executado em S43**, `exit 0`, HTTPS **200** para HTML e oito scripts, com correspondência de SHA-256 ao checkout LEG-09. Hashes da resposta HTTPS medidos pelo verificador (tela de usuário não visitada):

| Recurso | SHA-256 HTTPS | `?v=` no HTML `7c81b6b` |
| --- | --- | --- |
| `index.html` | `47c7c6195c6ffdfeaa63fbc5d65b82b6ba96cb0f9733609ffe0118d68fd08cfe` | — |
| `revisao-inteligente.js` | `566217a961278d79c06d6005603646ff2b5a3d73ce9cdf885578e27455816f5a` | `20261115-leg09` |
| `planejamento-semanal.js` | `b11788273caf97a35d155be1b60d42dbb7f302b6aa55912f1f4e6942436bbc7b` | `20261113-s35a` |
| `leitor-consolidacao.js` | `e6d030e22c96d9b1dc39430bf13e34a832bef835f1be93fa3f42b6fe39851ba4` | `20261113-leg02` |
| `backup-local-s20.js` | `f3269fa682337fc314b3b78d7367afd2e95be586714dabdd0f56b3be1057785b` | `20261115-leg09` |
| `leitor-juridico.js` | `b6482d6087d03e55d7406beb18c1a2fc5c58f1cd2ce0541f4605d41276d32a83` | `20261115-leg09` |
| `meu-estudo.js` | `a6c8d9d8c706bee481517e37c18b141985f3737422270ca919e78b3d9b035fc0` | `20261113-work01b` |
| `estudo-integrado.js` | `82fafd24b164c5d5f4a9fc37ad2bcad90c81d1755bdb9b53ea853f23fd724fc9` | `20261115-leg09` |
| `dados/legislacao-s13.js` | `c038fc9416d1b441aa710bb970eb8428a92008f197ca367ea09df53f6c45f51a` | `20261114-leg06` |

O `caderno-contextual.js` segue cache `20261113-s35a`, não foi modificado. Os destinos continuam **Início, Estudar, Biblioteca Inteligente, Evolução**, mais o controle **Mais** existente. Conteúdo conhecido: seis normas no catálogo; cinco textos integrais, CF88 parcial; 292 artigos/1.176 unidades, 36 flashcards, 24 referências oficiais anteriores **apenas catalogadas**. Revisão D+1/D+7/D+21/D+45; 2015 C/E individuais `of-2015-adv-006/-007/-009/-048` com E/C/E/C históricos; Q1 2015 fora da nova correção; 2023 A–E condicionado a cotejo item/variante/gabarito/fundamentação; anuladas não pontuam. A LEG integrada não certifica automaticamente os 412 tópicos.

Backup `agu-portable-local-s20-v1`: **nove categorias só em `localStorage`**, máximo **12.000.000 bytes UTF-8** por categoria/pacote/JSON formatado, conforme contrato, SHA-256 por categoria, `AGUValidateMatrix`, recusa/rollback por quota, importação **somente de categoria ausente** e idempotência, **nunca sobrescrever**. S25 synthetic: 650 acentuados, 13.213.211 bytes/6.712.561 caracteres, compacto 11.999.987 vs formatado 12.000.013 (recusado) e restauração pequena byte-idêntica; S26 seis inválidos recusados e texto válido até 14.000; S27 cinco falsificações recusadas e duas notas válidas. Conflito entre dispositivos: guardar ambas as cópias **sem merge**. Backup pessoal real, arquivos >12 MB ou corrupção antiga não autorizam limpeza, edição, migração, divisão ou compactação. Não foi transferido histórico pessoal para Sites ou GitHub.

## 5. Auditoria privada — metadados apenas, sem exportação

Consulta **somente leitura** de `Talksxb/agu-auditoria`: `docs/PROTOCOLO.md`, `checkpoints/estado.json`, `checkpoints/handoff.json`, `checkpoints/AUD03-033.json`, depois `AUD03-034.json` e metadados normativos, via conector GitHub. **Abertura:** `main` **`eb8fea43ee6eaca22a3b4bb9a231a9e4e7c12625`**, árvore **`bd00732f61f8de6f4bb7c0ad575bc219ce8249b2`**; **AUD03-033**, 412 IDs únicos, **369 com alguma evidência / 43 sem**, **6.847 referências**, **397 questões históricas únicas**, **145 lotes normativos integrados / 146 persistidos** (`NORM-INT-049` aguardava QA), **zero** integralmente certificados.

**Fechamento read-only posterior e concorrente:** `main` avançou para **`76bf1db682a4eb0783482182ee8d058c0528958a`**, árvore **`4dcfc33a20379d4e96a1d2f9554bb23e9f9d7818`**. Último checkpoint **AUD03-034** integrado: **370 com alguma evidência / 42 sem de 412**, **6.905 referências**, **397 questões únicas**, **146 lotes integrados e 146 documentados em `estado.json`**, **zero** certificados. O inventário pós-merge em `AUD03-034` distingue **147 arquivos normativos físicos em `main`**, pois **`NORM-INT-050`** (INT-57/58) chegou depois do corte de integração e ainda **não foi incorporado** pela AUD03 nem reconciliado no campo global de `estado.json`. Arquivo físico, persistência documentada e integração são três estados distintos. Nenhuma evidência/matriz privada foi copiada para Quiz/CI/Sites. A contagem de evidência não equivale a verificação integral.

## 6. Decisão pendente e fechamento S43

**Não tentar outra série de sprints de ensaio mutável no mesmo Chrome gerenciado.** Para liberar o portão, o usuário/plataforma precisa indicar explicitamente **um navegador/perfil de testes sob controle independente**, por exemplo um perfil convidado descartável de computador próprio ou um ambiente de testes distinto oferecido pela plataforma, com permissão de operar **somente dados artificiais**. Antes de qualquer escrita, provar namespace/partição separados, origem correta, nove categorias vazias e descarte sem afetar o perfil real. Um Android/TalkBack real ou backup pessoal exigem autorização **adicional e específica**. Usar Sites como base de interação humana é outra frente com fluxo de dados autorizado, e **não é equivalência automática a isolamento**.

**Sem código alterado, sem nova CI S43, sem screenshot, sem leitura ou mutação de histórico pessoal, sem alteração de Sites.** Após este checkpoint, o [prompt S44](PROMPT_SPRINT44_AMBIENTE_INDEPENDENTE_CONTINUIDADE_2026-11-15.md) permanece apenas handoff. Reconfirmar HEAD/PRs/CI/Pages/AUD03 no fechamento/publicação documental e não associar o deploy de docs a uma nova aprovação de código.
