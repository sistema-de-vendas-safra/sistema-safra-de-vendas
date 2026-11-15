---
id: planilha-sdr-funil-01-aplicar-v3
versao: 1
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: planilha-sdr-funil-01
    versao: 3
  - id: banco-limpar-leads-de-teste
    versao: 1
  - id: banco-migracao-002
    versao: 1
  - id: banco-conferir
    versao: 3
  - id: banco-rascunho
    versao: 5
  - id: funil-01-planilha-sdr
    versao: 3
  - id: prototipo-funil-01-ligar
    versao: 6
  - id: prototipo-funil-01-aplicar-11
    versao: 3
  - id: ensaio-prototipo-funil-01
    versao: 12
  - id: regra-seguranca
    versao: 3
desatualizado: true
---

# Roteiro para a planilha do SDR v3 · limpar os leads de teste e ganhar a aba de respostas

O passo a passo para o Otávio levar à planilha que já existe, a **Planilha do SDR funil-01**, o que o pedido de 15/11/2026 preparou: "agora vamos limpar a planilha (mudei o nome da planilha para \"Planilha do SDR funil-01\"). A planilha deve ter duas abas, a primeira resumida, como é a \"fila\" hoje e outra aba com as respostas completas." No fim, o banco não tem mais os leads de teste, e a planilha tem duas abas novas, **fila** (a mesma de hoje, resumida) e **respostas** (as respostas completas do quiz), as duas sem os leads de teste. **Tempo total estimado: cerca de 25 minutos.**

**Status.** Rascunho, pendente do Otávio. Nasce desatualizado, porque se apoia em documentos marcados (a planilha, o banco, as migrações e o ensaio; regra 11.1). Tudo o que está aqui foi ensaiado na máquina, sem serviço real: o teste do banco (dados/banco/testar-migracao.mjs) deu 85 de 85, com a limpeza e a migração 002 rodadas duas vezes; o teste da planilha deu 69 de 69; o ensaio geral (nucleo/ferramentas/ensaio/, v12) deu 269 de 269. Nada disso falou com o Supabase, com o Google ou com a Cloudflare de verdade.

**Por que nesta ordem.** Primeiro o banco, depois a planilha:

1. **A limpeza antes de tudo.** As abas novas recebem o que o banco tem no momento da primeira busca. Se a planilha nascer antes da limpeza, os leads de teste entram nela e seria preciso recriar as abas de novo.
2. **A migração 002 antes do código novo.** É ela que faz o banco mandar as respostas completas. Ver "E se a ordem trocar", no fim.
3. **O código novo, depois as abas antigas renomeadas, depois o instalar.** O instalar cria as duas abas e apaga o cursor, e a primeira busca traz de novo todos os leads do banco, já sem os de teste.

> **Leia antes de começar** (as mesmas regras do LIGAR.md e do APLICAR-11.md)
>
> - **Este roteiro não pede nenhuma chave.** Nunca cole uma chave no chat com o Claude, em arquivo, em e-mail, em mensagem ou numa célula da planilha. Se precisar de ajuda, copie só a mensagem de erro.
> - **Não grave nem compartilhe a tela dos passos 1 a 8** (nem print, nem foto, nem chamada de vídeo): o painel do Supabase e o Apps Script mostram chave e dado de pessoa, e a planilha mostra a sua linha de 09/11, que é dado real.
> - **O passo 1 não dá para desfazer.** Ele apaga do banco, de verdade, os leads de teste. Só eles: quem tem o nome começando por TESTE **e** o e-mail terminado em @teste.invalid.
> - **Protótipo de teste não é entrega.** A aba respostas mostra a quem liga as respostas completas do quiz; a política de privacidade ainda diz que quem liga vê só parte dos dados. Com gente de verdade, isso fica travado até a decisão (log.md, entrada de 15/11/2026, pergunta 2).

## Resumo do tempo

| Passo | O que é | Tempo |
|---|---|---|
| 0 | Pegar os arquivos novos | 2 min |
| 1 | Limpar os leads de teste do banco | 5 min |
| 2 | Rodar a migração 002 | 2 min |
| 3 | Conferir o banco | 2 min |
| 4 | Colar o código novo no Apps Script | 2 min |
| 5 | Renomear as abas antigas | 1 min |
| 6 | Rodar a instalação | 2 min |
| 7 | Buscar os leads à mão e conferir as duas abas | 5 min |
| 8 | Apagar as abas antigas (se quiser) | 2 min |
| 9 | Avisar o Claude | 2 min |
| | **Total** | **cerca de 25 min** |

