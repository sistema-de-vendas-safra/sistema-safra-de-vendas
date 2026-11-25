-- Conferência do banco do funil-01, depois de esquema.sql e das migrações 001 a 004 (Postgres, no Supabase)
-- id: banco-conferir · versao 5 · rascunho · otavio: pendente
-- depende_de: banco-rascunho v6, banco-migracao-001 v1, banco-migracao-002 v1, banco-migracao-003 v1, banco-migracao-004 v1, planta-do-banco v5, decisoes v15
-- desatualizado: true (banco-rascunho e as migrações 001 a 004 continuam marcados; regra 11.1)
--
-- Versão 5 (25/11/2026, pedido 24): entra a linha 21, da migração 004
-- (dados/banco/migracoes/004-utm-na-abertura-e-recusas.sql): a tabela recusas, com a chave e as três
-- restrições, a função registrar_recusa e o registrar_evento v2, com as três utm de texto livre. As
-- linhas 4 e 8 passam a contar a porta nova (anon executa registrar_recusa; quatro funções das portas
-- com definer). Num banco com a 003 e sem a 004, as linhas 4, 8 e 21 dão false ("18 de 21"): é o aviso
-- de que falta rodar a 004.
--
-- Versão 4 (18/11/2026, #121): entra a linha 20, da migração 003
-- (dados/banco/migracoes/003-origem-e-ids.sql): as nove colunas novas da gaveta eventos, as
-- restrições delas, meta-ads nas listas de utm_source e a função da planilha v5. A linha 19 passa
-- a aceitar colunas depois de respostas. Num banco com a 002 e sem a 003, só a linha 20 dá false
-- ("19 de 20"): é o aviso de que falta rodar a 003.
--
-- Versão 3 (15/11/2026, planilha do SDR v3): entra a linha 19, da migração 002
-- (dados/banco/migracoes/002-respostas-na-planilha.sql): a função da planilha devolve a coluna
-- respostas. Num banco com a 001 e sem a 002, as linhas 19 e 20 dão false (desde a v4).
--
-- Versão 2 (etapa 32): confere o banco v3, que é o esquema v2 (esquema.sql) mais a migração
-- dados/banco/migracoes/001-v3.sql. Tudo o que a versão 1 conferia continua, com a porta nova
-- (registrar_evento) nas linhas 4 e 8, e entram as linhas 14 a 18, da migração. Num banco só com o
-- esquema v2, sem a migração, as linhas 4, 8 e 14 a 19 dão false: é o aviso de que falta rodar a
-- migração.
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
-- a migração que a linha aponta de novo antes de seguir (dados/banco/README.md, "Como conferir").
--
-- Rode como o papel postgres (o padrão do editor SQL). A conferência 13 olha as permissões
-- padrão desse papel.

with
-- nomes que o esquema v2 e as migrações 001 a 004 criam
tabelas(nome) as (values ('entregas'), ('pessoas'), ('eventos'), ('investimento')),
funcoes(nome) as (values ('registrar_fim_quiz'), ('registrar_evento'), ('leads_para_planilha'), ('registrar_recusa')),

-- as restrições da gaveta eventos que a migração 001 põe, com nome (001-v3.sql, passo 2)
restricoes_v3(nome) as (values ('eventos_tipo_lista'), ('eventos_quem_grava'), ('eventos_estado_lista'),
  ('eventos_produto_lista'), ('eventos_clique_lista'), ('eventos_clique_so_no_interesse'),
  ('eventos_interesse_completo')),

-- as restrições de CHECK da gaveta eventos, com as colunas que cada uma olha
checks_eventos as (
  select c.conname, c.convalidated, pg_catalog.pg_get_constraintdef(c.oid) as def,
         (select pg_catalog.array_agg(a.attname::text order by a.attname::text)
            from pg_catalog.pg_attribute a
           where a.attrelid = c.conrelid and a.attnum = any (c.conkey)) as colunas
    from pg_catalog.pg_constraint c
   where c.conrelid = pg_catalog.to_regclass('public.eventos') and c.contype = 'c'
),

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

  -- 4. anon (a chave publicável) só executa as funções de gravação: o fim do quiz, desde a
  --    migração 001 a visita, o início do quiz e o clique, e desde a 004 a contagem das recusas.
  --    Nada de tabela (nem a recusas), visão nem outra função.
  union all
  select 4, 'anon pode só isto',
         'funcao registrar_evento, funcao registrar_fim_quiz, funcao registrar_recusa',
         coalesce((select pg_catalog.string_agg(objeto, ', ' order by objeto) from pode where papel = 'anon'), 'nada'),
         coalesce((select pg_catalog.array_agg(objeto order by objeto) from pode where papel = 'anon')
                  = array['funcao registrar_evento', 'funcao registrar_fim_quiz', 'funcao registrar_recusa'], false)

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

  -- 8. As quatro funções das portas rodam com os direitos do dono (SECURITY DEFINER) e com
  --    search_path vazio (a quarta, registrar_recusa, desde a 004).
  union all
  select 8, 'funções das portas: SECURITY DEFINER e search_path vazio',
         'leads_para_planilha, registrar_evento, registrar_fim_quiz e registrar_recusa, as quatro com definer e search_path=""',
         coalesce((select pg_catalog.string_agg(p.proname || ' (definer=' || p.prosecdef || ', '
                            || coalesce(pg_catalog.array_to_string(p.proconfig, ' '), 'sem config') || ')',
                            ', ' order by p.proname)
                     from pg_catalog.pg_proc p join funcoes f on f.nome = p.proname
                    where p.pronamespace = 'public'::regnamespace), 'nenhuma'),
         (select pg_catalog.count(*) = 4
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

  -- 14. Migração 001 · a gaveta eventos tem o campo clique_fim_quiz, em texto.
  union all
  select 14, 'campo clique_fim_quiz na gaveta eventos',
         'clique_fim_quiz (text)',
         coalesce((select a.attname || ' (' || pg_catalog.format_type(a.atttypid, a.atttypmod) || ')'
                     from pg_catalog.pg_attribute a
                    where a.attrelid = pg_catalog.to_regclass('public.eventos')
                      and a.attname = 'clique_fim_quiz' and not a.attisdropped), 'não existe'),
         exists (select 1 from pg_catalog.pg_attribute a
                  where a.attrelid = pg_catalog.to_regclass('public.eventos')
                    and a.attname = 'clique_fim_quiz' and not a.attisdropped
                    and a.atttypid = 'text'::regtype)

  -- 15. Migração 001 · as sete restrições v3 existem e valem para todas as linhas (conferidas
  --     ao ligar, sem NOT VALID).
  union all
  select 15, 'restrições v3 da gaveta eventos',
         'as 7 de 001-v3.sql, todas conferidas',
         coalesce((select pg_catalog.string_agg(r.nome || case when k.conname is null then ' (falta)'
                                                             when not k.convalidated then ' (não conferida)'
                                                             else '' end, ', ' order by r.nome)
                     from restricoes_v3 r left join checks_eventos k on k.conname = r.nome
                    where k.conname is null or not k.convalidated), 'todas lá'),
         (select pg_catalog.count(*) = 7 from restricoes_v3 r join checks_eventos k on k.conname = r.nome
           where k.convalidated)

  -- 16. Migração 001 · as listas do v2 que ela troca não ficaram duplicadas: só uma restrição
  --     olha cada um destes grupos de colunas (tipo; estado; produto; tipo e gravado_por), e é a v3.
  union all
  select 16, 'listas antigas trocadas, sem sobra',
         'eventos_estado_lista, eventos_produto_lista, eventos_quem_grava, eventos_tipo_lista',
         coalesce((select pg_catalog.string_agg(k.conname, ', ' order by k.conname)
                     from checks_eventos k
                    where k.colunas in (array['tipo'], array['estado'], array['produto'], array['gravado_por', 'tipo'])), 'nenhuma'),
         coalesce((select pg_catalog.array_agg(k.conname::text order by k.conname)
                     from checks_eventos k
                    where k.colunas in (array['tipo'], array['estado'], array['produto'], array['gravado_por', 'tipo']))
                  = array['eventos_estado_lista', 'eventos_produto_lista', 'eventos_quem_grava', 'eventos_tipo_lista'], false)

  -- 17. Migração 001 · os valores novos estão nas listas: interesse_pos_relatorio nos tipos e
  --     em quem grava (garçom), nutricao nos estados, iasv e essencial no produto.
  union all
  select 17, 'valores novos nas listas',
         'interesse_pos_relatorio, nutricao, iasv e essencial',
         coalesce((select pg_catalog.string_agg(k.conname, ', ' order by k.conname)
                     from checks_eventos k
                    where (k.conname in ('eventos_tipo_lista', 'eventos_quem_grava') and k.def like '%interesse_pos_relatorio%')
                       or (k.conname = 'eventos_estado_lista' and k.def like '%nutricao%')
                       or (k.conname = 'eventos_produto_lista' and k.def like '%iasv%' and k.def like '%essencial%')), 'nenhum'),
         (select pg_catalog.count(*) = 4
            from checks_eventos k
           where (k.conname in ('eventos_tipo_lista', 'eventos_quem_grava') and k.def like '%interesse_pos_relatorio%')
              or (k.conname = 'eventos_estado_lista' and k.def like '%nutricao%')
              or (k.conname = 'eventos_produto_lista' and k.def like '%iasv%' and k.def like '%essencial%'))

  -- 18. Migração 001 · a função da planilha é a v3: devolve clique_fim_quiz e manda as duas
  --     respostas do histórico da faixa b (leads-por-mes e crm; 15.4).
  union all
  select 18, 'função da planilha v3',
         'leads_para_planilha com clique_fim_quiz, leads-por-mes e crm',
         coalesce((select 'leads_para_planilha ('
                            || case when pg_catalog.pg_get_function_result(p.oid) like '%clique_fim_quiz%' then 'com' else 'sem' end
                            || ' clique_fim_quiz, '
                            || case when p.prosrc like '%''leads-por-mes''%' and p.prosrc like '%''crm''%' then 'com' else 'sem' end
                            || ' o histórico)'
                     from pg_catalog.pg_proc p
                    where p.pronamespace = 'public'::regnamespace and p.proname = 'leads_para_planilha'), 'não existe'),
         exists (select 1 from pg_catalog.pg_proc p
                  where p.pronamespace = 'public'::regnamespace and p.proname = 'leads_para_planilha'
                    and pg_catalog.pg_get_function_result(p.oid) like '%clique_fim_quiz%'
                    and p.prosrc like '%''leads-por-mes''%' and p.prosrc like '%''crm''%')

  -- 19. Migração 002 · a função da planilha é a v4: devolve, no fim, a coluna respostas (jsonb),
  --     com as respostas completas do quiz, para a aba respostas da planilha do SDR v3.
  union all
  select 19, 'função da planilha v4 (respostas)',
         'leads_para_planilha com a coluna respostas (jsonb) no fim',
         coalesce((select 'leads_para_planilha ('
                            || case when pg_catalog.pg_get_function_result(p.oid) like '%cursor_gravado_em timestamp with time zone, respostas jsonb%'
                                    then 'com' else 'sem' end
                            || ' a coluna respostas no fim)'
                     from pg_catalog.pg_proc p
                    where p.pronamespace = 'public'::regnamespace and p.proname = 'leads_para_planilha'), 'não existe'),
         exists (select 1 from pg_catalog.pg_proc p
                  where p.pronamespace = 'public'::regnamespace and p.proname = 'leads_para_planilha'
                    and pg_catalog.pg_get_function_result(p.oid) like '%cursor_gravado_em timestamp with time zone, respostas jsonb%')

  -- 20. Migração 003 · a origem e os ids do lead (#121): as nove colunas novas da gaveta eventos,
  --     as seis restrições delas conferidas, meta-ads nas listas de utm_source (eventos e pessoas)
  --     e a função da planilha v5, com qualificado (boolean) na última coluna.
  union all
  select 20, 'origem e ids do lead (migração 003)',
         '9 colunas, 6 restrições, meta-ads nas 2 listas, planilha v5',
         (select pg_catalog.count(*) || ' colunas, '
            from pg_catalog.pg_attribute a
           where a.attrelid = pg_catalog.to_regclass('public.eventos') and not a.attisdropped
             and a.attname in ('utm_medium', 'utm_content', 'utm_term', 'fbclid', 'fbp', 'fbc',
                               'id_lead', 'id_qualificado', 'qualificado'))
         || (select pg_catalog.count(*) || ' restrições, ' from checks_eventos k
              where k.convalidated and k.conname in ('eventos_utm_texto_livre', 'eventos_fbclid_formato',
                    'eventos_fbp_fbc_formato', 'eventos_ids_formato', 'eventos_ids_so_no_fim', 'eventos_qualificado_coerente'))
         || (select pg_catalog.count(*) || ' listas com meta-ads, ' from pg_catalog.pg_constraint c
              where c.conname in ('eventos_utm_source_lista', 'pessoas_primeira_utm_source_lista')
                and pg_catalog.pg_get_constraintdef(c.oid) like '%meta-ads%')
         || coalesce((select 'planilha ' || case when pg_catalog.pg_get_function_result(p.oid) like '%, qualificado boolean)' then 'v5' else 'antiga' end
                        from pg_catalog.pg_proc p
                       where p.pronamespace = 'public'::regnamespace and p.proname = 'leads_para_planilha'), 'sem planilha'),
         (select pg_catalog.count(*) = 9
            from pg_catalog.pg_attribute a
           where a.attrelid = pg_catalog.to_regclass('public.eventos') and not a.attisdropped
             and a.attname in ('utm_medium', 'utm_content', 'utm_term', 'fbclid', 'fbp', 'fbc',
                               'id_lead', 'id_qualificado', 'qualificado'))
         and (select pg_catalog.count(*) = 6 from checks_eventos k
               where k.convalidated and k.conname in ('eventos_utm_texto_livre', 'eventos_fbclid_formato',
                     'eventos_fbp_fbc_formato', 'eventos_ids_formato', 'eventos_ids_so_no_fim', 'eventos_qualificado_coerente'))
         and (select pg_catalog.count(*) = 2 from pg_catalog.pg_constraint c
               where c.conname in ('eventos_utm_source_lista', 'pessoas_primeira_utm_source_lista')
                 and pg_catalog.pg_get_constraintdef(c.oid) like '%meta-ads%')
         and exists (select 1 from pg_catalog.pg_proc p
                      where p.pronamespace = 'public'::regnamespace and p.proname = 'leads_para_planilha'
                        and pg_catalog.pg_get_function_result(p.oid) like '%, qualificado boolean)')

  -- 21. Migração 004 · as recusas do garçom e as utm na abertura (pedido 24): a tabela recusas com a
  --     chave (dia, porta, motivo) e as três restrições conferidas, a função registrar_recusa(text, text)
  --     e o registrar_evento v2, que aceita utm_medium, utm_content e utm_term.
  union all
  select 21, 'recusas e utm na abertura (migração 004)',
         'tabela recusas com chave e 3 restrições, registrar_recusa, registrar_evento v2',
         (case when pg_catalog.to_regclass('public.recusas') is null then 'sem a tabela recusas, '
               else 'tabela recusas com ' || (select pg_catalog.count(*) from pg_catalog.pg_constraint c
                                                 where c.conrelid = pg_catalog.to_regclass('public.recusas') and c.convalidated
                                                   and c.conname in ('recusas_chave', 'recusas_porta_lista', 'recusas_motivo_formato', 'recusas_quantas_positiva'))
                    || ' de 4 restrições, ' end)
         || case when pg_catalog.to_regprocedure('public.registrar_recusa(text, text)') is null then 'sem registrar_recusa, ' else 'registrar_recusa, ' end
         || coalesce((select 'registrar_evento ' || case when p.prosrc like '%''utm_content''%' then 'v2' else 'antigo' end
                        from pg_catalog.pg_proc p
                       where p.pronamespace = 'public'::regnamespace and p.proname = 'registrar_evento'), 'sem registrar_evento'),
         pg_catalog.to_regclass('public.recusas') is not null
         and (select pg_catalog.count(*) = 4 from pg_catalog.pg_constraint c
               where c.conrelid = pg_catalog.to_regclass('public.recusas') and c.convalidated
                 and c.conname in ('recusas_chave', 'recusas_porta_lista', 'recusas_motivo_formato', 'recusas_quantas_positiva'))
         and pg_catalog.to_regprocedure('public.registrar_recusa(text, text)') is not null
         and exists (select 1 from pg_catalog.pg_proc p
                      where p.pronamespace = 'public'::regnamespace and p.proname = 'registrar_evento'
                        and p.prosrc like '%''utm_content''%')
)

select n, conferencia, esperado, encontrado, ok from conferencias
union all
-- A última linha: true só se todas as outras derem true.
select 99, 'tudo certo', 'todas as linhas acima com ok = true',
       (select pg_catalog.count(*) filter (where ok) || ' de ' || pg_catalog.count(*) from conferencias),
       (select pg_catalog.bool_and(ok) from conferencias)
order by 1;
