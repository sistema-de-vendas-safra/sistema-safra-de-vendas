// A página da política de privacidade no site do protótipo do funil-01 · Node, sem dependências
// id: prototipo-funil-01 · versao 11 · rascunho · otavio: pendente (ver README.md desta pasta)
//
// v11 (13/11/2026; decisão #117): a política saiu do rascunho e ganha página, em /politica-de-privacidade/, para onde vão
// os links do quiz e do aviso de cookies. A página é montada a partir de entregas/documentos/politica-de-privacidade.md,
// só da seção "## Texto para o lead" (a seção "Para a equipe" e as "Fontes" não vão para a página):
//   {{a definir: X}} e {{a definir}}   aparecem como "[a definir: X]" e "[a definir]", como no quiz;
//   {{ficha-de-fatos#campo}}            vira o valor do campo em base/ficha-de-fatos.md, se ele estiver decidido, aprovado
//                                       ou pendente de aprovação; senão, "[a definir: campo]" (fato referenciado, nunca copiado);
//   {{BLOQUEADO: ...}}                  é anotação para a equipe: sozinho num parágrafo, não aparece; no meio do texto, "[a definir]";
//   qualquer outro {{...}}              para a montagem.
// O markdown usado no texto (títulos ###, parágrafos, listas com "-" e "1.", tabela, **negrito**, `código` e ---) vira HTML
// simples. Nenhum link para fora, nenhuma fonte de fora: a Geist vem de /fontes/, como na landing-page-02.

import { readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = resolve(AQUI, '../..');
export const DOC_POLITICA = 'entregas/documentos/politica-de-privacidade.md';
const DOC_FICHA = 'base/ficha-de-fatos.md';
export const CAMINHO_DA_POLITICA = 'politica-de-privacidade/index.html';

const escapar = t => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// O valor de um campo da ficha de fatos, se ele puder ir para a página
function valorDaFicha(ficha, campo) {
  const i = ficha.indexOf('\n### ' + campo + '\n');
  if (i < 0) throw new Error(DOC_FICHA + ': não tem o campo ' + campo);
  const fim = ficha.indexOf('\n### ', i + 5);
  const bloco = ficha.slice(i, fim < 0 ? undefined : fim);
  const valor = (bloco.match(/^- \*\*Valor:\*\*\s*(.+)$/m) || [])[1];
  const status = (bloco.match(/^- \*\*Status:\*\*\s*(.+)$/m) || [])[1] || '';
  if (!valor || !/^(decidido|aprovado|pendente-aprovacao)/.test(status)) return '[a definir: ' + campo.replace(/-/g, ' ') + ']';
  return valor.trim().replace(/\.$/, '');
}

// Troca os marcadores {{...}} do texto para o lead pelo que aparece na página
function resolverMarcadores(texto, ficha) {
  // BLOQUEADO sozinho num parágrafo: anotação para a equipe, não vai para a página
  texto = texto.replace(/^\{\{BLOQUEADO:[^{}]*\}\}\s*$/gm, '');
  texto = texto.replace(/\{\{BLOQUEADO:[^{}]*\}\}/g, '[a definir]');
  texto = texto.replace(/\{\{ficha-de-fatos#([a-z0-9-]+)\}\}/g, (_, campo) => valorDaFicha(ficha, campo));
  texto = texto.replace(/\{\{a definir:\s*([^{}]*?)\s*\}\}/g, '[a definir: $1]');
  texto = texto.replace(/\{\{a definir\}\}/g, '[a definir]');
  const sobra = texto.match(/\{\{[^}]*\}\}/);
  if (sobra) throw new Error(DOC_POLITICA + ': marcador que a página não sabe mostrar (' + sobra[0] + ')');
  return texto;
}

// Negrito e código, depois de escapar o HTML
const emLinha = t => escapar(t)
  .replace(/`([^`]+)`/g, '<code>$1</code>')
  .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

// O markdown do texto para o lead em HTML simples
function paraHtml(md) {
  const blocos = md.replace(/\r\n/g, '\n').split(/\n{2,}/).map(b => b.trim()).filter(Boolean);
  const html = [];
  for (const b of blocos) {
    const linhas = b.split('\n');
    if (/^---+$/.test(b)) continue;                                  // separador do fim da seção
    if (/^### /.test(b)) { html.push('<h2>' + emLinha(b.slice(4)) + '</h2>'); continue; }
    if (/^#### /.test(b)) { html.push('<h3>' + emLinha(b.slice(5)) + '</h3>'); continue; }
    if (linhas.every(l => l.startsWith('|'))) {                      // tabela: cabeçalho, separador, linhas
      const cel = l => l.replace(/^\||\|$/g, '').split('|').map(c => c.trim());
      const [cab, , ...corpo] = linhas;
      html.push('<div class="tabela"><table><thead><tr>' + cel(cab).map(c => '<th>' + emLinha(c) + '</th>').join('') + '</tr></thead><tbody>' +
        corpo.map(l => '<tr>' + cel(l).map(c => '<td>' + emLinha(c) + '</td>').join('') + '</tr>').join('') + '</tbody></table></div>');
      continue;
    }
    if (linhas.every(l => /^- /.test(l))) { html.push('<ul>' + linhas.map(l => '<li>' + emLinha(l.slice(2)) + '</li>').join('') + '</ul>'); continue; }
    if (linhas.every(l => /^\d+\. /.test(l))) { html.push('<ol>' + linhas.map(l => '<li>' + emLinha(l.replace(/^\d+\. /, '')) + '</li>').join('') + '</ol>'); continue; }
    if (/^#/.test(b) || linhas.some(l => /^(- |\d+\. |\|)/.test(l))) throw new Error(DOC_POLITICA + ': bloco que a página não sabe mostrar (' + b.slice(0, 60) + ')');
    html.push('<p>' + emLinha(linhas.join(' ')) + '</p>');
  }
  return html.join('\n');
}

const ESTILO = `
@font-face{font-family:'Geist';font-style:normal;font-weight:100 900;font-display:swap;src:url('/fontes/geist-latin-wght-normal.woff2') format('woff2')}
*,*::before,*::after{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:#f3f5ef;color:#0a100d;font-family:'Geist',system-ui,-apple-system,'Segoe UI',sans-serif;font-size:16px;line-height:1.6;-webkit-font-smoothing:antialiased}
.politica{max-width:760px;margin:0 auto;padding:48px 20px 32px}
.politica h1{margin:0 0 20px;font-size:clamp(1.8rem,6vw,2.4rem);line-height:1.15;letter-spacing:-.02em}
.politica h2{margin:40px 0 12px;font-size:1.25rem;line-height:1.3;letter-spacing:-.01em}
.politica h3{margin:28px 0 8px;font-size:1.05rem}
.politica p,.politica li{color:#2b3330}
.politica p{margin:0 0 14px}
.politica ul,.politica ol{margin:0 0 16px;padding-left:1.4em}
.politica li{margin:0 0 6px}
.politica strong{color:#0a100d;font-weight:600}
.politica code{padding:1px 5px;border-radius:4px;background:#e2e6da;font-family:ui-monospace,Menlo,Consolas,monospace;font-size:.88em}
.politica .tabela{margin:0 0 16px;overflow-x:auto}
.politica table{width:100%;border-collapse:collapse;font-size:.94rem}
.politica th,.politica td{padding:10px 12px;border:1px solid #d8dcd0;text-align:left;vertical-align:top}
.politica th{background:#e9ede3;font-weight:600}
@media (max-width:480px){.politica{padding:32px 16px 24px}.politica table{font-size:.88rem}}
`.trim();

// A página inteira, pronta para a montagem (que acrescenta o bloco da medição e confere tudo)
export function montarPaginaPolitica() {
  const md = readFileSync(join(RAIZ, DOC_POLITICA), 'utf8').replace(/\r\n/g, '\n');
  const ficha = readFileSync(join(RAIZ, DOC_FICHA), 'utf8').replace(/\r\n/g, '\n');
  const versao = (md.match(/^versao:\s*(\d+)\s*$/m) || [])[1];
  const status = (md.match(/^status:\s*(\S+)\s*$/m) || [])[1];
  if (status === 'rascunho') throw new Error(DOC_POLITICA + ': a política está em rascunho e não vai para a página');
  const ini = md.indexOf('\n## Texto para o lead\n');
  const fim = md.indexOf('\n## Fontes', ini);
  if (ini < 0 || fim < 0) throw new Error(DOC_POLITICA + ': sem as seções "## Texto para o lead" e "## Fontes"');
  const texto = resolverMarcadores(md.slice(ini + '\n## Texto para o lead\n'.length, fim), ficha);
  const corpo = paraHtml(texto);
  const html = '<!doctype html>\n<html lang="pt-BR">\n<head>\n<meta charset="utf-8">\n' +
    '<meta name="robots" content="noindex, nofollow">\n' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">\n' +
    '<title>Política de privacidade</title>\n<style>\n' + ESTILO + '\n</style>\n</head>\n<body>\n' +
    '<!-- montada de ' + DOC_POLITICA + ' (versao ' + versao + ', ' + status + ') por entregas/prototipo-funil-01/pagina-politica.mjs -->\n' +
    '<main class="politica">\n<h1>Política de privacidade</h1>\n' + corpo + '\n</main>\n</body>\n</html>\n';
  return { html, versao: Number(versao), status };
}