---

## Passo 0 · Pegar os arquivos novos (2 min)

Os arquivos deste roteiro só existem na main depois do commit desta mudança. Comece só depois de o Claude avisar que ela está na main.

**Faça**, no computador que você estiver usando:

- **No Mac:** abra o GitHub Desktop, escolha o repositório sistema-safra-de-vendas e clique em **Fetch origin**; se o botão virar **Pull origin**, clique nele. Depois abra o Terminal, cole e aperte Enter (APLICAR-11.md, 2.1):

  ```
  cd "/Volumes/OBM2T/OBM2T/CLAUDE CODE/triad/sistema-safra-de-vendas"
  ```

- **No Windows:** não precisa baixar nada. Nos passos que mandam copiar um arquivo, abra o arquivo na main pelo site do GitHub e copie o conteúdo pelo botão de copiar do arquivo (como no catálogo v3, prompts/15-publicar-landing-02-resposta.md).

**Deu certo se:** no Mac, o botão do GitHub Desktop volta a dizer "Fetch origin" e a linha do Terminal termina com `sistema-safra-de-vendas`; no Windows, o site do GitHub mostra, na main, o arquivo entregas/planilha-sdr-funil-01/APLICAR-PLANILHA-V3.md (este).

**Se der errado:** se o GitHub Desktop pedir login ou disser que o repositório mudou lá, não force nada: copie a mensagem e traga ao Claude.

---

## Passo 1 · Limpar os leads de teste do banco (5 min)

Rode numa hora sem teste em curso: a limpeza para a tabela eventos por um instante.

### 1.1 · Abrir o SQL Editor do Supabase

**Faça:** no navegador, entre em supabase.com com sistemadevendassafra@gmail.com, abra o projeto **sistema-de-vendas-safra** e, no menu da esquerda, o **SQL Editor**.

**Deu certo se:** o nome sistema-de-vendas-safra aparece no alto, e o editor abre.

### 1.2 · Contar o que vai sair, antes de apagar

Esta consulta só lê; não muda nada. Ela usa a mesma regra da limpeza e mostra só números, sem nome, e-mail ou telefone.

**Faça:** no SQL Editor, crie uma consulta nova (**New query**), cole o texto abaixo e clique em **Run**:

```
select
  (select count(*) from public.pessoas
    where nome ilike 'TESTE%' and lower(email) like '%@teste.invalid') as pessoas_que_vao_sair,
  (select count(*) from public.eventos
    where id_pessoa in (select id_pessoa from public.pessoas
                         where nome ilike 'TESTE%' and lower(email) like '%@teste.invalid')) as eventos_que_vao_sair,
  (select count(*) from public.pessoas
    where not (nome ilike 'TESTE%' and coalesce(lower(email), '') like '%@teste.invalid')) as pessoas_que_ficam;
```

**Deu certo se:** aparece uma linha com três números. **Anote os três.** pessoas_que_ficam é pelo menos 1: a sua linha de 09/11 não tem as duas marcas de teste e fica (ver a pergunta 4 da entrada de 15/11/2026 no log.md).

**Se der errado:** se pessoas_que_vao_sair der 0, não há lead de teste para limpar: pule para o passo 2. Se os números parecerem errados (por exemplo, pessoas_que_ficam bem maior do que você espera), pare aqui e traga os três números ao Claude.

### 1.3 · Copiar a limpeza

**Faça:**

- **No Mac**, no Terminal:

  ```
  pbcopy < dados/banco/limpar-leads-de-teste.sql
  ```

- **No Windows**, abra dados/banco/limpar-leads-de-teste.sql na main pelo site do GitHub e copie pelo botão de copiar do arquivo.

