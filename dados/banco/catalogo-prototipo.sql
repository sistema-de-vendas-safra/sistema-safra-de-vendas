-- Linha do catálogo de entregas para o protótipo do funil-01 (Postgres, no Supabase)
-- id: banco-catalogo-prototipo · versao 1 · rascunho · otavio: pendente
-- depende_de: banco-rascunho v2, quiz-01-pagina v2, prototipo-funil-01 v1, decisoes v4
--
-- RASCUNHO. Nada daqui está no ar. Sem dado pessoal.
--
-- PARA QUE SERVE: o banco só aceita o fim do quiz se o par (entrega, versão) que a página manda
-- existir no catálogo public.entregas (chave estrangeira; dados/banco/esquema.sql, gaveta eventos;
-- planta 6.6; 18.8). A página do quiz-01 manda entrega 'quiz-01', versão 1 (ETIQUETAS, em
-- entregas/quizzes/quiz-01/pagina/index.html). Sem esta linha, todo envio do quiz volta
-- "pacote recusado" (422) e o visitante vê o aviso de falha (prompts/08-fila-perguntas.md, 23.10).
--
-- QUANDO RODAR: uma vez, depois de esquema.sql e de conferir.sql, antes do teste com o lead de
-- mentira (roteiro da etapa 26, entregas/prototipo-funil-01/LIGAR.md).
--
-- COMO RODAR: colar este arquivo inteiro no editor SQL do Supabase (papel postgres, o padrão do
-- editor) e clicar em Run. Pode rodar de novo sem erro e sem duplicar: se a linha já existe,
-- nada muda (nem a data). No fim, o editor mostra a linha do catálogo, para conferir.
--
-- O QUE FAZ: grava só uma linha, a do quiz-01 versão 1, e lê de volta só essa linha. Não mexe
-- em mais nada: nem em pessoas, nem em eventos, nem em permissão.
--
-- O ensaio geral (nucleo/ferramentas/ensaio/, etapa 25) aplica este mesmo arquivo.
--
-- Protótipo de teste não é entrega: esta linha diz "publicada" porque o banco precisa dela para
-- o teste. Antes de ir ao ar com gente de verdade, decidir o que fazer com ela junto com a
-- limpeza dos dados de teste (#102; prompts/08-fila-perguntas.md, 25.2).

insert into public.entregas (id_entrega, versao, tipo_entrega, funil, caminho_no_repositorio, publicada_em)
values ('quiz-01', 1, 'quiz', 'funil-01', 'entregas/quizzes/quiz-01/pagina/', pg_catalog.now())
on conflict (id_entrega, versao) do nothing;

-- Conferência: deve aparecer exatamente uma linha, quiz-01, versão 1, quiz, funil-01,
-- com publicada_em preenchida e retirada_em vazia.
select id_entrega, versao, tipo_entrega, funil, caminho_no_repositorio, publicada_em, retirada_em
  from public.entregas
 where id_entrega = 'quiz-01' and versao = 1;
