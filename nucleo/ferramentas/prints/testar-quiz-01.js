// Teste do quiz-01 (entregas/quizzes/quiz-01/pagina/index.html, v12), sem rede de verdade.
// Uso: node nucleo/ferramentas/prints/testar-quiz-01.js
// A página é servida por um servidorzinho em 127.0.0.1, só durante o teste, em /analise/ (como no site
// do protótipo, desde a decisão #120; antes, em /quiz/), com as fontes em /analise/fontes/ tiradas de nucleo/ferramentas/fontes/ (como faz o montador).
// Os POST para /api/fim-quiz e /api/evento são interceptados pelo navegador sem tela e respondidos aqui:
// nada sai para o garçom nem para o Supabase. Cada pacote recebido passa pelas mesmas conferências do
// garçom v4 (conferirPacote e conferirEvento, importadas de entregas/garcom/garcom.mjs).
// 1. Exemplo de base/lead-score.md, caixa marcada (o padrão): início do quiz ao abrir, total 96, faixa a.
// 2. Eliminatório com a sessão vinda da landing: faixa e nota, e o clique em "Tenho interesse" depois do fim gravado.
// 3. Corte mais restritivo (14.2): faixa c, que passa no corte do Júnior, vai para o relatório de não qualificado;
//    com /api/evento fora do ar, a pessoa segue sem aviso (10.10).
// 4. Caixa desmarcada (13.4): o diagnóstico aparece e nada é enviado, nem o fim do quiz nem o clique.
// 5. Envio que falha: aviso visível, diagnóstico na tela, "Tentar de novo" reenvia o mesmo pacote;
//    no eliminatório, o clique feito durante a falha só sai depois de o reenvio gravar (32.2).
// 6. Aberta direto do arquivo (file://): percorre tudo e nada é enviado.
// 7. (v12) Vendas zero, com o nome da empresa: a conta aguenta e o topo mostra a empresa.
// 8. (v12) Quem não lembra dos números: o relatório e a conversa com o aviso de exemplo.
// 9. (v12) Funil saudável, qualificado e não qualificado: a tabela de crescimento com os números da pessoa.
// 10. (v12) Números fora de ordem: o aviso, o botão aceso e o relatório sem conta quebrada.
// Conversa gratuita (quiz-01-pagina v8; pedido do Otávio, 15/11/2026): o qualificado com etapa abaixo da meta vai, depois do
// contato, à tela "conversa" (no lugar da oferta do plano de 90 dias): as falas e as opções com o texto aprovado; "Sim, eu quero"
// (exemplo) e "Agora não" (falha) dão cada um a sua resposta e mandam os cliques quero-conversa e agora-nao; o botão
// "Ver meu diagnóstico" abre o relatório do qualificado sem o bloco de chamada, que pelo painel "Telas" continua lá; e nenhum
// texto da oferta antiga sobra, nem no arquivo da página.
// Fim do relatório (quiz-01-pagina v9; pedido do Otávio, 16/11/2026): nenhum dos cinco relatórios tem mais o vídeo
// "Antes de decidir · 1 minuto com o Junior", os botões "Compartilhar" e "Baixar PDF" nem o rodapé (Triad, metas usadas e
// "Final do quiz"), nem pelo caminho do quiz nem pelo painel "Telas"; e nada disso sobra no arquivo da página.
// Abertura (v4): o quiz abre nela, sem a capa, com o cabeçalho e o botão "Fazer a Análise" da landing-page-02. No computador,
// título, promessa e botão ficam parados enquanto o relatório de exemplo rola; no celular, o texto vem antes e o botão fica fixo
// no rodapé quando o da página sai da tela. A entrada no quiz é pelo botão da abertura, pelo do cabeçalho (eliminatório) e,
// no celular, pelo do rodapé (corte).
// Em todos: o console não mostra o pacote nem nenhum dado de pessoa, e nenhuma requisição sai para outro endereço.
// Medição (v9 do protótipo, pedido 17, 17.2; decisão #116): a página é servida com o bloco que a montagem acrescenta
// (entregas/prototipo-funil-01/medicao.mjs), salvo no caso 6, que abre a entrega crua. Os casos 1 a 6 rodam em 375, 360 (com 640
// de altura) e 1440, sem tocar no aviso de cookies, que fica no topo. Duas conferências da abertura mudaram de ponto de partida por
// causa dele: "só o relatório rola" começa com o aviso rolado para fora (a forma original, de scroll 0, roda na seção da medição
// com "recusado" guardado); e "sem a barra antes de rolar" virou a regra da página, que vale com e sem o aviso: a barra aparece
// se, e só se, o botão da abertura está fora da tela ou sob o cabeçalho. Seção nova da medição, nas três larguras: sem escolha (o
// aviso no topo, em fluxo normal, sem cobrir os botões nem a barra do celular, nada guardado, nada para fora); "Recusar" (guarda
// "recusado", nada para fora, nem depois de recarregar; o foco não fica no body); "Aceitar" com o id_sessao no endereço (o
// primeiro pedido para fora é o gtm.js do GTM-T6L4QTB8, só o Google, pagina_limpa e origem_limpa sem o id_sessao, o endereço da
// barra limpo, só a análise concedida); uma rodada inteira com o "Aceitar" no começo (o mesmo id_sessao no início, no fim e no
// clique); teclado (o foco vai ao "Pular para o conteúdo" depois da escolha); o link "Cookies"; e a troca de aceito para recusado
// (cookies _ga apagados). Em todo contexto, o pedido a www.googletagmanager.com é respondido aqui com 404, como enquanto o
// contêiner não é publicado, e anotado como requisição para outro endereço: nenhum pedido ao Google sai da máquina.
// Tira prints em 375 e 1440 pixels em entregas/quizzes/quiz-01/prints/ (e os do aviso, aviso-375 e aviso-1440); em 360, nenhum.
// Dados de pessoa de teste, marcados (#102): nome começando por TESTE, e-mail @teste.invalid.
// v12 da página (25/11/2026, #123; pedido 23, parte 23.4): a tela dos números só em quantidade (os textos novos, nenhum "%" além do
// "= n% de", o botão que só acende com os cinco e vendas podendo ser zero, a dica); as pessoas de teste escrevem a linha de
// pré-qualificados em número (200 · 100 e 30 · 15, os mesmos funis de antes, as mesmas notas); a pessoa de teste se chama Joana, não
// Marina, o nome do exemplo da página. O relatório de cada pessoa com os números dela, conferidos contra uma conta feita aqui à parte
// (contaAParte) e contra o perfil do painel da conversa gratuita, e o dinheiro na mesa igual ao que o lead score usou; sem empresa, o
// topo sem nome de empresa; casos novos: vendas zero (com empresa) e quem não lembra (o aviso de exemplo e nenhuma frase que dê o
// exemplo como dela); o funil pequeno da faixa c sem venda a mais; nada de NaN, Infinity, undefined ou negativo; o painel "Telas" e a
// abertura continuam com o exemplo. Prints novos: numeros, relatorio-pessoa e relatorio-exemplo, em 375 e 1440.
const { chromium } = require('playwright-core');
const path = require('path');
const fs = require('fs');
const http = require('http');
const { pathToFileURL } = require('url');
const { acharChromium } = require('./print.js');

const RAIZ = path.resolve(__dirname, '../../..');
const PASTA = path.join(RAIZ, 'entregas/quizzes/quiz-01/pagina');
const FONTES = path.join(RAIZ, 'nucleo/ferramentas/fontes');
const LISTA_FONTES = JSON.parse(fs.readFileSync(path.join(FONTES, 'fontes.json'), 'utf8')).quiz;
const BUSCA = '?utm_source=bio&utm_campaign=funil-01';
const ARQUIVO = 'file://' + path.join(PASTA, 'index.html') + BUSCA;
const PRINTS = path.join(RAIZ, 'entregas/quizzes/quiz-01/prints');
// v12 da página (#123): a pessoa de teste não se chama mais Marina, o nome do exemplo da página, para a conferência
// "nenhum valor de exemplo no relatório de quem fez o quiz" valer
const PESSOA = { nome: 'TESTE Joana', email: 'joana@teste.invalid', tel: '00900000000' };
const SESSAO_DA_LANDING = 'sessao-landing-teste-0001';
// copy v3 (M16; #122, 18/11/2026): a caixa cobre também o uso do e-mail e do WhatsApp, em código, para medir os anúncios da Meta
const CAIXA = 'Aceito receber o meu diagnóstico e o contato da equipe por WhatsApp, por mensagem ou ligação, e por e-mail, e o uso do meu e-mail e do meu WhatsApp, em código, para medir os anúncios da Meta.';
const NOTA_LEAD_SCORE = 'Anotado. Seu interesse fica registrado com o seu diagnóstico.';
// A conversa gratuita com o Junior (v8): os textos aprovados pelo Otávio, letra por letra, com o nome do teste (Joana)
const CONVERSA = {
  fala: 'Antes de abrir o seu diagnóstico, uma pergunta, Joana.',
  pergunta: 'Quer uma conversa gratuita comigo? Eu te apresento um plano de ação de 90 dias para aumentar a eficácia do sistema de vendas da sua empresa.',
  opcoes: ['Sim, eu quero', 'Agora não'],
  sim: 'Fechou, Joana. Em alguns minutos alguém do meu time chama você no WhatsApp para marcar.',
  nao: 'Tudo bem, Joana. O seu diagnóstico está pronto.',
  botao: 'Ver meu diagnóstico'
};
// Textos da oferta antiga do plano de 90 dias (até a v7), que não podem sobrar
const OFERTA_ANTIGA = ['Quer receber o seu plano de ação de 90 dias?', 'Quero ver como é', 'recado rápido', 'placeholder · vídeo', 'Envie o meu plano de ação.'];
const RELATORIO_SEM_CHAMADA = 'Quer resolver isso junto com a nossa equipe?';
// O fim que saiu de todos os relatórios na v9: o vídeo, os dois botões e o rodapé (textos e peças)
const FIM_ANTIGO = { textos: ['1 minuto com o Junior', 'vídeo do Junior', 'Compartilhar', 'Baixar PDF', 'Metas usadas', 'Final do quiz'],
  pecas: ['.video-bloco', '.video', '.acoes', '.rodape', 'footer'] };
const RELATORIOS = ['relatorio', 'relatorio-nao', 'relatorio-chute', 'relatorio-saudavel', 'relatorio-saudavel-nao'];
const FORMATO_SESSAO = /^sessao-[a-z0-9-]{1,60}$/;
// nada disto pode aparecer no console da página
const DADO_PESSOAL = /TESTE|teste\.invalid|90000|pacote fim_quiz|"pessoa"/;

