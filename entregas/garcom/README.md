---
id: garcom
versao: 7
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: banco-rascunho
    versao: 4
  - id: banco-migracao-001
    versao: 1
  - id: banco-migracao-004
    versao: 1
  - id: planta-do-banco
    versao: 6
  - id: decisoes
    versao: 15
  - id: funil-01
    versao: 5
  - id: funil-01-planilha-sdr
    versao: 2
  - id: regra-seguranca
    versao: 3
  - id: lacunas
    versao: 8
desatualizado: true
---

# Garçom · rascunho

**Versão 7 (25/11/2026, pedido 24, item 2 e item 4).** A proteção contra robô, a mais leve que funciona e sem operador de dados novo, e a contagem das recusas. (1) **Limite de pedidos por IP** nas duas portas públicas, antes de qualquer conferência, pelos limitadores de Workers Rate Limiting da Cloudflare declarados no wrangler.toml do protótipo (v15): `LIMITE_FIM_QUIZ`, 10 fins de quiz por minuto por IP, e `LIMITE_EVENTO`, 60 eventos por minuto por IP. Passou do limite: 429 `pacote recusado`, com `Retry-After: 60`. A chave é o IP de quem pede (cabeçalho CF-Connecting-IP, que a própria Cloudflare põe); o IP fica só no limitador da Cloudflare, nunca no banco nem no registro. Os limites são folgados de propósito, porque a Cloudflare avisa que muita gente pode sair pelo mesmo IP (operadora de celular). Se o limitador faltar ou falhar, o garçom deixa passar (falha aberta): um lead de verdade nunca é barrado por defeito do limitador. (2) **No fim do quiz, a armadilha e o tempo mínimo.** O pacote ganha o bloco `protecao`, com `armadilha` (o campo que pessoa nenhuma vê nem preenche, até 200 caracteres) e `duracao_s` (os segundos entre abrir a página e mandar o contato, no relógio da página, um número inteiro de 0 a 604.800, uma semana de aba aberta). Sem o bloco: 422 `protecao-faltando`; fora do formato: `protecao-formato`; armadilha preenchida: `armadilha`; menos de 20 segundos: `rapido-demais`. O bloco sai do pacote antes de gravar: nada dele chega ao banco. O pacote de antes, sem o bloco, passa a ser recusado: a página v14 tem de ir ao ar junto (APLICAR-24). (3) **Toda recusa das portas públicas soma 1 na tabela `recusas`** do banco (migração 004), pela função `registrar_recusa`, com a chave publicável: só o dia, a porta e o motivo, nenhum dado do pacote nem o IP. Roda depois da resposta (não atrasa ninguém). Para uma enxurrada de recusas não virar uma enxurrada de gravações, o limitador `LIMITE_REGISTRO` deixa somar até 30 por minuto para cada porta e motivo; as outras ficam no registro da Cloudflare como `recusa-nao-contada`. Nenhuma recusa é silenciosa: quem é recusado vê o aviso de falha com "Tentar de novo", e a contagem fica no banco. (4) **`/api/evento` aceita `utm_medium`, `utm_content` e `utm_term`**, opcionais e saneadas como no fim do quiz (minúsculas, letras, números, hífen e sublinhado, até 100; fora disso, vazias), para a medição por criativo desde a abertura do quiz (KR 2.1). **Não entrou:** o Turnstile da Cloudflare, que seria um operador novo de dados do navegador e pediria mudar a política de privacidade antes; e a recusa do mesmo e-mail repetido, porque o banco já junta a mesma pessoa pelo e-mail e pelo telefone, e uma recusa por e-mail barraria quem refaz o quiz de verdade. Teste local: **438 de 438** (eram 386). Precisa da migração 004 no banco antes; publicação pelo roteiro entregas/prototipo-funil-01/APLICAR-24.md.

