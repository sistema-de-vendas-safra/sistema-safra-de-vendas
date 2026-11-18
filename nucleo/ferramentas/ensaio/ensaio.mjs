// Ensaio geral do protótipo do funil-01, ponta a ponta, sem serviço real (etapa 25)
// id: ensaio-prototipo-funil-01 · versao 12 · rascunho · otavio: pendente (ver README.md desta pasta)
//
// Um comando só, de dentro desta pasta:   npm run ensaio
// ou da raiz do repositório:              node nucleo/ferramentas/ensaio/ensaio.mjs
// Opções: --sem-wrangler roda o garçom num servidor Node em vez do wrangler dev (contorno).
//         --esperar-margem espera de verdade a margem de 1 minuto da planilha (21.6), sem o contorno.
//
// O que faz, na ordem (cada conferência sai com OK ou FALHOU; termina com código 1 se algo falhar):
//   1. Banco v2 como está no Supabase: PGlite com os papéis do Supabase de mentira; esquema.sql
//      duas vezes; conferir.sql v2 avisa que falta a migração; a linha do catálogo de antes
//      (quiz-01, 1); dados de antes, de teste (#102), entre eles uma linha que imita a do Otávio.
//   2. Migração 001 (v3) duas vezes sobre esses dados: os dados não mudam; conferir.sql avisa só na
//      linha 19; desde a v12, a migração 002 (as respostas na planilha) duas vezes, e conferir.sql v3
//      19 de 19; permissões de verdade trocando de papel (SET ROLE), com a porta nova registrar_evento.
//   3. Supabase de mentira em 127.0.0.1 (supabase-de-mentira.mjs): chave de mentira vira papel.
//   4. Site montado (montar-site.mjs) e o garçom (v5) no wrangler dev --local, com a configuração do
//      protótipo copiada para uma pasta temporária, com SUPABASE_URL e ORIGEM_PERMITIDA trocadas e, desde a v10,
//      sem o bloco do Custom Domain e com um endereço antigo de mentira no lugar do de verdade.
//   5. Sem as linhas novas do catálogo, o fim do quiz novo, a visita e o início do quiz são
//      recusados; depois, dados/banco/catalogo-prototipo.sql (v3) duas vezes.
//   6. Landing (a landing-page-02 em /, v4) e quiz num navegador sem tela: visita, início do quiz, fim do quiz e clique no fim;
//      caixa marcada e desmarcada; o corte mais restritivo; a faixa B; fontes locais e nenhum
//      pedido fora de 127.0.0.1; a conferência da landing que estava fora do repositório (34.17).
//      (v8; #118) No programa da landing-page-02 v3: nenhum texto antigo da seção "Como funciona" e do FAQ,
//      e todo texto novo com as cópias certas, na versão do computador e na do celular.
//      (v9; #119) No programa da landing-page-02 v4: "GSAAS" em lugar nenhum; nenhum texto que o pedido 20 trocou; as duas
//      respostas do FAQ do pedido 20 nas duas cópias; e o contador do carrossel de "01 / 09" a "09 / 09" nas duas versões.
//      (v11; quiz-01-pagina v8) O lead A termina na conversa gratuita com o Junior (#conversa, no lugar da oferta do plano de 90
//      dias), responde "Sim, eu quero", o clique quero-conversa chega ao banco (201) e o botão "Ver meu diagnóstico" abre o
//      relatório do qualificado, sem o bloco de chamada; no banco e na planilha, o clique do lead A.
//   7. A planilha do SDR (Codigo.gs v3 com o Google de mentira, em outro processo): a aba fila, com 20 colunas, e,
//      desde a v12, a aba respostas, a segunda, com as respostas completas do lead A e da faixa b.
//   8. Casos de erro: chaves no lugar errado, pacote sem consentimento, clique sem fim do quiz,
//      a mesma pessoa enviando duas vezes ao mesmo tempo.
//   9. (v6; #116) A medição no site montado, em 375, 360 e 1440: sem escolha e com "Recusar", nada para fora
//      de 127.0.0.1, na landing e no quiz; com "Aceitar" na landing, num contexto que responde 404 ao Google, o gtm.js
//      do GTM-T6L4QTB8 é o primeiro e único pedido para fora, a pagina_limpa sai sem o id_sessao, e a escolha passa
//      para o quiz, que abre sem o aviso e já pede o gtm.js; no banco, a visita e o início com a mesma sessão.
//  10. (v8; #118) A seção "Como funciona" e o FAQ da landing-page-02 na página aberta, em 1440, 375 e 360: o título, a
//      régua, os oito cartões, o cartão das Sessões de Comando sem número, o controle do carrossel e as duas respostas; nenhum
//      texto antigo; e o "Fazer a Análise" do cabeçalho, que no celular é um bloco, levando ao quiz com as utm e o id_sessao.
//      (v9) Três textos esperados acompanham o pedido 20: o rótulo da Fase 1, a linha do cartão 08 e uma resposta do FAQ.
//  11. (v9; #119) A landing-page-02 v4 na página aberta, em 1440, 375 e 360: o carrossel com 9 cartões e o contador dando a
//      volta de "01 / 09" a "09 / 09"; nenhum chip cortado em nenhum cartão; a barra acesa da régua no fim da semana 2; as
//      duas respostas do FAQ do pedido 20; os dois rótulos novos, sem os antigos; cada item do menu da demonstração abrindo
//      a sua tela, nos dois perfis; "GSAAS" em nenhum texto à vista; e as chamadas do topo e do cartão da oferta levando ao quiz.
//  12. (v10; #120) O endereço e o caminho novos: /quiz e /quiz/ levam (302) a /analise/ com a consulta inteira, e /analise sem a
//      barra funciona; um pedido de página com o nome do endereço antigo é levado (302) ao novo, no mesmo caminho; a porta pública
//      aceita a origem nova e recusa a antiga; a porta privada responde igual com os dois nomes, e a planilha do SDR puxa os leads
//      pelo antigo; noindex em toda resposta, inclusive nos redirecionamentos; os links da política e do aviso de cookies abrem;
//      as 10 chamadas da landing, clicadas uma a uma em 1440, 375 e 360, pedem direto /analise/ com as cinco utm e o id_sessao;
//      quem abre um link antigo chega à página no endereço novo; e o quiz vai da abertura ao fim em /analise/, nos três desfechos
//      (desde a v11, o do lead A é a conversa gratuita e o relatório que o botão dela abre).
//      Desde a v10, as idas da landing ao quiz das seções 6, 10 e 11 também têm de ser diretas, sem passar por /quiz.
//  13. Fechamento: conferir.sql de novo e registros sem dado pessoal.
//
// Só valores de mentira, gerados em tempo de execução. Só 127.0.0.1. Dados de pessoa de teste,
// marcados (#102): nome começando por TESTE, e-mail @teste.invalid. Nada é gravado no repositório:
// a configuração e os segredos de mentira do wrangler moram numa pasta temporária fora dele,
// apagada no fim. Todo processo (wrangler, navegador, servidores) é encerrado no fim, mesmo em falha.

