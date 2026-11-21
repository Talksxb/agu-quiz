# AGU Quiz — Plataforma de Aprendizagem Adaptativa

Interface estática do AGU Quiz 1.4, preservada da evolução incremental do projeto de preparação para Advogado da União.

## Publicação no GitHub Pages

No GitHub, abra **Settings → Pages → Build and deployment → Deploy from a branch** e selecione **main / (root)**. O endereço público será `https://talksxb.github.io/agu-quiz/` somente depois que a implantação for concluída.

## Apostila · Leitura AGU

Em **Biblioteca Inteligente**, o cartão **Apostila · Leitura AGU** abre o [leitor de capítulos no Sites](https://leitura-agu-caderno-2026.aleixo-taw.chatgpt.site/). O capítulo experimental ADM-53 está disponível em [leitura direta](https://leitura-agu-caderno-2026.aleixo-taw.chatgpt.site/adm-53). Trata-se de conteúdo editorial público e autônomo: não exige login nem Azure, não consulta o repositório privado de auditoria e não transfere o progresso do Quiz entre domínios.

O conteúdo jurídico é atualizado no leitor; o Quiz mantém apenas o endereço público. O teste `tests/livro-sites-001-validacao.js` confere a presença do atalho e a ausência de referências a caminhos internos. Os testes de integridade de versões anteriores comparam um índice normalizado que exclui **somente** o acréscimo do cartão e de seu estilo (`tests/livro-sites-001-legado.cjs`); toda outra alteração histórica continua coberta pelos hashes originais.

## Laboratório de Leitura Jurídica (LEIT-META-002)

O cartão **Laboratório de Leitura Jurídica**, dentro da **Biblioteca Inteligente**, abre `laboratorio-leitura.html`. Há leitura integral e guiada por frases com pausa/retorno, três questões de recuperação objetiva por texto, resposta discursiva autoavaliada e histórico local de sessões.

O método não promete suprimir subvocalização nem mede domínio curricular automaticamente. Os dois casos são **autorais**, fundamentados pontualmente na LGPD (arts. 6º, 23, 26 e 27) e na Lei nº 9.784/1999 (art. 50), sujeitos à revisão editorial; não são questões oficiais e os IDs do piloto não integram a matriz curricular de 412 IDs.

A chave `agu_leitura_lab_v1` é exclusiva do laboratório e **não** modifica o banco/backup legados do Quiz. O histórico não sincroniza entre navegadores/aparelhos e não é vinculado ao Caderno AGU. Não armazena o conteúdo discursivo. O teste `tests/leitura-meta-001-validacao.js` e a jornada `tests/leitura-meta-002-browser.cjs` são invocados pela CI. O acesso no GitHub Pages depende de integração e deploy efetivos.

## Limites importantes

- O site é **público** e executa somente no navegador; **não há login nem sincronização com Google Sheets**.
- Questões da interface são **pedagógicas/autoriais**, não questões oficiais do Cebraspe.
- A matriz curricular real de 412 IDs só pode ser **importada localmente pelo usuário**, sem incluir o repositório privado neste site.
- A importação da matriz é **estrutural**, não certificação jurídica integral.
- Progresso, sessões, caderno e respostas permanecem no `localStorage` **deste endereço/navegador**; não aparecem automaticamente de outras origens. Faça backup em **Dados → Exportar backup JSON** antes de mudar de aparelho, navegador, limpar dados ou restaurar um backup.
- Respostas discursivas não recebem pontuação automática sem avaliação jurídica efetiva.
- **Não** coloque credenciais, material jurídico privado, planilha com respostas ou backups pessoais neste repositório.

## Próxima etapa

Conectar dados do Google Sheets somente via solução que proteja acesso e consentimento, sem expor chaves no navegador. Não divulgar conteúdo privado em GitHub Pages.

## Proveniência

Baseline `AGU_QUIZ_04_FEEDBACK_JURIDICO.html` (v1.4), copiada como `index.html` com remoção exclusiva do complemento de Apps Script que exige o ambiente do Google. Armazenamento legado preservado: `agu_quiz_mvp1_2026`.
