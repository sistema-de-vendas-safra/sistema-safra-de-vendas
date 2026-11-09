-- Conferência do banco do funil-01, depois de rodar esquema.sql (Postgres, no Supabase)
-- id: banco-conferir · versao 1 · rascunho · otavio: pendente
-- depende_de: banco-rascunho v2, decisoes v4
--
-- SÓ LEITURA. Nada aqui grava, muda ou apaga: só olha o catálogo do banco (quais tabelas,
-- índices, funções e permissões existem). Pode rodar quantas vezes quiser.
--
-- COMO USAR: colar este arquivo inteiro no editor SQL do Supabase e rodar. É uma consulta só,
-- porque o editor mostra só o resultado da última. Sai uma tabela com uma linha por conferência:
--   conferencia  · o que está sendo conferido
--   esperado     · o que deveria aparecer, em português de gente
--   encontrado   · o que o banco tem de fato
--   ok           · true quando o encontrado bate com o esperado
-- A última linha, "tudo certo", só dá true se todas as outras derem true.
-- Se alguma der false: não use as chaves, anote qual linha e o encontrado, e rode
-- esquema.sql de novo antes de seguir (dados/banco/README.md, "Como conferir").
--
-- Rode como o papel postgres (o padrão do editor SQL). A conferência 13 olha as permissões
-- padrão desse papel.

with
-- nomes que o esquema cria (dados/banco/esquema.sql, versão 2)
tabelas(nome) as (values ('entregas'), ('pessoas'), ('eventos'), ('investimento')),
funcoes(nome) as (values ('registrar_fim_quiz'), ('leads_para_planilha')),

-- tudo o que existe no esquema public: tabelas, visões, sequências e funções
objetos as (
  select 'tabela ' || c.relname as objeto, c.oid, c.relkind::text as tipo,
         coalesce(c.relacl, pg_catalog.acldefault(case when c.relkind = 'S' then 's' else 'r' end::"char", c.relowner)) as acl
    from pg_catalog.pg_class c
   where c.relnamespace = 'public'::regnamespace and c.relkind in ('r', 'p', 'v', 'm', 'f', 'S')
  union all
  select 'funcao ' || p.proname, p.oid, 'funcao',
         coalesce(p.proacl, pg_catalog.acldefault('f', p.proowner))
    from pg_catalog.pg_proc p
   where p.pronamespace = 'public'::regnamespace
),

-- o que cada papel de fora consegue fazer em cada objeto
pode as (
  select r.papel, o.objeto
    from objetos o
   cross join (values ('anon'), ('authenticated'), ('service_role')) r(papel)
   where exists (select 1 from pg_catalog.pg_roles x where x.rolname = r.papel)
     and case
           when o.tipo = 'funcao' then pg_catalog.has_function_privilege(r.papel, o.oid, 'EXECUTE')
           when o.tipo = 'S'      then pg_catalog.has_sequence_privilege(r.papel, o.oid, 'USAGE, SELECT, UPDATE')
           else pg_catalog.has_table_privilege(r.papel, o.oid,
                  'SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER')
                or pg_catalog.has_any_column_privilege(r.papel, o.oid, 'SELECT, INSERT, UPDATE, REFERENCES')
         end
),