import { PGlite } from '@electric-sql/pglite';
import { spawn, execFileSync } from 'node:child_process';
import { createRequire } from 'node:module';
import { createInterface } from 'node:readline';
import { randomBytes } from 'node:crypto';
import { readFileSync, writeFileSync, copyFileSync, mkdtempSync, rmSync, existsSync, statSync, readdirSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve, normalize, extname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import http from 'node:http';
import net from 'node:net';
import { criarFila, criarSupabaseDeMentira } from './supabase-de-mentira.mjs';

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = resolve(AQUI, '../../..');
const PROTOTIPO = join(RAIZ, 'entregas/prototipo-funil-01');
const SITE = join(PROTOTIPO, 'site');
const WRANGLER = join(RAIZ, 'nucleo/ferramentas/prototipo/node_modules/.bin/wrangler');
const exigirDosPrints = createRequire(join(RAIZ, 'nucleo/ferramentas/prints/package.json'));
const { chromium } = exigirDosPrints('playwright-core');
const { acharChromium } = exigirDosPrints('./print.js');
const SEM_WRANGLER = process.argv.includes('--sem-wrangler');
const ESPERAR_MARGEM = process.argv.includes('--esperar-margem');

// ··· Conferências ···
const resultados = [];
function conferir(ok, texto) {
  resultados.push({ ok: !!ok, texto });
  console.log((ok ? 'OK    ' : 'FALHOU') + ' · ' + texto);
}
const secao = (t) => console.log('\n· ' + t);
// Linha informativa: não é conferência e não entra na contagem
const informar = (texto) => console.log('INFO   · ' + texto);

// ··· Limpeza: tudo o que foi aberto é fechado no fim, mesmo em falha ···
const limpezas = [];
let limpando = null;
function limparTudo() {
  if (!limpando) {
    limpando = (async () => {
      for (const f of limpezas.reverse()) { try { await f(); } catch { /* segue limpando */ } }
    })();
  }
  return limpando;
}
for (const sinal of ['SIGINT', 'SIGTERM']) {
  process.on(sinal, () => { console.log('\nInterrompido: encerrando tudo.'); limparTudo().then(() => process.exit(1)); });
}

// ··· Valores de mentira, montados agora (nada parecido com chave fica escrito no repositório) ···
const mentira = (nome) => ['mentira', nome, randomBytes(24).toString('hex')].join('-');
const CHAVE_PUBLICAVEL = mentira('publicavel');
const CHAVE_SECRETA = mentira('secreta');
const CHAVE_PLANILHA = mentira('planilha');
const CHAVE_PLANILHA_ERRADA = mentira('planilha');
const SEGREDOS = [CHAVE_PUBLICAVEL, CHAVE_SECRETA, CHAVE_PLANILHA, CHAVE_PLANILHA_ERRADA];

// Pessoas de teste (#102). Telefones só com zeros e um dígito no fim; nenhum número real.
// No navegador (pela página):
const PESSOA_A = { nome: 'TESTE Marina Ensaio', email: 'marina.ensaio@teste.invalid', tel: '00900000001' };
const PESSOA_ELIM = { nome: 'TESTE Paulo Ensaio', email: 'paulo.ensaio@teste.invalid', tel: '00900000002' };
const PESSOA_CORTE = { nome: 'TESTE Carla Ensaio', email: 'carla.ensaio@teste.invalid', tel: '00900000006' };
const PESSOA_B = { nome: 'TESTE Bia Ensaio', email: 'bia.ensaio@teste.invalid', tel: '00900000007' };
const PESSOA_DESMARCADA = { nome: 'TESTE Davi Ensaio', email: 'davi.ensaio@teste.invalid', tel: '00900000008' };
// Pelo Node (casos de erro):
const PESSOA_SEM_CATALOGO = { nome: 'TESTE Sem Catalogo', email: 'sem.catalogo@teste.invalid', telefone: '+55 (00) 90000-0003' };
const PESSOA_SEM_CONSENTIMENTO = { nome: 'TESTE Sem Consentimento', email: 'sem.consentimento@teste.invalid', telefone: '+55 (00) 90000-0004' };
const PESSOA_DUPLA = { nome: 'TESTE Envio Duplo', email: 'envio.duplo@teste.invalid', telefone: '+55 (00) 90000-0005' };
// v10: a pessoa do envio com a origem do endereço antigo, que tem de ser recusado antes do banco
const PESSOA_ORIGEM_ANTIGA = { nome: 'TESTE Origem Antiga', email: 'origem.antiga@teste.invalid', telefone: '+55 (00) 90000-0009' };
// Os dados de antes da migração, gravados pelas portas do v2 (como os do teste de 09/11, prompts/10-prototipo-ligado.md).
// A linha que imita a do Otávio só imita o formato dela (faixa a, nota 86, utm stories, os dois aceites); nada dela é real.
const ANTES = {
  imitaOtavio: { nome: 'TESTE Imita Linha Real', email: 'imita.linha.real@teste.invalid', telefone: '+55 (00) 90000-0011', empresa: '', utm: 'stories', faixa: 'a', nota: 86 },
  ana: { nome: 'TESTE Ana Antes', email: 'ana.antes@teste.invalid', telefone: '+55 (00) 90000-0012', empresa: '=1+1', utm: 'bio', faixa: 'a', nota: 96 },
  bruno: { nome: 'TESTE Bruno Antes', email: 'bruno.antes@teste.invalid', telefone: '+55 (00) 90000-0013', empresa: '', utm: 'stories', faixa: 'eliminatorio', nota: 81 },
  duplo: { nome: 'TESTE Duplo Antes', email: 'duplo.antes@teste.invalid', telefone: '+55 (00) 90000-0014', empresa: '', utm: 'bio', faixa: 'a', nota: 96 }
};
// nada disto pode aparecer nos registros do garçom, do Supabase de mentira e da planilha
const DADO_PESSOAL = /TESTE|teste\.invalid|9000000|90000-00|Marina|Paulo|Carla|Bia |Davi/;

// Respostas do exemplo de base/lead-score.md (v3, mesmos pontos da v2): 96, faixa A. O eliminatório troca o
// faturamento por "Menos de R$ 50 mil" (base/lead-score.md, "Eliminatórios"). As mesmas de testar-quiz-01.js.
const EXEMPLO = {
  ramo: 'Serviços para empresas', faturamento: 'R$ 500 mil a R$ 1,5 milhão', vendedores: '2 ou 3',
  'quem-marca': 'Sim. O vendedor faz tudo', ticket: '10000', origem: 'Indicação de clientes',
  crm: 'Sim, e o time atualiza todo dia', cargo: 'Dono(a) ou sócio(a)',
  numeros: ['200', '50', '50', '40', '2'], causa: 'Em até 1 hora', causa2: '1 ou 2', causa3: 'Alguns'
};
const ELIMINATORIO = Object.assign({}, EXEMPLO, { faturamento: 'Menos de R$ 50 mil' });
// O corte mais restritivo (14.2; quiz-01-pagina v3): faixa c que passa no corte do Júnior. Até a v2 ia para o
// plano; agora vai para o relatório de quem não se qualifica. Nota 24 (a conta está em testar-quiz-01.js, FAIXA_C).
const FAIXA_C = Object.assign({}, EXEMPLO, {
  faturamento: 'R$ 50 mil a R$ 150 mil', ticket: '6000', vendedores: '1', crm: 'Não. Fica no WhatsApp e na cabeça de cada um',
  cargo: 'Vendedor(a)', numeros: ['30', '50', '5', '4', '1']
});
// Faixa B com o funil todo na meta (relatório de funil saudável, que tem o botão "Quero marcar uma conversa"):
// faturamento R$ 150 mil a R$ 500 mil 15 · venda de R$ 10 mil 15 · 2 ou 3 vendedores 10 · 200 leads 10 ·
// CRM "pouca gente atualiza" 7 · vendedor(a) 2 · funil 200 · 50% · 50 · 40 · 10 na meta, dinheiro na mesa zero
// ("menos de 0,5") 3 · tentativas "1 ou 2" 4, sobra "Alguns" 2, primeiro contato "Em até 1 hora" 0 = 68, faixa b.
const FAIXA_B = Object.assign({}, EXEMPLO, {
  faturamento: 'R$ 150 mil a R$ 500 mil', crm: 'Sim, mas pouca gente atualiza', cargo: 'Vendedor(a)',
  numeros: ['200', '50', '50', '40', '10']
});

// v8 (pedido 18, parte 18.3; decisão #118; landing-page-02 v3): a seção "Como funciona" e duas respostas do FAQ.
// Os textos novos são os aprovados pelo Otávio em 13/11/2026 (prompts/18-como-funciona-landing-02.md, "Os textos aprovados"),
// escritos aqui só para conferir a página: quem manda é o pedido. Os antigos são os que a página tinha e não pode mais ter.
// v9 (pedido 20; decisão #119; landing-page-02 v4): três textos daqui mudaram por decisão do Otávio de 13/11/2026 e acompanham:
// o rótulo da Fase 1 (na régua e no cartão 01), a linha da fase do cartão 08 e a resposta de "Quem me atende depois que eu
// assinar?". Valem como estão em prompts/20-gsaas-fora-da-landing.md, "Os textos aprovados". Os de antes estão em LANDING_V4.antigos.
const LANDING_V3 = {
  antigos: ['Mentoria 1:1', 'semanas 3, 7 e 13', '9 entregas', '45 dias', 'gerente de safra', 'Fase 4 · Entrega', 'Semana 12', 'Semanas 6 a 13', 'Semanas 5 a 13'],
  // o título vem em três pedaços no programa: o do meio, "máxima eficácia", é o que fica em verde
  titulo: ['Em 15 dias o sistema está instalado. Nos 90, a gente capacita o seu time a operar com ', 'máxima eficácia', '.'],
  fases: ['Fase 1 · Ponto de partida', 'Fase 2 · Preparo do solo', 'Fase 3 · Colheita', 'Fase 4 · Plantio · em paralelo'],   // v9: era 'Fase 1 · Análise'
  legenda: 'Sessões de Comando com o Junior Neves: duas no começo e uma no fim',
  // número · rótulo da semana · linha da fase · título do cartão (o título não mudou; serve para achar o cartão na página)
  cartoes: [
    ['01', 'Semana 1', 'Fase 1 · Ponto de partida', 'Análise Estratégica das Safras'],   // v9: era 'Fase 1 · Análise'
    ['02', 'Semanas 1 e 2', 'Fase 2 · Preparo do solo', 'Implementação da Infraestrutura'],
    ['03', 'Até o dia 15', 'Fase 2 · Preparo do solo', 'Playbook de Comunicação Persuasiva'],
    ['04', 'Semanas 3 a 13', 'Fase 3 · Colheita', 'Recuperação de Ativos'],
    ['05', 'Até o dia 15', 'Fase 2 · Preparo do solo', 'Painel de Safras'],
    ['06', 'Semanas 3 a 13', 'Fase 4 · Plantio', 'Treinamento para Otimização da Conversão'],
    ['07', 'Semanas 1 e 2', 'Fase 2 · Preparo do solo', 'Playbook da Gestão de Vendas por Safra'],
    ['08', 'Semana 13', 'Encerramento · 3ª Sessão de Comando', 'Relatório de Produtividade']   // v9: era 'Fechamento · 3ª Sessão de Comando'
  ],
  descricao06: 'A parte teórica sai nos primeiros 15 dias. Da semana 3 em diante, call semanal em grupo, com análise das calls do seu time.',
  // o cartão das Sessões de Comando (o antigo 09), sem número; cada linha vem em dois pedaços: a semana, em negrito, e o resto
  sessoes: {
    rotulo: 'Do começo ao fim', nome: 'Junior Neves',
    titulo: 'Sessões de Comando entre o Junior Neves, você e o seu Head Comercial',
    linhas: [['Semana 1', ' · A Análise Estratégica das Safras'], ['Semana 1 ou 2', ' · As mudanças, em aula e tarefa'], ['Semana 13', ' · O fechamento, com o Relatório de Produtividade']]
  },
  controle: 'Arraste para ver as 8 entregas',   // só existe no computador
  faq: [
    ['É mais uma mentoria?', 'Não. São 8 entregas de implementação, dentro da sua operação: CRM, painel, régua de contato e playbooks. O Junior conduz as Sessões de Comando, e o seu time executa.'],
    // v9: a resposta sai sem os nomes de quem conduz a call em grupo (#119)
    ['Quem me atende depois que eu assinar?', 'O Junior, nas três Sessões de Comando com você e o seu Head Comercial: duas no começo e uma no fim. Da semana 3 em diante, o seu time participa da call semanal em grupo e tem um grupo de WhatsApp com a nossa equipe para as dúvidas do dia a dia.']
  ],
  // os dois únicos lugares em que a página pode dizer "mentoria" (#53)
  mentoriaQuePode: ['É mais uma mentoria?', 'não mais um curso ou mentoria']
};
// v9 (pedido 20, parte 20.3; decisão #119; landing-page-02 v4): o GSAAS fora da página, as duas respostas do FAQ, os dois rótulos,
// o carrossel com 9 cartões e a demonstração do produto sem a tela dos agentes de IA. Os textos novos são os aprovados pelo Otávio
// em 13/11/2026 (prompts/20-gsaas-fora-da-landing.md, "Os textos aprovados"), escritos aqui só para conferir a página: quem manda
// é o pedido. Os que saíram e os antigos são os que a página tinha e não pode mais ter.
const LANDING_V4 = {
  // o que saiu com o GSAAS: o cartão do carrossel, a tela dos agentes de IA da demonstração e a menção no FAQ
  gsaas: ['GSAAS', 'Gestão de Safra as a Service', 'Depois dos 90 dias · opcional', 'Do relatório, a próxima safra já começa lida', 'Agentes trabalhando agora', 'Os agentes entram no'],
  // o item do menu e a tela que saíram da demonstração. No programa sobram 7 vezes este nome, em condições que nunca acontecem
  // (pergunta 20.2.6): por isso, no programa, a conferência procura o nome só como texto, como item e como tela.
  agentes: 'Agentes de IA',
  // os textos que o pedido 20 trocou: os dois rótulos e um pedaço de cada resposta antiga do FAQ
  antigos: ['Fase 1 · Análise', 'Fechamento · 3ª Sessão de Comando', 'o Junior e o Euclides conduzem a call semanal em grupo', 'Quem quiser continuar tem'],
  // os dois rótulos novos (são os mesmos textos de LANDING_V3.fases[0] e de LANDING_V3.cartoes[7])
  rotulos: [LANDING_V3.fases[0], LANDING_V3.cartoes[7][2]],
  // as duas respostas do FAQ que o pedido 20 trocou; a primeira é a mesma de LANDING_V3.faq[1]
  faq: [
    LANDING_V3.faq[1],
    ['E depois dos 90 dias?', 'Os playbooks e o treinamento ficam com o seu time. O sistema fica por escrito, para rodar sem a gente.']
  ],
  perguntas: 6,   // as perguntas do FAQ
  cartoes: 9,     // as 8 entregas e o das Sessões de Comando, que é o último; o contador vai de "01 / 09" a "09 / 09"
  // o menu da demonstração do produto, por perfil, na ordem em que aparece. No celular, o menu mostra os itens de quem gere o
  // time também no perfil do vendedor (já era assim; pergunta 20.2.3): lá, o ensaio aceita qualquer uma das duas listas.
  menu: {
    'Para quem gere o time': ['Painel de Safras', 'Onde a safra trava', 'Nunca disseram não', 'Reunião de safra', 'Avaliação de calls'],
    'Para o vendedor': ['Contatos de hoje', 'Relógio do lead', 'Roteiro de cada tentativa', 'Histórico do lead', 'Feedback das calls']
  }
};
// Quantas cópias de cada texto novo o programa tem de ter: [na versão do computador, na do celular, nas definições dos cartões].
// O título, os textos da régua e o controle só existem nas versões da seção; os dos cartões, também nas definições (escura e clara).
function copiasDaLandingV3() {
  const m = new Map(), T = LANDING_V3;
  const soma = (texto, pc, cel, def) => { const k = 'children:"' + texto + '"', a = m.get(k) || [0, 0, 0]; m.set(k, [a[0] + pc, a[1] + cel, a[2] + def]); };
  soma(T.titulo[0], 1, 1, 0); soma(T.titulo[1], 1, 1, 0);
  for (const f of T.fases) soma(f, 1, 1, 0);
  soma(T.legenda, 1, 1, 0);
  for (const [, rotulo, fase] of T.cartoes) { soma(rotulo, 1, 1, 2); soma(fase, 1, 1, 2); }
  soma(T.descricao06, 1, 1, 2);
  soma(T.sessoes.rotulo, 1, 1, 2); soma(T.sessoes.titulo, 1, 1, 2);
  for (const [semana, resto] of T.sessoes.linhas) { soma(semana, 1, 1, 2); soma(resto, 1, 1, 2); }
  soma(T.controle, 1, 0, 0);
  return m;
}
// As duas versões da seção no programa da landing: a do computador vai do começo da função que desenha a régua até o nome da seção;
// a do celular, do começo da função dos cartões do celular até o fim da função da seção. O resto guarda as definições dos cartões.
function versoesDaSecao(js) {
  const REGUA = '"data-name":"Régua dos 90 dias"', CARTAO = '"data-name":"Entrega 01"';
  const segundo = (t) => js.indexOf(t, js.indexOf(t) + 1);
  const pcA = js.lastIndexOf('function ', js.indexOf(REGUA)), pcB = js.indexOf('"data-name":"05 · Os 90 dias (carrossel)"');
  const celA = js.lastIndexOf('function ', segundo(CARTAO)), celB = js.indexOf('function ', js.indexOf('"data-name":"M · 05 · Os 90 dias (carrossel)"'));
  const achou = js.indexOf(REGUA) > 0 && segundo(REGUA) > 0 && segundo(CARTAO) > 0 && pcA > 0 && pcA < js.indexOf(CARTAO) && js.indexOf(CARTAO) < pcB &&
    pcB <= celA && celA < segundo(REGUA) && segundo(REGUA) < celB;
  return achou ? { computador: js.slice(pcA, pcB), celular: js.slice(celA, celB), resto: js.slice(0, pcA) + js.slice(pcB, celA) + js.slice(celB) } : null;
}
const quantas = (texto, pedaco) => texto.split(pedaco).length - 1;

// v10 (pedido 21, parte 21.3; decisão #120): o quiz saiu de /quiz/ e foi para /analise/, e o protótipo ganhou um endereço novo.
// No ensaio, o endereço novo é o local (http://127.0.0.1:porta, a ORIGEM_PERMITIDA da cópia da configuração), e o antigo é um nome
// de mentira, que não existe em lugar nenhum (.invalid): ele entra na cópia da configuração no lugar do endereço do workers.dev,
// e o garçom o reconhece pelo nome que vem no pedido (o cabeçalho Host). Nada sai de 127.0.0.1.
const NOME_ANTIGO = 'endereco-antigo.ensaio.invalid';
const ENDERECO_ANTIGO = 'https://' + NOME_ANTIGO;
// Uma consulta com várias chaves, as cinco utm, o id_sessao, uma chave repetida e valores com caractere codificado (acento, espaço,
// + e &), para conferir que os redirecionamentos levam a consulta inteira, letra por letra
const SESSAO_DO_LINK = 'sessao-ensaio-link-antigo-01';
const CONSULTA = 'utm_source=bio&utm_medium=cpc&utm_campaign=funil-01&utm_content=an%C3%BAncio%201&utm_term=a%2Bb%26c&id_sessao=' + SESSAO_DO_LINK + '&x=1&x=2';
// As cinco utm que a landing passa adiante, com um valor que precisa de codificação
const CINCO_UTM = { utm_source: 'bio', utm_medium: 'cpc', utm_campaign: 'funil-01', utm_content: 'anúncio 1', utm_term: 'a+b&c' };

const COLUNAS_PLANILHA = ['id_pessoa', 'nome', 'telefone', 'email', 'empresa', 'consentimento_whatsapp', 'consentimento_email',
  'lead_score_faixa', 'lead_score_nota', 'respostas_a_confirmar', 'entrou_em', 'tentativas_feitas', 'clique_fim_quiz',
  'estagio', 'estado', 'data_volta', 'canal', 'contato_em', 'reuniao_em', 'produto'];
// v12: a aba respostas da planilha do SDR v3 (funis/funil-01/planilha-sdr.md v3, "Aba respostas")
const COLUNAS_RESPOSTAS = ['id_pessoa', 'nome', 'entrou_em', 'lead_score_faixa', 'lead_score_nota',
  'ramo', 'faturamento', 'vendedores', 'quem marca a conversa', 'valor médio da venda',
  'origem dos leads', 'CRM', 'cargo', 'lembra dos números',
  'leads por mês', 'pré-qualificados', 'agendados', 'conversas realizadas', 'vendas fechadas',
  'chute de comparecimento', 'causa · primeiro contato', 'causa · tentativas', 'causa · lead sem contato',
  'outras respostas'];

const novaSessao = () => 'sessao-ensaio-' + randomBytes(4).toString('hex');

// Pacote montado no Node, no formato de montarPacote() da página v3 (para os casos de erro)
function pacoteDeTeste(pessoa, { whatsapp = 'sim', email = 'sim', sessao = novaSessao() } = {}) {
  const agora = new Date().toISOString();
  return {
    pessoa: {
      nome: pessoa.nome, telefone: pessoa.telefone, email: pessoa.email, empresa: '',
      consentimento_whatsapp: whatsapp, consentimento_email: email,
      consentimento_texto: 'Texto do consentimento do ensaio (mentira).', consentimento_em: agora,
      primeira_utm_source: 'bio', primeira_utm_campaign: 'funil-01'
    },
    evento: {
      tipo: 'fim_quiz', funil: 'funil-01', entrega: 'quiz-01', versao_entrega: 2,
      utm_source: 'bio', utm_campaign: 'funil-01', id_sessao: sessao, ocorrido_em: agora,
      respostas: { faturamento: 'R$ 500 mil a R$ 1,5 milhão' },
      lead_score_nota: 96, lead_score_faixa: 'a', lead_score_versao: 3
    }
  };
}
// Evento sem pessoa, no formato de registrarEvento() das páginas
function eventoDeTeste(tipo, { entrega = tipo === 'visita' ? 'landing-page-02' : 'quiz-01', versao = tipo === 'visita' ? 1 : 2, sessao = novaSessao(), extra = {} } = {}) {
  return { evento: Object.assign({ tipo, funil: 'funil-01', entrega, versao_entrega: versao, utm_source: 'bio', utm_campaign: 'funil-01',
    id_sessao: sessao, ocorrido_em: new Date().toISOString() }, extra) };
}
// Pacote do jeito do garçom v3 e da página v2 (antes da migração): quiz-01 versão 1, lead score versão 2
function pacoteDeAntes(p, sessao) {
  const agora = new Date().toISOString();
  return {
    pessoa: {
      nome: p.nome, telefone: p.telefone, email: p.email, empresa: p.empresa,
      consentimento_whatsapp: 'sim', consentimento_email: 'sim',
      consentimento_texto: 'Texto do consentimento de antes (mentira).', consentimento_em: agora,
      primeira_utm_source: p.utm, primeira_utm_campaign: 'funil-01'
    },
    evento: {
      tipo: 'fim_quiz', funil: 'funil-01', entrega: 'quiz-01', versao_entrega: 1,
      utm_source: p.utm, utm_campaign: 'funil-01', id_sessao: sessao, ocorrido_em: agora,
      respostas: { faturamento: 'R$ 500 mil a R$ 1,5 milhão' },
      lead_score_nota: p.nota, lead_score_faixa: p.faixa, lead_score_versao: 2
    }
  };
}

function portaLivre() {
  return new Promise((ok, falha) => {
    const s = net.createServer();
    s.once('error', falha);
    s.listen(0, '127.0.0.1', () => { const p = s.address().port; s.close(() => ok(p)); });
  });
}
const esperar = (ms) => new Promise(ok => setTimeout(ok, ms));
// v10: o wrangler do ensaio nunca recebe credencial da Cloudflare, mesmo que o ambiente tenha uma (o token de publicar pela nuvem):
// ele só roda o `dev --local`, que não precisa de conta. Os valores não são lidos nem mostrados; as variáveis só deixam de passar.
function semCredencialDaCloudflare(ambiente) {
  const limpo = { ...ambiente };
  for (const nome of Object.keys(limpo)) if (/^(CLOUDFLARE|CF)_(API_TOKEN|API_KEY|EMAIL|ACCOUNT_ID)$/.test(nome)) delete limpo[nome];
  return limpo;
}

async function principal() {
  const inicio = Date.now();
  console.log('Ensaio geral do protótipo do funil-01 · ' + new Date().toISOString());
  console.log('Só 127.0.0.1, só valores de mentira, só leads de teste (#102).');

  // ═══ 1. Banco v2, como está no Supabase ═══
  secao('1. Banco v2 (PGlite) como está no Supabase, com os papéis de mentira e dados de antes');
  const db = new PGlite();
  limpezas.push(() => db.close());
  const fila = criarFila();
  const naFila = (f) => fila(f);
  await db.exec(`set time zone 'UTC'`);
  // Os papéis do Supabase, de mentira. "dono" faz o papel do postgres do Supabase, que é dono das
  // tabelas mas não é superusuário. service_role passa por cima da RLS, como no Supabase.
  // As permissões padrão abaixo imitam o pior caso do Supabase (tudo dado a anon, authenticated e
  // service_role no que o dono criar), para conferir que o esquema e a migração tiram tudo sozinhos (#99).
  await db.exec(`
    create role anon nologin noinherit;
    create role authenticated nologin noinherit;
    create role service_role nologin noinherit bypassrls;
    create role outro_papel nologin noinherit;
    create role dono nologin;
    grant usage on schema public to anon, authenticated, service_role, outro_papel;
    grant usage, create on schema public to dono;
    alter default privileges for role dono in schema public grant all on tables to anon, authenticated, service_role;
    alter default privileges for role dono in schema public grant all on sequences to anon, authenticated, service_role;
    alter default privileges for role dono in schema public grant all on functions to anon, authenticated, service_role;
  `);
  const versao = (await db.query('select pg_catalog.version() as v')).rows[0].v.split(' on ')[0];
  informar('PGlite no ar (' + versao + '), papéis anon, authenticated, service_role e dono criados');

  const comoDono = async (sql) => naFila(async () => {
    await db.exec('set role dono');
    try { return await db.exec(sql); } finally { await db.exec('reset role'); }
  });
  const ESQUEMA = readFileSync(join(RAIZ, 'dados/banco/esquema.sql'), 'utf8');
  const MIGRACAO = readFileSync(join(RAIZ, 'dados/banco/migracoes/001-v3.sql'), 'utf8');
  const MIGRACAO_002 = readFileSync(join(RAIZ, 'dados/banco/migracoes/002-respostas-na-planilha.sql'), 'utf8');
  const MIGRACAO_003 = readFileSync(join(RAIZ, 'dados/banco/migracoes/003-origem-e-ids.sql'), 'utf8');
  const CONFERIR = readFileSync(join(RAIZ, 'dados/banco/conferir.sql'), 'utf8');
  const CATALOGO = readFileSync(join(RAIZ, 'dados/banco/catalogo-prototipo.sql'), 'utf8');

  for (const vez of ['primeira', 'segunda']) {
    let erro = null;
    try { await comoDono(ESQUEMA); } catch (e) { erro = e; }
    conferir(!erro, 'esquema.sql (v2) aplicado pelo dono, ' + vez + ' vez, sem erro' + (erro ? ' (' + erro.message + ')' : ''));
  }

  const linhasDoConferir = async () => { const s = await comoDono(CONFERIR); return s[s.length - 1].rows; };
  async function rodarConferir(rotulo) {
    const linhas = await linhasDoConferir();
    for (const l of linhas.filter(l => l.n !== 99)) {
      if (!l.ok) conferir(false, rotulo + ' · conferir.sql ' + l.n + ' (' + l.conferencia + '): encontrado ' + l.encontrado);
    }
    const final = linhas.find(l => l.n === 99);
    conferir(final && final.ok === true && final.encontrado === '20 de 20',
      rotulo + ' · conferir.sql: linha "tudo certo" = ' + (final && final.ok) + ' (' + (final && final.encontrado) + ')');
  }
  {
    // Num banco só v2, o conferir.sql v3 tem de avisar que faltam as migrações (dados/banco/README.md, "Como conferir")
    const linhas = await linhasDoConferir();
    const falsas = linhas.filter(l => l.n !== 99 && !l.ok).map(l => l.n);
    const final = linhas.find(l => l.n === 99);
    conferir(final && final.ok === false && final.encontrado === '11 de 20' && JSON.stringify(falsas) === JSON.stringify([4, 8, 14, 15, 16, 17, 18, 19, 20]),
      'antes das migrações · conferir.sql avisa que faltam as migrações: false nas linhas ' + falsas.join(', ') + ' (' + (final && final.encontrado) + ')');
  }

  // A linha do catálogo que o banco do protótipo já tem (catalogo-prototipo.sql v1, rodado em 09/11)
  await comoDono(`insert into public.entregas (id_entrega, versao, tipo_entrega, funil, caminho_no_repositorio, publicada_em)
    values ('quiz-01', 1, 'quiz', 'funil-01', 'entregas/quizzes/quiz-01/pagina/', pg_catalog.now() - interval '6 hours')
    on conflict (id_entrega, versao) do nothing`);
  const dataDaLinhaAntiga = (await naFila(() => db.query(`select publicada_em::text as d from public.entregas where id_entrega = 'quiz-01' and versao = 1`))).rows[0].d;

  // Permissões de verdade, trocando de papel
  const comoPapel = (papel, sql, params = []) => naFila(() => db.transaction(async (tx) => {
    await tx.exec('set local role ' + papel);
    return tx.query(sql, params);
  }));
  const codigoComo = async (papel, sql, params) => {
    try { await comoPapel(papel, sql, params); return 'ok'; } catch (e) { return e.code || 'sem codigo'; }
  };

  // Dados de antes, pela porta do v2 (registrar_fim_quiz com a chave publicável), como os do teste de 09/11
  const gravarAntes = (p, sessao) => codigoComo('anon', 'select public.registrar_fim_quiz($1::jsonb)', [JSON.stringify(pacoteDeAntes(p, sessao))]);
  const gravados = [
    await gravarAntes(ANTES.imitaOtavio, 'sessao-antes-1'), await gravarAntes(ANTES.ana, 'sessao-antes-2'),
    await gravarAntes(ANTES.bruno, 'sessao-antes-3'), await gravarAntes(ANTES.duplo, 'sessao-antes-4'), await gravarAntes(ANTES.duplo, 'sessao-antes-5')
  ];
  // Eles foram gravados de manhã: o gravado_em volta 6 horas, como o superusuário do PGlite, com os gatilhos
  // desligados só nesta sessão (o mesmo contorno da seção 7; ver README.md, "O contorno da margem de 1 minuto").
  await naFila(async () => {
    await db.exec(`set session_replication_role = replica`);
    try { await db.query(`update public.eventos set gravado_em = gravado_em - interval '6 hours', ocorrido_em = ocorrido_em - interval '6 hours'`); }
    finally { await db.exec(`set session_replication_role = origin`); }
  });
  const contar = async (sql, params = []) => Number((await naFila(() => db.query(sql, params))).rows[0].n);
  conferir(gravados.every(g => g === 'ok') && await contar(`select count(*) as n from public.pessoas`) === 4 && await contar(`select count(*) as n from public.eventos`) === 5,
    'dados de antes pelo v2: 4 pessoas e 5 fins de quiz de teste (uma linha que imita a do Otávio, faixa a, nota 86, stories; uma faixa a com empresa "=1+1"; um eliminatório; uma pessoa com dois envios)');

  // ═══ 2. Migração 001 duas vezes ═══
  secao('2. Migração 001 (v3) duas vezes sobre os dados de antes');
  // fotografia dos dados: cada linha das tabelas com dado, em ordem fixa (como em dados/banco/testar-migracao.mjs)
  const fotografia = async () => (await naFila(() => db.query(`
    select (select count(*) from public.pessoas) as pessoas, (select count(*) from public.eventos) as eventos,
           (select md5(coalesce(string_agg(to_jsonb(p)::text, '|' order by p.id_pessoa), '')) from public.pessoas p) as h_pessoas,
           (select md5(coalesce(string_agg((to_jsonb(e) - 'clique_fim_quiz' - 'utm_medium' - 'utm_content' - 'utm_term' - 'fbclid' - 'fbp' - 'fbc' - 'id_lead' - 'id_qualificado' - 'qualificado')::text, '|' order by e.id_evento), '')) from public.eventos e) as h_eventos,
           (select md5(coalesce(string_agg(to_jsonb(x)::text, '|' order by x.id_entrega, x.versao), '')) from public.entregas x) as h_entregas`))).rows[0];
  // fotografia do esquema: restrições, colunas, funções e permissões
  const esquemaAtual = async () => (await naFila(() => db.query(`
    select md5(concat_ws('#',
      (select string_agg(conname || '=' || pg_get_constraintdef(oid) || convalidated, '|' order by conname) from pg_constraint where connamespace = 'public'::regnamespace),
      (select string_agg(attrelid::regclass::text || '.' || attname || ':' || format_type(atttypid, atttypmod), '|' order by attrelid::regclass::text, attnum)
         from pg_attribute where attrelid in (select oid from pg_class where relnamespace = 'public'::regnamespace) and attnum > 0 and not attisdropped),
      (select string_agg(proname || '(' || pg_get_function_identity_arguments(oid) || ')' || md5(prosrc) || coalesce(proacl::text, 'padrao') || prosecdef || coalesce(array_to_string(proconfig, ','), ''), '|' order by proname)
         from pg_proc where pronamespace = 'public'::regnamespace),
      (select string_agg(relname || coalesce(relacl::text, 'padrao') || relrowsecurity, '|' order by relname) from pg_class where relnamespace = 'public'::regnamespace)
    )) as h`))).rows[0].h;
  const antesDaMigracao = await fotografia();
  let esquemaDaPrimeira = null;
  for (const vez of ['primeira', 'segunda']) {
    let erro = null;
    try { await comoDono(MIGRACAO); } catch (e) { erro = e; }
    conferir(!erro, 'migracoes/001-v3.sql aplicada pelo dono, ' + vez + ' vez, sem erro' + (erro ? ' (' + erro.message + ')' : ''));
    const depois = await fotografia();
    conferir(JSON.stringify(depois) === JSON.stringify(antesDaMigracao),
      vez + ' vez: os dados de antes não mudaram (' + depois.pessoas + ' pessoas e ' + depois.eventos + ' eventos, cada linha igual)');
    const h = await esquemaAtual();
    if (vez === 'primeira') esquemaDaPrimeira = h;
    else conferir(h === esquemaDaPrimeira, 'segunda vez: restrições, colunas, funções e permissões iguais às da primeira');
  }
  conferir(await contar(`select count(*) as n from public.eventos where clique_fim_quiz is not null`) === 0, 'clique_fim_quiz nasceu vazio nos eventos de antes');
  {
    // v12: entre a 001 e a 002, o conferir.sql v3 avisa só na linha 19 (falta a 002)
    const linhas = await linhasDoConferir();
    const falsas = linhas.filter(l => l.n !== 99 && !l.ok).map(l => l.n);
    const final = linhas.find(l => l.n === 99);
    conferir(final && final.encontrado === '18 de 20' && JSON.stringify(falsas) === '[19,20]',
      'depois da 001 e antes da 002 · conferir.sql avisa só nas linhas 19 e 20 (' + (final && final.encontrado) + ')');
  }
  // v12: a migração 002 (as respostas completas na função da planilha) duas vezes, sobre os mesmos dados
  let esquemaDa002 = null;
  for (const vez of ['primeira', 'segunda']) {
    let erro = null;
    try { await comoDono(MIGRACAO_002); } catch (e) { erro = e; }
    conferir(!erro, 'migracoes/002-respostas-na-planilha.sql aplicada pelo dono, ' + vez + ' vez, sem erro' + (erro ? ' (' + erro.message + ')' : ''));
    const depois = await fotografia();
    conferir(JSON.stringify(depois) === JSON.stringify(antesDaMigracao),
      'migração 002, ' + vez + ' vez: os dados de antes não mudaram (' + depois.pessoas + ' pessoas e ' + depois.eventos + ' eventos, cada linha igual)');
    const h = await esquemaAtual();
    if (vez === 'primeira') esquemaDa002 = h;
    else conferir(h === esquemaDa002, 'migração 002, segunda vez: restrições, colunas, funções e permissões iguais às da primeira');
  }
  // v13 (#121): a migração 003 (a origem e os ids do lead) duas vezes, sobre os mesmos dados
  let esquemaDa003 = null;
  for (const vez of ['primeira', 'segunda']) {
    let erro = null;
    try { await comoDono(MIGRACAO_003); } catch (e) { erro = e; }
    conferir(!erro, 'migracoes/003-origem-e-ids.sql aplicada pelo dono, ' + vez + ' vez, sem erro' + (erro ? ' (' + erro.message + ')' : ''));
    const depois = await fotografia();
    conferir(JSON.stringify(depois) === JSON.stringify(antesDaMigracao),
      'migração 003, ' + vez + ' vez: os dados de antes não mudaram (' + depois.pessoas + ' pessoas e ' + depois.eventos + ' eventos, cada linha igual)');
    const h = await esquemaAtual();
    if (vez === 'primeira') esquemaDa003 = h;
    else conferir(h === esquemaDa003, 'migração 003, segunda vez: restrições, colunas, funções e permissões iguais às da primeira');
  }
  fotografiaDeAntesInicial = await fotografiaDeAntes(naFila, db);
  await rodarConferir('depois das migrações');

  const TABELAS = ['entregas', 'pessoas', 'eventos', 'investimento'];
  const VISOES = ['painel_numeros', 'contagem_analises_gratuitas'];
  const REGISTRAR = `select public.registrar_fim_quiz('{}'::jsonb)`;
  const EVENTO = `select public.registrar_evento('{}'::jsonb)`;
  const LEADS = `select * from public.leads_para_planilha()`;

  let c = await codigoComo('anon', REGISTRAR);
  conferir(c === '22023', 'anon executa registrar_fim_quiz (passa da permissão e para na conferência do pacote: ' + c + ')');
  c = await codigoComo('anon', EVENTO);
  conferir(c === '22023', 'anon executa registrar_evento, a porta nova (passa da permissão e para na conferência do pacote: ' + c + ')');
  for (const t of [...TABELAS, ...VISOES]) {
    c = await codigoComo('anon', `select * from public.${t} limit 1`);
    conferir(c === '42501', 'anon não lê ' + (VISOES.includes(t) ? 'a visão ' : 'a tabela ') + t + ' (' + c + ')');
  }
  c = await codigoComo('anon', `insert into public.pessoas (nome) values ('x')`);
  conferir(c === '42501', 'anon não grava direto na tabela pessoas (' + c + ')');
  c = await codigoComo('anon', `insert into public.eventos (tipo) values ('visita')`);
  conferir(c === '42501', 'anon não grava direto na tabela eventos (' + c + ')');
  c = await codigoComo('anon', LEADS);
  conferir(c === '42501', 'anon não chama leads_para_planilha (' + c + ')');
  c = await codigoComo('anon', `select public.eventos_imutaveis()`);
  conferir(c === '42501', 'anon não chama a função da trava (' + c + ')');
  for (const [sql, rotulo] of [[REGISTRAR, 'registrar_fim_quiz'], [EVENTO, 'registrar_evento'], [LEADS, 'leads_para_planilha'], [`select * from public.pessoas limit 1`, 'a tabela pessoas'], [`select * from public.painel_numeros limit 1`, 'a visão painel_numeros']]) {
    c = await codigoComo('authenticated', sql);
    conferir(c === '42501', 'authenticated não pode ' + rotulo + ' (' + c + ')');
  }
  c = await codigoComo('service_role', LEADS);
  conferir(c === 'ok', 'service_role chama leads_para_planilha (' + c + ')');
  for (const [sql, rotulo] of [[REGISTRAR, 'executar registrar_fim_quiz'], [EVENTO, 'executar registrar_evento'], [`select * from public.pessoas limit 1`, 'ler a tabela pessoas'], [`select * from public.eventos limit 1`, 'ler a tabela eventos'], [`select * from public.painel_numeros limit 1`, 'ler a visão painel_numeros']]) {
    c = await codigoComo('service_role', sql);
    conferir(c === '42501', 'service_role não pode ' + rotulo + ' (' + c + ')');
  }
  for (const [sql, rotulo] of [[REGISTRAR, 'registrar_fim_quiz'], [EVENTO, 'registrar_evento']]) {
    c = await codigoComo('outro_papel', sql);
    conferir(c === '42501', 'um papel qualquer, sem permissão dada (PUBLIC), não executa ' + rotulo + ' (' + c + ')');
  }

  // ═══ 3. Supabase de mentira ═══
  secao('3. Supabase de mentira em 127.0.0.1');
  const supabase = criarSupabaseDeMentira({ db, fila, chaves: { [CHAVE_PUBLICAVEL]: 'anon', [CHAVE_SECRETA]: 'service_role' } });
  const portaSupabase = await supabase.abrir();
  limpezas.push(() => supabase.fechar());
  const URL_SUPABASE = 'http://127.0.0.1:' + portaSupabase;
  informar('Supabase de mentira no ar em ' + URL_SUPABASE.replace(/:\d+$/, ':(porta livre)'));
  const direto = async (caminho, { chave, metodo = 'POST', corpo } = {}) => {
    const cab = { 'Content-Type': 'application/json', 'X-Ensaio': 'direto' };
    if (chave) cab.apikey = chave;
    const r = await fetch(URL_SUPABASE + caminho, { method: metodo, headers: cab, body: corpo === undefined ? undefined : JSON.stringify(corpo) });
    const texto = await r.text();
    return { status: r.status, texto };
  };
  let r = await direto('/rest/v1/rpc/leads_para_planilha', { corpo: {} });
  conferir(r.status === 401, 'sem apikey: 401 (' + r.status + ')');
  r = await direto('/rest/v1/rpc/leads_para_planilha', { chave: mentira('desconhecida'), corpo: {} });
  conferir(r.status === 401, 'chave desconhecida: 401 (' + r.status + ')');
  r = await direto('/rest/v1/rpc/leads_para_planilha', { chave: CHAVE_SECRETA, corpo: {} });
  let lidos = [];
  try { lidos = JSON.parse(r.texto); } catch { /* fica vazio */ }
  conferir(r.status === 200 && lidos.length === 3 && lidos.every(l => 'clique_fim_quiz' in l && l.respostas && typeof l.respostas === 'object'),
    'chave secreta (service_role) chama leads_para_planilha v4: 200, os 3 leads de antes nas faixas a e b, com o campo do clique e as respostas completas (002) (' + r.status + ', ' + lidos.length + ')');
  r = await direto('/rest/v1/rpc/funcao_que_nao_existe', { chave: CHAVE_SECRETA, corpo: {} });
  conferir(r.status === 404, 'função que não existe: 404 (' + r.status + ')');

  // ═══ 4. Site montado e garçom ═══
  secao('4. Site montado e garçom rodando localmente');
  let montou = true, saidaMontador = '';
  try { saidaMontador = execFileSync(process.execPath, [join(PROTOTIPO, 'montar-site.mjs')], { cwd: RAIZ, stdio: 'pipe' }).toString(); } catch { montou = false; }
  conferir(montou && existsSync(join(SITE, 'analise/index.html')) && /nenhuma página pede arquivo a outro endereço/.test(saidaMontador),
    'montar-site.mjs: site montado em entregas/prototipo-funil-01/site/ (fora do Git), sem nenhuma página pedindo arquivo a outro endereço');
  const LISTA_FONTES = JSON.parse(readFileSync(join(RAIZ, 'nucleo/ferramentas/fontes/fontes.json'), 'utf8'));
  const arquivosDeFonte = [...LISTA_FONTES.quiz.map(f => 'analise/fontes/' + f.arquivo), ...LISTA_FONTES['landing-02'].map(f => 'fontes/' + f.arquivo)];
  conferir(arquivosDeFonte.every(a => existsSync(join(SITE, a))), 'as fontes estão no site montado, ao lado das páginas (' + arquivosDeFonte.length + ' arquivos; 10.7)');

  const temp = mkdtempSync(join(tmpdir(), 'ensaio-safra-'));
  limpezas.push(() => rmSync(temp, { recursive: true, force: true }));
  const portaGarcom = await portaLivre();
  const BASE = 'http://127.0.0.1:' + portaGarcom;
  const saidaGarcom = [];
  const registroDeRede = join(temp, 'rede-de-fora.txt');
  let modo = SEM_WRANGLER ? 'node' : 'wrangler';

  // A configuração do protótipo, como está no repositório. O endereço antigo de verdade só é lido daqui para servir de valor do
  // cabeçalho Origin na seção 12 (a origem que uma aba antiga mandaria); nenhum pedido é feito a ele.
  const original = readFileSync(join(PROTOTIPO, 'wrangler.toml'), 'utf8');
  const ORIGEM_ANTIGA_DE_VERDADE = (original.match(/^ENDERECO_ANTIGO = "(https:\/\/[^"\/]+)"$/m) || [])[1] || '';
  if (modo === 'wrangler') {
    // A configuração do protótipo, copiada para a pasta temporária, com seis mudanças: os caminhos ficam absolutos (main e assets),
    // as duas variáveis comuns apontam para cá e, desde a v10 (#120), a ENDERECO_ANTIGO vira o endereço de mentira do ensaio e o
    // bloco do Custom Domain sai. Com o bloco [[routes]], o wrangler dev entrega ao garçom sempre o nome da rota, qualquer que
    // seja o nome pedido, e troca o Origin da página local por esse nome: os envios do navegador dariam 403, e o endereço antigo
    // não daria para ensaiar (entregas/garcom/README.md, "Como testar o endereço antigo no wrangler dev local").
    const trocas = [
      [/^main = "\.\.\/garcom\/garcom\.mjs"$/m, 'main = ' + JSON.stringify(join(RAIZ, 'entregas/garcom/garcom.mjs'))],
      [/^directory = "\.\/site"$/m, 'directory = ' + JSON.stringify(SITE)],
      [/^SUPABASE_URL = ".*"$/m, 'SUPABASE_URL = ' + JSON.stringify(URL_SUPABASE)],
      [/^ORIGEM_PERMITIDA = ".*"$/m, 'ORIGEM_PERMITIDA = ' + JSON.stringify(BASE)],
      [/^ENDERECO_ANTIGO = ".*"$/m, 'ENDERECO_ANTIGO = ' + JSON.stringify(ENDERECO_ANTIGO)],
      [/^\[\[routes\]\]\npattern = "[^"\n]*"\ncustom_domain = true\n/m, '']
    ];
    let config = original, trocou = 0;
    for (const [de, para] of trocas) if (de.test(config)) { config = config.replace(de, para); trocou++; }
    const semComentario = config.replace(/^#.*$/gm, '');
    const semEnderecoReal = !/supabase\.co|workers\.dev|gotriad/.test(semComentario) && !/^\s*\[\[?routes?\]?\]|^\s*routes?\s*=|custom_domain/m.test(semComentario);
    conferir(trocou === 6 && semEnderecoReal && !!ORIGEM_ANTIGA_DE_VERDADE, 'configuração temporária fora do repositório: só main, assets, SUPABASE_URL, ORIGEM_PERMITIDA e ENDERECO_ANTIGO trocados e o bloco do Custom Domain tirado (v10); nenhum endereço real e nenhuma rota');
    writeFileSync(join(temp, 'wrangler.toml'), config);
    // Os três segredos, de mentira, num arquivo da pasta temporária (nunca no repositório)
    writeFileSync(join(temp, 'segredos-de-mentira.env'),
      'SUPABASE_CHAVE_PUBLICAVEL=' + CHAVE_PUBLICAVEL + '\nSUPABASE_CHAVE_SECRETA=' + CHAVE_SECRETA + '\nCHAVE_PLANILHA=' + CHAVE_PLANILHA + '\n');
    if (!(trocou === 6 && semEnderecoReal)) throw new Error('configuração temporária fora do esperado; o wrangler não foi ligado');

    // A trava de rede (rede-so-local.cjs), copiada para a pasta temporária (sem espaço no caminho, para o NODE_OPTIONS):
    // todo pedido do wrangler para fora da máquina é recusado e anotado. E os quatro avisos que o wrangler entende para
    // não procurar versão nova, não mandar métricas e não buscar o cf.json da Cloudflare.
    copyFileSync(join(AQUI, 'rede-so-local.cjs'), join(temp, 'rede-so-local.cjs'));
    writeFileSync(registroDeRede, '');
    const proc = spawn(WRANGLER, ['dev', '--local', '--config', join(temp, 'wrangler.toml'),
      '--ip', '127.0.0.1', '--port', String(portaGarcom), '--inspector-port', String(await portaLivre()),
      '--persist-to', join(temp, 'estado'), '--env-file', join(temp, 'segredos-de-mentira.env'),
      '--show-interactive-dev-session=false', '--log-level', 'log'], {
      cwd: temp, detached: true, stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...semCredencialDaCloudflare(process.env), WRANGLER_SEND_METRICS: 'false', DO_NOT_TRACK: '1', WRANGLER_HIDE_BANNER: 'true', CLOUDFLARE_CF_FETCH_ENABLED: 'false',
        WRANGLER_LOG_PATH: join(temp, 'registros'), NO_COLOR: '1', CI: '1',
        NODE_OPTIONS: ((process.env.NODE_OPTIONS || '') + ' --require ' + join(temp, 'rede-so-local.cjs')).trim(), ENSAIO_REDE_REGISTRO: registroDeRede }
    });
    let saiu = false;
    proc.on('exit', () => { saiu = true; });
    proc.stdout.on('data', d => saidaGarcom.push(String(d)));
    proc.stderr.on('data', d => saidaGarcom.push(String(d)));
    limpezas.push(async () => {
      if (saiu) return;
      try { process.kill(-proc.pid, 'SIGTERM'); } catch { /* já saiu */ }
      for (let i = 0; i < 50 && !saiu; i++) await esperar(100);
      if (!saiu) { try { process.kill(-proc.pid, 'SIGKILL'); } catch { /* já saiu */ } }
    });
    let pronto = false;
    for (let i = 0; i < 120 && !saiu && !pronto; i++) {
      try { pronto = (await fetch(BASE + '/', { signal: AbortSignal.timeout(1000) })).status === 200; } catch { await esperar(500); }
    }
    conferir(pronto, 'wrangler dev --local no ar (workerd), sem login, com os segredos de mentira por arquivo temporário');
    if (!pronto) {
      console.log('  O wrangler dev não subiu; o ensaio segue com o contorno (garçom num servidor Node).');
      try { process.kill(-proc.pid, 'SIGKILL'); } catch { /* já saiu */ }
      modo = 'node';
    }
  }
  if (modo === 'node') {
    // Contorno: o handler do garçom num servidor Node, com um ASSETS que lê a pasta montada.
    const garcom = (await import(pathToFileURL(join(RAIZ, 'entregas/garcom/garcom.mjs')).href)).default;
    // Sem charset, como a Cloudflare entrega (pedido 09): quem acrescenta é o garçom
    const TIPOS = { '.html': 'text/html', '.css': 'text/css', '.jpg': 'image/jpeg', '.woff2': 'font/woff2', '.txt': 'text/plain' };
    const ASSETS = {
      fetch: async (req) => {
        let caminho = decodeURIComponent(new URL(req.url).pathname);
        if (caminho.endsWith('/')) caminho += 'index.html';
        const arq = normalize(join(SITE, caminho));
        if (!arq.startsWith(SITE + '/') || !existsSync(arq) || statSync(arq).isDirectory()) return new Response('nao encontrado', { status: 404 });
        return new Response(readFileSync(arq), { status: 200, headers: { 'Content-Type': TIPOS[extname(arq)] || 'application/octet-stream' } });
      }
    };
    // v10: o contorno passa a ENDERECO_ANTIGO de mentira e monta o pedido com o nome que veio no cabeçalho Host, como o workerd
    const env = { ASSETS, SUPABASE_URL: URL_SUPABASE, ORIGEM_PERMITIDA: BASE, ENDERECO_ANTIGO,
      SUPABASE_CHAVE_PUBLICAVEL: CHAVE_PUBLICAVEL, SUPABASE_CHAVE_SECRETA: CHAVE_SECRETA, CHAVE_PLANILHA: CHAVE_PLANILHA };
    const logOriginal = console.log;
    const srv = http.createServer(async (req, res) => {
      const partes = [];
      for await (const p of req) partes.push(p);
      const corpo = partes.length ? Buffer.concat(partes) : undefined;
      const pedido = new Request('http://' + (req.headers.host || '127.0.0.1:' + portaGarcom) + req.url, { method: req.method, headers: req.headers, body: ['GET', 'HEAD'].includes(req.method) ? undefined : corpo });
      console.log = (...a) => saidaGarcom.push(a.join(' ') + '\n');
      let resposta;
      try { resposta = await garcom.fetch(pedido, env); } finally { console.log = logOriginal; }
      res.writeHead(resposta.status, Object.fromEntries(resposta.headers));
      res.end(Buffer.from(await resposta.arrayBuffer()));
    });
    await new Promise(ok => srv.listen(portaGarcom, '127.0.0.1', ok));
    limpezas.push(() => new Promise(ok => { srv.closeAllConnections?.(); srv.close(() => ok()); }));
    informar('contorno: garçom num servidor Node com ASSETS lendo a pasta montada');
  }
  console.log('  modo do garçom: ' + (modo === 'wrangler' ? 'wrangler dev --local' : 'servidor Node (contorno)'));
  if (modo === 'wrangler') {
    // Avisos do wrangler (por exemplo, compatibility_date mais nova que o workerd local), sem caminho de pasta
    const avisos = saidaGarcom.join('').split('\n').filter(l => /WARNING|▲/.test(l)).map(l => l.replace(/\/[^\s"]+/g, '(caminho)').trim());
    console.log('  avisos do wrangler: ' + (avisos.length ? avisos.join(' | ') : 'nenhum'));
  }

  for (const [caminho, rotulo] of [['/', 'landing-page-02'], ['/analise/', 'quiz']]) {
    const x = await fetch(BASE + caminho);
    const html = await x.text();
    conferir(x.status === 200 && x.headers.get('x-robots-tag') === 'noindex' && /<meta\s+name="robots"[^>]*noindex/.test(html),
      'GET ' + caminho + ' (' + rotulo + '): 200, X-Robots-Tag noindex e meta noindex (' + x.status + ')');
    // pedido 09: o cabeçalho com charset e, de reserva, a meta charset nos primeiros 1024 bytes
    const tipo = x.headers.get('content-type') || '';
    const inicio1024 = Buffer.from(html, 'utf8').subarray(0, 1024).toString('utf8');
    conferir(/^text\/html\s*;.*charset=utf-8/i.test(tipo) && /<meta\s+charset=["']?utf-8/i.test(inicio1024),
      'GET ' + caminho + ' (' + rotulo + '): Content-Type com charset utf-8 (' + tipo + ') e meta charset nos primeiros 1024 bytes');
  }
  // O estilo e o programa da landing-page-02, pelo nome que o index.html dela cita (v4)
  const indexDaLanding = readFileSync(join(SITE, 'index.html'), 'utf8');
  const estiloDaLanding = (indexDaLanding.match(/href="(\/assets\/[^"]+\.css)"/) || [])[1] || '/assets/sem-estilo.css';
  const programaDaLanding = (indexDaLanding.match(/src="(\/assets\/[^"]+\.js)"/) || [])[1] || '/assets/sem-programa.js';
  for (const [caminho, tipoCerto] of [[estiloDaLanding, /^text\/css\s*;.*charset=utf-8/i], [programaDaLanding, /^(text|application)\/javascript\s*;.*charset=utf-8/i]]) {
    const x = await fetch(BASE + caminho);
    await x.arrayBuffer();
    const tipo = x.headers.get('content-type') || '';
    conferir(x.status === 200 && tipoCerto.test(tipo), 'GET ' + caminho + ': Content-Type com charset utf-8 (' + tipo + ')');
  }
  let x = await fetch(BASE + '/api/nao-existe');
  conferir(x.status === 404 && x.headers.get('x-robots-tag') === 'noindex', 'GET /api/nao-existe: 404 com noindex (' + x.status + ')');
  x = await fetch(BASE + '/api/evento', { method: 'OPTIONS', headers: { Origin: BASE } });
  await x.arrayBuffer();
  conferir(x.status === 405 && !x.headers.get('access-control-allow-origin'), 'OPTIONS /api/evento: 405 sem cabeçalho de CORS (22.2; ' + x.status + ')');

  // ═══ 5. Catálogo ═══
  secao('5. Catálogo de entregas v3 (perguntas 23.10, 32.4 e 34.4; landing-page-02)');
  const postFimQuiz = (pacote, origem = BASE) => fetch(BASE + '/api/fim-quiz', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origem }, body: JSON.stringify(pacote)
  });
  const postEvento = (pacote, origem = BASE) => fetch(BASE + '/api/evento', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Origin: origem }, body: JSON.stringify(pacote)
  });
  const ultimaDoBanco = () => supabase.registro[supabase.registro.length - 1];
  const pessoasDeAntes = await contar(`select count(*) as n from public.pessoas`);
  const eventosDeAntes = await contar(`select count(*) as n from public.eventos`);
  x = await postFimQuiz(pacoteDeTeste(PESSOA_SEM_CATALOGO));
  let u = ultimaDoBanco();
  conferir(x.status === 422 && u.rota === '/rest/v1/rpc/registrar_fim_quiz' && u.status === 409,
    'sem a linha (quiz-01, 2), o fim do quiz da página nova é recusado pela chave estrangeira (409) e o garçom responde ' + x.status);
  x = await postEvento(eventoDeTeste('visita'));
  u = ultimaDoBanco();
  conferir(x.status === 422 && u.rota === '/rest/v1/rpc/registrar_evento' && u.status === 409,
    'sem a linha (landing-page-02, 1), a visita é recusada (409 no banco, ' + x.status + ' no garçom)');
  x = await postEvento(eventoDeTeste('inicio_quiz'));
  u = ultimaDoBanco();
  conferir(x.status === 422 && u.rota === '/rest/v1/rpc/registrar_evento' && u.status === 409,
    'sem a linha (quiz-01, 2), o início do quiz é recusado (409 no banco, ' + x.status + ' no garçom)');
  conferir(await contar(`select count(*) as n from public.pessoas`) === pessoasDeAntes && await contar(`select count(*) as n from public.eventos`) === eventosDeAntes,
    'e nada novo ficou no banco');
  x = await postFimQuiz(pacoteDeTeste(PESSOA_SEM_CATALOGO), 'http://127.0.0.1:1');
  conferir(x.status === 403, 'outra origem no fim do quiz: 403 (' + x.status + ')');
  x = await postEvento(eventoDeTeste('visita'), 'http://127.0.0.1:1');
  conferir(x.status === 403, 'outra origem na visita: 403 (' + x.status + ')');
  const LINHAS_DO_CATALOGO = 'landing-page-01 1 landing|landing-page-02 1 landing|quiz-01 1 quiz|quiz-01 2 quiz';
  for (const vez of ['primeira', 'segunda']) {
    let erro = null, linhas = [];
    try { const s = await comoDono(CATALOGO); linhas = s[s.length - 1].rows; } catch (e) { erro = e; }
    const vistas = linhas.map(l => l.id_entrega + ' ' + l.versao + ' ' + l.tipo_entrega).join('|');
    conferir(!erro && vistas === LINHAS_DO_CATALOGO && linhas.every(l => l.retirada_em === null && l.publicada_em),
      'dados/banco/catalogo-prototipo.sql (v3) aplicado pelo dono, ' + vez + ' vez: mostra as quatro linhas (' + (erro ? erro.message : vistas.replace(/\|/g, '; ')) + ')');
  }
  const dataDepois = (await naFila(() => db.query(`select publicada_em::text as d from public.entregas where id_entrega = 'quiz-01' and versao = 1`))).rows[0].d;
  conferir(await contar(`select count(*) as n from public.entregas`) === 4 && dataDepois === dataDaLinhaAntiga,
    'catálogo com quatro linhas (rodar de novo não duplica) e a linha antiga (quiz-01, 1) com a mesma data');

  // ═══ 6. Landing e quiz no navegador sem tela ═══
  secao('6. Landing e quiz no navegador sem tela (só 127.0.0.1)');
  // Sem os tratadores de sinal do Playwright: senão ele encerra o processo no Ctrl+C antes de
  // limparTudo() desligar o wrangler, o workerd e a pasta temporária.
  // O próprio Chromium, por conta dele, fala com o Google em segundo plano (atualização, conta, mensagens), mesmo
  // sem a página pedir nada. Para nada sair: todo nome que não seja 127.0.0.1 vira "não encontrado", e todo pedido
  // de fora vai para um proxy que não existe (127.0.0.1:9). O registro de rede do Chromium (netlog) fica na pasta
  // temporária e é conferido no fechamento.
  const netlog = join(temp, 'netlog-do-navegador.json');
  const navegador = await chromium.launch({ executablePath: acharChromium(), handleSIGINT: false, handleSIGTERM: false, handleSIGHUP: false,
    args: ['--host-resolver-rules=MAP * ~NOTFOUND , EXCLUDE 127.0.0.1', '--proxy-server=http://127.0.0.1:9', '--log-net-log=' + netlog] });
  limpezas.push(() => navegador.close());
  const fora = [];            // todo pedido do navegador para fora de 127.0.0.1 (deve ficar vazio)
  const consoleTexto = [];
  const tipoDoPedido = (rq) => { try { return JSON.parse(rq.postData() || '{}').evento.tipo; } catch { return null; } };
  const ehEvento = (tipo) => (rr) => rr.url() === BASE + '/api/evento' && rr.request().method() === 'POST' && tipoDoPedido(rr.request()) === tipo;

  // v6: 360 com 640 de altura, o celular pequeno da medição
  const ALTURA = { 375: 812, 360: 640, 1440: 900 };
  // google (v6; #116): só no contexto que vai aceitar o aviso de cookies. O pedido a www.googletagmanager.com é anotado nessa
  // lista e respondido aqui com 404, como o Google responde enquanto o contêiner não é publicado, sem sair da máquina.
  // ponte (v10; #120): só no contexto que abre uma página pelo endereço antigo. É o endereço local da ponte da seção 12, que
  // repassa o pedido ao garçom com o nome do endereço antigo; fica em 127.0.0.1, como o resto.
  // v10: toda resposta do garçom vista pelas páginas é anotada, com o status e o noindex, para a conferência da seção 12.
  const respostasDoGarcom = [];
  // os pedidos de navegação que o próprio ensaio segura e responde (seção 12, as chamadas): não são resposta do garçom
  const seguradasPeloEnsaio = new WeakSet();
  async function novoContexto(largura, { eventoForaDoAr = false, google = null, ponte = null } = {}) {
    const ctx = await navegador.newContext({ viewport: { width: largura, height: ALTURA[largura] || 900 }, reducedMotion: 'reduce' });
    ctx.on('response', (rr) => {
      const end = rr.url();
      if (seguradasPeloEnsaio.has(rr.request())) return;
      if (end.startsWith(BASE + '/') || (ponte && end.startsWith(ponte + '/')))
        respostasDoGarcom.push({ status: rr.status(), noindex: rr.headers()['x-robots-tag'] === 'noindex', caminho: new URL(end).pathname, antigo: !end.startsWith(BASE + '/') });
    });
    // Só 127.0.0.1: qualquer outro endereço é anotado e bloqueado (desde a v3, nada deve tentar sair; 10.7)
    await ctx.route('**/*', (rota) => {
      const end = rota.request().url();
      if (end.startsWith(BASE + '/') || end.startsWith('data:') || (ponte && end.startsWith(ponte + '/'))) {
        if (eventoForaDoAr && end === BASE + '/api/evento') return rota.abort();
        return rota.continue();
      }
      if (google && new URL(end).hostname === 'www.googletagmanager.com') {
        google.push(end);
        return rota.fulfill({ status: 404, contentType: 'text/plain', body: '' });
      }
      fora.push(new URL(end).hostname || end.slice(0, 20));
      return rota.abort();
    });
    return ctx;
  }
  const lerPagina = (page) => page.evaluate(async () => {
    await document.fonts.ready;
    return { charset: document.characterSet, modo: document.compatMode, titulo: document.title,
      fontes: [...document.fonts].filter(f => f.status === 'loaded').map(f => f.family.replace(/"/g, '')) };
  });

  // Os botões da landing-page-02 que levam ao quiz (v4): o do topo e o grande, que se repete pela página
  const BOTAO_DO_TOPO = 'Fazer a Análise', BOTAO_GRANDE = 'Faça uma Análise Estratégica';
  const botaoDaLanding = (page, texto) => page.locator('button:visible', { hasText: texto }).first();
  // v10 (#120): a ida da landing ao quiz é direta quando o primeiro pedido de navegação depois do clique já é /analise/ e nenhum
  // passa por /quiz (o caminho antigo, que o garçom ainda leva a /analise/: uma chamada que apontasse para ele também chegaria)
  const idaDireta = (idas) => idas.length > 0 && new URL(idas[0]).pathname === '/analise/' && !idas.some(u => /^\/quiz(\/|$)/.test(new URL(u).pathname));
  // v10: clica um link que abre numa aba nova e diz para onde ele aponta, aonde chegou e o título da página que abriu
  const abrirLink = async (ctx, link) => {
    const href = await link.getAttribute('href', { timeout: 5000 }).catch(() => null);
    const espera = ctx.waitForEvent('page', { timeout: 10000 }).catch(() => null);
    await link.click({ timeout: 5000 }).catch(() => {});
    const nova = await espera;
    if (!nova) return { href, endereco: null, titulo: null };
    await nova.waitForLoadState('domcontentloaded').catch(() => {});
    const titulo = await nova.locator('h1').first().textContent({ timeout: 5000 }).catch(() => null);
    const endereco = nova.url();
    await nova.close().catch(() => {});
    return { href, endereco, titulo: titulo && titulo.trim() };
  };
  const ehAPolitica = (l) => !!l && l.href === '/politica-de-privacidade/' && l.endereco === BASE + '/politica-de-privacidade/' && l.titulo === 'Política de privacidade';
  // v10: se a landing não levar ao quiz, ou o quiz parar no meio, a pessoa volta com o que deu para colher e as conferências dela
  // saem FALHOU, em vez de o ensaio parar no meio (até a v9, parava com erro). As telas por onde o quiz passou ficam anotadas com o
  // caminho da página em cada uma, e os dois links da política do quiz (o da abertura e o da tela do contato) são clicados.
  // v11 (quiz-01-pagina v8): conversa = a opção que a pessoa responde na conversa gratuita com o Junior, quando o fim é #conversa
  async function fazerQuiz({ landing, busca, respostas, pessoa, largura, telaFinal, desmarcar = false, clique = null, botao = BOTAO_GRANDE, conversa = null }) {
    const ctx = await novoContexto(largura);
    const page = await ctx.newPage();
    const api = [], idas = [], telas = [];
    const SEM_LEITURA = { charset: '', modo: '', titulo: '', fontes: [] };
    const r = { endereco: new URL(BASE + landing + busca), sessao: null, visita: null, inicio: null, fim: null, clique: null, aviso: false, caixaMarcada: false, caixas: 0,
      naLanding: SEM_LEITURA, noQuiz: SEM_LEITURA, api, telaFinal: 'não chegou ao fim', telas, direto: false, politica: {}, erro: null, resposta: null, botaoConversa: null, relatorio: null, camada: null };
    page.on('console', m => consoleTexto.push(m.text()));
    page.on('response', rr => { const e = new URL(rr.url()); if (rr.url().startsWith(BASE + '/api/')) api.push({ rota: e.pathname, tipo: tipoDoPedido(rr.request()), status: rr.status() }); });
    try {
      const visita = page.waitForResponse(ehEvento('visita'), { timeout: 15000 }).catch(() => null);
      await page.goto(BASE + landing + busca);
      const rv = await visita;
      r.visita = rv && rv.status();
      r.naLanding = await lerPagina(page);
      const inicioQuiz = page.waitForResponse(ehEvento('inicio_quiz'), { timeout: 15000 }).catch(() => null);
      page.on('request', rq => { if (rq.isNavigationRequest() && rq.frame() === page.mainFrame()) idas.push(rq.url()); });
      await botaoDaLanding(page, botao).click();
      await page.waitForURL(/\/analise\/\?/, { timeout: 15000 });
      const ri = await inicioQuiz;
      r.inicio = ri && ri.status();
      r.direto = idaDireta(idas);
      r.endereco = new URL(page.url());
      r.sessao = r.endereco.searchParams.get('id_sessao');
      r.noQuiz = await lerPagina(page);
      const naTela = async (id) => {
        await page.waitForFunction(i => location.hash === '#' + i, id, { timeout: 15000 });
        telas.push([id, new URL(page.url()).pathname]);
      };
      const opcao = (v) => page.locator('[data-corpo] .opcao[data-valor="' + v + '"]').click();
      await naTela('abertura'); // v5: o quiz abre na abertura (a capa saiu do funil, quiz-01-pagina v4)
      r.politica.abertura = await abrirLink(ctx, page.locator('.abertura__nota a').first());
      await page.locator('.abertura__copy [data-acao="proximo"]').click();
      await naTela('nome'); await page.fill('#nomeIn', pessoa.nome.split(' ')[1]); await page.click('#seguir');
      await naTela('ramo'); await opcao(respostas.ramo);
      await naTela('faturamento'); await opcao(respostas.faturamento);
      await naTela('vendedores'); await opcao(respostas.vendedores);
      await naTela('quem-marca'); await opcao(respostas['quem-marca']);
      await naTela('valor-medio'); await page.fill('#ticket', respostas.ticket); await page.click('#seguirTicket');
      await naTela('origem'); await opcao(respostas.origem); await page.click('[data-corpo] [data-acao="proximo"]');
      await naTela('crm'); await opcao(respostas.crm);
      await naTela('cargo'); await opcao(respostas.cargo);
      await naTela('lembra'); await opcao('Sim');
      await naTela('numeros');
      for (let i = 0; i < 5; i++) await page.fill('#num' + i, respostas.numeros[i]);
      await page.click('[data-corpo] [data-acao="proximo"]');
      await naTela('causa'); await opcao(respostas.causa);
      await naTela('causa2'); await opcao(respostas.causa2);
      await naTela('causa3'); await opcao(respostas.causa3);
      await naTela('contato');
      r.politica.contato = await abrirLink(ctx, page.locator('#consentimento a').first());
      await page.fill('#nome', pessoa.nome);
      await page.fill('#email', pessoa.email);
      await page.fill('#tel', pessoa.tel);
      // A caixa única (13.4) já vem marcada
      r.caixaMarcada = await page.locator('#consAceite').isChecked();
      r.caixas = await page.locator('input[type="checkbox"]').count();
      if (desmarcar) await page.uncheck('#consAceite');
      const fim = desmarcar ? null : page.waitForResponse(rr => rr.url() === BASE + '/api/fim-quiz' && rr.request().method() === 'POST', { timeout: 15000 }).catch(() => null);
      await page.click('#enviar');
      const rf = fim ? await fim : null;
      r.fim = rf && rf.status();
      // Espera a tela do fim, qualquer que seja; a conferência diz se foi a esperada (assim um corte errado vira FALHOU, não erro)
      await page.waitForFunction(() => /^#(conversa|relatorio(-nao|-saudavel|-saudavel-nao)?)$/.test(location.hash), null, { timeout: 15000 });
      r.telaFinal = await page.evaluate(() => location.hash);
      telas.push([r.telaFinal.slice(1), new URL(page.url()).pathname]);
      if (clique && r.telaFinal === '#' + telaFinal) {
        const doClique = desmarcar ? null : page.waitForResponse(ehEvento('interesse_pos_relatorio'), { timeout: 15000 }).catch(() => null);
        await page.locator('[data-acao="' + clique + '"]').first().click();
        const rc = doClique ? await doClique : null;
        r.clique = rc && rc.status();
      }
      // v11: na conversa gratuita, a opção (o clique vai a /api/evento), a resposta do Junior e o botão que abre o relatório
      if (conversa && r.telaFinal === '#' + telaFinal) {
        const doClique = desmarcar ? null : page.waitForResponse(ehEvento('interesse_pos_relatorio'), { timeout: 15000 }).catch(() => null);
        await opcao(conversa);
        const rc = doClique ? await doClique : null;
        r.clique = rc && rc.status();
        const bt = page.locator('[data-corpo] [data-acao="ver-diagnostico"]');
        await bt.waitFor({ state: 'visible', timeout: 15000 });
        r.resposta = await page.evaluate(() => { const f = [...document.querySelectorAll('.conversa .balao--bot .fala')]; return f.length ? f[f.length - 1].innerText.trim() : null; });
        r.botaoConversa = (await bt.innerText()).replace(/\s+/g, ' ').trim();
        await bt.click();
        await naTela('relatorio');
        await page.waitForTimeout(300);
        r.relatorio = await page.evaluate(() => ({ titulo: !!document.querySelector('.relatorio .rel-topo h1'), cta: document.querySelectorAll('.relatorio .cta').length,
          chamada: document.body.innerText.includes('Quer resolver isso junto com a nossa equipe?') }));
      }
      await page.waitForTimeout(desmarcar ? 1000 : 300);
      r.aviso = await page.locator('#avisoEnvio').isVisible();
      // v13 (#121): os avisos ao GTM que a página pôs no dataLayer (só os do quiz; chaves do próprio GTM fora)
      r.camada = await page.evaluate(() => (window.dataLayer || [])
        .filter(x => x && !Array.isArray(x) && typeof x.event === 'string' && x.event.indexOf('quiz_') === 0)
        .map(x => Object.fromEntries(Object.keys(x).filter(k => k.indexOf('gtm.') !== 0).map(k => [k, x[k]]))));
    } catch (e) {
      r.erro = String(e && e.message || e).split('\n')[0];
      informar('a pessoa de teste que ia para a tela ' + telaFinal + ', em ' + largura + ', não chegou ao fim do quiz: parou ' + (telas.length ? 'na tela ' + telas[telas.length - 1][0] : 'antes do quiz') +
        ' (' + r.erro.replace(/127\.0\.0\.1:\d+/g, '127.0.0.1:(porta)').slice(0, 160) + ')');
    } finally {
      await ctx.close();
    }
    return r;
  }

  // Lead 1: landing-page-02 pelo botão do topo, utm bio, 1440, o exemplo do lead score (96, faixa a), caixa marcada
  const q1 = await fazerQuiz({ landing: '/', busca: '?utm_source=bio&utm_campaign=funil-01', respostas: EXEMPLO, pessoa: PESSOA_A, largura: 1440, telaFinal: 'conversa', botao: BOTAO_DO_TOPO, conversa: 'Sim, eu quero' });
  conferir(q1.visita === 201, 'landing: a visita foi gravada (POST /api/evento, ' + q1.visita + ')');
  conferir(q1.naLanding.modo === 'CSS1Compat' && q1.naLanding.charset === 'UTF-8', 'landing: modo padrão (' + q1.naLanding.modo + ') e UTF-8 (34.13)');
  conferir(LISTA_FONTES['landing-02'].length === 0 || q1.naLanding.fontes.includes('Geist'), 'landing: Geist carregada de /fontes/, sem o Google (' + q1.naLanding.fontes.join(', ') + ')');
  conferir(q1.direto && q1.endereco.pathname === '/analise/' && q1.endereco.searchParams.get('utm_source') === 'bio' && q1.endereco.searchParams.get('utm_campaign') === 'funil-01' && /^sessao-[a-z0-9-]{1,60}$/.test(q1.sessao || ''),
    'landing: o botão do topo ("' + BOTAO_DO_TOPO + '") leva a /analise/ com utm_source=bio, utm_campaign=funil-01 e id_sessao no formato do banco');
  conferir(q1.inicio === 201, 'quiz: o início do quiz foi gravado ao abrir (POST /api/evento, ' + q1.inicio + ')');
  conferir(q1.noQuiz.modo === 'CSS1Compat' && q1.noQuiz.charset === 'UTF-8' && q1.noQuiz.titulo === 'Análise Estratégica do Sistema de Vendas' && !/Ã|Â/.test(q1.noQuiz.titulo),
    'quiz: modo padrão (' + q1.noQuiz.modo + '; 09.1), lido como UTF-8, título com os acentos certos (v7: o nome público da Análise, ficha-de-fatos#analise-nome-publico; ' + q1.noQuiz.titulo + ')');
  // v7 (#117): a página da política, servida pelo garçom; a landing sem as perguntas 6 e 7 do FAQ; nenhum fato bloqueado no quiz
  const rPol = await fetch(BASE + '/politica-de-privacidade/');
  const tPol = await rPol.text();
  conferir(rPol.status === 200 && tPol.includes('<h1>Política de privacidade</h1>') && tPol.includes('### ') === false && !tPol.includes('Para a equipe') &&
    !/\{\{|BLOQUEADO|conflito-17|ficha-de-fatos#/.test(tPol) && tPol.includes('<!-- medicao: inicio -->'),
    'política: /politica-de-privacidade/ abre (200) só com o texto para o lead, sem marcador {{...}}, sem anotação da equipe e com o aviso de cookies (v7; #117)');
  const jsLanding = readdirSync(join(SITE, 'assets')).filter(a => a.endsWith('.js')).map(a => readFileSync(join(SITE, 'assets', a), 'utf8')).join('');
  conferir(!jsLanding.includes('Por que só 10 vagas?') && !jsLanding.includes('Posso parcelar?') && !/a definir/i.test(jsLanding),
    'landing: sem as perguntas 6 e 7 do FAQ e sem nenhum "a definir" (v7; landing-page-02 v2)');
  // v8 (#118; landing-page-02 v3): no programa montado, nenhum texto antigo da seção "Como funciona" e do FAQ, e todo texto novo com
  // as cópias certas, na versão do computador, na do celular e nas definições dos cartões. Na página aberta, a seção 10 confere de novo.
  {
    const sobras = LANDING_V3.antigos.filter(t => jsLanding.includes(t));
    conferir(sobras.length === 0, 'landing · programa: nenhum texto antigo da seção "Como funciona" e do FAQ (' + LANDING_V3.antigos.join(' | ') + ')' +
      (sobras.length ? ', mas sobrou: ' + sobras.join(' | ') : '') + ' (v8; landing-page-02 v3)');
    const versoes = versoesDaSecao(jsLanding), copias = [...copiasDaLandingV3()];
    for (const [k, nome, onde] of [[0, 'computador', 'versão do computador'], [1, 'celular', 'versão do celular'], [2, 'resto', 'definições dos cartões, escura e clara']]) {
      const erradas = versoes ? copias.filter(([texto, n]) => quantas(versoes[nome], texto) !== n[k]).map(([texto, n]) => texto.slice(10, 60) + ': ' + quantas(versoes[nome], texto) + ' no lugar de ' + n[k])
        : ['a seção não foi achada no programa'];
      conferir(erradas.length === 0, 'landing · programa, ' + onde + ': os textos novos da seção "Como funciona" com as cópias certas (' + copias.filter(([, n]) => n[k]).length + ' textos, ' +
        copias.reduce((t, [, n]) => t + n[k], 0) + ' cópias)' + (erradas.length ? ', mas: ' + erradas.join(' | ') : '') + ' (v8)');
    }
    const faqErradas = LANDING_V3.faq.filter(([p, r]) => quantas(jsLanding, 'pergunta:"' + p + '",resposta:"' + r + '"') !== 2 || quantas(jsLanding, 'pergunta:"' + p + '"') !== 2).map(([p]) => p);
    conferir(faqErradas.length === 0, 'landing · programa: as duas respostas novas do FAQ, cada uma logo depois da sua pergunta, nas duas cópias (a do computador e a do celular)' +
      (faqErradas.length ? ', mas não em: ' + faqErradas.join(' | ') : '') + ' (v8)');
  }
  // v9 (#119; landing-page-02 v4): no programa montado, "GSAAS" em lugar nenhum, nem o que saiu com ele; nenhum texto que o pedido 20
  // trocou; as duas respostas do FAQ do pedido 20 nas duas cópias; e o contador do carrossel com 9 estados nas duas versões da seção.
  // Os dois rótulos novos já são conferidos acima, cópia a cópia, porque estão em LANDING_V3. Na página aberta, a seção 11 confere de novo.
  {
    const V = LANDING_V4;
    const doGsaas = [...V.gsaas, 'children:"' + V.agentes + '"', '"data-name":"Item · ' + V.agentes + '"', '"data-name":"Tela ativa · ' + V.agentes + '"'].filter(t => jsLanding.includes(t));
    conferir(doGsaas.length === 0, 'landing · programa: "GSAAS" não aparece em lugar nenhum, nem o cartão do GSAAS, nem o item e a tela "' + V.agentes + '" da demonstração (' + V.gsaas.join(' | ') + ')' +
      (doGsaas.length ? ', mas sobrou: ' + doGsaas.join(' | ') : '') + ' (v9; landing-page-02 v4)');
    const sobras = V.antigos.filter(t => jsLanding.includes(t));
    conferir(sobras.length === 0, 'landing · programa: nenhum texto que o pedido 20 trocou (' + V.antigos.join(' | ') + ')' + (sobras.length ? ', mas sobrou: ' + sobras.join(' | ') : '') + ' (v9)');
    const faqErradas = V.faq.filter(([p, r]) => quantas(jsLanding, 'pergunta:"' + p + '",resposta:"' + r + '"') !== 2 || quantas(jsLanding, 'pergunta:"' + p + '"') !== 2).map(([p]) => p);
    conferir(faqErradas.length === 0, 'landing · programa: as duas respostas do FAQ do pedido 20 ("' + V.faq[0][0] + '" e "' + V.faq[1][0] + '"), cada uma logo depois da sua pergunta, nas duas cópias (a do computador e a do celular)' +
      (faqErradas.length ? ', mas não em: ' + faqErradas.join(' | ') : '') + ' (v9)');
    const versoes = versoesDaSecao(jsLanding), nn = (k) => String(k).padStart(2, '0');
    const contadores = Array.from({ length: V.cartoes }, (_, k) => '"' + nn(k + 1) + ' / ' + nn(V.cartoes) + '"');
    const semContador = versoes ? [['computador', 'a versão do computador'], ['celular', 'a versão do celular']]
      .filter(([nome]) => !contadores.every(t => quantas(versoes[nome], t) === 1) || (versoes[nome].match(/"\d\d \/ \d\d"/g) || []).length !== V.cartoes).map(([, onde]) => onde) : ['a seção não foi achada no programa'];
    conferir(semContador.length === 0, 'landing · programa: o contador do carrossel tem ' + V.cartoes + ' estados, de ' + contadores[0] + ' a ' + contadores[V.cartoes - 1] + ', uma vez cada e nenhum outro, na versão do computador e na do celular' +
      (semContador.length ? ', mas não em: ' + semContador.join(' | ') : '') + ' (v9)');
  }
  const htmlQuiz = readFileSync(join(SITE, 'analise', 'index.html'), 'utf8');
  conferir(!htmlQuiz.includes('{bloqueado:true') && htmlQuiz.includes("const POLITICA = {endereco:'/politica-de-privacidade/'}"),
    'quiz: nenhum fato bloqueado na página (nome da Análise e da agência vindos da ficha) e os links da política para /politica-de-privacidade/ (v7; #117)');
  // v5: o quiz abre na abertura, com o cabeçalho e o botão da landing-page-02 (Geist); a letra de mão (Permanent Marker) fica para o relatório
  conferir(['Inter', 'Space Grotesk', 'Geist'].every(n => q1.noQuiz.fontes.includes(n)), 'quiz: Inter, Space Grotesk e Geist carregadas de /analise/fontes/ na abertura (' + q1.noQuiz.fontes.join(', ') + ')');
  conferir(q1.caixaMarcada && q1.caixas === 1, 'quiz: uma caixa de aceite só, já marcada (13.4)');
  conferir(q1.fim === 201 && !q1.aviso && q1.telaFinal === '#conversa', 'lead A: POST /api/fim-quiz gravado (' + q1.fim + '), tela da conversa gratuita com o Junior, sem aviso de falha');
  // v11 (quiz-01-pagina v8): na conversa gratuita, "Sim, eu quero", o clique quero-conversa gravado e o relatório pelo botão, sem o bloco de chamada
  conferir(q1.clique === 201 && q1.resposta === 'Fechou, Marina. Em alguns minutos alguém do meu time chama você no WhatsApp para marcar.',
    'lead A: "Sim, eu quero" na conversa gratuita, com a resposta do Junior, e o clique quero-conversa gravado (POST /api/evento, ' + q1.clique + ')');
  conferir(q1.botaoConversa === 'Ver meu diagnóstico →' && q1.relatorio && q1.relatorio.titulo && q1.relatorio.cta === 0 && !q1.relatorio.chamada && q1.telas.length > 0 && q1.telas[q1.telas.length - 1].join(' ') === 'relatorio /analise/',
    'lead A: "Ver meu diagnóstico" abre o relatório do qualificado em /analise/#relatorio, sem o bloco de chamada (v11)');

  // Lead 2: landing-page-02 pelo botão grande, utm stories, 375, eliminatório, caixa marcada, clique "Tenho interesse"
  const q2 = await fazerQuiz({ landing: '/', busca: '?utm_source=stories&utm_campaign=funil-01', respostas: ELIMINATORIO, pessoa: PESSOA_ELIM, largura: 375, telaFinal: 'relatorio-nao', clique: 'interesse' });
  conferir(q2.visita === 201 && q2.naLanding.modo === 'CSS1Compat', 'landing em 375: a visita foi gravada (' + q2.visita + ') e a página está no modo padrão (' + q2.naLanding.modo + ')');
  conferir(q2.direto && q2.endereco.pathname === '/analise/' && q2.endereco.searchParams.get('utm_source') === 'stories', 'landing em 375: o botão grande ("' + BOTAO_GRANDE + '...") leva a /analise/ com utm_source=stories');
  conferir(q2.fim === 201 && !q2.aviso && q2.telaFinal === '#relatorio-nao', 'eliminatório: POST /api/fim-quiz gravado (' + q2.fim + '), tela do relatório de não qualificado, sem aviso de falha');
  conferir(q2.clique === 201, 'eliminatório: o clique "Tenho interesse" foi gravado (POST /api/evento, ' + q2.clique + ')');

  // Lead 3: o corte mais restritivo (14.2): faixa c que passa no corte do Júnior vai para o relatório de quem não se qualifica
  // v13 (#121): a Carla e a Bia chegam por um anúncio (meta-ads), com utm de texto livre e fbclid
  const q3 = await fazerQuiz({ landing: '/', busca: '?utm_source=meta-ads&utm_campaign=funil-01&utm_content=teste&fbclid=teste', respostas: FAIXA_C, pessoa: PESSOA_CORTE, largura: 1440, telaFinal: 'relatorio-nao', clique: 'interesse' });
  conferir(q3.fim === 201 && q3.telaFinal === '#relatorio-nao' && q3.clique === 201,
    'corte mais restritivo: quem passa no corte do Júnior e fica na faixa c vai para o relatório de não qualificado (antes, plano); fim do quiz e clique gravados (' + q3.telaFinal + ')');

  // Lead 4: faixa b com o funil todo na meta (relatório saudável), clique "Quero marcar uma conversa"
  const q4 = await fazerQuiz({ landing: '/', busca: '?utm_source=meta-ads&utm_campaign=funil-01&utm_medium=CPC&utm_content=teste&fbclid=IwAR_Teste-1', respostas: FAIXA_B, pessoa: PESSOA_B, largura: 375, telaFinal: 'relatorio-saudavel', clique: 'marcar' });
  conferir(q4.fim === 201 && !q4.aviso && q4.telaFinal === '#relatorio-saudavel' && q4.clique === 201, 'faixa b: fim do quiz gravado (' + q4.fim + '), relatório do funil saudável, clique "Quero marcar uma conversa" gravado (' + q4.clique + ')');

  // Lead 5: as mesmas respostas da faixa b, com a caixa desmarcada (13.4; 30.3): nada da pessoa vai a lugar nenhum
  const q5 = await fazerQuiz({ landing: '/', busca: '?utm_source=bio&utm_campaign=funil-01', respostas: FAIXA_B, pessoa: PESSOA_DESMARCADA, largura: 1440, telaFinal: 'relatorio-saudavel', desmarcar: true, clique: 'marcar' });
  conferir(q5.visita === 201 && q5.inicio === 201, 'desmarcada: a visita e o início do quiz, que vêm antes da caixa e não têm pessoa, foram gravados (34.18)');
  conferir(!q5.api.some(a => a.rota === '/api/fim-quiz') && !q5.api.some(a => a.tipo === 'interesse_pos_relatorio') && !q5.aviso && q5.telaFinal === '#relatorio-saudavel',
    'desmarcada: nenhum POST /api/fim-quiz e nenhum clique mandado; o diagnóstico aparece na tela, sem aviso');

  // A conferência da landing que ficou fora do repositório na etapa 34 (34.17), no que não repete o que está acima
  {
    // Com o garçom fora do ar para a visita, a página não muda e o botão leva ao quiz com a sessão (10.10)
    const ctx = await novoContexto(375, { eventoForaDoAr: true });
    const page = await ctx.newPage();
    page.on('console', m => consoleTexto.push(m.text()));
    await page.goto(BASE + '/?utm_source=bio');
    await botaoDaLanding(page, BOTAO_GRANDE).click();
    await page.waitForURL(/\/analise\/\?/, { timeout: 15000 }).catch(() => {});
    const ida = new URL(page.url());
    conferir(ida.pathname === '/analise/' && ida.searchParams.get('utm_source') === 'bio' && /^sessao-[a-z0-9-]{1,60}$/.test(ida.searchParams.get('id_sessao') || '') && !ida.searchParams.has('utm_campaign'),
      'landing com /api/evento fora do ar: o botão continua levando a /analise/ com a utm presente e a sessão (10.10)');
    await ctx.close();
    // Aberta direto do arquivo, para revisão: não manda nada (sem rota de bloqueio: só se anota)
    const ctx2 = await navegador.newContext();
    const pedidos = [];
    ctx2.on('request', rq => pedidos.push(rq.url()));
    const p2 = await ctx2.newPage();
    await p2.goto(pathToFileURL(join(RAIZ, 'entregas/landings/landing-page-02/pagina/index.html')).href + '?utm_source=bio');
    await p2.waitForTimeout(300);
    await ctx2.close();
    conferir(pedidos.every(end => end.startsWith('file:') || end.startsWith('data:')), 'a landing-page-02 aberta pelo arquivo (file://): nada é enviado e nada é pedido a outro endereço (' + pedidos.length + ' pedidos, todos file: ou data:)');
  }
  conferir(consoleTexto.every(t => !DADO_PESSOAL.test(t)), 'console das páginas sem dado de pessoa (' + consoleTexto.length + ' linhas)');

  // No banco
  const linhaPessoa = async (email) => (await naFila(() => db.query(`select * from public.pessoas where email = $1`, [email]))).rows;
  // Só os eventos com nota ou clique (o fim do quiz e o clique no fim). A visita e o início do quiz da mesma
  // sessão também ficam ligados à pessoa, pelo fim do quiz (6.2; esquema v2), e são conferidos pela sessão.
  const eventosDe = async (id) => (await naFila(() => db.query(`select * from public.eventos where id_pessoa = $1 and tipo in ('fim_quiz', 'interesse_pos_relatorio') order by gravado_em`, [id]))).rows;
  const eventosDaSessao = async (s) => (await naFila(() => db.query(`select * from public.eventos where id_sessao = $1 order by gravado_em`, [s || '']))).rows;
  // Se um lead não gravou, as seções seguintes rodam assim mesmo, com um id vazio que não acha
  // ninguém: as conferências dele dão FALHOU e o código final continua 1.
  const VAZIO = { id_pessoa: '00000000-0000-0000-0000-000000000000' };
  const paDoBanco = (await linhaPessoa(PESSOA_A.email))[0];
  const pa = paDoBanco || VAZIO;
  const ea = paDoBanco ? await eventosDe(pa.id_pessoa) : [];
  conferir(paDoBanco && pa.nome === PESSOA_A.nome && pa.telefone === '+55 (00) 90000-0001', 'banco · pessoas: o lead A, com nome TESTE, e-mail @teste.invalid e telefone como a página mandou');
  // a caixa única preenche os dois consentimentos com o mesmo valor e o mesmo texto (#104)
  const fonteQuiz = readFileSync(join(RAIZ, 'entregas/quizzes/quiz-01/pagina/index.html'), 'utf8');
  const doQuiz = (campo) => (fonteQuiz.match(new RegExp('^\\s*' + campo + ":'([^']+)'", 'm')) || [])[1];
  const esperadoCons = [doQuiz('texto'), 'Tudo explicado na política de privacidade', doQuiz('caixa')];
  const textoCons = paDoBanco ? pa.consentimento_texto : '';
  conferir(paDoBanco && pa.consentimento_whatsapp === 'sim' && pa.consentimento_email === 'sim' && pa.consentimento_em instanceof Date,
    'banco · pessoas: a caixa marcada vira consentimento por WhatsApp e por e-mail, com a data (#104)');
  conferir(esperadoCons.every(t => t && textoCons.includes(t)) && /diagnóstico/.test(textoCons) && !/Ã|Â|�/.test(textoCons),
    'banco · pessoas: texto aceito com os acentos certos (o combinado, a política de privacidade e a caixa, iguais aos da página)');
  // v13 (#122): o texto aceito gravado é o novo, o da copy v3 (M16), com a Meta, e não o de antes
  conferir(textoCons.includes('servem para três coisas') && textoCons.includes('medir os nossos anúncios no Facebook e no Instagram') &&
      textoCons.includes('nem para a gente, nem para a Meta') && textoCons.endsWith('em código, para medir os anúncios da Meta.') && !textoCons.includes('servem para duas coisas'),
    'banco · pessoas: consentimento_texto é o texto de aceite novo (três usos, com a Meta) e termina com a caixa nova (#122; quiz-01-copy v3, M16)');
  conferir(paDoBanco && pa.primeira_utm_source === 'bio' && pa.primeira_utm_campaign === 'funil-01', 'banco · pessoas: primeira visita bio, funil-01');
  conferir(ea.length === 2 && ea[0].tipo === 'fim_quiz' && ea[0].lead_score_nota === 96 && ea[0].lead_score_faixa === 'a' && ea[0].lead_score_versao === 3,
    'banco · eventos: um fim_quiz do lead A com nota 96, faixa a, versão 3 do lead score' + (ea[0] ? ' (veio ' + ea[0].lead_score_nota + ', ' + ea[0].lead_score_faixa + ', v' + ea[0].lead_score_versao + ')' : ''));
  conferir(ea.length === 2 && ea[0].funil === 'funil-01' && ea[0].entrega === 'quiz-01' && ea[0].versao_entrega === 2 && ea[0].utm_source === 'bio' && ea[0].utm_campaign === 'funil-01' && ea[0].gravado_por === 'garcom' && ea[0].id_sessao === q1.sessao,
    'banco · eventos: etiquetas funil-01, quiz-01 versão 2, utm bio e funil-01, gravado pelo garçom, com a sessão que veio da landing');
  conferir(ea.length === 2 && ea[0].respostas && ea[0].respostas.faturamento === EXEMPLO.faturamento && Array.isArray(ea[0].respostas.numeros), 'banco · eventos: as respostas do quiz gravadas');
  conferir(ea[1] && ea[1].tipo === 'interesse_pos_relatorio' && ea[1].clique_fim_quiz === 'quero-conversa' && ea[1].id_sessao === q1.sessao && ea[1].entrega === 'quiz-01' && ea[1].versao_entrega === 2,
    'banco · o clique do lead A na conversa gratuita: interesse_pos_relatorio, quero-conversa, ligado à pessoa pela sessão (v11; quiz-01-pagina v8)');
  {
    const s1 = await eventosDaSessao(q1.sessao);
    const vis = s1.find(e => e.tipo === 'visita'), ini = s1.find(e => e.tipo === 'inicio_quiz');
    conferir(s1.map(e => e.tipo).join(',') === 'visita,inicio_quiz,fim_quiz,interesse_pos_relatorio',
      'banco · a sessão do lead A tem, na ordem, visita, início do quiz, fim do quiz e o clique da conversa gratuita (' + s1.map(e => e.tipo).join(', ') + ')');
    conferir(vis && vis.entrega === 'landing-page-02' && vis.versao_entrega === 1 && vis.utm_source === 'bio' && vis.utm_campaign === 'funil-01' && vis.id_pessoa === pa.id_pessoa && vis.gravado_por === 'garcom',
      'banco · visita: landing-page-02 versão 1, utm bio e funil-01, gravada pelo garçom sem pessoa e ligada à pessoa pelo fim do quiz da mesma sessão (6.2)');
    conferir(ini && ini.entrega === 'quiz-01' && ini.versao_entrega === 2 && ini.id_pessoa === pa.id_pessoa && ini.lead_score_faixa === null && ini.respostas === null,
      'banco · início do quiz: quiz-01 versão 2, sem nota e sem respostas, ligado à pessoa pelo fim do quiz (6.2)');
  }
  const [pe] = await linhaPessoa(PESSOA_ELIM.email);
  const ee = pe ? await eventosDe(pe.id_pessoa) : [];
  conferir(pe && ee.length === 2 && ee[0].tipo === 'fim_quiz' && ee[0].lead_score_faixa === 'eliminatorio' && pe.primeira_utm_source === 'stories' && ee[0].utm_source === 'stories',
    'banco · o eliminatório: faixa eliminatorio' + (ee[0] ? ' (nota ' + ee[0].lead_score_nota + ')' : '') + ', utm stories');
  conferir(ee[1] && ee[1].tipo === 'interesse_pos_relatorio' && ee[1].clique_fim_quiz === 'tenho-interesse' && ee[1].id_sessao === q2.sessao && ee[1].entrega === 'quiz-01' && ee[1].versao_entrega === 2,
    'banco · o clique do eliminatório: interesse_pos_relatorio, tenho-interesse, ligado à pessoa pela sessão (18.4; 32.2)');
  const [pc] = await linhaPessoa(PESSOA_CORTE.email);
  const ec = pc ? await eventosDe(pc.id_pessoa) : [];
  conferir(ec.length === 2 && ec[0].lead_score_faixa === 'c' && ec[1].clique_fim_quiz === 'tenho-interesse',
    'banco · o corte mais restritivo: faixa c' + (ec[0] ? ' (nota ' + ec[0].lead_score_nota + ')' : '') + ' e o clique tenho-interesse');
  const [pb] = await linhaPessoa(PESSOA_B.email);
  const eb = pb ? await eventosDe(pb.id_pessoa) : [];
  const numerosB = eb[0] && eb[0].respostas && eb[0].respostas.numeros;
  conferir(eb.length === 2 && eb[0].lead_score_faixa === 'b' && eb[0].lead_score_nota === 68 && eb[1].clique_fim_quiz === 'quero-conversa',
    'banco · faixa b: nota 68 e o clique quero-conversa' + (eb[0] ? ' (veio ' + eb[0].lead_score_nota + ', ' + eb[0].lead_score_faixa + ')' : ''));
  conferir(eb[0] && eb[0].respostas.crm === FAIXA_B.crm && Array.isArray(numerosB) && numerosB.some(n => n.linha === 'Leads por mês' && n.valor === '200'),
    'banco · faixa b: as respostas trazem o CRM e a linha "Leads por mês" que a planilha lê (15.4)');
  // v13 (#121): a origem completa e os ids, do anúncio até o banco, e os avisos ao GTM no dataLayer
  {
    const ID_LEAD = /^lead-[0-9]{13}-[a-z0-9]{8}$/, ID_Q = /^qualificado-[0-9]{13}-[a-z0-9]{8}$/;
    conferir(q4.endereco.searchParams.get('fbclid') === 'IwAR_Teste-1' && q4.endereco.searchParams.get('utm_medium') === 'CPC' && q4.endereco.searchParams.get('utm_source') === 'meta-ads',
      'landing: o fbclid vai para /analise/ junto com as utm, como veio (landing-page-02 v6)');
    conferir(ec[0] && ec[0].utm_source === 'meta-ads' && ec[0].utm_campaign === 'funil-01' && ec[0].utm_content === 'teste' && ec[0].utm_medium === '' && ec[0].fbclid === 'teste' &&
        ID_LEAD.test(ec[0].id_lead || '') && ec[0].qualificado === false && ec[0].id_qualificado === null && ec[0].fbp === null && pc.primeira_utm_source === 'meta-ads',
      'banco · não qualificado vindo do anúncio: meta-ads, utm_content teste, fbclid teste, id_lead no formato, qualificado = false, sem id_qualificado, fbp vazio (#121)');
    conferir(eb[0] && eb[0].utm_source === 'meta-ads' && eb[0].utm_medium === 'cpc' && eb[0].utm_content === 'teste' && eb[0].fbclid === 'IwAR_Teste-1' &&
        ID_LEAD.test(eb[0].id_lead || '') && eb[0].qualificado === true && ID_Q.test(eb[0].id_qualificado || ''),
      'banco · qualificado vindo do anúncio: meta-ads, utm_medium em minúsculas, fbclid com as maiúsculas, id_lead e id_qualificado no formato, qualificado = true (#121)');
    const ea1 = ea;
    conferir(ea1[0] && ea1[0].qualificado === true && ea1[0].utm_medium === '' && ea1[0].fbclid === '', 'banco · lead A (bio, sem anúncio): qualificado = true, utm_medium e fbclid vazios');
    const nomes = (c) => (c || []).map(x => x.event).join(',');
    conferir(nomes(q3.camada) === 'quiz_iniciado,quiz_enviado' && q3.camada[1].id_lead === (ec[0] && ec[0].id_lead),
      'dataLayer · não qualificado: quiz_iniciado e quiz_enviado com o mesmo id_lead do banco, sem quiz_qualificado (' + nomes(q3.camada) + ')');
    conferir(nomes(q4.camada) === 'quiz_iniciado,quiz_enviado,quiz_qualificado' && q4.camada[1].id_lead === (eb[0] && eb[0].id_lead) &&
        q4.camada[2].id_qualificado === (eb[0] && eb[0].id_qualificado),
      'dataLayer · qualificado: quiz_iniciado, quiz_enviado e quiz_qualificado, com os mesmos ids do banco (' + nomes(q4.camada) + ')');
    conferir(nomes(q1.camada) === 'quiz_iniciado,quiz_enviado,quiz_qualificado' && nomes(q2.camada) === 'quiz_iniciado,quiz_enviado',
      'dataLayer · lead A (qualificado) com os três avisos; o eliminatório sem quiz_qualificado (' + nomes(q1.camada) + ' | ' + nomes(q2.camada) + ')');
    conferir(nomes(q5.camada) === 'quiz_iniciado', 'dataLayer · caixa desmarcada (nada enviado): só quiz_iniciado, nenhum quiz_enviado (' + nomes(q5.camada) + ')');
    const todas = [q1, q2, q3, q4, q5].flatMap(q => q.camada || []);
    const chaves = [...new Set(todas.flatMap(x => Object.keys(x)))].sort();
    const texto = JSON.stringify(todas);
    const pessoais = [PESSOA_A, PESSOA_ELIM, PESSOA_CORTE, PESSOA_B, PESSOA_DESMARCADA].flatMap(p => [p.nome, p.email, p.tel]);
    conferir(JSON.stringify(chaves) === '["event","id_lead","id_qualificado"]' && !pessoais.some(v => texto.includes(v)) && !/faturamento|vendedores|R\$|lead_score|faixa/i.test(texto),
      'dataLayer · só event, id_lead e id_qualificado: nenhuma resposta, faixa, valor, nome, e-mail ou telefone (chaves: ' + chaves.join(', ') + ')');
  }
  {
    const s5 = await eventosDaSessao(q5.sessao);
    conferir((await linhaPessoa(PESSOA_DESMARCADA.email)).length === 0 && s5.every(e => e.id_pessoa === null) && s5.map(e => e.tipo).join(',') === 'visita,inicio_quiz',
      'banco · desmarcada: nenhuma pessoa, nenhum fim do quiz e nenhum clique; da sessão, só a visita e o início do quiz, sem pessoa (' + s5.map(e => e.tipo).join(', ') + ')');
  }
  conferir(await contar(`select count(*) as n from public.pessoas`) === pessoasDeAntes + 4 && await contar(`select count(*) as n from public.eventos where tipo = 'fim_quiz'`) === 5 + 4,
    'banco: 4 pessoas novas e 4 fins de quiz novos, nada a mais');

  // ═══ 7. Planilha do SDR ═══
  secao('7. Planilha do SDR (Codigo.gs v3 com o Google de mentira) pela porta privada');
  // v10: a porta é a do garçom ou, na seção 12, a da ponte do endereço antigo
  function abrirPlanilha(chave, porta = portaGarcom) {
    const proc = spawn(process.execPath, [join(AQUI, 'planilha-no-ensaio.mjs')], {
      cwd: AQUI, stdio: ['pipe', 'pipe', 'pipe'],
      env: { ...process.env, ENSAIO_PORTA_GARCOM: String(porta), ENSAIO_CHAVE_PLANILHA: chave }
    });
    const linhas = createInterface({ input: proc.stdout });
    const esperando = [];
    linhas.on('line', l => { const f = esperando.shift(); if (f) f(JSON.parse(l)); });
    let saiu = false;
    proc.on('exit', () => { saiu = true; while (esperando.length) esperando.shift()({ ok: false, erro: 'processo da planilha saiu' }); });
    limpezas.push(() => { if (!saiu) proc.kill('SIGKILL'); });
    return {
      pedir: (comando) => new Promise(ok => { esperando.push(ok); proc.stdin.write(comando + '\n'); }),
      sair: () => new Promise(ok => { if (saiu) return ok(); proc.once('exit', ok); proc.stdin.write('sair\n'); })
    };
  }
  const idDe = async (email) => ((await linhaPessoa(email))[0] || VAZIO).id_pessoa;
  const idsDeAntes = [await idDe(ANTES.imitaOtavio.email), await idDe(ANTES.ana.email), await idDe(ANTES.duplo.email)];
  const idsNovos = [pa.id_pessoa, (pb || VAZIO).id_pessoa];
  const planilha = abrirPlanilha(CHAVE_PLANILHA);
  let p = await planilha.pedir('instalar');
  conferir(p.ok && p.resultado.aba === 'criada' && p.resultado.aba_respostas === 'criada', 'instalar() numa planilha sem as abas (como depois de renomear as antigas): abas fila e respostas criadas, cabeçalhos e gatilho' + (p.ok ? '' : ' (' + p.erro + ')'));
  let est = (await planilha.pedir('estado')).resultado;
  conferir(JSON.stringify(est.cabecalho) === JSON.stringify(COLUNAS_PLANILHA), 'aba fila: as 20 colunas de planilha-sdr.md, na ordem, com clique_fim_quiz na 13');
  conferir(JSON.stringify(est.abas) === JSON.stringify(['fila', 'respostas']) && JSON.stringify(est.cabecalho_respostas) === JSON.stringify(COLUNAS_RESPOSTAS),
    'v12 · as duas abas na ordem (fila, respostas), e a aba respostas com as 24 colunas de planilha-sdr.md v3, na ordem');
  p = await planilha.pedir('buscar');
  est = (await planilha.pedir('estado')).resultado;
  conferir(p.ok && p.resultado.situacao === 'ok' && p.resultado.codigo === 200 && p.resultado.acrescentadas === 3 && JSON.stringify(est.linhas.map(l => l[0])) === JSON.stringify(idsDeAntes),
    'primeira busca: 200 e só os 3 leads de antes (a linha que imita a do Otávio, a faixa a com "=1+1" e a pessoa dos dois envios, uma vez só); os novos ainda não (margem de 1 minuto, 21.6)' + (p.ok ? ' (' + p.resultado.acrescentadas + ')' : ' (' + p.erro + ')'));

  const ultimoFimNovo = (await naFila(() => db.query(`select max(gravado_em) as m from public.eventos where tipo = 'fim_quiz'`))).rows[0].m;
  if (ESPERAR_MARGEM) {
    // Sem contorno: espera de verdade a margem de 1 minuto do banco (21.6), contada do último fim do quiz novo
    const falta = Math.max(0, ultimoFimNovo.getTime() + 65000 - Date.now());
    informar('esperando de verdade a margem de 1 minuto: ' + Math.round(falta / 1000) + ' s');
    await esperar(falta);
    informar('margem de 1 minuto esperada de verdade, sem mexer no banco (--esperar-margem)');
  } else {
    // Contorno da margem de 1 minuto (21.6), sem mexer no esquema e sem esperar: como o superusuário
    // do PGlite, com session_replication_role = replica (que desliga os gatilhos só nesta sessão),
    // o gravado_em dos fins de quiz novos volta 2 minutos. A trava continua ligada na tabela.
    const atrasados = await naFila(async () => {
      await db.exec(`set session_replication_role = replica`);
      try {
        return (await db.query(`update public.eventos set gravado_em = gravado_em - interval '2 minutes'
          where tipo = 'fim_quiz' and gravado_em > now() - interval '1 hour'
            and id_pessoa in (select id_pessoa from public.pessoas where email like '%@teste.invalid')`)).affectedRows;
      } finally { await db.exec(`set session_replication_role = origin`); }
    });
    conferir(atrasados === 4, 'contorno da margem: gravado_em dos 4 fins de quiz novos de teste atrasado 2 minutos (trava desligada só nesta sessão e religada)');
  }
  const trava = (await naFila(() => db.query(`select tgenabled from pg_catalog.pg_trigger where tgname = 'eventos_sem_mudanca'`))).rows[0];
  c = await naFila(async () => { try { await db.query(`delete from public.eventos where tipo = 'fim_quiz'`); return 'apagou'; } catch (e) { return e.code; } });
  conferir(trava && trava.tgenabled === 'O' && c === 'P0001', 'a trava dos eventos continua ligada: apagar evento é recusado (' + c + ')');

  p = await planilha.pedir('buscar');
  est = (await planilha.pedir('estado')).resultado;
  conferir(p.ok && p.resultado.situacao === 'ok' && p.resultado.acrescentadas === 2 && p.resultado.fora_da_faixa === 0 && JSON.stringify(est.linhas.map(l => l[0])) === JSON.stringify([...idsDeAntes, ...idsNovos]),
    'segunda busca: 2 linhas novas, o lead A e a faixa b, na ordem de chegada (o eliminatório e a faixa c nem vêm do banco)' + (p.ok ? ' (' + p.resultado.acrescentadas + ')' : ''));
  const linhaDe = (id) => est.linhas.find(l => l[0] === id) || [];
  const col = (linha, n) => linha[COLUNAS_PLANILHA.indexOf(n)];
  const la = linhaDe(pa.id_pessoa), lb = linhaDe((pb || VAZIO).id_pessoa), lo = linhaDe(idsDeAntes[0]);
  conferir(col(la, 'nome') === PESSOA_A.nome && col(la, 'email') === PESSOA_A.email && col(la, 'telefone') === pa.telefone,
    'linha do lead A: id_pessoa, nome, telefone e e-mail iguais aos do banco');
  conferir(col(la, 'lead_score_faixa') === 'a' && col(la, 'lead_score_nota') === 96 && col(la, 'consentimento_whatsapp') === 'sim' && col(la, 'consentimento_email') === 'sim' && col(la, 'empresa') === '' && col(la, 'respostas_a_confirmar') === '' && col(la, 'clique_fim_quiz') === 'quero-conversa',
    'linha do lead A: faixa a, nota 96, consentimentos sim, empresa e respostas_a_confirmar vazios, e o clique quero-conversa da conversa gratuita (v11)');
  conferir(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(col(la, 'entrou_em') || '') && col(la, 'tentativas_feitas') === 0 && col(la, 'estagio') === 'captado' && col(la, 'estado') === '' && col(la, 'data_volta') === '',
    'linha do lead A: entrou_em no horário de Brasília (AAAA-MM-DD HH:MM:SS), 0 tentativas, estágio captado, estado e data_volta vazios');
  conferir(['canal', 'contato_em', 'reuniao_em', 'produto'].every(k => col(la, k) === ''), 'linha do lead A: as colunas do SDR (canal, contato_em, reuniao_em, produto) ficaram vazias');
  const resB = String(col(lb, 'respostas_a_confirmar') || '');
  conferir(col(lb, 'lead_score_faixa') === 'b' && col(lb, 'lead_score_nota') === 68 && resB.includes('leads-por-mes: 200') && resB.includes('crm: ' + FAIXA_B.crm) && resB.includes('vendedores: 2 ou 3'),
    'linha da faixa b: nota 68, respostas a confirmar com as respostas novas leads-por-mes e crm (15.4; ' + resB + ')');
  conferir(col(lb, 'clique_fim_quiz') === 'quero-conversa', 'linha da faixa b: clique_fim_quiz quero-conversa (18.4)');
  // v12: a aba respostas, com as mesmas pessoas da fila, na mesma ordem, e as respostas completas do quiz
  conferir(JSON.stringify(est.linhas_respostas.map(l => l[0])) === JSON.stringify(est.linhas.map(l => l[0])),
    'v12 · aba respostas: as mesmas ' + est.linhas_respostas.length + ' pessoas da fila, na mesma ordem, sem repetir');
  const linhaR = (id) => est.linhas_respostas.find(l => l[0] === id) || [];
  const esperadoR = (pessoa, faixa, nota, R) => [pessoa.nome, faixa, nota, R.ramo, R.faturamento, R.vendedores, R['quem-marca'], Number(R.ticket),
    R.origem, R.crm, R.cargo, 'Sim', Number(R.numeros[0]), R.numeros[1] + '%', Number(R.numeros[2]), Number(R.numeros[3]), Number(R.numeros[4]),
    '', R.causa, R.causa2, R.causa3, ''];
  const semHorario = (l) => [l[1], ...l.slice(3)];
  const rA = linhaR(pa.id_pessoa), rB = linhaR((pb || VAZIO).id_pessoa);
  conferir(JSON.stringify(semHorario(rA)) === JSON.stringify(esperadoR(PESSOA_A, 'a', 96, EXEMPLO)) && rA[2] === col(la, 'entrou_em'),
    'v12 · aba respostas, lead A: as respostas do quiz, uma por coluna (ramo a causas; valor médio ' + rA[9] + ' e os números do funil como número, pré-qualificados ' + rA[15] + ' como no quiz)');
  conferir(JSON.stringify(semHorario(rB)) === JSON.stringify(esperadoR(PESSOA_B, 'b', 68, FAIXA_B)) && rB[2] === col(lb, 'entrou_em'),
    'v12 · aba respostas, faixa b: as respostas do quiz, uma por coluna (faturamento ' + rB[6] + ', CRM ' + rB[11] + ', vendas fechadas ' + rB[18] + ')');
  const rO = linhaR(idsDeAntes[0]);
  conferir((rO[3] === 'a' && rO[4] === 86 && rO[6] === 'R$ 500 mil a R$ 1,5 milhão' && rO.slice(7, 24).every(v => v === '')),
    'v12 · aba respostas, a linha que imita a do Otávio: só o faturamento, a única resposta gravada de antes; o resto vazio');
  conferir(col(lo, 'lead_score_faixa') === 'a' && col(lo, 'lead_score_nota') === 86 && col(lo, 'consentimento_whatsapp') === 'sim' && col(lo, 'clique_fim_quiz') === '',
    'linha que imita a do Otávio: faixa a, nota 86, consentimento sim, sem clique (dado de antes da migração)');
  const fora_da_planilha = [pe, pc].filter(Boolean).map(x => x.id_pessoa);
  conferir(fora_da_planilha.length === 2 && est.linhas.every(l => !fora_da_planilha.includes(l[0]) && l[3] !== PESSOA_DESMARCADA.email && l[3] !== ANTES.bruno.email),
    'o eliminatório, a faixa c do corte, a desmarcada e o eliminatório de antes não estão na planilha');
  p = await planilha.pedir('buscar');
  est = (await planilha.pedir('estado')).resultado;
  conferir(p.ok && p.resultado.acrescentadas === 0 && p.resultado.respostas_acrescentadas === 0 && est.linhas.length === 5 && est.linhas_respostas.length === 5,
    'rodar de novo: 0 linhas novas, as duas abas continuam com 5 leads (não duplica)');
  await planilha.pedir('esquecer-cursor');
  p = await planilha.pedir('buscar');
  est = (await planilha.pedir('estado')).resultado;
  conferir(p.ok && p.resultado.acrescentadas === 0 && p.resultado.repetidas === 5 && est.linhas.length === 5 && est.linhas_respostas.length === 5 && est.tem_cursor,
    'cursor perdido: pede desde o início, acha os 5 leads repetidos nas duas abas e não duplica; cursor salvo de novo');
  conferir(est.registros.length > 0 && est.registros.every(t => !DADO_PESSOAL.test(t) && !SEGREDOS.some(s => t.includes(s)) && !t.includes(pa.id_pessoa)),
    'registro da planilha (' + est.registros.length + ' linhas) sem dado pessoal, sem id_pessoa e sem chave');
  await planilha.sair();

  const planilhaErrada = abrirPlanilha(CHAVE_PLANILHA_ERRADA);
  await planilhaErrada.pedir('instalar');
  p = await planilhaErrada.pedir('buscar');
  est = (await planilhaErrada.pedir('estado')).resultado;
  conferir(p.ok && p.resultado.situacao === 'nao-autorizado' && p.resultado.codigo === 401 && est.linhas.length === 0,
    'planilha com a CHAVE_PLANILHA errada: 401, nada gravado (' + (p.ok ? p.resultado.situacao : p.erro) + ')');
  await planilhaErrada.sair();

  // ═══ 8. Casos de erro ═══
  secao('8. Casos de erro');
  r = await direto('/rest/v1/pessoas', { chave: CHAVE_PUBLICAVEL, metodo: 'GET' });
  conferir(r.status === 401 && !DADO_PESSOAL.test(r.texto), 'chave publicável: GET /rest/v1/pessoas recusado com 401 e sem dado (' + r.status + ')');
  r = await direto('/rest/v1/eventos', { chave: CHAVE_PUBLICAVEL, metodo: 'GET' });
  conferir(r.status === 401, 'chave publicável: GET /rest/v1/eventos recusado com 401 (' + r.status + ')');
  r = await direto('/rest/v1/painel_numeros', { chave: CHAVE_PUBLICAVEL, metodo: 'GET' });
  conferir(r.status === 401, 'chave publicável: GET /rest/v1/painel_numeros (visão) recusado com 401 (' + r.status + ')');
  r = await direto('/rest/v1/pessoas', { chave: CHAVE_PUBLICAVEL, corpo: { nome: 'TESTE Direto' } });
  conferir(r.status === 401, 'chave publicável: POST /rest/v1/pessoas (gravar direto) recusado com 401 (' + r.status + ')');
  r = await direto('/rest/v1/rpc/leads_para_planilha', { chave: CHAVE_PUBLICAVEL, corpo: {} });
  conferir(r.status === 401 && !DADO_PESSOAL.test(r.texto), 'chave publicável: leads_para_planilha recusado com 401 e sem dado (' + r.status + ')');
  r = await direto('/rest/v1/pessoas', { chave: CHAVE_SECRETA, metodo: 'GET' });
  conferir(r.status === 403 && !DADO_PESSOAL.test(r.texto), 'chave secreta: GET /rest/v1/pessoas recusado com 403 (service_role só tem a função da planilha) (' + r.status + ')');
  r = await direto('/rest/v1/rpc/registrar_fim_quiz', { chave: CHAVE_SECRETA, corpo: { pacote: pacoteDeTeste(PESSOA_DUPLA) } });
  conferir(r.status === 403, 'chave secreta: registrar_fim_quiz recusado com 403 (' + r.status + ')');
  r = await direto('/rest/v1/rpc/registrar_evento', { chave: CHAVE_SECRETA, corpo: { pacote: eventoDeTeste('visita') } });
  conferir(r.status === 403, 'chave secreta: registrar_evento recusado com 403 (' + r.status + ')');

  const planilhaGet = (chave) => fetch(BASE + '/api/planilha/leads-novos', { headers: chave === undefined ? {} : { 'X-Chave-Planilha': chave } });
  x = await planilhaGet(CHAVE_PLANILHA_ERRADA);
  let corpo = await x.text();
  conferir(x.status === 401 && corpo === '{"ok":false,"erro":"nao autorizado"}', 'garçom · porta privada com a chave da planilha errada: 401 sem detalhe');
  x = await planilhaGet(undefined);
  conferir(x.status === 401, 'garçom · porta privada sem chave: 401 (' + x.status + ')');
  x = await planilhaGet(CHAVE_PUBLICAVEL);
  conferir(x.status === 401, 'garçom · porta privada com a chave publicável no lugar: 401 (' + x.status + ')');
  x = await planilhaGet(CHAVE_PLANILHA);
  corpo = await x.json();
  conferir(x.status === 200 && corpo.leads.length === 5 && corpo.leads.some(l => l.id_pessoa === pa.id_pessoa) && !!corpo.cursor_seguinte && /Z$/.test(corpo.cursor_seguinte.depois_de_gravado_em) && corpo.pode_ter_mais === false,
    'garçom · porta privada com a chave certa: 200, 5 leads, cursor_seguinte com fuso em Z');

  const antes = supabase.registro.length;
  const pessoasAntes = await contar(`select count(*) as n from public.pessoas`);
  x = await postFimQuiz(pacoteDeTeste(PESSOA_SEM_CONSENTIMENTO, { whatsapp: 'nao', email: 'nao' }));
  conferir(x.status === 422 && supabase.registro.length === antes, 'garçom · pacote sem consentimento: 422 e o banco nem é chamado (' + x.status + ')');
  r = await direto('/rest/v1/rpc/registrar_fim_quiz', { chave: CHAVE_PUBLICAVEL, corpo: { pacote: pacoteDeTeste(PESSOA_SEM_CONSENTIMENTO, { whatsapp: 'nao', email: 'nao' }) } });
  conferir(r.status === 400 && /"code":"23514"/.test(r.texto), 'banco · registrar_fim_quiz chamado direto com a publicável, sem consentimento: recusado pela restrição (400, 23514)');
  conferir(await contar(`select count(*) as n from public.pessoas`) === pessoasAntes, 'e nenhuma pessoa nova entrou');
  const eventosAntes = await contar(`select count(*) as n from public.eventos`);
  x = await postEvento(eventoDeTeste('interesse_pos_relatorio', { extra: { clique_fim_quiz: 'tenho-interesse' } }));
  u = ultimaDoBanco();
  conferir(x.status === 422 && u.rota === '/rest/v1/rpc/registrar_evento' && u.status === 400 && await contar(`select count(*) as n from public.eventos`) === eventosAntes,
    'garçom · clique numa sessão sem fim do quiz: o banco recusa (22023) e o garçom responde 422, nada gravado (32.2)');
  const antesIntrusa = supabase.registro.length;
  x = await postEvento({ pessoa: { nome: 'TESTE Intrusa' }, evento: eventoDeTeste('visita').evento });
  conferir(x.status === 422 && supabase.registro.length === antesIntrusa, 'garçom · /api/evento com pessoa no pacote: 422 e o banco nem é chamado (' + x.status + ')');

  // A mesma pessoa, dois envios ao mesmo tempo (sessões diferentes). O PGlite atende um de cada vez.
  const [d1, d2] = await Promise.all([
    postFimQuiz(pacoteDeTeste(PESSOA_DUPLA)), postFimQuiz(pacoteDeTeste(PESSOA_DUPLA))
  ]);
  const [pd] = await linhaPessoa(PESSOA_DUPLA.email);
  const ed = pd ? await eventosDe(pd.id_pessoa) : [];
  conferir(d1.status === 201 && d2.status === 201, 'dois POST ao mesmo tempo da mesma pessoa: os dois gravados (' + d1.status + ', ' + d2.status + ')');
  conferir(await contar(`select count(*) as n from public.pessoas where email = $1`, [PESSOA_DUPLA.email]) === 1 && ed.length === 2,
    'uma pessoa só no banco e dois eventos fim_quiz ligados a ela (' + ed.length + ')');

  // ═══ 9. Medição no site montado (v6; #116; prompts/17-medicao-google.md, 17.2) ═══
  // O bloco que a montagem acrescenta (entregas/prototipo-funil-01/medicao.mjs). As pessoas de 6 nunca tocam no aviso; aqui, as
  // provas de ponta a ponta que só o ensaio faz: a landing e o quiz servidos pelo workerd, a escolha de uma página valendo na outra,
  // e a sessão gravada no banco mesmo com o endereço já limpo. Vem depois da planilha (7) para não atrasar a primeira busca, que
  // conta com a margem de 1 minuto (21.6). Não grava pessoa nem fim do quiz: só visitas e inícios do quiz, sem pessoa.
  secao('9. Medição no site montado: aviso de cookies e Tag Manager (#116)');
  const MEDICAO = await import(pathToFileURL(join(PROTOTIPO, 'medicao.mjs')).href);
  const GTM = MEDICAO.ENDERECO_GTM, TA = MEDICAO.TEXTO_DO_AVISO;
  const SESSAO_DE_VOLTA = 'sessao-ensaio-volta-0001';   // quem volta do quiz para a landing com o código no endereço
  const doAviso = (page, texto) => page.locator('#aviso-cookies button').filter({ hasText: new RegExp('^' + texto + '$') });
  const lerEscolha = (page) => page.evaluate(ch => { try { return localStorage.getItem(ch); } catch { return 'erro'; } }, MEDICAO.CHAVE_ESCOLHA);
  const temAviso = (page) => page.evaluate(() => !!document.getElementById('aviso-cookies'));
  const camadaDe = (page) => page.evaluate(() => (window.dataLayer || []).map(x => x && typeof x === 'object' && typeof x.length === 'number' && !Array.isArray(x) ? { gtag: Array.from(x) } : x));
  const doGtm = (c) => c.some(x => x && (x.event === 'gtm.js' || 'pagina_limpa' in x));
  const soAnalise = (c) => c.filter(x => x && x.gtag && x.gtag[0] === 'consent' && x.gtag[1] === 'update').map(x => JSON.stringify(x.gtag[2])).join() === '{"analytics_storage":"granted"}';
  const livreDoAviso = (loc, rolar) => loc.evaluate(async (b, rolar) => {
    if (rolar) b.scrollIntoView({ block: 'center', behavior: 'instant' }); else window.scrollTo({ top: 0, behavior: 'instant' });
    await new Promise(ok => requestAnimationFrame(() => requestAnimationFrame(ok)));
    const a = document.getElementById('aviso-cookies'), r = b.getBoundingClientRect(), ra = a.getBoundingClientRect();
    const el = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
    return !(r.left < ra.right && ra.left < r.right && r.top < ra.bottom && ra.top < r.bottom) && !!el && b.contains(el);
  }, rolar);
  const pedidoAoGoogle = (page) => page.waitForRequest(rq => rq.url().startsWith('https://www.googletagmanager.com/'), { timeout: 10000 }).catch(() => null);
  // O "Fazer a Análise" do cabeçalho da landing-page-02: no computador é um <button>; no celular, o programa da landing desenha o mesmo
  // botão como um bloco (data-name "Botão/Primário"), sem <button>. Até a v7, o clique nesse bloco não levava ao quiz, e o ensaio ia
  // ao quiz, no celular, pelo botão grande. Desde a v8 (landing-page-02 v3; #118), o bloco leva ao quiz, e o ensaio vai por ele nas
  // três larguras. O botão grande no celular continua conferido em 6 (375) e em 10 (375 e 360).
  const ctaDoTopo = (page) => page.locator('.hdr button:visible, .hdr [data-name="Botão/Primário"]:visible', { hasText: BOTAO_DO_TOPO }).first();
  const sessoesAceitas = [];
  for (const largura of [375, 360, 1440]) {
    const rotulo = 'medição ' + largura;
    const ida = BOTAO_DO_TOPO;
    // Sem escolha e com "Recusar": na landing e no quiz, nada para fora de 127.0.0.1
    {
      const foraAntes = fora.length;
      const ctx = await novoContexto(largura);
      const page = await ctx.newPage();
      page.on('console', m => consoleTexto.push(m.text()));
      try {
        const visita = page.waitForResponse(ehEvento('visita'), { timeout: 15000 });
        await page.goto(BASE + '/?utm_source=bio&utm_campaign=funil-01');
        await visita;
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(300);
        const av = await page.evaluate(() => {
          const a = document.getElementById('aviso-cookies');
          return a && { primeiro: document.body.firstElementChild === a, pos: getComputedStyle(a).position, topo: Math.round(a.getBoundingClientRect().top),
            lateral: document.documentElement.scrollWidth - innerWidth, ultimo: document.body.lastElementChild.id, texto: a.innerText.replace(/\s+/g, ' ') };
        });
        conferir(av && av.primeiro && av.pos === 'static' && av.topo === 0 && av.lateral <= 0 && av.ultimo === 'aviso-cookies-reabrir' && av.texto.includes(TA.texto),
          rotulo + ' · landing sem escolha: o aviso no topo, em fluxo normal, com o texto do aviso-de-cookies, sem rolagem para o lado, e o link "' + TA.reabrir + '" no fim');
        const topo = await livreDoAviso(ctaDoTopo(page), false);
        const grande = await livreDoAviso(botaoDaLanding(page, BOTAO_GRANDE), true);
        conferir(topo && grande, rotulo + ' · landing sem escolha: o aviso não cobre o "' + BOTAO_DO_TOPO + '" do topo nem o botão grande');
        const semNada = (await lerEscolha(page)) === null && !doGtm(await camadaDe(page));
        // "Recusar" pelo teclado: com o foco no aviso (a rolagem acima mudou o ponto de partida do Tab no Chromium), o primeiro Tab
        // chega ao "Aceitar", o segundo ao "Recusar"; depois do Enter, o foco vai ao primeiro botão ou link desenhado na landing
        // depois do aviso, nunca ao body
        await page.evaluate(() => { window.scrollTo({ top: 0, behavior: 'instant' }); document.getElementById('aviso-cookies').focus(); });
        for (let k = 0; k < MEDICAO.LINKS_DO_AVISO.length; k++) await page.keyboard.press('Tab');   // v7: o link da política vem antes dos botões
        await page.keyboard.press('Tab');
        await page.keyboard.press('Tab');
        const noRecusar = await page.evaluate(() => (document.activeElement.textContent || '').trim());
        await page.keyboard.press('Enter');
        await page.waitForTimeout(300);
        const foco = await page.evaluate(() => {
          const e = document.activeElement;
          const primeiro = [...document.body.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex]:not([tabindex="-1"])')]
            .find(x => x.getClientRects().length && getComputedStyle(x).visibility !== 'hidden');
          return { body: e === document.body, primeiro: e === primeiro,
            quem: e.tagName.toLowerCase() + ' "' + (e.getAttribute('aria-label') || e.textContent || '').trim().slice(0, 30) + '", a ' + Math.round(e.getBoundingClientRect().top + scrollY) + ' pixels do topo' };
        });
        conferir(noRecusar === TA.recusar && !foco.body && foco.primeiro,
          rotulo + ' · landing, "' + TA.recusar + '" pelo teclado: o foco vai ao primeiro botão ou link visível depois do aviso, nunca ao body (' + foco.quem + ')');
        const escolha = await lerEscolha(page);
        // v8: se o botão não levar ao quiz, a conferência abaixo sai FALHOU, em vez de o ensaio parar no meio
        const inicio = page.waitForResponse(ehEvento('inicio_quiz'), { timeout: 15000 }).catch(() => null);
        await ctaDoTopo(page).click();
        const chegou = await page.waitForURL(/\/analise\/\?/, { timeout: 15000 }).then(() => true, () => false);
        await inicio;
        await page.waitForTimeout(500);
        conferir(chegou && semNada && escolha === 'recusado' && !(await temAviso(page)) && !doGtm(await camadaDe(page)) && (await lerEscolha(page)) === 'recusado',
          rotulo + ' · "Recusar" na landing: guarda "recusado"; o quiz, aberto pelo "' + ida + '" do cabeçalho, abre sem o aviso e sem nada do Google na camada de dados');
        conferir(fora.length === foraAntes, rotulo + ' · sem escolha e com "Recusar", na landing e no quiz: nenhum pedido para fora de 127.0.0.1' + (fora.length > foraAntes ? ' (' + fora.slice(foraAntes).join(', ') + ')' : ''));
      } finally {
        await ctx.close();
      }
    }
    // "Aceitar" na landing: só o gtm.js do Google, a pagina_limpa sem o id_sessao, e a escolha passa para o quiz
    {
      const google = [];
      const foraAntes = fora.length;
      const ctx = await novoContexto(largura, { google });
      const page = await ctx.newPage();
      const idas = [];
      page.on('request', rq => { if (rq.isNavigationRequest()) idas.push(rq.url()); });
      page.on('console', m => consoleTexto.push(m.text()));
      try {
        const visita = page.waitForResponse(ehEvento('visita'), { timeout: 15000 });
        await page.goto(BASE + '/?utm_source=bio&utm_campaign=funil-01&id_sessao=' + SESSAO_DE_VOLTA);
        await visita;
        await page.waitForTimeout(300);
        const antesDoAceite = google.length;
        let pedido = pedidoAoGoogle(page);
        await doAviso(page, TA.aceitar).click();
        await pedido;
        await page.waitForTimeout(300);
        const camL = await camadaDe(page);
        const limpaL = camL.find(x => x && 'pagina_limpa' in x);
        const endL = new URL(page.url());
        conferir(antesDoAceite === 0 && google.length === 1 && google[0] === GTM && fora.length === foraAntes,
          rotulo + ' · "Aceitar" na landing: o pedido ao ' + GTM + ' é o primeiro e único para fora, só para o Google (' + (google.join(', ') || 'nenhum') + ')');
        conferir(limpaL && limpaL.pagina_limpa === BASE + '/?utm_source=bio&utm_campaign=funil-01' && !JSON.stringify(camL).includes('id_sessao') && !endL.searchParams.has('id_sessao') && soAnalise(camL),
          rotulo + ' · "Aceitar" na landing: pagina_limpa sem o id_sessao (' + (limpaL ? limpaL.pagina_limpa.replace(BASE, '') : 'nenhuma') + '), o endereço da barra também, e só a análise concedida');
        const inicio = page.waitForResponse(ehEvento('inicio_quiz'), { timeout: 15000 }).catch(() => null);
        pedido = pedidoAoGoogle(page);
        await ctaDoTopo(page).click();
        await page.waitForURL(/\/analise\//, { timeout: 15000 }).catch(() => {});
        const ri = await inicio;
        await pedido;
        await page.waitForTimeout(400);
        const paraOQuiz = idas.map(u => new URL(u)).find(u => u.pathname === '/analise/');
        const sessaoDaIda = paraOQuiz ? paraOQuiz.searchParams.get('id_sessao') : null;
        let sessaoDoInicio = null;
        try { sessaoDoInicio = JSON.parse(ri.request().postData()).evento.id_sessao; } catch { /* fica vazio */ }
        const endQ = new URL(page.url());
        const camQ = await camadaDe(page);
        const limpaQ = camQ.find(x => x && 'pagina_limpa' in x);
        conferir(!(await temAviso(page)) && (await lerEscolha(page)) === 'aceito' && google.length === 2 && google[1] === GTM && fora.length === foraAntes && soAnalise(camQ),
          rotulo + ' · a escolha passa da landing para o quiz: clicando o botão da landing ("' + ida + '"), o quiz abre sem o aviso e já pede o gtm.js, só ao Google');
        conferir(/^sessao-[a-z0-9-]{1,60}$/.test(sessaoDaIda || '') && sessaoDoInicio === sessaoDaIda && !endQ.searchParams.has('id_sessao') && endQ.searchParams.get('utm_source') === 'bio' &&
          limpaQ && limpaQ.pagina_limpa === BASE + '/analise/?utm_source=bio&utm_campaign=funil-01' && limpaQ.origem_limpa === BASE + '/?utm_source=bio&utm_campaign=funil-01',
          rotulo + ' · no quiz: o início do quiz leva o id_sessao que veio da landing; o endereço da barra, a pagina_limpa e a origem_limpa saem sem ele (' + endQ.search + endQ.hash + ')');
        if (sessaoDaIda) sessoesAceitas.push(sessaoDaIda);
        // v13 (#122): a troca de "Aceitar" para "Recusar" também revoga a Meta e apaga os cookies do Pixel. O Pixel de verdade só
        // viria pelo Tag Manager (o gtm.js do ensaio é de mentira): aqui, um fbq de mentira e os dois cookies fazem o papel dele.
        await page.evaluate(() => {
          window.__chamadasFbq = [];
          window.fbq = function () { window.__chamadasFbq.push([].slice.call(arguments)); };
          document.cookie = '_fbp=fb.1.1763500000000.1234567890; path=/';
          document.cookie = '_fbc=fb.1.1763500000000.IwAR_teste; path=/';
        });
        const antesDaRecusa = await page.evaluate(() => document.cookie);
        await page.locator('.aviso-cookies-reabrir__botao').click();
        await doAviso(page, TA.recusar).click();
        await page.waitForTimeout(300);
        const depoisDaRecusa = await page.evaluate(() => ({ cookies: document.cookie, fbq: window.__chamadasFbq }));
        conferir(/_fbp=/.test(antesDaRecusa) && /_fbc=/.test(antesDaRecusa) && !/_fbp=|_fbc=/.test(depoisDaRecusa.cookies) &&
            JSON.stringify(depoisDaRecusa.fbq) === JSON.stringify([['consent', 'revoke']]) && (await lerEscolha(page)) === 'recusado',
          rotulo + " · trocar para \"Recusar\" no quiz: fbq('consent', 'revoke') uma vez e os cookies _fbp e _fbc apagados (#122; " +
            JSON.stringify(depoisDaRecusa.fbq) + ')');
      } finally {
        await ctx.close();
      }
    }
  }
  {
    // No banco: a medição própria não depende do aviso, e o endereço limpo não muda a sessão (a página guarda o código na memória)
    const tipos = [];
    for (const s of sessoesAceitas) tipos.push((await eventosDaSessao(s)).map(e => e.tipo + (e.id_pessoa === null ? '' : '+pessoa')).join(','));
    conferir(sessoesAceitas.length === 3 && tipos.every(t => t === 'visita,inicio_quiz'),
      'banco · com "Aceitar": a visita da landing e o início do quiz gravados com a mesma sessão, sem pessoa, nas três larguras (' + tipos.join(' | ') + ')');
  }

  // ═══ 10. A seção "Como funciona" e o FAQ da landing-page-02 na página aberta (v8; #118; prompts/18-como-funciona-landing-02.md, 18.3) ═══
  // O que a seção 6 confere no programa, aqui na página servida pelo workerd, nas três larguras: em 1440 aparece a versão do
  // computador; em 375 e 360, a do celular. Os textos são comparados sem olhar maiúsculas, porque a página escreve alguns rótulos em
  // caixa alta. Vem depois da planilha (7), como a 9, pela margem de 1 minuto. Não grava pessoa: só visitas e inícios do quiz.
  // v9: os textos esperados são os de hoje (landing-page-02 v4), com os três que o pedido 20 trocou; o que ele acrescenta está na seção 11.
  secao('10. A seção "Como funciona" e o FAQ da landing-page-02 na página aberta (#118; desde a v9, com os textos da #119)');
  // v9: os três ajudantes abaixo saíram de dentro do bloco da seção 10, sem mudança, para a seção 11 usar os mesmos
  const min = (t) => t.toLocaleLowerCase('pt-BR').replace(/\s+/g, ' ').trim();
  const mas = (lista) => lista.length ? ', mas faltou: ' + lista.join(' | ') : '';
  // Clica o botão e diz se a ida foi a /analise/ com as utm e o id_sessao no formato do banco (pelo pedido de navegação).
  // v10 (#120): a ida tem de ser direta, sem passar por /quiz (idaDireta, na seção 6).
  const levaAoQuiz = async (page, botao) => {
    const idas = [];
    page.on('request', rq => { if (rq.isNavigationRequest() && rq.frame() === page.mainFrame()) idas.push(rq.url()); });
    const inicio = page.waitForResponse(ehEvento('inicio_quiz'), { timeout: 10000 }).catch(() => null);
    await botao.click({ timeout: 10000 }).catch(() => {});
    await page.waitForURL(/\/analise\//, { timeout: 10000 }).catch(() => {});
    await inicio;
    const u = idas.map(x => new URL(x)).find(x => x.pathname === '/analise/');
    return !!u && idaDireta(idas) && new URL(page.url()).pathname === '/analise/' && u.searchParams.get('utm_source') === 'bio' && u.searchParams.get('utm_campaign') === 'funil-01' &&
      /^sessao-[a-z0-9-]{1,60}$/.test(u.searchParams.get('id_sessao') || '');
  };
  {
    const T = LANDING_V3, S = T.sessoes;
    const temSeq = (linhas, seq) => { const s = seq.map(min); return linhas.some((_, i) => s.every((t, k) => linhas[i + k] === t)); };
    for (const largura of [1440, 375, 360]) {
      const rotulo = 'como funciona ' + largura, celular = largura < 900;
      const ctx = await novoContexto(largura);
      try {
        const page = await ctx.newPage();
        page.on('console', m => consoleTexto.push(m.text()));
        const visita = page.waitForResponse(ehEvento('visita'), { timeout: 15000 });
        await page.goto(BASE + '/?utm_source=bio&utm_campaign=funil-01');
        await visita;
        await page.evaluate(() => document.fonts.ready);
        // As linhas de texto da seção desenhada nesta largura (a outra versão fica no documento, sem desenho)
        const linhas = (await page.evaluate(() => {
          const s = [...document.querySelectorAll('[data-name$="05 · Os 90 dias (carrossel)"]')].find(e => e.getClientRects().length);
          return s ? s.innerText.split('\n') : [];
        })).map(min).filter(Boolean);
        const faltas = [];
        if (!linhas.includes(min(T.titulo.join('')))) faltas.push('o título');
        if (!temSeq(linhas, T.fases)) faltas.push('as quatro fases da régua, na ordem');
        if (!linhas.includes(min(T.legenda))) faltas.push('a legenda dos losangos');
        conferir(faltas.length === 0, rotulo + ' · a versão do ' + (celular ? 'celular' : 'computador') + ' mostra o título novo, as quatro fases da régua e a legenda das Sessões de Comando' + mas(faltas));
        const cartoes = T.cartoes.filter(([n, semana, fase, titulo]) => !temSeq(linhas, n === '06' ? [n, semana, fase, titulo, T.descricao06] : [n, semana, fase, titulo])).map(c => 'o cartão ' + c[0]);
        conferir(cartoes.length === 0, rotulo + ' · os oito cartões com o número, o rótulo da semana, a linha da fase e o título, e o 06 com a descrição nova' + mas(cartoes));
        // O cartão das Sessões de Comando: sem número antes de "Do começo ao fim", e nenhum "09" na seção
        const semNumero = linhas.includes(min(S.rotulo)) && !linhas.includes('09') && linhas.every((l, i) => l !== min(S.rotulo) || !/^\d\d$/.test(linhas[i - 1] || ''));
        const controles = linhas.filter(l => l.startsWith('arraste para ver'));
        const faltasS = [];
        if (!semNumero) faltasS.push('o cartão sem número');
        if (!temSeq(linhas, [S.rotulo, S.nome, S.titulo, ...S.linhas.map(l => l.join(''))])) faltasS.push('o título e as três linhas, na ordem');
        if (!controles.every(l => l === min(T.controle)) || (!celular && controles.length !== 1)) faltasS.push('"' + T.controle + '"');
        conferir(faltasS.length === 0, rotulo + ' · o cartão das Sessões de Comando sem número, com o título e as três linhas novas; ' +
          (controles.length ? '"' + T.controle + '" no controle do carrossel' : 'o controle "Arraste para ver..." não existe nesta versão') + mas(faltasS));
        // A página inteira é lida duas vezes: como abre (a primeira resposta do FAQ já vem aberta) e com as duas respostas abertas
        const lerPaginaInteira = async () => min(await page.evaluate(() => document.body.innerText));
        const paginas = [await lerPaginaInteira()];
        // As duas respostas do FAQ: a primeira já vem aberta; a segunda abre com um clique
        const faq = [];
        for (const [pergunta, resposta] of T.faq) {
          const item = page.locator('button:visible', { hasText: pergunta }).first();
          const ler = async () => min(await item.innerText({ timeout: 5000 }).catch(() => ''));
          if (!(await ler()).includes(min(resposta))) { await item.click({ timeout: 5000 }).catch(() => {}); await page.waitForTimeout(300); }
          if (!(await ler()).includes(min(resposta))) faq.push('"' + pergunta + '"');
        }
        conferir(faq.length === 0, rotulo + ' · FAQ: "' + T.faq[0][0] + '" e "' + T.faq[1][0] + '" abertas com as respostas novas' + mas(faq));
        paginas.push(await lerPaginaInteira());
        const antigos = T.antigos.filter(t => paginas.some(pg => pg.includes(min(t))));
        const mentoriaDeMais = paginas.some(pg => T.mentoriaQuePode.reduce((t, f) => t.split(min(f)).join(' '), pg).includes('mentoria'));
        conferir(antigos.length === 0 && !mentoriaDeMais, rotulo + ' · a página inteira, como abre e com as duas respostas abertas: nenhum texto antigo à vista, e "mentoria" só em "' + T.mentoriaQuePode.join('" e em "') + '"' +
          (antigos.length ? ', mas sobrou: ' + antigos.join(' | ') : '') + (mentoriaDeMais ? ', mas há "mentoria" em outro lugar' : ''));
        // O "Fazer a Análise" do cabeçalho: um botão no computador, um bloco no celular; e o botão grande, numa página nova
        const doTopo = ctaDoTopo(page);
        const feitio = await doTopo.evaluate(b => b.tagName === 'BUTTON' ? 'um botão' : 'um bloco, não um botão', null, { timeout: 5000 }).catch(() => 'não achado');
        conferir(await levaAoQuiz(page, doTopo), rotulo + ' · o "' + BOTAO_DO_TOPO + '" do cabeçalho (' + feitio + ') leva a /analise/ com utm_source=bio, utm_campaign=funil-01 e id_sessao no formato do banco');
        const page2 = await ctx.newPage();
        page2.on('console', m => consoleTexto.push(m.text()));
        const visita2 = page2.waitForResponse(ehEvento('visita'), { timeout: 15000 });
        await page2.goto(BASE + '/?utm_source=bio&utm_campaign=funil-01');
        await visita2;
        conferir(await levaAoQuiz(page2, botaoDaLanding(page2, BOTAO_GRANDE)), rotulo + ' · o botão grande ("' + BOTAO_GRANDE + '...") leva a /analise/ com as utm e o id_sessao no formato do banco');
      } finally {
        await ctx.close();
      }
    }
  }

  // ═══ 11. A landing-page-02 v4 na página aberta (v9; #119; prompts/20-gsaas-fora-da-landing.md, 20.3) ═══
  // O que o pedido 20 mudou, na página servida pelo workerd, nas três larguras: em 1440 aparece a versão do computador; em 375 e 360,
  // a do celular. Uma página por largura para o carrossel, a régua, o FAQ e a demonstração, e uma página nova para cada chamada.
  // Um clique numa seta do carrossel segura o avanço sozinho dele por 8 segundos (10 no celular), e um clique na demonstração segura
  // o dela por 12: por isso o ensaio clica primeiro e lê depois. Não grava pessoa: só visitas e inícios do quiz.
  secao('11. A landing-page-02 v4 na página aberta: sem o GSAAS, com o carrossel de 9 cartões, a régua, o FAQ, a demonstração e as chamadas (#119)');
  {
    const V = LANDING_V4, GESTOR = Object.keys(V.menu)[0], nn = (k) => String(k).padStart(2, '0');
    for (const largura of [1440, 375, 360]) {
      const rotulo = 'landing v4 ' + largura, celular = largura < 900, M = celular ? 'M · ' : '';
      const SECAO5 = '[data-name="' + M + '05 · Os 90 dias (carrossel)"]', DEMO = '[data-name="' + M + '06 · Painel de Safras"]';
      const ctx = await novoContexto(largura);
      try {
        const page = await ctx.newPage();
        page.on('console', m => consoleTexto.push(m.text()));
        const visita = page.waitForResponse(ehEvento('visita'), { timeout: 15000 });
        await page.goto(BASE + '/?utm_source=bio&utm_campaign=funil-01');
        await visita;
        await page.evaluate(() => document.fonts.ready);
        // Todo texto à vista, em cada leitura, para a conferência do "GSAAS" e a dos textos trocados, no fim
        const vistos = [];
        const guardarPagina = async () => vistos.push(min(await page.evaluate(() => document.body.innerText)));
        await guardarPagina();

        // A barra acesa da régua: o fim dela contra o fim da semana 2, que é o meio entre os rótulos S2 e S3. Lida antes e depois de o
        // carrossel dar a volta, porque a barra é fixa.
        const lerBarra = () => page.evaluate((sel) => {
          const regua = document.querySelector(sel + ' [data-name="Régua dos 90 dias"]'), prog = regua && regua.querySelector('[data-name="progresso do carrossel"]');
          if (!prog) return null;
          const centro = (t) => { const p = [...regua.querySelectorAll('p')].find(x => x.textContent.trim() === t); if (!p) return NaN; const b = p.getBoundingClientRect(); return (b.left + b.right) / 2; };
          const s2 = centro('S2'), s3 = centro('S3'), b = prog.getBoundingClientRect();
          return { sobra: b.right - (s2 + s3) / 2, semana: s3 - s2, largura: b.width };
        }, SECAO5);
        const barras = [await lerBarra()];

        // O carrossel: os cartões da trilha, o contador e os chips de cada cartão contra a borda do cartão, que corta o que passa dela
        const lerCarrossel = () => page.evaluate((sel) => {
          const s = document.querySelector(sel), trilha = s && s.querySelector('[data-name="Trilha de cartões"]');
          if (!trilha) return null;
          const cartoes = [...trilha.children].map(c => getComputedStyle(c).display === 'contents' && c.firstElementChild ? c.firstElementChild : c);
          const cortados = [], semChip = [];
          let chips = 0;
          cartoes.forEach((c, k) => {
            const r = c.getBoundingClientRect(), doCartao = [...c.querySelectorAll('[data-name="Chip/Peça"]')];
            if (!doCartao.length) semChip.push(k + 1);
            chips += doCartao.length;
            for (const ch of doCartao) {
              const b = ch.getBoundingClientRect();
              if (b.height < 1 || b.bottom > r.bottom + 0.5 || b.top < r.top - 0.5 || b.right > r.right + 0.5 || b.left < r.left - 0.5)
                cortados.push('cartão ' + (k + 1) + ', "' + ch.textContent.trim() + '" (passa ' + Math.round(Math.max(b.bottom - r.bottom, r.top - b.top, b.right - r.right, r.left - b.left)) + ' px)');
            }
          });
          return { cartoes: cartoes.length, chips, cortados, semChip, contador: [...s.querySelectorAll('p')].map(p => p.textContent.trim()).filter(t => /^\d\d \/ \d\d$/.test(t)).join(' e '), texto: s.innerText };
        }, SECAO5);
        const seta = celular ? page.locator(SECAO5 + ' [data-name="Seta · avançar"]') : page.locator(SECAO5 + ' [data-name="Setas"] button').nth(1);
        const estados = [];
        await seta.click({ timeout: 10000 }).catch(() => {});   // o primeiro clique segura o avanço sozinho
        for (let k = 0; k <= V.cartoes; k++) {
          await page.waitForTimeout(250);
          estados.push(await lerCarrossel() || { cartoes: 0, chips: 0, cortados: [], semChip: [], contador: 'sem carrossel', texto: '' });
          if (k < V.cartoes) await seta.click({ timeout: 10000 }).catch(() => {});
        }
        for (const e of estados) vistos.push(min(e.texto));
        barras.push(await lerBarra());
        // de um estado para o seguinte o contador soma um e, depois do último, volta ao primeiro; com um clique por cartão, fecha a volta
        const numero = (e) => { const m = /^(\d\d) \/ (\d\d)$/.exec(e.contador); return m && m[2] === nn(V.cartoes) ? Number(m[1]) : NaN; };
        const sequencia = estados.map(e => e.contador);
        const emOrdem = estados.every((e, k) => numero(e) >= 1 && numero(e) <= V.cartoes && (k === 0 || numero(e) === numero(estados[k - 1]) % V.cartoes + 1));
        conferir(emOrdem && estados.every(e => e.cartoes === V.cartoes) && sequencia.includes(nn(V.cartoes) + ' / ' + nn(V.cartoes)),
          rotulo + ' · o carrossel tem ' + V.cartoes + ' cartões em todos os estados, e o contador, seta a seta, dá a volta de "01 / ' + nn(V.cartoes) + '" a "' + nn(V.cartoes) + ' / ' + nn(V.cartoes) +
          '" e de volta ao começo (' + sequencia.map(t => t.slice(0, 2)).join(' > ') + '; cartões na trilha: ' + [...new Set(estados.map(e => e.cartoes))].join(' e ') + ')');
        const cortados = [...new Set(estados.flatMap(e => e.cortados))], semChip = [...new Set(estados.flatMap(e => e.semChip))];
        conferir(cortados.length === 0 && semChip.length === 0 && estados.every(e => e.cartoes > 0),
          rotulo + ' · nenhum chip cortado em nenhum cartão do carrossel, em nenhum estado (' + [...new Set(estados.map(e => e.chips))].join(' e ') + ' chips em ' + [...new Set(estados.map(e => e.cartoes))].join(' e ') + ' cartões, cada um inteiro dentro do seu cartão)' +
          (cortados.length ? ', mas: ' + cortados.join(' | ') : '') + (semChip.length ? ', mas sem chip: cartão ' + semChip.join(', ') : ''));
        conferir(barras.every(b => b && Math.abs(b.sobra) <= 1 && b.semana > 10) && Math.abs(barras[0].largura - barras[1].largura) < 0.01,
          rotulo + ' · a barra acesa da régua termina no fim da semana 2, o meio entre S2 e S3, e não se mexe com o carrossel (' +
          barras.map(b => b ? 'passa ' + b.sobra.toFixed(2).replace('.', ',') + ' px, com semanas de ' + b.semana.toFixed(1).replace('.', ',') + ' px' : 'régua não achada').join('; depois da volta: ') + ')');

        // O FAQ com as seis respostas abertas (a primeira já vem aberta; as outras abrem com um clique; a aberta mostra o sinal de menos)
        const perguntas = page.locator('[data-name="' + M + '09 · Perguntas frequentes"] [data-name="Perguntas (clique para abrir)"] button');
        const nPerguntas = await perguntas.count();
        for (let k = 0; k < nPerguntas; k++) {
          const b = perguntas.nth(k);
          if (!(await b.innerText({ timeout: 5000 }).catch(() => '')).includes('−')) { await b.click({ timeout: 5000 }).catch(() => {}); await page.waitForTimeout(200); }
        }
        const abertas = (await perguntas.evaluateAll(bs => bs.map(b => b.innerText))).map(min);
        const faq = V.faq.filter(([p, r]) => !abertas.some(t => t.includes(min(p)) && t.includes(min(r)))).map(([p]) => '"' + p + '"');
        conferir(faq.length === 0 && nPerguntas === V.perguntas && abertas.every(t => t.includes('−')),
          rotulo + ' · FAQ: as ' + V.perguntas + ' perguntas abertas, e "' + V.faq[0][0] + '" e "' + V.faq[1][0] + '" com as respostas do pedido 20' + mas(faq) +
          (nPerguntas === V.perguntas && abertas.every(t => t.includes('−')) ? '' : ', mas abriram ' + abertas.filter(t => t.includes('−')).length + ' de ' + nPerguntas + ' perguntas'));
        await guardarPagina();

        // A demonstração do produto: nos dois perfis, cada item do menu abre a tela de mesmo nome, com o item aceso e um conteúdo
        // diferente do das outras telas. O perfil ativo é um bloco; o outro, um botão. O item aceso leva data-on="1" no celular
        // e, no computador, é um bloco no lugar do botão.
        const lerDemo = () => page.evaluate((sel) => {
          const d = document.querySelector(sel);
          if (!d) return null;
          const vis = (e) => e.getClientRects().length > 0;
          const itens = [...d.querySelectorAll('[data-name^="Item · "]')].filter(vis), telas = [...d.querySelectorAll('[data-name^="Tela ativa · "]')].filter(vis);
          const tela = telas[telas.length - 1];
          return { itens: itens.map(e => e.getAttribute('data-name').slice(7)),
            acesos: itens.filter(e => e.getAttribute('data-on') === '1' || (!e.hasAttribute('data-on') && e.tagName !== 'BUTTON')).map(e => e.getAttribute('data-name').slice(7)),
            tela: tela ? tela.getAttribute('data-name').slice(13) : null, conteudo: tela ? tela.innerText.replace(/\s+/g, ' ').trim() : '', texto: d.innerText };
        }, DEMO);
        const demoErradas = [], telasAbertas = new Set(), primeiras = [];
        let telasCertas = 0;
        for (const perfil of Object.keys(V.menu)) {
          const trocar = page.locator(DEMO + ' button[data-name="Perfil · ' + perfil + '"]:visible');
          const trocou = await trocar.count() > 0;
          if (trocou) { await trocar.first().click({ timeout: 5000 }).catch(() => {}); await page.waitForTimeout(300); }
          const inicio = await lerDemo();
          const itens = inicio ? inicio.itens : [];
          // A troca de perfil abre a primeira tela do perfil. No celular, o menu do perfil do vendedor mostra os itens de quem
          // gere o time (pergunta 20.2.3), e as telas do vendedor não têm item: esta é a única conferência delas no celular.
          if (trocou) {
            if (inicio && inicio.tela === V.menu[perfil][0] && inicio.conteudo.length > 50) { primeiras.push(perfil); telasAbertas.add(inicio.tela); }
            else demoErradas.push('a troca para o perfil "' + perfil + '" abriu a tela ' + (inicio && inicio.tela || 'nenhuma') + ', e não "' + V.menu[perfil][0] + '"');
          }
          const listas = celular ? [V.menu[perfil], V.menu[GESTOR]] : [V.menu[perfil]];
          if (!listas.some(l => l.join(' | ') === itens.join(' | ')) || itens.includes(V.agentes)) demoErradas.push('no perfil "' + perfil + '", o menu tem: ' + (itens.join(', ') || 'nada'));
          const conteudos = new Set();
          for (const nome of [...itens.slice(1), ...itens.slice(0, 1)]) {
            await page.locator(DEMO + ' [data-name="Item · ' + nome + '"]:visible').first().click({ timeout: 5000 }).catch(() => {});
            await page.waitForTimeout(250);
            const e = await lerDemo() || { tela: null, acesos: [], conteudo: '', texto: '' };
            vistos.push(min(e.texto));
            if (e.tela === nome && e.acesos.join(' | ') === nome && e.conteudo.length > 50 && !conteudos.has(e.conteudo)) { telasCertas++; telasAbertas.add(nome); }
            else demoErradas.push('"' + perfil + '" > "' + nome + '": tela ' + (e.tela || 'nenhuma') + ', aceso ' + (e.acesos.join(', ') || 'nenhum') + (conteudos.has(e.conteudo) ? ', com o conteúdo de outra tela' : ''));
            conteudos.add(e.conteudo);
          }
        }
        const telasEsperadas = Object.values(V.menu).reduce((t, l) => t + l.length, 0);
        conferir(demoErradas.length === 0 && telasCertas === telasEsperadas,
          rotulo + ' · demonstração do produto: nos dois perfis, o menu com os 5 itens, sem "' + V.agentes + '", a troca de perfil abre a primeira tela do perfil, e cada item do menu abre a sua tela, com o item aceso (' +
          telasCertas + ' de ' + telasEsperadas + ' cliques no menu; ' + telasAbertas.size + ' telas diferentes abertas' +
          (celular ? ': no celular, o menu mostra os itens de quem gere o time nos dois perfis, e do perfil do vendedor só a primeira tela é conferida' : '') + ')' +
          (demoErradas.length ? ', mas: ' + demoErradas.join(' | ') : ''));

        // Os dois rótulos novos à vista, e nenhum texto que o pedido 20 trocou, em nenhuma leitura
        const secaoVista = vistos[1] || '';   // a seção do carrossel, no primeiro estado lido
        const faltamRotulos = V.rotulos.filter(t => !secaoVista.includes(min(t)));
        const antigos = V.antigos.filter(t => vistos.some(v => v.includes(min(t))));
        conferir(faltamRotulos.length === 0 && quantas(secaoVista, min(V.rotulos[0])) === 2 && antigos.length === 0,
          rotulo + ' · os dois rótulos novos à vista ("' + V.rotulos[0] + '", na régua e no cartão 01, e "' + V.rotulos[1] + '", no cartão 08), e nenhum texto que o pedido 20 trocou' +
          mas(faltamRotulos) + (antigos.length ? ', mas sobrou: ' + antigos.join(' | ') : ''));
        // "GSAAS" em nenhum texto à vista: a página como abre, cada estado do carrossel, a página com o FAQ aberto e cada tela da demonstração
        const comGsaas = [...V.gsaas, V.agentes].filter(t => vistos.some(v => v.includes(min(t))));
        conferir(comGsaas.length === 0 && vistos.length === 2 + (V.cartoes + 1) + telasEsperadas && vistos.every(v => v.length > 100),
          rotulo + ' · "GSAAS" não aparece em nenhum texto à vista, nem "' + V.agentes + '": a página como abre e com as ' + V.perguntas + ' respostas do FAQ abertas, os ' + V.cartoes +
          ' estados do carrossel e os ' + telasEsperadas + ' cliques no menu da demonstração (' + vistos.length + ' leituras)' + (comGsaas.length ? ', mas apareceu: ' + comGsaas.join(' | ') : ''));

        // As duas chamadas que a v4 consertou (18.2.6): a do topo da página e a do cartão da oferta, cada uma numa página nova.
        // No computador, a do topo é um botão e a do cartão da oferta, um bloco; no celular, as duas são blocos.
        for (const [nome, seletor] of [['a chamada do topo da página', '[data-name^="' + M + '01 · Hero"] [data-name="Botão/Primário"]:visible'],
          ['a chamada do cartão da oferta', '[data-name="Cartão da oferta (âncora dos botões)"] [data-name="Botão/Primário"]:visible']]) {
          const pagina = await ctx.newPage();
          pagina.on('console', m => consoleTexto.push(m.text()));
          const visitaDaChamada = pagina.waitForResponse(ehEvento('visita'), { timeout: 15000 });
          await pagina.goto(BASE + '/?utm_source=bio&utm_campaign=funil-01');
          await visitaDaChamada;
          const chamada = pagina.locator(seletor, { hasText: BOTAO_GRANDE }).first();
          const feitio = await chamada.evaluate(b => b.tagName === 'BUTTON' ? 'um botão' : 'um bloco, não um botão', null, { timeout: 5000 }).catch(() => 'não achada');
          conferir(await levaAoQuiz(pagina, chamada), rotulo + ' · ' + nome + ' ("' + BOTAO_GRANDE + '...", ' + feitio + ') leva a /analise/ com utm_source=bio, utm_campaign=funil-01 e id_sessao no formato do banco');
          await pagina.close();
        }
      } finally {
        await ctx.close();
      }
    }
  }

  // ═══ 12. O endereço e o caminho novos (v10; #120; prompts/21-dominio-e-caminho-da-analise.md, 21.3) ═══
  // O que o pedido 21 mudou, com o garçom v5 no workerd. O endereço novo é o local (BASE, a ORIGEM_PERMITIDA do ensaio); o antigo é o
  // nome de mentira NOME_ANTIGO, que a cópia da configuração traz como ENDERECO_ANTIGO. Os pedidos pelo endereço antigo passam pela
  // ponte: um servidor em 127.0.0.1 que repassa cada pedido ao garçom com o nome antigo no cabeçalho Host, como o DNS faria com o
  // endereço de verdade, e devolve a resposta como veio, sem seguir redirecionamento. Nenhum redirecionamento é seguido para fora de
  // 127.0.0.1: o ensaio só segue um Location que comece pelo endereço local. Vem depois da planilha (7), como a 9, a 10 e a 11.
  // Grava no banco só visitas e inícios do quiz, sem pessoa; nenhuma pessoa e nenhum fim do quiz novos.
  secao('12. O endereço e o caminho novos: /quiz levando a /analise/, o endereço antigo levando ao novo, as portas, o noindex, os links e as chamadas (#120)');
  {
    const ponte = http.createServer((req, res) => {
      const ida = http.request({ host: '127.0.0.1', port: portaGarcom, method: req.method, path: req.url, headers: { ...req.headers, host: NOME_ANTIGO } },
        (volta) => { res.writeHead(volta.statusCode, volta.rawHeaders); volta.pipe(res); });
      ida.on('error', () => { res.writeHead(502); res.end(); });
      req.pipe(ida);
    });
    await new Promise(ok => ponte.listen(0, '127.0.0.1', ok));
    limpezas.push(() => new Promise(ok => { ponte.closeAllConnections?.(); ponte.close(() => ok()); }));
    const ANTIGO = 'http://127.0.0.1:' + ponte.address().port;
    informar('endereço novo: o local do ensaio; endereço antigo: ' + ENDERECO_ANTIGO + ', um nome de mentira, pedido pela ponte em 127.0.0.1:(porta livre)');

    // Todo pedido desta seção feito pelo Node, sem seguir redirecionamento, anotado para a conferência do noindex
    const vistas = [];
    const pedir = async (base, caminho, { metodo = 'GET', cabecalhos = {}, corpo } = {}) => {
      const resp = await fetch(base + caminho, { method: metodo, headers: cabecalhos, body: corpo === undefined ? undefined : JSON.stringify(corpo), redirect: 'manual' });
      const visto = { status: resp.status, local: resp.headers.get('location'), noindex: resp.headers.get('x-robots-tag') === 'noindex',
        cors: [...resp.headers.keys()].some(k => k.toLowerCase().startsWith('access-control-')), texto: await resp.text() };
      vistas.push(visto);
      return visto;
    };
    // Só segue um Location que fique no endereço local; qualquer outro não é seguido e a conferência falha
    const seguir = async (visto) => {
      const local = visto.local || '';
      if (local.startsWith('/')) return pedir(BASE, local);
      if (local.startsWith(BASE + '/')) return pedir(BASE, local.slice(BASE.length));
      return { status: 0, local: null, noindex: false, cors: false, texto: '' };
    };
    const semPorta = (t) => String(t || 'sem Location').split(BASE).join('(endereço novo)');
    const Q = '?' + CONSULTA, PARES = new URLSearchParams(CONSULTA);
    // guarda: a consulta de teste tem 8 pares (as cinco utm, o id_sessao e uma chave repetida) e dois valores com caractere codificado
    const consultaBoa = [...PARES].length === 8 && ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'].every(k => PARES.has(k)) && PARES.get('utm_content') === 'anúncio 1' &&
      PARES.get('utm_term') === 'a+b&c' && PARES.getAll('x').join() === '1,2' && PARES.get('id_sessao') === SESSAO_DO_LINK;

    // ··· /quiz e /quiz/ levam a /analise/; /analise sem a barra funciona ···
    const quizDireto = await pedir(BASE, '/analise/');
    // a página do quiz como a montagem a deixou (htmlQuiz, lido da pasta montada na seção 6)
    const ehOQuiz = (visto) => visto.status === 200 && visto.noindex && visto.texto === quizDireto.texto && visto.texto === htmlQuiz && htmlQuiz.length > 10000;
    for (const [caminho, status, nome] of [['/quiz/', 302, 'o caminho antigo do quiz'], ['/quiz', 302, 'o caminho antigo do quiz, sem a barra'], ['/analise', 307, '/analise sem a barra']]) {
      const ida = await pedir(BASE, caminho + Q), chegada = await seguir(ida);
      conferir(consultaBoa && ida.status === status && ida.local === '/analise/' + Q && ida.noindex && !ida.cors && ehOQuiz(chegada),
        'endereço novo · GET ' + caminho + ' com a consulta (' + nome + '): ' + status + ' para /analise/ com a consulta inteira, letra por letra (8 pares: as cinco utm, o id_sessao, uma chave repetida e dois valores com ' +
        'caractere codificado), com noindex e sem CORS; seguindo, o quiz abre (200) (' +
        ida.status + ' para ' + semPorta(ida.local) + '; depois ' + chegada.status + ')');
    }

    // ··· Um pedido de página com o nome do endereço antigo é levado ao novo, no mesmo caminho ···
    const levado = async (caminho, destino) => {
      const ida = await pedir(ANTIGO, caminho + Q), chegada = await seguir(ida), direto = await pedir(BASE, destino);
      const certo = consultaBoa && ida.status === 302 && ida.local === BASE + destino + Q && ida.local.startsWith(BASE + '/') && ida.noindex && !ida.cors && ida.texto === '';
      return { ida, chegada, direto, certo, mesmaPagina: chegada.status === direto.status && chegada.noindex && chegada.texto === direto.texto };
    };
    // a página esperada em cada destino é o arquivo da pasta montada (a landing e o quiz) ou a política lida na seção 6
    for (const [caminho, destino, nome, pagina] of [['/', '/', 'a landing', indexDaLanding], ['/politica-de-privacidade/', '/politica-de-privacidade/', 'a política', tPol],
      ['/quiz/', '/analise/', 'o quiz, com /quiz virando /analise', htmlQuiz]]) {
      const l = await levado(caminho, destino);
      conferir(l.certo && l.mesmaPagina && l.chegada.status === 200 && l.chegada.texto === pagina && pagina.length > 1000,
        'endereço antigo · GET ' + caminho + ' com a consulta (' + nome + '): 302, sem corpo, com noindex e sem CORS, e o Location começa pelo endereço novo e leva a ' + destino +
        ' com a consulta inteira; seguindo, abre (200) a mesma página que o endereço novo serve (' + l.ida.status + ' para ' + semPorta(l.ida.local) + '; depois ' + l.chegada.status + ')');
    }
    {
      // Os outros caminhos: o mesmo caminho no endereço novo, exista ou não a página lá; só /quiz muda
      const outros = [['/quiz', '/analise/'], ['/analise/', '/analise/'], ['/analise', '/analise'], [programaDaLanding, programaDaLanding],
        ['/quiz/poster-junior.jpg', '/analise/poster-junior.jpg'], ['/nao-existe', '/nao-existe']];
      const errados = [];
      for (const [caminho, destino] of outros) {
        const ida = await pedir(ANTIGO, caminho + Q);
        if (!(ida.status === 302 && ida.local === BASE + destino + Q && ida.noindex && !ida.cors)) errados.push(caminho + ': ' + ida.status + ' para ' + semPorta(ida.local));
      }
      conferir(errados.length === 0, 'endereço antigo · os outros caminhos (' + outros.map(o => o[0]).join(', ') + '): 302 para o mesmo caminho no endereço novo, com /quiz virando /analise, a consulta inteira e noindex' +
        (errados.length ? ', mas: ' + errados.join(' | ') : ''));
    }

    // ··· A porta pública aceita a origem nova e recusa a antiga ···
    const post = (base, rota, origem, corpo) => pedir(base, rota, { metodo: 'POST', cabecalhos: { 'Content-Type': 'application/json', Origin: origem }, corpo });
    {
      // As origens que uma aba aberta no endereço antigo mandaria: a do nome de mentira (com https e com http) e a do endereço antigo
      // de verdade, lida do wrangler.toml só para ser o valor do cabeçalho. Em cada rota, pelo endereço novo e pelo antigo.
      const origens = [ENDERECO_ANTIGO, 'http://' + NOME_ANTIGO, ORIGEM_ANTIGA_DE_VERDADE];
      const chamadasAntes = supabase.registro.length, recusas = [];
      for (const base of [BASE, ANTIGO]) for (const origem of origens) {
        recusas.push(await post(base, '/api/evento', origem, eventoDeTeste('visita')));
        recusas.push(await post(base, '/api/fim-quiz', origem, pacoteDeTeste(PESSOA_ORIGEM_ANTIGA)));
      }
      const semPessoa = (await linhaPessoa(PESSOA_ORIGEM_ANTIGA.email)).length === 0;
      conferir(origens.every(o => /^https?:\/\/[^/]+$/.test(o)) && new Set(origens).size === 3 && recusas.length === 12 &&
        recusas.every(v => v.status === 403 && v.noindex && !v.cors && !v.local) && supabase.registro.length === chamadasAntes && semPessoa,
        'porta pública · a origem do endereço antigo é recusada: 403 na visita e no fim do quiz, com as três origens antigas (o nome de mentira com https e com http, e o endereço antigo de verdade, só como texto do cabeçalho), ' +
        'pedidas pelo endereço novo e pelo antigo; o banco nem é chamado e nenhuma pessoa entra (' + recusas.map(v => v.status).join(', ') + ')');
      const sessaoPeloNovo = novaSessao(), sessaoPeloAntigo = novaSessao();
      const aceitas = [await post(BASE, '/api/evento', BASE, eventoDeTeste('visita', { sessao: sessaoPeloNovo })), await post(ANTIGO, '/api/evento', BASE, eventoDeTeste('visita', { sessao: sessaoPeloAntigo }))];
      const gravadas = [await eventosDaSessao(sessaoPeloNovo), await eventosDaSessao(sessaoPeloAntigo)];
      conferir(aceitas.every(v => v.status === 201 && v.noindex && !v.cors && !v.local) && gravadas.every(g => g.length === 1 && g[0].tipo === 'visita' && g[0].id_pessoa === null),
        'porta pública · a origem nova (a ORIGEM_PERMITIDA) é aceita: a visita é gravada (201), pedida pelo endereço novo e também pelo antigo, onde a rota /api/ não é redirecionada (' + aceitas.map(v => v.status).join(', ') + ')');
    }

    // ··· A porta privada responde com os dois nomes ···
    const privada = (base, chave) => pedir(base, '/api/planilha/leads-novos', { cabecalhos: chave === undefined ? {} : { 'X-Chave-Planilha': chave } });
    const idsDe = (visto) => { try { return [...new Set(JSON.parse(visto.texto).leads.map(l => l.id_pessoa))]; } catch { return []; } };
    {
      const peloNovo = await privada(BASE, CHAVE_PLANILHA), peloAntigo = await privada(ANTIGO, CHAVE_PLANILHA);
      conferir(peloNovo.status === 200 && peloAntigo.status === 200 && !peloNovo.local && !peloAntigo.local && peloNovo.noindex && peloAntigo.noindex &&
        idsDe(peloNovo).length >= 5 && peloAntigo.texto === peloNovo.texto,
        'porta privada · com a chave de mentira da planilha: a mesma resposta pelo endereço novo e pelo antigo (200, o mesmo corpo, ' + idsDe(peloNovo).length + ' leads), nunca um redirecionamento (' + peloNovo.status + ' e ' + peloAntigo.status + ')');
      const negadas = [];
      for (const base of [BASE, ANTIGO]) for (const chave of [undefined, CHAVE_PLANILHA_ERRADA, CHAVE_PUBLICAVEL]) negadas.push(await privada(base, chave));
      conferir(negadas.length === 6 && negadas.every(v => v.status === 401 && v.texto === '{"ok":false,"erro":"nao autorizado"}' && !v.local && v.noindex && !v.cors),
        'porta privada · sem chave, com a chave errada e com a publicável no lugar: 401 sem detalhe nos dois endereços, nunca um redirecionamento (' + negadas.map(v => v.status).join(', ') + ')');
      // A planilha do SDR de verdade (Codigo.gs com o Google de mentira), apontada para o endereço antigo, como fica até o Otávio
      // trocar a GARCOM_URL (#120, ponto 3). O Apps Script não segue redirecionamento: um 302 aqui seria "erro-garcom".
      const planilhaPeloAntigo = abrirPlanilha(CHAVE_PLANILHA, ponte.address().port);
      const instalou = await planilhaPeloAntigo.pedir('instalar');
      const buscou = await planilhaPeloAntigo.pedir('buscar');
      const estado = (await planilhaPeloAntigo.pedir('estado')).resultado || { linhas: [], registros: [] };
      await planilhaPeloAntigo.sair();
      const depois = await privada(BASE, CHAVE_PLANILHA);
      const naPlanilha = estado.linhas.map(l => l[0]).join();
      conferir(instalou.ok && buscou.ok && buscou.resultado.situacao === 'ok' && buscou.resultado.codigo === 200 && estado.linhas.length >= 5 &&
        (naPlanilha === idsDe(peloNovo).join() || naPlanilha === idsDe(depois).join()) && estado.registros.every(t => !DADO_PESSOAL.test(t) && !SEGREDOS.some(sg => t.includes(sg))),
        'porta privada · a planilha do SDR (Codigo.gs com o Google de mentira) apontada para o endereço antigo continua puxando: 200, ' + estado.linhas.length +
        ' leads na aba, os mesmos e na mesma ordem dos que o endereço novo devolve, sem dado pessoal no registro (' + (buscou.ok ? buscou.resultado.situacao + ', ' + buscou.resultado.codigo : buscou.erro) + ')');
    }

    // ··· O noindex em tudo o que foi pedido nesta seção, inclusive nos redirecionamentos ···
    {
      const naoAchada = await pedir(BASE, '/nao-existe');
      const porStatus = {};
      for (const v of vistas) porStatus[v.status] = (porStatus[v.status] || 0) + 1;
      const redirecionamentos = vistas.filter(v => v.status >= 300 && v.status < 400);
      conferir(naoAchada.status === 404 && vistas.every(v => v.noindex) && redirecionamentos.length === 12 && redirecionamentos.every(v => v.local) &&
        [200, 201, 302, 307, 401, 403, 404].every(st => porStatus[st] > 0) && vistas.every(v => !v.cors),
        'noindex · X-Robots-Tag: noindex em todas as ' + vistas.length + ' respostas pedidas nesta seção, e nenhuma com cabeçalho de CORS: os ' + redirecionamentos.length +
        ' redirecionamentos (o 302 de /quiz e de /quiz/, o 307 de /analise sem a barra e os 302 do endereço antigo), as páginas, as portas e o 404 (' +
        Object.keys(porStatus).sort().map(st => porStatus[st] + ' com ' + st).join(', ') + ')');
    }

    // ··· No navegador: os links do aviso de cookies e da política ···
    // O link do aviso abre numa aba nova (medicao.mjs); os dois links da política dentro do quiz foram clicados pelas cinco pessoas da seção 6.
    for (const largura of [1440, 375]) {
      const ctx = await novoContexto(largura);
      try {
        for (const [caminho, nome] of [['/', 'na landing'], ['/analise/', 'no quiz']]) {
          const page = await ctx.newPage();
          page.on('console', m => consoleTexto.push(m.text()));
          const abriu = await page.goto(BASE + caminho + '?utm_source=bio&utm_campaign=funil-01').catch(() => null);
          const links = page.locator('#aviso-cookies a.aviso-cookies__link');
          const quantos = await links.count();
          const idas = [];
          for (let k = 0; k < quantos; k++) idas.push(await abrirLink(ctx, links.nth(k)));
          conferir(!!abriu && abriu.status() === 200 && new URL(page.url()).pathname === caminho && quantos === MEDICAO.LINKS_DO_AVISO.length && quantos > 0 && idas.every(ehAPolitica) &&
            MEDICAO.LINKS_DO_AVISO.every(l => l.endereco === '/politica-de-privacidade/'),
            'links ' + largura + ' · ' + nome + ' (' + caminho + '): o link do aviso de cookies aponta para /politica-de-privacidade/ e, clicado, abre a política numa aba nova, no endereço novo (' +
            (idas.map(l => (l.endereco || 'não abriu').replace(BASE, '') + ', "' + (l.titulo || 'sem título') + '"').join('; ') || 'nenhum link no aviso') + ')');
          await page.close();
        }
      } finally {
        await ctx.close();
      }
    }
    {
      const pessoas = [q1, q2, q3, q4, q5];
      const semLink = pessoas.flatMap((q, k) => ['abertura', 'contato'].filter(onde => !ehAPolitica(q.politica[onde])).map(onde => 'pessoa ' + (k + 1) + ', ' + onde + ': ' +
        ((q.politica[onde] || {}).endereco || 'não abriu').replace(BASE, '')));
      conferir(semLink.length === 0, 'links · dentro do quiz, em /analise/: o link da política da abertura e o da tela do contato apontam para /politica-de-privacidade/ e, clicados, abrem a política numa aba nova, ' +
        'nas cinco pessoas da seção 6 (10 cliques, em 1440 e em 375)' + (semLink.length ? ', mas: ' + semLink.join(' | ') : ''));
    }

    // ··· No navegador: as chamadas da landing, uma a uma ···
    // Todas as chamadas à vista (os botões e os blocos "Botão/Primário" cujo texto começa por "Fazer a Análise" ou "Faça uma Análise",
    // a mesma regra do programa do fim da landing), com as cinco utm no endereço. Uma carga da página por largura: o pedido de
    // navegação que cada clique dispara é segurado pelo ensaio (respondido com 204, que deixa a página onde está) e lido. Assim as
    // 10 chamadas são clicadas na mesma página, sem 30 cargas da landing. A ida inteira, com o quiz abrindo e o início gravado, é
    // conferida nas chamadas das seções 6, 9, 10 e 11.
    const CHAMADAS_POR_LARGURA = 10;
    for (const largura of [1440, 375, 360]) {
      const ctx = await novoContexto(largura);
      try {
        const page = await ctx.newPage();
        page.on('console', m => consoleTexto.push(m.text()));
        const pedidas = [];
        await page.route('**/*', (rota) => {
          const rq = rota.request();
          if (rq.isNavigationRequest() && rq.frame() === page.mainFrame() && rq.url().startsWith(BASE + '/') && new URL(rq.url()).pathname !== '/') {
            pedidas.push(rq.url());
            seguradasPeloEnsaio.add(rq);
            return rota.fulfill({ status: 204, body: '' });
          }
          return rota.fallback();
        });
        const visita = page.waitForResponse(ehEvento('visita'), { timeout: 15000 }).catch(() => null);
        await page.goto(BASE + '/?' + new URLSearchParams(CINCO_UTM).toString());
        await visita;
        await page.evaluate(() => document.fonts.ready);
        const lista = await page.evaluateHandle(() => {
          const regra = /^(Fazer a Análise|Faça uma Análise)/;
          const todas = [...document.querySelectorAll('button, [data-name="Botão/Primário"]')].filter(e => e.getClientRects().length > 0 && regra.test(e.textContent.replace(/\s+/g, ' ').trim()));
          return todas.filter(e => !todas.some(outra => outra !== e && outra.contains(e)));
        });
        const total = await lista.evaluate(l => l.length);
        const erradas = [], textos = [];
        let certas = 0;
        for (let k = 0; k < total; k++) {
          const chamada = (await lista.evaluateHandle((l, i) => l[i], k)).asElement();
          const texto = chamada ? await chamada.evaluate(e => e.textContent.replace(/\s+/g, ' ').trim()) : 'não achada';
          textos.push(texto);
          pedidas.length = 0;
          if (chamada) await chamada.click({ timeout: 10000 }).catch(() => {});
          for (let espera = 0; espera < 50 && !pedidas.length; espera++) await page.waitForTimeout(100);
          await page.waitForTimeout(100);
          const ida = pedidas.length ? new URL(pedidas[0]) : null;
          const comAsUtm = !!ida && Object.entries(CINCO_UTM).every(([nome, valor]) => ida.searchParams.get(nome) === valor) && /^sessao-[a-z0-9-]{1,60}$/.test(ida.searchParams.get('id_sessao') || '') &&
            [...ida.searchParams.keys()].length === 6;
          if (pedidas.length === 1 && ida.pathname === '/analise/' && comAsUtm && new URL(page.url()).pathname === '/') certas++;
          else erradas.push((k + 1) + 'ª ("' + texto.slice(0, 28) + '..."): ' + (ida ? 'pediu ' + ida.pathname + ida.search.slice(0, 60) : 'não pediu página nenhuma') + (pedidas.length > 1 ? ', ' + pedidas.length + ' pedidos' : ''));
        }
        const doTopo = textos.filter(t => t === BOTAO_DO_TOPO).length, grandes = textos.filter(t => t.startsWith(BOTAO_GRANDE)).length;
        conferir(total === CHAMADAS_POR_LARGURA && certas === total && doTopo === 1 && grandes === CHAMADAS_POR_LARGURA - 1,
          'chamadas ' + largura + ' · as ' + CHAMADAS_POR_LARGURA + ' chamadas à vista na landing (o "' + BOTAO_DO_TOPO + '" do cabeçalho e as nove "' + BOTAO_GRANDE + '..."), clicadas uma a uma, pedem direto /analise/, ' +
          'e não /quiz/, com as cinco utm do endereço (uma com acento e espaço, outra com + e &) e o id_sessao no formato do banco (' + certas + ' de ' + total + '; ' + doTopo + ' do cabeçalho e ' + grandes + ' das outras)' +
          (erradas.length ? ', mas: ' + erradas.join(' | ') : ''));
      } finally {
        await ctx.close();
      }
    }

    // ··· No navegador: quem abre o endereço antigo ···
    {
      const ctx = await novoContexto(1440, { ponte: ANTIGO });
      try {
        // Um link antigo do quiz: o endereço antigo, em /quiz/, com a consulta inteira
        const page = await ctx.newPage();
        page.on('console', m => consoleTexto.push(m.text()));
        const idas = [];
        page.on('request', rq => { if (rq.isNavigationRequest() && rq.frame() === page.mainFrame()) idas.push(rq.url()); });
        const inicio = page.waitForResponse(ehEvento('inicio_quiz'), { timeout: 15000 }).catch(() => null);
        await page.goto(ANTIGO + '/quiz/' + Q).catch(() => {});
        const ri = await inicio;
        await page.waitForFunction(() => location.hash === '#abertura', null, { timeout: 10000 }).catch(() => {});
        const chegou = new URL(page.url()), titulo = await page.title();
        const daSessao = await eventosDaSessao(SESSAO_DO_LINK);
        conferir(idas.length === 2 && idas[0] === ANTIGO + '/quiz/' + Q && idas[1] === BASE + '/analise/' + Q && chegou.origin === BASE && chegou.pathname === '/analise/' && chegou.search === Q &&
          chegou.hash === '#abertura' && titulo === 'Análise Estratégica do Sistema de Vendas' && !!ri && ri.status() === 201 && daSessao.map(e => e.tipo).join() === 'inicio_quiz' && daSessao[0].utm_source === 'bio',
          'navegador · um link antigo do quiz (o endereço antigo, em /quiz/, com a consulta inteira) chega num salto só ao quiz no endereço novo, em /analise/, com a consulta inteira, e o início do quiz é gravado (' +
          (ri ? ri.status() : 'sem resposta') + ') com o id_sessao e a utm do link (' + idas.length + ' pedidos de navegação; chegou em ' + chegou.pathname + chegou.hash + ')');
        await page.close();
        // Um link antigo da landing: a página abre no endereço novo, a visita é gravada com a utm, e a chamada leva a /analise/
        const page2 = await ctx.newPage();
        page2.on('console', m => consoleTexto.push(m.text()));
        const visita = page2.waitForResponse(ehEvento('visita'), { timeout: 15000 }).catch(() => null);
        await page2.goto(ANTIGO + '/?utm_source=bio&utm_campaign=funil-01').catch(() => {});
        const rv = await visita;
        let utmDaVisita = null;
        try { utmDaVisita = JSON.parse(rv.request().postData()).evento.utm_source; } catch { /* fica vazio */ }
        const naLanding = page2.url();
        const levou = await levaAoQuiz(page2, ctaDoTopo(page2));
        conferir(naLanding === BASE + '/?utm_source=bio&utm_campaign=funil-01' && !!rv && rv.status() === 201 && utmDaVisita === 'bio' && levou,
          'navegador · um link antigo da landing (o endereço antigo, em /, com as utm) abre a landing no endereço novo, com as utm; a visita é gravada (' + (rv ? rv.status() : 'sem resposta') +
          ') com a utm do link, e o "' + BOTAO_DO_TOPO + '" leva direto a /analise/ com as utm e o id_sessao');
      } finally {
        await ctx.close();
      }
    }

    // ··· O quiz do começo ao fim em /analise/, nos três desfechos (as cinco pessoas da seção 6) ···
    {
      const TELAS = ['abertura', 'nome', 'ramo', 'faturamento', 'vendedores', 'quem-marca', 'valor-medio', 'origem', 'crm', 'cargo', 'lembra', 'numeros', 'causa', 'causa2', 'causa3', 'contato'];
      // v11: o lead A termina na conversa gratuita e segue, pelo botão dela, para o relatório (uma tela a mais)
      const pessoas = [['o lead A', q1, ['conversa', 'relatorio']], ['o eliminatório', q2, ['relatorio-nao']], ['a faixa c do corte', q3, ['relatorio-nao']], ['a faixa b', q4, ['relatorio-saudavel']], ['a caixa desmarcada', q5, ['relatorio-saudavel']]];
      const erradas = pessoas.filter(([, q, fim]) => q.telas.map(t => t[0]).join() !== [...TELAS, ...fim].join() || !q.telas.every(t => t[1] === '/analise/') || q.endereco.pathname !== '/analise/')
        .map(([nome, q]) => nome + ': ' + (q.telas.length ? q.telas.length + ' telas, a última ' + q.telas[q.telas.length - 1].join(' em ') : 'não entrou no quiz'));
      const desfechos = [...new Set(pessoas.map(([, q]) => q.telaFinal))].sort();
      const telasVistas = pessoas.reduce((t, [, q]) => t + q.telas.length, 0);
      conferir(erradas.length === 0 && desfechos.join() === '#conversa,#relatorio-nao,#relatorio-saudavel' && telasVistas === pessoas.reduce((t, [, , fim]) => t + TELAS.length + fim.length, 0),
        'quiz em /analise/ · do começo ao fim nos três desfechos: a conversa gratuita com o Junior e o relatório que o botão dela abre (o lead A), o relatório de quem não se qualifica (o eliminatório e a faixa c do corte) e o relatório do funil saudável ' +
        '(a faixa b e a caixa desmarcada); nas cinco pessoas, as ' + (TELAS.length + 1) + ' telas na ordem, da abertura ao fim (no lead A, ' + (TELAS.length + 2) + '), e em todas o caminho da página é /analise/ (' + telasVistas + ' telas; desfechos: ' + desfechos.join(', ') + ')' +
        (erradas.length ? ', mas: ' + erradas.join(' | ') : ''));
    }

    // ··· O noindex em tudo o que as páginas receberam do garçom, do começo ao fim do ensaio ···
    {
      const semNoindex = respostasDoGarcom.filter(v => !v.noindex);
      const redirecionamentos = respostasDoGarcom.filter(v => v.status >= 300 && v.status < 400);
      const doAntigo = respostasDoGarcom.filter(v => v.antigo);
      conferir(respostasDoGarcom.length > 500 && semNoindex.length === 0 && doAntigo.length === 2 && doAntigo.every(v => v.status === 302) && redirecionamentos.length === 2,
        'noindex · no navegador, X-Robots-Tag: noindex em todas as respostas do garçom que as páginas receberam, do começo ao fim do ensaio (as páginas, os arquivos, as rotas /api/ e os ' + redirecionamentos.length +
        ' redirecionamentos do endereço antigo); nenhuma página passou por outro redirecionamento' +
        (semNoindex.length ? ', mas sem noindex: ' + [...new Set(semNoindex.map(v => v.status + ' ' + v.caminho))].slice(0, 5).join(' | ') : ''));
      informar('respostas do garçom vistas pelas páginas: ' + respostasDoGarcom.length + ' (' + redirecionamentos.length + ' redirecionamentos, os dois do endereço antigo)');
    }
  }

  // ═══ 13. Fechamento ═══
  secao('13. Fechamento');
  await rodarConferir('no fim');
  conferir(JSON.stringify(await fotografiaDeAntes(naFila, db)) === JSON.stringify(fotografiaDeAntesInicial),
    'os dados de antes da migração continuam iguais no fim do ensaio');
  const doGarcom = saidaGarcom.join('').split('\n').filter(l => l.includes('[garcom]'));
  const textoGarcom = saidaGarcom.join('');
  conferir(!DADO_PESSOAL.test(textoGarcom) && !SEGREDOS.some(s => textoGarcom.includes(s)) && !textoGarcom.includes(pa.id_pessoa),
    'saída do garçom (' + (modo === 'wrangler' ? 'wrangler dev' : 'servidor Node') + ', ' + doGarcom.length + ' linhas [garcom]) sem dado pessoal, sem id_pessoa e sem chave');
  const porPapel = supabase.registro.filter(l => l.origem === 'garcom');
  const PORTAS = { '/rest/v1/rpc/registrar_fim_quiz': 'anon', '/rest/v1/rpc/registrar_evento': 'anon', '/rest/v1/rpc/leads_para_planilha': 'service_role' };
  conferir(porPapel.length > 0 && porPapel.every(l => PORTAS[l.rota] === l.papel),
    'o garçom só chamou registrar_fim_quiz e registrar_evento com a publicável (anon) e leads_para_planilha com a secreta (service_role) (' + porPapel.length + ' chamadas)');
  // v6: nos contextos que aceitaram o aviso de cookies, o gtm.js do Google é anotado à parte (9) e não entra aqui
  conferir(fora.length === 0, 'navegador · páginas: nenhum pedido para fora de 127.0.0.1, nem fonte do Google (10.7; ' + (fora.length ? [...new Set(fora)].join(', ') : 'nenhum') + '); nos contextos que aceitaram, só o gtm.js, conferido em 9');
  // O registro de rede do Chromium: só existe inteiro depois de o navegador fechar
  await navegador.close();
  let rede = null;
  try {
    const texto = readFileSync(netlog, 'utf8');
    try { rede = JSON.parse(texto); } catch { rede = JSON.parse(texto.replace(/,\s*$/, '') + ']}'); }   // registro cortado no fim
  } catch { rede = null; }
  if (rede) {
    const tipos = Object.fromEntries(Object.entries(rede.constants.logEventTypes).map(([k, v]) => [v, k]));
    const tcp = new Set(), udp = new Set(), nomes = new Set();
    for (const ev of rede.events) {
      const t = tipos[ev.type], pr = ev.params || {};
      if (t === 'TCP_CONNECT_ATTEMPT' && pr.address) tcp.add(pr.address);
      if (t === 'UDP_CONNECT' && pr.address) udp.add(pr.address);
      if (typeof pr.url === 'string') { try { nomes.add(new URL(pr.url).hostname); } catch { /* não é endereço */ } }
    }
    const tcpFora = [...tcp].filter(a => !/^127\.0\.0\.1:\d+$/.test(a));
    // v6: o gtm.js dos contextos que aceitaram passa pelo registro, mas é respondido pelo ensaio com 404 dentro do navegador
    const doTagManager = nomes.has('www.googletagmanager.com');
    const nomesFora = [...nomes].filter(n => n && n !== '127.0.0.1' && n !== 'www.googletagmanager.com');
    conferir(tcpFora.length === 0 && tcp.size > 0, 'navegador · Chromium inteiro (netlog): nenhuma conexão TCP fora de 127.0.0.1 (' + tcp.size + ' endereços, ' + (tcpFora.join(', ') || 'todos locais') + ')');
    informar('tentativas de fundo do próprio Chromium, recusadas antes de sair (nome não encontrado e proxy local inexistente): ' + (nomesFora.join(', ') || 'nenhuma'));
    if (doTagManager) informar('www.googletagmanager.com no registro de rede: pedidos parados dentro do navegador (respondidos com 404 nos contextos que aceitaram, conferidos em 9; bloqueados nos outros, conferidos acima), sem conexão');
    if (udp.size) informar('UDP sem envio de dado (o teste de IPv6 do Chromium, que só "conecta" para descobrir o endereço local): ' + [...udp].join(', '));
  } else {
    conferir(false, 'navegador · Chromium inteiro (netlog): o registro de rede não pôde ser lido');
  }
  if (modo === 'wrangler') {
    const tentativas = readFileSync(registroDeRede, 'utf8').split('\n').filter(Boolean);
    conferir(tentativas.length === 0, 'wrangler dev: nenhuma tentativa de falar com fora da máquina (trava rede-so-local.cjs; ' + (tentativas.length ? [...new Set(tentativas)].join(', ') : 'nenhuma') + ')');
  }
  console.log('  tempo do ensaio: ' + Math.round((Date.now() - inicio) / 1000) + ' s');
}

// A fotografia dos dados de antes (só as pessoas e os eventos das sessões de antes), para o fechamento
let fotografiaDeAntesInicial = null;
async function fotografiaDeAntes(naFila, db) {
  return (await naFila(() => db.query(`
    select (select md5(coalesce(string_agg(to_jsonb(p)::text, '|' order by p.id_pessoa), '')) from public.pessoas p
             where p.id_pessoa in (select id_pessoa from public.eventos where id_sessao like 'sessao-antes-%')) as h_pessoas,
           (select md5(coalesce(string_agg(to_jsonb(e)::text, '|' order by e.id_evento), '')) from public.eventos e
             where e.id_sessao like 'sessao-antes-%') as h_eventos`))).rows[0];
}

let codigo = 0;
try {
  await principal();
} catch (e) {
  conferir(false, 'erro inesperado: ' + String(e && e.message || e).split('\n')[0]);
}
await limparTudo();
const falhas = resultados.filter(x => !x.ok).length;
console.log('\n' + (falhas ? 'FALHOU: ' + falhas + ' de ' + resultados.length + ' conferências falharam' : 'Tudo certo: ' + resultados.length + ' de ' + resultados.length + ' conferências passaram'));
codigo = falhas ? 1 : 0;
process.exit(codigo);
