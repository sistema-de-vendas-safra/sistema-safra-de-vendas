---
id: ensaio-prototipo-funil-01
versao: 2
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: banco-rascunho
    versao: 2
  - id: banco-conferir
    versao: 1
  - id: banco-catalogo-prototipo
    versao: 1
  - id: garcom
    versao: 3
  - id: prototipo-funil-01
    versao: 3
  - id: quiz-01-pagina
    versao: 2
  - id: landing-page-01-variante-a
    versao: 2
  - id: landing-page-01-variante-b
    versao: 2
  - id: planilha-sdr-funil-01
    versao: 1
  - id: lead-score
    versao: 2
  - id: decisoes
    versao: 4
  - id: regra-seguranca
    versao: 2
desatualizado: true
---

# Ensaio geral do protótipo do funil-01

Roda tudo junto, na máquina, sem nenhum serviço real: o banco, um Supabase de mentira, o site montado, o garçom, o quiz num navegador sem tela e a planilha do SDR com um Google de mentira. Serve para amanhã não ter surpresa (prompts/08-fila-da-madrugada.md, etapa 25).

**Status.** Rascunho, pendente do Otávio. Nasce desatualizado, porque se apoia em documentos marcados (garcom, quiz-01-pagina, as variantes da landing, banco-rascunho, planilha-sdr-funil-01; regra provisória 11.1).

