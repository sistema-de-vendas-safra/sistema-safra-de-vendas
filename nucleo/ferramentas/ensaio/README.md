---
id: ensaio-prototipo-funil-01
versao: 4
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
    versao: 6
  - id: quiz-01-pagina
    versao: 3
  - id: landing-page-02
    versao: 1
  - id: planilha-sdr-funil-01
    versao: 2
  - id: lead-score
    versao: 3
  - id: decisoes
    versao: 5
  - id: regra-seguranca
    versao: 3
desatualizado: true
---

# Ensaio geral do protótipo do funil-01

Roda tudo junto, na máquina, sem nenhum serviço real: o banco, um Supabase de mentira, o site montado, o garçom, a landing e o quiz num navegador sem tela e a planilha do SDR com um Google de mentira. Serve para não ter surpresa quando o Otávio aplicar as mudanças no protótipo que está no ar (prompts/08-fila-da-madrugada.md, etapa 25; prompts/11-decisoes-de-09-11.md, etapa 35; o roteiro é entregas/prototipo-funil-01/APLICAR-11.md).

**Status.** Rascunho, pendente do Otávio. Continua desatualizado, porque se apoia em documentos marcados (banco-rascunho, banco-migracao-001, garcom, quiz-01-pagina, a landing-page-02, planilha-sdr-funil-01 e o protótipo; regra 11.1).

