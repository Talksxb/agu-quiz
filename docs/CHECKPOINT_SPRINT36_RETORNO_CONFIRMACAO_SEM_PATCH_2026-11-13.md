# AGU Quiz | CHECKPOINT — Sprint 36
## Retorno à tarefa e cancelamentos conservadores, sem patch

**Data:** 13/11/2026 (`America/Sao_Paulo`). **Repositório:** [Talksxb/agu-quiz](https://github.com/Talksxb/agu-quiz), branch `main`. **Decisão:** nenhum defeito adicional reproduzido nos ensaios disponíveis; **zero alteração de código, CSS, cache, testes versionados ou workflow**. Documentação de S36 e handoff S37 apenas. Não houve execução de S37.

### 1. Fonte da verdade, concorrência e ambiente

- Abertura S36: `main` no commit **`10588628d2a37f6e05764f27a1d0ed79e3376cf4`**, árvore **`ee5d1e0a916ccc3bb454d02595ff0dcafe6fea78`**; clone novo e limpo, sem diff ou alterações preexistentes. S35 código: `cb0641f587a079f22b97c156a2ecfc238c7e2dd8`; ajuste exclusivamente de teste: `af5d820dd83abdf594284371f053cfd64e133011`; S35 documental: `10588628d`.
- WORK 01/PR #1 já integrada em `4fa4d2955be60e8acf5e2d134e9d5b241f84f6c3`; `meu-estudo.js` e o retorno pela home preservados. Não se iniciou plataforma alternativa ou camada visual Sites.
- Consultados: checkpoint S35 integral, S34, referências dos checkpoints S19–S33 (prioridade S29–S35), prompts vigentes, `docs/GUIA_BACKUP_LOCAL_S21.md` e `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`; implementação e testes de Caderno, Estudo Integrado, Revisão, Plano, Leitor, Consolidação, WORK 01, questões auditadas, backup, axe, Pages e workflow.
- Executor local: **Node v24.22.1**. Navegador local: **não disponível** para a suíte E2E porque o Playwright não tem `chromium_headless_shell-1234` e o `/usr/bin/chromium` abortou em `socket() failed: Operation not permitted (1)`, `SIGABRT`. O Chrome compartilhado foi acessível para uma inspeção real **não destrutiva** em Pages. Tentativa de abrir servidor local no navegador compartilhado retornou `net::ERR_CONNECTION_REFUSED`; não foi declarado ambiente isolado de Chromium real S36.
- O `git status` do checkout ficou limpo após remover a sonda VM temporária. **Nenhum teste novo S36 foi persistido** porque não se demonstrou defeito para justificar modificação do fluxo de CI.

### 2. Cenários S36 observados e limites da prova

**2.1. Chrome compartilhado, no aplicativo Pages, sem tocar no histórico pessoal.** A aba pré-existente apresentava estado explicitamente sintético de sprints anteriores, duas notas contextuais fictícias e indicadores de WORK 01. Foi possível navegar a Biblioteca Inteligente → Materiais → Caderno, acionar **Enter em `Excluir`** e observar o diálogo nativo de confirmação. A operação foi **cancelada** (`dismiss`); o botão **Excluir** voltou a figurar como ativo e as duas notas permaneceram na interface. Houve um timeout de `Input.dispatchKeyEvent` na automação enquanto o diálogo modal aguardava resposta; a presença do `confirm` foi observada posteriormente, ele foi dispensado e o estado resultante foi inspecionado. Isso não foi classificado como defeito do aplicativo.

Em seguida, Início/WORK 01 → recarga: título **Meu estudo de hoje**, missão recomendada e região de indicadores permaneceram idênticos no conteúdo antes/depois, inclusive **zero revisões pendentes e zero minutos confirmados** nesse perfil. Foco após recarga foi `BODY`, enquanto antes da recarga estava em um botão. Essa diferença **não foi classificada automaticamente como falha**, porque uma recarga integral não é a mesma transição de um controle que deveria manter foco; não houve reprodução de impedimento de teclado. Não foram feitas novas respostas, exclusões, sessões nem alterações de plano nesse perfil.

**Limites do Chrome compartilhado:** a largura CSS exata **não foi medida no recorte S36**, não foram exportados screenshots sintéticos nem métricas individuais de retângulo/scroll para esse ensaio. Não se declarou que a observação equivale a cinco viewports, toque emulado isolado, Android físico, inspeção humana de TalkBack ou WCAG integral.

**2.2. Diagnóstico Node/VM temporário, inteiramente artificial.** Sem ler backup pessoal, uma sonda isolada carregou o código real de Caderno, Plano, Estudo e Revisão em `vm` com `localStorage` em memória, `confirm` controlado e um único registro fictício. O resultado foi:

```
S36_DIAGNOSTICO_VM_OK {"cancelDeletePreserved":true,"cancelRegenerationPreserved":true,"cancelHoursConflictPreserved":true,"confirmedRegenerationSynthetic":true,"notes":1,"attempts":0,"confirmations":4,"renders":2}
```

- **Excluir cancelado:** estado serializado do armazenamento ficou byte-idêntico, nota não removida, foco artificial da ação permaneceu e nenhuma renderização adicional ocorreu.
- **Regeneração cancelada:** após marcar somente uma tarefa fictícia, o cancelamento não alterou byte algum do armazenamento nem substituiu o cronograma; foco artificial inalterado e nenhum `render()` adicional.
- **Disponibilidade com conflito cancelada:** a tentativa de diminuir capacidade foi cancelada; semana e configurações armazenadas permaneceram byte-idênticas.
- **Regeneração confirmada em plano fictício:** recriou apenas a semana artificial, retirando a marcação manual; uma nota sintética conservada e **zero tentativas** na Revisão. As confirmações da sonda foram 4 (três canceladas e uma aceita).

A primeira execução da sonda terminou com uma **asserção incorreta da própria sonda**: supôs `renders===0` no total, embora a criação da nota artificial já tivesse renderizado antes do cancelamento. O teste foi ajustado para comparar o contador **antes/depois de cada cancelamento**, e passou. Isso não foi bug do produto. O arquivo temporário foi excluído via patch local, sem código ou teste S36 persistido. A VM mede lógica e estado, **não navegação física por Tab**, geometria ou anúncios de leitor de tela.

| ID e classificação | Gravidade | Esperado e observado | Decisão |
| --- | --- | --- | --- |
| S36-C01 · `risco` verificado no recorte | Média | Cancelar `Excluir`: duas notas fictícias preservadas; botão ativo após diálogo | **Sem falha reproduzida**, sem patch |
| S36-C02 · `risco` verificado em VM | Alta para dados | Cancelar regeneração e conflito de disponibilidade: bytes de armazenamento preservados; nenhuma resposta/hora criada | **Sem falha reproduzida**, sem patch |
| S36-C03 · `risco` verificado em VM | Média | Confirmar regeneração em semana artificial: somente plano substituído, nota e zero tentativas intactos | **Sem falha reproduzida**, sem patch |
| S36-C04 · `risco` verificado no Chrome | Média | Home WORK 01 antes/depois de reload: missão e indicadores idênticos | **Sem falha reproduzida**, sem patch |
| S36-C05 · `nao_testado` | Média | Troca completa de dispositivo, diálogos de backup em perfil Chromium descartável e navegação S36 de 320/360/390/430/1280 px | Não substituir ausência por aprovação histórica |

### 3. Regressões Node locais e CI de referência — sem novo run de código

Todos os testes existentes abaixo foram **efetivamente executados localmente** sob Node **v24.22.1** e finalizaram com `exit 0`:

| Teste | Resultado observado |
| --- | --- |
| S19 | **26/26** verificações |
| S20 | **41/41** verificações |
| S25 | 650 registros com acentos, 13.213.211 bytes / 6.712.561 caracteres; compacto 11.999.987 versus formatado 12.000.013, rejeição; pequena restauração SHA-idêntica |
| S26 | Seis formatos de notas inválidos rejeitados sem escrita; texto válido de até 14.000 caracteres conservado |
| S27 | Cinco estados forjados rejeitados; duas notas coerentes preservadas e importação idempotente |
| S29–S32 | Ativação Espaço/Enter, foco/re-render do Leitor, artigo, aba, painel, comentários, busca e Consolidação |
| S33–S35 | Foco dos quatro módulos, edição/cancelamento, encerramento, catálogo, tarefa, exclusão/vínculo sintético, retomada, opção C/E e regeneração; S35 **9/9** |
| WORK 01 | **14** verificações de retomada e integridade dos motores originais |

**CI de código mais recente comprovado, mas anterior à S36:** [run **43494607030**](https://github.com/Talksxb/agu-quiz/actions/runs/43494607030), SHA **`af5d820dd83abdf594284371f053cfd64e133011`**, **três jobs `completed/success`**, status e logs reabertos:

- `integridade-node` **132124310700**, Node **v22.23.4**, regressões S19–S35 e WORK 01.
- `navegador-chromium` **132124310239**, Chromium **158.0.8127.18**, axe-core **4.14.0**, E2E S20–S24/S29–S35/WORK01; `S35_BROWSER_FOCO_OK` em **320, 360, 390, 430, 1280 CSS px**, sem tentativa fantasma nos dados sintéticos. **Isso é baseline S35, não nova execução Chromium S36.**
- `pages-publicado` **132124310834**, HTTPS 200 e verificador S21; WORK 01 publicado.

Metadados dos ZIPs S35 reabertos, **não criados na S36**: artefato Chromium **14070138441** (`agu-s20-chromium-viewports`, **4.204.168 bytes**, digest `sha256:587b94dd42c6b10bb4ad3983cce69a5813ca32f14222d172ddf06b19204ff680`, expira 20/11/2026 19:43:02 UTC); WORK01 Pages **14071202201** (`agu-work01-publicado`, **68.429 bytes**, digest `sha256:a8d4064ea14c7c5299e9e694a8443162a6cea87b8a3242a155e03bc16c37d624`, expira 20/11/2026 19:42:18 UTC). Não alegar inspeção de todo conteúdo dos ZIPs.

**Axe e contraste são resultado anterior reaberto do CI S35:** 26 scans no Chromium 158 / axe-core 4.14.0, **zero `violations` nos recortes**, 13 cenários/19 nós `color-contrast incomplete` por `elmPartiallyObscured` inicialmente, **19/19 `passed` após rolagem**. Nenhuma nova varredura axe/contraste S36 ocorreu. `incomplete` não é violação, e esse recorte não certifica WCAG global nem inspeção humana.

### 4. Pages, blobs e caches efetivamente revalidados

No corte de código S35, preservado sem patch S36, [Pages público](https://talksxb.github.io/agu-quiz/) voltou **HTTPS 200**, e `node tests/sprint21-pages.cjs` executado nesta sprint saiu com **exit 0**, validando HTML e seis scripts. SHA-256 observado nas respostas HTTPS:

| Arquivo | SHA-256 publicado | Cache |
| --- | --- | --- |
| `index.html` | `c7aac0c3af238902b05b56086c19ffbed8ae1c7171b2dfd643758ebb1a17bf50` | — |
| `revisao-inteligente.js` | `ff1ad844a49ef7b98abdb7efd6bdd65f18a83924c4fc5ee8bcd9c75f9a68fc4a` | `20261113-s35a` |
| `planejamento-semanal.js` | `b11788273caf97a35d155be1b60d42dbb7f302b6aa55912f1f4e6942436bbc7b` | `20261113-s35a` |
| `leitor-consolidacao.js` | `3c64085c0077637f476697b0817a34a22a8f6315095b423a1d00963d1f1e4f88` | `20261113-s32a` |
| `backup-local-s20.js` | `d9f7705b490d041dd445701b0b619e39c6b2bb4d204cb5a966b27b98ca4d0d78` | `20261113-s27a` |
| `leitor-juridico.js` | `8045194f8a8ec2bbd10e95fff8ce04c39042d5f7957ad780200433793911f2e1` | `20261113-s32a` |
| `meu-estudo.js` | `a6c8d9d8c706bee481517e37c18b141985f3737422270ca919e78b3d9b035fc0` | `20261113-work01b` |
| `caderno-contextual.js` | `0eff71cc11e85110faf755d3e6ae305eb5b21c5624e4b8f52111fff1c44675a8` | `20261113-s35a` |
| `estudo-integrado.js` | `6f142c9c945428202afe792f921bc4efd12798deada63a9f86dc1e99f5d21adc` | `20261113-s35a` |

Os hashes dos dois últimos scripts foram comparados também diretamente com as cópias locais via HTTPS. **Nenhuma versão de cache mudou na S36.** Última implantação Pages ligada ao commit documental S35 **[43495807346](https://github.com/Talksxb/agu-quiz/actions/runs/43495807346)** terminou `success`, distinta do CI de código S35.

### 5. Privacidade, backup e conteúdo jurídico invariantes

- **`agu-portable-local-s20-v1`** mantido: exatamente nove categorias de `localStorage`, teto **12.000.000 bytes UTF-8** conforme categoria/pacote/JSON formatado, `AGUValidateMatrix`, SHA-256 por categoria, importação somente de categoria ausente, quota/rollback, idempotência, nenhuma sobrescrita nem fusão. Node S25/S26/S27 e CI Chromium S20–S24 de referência confirmam os recortes sintéticos; não há recuperação integral aprovada para backup **>12 MB** ou armazenamento já corrompido.
- **`nao_testado_backup_historico_real`**: nenhum arquivo pessoal fornecido ou autorizado; não testada restauração real. Conflitos de cópias entre dispositivos exigem conservar ambas, sem merge, compactação, divisão, edição manual ou limpeza do navegador.
- **`nao_testado_android_fisico`**: nenhum aparelho físico disponível/autorizado; modelo, Android, Chrome físico, densidade, toque real, teclado virtual e TalkBack **não foram presumidos**. O roteiro S24 continua condicionado.
- Jornada jurídica: somente **Início, Estudar, Biblioteca Inteligente, Evolução**, WORK 01 preservada, D+1/D+7/D+21/D+45, 2015 C/E e 2023 A–E como formatos, anuladas sem pontos, 36 flashcards, 24 fontes catalogadas **não certificadas**, questões históricas `of-2015-adv-006/-007/-009/-048` com E/C/E/C. `of-2015-adv-001` continua excluída da correção automática até cotejo independente. CF art. 37, X; CF art. 49, V; Lei 9.784 art. 50 são trechos pontualmente identificados. `confirmado_pontualmente` **não** é `certificado_integralmente`.
- Não houve cópia de matriz privada, arquivo histórico, resposta pessoal ou nota do estudante para o repositório público, Actions, Issues, PR, ZIP ou screenshot.

### 6. Auditoria 03 privada e encerramento

Auditoria privada [Talksxb/agu-auditoria](https://github.com/Talksxb/agu-auditoria) foi inspecionada **somente em leitura**: `docs/PROTOCOLO.md`, `checkpoints/estado.json`, `checkpoints/AUD03-024.json` e depois `AUD03-025.json`, metadados de estado e inventário de lotes normativos (sem copiar matriz). O estado avançou **durante a S36**:

| Corte real | HEAD privado | Último AUD03 integrado | IDs | Com alguma evidência / sem | Lotes integrados / persistidos | Referências | Certificados integralmente |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Abertura S36 | `75035b0b28fa93fdedc01da951ca6a57ae967a54` | AUD03-024 | 412 | 360 / 52 | 132 / 133 (`NORM-INT-036` só persistido) | 6.209 | 0 |
| Reconsulta pré-documentação | `4a3f4d5ce8122b42a4b329ba24c33d98f26b92ca` | **AUD03-025** | 412 | **361 / 51** | **133 / 134**, `NORM-INT-037` persistido e ainda fora do corte | **6.246** | **0** |

`AUD03-025` integrou pontualmente `NORM-INT-036` para `INT-39`, com 37 novos vínculos com URL e quatro registros sem URL em quarentena. **Esses vínculos não certificam integralmente o tópico.** Estado posterior poderá divergir: reconfirmar SHA antes da próxima execução. A matriz-base preserva 412 IDs e continua privada.

**Fechamento:** `falha_reproduzida` **nenhuma** nos cenários S36 testados; riscos e não-testados discriminados acima. Cumprido o princípio de não alterar código/workflow para fabricar CI. Criado somente [prompt integral da S37](PROMPT_SPRINT37_VALIDACAO_CONDICIONAL_RETORNO_2026-11-13.md) como **handoff, não execução**. Futuro ChatGPT Work Sites visual permanece em frente própria, condicionada a arquitetura/privacidade autorizadas.
