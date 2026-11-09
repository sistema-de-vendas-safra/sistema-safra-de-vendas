// Supabase de mentira para o ensaio geral (etapa 25) · Node, só com o PGlite
// Parte de nucleo/ferramentas/ensaio/ (id ensaio-prototipo-funil-01, v1, rascunho; ver README.md).
//
// Um servidor HTTP em 127.0.0.1 que imita o pedaço da API REST do Supabase (PostgREST) que o
// garçom usa, mais duas rotas de tabela para conferir que a chave publicável não lê nada:
//
//   POST /rest/v1/rpc/<funcao>     executa public.<funcao> com os argumentos do corpo JSON, pelo nome
//   GET  /rest/v1/<tabela>         lê a tabela ou visão public.<tabela> (até 1000 linhas)
//   POST /rest/v1/<tabela>         grava uma linha em public.<tabela>
//
// A chave vem no cabeçalho apikey, como no Supabase. A chave publicável de mentira vira o papel
// anon; a secreta de mentira, o papel service_role. Sem chave ou com chave desconhecida: 401.
// Cada pedido roda numa transação, com SET LOCAL ROLE no papel da chave, como o PostgREST faz.
// Os erros do Postgres viram status HTTP parecidos com os do PostgREST (ver statusDoErro).
//
// O PGlite tem uma conexão só. Todo pedido entra numa fila e roda um de cada vez: dois pedidos
// ao mesmo tempo nunca correm juntos no banco. Corrida de verdade entre duas conexões NÃO é
// conferida aqui; só no Supabase de verdade (README.md, "Limitações").
//
// Não registra corpo, chave nem dado pessoal: só papel, rota e status.

import http from 'node:http';

// Uma fila: cada tarefa espera a anterior terminar.
export function criarFila() {
  let ultima = Promise.resolve();
  return (tarefa) => {
    const vez = ultima.then(tarefa, tarefa);
    ultima = vez.catch(() => {});
    return vez;
  };
}

// Como o PostgREST traduz o código de erro do Postgres em status HTTP (PostgREST 12, tabela de
// erros). 42501 (permissão negada) vira 401 para o papel anon e 403 para os outros.
export function statusDoErro(codigo, papel) {
  const c = String(codigo || '');
  if (c === '42501') return papel === 'anon' ? 401 : 403;
  if (c === '23503' || c === '23505') return 409;
  if (c === '42883' || c === '42P01') return 404;
  if (c === '25006') return 405;
  if (c === 'P0001') return 400;
  if (/^(08|53|57)/.test(c)) return 503;
  if (/^(0L|0P|28)/.test(c)) return 403;
  if (/^(09|25|2D|38|39|3B|40|42P17|54|55|58|F0|HV|P0|XX)/.test(c)) return 500;
  return 400;
}

const NOME = /^[a-z_][a-z0-9_]{0,62}$/;

