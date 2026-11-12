-- Linhas do catálogo de entregas para o protótipo do funil-01 (Postgres, no Supabase)
-- id: banco-catalogo-prototipo · versao 3 · rascunho · otavio: pendente
-- depende_de: banco-rascunho v4, banco-migracao-001 v1, quiz-01-pagina v3, landing-page-01-variante-a v3,
--             landing-page-01-variante-b v3, landing-page-02 v1, prototipo-funil-01 v6, decisoes v5
-- desatualizado: true (banco-rascunho e banco-migracao-001 continuam marcados; regra 11.1)
--
-- VERSÃO 3 (12/11/2026): acrescenta, sem apagar nem mudar nenhuma linha, a landing-page-02 versão 1: a página de
--   vendas que entrou no lugar das duas variantes da landing-page-01 no protótipo (/). Ela manda a visita com esse
--   par. A linha da landing-page-01 continua: as visitas de teste já gravadas apontam para ela.
--
-- VERSÃO 2 (etapa 34, 09/11/2026): acrescenta, sem apagar nem mudar a linha do quiz-01 versão 1, duas linhas:
--   quiz-01 versão 2: a página do quiz v3 manda versao_entrega 2 (fim do quiz mais restritivo, 14.2; caixa de aceite
--     única, 13.4; início do quiz e clique no fim, 18.4 e 18.5). A versão 1 continua no catálogo: os eventos de
--     teste já gravados apontam para ela.
--   landing-page-01 versão 1: a visita da landing (18.5; 10.15; pergunta 32.4). As duas variantes (/ e /b/) mandam o
--     mesmo par, landing-page-01 versão 1 (escolha provisória, pergunta 34.4 em prompts/11-fila-perguntas.md).
--   Sem estas linhas, a visita e o início do quiz voltam recusados pela chave estrangeira (23503) e o fim do quiz
--   da página nova volta "pacote recusado".
--
-- RASCUNHO. Nada daqui está no ar. Sem dado pessoal.
--
-- PARA QUE SERVE: o banco só aceita um evento se o par (entrega, versão) que a página manda
-- existir no catálogo public.entregas (chave estrangeira; dados/banco/esquema.sql, gaveta eventos;
-- planta 6.6; 18.8). A página do quiz-01 manda entrega 'quiz-01', versão 2 (ETIQUETAS, em
-- entregas/quizzes/quiz-01/pagina/index.html; a versão 1 era a da página v2), e a landing manda
-- 'landing-page-02', versão 1 (ETIQUETAS no programa do index.html; antes, a landing-page-01). Sem a linha
-- do quiz, todo envio volta "pacote recusado" (422) e o visitante vê o aviso de falha (23.10).
--
-- QUANDO RODAR: depois de esquema.sql, da migração 001 e de conferir.sql, antes de publicar as páginas
-- novas (roteiro da etapa 35). No banco do protótipo, que já tem a linha do quiz-01 versão 1, rodar de
-- novo só acrescenta as linhas que faltarem (na v3, a da landing-page-02).
--
-- COMO RODAR: colar este arquivo inteiro no editor SQL do Supabase (papel postgres, o padrão do
-- editor) e clicar em Run. Pode rodar de novo sem erro e sem duplicar: se a linha já existe,
-- nada muda (nem a data). No fim, o editor mostra as linhas do catálogo do protótipo, para conferir.
--
-- O QUE FAZ: grava só as quatro linhas abaixo, cada uma só se ainda não existir, e lê de volta só
-- essas linhas. Não apaga nem muda nenhuma linha. Não mexe em mais nada: nem em pessoas, nem em
-- eventos, nem em permissão.
--
-- O ensaio geral (nucleo/ferramentas/ensaio/, etapa 25) aplica este mesmo arquivo.
--
-- Protótipo de teste não é entrega: esta linha diz "publicada" porque o banco precisa dela para
-- o teste. Antes de ir ao ar com gente de verdade, decidir o que fazer com ela junto com a
-- limpeza dos dados de teste (#102; prompts/08-fila-perguntas.md, 25.2).

insert into public.entregas (id_entrega, versao, tipo_entrega, funil, caminho_no_repositorio, publicada_em)
values ('quiz-01', 1, 'quiz', 'funil-01', 'entregas/quizzes/quiz-01/pagina/', pg_catalog.now())
on conflict (id_entrega, versao) do nothing;

-- v2 (etapa 34): a versão nova do quiz e a landing
insert into public.entregas (id_entrega, versao, tipo_entrega, funil, caminho_no_repositorio, publicada_em)
values ('quiz-01', 2, 'quiz', 'funil-01', 'entregas/quizzes/quiz-01/pagina/', pg_catalog.now())
on conflict (id_entrega, versao) do nothing;

insert into public.entregas (id_entrega, versao, tipo_entrega, funil, caminho_no_repositorio, publicada_em)
values ('landing-page-01', 1, 'landing', 'funil-01', 'entregas/landings/landing-page-01/', pg_catalog.now())
on conflict (id_entrega, versao) do nothing;

-- v3 (12/11/2026): a página de vendas no lugar das duas variantes
insert into public.entregas (id_entrega, versao, tipo_entrega, funil, caminho_no_repositorio, publicada_em)
values ('landing-page-02', 1, 'landing', 'funil-01', 'entregas/landings/landing-page-02/', pg_catalog.now())
on conflict (id_entrega, versao) do nothing;

-- Conferência: devem aparecer exatamente quatro linhas, todas do funil-01, com publicada_em preenchida
-- e retirada_em vazia: landing-page-01 versão 1 e landing-page-02 versão 1 (landing), quiz-01 versão 1 e
-- quiz-01 versão 2 (quiz).
select id_entrega, versao, tipo_entrega, funil, caminho_no_repositorio, publicada_em, retirada_em
  from public.entregas
 where (id_entrega, versao) in (('quiz-01', 1), ('quiz-01', 2), ('landing-page-01', 1), ('landing-page-02', 1))
 order by id_entrega, versao;
