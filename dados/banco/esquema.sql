-- Esquema do banco do funil-01 (Postgres, no Supabase)
-- id: banco-rascunho · versao 2 · rascunho · otavio: pendente
-- depende_de: planta-do-banco v3, decisoes v4, funil-01 v2, lead-score v2, funil-01-planilha-sdr v1,
--             ficha-de-fatos v3, regra-seguranca v2, lacunas v5
--
-- RASCUNHO. Ver dados/banco/README.md. Nada daqui está no ar, e nenhum dado é real.
-- Destino dos contatos em conflito (conflito-17, em base/lacunas.md): este esquema segue o
-- lado 2 (banco e planilha da #90), como a planta e o funil-01. Bloqueado para entrega até a decisão.
--
-- O que mudou da versão 1 para a 2 (decisões #99 e #100, em base/decisoes.md):
--   · #99: o projeto sistema-de-vendas-safra foi criado com "Automatically expose new tables"
--     desligado. O esquema não conta com nenhuma permissão padrão: tudo é revogado de PUBLIC,
--     anon, authenticated e service_role, inclusive EXECUTE de função, e concedido só o que precisa.
--   · #100: duas chaves, uma para cada porta do garçom.
--       anon (chave publicável) só executa registrar_fim_quiz;
--       service_role (chave secreta) só executa leads_para_planilha.
--     As duas funções são SECURITY DEFINER, com search_path vazio e todos os nomes qualificados.
--     Visões do painel sem security_invoker, com SELECT revogado de todo mundo.
--     Índice único no telefone (só os dígitos) e no e-mail (em minúsculas); a gravação aguenta
--     dois envios ao mesmo tempo da mesma pessoa sem criar duas linhas e sem perder o evento.
--   · Função nova leads_para_planilha: entrega à planilha do SDR até 200 leads por vez, em ordem,
--     a partir de um cursor.
--   · Sem pgcrypto: gen_random_uuid() já vem no Postgres (13 em diante).
--
-- COMO RODAR: colar este arquivo inteiro no editor SQL do Supabase e rodar de uma vez.
-- Pode rodar de novo sem erro. Cuidado: rodar de novo NÃO muda tabela que já existe
-- (create table if not exists pula a tabela); funções, visões, gatilho, índices e permissões
-- são refeitos. Mudança de coluna ou de restrição numa versão futura precisa de alter table próprio.
-- Mexe só no esquema public; foi escrito para o projeto vazio do Safra (#99).
--
-- Nomes de gaveta e de campo exatamente como em dados/planta/planta.md.
-- Listas fechadas como CHECK: valor fora da lista não entra.
-- Etiquetas obrigatórias como NOT NULL. Vazio ('') só onde a planta diz "vazio se a etiqueta
-- veio fora da lista" (utm, pergunta 5.5).


-- ··························································································
-- Gaveta entregas · catálogo das entregas publicadas, espelho do repositório
-- O Otávio grava uma linha a cada versão publicada. Nenhuma versão é apagada.
-- ··························································································
create table if not exists public.entregas (
  id_entrega              text        not null check (id_entrega ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  versao                  integer     not null check (versao >= 1),
  tipo_entrega            text        not null check (tipo_entrega in ('landing', 'quiz', 'email')),
  funil                   text        not null check (funil in ('funil-01')),
  caminho_no_repositorio  text        not null,
  publicada_em            timestamptz not null,
  retirada_em             timestamptz,          -- vazio enquanto está no ar
  primary key (id_entrega, versao)
);
comment on table public.entregas is 'Catálogo das entregas publicadas (planta, gaveta entregas). Sem dado pessoal.';


-- ··························································································
-- Gaveta pessoas · uma linha por lead
-- Nasce no fim do quiz, com o contato e o consentimento.
-- Os campos de primeira visita nunca são reescritos.
-- Estágio e estado atuais não moram aqui: saem do último evento de status.
-- ··························································································
create table if not exists public.pessoas (
  id_pessoa                  uuid        primary key default gen_random_uuid(),
  nome                       text        not null check (length(btrim(nome)) between 2 and 120),
  -- telefone com o código do país e de 8 a 15 dígitos: sem dígito suficiente, não entra
  -- (senão dois telefones só com sinais virariam a mesma pessoa no índice único)
  telefone                   text        not null check (telefone ~ '^\+[0-9 ()-]{8,30}$'
                             and pg_catalog.length(pg_catalog.regexp_replace(telefone, '[^0-9]', '', 'g')) between 8 and 15),
  email                      text        not null check (email ~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' and length(email) <= 254),
  empresa                    text        not null default '' check (length(empresa) <= 160),
  consentimento_whatsapp     text        not null check (consentimento_whatsapp in ('sim', 'nao')),
  consentimento_email        text        not null check (consentimento_email in ('sim', 'nao')),
  consentimento_texto        text        not null check (length(btrim(consentimento_texto)) > 0),
  consentimento_em           timestamptz not null,
  consentimento_retirado_em  timestamptz,           -- vazio enquanto não retirar
  -- origem da primeira visita (tabela de origens do funil-01); '' se veio fora da lista (5.5)
  primeira_utm_source        text        not null default ''
                             check (primeira_utm_source in ('stories', 'bio', 'reels', 'email', 'whatsapp', '')),
  primeira_utm_campaign      text        not null default ''
                             check (primeira_utm_campaign in ('funil-01', '')),
  primeira_visita_em         timestamptz,           -- da visita da mesma sessão, se houver (18.5)
  criado_em                  timestamptz not null default now(),
  -- sem pelo menos um canal aceito, a pessoa não entra
  check (consentimento_whatsapp = 'sim' or consentimento_email = 'sim')
);
comment on table public.pessoas is 'Um lead por linha (planta, gaveta pessoas). DADO PESSOAL: só no banco e na planilha do SDR.';

-- Uma pessoa por telefone e uma por e-mail (#100; planta, 6.3).
-- O telefone é comparado só pelos dígitos; o e-mail, em minúsculas. A função de gravação usa
-- exatamente as mesmas duas expressões. Os dois índices são parciais, como a #100 manda: a
-- condição só deixa de fora o valor vazio, que as restrições da tabela já não deixam entrar (21.1).
-- Rodar de novo não troca um índice que já existe com o mesmo nome. Os nomes antigos da versão 1 (índices comuns, que
-- nunca chegaram a rodar) são retirados, se existirem.
drop index if exists public.pessoas_telefone_digitos;
drop index if exists public.pessoas_email_minusculo;
create unique index if not exists pessoas_telefone_unico
  on public.pessoas ((pg_catalog.regexp_replace(telefone, '[^0-9]', '', 'g')))
  where pg_catalog.regexp_replace(telefone, '[^0-9]', '', 'g') <> '';
create unique index if not exists pessoas_email_unico
  on public.pessoas ((pg_catalog.lower(email)))
  where pg_catalog.lower(email) <> '';


-- ··························································································
-- Gaveta eventos · uma linha por acontecimento
-- Nunca é apagada nem reescrita; uma correção é um evento novo.
-- Única mudança permitida: ligar à pessoa, no fim do quiz, a visita e o início do quiz
-- da mesma sessão (id_pessoa de vazio para preenchido; planta, 6.2).
-- ··························································································
create table if not exists public.eventos (
  id_evento          uuid        primary key default gen_random_uuid(),
  tipo               text        not null check (tipo in (
                       'visita', 'inicio_quiz', 'fim_quiz',
                       'contato_sdr', 'mudanca_status', 'reuniao_marcada', 'reuniao_realizada',
                       'venda', 'perda'
                       -- PROPOSTA, não ligada (14.15; 16.13; 18.4): 'interesse_pos_relatorio'
                     )),
  id_pessoa          uuid        references public.pessoas (id_pessoa),
  id_sessao          text        check (id_sessao ~ '^sessao-[a-z0-9-]{1,60}$'),

  -- as cinco etiquetas obrigatórias em todo evento
  funil              text        not null check (funil in ('funil-01')),
  entrega            text        not null,
  versao_entrega     integer     not null,
  utm_source         text        not null default ''
                     check (utm_source in ('stories', 'bio', 'reels', 'email', 'whatsapp', '')),
  utm_campaign       text        not null default ''
                     check (utm_campaign in ('funil-01', '')),

  ocorrido_em        timestamptz not null,
  gravado_em         timestamptz not null default now(),
  gravado_por        text        not null check (gravado_por in ('garcom', 'volta-do-status')),

  -- fim_quiz
  respostas          jsonb       check (respostas is null or jsonb_typeof(respostas) = 'object'),
  lead_score_nota    integer     check (lead_score_nota between 0 and 100),
  lead_score_faixa   text        check (lead_score_faixa in ('a', 'b', 'c', 'eliminatorio')),
  lead_score_versao  integer     check (lead_score_versao >= 1),

  -- eventos do SDR (funil-01, "Status do SDR"; sem acento no banco)
  estagio            text        check (estagio in ('captado', 'pre-qualificado', 'agendado', 'realizado', 'venda')),
  estado             text        check (estado in ('conversando', 'tentativa', 'abandonado', 'stand-by', 'perdido')),
                                 -- 'nutricao' fica reservada até a decisão de 5.3
  data_volta         date,
  canal              text        check (canal in ('telefone', 'whatsapp')),
  reuniao_em         timestamptz,
  produto            text        check (produto is null),
                                 -- PROPOSTA de 5.3 (iasv ou essencial), fora da lista fechada:
                                 -- a coluna existe e fica vazia até a decisão

  -- o par entrega e versão precisa existir no catálogo; quem confere é o banco (planta, 6.6; 18.8)
  foreign key (entrega, versao_entrega) references public.entregas (id_entrega, versao),

  -- quem grava cada tipo (planta, "Tipos de evento")
  check (
    (tipo in ('visita', 'inicio_quiz', 'fim_quiz') and gravado_por = 'garcom')
    or (tipo not in ('visita', 'inicio_quiz', 'fim_quiz') and gravado_por = 'volta-do-status')
  ),
  -- visita e início do quiz nascem só com a sessão
  check (tipo not in ('visita', 'inicio_quiz') or id_sessao is not null),
  -- o fim do quiz leva pessoa, sessão, respostas e o lead score inteiro
  check (tipo <> 'fim_quiz' or (
    id_pessoa is not null and id_sessao is not null and respostas is not null
    and lead_score_nota is not null and lead_score_faixa is not null and lead_score_versao is not null
  )),
  -- eventos do SDR sempre ligados a uma pessoa
  check (tipo in ('visita', 'inicio_quiz', 'fim_quiz') or id_pessoa is not null),
  -- stand-by sempre com data de volta
  check (estado is distinct from 'stand-by' or data_volta is not null),
  -- venda leva o estágio venda; perda leva o estado perdido (planta, 6.5)
  check (tipo <> 'venda' or estagio = 'venda'),
  check (tipo <> 'perda' or estado = 'perdido'),
  -- contato do SDR diz o canal; reunião marcada diz quando
  check (tipo <> 'contato_sdr' or canal is not null),
  check (tipo <> 'reuniao_marcada' or reuniao_em is not null)
);
comment on table public.eventos is 'Um acontecimento por linha (planta, gaveta eventos). DADO PESSOAL nas respostas e na ligação com a pessoa.';

create index if not exists eventos_por_pessoa on public.eventos (id_pessoa);
create index if not exists eventos_por_sessao on public.eventos (id_sessao);
create index if not exists eventos_por_tipo   on public.eventos (tipo, ocorrido_em);
-- para a planilha achar depressa os fins de quiz em ordem de gravação
create index if not exists eventos_fim_quiz_por_gravacao
  on public.eventos (gravado_em, id_pessoa) where tipo = 'fim_quiz';

-- Trava: evento não é apagado nem reescrito
create or replace function public.eventos_imutaveis() returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'DELETE' then
    raise exception 'evento nao se apaga; uma correcao e um evento novo';
  end if;
  -- só deixa passar a ligação da pessoa, de vazio para preenchido, sem mudar mais nada
  if old.id_pessoa is null and new.id_pessoa is not null
     and (pg_catalog.to_jsonb(new) - 'id_pessoa') = (pg_catalog.to_jsonb(old) - 'id_pessoa') then
    return new;
  end if;
  raise exception 'evento nao se reescreve; uma correcao e um evento novo';
end;
$$;

drop trigger if exists eventos_sem_mudanca on public.eventos;
create trigger eventos_sem_mudanca
  before update or delete on public.eventos
  for each row execute function public.eventos_imutaveis();


-- ··························································································
-- Gaveta investimento · FORA DO MVP enquanto a Meta estiver fora (conexoes.md)
-- Desenhada para não mudar a planta depois. Nenhuma chave grava nem lê esta tabela até lá.
-- ··························································································
create table if not exists public.investimento (
  dia              date          not null,
  utm_source       text          not null check (utm_source in ('meta-ads')),  -- reservada, fora do MVP
  utm_campaign     text          not null check (utm_campaign in ('funil-01')),
  valor_investido  numeric(12,2) not null check (valor_investido >= 0),
  impressoes       integer       not null check (impressoes >= 0),
  cliques          integer       not null check (cliques >= 0),
  importado_em     timestamptz   not null default now(),
  primary key (dia, utm_source, utm_campaign)
);
comment on table public.investimento is 'FORA DO MVP. Gasto por canal e campanha (planta, gaveta investimento). Sem dado pessoal.';


-- ··························································································
-- Gravação do fim do quiz · porta pública do garçom (#100)
-- Quem chama: o garçom, com a chave publicável (papel anon). É a única coisa que anon pode fazer.
-- Roda com os direitos do dono das tabelas (SECURITY DEFINER), com search_path vazio:
-- todo nome é escrito com o esquema na frente, para ninguém trocar uma tabela ou função por outra.
--
-- Recebe o pacote do quiz (montarPacote, em entregas/quizzes/quiz-01/pagina/index.html).
-- Reconhece a pessoa pelo telefone (só os dígitos) ou pelo e-mail (em minúsculas), sem o garçom
-- ler nada (planta, 6.3), liga a visita e o início do quiz da mesma sessão (6.2) e grava o
-- evento fim_quiz. As listas fechadas, o catálogo e as etiquetas são conferidos de novo pelas
-- restrições das tabelas.
--
-- Dois envios ao mesmo tempo da mesma pessoa: os índices únicos não deixam nascer duas linhas.
-- O segundo envio, em vez de errar, espera o primeiro terminar, acha a linha que ele criou e
-- grava o próprio evento ligado a ela. Nenhum evento se perde.
--
-- Telefone de uma pessoa e e-mail de outra (duas linhas diferentes): o pacote é recusado,
-- sem juntar nem escolher ninguém (caminho conservador; prompts/08-fila-perguntas.md, 21.2).
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
    ocorrido_em, gravado_em, gravado_por,
    respostas, lead_score_nota, lead_score_faixa, lead_score_versao
  ) values (
    'fim_quiz', v_pessoa, e ->> 'id_sessao',
    e ->> 'funil', e ->> 'entrega', (e ->> 'versao_entrega')::integer,
    coalesce(e ->> 'utm_source', ''), coalesce(e ->> 'utm_campaign', ''),
    -- gravado_em pela hora do relógio, não pela hora em que o pedido começou:
    -- fica mais perto do fim da gravação, o que ajuda o cursor da planilha (21.6)
    (e ->> 'ocorrido_em')::timestamptz, pg_catalog.clock_timestamp(), 'garcom',
    e -> 'respostas', (e ->> 'lead_score_nota')::integer, e ->> 'lead_score_faixa',
    (e ->> 'lead_score_versao')::integer
  );
end;
$$;
comment on function public.registrar_fim_quiz(jsonb) is
  'Porta pública do garçom (#100). Grava o fim do quiz. Só o papel anon executa.';


-- ··························································································
-- Leads para a planilha do SDR · porta privada do garçom (#100)
-- Quem chama: o garçom, na porta privada, com a chave secreta (papel service_role), quando a
-- planilha pede os leads novos. É a única coisa que service_role pode fazer neste esquema.
-- SECURITY DEFINER, search_path vazio e nomes qualificados, como a gravação.
--
-- Quem entra (funis/funil-01/planilha-sdr.md; lead-score, "Faixas" e "Eliminatórios"):
--   · só faixas a e b; nunca c nem eliminatorio;
--   · só quem não retirou o consentimento;
--   · só quem aceitou WhatsApp. A base não diz se quem aceitou só e-mail entra; fica o caminho
--     em que menos gente é contatada (prompts/08-fila-perguntas.md, 21.4).
--
-- Cada pessoa entra uma vez só, pelo PRIMEIRO fim_quiz dela em faixa a ou b (o "fim de quiz de
-- entrada"). Quem refaz o quiz não aparece de novo, e a linha que já foi não é atualizada (21.5).
--
-- O cursor é o par (gravado_em do fim de quiz de entrada, id_pessoa). A função devolve, em ordem
-- crescente desse par, só quem vem DEPOIS do par recebido. Como cada pessoa aparece uma vez,
-- o par não se repete: quem foi gravado no mesmo instante é desempatado pelo id_pessoa, sem
-- perder nem repetir ninguém. Para pedir a página seguinte, mande o cursor_gravado_em e o
-- id_pessoa da ÚLTIMA linha recebida, exatamente como vieram (o gravado_em tem microssegundos;
-- arredondar para milissegundos faz a última linha voltar repetida). Na primeira vez, mande vazio.
--
-- Margem de 1 minuto: só aparecem fins de quiz gravados há mais de 1 minuto. Assim, uma
-- gravação que começou antes e terminou depois de uma leitura não fica para trás do cursor (21.6).
--
-- No máximo 200 linhas por pedido, mesmo que se peça mais.
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
    -- só na faixa b, e só o que tem pergunta no quiz: valor da venda e vendedores (time).
    -- O "histórico" não está escrito (15.4) e não vai (21.8).
    case when en.lead_score_faixa = 'b' then
      pg_catalog.jsonb_strip_nulls(pg_catalog.jsonb_build_object(
        'valor-medio', en.respostas -> 'valor-medio',
        'vendedores',  en.respostas -> 'vendedores'))
    end,
    en.gravado_em,                                       -- entrou_em: relógio do servidor (15.3; 21.7; 21.16)
    (select pg_catalog.count(*)::integer
       from public.eventos c
      where c.id_pessoa = pe.id_pessoa and c.tipo = 'contato_sdr'),   -- tentativas_feitas (15.3; 21.7)
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
  'Porta privada do garçom (#100). Até 200 leads das faixas a e b para a planilha do SDR, depois do cursor. Só o papel service_role executa.';


-- ··························································································
-- Painel · só números agregados, sem nome, telefone, e-mail, respostas nem id_pessoa
-- (planta, "O que sai do banco"; nucleo/regras/seguranca.md, regra 4)
-- Sem security_invoker (#100): a visão lê com os direitos do dono, para um papel futuro do
-- painel poder ler só a visão, sem ler a tabela de eventos. Até esse papel existir (18.3),
-- ninguém tem SELECT na visão (ver "Fechaduras"). O linter do Supabase avisa "security definer
-- view": é de propósito (21.13).
-- ··························································································
create or replace view public.painel_numeros with (security_invoker = false) as
  -- quantas pessoas terminaram o quiz, por mês, entrega e versão, origem e faixa
  select pg_catalog.date_trunc('month', ocorrido_em)::date as mes,
         'fim_quiz'::text                        as indicador,
         funil, entrega, versao_entrega, utm_source, utm_campaign,
         lead_score_faixa,
         pg_catalog.count(distinct id_pessoa)    as quantidade
    from public.eventos
   where tipo = 'fim_quiz'
   group by 1, 2, 3, 4, 5, 6, 7, 8
  union all
  -- quantas pessoas chegaram a cada estágio no mês (captado, pre-qualificado, agendado, realizado, venda)
  select pg_catalog.date_trunc('month', ocorrido_em)::date,
         'estagio:' || estagio,
         funil, entrega, versao_entrega, utm_source, utm_campaign,
         null::text,
         pg_catalog.count(distinct id_pessoa)
    from public.eventos
   where estagio is not null
   group by 1, 2, 3, 4, 5, 6, 7
  union all
  -- quantas perdas no mês
  select pg_catalog.date_trunc('month', ocorrido_em)::date,
         'perda',
         funil, entrega, versao_entrega, utm_source, utm_campaign,
         null::text,
         pg_catalog.count(distinct id_pessoa)
    from public.eventos
   where tipo = 'perda'
   group by 1, 2, 3, 4, 5, 6, 7;
comment on view public.painel_numeros is 'Números agregados para o painel. Sem dado pessoal. As metas por etapa estão em ficha-de-fatos#metas-por-etapa.';


-- ··························································································
-- Contagem das análises gratuitas usadas (planta, "Contagem das análises gratuitas")
-- O número de análises gratuitas está em ficha-de-fatos#analises-gratuitas, e a regra de
-- quando o contador aparece, em ficha-de-fatos#barra-de-resgates (#93). Nenhum dos dois
-- números é escrito aqui: a visão só conta, e quem compara com a ficha é o contador.
-- Não há campo guardado com a contagem; ela é refeita a cada leitura, a partir dos eventos.
-- O que conta como usada NÃO está decidido (5.7). Esta conta segue a recomendação de 5.7:
-- uma por pessoa que terminou o quiz, inclusive eliminatórios e faixa C, sem contar de novo
-- quem refaz o quiz. Se a 5.7 decidir outra regra, só esta visão muda (6.7).
-- Até a decisão de 5.7, o contador não vai ao ar (6.7).
-- Sem security_invoker e sem leitor, como o painel (#100).
-- ··························································································
create or replace view public.contagem_analises_gratuitas with (security_invoker = false) as
  select pg_catalog.count(distinct id_pessoa) as usadas
    from public.eventos
   where tipo = 'fim_quiz';
comment on view public.contagem_analises_gratuitas is 'Só o número de análises gratuitas usadas. Regra de 5.7 em aberto.';


-- ··························································································
-- Fechaduras (#99 e #100; nucleo/regras/seguranca.md, regra 2)
-- ··························································································

-- 1. Row level security ligada em todas as tabelas, sem nenhuma política.
--    Quem vem de fora (anon, authenticated) fica trancado. Sem FORCE: o dono das tabelas, que
--    é quem as duas funções usam, passa pela fechadura; ninguém mais.
alter table public.entregas     enable row level security;
alter table public.pessoas      enable row level security;
alter table public.eventos      enable row level security;
alter table public.investimento enable row level security;

-- 2. Nenhuma permissão para ninguém além do dono, em nada deste esquema: tabelas, visões,
--    sequências e funções. Inclui PUBLIC (todo mundo), porque o Postgres dá EXECUTE de função
--    a PUBLIC por padrão. Inclui service_role, que a casa só usa para a função da planilha.
revoke all on all tables    in schema public from public, anon, authenticated, service_role;
revoke all on all sequences in schema public from public, anon, authenticated, service_role;
revoke all on all functions in schema public from public, anon, authenticated, service_role;

-- 3. O mesmo para o que for criado depois neste esquema pelo papel que roda este arquivo
--    (no editor SQL do Supabase, o papel postgres). A primeira linha tira o EXECUTE que o
--    Postgres dá a PUBLIC em toda função nova; as outras tiram o que o Supabase daria aos seus
--    papéis. Objeto criado por outro papel não é coberto por estas linhas (21.12).
alter default privileges revoke execute on functions from public;
alter default privileges in schema public revoke all on tables    from public, anon, authenticated, service_role;
alter default privileges in schema public revoke all on sequences from public, anon, authenticated, service_role;
alter default privileges in schema public revoke all on functions from public, anon, authenticated, service_role;

-- 4. As duas únicas portas abertas (#100):
--    a chave publicável (anon) só grava o fim do quiz;
--    a chave secreta (service_role) só lê os leads da planilha.
grant execute on function public.registrar_fim_quiz(jsonb) to anon;
grant execute on function public.leads_para_planilha(timestamptz, uuid, integer) to service_role;

-- 5. Ainda não existem: a chave da volta do status do SDR, a do painel e a do contador.
--    Cada uma vira um papel próprio, com permissão mínima, quando for criada e registrada em
--    conexoes.md (planta, "Quem grava e quem lê"; 18.3). Até lá, as visões painel_numeros e
--    contagem_analises_gratuitas não têm leitor além do Otávio, pelo painel do Supabase.
--    Conferência de tudo isto: dados/banco/conferir.sql.

-- ··························································································
-- PROPOSTA, não ligada (14.15; 16.13; 18.4): evento do clique em "Tenho interesse"
-- Só entra com decisão do Otávio e uma versão nova da planta. Seria assim:
--
--   alter table public.eventos drop constraint eventos_tipo_check;
--   alter table public.eventos add constraint eventos_tipo_check check (tipo in (
--     'visita', 'inicio_quiz', 'fim_quiz', 'interesse_pos_relatorio',
--     'contato_sdr', 'mudanca_status', 'reuniao_marcada', 'reuniao_realizada', 'venda', 'perda'));
--
-- e o check de "quem grava cada tipo" ganharia 'interesse_pos_relatorio' entre os do garçom.
-- ··························································································
