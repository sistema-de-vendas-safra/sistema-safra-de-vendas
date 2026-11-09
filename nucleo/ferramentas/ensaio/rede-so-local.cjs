// Trava de rede do ensaio geral para o wrangler (etapa 35) · carregada com node --require, só no ensaio
// Parte de nucleo/ferramentas/ensaio/ (id ensaio-prototipo-funil-01, v3, rascunho; ver README.md).
//
// O ensaio liga o wrangler dev com NODE_OPTIONS=--require <cópia deste arquivo na pasta temporária>.
// Dentro de todo processo Node que o wrangler abrir, qualquer pedido de nome (DNS) ou conexão para um
// endereço que não seja da própria máquina (127.0.0.1, ::1, localhost) é recusado na hora e anotado,
// só o nome ou o endereço, uma linha por tentativa, no arquivo de ENSAIO_REDE_REGISTRO. O ensaio lê o
// arquivo no fim e confere. Nada sai da máquina; nada mais é mudado no wrangler.

'use strict';
const dns = require('node:dns');
const net = require('node:net');
const fs = require('node:fs');

const REGISTRO = process.env.ENSAIO_REDE_REGISTRO;
const LOCAIS = new Set(['127.0.0.1', '::1', 'localhost', '0.0.0.0', '::', '']);
const local = (h) => h === undefined || h === null || LOCAIS.has(String(h).replace(/^\[|\]$/g, ''));
function anotar(h) {
  if (!REGISTRO) return;
  try { fs.appendFileSync(REGISTRO, String(h).slice(0, 200) + '\n'); } catch { /* sem registro, segue recusando */ }
}
const recusa = (h, codigo) => Object.assign(new Error('bloqueado pelo ensaio: ' + h), { code: codigo });

const lookupOriginal = dns.lookup;
dns.lookup = function lookup(nome, ...resto) {
  if (!local(nome)) {
    anotar(nome);
    const avisar = resto[resto.length - 1];
    if (typeof avisar === 'function') process.nextTick(() => avisar(recusa(nome, 'ENOTFOUND')));
    return {};
  }
  return lookupOriginal.call(this, nome, ...resto);
};
const lookupPromessa = dns.promises.lookup;
dns.promises.lookup = async function lookup(nome, ...resto) {
  if (!local(nome)) { anotar(nome); throw recusa(nome, 'ENOTFOUND'); }
  return lookupPromessa.call(this, nome, ...resto);
};

const conectarOriginal = net.Socket.prototype.connect;
net.Socket.prototype.connect = function connect(...args) {
  let o = args[0];
  if (Array.isArray(o)) o = o[0];
  const host = o && typeof o === 'object' ? (o.path ? undefined : o.host) : (typeof args[1] === 'string' ? args[1] : undefined);
  if (host !== undefined && net.isIP(String(host).replace(/^\[|\]$/g, '')) && !local(host)) {
    anotar(host);
    process.nextTick(() => this.destroy(recusa(host, 'ECONNREFUSED')));
    return this;
  }
  return conectarOriginal.apply(this, args);
};