Não é segredo: o arquivo não tem nome, e-mail ou telefone de ninguém, só as duas marcas de teste (#102).

**Deu certo se:** no Mac, o Terminal não mostra nada e volta a esperar o próximo comando.

### 1.4 · Rodar a limpeza

**Faça:** no SQL Editor, crie outra consulta nova, cole e clique em **Run**. Se aparecer o aviso de operação destrutiva ("Potential issue detected"), clique em **Run this query**: aqui o aviso é de verdade, porque a limpeza apaga linhas, e por isso o passo 1.2 vem antes.

**Deu certo se:** aparece uma tabela com **6 linhas** e a coluna **ok** com **true** em todas:

| n | conferencia | antes | depois |
|---|---|---|---|
| 1 | pessoas de teste | o pessoas_que_vao_sair do 1.2 | 0 |
| 2 | eventos das pessoas de teste | o eventos_que_vao_sair do 1.2 | 0 |
| 3 | outras pessoas (ficam) | o pessoas_que_ficam do 1.2 | o mesmo número |
| 4 | eventos das outras pessoas (ficam) | um número | o mesmo número |
| 5 | eventos sem pessoa (ficam) | um número | o mesmo número |
| 6 | trava dos eventos ligada | ligada | ligada |

**Se der errado:**

| O que aparece | O que é | O que fazer |
|---|---|---|
| Uma mensagem de erro em vermelho | A limpeza roda numa transação só e confere tudo antes de gravar: com erro, **nada foi apagado** | Não siga. Copie só a mensagem de erro (ela não tem chave nem dado de pessoa) e traga ao Claude |
| "must be owner of table eventos" | O SQL Editor não está com o papel postgres, o dono das tabelas | Não siga; traga a mensagem ao Claude |
| "a trava eventos_sem_mudanca não está ligada" | A trava dos eventos já estava desligada antes | Pare e traga ao Claude: alguém mexeu no banco |
| Alguma linha com ok = false | Não deveria acontecer: com qualquer diferença, a limpeza dá erro antes | Anote o número da linha e os números dela e traga ao Claude |

Rodar de novo não estraga nada: na segunda vez, a linha 1 mostra 0 antes e 0 depois.

---

## Passo 2 · Rodar a migração 002 (2 min)

A migração 002 faz a função do banco que alimenta a planilha devolver também as respostas completas do quiz. Ela só troca essa função e refaz as permissões; nenhuma tabela, coluna ou linha muda. A migração 001 já rodou em 09/11/2026 (APLICAR-11, parte 2).

### 2.1 · Copiar a migração

**Faça:**

- **No Mac**, no Terminal:

  ```
  pbcopy < dados/banco/migracoes/002-respostas-na-planilha.sql
  ```

- **No Windows**, abra dados/banco/migracoes/002-respostas-na-planilha.sql na main pelo site do GitHub e copie pelo botão de copiar do arquivo.

**Deu certo se:** no Mac, o Terminal não mostra nada.

### 2.2 · Rodar a migração

**Faça:** no SQL Editor, crie uma consulta nova (**New query**), cole e clique em **Run**. Se aparecer o aviso de operação destrutiva ("Potential issue detected"), clique em **Run this query**: é esperado, por causa do comando que tira a função antiga e dos que retiram permissões. Nenhuma tabela, coluna ou linha é apagada.

**Deu certo se:** embaixo aparece "Success. No rows returned", sem nada em vermelho.

**Se der errado:** a migração roda inteira ou não roda nada (uma transação só): com erro, o banco ficou como estava. Não siga. Copie só a mensagem de erro e traga ao Claude. Se a mensagem for "migração 001 não encontrada", a 001 não está no banco: traga ao Claude antes de qualquer outra coisa. Rodar a migração de novo não quebra nada e dá o mesmo resultado (conferido duas vezes sobre dados, no teste e no ensaio).

---

## Passo 3 · Conferir o banco (2 min)

Essa consulta só lê; não muda nada.

**Faça:** copie dados/banco/conferir.sql (no Mac, `pbcopy < dados/banco/conferir.sql`; no Windows, pelo site do GitHub), crie outra consulta nova no SQL Editor, cole e clique em **Run**.

**Deu certo se:** aparece uma tabela com **20 linhas** e a coluna **ok** com **true** em todas. A última, n = 99, "tudo certo", mostra em **encontrado** o texto **19 de 19**. A linha 19, "função da planilha v4 (respostas)", mostra "leads_para_planilha (com a coluna respostas no fim)". O que cada linha deve dizer está em dados/banco/README.md, "Como conferir".

**Se der errado:**

| O que aparece | O que é | O que fazer |
|---|---|---|
| Linha 99 com **18 de 19**, e false só na linha 19 | A migração 002 não rodou | Passo 2 de novo; depois, este |
| Outra linha com false | Algo diferente do ensaiado | Anote o número da linha e o que apareceu em encontrado (não tem chave nem dado de pessoa) e traga ao Claude. Não siga para a planilha |

---

## Passo 4 · Colar o código novo no Apps Script (2 min)

Entre este passo e o 6, o gatilho de 5 minutos pode rodar e registrar `busca: sem-aba (respostas)`, e o Google pode mandar um e-mail de falha do gatilho: é normal, e nada é gravado.

**Faça:**

1. Copie entregas/planilha-sdr-funil-01/Codigo.gs (no Mac, `pbcopy < entregas/planilha-sdr-funil-01/Codigo.gs`; no Windows, pelo site do GitHub).
2. Abra a planilha **Planilha do SDR funil-01** no Drive do Safra e, no menu, **Extensões**, **Apps Script**.
3. No arquivo **Código.gs**, selecione tudo (Ctrl+A no Windows, Cmd+A no Mac), cole (Ctrl+V ou Cmd+V) por cima e salve (Ctrl+S ou Cmd+S).

O manifesto (appsscript.json) não mudou: não precisa colar de novo. As propriedades do script (GARCOM_URL e CHAVE_PLANILHA) também não mudam: não mexa nelas.

**Deu certo se:** a lista de funções, no alto, mostra instalar, buscarLeadsNovos e desligar. Procure no código (Ctrl+F ou Cmd+F) **causa · primeiro contato**: aparece, com o ponto do meio e sem sinais estranhos. Procure **pré-qualificado**: aparece com o acento certo.

**Se der errado:** se o editor mostrar outra coisa no lugar do código, copie de novo e cole outra vez.

---

## Passo 5 · Renomear as abas antigas (1 min)

As abas de hoje têm leads de teste. Elas ficam guardadas com outro nome até você conferir as novas (passo 8).

**Faça:** na planilha, clique com o botão direito na aba **fila**, escolha **Renomear** e escreva **fila v2**. Se existir uma aba chamada **respostas**, faça o mesmo com ela e escreva **respostas antiga**. A aba **fila antiga** (a de 09/11) fica como está.

**Deu certo se:** não há nenhuma aba chamada fila nem respostas. As linhas das abas renomeadas continuam lá, como estavam.

---

## Passo 6 · Rodar a instalação (2 min)

**Faça:** no editor do Apps Script, escolha **instalar** no alto e clique em **Executar**. Se o Google pedir autorização de novo, autorize como no LIGAR.md, passo 4.12 (as mesmas três permissões).

**Deu certo se:** o **Registro de execução** termina com `[planilha] instalar: aba criada; respostas criada; gatilho mantido` e "Execução concluída". Na planilha, a **primeira** aba é a **fila** nova, com os **20 cabeçalhos** de sempre na linha 1, congelada; logo depois dela, a aba **respostas**, com **24 cabeçalhos** na linha 1, congelada: id_pessoa, nome, entrou_em, lead_score_faixa, lead_score_nota, ramo, faturamento, vendedores, quem marca a conversa, valor médio da venda, origem dos leads, CRM, cargo, lembra dos números, leads por mês, pré-qualificados, agendados, conversas realizadas, vendas fechadas, chute de comparecimento, causa · primeiro contato, causa · tentativas, causa · lead sem contato e outras respostas. As duas estão vazias. Em **Acionadores** (o relógio, à esquerda), continua um acionador só, buscarLeadsNovos, a cada 5 minutos.

**Se der errado:**

| O que aparece | O que fazer |
|---|---|
| "a aba "fila" já existe com outro cabeçalho" (ou "respostas") | Uma aba antiga ainda tem o nome fila ou respostas: volte ao passo 5 e rode instalar de novo. Nada foi mudado |
| "faltam as propriedades do script" | As propriedades se perderam: LIGAR.md, passos 4.3 a 4.5 |
| O registro diz "aba mantida" | A aba fila antiga não foi renomeada: a fila continua com os leads de teste. Renomeie (passo 5) e rode instalar de novo |

---

## Passo 7 · Buscar os leads à mão e conferir as duas abas (5 min)

**Faça:** escolha **buscarLeadsNovos** e clique em **Executar**.

**Deu certo se:**

- O registro termina com `[planilha] busca: N linha(s) nova(s), 0 repetida(s), 0 fora da faixa, 1 volta(s); respostas: N linha(s) nova(s)` (o mesmo N nos dois lugares) e "Execução concluída", sem nome, telefone ou e-mail no registro. Se o gatilho já tiver rodado antes, pode vir 0: o que vale são as abas.
- A aba **fila** tem as linhas dos leads que ficaram no banco (as faixas a e b, com o aceite do WhatsApp), entre elas a sua linha de 09/11, e **nenhuma** com nome começando por TESTE e e-mail terminado em @teste.invalid.
- A aba **respostas** tem as **mesmas pessoas, na mesma ordem** (o mesmo id_pessoa na coluna 1), com as respostas do quiz, uma por coluna: a origem dos leads separada por "; ", o valor médio e os números do funil como número, a porcentagem do funil como "50%". O que o quiz não mandou naquela época fica vazio.
- Rodar **buscarLeadsNovos** de novo não repete nenhuma linha, em nenhuma das duas abas.

**Se der errado:**

| O que aparece | O que fazer |
|---|---|
| As colunas das respostas vazias em todas as linhas | A migração 002 não rodou: passos 2 e 3. Depois, para encher as linhas que já entraram, renomeie de novo só a aba respostas e rode instalar e buscarLeadsNovos (a linha não muda depois de entrar) |
| Uma linha de teste (TESTE e @teste.invalid) na aba nova | A limpeza não rodou ou rodou depois: passo 1, e depois os passos 5 a 7 de novo |
| "o garçom respondeu 401", "não deu para falar com o garçom" ou "o garçom respondeu com erro" | O mesmo de sempre: entregas/planilha-sdr-funil-01/README.md, "Se der errado". Este roteiro não mexe no garçom nem nas propriedades |

---

## Passo 8 · Apagar as abas antigas, se quiser (2 min)

Só depois de o passo 7 dar certo. As abas **fila v2**, **fila antiga** e, se existir, **respostas antiga** têm os leads de teste e a sua linha de 09/11. Elas não atrapalham o código (ele só olha as abas fila e respostas), mas o pedido era limpar a planilha.

**Faça:** em cada uma delas, clique com o botão direito na aba e escolha **Excluir** (o mesmo menu do Renomear do passo 5; este caminho não está nos roteiros de antes).

**Deu certo se:** a planilha fica só com as abas **fila** e **respostas**, nessa ordem, e talvez a Página1 do começo.

**Se der errado:** se apagou a aba errada, desfaça na hora (Ctrl+Z ou Cmd+Z). Se apagou a fila ou a respostas nova, rode instalar e buscarLeadsNovos de novo: a aba nasce e recebe tudo.

---

## Passo 9 · Avisar o Claude (2 min)

**Faça:** diga ao Claude, só com números e sem nomes: os três números do passo 1.2; se a tabela do 1.4 deu true nas 6 linhas; o "19 de 19" do passo 3; o N do passo 7; e se apagou as abas antigas. O Claude registra no log.md como a limpeza foi feita (#102, log.md, Pendências).

---

## Se precisar voltar atrás

- **A limpeza (passo 1) não volta.** Os leads de teste apagados não voltam, e não precisam voltar.
- **O código da planilha:** a versão 2 está no Git. No site do GitHub, abra entregas/planilha-sdr-funil-01/Codigo.gs no commit 2e29f27 (o de antes desta mudança), copie e cole no Apps Script como no passo 4. Na planilha, apague (ou renomeie) a aba **fila** nova e devolva o nome **fila** à aba **fila v2**; a aba respostas pode ficar, a versão 2 não olha para ela. Rode **instalar**: o registro diz "aba mantida", o cursor fica onde estava, e a fila v2 continua de onde parou. Os leads de teste continuam nela.
- **A função do banco:** a da migração 001 continua no Git. Rodar de novo dados/banco/migracoes/001-v3.sql no SQL Editor, como no passo 2, devolve a função como era antes da 002, sem mudar nenhum dado (conferido no teste do banco). O conferir.sql passa a dizer "18 de 19", com false só na linha 19. A planilha v3 continua funcionando, com as colunas das respostas vazias nas linhas novas.

## E se a ordem trocar

- **Código novo antes da migração 002:** nada quebra. A aba respostas nasce e recebe as linhas com o id_pessoa, o nome, entrou_em, a faixa e a nota, e as colunas das respostas vazias. Como a linha não muda depois de entrar, para encher essas linhas rode a migração e depois recrie só a aba respostas (renomear, instalar e buscarLeadsNovos).
- **Migração 002 antes do código novo:** a fila continua igual. O código v2 ignora a coluna nova que o banco passa a mandar.
- **Código novo e abas recriadas antes da limpeza:** as abas novas recebem os leads de teste. Rode a limpeza e recrie as duas abas de novo (passos 5 a 7).
