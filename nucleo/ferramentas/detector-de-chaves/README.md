---
id: detector-de-chaves
versao: 1
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: regra-seguranca
    versao: 2
desatualizado: false
---

# Detector de chaves

Um programa pequeno que roda antes de cada commit e recusa o commit quando encontra algo parecido com chave, senha ou token, ou um arquivo de segredos. É o detector pedido em nucleo/regras/seguranca.md ("Detector de chaves"). Node puro, sem nenhuma dependência: não precisa de `npm install`.

## O que ele procura

No conteúdo dos arquivos:

- chaves do Supabase: `sb_secret_` e `sb_publishable_` seguidas de um valor, e tokens JWT (três partes, a primeira começando por `eyJ`);
- tokens da Cloudflare (numa linha que fala de Cloudflare ou wrangler) e a chave de origem da Cloudflare;
- chaves do Google (`AIza` seguido de um valor);
- blocos de chave privada;
- token num cabeçalho `Authorization: Bearer` e endereço com senha (como a string de conexão do banco, `postgres://usuario:senha@...`);
- um valor longo (16 caracteres ou mais, com letras e números) atribuído a um nome que tenha KEY, SECRET, TOKEN, CHAVE, SENHA ou PASSWORD como palavra (no começo do nome, depois de `_`, `-`, `.` ou `api`, ou em camelCase como `apiKey`), em qualquer formato: `NOME=valor`, `NOME: valor`, `nome = "valor"`, `"nome": "valor"`. Palavra de segredo no meio de outra (`monkey`) não conta.

Pelo nome do arquivo, sem olhar o conteúdo: `.env`, `.env.*`, `*.env` (como `secrets.env`), `.envrc`, `.dev.vars` (e `.dev.vars.*`), `*.pem` e `id_rsa*`, em qualquer pasta.

O que passa, de propósito:

- valores de mentira em domínio `.invalid` (por exemplo `https://banco-de-teste.invalid`). Num formato forte (sb_secret_, JWT, Bearer, endereço com senha e os outros), só passa quando o `.invalid` vem logo depois do achado e o próprio achado tem marca de mentira (mentira, exemplo, teste); uma chave com cara de real seguida de `.invalid`, ou dentro de um endereço `.invalid`, continua barrada;
- nomes de segredo sem valor: `SUPABASE_CHAVE_SECRETA` citado num texto, `env.SUPABASE_CHAVE_SECRETA` no código, `wrangler secret put CHAVE_PLANILHA`;
- moldes (`{{a definir}}`, `<cole aqui>`), frases entre aspas, nomes feitos de palavras (`simulador-decisoes-v3`), um UUID sozinho, identificador de código sem aspas (`calcularTotal2024ParaLeads`) e valores curtos;
- arquivos binários (imagens, PDF, zip), que não são lidos por dentro;
- apagar do repositório um arquivo de segredos que já estava lá.

A recusa diz o arquivo, a linha e o tipo de achado, e nunca repete o valor encontrado.

## Como ele lê

No commit, ele lê o que está **preparado** (o que o `git add` pôs no índice), não o que está no disco. Se você preparou um arquivo com chave e depois limpou o arquivo no disco sem preparar de novo, o commit continua recusado, porque é o preparado que entraria no commit.

## Ligar de novo num clone novo

O gancho mora em `.githooks/pre-commit`, versionado. Num clone novo, rode uma vez, na pasta do repositório:

```
git config core.hooksPath .githooks
```

Para conferir que ficou ligado: `git config core.hooksPath` responde `.githooks`. O gancho precisa do Node; se o Node não for encontrado, o commit fica bloqueado com um aviso (o caminho mais seguro). `git commit --no-verify` pula o gancho: não use.

## Os três modos

Na pasta do repositório:

- `node nucleo/ferramentas/detector-de-chaves/detector.mjs`: o que está preparado (é o que o gancho roda).
- `node nucleo/ferramentas/detector-de-chaves/detector.mjs --rastreados`: todos os arquivos rastreados hoje. Com `--sem-fontes`, deixa fontes/ de fora.
- `node nucleo/ferramentas/detector-de-chaves/detector.mjs --historico`: todas as versões de todos os arquivos em todos os commits (de todos os ramos). Cada versão é lida uma vez, e o achado aponta o primeiro commit em que ela aparece. Só lê: não altera o histórico.

Resposta: 0 quando não acha nada, 1 quando acha, 2 quando não consegue ler o Git (e aí o commit também fica bloqueado).

## Se der alarme falso

Ajuste a regra em `detector.mjs`, acrescente o caso em `testar-detector.mjs` e rode os testes. Não mude o arquivo que deu alarme só para passar, e não pule o detector.

## Testes

```
node nucleo/ferramentas/detector-de-chaves/testar-detector.mjs
```

Os casos que devem barrar são montados na hora, juntando pedaços e caracteres aleatórios, para nenhum valor parecido com chave ficar escrito no repositório; o próprio arquivo de teste passa no detector. Uma parte dos testes cria um repositório de mentira numa pasta temporária e confere o índice, o gancho pelo `git commit` de verdade e o modo de histórico; a pasta é apagada no fim.

Resultado em 08/11/2026:

