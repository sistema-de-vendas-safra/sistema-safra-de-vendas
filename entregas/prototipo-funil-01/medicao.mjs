// Medição com o Google nas páginas do protótipo do funil-01: o aviso de cookies e o Tag Manager · Node, sem dependências
// id: prototipo-funil-01 · versao 9 · rascunho · otavio: pendente (ver README.md desta pasta)
// Usado pela montagem (montar-site.mjs, nos HTML montados, nunca nas entregas) e pelo teste do quiz
// (nucleo/ferramentas/prints/testar-quiz-01.js, que serve a página da entrega com o mesmo bloco).
//
// O que faz (decisão #116; prompts/17-medicao-google.md, parte 17.2; politica-de-privacidade v3, item 7):
//   acrescentarMedicao(html) devolve o HTML com um bloco logo depois da <meta charset="utf-8">, entre os comentários
//   <!-- medicao: inicio --> e <!-- medicao: fim -->, nesta ordem:
//   1. o padrão de consentimento do Google com tudo negado (análise e os três de anúncio), antes de qualquer outro programa;
//   2. o estilo do aviso, todo com o prefixo .aviso-cookies, no visual da landing-page-02 (os dois botões iguais);
//   3. dois modelos (<template>, que não carregam nada): o aviso e o link "Cookies";
//   4. o programa do aviso, que roda quando a página já está montada (DOMContentLoaded): sem escolha guardada, põe o
//      aviso como primeiro filho do body, em fluxo normal; com "recusado", não mostra nem carrega nada; com "aceito",
//      carrega o Tag Manager direto. Em todo caso, põe o link "Cookies" como último filho do body.
//   Ao "Aceitar": guarda "aceito", muda só a análise para concedida, tira o id_sessao do endereço da barra (a página já o
//   leu), põe pagina_limpa e origem_limpa (sem id_sessao e sem #) na camada de dados e só então carrega o gtm.js, uma vez.
//   Ao "Recusar": guarda "recusado" e não carrega nada; se antes era "aceito", manda a análise negada e apaga os cookies _ga.
//   Depois da escolha, o foco nunca fica no body: volta ao link "Cookies", se o aviso foi reaberto por ele; senão, com o foco
//   dentro do aviso, vai ao primeiro elemento focável depois dele (pelo teclado, no quiz, o "Pular para o conteúdo"; pelo mouse
//   ou pelo toque, o primeiro que está à vista, sem rolar a página).
// O texto do aviso vem do bloco ```aviso de entregas/documentos/aviso-de-cookies.md, com escape de HTML; {{a definir: X}}
// vira o texto visível "[a definir: X]", como no quiz. O código do contêiner e o nome da chave vêm de medicao.json.
// O navegador guarda só a escolha, no localStorage; sem escolha, nada. Nada do Google carrega antes do "Aceitar".

import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = resolve(AQUI, '../..');
const CONFIG = JSON.parse(readFileSync(join(AQUI, 'medicao.json'), 'utf8'));
const DOC_AVISO = 'entregas/documentos/aviso-de-cookies.md';

export const CODIGO_GTM = CONFIG.codigo_gtm;
export const CHAVE_ESCOLHA = CONFIG.chave_do_navegador;
if (!/^GTM-[A-Z0-9]{4,12}$/.test(CODIGO_GTM || '')) throw new Error('medicao.json: codigo_gtm fora do formato GTM-XXXX');
if (!/^[a-z0-9_]{1,40}$/.test(CHAVE_ESCOLHA || '')) throw new Error('medicao.json: chave_do_navegador fora do formato');
// O carregador padrão do Google, sem o <noscript> (que carregaria sem consentimento). É o único endereço de fora permitido
// numa página montada, e só dentro do bloco (a conferência fica em montar-site.mjs).
export const CARREGADOR_GTM = 'https://www.googletagmanager.com/gtm.js?id=';
export const ENDERECO_GTM = CARREGADOR_GTM + CODIGO_GTM;
export const MARCA_INICIO = '<!-- medicao: inicio -->';
export const MARCA_FIM = '<!-- medicao: fim -->';
export const ESCOLHAS = { aceitar: 'aceito', recusar: 'recusado' };

