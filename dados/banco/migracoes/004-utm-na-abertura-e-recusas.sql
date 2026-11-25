-- Migração 004 · as utm de texto livre na abertura do quiz e a contagem das recusas do garçom (Postgres, no Supabase)
-- id: banco-migracao-004 · versao 1 · rascunho · otavio: pendente
-- depende_de: banco-migracao-003 v1, banco-rascunho v6, planta-do-banco v5, decisoes v15 (pedido 24), funil-01 v4
-- desatualizado: true (banco-migracao-003 e banco-rascunho continuam marcadas; regra 11.1)
--
-- RASCUNHO. Sem dado pessoal. Ver dados/banco/README.md.
--
-- PARA QUE SERVE: o pedido 24 do Otávio (25/11/2026; prompts/24-correcoes-antes-dos-anuncios.md), itens 2 e 4:
--   · registrar_evento (v2) grava também utm_medium, utm_content e utm_term na visita, no início do quiz e no
--     clique, para medir a taxa de abertura do quiz para quiz completo por criativo (KR 2.1). As três são
--     opcionais (o pacote de antes continua gravando igual) e de texto livre saneado, como no fim do quiz (#121):
--     minúsculas, letras, números, hífen e sublinhado, até 100 caracteres. Quem saneia é o garçom (v7); aqui,
--     o que vier fora do formato é gravado vazio, nunca recusa o evento. As colunas já existem desde a 003;
--   · a tabela recusas e a função registrar_recusa: a contagem das recusas do garçom nas duas portas públicas,
--     por dia (no horário de Brasília), porta e motivo. Só números: nenhum nome, e-mail, telefone, IP, sessão,
--     resposta ou endereço. O motivo é um código fixo do garçom (letras minúsculas e hífen); a restrição
--     recusas_motivo_formato não deixa entrar outra coisa. É para nenhum lead de verdade ser recusado em
--     silêncio (pedido 24, item 2): quem olha a tabela vê quantas recusas houve e por quê;
--   · as fechaduras de novo, iguais às da 001 à 003 (#99, #100), com a porta nova: a chave publicável (anon)
--     executa registrar_recusa, e ninguém lê a tabela recusas pela API. O Otávio lê no editor SQL (papel
--     postgres): dados/banco/README.md, "As recusas do garçom".
-- O que NÃO muda: nenhuma linha que já existe; registrar_fim_quiz; leads_para_planilha; as colunas e as
-- restrições da gaveta eventos; quem entra na planilha.
--
-- QUANDO RODAR: depois da 003 (dados/banco/migracoes/003-origem-e-ids.sql), ANTES de publicar o garçom v7 e
-- a página do quiz v14 (roteiro entregas/prototipo-funil-01/APLICAR-24.md). O garçom e a página de antes
-- continuam funcionando com o banco já migrado. Depois desta, rodar dados/banco/conferir.sql (v5): todas as
-- linhas true. Se esquema.sql ou uma migração anterior for rodada de novo um dia, rodar as seguintes logo depois.
--
-- COMO RODAR: colar este arquivo inteiro no editor SQL do Supabase (papel postgres, o padrão do editor) e
-- clicar em Run. Roda tudo numa transação só (begin ... commit): se qualquer passo falhar, nada muda. Pode
-- rodar de novo sem erro e dá o mesmo resultado.
--
-- SEGURO COM OS DADOS QUE JÁ EXISTEM: cria uma tabela vazia, refaz uma função e cria outra. Não tem DELETE,
-- UPDATE, TRUNCATE nem DROP de tabela ou coluna. A trava dos eventos não é tocada.

begin;


-- ··························································································
-- 0. O esquema v2 e as migrações 001 a 003 precisam estar no banco
-- ··························································································
do $$
begin
  if pg_catalog.to_regclass('public.eventos') is null
     or pg_catalog.to_regprocedure('public.registrar_evento(jsonb)') is null then
    raise exception 'esquema v2 ou migração 001 não encontrados: rode antes dados/banco/esquema.sql e as migrações 001 a 003';
  end if;
  if not exists (select 1 from pg_catalog.pg_attribute a
                  where a.attrelid = 'public.eventos'::regclass and a.attname = 'utm_content' and not a.attisdropped) then
    raise exception 'migração 003 não encontrada: rode antes dados/banco/migracoes/003-origem-e-ids.sql';
  end if;
end;
$$;


-- ··························································································
-- 1. Eventos sem pessoa · porta pública do garçom, versão 2
-- Igual à da 001 (a visita, o início do quiz e o clique, sem dado de pessoa; a sessão liga o evento à pessoa
-- do fim do quiz, se houver uma só; o clique só entra com o fim do quiz de uma pessoa na sessão), com
-- utm_medium, utm_content e utm_term, opcionais. Fora do formato da restrição eventos_utm_texto_livre (003),
-- a utm é gravada vazia: o evento nunca é recusado por ela.
-- create or replace: a assinatura não muda, e a permissão da função continua (refeita no passo 4).
-- ··························································································
create or replace function public.registrar_evento(pacote jsonb) returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  e         jsonb := pacote -> 'evento';
  v_tipo    text;
  v_pessoas integer;
  v_pessoa  uuid;
  v_medium  text;
  v_content text;
  v_term    text;
begin
  if pacote is null or pg_catalog.jsonb_typeof(pacote) <> 'object'
     or e is null or pg_catalog.jsonb_typeof(e) <> 'object'
     or pacote ? 'pessoa'
     or exists (select 1 from pg_catalog.jsonb_object_keys(pacote) k where k <> 'evento') then
    raise exception 'pacote fora do formato' using errcode = '22023';
  end if;

  v_tipo := e ->> 'tipo';
  if v_tipo is null or v_tipo not in ('visita', 'inicio_quiz', 'interesse_pos_relatorio') then
    raise exception 'tipo fora desta porta' using errcode = '22023';
  end if;

  if exists (select 1 from pg_catalog.jsonb_object_keys(e) k
              where k not in ('tipo', 'funil', 'entrega', 'versao_entrega', 'utm_source', 'utm_campaign',
                              'id_sessao', 'ocorrido_em', 'clique_fim_quiz',
                              'utm_medium', 'utm_content', 'utm_term')) then
    raise exception 'campo fora do formato' using errcode = '22023';
  end if;

  if e ->> 'id_sessao' is null then
    raise exception 'evento sem sessao' using errcode = '22023';
  end if;

  -- as três utm de texto livre: no formato, como vieram; fora dele ou ausentes, vazias
  v_medium  := coalesce(e ->> 'utm_medium', '');
  v_content := coalesce(e ->> 'utm_content', '');
  v_term    := coalesce(e ->> 'utm_term', '');
  if v_medium  !~ '^[a-z0-9_-]{0,100}$' then v_medium  := ''; end if;
  if v_content !~ '^[a-z0-9_-]{0,100}$' then v_content := ''; end if;
  if v_term    !~ '^[a-z0-9_-]{0,100}$' then v_term    := ''; end if;

  -- a pessoa do fim do quiz desta sessão, se houver uma só
  select pg_catalog.count(distinct ev.id_pessoa), pg_catalog.min(ev.id_pessoa::text)::uuid
    into v_pessoas, v_pessoa
    from public.eventos ev
   where ev.id_sessao = e ->> 'id_sessao' and ev.tipo = 'fim_quiz';
  if v_pessoas <> 1 then
    v_pessoa := null;
  end if;

  if v_tipo = 'interesse_pos_relatorio' and v_pessoa is null then
    raise exception 'clique sem fim do quiz de uma pessoa nesta sessao' using errcode = '22023';
  end if;

  insert into public.eventos (
    tipo, id_pessoa, id_sessao,
    funil, entrega, versao_entrega, utm_source, utm_campaign,
    utm_medium, utm_content, utm_term,
    ocorrido_em, gravado_em, gravado_por,
    clique_fim_quiz
  ) values (
    v_tipo, v_pessoa, e ->> 'id_sessao',
    e ->> 'funil', e ->> 'entrega', (e ->> 'versao_entrega')::integer,
    coalesce(e ->> 'utm_source', ''), coalesce(e ->> 'utm_campaign', ''),
    v_medium, v_content, v_term,
    (e ->> 'ocorrido_em')::timestamptz, pg_catalog.clock_timestamp(), 'garcom',
    e ->> 'clique_fim_quiz'
  );
end;
$$;
comment on function public.registrar_evento(jsonb) is
  'Porta pública do garçom (#100; planta v4), v2 (pedido 24). Grava visita, início do quiz e clique no fim do quiz, sem dado de pessoa, com as utm de texto livre (utm_medium, utm_content, utm_term) quando vierem. Só o papel anon executa.';


-- ··························································································
-- 2. As recusas do garçom: a tabela (só números) e a função que soma uma
-- Uma linha por dia (horário de Brasília), porta e motivo, com quantas recusas houve, a primeira e a última.
-- ··························································································
create table if not exists public.recusas (
  dia         date        not null,
  porta       text        not null,
  motivo      text        not null,
  quantas     integer     not null default 0,
  primeira_em timestamptz not null default pg_catalog.now(),
  ultima_em   timestamptz not null default pg_catalog.now(),
  constraint recusas_chave primary key (dia, porta, motivo),
  constraint recusas_porta_lista check (porta in ('fim-quiz', 'evento')),
  constraint recusas_motivo_formato check (motivo ~ '^[a-z]+(-[a-z]+)*$' and length(motivo) <= 40),
  constraint recusas_quantas_positiva check (quantas >= 0)
);
comment on table public.recusas is
  'Contagem das recusas do garçom nas portas públicas (pedido 24, item 2): dia, porta, motivo e quantas. Sem dado pessoal. Só registrar_recusa grava.';

create or replace function public.registrar_recusa(porta text, motivo text) returns void
language plpgsql
security definer
set search_path = ''
as $$
#variable_conflict use_column
declare
  v_dia date := (pg_catalog.now() at time zone 'America/Sao_Paulo')::date;
begin
  -- fora da lista ou do formato: a restrição da tabela recusa (23514), e o garçom só registra o erro dele
  insert into public.recusas as r (dia, porta, motivo, quantas, primeira_em, ultima_em)
  values (v_dia, registrar_recusa.porta, registrar_recusa.motivo, 1, pg_catalog.clock_timestamp(), pg_catalog.clock_timestamp())
  on conflict on constraint recusas_chave
  do update set quantas = r.quantas + 1, ultima_em = pg_catalog.clock_timestamp();
end;
$$;
comment on function public.registrar_recusa(text, text) is
  'Porta pública do garçom (pedido 24, item 2). Soma uma recusa no dia, na porta e no motivo. Só o papel anon executa.';


-- ··························································································
-- 3. Row level security na tabela nova, como nas outras: ligada, sem política
-- ··························································································
alter table public.recusas enable row level security;


-- ··························································································
-- 4. Fechaduras de novo (#99 e #100; nucleo/regras/seguranca.md, regra 2)
-- As mesmas da 001 à 003, com a tabela nova e a porta nova. Nenhuma política de RLS é criada nem mudada.
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

-- As quatro únicas portas abertas:
--   a chave publicável (anon) grava o fim do quiz, a visita, o início do quiz e o clique, e soma uma recusa;
--   a chave secreta (service_role) só lê os leads da planilha.
grant execute on function public.registrar_fim_quiz(jsonb) to anon;
grant execute on function public.registrar_evento(jsonb) to anon;
grant execute on function public.registrar_recusa(text, text) to anon;
grant execute on function public.leads_para_planilha(timestamptz, uuid, integer) to service_role;

commit;
