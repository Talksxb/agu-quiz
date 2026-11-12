# AGU Quiz — Sprint 13 | Leitor Jurídico Interativo
**Data:** 2026-11-12
**Estado:** implementado e enviado à branch padrão do repositório público; 24/24 verificações automatizadas locais aprovadas; validação visual em Android/desktop físico e deploy efetivo do GitHub Pages não aferidos.

## Estado lido
- AGU Quiz: `index.html`, `revisao-inteligente.js`, `planejamento-semanal.js`, checkpoint `docs/CHECKPOINT_SPRINT12_AUD03_2026-11-12.md`.
- Auditoria: `docs/PROTOCOLO.md`, `checkpoints/estado.json` (último checkpoint geral **AUD03-005**, auditoria **parcial não certificada**), `checkpoints/AUD03-003.json`, matriz `data/AGU_MATRIZ_CURRICULAR_2022_v3.json` (412 IDs / 14 disciplinas, SHA `0952205a07818cda0a9ccca6dacdf340afcc6db8`).
- Evidências de suporte preexistentes: NORM-CON-017 (CON-50; advocacia da União), NORM-ADM-002 (ADM-06; competência), e mapeamento curricular confirmado CON-51 para advocacia pública estadual/distrital. A auditoria 03 atualizada possui lotes mais recentes; **não foram copiados ao repositório público**.

## Entregas
1. `dados/legislacao-s13.js`: corpus jurídico público isolado, com 2 normas, 7 artigos e 18 unidades selecionáveis. **Texto completo apenas dos artigos no escopo**, não da legislação inteira.
   - CF/1988, arts. 131 e 132, incluindo §§1º–3º e parágrafo único, respectivamente. Fonte: https://www2.camara.leg.br/legin/fed/consti/1988/constituicao-1988-5-outubro-1988-322142-normaatualizada-pl.html
   - Lei 9.784/1999, arts. 11–15, incluindo parágrafos e incisos. Fonte: https://www2.camara.leg.br/legin/fed/lei/1999/lei-9784-29-janeiro-1999-322239-normaatualizada-pl.html
   - Metadados: norma, seção, identificador estável `CF88:art131:p3`, `L9784:art13:II`, tópico curricular, data de consulta e URL da fonte oficial.
2. `leitor-juridico.js`: interface desktop em três colunas (índice da legislação; texto; contexto), navegação artigo anterior/próximo, seleção por subdivisão, filtro de artigos, responsividade mobile via botões Índice/Texto legal/Relacionados.
3. Abas de contexto: Jurisprudência, Questões, Caderno, Flashcards, Comentários. **Não inventa** jurisprudência, questão ou anotação pessoal. A aba flashcards mostra apenas relação **por tópico curricular** dos cartões públicos já publicados, rotulada como temática — não precedente ou questão indexado ao parágrafo. Jurisprudência e questões por dispositivo são objeto da Sprint 14; Caderno contextual é objeto da Sprint 15.
4. Estado local isolado em `agu_leitor_juridico_s13_v1`, com artigo selecionado, unidade, aba e comentários pessoais **por ID de subdivisão**. Exportação dos comentários em JSON; sem sincronização, login ou importação de notas nesta sprint.
5. `index.html`: novo botão `§ Leitor Jurídico` e registro da rota interna `legal`, carregamento do corpus antes do leitor, sem alterar histórico ou os módulos de estudo.

## Qualidade
- Testes por execução de JS em contexto simulado: 24/24.
- Incluem sintaxe dos scripts, contagem e unicidade operacional 7 artigos/18 unidades, carregamento em ordem, navegação por cláusula, visualização art. 13 completo, renderização de três painéis, indicação das fontes, ausência de precedentes inventados, estado persistido após reinicialização, e chaves legadas `agu_quiz_mvp1_2026`, `agu_quiz_revisao_inteligente_v1`, `agu_quiz_planejamento_semanal_v1` mantidas.
- Não foram feitos testes real-device, auditoria de acessibilidade por leitor de tela, E2E visual nem verificação do GitHub Pages através de um navegador.
- Verificação jurídico-documental foi **pontual**, a partir do texto publicado nas páginas oficiais da Câmara; vigência e jurisprudência **integrais** não foram certificadas.

## Decisões arquiteturais
- Acervo de leis isolado do módulo de UI; próximo lote de legislação pode expandir `root.AGU_LEGAL_CORPUS.laws` ou ser integrado por índice adicional.
- Relacionamentos por dispositivos sempre devem usar ID granular, e conter fonte, status, data, localizador e origin/proveniência. Não publicar evidência privada bruta.
- Não tratar categoria por tópico `ADM-06` como prova de relação com inciso específico.
- Anotações pessoais não são fundamento normativo nem migram automaticamente para o Caderno.
- Nenhum resultado da Auditoria 03 foi promovido a certificado.

## Pendências
1. Verificar publicação do GitHub Pages e UI real no Android (índice, seleção, layout, notas, retorno após fechar/reabrir) e desktop.
2. Implementar índice confiável de evidências jurídicas por dispositivo com deduplicação de links e superveniências.
3. Exibir jurisprudência e questões apenas após validação de fonte primária, localizador, gabarito e pertinência exata ao artigo/parágrafo/inciso. Não confundir Advogado da União com Procurador Federal.
4. Criar importação segura de comentários ou backup geral integrado em sprint posterior.
5. Expandir progressivamente normas estruturadas, sem chamar trecho incompleto de texto integral.

## Handoff — Sprint 14
Objetivo: criar camada pública derivada de vínculos auditáveis entre IDs granulares do Leitor Jurídico e evidências existentes (normas, jurisprudência, questões), com status e procedência explícitos; preservar a privacidade do repositório de auditoria e não publicar fontes brutas.
Consultar `checkpoints/estado.json` (mais recente que AUD03-003) e evidências individuais; restringir primeiro a CF131–132 e L9784 11–15, validar casos de vínculo específico e registrar pendências quando a evidência só permitir associação por tópico. Não alterar o corpus sem necessidade e não iniciar a Sprint 15.
