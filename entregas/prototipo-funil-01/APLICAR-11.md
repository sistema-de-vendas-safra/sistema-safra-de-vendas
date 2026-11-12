---
id: prototipo-funil-01-aplicar-11
versao: 2
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: prototipo-funil-01
    versao: 6
  - id: prototipo-funil-01-ligar
    versao: 5
  - id: banco-migracao-001
    versao: 1
  - id: banco-conferir
    versao: 2
  - id: banco-catalogo-prototipo
    versao: 3
  - id: banco-rascunho
    versao: 4
  - id: planilha-sdr-funil-01
    versao: 2
  - id: garcom
    versao: 4
  - id: quiz-01-pagina
    versao: 3
  - id: landing-page-02
    versao: 1
  - id: ensaio-prototipo-funil-01
    versao: 4
  - id: lead-score
    versao: 3
  - id: decisoes
    versao: 5
  - id: regra-seguranca
    versao: 3
desatualizado: true
---

# Roteiro para aplicar as mudanças de 09/11 no protótipo

O passo a passo para o Otávio levar ao protótipo que já está no ar o que as etapas 32 a 34 fizeram (prompts/11-decisoes-de-09-11.md): a migração do banco, o catálogo novo, a planilha com 20 colunas, o garçom v4 e as páginas novas (a caixa de aceite única, o corte mais restritivo, a visita, o início do quiz e o clique no fim). No mesmo padrão do LIGAR.md: uma ação por passo, como saber que deu certo e o que fazer se der errado. **Tempo total estimado: cerca de 40 minutos.**

**Status.** Rascunho, pendente do Otávio. Nasce desatualizado, porque se apoia em documentos marcados (a migração, o banco, o garçom, as páginas, a planilha e o protótipo; regra 11.1). Tudo o que está aqui foi ensaiado na máquina, sem serviço real: o ensaio geral (nucleo/ferramentas/ensaio/, v4) roda a migração duas vezes sobre dados como os de hoje, o catálogo, o garçom v4, as páginas e a planilha v2, e deu 145 de 145, duas vezes.

**A ordem importa.** O banco antes de tudo: o garçom v4 chama a função nova do banco (registrar_evento), que só existe depois da migração (33.4), e as páginas novas mandam o quiz-01 versão 2 e a landing-page-02 versão 1, que só existem depois do catálogo (34.4). Publicar antes deixa a visita, o início e o fim do quiz novo recusados. Nada se grava errado, mas o teste não fecha.

**Versão 2 (12/11/2026).** A página antes do quiz agora é a landing-page-02, a página de vendas, em /, no lugar das variantes A e B da landing-page-01; o /b/ saiu do site. Mudaram: a parte 1 (puxar os commits que o Claude mandou direto ao GitHub), o 2.6 (quatro linhas no catálogo), o 4.3 (a mensagem do montador e o que aparece em /), a parte 6 (os três testes entram por / e pelos botões novos) e o 6.5 (a visita como landing-page-02).