**Versão 6 (18/11/2026, #121).** Meta-ads entra na lista de utm_source. A porta do fim do quiz aceita nove campos novos, todos opcionais: utm_medium, utm_content, utm_term, fbclid, fbp, fbc, id_lead, id_qualificado e qualificado. O pacote de antes, sem eles, continua passando igual, para nenhum lead falhar durante a troca. Os campos novos são saneados e nunca recusam o lead (sanearOrigemEIds): utm de texto livre fora do formato vira vazia (e vai em minúsculas); fbclid fora do formato vira vazio; fbp e fbc fora do formato saem do pacote; os três ids, se não forem coerentes, saem juntos. O registro anota só os nomes dos campos mexidos, nunca o valor. A visita, o início do quiz e o clique continuam sem esses campos (campo desconhecido na porta /api/evento). Precisa da migração 003 no banco antes (dados/banco/migracoes/003-origem-e-ids.sql); com o banco sem ela, os campos novos seriam ignorados pela função antiga, mas meta-ads seria recusada pela lista antiga do banco. Teste local: 386 de 386 (eram 360). Publicação: entregas/prototipo-funil-01/APLICAR-22.md.

A função que fica entre as páginas do protótipo e o banco (funis/funil-01/funil.md, "Caminho do dado", passos 2 e 5), escrita como um Cloudflare Worker em JavaScript, sem dependências externas. **Publicada pela primeira vez em 09/11/2026, na v2, no Worker do protótipo, ligada ao banco de teste, só com leads de teste (#102). A v4 está no ar desde 09/11/2026, 19h16** (publicada pelo Otávio pelo roteiro da etapa 35; entregas/prototipo-funil-01/README.md, "Publicações"; até a v4 deste documento, esta frase ainda dizia que a v3 e a v4 não tinham sido publicadas). A v4 só funciona por inteiro depois da migração 001 rodar no Supabase (dados/banco/migracoes/001-v3.sql): antes dela, a porta nova /api/evento responde `servico indisponivel`, e o resto continua igual. **A v5 (decisão #120: o endereço novo e o quiz em /analise/) não foi publicada:** vai ao ar só pelo roteiro entregas/prototipo-funil-01/APLICAR-21.md, que nasce na parte 21.3 do pedido 21, depois de a zona gotriad.com.br estar ativa na Cloudflare.

**Status.** Rascunho, pendente do Otávio. Continua desatualizado, porque se apoia em documentos marcados (banco-rascunho, banco-migracao-001 e funil-01-planilha-sdr; regra 11.1). O formato dos pacotes vem da planta (dados/planta/planta.md); desde a v4 o garçom não declara mais a página do quiz, que é quem o chama (23.11).

**Destino dos contatos em conflito · bloqueado para entrega até a decisão** (conflito-17, em base/lacunas.md). Este código segue o lado 2 (#90: banco pelo garçom e planilha do SDR), como a planta e o funil-01, sem escolher. Se o lado 1 (Triad CRM) vencer, só a gravação e a porta da planilha mudam; as conferências continuam valendo. O protótipo de teste não é entrega: com gente de verdade, nada vai ao ar antes da decisão.

**Antes de tráfego real:** a proteção contra robô e o limite de pedidos entram na v7, que só vale depois de publicada pelo roteiro APLICAR-24 (log.md, Pendências).

## O que tem dentro

| Arquivo | O que é |
|---|---|
| garcom.mjs | O Worker: as três portas em /api/ (duas públicas e a privada), os arquivos do protótipo pelo binding de assets, as funções `conferirPacote`, `conferirEvento`, `lerCursor` e `chaveConfere` e, desde a v5, os redirecionamentos do endereço antigo e do caminho antigo do quiz (`caminhoNovo`) |
| teste/testar-garcom.mjs | Teste local, com um fetch falso que só registra o que seria chamado e um ASSETS falso |

## O que mudou da versão 4 para a 5

Pedido 21 (prompts/21-dominio-e-caminho-da-analise.md, parte 21.2), 14/11/2026. Decisão do Otávio, 13/11/2026 (base/decisoes.md, #120): o funil vai para https://svsafra.gotriad.com.br e o quiz, para /analise/. Os pontos 1 a 4 da leitura do mentor na #120 são o que este código faz. Nada publicado.

- **No endereço antigo, pedido de página leva ao endereço novo** (302, temporário, porque ainda é protótipo): mesmo caminho, com /quiz virando /analise, e a consulta (tudo depois do `?`) inteira. "Pedido de página" é tudo o que não é /api/. O endereço antigo chega pela variável comum nova `ENDERECO_ANTIGO`; o novo é o da `ORIGEM_PERMITIDA`. Sem a variável, com ela vazia ou ilegível, ou com ela igual ao endereço novo, nenhum pedido muda de endereço: é assim que o teste local e o ensaio continuam valendo.
- **No endereço novo, /quiz e /quiz/ levam a /analise/** (302), com a consulta inteira. O prefixo é trocado: /quiz/qualquer-coisa leva a /analise/qualquer-coisa. /analise sem a barra final já funcionava pelo binding de assets e não ganhou código (seção "Endereço antigo e caminho novo").
- **As rotas /api/ nunca são redirecionadas**, em nenhum dos dois endereços: um POST redirecionado se perde, e a planilha do SDR chama a porta privada pelo endereço antigo. A porta privada responde igual nos dois. As portas públicas continuam com a mesma regra de origem, sem mudança de código: como a `ORIGEM_PERMITIDA` passa a ser o endereço novo (entregas/prototipo-funil-01/wrangler.toml), a origem nova é aceita e a antiga, recusada.
- **noindex em toda resposta, inclusive nos redirecionamentos novos**, que saem sem corpo e com `Cache-Control: no-store`. Nenhum cabeçalho de CORS novo.
- **Sem laço:** só o endereço antigo leva ao novo; no novo, nada volta ao antigo, e /analise/ não é redirecionado.
- O resto da v4 continua igual: as conferências dos pacotes, a porta privada, o charset e o registro sem dado pessoal. depende_de fica em dia: decisoes 10 (a #120), banco-rascunho 4 (a v4 do banco foi correção de forma, só comentários do esquema.sql e a documentação do catálogo; as funções que o garçom chama não mudaram) e lacunas 7 (o conflito-17, que este código cita, não mudou da v6 para a v7). Continua desatualizado, pelas bases marcadas.

## O que mudou da versão 3 para a 4

Etapa 33 (prompts/11-decisoes-de-09-11.md), 09/11/2026, com as respostas do Otávio de 09/11/2026 (decisão do Otávio, 09/11/2026) e a migração 001 do banco (dados/banco/migracoes/001-v3.sql).

- **Porta pública nova, POST /api/evento** (18.4, 18.5, 10.6, 10.8): a visita, o início do quiz e o clique no fim do quiz, com as mesmas travas de /api/fim-quiz (mesma origem, método, tamanho, formato, etiquetas, lista fechada, registro sem dado pessoal), gravados pela função nova `registrar_evento` com a chave publicável. Esses eventos não levam dado de pessoa e por isso não pedem aceite. O nome da rota é escolha provisória (pergunta 33.1).
- **O fim do quiz não muda.** /api/fim-quiz aceita só fim_quiz e grava só por `registrar_fim_quiz`, como antes; a visita e o clique mandados para lá continuam recusados. `TIPOS_PROPOSTOS` saiu: o clique foi ligado, só por /api/evento.
- **Sem pré-voo e sem CORS** (22.2): o OPTIONS não é mais atendido e cai na conferência de método (405, `Allow: POST`); nenhuma resposta leva Access-Control-Allow-Origin. Na mesma origem o navegador não precisa de nenhum dos dois (#101; testado no protótipo em 09/11/2026).
- **Só a planta define o pacote** (23.11): o depende_de deixa de citar quiz-01-pagina, e passa a citar banco-migracao-001 1 e as versões atuais da planta (4), do banco (3), das decisões (5), do funil-01 (3), da planilha-sdr (2), da regra de segurança (3) e das lacunas (6).
- **A porta privada e os arquivos não mudam:** /api/planilha/leads-novos e o charset dos arquivos ficam exatamente como na v3.

## O que mudou da versão 2 para a 3

Pedido 09 (prompts/09-acentos-do-quiz.md), 09/11/2026. Depois da primeira publicação, o quiz em /quiz/ apareceu com os acentos quebrados ("estÃ¡", "diagnÃ³stico"): a Cloudflare entrega os arquivos como `text/html`, sem charset, e a página do quiz não tem `<meta charset>` (herança do mockup), então o navegador a lia como windows-1252. Isso estragaria também o texto do consentimento e as respostas que o quiz manda ao banco.

- **Charset nos arquivos de texto.** Toda resposta de arquivo do tipo text/html, text/css ou JavaScript (text/javascript, application/javascript, application/x-javascript) que chega sem charset sai com `; charset=utf-8`. Se o arquivo já vem com um charset, fica como veio. Outros tipos (imagem, JSON) e arquivo sem Content-Type não mudam. O corpo nunca é mexido. Função `comCharset`, exportada para o teste.
- **Forma, guardada para esta versão (triagem da etapa 27):** wrangler.toml.exemplo apagado, porque a configuração de verdade mora em entregas/prototipo-funil-01/wrangler.toml (22.8); o teste não troca mais o nome e o e-mail do exemplo, que o README do quiz já traz marcados como teste, e passa a parar com erro se o exemplo deixar de vir marcado (23.4).
- O resto da v2 continua igual.

## O que mudou da versão 1 para a 2

Decisões #100 e #101 (base/decisoes.md) e o banco v2 (dados/banco/README.md).

- **Um Worker só** (#101): o safra-prototipo-funil-01 serve as páginas (variante A em /, variante B em /b/, quiz em /quiz/) e o garçom em /api/. As rotas /api/ são atendidas antes dos arquivos.
- **Duas portas, uma chave do Supabase para cada** (#100). A porta pública grava com a chave publicável; a porta privada, nova, lê com a chave secreta. Nenhuma porta usa a chave da outra, nem quando falta a sua.
- **Segredos com nomes novos:** SUPABASE_CHAVE_PUBLICAVEL, SUPABASE_CHAVE_SECRETA e CHAVE_PLANILHA. SUPABASE_SERVICE_KEY sai. SUPABASE_URL e ORIGEM_PERMITIDA passam a ser variáveis comuns.
- **Mesma origem:** ORIGEM_PERMITIDA vale o próprio endereço do protótipo.
- **noindex em toda resposta** (#101): cabeçalho X-Robots-Tag: noindex nas duas portas, nos erros e nos arquivos.
- **Telefone com 8 a 15 dígitos**, a mesma regra do banco v2.
- O resto da v1 continua igual.

## As rotas

| Rota | Quem chama | O que faz |
|---|---|---|
| POST /api/fim-quiz | A página do quiz, no navegador do lead | Porta pública: confere o pacote e grava pela função `registrar_fim_quiz` com a chave publicável |
| POST /api/evento | A landing (visita) e a página do quiz (início do quiz e clique no fim), no navegador, a partir da etapa 34 | Porta pública (v4): confere o evento, sem pessoa e sem aceite, e grava pela função `registrar_evento` com a chave publicável |
| GET /api/planilha/leads-novos | O Apps Script da planilha do SDR (etapa 24) | Porta privada: só com a CHAVE_PLANILHA; devolve os leads novos pela função `leads_para_planilha` com a chave secreta |
| Outra rota em /api/ | Ninguém | 404 `{"ok":false,"erro":"nao encontrado"}`, sem detalhe |
| Página pedida pelo endereço antigo (v5) | O navegador de quem ainda tem o endereço antigo | 302 para o endereço novo, no mesmo caminho, com /quiz virando /analise e a consulta inteira |
| /quiz, /quiz/ e /quiz/qualquer-coisa, no endereço novo (v5) | O navegador de quem ainda tem o caminho antigo | 302 para /analise/, /analise/ e /analise/qualquer-coisa, com a consulta inteira |
| Todo o resto | O navegador | Arquivos do protótipo, pelo binding de assets (`env.ASSETS.fetch`), com o cabeçalho noindex acrescentado. Sem ASSETS (no teste), 404 simples |

## Porta pública · POST /api/fim-quiz

1. **Mesma origem.** O protótipo é servido pelo próprio Worker, e o navegador manda o cabeçalho Origin no POST. Só passa a origem igual a `ORIGEM_PERMITIDA` (uma barra no fim do valor da variável é ignorada); pedido sem origem ou de outra origem é recusado. Nunca há `Access-Control-Allow-Origin: *`. **Isto não protege contra robô:** a porta pública aceita qualquer envio que traga o cabeçalho Origin certo, o que um robô fora do navegador forja sem esforço; a conferência de origem só barra páginas de outros sites abertas no navegador. A proteção contra robô e o limite de pedidos ainda não estão ligados (log.md, Pendências). Nenhuma resposta leva cabeçalho de CORS (v4; 22.2).
2. **Método, tamanho e formato.** Só POST (outro método, inclusive o pré-voo OPTIONS, que saiu na v4, dá 405 com `Allow: POST`; 22.2); só corpo declarado exatamente como `application/json` (o tipo antes do ";" tem de ser esse, sem diferença de maiúscula: `application/json; charset=utf-8` passa, `application/jsonx` não); no máximo 16 KB, conferido pelo cabeçalho Content-Length e de novo lendo o corpo em partes, somando os bytes e parando com 413 assim que passa do máximo (sem Content-Length, o corpo grande nunca é lido inteiro); e só os campos que a planta tem: campo a mais é recusado.
3. **Etiquetas obrigatórias.** funil (da lista: funil-01), entrega e versao_entrega (formato do id e número inteiro), utm_source e utm_campaign presentes e, para valer, da tabela de origens do funil-01 (stories, bio, reels, email, whatsapp; funil-01). meta-ads está reservada e fica fora. O mesmo vale para a origem da primeira visita da pessoa. Utm fora da lista não recusa o pacote: é gravada vazia, como a planta manda (5.5), e o registro do garçom anota só o nome do campo esvaziado, nunca o valor (18.7). Utm que não é texto recusa o pacote. Se o par entrega e versão existe no catálogo, quem confere é o banco (18.8).
4. **Evento.** Só o fim do quiz (fim_quiz), com sessão, data, respostas, nota de 0 a 100, faixa (a, b, c ou eliminatorio) e versão do lead score. A visita, o início do quiz e o clique no fim do quiz não entram aqui: vão por /api/evento (v4).
5. **Pessoa.** Nome, e-mail e telefone no formato do banco v2: o telefone começa com + e tem de 8 a 15 dígitos (dados/banco/esquema.sql, gaveta pessoas).
6. **Consentimento obrigatório.** Pelo menos um canal aceito (WhatsApp ou e-mail), com o texto aceito e a data do aceite. Sem isso, nada é gravado.
7. **Gravação.** Chama só a função `registrar_fim_quiz` pela API REST do Supabase (`/rest/v1/rpc/registrar_fim_quiz`), com `SUPABASE_URL` e `SUPABASE_CHAVE_PUBLICAVEL` no cabeçalho apikey. A chave publicável nova não é JWT e não vai no Authorization; uma chave antiga em JWT iria também no Authorization, como na v1. O garçom não lê nenhuma tabela. Sem a chave publicável no cofre, responde `servico indisponivel` e não grava, mesmo que a secreta esteja lá.
8. **Respostas sem detalhe interno.** Quem envia só recebe `{"ok":true}` (201), `pacote recusado` (400, 403, 405, 413, 415, 422) ou `servico indisponivel` (502, 503). O motivo da recusa vai só para o registro da Cloudflare, sem nenhum dado do pacote.

## Porta pública · POST /api/evento

Nova na v4. A visita (landing), o início do quiz (registrado quando o quiz abre, 10.6) e o clique num botão do fim do quiz, depois do diagnóstico (18.4). O formato é o da planta v4 ("Tipos de evento", "Etiquetas obrigatórias em todo evento", "Outros campos do evento") e o da função `registrar_evento` da migração 001.

```
{ "evento": { "tipo": "visita", "funil": "funil-01", "entrega": "landing-page-01", "versao_entrega": 1,
              "utm_source": "bio", "utm_campaign": "funil-01",
              "id_sessao": "sessao-exemplo-0001", "ocorrido_em": "2026-11-20T14:05:00Z" } }
```

1. **As mesmas travas de /api/fim-quiz:** configuração completa (sem a chave publicável, 503, e a secreta nunca é usada), mesma origem (403), só POST (405, sem pré-voo), corpo declarado como `application/json` (415), JSON legível (400), registro sem dado pessoal. O código é o mesmo das duas portas (`portaPublica`), cada uma com o seu pacote e a sua função.
2. **Tamanho:** no máximo 2 KB, pelo Content-Length e de novo lendo o corpo em partes. O pacote de um evento tem perto de 300 bytes; o limite é mais apertado que o do fim do quiz, que leva as respostas (pergunta 33.2).
3. **Sem pessoa e sem aceite.** O pacote é só `{ "evento": {...} }`. Pacote com "pessoa", ou evento com qualquer campo de pessoa (nome, telefone, email, empresa, consentimento, primeira origem) ou com as respostas e a nota do quiz, é recusado (422, motivo `dado-de-pessoa` no registro). Campo fora da lista também (422). Por isso o evento não pede aceite: não há o que aceitar (planta v4).
4. **Etiquetas obrigatórias, com a chave presente** (planta v4; 10.8): funil, entrega, versao_entrega, utm_source e utm_campaign têm de vir no pacote; sem alguma delas, 422 (`etiqueta-faltando`). Etiqueta presente e vazia conta como etiqueta: a visita sem etiqueta no link entra com as utm vazias. Utm fora da lista entra vazia, e o registro anota só o nome do campo (5.5; 18.7). O par entrega e versão é conferido pelo banco, no catálogo (18.8).
5. **Lista fechada de tipos:** visita, inicio_quiz e interesse_pos_relatorio. fim_quiz por esta porta, ou qualquer outro tipo, é recusado (422).
6. **Sessão e data obrigatórias:** id_sessao no formato do banco (`sessao-` e até 60 letras minúsculas, números e hífen; 6.2, 18.5) e ocorrido_em em data e hora com fuso.
7. **O clique no fim do quiz** (interesse_pos_relatorio) leva clique_fim_quiz, um valor da lista: quero-conversa, chamar-whatsapp, tenho-interesse, agora-nao. A lista ainda é **proposta** (31.15; 32.1) e é a mesma da restrição do banco. Clique sem o valor ou fora da lista, ou clique_fim_quiz em outro tipo, é recusado (422).
8. **O clique só entra depois do fim do quiz gravado.** Quem confere é o banco: `registrar_evento` recusa o clique se a sessão não tiver o fim do quiz de uma pessoa só (32.2), e o garçom devolve 422 `pacote recusado`. O garçom não lê tabela nenhuma. A visita e o início do quiz entram sempre; o banco os liga à pessoa pelo fim do quiz da mesma sessão.
9. **Gravação e respostas:** `POST {SUPABASE_URL}/rest/v1/rpc/registrar_evento` com `{ "pacote": ... }` e a chave publicável no apikey. Gravado: 201 `{"ok":true}`. Recusa do banco (400, 409): 422 `pacote recusado`. Chave recusada, função que ainda não existe (migração não rodada) ou banco fora: 502 `servico indisponivel`. A página não espera nem tenta de novo: se a gravação falhar, o evento se perde sem aviso ao visitante (10.10, etapa 34).

## Porta privada · GET /api/planilha/leads-novos

1. **Chave.** Só abre com o cabeçalho `X-Chave-Planilha` igual ao segredo `CHAVE_PLANILHA`. A comparação é de tempo constante: o garçom compara os SHA-256 dos dois valores, que têm sempre 32 bytes, com `crypto.subtle.timingSafeEqual` (existe no Workers) ou, fora dele, com um laço XOR que percorre os 32 bytes inteiros. Sem a chave certa (cabeçalho ausente, vazio ou errado, segredo vazio ou ausente no cofre, ou segredo com menos de 32 caracteres, pergunta 22.4), responde 401 `{"ok":false,"erro":"nao autorizado"}`, sem detalhe, qualquer que seja o método ou o cursor. A chave é conferida antes de tudo.
2. **Método.** Só GET (com a chave certa, outro método dá 405).
3. **Cofre.** Sem `SUPABASE_URL` ou `SUPABASE_CHAVE_SECRETA`, 503 `servico indisponivel`. A chave secreta só é usada aqui.
4. **Cursor e limite pela query string.** Só três parâmetros; qualquer outro, ou um repetido, é recusado (400 `pedido recusado`):

| Parâmetro | O que é | Formato |
|---|---|---|
| depois_de_gravado_em | O horário do cursor | Como veio no `cursor_seguinte` da resposta anterior: data e hora com até 6 casas de fração (microssegundos) e o fuso em `Z`, `+HH:MM` ou `-HH:MM`. Exemplo: `2026-11-08T12:00:00.123456Z`. Data ou hora que não existe (30 de fevereiro, hora 24) é recusada pelo próprio garçom, sem chamar o banco |
| depois_de_id_pessoa | O id_pessoa do cursor | UUID |
| limite | Quantos leads, no máximo | Inteiro de 1 a 200; sem ele, 200. Acima de 200 é **recusado**, não cortado (pergunta 22.3) |

   Na primeira vez, sem cursor nenhum. Depois, os dois do cursor juntos: só um dos dois é recusado (o banco também recusa).

5. **O sinal de mais do horário.** O banco escreve o horário com o fuso "+00:00". Num endereço, um "+" sem codificar vira espaço, e o horário quebra. Por isso:
   - o garçom devolve o `cursor_seguinte` já com o fuso em `Z` (o mesmo instante, sem "+"), e o cliente pode mandá-lo de volta como está;
   - se o cliente mandar um horário com "+", precisa codificar como `%2B` (no Apps Script, `encodeURIComponent` faz isso);
   - um "+" sem codificar chega como espaço e é recusado (400), em vez de virar outro horário (pergunta 22.1).
   Os microssegundos vão ao banco exatamente como vieram; arredondados, a última linha voltaria repetida.
6. **Chamada ao banco.** `POST {SUPABASE_URL}/rest/v1/rpc/leads_para_planilha` com o corpo JSON `{"apos_gravado_em": ..., "apos_id_pessoa": ..., "quantos": ...}` (nulos na primeira vez) e a chave secreta no apikey (a secreta nova não é JWT).
7. **Resposta** (200, `Cache-Control: no-store`, sem cabeçalho de CORS):

```
{
  "leads": [ ... as linhas de leads_para_planilha, como vieram do banco ... ],
  "cursor_seguinte": { "depois_de_gravado_em": "...Z", "depois_de_id_pessoa": "..." } ou null,
  "pode_ter_mais": true ou false
}
```

   - `leads`: as colunas que dados/banco/README.md descreve ("A função da planilha"), inclusive `cursor_gravado_em`, sem mudança.
   - `cursor_seguinte`: o cursor da última linha. Lista vazia dá `null`: o cliente continua com o cursor que já tem.
   - `pode_ter_mais`: `true` quando a página veio cheia (tantos leads quanto o limite); o cliente pede de novo com o cursor seguinte.
   - Banco fora do ar, chave recusada pelo banco ou resposta fora do formato: 502 `servico indisponivel`. Cursor recusado pelo banco: 400 `pedido recusado`.
8. **Registro sem dado pessoal.** O registro da Cloudflare (console.log) recebe só códigos e contagens, como `[garcom] planilha: 2 leads` ou `[garcom] planilha: recusado: limite`. Nunca nome, telefone, e-mail, id_pessoa, cursor nem chave.

## Arquivos do protótipo

Tudo o que não é /api/ vai para `env.ASSETS.fetch(request)`, o binding de assets do Workers. A resposta dos arquivos é copiada e ganha o cabeçalho `X-Robots-Tag: noindex`; HTML, CSS e JavaScript sem charset ganham `; charset=utf-8` no Content-Type (v3); os outros cabeçalhos ficam como vieram. Sem ASSETS (no teste), 404 simples; com falha do ASSETS, 502 simples, os dois com noindex.

**Para a etapa 23:** a configuração do Worker precisa rodar o garçom antes dos arquivos em todo pedido (`run_worker_first = true` no bloco de assets). Sem isso, a Cloudflare entrega os arquivos direto, sem passar pelo garçom, e eles saem sem o cabeçalho noindex (só com a meta da página).

## Endereço antigo e caminho novo (v5)

Decisão #120. Depois das rotas /api/ e antes dos arquivos, o garçom olha o nome do endereço (o host, sem a porta) e o caminho do pedido:

1. **Endereço antigo.** Se o nome do endereço do pedido é o da variável `ENDERECO_ANTIGO`, a resposta é 302 com `Location` igual a `ORIGEM_PERMITIDA` mais o caminho mais a consulta. O caminho é o mesmo, salvo /quiz, que vira /analise (abaixo). Vale para qualquer página, arquivo ou método que não seja /api/. A comparação não diferencia maiúsculas e ignora a porta. O `#` do endereço não chega ao servidor: é o navegador que o guarda no redirecionamento (conferido num navegador sem tela).
2. **Caminho antigo do quiz.** No endereço novo (e em qualquer outro nome que não seja o antigo), /quiz e /quiz/ dão 302 para /analise/, e /quiz/qualquer-coisa, para /analise/qualquer-coisa, com a consulta inteira e `Location` relativo (começa por /analise, então nunca sai do site). /quizzes, /quiz-01 e /QUIZ/ não são o caminho antigo e seguem para os arquivos.
3. **/analise sem a barra final.** Não tem código aqui. O binding de assets da Cloudflare, no modo padrão (`html_handling` em `auto-trailing-slash`, que o wrangler.toml não muda), responde 307 para /analise/ com a consulta inteira, e o garçom acrescenta o noindex como em qualquer arquivo. Conferido no `wrangler dev --local` (4.158.0) em 14/11/2026: `/analise?a=1&b=2` dá 307 com `Location: /analise/?a=1&b=2`. Documentação: "HTML handling" (developers.cloudflare.com/workers/static-assets/routing/advanced/html-handling/, atualizada em 23/04/2026).
4. **Quando nada muda de endereço.** Sem `ENDERECO_ANTIGO`, com ela vazia, com um valor que não é endereço (tem de ser como a `ORIGEM_PERMITIDA`, com `https://` na frente), com ela igual ao endereço novo ou sem `ORIGEM_PERMITIDA`: o item 1 não acontece. O item 2 vale sempre.
5. **As rotas /api/ ficam de fora**, nos dois endereços. No endereço antigo, a porta privada responde como no novo (a planilha do SDR chama por ele até ser apontada para o novo, passo do Otávio), e as portas públicas aplicam a mesma regra de origem: só a origem nova passa. Depois da publicação, nenhuma página é servida pelo endereço antigo. A exceção é a hora da troca: quem já estava com o quiz aberto no endereço antigo manda a origem antiga, é recusado (403) e vê o aviso de falha do quiz. Por isso a publicação é para uma hora sem teste em andamento (roteiro APLICAR-21). Uma página do endereço novo que chamasse o antigo seria barrada pelo próprio navegador, porque o garçom não manda cabeçalho de CORS nem atende o pré-voo.
6. **As respostas.** 302, sem corpo, com `Location`, `Cache-Control: no-store` e `X-Robots-Tag: noindex`. O garçom não registra nada no console por redirecionamento.

Em dois saltos, no pior caso: quem pede /analise (sem a barra) pelo endereço antigo recebe 302 para o endereço novo em /analise e, lá, 307 para /analise/.

## Segredos e variáveis

Só os nomes aparecem no código. Os valores dos segredos moram nas variáveis secretas do Worker safra-prototipo-funil-01 (o cofre) e nunca entram no repositório nem passam por arquivo da máquina ou pelo chat (conexoes.md; nucleo/regras/seguranca.md):

| Nome | Tipo | O que é | Quem usa |
|---|---|---|---|
| SUPABASE_CHAVE_PUBLICAVEL | Segredo | Chave publicável do Supabase (papel anon), que só executa `registrar_fim_quiz` e, depois da migração 001, `registrar_evento` | Só as duas portas públicas |
| SUPABASE_CHAVE_SECRETA | Segredo | Chave secreta nova do Supabase (papel service_role), que só executa `leads_para_planilha` | Só a porta privada |
| CHAVE_PLANILHA | Segredo | Abre a porta privada; não é chave do Supabase. Mora também nas propriedades do script da planilha. Pelo menos 32 caracteres | Só a porta privada |
| SUPABASE_URL | Variável comum | Endereço do projeto no Supabase (não é segredo; conexoes.md) | As três portas |
| ORIGEM_PERMITIDA | Variável comum | O próprio endereço do protótipo, sem barra no fim. Desde a v5, o endereço novo: https://svsafra.gotriad.com.br (#120; até a v4, https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev; conexoes.md, linha da Cloudflare). Se vier com barra no fim, o garçom ignora a barra | As duas portas públicas e, desde a v5, o destino do redirecionamento do endereço antigo |
| ENDERECO_ANTIGO | Variável comum (v5) | O endereço antigo do protótipo, no mesmo formato da de cima: https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev. Só o nome do endereço é comparado. Sem ela, nenhum pedido muda de endereço | Só o redirecionamento das páginas |

Nenhum segredo novo na v4: a porta /api/evento usa a mesma chave publicável. Nenhum segredo novo na v5: a variável nova é comum e fica em [vars] do wrangler.toml. Nenhum segredo novo na v7: os três limitadores (`LIMITE_FIM_QUIZ`, `LIMITE_EVENTO` e `LIMITE_REGISTRO`) são bindings declarados no wrangler.toml, sem valor secreto, e nascem com a publicação; a contagem das recusas usa a mesma chave publicável.

## O que falta para funcionar

1. **Configuração do Worker** em entregas/prototipo-funil-01/ (etapa 23), com o binding ASSETS, `run_worker_first = true` e as duas variáveis comuns.
2. **Banco aplicado e conferido** no Supabase (dados/banco/README.md, "Como aplicar amanhã").
3. **Segredos no cofre**, pelo roteiro da etapa 26.
4. **Ligar a página:** `enviarPacote` do quiz-01 faz o POST para /api/fim-quiz, numa versão nova da página (etapa 23).
5. **Planilha do SDR** chamando a porta privada (etapa 24).
6. **Antes de tráfego real:** a proteção da v7 (limite de pedidos por IP, armadilha e tempo mínimo) publicada pelo roteiro APLICAR-24, com a migração 004 antes. O Turnstile ficou de fora (v7: pediria mudar a política de privacidade).
7. **Decisão do conflito-17** (Júnior e Euclides) e aprovação do Otávio.
8. **Para a v4:** a migração 001 rodada no Supabase antes de publicar (dados/banco/README.md, "Como aplicar"); a linha da landing no catálogo, sem a qual toda visita volta recusada (pergunta 32.4); a landing e o quiz mandando os eventos para /api/evento (etapa 34); a lista do clique respondida (31.15).
9. **Para a v5:** a zona gotriad.com.br ativa na conta da Cloudflare e a publicação pelo roteiro entregas/prototipo-funil-01/APLICAR-21.md (parte 21.3 do pedido 21); depois, a planilha do SDR apontada para o endereço novo, passo do Otávio (log.md, Pendências, "Domínio do funil (#120)").

## Como testar localmente, sem serviço real

```
node entregas/garcom/teste/testar-garcom.mjs
```

Precisa só do Node (18 ou mais novo), sem instalar nada. O teste importa o handler de garcom.mjs e troca o `fetch` por um falso, que só registra o que seria chamado e recusa qualquer endereço que não seja o de mentira; os arquivos vêm de um ASSETS falso. Os valores do ambiente são de mentira, e os endereços ficam num domínio `.invalid`, que não existe. A porta pública usa o pacote do exemplo do README do quiz-01 (entregas/quizzes/quiz-01/pagina/README.md, dados fictícios), lido do próprio README, que já o traz marcado como lead de teste (nome com TESTE na frente, e-mail @teste.invalid; #102), e casos inválidos. A porta /api/evento (v4) usa uma visita, um início do quiz e um clique de mentira, no formato da planta, com uma sessão fictícia, e repete para cada um os casos de recusa (origem, método, tamanho, formato, dado de pessoa, cada etiqueta ausente) e de aceite (utm vazia e fora da lista). A porta privada usa dois leads de mentira com a mesma marca. O teste captura o console e confere que nenhum nome, e-mail, telefone, id_pessoa, cursor ou chave de teste aparece no registro do garçom, que nenhuma resposta vaza detalhe interno, que toda resposta leva noindex e nenhuma leva cabeçalho de CORS (v4), e que HTML, CSS e JavaScript sem charset saem com charset utf-8, com o corpo intacto (v3). O caminho do Workers para a comparação de tempo constante (`crypto.subtle.timingSafeEqual`) é conferido com um timingSafeEqual de mentira, feito com o do próprio Node. O endereço antigo e o caminho novo (v5) usam dois endereços de mentira, o novo (o da `ORIGEM_PERMITIDA` do teste) e o antigo (`ENDERECO_ANTIGO`), e conferem: no antigo, cada página leva ao novo por 302, no mesmo caminho, com /quiz virando /analise, a consulta inteira (com parâmetro repetido, vazio, acento codificado e "+"), sem corpo e com noindex; a comparação do nome sem diferenciar maiúsculas e sem a porta; a porta privada respondendo no antigo e no novo; as duas portas públicas sem redirecionamento em nenhum dos dois, com a origem nova aceita e a antiga recusada; no novo, /quiz e /quiz/ levando a /analise/ com a consulta, e os caminhos parecidos (/quizzes/, /quiz-01/, /QUIZ/) seguindo para os arquivos; sem a variável do endereço antigo (ou com ela vazia, ilegível ou igual ao novo), nada mudando de endereço; e, seguindo o `Location`, um salto só até a página, sem laço.

### Resultado do teste (14/11/2026, v5)

```
Resumo por grupo (a saída inteira, linha a linha, sai ao rodar o comando acima):
  /api/fim-quiz ........................ 48  pacote do exemplo; consentimento; etiquetas; telefone; utm fora
                                            da lista gravada vazia; visita e clique recusados aqui; origem;
                                            método; OPTIONS (405 sem CORS; 403 de outra origem); tipo e
                                            tamanho do corpo, inclusive em partes; banco recusa ou fora do
                                            ar; cofre; chave antiga JWT
  /api/evento, por tipo ................ 78  26 casos para cada um (visita, inicio_quiz,
                                            interesse_pos_relatorio): aceito com registrar_evento e a chave
                                            publicável, pacote exatamente como veio; origem; GET e PUT; mais
                                            de 2 KB; formato; pessoa, e-mail e respostas recusados
                                            (dado-de-pessoa); cada uma das cinco etiquetas ausente; utm
                                            vazia aceita (10.8); utm fora da lista gravada vazia (5.5)
  /api/evento, gerais .................. 38  tipos fora desta porta; sessão; data; funil; versão; os quatro
                                            cliques, sem clique, fora da lista e em outro tipo; corpo em
                                            partes (parou em 2 KB); OPTIONS; banco recusa, sem a função
                                            (migração não rodou) ou fora do ar; cofre; cada porta só chama
                                            a sua função
  porta privada (planilha) ............. 62  chave e cofre; timingSafeEqual; método; cursor e limite;
                                            respostas do banco fora do formato
  rotas e arquivos ..................... 22  rotas /api/ desconhecidas; ASSETS; noindex; charset utf-8
  endereço antigo e caminho novo (v5) . 107  no endereço antigo, página leva ao novo por 302, no mesmo caminho,
                                            com /quiz virando /analise e a consulta inteira (36); as rotas
                                            /api/ nunca redirecionadas, a porta privada nos dois endereços, a
                                            origem nova aceita e a antiga recusada (21); no endereço novo,
                                            /quiz e /quiz/ levam a /analise/, e o resto segue para os arquivos
                                            (29); sem a variável do endereço antigo, nada muda de endereço
                                            (18); sem laço, um salto só (3)
  conferências gerais ................... 5  noindex em toda resposta; nenhuma com CORS; chave secreta nunca
                                            nas portas públicas; registro sem dado pessoal, cursor nem
                                            segredo

O que seria gravado no caso do exemplo (fetch falso, nada saiu da máquina):
  endereço: {SUPABASE_URL}/rest/v1/rpc/registrar_fim_quiz
  método: POST · cabeçalhos: Content-Type, Accept, apikey
  pessoa: nome, telefone, email, empresa, consentimento_whatsapp, consentimento_email, consentimento_texto, consentimento_em, primeira_utm_source, primeira_utm_campaign
  evento: tipo, funil, entrega, versao_entrega, utm_source, utm_campaign, id_sessao, ocorrido_em, respostas, lead_score_nota, lead_score_faixa, lead_score_versao
  etiquetas: funil-01, quiz-01, v1, bio, funil-01 · lead score 96, faixa a
O que seria gravado na visita (fetch falso):
  endereço: {SUPABASE_URL}/rest/v1/rpc/registrar_evento
  método: POST · cabeçalhos: Content-Type, Accept, apikey
  pacote: evento · evento: tipo, funil, entrega, versao_entrega, utm_source, utm_campaign, id_sessao, ocorrido_em
O que seria pedido pela porta privada (fetch falso):
  endereço: {SUPABASE_URL}/rest/v1/rpc/leads_para_planilha
  método: POST · cabeçalhos: Content-Type, Accept, apikey · corpo: apos_gravado_em, apos_id_pessoa, quantos

Tudo certo: 360 de 360 conferências passaram
```

Eram 253 de 253 na v4 (09/11/2026); as 107 novas são as do grupo "endereço antigo e caminho novo" (quatro delas vieram da revisão independente: o nome do endereço antigo com ponto no fim e a ORIGEM_PERMITIDA que não é texto).

O teste não cobre o banco: o fetch falso não executa as funções. A recusa do clique sem fim do quiz é simulada (o banco responde 400); a conferência de verdade de `registrar_evento` está em dados/banco/testar-migracao.mjs (PGlite), e a chamada de verdade às três funções, com cada chave, fica para o ensaio geral (etapa 35) e para o teste do Otávio no roteiro da etapa 35.

**Mudança de caminho na v5 (#120):** 14 conferências da v4 usavam /quiz/ como exemplo de página servida pelos arquivos (a página que vai para o ASSETS e ganha noindex, as dez do charset, a do arquivo sem Content-Type, a do ASSETS com falha e a lista de pedidos que o ASSETS recebeu). Na v5, /quiz/ é redirecionado; essas 14 passaram a pedir /analise/, onde o quiz mora, com o mesmo valor esperado de antes. /quiz/ ganhou conferências próprias no grupo novo. Nenhuma conferência saiu, e as outras 239 da v4 não mudaram.

**Mudança de expectativa na v4 (22.2):** até a v3, o caso "pré-voo do navegador (OPTIONS)" esperava 204 e uma segunda conferência esperava `Access-Control-Allow-Origin` igual à própria origem. Na v4 o pré-voo saiu: o caso passa a esperar 405 com `Allow: POST` e nenhum cabeçalho de CORS, e entra o OPTIONS de outra origem (403). O caso "tipo proposto, ainda não ligado (interesse_pos_relatorio)" continua esperando 422 em /api/fim-quiz, agora com o nome "clique no fim do quiz pela porta do fim do quiz", porque o clique foi ligado só em /api/evento. Os outros 131 casos da v3 continuam com a mesma expectativa.

**Dry-run do Worker** (09/11/2026, wrangler 4.158.0, sem login e sem publicar; entregas/prototipo-funil-01/README.md, "Como conferir com o dry-run"): o Worker monta com o garçom v4, 18,10 KiB (5,27 KiB comprimido; eram 15,91 KiB na v2), 9 arquivos do site e as mesmas ligações (ASSETS, SUPABASE_URL, ORIGEM_PERMITIDA). **Com o garçom v5** (14/11/2026, wrangler 4.158.0, do mesmo jeito): 19,21 KiB (5,60 KiB comprimido), 384 arquivos lidos da pasta do site e quatro ligações (ASSETS, SUPABASE_URL, ORIGEM_PERMITIDA e ENDERECO_ANTIGO).

### Como testar o endereço antigo no wrangler dev local (v5)

Descoberto rodando o `wrangler dev --local` (4.158.0) em 14/11/2026, com a configuração copiada para uma pasta temporária fora do repositório e segredos de mentira, como o ensaio faz:

- **Sem o bloco `[[routes]]` na cópia da configuração,** o garçom enxerga como nome do endereço o que vier no cabeçalho Host do pedido. Então `curl -H "Host: safra-prototipo-funil-01.sistemadevendassafra.workers.dev" "http://127.0.0.1:PORTA/quiz/?utm_source=bio"` devolve 302 para o endereço novo em /analise/?utm_source=bio, e o mesmo pedido em /api/planilha/leads-novos devolve 401 (sem a chave), não 302. No Node, `http.request` com o cabeçalho Host funciona; o `fetch` do Node ignora o Host e não serve para isto. Num navegador sem tela, o nome antigo pode ser mapeado para 127.0.0.1 (no Chromium, `--host-resolver-rules`), e a página aberta por `http://nome-antigo:PORTA/` é levada ao endereço novo.
- **Com o bloco `[[routes]]` na cópia,** o wrangler dev entrega ao garçom sempre o nome da rota (svsafra.gotriad.com.br), qualquer que seja o Host do pedido, e troca por `http://svsafra.gotriad.com.br` o Origin e o Referer que tiverem o nome do próprio servidor local. Com isso o endereço antigo não dá para simular, e um POST da página local à porta pública chega com uma origem que não é a `ORIGEM_PERMITIDA` local e é recusado (403). Para ensaiar em 127.0.0.1, a cópia temporária da configuração precisa ir sem o bloco `[[routes]]`.
- Nos dois casos o endereço chega com `http://`, porque o servidor local não tem certificado; na Cloudflare, chega com `https://`.

## Perguntas

prompts/07-fila-perguntas.md, 18.1 a 18.10; prompts/08-fila-perguntas.md, Etapa 22; prompts/11-fila-perguntas.md, Etapa 33. Da v5: log.md, entrada da 21.2 (14/11/2026), "Perguntas para o Otávio".