```
OK     · barra: chave secreta do Supabase num texto
OK     · barra: chave publicável do Supabase num código
OK     · barra: JWT solto
OK     · barra: chave do Google
OK     · barra: token da Cloudflare em linha que fala de Cloudflare
OK     · barra: token da Cloudflare em comando do wrangler
OK     · barra: chave global da Cloudflare
OK     · barra: bloco de chave privada RSA
OK     · barra: bloco de chave privada OpenSSH
OK     · barra: atribuição estilo .env
OK     · barra: atribuição em JavaScript com aspas
OK     · barra: atribuição em JSON
OK     · barra: atribuição em YAML
OK     · barra: atribuição a CHAVE_PLANILHA em shell
OK     · barra: segredo em hexadecimal
OK     · barra: chave real dentro de endereço .invalid
OK     · barra: chave com cara de real seguida de .invalid
OK     · barra: token no cabeçalho Authorization
OK     · barra: string de conexão com senha
OK     · barra: string de conexão com senha real em .invalid
OK     · barra: apikey em minúsculas
OK     · barra: nome em camelCase
OK     · barra: aponta a linha 4 de 5
OK     · passa: nome de segredo citado em texto
OK     · passa: nome de segredo lido do cofre
OK     · passa: process.env
OK     · passa: comando de segredo do wrangler
OK     · passa: nome atribuído a nome
OK     · passa: endereço de mentira em .invalid
OK     · passa: chave de mentira em .invalid
OK     · passa: formato do Supabase de mentira em .invalid
OK     · passa: string de conexão de mentira
OK     · passa: string de conexão de mentira com senha longa
OK     · passa: palavra de segredo no meio do nome
OK     · passa: identificador de código sem aspas
OK     · passa: UUID atribuído a nome de segredo
OK     · passa: prefixo citado sem valor
OK     · passa: valor de mentira escrito por extenso
OK     · passa: nome de armazenamento local
OK     · passa: comparação em código minificado
OK     · passa: Object.keys
OK     · passa: molde com chaves duplas
OK     · passa: molde com sinal de menor
OK     · passa: valor curto
OK     · passa: frase entre aspas
OK     · passa: data e versão
OK     · passa: hash de commit sem contexto de segredo
OK     · passa: texto que fala de Cloudflare sem token
OK     · passa: comentário com Bearer e nome
OK     · barra pelo nome: .env
OK     · barra pelo nome: config/.env
OK     · barra pelo nome: .env.local
OK     · barra pelo nome: pasta/.env.production
OK     · barra pelo nome: .dev.vars
OK     · barra pelo nome: entregas/x/.dev.vars
OK     · barra pelo nome: certificado.pem
OK     · barra pelo nome: chave.PEM
OK     · barra pelo nome: secrets.env
OK     · barra pelo nome: pasta/producao.env
OK     · barra pelo nome: .envrc
OK     · barra pelo nome: id_rsa
OK     · barra pelo nome: .ssh/id_rsa.pub
OK     · passa pelo nome: ambiente.md
OK     · passa pelo nome: nucleo/regras/seguranca.md
OK     · passa pelo nome: wrangler.toml.exemplo
OK     · passa pelo nome: env.mjs
OK     · passa pelo nome: dev-vars.md
OK     · passa pelo nome: pem.txt
OK     · passa pelo nome: ambiente.envio.md
OK     · passa pelo nome: envrc.md
OK     · passa: arquivo binário
OK     · repositório: primeiro commit limpo passa (sem HEAD ainda)
OK     · repositório: barra o que está preparado, mesmo com o disco já limpo
OK     · repositório: a recusa diz arquivo, linha e tipo
OK     · repositório: a recusa não repete o valor
OK     · repositório: a recusa não tem travessão
OK     · repositório: passa quando o índice está limpo, mesmo com o disco sujo
OK     · gancho: git commit com chave é recusado, sem repetir o valor
OK     · gancho: git commit limpo passa
OK     · repositório: .env preparado é recusado pelo nome
OK     · repositório: tirar o .env do repositório passa
OK     · histórico: acha a chave apagada, com commit, arquivo e linha
OK     · histórico: acha o .env antigo e não repete valor
OK     · rastreados: o estado atual está limpo
OK     · passa no próprio detector: testar-detector.mjs
OK     · passa no próprio detector: detector.mjs
OK     · passa no próprio detector: pre-commit

Tudo certo: 87 de 87 conferências passaram
```

Varredura em 08/11/2026: `--rastreados` sem achado nos 233 arquivos rastreados (fontes/ incluída, com os arquivos desta etapa preparados); `--historico` sem achado em 33 commits e 350 versões de arquivo.

## Limites

- É uma cerca, não um muro: pega os formatos conhecidos e as atribuições óbvias. A proteção principal é o desenho: nenhuma chave de verdade passa por arquivo da máquina; os valores vão direto do painel do serviço para o cofre.
- Token da Cloudflare sem prefixo só é achado quando a mesma linha fala de Cloudflare ou wrangler.
- Valor atribuído a nome de segredo que só tenha letras (sem número) e menos de 32 caracteres passa.
- Valor atribuído a nome de segredo que contenha exemplo, example, mentira, placeholder, xxxx ou .invalid passa: um valor real com essas palavras também passaria.
- Valor sem aspas que pareça identificador de código (palavras e números em blocos, no máximo duas trocas entre letra e dígito) passa.
- Não abre arquivos compactados (zip) nem binários.
- Só vale nos commits feitos num clone com o gancho ligado.
