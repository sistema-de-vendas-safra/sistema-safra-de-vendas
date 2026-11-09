-- Migração 001 · banco do funil-01 da versão 2 para a 3 (Postgres, no Supabase)
-- id: banco-migracao-001 · versao 1 · rascunho · otavio: pendente
-- depende_de: planta-do-banco v4, banco-rascunho v3, funil-01-planilha-sdr v2, lead-score v3,
--             decisoes v5, regra-seguranca v3
-- desatualizado: true (funil-01-planilha-sdr v2 continua marcada por cadeia; regra 11.1)
--
-- RASCUNHO. Nada daqui está no ar. Sem dado pessoal. Ver dados/banco/README.md.
-- Destino dos contatos em conflito (conflito-17, em base/lacunas.md): segue o lado 2 (banco e
-- planilha da #90), como o esquema v2. Bloqueado para entrega até a decisão.
--
-- PARA QUE SERVE: o banco de verdade já tem dados (de teste, #102). Rodar o esquema inteiro de
-- novo não muda tabela que já existe (21.11). Esta migração leva o esquema v2 (dados/banco/esquema.sql)
-- ao que a planta v4 (dados/planta/planta.md) desenha, sem apagar nada:
--   · tipo de evento novo interesse_pos_relatorio, com o campo clique_fim_quiz (18.4; 31.15);
--   · função nova registrar_evento, a porta pública da visita, do início do quiz e do clique no
--     fim do quiz (18.5, 10.6, 10.8): sem dado de pessoa, por isso sem aceite;
--   · estado nutricao na lista (5.3, 15.11) e a lista do produto vendido: iasv ou essencial (5.3);
--   · na função da planilha, as duas respostas do histórico da faixa B, leads por mês e CRM (15.4),
--     e o que a pessoa clicou no fim do quiz (18.4, com 15.16);
--   · as fechaduras de novo, com a terceira porta (#99, #100).
-- O que NÃO muda: nenhuma tabela, coluna ou linha é apagada; registrar_fim_quiz, a trava dos
-- eventos, os índices e as visões ficam como estão. Já valiam no v2, sem mudança: a nota guardada
-- também no eliminatório (14.8; a restrição do fim do quiz já exige a nota em toda faixa) e
-- entrou_em e tentativas_feitas na planilha (15.3). A ordem dentro da faixa (15.6) é da planilha:
-- a função continua entregando na ordem do cursor, que é o que garante não perder nem repetir lead.
-- A 6.6 (uma chave e um papel para o painel, o contador e a volta do status) fica para quando
-- cada um existir (log.md, Pendências).
--
-- QUANDO RODAR: depois do esquema v2, que já rodou no projeto sistema-de-vendas-safra. Depois
-- desta migração, rodar dados/banco/conferir.sql (dados/banco/README.md, "Como aplicar").
-- Se esquema.sql for rodado de novo um dia, rodar esta migração de novo logo depois: o esquema v2
-- refaz as funções e as fechaduras do jeito v2 e tiraria a porta nova.
--
-- COMO RODAR: colar este arquivo inteiro no editor SQL do Supabase (papel postgres, o padrão do
-- editor) e clicar em Run. Roda tudo numa transação só (begin ... commit): se qualquer passo
-- falhar, nada muda. Pode rodar de novo sem erro e dá o mesmo resultado.
--
-- SEGURO COM OS DADOS QUE JÁ EXISTEM: as listas novas só acrescentam valores às antigas, então
-- toda linha que já passou na regra v2 passa na v3; a coluna nova nasce vazia e só é exigida no
-- tipo novo. O Postgres confere todas as linhas ao ligar cada restrição; se alguma não passasse,
-- a migração inteira voltaria atrás, sem mudar nada.
-- As restrições trocadas travam a tabela eventos por um instante: rodar fora de um teste em curso.

begin;


-- ··························································································
-- 0. O esquema v2 precisa estar no banco
-- ··························································································
do $$
begin
  if pg_catalog.to_regclass('public.eventos') is null
     or pg_catalog.to_regclass('public.pessoas') is null
     or pg_catalog.to_regprocedure('public.registrar_fim_quiz(jsonb)') is null then
    raise exception 'esquema v2 não encontrado: rode antes dados/banco/esquema.sql';
  end if;
end;
$$;


-- ··························································································
-- 1. Gaveta eventos · campo novo clique_fim_quiz (planta v4, "Outros campos do evento")
-- Nasce vazio em todas as linhas que já existem. Nada é reescrito.
-- ··························································································
alter table public.eventos add column if not exists clique_fim_quiz text;
comment on column public.eventos.clique_fim_quiz is
  'O que a pessoa clicou no fim do quiz (planta v4; 18.4). Só no evento interesse_pos_relatorio. Lista proposta (31.15).';


-- ··························································································
-- 2. Listas fechadas e regras da gaveta eventos
-- As restrições do v2 não têm nome escrito no esquema (o Postgres deu o nome sozinho). Para não
-- depender do nome, este passo tira as restrições pelas colunas que elas olham:
--   · só tipo                 a lista de tipos            (no v2: eventos_tipo_check)
--   · só estado               a lista de estados          (no v2: eventos_estado_check)
--   · só produto              produto sempre vazio        (no v2: eventos_produto_check)
--   · tipo e gravado_por      quem grava cada tipo        (no v2: eventos_check)
-- e põe no lugar as versões v3, com nome. Na segunda rodada, tira as v3 (que olham as mesmas
-- colunas) e põe de novo, iguais. Nenhuma outra restrição é tocada.
-- ··························································································
do $$
declare
  r record;
begin
  for r in
    select c.conname
      from pg_catalog.pg_constraint c
     where c.conrelid = 'public.eventos'::regclass
       and c.contype = 'c'
       and (select pg_catalog.array_agg(a.attname::text order by a.attname::text)
              from pg_catalog.pg_attribute a
             where a.attrelid = c.conrelid and a.attnum = any (c.conkey))
           in (array['tipo'], array['estado'], array['produto'], array['gravado_por', 'tipo'])
  loop
    execute pg_catalog.format('alter table public.eventos drop constraint %I', r.conname);
  end loop;
end;
$$;

-- as três restrições novas do clique (também tiradas antes de pôr, para rodar de novo)
alter table public.eventos drop constraint if exists eventos_clique_lista;
alter table public.eventos drop constraint if exists eventos_clique_so_no_interesse;
alter table public.eventos drop constraint if exists eventos_interesse_completo;

-- Lista de tipos (planta v4, "Tipos de evento"): entra interesse_pos_relatorio (18.4; 31.15)
alter table public.eventos add constraint eventos_tipo_lista check (tipo in (
  'visita', 'inicio_quiz', 'fim_quiz', 'interesse_pos_relatorio',
  'contato_sdr', 'mudanca_status', 'reuniao_marcada', 'reuniao_realizada',
  'venda', 'perda'
));

-- Quem grava cada tipo: o clique no fim do quiz é do garçom, como a visita e o quiz
alter table public.eventos add constraint eventos_quem_grava check (
  (tipo in ('visita', 'inicio_quiz', 'fim_quiz', 'interesse_pos_relatorio') and gravado_por = 'garcom')
  or (tipo not in ('visita', 'inicio_quiz', 'fim_quiz', 'interesse_pos_relatorio') and gravado_por = 'volta-do-status')
);

-- Estados (funil-01, "Status do SDR"; sem acento no banco): entra nutricao (5.3; 15.11)
alter table public.eventos add constraint eventos_estado_lista check (estado in (
  'conversando', 'tentativa', 'abandonado', 'stand-by', 'perdido', 'nutricao'
));

-- Produto vendido (5.3): iasv ou essencial; vazio quando não há venda
alter table public.eventos add constraint eventos_produto_lista check (produto in ('iasv', 'essencial'));

-- Clique no fim do quiz: um valor por botão do fim do quiz. Lista PROPOSTA (31.15): se mudar,
-- muda só esta restrição, numa migração nova.
alter table public.eventos add constraint eventos_clique_lista check (clique_fim_quiz in (
  'quero-conversa', 'chamar-whatsapp', 'tenho-interesse', 'agora-nao'
));

-- O clique só existe no evento do clique, e o evento do clique sempre diz o que foi clicado e
-- de que sessão veio. A pessoa ele já exige pela regra do v2 (tipo fora de visita, início e fim
-- do quiz sempre com id_pessoa).
alter table public.eventos add constraint eventos_clique_so_no_interesse check (
  clique_fim_quiz is null or tipo = 'interesse_pos_relatorio'
);
alter table public.eventos add constraint eventos_interesse_completo check (
  tipo <> 'interesse_pos_relatorio' or (id_sessao is not null and clique_fim_quiz is not null)
);


-- ··························································································
-- 3. Gravação da visita, do início do quiz e do clique no fim do quiz · porta pública (#100)
-- Quem chama: o garçom, com a chave publicável (papel anon), na versão nova dele (etapa 33).
-- SECURITY DEFINER, search_path vazio e todos os nomes com o esquema na frente, como
-- registrar_fim_quiz.
--
-- Recebe { "evento": { ... } }, sem "pessoa": estes eventos não levam dado de pessoa e por isso
-- não pedem aceite (planta v4). Pacote com "pessoa", com campo fora da lista ou com outro tipo
-- é recusado (22023). O fim do quiz continua só por registrar_fim_quiz.
--
-- Campos do evento: tipo, funil, entrega, versao_entrega, utm_source, utm_campaign, id_sessao,
-- ocorrido_em e, só no clique, clique_fim_quiz.
--   · Etiqueta presente e vazia conta como etiqueta; a visita sem etiqueta no link entra com a
--     origem vazia (10.8). Etiqueta que não veio também vira vazio, como em registrar_fim_quiz.
--     Origem fora da lista é recusada pela tabela; quem a esvazia antes é o garçom (5.5).
--   · O par entrega e versão precisa existir no catálogo (chave estrangeira; 18.8).
--   · A sessão é obrigatória (6.2; 18.5).
--
-- Ligação com a pessoa, só pelo fim do quiz da MESMA sessão (6.2):
--   · visita e início do quiz: se o fim do quiz da sessão já chegou (o envio da página pode chegar
--     fora de ordem), o evento já nasce ligado à pessoa; se não, nasce sem pessoa, e
--     registrar_fim_quiz liga depois, como no v2. Se a sessão tiver fins de quiz de duas pessoas
--     diferentes, não escolhe ninguém: nasce sem pessoa.
--   · clique no fim do quiz: só entra se a sessão tiver o fim do quiz de uma pessoa só. Sem fim de
--     quiz na sessão (por exemplo, quem desmarcou a caixa de aceite e não enviou nada, 30.3) ou
--     com duas pessoas, é recusado (caminho conservador; prompts/11-fila-perguntas.md, 32.2).
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
                              'id_sessao', 'ocorrido_em', 'clique_fim_quiz')) then
    raise exception 'campo fora do formato' using errcode = '22023';
  end if;

  if e ->> 'id_sessao' is null then
    raise exception 'evento sem sessao' using errcode = '22023';
  end if;

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
    ocorrido_em, gravado_em, gravado_por,
    clique_fim_quiz
  ) values (
    v_tipo, v_pessoa, e ->> 'id_sessao',
    e ->> 'funil', e ->> 'entrega', (e ->> 'versao_entrega')::integer,
    coalesce(e ->> 'utm_source', ''), coalesce(e ->> 'utm_campaign', ''),
    (e ->> 'ocorrido_em')::timestamptz, pg_catalog.clock_timestamp(), 'garcom',
    e ->> 'clique_fim_quiz'
  );
end;
$$;
comment on function public.registrar_evento(jsonb) is
  'Porta pública do garçom (#100; planta v4). Grava visita, início do quiz e clique no fim do quiz, sem dado de pessoa. Só o papel anon executa.';


-- ··························································································
-- 4. Leads para a planilha do SDR · porta privada do garçom (#100), versão 3
-- Igual ao v2 (quem entra, uma vez por pessoa, cursor, margem de 1 minuto, até 200), com:
--   · respostas_a_confirmar da faixa b com as duas respostas do histórico (15.4, com 21.8):
--     leads-por-mes (a linha "Leads por mês" dos números do quiz; só vem se a pessoa informou os
--     números, e não no modo chute) e crm (a resposta da pergunta do CRM);
--   · coluna nova clique_fim_quiz: o último clique da pessoa no fim do quiz, de qualquer sessão,
--     no momento da leitura (18.4, com 15.16); vazio se não clicou. A linha que já foi para a
--     planilha não é atualizada (21.5): clique feito depois da leitura não chega (32.3).
-- A lista de colunas muda, por isso a função é tirada e criada de novo (não há dado nela).
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
  cursor_gravado_em       timestamptz
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
    en.gravado_em                                        -- cursor_gravado_em
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
  'Porta privada do garçom (#100), v3. Até 200 leads das faixas a e b para a planilha do SDR, depois do cursor, com o histórico da faixa b e o clique no fim do quiz. Só o papel service_role executa.';


-- ··························································································
-- 5. Fechaduras de novo (#99 e #100; nucleo/regras/seguranca.md, regra 2)
-- As mesmas do esquema v2, com a porta nova. Nenhuma permissão padrão: tudo é retirado de
-- PUBLIC, anon, authenticated e service_role, e só as três portas são dadas.
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
--   a chave publicável (anon) grava o fim do quiz e, agora, a visita, o início do quiz e o clique;
--   a chave secreta (service_role) só lê os leads da planilha.
grant execute on function public.registrar_fim_quiz(jsonb) to anon;
grant execute on function public.registrar_evento(jsonb) to anon;
grant execute on function public.leads_para_planilha(timestamptz, uuid, integer) to service_role;

-- Continuam sem existir: a chave da volta do status do SDR, a do painel e a do contador (6.6;
-- planta v4, "Quem grava e quem lê"; log.md, Pendências). Conferência: dados/banco/conferir.sql.

commit;
