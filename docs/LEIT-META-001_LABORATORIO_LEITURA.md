# AGU Quiz | LEIT-META-001 — laboratório experimental de leitura jurídica
Data: 20/11/2026. Estado: **protótipo isolado em branch**, sem integração na navegação principal e sem deploy em produção.

## Missão
Exercitar a fluência na leitura jurídica sem sacrificar compreensão. A sessão implementa planejamento metacognitivo (problema, limite, providência), leitura, recuperação ativa e registro local da velocidade efetiva e de três itens objetivos.

## Origem e arquitetura
- Benchmark de produto: LetoReader (chunking, pacing e destaque), Blaze Reader (ritmo, frases e recordação) e MD Reader (leitura HTML/Markdown). **Nenhum código de terceiros foi transplantado.** Conferir licenças de terceiros caso se planeje importar código no futuro.
- Unidade standalone: `laboratorio-leitura.html`; HTML/CSS/JS puro, sem dependências, API, login nem backend.
- Dois casos exclusivamente **autorais**, não questões oficiais: `DIG-LGPD-01` e `ADM-MOT-01`. Identificadores **locais do protótipo**, não equivalem a IDs da matriz curricular oficial.
- Fontes jurídicas externas em links para o Planalto: LGPD arts. 6º, 23 e 26 e Lei 9.784/1999 art. 50. Checagem pontual da LGPD em 20/11/2026. Nenhuma certificação curricular ou jurisprudencial declarada.
- `localStorage`: somente `agu_leitura_lab_v1`, separado das chaves de produção. Armazena data, nome do caso, modo, velocidade e 0–3 acertos; não armazena o texto livre nem envia dados ao servidor. Até 30 sessões locais. Falhas de armazenamento são toleradas.

## Fluxo
1. Escolher texto e modo: integral (padrão) ou guiado por frases completas com ritmo configurável de 100–350 palavras/minuto. Linha de base informada voluntariamente na tela.
2. Ler com cronômetro efetivo; modo guiado permite pausar e voltar uma frase.
3. Concluir e responder três questões objetivas + uma resposta aberta não pontuada automaticamente.
4. Visualizar velocidade observada, acertos e eventual variação contra linha de base informada. Registrar histórico no navegador.

## Limites e decisões pedagógicas
- **Não** exigir eliminação da subvocalização; **não** prometer multiplicação de velocidade. Recuperação do sentido e identificação de exceções são mais importantes que velocidade isolada.
- Modo guiado não representa leitura de domínio. A segmentação automatizada ocorre por frases e não equivale à análise jurídica de cláusulas ou à garantia de compreensão.
- Regressões são permitidas; o usuário pode pausar.
- Em leitura integral, o tempo declarado começa no botão e termina em “Concluir”. Comparações entre textos de assuntos e extensões diferentes não justificam inferir causalidade.
- Três questões não medem domínio nem retenção de longo prazo. A resposta aberta demanda revisão humana ou socrática. Ler um texto não altera estado de aprendizagem no Caderno AGU.
- Nenhuma sincronização com projeto privado `Talksxb/agu-auditoria`, AGU Quiz legado, GPT Sites ou outros aparelhos.
- Em projeto público, só adicionar textos autorais e informações jurídicas de publicação autorizada. Não expor matrizes, transcrições ou evidências privadas.

## Verificação executada e pendências
- Consulta do GitHub `Talksxb/agu-quiz/main` no corte de 20/11/2026: `29b1e63ae97ccf2695bc964c95c0b5cb58b827d8`, versão LIVRO-SITES-001. O app anterior conserva Biblioteca Inteligente e link público para a Apostila.
- O arquivo novo foi recuperado do GitHub e o JavaScript embutido passou pela compilação sintática da engine V8, sem dependências externas e com seis itens objetivos no total.
- **Ainda não foram realizados** testes E2E em Chromium, Android físico, TalkBack/VoiceOver, comparação A/B ou auditoria jurídica integral dos textos.
- Não alterar `index.html` ou as chaves legadas neste piloto para evitar quebras dos guardas de integridade históricos.
- Antes de integrar em main: revisar juridicamente os dois casos, testar no celular, adicionar testes de navegação e persistência, executar CI completa, decidir integração pelo cartão na Biblioteca Inteligente. Após merge, URL candidata: `https://talksxb.github.io/agu-quiz/laboratorio-leitura.html`; **não afirmar publicação antes do merge/deploy efetivo**.

## Próxima iteração proposta
`LEIT-META-002-INT`: sob autorização independente, validar piloto no navegador, ajustar acessibilidade/UX e oferecer atalho contextual na Biblioteca Inteligente, mantendo backup e estado legado inalterados.

## Atualização — LEIT-META-002-INT (20/11/2026)
- O piloto tem cartão de entrada na Biblioteca Inteligente no mesmo commit de revisão. Os guardas de hash históricos foram ajustados **somente** para retirar os dois cartões editoriais na normalização, preservando o HTML anterior.
- A CI foi estendida: Node com teste do laboratório, Playwright + axe em 320, 390, 768 e 1280 px, simulação guiada e teste em URL publicada após merge.
- Melhoria de acessibilidade: foco programático no título de cada etapa, manutenção de pausa/retorno e prevenção de overflow horizontal; somente a CI executada pode confirmar estes comportamentos.
- Cotejo pontual: LGPD arts. 6º, 23, 26, §1º, e 27; Lei 9.784/1999 art. 50 e §1º. A exceção do art. 26, §1º, referente à execução descentralizada e finalidade específica foi explicitada. Sem declaração de certificação integral do corpus.
- Pendente até evidência independente: testes em Android físico e leitura por leitor de tela real. Tests Chromium/axe medem compatibilidade automatizada, não substituem esses dispositivos.
- Após aprovação de CI e revisão: retirar rascunho, integrar PR e verificar GitHub Pages antes de declarar publicação.
