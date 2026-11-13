# AGU Quiz | PROMPT COMPLETO — Sprint 31
## Continuidade acessível após renderizações, recuperação local conservadora e integridade jurídica

**Predecessora:** Sprint 30, correção demonstrada da perda de foco após ativação por Espaço/Enter nas unidades do Leitor. **Ler primeiro** `docs/CHECKPOINT_SPRINT30_FOCO_APOS_ATIVACAO_2026-11-13.md`, `docs/CHECKPOINT_SPRINT29_TECLADO_LEITOR_RECUPERACAO_2026-11-13.md`, `docs/GUIA_BACKUP_LOCAL_S21.md` e `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`. **Este arquivo é exclusivamente handoff. NÃO executar a Sprint 31 no fechamento da Sprint 30.**

## 1. Missão e fronteiras

Prosseguir com uma **única sprint por execução**, focando a continuidade de teclado/foco **após outras renderizações existentes** e as pendências reais de recuperação e acesso humano. Priorizar verificação assistida do Leitor após troca de artigo, abas e painéis mobile, e da navegação secundária de Biblioteca, Plano e Revisão, **sem presumir defeitos**. A S30 corrigiu um comportamento específico: `AGULegal.unit(id,true)` refoca a unidade reconstituída quando ativada por teclado. Essa prova **não certifica** automaticamente todas as mudanças de tela, todos os leitores de tela nem WCAG global.

Só alterar código se houver **falha reproduzida**, com ações, ambiente, foco esperado/observado, gravidade, prova de antes e depois no **mesmo cenário**, teste mínimo e respeito ao histórico local. Se todos os ensaios disponíveis passarem, criar **checkpoint documental sem patch**. Não introduzir opções de produto só para melhorar números de cobertura.

Proibidos sem nova autorização: quinto destino, menus/rotas novos, conteúdo ou pergunta aproximada, certificação jurídica sem auditoria integral, autenticação, backend, banco, sincronização, telemetria de dados privados, importação em lote, transferência ou fusão entre aparelhos, migração, compactação, restauração substitutiva, limpeza/descarte de histórico e publicação da matriz da Auditoria.

## 2. Fontes e estado inicial: reconfirmar, nunca assumir

