---
id: prototipo-funil-01-ligar
versao: 4
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: prototipo-funil-01
    versao: 3
  - id: garcom
    versao: 3
  - id: banco-rascunho
    versao: 2
  - id: banco-conferir
    versao: 1
  - id: banco-catalogo-prototipo
    versao: 1
  - id: planilha-sdr-funil-01
    versao: 1
  - id: ensaio-prototipo-funil-01
    versao: 2
  - id: quiz-01-pagina
    versao: 2
  - id: landing-page-01-variante-a
    versao: 2
  - id: landing-page-01-variante-b
    versao: 2
  - id: lead-score
    versao: 3
  - id: decisoes
    versao: 5
  - id: regra-seguranca
    versao: 3
  - id: lacunas
    versao: 6
desatualizado: true
---

# Roteiro para ligar o protótipo do funil-01

O passo a passo para o Otávio ligar amanhã o site de teste do funil-01: o banco no Supabase, o site e o garçom na Cloudflare e a planilha do SDR no Google. **Tempo total estimado: cerca de 58 minutos** (partes 1 a 5), menos de uma hora. As partes 6 e 7 só entram se algo der errado ou na hora de desligar.

**Status.** Rascunho, pendente do Otávio. Continua desatualizado, porque se apoia em documentos marcados (prototipo-funil-01, garcom, banco-rascunho, banco-conferir, banco-catalogo-prototipo, quiz-01-pagina, as variantes da landing, planilha-sdr-funil-01 e ensaio), que as etapas 32 a 34 atualizam (regra de versionamento v3, 11.1).

**Ligado e testado em 09/11/2026** pelo Otávio, com este roteiro (v2). A v3 forma o roteiro com o que aconteceu: o porteiro nos passos 3.8 e 3.9, o Erro 4 (`banco-401`), o cuidado entre 4.6 e 4.7 e o campo Seu nome na parte 5 (log.md, pedido 10). A v4 (etapa 31) só acompanha as decisões de 09/11/2026: a planilha do SDR no Drive como exceção registrada à regra 4 de segurança (5.4) e a revisão jurídica fora das travas de ida ao ar (16.4); nenhum passo mudou.