// ··· O texto do aviso, do documento (chaves fixas, uma por linha, "chave: valor") ···
const CHAVES = ['titulo', 'texto', 'aceitar', 'recusar', 'politica', 'reabrir'];
function lerAviso() {
  const md = readFileSync(join(RAIZ, DOC_AVISO), 'utf8').replace(/\r\n/g, '\n');
  const versao = (md.match(/^versao:\s*(\d+)\s*$/m) || [])[1];
  const bloco = md.match(/^```aviso\n([\s\S]*?)^```\s*$/m);
  if (!bloco) throw new Error(DOC_AVISO + ': sem o bloco ```aviso');
  const aviso = {};
  for (const linha of bloco[1].split('\n')) {
    if (!linha.trim()) continue;
    const i = linha.indexOf(': ');
    if (i < 1) throw new Error(DOC_AVISO + ': linha fora do formato "chave: valor" (' + linha + ')');
    const chave = linha.slice(0, i).trim(), valor = linha.slice(i + 2).trim();
    if (!CHAVES.includes(chave)) throw new Error(DOC_AVISO + ': chave desconhecida no bloco aviso (' + chave + ')');
    if (chave in aviso) throw new Error(DOC_AVISO + ': chave repetida no bloco aviso (' + chave + ')');
    if (!valor) throw new Error(DOC_AVISO + ': chave sem valor no bloco aviso (' + chave + ')');
    // Só o marcador "a definir" pode ir à página; qualquer outro {{...}} (por exemplo, BLOQUEADO) para a montagem
    if (/\{\{(?!a definir:)/.test(valor) || /\}\}/.test(valor.replace(/\{\{a definir:[^{}]*\}\}/g, ''))) {
      throw new Error(DOC_AVISO + ': marcador que não é "a definir" no bloco aviso (' + chave + ')');
    }
    aviso[chave] = valor;
  }
  for (const c of CHAVES) if (!(c in aviso)) throw new Error(DOC_AVISO + ': falta a chave ' + c + ' no bloco aviso');
  return { aviso, versao: versao ? Number(versao) : null };
}
const LIDO = lerAviso();
export const VERSAO_DO_AVISO = LIDO.versao;

const escapar = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
// O texto como aparece na página: {{a definir: X}} vira "[a definir: X]"
const comoNaPagina = t => t.replace(/\{\{a definir:\s*([^{}]*?)\s*\}\}/g, '[a definir: $1]');
// O texto visível do aviso, para os testes compararem com a página
export const TEXTO_DO_AVISO = Object.fromEntries(CHAVES.map(c => [c, comoNaPagina(LIDO.aviso[c])]));
const H = Object.fromEntries(CHAVES.map(c => [c, escapar(TEXTO_DO_AVISO[c])]));

