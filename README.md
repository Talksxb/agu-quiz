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

## Livros integrais no Laboratório — LIVROS-LEIT-001

A **Biblioteca Inteligente** inclui o cartão **Livros · Leitura guiada AGU**, apontando para `livros-agu.html`. O Laboratório de Leitura Jurídica existente também oferece atalho. O leitor usa o mesmo princípio de cronômetro, ritmo ajustável e acompanhamento local, mas preserva os capítulos por páginas/seções: leitura contínua não é interrompida por questões; leitura guiada é opcional e usa blocos de sentido.

Capítulos existentes, incorporados a partir dos originais editoriais do projeto:
- `livros/lgpd-adm64b.json` — LIVRO-DIG-001, LGPD aplicada à Administração Pública, edição 2.0, 24 páginas de texto extraído do PDF (corte editorial 20/11/2026; auditoria histórica 04/11/2026);
- `livros/adm-53.json` — LIVRO-PIL-001, Responsabilidade patrimonial do Estado, edição 1.0, 20 páginas de texto extraído do PDF (18/11/2026);
- `livros/adm-54.json` — LIVRO-ADM-002, Agentes públicos, edição 1.0, 17 seções, fonte Markdown preservada (18/11/2026).


**AMB-11 publicado:** `LIVRO-AMB-008 — Crimes contra o meio ambiente` (23 seções, edição pública 1.1 de 25/11/2026) foi integrado ao Método AGU com fonte `livros/fontes/amb-11.md`, leitor `livros/amb-11.json` e metadados `livros/metodo/amb-11.json`. Base original de 22/11/2026 (SHA-256 e431ccbf1def7175d0bbee965b85d56d21801911546d1c9be972fa29d6856daa); apenas detalhes do repositório privado de auditoria foram redigidos na edição pública. Fontes jurídicas da obra não foram revalidadas integralmente nesta transposição; publicação não significa certificação curricular, domínio ou promoção automática de questões oficiais e cartões inéditos.

**Direito Ambiental — AMB-03 disponível:** o capítulo autoral `LIVRO-AMB-001 — Competências e Cooperação Ambiental` (20/11/2026) foi integrado em `livros/amb-03.json` com 17 seções textuais e link para a edição original `livros/livro-amb-001-original.html`, preservada com diagramas SVG, tabelas e referências. **Escopo delimitado ao AMB-03; não representa conclusão de AMB-01 a AMB-11 ou certificação integral.** A transposição para blocos não replica toda a diagramação; consulte a edição original para diagramas. A integração é técnica, sem revisão de mérito jurídico adicional.

Os textos extraídos de PDF podem perder diagramação e gráficos; as palavras e páginas de texto foram preservadas no dataset de leitura, e o documento de origem é a referência de fidelidade editorial. Os textos são autorais, não um pacote de leis integrais ou de peças confidenciais do repositório privado. A publicação GitHub Pages é pública. Cada obra registra no próprio texto sua proveniência, lacunas e verificação pontual, sem alegar certificação integral.

O progresso fica exclusivamente no `localStorage` **deste navegador/domínio**, em chave própria `agu_livros_reader_v1` (página atual, páginas concluídas e horário de atualização). O campo de recuperação livre não é salvo. O registro de leitura não representa domínio, pontuação de concurso, sincronização entre dispositivos, nem integração automática com o Caderno AGU ou a matriz oficial. Testes: `tests/livros-leit-001-validacao.js`, `tests/livros-leit-001-browser.cjs`.

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
