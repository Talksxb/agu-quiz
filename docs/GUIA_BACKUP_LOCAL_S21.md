# AGU Quiz — Como proteger seu histórico de estudo

**Orientação para uso no navegador (sem conta e sem sincronização).** Revisão preparada em 23/11/2026 (MÉTODO-AGU-003); disponível após integração/publicação desta etapa.

## Fazer uma cópia de segurança

1. Abra **Evolução → Dados e backup**.
   No Método AGU, use **Backup do percurso** para abrir diretamente essa mesma tela; “Retomar o Método AGU” retorna ao capítulo escolhido.
2. Na seção **Backup local completo**, toque em **Exportar cópia completa**.
3. Guarde o arquivo `AGU_Backup_Local_Completo.json` em local privado de sua escolha. Ele pode conter respostas pessoais, dificuldades, planejamento, notas e a matriz importada.
4. Faça novo backup periodicamente, especialmente **antes** de limpar os dados do navegador, trocar de telefone ou alterar o aplicativo.

A cópia reúne **até dez categorias** (nove históricas e o percurso opcional do Método AGU), somente as presentes. Inclui posição, marcações, preferências, rascunhos e históricos de edição dos livros. É um **arquivo JSON no seu dispositivo**: não é enviado automaticamente ao GitHub nem sincronizado com outra conta. O limite atual é de **12 MB de tamanho real do arquivo (bytes UTF-8)**, inclusive após a formatação; acentos e caracteres especiais também ocupam espaço.

Se aparecer o aviso **“excede 12 MB”**, a aplicação não baixará um backup completo que não poderia reimportar. **Não apague nem limpe o navegador.** Verifique primeiro os limites de exportação **e de importação** dos módulos específicos (podem ser menores que 12 MB) e mantenha os dados originais até ter uma cópia que você conseguiu restaurar em um perfil de teste isolado. Não divida nem edite o JSON manualmente como se essa operação já estivesse validada.

## Restaurar em navegador ou perfil novo

1. Abra o AGU Quiz no novo navegador, acesse **Evolução → Dados e backup → Restaurar categorias ausentes**.
2. Selecione o arquivo de backup salvo.
3. Leia o aviso/prévia e confirme. A importação **adiciona apenas categorias de armazenamento ainda inexistentes**. Se o arquivo contiver livros, a prévia permite optar por adicionar também capítulos ausentes dentro do percurso já existente; capítulos com o mesmo ID nunca são substituídos ou mesclados.
4. Recarregue a página. Confira suas tentativas, sessões, notas e planos antes de apagar qualquer cópia anterior.

**Importante:** se a categoria de Revisão Inteligente já tiver dados, o backup completo **não a substitui**, nem combina automaticamente históricos de dois dispositivos. Use os controles específicos de exportação e importação de **Revisão Inteligente**, **Caderno contextual**, **Sessões Integradas** ou **Planejamento**, conforme o caso. Em caso de conflito ou dúvida, preserve os arquivos originais e não apague o histórico local.

Um registro de outra edição é preservado como histórico; suas marcações e rascunhos não contam para a edição atual. Capítulos fora do catálogo são guardados sem produzir aprendizagem. Registros antigos sem edição identificada recebem aviso para conferir a posição. Mantenha arquivos concorrentes do mesmo capítulo: esta etapa não escolhe entre seus rascunhos. Feche outras abas de edição durante a restauração; não há trava entre abas.

O aplicativo atualizado aceita backups antigos sem livros. Uma versão antiga do aplicativo pode rejeitar arquivos com a categoria nova; confira a versão publicada antes de restaurar. O [contrato do percurso](METODO_AGU_003_BACKUP.md) detalha limites e recuperação de falhas.

## Proteções e limitações

- Arquivos com formato incompatível, categorias não autorizadas ou campos inválidos são rejeitados, sem substituir categorias existentes. O aplicativo tenta desfazer inserções novas se o navegador impedir uma gravação por falta de espaço.
- A opção de reset legado apaga **apenas** o histórico principal antigo, e não todo o armazenamento dos demais módulos.
- **Desinstalar o navegador, limpar os dados do site ou fazer reset do aparelho pode apagar o histórico local**. Um arquivo de backup externo é necessário para recuperar os dados.
- O backup não cria conta, não permite edição simultânea entre dispositivos e não fornece recuperação automática. **Não envie o JSON com registros pessoais em repositórios públicos ou chats públicos.**
- A confiabilidade da restauração depende também do espaço livre, do suporte a `localStorage` e da compatibilidade dos formatos; mantenha uma cópia extra anterior às mudanças.

**Glossário:** *backup completo* = restaura categorias ausentes; *importador de módulo* = adiciona registros novos dentro de uma categoria que já existe, de acordo com as regras daquele módulo; *sincronização* = não implementada.