- **Aplicativo:** [`Talksxb/agu-quiz`](https://github.com/Talksxb/agu-quiz), branch `main`; código e correção S30 em [`a78600c0df9bb1c3091e626393917769c6b3bf48`](https://github.com/Talksxb/agu-quiz/commit/a78600c0df9bb1c3091e626393917769c6b3bf48), verificador Pages ajustado em [`e3fc8dd457885e9360aebdec36f6ab0f454746af`](https://github.com/Talksxb/agu-quiz/commit/e3fc8dd457885e9360aebdec36f6ab0f454746af). **Haverá commits documentais S30 posteriores:** revalidar HEAD, commit, blobs e arquivos antes de qualquer modificação.
- **Auditoria privada, somente leitura:** [`Talksxb/agu-auditoria`](https://github.com/Talksxb/agu-auditoria), `docs/PROTOCOLO.md`, `checkpoints/estado.json`, último `AUD03-###.json` efetivamente integrado e status de matriz de trabalho/evidências normativas posteriores. Fotografia consultada na S30: HEAD `90b7d0b3ffa734ba4a3fad0cb3be1dd9d7f36dad`; `AUD03-023`, **412 IDs únicos, 356 com alguma evidência/56 sem, 127/127 lotes normativos integrados/persistidos, 5.994 referências, 837 pendências sem URL e zero integralmente certificados**. `AUD03-022` integrou `NORM-INT-030`; `AUD03-023` triou dez conflitos secundários sem criar novos vínculos. **Reconsultar, pois esse estado pode ter mudado.** Não abrir/publicar dados curriculares completos no repositório público.
- **Leitura cronológica:** checkpoints S19–S30 (prioridade S27–S30), prompts S27–S30, guia S21 e roteiro Android S24. Examinar módulos `index.html`, `leitor-juridico.js`, `backup-local-s20.js`, `revisao-inteligente.js`, `planejamento-semanal.js`, `caderno-contextual.js`, `estudo-integrado.js`, `leitor-consolidacao.js`, `questoes-leitor-s18.js` e dados de questões S18/S19.
- **Testes vigentes:** Node `tests/sprint19-validacao.js`, `sprint20-validacao.js`, `sprint25-validacao.js`, `sprint26-validacao.js`, `sprint27-validacao.js`, `sprint29-validacao.js`, `sprint30-validacao.js`; browser `sprint20-browser.cjs`, `sprint21-browser.cjs`, `sprint21-pages.cjs`, `sprint22-browser.cjs`, `sprint23-browser.cjs`, `sprint29-browser.cjs`, `sprint30-browser.cjs`; axe `sprint22-axe.cjs`, `sprint23-axe.cjs`, `sprint24-contrast.cjs`; workflow `.github/workflows/agu-sprint20-ci.yml` e quaisquer testes posteriores reais.
- **Último CI de código S30 comprovado:** [**43468054810**](https://github.com/Talksxb/agu-quiz/actions/runs/43468054810), commit `e3fc8dd457885e9360aebdec36f6ab0f454746af`, jobs `integridade-node` **132032378531**, `navegador-chromium` **132032378812** e `pages-publicado` **132032378761**, todos **success**; artefato [**14058539692**](https://github.com/Talksxb/agu-quiz/actions/runs/43468054810/artifacts/14058539692), **3.763.559 bytes**, captura sintética e JSON de foco S30. Reabrir **status e logs de cada job**, artefatos e execução posterior se houver. **Não chamar CI S30 de rerun S31.**
- **Regressão histórica:** [run 43467785966](https://github.com/Talksxb/agu-quiz/actions/runs/43467785966) passou Node/Chromium, mas o job Pages falhou **por expectativa obsoleta `s29a` no verificador**; foi corrigido exclusivamente no teste e o CI final passou. Não relatar essa falha como indisponibilidade do aplicativo.
- **Pages na S30:** [HTTPS 200](https://talksxb.github.io/agu-quiz/), HTML SHA-256 `daf99eb7d974ea1251afe7d96d833f7e8d09e72148787d2ea9112797c804d670`; `leitor-juridico.js` `a1e2a54797e10c079271ddb2836399e2b23531f8e65763f3ef3f5418701cee65`; `backup-local-s20.js` `d9f7705b490d041dd445701b0b619e39c6b2bb4d204cb5a966b27b98ca4d0d78`. Cache Leitor `s30a` e backup `s27a`. Reconferir HTML e **cinco scripts** publicados após qualquer código novo, sem assumir hashes estáticos.

## 3. Ensaios condicionados e evidência correta

### A. Teclado e foco nas renderizações existentes

Prioridade: verificar **estado de foco e ordem de Tab** ao navegar pelos controles reais, por teclado, nos fluxos:

1. **Biblioteca Inteligente → Leitor**: Tab chega a subdivisões `.agu-unit`; Espaço/Enter selecionam, mantêm foco e permitem Tab para o próximo controle e Shift+Tab de volta. Revalidar o patch S30 após retorno e reload.
2. **Leitor → índice de artigos**: navegar com Tab/Enter por `.agu-index-entry`, mudar artigo, voltar à seleção, verificar anúncio/título e se foco segue previsível. Não assumir falha só por existir `render()`: medir antes e depois.
3. **Leitor → abas existentes**: Jurisprudência, Questões, Caderno, Flashcards, Comentários, Estudo integrado; medir foco/visibilidade ao alternar, incluindo eventuais controles que desapareçam na renderização. **Não adicionar novas abas.**
4. **Leitor mobile emulado**: controles Índice, Texto legal, Relacionados nas larguras 320/360/390/430, rolagem horizontal e vertical. Não confundir painéis ocultos com falhas de contraste efetivas; não declarar Android físico.
5. **Navegação secundária e jornada:** quatro destinos, `Mais`, Plano semanal, seletor 2023, Revisão, Caderno, Evolução, Voltar e refresh. Verificar que Tab, Shift+Tab e Enter acionam os elementos pretendidos e não geram respostas/tentativas involuntárias.

Em desktop Chromium, usar se possível **320, 360, 390, 430, 1280 CSS px**. Registrar sequência de teclas, `document.activeElement`/nome/papel, seletor/ID e retângulo de foco, largura CSS, scroll e resultado. Separar `.focus()` programático, navegação efetiva por Tab, toque emulado e prova humana. Um elemento renderizado novamente pode perder foco, mas **não corrigir todos os `render()` por conjectura**; avaliar impacto e reproduzir o problema concreto antes de patch.

### B. Android físico, toque e TalkBack

Somente com dispositivo **fisicamente acessível** e **autorização específica**. Registrar modelo, versão Android/Chrome, orientação, viewport CSS medido, densidade se disponível, modo de conexão, perfil descartável, consentimento e dados sintéticos. Seguir [roteiro S24](ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md), com quatro destinos, Mais/nav horizontal, Plano semanal, seletor 2023, Revisão, Caderno/Leitor, backup local de teste, refresh, teclado virtual, rolagem e toque.

Se TalkBack disponível e autorizado: avaliar nomes, papéis, título anunciado, foco/ordem, elementos recortados e retenção de foco em transições. Sem aparelho e autorização, usar exatamente `nao_testado_android_fisico` — **sem inferir** densidade, modelo, Android, Chrome, toque físico ou leitor de tela a partir de CI ou Chrome desktop. Capturas não podem conter notas, questões respondidas ou outros dados identificáveis.

### C. Axe, contraste e elementos parcialmente ocultos

Interpretar separadamente `violations`, `incomplete`, `passed` **após rolagem** e eventual inspeção humana. Na S30, Chromium **158.0.8127.18** / axe-core **4.14.0**: **26 scans**, zero violações nos cenários testados, **13 cenários/19 nós `color-contrast incomplete`** por `elmPartiallyObscured` inicialmente, com **19/19 `passed`** quando totalmente expostos. Isso não é certificação WCAG global, nem autoriza mudança especulativa de cores.

Se aparecer reprovação objetiva: documentar largura, estado, coordenadas, retângulo, cores computadas, seletor, ação, screenshot sintético antes/depois e teste de regressão no mesmo cenário. Evitar ajustes cosméticos sem falha demonstrada.

### D. Recuperação local sem migração e sem dados privados

Preservar **`agu-portable-local-s20-v1`**, nove categorias catalogadas, exclusivamente `localStorage`, limite **12.000.000 bytes UTF-8** por categoria/pacote/JSON formatado conforme contrato, SHA-256 por categoria, validação `AGUValidateMatrix`, quota com rollback, importação idempotente e **restauração apenas de categorias ausentes** — nunca sobrescrever.

Repetir Node S25: 650 registros acentuados de **13.213.211 bytes / 6.712.561 caracteres**, JSON compacto **11.999.987** vs formatado **12.000.013 bytes**, recusa coerente e restauração pequena hash-idêntica. S26: notas do Leitor apenas strings de até **14.000 caracteres**; objeto, `null`, número, array, HTML como objeto ou excesso rejeitados **antes da escrita**. S27: artigo/unidade pertencentes ao corpus, notas associadas a dispositivos válidos e estados tab/mobile conhecidos; cinco casos falsificados rejeitados, caso válido com duas notas/restauração idempotente. S29: Espaço/Enter e persistência; S30: foco pós-rerenderização. E2E S20–S24: nove categorias, perfis novos, JSON truncado, categoria/esquema indevido, IDs duplicados, dispositivo desconhecido, matriz inconsistente, quota/rollback, SHA, retorno/reload e nenhuma tentativa fantasma.

**Backup histórico pessoal** somente com arquivo **voluntário**, autorização explícita e ensaio **local em perfil isolado**; relatar apenas métricas e hashes não identificáveis. Não publicar nem transmitir resposta, nota, matriz privada ou arquivo real a GitHub, Actions, Issues, PRs, ZIPs ou capturas. Sem amostra, manter `nao_testado_backup_historico_real`. Conflito entre aparelhos: preservar ambas as cópias, sem merge. Estado >12 MB ou já corrompido não tem solução integral autorizada; não sugerir limpeza do navegador, edição/divisão manual do JSON, compactação ou migração improvisada.

### E. Conteúdo jurídico e jornada estáveis

Percorrer **Início → missão recomendada → Estudar/Planejamento → Revisão → Caderno/Leitor → Evolução** e retornar, usando teclado, toque emulado (quando houver) e reload, sem tentativa sem resposta ou duplicada. Preservar **quatro destinos** (Início, Estudar, Biblioteca Inteligente, Evolução), `D+1/D+7/D+21/D+45`, questões auditadas `of-2015-adv-006/-007/-009/-048` com gabaritos históricos **E/C/E/C**, **36 flashcards**, **24 referências oficiais catalogadas** (não certificadas), provas 2015 C/E e 2023 A–E, anuladas sem pontos.

`of-2015-adv-001` continua excluída da nova correção automática até cotejo independente do caderno, variante, gabarito e fundamentação; CF art. 37, X; CF art. 49, V; Lei 9.784 art. 50 continuam como **trechos identificados**. `confirmado_pontualmente` não equivale a `certificado_integralmente`, e Auditoria 3 ainda mantinha zero temas integralmente certificados na S30. Não promover fonte/questão/matriz sem prova oficial.

## 4. Procedimento, publicação e qualidade

1. No início: reconfirmar HEAD/branch/blobs do Quiz, último CI por SHA, Pages e última integração `AUD03` efetiva; ler checkpoints e testes existentes. Classificar cada item como `falha_reproduzida`, `risco`, `nao_testado` ou `melhoria_opcional`, com gravidade, esperado, observado e reprodução.
2. Executar regressões **Node 22 real** S19 (26/26), S20 (41/41), S25/S26/S27/S29/S30; Chromium real S20–S24/S29/S30, axe/contraste e o ensaio de foco específico quando o ambiente permitir. Registrar versão, cinco viewports e separação **local × CI × hardware físico**. Executor local S30 não iniciava Playwright por `chromium_headless_shell-1234` ausente; `/usr/bin/chromium` abortava `socket() failed: Operation not permitted (1)`; **isso não invalida o CI real aprovado**.
3. Se houver defeito comprovado, reproduzir **antes de corrigir**, registrar screenshot sintético, corrigir no menor escopo e passar mesmo cenário após patch. Adicionar teste novo somente para falha reproduzida ou prova humana inédita; não forçar integração funcional. **Se não houver falha, apenas checkpoint documental sem código.**
4. Com patch: atualizar cache apenas se script mudou, workflow/teste se estritamente necessário, publicar de modo controlado em `main`, reabrir commit/blobs; conferir run **posterior ao SHA**, logs individuais dos três jobs (`integridade-node`, `navegador-chromium`, `pages-publicado`), artefato ZIP sintético, Pages HTTPS 200/hashes HTML e cinco scripts. Evitar falso negativo de verificador por versão cache desatualizada. Sem patch, **não disparar CI artificial**.
5. Reconsultar Auditoria 3 **somente leitura** no fechamento. Não substituir ou sincronizar matriz privada; diferenciar lotes persistidos de integrados e status pontual de certificação.

## 5. Critérios de aceite e próximo handoff

Aceite: prova antes/depois de qualquer patch, resultados Node/Chromium claramente identificados, foco/ordem de teclado honestamente delimitados, axe `incomplete` separado de `violation`, recuperação sintética sem perda nem substituição, proteção de dados históricos reais, quatro destinos/conteúdo jurídico estáveis, jobs/artefatos/Pages reais e fotografia AUD03 com SHA do corte.

Criar **checkpoint Markdown S31** com arquivos, commits, SHA, testes, gravidade, evidências, jobs/ZIP/Pages, cenário físico se houver autorização e pendências. Preparar **prompt integral Sprint 32 exclusivamente como handoff**, sem executá-la.

**Princípio permanente:** uma sprint por execução; evidência antes de mudança; privacidade e rigor jurídico acima de expansão funcional, estética ou numérica.