// Servidorzinho só para o teste: serve a pasta da página em /analise/ e as fontes da lista em /analise/fontes/, nada mais
const TIPOS = { '.html': 'text/html; charset=utf-8', '.jpg': 'image/jpeg', '.woff2': 'font/woff2' };
function servir() {
  const srv = http.createServer((req, res) => {
    const u = new URL(req.url, 'http://127.0.0.1');
    let arq = null;
    const fonte = u.pathname.startsWith('/analise/fontes/') && LISTA_FONTES.find(f => '/analise/fontes/' + f.arquivo === u.pathname);
    if (fonte) arq = path.join(FONTES, 'node_modules', fonte.pacote, 'files', fonte.arquivo);
    else {
      const nome = u.pathname === '/analise/' ? 'index.html' : u.pathname.startsWith('/analise/') ? u.pathname.slice(9) : null;
      arq = nome && path.join(PASTA, path.normalize(nome));
      if (arq && !arq.startsWith(PASTA)) arq = null;
    }
    if (!arq || !fs.existsSync(arq) || fs.statSync(arq).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': TIPOS[path.extname(arq)] || 'application/octet-stream' });
    // A página vai com o bloco da medição, como no site montado (o mesmo medicao.mjs da montagem; v9 do protótipo)
    if (arq === path.join(PASTA, 'index.html')) return res.end(medicao.acrescentarMedicao(fs.readFileSync(arq, 'utf8')));
    fs.createReadStream(arq).pipe(res);
  });
  return new Promise(ok => srv.listen(0, '127.0.0.1', () => ok(srv)));
}

// Exemplo de conferência de base/lead-score.md (v3, mesmos pontos da v2):
// faturamento R$ 500 mil a R$ 1,5 milhão (15) · venda média R$ 10 mil (15) · 2 ou 3 vendedores (10) · 200 leads (10)
// CRM em dia (10) · dono (15) · dinheiro na mesa de 4 vezes o custo mensal (15) · tentativas "1 ou 2" e sobra "Alguns" (6) = 96
// O funil 200 · 100 · 50 · 40 · 2 (até a v11 da página, 200 · 50% · 50 · 40 · 2), com venda de R$ 10 mil, deixa 6 vendas na mesa: R$ 60 mil = 4 × (R$ 45 mil ÷ 3).
// Primeiro contato "Em até 1 hora" vale 0, para os sinais somarem os 6 do exemplo.
const EXEMPLO = {
  ramo: 'Serviços para empresas', faturamento: 'R$ 500 mil a R$ 1,5 milhão', vendedores: '2 ou 3',
  'quem-marca': 'Sim. O vendedor faz tudo', ticket: '10000', origem: 'Indicação de clientes',
  crm: 'Sim, e o time atualiza todo dia', cargo: 'Dono(a) ou sócio(a)',
  numeros: ['200', '100', '50', '40', '2'], causa: 'Em até 1 hora', causa2: '1 ou 2', causa3: 'Alguns'
};
const ELIMINATORIO = Object.assign({}, EXEMPLO, { faturamento: 'Menos de R$ 50 mil' });
// Faixa c que passa no corte do Júnior (fatura a partir de R$ 50 mil e tem vendedor):
// faturamento 5 · venda de R$ 6 mil 5 · 1 vendedor 3 · 30 leads 0 · sem CRM 0 · vendedor 2 · funil 30 · 15 · 5 · 4 · 1 (até a v11, 30 · 50% · 5 · 4 · 1),
// que na meta continua com 1 venda (dinheiro na mesa zero, "menos de 0,5": 3) · sinais 6 = 24, faixa c.
const FAIXA_C = Object.assign({}, EXEMPLO, {
  faturamento: 'R$ 50 mil a R$ 150 mil', ticket: '6000', vendedores: '1', crm: 'Não. Fica no WhatsApp e na cabeça de cada um',
  cargo: 'Vendedor(a)', numeros: ['30', '15', '5', '4', '1']
});
// v12 (#123): vendas zero, com o nome da empresa (o topo do relatório mostra a empresa); e quem não lembra dos números
const VENDAS_ZERO = Object.assign({}, EXEMPLO, { numeros: ['200', '100', '50', '40', '0'], empresa: 'TESTE Padaria' });
const NAO_LEMBRA = Object.assign({}, EXEMPLO, { lembra: 'Não', chute: 'Mais de 75%' });
// v12: o funil saudável (o da faixa b do ensaio), qualificado e, com o faturamento do eliminatório, não qualificado; e números fora de ordem
const SAUDAVEL = Object.assign({}, EXEMPLO, { numeros: ['200', '100', '50', '40', '10'] });
const SAUDAVEL_NAO = Object.assign({}, SAUDAVEL, { faturamento: 'Menos de R$ 50 mil' });
const FORA_DE_ORDEM = Object.assign({}, EXEMPLO, { numeros: ['200', '250', '50', '40', '2'], foraDeOrdem: true });
// O dinheiro na mesa no lead score (base/lead-score.md v3): dinheiro na mesa por mês ÷ custo mensal (ficha-de-fatos#preco-avancada
// R$ 45 mil ÷ 3 = R$ 15 mil): 1 ou mais vale 15, 0,5 ou mais vale 8, menos vale 3. A nota é a soma das outras partes (fixas para cada
// pessoa de teste) com essa. A página não expõe a conta do lead score, então a nota recebida no pacote é a prova.
const pontosMesaT = mesa => mesa / 15000 >= 1 ? 15 : mesa / 15000 >= 0.5 ? 8 : 3;
// as outras partes: EXEMPLO e os que copiam dele 81 (96 menos os 15 do dinheiro na mesa); FAIXA_C 21 (24 menos 3); com o eliminatório, 15 a menos
const notaT = (base, r) => base + pontosMesaT(contaAParte(r.numeros, r.ticket).extraR);

// ··· v12 da página (#123, pedido 23): os números da pessoa no relatório ···
// A conta do relatório refeita aqui, à parte (não usa a da página), com as metas de ficha-de-fatos#metas-por-etapa (50 · 50 · 75 · 20):
// vendas de hoje, vendas com as etapas fracas na meta, dinheiro na mesa e a etapa que mais pesa (a de maior ln(meta ÷ taxa);
// com taxa zero, ela leva tudo).
const METAS_T = [50, 50, 75, 20];
const PERFIS_T = ['Semente fraca', 'Lead esfriando na fila', 'Agenda furada', 'Conversa sem fechamento'];
const pctT = n => n.toLocaleString('pt-BR', { maximumFractionDigits: 1 }) + '%';
const milT = n => 'R$ ' + Math.round(n / 1000).toLocaleString('pt-BR') + ' mil';
function contaAParte(numeros, ticket) {
  const v = numeros.map(Number), t = [1, 2, 3, 4].map(i => v[i] / v[i - 1] * 100);
  const fracas = [0, 1, 2, 3].filter(i => t[i] < METAS_T[i]);
  const hoje = Math.floor(v[4] + 1e-9);
  const naMeta = Math.floor(v[0] * t.reduce((a, x, i) => a * (fracas.includes(i) ? METAS_T[i] : x) / 100, 1) + 1e-9);
  const peso = i => t[i] === 0 ? Infinity : Math.log(METAS_T[i] / t[i]);
  let principal = null;
  fracas.forEach(i => { if (principal === null || peso(i) > peso(principal)) principal = i; });
  return { leads: v[0], taxas: t, fracas, hoje, naMeta, extraV: naMeta - hoje, extraR: (naMeta - hoje) * Number(ticket),
    perfil: principal === null ? 'Funil redondo, pouca semente' : PERFIS_T[principal] };
}
// Textos da tela dos números (copy v4, 5.2; proposta do mentor) e do relatório de quem não lembra (copy v4; #123)
const NUMEROS_T = {
  pergunta: 'Pense em um mês normal e escreva cada número como lembrar.',
  ajuda: 'Em quantidade, não em porcentagem: quantos leads chegaram, quantos marcaram a conversa, quantos compraram. Número aproximado já serve.',
  dica: 'Preencha os cinco números para seguir. Só as vendas podem ser zero. Se não lembrar de algum, toque no ✎ da pergunta anterior e responda “Não”.'
};
// o título leva o primeiro nome do contato (no teste, TESTE, de TESTE Joana)
const EXEMPLO_T = ['exemplo · sem os seus números', 'TESTE, sem os seus números, este é um funil de exemplo.',
  'Um funil comum, com 400 leads por mês e R$ 15 mil por venda, para mostrar onde as vendas costumam escapar. Não é o diagnóstico da sua empresa. Com os cinco números do seu funil, a conta passa a ser a sua.',
  'As 4 etapas do exemplo contra as metas', 'Onde um funil como este perde performance', 'por mês · no exemplo', 'No exemplo, são cerca de ',
  'Conta de exemplo, não é a sua nem é promessa: um funil de 400 leads por mês e valor médio de R$ 15.000. Com os seus números, a conta fica sua.'];
// frases que dão um número do exemplo como da pessoa ou do time dela (23.3, item 4)
const PROIBIDAS_NO_EXEMPLO = ['Suas 4 etapas', 'Onde sua equipe perde', 'Pela sua estimativa', 'Onde você respondeu', 'seus leads', 'você informou', 'estimativa · respostas por chute',
  'O resumo do seu comercial', 'O que já funciona:', 'Dinheiro na mesa: ≈', 'Vocês sabem os números', 'confiança alta'];
// valores de exemplo da página que não podem chegar a quem fez o quiz (23.3, itens 2 e 5)
const EXEMPLO_DA_PAGINA = ['R$ 120 mil', 'Empresa Exemplo', 'Marina', 'empresaexemplo'];
// e no histórico da conversa (as respostas que a página mostraria do exemplo se faltassem)
const EXEMPLO_NO_HISTORICO = ['marina@empresaexemplo.com.br', 'Marina', 'Empresa Exemplo', '+55 (11) 98765-4321'];
const QUEBRADO = /NaN|Infinity|undefined|(^|[\s(+])-\d/;

// Altura da janela em cada largura: 375 e 1440 como sempre; 360 com 640, o celular pequeno (medição, v9 do protótipo)
const ALTURA = { 375: 812, 360: 640, 1440: 900 };
let falhas = 0;
const conferir = (ok, texto) => { console.log((ok ? 'OK    ' : 'FALHOU') + ' · ' + texto); if (!ok) falhas++; };

// fim: lista de status que o garçom de mentira devolve em /api/fim-quiz, um por envio (o último se repete)
// evento: status de /api/evento, ou 'abortar' para a conexão cair
let garcom = null, medicao = null;
// O pedido a www.googletagmanager.com é respondido aqui com 404 em todo contexto (medição, v9 do protótipo), como o Google
// enquanto o contêiner não é publicado: nenhum pedido ao Google sai da máquina, e ele continua anotado em externas, para as
// conferências "nenhuma requisição para outro endereço" pegarem o vazamento. opcoes.referer abre a página como se viesse dali.
async function abrir(browser, largura, endereco, fim, evento, opcoes = {}) {
  const ctx = await browser.newContext({ viewport: { width: largura, height: ALTURA[largura] || 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  await page.route('https://www.googletagmanager.com/**', rota => rota.fulfill({ status: 404, contentType: 'text/plain', body: '' }));
  const t = { ctx, page, pacotes: [], envios: [], eventos: [], ordem: [], consoleTexto: [], externas: [], pedidos: [] };
  page.on('console', m => t.consoleTexto.push(m.text()));
  await page.route('**/api/fim-quiz', async rota => {
    const r = rota.request();
    t.envios.push({ metodo: r.method(), tipo: r.headers()['content-type'], endereco: r.url() });
    let pacote = null;
    try { pacote = JSON.parse(r.postData()); } catch (e) {}
    t.pacotes.push(pacote);
    const status = fim[Math.min(t.envios.length - 1, fim.length - 1)];
    t.ordem.push('fim:' + status);
    await rota.fulfill({ status, contentType: 'application/json', body: status === 201 ? '{"ok":true}' : '{"ok":false,"erro":"servico indisponivel"}' });
  });
  await page.route('**/api/evento', async rota => {
    const r = rota.request();
    let pacote = null;
    try { pacote = JSON.parse(r.postData()); } catch (e) {}
    t.eventos.push({ metodo: r.method(), tipo: r.headers()['content-type'], endereco: r.url(), pacote });
    t.ordem.push('evento:' + (pacote && pacote.evento && pacote.evento.tipo));
    if (evento === 'abortar') return rota.abort();
    await rota.fulfill({ status: evento, contentType: 'application/json', body: evento === 201 ? '{"ok":true}' : '{"ok":false,"erro":"servico indisponivel"}' });
  });
  page.on('request', r => {
    const u = r.url();
    t.pedidos.push(u);
    if (!u.startsWith('file://') && !u.startsWith('data:') && !u.startsWith(BASE)) t.externas.push(u);
  });
  await page.goto(endereco, opcoes.referer ? { referer: opcoes.referer } : undefined);
  return t;
}
let BASE = '';
const semDadoNoConsole = t => t.consoleTexto.every(x => !DADO_PESSOAL.test(x));
const naTela = (page, id) => page.waitForFunction(i => location.hash === '#' + i, id, { timeout: 15000 });
const opcao = (page, valor) => page.locator('[data-corpo] .opcao[data-valor="' + valor + '"]').click();
// Prints só em 375 e 1440, como sempre; em 360 os casos rodam sem print
const print = (page, nome, largura) => largura === 360 ? Promise.resolve() : page.screenshot({ path: path.join(PRINTS, nome + '-' + largura + '.png'), fullPage: true });
const doTipo = (t, tipo) => t.eventos.filter(e => e.pacote && e.pacote.evento && e.pacote.evento.tipo === tipo);
const espera = ms => new Promise(ok => setTimeout(ok, ms));
// A conversa gratuita (v8): o que está na tela, a fala nova do Junior depois da resposta e o que sobrou da oferta antiga
const lerConversa = page => page.evaluate(antigos => {
  const falas = [...document.querySelectorAll('.conversa .balao--bot .fala')].map(e => e.innerText.trim());
  const atual = document.querySelector('.conversa .balao--atual .pergunta__q');
  const ops = [...document.querySelectorAll('[data-corpo] .opcao')].map(e => e.innerText.trim());
  const bt = document.querySelector('[data-corpo] [data-acao="ver-diagnostico"]');
  const eu = [...document.querySelectorAll('.conversa .balao--eu')].map(e => e.innerText.trim());
  const texto = document.body.innerText;
  return { falas, pergunta: atual ? atual.innerText.trim() : null, ops, botao: bt ? bt.innerText.replace(/\s+/g, ' ').trim() : null,
    botaoSeta: !!(bt && bt.classList.contains('botao') && bt.querySelector('.seta')), foco: !!bt && document.activeElement === bt,
    eu: eu[eu.length - 1] || '', sobras: antigos.filter(x => texto.includes(x)) };
}, OFERTA_ANTIGA);
const lerRelatorio = page => page.evaluate(([antigos, chamada, fimAntigo]) => {
  const texto = document.body.innerText;
  const rel = document.querySelector('.relatorio');
  const textoRel = rel ? rel.textContent : '';
  return { hash: location.hash, cta: document.querySelectorAll('.relatorio .cta').length, chamada: texto.includes(chamada),
    botoes: ['marcar', 'whats', 'agora-nao'].filter(a => document.querySelector('.relatorio [data-acao="' + a + '"]')),
    qualificado: !!document.querySelector('.relatorio .rel-topo h1'), sobras: antigos.filter(x => texto.includes(x)),
    tem: !!rel, fim: fimAntigo.textos.filter(x => textoRel.toLowerCase().includes(x.toLowerCase())).concat(fimAntigo.pecas.filter(x => rel && rel.querySelector(x))) };
}, [OFERTA_ANTIGA, RELATORIO_SEM_CHAMADA, FIM_ANTIGO]);
// v9: o relatório que está na tela termina no dinheiro na mesa ou na chamada, sem o vídeo, os botões e o rodapé
const semFimAntigo = (rl, onde) => conferir(rl.tem && rl.fim.length === 0, 'fim do relatório (v9): ' + onde + ' sem o vídeo, sem "Compartilhar" e "Baixar PDF" e sem o rodapé' + (rl.fim.length ? ' (sobrou: ' + rl.fim.join(' | ') + ')' : ''));

// v12 (#123): o que o relatório na tela mostra, peça por peça
const lerNumerosDoRelatorio = page => page.evaluate(() => {
  const q = s => document.querySelector('.relatorio ' + s), qs = s => [...document.querySelectorAll('.relatorio ' + s)];
  const ponta = qs('.haste__ponta b').map(e => e.textContent.trim());
  return { texto: (q('') || document.querySelector('.relatorio') || { textContent: '' }).textContent, olho: (q('.rel-topo .olho') || { textContent: '' }).textContent.trim(),
    leads: ponta[0], vendas: ponta[ponta.length - 1], taxas: qs('.etapa__taxa').map(e => e.textContent.trim()),
    mesa: (q('.mesa__valor') || { textContent: '' }).textContent.trim(), nota: (q('.mesa__nota') || { textContent: '' }).textContent,
    tabela: qs('.tabela tbody tr').map(tr => tr.textContent.trim()),
    chip: (q('.perfil-chip b') || { textContent: '' }).textContent.trim(), h1: (q('h1') || { textContent: '' }).textContent.trim() };
});
// O perfil do funil no painel da conversa gratuita (no celular o painel fica na outra aba: lido pelo texto, sem abrir)
const lerPerfilDoPainel = page => page.evaluate(() => ({ volumes: [...document.querySelectorAll('#painelFunil .barras__eixo b')].map(e => e.textContent.trim()),
  historico: (document.querySelector('.conversa') || {}).textContent || '', cab: (document.querySelector('.perfil-funil__cab') || {}).textContent || '',
  nome: (document.querySelector('.perfil-funil__nome') || {}).textContent || '', sub: (document.querySelector('.perfil-funil__sub') || {}).textContent || '',
  painel: (document.querySelector('.painel') || {}).textContent || '' }));
// A conversa gratuita de quem respondeu "Sim": o perfil e os volumes do gráfico do painel são os dela, e o histórico sem valor de exemplo
function conferirConversaDaPessoa(pf, r, rotulo) {
  const k = contaAParte(r.numeros, r.ticket);
  conferir(!!pf, rotulo + ': a pessoa passa pela conversa gratuita');
  if (!pf) return;
  const vol = r.numeros.map(n => Number(n).toLocaleString('pt-BR'));
  conferir(pf.cab === 'Perfil do funil' && pf.nome === k.perfil, rotulo + ': o painel com o perfil do funil da pessoa, pela conta à parte (' + pf.cab + ': ' + pf.nome + ')');
  conferir(JSON.stringify(pf.volumes) === JSON.stringify(vol), rotulo + ': os volumes do gráfico do painel são os digitados (' + pf.volumes.join(' · ') + ')');
  const sobra = EXEMPLO_NO_HISTORICO.filter(x => pf.historico.includes(x));
  conferir(sobra.length === 0, rotulo + ': o histórico da conversa sem valor de exemplo da página' + (sobra.length ? ' (sobrou: ' + sobra.join(' | ') + ')' : ''));
}
// O relatório de quem respondeu "Sim" com os números dela: confere contra a conta à parte, e nada do exemplo da página
function conferirRelatorioDaPessoa(rl, r, rotulo, perfilNaConversa) {
  const k = contaAParte(r.numeros, r.ticket);
  const leads = k.leads.toLocaleString('pt-BR');
  conferir(rl.leads === leads && rl.vendas === String(k.hoje), rotulo + ': a haste com os leads e as vendas da pessoa (' + rl.leads + ' leads, ' + rl.vendas + ' vendas; conta à parte ' + leads + ' e ' + k.hoje + ')');
  conferir(JSON.stringify(rl.taxas) === JSON.stringify(k.taxas.map(pctT)), rotulo + ': as quatro taxas da pessoa (' + rl.taxas.join(' · ') + '; conta à parte ' + k.taxas.map(pctT).join(' · ') + ')');
  if (!k.fracas.length) {
    const linhas = [100, 200, 400].map(x => { const v = Math.floor(x * k.hoje / k.leads + 1e-9); return '+' + x + '+' + v + milT(v * Number(r.ticket)); });
    conferir(JSON.stringify(rl.tabela) === JSON.stringify(linhas), rotulo + ': a tabela de crescimento com as taxas da pessoa (' + rl.tabela.join(' · ') + '; conta à parte ' + linhas.join(' · ') + ')');
    const geral = pctT(k.hoje / k.leads * 100), valor = 'R$ ' + Number(r.ticket).toLocaleString('pt-BR');
    conferir(rl.nota.includes(geral + ' dos leads viram venda') && rl.nota.includes('valor médio de ' + valor), rotulo + ': a nota com a taxa geral (' + geral + ') e o valor médio (' + valor + ') da pessoa');
  }
  if (k.fracas.length) {
    const mesa = k.extraV > 0 ? milT(k.extraR) : 'R$ 0';
    conferir(rl.mesa.startsWith(mesa + 'por mês') || rl.mesa.startsWith(mesa + ' por mês') || rl.mesa === mesa + 'por mês', rotulo + ': o dinheiro na mesa da conta à parte (' + mesa + '; na tela ' + rl.mesa + ')');
    const vd = n => n + (n === 1 ? ' venda' : ' vendas');
    conferir(rl.nota.includes('Hoje: ' + vd(k.hoje) + ',') && rl.nota.includes('Com as etapas na meta: ' + vd(k.naMeta) + ','), rotulo + ': a nota com as vendas de hoje e na meta (' + k.hoje + ' e ' + k.naMeta + ')');
  }
  conferir(rl.chip === k.perfil && (perfilNaConversa === undefined || perfilNaConversa === k.perfil), rotulo + ': o perfil do funil da conta à parte, o mesmo do painel da conversa gratuita (' + rl.chip + (perfilNaConversa !== undefined ? '; conversa ' + perfilNaConversa : '') + ')');
  const sobras = EXEMPLO_DA_PAGINA.filter(x => rl.texto.includes(x)).concat(rl.leads === '400' ? ['400 leads'] : []);
  conferir(sobras.length === 0, rotulo + ': nenhum valor de exemplo da página (400 leads, R$ 120 mil, Empresa Exemplo, Marina)' + (sobras.length ? ' (sobrou: ' + sobras.join(' | ') + ')' : ''));
  const quebra = rl.texto.match(QUEBRADO);
  conferir(!quebra, rotulo + ': o relatório inteiro sem NaN, Infinity, undefined nem número negativo' + (quebra ? ' (' + quebra[0] + ')' : ''));
  const partes = rl.olho.split(' · ');
  conferir(r.empresa ? partes.length === 3 && partes[1] === r.empresa : partes.length === 2, rotulo + ': o topo ' + (r.empresa ? 'com a empresa informada' : 'sem nome de empresa') + ' (' + rl.olho + ')');
  return k;
}
// Depois do "Ver meu diagnóstico" do contato: com a conversa gratuita, lê o painel e responde "Agora não" para abrir o relatório
async function ateORelatorio(t) {
  await t.page.waitForFunction(() => ['#conversa', '#relatorio-nao', '#relatorio-saudavel', '#relatorio-saudavel-nao'].includes(location.hash), null, { timeout: 15000 });
  let conversa = null;
  if (await t.page.evaluate(() => location.hash) === '#conversa') {
    await t.page.waitForTimeout(300);
    conversa = { perfil: await lerPerfilDoPainel(t.page), texto: await t.page.evaluate(() => document.querySelector('.conversa').textContent) };
    await opcao(t.page, 'Agora não');
    await t.page.locator('[data-corpo] [data-acao="ver-diagnostico"]').click({ timeout: 15000 });
    await naTela(t.page, 'relatorio');
  }
  await t.page.waitForTimeout(300);
  return conversa;
}
// A tela dos números (v12; #123): só em quantidade, os textos novos, o botão que só acende com os cinco e a dica
async function conferirTelaNumeros(page, largura) {
  const rot = 'números (' + largura + ')';
  const tela = () => page.evaluate(() => {
    const bt = document.getElementById('seguirNums'), dica = document.getElementById('numsDica');
    return { pergunta: (document.querySelector('.balao--atual .pergunta__q') || {}).textContent, ajuda: (document.querySelector('.balao--atual .ajuda') || {}).textContent,
      livro: document.querySelector('.livro').textContent, botoesNoLivro: document.querySelectorAll('.livro button, [data-unidade]').length,
      fixas: document.querySelectorAll('.livro .alterna--fixa').length, desligado: !!bt && bt.disabled,
      dica: !!dica && !dica.hidden && dica.getBoundingClientRect().height > 0, dicaTexto: dica ? dica.textContent : '',
      tela: [document.querySelector('.balao--atual'), document.querySelector('[data-corpo]')].filter(Boolean).map(e => e.textContent).join(' ') };
  });
  const encher = async v => { for (let i = 0; i < 5; i++) await page.fill('#num' + i, v[i]); };
  let x = await tela();
  conferir(x.pergunta === NUMEROS_T.pergunta && x.ajuda === NUMEROS_T.ajuda, rot + ': a pergunta e a ajuda novas (copy v4, 5.2)');
  conferir(x.botoesNoLivro === 0 && x.fixas === 5 && !x.tela.includes('%'), rot + ': as cinco linhas só em quantidade, com o "nº" fixo, sem botão "%" e sem "%" em toda a pergunta (' + x.fixas + ' fixas, ' + x.botoesNoLivro + ' botões)');
  conferir(x.desligado && x.dica && x.dicaTexto === NUMEROS_T.dica, rot + ': com os campos vazios, o botão apagado e a dica nova perto dele');
  for (let i = 0; i < 5; i++) {
    const v = ['200', '100', '50', '40', '2']; v[i] = '';
    await encher(v); x = await tela();
    conferir(x.desligado && x.dica, rot + ': com a linha ' + (i + 1) + ' vazia, o botão continua apagado e a dica aparece');
  }
  for (let i = 0; i < 4; i++) {
    const v = ['200', '100', '50', '40', '2']; v[i] = '0';
    await encher(v); x = await tela();
    conferir(x.desligado && x.dica, rot + ': com zero na linha ' + (i + 1) + ', o botão apagado e a dica aparece');
  }
  await encher(['200', '100', '50', '40', '0']);
  x = await tela();
  conferir(!x.desligado && !x.dica, rot + ': com os cinco preenchidos e vendas zero, o botão aceso e a dica some');
  const semConta = x.tela.replace(/= [\d.,]+% de/g, '');
  conferir(!semConta.includes('%') && !x.tela.includes('≈') && !x.tela.includes('Acima de 100'), rot + ': em toda a pergunta, o "%" só no "= n% de [etapa anterior]"; sem "≈" e sem "Acima de 100%"');
  await encher(FORA_DE_ORDEM.numeros);
  x = await tela();
  conferir(x.tela.includes('Maior que a etapa anterior') && !x.desligado && !x.dica, rot + ': fora de ordem (200 · 250 · 50 · 40 · 2), o aviso "Maior que a etapa anterior" aparece e o botão continua aceso (só aviso)');
  await encher(['', '', '', '', '']);
}

// Percorre da abertura até a tela de contato; devolve o que viu dos campos de número e do valor médio.
// entrada: 'botao' (o da abertura), 'cabecalho' (o do cabeçalho da landing-page-02) ou 'barra' (o fixo no rodapé, só no celular)
async function ateContato(page, r, largura, comPrints, entrada = 'botao') {
  const visto = {};
  await naTela(page, 'abertura');
  if (comPrints) await print(page, 'abertura', largura);
  if (entrada === 'barra') {
    await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
    await page.waitForFunction(() => document.body.hasAttribute('data-barra'), null, { timeout: 5000 });
    await page.locator('#barraSafra [data-acao="proximo"]').click();
  } else {
    await page.locator(entrada === 'cabecalho' ? '#cabSafra [data-acao="proximo"]' : '.abertura__copy [data-acao="proximo"]').click();
  }
  await naTela(page, 'nome');
  await page.fill('#nomeIn', 'Joana');
  await page.click('#seguir');
  await naTela(page, 'ramo'); await opcao(page, r.ramo);
  await naTela(page, 'faturamento');
  if (comPrints) await print(page, 'pergunta', largura);
  await opcao(page, r.faturamento);
  await naTela(page, 'vendedores'); await opcao(page, r.vendedores);
  await naTela(page, 'quem-marca'); await opcao(page, r['quem-marca']);
  await naTela(page, 'valor-medio');
  visto.ticketVazioDesligado = (await page.inputValue('#ticket')) === '' && await page.locator('#seguirTicket').isDisabled();
  await page.fill('#ticket', r.ticket);
  await page.click('#seguirTicket');
  await naTela(page, 'origem'); await opcao(page, r.origem);
  await page.click('[data-corpo] [data-acao="proximo"]');
  await naTela(page, 'crm'); await opcao(page, r.crm);
  await naTela(page, 'cargo'); await opcao(page, r.cargo);
  await naTela(page, 'lembra'); await opcao(page, r.lembra || 'Sim');
  if (r.lembra === 'Não') {
    await naTela(page, 'chute'); await opcao(page, r.chute);
    await page.click('[data-corpo] [data-acao="proximo"]');
  } else {
    await naTela(page, 'numeros');
    visto.numerosVazios = await page.evaluate(() => [0, 1, 2, 3, 4].every(i => document.getElementById('num' + i).value === ''));
    if (comPrints) await conferirTelaNumeros(page, largura);
    for (let i = 0; i < 5; i++) await page.fill('#num' + i, r.numeros[i]);
    if (r.foraDeOrdem) visto.foraDeOrdem = await page.evaluate(() => ({ aviso: document.querySelector('[data-corpo]').textContent.includes('Maior que a etapa anterior'), aceso: !document.getElementById('seguirNums').disabled }));
    if (comPrints) await print(page, 'numeros', largura);
    await page.click('[data-corpo] [data-acao="proximo"]');
  }
  await naTela(page, 'causa'); await opcao(page, r.causa);
  await naTela(page, 'causa2'); await opcao(page, r.causa2);
  await naTela(page, 'causa3'); await opcao(page, r.causa3);
  await naTela(page, 'contato');
  await page.fill('#nome', PESSOA.nome);
  await page.fill('#email', PESSOA.email);
  await page.fill('#tel', PESSOA.tel);
  if (r.empresa) await page.fill('#empresa', r.empresa);
  return visto;
}

(async () => {
  const { conferirPacote, conferirEvento } = await import(pathToFileURL(path.join(RAIZ, 'entregas/garcom/garcom.mjs')).href);
  garcom = { conferirPacote, conferirEvento };
  medicao = await import(pathToFileURL(path.join(RAIZ, 'entregas/prototipo-funil-01/medicao.mjs')).href);
  fs.mkdirSync(PRINTS, { recursive: true });
  const srv = await servir();
  BASE = 'http://127.0.0.1:' + srv.address().port + '/';
  const PAGINA = BASE + 'analise/' + BUSCA;
  const browser = await chromium.launch({ executablePath: acharChromium() });

  // A barra fixa do rodapé (só no celular) aparece se, e só se, o botão da abertura está fora da tela ou sob o cabeçalho
  // (a regra da página, vigiarBotaoAbertura): vale com e sem o aviso de cookies, que, no alto, pode empurrar o botão para baixo da dobra
  const regraDaBarra = page => page.evaluate(async () => {
    await new Promise(ok => requestAnimationFrame(() => requestAnimationFrame(ok)));
    const b = document.getElementById('botaoAbertura').getBoundingClientRect(), cab = document.getElementById('cabSafra').getBoundingClientRect();
    const fora = b.bottom <= Math.max(0, cab.bottom) || b.top >= innerHeight;
    const aparece = document.body.hasAttribute('data-barra') && getComputedStyle(document.getElementById('barraSafra')).display !== 'none';
    return { fora, aparece, celular: innerWidth < 900, botao: Math.round(b.top) + '-' + Math.round(b.bottom), visivel: Math.max(0, Math.round(Math.min(b.bottom, innerHeight) - Math.max(b.top, cab.bottom))) };
  });

  // v8: no arquivo da página (o programa inteiro, não só a tela), nenhum texto da oferta antiga do plano de 90 dias
  {
    const fonte = fs.readFileSync(path.join(PASTA, 'index.html'), 'utf8');
    const sobras = OFERTA_ANTIGA.concat(["'video-time'", "'plano-exemplo'", 'WHATS', 'planoVolta']).filter(x => fonte.includes(x));
    conferir(sobras.length === 0, 'arquivo da página: nenhum texto da oferta antiga do plano de 90 dias, nem as telas plano-exemplo e video-time (' + (sobras.length ? 'sobrou: ' + sobras.join(' | ') : OFERTA_ANTIGA.join(' | ')) + ')');
    // v9: o fim antigo dos relatórios também não sobra no programa (nem os estilos dele)
    const fimSobras = ['antes de decidir', '1 minuto com o Junior', 'avisoVideoRel', 'avisoAcoes', 'baixa o diagnóstico em PDF', 'Metas usadas', 'Final do quiz', 'video-bloco', 'class="rodape"', '.rodape{', '.acoes{', '.video{', 'const TRIAD', "case 'aviso'"].filter(x => fonte.includes(x));
    conferir(fimSobras.length === 0, 'arquivo da página (v9): nada do fim antigo dos relatórios (vídeo, "Compartilhar" e "Baixar PDF", rodapé) nem os estilos e trechos só dele' + (fimSobras.length ? ' (sobrou: ' + fimSobras.join(' | ') + ')' : ''));
  }

  for (const largura of [375, 360, 1440]) {
    console.log('\n· ' + largura + ' pixels' + (largura === 360 ? ', 640 de altura' : ''));

    // 1. Exemplo do lead score, caixa marcada (o padrão)
    let t = await abrir(browser, largura, PAGINA, [201], 201);
    conferir(await t.page.evaluate(() => document.compatMode) === 'CSS1Compat', 'doctype: modo padrão (CSS1Compat), não mais BackCompat (09.1)');
    // na abertura aparecem Inter, Space Grotesk e Geist (a do cabeçalho e do botão da landing-page-02); a de mão fica para o relatório
    const estadoFontes = await t.page.evaluate(async () => { await document.fonts.ready; return [...document.fonts].map(f => f.family.replace(/"/g, '') + ':' + f.status).join(', '); });
    conferir(['Inter', 'Space Grotesk', 'Geist'].every(n => estadoFontes.includes(n + ':loaded')), 'exemplo: Inter, Space Grotesk e Geist carregadas na abertura (' + estadoFontes + ')');
    const ab = await t.page.evaluate(() => {
      const vis = s => { const e = document.querySelector(s); return !!e && getComputedStyle(e).display !== 'none' && e.getBoundingClientRect().height > 0; };
      return { hash: location.hash, num: document.getElementById('protoNum').textContent, capa: !!document.querySelector('[data-ir="capa"]'),
        cab: vis('#cabSafra'), topo: vis('#topo'), logo: !!document.querySelector('#cabSafra .logo-safra svg'),
        botoes: [...document.querySelectorAll('#cabSafra .btn-safra, .abertura__copy .btn-safra')].map(b => b.textContent.trim()),
        comecar: document.body.textContent.includes('Começar diagnóstico'),
        telas: [...document.querySelectorAll('#protoLista [data-ir]')].map(b => b.dataset.ir + ':' + b.textContent.replace(/^\d+/, '').trim()) };
    });
    conferir(ab.hash === '#abertura' && ab.num === '1/25' && !ab.capa, 'abertura: o quiz abre nela, sem a capa (tela 1 de 25; ' + ab.hash + ', ' + ab.num + ')');
    conferir(ab.telas.includes('conversa:Conversa gratuita com o Junior') && !ab.telas.some(x => /^(plano|plano-exemplo|video-time):/.test(x)) && ab.telas.indexOf('conversa:Conversa gratuita com o Junior') === ab.telas.findIndex(x => x.startsWith('montando:')) + 1,
      'painel "Telas" (v8): "Conversa gratuita com o Junior" logo depois de "Montando o diagnóstico", sem as telas da oferta do plano, do exemplo do plano e do vídeo do time');
    conferir(await t.page.evaluate(() => { const v = document.querySelector('.previa'); return !!v && v.textContent.includes('Marina Souza') && v.textContent.includes('valor calculado no final'); }),
      'abertura (v12): o relatório de vitrine continua o de exemplo (Marina Souza), como antes');
    conferir(ab.cab && !ab.topo && ab.logo, 'abertura: cabeçalho da landing-page-02 com o logo do Safra, no lugar do cabeçalho do quiz');
    conferir(ab.botoes.join('|') === 'Fazer a Análise|Fazer a Análise' && !ab.comecar, 'abertura: botões do cabeçalho e da página dizem "Fazer a Análise" (' + ab.botoes.join(' | ') + ')');
    await t.page.waitForTimeout(200);
    const rb = await regraDaBarra(t.page);
    conferir(rb.aparece === (rb.fora && rb.celular), 'abertura, antes de rolar: a barra do rodapé aparece se, e só se, o botão da abertura está fora da tela ou sob o cabeçalho (botão ' + rb.botao + ', ' + rb.visivel + ' pixels à vista; barra ' + (rb.aparece ? 'aparece' : 'não aparece') + ')');
    // espera a entrada da tela (desliza alguns pixels) terminar; as animações sem fim (a luz dos botões) não contam
    await t.page.evaluate(() => Promise.all(document.getAnimations().filter(a => a.effect && a.effect.getComputedTiming().iterations !== Infinity).map(a => a.finished.catch(() => {}))));
    // Sem escolha guardada, o aviso de cookies (v9 do protótipo) fica no topo, em fluxo normal, e sai da tela com a rolagem: a medida
    // começa com ele rolado para fora (a altura dele), onde a abertura encosta no alto como antes. O aviso não é tocado.
    await t.page.evaluate(() => { const a = document.getElementById('aviso-cookies'); window.scrollTo(0, a ? a.offsetHeight : 0); }); await t.page.waitForTimeout(300);
    const antes =await t.page.evaluate(() => ['.abertura h1', '.abertura__lede', '#botaoAbertura', '.previa', '#cabSafra'].map(s => Math.round(document.querySelector(s).getBoundingClientRect().top)));
    await t.page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await t.page.waitForTimeout(400);
    const depois = await t.page.evaluate(() => ['.abertura h1', '.abertura__lede', '#botaoAbertura', '.previa', '#cabSafra'].map(s => Math.round(document.querySelector(s).getBoundingClientRect().top)));
    const comBarra = await t.page.evaluate(() => document.body.hasAttribute('data-barra') && getComputedStyle(document.getElementById('barraSafra')).display !== 'none');
    if (largura === 1440) {
      conferir(depois[0] === antes[0] && depois[1] === antes[1] && depois[2] === antes[2] && depois[3] < antes[3] && depois[4] === 0, 'abertura (computador): ao rolar, só o relatório se mexe; título, promessa, botão e cabeçalho ficam (' + antes.join(',') + ' → ' + depois.join(',') + ')');
      conferir(!comBarra, 'abertura (computador): a barra do rodapé não aparece');
    } else {
      conferir(antes[0] < antes[3] && depois[4] === 0, 'abertura (celular): o texto vem antes do relatório e o cabeçalho fica no alto (' + antes.join(',') + ' → ' + depois.join(',') + ')');
      conferir(comBarra, 'abertura (celular): rolando, o botão sai da tela e "Fazer a Análise" fica fixo no rodapé');
    }
    await t.page.evaluate(() => window.scrollTo(0, 0)); await t.page.waitForTimeout(300);
    await t.page.waitForTimeout(300);
    let ini = doTipo(t, 'inicio_quiz');
    const ei = ini[0] && ini[0].pacote.evento;
    conferir(ini.length === 1 && t.ordem[0] === 'evento:inicio_quiz', 'exemplo: um início do quiz, mandado quando o quiz abre (10.6; 18.5)');
    conferir(ini[0] && ini[0].metodo === 'POST' && ini[0].tipo === 'application/json' && ini[0].endereco === BASE + 'api/evento', 'exemplo: início do quiz por POST, application/json, na mesma origem (/api/evento)');
    conferir(ini[0] && garcom.conferirEvento(ini[0].pacote) === null, 'exemplo: início do quiz passa nas conferências do garçom v4 (' + (ini[0] && garcom.conferirEvento(ini[0].pacote)) + ')');
    conferir(ei && ei.funil === 'funil-01' && ei.entrega === 'quiz-01' && ei.versao_entrega === 2 && ei.utm_source === 'bio' && ei.utm_campaign === 'funil-01' && FORMATO_SESSAO.test(ei.id_sessao), 'exemplo: início com etiquetas funil-01, quiz-01, versão 2, utm do endereço e sessão no formato do banco');
    conferir(ini[0] && Object.keys(ini[0].pacote).join() === 'evento', 'exemplo: início do quiz sem pessoa');
    let visto = await ateContato(t.page, EXEMPLO, largura, true);
    conferir(visto.numerosVazios, 'exemplo: campos de número começam vazios (14.4)');
    conferir(visto.ticketVazioDesligado, 'exemplo: valor médio vazio e "Continuar" desligado até ter valor (14.5)');
    conferir(await t.page.locator('#consAceite').isChecked(), 'exemplo: a caixa única já vem marcada (13.4)');
    conferir(await t.page.locator('input[type="checkbox"]').count() === 1, 'exemplo: uma caixa só');
    conferir(!(await t.page.locator('#consAviso').isVisible()), 'exemplo: com a caixa marcada, o aviso de desmarcada não aparece');
    conferir((await t.page.locator('#consentimento').innerText()).includes(CAIXA), 'exemplo: texto da caixa da copy v3 (M16; #122)');
    await print(t.page, 'contato-consentimento', largura);
    await t.page.click('#enviar');
    await naTela(t.page, 'conversa');
    await t.page.waitForTimeout(300);
    // v12 (#123): o perfil do funil no painel da conversa gratuita sai da mesma conta do relatório
    const pfA = await lerPerfilDoPainel(t.page);
    conferirConversaDaPessoa(pfA, EXEMPLO, 'conversa (v12)');
    // v8: a conversa gratuita com o Junior, antes da resposta
    let cv = await lerConversa(t.page);
    conferir(cv.falas[cv.falas.length - 1] === CONVERSA.fala, 'conversa (v8): a fala do Junior antes da pergunta, com o nome ("' + cv.falas[cv.falas.length - 1] + '")');
    conferir(cv.pergunta === CONVERSA.pergunta, 'conversa (v8): a pergunta com o texto aprovado ("' + cv.pergunta + '")');
    conferir(cv.ops.join('|') === CONVERSA.opcoes.join('|') && !cv.botao, 'conversa (v8): as opções "Sim, eu quero" e "Agora não", e o botão do diagnóstico ainda não aparece (' + cv.ops.join(' | ') + ')');
    conferir(cv.sobras.length === 0, 'conversa (v8): nenhum texto da oferta antiga do plano na tela' + (cv.sobras.length ? ' (sobrou: ' + cv.sobras.join(' | ') + ')' : ''));
    let p = t.pacotes[0], e = t.envios[0];
    conferir(t.envios.length === 1, 'exemplo: um envio para /api/fim-quiz');
    conferir(e && e.metodo === 'POST' && e.tipo === 'application/json' && e.endereco === BASE + 'api/fim-quiz', 'exemplo: POST, application/json, na mesma origem (' + (e && e.endereco.replace(BASE, '/')) + ')');
    conferir(p && garcom.conferirPacote(p) === null, 'exemplo: o pacote passa nas conferências do garçom v4 (' + (p && garcom.conferirPacote(p)) + ')');
    conferir(p && p.evento.lead_score_nota === 96, 'exemplo: total 96 (veio ' + (p && p.evento.lead_score_nota) + ')');
    conferir(p && p.evento.lead_score_faixa === 'a', 'exemplo: faixa a (veio ' + (p && p.evento.lead_score_faixa) + ')');
    conferir(p && p.evento.lead_score_versao === 3, 'exemplo: lead_score_versao 3 (lead-score v3)');
    conferir(p && p.evento.tipo === 'fim_quiz' && p.evento.funil === 'funil-01' && p.evento.entrega === 'quiz-01' && p.evento.versao_entrega === 2, 'exemplo: etiquetas funil-01, quiz-01, versão 2');
    conferir(p && p.evento.utm_source === 'bio' && p.evento.utm_campaign === 'funil-01', 'exemplo: utm lidas do endereço (bio, funil-01)');
    conferir(p && ei && p.evento.id_sessao === ei.id_sessao, 'exemplo: o fim do quiz leva a mesma sessão do início');
    conferir(p && p.pessoa.consentimento_whatsapp === 'sim' && p.pessoa.consentimento_email === 'sim' && !!p.pessoa.consentimento_em, 'exemplo: a caixa preenche os dois consentimentos com o mesmo valor (#104)');
    conferir(p && p.pessoa.consentimento_texto.endsWith(CAIXA) && p.pessoa.consentimento_texto.includes('servem para três coisas') && p.pessoa.consentimento_texto.includes('nem para a gente, nem para a Meta'), 'exemplo: o texto aceito é o texto de antes da caixa (v3, com a Meta) e o da caixa');
    conferir(p && p.pessoa.nome === PESSOA.nome && p.pessoa.email === PESSOA.email, 'exemplo: pessoa de teste marcada (TESTE, @teste.invalid)');
    conferir(p && Object.keys(p).join() === 'pessoa,evento', 'exemplo: pacote só com pessoa e evento');
    conferir(!(await t.page.locator('#avisoEnvio').isVisible()), 'exemplo: nenhum aviso de falha');
    conferir(doTipo(t, 'interesse_pos_relatorio').length === 0, 'exemplo: nenhum clique mandado sem clique');
    // v8: "Sim, eu quero": a resposta do Junior, o clique quero-conversa e o botão que abre o relatório sem o bloco de chamada
    await opcao(t.page, 'Sim, eu quero');
    await t.page.locator('[data-corpo] [data-acao="ver-diagnostico"]').waitFor({ state: 'visible', timeout: 15000 });
    await t.page.waitForTimeout(400);
    cv = await lerConversa(t.page);
    conferir(cv.eu === 'Sim, eu quero' && cv.falas[cv.falas.length - 1] === CONVERSA.sim && !cv.pergunta && cv.ops.length === 0,
      'conversa (v8): "Sim, eu quero" vira a resposta da pessoa e o Junior responde "' + cv.falas[cv.falas.length - 1] + '"');
    conferir(cv.botao === CONVERSA.botao + ' →' && cv.botaoSeta && cv.foco, 'conversa (v8): depois da resposta, o botão "Ver meu diagnóstico" com a seta, no estilo dos outros, e com o foco nele (' + cv.botao + ')');
    let cl = doTipo(t, 'interesse_pos_relatorio');
    conferir(cl.length === 1 && cl[0].pacote.evento.clique_fim_quiz === 'quero-conversa' && garcom.conferirEvento(cl[0].pacote) === null && cl[0].pacote.evento.id_sessao === ei.id_sessao && t.ordem.indexOf('fim:201') < t.ordem.indexOf('evento:interesse_pos_relatorio'),
      'conversa (v8): "Sim, eu quero" manda o clique quero-conversa, uma vez, depois do fim gravado, com a mesma sessão e nas conferências do garçom v4');
    await print(t.page, 'resultado-a', largura);
    await t.page.click('[data-corpo] [data-acao="ver-diagnostico"]');
    await naTela(t.page, 'relatorio');
    await t.page.waitForTimeout(300);
    let rl = await lerRelatorio(t.page);
    conferir(rl.qualificado && rl.cta === 0 && !rl.chamada && rl.botoes.length === 0 && rl.sobras.length === 0,
      'conversa (v8): "Ver meu diagnóstico" abre o relatório do qualificado (#relatorio) sem o bloco de chamada (nem "' + RELATORIO_SEM_CHAMADA + '", nem os botões dele) e sem texto da oferta antiga');
    semFimAntigo(rl, 'o relatório aberto pelo "Ver meu diagnóstico"');
    // v12 (#123): o relatório do qualificado com os números da pessoa, iguais aos da conta à parte e aos do painel da conversa;
    // o dinheiro na mesa é o que o lead score usou: R$ 60 mil ÷ (R$ 45 mil ÷ 3) = 4 vezes o custo mensal, 15 pontos, que fecham os 96
    const kA = conferirRelatorioDaPessoa(await lerNumerosDoRelatorio(t.page), EXEMPLO, 'relatório do qualificado (v12)', pfA.nome);
    conferir(kA.extraR === 60000 && pontosMesaT(kA.extraR) === 15 && p && p.evento.lead_score_nota === notaT(81, EXEMPLO) && notaT(81, EXEMPLO) === 96, 'relatório do qualificado (v12): o dinheiro na mesa da tela (' + milT(kA.extraR) + ') é o do lead score: 4 vezes o custo mensal, 15 pontos, nota 96 (veio ' + (p && p.evento.lead_score_nota) + ')');
    await print(t.page, 'relatorio-pessoa', largura);
    conferir(doTipo(t, 'interesse_pos_relatorio').length === 1, 'conversa (v8): abrir o relatório não manda clique nenhum');
    // pelo painel "Telas", o mesmo relatório continua com o bloco de chamada
    await t.page.click('#protoBotao');
    await t.page.click('#protoLista [data-ir="relatorio"]');
    await t.page.waitForTimeout(300);
    rl = await lerRelatorio(t.page);
    conferir(rl.hash === '#relatorio' && rl.cta === 1 && rl.chamada && rl.botoes.join() === 'marcar,whats,agora-nao', 'relatório pelo painel "Telas" (v8): continua com o bloco de chamada, como antes (' + rl.botoes.join(', ') + ')');
    // v9: os cinco relatórios, pelo painel "Telas", sem o fim antigo (a chamada de cada um fica)
    for (const id of RELATORIOS) {
      await t.page.click('#protoBotao');
      await t.page.click('#protoLista [data-ir="' + id + '"]');
      await t.page.waitForTimeout(300);
      const r5 = await lerRelatorio(t.page);
      conferir(r5.hash === '#' + id && r5.cta === 1, 'relatório pelo painel "Telas" (v9): #' + id + ' abre com a chamada dele');
      const n5 = await lerNumerosDoRelatorio(t.page);
      conferir(n5.leads === '400' && n5.texto.includes('Empresa Exemplo') && (id !== 'relatorio-chute' || n5.texto.includes(EXEMPLO_T[0])), 'relatório pelo painel "Telas" (v12): #' + id + ' continua com o exemplo, para revisão (' + n5.leads + ' leads, Empresa Exemplo' + (id === 'relatorio-chute' ? ', com o aviso de exemplo' : '') + ')');
      semFimAntigo(r5, '#' + id + ' pelo painel');
    }
    conferir(semDadoNoConsole(t), 'exemplo: console sem o pacote e sem dado de pessoa');
    conferir(t.externas.length === 0, 'exemplo: nenhuma requisição para outro endereço' + (t.externas.length ? ' (' + t.externas.join(', ') + ')' : ''));
    conferir(LISTA_FONTES.filter(f => !f.arquivo.startsWith('permanent-marker')).every(f => t.pedidos.includes(BASE + 'analise/fontes/' + f.arquivo)), 'exemplo: as fontes vêm de /analise/fontes/, junto com a página (10.7; a de mão só no relatório)');
    if (largura === 1440) console.log('  pacote do exemplo: ' + JSON.stringify(p) + '\n  início do quiz: ' + JSON.stringify(ini[0] && ini[0].pacote));
    await t.ctx.close();

    // 2. Eliminatório, com a sessão vinda da landing, e o clique no fim
    t = await abrir(browser, largura, PAGINA + '&id_sessao=' + SESSAO_DA_LANDING, [201], 201);
    await ateContato(t.page, ELIMINATORIO, largura, false, 'cabecalho');
    await t.page.click('#enviar');
    await naTela(t.page, 'relatorio-nao');
    await print(t.page, 'resultado-eliminatorio', largura);
    semFimAntigo(await lerRelatorio(t.page), 'o relatório do não qualificado pelo caminho do quiz');
    conferirRelatorioDaPessoa(await lerNumerosDoRelatorio(t.page), ELIMINATORIO, 'relatório do não qualificado (v12)');
    p = t.pacotes[0];
    conferir(t.envios.length === 1, 'eliminatório: um envio');
    conferir(p && p.evento.lead_score_faixa === 'eliminatorio' && p.evento.lead_score_nota === 81, 'eliminatório: faixa eliminatorio, com a nota guardada (14.8; veio ' + (p && p.evento.lead_score_faixa) + ', nota ' + (p && p.evento.lead_score_nota) + ')');
    conferir(doTipo(t, 'inicio_quiz')[0] && doTipo(t, 'inicio_quiz')[0].pacote.evento.id_sessao === SESSAO_DA_LANDING && p && p.evento.id_sessao === SESSAO_DA_LANDING, 'eliminatório: início e fim com a sessão que a landing mandou no endereço (10.5)');
    conferir(await t.page.locator('[data-acao="interesse"]').isVisible(), 'eliminatório: tela do relatório com "Tenho interesse"');
    conferir((await t.page.locator('.rel-copia').innerText()).trim() === 'Uma cópia deste diagnóstico vai para o seu e-mail e WhatsApp.', 'eliminatório: com a caixa marcada, a linha da cópia é a do mockup (copy v2, M21)');
    await t.page.click('[data-acao="interesse"]');
    await t.page.waitForTimeout(400);
    cl = doTipo(t, 'interesse_pos_relatorio');
    conferir(cl.length === 1 && cl[0].pacote.evento.clique_fim_quiz === 'tenho-interesse', 'eliminatório: o clique vai como interesse_pos_relatorio, tenho-interesse (18.4)');
    conferir(cl[0] && garcom.conferirEvento(cl[0].pacote) === null && cl[0].pacote.evento.id_sessao === SESSAO_DA_LANDING, 'eliminatório: o clique passa nas conferências do garçom v4, com a mesma sessão');
    conferir(t.ordem.indexOf('fim:201') > -1 && t.ordem.indexOf('fim:201') < t.ordem.indexOf('evento:interesse_pos_relatorio'), 'eliminatório: o clique só sai depois do fim do quiz gravado (32.2)');
    conferir((await t.page.locator('#ctaNota').innerText()) === NOTA_LEAD_SCORE, 'eliminatório: nota do "Tenho interesse" do lado do lead score, sem prometer ligação (31.14)');
    await t.page.click('[data-acao="agora-nao"]');
    await t.page.click('[data-acao="agora-nao"]');
    await t.page.waitForTimeout(300);
    cl = doTipo(t, 'interesse_pos_relatorio');
    conferir(cl.length === 2 && cl[1].pacote.evento.clique_fim_quiz === 'agora-nao', 'eliminatório: "Agora não" vai uma vez só, mesmo com dois toques');
    conferir(semDadoNoConsole(t), 'eliminatório: console sem dado de pessoa');
    await t.ctx.close();

    // 3. Corte mais restritivo, com /api/evento fora do ar
    t = await abrir(browser, largura, PAGINA, [201], 'abortar');
    await ateContato(t.page, FAIXA_C, largura, false, largura < 900 ? 'barra' : 'cabecalho');
    await t.page.click('#enviar');
    await naTela(t.page, 'relatorio-nao');
    await print(t.page, 'resultado-faixa-c', largura);
    // v12 (#123): o funil pequeno, com etapa fraca e nenhuma venda a mais depois do arredondamento: a conta dela, sem cair no exemplo
    const rc = await lerNumerosDoRelatorio(t.page);
    conferirRelatorioDaPessoa(rc, FAIXA_C, 'funil pequeno (v12)');
    conferir(contaAParte(FAIXA_C.numeros, FAIXA_C.ticket).extraV === 0 && rc.mesa.startsWith('R$ 0') && !rc.texto.includes('R$ 0 mil'), 'funil pequeno (v12): sem venda a mais, o dinheiro na mesa é "R$ 0", sem as fatias de "R$ 0 mil"');
    p = t.pacotes[0];
    conferir(p && p.evento.lead_score_nota === notaT(21, FAIXA_C) && notaT(21, FAIXA_C) === 24, 'funil pequeno (v12): o dinheiro na mesa da tela (R$ 0) é o do lead score: menos de 0,5 custo mensal, 3 pontos, nota 24 (veio ' + (p && p.evento.lead_score_nota) + ')');
    conferir(p && p.evento.lead_score_faixa === 'c', 'corte: faixa c (veio ' + (p && p.evento.lead_score_faixa) + ', nota ' + (p && p.evento.lead_score_nota) + ')');
    conferir(await t.page.evaluate(() => location.hash) === '#relatorio-nao', 'corte: quem passa no corte do Júnior e fica na faixa c vai para o relatório de não qualificado (14.2; antes ia para o plano)');
    await t.page.click('[data-acao="interesse"]');
    await t.page.waitForTimeout(300);
    conferir(doTipo(t, 'inicio_quiz').length === 1 && doTipo(t, 'interesse_pos_relatorio').length === 1, 'corte: com /api/evento fora do ar, o início e o clique foram tentados uma vez cada, sem nova tentativa');
    conferir(!(await t.page.locator('#avisoEnvio').isVisible()) && (await t.page.locator('#ctaNota').isVisible()), 'corte: a falha do registro de evento não trava nem avisa (10.10)');
    await t.ctx.close();

    // 4. Caixa desmarcada (e sessão do endereço fora do formato)
    t = await abrir(browser, largura, PAGINA + '&id_sessao=SESSAO-Fora-Do-Formato', [201], 201);
    await ateContato(t.page, ELIMINATORIO, largura, false);
    await t.page.uncheck('#consAceite');
    conferir(await t.page.locator('#consAviso').isVisible() && (await t.page.locator('#consAviso').innerText()).includes('nada é enviado'), 'desmarcada: aviso "Sem o aceite, ..." visível');
    conferir(!(await t.page.locator('#enviar').isDisabled()), 'desmarcada: o botão continua ligado (nome, e-mail e WhatsApp válidos)');
    await print(t.page, 'contato-sem-consentimento', largura);
    await t.page.click('#enviar');
    await naTela(t.page, 'relatorio-nao');
    await t.page.click('[data-acao="interesse"]');
    await t.page.waitForTimeout(800);
    conferir(t.envios.length === 0, 'desmarcada: nenhum envio para /api/fim-quiz');
    conferir(doTipo(t, 'interesse_pos_relatorio').length === 0, 'desmarcada: o clique no fim não é mandado');
    conferir(await t.page.evaluate(() => location.hash) === '#relatorio-nao' && !(await t.page.locator('#avisoEnvio').isVisible()), 'desmarcada: o diagnóstico aparece na tela, sem aviso de falha');
    conferir((await t.page.locator('.rel-copia').innerText()).trim() === 'Este diagnóstico fica só aqui na tela. Sem o aceite, nada foi enviado.', 'desmarcada: a linha da cópia diz que nada foi enviado (copy v2, M21)');
    ini = doTipo(t, 'inicio_quiz');
    conferir(ini.length === 1 && FORMATO_SESSAO.test(ini[0].pacote.evento.id_sessao) && ini[0].pacote.evento.id_sessao !== 'SESSAO-Fora-Do-Formato', 'desmarcada: sessão do endereço fora do formato é trocada por uma nova, no formato do banco');
    conferir(semDadoNoConsole(t), 'desmarcada: console sem dado de pessoa');
    await t.ctx.close();

    // 5. Envio que falha (o garçom de mentira responde 502 e, na segunda vez, 201)
    t = await abrir(browser, largura, PAGINA, [502, 201], 201);
    await ateContato(t.page, EXEMPLO, largura, false);
    await t.page.click('#enviar');
    await t.page.locator('#avisoEnvio').waitFor({ state: 'visible', timeout: 15000 });
    await naTela(t.page, 'conversa');
    const aviso = (await t.page.locator('#avisoEnvio').innerText()) || '';
    conferir(await t.page.locator('#avisoEnvio').isVisible() && aviso.includes('diagnóstico continua'), 'falha: aviso visível, dizendo que o diagnóstico continua na tela');
    conferir(!/502|servico|indisponivel|erro|api|fetch/i.test(aviso), 'falha: aviso sem detalhe técnico');
    conferir(await t.page.locator('#avisoEnvio').isVisible() && await t.page.evaluate(() => location.hash) === '#conversa', 'falha: o diagnóstico continua na tela, com o aviso por cima');
    // só a tela visível, onde o aviso fica preso no alto
    if (largura !== 360) await t.page.screenshot({ path: path.join(PRINTS, 'envio-falhou-' + largura + '.png') });
    await t.page.click('#reenviar');
    await t.page.locator('#avisoEnvio').waitFor({ state: 'hidden', timeout: 15000 });
    conferir(t.envios.length === 2, 'falha: "Tentar de novo" reenvia (2 envios)');
    conferir(JSON.stringify(t.pacotes[0]) === JSON.stringify(t.pacotes[1]), 'falha: o reenvio manda o mesmo pacote');
    // v8: "Agora não" na conversa, depois do reenvio gravado: a resposta do não, o clique agora-nao e o relatório sem o bloco de chamada
    await opcao(t.page, 'Agora não');
    await t.page.locator('[data-corpo] [data-acao="ver-diagnostico"]').waitFor({ state: 'visible', timeout: 15000 });
    await t.page.waitForTimeout(400);
    const cn = await lerConversa(t.page);
    conferir(cn.eu === 'Agora não' && cn.falas[cn.falas.length - 1] === CONVERSA.nao && cn.botao === CONVERSA.botao + ' →',
      'conversa (v8): "Agora não" vira a resposta da pessoa, o Junior responde "' + cn.falas[cn.falas.length - 1] + '" e vem o botão "' + CONVERSA.botao + '"');
    const cln = doTipo(t, 'interesse_pos_relatorio');
    conferir(cln.length === 1 && cln[0].pacote.evento.clique_fim_quiz === 'agora-nao' && garcom.conferirEvento(cln[0].pacote) === null && t.ordem.lastIndexOf('fim:201') < t.ordem.indexOf('evento:interesse_pos_relatorio'),
      'conversa (v8): "Agora não" manda o clique agora-nao, uma vez, depois do fim gravado pelo reenvio, nas conferências do garçom v4');
    await t.page.click('[data-corpo] [data-acao="ver-diagnostico"]');
    await naTela(t.page, 'relatorio');
    await t.page.waitForTimeout(300);
    const rn = await lerRelatorio(t.page);
    conferir(rn.qualificado && rn.cta === 0 && !rn.chamada && rn.botoes.length === 0 && doTipo(t, 'interesse_pos_relatorio').length === 1,
      'conversa (v8): depois do "Agora não", "Ver meu diagnóstico" abre o relatório do qualificado sem o bloco de chamada, sem mandar outro clique');
    conferir(semDadoNoConsole(t), 'falha: console sem dado de pessoa');
    await t.ctx.close();

    // 5b. Clique durante a falha do fim do quiz: espera o reenvio gravar
    t = await abrir(browser, largura, PAGINA, [502, 201], 201);
    await ateContato(t.page, ELIMINATORIO, largura, false);
    await t.page.click('#enviar');
    await naTela(t.page, 'relatorio-nao');
    await t.page.click('[data-acao="interesse"]');
    await t.page.waitForTimeout(500);
    conferir(doTipo(t, 'interesse_pos_relatorio').length === 0, 'falha e clique: com o fim do quiz sem gravar, o clique espera na memória da aba');
    await t.page.click('#reenviar');
    await t.page.locator('#avisoEnvio').waitFor({ state: 'hidden', timeout: 15000 });
    await t.page.waitForTimeout(400);
    cl = doTipo(t, 'interesse_pos_relatorio');
    conferir(cl.length === 1 && t.ordem.indexOf('fim:201') < t.ordem.indexOf('evento:interesse_pos_relatorio'), 'falha e clique: o clique sai depois do reenvio gravado, uma vez só');
    await t.ctx.close();

    // 7. (v12; #123) Vendas zero, com o nome da empresa: a conta aguenta (sem infinito) e o topo mostra a empresa
    t = await abrir(browser, largura, PAGINA, [201], 201);
    await ateContato(t.page, VENDAS_ZERO, largura, false);
    await t.page.click('#enviar');
    const cz = await ateORelatorio(t);
    conferirConversaDaPessoa(cz && cz.perfil, VENDAS_ZERO, 'vendas zero (v12)');
    const rz = await lerNumerosDoRelatorio(t.page);
    conferirRelatorioDaPessoa(rz, VENDAS_ZERO, 'vendas zero (v12)', cz ? cz.perfil.nome : null);
    p = t.pacotes[0];
    conferir(p && p.evento.lead_score_nota === notaT(81, VENDAS_ZERO) && notaT(81, VENDAS_ZERO) === 96, 'vendas zero (v12): o dinheiro na mesa da tela (' + milT(contaAParte(VENDAS_ZERO.numeros, VENDAS_ZERO.ticket).extraR) + ') é o do lead score: 15 pontos, nota 96 (veio ' + (p && p.evento.lead_score_nota) + ')');
    conferir(rz.texto.includes('Nenhuma conversa virou venda no mês.'), 'vendas zero (v12): a frase do fechamento sem venda, no lugar de "De cada Infinity conversas"');
    await t.ctx.close();

    // 8. (v12; #123) Quem não lembra dos números: a conta de exemplo, dita com todas as letras, e nada do exemplo dado como dela
    t = await abrir(browser, largura, PAGINA, [201], 201);
    await ateContato(t.page, NAO_LEMBRA, largura, false);
    const falaContato = await t.page.evaluate(() => document.querySelector('.conversa').textContent);
    conferir(falaContato.includes('Pronto, Joana! Sem os seus números, o painel mostra um funil de exemplo.') && !/já mostra \d de 4 etapas/.test(falaContato), 'quem não lembra (v12): antes do contato, a fala diz que o painel mostra um funil de exemplo');
    await t.page.click('#enviar');
    const cx = await ateORelatorio(t);
    const rx = await lerNumerosDoRelatorio(t.page);
    const faltam = EXEMPLO_T.filter(x => !rx.texto.includes(x));
    conferir(faltam.length === 0, 'quem não lembra (v12): o relatório com o aviso de exemplo (selo, título, abertura, títulos, dinheiro na mesa e nota da copy v4)' + (faltam.length ? ' (faltou: ' + faltam.join(' | ') + ')' : ''));
    // o relatório e o painel da conversa gratuita (o histórico da conversa tem as perguntas, como "De onde vêm os seus leads?", que são dela)
    const textosX = rx.texto + (cx ? cx.perfil.painel : '');
    const ditas = PROIBIDAS_NO_EXEMPLO.filter(x => textosX.includes(x)).concat(EXEMPLO_DA_PAGINA.filter(x => textosX.includes(x)));
    conferir(ditas.length === 0, 'quem não lembra (v12): no relatório e na conversa, nenhuma frase que dê o exemplo como dela, nem valor de exemplo da página' + (ditas.length ? ' (sobrou: ' + ditas.join(' | ') + ')' : ''));
    const selosX = await t.page.evaluate(() => [...document.querySelectorAll('.relatorio .selo-item.is-ganho')].map(e => e.textContent.trim()));
    conferir(!selosX.some(x => ['Semente boa', 'Agenda que comparece', 'Fechador'].includes(x)), 'quem não lembra (v12): os selos que saem das taxas do exemplo não são dados como dela (' + (selosX.join(', ') || 'nenhum') + ')');
    conferir(!!cx, 'quem não lembra (v12): passa pela conversa gratuita');
    // sem os números, o lead score usa "não lembra" nos leads (5 em vez de 10) e "sem números" no dinheiro na mesa (7 em vez de 15): 96 menos 13
    p = t.pacotes[0];
    conferir(p && p.evento.lead_score_nota === 83 && p.evento.lead_score_faixa === 'a', 'quem não lembra (v12): nota 83, faixa a, como antes da v12 (veio ' + (p && p.evento.lead_score_nota) + ', faixa ' + (p && p.evento.lead_score_faixa) + ')');
    const histX = EXEMPLO_NO_HISTORICO.filter(x => cx && cx.perfil.historico.includes(x));
    conferir(!!cx && histX.length === 0, 'quem não lembra (v12): o histórico da conversa sem valor de exemplo da página' + (histX.length ? ' (sobrou: ' + histX.join(' | ') + ')' : ''));
    conferir(!!cx && cx.perfil.cab === 'Perfil do exemplo' && cx.perfil.sub === 'Sem os seus números, este é o perfil de um funil de exemplo, não o seu.', 'quem não lembra (v12): na conversa gratuita, o painel diz que o perfil é do exemplo');
    conferir(!QUEBRADO.test(rx.texto), 'quem não lembra (v12): o relatório sem NaN, Infinity, undefined nem número negativo');
    await print(t.page, 'relatorio-exemplo', largura);
    await t.ctx.close();

    // 9. (v12) Funil saudável (200 · 100 · 50 · 40 · 10, as quatro etapas na meta): qualificado e não qualificado, a tabela de
    // crescimento com as taxas dela, a nota com a taxa geral e o valor médio, e nada do exemplo
    for (const [r, rot, tela, base] of [[SAUDAVEL, 'saudável qualificado (v12)', '#relatorio-saudavel', 81], [SAUDAVEL_NAO, 'saudável não qualificado (v12)', '#relatorio-saudavel-nao', 66]]) {
      t = await abrir(browser, largura, PAGINA, [201], 201);
      await ateContato(t.page, r, largura, false);
      await t.page.click('#enviar');
      const cs = await ateORelatorio(t);
      conferir(cs === null && await t.page.evaluate(() => location.hash) === tela, rot + ': sem etapa fraca, vai direto ao relatório ' + tela + ', sem a conversa gratuita');
      const rs = await lerNumerosDoRelatorio(t.page);
      conferirRelatorioDaPessoa(rs, r, rot);
      p = t.pacotes[0];
      conferir(p && p.evento.lead_score_nota === notaT(base, r) && p.evento.lead_score_faixa === (r === SAUDAVEL ? 'a' : 'eliminatorio'), rot + ': sem dinheiro na mesa, 3 pontos no lead score, nota ' + notaT(base, r) + ' (veio ' + (p && p.evento.lead_score_nota) + ', faixa ' + (p && p.evento.lead_score_faixa) + ')');
      await t.ctx.close();
    }

    // 10. (v12) Números fora de ordem (200 · 250 · 50 · 40 · 2): o aviso, o botão aceso e o relatório sem conta quebrada
    t = await abrir(browser, largura, PAGINA, [201], 201);
    const vf = await ateContato(t.page, FORA_DE_ORDEM, largura, false);
    conferir(vf.foraDeOrdem && vf.foraDeOrdem.aviso && vf.foraDeOrdem.aceso, 'fora de ordem (v12): o aviso "Maior que a etapa anterior" aparece e o botão de seguir fica aceso');
    await t.page.click('#enviar');
    const cf = await ateORelatorio(t);
    const rf = await lerNumerosDoRelatorio(t.page);
    const qf = (rf.texto + (cf ? cf.perfil.painel : '')).match(QUEBRADO);
    conferir(rf.texto.length > 0 && !qf, 'fora de ordem (v12): o relatório' + (cf ? ' e o painel da conversa' : '') + ' sem NaN, Infinity, undefined nem número negativo' + (qf ? ' (' + qf[0] + ')' : ''));
    conferir(rf.leads === '200' && rf.vendas === '2', 'fora de ordem (v12): a haste com os números digitados (' + rf.leads + ' leads, ' + rf.vendas + ' vendas)');
    await t.ctx.close();

    // 6. Aberta direto do arquivo: revisão sem gravar
    t = await abrir(browser, largura, ARQUIVO, [201], 201);
    await ateContato(t.page, EXEMPLO, largura, false);
    await t.page.click('#enviar');
    await naTela(t.page, 'conversa');
    // v8: até o fim, pela conversa gratuita e pelo botão do diagnóstico
    await opcao(t.page, 'Sim, eu quero');
    await t.page.locator('[data-corpo] [data-acao="ver-diagnostico"]').click({ timeout: 15000 });
    await naTela(t.page, 'relatorio');
    await t.page.waitForTimeout(500);
    conferir(t.envios.length === 0 && t.eventos.length === 0, 'arquivo (file://): percorre tudo e nada é enviado, nem o fim do quiz nem os eventos');
    conferir(!(await t.page.locator('#avisoEnvio').isVisible()), 'arquivo (file://): nenhum aviso de falha');
    conferir(t.externas.length === 0, 'arquivo (file://): nenhuma requisição para outro endereço (sem a pasta fontes/, cai na letra do sistema)');
    conferir(semDadoNoConsole(t), 'arquivo (file://): console sem dado de pessoa');
    await t.ctx.close();
  }

  // ··· Medição (v9 do protótipo; decisão #116): o aviso de cookies e o Tag Manager, no bloco que a montagem acrescenta ···
  // O Google é respondido com 404 em todo contexto (abrir); nenhum pedido ao Google sai da máquina.
  const T = medicao.TEXTO_DO_AVISO;
  const ALVO_GTM = medicao.ENDERECO_GTM;
  const DO_GOOGLE = /^https:\/\/([a-z0-9-]+\.)*(googletagmanager\.com|google-analytics\.com|google\.com)\//;
  const SESSAO_TESTE = 'sessao-teste-0001';
  const doAviso = (page, texto) => page.locator('#aviso-cookies button').filter({ hasText: new RegExp('^' + texto + '$') });
  const lerMedicao = page => page.evaluate(chave => {
    const ls = f => { try { return f(); } catch (e) { return 'erro'; } };
    return { escolha: ls(() => localStorage.getItem(chave)), guardados: ls(() => localStorage.length), aviso: !!document.getElementById('aviso-cookies'),
      camada: (window.dataLayer || []).map(x => x && typeof x === 'object' && typeof x.length === 'number' && !Array.isArray(x) ? { gtag: Array.from(x) } : x),
      cookies: document.cookie, hash: location.hash };
  }, medicao.CHAVE_ESCOLHA);
  const consentimentos = (m, tipo) => m.camada.filter(x => x && x.gtag && x.gtag[0] === 'consent' && x.gtag[1] === tipo).map(x => x.gtag[2]);
  const padraoNegado = m => {
    const d = consentimentos(m, 'default');
    return d.length === 1 && m.camada[0] && m.camada[0].gtag && m.camada[0].gtag[1] === 'default' &&
      JSON.stringify(d[0]) === '{"ad_storage":"denied","ad_user_data":"denied","ad_personalization":"denied","analytics_storage":"denied"}';
  };
  const anuncioNuncaMuda = m => consentimentos(m, 'update').every(u => Object.keys(u).join() === 'analytics_storage');
  const focoNoAviso = page => page.evaluate(() => {
    const e = document.activeElement, c = getComputedStyle(e);
    return { texto: (e.textContent || '').trim(), dentro: !!e.closest('#aviso-cookies'), visivel: e.matches(':focus-visible') && c.outlineStyle !== 'none' && parseFloat(c.outlineWidth) >= 2 };
  });
  const pedidoAoGoogle = page => page.waitForRequest(r => r.url().startsWith('https://www.googletagmanager.com/'), { timeout: 10000 }).catch(() => null);
  const enderecoDe = page => new URL(page.url());

  for (const largura of [375, 360, 1440]) {
    const rotulo = 'medição ' + largura;
    console.log('\n· medição (aviso de cookies e Tag Manager) · ' + largura + ' pixels' + (largura === 360 ? ', 640 de altura' : ''));

    // M1. Sem escolha: o aviso no topo, em fluxo normal, sem cobrir nenhum botão; nada guardado e nada para fora
    let t = await abrir(browser, largura, PAGINA, [201], 201);
    await naTela(t.page, 'abertura');
    await t.page.evaluate(() => document.fonts.ready);
    await t.page.waitForTimeout(400);
    let m = await lerMedicao(t.page);
    const av = await t.page.evaluate(() => {
      const a = document.getElementById('aviso-cookies');
      if (!a) return null;
      const r = a.getBoundingClientRect(), fim = document.body.lastElementChild;
      const bot = [...a.querySelectorAll('button')].map(b => {
        const c = getComputedStyle(b), q = b.getBoundingClientRect();
        return { texto: b.textContent.trim(), tipo: b.getAttribute('type'), w: Math.round(q.width), h: Math.round(q.height),
          estilo: [c.backgroundColor, c.color, c.borderTopWidth, c.borderTopStyle, c.borderTopColor, c.borderRadius, c.fontFamily, c.fontSize, c.fontWeight, c.paddingTop, c.paddingLeft].join(' | ') };
      });
      return { primeiro: document.body.firstElementChild === a, pos: getComputedStyle(a).position, topo: Math.round(r.top), esq: Math.round(r.left), larg: Math.round(r.width), alt: Math.round(r.height),
        papel: a.getAttribute('role'), rotulo: a.getAttribute('aria-label'), texto: a.innerText.replace(/\s+/g, ' '), bot,
        ultimo: fim.id, link: fim.innerText.trim(), linkPos: getComputedStyle(fim).position, lateral: document.documentElement.scrollWidth - window.innerWidth };
    });
    conferir(av && av.primeiro && av.pos === 'static' && av.topo === 0 && av.esq === 0 && av.larg === largura,
      rotulo + ' · sem escolha: o aviso aparece no topo, primeiro filho do body, em fluxo normal (' + (av ? av.pos + ', topo ' + av.topo + ', ' + av.larg + ' por ' + av.alt : 'sem aviso') + ')');
    conferir(av && av.papel === 'region' && av.rotulo === T.titulo && [T.titulo, T.texto, T.politica].every(x => av.texto.includes(x)) &&
      av.bot.map(b => b.texto).join('|') === T.aceitar + '|' + T.recusar && av.bot.every(b => b.tipo === 'button'),
      rotulo + ' · sem escolha: o texto do aviso-de-cookies v' + medicao.VERSAO_DO_AVISO + ', região com rótulo e os botões "' + T.aceitar + '" e "' + T.recusar + '" (button type="button")');
    conferir(av && av.bot.length === 2 && av.bot[0].w === av.bot[1].w && av.bot[0].h === av.bot[1].h && av.bot[0].estilo === av.bot[1].estilo,
      rotulo + ' · sem escolha: os dois botões com o mesmo peso visual (' + (av && av.bot[0] ? av.bot[0].w + ' por ' + av.bot[0].h + '; ' + av.bot[0].estilo : '') + ')');
    conferir(av && av.ultimo === 'aviso-cookies-reabrir' && av.link === T.reabrir && av.linkPos === 'static', rotulo + ' · o link "' + T.reabrir + '" é o último filho do body, em fluxo normal');
    conferir(av && av.lateral <= 0, rotulo + ' · sem rolagem para o lado com o aviso (' + (av && av.lateral) + ')');
    conferir(m.escolha === null && m.guardados === 0 && m.cookies === '', rotulo + ' · sem escolha: nada guardado no navegador, nem escolha nem cookie');
    conferir(padraoNegado(m) && consentimentos(m, 'update').length === 0 && !m.camada.some(x => x && x.event === 'gtm.js'),
      rotulo + ' · sem escolha: consentimento padrão com a análise e os três de anúncio negados, antes de tudo; nenhum update e nenhum carregador');
    if (largura !== 360) { await t.page.evaluate(() => window.scrollTo(0, 0)); await t.page.waitForTimeout(200); await t.page.screenshot({ path: path.join(PRINTS, 'aviso-' + largura + '.png') }); }
    // O aviso não cobre o "Fazer a Análise" do cabeçalho (com a página no alto) nem o da abertura (rolado até ele)
    const cobertura = await t.page.evaluate(async () => {
      const quadro = () => new Promise(ok => requestAnimationFrame(() => requestAnimationFrame(ok)));
      const a = document.getElementById('aviso-cookies');
      const cruza = (p, q) => p.left < q.right && q.left < p.right && p.top < q.bottom && q.top < p.bottom;
      const ver = async (sel, rolar) => {
        const b = document.querySelector(sel);
        if (rolar) b.scrollIntoView({ block: 'center', behavior: 'instant' }); else window.scrollTo({ top: 0, behavior: 'instant' });
        await quadro();
        const r = b.getBoundingClientRect(), ra = a.getBoundingClientRect();
        const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        return { cruza: cruza(r, ra), centro: !!el && b.contains(el), naTela: r.top >= 0 && r.bottom <= innerHeight, r: [Math.round(r.top), Math.round(r.bottom)].join('-'), ra: [Math.round(ra.top), Math.round(ra.bottom)].join('-') };
      };
      const cab = await ver('#cabSafra [data-acao="proximo"]', false);
      const abe = await ver('.abertura__copy [data-acao="proximo"]', true);
      window.scrollTo(0, 0);
      return { cab, abe };
    });
    for (const [k, nome] of [['cab', 'do cabeçalho'], ['abe', 'da abertura']]) {
      const c = cobertura[k];
      conferir(!c.cruza && c.centro && c.naTela, rotulo + ' · sem escolha: o aviso não cobre o "Fazer a Análise" ' + nome + ' (botão ' + c.r + ', aviso ' + c.ra + '; no centro do botão está o botão)');
    }
    if (largura < 900) {
      // No celular, rolando até a barra fixa do rodapé aparecer: o aviso (em fluxo, lá no alto) não cobre a barra
      await t.page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await t.page.waitForFunction(() => document.body.hasAttribute('data-barra'), null, { timeout: 5000 }).catch(() => {});
      await t.page.waitForTimeout(400);
      const barra = await t.page.evaluate(() => {
        const a = document.getElementById('aviso-cookies'), b = document.querySelector('#barraSafra [data-acao="proximo"]');
        const r = b.getBoundingClientRect(), ra = a.getBoundingClientRect();
        const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        return { aparece: document.body.hasAttribute('data-barra') && r.height > 0, cruza: r.left < ra.right && ra.left < r.right && r.top < ra.bottom && ra.top < r.bottom, centro: !!el && b.contains(el) };
      });
      conferir(barra.aparece && !barra.cruza && barra.centro, rotulo + ' · sem escolha (celular): rolando, a barra fixa do rodapé aparece e o aviso não cobre o botão dela');
    }
    // O link "Cookies" no fim da página não fica coberto (rolado até ele)
    const link = await t.page.evaluate(async () => {
      const b = document.querySelector('#aviso-cookies-reabrir button');
      b.scrollIntoView({ block: 'center', behavior: 'instant' });
      await new Promise(ok => requestAnimationFrame(() => requestAnimationFrame(ok)));
      const r = b.getBoundingClientRect(), el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return !!el && b.contains(el);
    });
    conferir(link, rotulo + ' · o link "' + T.reabrir + '" no fim da página fica livre (no centro dele está ele)');
    await t.page.waitForTimeout(300);
    conferir(t.externas.length === 0, rotulo + ' · sem escolha: nenhuma requisição para outro endereço' + (t.externas.length ? ' (' + t.externas.join(', ') + ')' : ''));
    await t.ctx.close();

    // M2. Recusar: guarda "recusado", o aviso some, nada sai, nem depois de recarregar; a medição própria continua
    t = await abrir(browser, largura, PAGINA, [201], 201);
    await naTela(t.page, 'abertura');
    await doAviso(t.page, T.recusar).click();
    await t.page.waitForTimeout(400);
    m = await lerMedicao(t.page);
    conferir(m.escolha === medicao.ESCOLHAS.recusar && m.guardados === 1 && !m.aviso && m.hash === '#abertura', rotulo + ' · Recusar: guarda só "recusado" (' + medicao.CHAVE_ESCOLHA + '), o aviso some e o quiz continua na abertura');
    // Escolhido pelo mouse, o foco vai ao primeiro elemento focável à vista depois do aviso: nunca ao body, e sem fazer surgir o "Pular para o conteúdo"
    const focoMouse = await t.page.evaluate(() => { const e = document.activeElement, r = e.getBoundingClientRect();
      return { body: e === document.body, pular: e.matches('.pular'), naTela: r.bottom > 0 && r.top < innerHeight, quem: e.tagName.toLowerCase() + (e.id ? '#' + e.id : '') + ' ' + (e.textContent || '').trim().slice(0, 20) }; });
    conferir(!focoMouse.body && !focoMouse.pular && focoMouse.naTela, rotulo + ' · Recusar pelo mouse: o foco vai ao primeiro elemento focável à vista depois do aviso, nunca ao body (' + focoMouse.quem + ')');
    conferir(padraoNegado(m) && consentimentos(m, 'update').length === 0 && !m.camada.some(x => x && ('pagina_limpa' in x || x.event === 'gtm.js')), rotulo + ' · Recusar: o consentimento continua negado e nada vai para a camada de dados');
    await t.page.reload();
    await naTela(t.page, 'abertura');
    await t.page.waitForTimeout(600);
    m = await lerMedicao(t.page);
    conferir(m.escolha === medicao.ESCOLHAS.recusar && !m.aviso && m.cookies === '', rotulo + ' · Recusar e recarregar: o aviso não volta e nenhum cookie aparece');
    if (largura === 1440) {
      // A forma original da conferência da abertura (v4), com a escolha guardada: sem o aviso, de scroll 0 até o fim, título, promessa,
      // botão e cabeçalho não saem do lugar e só o relatório se mexe; depois da escolha, a abertura é exatamente a de antes
      await t.page.evaluate(() => Promise.all(document.getAnimations().filter(a => a.effect && a.effect.getComputedTiming().iterations !== Infinity).map(a => a.finished.catch(() => {}))));
      await t.page.evaluate(() => window.scrollTo(0, 0)); await t.page.waitForTimeout(300);
      const pos = () => t.page.evaluate(() => ['.abertura h1', '.abertura__lede', '#botaoAbertura', '.previa', '#cabSafra'].map(s => Math.round(document.querySelector(s).getBoundingClientRect().top)));
      const a0 = await pos();
      await t.page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight)); await t.page.waitForTimeout(400);
      const a1 = await pos();
      conferir(a0[4] === 0 && a1[0] === a0[0] && a1[1] === a0[1] && a1[2] === a0[2] && a1[3] < a0[3] && a1[4] === 0,
        rotulo + ' · com "recusado" guardado, a forma original: de scroll 0 até o fim, só o relatório se mexe; título, promessa, botão e cabeçalho ficam (' + a0.join(',') + ' → ' + a1.join(',') + ')');
      await t.page.evaluate(() => window.scrollTo(0, 0)); await t.page.waitForTimeout(200);
    }
    conferir(t.externas.length === 0, rotulo + ' · Recusar: nenhuma requisição para outro endereço, nem depois de recarregar' + (t.externas.length ? ' (' + t.externas.join(', ') + ')' : ''));
    conferir(doTipo(t, 'inicio_quiz').length === 2, rotulo + ' · Recusar: a medição própria, sem cookie, continua (o início do quiz foi mandado nas duas aberturas; política v3, item 7)');
    await t.ctx.close();

    // M3. Aceitar, com o id_sessao no endereço e na página de origem
    t = await abrir(browser, largura, PAGINA + '&id_sessao=' + SESSAO_TESTE, [201], 201, { referer: BASE + '?utm_source=bio&id_sessao=' + SESSAO_TESTE });
    await naTela(t.page, 'abertura');
    let pedido = pedidoAoGoogle(t.page);
    await doAviso(t.page, T.aceitar).click();
    await pedido;
    await t.page.waitForTimeout(400);
    m = await lerMedicao(t.page);
    let end = enderecoDe(t.page);
    conferir(t.externas[0] === ALVO_GTM, rotulo + ' · Aceitar: a primeira requisição para outro endereço é ' + ALVO_GTM + ' (' + (t.externas[0] || 'nenhuma') + ')');
    conferir(t.externas.length > 0 && t.externas.every(u => DO_GOOGLE.test(u)), rotulo + ' · Aceitar: nenhuma requisição vai para fora do Google (' + t.externas.length + ': ' + [...new Set(t.externas)].join(', ') + ')');
    conferir(m.escolha === medicao.ESCOLHAS.aceitar && m.guardados === 1 && !m.aviso, rotulo + ' · Aceitar: guarda só "aceito" e o aviso some');
    const limpa = m.camada.find(x => x && 'pagina_limpa' in x);
    const camadaTexto = JSON.stringify(m.camada);
    conferir(limpa && limpa.pagina_limpa === BASE + 'analise/' + BUSCA && !camadaTexto.includes('id_sessao') && !camadaTexto.includes(SESSAO_TESTE),
      rotulo + ' · Aceitar: pagina_limpa sem o id_sessao e sem o # (' + (limpa && limpa.pagina_limpa.replace(BASE, '/')) + '); nada da camada de dados tem o código da visita');
    conferir(limpa && limpa.origem_limpa === BASE + '?utm_source=bio', rotulo + ' · Aceitar: origem_limpa sem o id_sessao da página de origem (' + (limpa && limpa.origem_limpa.replace(BASE, '/')) + ')');
    conferir(end.searchParams.get('id_sessao') === null && end.searchParams.get('utm_source') === 'bio' && end.searchParams.get('utm_campaign') === 'funil-01' && end.hash === '#abertura',
      rotulo + ' · Aceitar: o endereço da barra fica sem o id_sessao, com os outros parâmetros e o # (' + end.search + end.hash + ')');
    const atualizacoes = consentimentos(m, 'update');
    conferir(atualizacoes.length === 1 && JSON.stringify(atualizacoes[0]) === '{"analytics_storage":"granted"}' && padraoNegado(m),
      rotulo + ' · Aceitar: o consentimento muda só a análise para concedida; os três de anúncio ficam negados');
    const iUpd = m.camada.findIndex(x => x && x.gtag && x.gtag[1] === 'update'), iLimpa = m.camada.indexOf(limpa), iGtm = m.camada.findIndex(x => x && x.event === 'gtm.js');
    conferir(iUpd > 0 && iUpd < iLimpa && iLimpa < iGtm && m.camada.filter(x => x && x.event === 'gtm.js').length === 1,
      rotulo + ' · Aceitar: na camada de dados, o consentimento, depois a pagina_limpa e só então o carregador, uma vez (' + [iUpd, iLimpa, iGtm].join(', ') + ')');
    const iniM3 = doTipo(t, 'inicio_quiz')[0];
    conferir(iniM3 && iniM3.pacote.evento.id_sessao === SESSAO_TESTE, rotulo + ' · Aceitar: o quiz leu o id_sessao antes de ele sair do endereço (o início do quiz leva ' + SESSAO_TESTE + ')');
    // Com "aceito" guardado, a página seguinte não mostra o aviso e carrega o Tag Manager direto
    const jaPedidas = t.externas.length;
    pedido = pedidoAoGoogle(t.page);
    await t.page.reload();
    await naTela(t.page, 'abertura');
    await pedido;
    await t.page.waitForTimeout(400);
    m = await lerMedicao(t.page);
    const novas = t.externas.slice(jaPedidas);
    conferir(!m.aviso && novas[0] === ALVO_GTM && novas.every(u => DO_GOOGLE.test(u)) && consentimentos(m, 'update').length === 1 && m.camada.some(x => x && 'pagina_limpa' in x),
      rotulo + ' · com "aceito" guardado, ao abrir de novo: sem o aviso, o consentimento e a pagina_limpa e o gtm.js direto, só do Google');
    conferir(semDadoNoConsole(t), rotulo + ' · Aceitar: console sem dado de pessoa');
    await t.ctx.close();

    // M4. Rodada inteira (eliminatório) com o "Aceitar" logo no começo e o id_sessao da landing no endereço
    t = await abrir(browser, largura, PAGINA + '&id_sessao=' + SESSAO_DA_LANDING, [201], 201);
    await naTela(t.page, 'abertura');
    pedido = pedidoAoGoogle(t.page);
    await doAviso(t.page, T.aceitar).click();
    await pedido;
    const limpoNoComeco = enderecoDe(t.page).searchParams.get('id_sessao') === null;
    await ateContato(t.page, ELIMINATORIO, largura, false, 'cabecalho');
    end = enderecoDe(t.page);
    await t.page.click('#enviar');
    await naTela(t.page, 'relatorio-nao');
    await t.page.click('[data-acao="interesse"]');
    await t.page.waitForTimeout(500);
    const pacoteDe = tipo => doTipo(t, tipo)[0] && doTipo(t, tipo)[0].pacote;
    const sessoes = [pacoteDe('inicio_quiz'), t.pacotes[0], pacoteDe('interesse_pos_relatorio')].map(x => x && x.evento && x.evento.id_sessao);
    conferir(limpoNoComeco && sessoes.length === 3 && sessoes.every(s => s === SESSAO_DA_LANDING),
      rotulo + ' · rodada inteira com "Aceitar" no começo: o início, o fim do quiz e o clique levam o id_sessao do endereço original, com o endereço já limpo (' + sessoes.join(', ') + ')');
    conferir(end.searchParams.get('id_sessao') === null && end.searchParams.get('utm_source') === 'bio' && enderecoDe(t.page).searchParams.get('id_sessao') === null,
      rotulo + ' · rodada inteira: o endereço segue sem o id_sessao de tela em tela, com as utm (' + end.search + end.hash + ')');
    conferir(t.externas.filter(u => u === ALVO_GTM).length === 1 && t.externas.every(u => DO_GOOGLE.test(u)), rotulo + ' · rodada inteira: só o gtm.js do Google, uma vez, e nada mais para fora');
    conferir(semDadoNoConsole(t), rotulo + ' · rodada inteira: console sem dado de pessoa');
    await t.ctx.close();

    // M5. Teclado: o Tab passa pelo link da política (v11; #117) e chega aos dois botões do aviso, com o foco visível, e o Enter funciona
    t = await abrir(browser, largura, PAGINA, [201], 201);
    await naTela(t.page, 'abertura');
    const LINKS = medicao.LINKS_DO_AVISO;
    const fl = [];
    for (let k = 0; k < LINKS.length; k++) { await t.page.keyboard.press('Tab'); fl.push(await focoNoAviso(t.page)); }
    conferir(LINKS.length === 1 && LINKS[0].endereco === '/politica-de-privacidade/' && fl.every((f, k) => f.dentro && f.texto === LINKS[k].texto && f.visivel),
      rotulo + ' · teclado: antes dos botões, o Tab passa pelo link "' + (LINKS[0] && LINKS[0].texto) + '" do aviso, com o foco visível (' + fl.map(f => f.texto).join(', ') + ')');
    await t.page.keyboard.press('Tab');
    const f1 = await focoNoAviso(t.page);
    await t.page.keyboard.press('Tab');
    const f2 = await focoNoAviso(t.page);
    conferir(f1.dentro && f1.texto === T.aceitar && f1.visivel && f2.dentro && f2.texto === T.recusar && f2.visivel,
      rotulo + ' · teclado: depois do link, um Tab chega ao "' + T.aceitar + '" e o seguinte ao "' + T.recusar + '", com o foco visível (' + f1.texto + ', ' + f2.texto + ')');
    await t.page.keyboard.press('Enter');
    await t.page.waitForTimeout(300);
    m = await lerMedicao(t.page);
    conferir(m.escolha === medicao.ESCOLHAS.recusar && !m.aviso && t.externas.length === 0, rotulo + ' · teclado: Enter no "' + T.recusar + '" guarda a escolha e fecha o aviso, sem nada para fora');
    const focoTeclado = await t.page.evaluate(() => { const e = document.activeElement; return { pular: e.matches('a.pular'), body: e === document.body, quem: e.tagName.toLowerCase() + ' ' + (e.textContent || '').trim().slice(0, 30) }; });
    conferir(focoTeclado.pular && !focoTeclado.body, rotulo + ' · teclado: depois da escolha, o foco vai ao primeiro elemento focável depois do aviso, o "Pular para o conteúdo", nunca ao body (' + focoTeclado.quem + ')');

    // M6. O link "Cookies" reabre o aviso no topo, com o foco nele; de recusado para aceito, pelo teclado
    await t.page.locator('#aviso-cookies-reabrir button').click();
    await t.page.waitForTimeout(300);
    const re = await t.page.evaluate(() => { const a = document.getElementById('aviso-cookies'); return a && { primeiro: document.body.firstElementChild === a, foco: document.activeElement === a, topo: Math.round(a.getBoundingClientRect().top) }; });
    conferir(re && re.primeiro && re.foco && re.topo === 0, rotulo + ' · o link "' + T.reabrir + '" reabre o aviso no topo e leva o foco a ele' + (re ? ' (topo ' + re.topo + ')' : ''));
    for (let k = 0; k < LINKS.length; k++) await t.page.keyboard.press('Tab');   // o link da política, antes dos botões
    await t.page.keyboard.press('Tab');
    const f3 = await focoNoAviso(t.page);
    pedido = pedidoAoGoogle(t.page);
    await t.page.keyboard.press('Enter');
    await pedido;
    await t.page.waitForTimeout(400);
    m = await lerMedicao(t.page);
    const voltou = await t.page.evaluate(() => !!document.activeElement.closest('#aviso-cookies-reabrir'));
    conferir(f3.texto === T.aceitar && m.escolha === medicao.ESCOLHAS.aceitar && !m.aviso && t.externas[0] === ALVO_GTM && consentimentos(m, 'update').length === 1,
      rotulo + ' · de recusado para aceito pelo link: Tab até o "' + T.aceitar + '", Enter, guarda "aceito" e só então o gtm.js (' + (t.externas[0] || 'nenhum') + ')');
    conferir(voltou, rotulo + ' · depois da escolha pelo link, o foco volta ao link "' + T.reabrir + '"');

    // M7. De aceito para recusado: guarda "recusado", manda a análise negada e apaga os cookies _ga (um de teste, posto antes)
    await t.page.evaluate(() => {
      document.cookie = '_ga=GA1.1.000000000.0000000000; path=/';
      document.cookie = '_ga_TESTE00=GS1.1.0000000000.1.0.0000000000.0.0.0; path=/';
      document.cookie = 'outro_teste=1; path=/';
    });
    const cookiesAntes = (await t.ctx.cookies()).map(c => c.name).sort().join(',');
    await t.page.locator('#aviso-cookies-reabrir button').click();
    await doAviso(t.page, T.recusar).click();
    await t.page.waitForTimeout(300);
    m = await lerMedicao(t.page);
    const cookiesDepois = (await t.ctx.cookies()).map(c => c.name).sort().join(',');
    conferir(m.escolha === medicao.ESCOLHAS.recusar && !m.aviso && cookiesAntes === '_ga,_ga_TESTE00,outro_teste' && cookiesDepois === 'outro_teste',
      rotulo + ' · de aceito para recusado: guarda "recusado" e apaga os cookies _ga de teste, e só eles (antes ' + cookiesAntes + '; depois ' + cookiesDepois + ')');
    const atu = consentimentos(m, 'update');
    conferir(atu.length === 2 && JSON.stringify(atu[1]) === '{"analytics_storage":"denied"}' && anuncioNuncaMuda(m), rotulo + ' · de aceito para recusado: manda a análise negada; o consentimento de anúncio nunca muda');
    const gtmAntes = t.externas.filter(u => u === ALVO_GTM).length;
    await t.page.reload();
    await naTela(t.page, 'abertura');
    await t.page.waitForTimeout(600);
    m = await lerMedicao(t.page);
    conferir(!m.aviso && m.escolha === medicao.ESCOLHAS.recusar && t.externas.filter(u => u === ALVO_GTM).length === gtmAntes && consentimentos(m, 'update').length === 0,
      rotulo + ' · de aceito para recusado: na página seguinte, o aviso não volta e nada do Google carrega');
    await t.ctx.close();
  }

  await browser.close();
  srv.close();
  console.log('\n' + (falhas ? falhas + ' conferência(s) falharam' : 'Tudo certo: todas as conferências passaram'));
  process.exit(falhas ? 1 : 0);
})().catch(e => { console.error(e); process.exit(1); });
