---
id: ensaio-prototipo-funil-01
versao: 9
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: banco-rascunho
    versao: 4
  - id: banco-migracao-001
    versao: 1
  - id: banco-conferir
    versao: 2
  - id: banco-catalogo-prototipo
    versao: 3
  - id: garcom
    versao: 4
  - id: prototipo-funil-01
    versao: 12
  - id: quiz-01-pagina
    versao: 5
  - id: landing-page-02
    versao: 4
  - id: planilha-sdr-funil-01
    versao: 2
  - id: lead-score
    versao: 3
  - id: decisoes
    versao: 9
  - id: regra-seguranca
    versao: 3
  - id: aviso-de-cookies
    versao: 2
  - id: politica-de-privacidade
    versao: 4
desatualizado: true
---

# Ensaio geral do protótipo do funil-01

Roda tudo junto, na máquina, sem nenhum serviço real: o banco, um Supabase de mentira, o site montado, o garçom, a landing e o quiz num navegador sem tela e a planilha do SDR com um Google de mentira. Serve para não ter surpresa quando o Otávio aplicar as mudanças no protótipo que está no ar (prompts/08-fila-da-madrugada.md, etapa 25; prompts/11-decisoes-de-09-11.md, etapa 35; o roteiro é entregas/prototipo-funil-01/APLICAR-11.md).

**Status.** Rascunho, pendente do Otávio. Continua desatualizado, porque se apoia em documentos marcados (banco-rascunho, banco-migracao-001, garcom, quiz-01-pagina, a landing-page-02, planilha-sdr-funil-01, o protótipo e, desde a v6, o aviso-de-cookies; regra 11.1).