conferencias(n, conferencia, esperado, encontrado, ok) as (

  -- 1. As quatro tabelas existem.
  select 1, 'tabelas existem',
         'entregas, eventos, investimento, pessoas',
         (select coalesce(pg_catalog.string_agg(t.nome, ', ' order by t.nome), 'nenhuma')
            from tabelas t where pg_catalog.to_regclass('public.' || t.nome) is not null),
         (select pg_catalog.count(*) = 4 from tabelas t where pg_catalog.to_regclass('public.' || t.nome) is not null)

  -- 2. Row level security ligada em todas as tabelas do esquema, sem FORCE.
  union all
  select 2, 'RLS ligada em todas as tabelas, sem FORCE',
         'nenhuma tabela sem RLS e nenhuma com FORCE',
         coalesce((select pg_catalog.string_agg(c.relname, ', ' order by c.relname)
                     from pg_catalog.pg_class c
                    where c.relnamespace = 'public'::regnamespace and c.relkind in ('r', 'p')
                      and (not c.relrowsecurity or c.relforcerowsecurity)), 'nenhuma fora da regra'),
         not exists (select 1 from pg_catalog.pg_class c
                      where c.relnamespace = 'public'::regnamespace and c.relkind in ('r', 'p')
                        and (not c.relrowsecurity or c.relforcerowsecurity))

  -- 3. Nenhuma política de RLS: com RLS ligada e sem política, quem vem de fora não vê nada.
  union all
  select 3, 'nenhuma política de RLS',
         '0 políticas',
         (select pg_catalog.count(*) || ' políticas' from pg_catalog.pg_policies where schemaname = 'public'),
         (select pg_catalog.count(*) = 0 from pg_catalog.pg_policies where schemaname = 'public')

  -- 4. anon (a chave publicável) só executa a função de gravação. Nada de tabela, visão
  --    nem outra função.
  union all
  select 4, 'anon pode só isto',
         'funcao registrar_fim_quiz',
         coalesce((select pg_catalog.string_agg(objeto, ', ' order by objeto) from pode where papel = 'anon'), 'nada'),
         coalesce((select pg_catalog.array_agg(objeto order by objeto) from pode where papel = 'anon')
                  = array['funcao registrar_fim_quiz'], false)

  -- 5. authenticated (login de usuário, que a casa não usa) não pode nada.
  union all
  select 5, 'authenticated pode só isto',
         'nada',
         coalesce((select pg_catalog.string_agg(objeto, ', ' order by objeto) from pode where papel = 'authenticated'), 'nada'),
         not exists (select 1 from pode where papel = 'authenticated')

  -- 6. service_role (a chave secreta) só executa a função da planilha. Lembrete: no Supabase
  --    esse papel passa por cima da RLS, mas sem permissão na tabela não lê nada.
  union all
  select 6, 'service_role pode só isto',
         'funcao leads_para_planilha',
         coalesce((select pg_catalog.string_agg(objeto, ', ' order by objeto) from pode where papel = 'service_role'), 'nada'),
         coalesce((select pg_catalog.array_agg(objeto order by objeto) from pode where papel = 'service_role')
                  = array['funcao leads_para_planilha'], false)

  -- 7. PUBLIC (todo mundo, inclusive papéis que ainda não existem) não tem nada em nenhum
  --    objeto, nem o EXECUTE que o Postgres dá às funções por padrão.
  union all
  select 7, 'PUBLIC não tem nada',
         'nada',
         coalesce((select pg_catalog.string_agg(distinct o.objeto, ', ')
                     from objetos o, pg_catalog.aclexplode(o.acl) a where a.grantee = 0), 'nada'),
         not exists (select 1 from objetos o, pg_catalog.aclexplode(o.acl) a where a.grantee = 0)

  -- 8. As duas funções das portas rodam com os direitos do dono (SECURITY DEFINER) e com
  --    search_path vazio.
  union all
  select 8, 'funções das portas: SECURITY DEFINER e search_path vazio',
         'registrar_fim_quiz e leads_para_planilha, as duas com definer e search_path=""',
         coalesce((select pg_catalog.string_agg(p.proname || ' (definer=' || p.prosecdef || ', '
                            || coalesce(pg_catalog.array_to_string(p.proconfig, ' '), 'sem config') || ')',
                            ', ' order by p.proname)
                     from pg_catalog.pg_proc p join funcoes f on f.nome = p.proname
                    where p.pronamespace = 'public'::regnamespace), 'nenhuma'),
         (select pg_catalog.count(*) = 2
            from pg_catalog.pg_proc p join funcoes f on f.nome = p.proname
           where p.pronamespace = 'public'::regnamespace
             and p.prosecdef and p.proconfig = array['search_path=""'])

  -- 9. A função da trava dos eventos não roda com direitos de dono (não precisa) e também
  --    tem search_path vazio.
  union all
  select 9, 'função da trava: sem definer, search_path vazio',
         'eventos_imutaveis com definer=false e search_path=""',
         coalesce((select 'eventos_imutaveis (definer=' || p.prosecdef || ', '
                            || coalesce(pg_catalog.array_to_string(p.proconfig, ' '), 'sem config') || ')'
                     from pg_catalog.pg_proc p
                    where p.pronamespace = 'public'::regnamespace and p.proname = 'eventos_imutaveis'), 'não existe'),
         exists (select 1 from pg_catalog.pg_proc p
                  where p.pronamespace = 'public'::regnamespace and p.proname = 'eventos_imutaveis'
                    and not p.prosecdef and p.proconfig = array['search_path=""'])

  -- 10. O gatilho que não deixa apagar nem reescrever evento está ligado.
  union all
  select 10, 'trava dos eventos ligada',
         'gatilho eventos_sem_mudanca ligado na tabela eventos',
         coalesce((select 'eventos_sem_mudanca (estado ' || t.tgenabled::text || ')'
                     from pg_catalog.pg_trigger t
                    where t.tgrelid = pg_catalog.to_regclass('public.eventos') and t.tgname = 'eventos_sem_mudanca'), 'não existe'),
         exists (select 1 from pg_catalog.pg_trigger t
                  where t.tgrelid = pg_catalog.to_regclass('public.eventos')
                    and t.tgname = 'eventos_sem_mudanca' and t.tgenabled = 'O')

  -- 11. Os dois índices únicos e parciais da gaveta pessoas: um por telefone (só os dígitos)
  --     e um por e-mail (em minúsculas), cada um com a condição WHERE que tira o vazio (#100).
  union all
  select 11, 'índices únicos de telefone e e-mail',
         'pessoas_email_unico e pessoas_telefone_unico, os dois UNIQUE e parciais (WHERE)',
         coalesce((select pg_catalog.string_agg(i.indexname, ', ' order by i.indexname)
                     from pg_catalog.pg_indexes i
                    where i.schemaname = 'public' and i.tablename = 'pessoas'
                      and i.indexdef like 'CREATE UNIQUE INDEX%' and i.indexdef like '%WHERE%'), 'nenhum'),
         (select pg_catalog.count(*) = 2 from pg_catalog.pg_indexes i
           where i.schemaname = 'public' and i.tablename = 'pessoas'
             and i.indexname in ('pessoas_telefone_unico', 'pessoas_email_unico')
             and i.indexdef like 'CREATE UNIQUE INDEX%' and i.indexdef like '%WHERE%')

  -- 12. As duas visões do painel leem com os direitos do dono (sem security_invoker) e
  --     ninguém tem SELECT nelas (as conferências 4 a 7 já mostram que ninguém lê).
  union all
  select 12, 'visões sem security_invoker',
         'painel_numeros e contagem_analises_gratuitas, as duas sem security_invoker ligado',
         coalesce((select pg_catalog.string_agg(c.relname || ' (' || coalesce(pg_catalog.array_to_string(c.reloptions, ' '), 'sem opção') || ')',
                            ', ' order by c.relname)
                     from pg_catalog.pg_class c
                    where c.relnamespace = 'public'::regnamespace and c.relkind = 'v'), 'nenhuma'),
         (select pg_catalog.count(*) = 2 from pg_catalog.pg_class c
           where c.relnamespace = 'public'::regnamespace and c.relkind = 'v'
             and c.relname in ('painel_numeros', 'contagem_analises_gratuitas')
             and coalesce(pg_catalog.array_to_string(c.reloptions, ',') !~ 'security_invoker=(true|on|yes|1)', true))

  -- 13. Para o que for criado depois por este papel: nenhuma permissão padrão para PUBLIC,
  --     anon, authenticated nem service_role.
  union all
  select 13, 'permissões padrão do papel atual',
         'nenhuma para PUBLIC, anon, authenticated ou service_role',
         coalesce((select pg_catalog.string_agg(distinct
                            case when a.grantee = 0 then 'PUBLIC' else a.grantee::regrole::text end
                            || ' em ' || d.defaclobjtype::text, ', ')
                     from pg_catalog.pg_default_acl d, pg_catalog.aclexplode(d.defaclacl) a
                    where d.defaclrole = current_user::regrole
                      and (d.defaclnamespace = 0 or d.defaclnamespace = 'public'::regnamespace)
                      and (a.grantee = 0 or a.grantee in (select oid from pg_catalog.pg_roles
                                                           where rolname in ('anon', 'authenticated', 'service_role')))), 'nenhuma'),
         not exists (select 1
                       from pg_catalog.pg_default_acl d, pg_catalog.aclexplode(d.defaclacl) a
                      where d.defaclrole = current_user::regrole
                        and (d.defaclnamespace = 0 or d.defaclnamespace = 'public'::regnamespace)
                        and (a.grantee = 0 or a.grantee in (select oid from pg_catalog.pg_roles
                                                             where rolname in ('anon', 'authenticated', 'service_role'))))
)

select n, conferencia, esperado, encontrado, ok from conferencias
union all
-- A última linha: true só se todas as outras derem true.
select 99, 'tudo certo', 'todas as linhas acima com ok = true',
       (select pg_catalog.count(*) filter (where ok) || ' de ' || pg_catalog.count(*) from conferencias),
       (select pg_catalog.bool_and(ok) from conferencias)
order by 1;