**Protótipo de teste não é entrega.** O ensaio usa só leads de mentira (#102: nome começando por TESTE, e-mail @teste.invalid), só valores de mentira montados na hora e só o endereço 127.0.0.1. Nada vai ao ar, nada é publicado, ninguém faz login, e nada sai da máquina (ver "Rede").

**O que muda na versão 3 (etapa 35, 09/11/2026).** O ensaio parte do banco como ele está no Supabase (esquema v2, a linha do catálogo de antes e dados de antes, de teste, entre eles uma linha que imita a do Otávio) e roda a migração 001 duas vezes sobre esses dados; conferir.sql v2 (18 de 18); catálogo v2; garçom v4 com /api/evento (visita, início do quiz, clique no fim); a caixa de aceite única marcada e desmarcada; o corte mais restritivo; a faixa B com as respostas novas da planilha (leads-por-mes e crm); a planilha v2 com 20 colunas; fontes locais e nenhum pedido a terceiros, conferido também no Chromium inteiro e no wrangler; a conferência da landing que tinha ficado fora do repositório na etapa 34 (34.17). Opção nova `--esperar-margem`.

**O que muda na versão 4 (12/11/2026).** A landing do site agora é a landing-page-02, a página de vendas, em /, no lugar das duas variantes da landing-page-01; o /b/ saiu do site. O ensaio confere / e /quiz/, o estilo e o programa da landing-page-02 com charset, o catálogo v3 (com a linha landing-page-02, versão 1), a visita gravada como landing-page-02 e a ida ao quiz pelos dois botões de Análise (o do topo e o grande, em 1440 e em 375). As pessoas que entravam pelo /b/ entram pelo /, e a conferência pelo arquivo (file://) abre a landing-page-02.

## Um comando só

De dentro desta pasta:

```
npm run ensaio
```

Ou da raiz do repositório: `node nucleo/ferramentas/ensaio/ensaio.mjs`. Leva perto de 55 segundos. Cada conferência sai com OK ou FALHOU; no fim, "Tudo certo: N de N" e código 0, ou "FALHOU: ..." e código 1.

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

   Confere, no navegador: a visita gravada (201) ao abrir a landing, a landing e o quiz no modo padrão (CSS1Compat; 34.13, 09.1) e em UTF-8, o título com os acentos certos, a Geist na landing e a Inter, a Space Grotesk e a Permanent Marker no quiz, carregadas do site (10.7); os dois botões levam a /quiz/ com as utm e o id_sessao no formato do banco; o início do quiz gravado ao abrir; uma caixa de aceite só, já marcada (13.4); o fim do quiz e o clique gravados (201) e sem aviso de falha; com a caixa desmarcada, nenhum POST /api/fim-quiz e nenhum clique, o diagnóstico na tela. Da conferência da landing que estava fora do repositório (34.17), o que não se repete acima: com /api/evento fora do ar, o botão continua levando ao quiz com a utm e a sessão (10.10); aberta pelo arquivo (file://), a landing-page-02 não manda nada. O console das páginas, sem dado de pessoa.

   Confere, no banco: o lead A com nome TESTE, telefone como a página mandou, os dois consentimentos "sim" pela caixa única com a data e o texto aceito com os acentos certos (o combinado, a política de privacidade e a caixa, iguais aos da página; #104); fim do quiz com nota 96, faixa a, lead score versão 3, quiz-01 versão 2, a sessão vinda da landing e as respostas; a sessão do lead A com visita (landing-page-02, versão 1, utm bio), início do quiz (quiz-01, versão 2, sem nota nem respostas) e fim do quiz, nessa ordem, a visita e o início ligados à pessoa pelo fim do quiz da mesma sessão (6.2); o eliminatório com a nota e o clique tenho-interesse ligado pela sessão (18.4; 32.2); a faixa c do corte com o clique; a faixa b com nota 68, o clique quero-conversa e as respostas com o CRM e a linha "Leads por mês"; da desmarcada, nenhuma pessoa, nenhum fim do quiz e nenhum clique, só a visita e o início do quiz, sem pessoa (34.18); 4 pessoas e 4 fins de quiz novos, nada a mais.
7. **Planilha do SDR.** Em outro processo (o UrlFetchApp de mentira é síncrono e trava a linha principal de quem chama), roda instalar() e buscar_() de Codigo.gs v2 contra o garçom local, pela porta privada, com a CHAVE_PLANILHA de mentira, numa aba nova, como depois de renomear a antiga (planilha-sdr-funil-01, "Atualizar da versão 1"). Confere: as 20 colunas na ordem, com clique_fim_quiz na 13; a primeira busca, logo depois do quiz, traz **só os 3 leads de antes** (a linha que imita a do Otávio, a faixa a com "=1+1" e a pessoa dos dois envios, uma vez só), e nenhum dos novos (a margem de 1 minuto do banco, 21.6); depois do contorno da margem (abaixo), 2 linhas novas, o lead A e a faixa b, na ordem de chegada; a linha do lead A com os valores certos e o clique vazio; a da faixa b com respostas_a_confirmar trazendo **leads-por-mes: 200** e **crm** (15.4) e clique_fim_quiz **quero-conversa** (18.4); a linha que imita a do Otávio com faixa a e nota 86; o eliminatório, a faixa c, a desmarcada e o eliminatório de antes fora; rodar de novo não duplica; com o cursor perdido, também não; o registro da planilha sem dado pessoal; com a chave errada, 401 e nada gravado.
8. **Casos de erro.** Chave publicável lendo tabela, visão, gravando direto ou chamando leads_para_planilha pelo Supabase de mentira: 401. Chave secreta lendo tabela, gravando o fim do quiz ou um evento: 403. Porta privada do garçom com a chave da planilha errada, sem chave ou com a publicável no lugar: 401 sem detalhe; com a certa, os 5 leads. Pacote sem consentimento: o garçom recusa (422) sem chamar o banco, e a função chamada direto com a publicável também recusa (400, restrição 23514). Clique numa sessão sem fim do quiz: o banco recusa e o garçom responde 422 (32.2). /api/evento com pessoa no pacote: 422 sem chamar o banco. A mesma pessoa enviando duas vezes ao mesmo tempo: uma pessoa só no banco e dois eventos.
9. **Fechamento.** conferir.sql de novo (18 de 18); os dados de antes iguais no fim; a saída do garçom sem dado pessoal, sem id_pessoa e sem chave; o garçom tendo usado só a publicável em registrar_fim_quiz e registrar_evento e só a secreta em leads_para_planilha; e a rede (abaixo).

No fim, e também se algo falhar no meio ou se o ensaio for interrompido (Ctrl+C), fecha o navegador, o wrangler e o workerd (o grupo de processos inteiro), o processo da planilha, os servidores e o banco, e apaga a pasta temporária. O navegador é aberto sem os tratadores de sinal do Playwright (handleSIGINT, handleSIGTERM e handleSIGHUP desligados), senão ele encerraria o processo antes da limpeza.

## O contorno da margem de 1 minuto

leads_para_planilha só devolve fins de quiz gravados há mais de 1 minuto (21.6). Para não esperar, o ensaio, depois de conferir que a primeira busca não traz os leads novos, faz como o superusuário do PGlite, numa sessão só: liga `session_replication_role = replica` (que desliga os gatilhos só nessa sessão), atrasa em 2 minutos o gravado_em dos 4 fins de quiz novos de teste, e volta para `origin`. O esquema não muda e a trava não é desligada na tabela: logo depois, o ensaio confere que o gatilho continua ligado e que apagar evento é recusado. O mesmo contorno, com 6 horas, deixa os dados de antes com cara de dados da manhã (seção 1).

O que o contorno pula: a espera de verdade e a conta da margem com o relógio de verdade. Para isso existe `--esperar-margem`: o ensaio espera até 65 segundos depois do último fim do quiz novo, sem mexer no banco, e a segunda busca tem de trazer as mesmas 2 linhas.

**A planilha com 0 leads na revisão da etapa 34.** O revisor da etapa 34 viu a planilha voltar 0 leads logo depois de gravar um lead de faixa A. Conferido nesta etapa: é a margem de 1 minuto, e não defeito. No ensaio, a primeira busca logo depois do quiz não traz o lead novo, e, com `--esperar-margem` (espera de verdade, 48 segundos na rodada), a busca seguinte traz o lead A e a faixa b, sem nenhuma mudança no banco, no garçom nem no Codigo.gs. Nada foi corrigido, porque nada estava errado. No Supabase, o lead aparece na planilha de 1 a 6 minutos depois do quiz (a margem mais o gatilho de 5 minutos; 21.6).

## Rede

O ensaio confere em três lugares que nada sai da máquina:

- **As páginas.** Todo pedido do navegador para um endereço que não seja 127.0.0.1 é bloqueado e anotado. Desde a v3, nada deve tentar sair: as fontes vêm do site (10.7). Conferência: nenhum pedido.
- **O Chromium inteiro.** O próprio Chromium, por conta dele, tenta falar com o Google em segundo plano (atualização, conta, mensagens), mesmo sem a página pedir nada: na primeira rodada desta etapa, sem trava, um vigia externo (lsof) viu o processo do Chromium do ensaio conectado a endereços do Google. Agora o navegador é aberto com todo nome que não seja 127.0.0.1 virando "não encontrado" (`--host-resolver-rules`) e com todo pedido de fora mandado para um proxy que não existe (`--proxy-server=http://127.0.0.1:9`); o registro de rede do Chromium (netlog), na pasta temporária, é lido no fim. Conferência: nenhuma conexão TCP fora de 127.0.0.1. Linhas INFO mostram as tentativas de fundo recusadas (clients2.google.com, accounts.google.com, www.google.com, update.googleapis.com, android.clients.google.com) e uma "conexão" UDP ao endereço [2001:4860:4860::8888]:443, que é o teste de IPv6 do Chromium: ele só abre o UDP para descobrir o endereço local da máquina, sem mandar dado.
- **O wrangler.** Na mesma primeira rodada, o vigia viu o wrangler conectado a workers.cloudflare.com: é o miniflare buscando o cf.json (os dados de localização que o Workers põe no pedido). Agora o wrangler sobe com CLOUDFLARE_CF_FETCH_ENABLED=false, WRANGLER_HIDE_BANNER=true (sem a procura de versão nova no registro do npm), WRANGLER_SEND_METRICS=false e DO_NOT_TRACK=1, e com a trava rede-so-local.cjs carregada em todo processo Node dele (NODE_OPTIONS=--require): todo pedido de nome ou conexão para fora da máquina é recusado e anotado. Conferência: nenhuma tentativa. Prova de que a trava pega: rodado uma vez sem os quatro avisos, a conferência deu FALHOU com workers.cloudflare.com.

Nas duas rodadas finais, o vigia externo (lsof a cada meio segundo nos processos do wrangler, do workerd, do Chromium e do ensaio; script fora do repositório) não viu nenhuma conexão fora de 127.0.0.1.

## Resultado do ensaio

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

**O navegador:** o visual não é conferido aqui (os prints das etapas 23 e 34 conferem). O quiz roda no site montado, servido pelo workerd, e não no celular de verdade.

**Contorno sem wrangler** (`--sem-wrangler`): o handler do garçom roda num servidor Node, com um ASSETS simples que lê a pasta montada. Não imita o binding de assets da Cloudflare (por exemplo, o redirecionamento de /quiz para /quiz/); serve só se o wrangler dev falhar. Esse ASSETS entrega HTML e CSS sem charset, como a Cloudflare entregou em 09/11, para o garçom ter de acrescentar.

## O que não fazer

- Não pôr .dev.vars, segredo ou chave de verdade nesta pasta nem em entregas/prototipo-funil-01/: o ensaio não precisa, e o detector de chaves barra.
- Não apontar o ensaio para o Supabase ou para a Cloudflare de verdade: ele foi feito para 127.0.0.1.

## Perguntas

prompts/08-fila-perguntas.md, seção "Etapa 25"; prompts/11-fila-perguntas.md, seção "Etapa 35".