**Protótipo de teste não é entrega.** O ensaio usa só leads de mentira (#102: nome começando por TESTE, e-mail @teste.invalid), só valores de mentira montados na hora e só o endereço 127.0.0.1. Nada vai ao ar, nada é publicado, ninguém faz login, e nada sai da máquina (ver "Rede").

**O que muda na versão 3 (etapa 35, 09/11/2026).** O ensaio parte do banco como ele está no Supabase (esquema v2, a linha do catálogo de antes e dados de antes, de teste, entre eles uma linha que imita a do Otávio) e roda a migração 001 duas vezes sobre esses dados; conferir.sql v2 (18 de 18); catálogo v2; garçom v4 com /api/evento (visita, início do quiz, clique no fim); a caixa de aceite única marcada e desmarcada; o corte mais restritivo; a faixa B com as respostas novas da planilha (leads-por-mes e crm); a planilha v2 com 20 colunas; fontes locais e nenhum pedido a terceiros, conferido também no Chromium inteiro e no wrangler; a conferência da landing que tinha ficado fora do repositório na etapa 34 (34.17). Opção nova `--esperar-margem`.

**O que muda na versão 4 (12/11/2026).** A landing do site agora é a landing-page-02, a página de vendas, em /, no lugar das duas variantes da landing-page-01; o /b/ saiu do site. O ensaio confere / e /quiz/, o estilo e o programa da landing-page-02 com charset, o catálogo v3 (com a linha landing-page-02, versão 1), a visita gravada como landing-page-02 e a ida ao quiz pelos dois botões de Análise (o do topo e o grande, em 1440 e em 375). As pessoas que entravam pelo /b/ entram pelo /, e a conferência pelo arquivo (file://) abre a landing-page-02.

**O que muda na versão 5 (12/11/2026, quiz-01-pagina v4).** O quiz abre direto na abertura, sem a capa: o ensaio entra no quiz pelo botão "Fazer a Análise" da abertura, sem o clique no cartão da capa, e confere na abertura a Inter, a Space Grotesk e a Geist (a do cabeçalho e do botão da landing-page-02, agora também no quiz). O resto não mudou.

**O que muda na versão 6 (12/11/2026, pedido 17, parte 17.2; decisão #116; prototipo-funil-01 v9).** O site montado já leva, em / e em /quiz/, o bloco da medição: o aviso de cookies e o Google Tag Manager (GTM-T6L4QTB8), que só carrega depois do "Aceitar" (entregas/prototipo-funil-01/README.md, "Medição"). As pessoas de teste da seção 6 continuam sem tocar no aviso, e tudo o que passava continua passando. Seção nova, a 9 ("Medição no site montado"), com as provas que só o ensaio faz, de ponta a ponta no workerd, em 375, 360 (com 640 de altura) e 1440: sem escolha e com "Recusar", nenhum pedido para fora de 127.0.0.1, na landing e no quiz; o aviso no topo, em fluxo normal, sem cobrir o "Fazer a Análise" do topo nem o botão grande da landing; "Recusar" pelo teclado, com o foco indo depois ao primeiro botão ou link desenhado na landing, nunca ao body; com "Aceitar" na landing, num contexto próprio que responde 404 a www.googletagmanager.com (como o Google, enquanto o contêiner não é publicado) sem tirar a trava de rede do resto, o pedido ao gtm.js do GTM-T6L4QTB8 é o primeiro e único para fora; a pagina_limpa e o endereço da barra saem sem o id_sessao (a landing aberta com um id_sessao no endereço, como quem volta do quiz); a escolha passa da landing para o quiz: clicando o botão da landing, o quiz abre sem o aviso e já pede o gtm.js, e o início do quiz leva o id_sessao que veio da landing, com o endereço, a pagina_limpa e a origem_limpa sem ele; no banco, a visita e o início do quiz da mesma sessão, sem pessoa. A seção vem depois da planilha (7) e dos casos de erro (8), para não atrasar a primeira busca da planilha, que conta com a margem de 1 minuto (21.6); o fechamento passa a ser a seção 10. A conferência "navegador · páginas: nenhum pedido para fora de 127.0.0.1" continua valendo para todos os contextos que não aceitaram; nos que aceitaram, o gtm.js é anotado à parte e conferido na seção 9, e qualquer outro pedido para fora continua contando nela. No celular, o "Fazer a Análise" do topo da landing-page-02 não é um `<button>` (o programa da landing o desenha como um bloco com data-name "Botão/Primário"): o ensaio confere que o aviso não o cobre por esse bloco e, no celular, vai ao quiz pelo botão grande, como a pessoa da seção 6 em 375.

**O que muda na versão 7 (13/11/2026, #117).** Três conferências novas, com o site da v11 do protótipo: /politica-de-privacidade/ abre (200) só com o texto para o lead, sem marcador {{...}}, sem anotação da equipe e com o aviso de cookies; o programa da landing-page-02 v2 não tem as perguntas 6 e 7 do FAQ nem nenhum "a definir"; o quiz-01 v5 não tem fato bloqueado e aponta a política para /politica-de-privacidade/. Duas mudaram: o título do quiz passa a ser o nome público da Análise (ficha-de-fatos#analise-nome-publico), e o "Recusar" pelo teclado na landing passa pelo link da política do aviso antes dos botões.

**O que muda na versão 8 (13/11/2026, pedido 18, parte 18.3; decisão #118; landing-page-02 v3).** A seção "Como funciona" e duas respostas do FAQ da landing-page-02 mudaram de texto, e o "Fazer a Análise" do cabeçalho passou a levar ao quiz também no celular. São 26 conferências novas. Cinco entram na seção 6, no programa montado da landing: nenhum texto antigo sobra ("Mentoria 1:1", "semanas 3, 7 e 13", "9 entregas", "45 dias", "gerente de safra", "Fase 4 · Entrega", "Semana 12", "Semanas 6 a 13", "Semanas 5 a 13"); cada texto novo com o número certo de cópias na versão do computador (22 textos, 33 cópias), na do celular (21 textos, 32 cópias; o controle "Arraste para ver as 8 entregas" só existe no computador) e nas definições dos cartões, escura e clara (17 textos, 50 cópias); e as duas respostas novas do FAQ, cada uma logo depois da sua pergunta, nas duas cópias. As outras 21 são da seção nova, a 10, sete por largura, em 1440, 375 e 360, na página aberta: o título, as quatro fases da régua e a legenda das Sessões de Comando; os oito cartões com o número, o rótulo da semana, a linha da fase e o título, e o 06 com a descrição nova; o cartão das Sessões de Comando sem número, com o título e as três linhas, e "Arraste para ver as 8 entregas" onde esse controle existe; as duas respostas do FAQ abertas; nenhum texto antigo à vista na página inteira, e "mentoria" só em "É mais uma mentoria?" e em "não mais um curso ou mentoria"; o "Fazer a Análise" do cabeçalho (um botão no computador, um bloco no celular) levando a /quiz/ com as utm e o id_sessao no formato do banco; e o botão grande, também. O contorno da v6 saiu: na seção 9, o ensaio vai ao quiz pelo "Fazer a Análise" do cabeçalho nas três larguras (até a v7, no celular, ia pelo botão grande, que continua conferido na seção 6, em 375, e agora na 10, em 375 e 360); se esse botão não levar ao quiz, as conferências saem FALHOU, em vez de o ensaio parar no meio. Os textos novos estão escritos no ensaio (LANDING_V3) só para conferir a página: quem manda é o pedido (prompts/18-como-funciona-landing-02.md, "Os textos aprovados"). O ensaio confere os textos, não o desenho: a régua sem rótulo cortado, os rótulos em uma linha e o alinhamento do cartão das Sessões foram medidos à parte, na 18.3 (prompts/18-como-funciona-landing-02-resposta.md), e estão nos prints de entregas/landings/landing-page-02/prints/. O fechamento passa a ser a seção 11.

**O que muda na versão 9 (13/11/2026, pedido 20, parte 20.3; decisão #119; landing-page-02 v4).** O GSAAS saiu da landing-page-02, duas respostas do FAQ e dois rótulos mudaram, o carrossel ficou com 9 cartões, os cartões do celular ficaram mais altos, a barra acesa da régua passou a terminar no fim da semana 2, e as chamadas do topo e do cartão da oferta passaram a levar ao quiz. São 31 conferências novas. Quatro entram na seção 6, no programa montado da landing: "GSAAS" em lugar nenhum, nem o cartão do GSAAS, nem o item e a tela "Agentes de IA" da demonstração; nenhum texto que o pedido 20 trocou ("Fase 1 · Análise", "Fechamento · 3ª Sessão de Comando" e um pedaço de cada resposta antiga do FAQ); as duas respostas do FAQ do pedido 20 ("Quem me atende depois que eu assinar?" e "E depois dos 90 dias?"), cada uma logo depois da sua pergunta, nas duas cópias; e o contador do carrossel com 9 estados, de "01 / 09" a "09 / 09", uma vez cada e nenhum outro, na versão do computador e na do celular. As outras 27 são da seção nova, a 11, nove por largura, em 1440, 375 e 360, na página aberta: o carrossel com 9 cartões em todos os estados e o contador dando a volta, seta a seta, de "01 / 09" a "09 / 09" e de volta ao começo; nenhum chip cortado em nenhum cartão, em nenhum estado; a barra acesa da régua terminando no fim da semana 2, sem se mexer com o carrossel; o FAQ com as 6 perguntas abertas e as duas respostas do pedido 20; a demonstração do produto, nos dois perfis, com o menu de 5 itens, sem "Agentes de IA", a troca de perfil abrindo a primeira tela do perfil e cada item do menu abrindo a sua tela (no celular, o menu mostra os itens de quem gere o time nos dois perfis, e do perfil do vendedor só a primeira tela é conferida); os dois rótulos novos à vista e nenhum texto que o pedido 20 trocou; "GSAAS" em nenhum texto à vista (a página como abre e com as 6 respostas abertas, os 9 estados do carrossel e os 10 cliques no menu da demonstração); a chamada do topo da página levando a /quiz/ com as utm e o id_sessao no formato do banco; e a do cartão da oferta, também. A saída prevista no pedido para a demonstração não foi usada (o item e a tela dos agentes de IA saíram): a conferência do "GSAAS" vale para a página inteira. As 199 conferências da v8 continuam, com o mesmo rótulo e na mesma ordem. Treze mudaram só de valor esperado, porque o pedido 20 trocou de propósito três textos que estão em LANDING_V3 (o rótulo da Fase 1, a linha da fase do cartão 08 e a resposta de "Quem me atende depois que eu assinar?"): na seção 6, as três das cópias (computador, celular e definições; as contagens de textos e de cópias ficam iguais) e a das duas respostas do FAQ; na seção 10, em cada largura, a das quatro fases da régua, a dos oito cartões e a do FAQ. Nenhuma conferência saiu nem ficou mais fraca. Os textos novos do pedido 20 estão escritos no ensaio (LANDING_V4, e os três que mudaram em LANDING_V3) só para conferir a página: quem manda é o pedido (prompts/20-gsaas-fora-da-landing.md, "Os textos aprovados"). Pela pergunta 18.3.5: o cabeçalho deste documento passa a declarar prototipo-funil-01 12, além de landing-page-02 4 e decisoes 9, e nucleo/ferramentas/README.md ganha a frase sobre as seções novas. O título da seção 10 deixa de dizer "v3"; o fechamento passa a ser a seção 12. A seção 11 mede três coisas de desenho (o chip dentro do cartão, o fim da barra e o item aceso do menu); o resto do desenho continua fora do ensaio (ver "Limitações").

## Um comando só

De dentro desta pasta:

```
npm run ensaio
```

Ou da raiz do repositório: `node nucleo/ferramentas/ensaio/ensaio.mjs`. Leva perto de 135 segundos (v9). Cada conferência sai com OK ou FALHOU; no fim, "Tudo certo: N de N" e código 0, ou "FALHOU: ..." e código 1.

Precisa de quatro instalações, todas dentro de nucleo/ferramentas/ (node_modules fica fora do Git): `npm install` nesta pasta (PGlite), em ../prototipo/ (wrangler), em ../prints/ (playwright-core; o Chromium vem do cache do Playwright da máquina, como na ferramenta de prints) e em ../fontes/ (as fontes que o montador põe no site).

Opções:

- `--sem-wrangler` (ou `npm run ensaio:sem-wrangler`): contorno, se o wrangler não subir; roda o garçom num servidor Node (ver "Limitações"). O ensaio também passa para esse contorno sozinho se o wrangler não responder em cerca de 1 minuto, e diz isso na saída; nesse caso a conferência "wrangler dev no ar" fica FALHOU e o ensaio termina com código 1, para ninguém achar que o Worker foi conferido (25.7).
- `--esperar-margem`: em vez do contorno da margem de 1 minuto da planilha (abaixo), espera a margem de verdade. Leva perto de 1 minuto a mais.

## O que tem dentro

| Arquivo | O que é |
|---|---|
| ensaio.mjs | O ensaio: liga tudo, confere tudo, desliga tudo |
| supabase-de-mentira.mjs | Um servidor em 127.0.0.1 que imita o pedaço da API do Supabase que o garçom usa |
| planilha-no-ensaio.mjs | Roda o Apps Script da planilha (Codigo.gs) com o Google de mentira de entregas/planilha-sdr-funil-01/teste/falsos.mjs, num processo à parte |
| rede-so-local.cjs | A trava de rede do wrangler no ensaio: recusa e anota todo pedido para fora da máquina (ver "Rede") |
| package.json | O PGlite como dependência de desenvolvimento e os scripts `ensaio` e `ensaio:sem-wrangler` |

## O que o ensaio faz

1. **Banco v2, como está no Supabase.** Um Postgres que roda dentro do Node (PGlite 0.5.15, PostgreSQL 18.6), só na memória. Cria de mentira os papéis do Supabase: anon, authenticated, service_role (que passa por cima da RLS, como no Supabase) e **dono**, no lugar do postgres do Supabase (dono das tabelas, sem ser superusuário). Para conferir o pior caso, o dono começa com as permissões padrão que o Supabase daria (tudo para anon, authenticated e service_role no que ele criar). Aplica dados/banco/esquema.sql (v2) como o dono, duas vezes, e confere que conferir.sql v2 avisa que falta a migração (false nas linhas 4, 8 e 14 a 18, "11 de 18"). Grava a linha do catálogo que o banco do protótipo já tem (quiz-01, versão 1) e os **dados de antes**, pela porta do v2 (registrar_fim_quiz com a chave publicável), do jeito da página v2 (quiz-01 versão 1, lead score versão 2), como os do teste de 09/11 (prompts/10-prototipo-ligado.md): uma linha que **imita a do Otávio** (faixa a, nota 86, utm stories, os dois aceites; nome TESTE e e-mail @teste.invalid, nada dela é real), uma faixa a com a empresa "=1+1", um eliminatório e uma pessoa com dois envios. Esses dados são atrasados 6 horas (o mesmo contorno da seção 7), como se tivessem chegado de manhã.
2. **Migração 001 duas vezes sobre os dados.** dados/banco/migracoes/001-v3.sql pelo dono, duas vezes: sem erro, cada linha de pessoas, eventos e entregas igual antes e depois (o campo novo clique_fim_quiz fica de fora da comparação e nasce vazio), e a segunda rodada deixa restrições, colunas, funções e permissões iguais às da primeira. conferir.sql v2: **18 de 18**. Depois troca de papel (SET ROLE) e tenta de verdade: anon executa registrar_fim_quiz e registrar_evento e nada mais; anon não lê tabela nem visão, não grava direto e não chama leads_para_planilha; authenticated não pode nada; service_role chama leads_para_planilha e nada mais; um papel qualquer, sem permissão dada, também não executa nada (PUBLIC).
3. **Supabase de mentira** em 127.0.0.1, porta livre (supabase-de-mentira.mjs). Recebe `POST /rest/v1/rpc/<funcao>` e, para os casos de erro, `GET` e `POST /rest/v1/<tabela>`. Lê o cabeçalho apikey: a chave publicável de mentira vira o papel anon, a secreta de mentira vira service_role; sem chave ou com chave desconhecida, 401. Cada pedido roda numa transação com SET LOCAL ROLE, como o PostgREST, e os erros do Postgres viram status parecidos com os do PostgREST: permissão negada é 401 para anon e 403 para os outros; chave estrangeira é 409; função que não existe é 404; restrição (CHECK) e pacote fora do formato (22023) são 400. O PGlite tem uma conexão só: os pedidos entram numa fila e rodam um de cada vez. A função da planilha v3, chamada com a secreta, já devolve os 3 leads de antes (faixas a e b), com o campo do clique.
4. **Site e garçom.** Roda entregas/prototipo-funil-01/montar-site.mjs e confere que ele termina dizendo que nenhuma página pede arquivo a outro endereço e que as fontes estão ao lado das páginas. Copia entregas/prototipo-funil-01/wrangler.toml para uma pasta temporária **fora do repositório**, com só quatro trocas: os caminhos de main e de assets ficam absolutos, SUPABASE_URL aponta para o Supabase de mentira e ORIGEM_PERMITIDA para o endereço local. Confere que a cópia não tem endereço real (supabase.co, workers.dev). Os três segredos, de mentira, vão num arquivo dessa pasta temporária (`--env-file`), nunca num .dev.vars do repositório. Liga `wrangler dev --local` (workerd, o mesmo motor do Workers) em 127.0.0.1, com a trava de rede (ver "Rede"). Confere / e /quiz/ com noindex, Content-Type com charset utf-8 e meta charset nos primeiros 1024 bytes, o estilo e o programa da landing-page-02 com charset (v4), uma rota /api/ desconhecida com 404 e o OPTIONS em /api/evento com 405, sem CORS (22.2).
5. **Catálogo v3** (23.10, 32.4, 34.4). Sem as linhas novas, o fim do quiz da página nova (quiz-01, 2), a visita (landing-page-02, 1) e o início do quiz (quiz-01, 2) são recusados pela chave estrangeira (409 no banco, 422 no garçom), e nada novo fica no banco; outra origem dá 403. Depois aplica **dados/banco/catalogo-prototipo.sql** (v3), o mesmo arquivo que o APLICAR-11.md manda o Otávio rodar, duas vezes: quatro linhas, sem duplicar, e a linha antiga (quiz-01, 1) com a mesma data.
6. **Landing e quiz no navegador sem tela** (playwright-core e o Chromium do cache). Cinco pessoas de teste, cada uma entrando pela landing-page-02 e clicando num botão de Análise:
   - **TESTE Marina Ensaio**: landing-page-02 (/), pelo botão do topo ("Fazer a Análise"), `utm_source=bio&utm_campaign=funil-01`, 1440, o exemplo do lead score (nota 96, faixa a), caixa marcada, tela do plano;
   - **TESTE Paulo Ensaio**: landing-page-02 (/), pelo botão grande ("Faça uma Análise Estratégica..."), `utm_source=stories`, 375, eliminatório, caixa marcada, clique "Tenho interesse";
   - **TESTE Carla Ensaio**: o **corte mais restritivo** (14.2): faixa c que passa no corte do Júnior (nota 24); até a página v2 ia para o plano, agora vai para o relatório de quem não se qualifica; clique "Tenho interesse";
   - **TESTE Bia Ensaio**: faixa b com o funil todo na meta (nota 68), relatório do funil saudável, clique "Quero marcar uma conversa";
   - **TESTE Davi Ensaio**: as mesmas respostas da Bia, com a **caixa desmarcada**, e o mesmo clique.

   Confere, no navegador: a visita gravada (201) ao abrir a landing, a landing e o quiz no modo padrão (CSS1Compat; 34.13, 09.1) e em UTF-8, o título com os acentos certos, a Geist na landing e a Inter, a Space Grotesk e a Geist na abertura do quiz (v5; a Permanent Marker fica para o relatório), carregadas do site (10.7); os dois botões levam a /quiz/ com as utm e o id_sessao no formato do banco; o início do quiz gravado ao abrir; uma caixa de aceite só, já marcada (13.4); o fim do quiz e o clique gravados (201) e sem aviso de falha; com a caixa desmarcada, nenhum POST /api/fim-quiz e nenhum clique, o diagnóstico na tela. Da conferência da landing que estava fora do repositório (34.17), o que não se repete acima: com /api/evento fora do ar, o botão continua levando ao quiz com a utm e a sessão (10.10); aberta pelo arquivo (file://), a landing-page-02 não manda nada. O console das páginas, sem dado de pessoa. Desde a v8, no programa montado da landing-page-02 (v3; #118): nenhum texto antigo da seção "Como funciona" e do FAQ; cada texto novo com as cópias certas na versão do computador, na do celular e nas definições dos cartões; e as duas respostas novas do FAQ nas duas cópias. Desde a v9, no mesmo programa (v4; #119): "GSAAS" em lugar nenhum, nem o que saiu com ele; nenhum texto que o pedido 20 trocou; as duas respostas do FAQ do pedido 20 nas duas cópias; e o contador do carrossel com 9 estados nas duas versões da seção.

   Confere, no banco: o lead A com nome TESTE, telefone como a página mandou, os dois consentimentos "sim" pela caixa única com a data e o texto aceito com os acentos certos (o combinado, a política de privacidade e a caixa, iguais aos da página; #104); fim do quiz com nota 96, faixa a, lead score versão 3, quiz-01 versão 2, a sessão vinda da landing e as respostas; a sessão do lead A com visita (landing-page-02, versão 1, utm bio), início do quiz (quiz-01, versão 2, sem nota nem respostas) e fim do quiz, nessa ordem, a visita e o início ligados à pessoa pelo fim do quiz da mesma sessão (6.2); o eliminatório com a nota e o clique tenho-interesse ligado pela sessão (18.4; 32.2); a faixa c do corte com o clique; a faixa b com nota 68, o clique quero-conversa e as respostas com o CRM e a linha "Leads por mês"; da desmarcada, nenhuma pessoa, nenhum fim do quiz e nenhum clique, só a visita e o início do quiz, sem pessoa (34.18); 4 pessoas e 4 fins de quiz novos, nada a mais.
7. **Planilha do SDR.** Em outro processo (o UrlFetchApp de mentira é síncrono e trava a linha principal de quem chama), roda instalar() e buscar_() de Codigo.gs v2 contra o garçom local, pela porta privada, com a CHAVE_PLANILHA de mentira, numa aba nova, como depois de renomear a antiga (planilha-sdr-funil-01, "Atualizar da versão 1"). Confere: as 20 colunas na ordem, com clique_fim_quiz na 13; a primeira busca, logo depois do quiz, traz **só os 3 leads de antes** (a linha que imita a do Otávio, a faixa a com "=1+1" e a pessoa dos dois envios, uma vez só), e nenhum dos novos (a margem de 1 minuto do banco, 21.6); depois do contorno da margem (abaixo), 2 linhas novas, o lead A e a faixa b, na ordem de chegada; a linha do lead A com os valores certos e o clique vazio; a da faixa b com respostas_a_confirmar trazendo **leads-por-mes: 200** e **crm** (15.4) e clique_fim_quiz **quero-conversa** (18.4); a linha que imita a do Otávio com faixa a e nota 86; o eliminatório, a faixa c, a desmarcada e o eliminatório de antes fora; rodar de novo não duplica; com o cursor perdido, também não; o registro da planilha sem dado pessoal; com a chave errada, 401 e nada gravado.
8. **Casos de erro.** Chave publicável lendo tabela, visão, gravando direto ou chamando leads_para_planilha pelo Supabase de mentira: 401. Chave secreta lendo tabela, gravando o fim do quiz ou um evento: 403. Porta privada do garçom com a chave da planilha errada, sem chave ou com a publicável no lugar: 401 sem detalhe; com a certa, os 5 leads. Pacote sem consentimento: o garçom recusa (422) sem chamar o banco, e a função chamada direto com a publicável também recusa (400, restrição 23514). Clique numa sessão sem fim do quiz: o banco recusa e o garçom responde 422 (32.2). /api/evento com pessoa no pacote: 422 sem chamar o banco. A mesma pessoa enviando duas vezes ao mesmo tempo: uma pessoa só no banco e dois eventos.
9. **Medição no site montado** (v6; #116), em 375, 360 e 1440. Por largura, dois contextos. No primeiro, sem escolha: a landing-page-02 com o aviso no topo, primeiro filho do body, em fluxo normal, com o texto do aviso-de-cookies, sem rolagem para o lado e com o link "Cookies" no fim; o aviso não cobre o "Fazer a Análise" do topo nem o botão grande (retângulos separados e, no centro do botão, o próprio botão); "Recusar" pelo teclado (o segundo Tab, depois o Enter) leva o foco ao primeiro botão ou link desenhado na landing depois do aviso, nunca ao body, e guarda "recusado", e o quiz, aberto pelo "Fazer a Análise" do cabeçalho (v8: nas três larguras), abre sem o aviso e sem nada do Google na camada de dados; e, do começo ao fim, nenhum pedido para fora de 127.0.0.1. No segundo, que responde 404 ao Google: a landing aberta com um id_sessao no endereço; "Aceitar" faz do gtm.js do GTM-T6L4QTB8 o primeiro e único pedido para fora; a pagina_limpa e o endereço da barra saem sem o id_sessao, e só a análise é concedida; pelo botão da landing, o quiz abre sem o aviso, já pede o gtm.js (só ao Google), e o início do quiz leva o id_sessao da ida, com o endereço, a pagina_limpa e a origem_limpa sem ele. No banco, a visita e o início do quiz de cada uma dessas três sessões, com a mesma sessão e sem pessoa.
10. **A seção "Como funciona" e o FAQ da landing-page-02 na página aberta** (v8; #118; desde a v9, com os três textos que o pedido 20 trocou), em 1440, 375 e 360. Em 1440 aparece a versão do computador; em 375 e 360, a do celular. Os textos são comparados sem olhar maiúsculas, porque a página escreve alguns rótulos em caixa alta. Por largura: o título, as quatro fases da régua, na ordem, e a legenda; os oito cartões, cada um com o número, o rótulo da semana, a linha da fase e o título em sequência, e o 06 com a descrição nova; o cartão das Sessões de Comando sem número antes de "Do começo ao fim", sem nenhum "09" na seção, com o título e as três linhas, e o controle "Arraste para ver as 8 entregas" no computador (no celular ele não existe); as duas respostas do FAQ (a primeira já vem aberta; a segunda abre com um clique); a página inteira, lida como abre e com as duas respostas abertas, sem nenhum texto antigo e com "mentoria" só nos dois lugares permitidos (#53); o "Fazer a Análise" do cabeçalho e, numa página nova, o botão grande, cada um levando a /quiz/ com utm_source, utm_campaign e o id_sessao no formato do banco. Não grava pessoa: só visitas e inícios do quiz.
11. **A landing-page-02 v4 na página aberta** (v9; #119), em 1440, 375 e 360. Uma página por largura, com o aviso de cookies sem escolha, e uma página nova para cada chamada. Por largura: o carrossel, lido depois de cada clique na seta de avançar (o primeiro clique segura o avanço sozinho, que só volta 8 segundos depois do último clique, 10 no celular), com 9 cartões na trilha em todos os estados e o contador somando um a cada clique, do "09 / 09" de volta ao "01 / 09", até fechar a volta; em cada estado, cada chip de "Peças que instala" inteiro dentro do seu cartão, que corta o que passa da borda (28 chips em 9 cartões); o fim da barra acesa da régua a menos de 1 px do meio entre os rótulos S2 e S3, antes e depois da volta do carrossel; as 6 perguntas do FAQ abertas (a aberta mostra o sinal de menos), com as duas respostas do pedido 20 (na página, o ensaio procura cada resposta dentro do texto da pergunta aberta; a resposta exata, sem nada a mais, é exigida na seção 6, no programa); a demonstração do produto, nos dois perfis: o menu com os 5 itens esperados (no celular, o menu mostra os itens de quem gere o time também no perfil do vendedor, e o ensaio aceita as duas listas; pergunta 20.2.3), nenhum "Agentes de IA", a troca de perfil abrindo a primeira tela do perfil (no celular, é a única conferência das telas do vendedor, que não têm item no menu: os cinco itens clicados nos dois perfis são os de quem gere o time, e são 6 telas diferentes abertas, contra 10 no computador; pergunta 20.3.5), e cada item, clicado, abrindo a tela de mesmo nome, com o item aceso e um conteúdo diferente do das outras telas (um clique segura o avanço sozinho da demonstração por 12 segundos); os dois rótulos novos na seção (o da Fase 1 duas vezes, na régua e no cartão 01) e nenhum texto que o pedido 20 trocou, em nenhuma leitura; "GSAAS" e "Agentes de IA" em nenhuma das 22 leituras de texto à vista (a página como abre, os 10 estados lidos do carrossel, a página com o FAQ aberto e os 10 cliques no menu da demonstração); e a chamada do topo da página (um botão no computador, um bloco no celular) e a do cartão da oferta (um bloco nas três larguras), cada uma levando a /quiz/ com utm_source, utm_campaign e o id_sessao no formato do banco. Não grava pessoa: só visitas e inícios do quiz.
12. **Fechamento.** conferir.sql de novo (18 de 18); os dados de antes iguais no fim; a saída do garçom sem dado pessoal, sem id_pessoa e sem chave; o garçom tendo usado só a publicável em registrar_fim_quiz e registrar_evento e só a secreta em leads_para_planilha; e a rede (abaixo).

No fim, e também se algo falhar no meio ou se o ensaio for interrompido (Ctrl+C), fecha o navegador, o wrangler e o workerd (o grupo de processos inteiro), o processo da planilha, os servidores e o banco, e apaga a pasta temporária. O navegador é aberto sem os tratadores de sinal do Playwright (handleSIGINT, handleSIGTERM e handleSIGHUP desligados), senão ele encerraria o processo antes da limpeza.

## O contorno da margem de 1 minuto

leads_para_planilha só devolve fins de quiz gravados há mais de 1 minuto (21.6). Para não esperar, o ensaio, depois de conferir que a primeira busca não traz os leads novos, faz como o superusuário do PGlite, numa sessão só: liga `session_replication_role = replica` (que desliga os gatilhos só nessa sessão), atrasa em 2 minutos o gravado_em dos 4 fins de quiz novos de teste, e volta para `origin`. O esquema não muda e a trava não é desligada na tabela: logo depois, o ensaio confere que o gatilho continua ligado e que apagar evento é recusado. O mesmo contorno, com 6 horas, deixa os dados de antes com cara de dados da manhã (seção 1).

O que o contorno pula: a espera de verdade e a conta da margem com o relógio de verdade. Para isso existe `--esperar-margem`: o ensaio espera até 65 segundos depois do último fim do quiz novo, sem mexer no banco, e a segunda busca tem de trazer as mesmas 2 linhas.

**A planilha com 0 leads na revisão da etapa 34.** O revisor da etapa 34 viu a planilha voltar 0 leads logo depois de gravar um lead de faixa A. Conferido nesta etapa: é a margem de 1 minuto, e não defeito. No ensaio, a primeira busca logo depois do quiz não traz o lead novo, e, com `--esperar-margem` (espera de verdade, 48 segundos na rodada), a busca seguinte traz o lead A e a faixa b, sem nenhuma mudança no banco, no garçom nem no Codigo.gs. Nada foi corrigido, porque nada estava errado. No Supabase, o lead aparece na planilha de 1 a 6 minutos depois do quiz (a margem mais o gatilho de 5 minutos; 21.6).

## Rede

O ensaio confere em três lugares que nada sai da máquina:

- **As páginas.** Todo pedido do navegador para um endereço que não seja 127.0.0.1 é bloqueado e anotado. Desde a v3, nada deve tentar sair: as fontes vêm do site (10.7). Conferência: nenhum pedido. Desde a v6, só nos contextos da seção 9 que aceitam o aviso de cookies, o pedido a www.googletagmanager.com é anotado à parte e respondido pelo próprio ensaio com 404, dentro do navegador, sem conexão; ele é conferido na seção 9 (o gtm.js do GTM-T6L4QTB8, primeiro e único), e qualquer outro pedido para fora, também nesses contextos, continua contando aqui. No registro de rede do Chromium, www.googletagmanager.com aparece numa linha INFO própria, separada das tentativas de fundo.
- **O Chromium inteiro.** O próprio Chromium, por conta dele, tenta falar com o Google em segundo plano (atualização, conta, mensagens), mesmo sem a página pedir nada: na primeira rodada desta etapa, sem trava, um vigia externo (lsof) viu o processo do Chromium do ensaio conectado a endereços do Google. Agora o navegador é aberto com todo nome que não seja 127.0.0.1 virando "não encontrado" (`--host-resolver-rules`) e com todo pedido de fora mandado para um proxy que não existe (`--proxy-server=http://127.0.0.1:9`); o registro de rede do Chromium (netlog), na pasta temporária, é lido no fim. Conferência: nenhuma conexão TCP fora de 127.0.0.1. Linhas INFO mostram as tentativas de fundo recusadas (clients2.google.com, accounts.google.com, www.google.com, update.googleapis.com, android.clients.google.com) e uma "conexão" UDP ao endereço [2001:4860:4860::8888]:443, que é o teste de IPv6 do Chromium: ele só abre o UDP para descobrir o endereço local da máquina, sem mandar dado.
- **O wrangler.** Na mesma primeira rodada, o vigia viu o wrangler conectado a workers.cloudflare.com: é o miniflare buscando o cf.json (os dados de localização que o Workers põe no pedido). Agora o wrangler sobe com CLOUDFLARE_CF_FETCH_ENABLED=false, WRANGLER_HIDE_BANNER=true (sem a procura de versão nova no registro do npm), WRANGLER_SEND_METRICS=false e DO_NOT_TRACK=1, e com a trava rede-so-local.cjs carregada em todo processo Node dele (NODE_OPTIONS=--require): todo pedido de nome ou conexão para fora da máquina é recusado e anotado. Conferência: nenhuma tentativa. Prova de que a trava pega: rodado uma vez sem os quatro avisos, a conferência deu FALHOU com workers.cloudflare.com.

Nas duas rodadas finais, o vigia externo (lsof a cada meio segundo nos processos do wrangler, do workerd, do Chromium e do ensaio; script fora do repositório) não viu nenhuma conexão fora de 127.0.0.1.

## Resultado do ensaio

**v9 (13/11/2026, pedido 20, parte 20.3).** Rodado inteiro, com o wrangler dev, numa máquina Linux na nuvem, duas vezes seguidas: **230 de 230**, em 132 e 136 segundos. Depois da revisão independente, a conferência da demonstração passou a exigir também que a troca de perfil abra a primeira tela do perfil, e o rótulo dela e o da leitura do "GSAAS" passaram a dizer o que fazem no celular; mais duas rodadas, **230 de 230**, em 137 e 141 segundos (as duas provas abaixo são de antes desse reforço, que não toca no que elas mudam). São as 199 da v8, todas de pé, com o mesmo rótulo (13 com o valor esperado trocado pelo pedido 20), mais 31: 4 na seção 6 e 27 na seção 11 (9 por largura). O modo `--sem-wrangler` não foi rodado (pergunta 18.3.3, que fica para um pedido futuro). Antes desta versão, a v8, sem edição, dava 186 de 199 sobre a landing-page-02 v4: as 13 que falhavam esperavam os textos que o pedido 20 trocou de propósito. Duas provas de que as conferências novas pegam o erro, cada uma com uma mudança de propósito num arquivo da landing, desfeita pelo Git (`git checkout --`) e conferida por SHA-256 contra o arquivo do commit da 20.2 (726c432):

- **A frase antiga de "E depois dos 90 dias?".** A resposta antiga ("... Quem quiser continuar tem o GSAAS, opcional: a gente mantém o CRM e o painel e coloca os agentes de IA para trabalhar.") devolvida só à cópia do celular de assets/index-BSwcbsoR.js: **9 FALHOU** de 230. Na seção 6, "GSAAS em lugar nenhum" (sobrou "GSAAS"), "nenhum texto que o pedido 20 trocou" (sobrou "Quem quiser continuar tem") e "as duas respostas do FAQ do pedido 20, nas duas cópias"; na seção 11, em 375 e em 360, a do FAQ, a dos textos trocados e a do "GSAAS" à vista (apareceram "GSAAS" e "Agentes de IA"). Em 1440, tudo passou, porque a cópia do computador estava certa. Arquivo de volta com o SHA-256 do commit (cc58b5ed...05fe4d060).
- **O conserto das chamadas.** A linha do programa do fim de pagina/index.html voltou ao que era antes da v4 (só o bloco do cabeçalho leva ao quiz): **5 FALHOU** de 230. Na seção 11, a chamada do cartão da oferta em 1440, 375 e 360, e a do topo da página em 375 e 360, onde ela é um bloco. A do topo em 1440, que é um botão, passou, e o "Fazer a Análise" do cabeçalho no celular continuou levando ao quiz (seções 9 e 10 inteiras). Arquivo de volta com o SHA-256 do commit (b522b8fe...34a217e3c).

Uma terceira rodada de prova, a mais: com o programa e o index.html da landing como estavam antes da 20.2 (commit 632bd0e), **42 FALHOU** de 230: as 13 que a v8 já acusava e 29 das 31 novas. Só passaram, das novas, "nenhum chip cortado" em 1440 e a chamada do topo em 1440, que já eram verdade antes (no computador os chips cabiam, e a chamada do topo é um botão). Nessa rodada, a conferência dos chips acusou, em 375 e em 360, o chip do cartão 03, os dois do 06 e o das Sessões de Comando, que são os cortes medidos na 18.3. Os dois arquivos voltaram com o SHA-256 do commit.

Saída das conferências novas (segunda rodada):

```
OK     · landing · programa: "GSAAS" não aparece em lugar nenhum, nem o cartão do GSAAS, nem o item e a tela "Agentes de IA" da demonstração (GSAAS | Gestão de Safra as a Service | Depois dos 90 dias · opcional | Do relatório, a próxima safra já começa lida | Agentes trabalhando agora | Os agentes entram no) (v9; landing-page-02 v4)
OK     · landing · programa: nenhum texto que o pedido 20 trocou (Fase 1 · Análise | Fechamento · 3ª Sessão de Comando | o Junior e o Euclides conduzem a call semanal em grupo | Quem quiser continuar tem) (v9)
OK     · landing · programa: as duas respostas do FAQ do pedido 20 ("Quem me atende depois que eu assinar?" e "E depois dos 90 dias?"), cada uma logo depois da sua pergunta, nas duas cópias (a do computador e a do celular) (v9)
OK     · landing · programa: o contador do carrossel tem 9 estados, de "01 / 09" a "09 / 09", uma vez cada e nenhum outro, na versão do computador e na do celular (v9)

· 11. A landing-page-02 v4 na página aberta: sem o GSAAS, com o carrossel de 9 cartões, a régua, o FAQ, a demonstração e as chamadas (#119)
OK     · landing v4 1440 · o carrossel tem 9 cartões em todos os estados, e o contador, seta a seta, dá a volta de "01 / 09" a "09 / 09" e de volta ao começo (02 > 03 > 04 > 05 > 06 > 07 > 08 > 09 > 01 > 02; cartões na trilha: 9)
OK     · landing v4 1440 · nenhum chip cortado em nenhum cartão do carrossel, em nenhum estado (28 chips em 9 cartões, cada um inteiro dentro do seu cartão)
OK     · landing v4 1440 · a barra acesa da régua termina no fim da semana 2, o meio entre S2 e S3, e não se mexe com o carrossel (passa -0,01 px, com semanas de 83,1 px; depois da volta: passa -0,01 px, com semanas de 83,1 px)
OK     · landing v4 1440 · FAQ: as 6 perguntas abertas, e "Quem me atende depois que eu assinar?" e "E depois dos 90 dias?" com as respostas do pedido 20
OK     · landing v4 1440 · demonstração do produto: nos dois perfis, o menu com os 5 itens, sem "Agentes de IA", a troca de perfil abre a primeira tela do perfil, e cada item do menu abre a sua tela, com o item aceso (10 de 10 cliques no menu; 10 telas diferentes abertas)
OK     · landing v4 1440 · os dois rótulos novos à vista ("Fase 1 · Ponto de partida", na régua e no cartão 01, e "Encerramento · 3ª Sessão de Comando", no cartão 08), e nenhum texto que o pedido 20 trocou
OK     · landing v4 1440 · "GSAAS" não aparece em nenhum texto à vista, nem "Agentes de IA": a página como abre e com as 6 respostas do FAQ abertas, os 9 estados do carrossel e os 10 cliques no menu da demonstração (22 leituras)
OK     · landing v4 1440 · a chamada do topo da página ("Faça uma Análise Estratégica...", um botão) leva a /quiz/ com utm_source=bio, utm_campaign=funil-01 e id_sessao no formato do banco
OK     · landing v4 1440 · a chamada do cartão da oferta ("Faça uma Análise Estratégica...", um bloco, não um botão) leva a /quiz/ com utm_source=bio, utm_campaign=funil-01 e id_sessao no formato do banco
OK     · landing v4 375 · o carrossel tem 9 cartões em todos os estados, e o contador, seta a seta, dá a volta de "01 / 09" a "09 / 09" e de volta ao começo (02 > 03 > 04 > 05 > 06 > 07 > 08 > 09 > 01 > 02; cartões na trilha: 9)
OK     · landing v4 375 · nenhum chip cortado em nenhum cartão do carrossel, em nenhum estado (28 chips em 9 cartões, cada um inteiro dentro do seu cartão)
OK     · landing v4 375 · a barra acesa da régua termina no fim da semana 2, o meio entre S2 e S3, e não se mexe com o carrossel (passa 0,01 px, com semanas de 53,4 px; depois da volta: passa 0,01 px, com semanas de 53,4 px)
OK     · landing v4 375 · FAQ: as 6 perguntas abertas, e "Quem me atende depois que eu assinar?" e "E depois dos 90 dias?" com as respostas do pedido 20
OK     · landing v4 375 · demonstração do produto: nos dois perfis, o menu com os 5 itens, sem "Agentes de IA", a troca de perfil abre a primeira tela do perfil, e cada item do menu abre a sua tela, com o item aceso (10 de 10 cliques no menu; 6 telas diferentes abertas: no celular, o menu mostra os itens de quem gere o time nos dois perfis, e do perfil do vendedor só a primeira tela é conferida)
OK     · landing v4 375 · os dois rótulos novos à vista ("Fase 1 · Ponto de partida", na régua e no cartão 01, e "Encerramento · 3ª Sessão de Comando", no cartão 08), e nenhum texto que o pedido 20 trocou
OK     · landing v4 375 · "GSAAS" não aparece em nenhum texto à vista, nem "Agentes de IA": a página como abre e com as 6 respostas do FAQ abertas, os 9 estados do carrossel e os 10 cliques no menu da demonstração (22 leituras)
OK     · landing v4 375 · a chamada do topo da página ("Faça uma Análise Estratégica...", um bloco, não um botão) leva a /quiz/ com utm_source=bio, utm_campaign=funil-01 e id_sessao no formato do banco
OK     · landing v4 375 · a chamada do cartão da oferta ("Faça uma Análise Estratégica...", um bloco, não um botão) leva a /quiz/ com utm_source=bio, utm_campaign=funil-01 e id_sessao no formato do banco
OK     · landing v4 360 · o carrossel tem 9 cartões em todos os estados, e o contador, seta a seta, dá a volta de "01 / 09" a "09 / 09" e de volta ao começo (02 > 03 > 04 > 05 > 06 > 07 > 08 > 09 > 01 > 02; cartões na trilha: 9)
OK     · landing v4 360 · nenhum chip cortado em nenhum cartão do carrossel, em nenhum estado (28 chips em 9 cartões, cada um inteiro dentro do seu cartão)
OK     · landing v4 360 · a barra acesa da régua termina no fim da semana 2, o meio entre S2 e S3, e não se mexe com o carrossel (passa 0,00 px, com semanas de 51,3 px; depois da volta: passa 0,00 px, com semanas de 51,3 px)
OK     · landing v4 360 · FAQ: as 6 perguntas abertas, e "Quem me atende depois que eu assinar?" e "E depois dos 90 dias?" com as respostas do pedido 20
OK     · landing v4 360 · demonstração do produto: nos dois perfis, o menu com os 5 itens, sem "Agentes de IA", a troca de perfil abre a primeira tela do perfil, e cada item do menu abre a sua tela, com o item aceso (10 de 10 cliques no menu; 6 telas diferentes abertas: no celular, o menu mostra os itens de quem gere o time nos dois perfis, e do perfil do vendedor só a primeira tela é conferida)
OK     · landing v4 360 · os dois rótulos novos à vista ("Fase 1 · Ponto de partida", na régua e no cartão 01, e "Encerramento · 3ª Sessão de Comando", no cartão 08), e nenhum texto que o pedido 20 trocou
OK     · landing v4 360 · "GSAAS" não aparece em nenhum texto à vista, nem "Agentes de IA": a página como abre e com as 6 respostas do FAQ abertas, os 9 estados do carrossel e os 10 cliques no menu da demonstração (22 leituras)
OK     · landing v4 360 · a chamada do topo da página ("Faça uma Análise Estratégica...", um bloco, não um botão) leva a /quiz/ com utm_source=bio, utm_campaign=funil-01 e id_sessao no formato do banco
OK     · landing v4 360 · a chamada do cartão da oferta ("Faça uma Análise Estratégica...", um bloco, não um botão) leva a /quiz/ com utm_source=bio, utm_campaign=funil-01 e id_sessao no formato do banco
```

**v8 (13/11/2026, pedido 18, parte 18.3).** Rodado inteiro, com o wrangler dev, numa máquina Linux na nuvem, duas vezes seguidas: **199 de 199**, em 104 e 103 segundos. São as 173 da v7, todas de pé, mais 26: 5 na seção 6 e 21 na seção 10 (7 por largura). O modo `--sem-wrangler` não foi rodado: ele já falhava no passo 6 antes deste pedido (prompts/18-como-funciona-landing-02-resposta.md, pergunta 18.3.3). Duas provas de que as conferências novas pegam o erro, cada uma com uma mudança de propósito num arquivo da landing, desfeita pelo Git (`git checkout --`) e conferida por SHA-256 contra o arquivo do commit:

- **Uma cópia antiga no programa.** A resposta antiga de "É mais uma mentoria?" ("Não. A mentoria é uma das 9 entregas...") devolvida só à cópia do celular de assets/index-BSwcbsoR.js: **6 FALHOU** de 199. Na seção 6, "nenhum texto antigo" (sobrou "9 entregas") e "as duas respostas novas do FAQ, nas duas cópias"; na seção 10, em 375 e em 360, a do FAQ e a da página inteira (sobrou "9 entregas" e apareceu "mentoria" fora dos dois lugares permitidos). Em 1440, tudo passou, porque a cópia do computador estava certa. Arquivo de volta com o SHA-256 do commit (091b703a...8242af).
- **O botão do cabeçalho.** A mudança da v3 desfeita no programa do fim de pagina/index.html (o clique volta a valer só para `<button>`): **9 FALHOU** de 199. Na seção 10, em 375 e em 360, "o 'Fazer a Análise' do cabeçalho (um bloco, não um botão) leva a /quiz/"; na seção 9, em 375 e em 360, as três que dependem de chegar ao quiz por esse botão; e a do banco, que ficou com uma sessão só. Em 1440, tudo passou. Arquivo de volta com o SHA-256 do commit (60a37d37...82ef465).

Saída das conferências novas (segunda rodada):

```
OK     · landing · programa: nenhum texto antigo da seção "Como funciona" e do FAQ (Mentoria 1:1 | semanas 3, 7 e 13 | 9 entregas | 45 dias | gerente de safra | Fase 4 · Entrega | Semana 12 | Semanas 6 a 13 | Semanas 5 a 13) (v8; landing-page-02 v3)
OK     · landing · programa, versão do computador: os textos novos da seção "Como funciona" com as cópias certas (22 textos, 33 cópias) (v8)
OK     · landing · programa, versão do celular: os textos novos da seção "Como funciona" com as cópias certas (21 textos, 32 cópias) (v8)
OK     · landing · programa, definições dos cartões, escura e clara: os textos novos da seção "Como funciona" com as cópias certas (17 textos, 50 cópias) (v8)
OK     · landing · programa: as duas respostas novas do FAQ, cada uma logo depois da sua pergunta, nas duas cópias (a do computador e a do celular) (v8)

· 10. A seção "Como funciona" e o FAQ da landing-page-02 v3 na página aberta (#118)
OK     · como funciona 1440 · a versão do computador mostra o título novo, as quatro fases da régua e a legenda das Sessões de Comando
OK     · como funciona 1440 · os oito cartões com o número, o rótulo da semana, a linha da fase e o título, e o 06 com a descrição nova
OK     · como funciona 1440 · o cartão das Sessões de Comando sem número, com o título e as três linhas novas; "Arraste para ver as 8 entregas" no controle do carrossel
OK     · como funciona 1440 · FAQ: "É mais uma mentoria?" e "Quem me atende depois que eu assinar?" abertas com as respostas novas
OK     · como funciona 1440 · a página inteira, como abre e com as duas respostas abertas: nenhum texto antigo à vista, e "mentoria" só em "É mais uma mentoria?" e em "não mais um curso ou mentoria"
OK     · como funciona 1440 · o "Fazer a Análise" do cabeçalho (um botão) leva a /quiz/ com utm_source=bio, utm_campaign=funil-01 e id_sessao no formato do banco
OK     · como funciona 1440 · o botão grande ("Faça uma Análise Estratégica...") leva a /quiz/ com as utm e o id_sessao no formato do banco
OK     · como funciona 375 · a versão do celular mostra o título novo, as quatro fases da régua e a legenda das Sessões de Comando
OK     · como funciona 375 · os oito cartões com o número, o rótulo da semana, a linha da fase e o título, e o 06 com a descrição nova
OK     · como funciona 375 · o cartão das Sessões de Comando sem número, com o título e as três linhas novas; o controle "Arraste para ver..." não existe nesta versão
OK     · como funciona 375 · FAQ: "É mais uma mentoria?" e "Quem me atende depois que eu assinar?" abertas com as respostas novas
OK     · como funciona 375 · a página inteira, como abre e com as duas respostas abertas: nenhum texto antigo à vista, e "mentoria" só em "É mais uma mentoria?" e em "não mais um curso ou mentoria"
OK     · como funciona 375 · o "Fazer a Análise" do cabeçalho (um bloco, não um botão) leva a /quiz/ com utm_source=bio, utm_campaign=funil-01 e id_sessao no formato do banco
OK     · como funciona 375 · o botão grande ("Faça uma Análise Estratégica...") leva a /quiz/ com as utm e o id_sessao no formato do banco
OK     · como funciona 360 · a versão do celular mostra o título novo, as quatro fases da régua e a legenda das Sessões de Comando
OK     · como funciona 360 · os oito cartões com o número, o rótulo da semana, a linha da fase e o título, e o 06 com a descrição nova
OK     · como funciona 360 · o cartão das Sessões de Comando sem número, com o título e as três linhas novas; o controle "Arraste para ver..." não existe nesta versão
OK     · como funciona 360 · FAQ: "É mais uma mentoria?" e "Quem me atende depois que eu assinar?" abertas com as respostas novas
OK     · como funciona 360 · a página inteira, como abre e com as duas respostas abertas: nenhum texto antigo à vista, e "mentoria" só em "É mais uma mentoria?" e em "não mais um curso ou mentoria"
OK     · como funciona 360 · o "Fazer a Análise" do cabeçalho (um bloco, não um botão) leva a /quiz/ com utm_source=bio, utm_campaign=funil-01 e id_sessao no formato do banco
OK     · como funciona 360 · o botão grande ("Faça uma Análise Estratégica...") leva a /quiz/ com as utm e o id_sessao no formato do banco
```

**v7 (13/11/2026).** Rodado inteiro, do zero, com o wrangler dev, numa máquina Linux na nuvem: **173 de 173**, em 81 segundos. São as 170 da v6 mais as três novas da v7 (a política, a landing sem as perguntas 6 e 7, o quiz sem fato bloqueado); duas da v6 mudaram de expectativa (o título do quiz e o Tab a mais no aviso).

**v6 (12/11/2026, pedido 17, parte 17.2).** Rodado inteiro, do zero (a pasta site/ apagada antes), com o wrangler dev, numa máquina Linux na nuvem: **170 de 170**, em 86 e 87 segundos, em duas rodadas seguidas. São as 142 da v5, todas de pé, mais 28 da seção 9: 9 por largura, em 375, 360 e 1440, e a do banco. Numa rodada anterior, com a seção da medição logo depois da 6, quatro conferências da planilha caíram (a primeira busca já trazia o lead A, porque a seção nova atrasou a busca além da margem de 1 minuto, 21.6); a seção foi para depois dos casos de erro, e tudo passou. Prova de que a seção nova pega o erro, rodada com a versão anterior da seção (167 conferências, sem a do foco): com o carregador do Tag Manager forçado a rodar antes do "Aceitar" (mudança de propósito em entregas/prototipo-funil-01/medicao.mjs, desfeita pelo Git), **16 FALHOU**: nas três larguras, "Recusar" sem nada do Google, "sem escolha e com Recusar: nenhum pedido para fora", "Aceitar: o gtm.js primeiro e único", a pagina_limpa e o endereço limpos na landing e no quiz; e a de antes, no fechamento, "navegador · páginas: nenhum pedido para fora de 127.0.0.1". A conferência do netlog continuou certa, porque o pedido ao Google é parado dentro do navegador. No celular, o primeiro botão da landing depois do aviso, para onde o foco vai depois da escolha pelo teclado, é um botão sem rótulo a mais de 5 mil pixels do topo: o "Fazer a Análise" do cabeçalho, no celular, não é um botão. Saída da seção nova e do fechamento (segunda rodada):

```
· 9. Medição no site montado: aviso de cookies e Tag Manager (#116)
OK     · medição 375 · landing sem escolha: o aviso no topo, em fluxo normal, com o texto do aviso-de-cookies, sem rolagem para o lado, e o link "Cookies" no fim
OK     · medição 375 · landing sem escolha: o aviso não cobre o "Fazer a Análise" do topo nem o botão grande
OK     · medição 375 · landing, "Recusar" pelo teclado: o foco vai ao primeiro botão ou link visível depois do aviso, nunca ao body (button "", a 5532 pixels do topo)
OK     · medição 375 · "Recusar" na landing: guarda "recusado"; o quiz abre sem o aviso e sem nada do Google na camada de dados
OK     · medição 375 · sem escolha e com "Recusar", na landing e no quiz: nenhum pedido para fora de 127.0.0.1
OK     · medição 375 · "Aceitar" na landing: o pedido ao https://www.googletagmanager.com/gtm.js?id=GTM-T6L4QTB8 é o primeiro e único para fora, só para o Google (https://www.googletagmanager.com/gtm.js?id=GTM-T6L4QTB8)
OK     · medição 375 · "Aceitar" na landing: pagina_limpa sem o id_sessao (/?utm_source=bio&utm_campaign=funil-01), o endereço da barra também, e só a análise concedida
OK     · medição 375 · a escolha passa da landing para o quiz: clicando o botão da landing ("Faça uma Análise Estratégica"), o quiz abre sem o aviso e já pede o gtm.js, só ao Google
OK     · medição 375 · no quiz: o início do quiz leva o id_sessao que veio da landing; o endereço da barra, a pagina_limpa e a origem_limpa saem sem ele (?utm_source=bio&utm_campaign=funil-01#abertura)
OK     · medição 360 · landing sem escolha: o aviso no topo, em fluxo normal, com o texto do aviso-de-cookies, sem rolagem para o lado, e o link "Cookies" no fim
OK     · medição 360 · landing sem escolha: o aviso não cobre o "Fazer a Análise" do topo nem o botão grande
OK     · medição 360 · landing, "Recusar" pelo teclado: o foco vai ao primeiro botão ou link visível depois do aviso, nunca ao body (button "", a 5312 pixels do topo)
OK     · medição 360 · "Recusar" na landing: guarda "recusado"; o quiz abre sem o aviso e sem nada do Google na camada de dados
OK     · medição 360 · sem escolha e com "Recusar", na landing e no quiz: nenhum pedido para fora de 127.0.0.1
OK     · medição 360 · "Aceitar" na landing: o pedido ao https://www.googletagmanager.com/gtm.js?id=GTM-T6L4QTB8 é o primeiro e único para fora, só para o Google (https://www.googletagmanager.com/gtm.js?id=GTM-T6L4QTB8)
OK     · medição 360 · "Aceitar" na landing: pagina_limpa sem o id_sessao (/?utm_source=bio&utm_campaign=funil-01), o endereço da barra também, e só a análise concedida
OK     · medição 360 · a escolha passa da landing para o quiz: clicando o botão da landing ("Faça uma Análise Estratégica"), o quiz abre sem o aviso e já pede o gtm.js, só ao Google
OK     · medição 360 · no quiz: o início do quiz leva o id_sessao que veio da landing; o endereço da barra, a pagina_limpa e a origem_limpa saem sem ele (?utm_source=bio&utm_campaign=funil-01#abertura)
OK     · medição 1440 · landing sem escolha: o aviso no topo, em fluxo normal, com o texto do aviso-de-cookies, sem rolagem para o lado, e o link "Cookies" no fim
OK     · medição 1440 · landing sem escolha: o aviso não cobre o "Fazer a Análise" do topo nem o botão grande
OK     · medição 1440 · landing, "Recusar" pelo teclado: o foco vai ao primeiro botão ou link visível depois do aviso, nunca ao body (button "Fazer a Análise", a 20 pixels do topo)
OK     · medição 1440 · "Recusar" na landing: guarda "recusado"; o quiz abre sem o aviso e sem nada do Google na camada de dados
OK     · medição 1440 · sem escolha e com "Recusar", na landing e no quiz: nenhum pedido para fora de 127.0.0.1
OK     · medição 1440 · "Aceitar" na landing: o pedido ao https://www.googletagmanager.com/gtm.js?id=GTM-T6L4QTB8 é o primeiro e único para fora, só para o Google (https://www.googletagmanager.com/gtm.js?id=GTM-T6L4QTB8)
OK     · medição 1440 · "Aceitar" na landing: pagina_limpa sem o id_sessao (/?utm_source=bio&utm_campaign=funil-01), o endereço da barra também, e só a análise concedida
OK     · medição 1440 · a escolha passa da landing para o quiz: clicando o botão da landing ("Fazer a Análise"), o quiz abre sem o aviso e já pede o gtm.js, só ao Google
OK     · medição 1440 · no quiz: o início do quiz leva o id_sessao que veio da landing; o endereço da barra, a pagina_limpa e a origem_limpa saem sem ele (?utm_source=bio&utm_campaign=funil-01#abertura)
OK     · banco · com "Aceitar": a visita da landing e o início do quiz gravados com a mesma sessão, sem pessoa, nas três larguras (visita,inicio_quiz | visita,inicio_quiz | visita,inicio_quiz)

· 10. Fechamento
OK     · no fim · conferir.sql: linha "tudo certo" = true (18 de 18)
OK     · os dados de antes da migração continuam iguais no fim do ensaio
OK     · saída do garçom (wrangler dev, 50 linhas [garcom]) sem dado pessoal, sem id_pessoa e sem chave
OK     · o garçom só chamou registrar_fim_quiz e registrar_evento com a publicável (anon) e leads_para_planilha com a secreta (service_role) (40 chamadas)
OK     · navegador · páginas: nenhum pedido para fora de 127.0.0.1, nem fonte do Google (10.7; nenhum); nos contextos que aceitaram, só o gtm.js, conferido em 9
OK     · navegador · Chromium inteiro (netlog): nenhuma conexão TCP fora de 127.0.0.1 (2 endereços, todos locais)
INFO   · tentativas de fundo do próprio Chromium, recusadas antes de sair (nome não encontrado e proxy local inexistente): clients2.google.com, redirector.gvt1.com, accounts.google.com, update.googleapis.com, www.google.com, content-autofill.googleapis.com, android.clients.google.com
INFO   · www.googletagmanager.com no registro de rede: pedidos parados dentro do navegador (respondidos com 404 nos contextos que aceitaram, conferidos em 9; bloqueados nos outros, conferidos acima), sem conexão
OK     · wrangler dev: nenhuma tentativa de falar com fora da máquina (trava rede-so-local.cjs; nenhuma)
  tempo do ensaio: 87 s

Tudo certo: 170 de 170 conferências passaram

real	1m27.277s
user	0m32.935s
sys	0m8.432s
```

**v5 (12/11/2026).** Rodado inteiro, do zero (a pasta site/ apagada antes), com o wrangler dev, numa máquina Linux na nuvem: **142 de 142**, em 63 segundos. Mesmo número da v4: a conferência das fontes do quiz trocou a Permanent Marker pela Geist, e o caminho até o quiz perdeu o clique na capa, que não era conferência.

**v4 (12/11/2026).** Rodado inteiro, do zero (a pasta site/ apagada antes), com o wrangler dev: **142 de 142**, em 64 segundos. São três conferências a menos que na v3: saíram as duas do /b/ e as três dos CSS das variantes, e entraram as do estilo e do programa da landing-page-02. Rodado numa máquina Linux na nuvem, com o Chromium do Playwright posto no caminho que nucleo/ferramentas/prints/print.js procura (acharChromium só conhece o caminho do Mac), fora do repositório.

**v3 (09/11/2026, etapa 35).** Rodado inteiro, do zero (a pasta site/ apagada antes), com o wrangler dev, duas vezes seguidas: **145 de 145** nas duas. Com `--esperar-margem`: 144 de 144 (sem a conferência do contorno). Com `--sem-wrangler`: 142 de 142 (sem as três conferências do wrangler).

Para provar que as conferências novas pegam o defeito, rodado com `--sem-wrangler` e uma mudança de propósito na página do quiz, desfeita pelo Git logo depois:

- o fim do quiz pelo corte de antes (`CRITERIO_DO_FIM = 'junior'`): 2 FALHOU, o corte (a faixa c foi para o plano) e a linha do banco do corte (sem o clique, que não existe no plano);
- o envio mesmo com a caixa desmarcada (`if (true)` no lugar de `if (temConsentimento())`): 1 FALHOU, "desmarcada: nenhum POST /api/fim-quiz". O banco continuou limpo, porque o garçom recusa o pacote sem consentimento (422) antes de chamar o banco.

As linhas INFO só informam e não entram na contagem. Saída real da rodada da v4:

```
Ensaio geral do protótipo do funil-01 · 2026-11-12T12:08:34.344Z
Só 127.0.0.1, só valores de mentira, só leads de teste (#102).

· 1. Banco v2 (PGlite) como está no Supabase, com os papéis de mentira e dados de antes
INFO   · PGlite no ar (PostgreSQL 18.6 (PGlite 0.5.15)), papéis anon, authenticated, service_role e dono criados
OK     · esquema.sql (v2) aplicado pelo dono, primeira vez, sem erro
OK     · esquema.sql (v2) aplicado pelo dono, segunda vez, sem erro
OK     · antes da migração · conferir.sql avisa que falta a migração: false nas linhas 4, 8, 14, 15, 16, 17, 18 (11 de 18)
OK     · dados de antes pelo v2: 4 pessoas e 5 fins de quiz de teste (uma linha que imita a do Otávio, faixa a, nota 86, stories; uma faixa a com empresa "=1+1"; um eliminatório; uma pessoa com dois envios)

· 2. Migração 001 (v3) duas vezes sobre os dados de antes
OK     · migracoes/001-v3.sql aplicada pelo dono, primeira vez, sem erro
OK     · primeira vez: os dados de antes não mudaram (4 pessoas e 5 eventos, cada linha igual)
OK     · migracoes/001-v3.sql aplicada pelo dono, segunda vez, sem erro
OK     · segunda vez: os dados de antes não mudaram (4 pessoas e 5 eventos, cada linha igual)
OK     · segunda vez: restrições, colunas, funções e permissões iguais às da primeira
OK     · clique_fim_quiz nasceu vazio nos eventos de antes
OK     · depois da migração · conferir.sql: linha "tudo certo" = true (18 de 18)
OK     · anon executa registrar_fim_quiz (passa da permissão e para na conferência do pacote: 22023)
OK     · anon executa registrar_evento, a porta nova (passa da permissão e para na conferência do pacote: 22023)
OK     · anon não lê a tabela entregas (42501)
OK     · anon não lê a tabela pessoas (42501)
OK     · anon não lê a tabela eventos (42501)
OK     · anon não lê a tabela investimento (42501)
OK     · anon não lê a visão painel_numeros (42501)
OK     · anon não lê a visão contagem_analises_gratuitas (42501)
OK     · anon não grava direto na tabela pessoas (42501)
OK     · anon não grava direto na tabela eventos (42501)
OK     · anon não chama leads_para_planilha (42501)
OK     · anon não chama a função da trava (42501)
OK     · authenticated não pode registrar_fim_quiz (42501)
OK     · authenticated não pode registrar_evento (42501)
OK     · authenticated não pode leads_para_planilha (42501)
OK     · authenticated não pode a tabela pessoas (42501)
OK     · authenticated não pode a visão painel_numeros (42501)
OK     · service_role chama leads_para_planilha (ok)
OK     · service_role não pode executar registrar_fim_quiz (42501)
OK     · service_role não pode executar registrar_evento (42501)
OK     · service_role não pode ler a tabela pessoas (42501)
OK     · service_role não pode ler a tabela eventos (42501)
OK     · service_role não pode ler a visão painel_numeros (42501)
OK     · um papel qualquer, sem permissão dada (PUBLIC), não executa registrar_fim_quiz (42501)
OK     · um papel qualquer, sem permissão dada (PUBLIC), não executa registrar_evento (42501)

· 3. Supabase de mentira em 127.0.0.1
INFO   · Supabase de mentira no ar em http://127.0.0.1:(porta livre)
OK     · sem apikey: 401 (401)
OK     · chave desconhecida: 401 (401)
OK     · chave secreta (service_role) chama leads_para_planilha v3: 200, os 3 leads de antes nas faixas a e b, com o campo do clique (200, 3)
OK     · função que não existe: 404 (404)

· 4. Site montado e garçom rodando localmente
OK     · montar-site.mjs: site montado em entregas/prototipo-funil-01/site/ (fora do Git), sem nenhuma página pedindo arquivo a outro endereço
OK     · as fontes estão no site montado, ao lado das páginas (4 arquivos; 10.7)
OK     · configuração temporária fora do repositório: só main, assets, SUPABASE_URL e ORIGEM_PERMITIDA trocados; nenhum endereço real
OK     · wrangler dev --local no ar (workerd), sem login, com os segredos de mentira por arquivo temporário
  modo do garçom: wrangler dev --local
  avisos do wrangler: [33m▲ [43;33m[[43;30mWARNING[43;33m][0m [1mProxy environment variables detected. We'll use your proxy for fetch requests.[0m
OK     · GET / (landing-page-02): 200, X-Robots-Tag noindex e meta noindex (200)
OK     · GET / (landing-page-02): Content-Type com charset utf-8 (text/html; charset=utf-8) e meta charset nos primeiros 1024 bytes
OK     · GET /quiz/ (quiz): 200, X-Robots-Tag noindex e meta noindex (200)
OK     · GET /quiz/ (quiz): Content-Type com charset utf-8 (text/html; charset=utf-8) e meta charset nos primeiros 1024 bytes
OK     · GET /assets/index-Btrkg4Yg.css: Content-Type com charset utf-8 (text/css; charset=utf-8)
OK     · GET /assets/index-BSwcbsoR.js: Content-Type com charset utf-8 (text/javascript; charset=utf-8)
OK     · GET /api/nao-existe: 404 com noindex (404)
OK     · OPTIONS /api/evento: 405 sem cabeçalho de CORS (22.2; 405)

· 5. Catálogo de entregas v3 (perguntas 23.10, 32.4 e 34.4; landing-page-02)
OK     · sem a linha (quiz-01, 2), o fim do quiz da página nova é recusado pela chave estrangeira (409) e o garçom responde 422
OK     · sem a linha (landing-page-02, 1), a visita é recusada (409 no banco, 422 no garçom)
OK     · sem a linha (quiz-01, 2), o início do quiz é recusado (409 no banco, 422 no garçom)
OK     · e nada novo ficou no banco
OK     · outra origem no fim do quiz: 403 (403)
OK     · outra origem na visita: 403 (403)
OK     · dados/banco/catalogo-prototipo.sql (v3) aplicado pelo dono, primeira vez: mostra as quatro linhas (landing-page-01 1 landing; landing-page-02 1 landing; quiz-01 1 quiz; quiz-01 2 quiz)
OK     · dados/banco/catalogo-prototipo.sql (v3) aplicado pelo dono, segunda vez: mostra as quatro linhas (landing-page-01 1 landing; landing-page-02 1 landing; quiz-01 1 quiz; quiz-01 2 quiz)
OK     · catálogo com quatro linhas (rodar de novo não duplica) e a linha antiga (quiz-01, 1) com a mesma data

· 6. Landing e quiz no navegador sem tela (só 127.0.0.1)
OK     · landing: a visita foi gravada (POST /api/evento, 201)
OK     · landing: modo padrão (CSS1Compat) e UTF-8 (34.13)
OK     · landing: Geist carregada de /fontes/, sem o Google (Geist)
OK     · landing: o botão do topo ("Fazer a Análise") leva a /quiz/ com utm_source=bio, utm_campaign=funil-01 e id_sessao no formato do banco
OK     · quiz: o início do quiz foi gravado ao abrir (POST /api/evento, 201)
OK     · quiz: modo padrão (CSS1Compat; 09.1), lido como UTF-8, título com os acentos certos
OK     · quiz: Inter, Space Grotesk e Permanent Marker carregadas de /quiz/fontes/ (Inter, Space Grotesk, Permanent Marker)
OK     · quiz: uma caixa de aceite só, já marcada (13.4)
OK     · lead A: POST /api/fim-quiz gravado (201), tela do plano, sem aviso de falha
OK     · landing em 375: a visita foi gravada (201) e a página está no modo padrão (CSS1Compat)
OK     · landing em 375: o botão grande ("Faça uma Análise Estratégica...") leva a /quiz/ com utm_source=stories
OK     · eliminatório: POST /api/fim-quiz gravado (201), tela do relatório de não qualificado, sem aviso de falha
OK     · eliminatório: o clique "Tenho interesse" foi gravado (POST /api/evento, 201)
OK     · corte mais restritivo: quem passa no corte do Júnior e fica na faixa c vai para o relatório de não qualificado (antes, plano); fim do quiz e clique gravados (#relatorio-nao)
OK     · faixa b: fim do quiz gravado (201), relatório do funil saudável, clique "Quero marcar uma conversa" gravado (201)
OK     · desmarcada: a visita e o início do quiz, que vêm antes da caixa e não têm pessoa, foram gravados (34.18)
OK     · desmarcada: nenhum POST /api/fim-quiz e nenhum clique mandado; o diagnóstico aparece na tela, sem aviso
OK     · landing com /api/evento fora do ar: o botão continua levando a /quiz/ com a utm presente e a sessão (10.10)
OK     · a landing-page-02 aberta pelo arquivo (file://): nada é enviado e nada é pedido a outro endereço (3 pedidos, todos file: ou data:)
OK     · console das páginas sem dado de pessoa (8 linhas)
OK     · banco · pessoas: o lead A, com nome TESTE, e-mail @teste.invalid e telefone como a página mandou
OK     · banco · pessoas: a caixa marcada vira consentimento por WhatsApp e por e-mail, com a data (#104)
OK     · banco · pessoas: texto aceito com os acentos certos (o combinado, a política de privacidade e a caixa, iguais aos da página)
OK     · banco · pessoas: primeira visita bio, funil-01
OK     · banco · eventos: um fim_quiz do lead A com nota 96, faixa a, versão 3 do lead score (veio 96, a, v3)
OK     · banco · eventos: etiquetas funil-01, quiz-01 versão 2, utm bio e funil-01, gravado pelo garçom, com a sessão que veio da landing
OK     · banco · eventos: as respostas do quiz gravadas
OK     · banco · a sessão do lead A tem, na ordem, visita, início do quiz e fim do quiz (visita, inicio_quiz, fim_quiz)
OK     · banco · visita: landing-page-02 versão 1, utm bio e funil-01, gravada pelo garçom sem pessoa e ligada à pessoa pelo fim do quiz da mesma sessão (6.2)
OK     · banco · início do quiz: quiz-01 versão 2, sem nota e sem respostas, ligado à pessoa pelo fim do quiz (6.2)
OK     · banco · o eliminatório: faixa eliminatorio (nota 81), utm stories
OK     · banco · o clique do eliminatório: interesse_pos_relatorio, tenho-interesse, ligado à pessoa pela sessão (18.4; 32.2)
OK     · banco · o corte mais restritivo: faixa c (nota 24) e o clique tenho-interesse
OK     · banco · faixa b: nota 68 e o clique quero-conversa (veio 68, b)
OK     · banco · faixa b: as respostas trazem o CRM e a linha "Leads por mês" que a planilha lê (15.4)
OK     · banco · desmarcada: nenhuma pessoa, nenhum fim do quiz e nenhum clique; da sessão, só a visita e o início do quiz, sem pessoa (visita, inicio_quiz)
OK     · banco: 4 pessoas novas e 4 fins de quiz novos, nada a mais

· 7. Planilha do SDR (Codigo.gs v2 com o Google de mentira) pela porta privada
OK     · instalar() numa aba nova (como depois de renomear a antiga): aba fila criada, cabeçalhos e gatilho
OK     · aba fila: as 20 colunas de planilha-sdr.md v2, na ordem, com clique_fim_quiz na 13
OK     · primeira busca: 200 e só os 3 leads de antes (a linha que imita a do Otávio, a faixa a com "=1+1" e a pessoa dos dois envios, uma vez só); os novos ainda não (margem de 1 minuto, 21.6) (3)
OK     · contorno da margem: gravado_em dos 4 fins de quiz novos de teste atrasado 2 minutos (trava desligada só nesta sessão e religada)
OK     · a trava dos eventos continua ligada: apagar evento é recusado (P0001)
OK     · segunda busca: 2 linhas novas, o lead A e a faixa b, na ordem de chegada (o eliminatório e a faixa c nem vêm do banco) (2)
OK     · linha do lead A: id_pessoa, nome, telefone e e-mail iguais aos do banco
OK     · linha do lead A: faixa a, nota 96, consentimentos sim, empresa, respostas_a_confirmar e clique vazios
OK     · linha do lead A: entrou_em no horário de Brasília (AAAA-MM-DD HH:MM:SS), 0 tentativas, estágio captado, estado e data_volta vazios
OK     · linha do lead A: as colunas do SDR (canal, contato_em, reuniao_em, produto) ficaram vazias
OK     · linha da faixa b: nota 68, respostas a confirmar com as respostas novas leads-por-mes e crm (15.4; crm: Sim, mas pouca gente atualiza; vendedores: 2 ou 3; valor-medio: R$ 10.000; leads-por-mes: 200)
OK     · linha da faixa b: clique_fim_quiz quero-conversa (18.4)
OK     · linha que imita a do Otávio: faixa a, nota 86, consentimento sim, sem clique (dado de antes da migração)
OK     · o eliminatório, a faixa c do corte, a desmarcada e o eliminatório de antes não estão na planilha
OK     · rodar de novo: 0 linhas novas, a aba continua com 5 leads (não duplica)
OK     · cursor perdido: pede desde o início, acha os 5 leads repetidos e não duplica; cursor salvo de novo
OK     · registro da planilha (5 linhas) sem dado pessoal, sem id_pessoa e sem chave
OK     · planilha com a CHAVE_PLANILHA errada: 401, nada gravado (nao-autorizado)

· 8. Casos de erro
OK     · chave publicável: GET /rest/v1/pessoas recusado com 401 e sem dado (401)
OK     · chave publicável: GET /rest/v1/eventos recusado com 401 (401)
OK     · chave publicável: GET /rest/v1/painel_numeros (visão) recusado com 401 (401)
OK     · chave publicável: POST /rest/v1/pessoas (gravar direto) recusado com 401 (401)
OK     · chave publicável: leads_para_planilha recusado com 401 e sem dado (401)
OK     · chave secreta: GET /rest/v1/pessoas recusado com 403 (service_role só tem a função da planilha) (403)
OK     · chave secreta: registrar_fim_quiz recusado com 403 (403)
OK     · chave secreta: registrar_evento recusado com 403 (403)
OK     · garçom · porta privada com a chave da planilha errada: 401 sem detalhe
OK     · garçom · porta privada sem chave: 401 (401)
OK     · garçom · porta privada com a chave publicável no lugar: 401 (401)
OK     · garçom · porta privada com a chave certa: 200, 5 leads, cursor_seguinte com fuso em Z
OK     · garçom · pacote sem consentimento: 422 e o banco nem é chamado (422)
OK     · banco · registrar_fim_quiz chamado direto com a publicável, sem consentimento: recusado pela restrição (400, 23514)
OK     · e nenhuma pessoa nova entrou
OK     · garçom · clique numa sessão sem fim do quiz: o banco recusa (22023) e o garçom responde 422, nada gravado (32.2)
OK     · garçom · /api/evento com pessoa no pacote: 422 e o banco nem é chamado (422)
OK     · dois POST ao mesmo tempo da mesma pessoa: os dois gravados (201, 201)
OK     · uma pessoa só no banco e dois eventos fim_quiz ligados a ela (2)

· 9. Fechamento
OK     · no fim · conferir.sql: linha "tudo certo" = true (18 de 18)
OK     · os dados de antes da migração continuam iguais no fim do ensaio
OK     · saída do garçom (wrangler dev, 38 linhas [garcom]) sem dado pessoal, sem id_pessoa e sem chave
OK     · o garçom só chamou registrar_fim_quiz e registrar_evento com a publicável (anon) e leads_para_planilha com a secreta (service_role) (28 chamadas)
OK     · navegador · páginas: nenhum pedido para fora de 127.0.0.1, nem fonte do Google (10.7; nenhum)
OK     · navegador · Chromium inteiro (netlog): nenhuma conexão TCP fora de 127.0.0.1 (2 endereços, todos locais)
INFO   · tentativas de fundo do próprio Chromium, recusadas antes de sair (nome não encontrado e proxy local inexistente): clients2.google.com, accounts.google.com, redirector.gvt1.com, www.google.com, update.googleapis.com, android.clients.google.com, content-autofill.googleapis.com
OK     · wrangler dev: nenhuma tentativa de falar com fora da máquina (trava rede-so-local.cjs; nenhuma)
  tempo do ensaio: 64 s

Tudo certo: 142 de 142 conferências passaram
```

**v2 (09/11/2026, pedido 09).** 96 de 96 com o wrangler dev e 94 de 94 com `--sem-wrangler`. Conferências do charset: o wrangler dev local já acrescenta o charset sozinho, a Cloudflare de verdade não; por isso o contorno entrega HTML e CSS sem charset.

**v1 (madrugada de 08 para 09/11/2026).** 88 de 88 duas vezes seguidas e 86 de 86 com `--sem-wrangler`.

## Limitações

**O que o PGlite e o Supabase de mentira não provam** (só se confere no Supabase de verdade):

- **Corrida de verdade.** O PGlite tem uma conexão só, e o Supabase de mentira põe os pedidos numa fila. Os dois envios simultâneos chegam juntos ao garçom, mas no banco rodam um depois do outro: o caminho em que o segundo envio espera o primeiro no índice único não roda aqui (21.15).
- **Os papéis e permissões do próprio Supabase.** Os papéis daqui são de mentira; o dono imita o postgres do Supabase e começa com as permissões padrão do pior caso. As permissões que o Supabase dá de fato aos papéis dele só aparecem no conferir.sql rodado lá (APLICAR-11.md, passo 2.8).
- **A API de verdade.** O Supabase de mentira imita o PostgREST no que o garçom usa; não é o PostgREST: a troca das chaves novas pelo papel, os status e mensagens exatos, o limite de 3 segundos por comando do anon e as chaves antigas (legacy) ficam de fora.
- **Os dados de verdade.** Os dados de antes imitam o formato dos do teste de 09/11, não são eles. A migração roda numa transação só e confere as linhas ao ligar cada restrição: se alguma linha de verdade não passar, ela para sem mudar nada (dados/banco/README.md, "Como aplicar").
- **Versão do Postgres.** O PGlite é o PostgreSQL 18.6; o projeto do Supabase pode ter outra versão.
- **Fuso.** O banco do ensaio roda em UTC, como o Supabase; o horário de Brasília na planilha é conta do Apps Script de mentira (24.13).

**O que o wrangler dev local não prova** (só se confere na Cloudflare de verdade): o Content-Type que a Cloudflare dá aos arquivos (o wrangler dev já põe charset; a borda, não), o endereço workers.dev, HTTPS, o `run_worker_first` na borda, os segredos no cofre, o registro da Cloudflare e o garçom falando com o Supabase pela internet.

**O que o Google de mentira não prova:** tudo da pergunta 24.13 (autorização, gatilho de 5 minutos rodando sozinho, formatos e listas no Google Planilhas de verdade) e a troca da aba de verdade (renomear a antiga e rodar instalar() de novo; APLICAR-11.md).

**O navegador:** o visual não é conferido aqui (os prints das etapas 23 e 34 conferem; os da seção "Como funciona", em entregas/landings/landing-page-02/prints/). Na seção 10 (v8), o ensaio lê o texto da seção como o navegador o entrega, com os cartões todos de uma vez (9, desde a v4 da landing): não diz se um rótulo está cortado, sobreposto ou fora da tela. Na seção 11 (v9), mede três coisas de desenho e só elas: cada chip dentro da caixa do seu cartão, o fim da barra acesa da régua contra os rótulos S2 e S3, e qual item do menu da demonstração está aceso. Não diz se o cartão aparece inteiro na tela, se a linha do cartão 08 encosta no número nem se o rótulo da Fase 1 encosta em algo: isso foi medido à parte, na 20.2 e na 20.3 (prompts/20-gsaas-fora-da-landing-resposta.md), e está nos prints. O ensaio abre a página numa janela de 375 ou 360 de largura sem imitar toque: o arrastar com o dedo não é conferido aqui. O quiz roda no site montado, servido pelo workerd, e não no celular de verdade.

**A medição (v6):** o Google é respondido pelo ensaio com 404, como enquanto o contêiner não é publicado; o Tag Manager de verdade, o Google Analytics, os cookies que ele grava e o que ele manda ao Google não rodam aqui. Isso só se confere no ar, depois que o Otávio publicar o contêiner e ligar o Analytics (log.md, Pendências).

**Contorno sem wrangler** (`--sem-wrangler`): o handler do garçom roda num servidor Node, com um ASSETS simples que lê a pasta montada. Não imita o binding de assets da Cloudflare (por exemplo, o redirecionamento de /quiz para /quiz/); serve só se o wrangler dev falhar. Esse ASSETS entrega HTML e CSS sem charset, como a Cloudflare entregou em 09/11, para o garçom ter de acrescentar.

## O que não fazer

- Não pôr .dev.vars, segredo ou chave de verdade nesta pasta nem em entregas/prototipo-funil-01/: o ensaio não precisa, e o detector de chaves barra.
- Não apontar o ensaio para o Supabase ou para a Cloudflare de verdade: ele foi feito para 127.0.0.1.

## Perguntas

prompts/08-fila-perguntas.md, seção "Etapa 25"; prompts/11-fila-perguntas.md, seção "Etapa 35".
