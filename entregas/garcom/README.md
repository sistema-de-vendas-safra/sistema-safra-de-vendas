---
id: garcom
versao: 3
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: banco-rascunho
    versao: 2
  - id: planta-do-banco
    versao: 3
  - id: decisoes
    versao: 4
  - id: funil-01
    versao: 2
  - id: funil-01-planilha-sdr
    versao: 1
  - id: quiz-01-pagina
    versao: 1
  - id: regra-seguranca
    versao: 2
  - id: lacunas
    versao: 5
desatualizado: true
---

# Garçom · rascunho

A função que fica entre as páginas do protótipo e o banco (funis/funil-01/funil.md, "Caminho do dado", passos 2 e 5), escrita como um Cloudflare Worker em JavaScript, sem dependências externas. **Publicada pela primeira vez em 09/11/2026, na v2, no Worker do protótipo, ligada ao banco de teste, só com leads de teste (#102). A v3 ainda não foi publicada** (o Otávio publica pelo LIGAR.md).

**Status.** Rascunho, pendente do Otávio. Continua desatualizado, porque se apoia em documentos marcados (planta-do-banco, banco-rascunho, funil-01, planilha-sdr, quiz-01-pagina; regra provisória 11.1).

**Destino dos contatos em conflito · bloqueado para entrega até a decisão** (conflito-17, em base/lacunas.md). Este código segue o lado 2 (#90: banco pelo garçom e planilha do SDR), como a planta e o funil-01, sem escolher. Se o lado 1 (Triad CRM) vencer, só a gravação e a porta da planilha mudam; as conferências continuam valendo. O protótipo de teste não é entrega: com gente de verdade, nada vai ao ar antes da decisão.

**Antes de tráfego real:** a proteção contra robô e o limite de pedidos não estão ligados (log.md, Pendências).

## O que tem dentro

| Arquivo | O que é |
|---|---|
| garcom.mjs | O Worker: as duas portas em /api/, os arquivos do protótipo pelo binding de assets e as funções `conferirPacote`, `lerCursor` e `chaveConfere` |
| teste/testar-garcom.mjs | Teste local, com um fetch falso que só registra o que seria chamado e um ASSETS falso |

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
| GET /api/planilha/leads-novos | O Apps Script da planilha do SDR (etapa 24) | Porta privada: só com a CHAVE_PLANILHA; devolve os leads novos pela função `leads_para_planilha` com a chave secreta |
| Outra rota em /api/ | Ninguém | 404 `{"ok":false,"erro":"nao encontrado"}`, sem detalhe |
| Todo o resto | O navegador | Arquivos do protótipo, pelo binding de assets (`env.ASSETS.fetch`), com o cabeçalho noindex acrescentado. Sem ASSETS (no teste), 404 simples |

## Porta pública · POST /api/fim-quiz

1. **Mesma origem.** O protótipo é servido pelo próprio Worker, e o navegador manda o cabeçalho Origin no POST. Só passa a origem igual a `ORIGEM_PERMITIDA` (uma barra no fim do valor da variável é ignorada); pedido sem origem ou de outra origem é recusado. Nunca há `Access-Control-Allow-Origin: *`. **Isto não protege contra robô:** a porta pública aceita qualquer envio que traga o cabeçalho Origin certo, o que um robô fora do navegador forja sem esforço; a conferência de origem só barra páginas de outros sites abertas no navegador. A proteção contra robô e o limite de pedidos ainda não estão ligados (log.md, Pendências). O pré-voo (OPTIONS), que o navegador não manda na mesma origem, ainda é respondido só para a própria origem, como na v1 (pergunta 22.2).
2. **Método, tamanho e formato.** Só POST; só corpo declarado exatamente como `application/json` (o tipo antes do ";" tem de ser esse, sem diferença de maiúscula: `application/json; charset=utf-8` passa, `application/jsonx` não); no máximo 16 KB, conferido pelo cabeçalho Content-Length e de novo lendo o corpo em partes, somando os bytes e parando com 413 assim que passa do máximo (sem Content-Length, o corpo grande nunca é lido inteiro); e só os campos que a planta tem: campo a mais é recusado.
3. **Etiquetas obrigatórias.** funil (da lista: funil-01), entrega e versao_entrega (formato do id e número inteiro), utm_source e utm_campaign presentes e, para valer, da tabela de origens do funil-01 (stories, bio, reels, email, whatsapp; funil-01). meta-ads está reservada e fica fora. O mesmo vale para a origem da primeira visita da pessoa. Utm fora da lista não recusa o pacote: é gravada vazia, como a planta manda (5.5), e o registro do garçom anota só o nome do campo esvaziado, nunca o valor (18.7). Utm que não é texto recusa o pacote. Se o par entrega e versão existe no catálogo, quem confere é o banco (18.8).
4. **Evento.** Só o fim do quiz (fim_quiz), com sessão, data, respostas, nota de 0 a 100, faixa (a, b, c ou eliminatorio) e versão do lead score. O clique em "Tenho interesse" fica preparado como proposta (`TIPOS_PROPOSTOS`), não ligado (14.15; 16.13; 18.4).
5. **Pessoa.** Nome, e-mail e telefone no formato do banco v2: o telefone começa com + e tem de 8 a 15 dígitos (dados/banco/esquema.sql, gaveta pessoas).
6. **Consentimento obrigatório.** Pelo menos um canal aceito (WhatsApp ou e-mail), com o texto aceito e a data do aceite. Sem isso, nada é gravado.
7. **Gravação.** Chama só a função `registrar_fim_quiz` pela API REST do Supabase (`/rest/v1/rpc/registrar_fim_quiz`), com `SUPABASE_URL` e `SUPABASE_CHAVE_PUBLICAVEL` no cabeçalho apikey. A chave publicável nova não é JWT e não vai no Authorization; uma chave antiga em JWT iria também no Authorization, como na v1. O garçom não lê nenhuma tabela. Sem a chave publicável no cofre, responde `servico indisponivel` e não grava, mesmo que a secreta esteja lá.
8. **Respostas sem detalhe interno.** Quem envia só recebe `{"ok":true}` (201), `pacote recusado` (400, 403, 405, 413, 415, 422) ou `servico indisponivel` (502, 503). O motivo da recusa vai só para o registro da Cloudflare, sem nenhum dado do pacote.

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

## Segredos e variáveis

Só os nomes aparecem no código. Os valores dos segredos moram nas variáveis secretas do Worker safra-prototipo-funil-01 (o cofre) e nunca entram no repositório nem passam por arquivo da máquina ou pelo chat (conexoes.md; nucleo/regras/seguranca.md):

| Nome | Tipo | O que é | Quem usa |
|---|---|---|---|
| SUPABASE_CHAVE_PUBLICAVEL | Segredo | Chave publicável do Supabase (papel anon), que só executa `registrar_fim_quiz` | Só a porta pública |
| SUPABASE_CHAVE_SECRETA | Segredo | Chave secreta nova do Supabase (papel service_role), que só executa `leads_para_planilha` | Só a porta privada |
| CHAVE_PLANILHA | Segredo | Abre a porta privada; não é chave do Supabase. Mora também nas propriedades do script da planilha. Pelo menos 32 caracteres | Só a porta privada |
| SUPABASE_URL | Variável comum | Endereço do projeto no Supabase (não é segredo; conexoes.md) | As duas portas |
| ORIGEM_PERMITIDA | Variável comum | O próprio endereço do protótipo, sem barra no fim (exemplo: https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev; conexoes.md, linha da Cloudflare). Se vier com barra no fim, o garçom ignora a barra | A porta pública |

## O que falta para funcionar

1. **Configuração do Worker** em entregas/prototipo-funil-01/ (etapa 23), com o binding ASSETS, `run_worker_first = true` e as duas variáveis comuns.
2. **Banco aplicado e conferido** no Supabase (dados/banco/README.md, "Como aplicar amanhã").
3. **Segredos no cofre**, pelo roteiro da etapa 26.
4. **Ligar a página:** `enviarPacote` do quiz-01 faz o POST para /api/fim-quiz, numa versão nova da página (etapa 23).
5. **Planilha do SDR** chamando a porta privada (etapa 24).
6. **Antes de tráfego real:** proteção contra robô (Turnstile) e limite de pedidos da Cloudflare (Rate Limiting) (log.md, Pendências).
7. **Decisão do conflito-17** (Júnior e Euclides) e aprovação do Otávio.

## Como testar localmente, sem serviço real

```
node entregas/garcom/teste/testar-garcom.mjs
```

Precisa só do Node (18 ou mais novo), sem instalar nada. O teste importa o handler de garcom.mjs e troca o `fetch` por um falso, que só registra o que seria chamado e recusa qualquer endereço que não seja o de mentira; os arquivos vêm de um ASSETS falso. Os valores do ambiente são de mentira, e os endereços ficam num domínio `.invalid`, que não existe. A porta pública usa o pacote do exemplo do README do quiz-01 (entregas/quizzes/quiz-01/pagina/README.md, dados fictícios), lido do próprio README, que já o traz marcado como lead de teste (nome com TESTE na frente, e-mail @teste.invalid; #102), e casos inválidos. A porta privada usa dois leads de mentira com a mesma marca. O teste captura o console e confere que nenhum nome, e-mail, telefone, id_pessoa, cursor ou chave de teste aparece no registro do garçom, que nenhuma resposta vaza detalhe interno, que toda resposta leva noindex e que HTML, CSS e JavaScript sem charset saem com charset utf-8, com o corpo intacto (v3). O caminho do Workers para a comparação de tempo constante (`crypto.subtle.timingSafeEqual`) é conferido com um timingSafeEqual de mentira, feito com o do próprio Node.

### Resultado do teste (09/11/2026)

```
OK     · pacote do exemplo do quiz-01 (status 201, chamadas ao banco 1, resposta {"ok":true})
OK     · sem consentimento (nenhum canal aceito) (status 422, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · consentimento sem texto (status 422, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · consentimento sem data (status 422, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · etiqueta faltando (funil) (status 422, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · etiqueta faltando (versao_entrega) (status 422, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · etiqueta faltando (utm_campaign) (status 422, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · utm_source que não é texto (status 422, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · funil fora da lista (status 422, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · tipo proposto, ainda não ligado (interesse_pos_relatorio) (status 422, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · faixa fora da lista (status 422, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · campo que a planta não tem (cpf) (status 422, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · telefone com menos de 8 dígitos (status 422, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · telefone com mais de 15 dígitos (status 422, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · telefone só com sinais (status 422, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · telefone com 10 dígitos (status 201, chamadas ao banco 1, resposta {"ok":true})
OK     · utm_source fora da lista (tiktok) (status 201, chamadas ao banco 1, resposta {"ok":true})
OK     · utm_source fora da lista (tiktok): gravada vazia e anotada no registro do garçom
OK     · utm_source reservada fora do MVP (meta-ads) (status 201, chamadas ao banco 1, resposta {"ok":true})
OK     · utm_source reservada fora do MVP (meta-ads): gravada vazia e anotada no registro do garçom
OK     · primeira_utm_campaign fora da lista (status 201, chamadas ao banco 1, resposta {"ok":true})
OK     · primeira_utm_campaign fora da lista: gravada vazia e anotada no registro do garçom
OK     · método GET (status 405, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · outra origem (status 403, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · sem origem (status 403, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · pré-voo do navegador (OPTIONS) (status 204, chamadas ao banco 0)
OK     · pré-voo libera só a própria origem, nunca "*" (Access-Control-Allow-Origin = ORIGEM_PERMITIDA)
OK     · corpo que não é JSON declarado (status 415, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · JSON quebrado (status 400, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · pacote grande demais (status 413, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · corpo grande sem Content-Length (em partes) (status 413, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · corpo grande sem Content-Length: a leitura parou logo depois de 16 KB (5 partes de 4 KB lidas, de 100)
OK     · Content-Type application/jsonx (status 415, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · Content-Type application/json; charset=utf-8 (status 201, chamadas ao banco 1, resposta {"ok":true})
OK     · Content-Type em maiúsculas com espaço (APPLICATION/JSON ;charset=utf-8) (status 201, chamadas ao banco 1, resposta {"ok":true})
OK     · ORIGEM_PERMITIDA com barra no fim: a barra é ignorada (status 201, chamadas ao banco 1, resposta {"ok":true})
OK     · Origin com barra no fim não é a mesma origem (status 403, chamadas ao banco 0, resposta {"ok":false,"erro":"pacote recusado"})
OK     · banco recusa (entrega fora do catálogo, simulado) (status 422, chamadas ao banco 1, resposta {"ok":false,"erro":"pacote recusado"})
OK     · banco recusa a chave (simulado) (status 502, chamadas ao banco 1, resposta {"ok":false,"erro":"servico indisponivel"})
OK     · banco fora do ar (simulado) (status 502, chamadas ao banco 1, resposta {"ok":false,"erro":"servico indisponivel"})
OK     · cofre vazio (sem SUPABASE_CHAVE_PUBLICAVEL) (status 503, chamadas ao banco 0, resposta {"ok":false,"erro":"servico indisponivel"})
OK     · cofre sem a publicável e com a secreta: não usa a secreta (status 503, chamadas ao banco 0, resposta {"ok":false,"erro":"servico indisponivel"})
OK     · sem ORIGEM_PERMITIDA (status 503, chamadas ao banco 0, resposta {"ok":false,"erro":"servico indisponivel"})
OK     · porta pública chama registrar_fim_quiz com a chave publicável, só no apikey
OK     · porta pública nunca usou a chave secreta (11 gravações conferidas)
OK     · chave antiga em formato JWT (mentira) vai também no Authorization, como na v1
OK     · planilha sem chave (status 401, chamadas ao banco 0, resposta {"ok":false,"erro":"nao autorizado"})
OK     · planilha com chave vazia (status 401, chamadas ao banco 0, resposta {"ok":false,"erro":"nao autorizado"})
OK     · planilha com chave errada (mesmo tamanho) (status 401, chamadas ao banco 0, resposta {"ok":false,"erro":"nao autorizado"})
OK     · planilha com chave de tamanho diferente (status 401, chamadas ao banco 0, resposta {"ok":false,"erro":"nao autorizado"})
OK     · planilha com chave curta (status 401, chamadas ao banco 0, resposta {"ok":false,"erro":"nao autorizado"})
OK     · planilha com a chave publicável no lugar (status 401, chamadas ao banco 0, resposta {"ok":false,"erro":"nao autorizado"})
OK     · segredo vazio no cofre (CHAVE_PLANILHA vazia), pedido com chave vazia (status 401, chamadas ao banco 0, resposta {"ok":false,"erro":"nao autorizado"})
OK     · segredo vazio no cofre, pedido sem chave (status 401, chamadas ao banco 0, resposta {"ok":false,"erro":"nao autorizado"})
OK     · segredo ausente no cofre (status 401, chamadas ao banco 0, resposta {"ok":false,"erro":"nao autorizado"})
OK     · segredo curto demais no cofre (menos de 32), pedido com o mesmo valor (status 401, chamadas ao banco 0, resposta {"ok":false,"erro":"nao autorizado"})
OK     · planilha sem chave e com método POST (status 401, chamadas ao banco 0, resposta {"ok":false,"erro":"nao autorizado"})
OK     · planilha com chave certa, pelo timingSafeEqual do Workers (status 200, chamadas ao banco 1, resposta (com leads))
OK     · planilha com chave errada, pelo timingSafeEqual do Workers (status 401, chamadas ao banco 0, resposta {"ok":false,"erro":"nao autorizado"})
OK     · timingSafeEqual usado quando existe (2 vezes) e retirado depois do teste
OK     · planilha com chave e método POST (status 405, chamadas ao banco 0, resposta {"ok":false,"erro":"pedido recusado"})
OK     · planilha com chave e cofre sem SUPABASE_CHAVE_SECRETA (status 503, chamadas ao banco 0, resposta {"ok":false,"erro":"servico indisponivel"})
OK     · planilha com chave e sem SUPABASE_URL (status 503, chamadas ao banco 0, resposta {"ok":false,"erro":"servico indisponivel"})
OK     · planilha primeira vez, sem cursor (status 200, chamadas ao banco 1, resposta (com leads))
OK     · planilha chama leads_para_planilha por POST com {apos_gravado_em: null, apos_id_pessoa: null, quantos: 200}
OK     · porta privada usa a chave secreta, só no apikey, e nunca a publicável
OK     · resposta com cursor_seguinte da última linha, microssegundos mantidos, fuso em Z, pode_ter_mais false
OK     · porta privada responde com Cache-Control: no-store e sem cabeçalho de CORS
OK     · cursor com o "+" codificado (%2B) (status 200, chamadas ao banco 1, resposta (com leads))
OK     · cursor com o "+" codificado (%2B): chega ao banco como 2026-11-08T12:00:00.123456+00:00
OK     · cursor com o fuso em Z (status 200, chamadas ao banco 1, resposta (com leads))
OK     · cursor com o fuso em Z: chega ao banco como 2026-11-08T12:00:00.123456Z
OK     · cursor sem fração de segundo (status 200, chamadas ao banco 1, resposta (com leads))
OK     · cursor sem fração de segundo: chega ao banco como 2026-11-08T12:00:00Z
OK     · limite 50 (status 200, chamadas ao banco 1, resposta (com leads))
OK     · limite 50 chega ao banco como quantos 50
OK     · limite 2 com 2 leads (página cheia) (status 200, chamadas ao banco 1, resposta (com leads))
OK     · página cheia: pode_ter_mais true
OK     · limite 200 (o teto) (status 200, chamadas ao banco 1, resposta (com leads))
OK     · cursor com o "+" sem codificar (vira espaço) (status 400, chamadas ao banco 0, resposta {"ok":false,"erro":"pedido recusado"})
OK     · cursor com horário inválido (status 400, chamadas ao banco 0, resposta {"ok":false,"erro":"pedido recusado"})
OK     · cursor com data impossível (mês 13, dia 45) (status 400, chamadas ao banco 0, resposta {"ok":false,"erro":"pedido recusado"})
OK     · cursor com data impossível (30 de fevereiro) (status 400, chamadas ao banco 0, resposta {"ok":false,"erro":"pedido recusado"})
OK     · cursor com 29 de fevereiro fora de ano bissexto (status 400, chamadas ao banco 0, resposta {"ok":false,"erro":"pedido recusado"})
OK     · cursor com hora 24 (status 400, chamadas ao banco 0, resposta {"ok":false,"erro":"pedido recusado"})
OK     · cursor com 29 de fevereiro em ano bissexto (status 200, chamadas ao banco 1, resposta (com leads))
OK     · cursor com id_pessoa inválido (status 400, chamadas ao banco 0, resposta {"ok":false,"erro":"pedido recusado"})
OK     · cursor com mais de 6 casas de fração (status 400, chamadas ao banco 0, resposta {"ok":false,"erro":"pedido recusado"})
OK     · cursor pela metade (só o horário) (status 400, chamadas ao banco 0, resposta {"ok":false,"erro":"pedido recusado"})
OK     · cursor pela metade (só o id_pessoa) (status 400, chamadas ao banco 0, resposta {"ok":false,"erro":"pedido recusado"})
OK     · cursor repetido (status 400, chamadas ao banco 0, resposta {"ok":false,"erro":"pedido recusado"})
OK     · parâmetro desconhecido (status 400, chamadas ao banco 0, resposta {"ok":false,"erro":"pedido recusado"})
OK     · limite acima de 200 (201): recusado, não cortado (status 400, chamadas ao banco 0, resposta {"ok":false,"erro":"pedido recusado"})
OK     · limite 1000 (status 400, chamadas ao banco 0, resposta {"ok":false,"erro":"pedido recusado"})
OK     · limite 0 (status 400, chamadas ao banco 0, resposta {"ok":false,"erro":"pedido recusado"})
OK     · limite negativo (status 400, chamadas ao banco 0, resposta {"ok":false,"erro":"pedido recusado"})
OK     · limite com fração (status 400, chamadas ao banco 0, resposta {"ok":false,"erro":"pedido recusado"})
OK     · limite que não é número (status 400, chamadas ao banco 0, resposta {"ok":false,"erro":"pedido recusado"})
OK     · limite vazio (status 400, chamadas ao banco 0, resposta {"ok":false,"erro":"pedido recusado"})
OK     · lista vazia (status 200, chamadas ao banco 1, resposta {"leads":[],"cursor_seguinte":null,"pode_ter_mais":false})
OK     · lista vazia: leads [], cursor_seguinte null, pode_ter_mais false
OK     · planilha com banco fora do ar (simulado) (status 502, chamadas ao banco 1, resposta {"ok":false,"erro":"servico indisponivel"})
OK     · planilha com banco recusando a chave (simulado) (status 502, chamadas ao banco 1, resposta {"ok":false,"erro":"servico indisponivel"})
OK     · planilha com banco em erro (simulado) (status 502, chamadas ao banco 1, resposta {"ok":false,"erro":"servico indisponivel"})
OK     · planilha com banco recusando o cursor (simulado) (status 400, chamadas ao banco 1, resposta {"ok":false,"erro":"pedido recusado"})
OK     · planilha com resposta ilegível do banco (status 502, chamadas ao banco 1, resposta {"ok":false,"erro":"servico indisponivel"})
OK     · planilha com resposta do banco que não é lista (status 502, chamadas ao banco 1, resposta {"ok":false,"erro":"servico indisponivel"})
OK     · planilha com cursor do banco fora do formato (status 502, chamadas ao banco 1, resposta {"ok":false,"erro":"servico indisponivel"})
OK     · rota /api/ desconhecida (status 404, chamadas ao banco 0, resposta {"ok":false,"erro":"nao encontrado"})
OK     · rota /api sozinha (status 404, chamadas ao banco 0, resposta {"ok":false,"erro":"nao encontrado"})
OK     · rota /api/fim-quiz/ com barra no fim (status 404, chamadas ao banco 0, resposta {"ok":false,"erro":"nao encontrado"})
OK     · arquivo / vai para ASSETS e ganha noindex, mantendo os outros cabeçalhos (status 200)
OK     · arquivo /b/ vai para ASSETS e ganha noindex, mantendo os outros cabeçalhos (status 200)
OK     · arquivo /quiz/ vai para ASSETS e ganha noindex, mantendo os outros cabeçalhos (status 200)
OK     · ASSETS recebeu só os pedidos de arquivo, nunca os de /api/
OK     · /api/fim-quiz com ASSETS ligado é atendido pelo garçom, antes dos arquivos
OK     · arquivo com Content-Type "text/html" sai como "text/html; charset=utf-8", corpo com acentos intacto
OK     · arquivo com Content-Type "text/css" sai como "text/css; charset=utf-8", corpo com acentos intacto
OK     · arquivo com Content-Type "application/javascript" sai como "application/javascript; charset=utf-8", corpo com acentos intacto
OK     · arquivo com Content-Type "text/javascript" sai como "text/javascript; charset=utf-8", corpo com acentos intacto
OK     · arquivo com Content-Type "TEXT/HTML" sai como "TEXT/HTML; charset=utf-8", corpo com acentos intacto
OK     · arquivo com Content-Type "text/html; charset=utf-8" sai como "text/html; charset=utf-8", corpo com acentos intacto
OK     · arquivo com Content-Type "text/html;charset=UTF-8" sai como "text/html;charset=UTF-8", corpo com acentos intacto
OK     · arquivo com Content-Type "text/html; charset=iso-8859-1" sai como "text/html; charset=iso-8859-1", corpo com acentos intacto
OK     · arquivo com Content-Type "image/jpeg" sai como "image/jpeg", corpo com acentos intacto
OK     · arquivo com Content-Type "application/json" sai como "application/json", corpo com acentos intacto
OK     · arquivo sem Content-Type continua sem (o garçom não inventa tipo)
OK     · comCharset: ";" ou espaço no fim, vazio e nulo
OK     · arquivo sem ASSETS (teste): 404 simples (status 404, chamadas ao banco 0, resposta nao encontrado)
OK     · ASSETS com falha: 502 simples (status 502, chamadas ao banco 0, resposta servico indisponivel)
OK     · X-Robots-Tag: noindex em toda resposta
OK     · registro do garçom sem dado pessoal, sem cursor e sem segredo (97 linhas)
OK     · registro do garçom só com códigos e contagens

O que seria gravado no caso do exemplo (fetch falso, nada saiu da máquina):
  endereço: {SUPABASE_URL}/rest/v1/rpc/registrar_fim_quiz
  método: POST · cabeçalhos: Content-Type, Accept, apikey
  pessoa: nome, telefone, email, empresa, consentimento_whatsapp, consentimento_email, consentimento_texto, consentimento_em, primeira_utm_source, primeira_utm_campaign
  evento: tipo, funil, entrega, versao_entrega, utm_source, utm_campaign, id_sessao, ocorrido_em, respostas, lead_score_nota, lead_score_faixa, lead_score_versao
  etiquetas: funil-01, quiz-01, v1, bio, funil-01 · lead score 96, faixa a
O que seria pedido pela porta privada (fetch falso):
  endereço: {SUPABASE_URL}/rest/v1/rpc/leads_para_planilha
  método: POST · cabeçalhos: Content-Type, Accept, apikey · corpo: apos_gravado_em, apos_id_pessoa, quantos

Tudo certo: 133 de 133 conferências passaram
```

O teste não cobre o banco: o fetch falso não executa as funções. A chamada de verdade às duas funções, com cada chave, fica para o ensaio geral (etapa 25) e para o teste de amanhã no Supabase.

## Perguntas

prompts/07-fila-perguntas.md, 18.1 a 18.10; prompts/08-fila-perguntas.md, Etapa 22.
