# AGU Quiz | PROMPT COMPLETO — Sprint 33
## Continuidade de foco no Caderno, Estudo Integrado, Revisão e Plano; recuperação local e rigor jurídico

**Predecessora:** Sprint 32 — falhas reais de foco ao salvar comentário e manipular filtros/pesquisa/tamanho/resultados da Consolidação, corrigidas somente nos controles reproduzidos. **Ler primeiro** `docs/CHECKPOINT_SPRINT32_COMENTARIOS_CONSOLIDACAO_FOCO_2026-11-13.md`, `docs/CHECKPOINT_SPRINT31_CONTINUIDADE_FOCO_RECUPERACAO_2026-11-13.md`, `docs/GUIA_BACKUP_LOCAL_S21.md` e `docs/ROTEIRO_ANDROID_E_RECUPERACAO_S24_2026-11-13.md`. **Este documento é exclusivamente handoff: NÃO executar a Sprint 33 no fechamento da Sprint 32.**

## 1. Missão, escopo e regra de mudança

Executar **uma única sprint** de verificação da continuidade de teclado, foco e rolagem nos **controles já existentes** do Caderno contextual, Estudo Integrado, Revisão Inteligente e Planejamento semanal. Revalidar as renderizações pontuais do Leitor corrigidas nas S29–S32. Não presumir defeito a partir da existência de `render()`. Só editar se um problema real for reproduzido com teclado, foco antes/depois, esperado/observado, coordenadas, viewport e evidência sintética anterior; criar teste que falha no código original, aplicar o patch mínimo e repetir a mesma prova. **Sem falha, encerrar apenas com documentação.**

Continuam vedados, salvo nova autorização expressa: quinto destino, novas rotas/menus, mudança estética especulativa, questões aproximadas ou conteúdos não cotejados, certificação integral presumida, autenticação, backend, banco, sincronização, telemetria, mudança de chave/schema de armazenamento, migração/fusão/compactação/divisão de históricos, importação em lote, sobrescrita de categorias, limpeza de navegador e exposição da matriz privada. Não transformar o objetivo futuro de **ChatGPT Work Sites como camada visual** em implementação nesta sprint de estabilidade. A decisão arquitetural e eventual protótipo visual devem constituir frente autorizada e isolada, com GitHub como fonte principal de verdade.

## 2. Fontes e versionamento dinâmico

