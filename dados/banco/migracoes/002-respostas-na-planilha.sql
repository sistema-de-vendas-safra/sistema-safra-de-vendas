-- Migração 002 · as respostas completas do quiz na função da planilha do SDR (Postgres, no Supabase)
-- id: banco-migracao-002 · versao 1 · rascunho · otavio: pendente
-- depende_de: banco-migracao-001 v1, banco-rascunho v5, funil-01-planilha-sdr v3, regra-seguranca v3
-- desatualizado: true (funil-01-planilha-sdr continua marcada por cadeia, e banco-migracao-001 e banco-rascunho também; regra 11.1)
--
-- RASCUNHO. Nada daqui está no ar. Sem dado pessoal. Ver dados/banco/README.md.
-- Destino dos contatos em conflito (conflito-17, em base/lacunas.md): segue o lado 2 (banco e
-- planilha da #90), como o esquema v2 e a migração 001. Bloqueado para entrega até a decisão.
--
-- PARA QUE SERVE: o pedido do Otávio de 15/11/2026 ("A planilha deve ter duas abas, a primeira
-- resumida, como é a fila hoje, e outra aba com as respostas completas"). A planilha do SDR v3
-- (entregas/planilha-sdr-funil-01/) ganha a aba "respostas", e para isso a função da planilha
-- passa a devolver as respostas completas do quiz:
--   · leads_para_planilha devolve tudo o que a versão da 001 devolve, na mesma ordem, e mais uma
--     coluna no fim, respostas (jsonb): as respostas completas do PRIMEIRO fim de quiz da pessoa
--     em faixa a ou b, o mesmo evento que a função já usa para a nota, a faixa e entrou_em;
--   · as fechaduras de novo, iguais às da 001 (#99, #100).
-- O que NÃO muda: quem entra (faixas a e b, aceite do WhatsApp, consentimento não retirado), uma
-- vez por pessoa, o cursor, a margem de 1 minuto, o teto de 200, respostas_a_confirmar da faixa b
-- e o clique; nenhuma tabela, coluna ou linha; registrar_fim_quiz, registrar_evento, a trava dos
-- eventos, os índices e as visões.
--
-- QUANDO RODAR: depois da migração 001 (dados/banco/migracoes/001-v3.sql), que já rodou no projeto
-- sistema-de-vendas-safra em 09/11/2026 (APLICAR-11, parte 2). Depois desta, rodar
-- dados/banco/conferir.sql (dados/banco/README.md, "Como aplicar"). Se esquema.sql ou a 001 forem
-- rodados de novo um dia, rodar esta logo depois: os dois refazem a função da planilha sem a
-- coluna respostas.
--
-- COMO RODAR: colar este arquivo inteiro no editor SQL do Supabase (papel postgres, o padrão do
-- editor) e clicar em Run. Roda tudo numa transação só (begin ... commit): se qualquer passo
-- falhar, nada muda. Pode rodar de novo sem erro e dá o mesmo resultado.
--
-- SEGURO COM OS DADOS QUE JÁ EXISTEM: esta migração só troca uma função, que não guarda dado, e
-- refaz as permissões. Não tem DELETE, UPDATE, TRUNCATE nem DROP de tabela ou coluna.
--
-- O GARÇOM NÃO MUDA: a porta privada repassa os leads como vêm do banco. A planilha v2 (Codigo.gs
-- de antes) ignora a coluna nova; a v3 escreve a aba respostas com ela. A planilha v3 com o banco
-- ainda sem esta migração escreve a aba respostas com as colunas das respostas vazias.

begin;


-- ··························································································
-- 0. O esquema v2 e a migração 001 precisam estar no banco
-- ··························································································
do $$
begin
  if pg_catalog.to_regclass('public.eventos') is null
     or pg_catalog.to_regclass('public.pessoas') is null
     or pg_catalog.to_regprocedure('public.registrar_fim_quiz(jsonb)') is null then
    raise exception 'esquema v2 não encontrado: rode antes dados/banco/esquema.sql';
  end if;
  if pg_catalog.to_regprocedure('public.registrar_evento(jsonb)') is null
     or not exists (select 1 from pg_catalog.pg_attribute a
                     where a.attrelid = 'public.eventos'::regclass and a.attname = 'clique_fim_quiz'
                       and not a.attisdropped) then
    raise exception 'migração 001 não encontrada: rode antes dados/banco/migracoes/001-v3.sql';
  end if;
end;
$$;


-- ··························································································
-- 1. Leads para a planilha do SDR · porta privada do garçom (#100), versão 4
-- Igual à versão 3, da migração 001 (quem entra, uma vez por pessoa, cursor, margem de 1 minuto,
-- até 200, respostas_a_confirmar da faixa b, o último clique), com uma coluna a mais, no fim:
--   · respostas: as respostas completas do quiz, como a página mandou (o objeto respostas do
--     pacote do fim do quiz; entregas/quizzes/quiz-01/pagina/index.html, respostasDoQuiz), do
--     primeiro fim de quiz da pessoa em faixa a ou b. Quem refaz o quiz não muda a linha (21.5).
-- A coluna fica no fim para quem já lê as 17 de antes continuar lendo igual (a planilha v2 ignora
-- o que não conhece). A lista de colunas muda, por isso a função é tirada e criada de novo (não há
-- dado nela).
-- ··························································································
drop function if exists public.leads_para_planilha(timestamptz, uuid, integer);
create function public.leads_para_planilha(
  apos_gravado_em  timestamptz default null,
  apos_id_pessoa   uuid        default null,
  quantos          integer     default 200
)
returns table (
  id_pessoa               uuid,
  nome                    text,
  telefone                text,
  email                   text,
  empresa                 text,
  consentimento_whatsapp  text,
  consentimento_email     text,
  lead_score_faixa        text,
  lead_score_nota         integer,
  respostas_a_confirmar   jsonb,
  entrou_em               timestamptz,
  tentativas_feitas       integer,
  clique_fim_quiz         text,
  estagio                 text,
  estado                  text,
  data_volta              date,
  cursor_gravado_em       timestamptz,
  respostas               jsonb
)
language plpgsql
stable
security definer
set search_path = ''
as $$
#variable_conflict use_column
declare
  v_limite integer := least(greatest(coalesce(quantos, 200), 1), 200);
begin
  -- o cursor vem inteiro ou não vem
  if (apos_gravado_em is null) <> (apos_id_pessoa is null) then
    raise exception 'cursor incompleto: mande gravado_em e id_pessoa juntos, ou nenhum dos dois'
      using errcode = '22023';
  end if;

  return query
  with entrada as (
    -- o primeiro fim de quiz de cada pessoa em faixa a ou b
    select distinct on (ev.id_pessoa)
           ev.id_pessoa, ev.gravado_em,
           ev.lead_score_faixa, ev.lead_score_nota, ev.respostas
      from public.eventos ev
     where ev.tipo = 'fim_quiz'
       and ev.lead_score_faixa in ('a', 'b')
     order by ev.id_pessoa, ev.gravado_em, ev.id_evento
  )
  select
    pe.id_pessoa,
    pe.nome,
    pe.telefone,
    pe.email,
    pe.empresa,
    pe.consentimento_whatsapp,
    pe.consentimento_email,
    en.lead_score_faixa,
    en.lead_score_nota,
    -- só na faixa b, e só o que tem pergunta no quiz: valor da venda, vendedores (time) e o
    -- histórico, leads por mês e CRM (15.4)
    case when en.lead_score_faixa = 'b' then
      pg_catalog.jsonb_strip_nulls(pg_catalog.jsonb_build_object(
        'valor-medio',   en.respostas -> 'valor-medio',
        'vendedores',    en.respostas -> 'vendedores',
        'leads-por-mes', (select n -> 'valor'
                            from pg_catalog.jsonb_array_elements(
                                   case when pg_catalog.jsonb_typeof(en.respostas -> 'numeros') = 'array'
                                        then en.respostas -> 'numeros' else '[]'::jsonb end) n
                           where n ->> 'linha' = 'Leads por mês'
                           limit 1),
        'crm',           en.respostas -> 'crm'))
    end,
    en.gravado_em,                                       -- entrou_em: relógio do servidor (15.3; 21.7; 21.16)
    (select pg_catalog.count(*)::integer
       from public.eventos c
      where c.id_pessoa = pe.id_pessoa and c.tipo = 'contato_sdr'),   -- tentativas_feitas (15.3; 21.7)
    -- o último clique da pessoa no fim do quiz (18.4)
    (select k.clique_fim_quiz from public.eventos k
      where k.id_pessoa = pe.id_pessoa and k.tipo = 'interesse_pos_relatorio'
      order by k.ocorrido_em desc, k.gravado_em desc, k.id_evento desc limit 1),
    -- estágio, estado e data_volta atuais: o último valor preenchido nos eventos da pessoa (21.9)
    (select s.estagio from public.eventos s
      where s.id_pessoa = pe.id_pessoa and s.estagio is not null
      order by s.ocorrido_em desc, s.gravado_em desc, s.id_evento desc limit 1),
    (select s.estado from public.eventos s
      where s.id_pessoa = pe.id_pessoa and s.estado is not null
      order by s.ocorrido_em desc, s.gravado_em desc, s.id_evento desc limit 1),
    (select s.data_volta from public.eventos s
      where s.id_pessoa = pe.id_pessoa and s.estado is not null
      order by s.ocorrido_em desc, s.gravado_em desc, s.id_evento desc limit 1),
    en.gravado_em,                                       -- cursor_gravado_em
    en.respostas                                         -- respostas: as completas, do mesmo fim de quiz (v4)
  from entrada en
  join public.pessoas pe on pe.id_pessoa = en.id_pessoa
  where pe.consentimento_retirado_em is null
    and pe.consentimento_whatsapp = 'sim'
    and en.gravado_em < pg_catalog.now() - interval '1 minute'
    and (apos_gravado_em is null
         or (en.gravado_em, en.id_pessoa) > (apos_gravado_em, apos_id_pessoa))
  order by en.gravado_em, en.id_pessoa
  limit v_limite;
end;
$$;
comment on function public.leads_para_planilha(timestamptz, uuid, integer) is
  'Porta privada do garçom (#100), v4. Até 200 leads das faixas a e b para a planilha do SDR, depois do cursor, com o histórico da faixa b, o clique no fim do quiz e as respostas completas do quiz. Só o papel service_role executa.';


-- ··························································································
-- 2. Fechaduras de novo (#99 e #100; nucleo/regras/seguranca.md, regra 2)
-- As mesmas da migração 001, sem tirar nem pôr. Nenhuma permissão padrão: tudo é retirado de
-- PUBLIC, anon, authenticated e service_role, e só as três portas são dadas. A função nova nasce
-- sem permissão nenhuma de quem não é dono; o grant abaixo devolve a dela só ao service_role.
-- ··························································································
alter table public.entregas     enable row level security;
alter table public.pessoas      enable row level security;
alter table public.eventos      enable row level security;
alter table public.investimento enable row level security;

revoke all on all tables    in schema public from public, anon, authenticated, service_role;
revoke all on all sequences in schema public from public, anon, authenticated, service_role;
revoke all on all functions in schema public from public, anon, authenticated, service_role;

alter default privileges revoke execute on functions from public;
alter default privileges in schema public revoke all on tables    from public, anon, authenticated, service_role;
alter default privileges in schema public revoke all on sequences from public, anon, authenticated, service_role;
alter default privileges in schema public revoke all on functions from public, anon, authenticated, service_role;

-- As três únicas portas abertas:
--   a chave publicável (anon) grava o fim do quiz, a visita, o início do quiz e o clique;
--   a chave secreta (service_role) só lê os leads da planilha.
grant execute on function public.registrar_fim_quiz(jsonb) to anon;
grant execute on function public.registrar_evento(jsonb) to anon;
grant execute on function public.leads_para_planilha(timestamptz, uuid, integer) to service_role;

-- Continuam sem existir: a chave da volta do status do SDR, a do painel e a do contador (6.6;
-- planta v4, "Quem grava e quem lê"; log.md, Pendências). Conferência: dados/banco/conferir.sql.

commit;
