-- Migração 003 · a origem completa do lead e os ids de evento na gaveta eventos (Postgres, no Supabase)
-- id: banco-migracao-003 · versao 1 · rascunho · otavio: pendente
-- depende_de: banco-migracao-002 v1, banco-rascunho v6, planta-do-banco v5, decisoes v11 (#121), funil-01 v4
-- desatualizado: true (banco-migracao-002 e banco-rascunho continuam marcadas; regra 11.1)
--
-- RASCUNHO. Sem dado pessoal. Ver dados/banco/README.md.
--
-- PARA QUE SERVE: a decisão do Otávio de 18/11/2026 (base/decisoes.md, #121), para preparar o site
-- para o rastreamento dos anúncios sem nada da Meta no ar:
--   · seis colunas novas de origem na gaveta eventos: utm_medium, utm_content e utm_term (texto
--     livre saneado: minúsculas, letras, números, hífen e sublinhado, até 100 caracteres; vazio
--     quando não vier ou vier fora disso), fbclid (letras, números, hífen e sublinhado, até 500;
--     vazio quando não vier), fbp e fbc (vazias até o Pixel existir; só no formato fb.N.N.xxx);
--   · três colunas do fim do quiz: id_lead (lead-<milissegundos>-<sorte>), id_qualificado
--     (qualificado-<milissegundos>-<sorte>, só quando qualificado) e qualificado (verdadeiro ou
--     falso, pela regra do fim do quiz que vale na página, o CRITERIO_DO_FIM);
--   · meta-ads passa a valer em utm_source (eventos) e primeira_utm_source (pessoas); utm_campaign
--     continua fechada em funil-01;
--   · registrar_fim_quiz grava os campos novos, que são todos opcionais: o pacote antigo, sem eles,
--     continua gravando igual. Se o mesmo id_lead chegar de novo (o "Tentar de novo" depois de uma
--     resposta perdida), a função não grava outra vez e não dá erro;
--   · leads_para_planilha (v5) devolve tudo o que a v4 devolve, na mesma ordem, e mais onze
--     colunas no fim, do mesmo fim de quiz que a função já usa: utm_source, utm_medium,
--     utm_campaign, utm_content, utm_term, fbclid, fbp, fbc, id_lead, id_qualificado e qualificado;
--   · as fechaduras de novo, iguais às da 001 e da 002 (#99, #100). Nenhuma mudança de RLS: as
--     tabelas continuam sem acesso direto, e só as três funções são portas.
-- O que NÃO muda: nenhuma linha que já existe; registrar_evento (a visita, o início do quiz e o
-- clique continuam com as mesmas colunas); quem entra na planilha, o cursor, a margem e o teto.
--
-- QUANDO RODAR: depois da 002 (dados/banco/migracoes/002-respostas-na-planilha.sql), ANTES de
-- publicar o garçom v6 e a página do quiz v10. O garçom e a página de antes continuam funcionando
-- com o banco já migrado. Depois desta, rodar dados/banco/conferir.sql (v4): todas as linhas true.
-- Se esquema.sql, a 001 ou a 002 forem rodados de novo um dia, rodar as seguintes logo depois.
--
-- COMO RODAR: colar este arquivo inteiro no editor SQL do Supabase (papel postgres, o padrão do
-- editor) e clicar em Run. Roda tudo numa transação só (begin ... commit): se qualquer passo
-- falhar, nada muda. Pode rodar de novo sem erro e dá o mesmo resultado.
--
-- SEGURO COM OS DADOS QUE JÁ EXISTEM: só acrescenta colunas (as de texto nascem vazias, as outras
-- sem valor), troca duas listas por outras maiores e refaz duas funções. Não tem DELETE, UPDATE,
-- TRUNCATE nem DROP de tabela ou coluna. A trava dos eventos não é tocada.

begin;


-- ··························································································
-- 0. O esquema v2, a 001 e a 002 precisam estar no banco
-- ··························································································
do $$
begin
  if pg_catalog.to_regclass('public.eventos') is null
     or pg_catalog.to_regclass('public.pessoas') is null
     or pg_catalog.to_regprocedure('public.registrar_fim_quiz(jsonb)') is null then
    raise exception 'esquema v2 não encontrado: rode antes dados/banco/esquema.sql';
  end if;
  if pg_catalog.to_regprocedure('public.registrar_evento(jsonb)') is null then
    raise exception 'migração 001 não encontrada: rode antes dados/banco/migracoes/001-v3.sql';
  end if;
  if pg_catalog.to_regprocedure('public.leads_para_planilha(timestamptz, uuid, integer)') is null
     or pg_catalog.pg_get_function_result('public.leads_para_planilha(timestamptz, uuid, integer)'::regprocedure)
        not like '%cursor_gravado_em timestamp with time zone, respostas jsonb%' then
    raise exception 'migração 002 não encontrada: rode antes dados/banco/migracoes/002-respostas-na-planilha.sql';
  end if;
end;
$$;


-- ··························································································
-- 1. Colunas novas na gaveta eventos (planta v5; #121)
-- As de texto livre nascem vazias, como utm_source e utm_campaign; as outras, sem valor.
-- ··························································································
alter table public.eventos add column if not exists utm_medium     text not null default '';
alter table public.eventos add column if not exists utm_content    text not null default '';
alter table public.eventos add column if not exists utm_term       text not null default '';
alter table public.eventos add column if not exists fbclid         text not null default '';
alter table public.eventos add column if not exists fbp            text;
alter table public.eventos add column if not exists fbc            text;
alter table public.eventos add column if not exists id_lead        text;
alter table public.eventos add column if not exists id_qualificado text;
alter table public.eventos add column if not exists qualificado    boolean;


-- ··························································································
-- 2. Restrições, com nome (tiradas antes de pôr, para rodar de novo)
-- ··························································································
alter table public.eventos drop constraint if exists eventos_utm_texto_livre;
alter table public.eventos drop constraint if exists eventos_fbclid_formato;
alter table public.eventos drop constraint if exists eventos_fbp_fbc_formato;
alter table public.eventos drop constraint if exists eventos_ids_formato;
alter table public.eventos drop constraint if exists eventos_ids_so_no_fim;
alter table public.eventos drop constraint if exists eventos_qualificado_coerente;

alter table public.eventos add constraint eventos_utm_texto_livre check (
  utm_medium ~ '^[a-z0-9_-]{0,100}$' and utm_content ~ '^[a-z0-9_-]{0,100}$' and utm_term ~ '^[a-z0-9_-]{0,100}$');
alter table public.eventos add constraint eventos_fbclid_formato check (fbclid ~ '^[A-Za-z0-9_-]*$' and length(fbclid) <= 500);
alter table public.eventos add constraint eventos_fbp_fbc_formato check (
  (fbp is null or (fbp ~ '^fb\.[0-9]+\.[0-9]+\.[A-Za-z0-9_.-]+$' and length(fbp) <= 500))
  and (fbc is null or (fbc ~ '^fb\.[0-9]+\.[0-9]+\.[A-Za-z0-9_.-]+$' and length(fbc) <= 500)));
alter table public.eventos add constraint eventos_ids_formato check (
  (id_lead is null or id_lead ~ '^lead-[0-9]{10,16}-[a-z0-9]{4,32}$')
  and (id_qualificado is null or id_qualificado ~ '^qualificado-[0-9]{10,16}-[a-z0-9]{4,32}$'));
-- os ids, o resultado do corte e os cookies da Meta só existem no fim do quiz
alter table public.eventos add constraint eventos_ids_so_no_fim check (
  tipo = 'fim_quiz' or (id_lead is null and id_qualificado is null and qualificado is null and fbp is null and fbc is null));
-- id_qualificado só com qualificado verdadeiro e com id_lead; qualificado verdadeiro sempre com id_qualificado
alter table public.eventos add constraint eventos_qualificado_coerente check (
  (id_qualificado is null or (qualificado is true and id_lead is not null))
  and (qualificado is not true or id_qualificado is not null));

-- um id_lead (e um id_qualificado) por fim de quiz: o reenvio do mesmo lead não vira outra linha
create unique index if not exists eventos_id_lead_unico on public.eventos (id_lead) where id_lead is not null;
create unique index if not exists eventos_id_qualificado_unico on public.eventos (id_qualificado) where id_qualificado is not null;

-- meta-ads entra na lista de utm_source (eventos) e de primeira_utm_source (pessoas). Tira a
-- restrição que olha só essa coluna (no v2, sem nome: eventos_utm_source_check e
-- pessoas_primeira_utm_source_check; na segunda rodada, as desta migração) e põe a nova, com nome.
do $$
declare
  r record;
begin
  for r in
    select c.conrelid::regclass::text as tabela, c.conname
      from pg_catalog.pg_constraint c
     where c.contype = 'c'
       and ((c.conrelid = 'public.eventos'::regclass
             and (select pg_catalog.array_agg(a.attname::text) from pg_catalog.pg_attribute a
                   where a.attrelid = c.conrelid and a.attnum = any (c.conkey)) = array['utm_source'])
         or (c.conrelid = 'public.pessoas'::regclass
             and (select pg_catalog.array_agg(a.attname::text) from pg_catalog.pg_attribute a
                   where a.attrelid = c.conrelid and a.attnum = any (c.conkey)) = array['primeira_utm_source']))
  loop
    execute pg_catalog.format('alter table %s drop constraint %I', r.tabela, r.conname);
  end loop;
end;
$$;
alter table public.eventos add constraint eventos_utm_source_lista
  check (utm_source in ('stories', 'bio', 'reels', 'email', 'whatsapp', 'meta-ads', ''));
alter table public.pessoas add constraint pessoas_primeira_utm_source_lista
  check (primeira_utm_source in ('stories', 'bio', 'reels', 'email', 'whatsapp', 'meta-ads', ''));


-- ··························································································
-- 3. Fim do quiz · porta pública do garçom, versão 4
-- Igual à do esquema v2 (a pessoa repetida não vira outra, o telefone e o e-mail de pessoas
-- diferentes não se juntam, a sessão liga a visita e o início do quiz à pessoa), com:
--   · os nove campos novos do evento, todos opcionais (sem eles, grava como antes);
--   · o mesmo id_lead de novo: não grava outra vez e não dá erro (o reenvio é seguro).
-- create or replace: a assinatura não muda, e a permissão da função continua (refeita no passo 5).
-- ··························································································
create or replace function public.registrar_fim_quiz(pacote jsonb) returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  p           jsonb := pacote -> 'pessoa';
  e           jsonb := pacote -> 'evento';
  v_telefone  text;
  v_email     text;
  v_pessoa    uuid;
  v_achadas   integer;
  v_primeira  timestamptz;
  v_tentativa integer := 0;
begin
  if p is null or e is null or e ->> 'tipo' is distinct from 'fim_quiz' then
    raise exception 'pacote fora do formato' using errcode = '22023';
  end if;

  -- o mesmo lead de novo (o "Tentar de novo" depois de uma resposta perdida): já está gravado
  if e ->> 'id_lead' is not null
     and exists (select 1 from public.eventos x where x.id_lead = e ->> 'id_lead') then
    return;
  end if;

  -- as mesmas expressões dos índices únicos
  v_telefone := pg_catalog.regexp_replace(p ->> 'telefone', '[^0-9]', '', 'g');
  v_email    := pg_catalog.lower(pg_catalog.btrim(p ->> 'email'));

  loop
    v_tentativa := v_tentativa + 1;

    -- quem já está no banco não vira outra pessoa
    select pg_catalog.count(*), pg_catalog.min(x.id_pessoa::text)::uuid
      into v_achadas, v_pessoa
      from public.pessoas x
     where pg_catalog.regexp_replace(x.telefone, '[^0-9]', '', 'g') = v_telefone
        or pg_catalog.lower(x.email) = v_email;

    if v_achadas > 1 then
      -- o telefone é de uma pessoa e o e-mail de outra: não junta, não escolhe (21.2)
      raise exception 'telefone e e-mail pertencem a pessoas diferentes' using errcode = '22023';
    end if;
    exit when v_achadas = 1;

    -- pessoa nova
    select pg_catalog.min(ev.ocorrido_em) into v_primeira
      from public.eventos ev
     where ev.id_sessao = e ->> 'id_sessao' and ev.tipo = 'visita';

    -- se outro envio gravou a mesma pessoa no mesmo instante, o insert não faz nada
    -- (espera o outro terminar) e a volta do laço acha a linha dele
    insert into public.pessoas (
      nome, telefone, email, empresa,
      consentimento_whatsapp, consentimento_email, consentimento_texto, consentimento_em,
      primeira_utm_source, primeira_utm_campaign, primeira_visita_em
    ) values (
      pg_catalog.btrim(p ->> 'nome'), p ->> 'telefone', pg_catalog.btrim(p ->> 'email'),
      coalesce(p ->> 'empresa', ''),
      p ->> 'consentimento_whatsapp', p ->> 'consentimento_email',
      p ->> 'consentimento_texto', (p ->> 'consentimento_em')::timestamptz,
      coalesce(p ->> 'primeira_utm_source', ''), coalesce(p ->> 'primeira_utm_campaign', ''), v_primeira
    )
    on conflict do nothing
    returning id_pessoa into v_pessoa;

    exit when v_pessoa is not null;

    if v_tentativa >= 3 then
      raise exception 'nao foi possivel reconhecer a pessoa' using errcode = '40001';
    end if;
  end loop;
  -- Pessoa repetida: a linha dela não muda, nem o consentimento (proposta conservadora, 18.6).

  update public.eventos
     set id_pessoa = v_pessoa
   where id_sessao = e ->> 'id_sessao' and id_pessoa is null;

  insert into public.eventos (
    tipo, id_pessoa, id_sessao,
    funil, entrega, versao_entrega, utm_source, utm_campaign,
    utm_medium, utm_content, utm_term, fbclid, fbp, fbc,
    id_lead, id_qualificado, qualificado,
    ocorrido_em, gravado_em, gravado_por,
    respostas, lead_score_nota, lead_score_faixa, lead_score_versao
  ) values (
    'fim_quiz', v_pessoa, e ->> 'id_sessao',
    e ->> 'funil', e ->> 'entrega', (e ->> 'versao_entrega')::integer,
    coalesce(e ->> 'utm_source', ''), coalesce(e ->> 'utm_campaign', ''),
    coalesce(e ->> 'utm_medium', ''), coalesce(e ->> 'utm_content', ''), coalesce(e ->> 'utm_term', ''),
    coalesce(e ->> 'fbclid', ''), nullif(e ->> 'fbp', ''), nullif(e ->> 'fbc', ''),
    nullif(e ->> 'id_lead', ''), nullif(e ->> 'id_qualificado', ''), (e ->> 'qualificado')::boolean,
    -- gravado_em pela hora do relógio, não pela hora em que o pedido começou:
    -- fica mais perto do fim da gravação, o que ajuda o cursor da planilha (21.6)
    (e ->> 'ocorrido_em')::timestamptz, pg_catalog.clock_timestamp(), 'garcom',
    e -> 'respostas', (e ->> 'lead_score_nota')::integer, e ->> 'lead_score_faixa',
    (e ->> 'lead_score_versao')::integer
  );
end;
$$;
comment on function public.registrar_fim_quiz(jsonb) is
  'Porta pública do garçom, v4 (migração 003; #121). Grava o fim do quiz-01: a pessoa (nova ou já conhecida) e o evento, com a origem completa e os ids, todos opcionais. O mesmo id_lead de novo não grava outra vez. Só o papel anon executa.';


-- ··························································································
-- 4. Leads para a planilha do SDR · porta privada do garçom (#100), versão 5
-- Igual à versão 4, da migração 002, com onze colunas a mais, no fim, do mesmo fim de quiz que a
-- função já usa (o primeiro da pessoa em faixa a ou b): a origem (as cinco utm, fbclid, fbp e fbc)
-- e os ids (id_lead, id_qualificado e qualificado). As colunas ficam no fim para quem já lê as 18
-- de antes continuar lendo igual (a planilha v3 ignora o que não conhece). A lista de colunas
-- muda, por isso a função é tirada e criada de novo (não há dado nela).
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
  respostas               jsonb,
  utm_source              text,
  utm_medium              text,
  utm_campaign            text,
  utm_content             text,
  utm_term                text,
  fbclid                  text,
  fbp                     text,
  fbc                     text,
  id_lead                 text,
  id_qualificado          text,
  qualificado             boolean
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
           ev.lead_score_faixa, ev.lead_score_nota, ev.respostas,
           ev.utm_source, ev.utm_medium, ev.utm_campaign, ev.utm_content, ev.utm_term,
           ev.fbclid, ev.fbp, ev.fbc, ev.id_lead, ev.id_qualificado, ev.qualificado
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
    en.respostas,                                        -- respostas: as completas, do mesmo fim de quiz (v4)
    -- v5 (#121): a origem e os ids, do mesmo fim de quiz
    en.utm_source, en.utm_medium, en.utm_campaign, en.utm_content, en.utm_term,
    en.fbclid, en.fbp, en.fbc, en.id_lead, en.id_qualificado, en.qualificado
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
  'Porta privada do garçom (#100), v5. Até 200 leads das faixas a e b para a planilha do SDR, depois do cursor, com o histórico da faixa b, o clique no fim do quiz, as respostas completas do quiz e, no fim, a origem e os ids do lead (#121). Só o papel service_role executa.';


-- ··························································································
-- 5. Fechaduras de novo (#99 e #100; nucleo/regras/seguranca.md, regra 2)
-- As mesmas da 001 e da 002, sem tirar nem pôr. Nenhuma política de RLS é criada nem mudada.
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

commit;