export function criarSupabaseDeMentira({ db, fila, chaves }) {
  // chaves: { [valor da chave]: papel }
  const registro = [];   // { papel, metodo, rota, status, origem }

  const json = (res, status, corpo) => {
    const texto = corpo === null ? '' : (typeof corpo === 'string' ? corpo : JSON.stringify(corpo));
    res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
    res.end(texto);
    return status;
  };
  const erroPg = (res, e, papel) => json(res, statusDoErro(e.code, papel), {
    code: e.code || null, details: null, hint: null, message: String(e.message || 'erro')
  });

  async function lerCorpo(req) {
    const partes = [];
    for await (const p of req) partes.push(p);
    const texto = Buffer.concat(partes).toString('utf8');
    if (texto.trim() === '') return {};
    return JSON.parse(texto);
  }

  // O "cache do esquema": as funções e tabelas de public, lidas pelo dono do banco (fora do papel
  // do pedido), como o PostgREST faz ao subir.
  async function acharFuncao(nome) {
    const r = await db.query(`
      select p.proname, p.pronargs, p.pronargdefaults, p.proretset,
             p.prorettype = 'pg_catalog.void'::pg_catalog.regtype as vazia,
             coalesce(p.proargnames[1:p.pronargs], array[]::text[]) as nomes,
             (select coalesce(pg_catalog.array_agg(pg_catalog.format_type(t, null) order by o), array[]::text[])
                from pg_catalog.unnest(p.proargtypes) with ordinality u(t, o)) as tipos
        from pg_catalog.pg_proc p
       where p.pronamespace = 'public'::pg_catalog.regnamespace and p.proname = $1
         and p.prorettype <> 'pg_catalog.trigger'::pg_catalog.regtype`, [nome]);
    return r.rows;
  }
  async function existeRelacao(nome) {
    const r = await db.query(`select 1 from pg_catalog.pg_class c
       where c.relnamespace = 'public'::pg_catalog.regnamespace and c.relname = $1 and c.relkind in ('r', 'v', 'm', 'p')`, [nome]);
    return r.rows.length === 1;
  }

  const comoPapel = (papel, trabalho) => db.transaction(async (tx) => {
    await tx.exec('set local role ' + papel);
    return trabalho(tx);
  });

  async function rpc(res, papel, nome, corpo) {
    const candidatas = await acharFuncao(nome);
    const chavesCorpo = Object.keys(corpo);
    const f = candidatas.find(c => chavesCorpo.every(k => c.nomes.includes(k)) &&
      c.nomes.slice(0, c.pronargs - c.pronargdefaults).every(k => chavesCorpo.includes(k)));
    if (!f) {
      return json(res, 404, { code: 'PGRST202', details: null, hint: null,
        message: 'Could not find the function public.' + nome + ' in the schema cache' });
    }
    const args = [], valores = [];
    chavesCorpo.forEach((k) => {
      const tipo = f.tipos[f.nomes.indexOf(k)];
      const v = corpo[k];
      valores.push(v === null || v === undefined ? null
        : (tipo === 'jsonb' || tipo === 'json' || typeof v === 'object') ? JSON.stringify(v) : String(v));
      args.push('"' + k + '" := $' + valores.length + '::' + tipo);
    });
    const chamada = 'public."' + nome + '"(' + args.join(', ') + ')';
    try {
      const saida = await comoPapel(papel, async (tx) => {
        if (f.vazia) { await tx.query('select ' + chamada, valores); return null; }
        const sql = f.proretset
          ? 'select coalesce(pg_catalog.json_agg(r), \'[]\'::json)::text as corpo from ' + chamada + ' r'
          : 'select pg_catalog.to_json(' + chamada + ')::text as corpo';
        return (await tx.query(sql, valores)).rows[0].corpo;
      });
      return saida === null ? json(res, 204, null) : json(res, 200, saida);
    } catch (e) {
      return erroPg(res, e, papel);
    }
  }

  async function tabela(res, papel, metodo, nome, corpo) {
    if (!(await existeRelacao(nome))) {
      return json(res, 404, { code: 'PGRST205', details: null, hint: null,
        message: 'Could not find the table public.' + nome + ' in the schema cache' });
    }
    try {
      if (metodo === 'GET') {
        const saida = await comoPapel(papel, async (tx) => (await tx.query(
          'select coalesce(pg_catalog.json_agg(t), \'[]\'::json)::text as corpo from (select * from public."' + nome + '" limit 1000) t')).rows[0].corpo);
        return json(res, 200, saida);
      }
      await comoPapel(papel, (tx) => tx.query(
        'insert into public."' + nome + '" select * from pg_catalog.jsonb_populate_record(null::public."' + nome + '", $1::jsonb)',
        [JSON.stringify(corpo)]));
      return json(res, 201, null);
    } catch (e) {
      return erroPg(res, e, papel);
    }
  }

  const servidor = http.createServer((req, res) => {
    const u = new URL(req.url, 'http://127.0.0.1');
    const origem = req.headers['x-ensaio'] === 'direto' ? 'ensaio' : 'garcom';
    const anotar = (papel, status) => registro.push({ papel, metodo: req.method, rota: u.pathname, status, origem });
    const chave = req.headers.apikey;
    if (!chave) return anotar(null, json(res, 401, { message: 'No API key found in request' }));
    const papel = Object.prototype.hasOwnProperty.call(chaves, chave) ? chaves[chave] : null;
    if (!papel) return anotar(null, json(res, 401, { message: 'Invalid API key' }));

    const rpcNome = /^\/rest\/v1\/rpc\/([^/]+)$/.exec(u.pathname);
    const tabNome = /^\/rest\/v1\/([^/]+)$/.exec(u.pathname);
    const nome = (rpcNome || tabNome || [])[1];
    if (!nome || !NOME.test(nome)) return anotar(papel, json(res, 404, { message: 'not found' }));
    if (rpcNome && req.method !== 'POST') return anotar(papel, json(res, 405, { message: 'method not allowed' }));
    if (!rpcNome && !['GET', 'POST'].includes(req.method)) return anotar(papel, json(res, 405, { message: 'method not allowed' }));

    fila(async () => {
      let corpo;
      try { corpo = req.method === 'POST' ? await lerCorpo(req) : {}; }
      catch { return json(res, 400, { code: 'PGRST102', message: 'Empty or invalid json' }); }
      if (rpcNome && (corpo === null || typeof corpo !== 'object' || Array.isArray(corpo))) {
        return json(res, 400, { code: 'PGRST102', message: 'Empty or invalid json' });
      }
      return rpcNome ? rpc(res, papel, nome, corpo) : tabela(res, papel, req.method, nome, corpo);
    }).then(status => anotar(papel, status), () => {
      if (!res.headersSent) anotar(papel, json(res, 500, { message: 'erro do supabase de mentira' }));
    });
  });

  return {
    registro,
    abrir: () => new Promise((ok, falha) => {
      servidor.once('error', falha);
      servidor.listen(0, '127.0.0.1', () => ok(servidor.address().port));
    }),
    fechar: () => new Promise(ok => { servidor.closeAllConnections?.(); servidor.close(() => ok()); })
  };
}