**Protótipo de teste não é entrega.** O ensaio usa só leads de mentira (#102: nome começando por TESTE, e-mail @teste.invalid), só valores de mentira montados na hora e só o endereço 127.0.0.1. Nada vai ao ar, nada é publicado, ninguém faz login.

## Um comando só

De dentro desta pasta:

```
npm run ensaio
```

Ou da raiz do repositório: `node nucleo/ferramentas/ensaio/ensaio.mjs`. Leva perto de 25 segundos. Cada conferência sai com OK ou FALHOU; no fim, "Tudo certo: N de N" e código 0, ou "FALHOU: ..." e código 1.

Precisa de três instalações, todas dentro de nucleo/ferramentas/ (node_modules fica fora do Git): `npm install` nesta pasta (PGlite), em ../prototipo/ (wrangler) e em ../prints/ (playwright-core; o Chromium vem do cache do Playwright da máquina, como na ferramenta de prints).

Contorno, se o wrangler não subir: `npm run ensaio:sem-wrangler` roda o garçom num servidor Node (ver "Limitações"). O ensaio também passa para esse contorno sozinho se o wrangler não responder em cerca de 1 minuto, e diz isso na saída; nesse caso a conferência "wrangler dev no ar" fica FALHOU e o ensaio termina com código 1, para ninguém achar que o Worker foi conferido (25.7).

## O que tem dentro

| Arquivo | O que é |
|---|---|
| ensaio.mjs | O ensaio: liga tudo, confere tudo, desliga tudo |
| supabase-de-mentira.mjs | Um servidor em 127.0.0.1 que imita o pedaço da API do Supabase que o garçom usa |
| planilha-no-ensaio.mjs | Roda o Apps Script da planilha (Codigo.gs) com o Google de mentira de entregas/planilha-sdr-funil-01/teste/falsos.mjs, num processo à parte |
| package.json | O PGlite como dependência de desenvolvimento e os scripts `ensaio` e `ensaio:sem-wrangler` |

## O que o ensaio faz

1. **Banco.** Um Postgres que roda dentro do Node (PGlite 0.5.15, PostgreSQL 18.6), só na memória. Cria de mentira os papéis do Supabase: anon, authenticated, service_role (que passa por cima da RLS, como no Supabase) e **dono**, no lugar do postgres do Supabase (dono das tabelas, sem ser superusuário). Para conferir o pior caso, o dono começa com as permissões padrão que o Supabase daria (tudo para anon, authenticated e service_role no que ele criar). Aplica dados/banco/esquema.sql como o dono, duas vezes; roda dados/banco/conferir.sql e confere a linha "tudo certo" (13 de 13). Depois troca de papel (SET ROLE) e tenta de verdade: anon executa registrar_fim_quiz e nada mais; anon não lê tabela nem visão e não chama leads_para_planilha; authenticated não pode nada; service_role chama leads_para_planilha e nada mais; um papel qualquer, sem permissão dada, também não executa nada (PUBLIC).
2. **Supabase de mentira** em 127.0.0.1, porta livre (supabase-de-mentira.mjs). Recebe `POST /rest/v1/rpc/<funcao>` e, para os casos de erro, `GET` e `POST /rest/v1/<tabela>`. Lê o cabeçalho apikey: a chave publicável de mentira vira o papel anon, a secreta de mentira vira service_role; sem chave ou com chave desconhecida, 401. Cada pedido roda numa transação com SET LOCAL ROLE, como o PostgREST, e os erros do Postgres viram status parecidos com os do PostgREST: permissão negada é 401 para anon e 403 para os outros; chave estrangeira é 409; função que não existe é 404; restrição (CHECK) é 400. O PGlite tem uma conexão só: os pedidos entram numa fila e rodam um de cada vez.
3. **Site e garçom.** Roda entregas/prototipo-funil-01/montar-site.mjs. Copia entregas/prototipo-funil-01/wrangler.toml para uma pasta temporária **fora do repositório**, com só quatro trocas: os caminhos de main e de assets ficam absolutos, SUPABASE_URL aponta para o Supabase de mentira e ORIGEM_PERMITIDA para o endereço local. Confere que a cópia não tem endereço real (supabase.co, workers.dev). Os três segredos, de mentira, vão num arquivo dessa pasta temporária (`--env-file`), nunca num .dev.vars do repositório. Liga `wrangler dev --local` (workerd, o mesmo motor do Workers) com WRANGLER_SEND_METRICS=false, em 127.0.0.1. Confere /, /b/ e /quiz/ com noindex e uma rota /api/ desconhecida com 404. Desde a v2 (pedido 09), confere também que as três páginas saem com Content-Type `text/html` com charset utf-8 e com a meta charset nos primeiros 1024 bytes, e que os três CSS saem com charset utf-8.
4. **Catálogo** (pergunta 23.10). Sem a linha ('quiz-01', 1), o envio volta 422: o banco recusa pela chave estrangeira (409) e o garçom responde "pacote recusado". Depois aplica **dados/banco/catalogo-prototipo.sql**, o mesmo arquivo que o roteiro da etapa 26 vai mandar o Otávio rodar, duas vezes, e confere que fica uma linha só.
5. **Quiz no navegador sem tela** (playwright-core e o Chromium do cache, como a ferramenta de prints). Entra pela landing, clica no botão e percorre o quiz: pela variante A (/) com `?utm_source=bio&utm_campaign=funil-01`, em 1440, com as respostas do exemplo de base/lead-score.md (nota 96, faixa A); pela variante B (/b/) com `utm_source=stories`, em 375, com o caso eliminatório (faturamento "Menos de R$ 50 mil"). Pessoas de teste: TESTE Marina Ensaio e TESTE Paulo Ensaio, e-mails @teste.invalid, telefones com zeros. O navegador só fala com 127.0.0.1: as fontes do Google que o mockup carrega são bloqueadas e contadas. Confere que o navegador leu o quiz como UTF-8 (document.characterSet) e o título com os acentos certos; o document.compatMode sai numa linha INFO (o quiz não tem doctype, pergunta 09.1). Confere no banco as linhas de pessoas e eventos: nota, faixa, versão do lead score, consentimentos com texto e data, utm, etiquetas, sessão e respostas; e que o texto do consentimento chegou com os acentos certos, igual ao da página (o combinado, a frase da política de privacidade e as duas caixas, lidos da fonte do quiz; sem "Ã", "Â" nem caractere de substituição).
6. **Planilha do SDR.** Em outro processo (o UrlFetchApp de mentira é síncrono e trava a linha principal de quem chama), roda instalar() e buscar_() de Codigo.gs contra o garçom local, pela porta privada, com a CHAVE_PLANILHA de mentira. Confere: a primeira busca, logo depois do quiz, traz 0 linhas (a margem de 1 minuto do banco, 21.6); depois do contorno da margem (abaixo), traz 1 linha, só o lead faixa A, com as 19 colunas na ordem e os valores certos; rodar de novo não duplica; com o cursor perdido, também não; o registro da planilha não tem dado pessoal; com a chave errada, 401 e nada gravado.
7. **Casos de erro.** Chave publicável lendo tabela, visão, gravando direto ou chamando leads_para_planilha pelo Supabase de mentira: 401. Chave secreta lendo tabela ou gravando o fim do quiz: 403. Porta privada do garçom com a chave da planilha errada, sem chave ou com a publicável no lugar: 401 sem detalhe. Pacote sem consentimento: o garçom recusa (422) sem chamar o banco, e a função chamada direto com a publicável também recusa (400, restrição 23514). A mesma pessoa enviando duas vezes ao mesmo tempo (dois POST simultâneos ao garçom): uma pessoa só no banco e dois eventos.
8. **Fechamento.** conferir.sql de novo (13 de 13), a saída do garçom sem dado pessoal, sem id_pessoa e sem chave, e o garçom tendo usado só a publicável na porta pública e só a secreta na porta privada.

No fim, e também se algo falhar no meio ou se o ensaio for interrompido (Ctrl+C), fecha o navegador, o wrangler e o workerd (o grupo de processos inteiro), o processo da planilha, os servidores e o banco, e apaga a pasta temporária. O navegador é aberto sem os tratadores de sinal do Playwright (handleSIGINT, handleSIGTERM e handleSIGHUP desligados), senão ele encerraria o processo antes da limpeza. Conferido: interrompido com SIGINT no grupo de processos inteiro aos 8 e aos 14 segundos, os dois durante a seção do navegador, nenhum processo ficou rodando e a pasta temporária foi apagada.

## O contorno da margem de 1 minuto

leads_para_planilha só devolve fins de quiz gravados há mais de 1 minuto (21.6). Para não esperar 61 segundos, o ensaio, depois de conferir que a primeira busca vem vazia, faz como o superusuário do PGlite, numa sessão só: liga `session_replication_role = replica` (que desliga os gatilhos só nessa sessão), atrasa em 2 minutos o gravado_em dos fins de quiz das pessoas de teste, e volta para `origin`. O esquema não muda e a trava não é desligada na tabela: logo depois, o ensaio confere que o gatilho continua ligado e que apagar evento é recusado.

O que o contorno pula: a espera de verdade; a conta da margem com o relógio de verdade (a gravação e a leitura acontecem em segundos, e a margem é testada só no lado "ainda não"); e a ordem real entre o gravado_em (clock_timestamp, no fim da gravação) e o now() da leitura em conexões diferentes. Amanhã, no Supabase, o lead aparece na planilha de 1 a 6 minutos depois do quiz (21.6).

## Resultado do ensaio

**v2 (09/11/2026, pedido 09).** Rodado inteiro com o wrangler dev: 96 de 96. Com `--sem-wrangler`: 94 de 94. Para provar que as conferências novas pegam o defeito, rodado uma vez com o garçom v2 e o montador v2 de volta no lugar (desfeito logo depois): no contorno, que entrega sem charset como a Cloudflare, as três páginas e os três CSS deram FALHOU por falta de charset, e o quiz nem chegou ao fim (7 FALHOU, código 1); no wrangler dev, só a meta charset do quiz deu FALHOU (1 de 96), porque **o wrangler dev local já acrescenta o charset sozinho**. Foi por isso que o ensaio da v1 não pegou o problema: a Cloudflare de verdade entrega `text/html` sem charset, o wrangler dev não.

As linhas INFO só informam e não entram na contagem. Saída real da rodada com o wrangler dev:

```
Ensaio geral do protótipo do funil-01 · 2026-11-09T10:59:31.577Z
Só 127.0.0.1, só valores de mentira, só leads de teste (#102).

· 1. Banco local (PGlite) com os papéis do Supabase de mentira
INFO   · PGlite no ar (PostgreSQL 18.6 (PGlite 0.5.15)), papéis anon, authenticated, service_role e dono criados
OK     · esquema.sql aplicado pelo dono, primeira vez, sem erro
OK     · esquema.sql aplicado pelo dono, segunda vez, sem erro
OK     · depois do esquema · conferir.sql: linha "tudo certo" = true (13 de 13)
OK     · anon executa registrar_fim_quiz (passa da permissão e para na conferência do pacote: 22023)
OK     · anon não lê a tabela entregas (42501)
OK     · anon não lê a tabela pessoas (42501)
OK     · anon não lê a tabela eventos (42501)
OK     · anon não lê a tabela investimento (42501)
OK     · anon não lê a visão painel_numeros (42501)
OK     · anon não lê a visão contagem_analises_gratuitas (42501)
OK     · anon não grava direto na tabela pessoas (42501)
OK     · anon não chama leads_para_planilha (42501)
OK     · anon não chama a função da trava (42501)
OK     · authenticated não pode registrar_fim_quiz (42501)
OK     · authenticated não pode leads_para_planilha (42501)
OK     · authenticated não pode a tabela pessoas (42501)
OK     · authenticated não pode a visão painel_numeros (42501)
OK     · service_role chama leads_para_planilha (ok)
OK     · service_role não pode executar registrar_fim_quiz (42501)
OK     · service_role não pode ler a tabela pessoas (42501)
OK     · service_role não pode ler a tabela eventos (42501)
OK     · service_role não pode ler a visão painel_numeros (42501)
OK     · um papel qualquer, sem permissão dada (PUBLIC), não executa registrar_fim_quiz (42501)

· 2. Supabase de mentira em 127.0.0.1
INFO   · Supabase de mentira no ar em http://127.0.0.1:(porta livre)
OK     · sem apikey: 401 (401)
OK     · chave desconhecida: 401 (401)
OK     · chave secreta (service_role) chama leads_para_planilha: 200, lista vazia (200)
OK     · função que não existe: 404 (404)

· 3. Site montado e garçom rodando localmente
OK     · montar-site.mjs: site montado em entregas/prototipo-funil-01/site/ (fora do Git)
OK     · configuração temporária fora do repositório: só main, assets, SUPABASE_URL e ORIGEM_PERMITIDA trocados; nenhum endereço real
OK     · wrangler dev --local no ar (workerd), sem login, com os segredos de mentira por arquivo temporário
  modo do garçom: wrangler dev --local
  avisos do wrangler: nenhum
OK     · GET / (variante A): 200, X-Robots-Tag noindex e meta noindex (200)
OK     · GET / (variante A): Content-Type com charset utf-8 (text/html; charset=utf-8) e meta charset nos primeiros 1024 bytes
OK     · GET /b/ (variante B): 200, X-Robots-Tag noindex e meta noindex (200)
OK     · GET /b/ (variante B): Content-Type com charset utf-8 (text/html; charset=utf-8) e meta charset nos primeiros 1024 bytes
OK     · GET /quiz/ (quiz): 200, X-Robots-Tag noindex e meta noindex (200)
OK     · GET /quiz/ (quiz): Content-Type com charset utf-8 (text/html; charset=utf-8) e meta charset nos primeiros 1024 bytes
OK     · GET /tokens.css: Content-Type com charset utf-8 (text/css; charset=utf-8)
OK     · GET /estilo.css: Content-Type com charset utf-8 (text/css; charset=utf-8)
OK     · GET /b/estilo.css: Content-Type com charset utf-8 (text/css; charset=utf-8)
OK     · GET /api/nao-existe: 404 com noindex (404)

· 4. Catálogo de entregas (pergunta 23.10)
OK     · sem a linha (quiz-01, 1) no catálogo, o banco recusa pela chave estrangeira (409) e o garçom responde 422
OK     · e nada ficou no banco (0 pessoas)
OK     · outra origem: 403 (403)
OK     · dados/banco/catalogo-prototipo.sql aplicado pelo dono, primeira vez: mostra a linha quiz-01, versão 1
OK     · dados/banco/catalogo-prototipo.sql aplicado pelo dono, segunda vez: mostra a linha quiz-01, versão 1
OK     · catálogo com uma linha só (rodar de novo não duplica)

· 5. Quiz no navegador sem tela, entrando pela landing
OK     · exemplo (1440): a landing / leva a /quiz/ com utm_source=bio, utm_campaign=funil-01 e id_sessao
OK     · exemplo: POST /api/fim-quiz gravado (201), tela do plano, sem aviso de falha
OK     · eliminatório (375): a landing /b/ leva a /quiz/ com utm_source=stories
OK     · eliminatório: POST /api/fim-quiz gravado (201), tela do relatório, sem aviso de falha
OK     · console das páginas sem dado de pessoa
OK     · quiz lido como UTF-8 nos dois casos (document.characterSet UTF-8, UTF-8), título com os acentos certos
INFO   · quiz em document.compatMode BackCompat (sem doctype; pergunta 09.1)
OK     · banco · pessoas: o lead do exemplo, com nome TESTE, e-mail @teste.invalid e telefone como a página mandou
OK     · banco · pessoas: consentimento por WhatsApp e e-mail, com o texto aceito e a data
OK     · banco · pessoas: texto do consentimento com os acentos certos (o combinado, a política de privacidade e as duas caixas, iguais aos da página)
OK     · banco · pessoas: primeira visita bio, funil-01
OK     · banco · eventos: um fim_quiz com nota 96, faixa a, versão 2 do lead score (veio 96, a)
OK     · banco · eventos: etiquetas funil-01, quiz-01 v1, utm bio e funil-01, gravado pelo garçom, com sessão
OK     · banco · eventos: as respostas do quiz gravadas
OK     · banco · o eliminatório: faixa eliminatorio (nota 81), utm stories
OK     · banco: 2 pessoas e 2 eventos, nada a mais

· 6. Planilha do SDR (Apps Script de mentira) pela porta privada
OK     · instalar(): aba fila criada, cabeçalhos e gatilho
OK     · primeira busca logo depois do quiz: 200 e 0 linhas (a margem de 1 minuto do banco segura os leads recém-gravados, 21.6)
OK     · contorno da margem: gravado_em dos 2 fins de quiz de teste atrasado 2 minutos (trava desligada só nesta sessão e religada)
OK     · a trava dos eventos continua ligada: apagar evento é recusado (P0001)
OK     · segunda busca: 1 linha nova (só o lead faixa A; o eliminatório nem vem do banco) (1)
OK     · aba fila: as 19 colunas de planilha-sdr.md, na ordem
OK     · linha do lead A: id_pessoa, nome, telefone e e-mail iguais aos do banco
OK     · o eliminatório não está na planilha
OK     · linha do lead A: faixa a, nota 96, consentimentos sim, empresa e respostas_a_confirmar vazias
OK     · linha do lead A: entrou_em no horário de Brasília (AAAA-MM-DD HH:MM:SS), 0 tentativas, estágio captado, estado e data_volta vazios
OK     · linha do lead A: as colunas do SDR (canal, contato_em, reuniao_em, produto) ficaram vazias
OK     · rodar de novo: 0 linhas novas, a aba continua com 1 lead (não duplica)
OK     · cursor perdido: pede desde o início, acha o lead repetido e não duplica; cursor salvo de novo
OK     · registro da planilha (5 linhas) sem dado pessoal, sem id_pessoa e sem chave
OK     · planilha com a CHAVE_PLANILHA errada: 401, nada gravado (nao-autorizado)

· 7. Casos de erro
OK     · chave publicável: GET /rest/v1/pessoas recusado com 401 e sem dado (401)
OK     · chave publicável: GET /rest/v1/eventos recusado com 401 (401)
OK     · chave publicável: GET /rest/v1/painel_numeros (visão) recusado com 401 (401)
OK     · chave publicável: POST /rest/v1/pessoas (gravar direto) recusado com 401 (401)
OK     · chave publicável: leads_para_planilha recusado com 401 e sem dado (401)
OK     · chave secreta: GET /rest/v1/pessoas recusado com 403 (service_role só tem a função da planilha) (403)
OK     · chave secreta: registrar_fim_quiz recusado com 403 (403)
OK     · garçom · porta privada com a chave da planilha errada: 401 sem detalhe
OK     · garçom · porta privada sem chave: 401 (401)
OK     · garçom · porta privada com a chave publicável no lugar: 401 (401)
OK     · garçom · porta privada com a chave certa: 200, 1 lead, cursor_seguinte com fuso em Z
OK     · garçom · pacote sem consentimento: 422 e o banco nem é chamado (422)
OK     · banco · registrar_fim_quiz chamado direto com a publicável, sem consentimento: recusado pela restrição (400, 23514)
OK     · e nenhuma pessoa nova entrou
OK     · dois POST ao mesmo tempo da mesma pessoa: os dois gravados (201, 201)
OK     · uma pessoa só no banco e dois eventos fim_quiz ligados a ela (2)

· 8. Fechamento
OK     · no fim · conferir.sql: linha "tudo certo" = true (13 de 13)
OK     · saída do garçom (wrangler dev, 17 linhas [garcom]) sem dado pessoal, sem id_pessoa e sem chave
OK     · o garçom só chamou registrar_fim_quiz com a publicável (anon) e leads_para_planilha com a secreta (service_role) (10 chamadas)
OK     · navegador: fora de 127.0.0.1 só tentou as fontes do Google, e foram bloqueadas: 2 pedidos (fonts.googleapis.com)
  tempo do ensaio: 25 s

Tudo certo: 96 de 96 conferências passaram
```

**v1 (madrugada de 08 para 09/11/2026).** 88 de 88 duas vezes seguidas e 86 de 86 com `--sem-wrangler`. Prova de que pega erro: uma permissão de leitura a mais para anon, acrescentada de propósito ao fim de esquema.sql e desfeita pelo Git, deu 6 FALHOU e código 1.

## Limitações e o que fica para amanhã

**O que o PGlite e o Supabase de mentira não provam** (só se confere no Supabase de verdade):

- **Corrida de verdade.** O PGlite tem uma conexão só, e o Supabase de mentira põe os pedidos numa fila. Os dois envios simultâneos chegam juntos ao garçom, mas no banco rodam um depois do outro: o segundo acha a pessoa que o primeiro gravou. O caminho em que o segundo envio espera o primeiro no índice único (`on conflict do nothing` e a volta do laço) não roda aqui (21.15). Amanhã: mandar o mesmo lead de mentira duas vezes quase juntas e conferir uma pessoa e dois eventos.
- **Os papéis e permissões do próprio Supabase.** Os papéis daqui são de mentira; o dono imita o postgres do Supabase e começa com as permissões padrão do pior caso. As permissões que o Supabase dá de fato aos papéis dele, e as de outros donos (supabase_admin), só aparecem no conferir.sql de amanhã.
- **A API de verdade.** O Supabase de mentira imita o PostgREST no que o garçom usa; não é o PostgREST. Ficam para amanhã: a troca da chave publicável e da secreta novas pelo papel (feita pelo Supabase antes do PostgREST), os status e mensagens exatos (por exemplo, 401 ou 403 na leitura de tabela, e 204 ou 200 na gravação), o limite de 3 segundos por comando do anon (statement_timeout) e as chaves antigas (legacy), que continuam valendo até serem desativadas.
- **Versão do Postgres.** O PGlite é o PostgreSQL 18.6; o projeto do Supabase pode ter outra versão. O esquema não usa nada novo, mas a confirmação é o esquema.sql rodar sem erro no editor SQL amanhã.
- **Fuso.** O banco do ensaio roda em UTC, como o Supabase; o horário de Brasília na planilha é conta do Apps Script de mentira (24.13).

**O que o wrangler dev local não prova** (só se confere na Cloudflare de verdade): o Content-Type que a Cloudflare dá aos arquivos (o wrangler dev já põe charset; a borda, não; v2), o endereço workers.dev, HTTPS, o `run_worker_first` na borda da Cloudflare, os segredos no cofre, o registro da Cloudflare (aqui, a saída do wrangler) e o garçom falando com o Supabase pela internet. O wrangler dev rodou sem login; o ensaio não confere se o wrangler fala com a rede por conta própria (por exemplo, para ver se há versão nova), mas o garçom só chama o Supabase de mentira e a configuração temporária não tem endereço real.

**Para o roteiro da etapa 26:**

- rodar dados/banco/catalogo-prototipo.sql depois do conferir.sql (e antes do teste com o lead de mentira); sem a linha, todo envio volta 422 (23.10);
- no teste de amanhã, mandar dois envios quase juntos do mesmo lead de mentira e conferir no Supabase uma pessoa e dois eventos (25.5).

**O que o Google de mentira não prova:** tudo da pergunta 24.13 (autorização, gatilho de 5 minutos rodando sozinho, formatos e listas no Google Planilhas de verdade).

**O navegador:** as fontes do Google são bloqueadas no ensaio, então o visual não é conferido aqui (os prints da etapa 23 conferem). O quiz roda no site montado, servido pelo workerd, e não no celular de verdade (passo 5 do roteiro da etapa 26).

**Contorno sem wrangler** (`--sem-wrangler`): o handler do garçom roda num servidor Node, com um ASSETS simples que lê a pasta montada. Não imita o binding de assets da Cloudflare (por exemplo, o redirecionamento de /quiz para /quiz/); serve só se o wrangler dev falhar. Desde a v2, esse ASSETS entrega HTML e CSS sem charset, como a Cloudflare entregou em 09/11, para o garçom ter de acrescentar.

## O que não fazer

- Não pôr .dev.vars, segredo ou chave de verdade nesta pasta nem em entregas/prototipo-funil-01/: o ensaio não precisa, e o detector de chaves barra.
- Não apontar o ensaio para o Supabase ou para a Cloudflare de verdade: ele foi feito para 127.0.0.1.

## Perguntas

prompts/08-fila-perguntas.md, seção "Etapa 25".