> **Leia antes de começar**
>
> - **Protótipo de teste não é entrega.** Serve só para conferir o caminho do dado de ponta a ponta. Ir ao ar com gente de verdade continua travado: o destino dos contatos está em conflito (conflito-17, em base/lacunas.md), as páginas e o garçom são rascunhos pendentes de aprovação (do Otávio e, nas páginas, do Júnior e do Euclides) e falta a proteção contra robô (log.md, Pendências).
> - **Só leads de mentira** (decisão #102): nome começando por **TESTE** e e-mail terminado em **@teste.invalid**. Nada de gente de verdade, nem o seu nome, nem o seu telefone. Não mande o endereço do protótipo para ninguém.
> - **A planilha no Drive é só para o teste** (pergunta 24.1): a planilha do SDR no Drive do Safra é exceção registrada à regra 4 de segurança, com acesso só do Otávio e de quem liga (nucleo/regras/seguranca.md, v3; decisão do Otávio, 09/11/2026, 5.4; base/decisoes.md, #114), mas este teste usa só leads de mentira, e a planilha de teste é apagada antes de ir ao ar (#102).
> - **Nunca cole uma chave no chat com o Claude, em arquivo, em e-mail, em mensagem ou numa célula da planilha.** A chave vai direto do painel do serviço para o cofre, pelos comandos deste roteiro. Se precisar de ajuda, copie só a mensagem de erro e cole numa conversa com o Claude no Claude Code: as mensagens de erro do Terminal, do Supabase e do Google não têm chave.
> - **Não grave nem compartilhe a tela das partes 2 a 4** (nem print, nem foto, nem chamada de vídeo): o painel do Supabase e as propriedades do script mostram chave.

## Palavras que aparecem aqui

| Palavra | O que é |
|---|---|
| Terminal | O programa do Mac onde se escreve um comando em vez de clicar. Fica em Aplicativos, Utilitários, Terminal |
| Comando | Uma linha de texto que se cola no Terminal e se roda com a tecla Enter. Neste roteiro, cada comando aparece num quadro cinza; copie a linha inteira |
| Área de transferência | O lugar invisível onde o Mac guarda o que você copiou (Cmd+C) até colar (Cmd+V). Guarda uma coisa por vez: copiar outra apaga a anterior |
| Push | Mandar para o GitHub os commits que já estão no seu Mac. É a cópia de segurança do repositório |
| SQL | A língua dos bancos de dados. O editor SQL do Supabase é a tela onde se cola um arquivo .sql e se clica em Run (rodar) |
| Esquema | O arquivo que cria as tabelas, as funções e as fechaduras do banco (dados/banco/esquema.sql) |
| RLS | A fechadura de cada tabela do banco (row level security). Com ela ligada e sem regra, quem vem de fora não lê nada. Você, dono do projeto, continua vendo tudo pelo painel |
| Chave publicável | Chave do Supabase que só deixa gravar o fim do quiz e mais nada. O garçom usa na porta pública |
| Chave secreta | Chave do Supabase que, no banco, só deixa pedir a lista de leads da planilha. Fora do banco, abre também a administração do Supabase (por exemplo, a de usuários). O garçom usa na porta privada. Nunca sai do cofre |
| id_pessoa | O código interno que o banco dá a cada pessoa (uma sequência de letras e números). Não diz quem é a pessoa, mas aponta para ela; por isso também não se mostra a ninguém |
| Chaves antigas (legacy) | As chaves do formato antigo do Supabase (anon e service_role). Nada do sistema usa. Continuam valendo até serem desligadas |
| Worker | Um programa pequeno que roda nos computadores da Cloudflare. O safra-prototipo-funil-01 entrega as páginas e o garçom no mesmo endereço |
| Garçom | A parte do Worker que recebe o fim do quiz e grava no banco (porta pública) e que entrega os leads à planilha (porta privada) |
| wrangler | O programa da Cloudflare que publica o Worker pelo Terminal. Já está instalado em nucleo/ferramentas/prototipo/ |
| Segredo e cofre | Segredo é uma chave guardada no cofre do Worker na Cloudflare. Depois de guardado, ninguém lê o valor de volta, nem você: dá só para trocar ou apagar |
| CHAVE_PLANILHA | Uma senha comprida, gerada no Terminal, que abre a porta privada do garçom. Mora em dois lugares: no cofre do Worker e nas propriedades do script da planilha |
| Apps Script | O programa que fica dentro da planilha do Google e pede ao garçom os leads novos |
| Propriedades do script | O cofre do Apps Script: guarda o endereço do garçom e a CHAVE_PLANILHA fora do código |
| Gatilho | O despertador do Apps Script: roda a busca de leads sozinho a cada 5 minutos |
| Registro | A lista do que um programa fez (na Cloudflare, no Apps Script). Os registros do sistema não guardam nome, telefone, e-mail nem chave |

## Resumo do tempo

| Parte | O que é | Tempo |
|---|---|---|
| 1 | Push no GitHub Desktop | 3 min |
| 2 | Supabase: banco e chaves | 15 min |
| 3 | Cloudflare: publicar o Worker e guardar os segredos | 15 min |
| 4 | Planilha do SDR | 10 min |
| 5 | Teste com leads de mentira | 15 min |
| | **Total** | **cerca de 58 min** |
| 6 | Se algo der errado | só se precisar |
| 7 | Como desligar tudo | 11 min, só na hora de desligar |

---

## Parte 1 · Push no GitHub Desktop (3 min)

Antes de tudo, para o GitHub ter a cópia de tudo o que foi feito esta noite.

### 1.1 · Mandar os commits para o GitHub

**Faça:** abra o GitHub Desktop, escolha o repositório sistema-safra-de-vendas (no alto, à esquerda) e clique em **Push origin**.

**Como saber que deu certo:** o botão volta a dizer "Fetch origin", sem número. Na aba **History**, anote a mensagem do commit do topo. Abra o repositório no site do GitHub: a mensagem do último commit que aparece lá é a mesma.

**Tempo:** 3 min.

---

## Parte 2 · Supabase: banco e chaves (15 min)

### 2.1 · Abrir o Terminal na pasta do repositório

Os arquivos .sql são compridos; o jeito mais seguro de copiar um arquivo inteiro, sem perder nenhum pedaço, é pelo Terminal.

**Faça:** abra o Terminal (Aplicativos, Utilitários, Terminal), cole este comando e aperte Enter. O comando cd entra na pasta do repositório; as aspas são necessárias porque o caminho tem espaços.

```
cd "/Volumes/OBM2T/OBM2T/CLAUDE CODE/triad/sistema-safra-de-vendas"
```

**Como saber que deu certo:** não aparece nenhuma mensagem de erro, e a linha do Terminal passa a terminar com `sistema-safra-de-vendas`. Deixe o Terminal aberto até o fim do roteiro.

**Tempo:** 1 min.

### 2.2 · Abrir o projeto no Supabase

**Faça:** no navegador, entre em supabase.com com a conta sistemadevendassafra@gmail.com e abra o projeto **sistema-de-vendas-safra**.

**Como saber que deu certo:** o nome sistema-de-vendas-safra aparece no alto da tela.

**Tempo:** 1 min.

### 2.3 · Copiar o esquema

**Faça:** no Terminal, rode:

```
pbcopy < dados/banco/esquema.sql
```

O comando pbcopy põe o arquivo inteiro na área de transferência. Não é segredo: é só o desenho do banco.

**Como saber que deu certo:** o Terminal não mostra nada e volta a esperar o próximo comando.

**Tempo:** 30 s.

### 2.4 · Rodar o esquema no editor SQL

**Faça:** no menu da esquerda do Supabase, abra o **SQL Editor**, crie uma consulta nova (**New query**), cole (Cmd+V) e clique em **Run**. Vai aparecer um aviso de operação destrutiva ("Potential issue detected"): é esperado, por causa dos comandos que retiram permissões. Clique em **Run this query**.

**Como saber que deu certo:** embaixo aparece "Success. No rows returned", sem nada em vermelho. Se aparecer erro, pare aqui: copie só a mensagem de erro e traga para o repositório (dados/banco/README.md, "Como aplicar amanhã").

**Tempo:** 2 min.

### 2.5 · Copiar a conferência

**Faça:** no Terminal, rode:

```
pbcopy < dados/banco/conferir.sql
```

**Como saber que deu certo:** o Terminal não mostra nada.

**Tempo:** 30 s.

### 2.6 · Rodar a conferência

**Faça:** no SQL Editor, crie outra consulta nova (**New query**), cole e clique em **Run**. Essa consulta só lê; não muda nada.

**Como saber que deu certo:** aparece uma tabela com **14 linhas** e a coluna **ok** com **true** em todas. A última linha, n = 99, "tudo certo", mostra em **encontrado** o texto **13 de 13**. Linha por linha, o que a coluna encontrado deve dizer:

| n | conferencia | encontrado (o que deve aparecer) | ok |
|---|---|---|---|
| 1 | tabelas existem | entregas, eventos, investimento, pessoas | true |
| 2 | RLS ligada em todas as tabelas, sem FORCE | nenhuma fora da regra | true |
| 3 | nenhuma política de RLS | 0 políticas | true |
| 4 | anon pode só isto | funcao registrar_fim_quiz | true |
| 5 | authenticated pode só isto | nada | true |
| 6 | service_role pode só isto | funcao leads_para_planilha | true |
| 7 | PUBLIC não tem nada | nada | true |
| 8 | funções das portas: SECURITY DEFINER e search_path vazio | leads_para_planilha (definer=true, search_path=""), registrar_fim_quiz (definer=true, search_path="") | true |
| 9 | função da trava: sem definer, search_path vazio | eventos_imutaveis (definer=false, search_path="") | true |
| 10 | trava dos eventos ligada | eventos_sem_mudanca (estado O) | true |
| 11 | índices únicos de telefone e e-mail | pessoas_email_unico, pessoas_telefone_unico | true |
| 12 | visões sem security_invoker | contagem_analises_gratuitas (security_invoker=false), painel_numeros (security_invoker=false) | true |
| 13 | permissões padrão do papel atual | nenhuma | true |
| 99 | tudo certo | 13 de 13 | true |

Se alguma linha der **false**, não siga para as chaves: anote o número da linha e o que apareceu em encontrado, rode o passo 2.4 de novo e depois este. Se continuar false, traga a linha para o repositório.

**Tempo:** 2 min.

### 2.7 · Copiar a linha do catálogo

Sem esta linha, todo envio do quiz é recusado e a pessoa vê o aviso "Não conseguimos enviar" (pergunta 23.10).

**Faça:** no Terminal, rode:

```
pbcopy < dados/banco/catalogo-prototipo.sql
```

**Como saber que deu certo:** o Terminal não mostra nada.

**Tempo:** 30 s.

### 2.8 · Gravar a linha do catálogo

**Faça:** no SQL Editor, crie outra consulta nova, cole e clique em **Run**.

**Como saber que deu certo:** aparece **uma linha só**: id_entrega **quiz-01**, versao **1**, tipo_entrega **quiz**, funil **funil-01**, caminho_no_repositorio **entregas/quizzes/quiz-01/pagina/**, publicada_em com data e hora, retirada_em vazia (NULL). Rodar de novo não duplica.

**Tempo:** 1 min.

### 2.9 · Achar as chaves, ainda sem copiar

**Faça:** no menu da esquerda, abra **Project Settings** (a engrenagem) e depois **API Keys**. Só olhe: não copie nada agora.

**Como saber que deu certo:** a página mostra uma área de **Publishable key** (a chave publicável) e uma área de **Secret keys** (as chaves secretas). Numa aba ou seção à parte ficam as **Legacy API keys** (as chaves antigas). Os nomes podem estar um pouco diferentes; o sentido é esse.

**Tempo:** 1 min.

### 2.10 · Criar a chave secreta do garçom

**Faça:** na área **Secret keys**, clique para criar uma chave nova (algo como **Add new secret key**) e dê o nome **garcom_planilha_prototipo**, com sublinhado (o painel não aceita hífen; foi o nome usado em 09/11/2026). Se já existir uma chave com esse nome, não crie outra.

**Como saber que deu certo:** a lista de chaves secretas mostra garcom_planilha_prototipo. Não copie ainda: o valor só vai ser copiado no passo 3.9, direto para o cofre da Cloudflare.

**Tempo:** 1 min.

### 2.11 · Desligar as chaves antigas, que ninguém usa

O projeto ainda tem as chaves antigas (legacy anon e legacy service_role). A antiga service_role abre o mesmo que a secreta nova: no banco, o esquema só deixa esse papel chamar leads_para_planilha; fora do banco, a administração do Supabase. O problema é que a antiga não se apaga sozinha: se vazar, só desligando todas as antigas. Nada do sistema usa as antigas: o garçom só usa a publicável e a secreta nova. Desligar afeta só quem usa as antigas, isto é, ninguém, e dá para reativar no mesmo lugar se um dia precisar (pergunta 26.4).

**Faça:** em **Legacy API keys**, clique para desativar as chaves antigas (algo como **Disable JWT-based API keys**) e confirme.

Se, na área Secret keys, existir também uma chave secreta chamada **default** que não é a garcom_planilha_prototipo, ela também não é usada; dá para apagá-la no mesmo dia, depois do teste da parte 5 dar certo (passo 7.9 e pergunta 26.4).

**Como saber que deu certo:** a área das chaves antigas mostra que estão desativadas. A publicável e a garcom_planilha_prototipo continuam na lista.

**Atenção:** desativar não aposenta as chaves antigas de vez. O painel avisa que elas continuam válidas como JWT, porque são assinadas pela assinatura antiga do projeto. Aposentar de vez é trocar essa assinatura (JWT signing keys), o que fica para antes de ir ao ar com gente de verdade (log.md, Pendências).

**Tempo:** 2 min.

---

## Parte 3 · Cloudflare: publicar o Worker e guardar os segredos (15 min)

Todos os comandos desta parte rodam no Terminal, na pasta do repositório. O wrangler é chamado pelo caminho de onde ele está instalado (nucleo/ferramentas/prototipo/), e o `--config` aponta para a configuração do protótipo.

### 3.0 · Pausar o que guarda cópia da área de transferência

Nas partes 3 e 4, chaves passam pela área de transferência. Dois jeitos de ela guardar cópia sem você ver: um programa de histórico da área de transferência (se você usa um) e a Área de Transferência Universal, que manda o que você copia para o iPhone.

**Faça:** se usa um programa de histórico da área de transferência, pause-o até o fim da parte 4. Depois, em **Ajustes do Sistema**, **Geral**, **AirDrop e Handoff**, desligue **Handoff** (é ele que liga a Área de Transferência Universal). Religue os dois no fim da parte 4.

**Como saber que deu certo:** Handoff aparece desligado; o programa de histórico, se houver, mostra que está pausado.

**Tempo:** 1 min.

### 3.1 · Conferir que o Terminal está na pasta certa

**Faça:** se fechou o Terminal, abra de novo e rode o comando do passo 2.1. Se ele continua aberto, rode só:

```
pwd
```

**Como saber que deu certo:** aparece `/Volumes/OBM2T/OBM2T/CLAUDE CODE/triad/sistema-safra-de-vendas`.

**Tempo:** 30 s.

### 3.2 · Desligar o envio de estatísticas do wrangler

**Faça:** rode:

```
export WRANGLER_SEND_METRICS=false
```

Isso vale só para esta janela do Terminal: o wrangler não manda estatísticas de uso para a Cloudflare.

**Como saber que deu certo:** o Terminal não mostra nada.

**Tempo:** 30 s.

### 3.3 · Conferir que o wrangler está instalado

**Faça:** rode:

```
nucleo/ferramentas/prototipo/node_modules/.bin/wrangler --version
```

**Como saber que deu certo:** aparece `4.158.0`. Se aparecer "no such file or directory", rode `(cd nucleo/ferramentas/prototipo && npm install)`, espere terminar e rode o comando de versão de novo.

**Tempo:** 30 s.

### 3.4 · Fazer o login do wrangler

**Faça:** antes, entre no painel da Cloudflare (dash.cloudflare.com) no navegador com a conta do Safra. Depois rode:

```
nucleo/ferramentas/prototipo/node_modules/.bin/wrangler login
```

O navegador abre uma página da Cloudflare pedindo para autorizar o wrangler. Confira que é a conta do Safra e clique em **Allow**.

**Como saber que deu certo:** o navegador diz que pode fechar a página, e o Terminal mostra "Successfully logged in". O wrangler guarda esse login no seu usuário do Mac, fora do repositório.

**Plano B, se aparecer "request_forbidden" (No CSRF value):** aperte Ctrl+C no Terminal e rode:

```
nucleo/ferramentas/prototipo/node_modules/.bin/wrangler login --browser=false
```

O Terminal mostra um endereço. Copie e cole no navegador onde a conta da Cloudflare do Safra já está aberta, e clique em **Allow**. Foi o que funcionou em 09/11/2026.

**Tempo:** 2 min.

### 3.5 · Conferir a conta

**Faça:** rode:

```
nucleo/ferramentas/prototipo/node_modules/.bin/wrangler whoami
```

**Como saber que deu certo:** aparece o e-mail sistemadevendassafra@gmail.com e a conta do Safra. Se aparecer outra conta, rode `nucleo/ferramentas/prototipo/node_modules/.bin/wrangler logout` e faça o passo 3.4 de novo, com a conta certa no navegador.

**Tempo:** 30 s.

### 3.6 · Montar o site

**Faça:** rode:

```
node entregas/prototipo-funil-01/montar-site.mjs
```

**Como saber que deu certo:** a última linha diz "Tudo certo: charset utf-8 no início, noindex e viewport em todo HTML, link da landing para /quiz/ e todos os caminhos existem no site."

**Tempo:** 30 s.

### 3.7 · Publicar o Worker

**Faça:** rode:

```
nucleo/ferramentas/prototipo/node_modules/.bin/wrangler deploy --config entregas/prototipo-funil-01/wrangler.toml
```

Se o wrangler perguntar qual conta usar, escolha a do Safra com as setas e aperte Enter.

**Como saber que deu certo:** o Terminal mostra o endereço **https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev** e uma linha de versão (Current Version ID). Abra o endereço no navegador: aparece a landing (variante A). Abra também o endereço com /b/ no fim (variante B) e com /quiz/ no fim (a capa do quiz), que mostra os acentos certos (por exemplo, "diagnóstico", e não "diagnÃ³stico"). O quiz ainda não grava: faltam os segredos, logo abaixo.

**Para publicar de novo depois de uma correção** (o login e os segredos continuam valendo): rode os passos 3.6 e 3.7 de novo, ou os dois num comando só:

```
node entregas/prototipo-funil-01/montar-site.mjs && nucleo/ferramentas/prototipo/node_modules/.bin/wrangler deploy --config entregas/prototipo-funil-01/wrangler.toml
```

**Tempo:** 2 min.

### 3.8 · Guardar a chave publicável no cofre

**Faça, em duas ações seguidas:**

1. No Supabase, Project Settings, API Keys, clique no botão de copiar da **Publishable key**.
2. Sem copiar mais nada no meio, rode no Terminal:

```
if pbpaste | tr -d '[:space:]' | grep -q '^sb_publishable_'; then pbpaste | tr -d '[:space:]' | nucleo/ferramentas/prototipo/node_modules/.bin/wrangler secret put SUPABASE_CHAVE_PUBLICAVEL --config entregas/prototipo-funil-01/wrangler.toml; else echo "PAREI: o que esta copiado nao e a chave publicavel. Copie de novo no Supabase."; fi
```

**Por que o porteiro:** em 09/11/2026 o botão de copiar do Supabase falhou sem avisar e o cofre recebeu o que já estava na área de transferência; o comando agora confere o começo da chave (sb_publishable_) antes de mandar ao cofre, sem mostrar o valor. Se aparecer **PAREI**, copie de novo no Supabase e repita o comando (seta para cima e Enter).

O comando pbpaste entrega ao wrangler o que está na área de transferência, sem mostrar na tela. O valor não aparece no Terminal, não vai para arquivo nenhum e não fica no histórico do Terminal (o histórico guarda só o texto do comando, que não tem a chave).

**Como saber que deu certo:** o Terminal mostra "Success! Uploaded secret SUPABASE_CHAVE_PUBLICAVEL".

**Tempo:** 1 min.

### 3.9 · Guardar a chave secreta no cofre

**Faça, em duas ações seguidas:**

1. No Supabase, na área Secret keys, clique no botão de copiar da chave **garcom_planilha_prototipo**. Se o botão de copiar só aparecer depois do olho, revele, copie e clique no olho de novo para esconder.
2. Sem copiar mais nada no meio, rode:

```
if pbpaste | tr -d '[:space:]' | grep -q '^sb_secret_'; then pbpaste | tr -d '[:space:]' | nucleo/ferramentas/prototipo/node_modules/.bin/wrangler secret put SUPABASE_CHAVE_SECRETA --config entregas/prototipo-funil-01/wrangler.toml && pbcopy < /dev/null; else echo "PAREI: o que esta copiado nao e uma chave secreta. Copie de novo no Supabase."; fi
```

O mesmo porteiro do 3.8 (o botão de copiar falhou sem avisar em 09/11/2026), agora conferindo o começo sb_secret_; quando dá certo, ele mesmo esvazia a área de transferência. Se aparecer **PAREI**, copie de novo no Supabase e repita o comando (seta para cima e Enter).

**Como saber que deu certo:** "Success! Uploaded secret SUPABASE_CHAVE_SECRETA".

**Tempo:** 1 min.

### 3.10 · Limpar a área de transferência

**Faça:** rode:

```
pbcopy < /dev/null
```

Isso esvazia a área de transferência, para a chave secreta não ficar lá esperando um Cmd+V por engano. O comando do 3.9 já esvazia quando dá certo; rode mesmo assim, que não custa nada.

**Como saber que deu certo:** apertar Cmd+V em qualquer campo de texto não cola nada.

**Tempo:** 30 s.

### 3.11 · Gerar a CHAVE_PLANILHA e guardar no cofre

A CHAVE_PLANILHA não existe em lugar nenhum: o Terminal sorteia agora 64 caracteres. Ela vai para o cofre do Worker e fica na área de transferência para a parte 4, onde é colada nas propriedades do script.

**Faça:** rode este comando, numa linha só:

```
openssl rand -hex 32 | tr -d '\n' | pbcopy && pbpaste | nucleo/ferramentas/prototipo/node_modules/.bin/wrangler secret put CHAVE_PLANILHA --config entregas/prototipo-funil-01/wrangler.toml
```

O que ele faz: o openssl sorteia a chave, o pbcopy guarda na área de transferência sem mostrar e o pbpaste entrega ao wrangler. Nada vai para arquivo, para a tela nem para o histórico do Terminal.

**Daqui até o passo 4.3, não copie mais nada.** Se copiar algo por engano, não tem problema: rode este mesmo comando de novo. Ele sorteia uma chave nova e troca a do cofre; a anterior deixa de valer na hora.

**Como saber que deu certo:** "Success! Uploaded secret CHAVE_PLANILHA".

**Tempo:** 1 min.

### 3.12 · Conferir os três segredos

**Faça:** rode:

```
nucleo/ferramentas/prototipo/node_modules/.bin/wrangler secret list --config entregas/prototipo-funil-01/wrangler.toml
```

**Como saber que deu certo:** aparecem **só os nomes** dos três segredos, CHAVE_PLANILHA, SUPABASE_CHAVE_PUBLICAVEL e SUPABASE_CHAVE_SECRETA, cada um com o tipo secret_text. Os valores nunca aparecem. Dá para ver o mesmo no painel da Cloudflare: Workers & Pages, safra-prototipo-funil-01, Settings, Variables and Secrets.

**Tempo:** 30 s.

**Caminho alternativo pelo painel** (se preferir clicar, ou se os comandos com pbpaste derem erro de conta, parte 6, erro 3): no painel da Cloudflare, Workers & Pages, safra-prototipo-funil-01, Settings, Variables and Secrets, Add, tipo **Secret**, o nome exato do segredo e, no valor, Cmd+V do que foi copiado no Supabase. Para a CHAVE_PLANILHA por esse caminho, rode antes só `openssl rand -hex 32 | tr -d '\n' | pbcopy` e cole. Depois de cada uma, limpe a área de transferência (passo 3.10), menos na CHAVE_PLANILHA, que ainda vai para a parte 4.

---

## Parte 4 · Planilha do SDR (10 min)

Só com leads de mentira (pergunta 24.1). Os detalhes de cada tela estão em entregas/planilha-sdr-funil-01/README.md, "Instalação, passo a passo"; aqui a ordem muda num ponto: as propriedades vêm antes do código, para a CHAVE_PLANILHA sair da área de transferência antes de você copiar o código.

### 4.1 · Criar a planilha

**Faça:** no Google Drive da conta sistemadevendassafra@gmail.com, Novo, Planilhas Google, Planilha em branco. Dê o nome **TESTE planilha do SDR funil-01**. Não compartilhe com ninguém (#95).

**Como saber que deu certo:** a planilha abre vazia, com a aba Página1.

**Tempo:** 1 min.

### 4.2 · Abrir o Apps Script da planilha

**Faça:** no menu da planilha, **Extensões**, **Apps Script**. Precisa ser por aqui, de dentro da planilha, para o script só poder mexer nesta planilha (pergunta 24.2).

**Como saber que deu certo:** abre uma aba nova com o editor e um arquivo Código.gs com `function myFunction() {}`.

**Tempo:** 30 s.

### 4.3 · Guardar a CHAVE_PLANILHA nas propriedades do script

**Faça:** no editor, clique em **Configurações do projeto** (a engrenagem, à esquerda), desça até **Propriedades do script**, clique em **Editar propriedades do script** e depois em **Adicionar propriedade do script**. Em Propriedade, escreva **CHAVE_PLANILHA**; em Valor, cole (Cmd+V). Clique em **Salvar propriedades do script**.

**Como saber que deu certo:** a tabela mostra CHAVE_PLANILHA com um valor de 64 letras e números. É normal o valor aparecer (a página só abre para a conta do Safra), mas **não fotografe, não tire print e não grave essa tela**. Se o valor colado não for isso, rode de novo o comando do passo 3.11 e cole outra vez.

**Tempo:** 1 min.

### 4.4 · Limpar a área de transferência

**Faça:** no Terminal, rode:

```
pbcopy < /dev/null
```

**Como saber que deu certo:** Cmd+V em qualquer campo não cola nada. A partir daqui, a CHAVE_PLANILHA só existe no cofre do Worker e nas propriedades do script.

**Tempo:** 30 s.

### 4.5 · Guardar o endereço do garçom

**Faça:** ainda em Propriedades do script, **Editar propriedades do script** (se a tabela não estiver aberta para edição) e **Adicionar propriedade do script**. Propriedade: **GARCOM_URL**. Valor: o endereço do protótipo, com https://, **sem barra no fim** e sem /api:

```
https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev
```

Clique em **Salvar propriedades do script**.

**Como saber que deu certo:** a tabela mostra as duas propriedades, CHAVE_PLANILHA e GARCOM_URL, e o endereço termina em .workers.dev, sem barra. A partir daqui pode religar o Handoff e o histórico da área de transferência (passo 3.0).

**Tempo:** 1 min.

### 4.6 · Copiar o código do script

**Faça:** no Terminal, rode:

```
pbcopy < entregas/planilha-sdr-funil-01/Codigo.gs
```

Daqui até colar no 4.7, não copie mais nada nem tire print: qualquer cópia no meio troca o código pelo que foi copiado.

**Como saber que deu certo:** o Terminal não mostra nada.

**Tempo:** 30 s.

### 4.7 · Colar o código

**Faça:** volte ao **Editor** (o ícone `< >`, à esquerda), abra Código.gs, apague tudo o que está lá, cole e salve (Cmd+S). Se pedir nome para o projeto, use **planilha-sdr-funil-01**.

**Como saber que deu certo:** a lista de funções, no alto, mostra instalar, buscarLeadsNovos e desligar. Se o editor mostrar outra coisa no lugar do código, rode o 4.6 de novo e cole outra vez. Procure no código (Cmd+F) a palavra **pré-qualificado**: ela aparece com o acento certo, sem sinais estranhos no lugar do "é".

**Tempo:** 1 min.

### 4.8 · Mostrar o arquivo de manifesto

O manifesto é o arquivo que diz ao Google quais permissões o script pede.

**Faça:** em Configurações do projeto (a engrenagem), marque **Mostrar arquivo de manifesto "appsscript.json" no editor**.

**Como saber que deu certo:** de volta ao Editor, aparece o arquivo appsscript.json na lista de arquivos.

**Tempo:** 30 s.

### 4.9 · Copiar o manifesto

**Faça:** no Terminal, rode:

```
pbcopy < entregas/planilha-sdr-funil-01/appsscript.json
```

**Como saber que deu certo:** o Terminal não mostra nada.

**Tempo:** 30 s.

### 4.10 · Colar o manifesto

**Faça:** no Editor, abra appsscript.json, apague tudo, cole e salve.

**Como saber que deu certo:** o arquivo mostra "America/Sao_Paulo", "V8" e as três permissões: spreadsheets.currentonly, script.external_request e script.scriptapp.

**Tempo:** 30 s.

### 4.11 · Rodar a instalação

**Faça:** no Editor, escolha **instalar** na lista de funções, no alto, e clique em **Executar**.

**Como saber que deu certo:** o Google pede autorização (passo seguinte).

**Tempo:** 30 s.

### 4.12 · Autorizar o script

**Faça:** clique em **Revisar permissões** e escolha a conta do Safra. Vai aparecer a tela **"O Google não verificou este app"**. Ela aparece para todo script feito pela própria pessoa, que nunca passou pela revisão do Google; aqui o app é o seu próprio script, que você acabou de colar. Clique em **Avançado** e em **Acessar planilha-sdr-funil-01 (não seguro)**. Na lista de permissões, confira que são só três (ver e editar só esta planilha; conectar a um serviço externo; executar quando você não estiver presente) e clique em **Permitir**.

**Como saber que deu certo:** o **Registro de execução**, embaixo, termina com `[planilha] instalar: aba criada; gatilho criado` e "Execução concluída". Se terminar sem essa linha, clique em Executar de novo. Na planilha, a aba **fila** tem os 19 cabeçalhos na linha 1, congelada, e as colunas estagio, estado e canal mostram a setinha da lista. No editor, em **Acionadores** (o relógio, à esquerda), há um acionador só, buscarLeadsNovos, baseado no tempo, a cada 5 minutos.

Se aparecer "faltam as propriedades do script..." ou um aviso sobre o endereço ou a chave, volte aos passos 4.3 e 4.5 e depois rode instalar de novo.

**Tempo:** 2 min.

---

## Parte 5 · Teste com leads de mentira (15 min)

Três testes, cada um com uma pessoa de mentira diferente (decisão #102). **Cada pessoa com telefone e e-mail só dela:** telefone de uma com e-mail de outra é recusado pelo banco (pergunta 21.2).

| Teste | Onde | Pessoa | E-mail | Telefone (Brasil) | Respostas |
|---|---|---|---|---|---|
| A | Computador, pela variante A | TESTE Ana Roteiro | ana.roteiro@teste.invalid | 00 90000-0011 | Exemplo da faixa A |
| B | Celular, pela variante B | TESTE Bruno Roteiro | bruno.roteiro@teste.invalid | 00 90000-0012 | Eliminatório |
| C | Computador, duas abas | TESTE Duplo Roteiro | duplo.roteiro@teste.invalid | 00 90000-0013 | Exemplo da faixa A |

O telefone começa por 00 de propósito, para não ser de ninguém; com o +55 que o quiz põe, fica com 13 dígitos, o bastante para o banco (de 8 a 15).

**As respostas do exemplo da faixa A** (base/lead-score.md, "Exemplo de conferência": nota 96, faixa A). Na tela que pergunta "Para começar: como você se chama?", escreva **TESTE**. Depois:

| Pergunta do quiz | Resposta |
|---|---|
| Ramo | Serviços para empresas |
| Faturamento por mês | R$ 500 mil a R$ 1,5 milhão |
| Vendedores | 2 ou 3 |
| Quem marca é quem vende? | Sim. O vendedor faz tudo |
| Valor médio de uma venda | 10000 |
| De onde vêm os leads | Indicação de clientes (e o botão para seguir) |
| CRM | Sim, e o time atualiza todo dia |
| Cargo | Dono(a) ou sócio(a) |
| Lembra dos números? | Sim |
| Números do funil, na ordem, sem mexer nos botões de unidade | 200, 50, 50, 40, 2 |
| Primeiro contato | Em até 1 hora |
| Tentativas antes de desistir | 1 ou 2 |
| Sobra lead sem contato? | Alguns |
| Contato | Em **Seu nome**, que já chega preenchido com o nome da primeira tela (TESTE), apague tudo e escreva o nome completo; em **E-mail** e em **WhatsApp**, o e-mail e o telefone da tabela de cima; marque as duas caixas, "Aceito receber o diagnóstico e o contato da equipe por WhatsApp." e "... por e-mail."; depois o botão **Ver meu diagnóstico** |

**O eliminatório:** as mesmas respostas, só trocando o faturamento por **Menos de R$ 50 mil**.

Responda tela por tela. **Não use o botão "protótipo · preencher exemplo"**, que fica na tela do contato: ele troca o contato pela TESTE Marina Souza, e as pessoas da tabela de cima deixam de valer. **Não pule telas pelo botão Telas**, no canto: as respostas puladas ficam em branco e a nota sai errada.

### 5.1 · Teste A, no computador

**Faça:** abra no computador `https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev/?utm_source=bio&utm_campaign=funil-01`, desça até perto do fim da página, clique no botão **Quero responder as perguntas do meu funil** e faça o quiz com a pessoa A e as respostas da faixa A. No campo **Nome da empresa** (opcional), escreva **=1+1**, para conferir que a planilha não transforma isso em fórmula (pergunta 24.12). Clique em **Ver meu diagnóstico**.

**Como saber que deu certo:** o quiz chega à tela do plano ("Quer receber o seu plano de ação de 90 dias?") e **não** aparece o aviso "Não conseguimos enviar o seu contato para a nossa equipe agora". Anote a hora.

**Tempo:** 3 min.

### 5.2 · Teste B, no celular

**Faça:** abra no celular `https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev/b/?utm_source=stories&utm_campaign=funil-01`, desça até perto do fim da página, toque no botão **Quero responder as perguntas do meu funil** e faça o quiz com a pessoa B e as respostas do eliminatório. Toque em **Ver meu diagnóstico**.

**Como saber que deu certo:** a página cabe na largura do celular, o quiz chega ao relatório e não aparece o aviso de falha.

**Tempo:** 3 min.

### 5.3 · Teste C, dois envios quase juntos

Confere que a mesma pessoa enviando duas vezes quase juntas vira uma pessoa só no banco, com dois fins de quiz (pergunta 25.5). Atenção: dois cliques à mão quase nunca chegam ao banco no mesmo milésimo de segundo. Se não chegarem de fato juntos, o teste prova a pessoa repetida, mas o caso realmente simultâneo continua sem prova (pergunta 21.15).

**Faça:** no computador, abra o endereço do quiz (`https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev/quiz/?utm_source=bio&utm_campaign=funil-01`) em **duas abas**. Nas duas, faça o quiz com a pessoa C e as respostas da faixa A, até a tela do contato, e preencha o contato nas duas, sem enviar. Depois clique em **Ver meu diagnóstico** na primeira aba e, o mais rápido que puder, na segunda.

**Como saber que deu certo:** as duas abas chegam à tela do plano, sem o aviso de falha.

**Tempo:** 6 min.

### 5.4 · Conferir as pessoas no Supabase

**Faça:** no Supabase, abra o **Table Editor** (menu da esquerda) e a tabela **pessoas**. Você entra como dono do projeto, então vê as linhas apesar da fechadura (RLS).

**Como saber que deu certo:** há **3 linhas**: TESTE Ana Roteiro, TESTE Bruno Roteiro e TESTE Duplo Roteiro, cada uma uma vez só, com os e-mails @teste.invalid, consentimento_whatsapp e consentimento_email "sim", consentimento_texto preenchido e primeira_utm_source bio (ou stories, no B).

**Tempo:** 1 min.

### 5.5 · Conferir os eventos no Supabase

**Faça:** no Table Editor, abra a tabela **eventos**.

**Como saber que deu certo:** há **4 linhas** de tipo fim_quiz: uma da Ana (lead_score_nota 96, lead_score_faixa a, utm_source bio), uma do Bruno (lead_score_faixa eliminatorio, utm_source stories) e **duas** da pessoa C, ligadas ao **mesmo** id_pessoa (o código interno da pessoa, ver "Palavras que aparecem aqui"; basta ver que as duas linhas têm o mesmo). Todas com funil funil-01, entrega quiz-01, versao_entrega 1. Se quiser conferir o teste C só com números, cole no SQL Editor:

```
select count(distinct p.id_pessoa) as pessoas, count(e.id_evento) as fins_de_quiz
  from public.pessoas p
  left join public.eventos e on e.id_pessoa = p.id_pessoa and e.tipo = 'fim_quiz'
 where p.email = 'duplo.roteiro@teste.invalid';
```

Deve dar pessoas **1** e fins_de_quiz **2**.

**Tempo:** 1 min.

### 5.6 · Conferir a planilha

O banco só entrega à planilha quem terminou o quiz há mais de 1 minuto (margem de segurança, pergunta 21.6), e o gatilho roda a cada 5 minutos. Por isso a linha aparece **de 1 a 6 minutos** depois do envio. Para não esperar o gatilho, depois de 1 minuto, escolha buscarLeadsNovos no editor do Apps Script e clique em Executar.

**Faça:** espere até 6 minutos depois do teste C e olhe a aba **fila** da planilha.

**Como saber que deu certo:**

- Há **2 linhas**: TESTE Ana Roteiro e TESTE Duplo Roteiro (a pessoa C entra uma vez só, apesar dos dois envios). O Bruno **não** aparece: a planilha só recebe faixa A ou B com WhatsApp aceito.
- Na linha da Ana: lead_score_faixa a, lead_score_nota 96, estagio **captado**, entrou_em no horário de Brasília (o mesmo do envio, com diferença de segundos) e a empresa aparece como **=1+1**, como texto, sem virar 2 e sem apóstrofo visível.
- canal, contato_em, reuniao_em e produto vazios.
- No editor do Apps Script, em **Execuções** (à esquerda), as rodadas de buscarLeadsNovos estão concluídas, com `[planilha] busca: ...` e nenhum nome, telefone ou e-mail. Rodar buscarLeadsNovos de novo à mão não repete nenhuma linha.

**Tempo:** 1 min, rodando a busca à mão depois de 1 minuto do envio; esperando o gatilho, até 6 min.

Pronto: o protótipo está ligado para teste. Volte à parte 7 quando quiser desligar.

---

## Parte 6 · Se algo der errado

Os três erros mais prováveis, escolhidos pelo que as etapas 21 a 25 registraram, e um quarto, que aconteceu de verdade em 09/11/2026 (Erro 4).

### Como ver o registro do Worker sem expor dado pessoal

O garçom só escreve no registro códigos curtos, como `[garcom] fim-quiz: gravado` ou `[garcom] fim-quiz: banco-409`, nunca nome, telefone, e-mail ou chave. Para ver ao vivo, deixe este comando rodando numa janela do Terminal (na pasta do repositório) e repita o envio do quiz:

```
nucleo/ferramentas/prototipo/node_modules/.bin/wrangler tail --config entregas/prototipo-funil-01/wrangler.toml --format pretty --method POST
```

O `--method POST` mostra só os envios do quiz. Não use o formato json nem tire o filtro: o pedido da planilha leva o cursor no endereço (um id interno da pessoa de teste) e a CHAVE_PLANILHA num cabeçalho, e o formato json mostra os cabeçalhos (pergunta 26.5). Para parar, Ctrl+C. Use só este comando: o painel da Cloudflare também mostra registros, mas lá os pedidos da planilha (GET) aparecem com o endereço inteiro; se um dia abrir por lá, filtre só POST e não abra nenhum pedido GET.

### Erro 1 · O quiz mostra "Não conseguimos enviar o seu contato para a nossa equipe agora"

Abra o registro (acima), clique em **Tentar de novo** no quiz e veja a linha `[garcom] fim-quiz: ...`:

| O registro diz | O que é | O que fazer |
|---|---|---|
| `banco-409` | Falta a linha do catálogo (pergunta 23.10) | Passos 2.7 e 2.8 |
| `configuracao-incompleta` | Falta a chave publicável no cofre | Passo 3.8 |
| `banco-401` ou `banco-403` | A chave publicável no cofre está errada (por exemplo, a secreta colada no lugar, ou outra coisa que estava na área de transferência) | Veja o Erro 4; passo 3.8 de novo com o porteiro, copiando a **Publishable key**; depois limpe a área de transferência (3.10) |
| `origem` | O endereço do quiz aberto não é o do protótipo, ou ORIGEM_PERMITIDA está errada | Abra o quiz pelo endereço https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev. Se for esse, confira em entregas/prototipo-funil-01/wrangler.toml que ORIGEM_PERMITIDA é esse endereço, sem barra no fim, e publique de novo (3.7) |
| `banco-400` | O banco recusou o pacote; o mais comum é telefone de uma pessoa de teste com e-mail de outra (21.2) | Use outra pessoa de teste, com telefone e e-mail novos |
| `recusado: ...` | O garçom recusou o pacote (por exemplo, telefone curto) | Confira os campos do contato |
| nenhuma linha | O pedido nem chegou ao garçom | Confira a internet; confira que o endereço abre a landing (3.7) |

### Erro 2 · A planilha não recebe o lead

Primeiro, espere 6 minutos inteiros depois do envio (a margem de 1 minuto do banco mais o gatilho de 5). Depois rode buscarLeadsNovos à mão e leia a mensagem em Execuções:

| O que aparece | O que fazer |
|---|---|
| `busca: 0 linha(s) nova(s)` | O lead não é da planilha: o banco só manda faixa A ou B **com WhatsApp aceito** (21.4). O Bruno (eliminatório) nunca entra. Confira na tabela pessoas se consentimento_whatsapp é sim e na tabela eventos se a faixa é a ou b; se o envio tiver menos de 1 minuto, espere |
| "o garçom respondeu 401..." | A CHAVE_PLANILHA das propriedades não é igual à do cofre. Rode o comando do passo 3.11 de novo (sorteia outra e troca no cofre), cole nas propriedades no lugar da antiga (4.3) e limpe a área de transferência (4.4) |
| "faltam as propriedades do script..." | Passos 4.3 e 4.5; depois rode instalar de novo |
| "não deu para falar com o garçom..." | Confira GARCOM_URL: https://, termina em .workers.dev, sem barra e sem /api (4.5) |
| "o garçom respondeu com erro..." | O garçom ou o banco está fora, ou a chave secreta no cofre está errada (veja o Erro 4). Refaça o passo 3.9 com o porteiro, copiando a garcom_planilha_prototipo, e limpe a área de transferência (3.10) |
| Nenhuma execução em Execuções | O gatilho não foi criado: veja Acionadores e rode instalar de novo (4.11) |

### Erro 3 · O wrangler pede login ou dá erro de conta

| O que aparece | O que fazer |
|---|---|
| "You are not authenticated" ou "Please run wrangler login" | Passos 3.4 e 3.5 |
| Pede para escolher a conta, ou diz que há mais de uma conta e não consegue escolher (acontece com os comandos que começam por pbpaste, que não deixam o wrangler perguntar) | Antes, copie o valor: para as chaves do Supabase, o botão de copiar no painel (3.8 ou 3.9); para a CHAVE_PLANILHA, rode só `openssl rand -hex 32 \| tr -d '\n' \| pbcopy`. Depois rode o mesmo comando **sem** a parte `pbpaste \|`, por exemplo `nucleo/ferramentas/prototipo/node_modules/.bin/wrangler secret put SUPABASE_CHAVE_PUBLICAVEL --config entregas/prototipo-funil-01/wrangler.toml`. Escolha a conta do Safra; quando aparecer "Enter a secret value", cole (Cmd+V) e aperte Enter. O Terminal não mostra o que foi colado. No fim, limpe a área de transferência (3.10), menos na CHAVE_PLANILHA, que só se limpa no 4.4. Ou use o caminho pelo painel (fim da parte 3) |
| "whoami" mostra outra conta | logout, e o passo 3.4 com a conta do Safra aberta no navegador |
| Erro sobre o subdomínio workers.dev | No painel da Cloudflare, Workers & Pages, confira que o subdomínio da conta é sistemadevendassafra. Se for outro, o endereço muda: pare e traga a mensagem ao repositório, porque ORIGEM_PERMITIDA e GARCOM_URL dependem dele |

### Erro 4 · O garçom registra `banco-401`

Aconteceu em 09/11/2026: o cofre recebeu as duas chaves do Supabase com valor errado, porque o botão de copiar falhou sem avisar. O quiz mostra o aviso de falha e a planilha não recebe nada.

**Como ver:** deixe rodando numa janela do Terminal

```
nucleo/ferramentas/prototipo/node_modules/.bin/wrangler tail --config entregas/prototipo-funil-01/wrangler.toml --format pretty
```

e repita o envio do quiz (ou rode buscarLeadsNovos à mão). Sem o filtro `--method POST`, aparecem também os pedidos da planilha (GET), com o cursor no endereço (um id interno de pessoa de teste): não copie, não fotografe e pare com Ctrl+C assim que vir a linha. No Supabase, abra **Logs**, **API Gateway** e veja o campo **error_code** dos pedidos recusados.

**Se for `UNAUTHORIZED_INVALID_API_KEY`:** o cofre tem valor errado. Refaça os passos 3.8 e 3.9 com o porteiro e limpe a área de transferência (3.10). Não precisa publicar de novo: o `secret put` já publica.

---

## Parte 7 · Como desligar tudo rápido (11 min)

Ordem: **primeiro cortar o acesso, depois apagar.** Se uma chave puder ter vazado, faça os passos de corte na hora e o resto depois.

### Cortar o acesso

**7.1 · Parar a planilha.** No editor do Apps Script, escolha **desligar** e clique em Executar. *Deu certo se:* Acionadores fica vazio. (1 min)

**7.2 · Apagar a chave secreta no Supabase.** Project Settings, API Keys, Secret keys, apagar a **garcom_planilha_prototipo**. *Deu certo se:* ela some da lista; a porta privada deixa de ler o banco na hora. (1 min)

**7.3 · Apagar a chave publicável no Supabase.** Na mesma página, apagar a **Publishable key** usada. Se o painel não deixar apagar a única que existe, crie uma nova e apague a antiga; a nova não vai para lugar nenhum. *Deu certo se:* a chave usada some da lista; o quiz deixa de gravar na hora. (1 min)

**7.4 · Tirar o endereço do ar.** No painel da Cloudflare, Workers & Pages, safra-prototipo-funil-01, Settings, Domains & Routes, desligar (Disable) a rota **workers.dev**. *Deu certo se:* o endereço do protótipo deixa de abrir a landing. (1 min)

### Apagar

**7.5 · Apagar os três segredos do cofre.** Rode um de cada vez e confirme com **y** quando o wrangler perguntar:

```
nucleo/ferramentas/prototipo/node_modules/.bin/wrangler secret delete CHAVE_PLANILHA --config entregas/prototipo-funil-01/wrangler.toml
```

```
nucleo/ferramentas/prototipo/node_modules/.bin/wrangler secret delete SUPABASE_CHAVE_SECRETA --config entregas/prototipo-funil-01/wrangler.toml
```

```
nucleo/ferramentas/prototipo/node_modules/.bin/wrangler secret delete SUPABASE_CHAVE_PUBLICAVEL --config entregas/prototipo-funil-01/wrangler.toml
```

Ou pelo painel: Settings, Variables and Secrets, apagar cada um. *Deu certo se:* o `secret list` do passo 3.12 mostra uma lista vazia. (2 min)

**7.6 · Apagar o Worker.** Rode e confirme:

```
nucleo/ferramentas/prototipo/node_modules/.bin/wrangler delete --config entregas/prototipo-funil-01/wrangler.toml
```

Ou pelo painel: safra-prototipo-funil-01, Settings, Delete. *Deu certo se:* o Worker some da lista em Workers & Pages. (1 min)

**7.7 · Apagar a CHAVE_PLANILHA das propriedades do script.** Configurações do projeto, Propriedades do script, **Editar propriedades do script**, apagar CHAVE_PLANILHA e salvar. *Deu certo se:* só GARCOM_URL fica na lista. (1 min)

**7.8 · Sair do wrangler.** Rode:

```
nucleo/ferramentas/prototipo/node_modules/.bin/wrangler logout
```

*Deu certo se:* o Terminal diz que saiu ("Successfully logged out"); o login guardado no Mac deixa de valer (pergunta 26.6). (30 s)

**7.9 · Fechar as chaves que sobraram no Supabase.** Se as chaves antigas (legacy) ainda estiverem ligadas, desligue (passo 2.11). Se existir uma chave secreta **default** que ninguém usa, apague. *Deu certo se:* Project Settings, API Keys mostra as antigas desativadas e nenhuma chave secreta sobrando. (1 min)

A planilha de teste e os dados de teste do banco **não** se apagam aqui: são pendências próprias, abaixo.

---

## Antes de ir ao ar com gente de verdade

Este roteiro liga só o teste. Antes do primeiro lead de verdade, continuam abertas as pendências do log.md (seção Pendências), que não se repetem aqui:

- **Dados de teste do protótipo (#102):** limpar do banco os leads TESTE e @teste.invalid de propósito, ou recomeçar o banco do zero, e registrar como foi feito; junto, decidir o que fazer com a linha do catálogo (25.2).
- **Planilha de teste do SDR (#102; 24.1):** apagar do Drive a planilha TESTE planilha do SDR funil-01 e esvaziar a lixeira, e registrar.
- **Proteção contra robô e limite de pedidos:** Turnstile no quiz e limite de pedidos da Cloudflare nas rotas /api/.
- **Aprovações:** das páginas (Otávio, Júnior e Euclides), do garçom, do banco e da planilha (Otávio).
- **Conflito-17:** o destino dos contatos (Júnior e Euclides, aprovação da #90).

Revisão jurídica fica com a empresa que assina a política, fora do sistema (decisão do Otávio, 09/11/2026, 16.4; base/decisoes.md, #103).

Também segue em aberto a volta do status da planilha para o banco (log.md, Pendências). Onde a planilha mora está decidido: no Drive do Safra, como exceção registrada à regra 4 de segurança (5.4).

**Depois de ligar e depois de desligar:** conte ao Claude, no Claude Code, só a data em que as chaves foram criadas ou apagadas, para ele registrar a "Última troca" em conexoes.md (linhas do Supabase, da Cloudflare e da planilha do SDR). Só a data, nunca o valor de uma chave.

## Perguntas

prompts/08-fila-perguntas.md, seção "Etapa 26".
