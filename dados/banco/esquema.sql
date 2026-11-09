-- Esquema do banco do funil-01 (Postgres, no Supabase)
-- id: banco-rascunho · versao 1 · rascunho · otavio: pendente
-- depende_de: planta-do-banco v2, funil-01 v2, lead-score v2, funil-01-planilha-sdr v1,
--             ficha-de-fatos v3, regra-seguranca v1, lacunas v5
--
-- RASCUNHO. Nunca foi executado em nenhum banco. Ver dados/banco/README.md.
-- Destino dos contatos em conflito (conflito-17, em base/lacunas.md): este esquema segue o
-- lado 2 (banco e planilha da #90), como a planta e o funil-01. Bloqueado para entrega até a decisão.
--
-- Nomes de gaveta e de campo exatamente como em dados/planta/planta.md.
-- Listas fechadas como CHECK: valor fora da lista não entra.
-- Etiquetas obrigatórias como NOT NULL. Vazio ('') só onde a planta diz "vazio se a etiqueta
-- veio fora da lista" (utm, pergunta 5.5).
--
-- Fechaduras (nucleo/regras/seguranca.md):
--   · row level security ligada em todas as tabelas;
--   · nenhuma política para anon nem authenticated: ninguém de fora lê nem grava;
--   · só o papel de serviço (service_role), usado pelo garçom, grava, e só pela função
--     registrar_fim_quiz (proposta, 18.2).

create extension if not exists pgcrypto;  -- gen_random_uuid()


-- ··························································································
-- Gaveta entregas · catálogo das entregas publicadas, espelho do repositório
-- O Otávio grava uma linha a cada versão publicada. Nenhuma versão é apagada.
-- ··························································································
create table entregas (
  id_entrega              text        not null check (id_entrega ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  versao                  integer     not null check (versao >= 1),
  tipo_entrega            text        not null check (tipo_entrega in ('landing', 'quiz', 'email')),
  funil                   text        not null check (funil in ('funil-01')),
  caminho_no_repositorio  text        not null,
  publicada_em            timestamptz not null,
  retirada_em             timestamptz,          -- vazio enquanto está no ar
  primary key (id_entrega, versao)
);
comment on table entregas is 'Catálogo das entregas publicadas (planta, gaveta entregas). Sem dado pessoal.';


-- ··························································································
-- Gaveta pessoas · uma linha por lead
-- Nasce no fim do quiz, com o contato e o consentimento.
-- Os campos de primeira visita nunca são reescritos.
-- Estágio e estado atuais não moram aqui: saem do último evento de status.
-- ··························································································
create table pessoas (
  id_pessoa                  uuid        primary key default gen_random_uuid(),
  nome                       text        not null check (length(btrim(nome)) between 2 and 120),
  telefone                   text        not null check (telefone ~ '^\+[0-9 ()-]{8,30}$'),
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
comment on table pessoas is 'Um lead por linha (planta, gaveta pessoas). DADO PESSOAL: só no banco e na planilha do SDR.';

-- Para o banco reconhecer quem refaz o quiz pelo telefone ou pelo e-mail (planta, 6.3)
create index pessoas_telefone_digitos on pessoas ((regexp_replace(telefone, '[^0-9]', '', 'g')));
create index pessoas_email_minusculo  on pessoas ((lower(email)));


-- ··························································································
-- Gaveta eventos · uma linha por acontecimento
-- Nunca é apagada nem reescrita; uma correção é um evento novo.
-- Única mudança permitida: ligar à pessoa, no fim do quiz, a visita e o início do quiz
-- da mesma sessão (id_pessoa de vazio para preenchido; planta, 6.2).
-- ··························································································
create table eventos (
  id_evento          uuid        primary key default gen_random_uuid(),
  tipo               text        not null check (tipo in (
                       'visita', 'inicio_quiz', 'fim_quiz',
                       'contato_sdr', 'mudanca_status', 'reuniao_marcada', 'reuniao_realizada',
                       'venda', 'perda'
                       -- PROPOSTA, não ligada (14.15; 16.13; 18.4): 'interesse_pos_relatorio'
                     )),
  id_pessoa          uuid        references pessoas (id_pessoa),
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

  -- o par entrega e versão precisa existir no catálogo (planta, 6.6)
  foreign key (entrega, versao_entrega) references entregas (id_entrega, versao),

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
comment on table eventos is 'Um acontecimento por linha (planta, gaveta eventos). DADO PESSOAL nas respostas e na ligação com a pessoa.';

create index eventos_por_pessoa on eventos (id_pessoa);
create index eventos_por_sessao on eventos (id_sessao);
create index eventos_por_tipo   on eventos (tipo, ocorrido_em);

-- Trava: evento não é apagado nem reescrito
create function eventos_imutaveis() returns trigger
language plpgsql as $$
begin
  if tg_op = 'DELETE' then
    raise exception 'evento nao se apaga; uma correcao e um evento novo';
  end if;
  -- só deixa passar a ligação da pessoa, de vazio para preenchido, sem mudar mais nada
  if old.id_pessoa is null and new.id_pessoa is not null
     and (to_jsonb(new) - 'id_pessoa') = (to_jsonb(old) - 'id_pessoa') then
    return new;
  end if;
  raise exception 'evento nao se reescreve; uma correcao e um evento novo';
end;
$$;

create trigger eventos_sem_mudanca
  before update or delete on eventos
  for each row execute function eventos_imutaveis();


-- ··························································································
-- Gaveta investimento · FORA DO MVP enquanto a Meta estiver fora (conexoes.md)
-- Desenhada para não mudar a planta depois. Nenhuma chave grava nem lê esta tabela até lá.
-- ··························································································
create table investimento (
  dia              date          not null,
  utm_source       text          not null check (utm_source in ('meta-ads')),  -- reservada, fora do MVP
  utm_campaign     text          not null check (utm_campaign in ('funil-01')),
  valor_investido  numeric(12,2) not null check (valor_investido >= 0),
  impressoes       integer       not null check (impressoes >= 0),
  cliques          integer       not null check (cliques >= 0),
  importado_em     timestamptz   not null default now(),
  primary key (dia, utm_source, utm_campaign)
);
comment on table investimento is 'FORA DO MVP. Gasto por canal e campanha (planta, gaveta investimento). Sem dado pessoal.';


-- ··························································································
-- Gravação do fim do quiz · o único caminho do garçom até o banco (proposta, 18.2)
-- Recebe o pacote do quiz (montarPacote, em entregas/quizzes/quiz-01/pagina/index.html).
-- Reconhece a pessoa pelo telefone ou pelo e-mail sem o garçom ler nada (planta, 6.3),
-- liga a visita e o início do quiz da mesma sessão (6.2) e grava o evento fim_quiz.
-- As listas fechadas, o catálogo e as etiquetas são conferidos de novo pelas restrições acima.
-- ··························································································
create function registrar_fim_quiz(pacote jsonb) returns void
language plpgsql
set search_path = public
as $$
declare
  p          jsonb := pacote -> 'pessoa';
  e          jsonb := pacote -> 'evento';
  v_pessoa   uuid;
  v_primeira timestamptz;
begin
  if p is null or e is null or e ->> 'tipo' is distinct from 'fim_quiz' then
    raise exception 'pacote fora do formato' using errcode = '22023';
  end if;

  -- quem já está no banco não vira outra pessoa
  select id_pessoa into v_pessoa
    from pessoas
   where regexp_replace(telefone, '[^0-9]', '', 'g') = regexp_replace(p ->> 'telefone', '[^0-9]', '', 'g')
      or lower(email) = lower(p ->> 'email')
   order by criado_em
   limit 1;

  if v_pessoa is null then
    select min(ocorrido_em) into v_primeira
      from eventos
     where id_sessao = e ->> 'id_sessao' and tipo = 'visita';

    insert into pessoas (
      nome, telefone, email, empresa,
      consentimento_whatsapp, consentimento_email, consentimento_texto, consentimento_em,
      primeira_utm_source, primeira_utm_campaign, primeira_visita_em
    ) values (
      btrim(p ->> 'nome'), p ->> 'telefone', btrim(p ->> 'email'), coalesce(p ->> 'empresa', ''),
      p ->> 'consentimento_whatsapp', p ->> 'consentimento_email',
      p ->> 'consentimento_texto', (p ->> 'consentimento_em')::timestamptz,
      coalesce(p ->> 'primeira_utm_source', ''), coalesce(p ->> 'primeira_utm_campaign', ''), v_primeira
    )
    returning id_pessoa into v_pessoa;
  end if;
  -- Pessoa repetida: a linha dela não muda, nem o consentimento (proposta conservadora, 18.6).

  update eventos
     set id_pessoa = v_pessoa
   where id_sessao = e ->> 'id_sessao' and id_pessoa is null;

  insert into eventos (
    tipo, id_pessoa, id_sessao,
    funil, entrega, versao_entrega, utm_source, utm_campaign,
    ocorrido_em, gravado_por,
    respostas, lead_score_nota, lead_score_faixa, lead_score_versao
  ) values (
    'fim_quiz', v_pessoa, e ->> 'id_sessao',
    e ->> 'funil', e ->> 'entrega', (e ->> 'versao_entrega')::integer,
    coalesce(e ->> 'utm_source', ''), coalesce(e ->> 'utm_campaign', ''),
    (e ->> 'ocorrido_em')::timestamptz, 'garcom',
    e -> 'respostas', (e ->> 'lead_score_nota')::integer, e ->> 'lead_score_faixa',
    (e ->> 'lead_score_versao')::integer
  );
end;
$$;


-- ··························································································
-- Painel · só números agregados, sem nome, telefone, e-mail, respostas nem id_pessoa
-- (planta, "O que sai do banco"; nucleo/regras/seguranca.md, regra 4)
-- security_invoker: a visão respeita as fechaduras de quem lê.
-- ··························································································
create view painel_numeros with (security_invoker = true) as
  -- quantas pessoas terminaram o quiz, por mês, entrega e versão, origem e faixa
  select date_trunc('month', ocorrido_em)::date as mes,
         'fim_quiz'::text                        as indicador,
         funil, entrega, versao_entrega, utm_source, utm_campaign,
         lead_score_faixa,
         count(distinct id_pessoa)               as quantidade
    from eventos
   where tipo = 'fim_quiz'
   group by 1, 2, 3, 4, 5, 6, 7, 8
  union all
  -- quantas pessoas chegaram a cada estágio no mês (captado, pre-qualificado, agendado, realizado, venda)
  select date_trunc('month', ocorrido_em)::date,
         'estagio:' || estagio,
         funil, entrega, versao_entrega, utm_source, utm_campaign,
         null::text,
         count(distinct id_pessoa)
    from eventos
   where estagio is not null
   group by 1, 2, 3, 4, 5, 6, 7
  union all
  -- quantas perdas no mês
  select date_trunc('month', ocorrido_em)::date,
         'perda',
         funil, entrega, versao_entrega, utm_source, utm_campaign,
         null::text,
         count(distinct id_pessoa)
    from eventos
   where tipo = 'perda'
   group by 1, 2, 3, 4, 5, 6, 7;
comment on view painel_numeros is 'Números agregados para o painel. Sem dado pessoal. As metas por etapa estão em ficha-de-fatos#metas-por-etapa.';


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
-- ··························································································
create view contagem_analises_gratuitas with (security_invoker = true) as
  select count(distinct id_pessoa) as usadas
    from eventos
   where tipo = 'fim_quiz';
comment on view contagem_analises_gratuitas is 'Só o número de análises gratuitas usadas. Regra de 5.7 em aberto.';


-- ··························································································
-- Fechaduras
-- ··························································································

-- 1. Row level security ligada em todas as tabelas, sem nenhuma política:
--    anon e authenticated não leem nem gravam nada. O service_role ignora a RLS no Supabase.
alter table entregas     enable row level security;
alter table pessoas      enable row level security;
alter table eventos      enable row level security;
alter table investimento enable row level security;

-- 2. Nenhuma permissão para quem vem de fora (o Supabase dá permissões padrão a anon e
--    authenticated no esquema public; aqui elas são retiradas, por garantia, além da RLS).
revoke all on table entregas, pessoas, eventos, investimento from public, anon, authenticated;
revoke all on table painel_numeros, contagem_analises_gratuitas from public, anon, authenticated;
revoke all on function registrar_fim_quiz(jsonb) from public, anon, authenticated;
revoke all on function eventos_imutaveis() from public, anon, authenticated;

-- 3. O garçom, com o papel de serviço, só chama a função de gravação.
grant execute on function registrar_fim_quiz(jsonb) to service_role;

-- 4. As outras chaves da planta (leitura da planilha, volta do status, painel, contador)
--    ainda não existem. Cada uma vira um papel próprio, com permissão mínima, quando for
--    criada e registrada em conexoes.md (planta, "Quem grava e quem lê"; 18.3). Até lá,
--    as visões painel_numeros e contagem_analises_gratuitas não têm leitor além do Otávio.

-- ··························································································
-- PROPOSTA, não ligada (14.15; 16.13; 18.4): evento do clique em "Tenho interesse"
-- Só entra com decisão do Otávio e uma versão nova da planta. Seria assim:
--
--   alter table eventos drop constraint eventos_tipo_check;
--   alter table eventos add constraint eventos_tipo_check check (tipo in (
--     'visita', 'inicio_quiz', 'fim_quiz', 'interesse_pos_relatorio',
--     'contato_sdr', 'mudanca_status', 'reuniao_marcada', 'reuniao_realizada', 'venda', 'perda'));
--
-- e o check de "quem grava cada tipo" ganharia 'interesse_pos_relatorio' entre os do garçom.
-- ··························································································