// ··· O bloco ···
const ESTILO = `
.aviso-cookies{display:block;position:static;box-sizing:border-box;width:auto;margin:0;padding:0;border:0;border-bottom:1px solid #25312b;border-radius:0;background:rgba(10,16,13,.96);box-shadow:none;color:#cdd6d1;font-family:'Geist',system-ui,-apple-system,'Segoe UI',sans-serif;font-size:14px;font-style:normal;font-weight:400;line-height:1.5;letter-spacing:normal;text-align:left;text-transform:none;-webkit-font-smoothing:antialiased}
.aviso-cookies *,.aviso-cookies *::before,.aviso-cookies *::after{box-sizing:border-box}
.aviso-cookies:focus{outline:none}
.aviso-cookies:focus-visible{outline:2px solid #8bd6b1;outline-offset:-2px}
.aviso-cookies .aviso-cookies__linha{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:14px 32px;max-width:1140px;margin:0 auto;padding:18px 30px}
.aviso-cookies .aviso-cookies__texto{flex:1 1 420px;min-width:0}
.aviso-cookies .aviso-cookies__titulo{margin:0 0 4px;padding:0;color:#e5ece7;font-size:15px;font-weight:600;line-height:1.35}
.aviso-cookies .aviso-cookies__frase{margin:0;padding:0;color:#cdd6d1;font-size:14px;line-height:1.5}
.aviso-cookies .aviso-cookies__politica{margin:6px 0 0;padding:0;color:#cdd6d1;font-size:13px;line-height:1.45}
.aviso-cookies .aviso-cookies__botoes{display:flex;flex:0 0 auto;gap:12px;margin:0;padding:0}
.aviso-cookies .aviso-cookies__botao{-webkit-appearance:none;appearance:none;display:inline-flex;align-items:center;justify-content:center;flex:1 1 0;min-width:132px;min-height:44px;margin:0;padding:10px 20px;border:1px solid #8bd6b1;border-radius:12px;background:transparent;background-image:none;box-shadow:none;color:#e5ece7;font-family:inherit;font-size:15px;font-style:normal;font-weight:600;line-height:1.2;letter-spacing:normal;text-align:center;text-decoration:none;text-transform:none;white-space:nowrap;cursor:pointer;-webkit-tap-highlight-color:transparent}
.aviso-cookies .aviso-cookies__botao:hover{background:rgba(139,214,177,.12)}
.aviso-cookies .aviso-cookies__botao:focus{outline:none}
.aviso-cookies .aviso-cookies__botao:focus-visible{outline:2px solid #8bd6b1;outline-offset:3px}
.aviso-cookies-reabrir{display:block;position:static;box-sizing:border-box;margin:0;padding:24px 16px;border:0;background:transparent;font-family:'Geist',system-ui,-apple-system,'Segoe UI',sans-serif;font-size:13px;line-height:1.4;text-align:center}
.aviso-cookies-reabrir .aviso-cookies-reabrir__botao{-webkit-appearance:none;appearance:none;display:inline-block;margin:0;padding:6px 14px;border:1px solid #25312b;border-radius:999px;background:rgba(10,16,13,.96);background-image:none;box-shadow:none;color:#cdd6d1;font-family:inherit;font-size:13px;font-style:normal;font-weight:500;line-height:1.4;letter-spacing:normal;text-decoration:underline;text-underline-offset:2px;text-transform:none;cursor:pointer;-webkit-tap-highlight-color:transparent}
.aviso-cookies-reabrir .aviso-cookies-reabrir__botao:hover{color:#e5ece7}
.aviso-cookies-reabrir .aviso-cookies-reabrir__botao:focus{outline:none}
.aviso-cookies-reabrir .aviso-cookies-reabrir__botao:focus-visible{outline:2px solid #8bd6b1;outline-offset:3px}
@media (max-width:640px){
  .aviso-cookies .aviso-cookies__linha{gap:10px;padding:12px 16px}
  .aviso-cookies .aviso-cookies__texto{flex-basis:100%}
  .aviso-cookies .aviso-cookies__titulo{margin-bottom:2px;font-size:14px;line-height:1.3}
  .aviso-cookies .aviso-cookies__frase{font-size:13px;line-height:1.45}
  .aviso-cookies .aviso-cookies__politica{margin-top:4px;font-size:12px;line-height:1.4}
  .aviso-cookies .aviso-cookies__botoes{flex:1 1 100%}
  .aviso-cookies .aviso-cookies__botao{min-width:0}
}
`.trim();

const MODELOS =
  '<template id="aviso-cookies-modelo"><div class="aviso-cookies" id="aviso-cookies" role="region" aria-label="' + H.titulo + '" tabindex="-1">' +
  '<div class="aviso-cookies__linha"><div class="aviso-cookies__texto">' +
  '<p class="aviso-cookies__titulo">' + H.titulo + '</p>' +
  '<p class="aviso-cookies__frase">' + H.texto + '</p>' +
  '<p class="aviso-cookies__politica">' + H.politica + '</p></div>' +
  '<div class="aviso-cookies__botoes">' +
  '<button type="button" class="aviso-cookies__botao" data-escolha="' + ESCOLHAS.aceitar + '">' + H.aceitar + '</button>' +
  '<button type="button" class="aviso-cookies__botao" data-escolha="' + ESCOLHAS.recusar + '">' + H.recusar + '</button>' +
  '</div></div></div></template>\n' +
  '<template id="aviso-cookies-reabrir-modelo"><div class="aviso-cookies-reabrir" id="aviso-cookies-reabrir">' +
  '<button type="button" class="aviso-cookies-reabrir__botao">' + H.reabrir + '</button></div></template>';

// 1. O padrão de consentimento, antes de tudo: anúncio e análise negados. Anúncio nunca recebe update (#116).
const CONSENTIMENTO_PADRAO = `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'default', {ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied'});`;