> **Leia antes de começar** (as mesmas regras do LIGAR.md)
>
> - **Protótipo de teste não é entrega.** Ir ao ar com gente de verdade continua travado (conflito-17 em base/lacunas.md, páginas e garçom em rascunho, proteção contra robô; log.md, Pendências).
> - **Só leads de mentira** (#102): nome começando por **TESTE** e e-mail terminado em **@teste.invalid**. Nada de gente de verdade, nem o seu nome, nem o seu telefone.
> - **Nunca cole uma chave no chat com o Claude, em arquivo, em e-mail, em mensagem ou numa célula da planilha.** Este roteiro não pede nenhuma chave: nada vai para o cofre. Se precisar de ajuda, copie só a mensagem de erro.
> - **Não grave nem compartilhe a tela das partes 2, 3, 5 e 6** (nem print, nem foto, nem chamada de vídeo): o painel do Supabase e o Apps Script mostram chave e dado de pessoa, e a planilha mostra a sua linha de 09/11, que é dado real.

## Resumo do tempo

| Parte | O que é | Tempo |
|---|---|---|
| 1 | Push no GitHub Desktop | 2 min |
| 2 | Banco: migração, catálogo e conferência | 8 min |
| 3 | Planilha do SDR com 20 colunas | 6 min |
| 4 | Publicar o site e o garçom novos | 4 min |
| 5 | Apagar a chave secreta "default" | 2 min |
| 6 | Teste rápido com pessoas de mentira novas | 15 min |
| 7 | Avisar o Claude | 2 min |
| | **Total** | **cerca de 40 min** |

Se algo der errado no caminho, os erros mais prováveis estão no fim de cada parte e na parte 6 do LIGAR.md ("Se algo der errado"), que continua valendo. Para desligar tudo, a parte 7 do LIGAR.md.

---

## Parte 1 · Push no GitHub Desktop (2 min)

### 1.1 · Mandar os commits para o GitHub

**Faça:** abra o GitHub Desktop, escolha o repositório sistema-safra-de-vendas e clique em **Fetch origin**. Se o botão virar **Pull origin**, clique nele: ele traz os commits de 12/11/2026 que o Claude mandou direto ao GitHub (a página de vendas). Se o botão mostrar **Push origin**, clique nele também.

**Como saber que deu certo:** o botão volta a dizer "Fetch origin", sem número, e a mensagem do último commit no site do GitHub é a mesma do topo da aba **History**.

**Se der errado:** se o GitHub Desktop pedir login ou disser que o repositório mudou lá, não force nada: copie a mensagem e traga ao Claude.

**Tempo:** 2 min.

---

## Parte 2 · Banco: migração, catálogo e conferência (8 min)

Rode numa hora sem teste em curso: a troca de restrição da migração trava a tabela eventos por um instante.

### 2.1 · Abrir o Terminal na pasta do repositório

**Faça:** abra o Terminal, cole e aperte Enter:

```
cd "/Volumes/OBM2T/OBM2T/CLAUDE CODE/triad/sistema-safra-de-vendas"
```

**Como saber que deu certo:** nenhuma mensagem de erro, e a linha do Terminal termina com `sistema-safra-de-vendas`. Deixe o Terminal aberto até o fim.

**Tempo:** 30 s.

### 2.2 · Abrir o SQL Editor do Supabase

**Faça:** no navegador, entre em supabase.com com sistemadevendassafra@gmail.com, abra o projeto **sistema-de-vendas-safra** e, no menu da esquerda, o **SQL Editor**.

**Como saber que deu certo:** o nome sistema-de-vendas-safra aparece no alto, e o editor abre.

**Tempo:** 1 min.

### 2.3 · Copiar a migração

**Faça:** no Terminal, rode:

```
pbcopy < dados/banco/migracoes/001-v3.sql
```

Não é segredo: é só o desenho das mudanças do banco.

**Como saber que deu certo:** o Terminal não mostra nada e volta a esperar o próximo comando.

**Tempo:** 30 s.

### 2.4 · Rodar a migração

**Faça:** no SQL Editor, crie uma consulta nova (**New query**), cole (Cmd+V) e clique em **Run**. Se aparecer o aviso de operação destrutiva ("Potential issue detected"), clique em **Run this query**: é esperado, por causa dos comandos que trocam restrições e retiram permissões. Nenhuma tabela, coluna ou linha é apagada.

**Como saber que deu certo:** embaixo aparece "Success. No rows returned", sem nada em vermelho.

**Se der errado:** a migração roda inteira ou não roda nada (uma transação só): com erro, o banco ficou como estava. Não siga para o passo seguinte. Copie só a mensagem de erro (ela não tem chave nem dado de pessoa) e traga ao Claude. Rodar a migração de novo não quebra nada e dá o mesmo resultado (conferido no ensaio, duas vezes sobre dados).

**Tempo:** 1 min.

### 2.5 · Copiar o catálogo

**Faça:** no Terminal, rode:

```
pbcopy < dados/banco/catalogo-prototipo.sql
```

**Como saber que deu certo:** o Terminal não mostra nada.

**Tempo:** 30 s.

### 2.6 · Gravar o catálogo novo (antes de publicar)

Sem este passo, a visita da landing, o início do quiz e o fim do quiz da página nova são recusados pelo banco (34.4). Ele só acrescenta as linhas que faltarem (quiz-01 versão 2, landing-page-01 versão 1 e landing-page-02 versão 1); a do quiz-01 versão 1, que já está lá, não muda.

**Faça:** no SQL Editor, crie outra consulta nova, cole e clique em **Run**.

**Como saber que deu certo:** aparecem **quatro linhas**: landing-page-01, versão 1, tipo landing; landing-page-02, versão 1, tipo landing; quiz-01, versão 1, tipo quiz (com a data de 09/11 de manhã, a de antes); e quiz-01, versão 2, tipo quiz. Todas com funil funil-01, publicada_em com data e hora e retirada_em vazia (NULL). Rodar de novo não duplica.

**Se der errado:** se aparecer menos de quatro linhas ou um erro, não publique (parte 4): copie a mensagem e traga ao Claude.

**Tempo:** 1 min.

### 2.7 · Copiar a conferência

**Faça:** no Terminal, rode:

```
pbcopy < dados/banco/conferir.sql
```

**Como saber que deu certo:** o Terminal não mostra nada.

**Tempo:** 30 s.

### 2.8 · Rodar a conferência

Essa consulta só lê; não muda nada.

**Faça:** no SQL Editor, crie outra consulta nova, cole e clique em **Run**.

**Como saber que deu certo:** aparece uma tabela com **19 linhas** e a coluna **ok** com **true** em todas. A última linha, n = 99, "tudo certo", mostra em **encontrado** o texto **18 de 18**. O que cada linha deve dizer está em dados/banco/README.md, "Como conferir".

**Se der errado:**

| O que aparece | O que é | O que fazer |
|---|---|---|
| Linha 99 com **11 de 18**, e false nas linhas 4, 8 e 14 a 18 | A migração não rodou | Passos 2.3 e 2.4 de novo; depois, este |
| Outra linha com false | Algo diferente do ensaiado | Anote o número da linha e o que apareceu em encontrado (não tem chave nem dado de pessoa), rode a migração de novo (2.3 e 2.4) e este passo. Se continuar false, pare e traga a linha ao Claude |

**Tempo:** 1 min.

---

## Parte 3 · Planilha do SDR com 20 colunas (6 min)

A planilha v2 tem uma coluna nova, **clique_fim_quiz** (o que a pessoa clicou no fim do quiz, só de leitura). Com o código novo, a aba antiga, de 19 colunas, não confere, e a busca para sem gravar nada: por isso a aba antiga é renomeada e a instalação roda de novo (entregas/planilha-sdr-funil-01/README.md, "Atualizar da versão 1"). Entre o passo 3.2 e o 3.4, o gatilho de 5 minutos pode rodar e registrar `busca: cabecalho-diferente` ou `busca: sem-aba`: é normal, e nada é gravado.

### 3.1 · Copiar o código novo

**Faça:** no Terminal, rode:

```
pbcopy < entregas/planilha-sdr-funil-01/Codigo.gs
```

**Como saber que deu certo:** o Terminal não mostra nada.

**Tempo:** 30 s.

### 3.2 · Trocar o código no Apps Script

**Faça:** abra a planilha **TESTE planilha do SDR funil-01** no Drive do Safra e, no menu, **Extensões**, **Apps Script**. No arquivo **Código.gs**, selecione tudo (Cmd+A), cole (Cmd+V) por cima e salve (Cmd+S).

**Como saber que deu certo:** a lista de funções, no alto, mostra instalar, buscarLeadsNovos e desligar. Procure no código (Cmd+F) **clique_fim_quiz**: aparece. Procure **pré-qualificado**: aparece com o acento certo.

**Se der errado:** se o editor mostrar outra coisa no lugar do código, rode o 3.1 de novo e cole outra vez.

**Tempo:** 1 min.

### 3.3 · Renomear a aba antiga

**Faça:** na planilha, clique com o botão direito na aba **fila**, escolha **Renomear** e escreva **fila antiga**.

**Como saber que deu certo:** a aba se chama **fila antiga** e não há nenhuma aba chamada fila. As linhas dela continuam lá, como estavam.

**Tempo:** 30 s.

### 3.4 · Rodar a instalação de novo

**Faça:** no editor do Apps Script, escolha **instalar** no alto e clique em **Executar**. Se o Google pedir autorização de novo, autorize como no LIGAR.md, passo 4.12 (as mesmas três permissões).

**Como saber que deu certo:** o **Registro de execução** termina com `[planilha] instalar: aba criada; gatilho ...` e "Execução concluída". Na planilha, há uma aba **fila** nova, com os **20 cabeçalhos** na linha 1, congelada, e **clique_fim_quiz** na coluna 13 (M), entre tentativas_feitas e estagio. Em **Acionadores**, continua um acionador só, buscarLeadsNovos, a cada 5 minutos.

**Se der errado:** se aparecer "a aba fila já existe com outro cabeçalho", a aba antiga ainda se chama fila: volte ao 3.3. Se aparecer "faltam as propriedades do script", as propriedades se perderam: LIGAR.md, passos 4.3 a 4.5 (a CHAVE_PLANILHA nova vai também para o cofre, passo 3.11 do LIGAR.md).

**Tempo:** 1 min.

### 3.5 · Buscar os leads que já estavam no banco

**Faça:** escolha **buscarLeadsNovos** e clique em **Executar**.

**Como saber que deu certo:** o registro termina com `[planilha] busca: 3 linha(s) nova(s), ...` (ou 0, se o gatilho já tiver rodado antes: o que vale é a aba) e "Execução concluída", sem nome, telefone ou e-mail no registro. A aba **fila** nova tem **3 linhas**, as mesmas da aba antiga: a sua linha de 09/11 (faixa a, nota 86), TESTE Ana Roteiro (com a empresa **=1+1** como texto) e TESTE Duplo Roteiro, uma vez só. A coluna clique_fim_quiz está vazia nas três (elas são de antes do clique). Rodar de novo não repete nenhuma linha.

**Se der errado:** LIGAR.md, parte 6, Erro 2 (a planilha não recebe o lead). A sua linha de 09/11 é dado real: ela já estava na aba antiga; as duas abas e as duas cópias dela saem juntas na limpeza antes de ir ao ar (#102; log.md, Pendências).

**Tempo:** 1 min.

---

## Parte 4 · Publicar o site e o garçom novos (4 min)

### 4.1 · Desligar as estatísticas do wrangler nesta janela

**Faça:** no Terminal, rode:

```
export WRANGLER_SEND_METRICS=false
```

**Como saber que deu certo:** o Terminal não mostra nada.

**Tempo:** 30 s.

### 4.2 · Conferir a conta do wrangler

O wrangler continua com o login de 09/11 (#113).

**Faça:** rode:

```
nucleo/ferramentas/prototipo/node_modules/.bin/wrangler whoami
```

**Como saber que deu certo:** aparece o e-mail sistemadevendassafra@gmail.com e a conta do Safra.

**Se der errado:** se pedir login ou mostrar outra conta, LIGAR.md, parte 6, Erro 3, e os passos 3.4 e 3.5 de lá.

**Tempo:** 30 s.

### 4.3 · Montar e publicar, num comando só

O mesmo comando do LIGAR.md (fim do passo 3.7): monta o site a partir das entregas e, só se a montagem der certo, publica.

**Faça:** rode:

```
node entregas/prototipo-funil-01/montar-site.mjs && nucleo/ferramentas/prototipo/node_modules/.bin/wrangler deploy --config entregas/prototipo-funil-01/wrangler.toml
```

**Como saber que deu certo:** o montador termina com "Tudo certo: charset utf-8 no início, noindex e viewport em todo HTML, todos os caminhos e todas as imagens do programa da landing existem no site e nenhuma página pede arquivo a outro endereço." Depois o wrangler mostra o endereço **https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev** e uma linha **Current Version ID**: anote esse código (não é segredo). Abra o endereço: aparece a página de vendas (landing-page-02). Abra com /quiz/ no fim: a capa do quiz, com os acentos certos.

**Se der errado:**

| O que aparece | O que fazer |
|---|---|
| Em "Problemas:", "falta a fonte ...: rodar npm install em nucleo/ferramentas/fontes/" | Rode `(cd nucleo/ferramentas/fontes && npm install)`, espere terminar e rode o comando de novo |
| Outra linha em "Problemas:" | Nada foi publicado (o `&&` só publica se a montagem der certo): copie a lista e traga ao Claude |
| O wrangler pede login ou fala de conta | LIGAR.md, parte 6, Erro 3 |

**Tempo:** 2 min.

---

## Parte 5 · Apagar a chave secreta "default" do Supabase (2 min)

O projeto tem uma chave secreta **default**, que o sistema não usa (26.4; decisão do Otávio, #115). A que o garçom usa é a **garcom_planilha_prototipo**, que fica.

### 5.1 · Apagar a "default"

**Faça:** no Supabase, **Project Settings**, **API Keys**, área **Secret keys**. Na linha da chave **default**, abra o menu dela (os três pontos) e apague (**Delete**), confirmando. Não abra nem copie o valor de nenhuma chave.

**Como saber que deu certo:** na lista de chaves secretas fica **só a garcom_planilha_prototipo**. A Publishable key continua na lista.

**Se der errado:** se não houver chave chamada default, não há nada a apagar: anote isso para a parte 7. Se a garcom_planilha_prototipo for apagada por engano, a planilha para de receber leads (o garçom registra `planilha: banco-401` ou `banco-403`): crie outra chave secreta (LIGAR.md, passo 2.10) e guarde no cofre com o porteiro (LIGAR.md, passos 3.9 e 3.10).

**Tempo:** 2 min.

---

## Parte 6 · Teste rápido com pessoas de mentira novas (15 min)

Três pessoas de mentira **novas** (#102), cada uma com telefone e e-mail só dela (telefone de uma com e-mail de outra é recusado pelo banco, 21.2). Os telefones começam por 00, para não serem de ninguém, e não repetem os do teste de 09/11.

| Teste | O que confere | Onde | Pessoa | E-mail | Telefone (Brasil) | Respostas |
|---|---|---|---|---|---|---|
| 1 | Caixa marcada e clique no fim | Computador | TESTE Clara Aplicar | clara.aplicar@teste.invalid | 00 90000-0021 | Faixa B |
| 2 | Caixa desmarcada | Computador | TESTE Davi Aplicar | davi.aplicar@teste.invalid | 00 90000-0022 | Faixa B |
| 3 | O corte novo | Celular | TESTE Caio Aplicar | caio.aplicar@teste.invalid | 00 90000-0023 | Corte |

**As respostas da faixa B** (nota 68; a mesma conta do ensaio). Na tela "Para começar: como você se chama?", escreva **TESTE**. Depois:

| Pergunta do quiz | Resposta |
|---|---|
| Ramo | Serviços para empresas |
| Faturamento por mês | R$ 150 mil a R$ 500 mil |
| Vendedores | 2 ou 3 |
| Quem marca é quem vende? | Sim. O vendedor faz tudo |
| Valor médio de uma venda | 10000 |
| De onde vêm os leads | Indicação de clientes (e o botão para seguir) |
| CRM | Sim, mas pouca gente atualiza |
| Cargo | Vendedor(a) |
| Lembra dos números? | Sim |
| Números do funil, na ordem, sem mexer nos botões de unidade | 200, 50, 50, 40, 10 |
| Primeiro contato | Em até 1 hora |
| Tentativas antes de desistir | 1 ou 2 |
| Sobra lead sem contato? | Alguns |

**As respostas do corte** (faixa c, nota 24): as mesmas, trocando faturamento por **R$ 50 mil a R$ 150 mil**, valor médio por **6000**, vendedores por **1**, CRM por **Não. Fica no WhatsApp e na cabeça de cada um**, cargo continua **Vendedor(a)** e os números por **30, 50, 5, 4, 1**. Essa pessoa passa no corte do Júnior (fatura a partir de R$ 50 mil e tem vendedor), mas fica na faixa c: até a página de antes, ia para a tela do plano; agora vai para o relatório de quem não se qualifica (14.2).

**Na tela do contato:** em **Seu nome**, apague o TESTE e escreva o nome completo da tabela; em **E-mail** e **WhatsApp**, os da tabela; deixe **Nome da empresa** vazio. Há **uma caixa só**, que já vem marcada: "Aceito receber o meu diagnóstico e o contato da equipe por WhatsApp, por mensagem ou ligação, e por e-mail." Responda tela por tela; não use o botão "protótipo · preencher exemplo" nem o botão Telas.

### 6.1 · Teste 1 · caixa marcada e clique no fim

**Faça:** no computador, abra `https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev/?utm_source=bio&utm_campaign=funil-01`, clique em **Faça uma Análise Estratégica do seu Sistema de Vendas** e faça o quiz com a TESTE Clara Aplicar e as respostas da faixa B. Deixe a caixa marcada e clique em **Ver meu diagnóstico**. No relatório, em "Quer crescer junto com a nossa equipe?", clique em **Quero marcar uma conversa**. Anote a hora.

**Como saber que deu certo:** o quiz chega ao relatório do funil saudável, a linha do alto diz "Uma cópia deste diagnóstico vai para o seu e-mail e WhatsApp.", **não** aparece o aviso "Não conseguimos enviar o seu contato para a nossa equipe agora", e depois do clique aparece "Anotado. Alguém da nossa equipe chama você no WhatsApp para marcar o horário."

**Tempo:** 4 min.

### 6.2 · Teste 2 · caixa desmarcada

**Faça:** no computador, abra o mesmo endereço do 6.1 numa aba nova e faça o quiz com o TESTE Davi Aplicar e as respostas da faixa B. Na tela do contato, **desmarque a caixa**. Clique em **Ver meu diagnóstico** e, no relatório, em **Quero marcar uma conversa**.

**Como saber que deu certo:** ao desmarcar, aparece "Sem o aceite, o diagnóstico aparece só aqui na tela, e nada é enviado." O relatório aparece mesmo assim, com a linha "Este diagnóstico fica só aqui na tela. Sem o aceite, nada foi enviado.", sem aviso de falha. Nada da pessoa vai para o banco nem para a planilha (conferido em 6.4 a 6.6).

**Tempo:** 3 min.

### 6.3 · Teste 3 · o corte novo, no celular

**Faça:** no celular, abra `https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev/?utm_source=stories&utm_campaign=funil-01`, toque em **Fazer a Análise**, no topo da página, e faça o quiz com o TESTE Caio Aplicar e as respostas do corte, com a caixa marcada. Toque em **Ver meu diagnóstico** e, no relatório, em **Tenho interesse**.

**Como saber que deu certo:** a página cabe na largura do celular; o quiz vai para o relatório "Quer conversar sobre esse diagnóstico?", **não** para a tela do plano; sem aviso de falha; depois do toque aparece "Anotado. Seu interesse fica registrado com o seu diagnóstico."

**Tempo:** 4 min.

### 6.4 · Conferir as pessoas no banco

As três consultas abaixo só leem e só mostram as pessoas de teste deste roteiro, ou números sem pessoa.

**Faça:** no SQL Editor, crie uma consulta nova, cole e clique em **Run**:

```
select nome, email, consentimento_whatsapp, consentimento_email, primeira_utm_source
  from public.pessoas
 where email in ('clara.aplicar@teste.invalid', 'davi.aplicar@teste.invalid', 'caio.aplicar@teste.invalid')
 order by criado_em;
```

**Como saber que deu certo:** **2 linhas**: TESTE Clara Aplicar (sim, sim, bio) e TESTE Caio Aplicar (sim, sim, stories). O **Davi não aparece**: com a caixa desmarcada, nada dele foi gravado.

**Tempo:** 1 min.

### 6.5 · Conferir os eventos no banco

**Faça:** numa consulta nova, cole e clique em **Run**:

```
select p.email, e.tipo, e.entrega, e.versao_entrega, e.lead_score_faixa, e.lead_score_nota, e.clique_fim_quiz
  from public.eventos e
  join public.pessoas p on p.id_pessoa = e.id_pessoa
 where p.email in ('clara.aplicar@teste.invalid', 'caio.aplicar@teste.invalid')
 order by p.email, e.gravado_em;
```

**Como saber que deu certo:** **8 linhas**, quatro de cada pessoa, nesta ordem:

| Pessoa | tipo | entrega | versao_entrega | faixa e nota | clique_fim_quiz |
|---|---|---|---|---|---|
| Caio | visita | landing-page-02 | 1 | vazias | vazio |
| Caio | inicio_quiz | quiz-01 | 2 | vazias | vazio |
| Caio | fim_quiz | quiz-01 | 2 | c, 24 | vazio |
| Caio | interesse_pos_relatorio | quiz-01 | 2 | vazias | tenho-interesse |
| Clara | visita | landing-page-02 | 1 | vazias | vazio |
| Clara | inicio_quiz | quiz-01 | 2 | vazias | vazio |
| Clara | fim_quiz | quiz-01 | 2 | b, 68 | vazio |
| Clara | interesse_pos_relatorio | quiz-01 | 2 | vazias | quero-conversa |

A visita e o início do quiz chegam sem pessoa e ficam ligados a ela quando o fim do quiz da mesma aba chega.

Depois, numa consulta nova, os números dos últimos 30 minutos, sem pessoa nenhuma na tela:

```
select tipo, count(*) as quantos
  from public.eventos
 where gravado_em > now() - interval '30 minutes'
 group by tipo
 order by tipo;
```

**Como saber que deu certo:** fim_quiz **2** e interesse_pos_relatorio **2** (os do Davi não existem); inicio_quiz e visita **3 ou mais** cada (uma de cada teste, inclusive o do Davi, que não têm pessoa nem dado de pessoa, 34.18; mais, se alguma página foi aberta outra vez).

**Se der errado:**

| O que aparece | O que é | O que fazer |
|---|---|---|
| Faltam a visita e o início do quiz, e o fim do quiz está lá | O catálogo novo não rodou, ou a migração | Partes 2.5 e 2.6 (e 2.8 para conferir); o registro do garçom (LIGAR.md, parte 6, "Como ver o registro do Worker") mostra `evento: banco-409` sem catálogo e `evento: banco-404` sem migração |
| O Davi aparece | A página publicada não é a nova | Parte 4 de novo, e traga ao Claude |
| O Caio foi para a tela do plano | A página publicada não é a nova | Parte 4 de novo |
| O quiz mostrou o aviso de falha | O fim do quiz não gravou | LIGAR.md, parte 6, Erro 1 (`fim-quiz: banco-409` é o catálogo) |

**Tempo:** 2 min.

### 6.6 · Conferir a planilha

O banco só entrega à planilha quem terminou o quiz há mais de 1 minuto (21.6), e o gatilho roda a cada 5 minutos: a linha aparece de 1 a 6 minutos depois do envio. Na revisão da etapa 34, uma busca logo depois do envio veio com 0 leads: era essa margem, e não defeito (conferido no ensaio, esperando de verdade).

**Faça:** passado 1 minuto do teste 3, no editor do Apps Script, escolha **buscarLeadsNovos** e clique em **Executar**. Olhe a aba **fila**.

**Como saber que deu certo:**

- Uma linha nova, só uma: **TESTE Clara Aplicar**, com lead_score_faixa **b**, lead_score_nota **68**, estagio **captado**, **clique_fim_quiz quero-conversa** e, em respostas_a_confirmar, as respostas da faixa B, entre elas **leads-por-mes: 200** e **crm: Sim, mas pouca gente atualiza** (15.4).
- O Caio (faixa c) e o Davi (caixa desmarcada) **não** aparecem.
- As 3 linhas de antes continuam como estavam, sem repetir.
- Em **Execuções**, as rodadas de buscarLeadsNovos concluídas, sem nome, telefone ou e-mail.

**Se der errado:** se vier 0 linhas, espere mais 1 minuto e rode de novo. Se continuar, LIGAR.md, parte 6, Erro 2. O clique só aparece na planilha se tiver chegado ao banco antes de a linha entrar: a planilha nunca reescreve uma linha que já existe.

**Tempo:** 2 min, rodando a busca à mão.

Pronto: o protótipo está com as mudanças de 09/11.

---

## Parte 7 · Avisar o Claude (2 min)

conexoes.md é do Claude: ele atualiza depois deste roteiro (pergunta 32.12).

### 7.1 · Dizer ao Claude o que foi feito

**Faça:** numa conversa com o Claude no Claude Code, escreva, sem nenhuma chave e sem nenhum dado de pessoa: a hora em que a migração rodou (2.4), se o conferir.sql deu 18 de 18 (2.8), o Current Version ID (4.3), se a chave "default" existia e foi apagada (5.1) e se os testes 6.1 a 6.6 deram certo.

**Como saber que deu certo:** o Claude atualiza conexoes.md e o log.md. Para conferir depois, em conexoes.md, na linha do Supabase: a chave publicável executa **registrar_fim_quiz e registrar_evento** (a visita, o início do quiz e o clique), e a coluna "Última troca" diz que a chave secreta "default" foi apagada, com a data; na linha da Cloudflare, a publicação nova.

**Tempo:** 2 min.

---

## Antes de ir ao ar com gente de verdade

Do #113 (26.3 e 26.6), que continua valendo:

- **Decidir se vale uma chave publicável só do garçom**, no lugar da "default" que o protótipo usa. A decisão fica para antes de ir ao ar.
- **Fazer `wrangler logout` quando pausar** o trabalho no protótipo:

```
nucleo/ferramentas/prototipo/node_modules/.bin/wrangler logout
```

*Deu certo se:* o Terminal diz "Successfully logged out". Para voltar, o login é o passo 3.4 do LIGAR.md.

O resto das travas de ida ao ar está no LIGAR.md ("Antes de ir ao ar com gente de verdade") e em log.md, Pendências: entre elas, apagar a planilha de teste (as duas abas) e os dados de teste do banco, com a sua linha de 09/11 (#102).

## Perguntas

prompts/11-fila-perguntas.md, seção "Etapa 35".