- **Quiz:** `https://github.com/Talksxb/agu-quiz`, `main`. Código S32 inicialmente `1230b4b25c7df7ceff6bd5103193bf1bd4d7a66a`, teste de setup mobile `c29c8b3ac541a814328a02ec745d920c4ae5ed0b`; após o checkpoint S32 poderão existir commits documentais ou concorrentes. **Reconfirmar HEAD, árvore, blobs e diff.** Caches S32: `leitor-juridico.js?v=20261113-s32a`, `leitor-consolidacao.js?v=20261113-s32a`, backup `backup-local-s20.js?v=20261113-s27a` até mudança justificada.
- **Auditoria privada, somente leitura:** `https://github.com/Talksxb/agu-auditoria`. Ler `docs/PROTOCOLO.md`, `checkpoints/estado.json`, último `AUD03-###.json` efetivamente integrado, metadados da matriz de trabalho e listagem de lotes normativos persistidos. Fotografia de fechamento técnico da S32: `main` **`2c28bd63f97e18ecf0b7ff21eadee333e5ce5f71`**; `AUD03-023`, **412 IDs**, 356 com alguma evidência / 56 sem; **127 lotes integrados de 130 persistidos**, 5.994 referências, 837 pendências sem URL e **zero integralmente certificados**; `NORM-INT-031/-032/-033` persistidos não integrados nesse corte. **Revalidar no início e no fim. Nunca publicar matriz/evidências privadas.**
- **Histórico:** checkpoints S19–S32, prioridade S27–S32; prompts S27–S32, guia S21, roteiro S24; inspecionar `index.html`, `leitor-juridico.js`, `leitor-consolidacao.js`, `backup-local-s20.js`, `caderno-contextual.js`, `estudo-integrado.js`, `revisao-inteligente.js`, `planejamento-semanal.js`, `questoes-leitor-s18.js`, dados S18/S19, corpus S13 e artefatos sintéticos das regressões.
- **Testes e automação:** Node `tests/sprint19-validacao.js`, S20, S25, S26, S27, S29, S30, S31 e **S32**; browser S20–S24, S29–S32; axe S22/S23, contraste S24; `tests/sprint21-pages.cjs` e `.github/workflows/agu-sprint20-ci.yml`. **CI definitivo S32 comprovado:** [run **43478145474**](https://github.com/Talksxb/agu-quiz/actions/runs/43478145474), SHA **`c29c8b3ac541a814328a02ec745d920c4ae5ed0b`**, jobs Node `132067348235`, Chromium `132067348622`, Pages `132067347780`, **todos success**; artefato sintético **14063787248**, 3.909.728 bytes, digest `sha256:a181739ddbb42bf7d1e1ade55d5e574761f32262ac412c6be24d06e38e02746d`. Reabrir jobs, logs e ZIP; **não** chamar a execução S32 de CI novo S33. Reexaminar qualquer run posterior do mesmo SHA ou SHA novo.
- **Frente paralela de plataforma pessoal:** no corte de abertura S32 existia [PR #1, branch `work/plataforma-pessoal-01`](https://github.com/Talksxb/agu-quiz/pull/1), para retomar sessões/plano pela home. Sua integração à `main` deve ser verificada antes de alterações e não se presume merge ou compatibilidade sem diff. **Sites/Work visual é frente futura, não autorização implícita para misturar fontes ou infraestrutura.**

## 3. Ensaios priorizados

### A. Continuidade por teclado nos módulos restantes

Em Chromium desktop real, perfis descartáveis e viewports **320/360/390/430/1280 CSS px**, registrar teclas Tab/Shift+Tab/Enter/Espaço, `document.activeElement`, nome/papel, seletor, retângulo, viewport, scroll e se o foco está visível. Distinguir `.focus()` inicial, navegação efetiva com Tab, toque emulado e avaliação humana.

1. **Caderno contextual:** abrir pelo Leitor já existente, escrever nota **sintética**, acionar salvar/editar somente nos caminhos catalogados, verificar foco depois da reconstrução, Tab seguinte, histórico local intacto, reload e voltar. Não criar nota pessoal.
2. **Estudo Integrado:** abrir e percorrer estados/etapas existentes com teclado, iniciar/encerrar apenas sessões fictícias em perfil isolado; inspecionar foco, campos, botão de retorno, persistência, relação com dispositivo e nenhum lançamento automático indevido.
3. **Revisão Inteligente:** navegar sem responder inadvertidamente e verificar seletor, revelar enunciado, atalhos e Voltar; se for indispensável responder para testar transição, usar **somente item/estado sintético em perfil descartável** e verificar exatamente uma tentativa.
4. **Plano semanal:** abrir Estudar → Plano, seletor 2023, controles secundários, troca de semana/etapa com foco previsível; verificar que uma visita não cria sessão nem tempo confirmado. Conferir Caderno, Evolução, quatro destinos e atualização sem perder posição crítica.
5. **Regressão S29–S32:** .agu-unit Espaço/Enter, foco da unidade S30, artigo/aba/painel e próximo artigo visível S31; na S32 **Salvar anotação**, expandir filtros, Enter na busca, botão Buscar, Limpar, select de tamanho e abrir resultado. Respeitar o painel mobile `Relacionados` antes de ativar Comentários em viewport estreito. Persistência após reload, sem tentativas fantasmas.

Qualquer falha: registrar **antes** viewport, dispositivo de teste, sequência de ações, foco esperado/observado, gravidade, coordenadas, screenshot sintética e teste inicialmente falhando; provar **depois** com o mesmo percurso e regressões anteriores. Não generalizar para todos os `render()`.

### B. Android físico e TalkBack — somente condicionais

Operar aparelho físico **apenas** se disponível e se houver consentimento específico. Registrar modelo, Android/Chrome, orientação, viewport CSS medida, densidade disponível, perfil isolado, meio de acesso; executar roteiro S24 integral (quatro destinos, navegação horizontal/Mais, Plano/2023, Revisão, Caderno/Leitor, backup sintético, refresh, teclado virtual, rolagem e toque). TalkBack se autorizado: nome/papel/anúncio de título, ordem, elementos parcialmente ocultos, foco pós-render. Capturas sem dados privados. Sem aparelho/consentimento: **`nao_testado_android_fisico`**. Chromium desktop e touch emulado não são Android físico/TalkBack.

### C. Axe, contraste e inspeção

Executar S22/S23/S24: separar **`violations`** (regra/nó/cor/retângulo/largura), **`incomplete`** por `elmPartiallyObscured`, **`passed`** depois da rolagem e **inspeção humana realmente feita**. Referência S31/S32: axe-core 4.14.0, 26 varreduras, zero `violations` nos recortes; 13 cenários/19 nós originalmente `color-contrast incomplete`, 19/19 `passed` após revelação. **Não é certificação WCAG global.** Sem falha reproduzida, não mudar cores/CSS.

### D. Backup conservador e idempotência

Preservar `agu-portable-local-s20-v1`: nove categorias de `localStorage`, limite **12.000.000 bytes UTF-8** nos critérios de categoria/pacote/JSON formatado, SHA-256 por categoria, `AGUValidateMatrix`, importação só de categorias ausentes, quota/rollback e idempotência, nunca substituir.

- S25 Node: 650 registros acentuados, **13.213.211 bytes e 6.712.561 caracteres**, compacto 11.999.987 vs formatado 12.000.013 bytes, recusa e restauração pequena hash-idêntica.
- S26: notas somente strings ≤14.000 caracteres; seis entradas inválidas rejeitadas antes da gravação; positiva íntegra.
- S27: IDs/artigos/unidades/tabs/mobile coerentes; cinco estados forjados recusados, duas notas válidas preservadas/idempotentes.
- S29–S32: ativação, foco/rolagem, salvamento de nota sintética e resultados de busca; S20–S24 Chromium: nove categorias, entradas adversariais, quota/rollback, hash, reload sem resposta fantasma.
- Backup pessoal histórico real **somente** com arquivo fornecido voluntariamente e autorização específica para perfil isolado, preservando original e relatando somente hashes/contagens não identificáveis. Sem amostra: **`nao_testado_backup_historico_real`**. Em conflito de aparelhos, conservar ambas cópias, sem merge. Para >12MB/corrupção prévia não existe solução integral autorizada: não limpar navegador, editar/dividir/compactar ou migrar por improvisação.

### E. Conteúdo e proteção jurídica

Manter somente **Início, Estudar, Biblioteca Inteligente e Evolução**, revisão **D+1/D+7/D+21/D+45**, 2015 C/E, 2023 A–E, anuladas sem pontos, **36 flashcards**, **24 referências oficiais catalogadas** sem certificação integral e questões auditadas `of-2015-adv-006/-007/-009/-048` com gabaritos históricos **E/C/E/C**. `of-2015-adv-001` continua excluída da nova correção automática sem cotejo independente de caderno/variante/gabarito/fundamentação. CF art. 37, X; art. 49, V; Lei 9.784 art. 50 são recortes identificados. `confirmado_pontualmente` **não** equivale a `certificado_integralmente`.

## 4. Qualidade, publicação e fechamento

1. **Abertura:** verificar `main`, HEAD/árvore/blobs, último CI por SHA (logs dos três jobs e ZIP), Pages HTTPS 200/hashes HTML+cinco scripts, worktree e status privado AUD03. Classificar cada risco `falha_reproduzida`, `risco`, `nao_testado` ou `melhoria_opcional`, com gravidade e reprodução.
2. **Regressões locais/CI:** Node 22 real S19 (26/26), S20 (41/41), S25–S27 e S29–S32; Chromium real S20–S24/S29–S32 e axe/contraste em cinco viewports, se disponível. Executor local S31/S32 não iniciou Chromium por falta de `chromium_headless_shell-1234`; `/usr/bin/chromium` abortou com `socket() failed: Operation not permitted (1)`. Explicitar limite, não transformar ausência em sucesso.
3. **Somente se houver defeito:** patch mínimo, teste pré/pós, caches apenas dos scripts alterados, teste Pages com versão correta e publicação segura (verificação do HEAD concorrente). Reabrir SHA/blob, CI **posterior ao patch** com jobs `integridade-node`, `navegador-chromium`, `pages-publicado`, logs, ZIP sintético, Pages HTTPS 200/hash/cache; um teste falho exige diagnóstico honesto, não reclassificação automática.
4. **Sem defeito:** checkpoint documental, sem patch para forçar CI. Auditoria privada em leitura novamente no fim, status jurídico por corte verificável e nenhuma cópia pública.
5. Criar `docs/CHECKPOINT_SPRINT33_...md` com todos os resultados/limites, SHA, cenários, cinco larguras, Android/backup real condicionais e status AUD03. Entregar **prompt integral Sprint 34 como handoff**, sem executar S34.

**Princípio:** uma sprint por execução; evidência antes da alteração; proteção do histórico, proveniência e rigor jurídico acima de expansão funcional, visual ou numérica. O roadmap de **Work Sites visual** permanece futuro e separado, sujeito a decisão de arquitetura/privacidade e autorização própria.
