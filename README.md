# AGU Quiz — Plataforma de Aprendizagem Adaptativa

Interface estática do AGU Quiz 1.4, preservada da evolução incremental do projeto de preparação para Advogado da União.

## Publicação no GitHub Pages

No GitHub, abra **Settings → Pages → Build and deployment → Deploy from a branch** e selecione **main / (root)**. O endereço público será `https://talksxb.github.io/agu-quiz/` somente depois que a implantação for concluída.

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