// 4. O programa do aviso. Sem comentário com endereço: a conferência da montagem só aceita o carregador dentro do bloco.
const PROGRAMA = `(function () {
  'use strict';
  var CHAVE = ${JSON.stringify(CHAVE_ESCOLHA)};
  var CODIGO = ${JSON.stringify(CODIGO_GTM)};
  var ACEITO = ${JSON.stringify(ESCOLHAS.aceitar)}, RECUSADO = ${JSON.stringify(ESCOLHAS.recusar)};
  var escolha = null, carregou = false, voltarFocoPara = null, porTeclado = false;
  /* A escolha fica só no localStorage; o modo privado pode recusar, e aí a página só não lembra a escolha */
  function lerEscolha() {
    try { var v = window.localStorage.getItem(CHAVE); return v === ACEITO || v === RECUSADO ? v : null; } catch (e) { return null; }
  }
  function guardarEscolha(v) {
    escolha = v;
    try { window.localStorage.setItem(CHAVE, v); } catch (e) {}
  }
  /* A busca sem o parâmetro id_sessao; os outros parâmetros ficam como estão */
  function semIdSessao(busca) {
    if (!busca || busca.charAt(0) !== '?') return '';
    var resto = busca.slice(1).split('&').filter(function (parte) {
      var nome = parte.split('=')[0];
      try { nome = decodeURIComponent(nome.replace(/\\+/g, ' ')); } catch (e) {}
      return nome !== 'id_sessao';
    }).join('&');
    return resto ? '?' + resto : '';
  }
  function paginaLimpa() { return location.origin + location.pathname + semIdSessao(location.search); }
  function origemLimpa() {
    var r = (document.referrer || '').split('#')[0], q = r.indexOf('?');
    return q < 0 ? r : r.slice(0, q) + semIdSessao(r.slice(q));
  }
  /* Tira o id_sessao do endereço da barra, com o mesmo # (a página já leu o código ao abrir e o guarda na memória da aba) */
  function limparEndereco() {
    var busca = semIdSessao(location.search);
    if (busca === location.search) return;
    try { history.replaceState(history.state, '', location.pathname + busca + location.hash); } catch (e) {}
  }
  /* O carregador padrão do Tag Manager, sem o noscript, uma vez só */
  function carregarTagManager() {
    if (carregou) return;
    carregou = true;
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='${CARREGADOR_GTM}'+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',CODIGO);
  }
  function ligarMedicao() {
    window.gtag('consent', 'update', {analytics_storage: 'granted'});
    if (carregou) return;
    limparEndereco();
    window.dataLayer.push({pagina_limpa: paginaLimpa(), origem_limpa: origemLimpa()});
    carregarTagManager();
  }
  /* Os cookies do Google Analytics (nome começando por _ga), sem domínio e com o domínio do endereço e os de cima dele */
  function apagarCookiesGa() {
    var nomes = document.cookie.split(';').map(function (c) { return c.split('=')[0].trim(); })
      .filter(function (n) { return n.indexOf('_ga') === 0; });
    var host = location.hostname, dominios = [''];
    if (host) {
      var partes = /^[0-9.]+$/.test(host) || host.indexOf(':') > -1 ? [host] : host.split('.');
      for (var k = 0; k < Math.max(1, partes.length - 1); k++) dominios.push('; domain=' + partes.slice(k).join('.'));
    }
    nomes.forEach(function (n) {
      dominios.forEach(function (d) { document.cookie = n + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=/' + d; });
    });
  }
  function desligarMedicao() {
    window.gtag('consent', 'update', {analytics_storage: 'denied'});
    apagarCookiesGa();
  }
  function modelo(id) {
    var t = document.getElementById(id);
    return t && t.content && t.content.firstElementChild ? t.content.firstElementChild.cloneNode(true) : null;
  }
  /* Na página com margem dos lados (o quiz), o aviso vai de uma borda à outra, como o cabeçalho */
  function encostarNasBordas(el) {
    try {
      var cs = window.getComputedStyle(document.body);
      el.style.marginLeft = '-' + cs.paddingLeft;
      el.style.marginRight = '-' + cs.paddingRight;
    } catch (e) {}
  }
  function mostrarAviso(focar) {
    var aviso = document.getElementById('aviso-cookies');
    if (!aviso) {
      aviso = modelo('aviso-cookies-modelo');
      if (!aviso) return;
      encostarNasBordas(aviso);
      aviso.addEventListener('click', function (e) {
        var b = e.target && e.target.closest ? e.target.closest('[data-escolha]') : null;
        /* detail 0: o botão foi acionado pelo teclado (Enter ou espaço), não pelo mouse nem pelo toque */
        if (b) { porTeclado = e.detail === 0; escolher(b.getAttribute('data-escolha')); }
      });
      document.body.insertBefore(aviso, document.body.firstChild);
    }
    if (focar) { try { aviso.focus(); } catch (e) {} }
  }
  /* O primeiro elemento focável da página depois do aviso, desenhado na página (não escondido); naTela: só os que estão à vista */
  function proximoFocavel(naTela) {
    var lista = document.body.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])');
    for (var i = 0; i < lista.length; i++) {
      var el = lista[i];
      if (el.closest('#aviso-cookies') || !el.getClientRects().length || window.getComputedStyle(el).visibility === 'hidden') continue;
      if (naTela) { var r = el.getBoundingClientRect(); if (r.bottom <= 0 || r.top >= window.innerHeight || r.right <= 0 || r.left >= window.innerWidth) continue; }
      return el;
    }
    return null;
  }
  function focar(el, semRolar) {
    try { if (semRolar) el.focus({preventScroll: true}); else el.focus(); } catch (e) { try { el.focus(); } catch (e2) {} }
  }
  /* O foco nunca fica no body. Reaberto pelo link "Cookies", o foco volta ao link. Escolhido com o foco dentro do aviso: pelo teclado,
     vai ao primeiro elemento focável depois do aviso (no quiz, o "Pular para o conteúdo"); pelo mouse ou pelo toque, ao primeiro que
     está à vista, para o "Pular para o conteúdo" (que aparece quando recebe o foco) não surgir na tela de quem clicou */
  function esconderAviso() {
    var aviso = document.getElementById('aviso-cookies');
    var focoDentro = !!aviso && aviso.contains(document.activeElement);
    if (aviso && aviso.parentNode) aviso.parentNode.removeChild(aviso);
    if (voltarFocoPara) { focar(voltarFocoPara, false); voltarFocoPara = null; return; }
    if (!focoDentro) return;
    var alvo = (porTeclado ? null : proximoFocavel(true)) || proximoFocavel(false);
    if (alvo) focar(alvo, true);
  }
  function escolher(nova) {
    var antes = escolha;
    if (nova === ACEITO) { guardarEscolha(ACEITO); ligarMedicao(); }
    else if (nova === RECUSADO) { guardarEscolha(RECUSADO); if (antes === ACEITO || carregou) desligarMedicao(); }
    else return;
    esconderAviso();
  }
  function porLinkReabrir() {
    if (document.getElementById('aviso-cookies-reabrir')) return;
    var p = modelo('aviso-cookies-reabrir-modelo');
    if (!p) return;
    p.addEventListener('click', function (e) {
      var b = e.target && e.target.closest ? e.target.closest('button') : null;
      if (!b) return;
      voltarFocoPara = b;
      mostrarAviso(true);
    });
    document.body.appendChild(p);
  }
  function iniciar() {
    escolha = lerEscolha();
    if (escolha === ACEITO) ligarMedicao();
    else if (escolha !== RECUSADO) mostrarAviso(false);
    porLinkReabrir();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();`;

export function blocoDaMedicao() {
  return [
    MARCA_INICIO,
    '<script>\n' + CONSENTIMENTO_PADRAO + '\n</script>',
    '<style>\n' + ESTILO + '\n</style>',
    MODELOS,
    '<script>\n' + PROGRAMA + '\n</script>',
    MARCA_FIM
  ].join('\n');
}

// Acrescenta o bloco logo depois da <meta charset="utf-8">. Erro se não houver a meta ou se o bloco já existir.
const META_CHARSET = /<meta\s+charset=["']?utf-8["']?\s*\/?>/i;
export function acrescentarMedicao(html) {
  if (html.includes(MARCA_INICIO) || html.includes(MARCA_FIM)) throw new Error('o bloco da medição já existe na página');
  const m = html.match(META_CHARSET);
  if (!m) throw new Error('sem <meta charset="utf-8"> para pôr o bloco da medição depois');
  const fim = m.index + m[0].length;
  return html.slice(0, fim) + '\n' + blocoDaMedicao() + html.slice(fim);
}
