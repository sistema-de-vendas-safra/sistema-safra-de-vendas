-- Limpeza dos leads de teste do protótipo do funil-01 (Postgres, no Supabase)
-- id: banco-limpar-leads-de-teste · versao 2 · rascunho · otavio: pendente
-- depende_de: banco-rascunho v5, decisoes v10, regra-seguranca v3
-- desatualizado: true (banco-rascunho continua marcado por cadeia; regra 11.1)
--
-- O QUE FAZ: apaga do banco SÓ os leads de teste (#102) e os eventos ligados a eles. Lead de teste
-- é a pessoa que tem as DUAS marcas juntas: o nome começando por TESTE (sem diferenciar maiúsculas)
-- E o e-mail terminado em @teste.invalid. Quem tem só uma das duas não é apagado. Os eventos sem
-- pessoa (visitas e inícios do quiz de quem não terminou o quiz, que não têm dado pessoal) ficam.
-- Nenhuma tabela, coluna, função, permissão ou outra linha muda. Pedido do Otávio de 15/11/2026
-- (limpar a planilha e o banco; log.md, entrada de 15/11/2026, "planilha do SDR v3").
--
-- VERSÃO 2 (pedido 24, item 5, 25/11/2026): sai também a linha real do Otávio de 09/11/2026, que não
-- tem as duas marcas, junto com os eventos dela. Ela é achada só pelo código que o banco deu a ela
-- (id_pessoa f794c36d-7116-4ab3-aec3-54a147de97bc, passado pelo Otávio no pedido), nunca por nome,
-- e-mail ou telefone. Trava a mais: se esse código existir e a pessoa não tiver sido criada em
-- 09/11/2026 (horário de Brasília), a limpeza para no passo 0 e nada é apagado (código errado).
-- Se o código não existir (a linha já saiu), a limpeza segue só com os leads de teste.
-- O código é um identificador interno do banco, sem nome, e-mail ou telefone (regra-seguranca 4).
--
-- QUEM RODA E ONDE: o Otávio, no SQL Editor do Supabase (projeto sistema-de-vendas-safra, papel
-- postgres, o padrão do editor), colando este arquivo inteiro e clicando em Run, depois do teste de
-- ponta a ponta. Roteiro: entregas/prototipo-funil-01/APLICAR-24.md, passo da limpeza (v2), que
-- conta também as duas abas da planilha (fila e respostas), antes e depois.
--
-- NÃO DÁ PARA DESFAZER. Depois do commit, as linhas apagadas não voltam (o plano grátis do
-- Supabase não tem volta no tempo). Por isso o arquivo inteiro roda numa transação só e confere
-- tudo antes do commit: se alguma conferência falhar, dá erro e nada é apagado.
--
-- COMO FUNCIONA, NA ORDEM:
--   0. confere que o banco é o do funil-01 (as tabelas e a trava dos eventos existem) e, se a linha
--      de 09/11 ainda existir, que ela foi criada em 09/11/2026 (v2);
--   1. guarda quem vai sair e conta (pessoas de teste, eventos delas, e o que fica) e mostra as
--      contagens, sem nome, e-mail ou telefone;
--   2. desliga a trava dos eventos (que não deixa apagar evento; esquema.sql, "eventos_sem_mudanca")
--      só dentro desta transação, apaga os eventos das pessoas de teste e depois as pessoas (o
--      evento aponta para a pessoa: a pessoa só sai depois dos eventos dela) e liga a trava de novo;
--   3. confere: nenhuma pessoa de teste sobrou, nenhum evento delas sobrou, as outras pessoas, os
--      eventos delas e os eventos sem pessoa ficaram com o mesmo número, e a trava está ligada.
--      Se algo não bater, dá erro e a transação inteira volta atrás;
--   4. mostra a tabela do fim (antes, depois e ok de cada linha) e faz o commit.
-- O SQL Editor mostra só o resultado da última consulta: é a tabela do passo 4, que traz também as
-- contagens de antes. Para ver as contagens antes de apagar, o roteiro tem uma consulta só de
-- leitura (APLICAR-24.md, passo da limpeza; antes, APLICAR-PLANILHA-V3.md, passo 1.1).
--
-- Pode rodar de novo: na segunda vez, não acha ninguém, não apaga nada e mostra zero.
-- A trava fica desligada só dentro da transação, por um instante: a tabela eventos fica parada
-- até o commit (rodar numa hora sem teste em curso).
--
-- RASCUNHO. Sem dado pessoal: o arquivo não tem nome, e-mail ou telefone de ninguém, só as duas
-- marcas do #102 e, desde a v2, o código interno da linha de 09/11. Conferido só no PGlite
-- (dados/banco/testar-migracao.mjs, seção 7).

begin;


-- ··························································································
-- 0. O banco é o do funil-01
-- ··························································································
do $$
begin
  if pg_catalog.to_regclass('public.eventos') is null or pg_catalog.to_regclass('public.pessoas') is null then
    raise exception 'tabelas pessoas e eventos não encontradas: este não é o banco do funil-01';
  end if;
  if not exists (select 1 from pg_catalog.pg_trigger t
                  where t.tgrelid = 'public.eventos'::regclass and t.tgname = 'eventos_sem_mudanca'
                    and t.tgenabled = 'O') then
    raise exception 'a trava eventos_sem_mudanca não está ligada: pare e traga ao repositório';
  end if;
  -- v2: a linha real de 09/11, se ainda existir, tem de ter sido criada em 09/11/2026 (horário de Brasília)
  if exists (select 1 from public.pessoas pe
              where pe.id_pessoa = 'f794c36d-7116-4ab3-aec3-54a147de97bc'::uuid
                and (pe.criado_em at time zone 'America/Sao_Paulo')::date <> date '2026-11-09') then
    raise exception 'a pessoa com o código da linha de 09/11 não foi criada em 09/11/2026: código errado, nada foi apagado';
  end if;
end;
$$;


-- ··························································································
-- 1. Quem vai sair e as contagens de antes (só números)
-- As duas marcas juntas (#102): nome começando por TESTE, sem diferenciar maiúsculas, E e-mail
-- terminado em @teste.invalid, também sem diferenciar maiúsculas. Desde a v2, também a linha real de
-- 09/11/2026, pelo código dela (só ela, se ainda existir).
-- ··························································································
create temporary table limpeza_alvo on commit drop as
  select pe.id_pessoa, (pe.id_pessoa = 'f794c36d-7116-4ab3-aec3-54a147de97bc'::uuid) as linha_de_09_11
    from public.pessoas pe
   where (pe.nome ilike 'TESTE%'
          and pg_catalog.lower(pe.email) like '%@teste.invalid')
      or pe.id_pessoa = 'f794c36d-7116-4ab3-aec3-54a147de97bc'::uuid;

create temporary table limpeza_antes on commit drop as
  select
    (select pg_catalog.count(*) from limpeza_alvo where not linha_de_09_11)                  as pessoas_de_teste,
    (select pg_catalog.count(*) from limpeza_alvo where linha_de_09_11)                      as linha_de_09_11,
    (select pg_catalog.count(*) from public.eventos ev
      where ev.id_pessoa in (select a.id_pessoa from limpeza_alvo a))                        as eventos_de_teste,
    (select pg_catalog.count(*) from public.pessoas pe
      where pe.id_pessoa not in (select a.id_pessoa from limpeza_alvo a))                    as outras_pessoas,
    (select pg_catalog.count(*) from public.eventos ev
      where ev.id_pessoa is not null
        and ev.id_pessoa not in (select a.id_pessoa from limpeza_alvo a))                    as eventos_de_outras,
    (select pg_catalog.count(*) from public.eventos ev where ev.id_pessoa is null)           as eventos_sem_pessoa;

-- As contagens do que vai sair e do que fica (aparece sozinha só se esta parte for rodada sem o resto)
select pessoas_de_teste + linha_de_09_11 as pessoas_que_vao_sair, eventos_de_teste as eventos_que_vao_sair,
       outras_pessoas as pessoas_que_ficam, eventos_de_outras + eventos_sem_pessoa as eventos_que_ficam
  from limpeza_antes;


-- ··························································································
-- 2. Apagar: os eventos das pessoas de teste e depois as pessoas
-- A trava (eventos_sem_mudanca) recusa apagar evento; ela é desligada só aqui, dentro da
-- transação, e ligada de novo logo depois dos dois deletes.
-- ··························································································
alter table public.eventos disable trigger eventos_sem_mudanca;

delete from public.eventos ev
 where ev.id_pessoa in (select a.id_pessoa from limpeza_alvo a);

delete from public.pessoas pe
 where pe.id_pessoa in (select a.id_pessoa from limpeza_alvo a);

alter table public.eventos enable trigger eventos_sem_mudanca;


-- ··························································································
-- 3. Conferir antes do commit: se algo não bater, erro e nada é apagado
-- ··························································································
do $$
declare
  a record;
begin
  select * into a from limpeza_antes;
  if exists (select 1 from public.pessoas pe
              where pe.nome ilike 'TESTE%' and pg_catalog.lower(pe.email) like '%@teste.invalid') then
    raise exception 'sobrou pessoa de teste: nada foi apagado';
  end if;
  if exists (select 1 from public.pessoas pe where pe.id_pessoa = 'f794c36d-7116-4ab3-aec3-54a147de97bc'::uuid) then
    raise exception 'sobrou a linha de 09/11: nada foi apagado';
  end if;
  if exists (select 1 from public.eventos ev where ev.id_pessoa in (select x.id_pessoa from limpeza_alvo x)) then
    raise exception 'sobrou evento de pessoa de teste: nada foi apagado';
  end if;
  if (select pg_catalog.count(*) from public.pessoas) <> a.outras_pessoas then
    raise exception 'o número das outras pessoas mudou: nada foi apagado';
  end if;
  if (select pg_catalog.count(*) from public.eventos ev where ev.id_pessoa is not null) <> a.eventos_de_outras then
    raise exception 'o número dos eventos das outras pessoas mudou: nada foi apagado';
  end if;
  if (select pg_catalog.count(*) from public.eventos ev where ev.id_pessoa is null) <> a.eventos_sem_pessoa then
    raise exception 'o número dos eventos sem pessoa mudou: nada foi apagado';
  end if;
  if not exists (select 1 from pg_catalog.pg_trigger t
                  where t.tgrelid = 'public.eventos'::regclass and t.tgname = 'eventos_sem_mudanca'
                    and t.tgenabled = 'O') then
    raise exception 'a trava eventos_sem_mudanca não voltou a ficar ligada: nada foi apagado';
  end if;
end;
$$;


-- ··························································································
-- 4. A tabela do fim: o que tinha antes, o que tem depois e se está certo (só números; 7 linhas desde a v2)
-- ··························································································
select n, conferencia, antes, depois, ok
  from (
    select 1 as n, 'pessoas de teste (as duas marcas do #102)' as conferencia,
           a.pessoas_de_teste::text as antes,
           (select pg_catalog.count(*) from public.pessoas pe
             where pe.nome ilike 'TESTE%' and pg_catalog.lower(pe.email) like '%@teste.invalid')::text as depois,
           not exists (select 1 from public.pessoas pe
                        where pe.nome ilike 'TESTE%' and pg_catalog.lower(pe.email) like '%@teste.invalid') as ok
      from limpeza_antes a
    union all
    select 2, 'a linha real do Otávio de 09/11/2026 (pelo código dela)', a.linha_de_09_11::text,
           (select pg_catalog.count(*) from public.pessoas pe where pe.id_pessoa = 'f794c36d-7116-4ab3-aec3-54a147de97bc'::uuid)::text,
           not exists (select 1 from public.pessoas pe where pe.id_pessoa = 'f794c36d-7116-4ab3-aec3-54a147de97bc'::uuid)
      from limpeza_antes a
    union all
    select 3, 'eventos das pessoas que saíram (as de teste e a de 09/11)', a.eventos_de_teste::text,
           (select pg_catalog.count(*) from public.eventos ev where ev.id_pessoa in (select x.id_pessoa from limpeza_alvo x))::text,
           not exists (select 1 from public.eventos ev where ev.id_pessoa in (select x.id_pessoa from limpeza_alvo x))
      from limpeza_antes a
    union all
    select 4, 'outras pessoas (ficam)', a.outras_pessoas::text,
           (select pg_catalog.count(*) from public.pessoas)::text,
           (select pg_catalog.count(*) from public.pessoas) = a.outras_pessoas
      from limpeza_antes a
    union all
    select 5, 'eventos das outras pessoas (ficam)', a.eventos_de_outras::text,
           (select pg_catalog.count(*) from public.eventos ev where ev.id_pessoa is not null)::text,
           (select pg_catalog.count(*) from public.eventos ev where ev.id_pessoa is not null) = a.eventos_de_outras
      from limpeza_antes a
    union all
    select 6, 'eventos sem pessoa: visitas e inícios do quiz (ficam)', a.eventos_sem_pessoa::text,
           (select pg_catalog.count(*) from public.eventos ev where ev.id_pessoa is null)::text,
           (select pg_catalog.count(*) from public.eventos ev where ev.id_pessoa is null) = a.eventos_sem_pessoa
      from limpeza_antes a
    union all
    select 7, 'trava dos eventos ligada', 'ligada',
           case when exists (select 1 from pg_catalog.pg_trigger t
                              where t.tgrelid = 'public.eventos'::regclass and t.tgname = 'eventos_sem_mudanca'
                                and t.tgenabled = 'O') then 'ligada' else 'desligada' end,
           exists (select 1 from pg_catalog.pg_trigger t
                    where t.tgrelid = 'public.eventos'::regclass and t.tgname = 'eventos_sem_mudanca'
                      and t.tgenabled = 'O')
  ) conferencias
 order by n;

commit;
