---
id: planilha-sdr-funil-01
versao: 3
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: funil-01-planilha-sdr
    versao: 3
  - id: garcom
    versao: 5
  - id: banco-rascunho
    versao: 5
  - id: banco-migracao-002
    versao: 1
  - id: regra-seguranca
    versao: 3
  - id: decisoes
    versao: 4
desatualizado: true
---

# Planilha do SDR do funil-01 · Apps Script

> **SÓ DADOS DE TESTE ATÉ A DECISÃO.** Dado pessoal não entra no Google Drive (nucleo/regras/seguranca.md, regra 4), e onde a planilha do SDR mora segue em aberto (prompts/05-fila-perguntas.md, 5.4; funis/funil-01/planilha-sdr.md, "Onde a planilha mora"). Esta planilha pode ser criada no Drive do Safra **só para o teste**, com leads de mentira: nome começando por TESTE e e-mail terminado em @teste.invalid (#102). Com gente de verdade, não liga antes da decisão (pergunta 24.1).

O código que faz a planilha do SDR pedir ao garçom, a cada 5 minutos, os leads novos e acrescentá-los em duas abas, com as colunas e a ordem de funis/funil-01/planilha-sdr.md: a **fila** (a primeira, resumida) e, desde a versão 3, a **respostas** (a segunda, com as respostas completas do quiz). A planilha do protótipo se chama **Planilha do SDR funil-01** desde 15/11/2026 (o Otávio tirou o "TESTE" do nome); o código não depende do nome. A versão 2 roda no Google desde 09/11/2026 (APLICAR-11, parte 3). **A versão 3 nunca foi rodada no Google.** Foi conferida só aqui, com um Google de mentira (ver "Teste local"), e no ensaio geral.

**Status.** Rascunho, pendente do Otávio. Continua desatualizado, porque se apoia em documentos marcados (funil-01-planilha-sdr, garcom, banco-rascunho e a migração 002; regra provisória 11.1).

**Versão 3 (15/11/2026, pedido do Otávio).** "A planilha deve ter duas abas, a primeira resumida, como é a \"fila\" hoje e outra aba com as respostas completas." Respostas do Otávio na mesma conversa: na aba respostas entram os mesmos da fila (faixas a e b, com o aceite do WhatsApp), e limpar quer dizer a planilha e o banco: um SQL apaga do banco só os leads de teste, e as abas são recriadas, já sem eles.
- **Aba nova `respostas`**, a segunda: uma linha por lead, para as mesmas pessoas e na mesma rodada em que a linha entra na fila, com 24 colunas (ver "A aba respostas"). Vem da coluna nova `respostas` da função do banco (migração dados/banco/migracoes/002-respostas-na-planilha.sql). Sem a migração, a linha entra com as colunas das respostas vazias, sem erro.
- **A fila não mudou:** as mesmas 20 colunas, a primeira aba.
- **instalar()** cria as duas abas, na ordem (fila, respostas), e, se criou qualquer uma das duas, apaga o cursor: as duas recebem tudo desde o início, cada uma sem duplicar (a conferência do id_pessoa é aba por aba).
- **buscarLeadsNovos()** precisa das duas abas, com os cabeçalhos certos; sem uma delas, não chama o garçom e não grava nada (pergunta 9 da entrada de 15/11/2026 no log.md).
- Para a planilha que já existe, ver "Atualizar da versão 2" e o roteiro APLICAR-PLANILHA-V3.md, nesta pasta.

**Dado pessoal na aba respostas.** As respostas do quiz, ligadas à pessoa, são dado pessoal. A regra 4 de segurança (nucleo/regras/seguranca.md, v3) nomeia as respostas entre os dados que nunca vão ao Drive e põe a planilha do SDR como a exceção registrada, sem separar o que vai em cada aba: a aba respostas fica dentro da mesma exceção, com o mesmo acesso da fila (só o Otávio e quem liga, sem outro compartilhamento). Mas a política de privacidade (entregas/documentos/politica-de-privacidade.md, item 5) diz que quem liga vê "só o necessário" e que a planilha recebe "só parte" dos dados: com a aba respostas, isso deixa de ser verdade. **Até a decisão, a aba respostas só serve ao protótipo com leads de teste** (pergunta 2 da entrada de 15/11/2026 no log.md).

**Versão 2 (etapa 32, 09/11/2026).** Só a coluna nova **clique_fim_quiz** (o que a pessoa clicou no fim do quiz, só de leitura; 18.4 com 15.16), entre tentativas_feitas e estagio, como em funis/funil-01/planilha-sdr.md v2. Ela vem do banco v3 (migração dados/banco/migracoes/001-v3.sql). A aba passa de 19 para 20 colunas, e as que vêm do banco, de 15 para 16. As duas respostas do histórico da faixa B (15.4) já cabem na coluna respostas_a_confirmar, sem mudança no código. O estado nutrição, a lista do produto e o resto da planilha-sdr v2 ficam para a etapa que pegar a planilha (perguntas 31.20 e 32.5, em prompts/11-fila-perguntas.md). O resto do código não mudou. Para a planilha de teste que já existe, ver "Atualizar da versão 1".

**Destino dos contatos em conflito · bloqueado para entrega até a decisão** (conflito-17, em base/lacunas.md). Este código segue o lado 2 (#90: banco e planilha), sem escolher. Protótipo de teste não é entrega.

## O que tem dentro

| Arquivo | O que é |
|---|---|
| Codigo.gs | O Apps Script (JavaScript V8, sem bibliotecas): `instalar()`, `buscarLeadsNovos()` e `desligar()` |
| APLICAR-PLANILHA-V3.md | O roteiro do Otávio para levar a v3 à planilha que já existe: a limpeza dos leads de teste no banco, a migração 002, o código novo e as abas recriadas |
| appsscript.json | O manifesto: fuso de São Paulo, V8 e só três permissões (ver "Permissões") |
| teste/falsos.mjs | O Google de mentira (SpreadsheetApp, PropertiesService, UrlFetchApp, LockService, ScriptApp, Logger, Utilities e console), um garçom de mentira e um UrlFetchApp que fala com um endereço local. O ensaio da etapa 25 usa os mesmos. Desde a v3, a aba nasce na posição pedida (insertSheet com posição) e diz a posição dela (getIndex), como no Google |
| teste/testar-planilha.mjs | O teste local |

## O que faz

- **`instalar()`**, que o Otávio roda uma vez. Rodar de novo não estraga nada.
  1. Antes de tudo, confere o cabeçalho das abas **fila** e **respostas** que já existem com algo escrito. Se uma delas tem outro cabeçalho, não mexe em nada (nem cria a outra aba) e avisa.
  2. Cria a aba **fila** na primeira posição e a aba **respostas** logo depois dela, se faltarem (ou usa as que já existem, sem apagar nada).
  3. Se criou qualquer uma das duas agora, apaga o cursor guardado (de uma aba antiga renomeada ou apagada), para as abas receberem todos os leads desde o início; a conferência do id_pessoa, aba por aba, evita duplicata (a aba que já tinha os leads não recebe de novo).
  4. Numa aba vazia, escreve na linha 1 os cabeçalhos. Na fila, as 20 colunas de planilha-sdr.md, na ordem: id_pessoa, nome, telefone, email, empresa, consentimento_whatsapp, consentimento_email, lead_score_faixa, lead_score_nota, respostas_a_confirmar, entrou_em, tentativas_feitas, clique_fim_quiz, estagio, estado, data_volta, canal, contato_em, reuniao_em, produto. Na respostas, as 24 de "A aba respostas", abaixo. Se a aba já tem esse cabeçalho, deixa.
  5. Congela a primeira linha das duas.
  6. Põe formato de texto simples nas colunas nome, telefone, email, empresa e respostas_a_confirmar da fila e nas colunas de texto da respostas (ver abaixo), para o Google não transformar "00123", "TRUE", "1" ou "1/2" em número, verdadeiro ou data (24.12).
  7. Põe lista fechada (sem aceitar valor de fora) em três colunas da fila, com os nomes "Na planilha" de planilha-sdr.md: **estagio** (captado, pré-qualificado, agendado, realizado, venda), **estado** (conversando, tentativa, abandonado, stand-by, perdido) e **canal** (telefone, whatsapp). produto fica sem lista, porque está fora da lista fechada até a decisão de 5.3. A aba respostas não tem lista: ninguém edita nela.
  8. Confere as propriedades do script (GARCOM_URL e CHAVE_PLANILHA). Se faltar alguma, se o endereço não começar com https:// ou se a chave tiver menos de 32 caracteres, avisa em português e **não** cria o gatilho (senão ele falharia a cada 5 minutos).
  9. Cria o gatilho de tempo de 5 minutos para `buscarLeadsNovos`. Se já existe, mantém; se há repetidos de antes, fica um só. O registro termina com `[planilha] instalar: aba criada; respostas criada; gatilho criado` (ou "mantida" e "mantido").
- **`buscarLeadsNovos()`**, que o gatilho roda a cada 5 minutos.
  1. Lê GARCOM_URL e CHAVE_PLANILHA das propriedades do script. Nunca estão no código.
  2. Chama `GET <GARCOM_URL>/api/planilha/leads-novos` com o cabeçalho `X-Chave-Planilha`, o cursor salvo (com `encodeURIComponent`) e `limite=200`. Na primeira vez, sem cursor. Não segue redirecionamento (a chave não vai para outro endereço).
  3. Com 401, erro do garçom, falha de rede ou resposta fora do formato `{ leads, cursor_seguinte, pode_ter_mais }` (entregas/garcom/README.md, "Porta privada"), não grava nada daquela página e não mexe no cursor. Sem a aba fila ou a aba respostas, ou com o cabeçalho de uma delas mexido, não chama o garçom e não grava nada.
  4. Acrescenta as linhas **no fim** da fila (depois da última linha com algo nas 20 colunas da fila; uma anotação à direita delas não empurra os leads), só nas 16 colunas que vêm do banco (de id_pessoa a data_volta), na ordem da planilha. Nunca apaga, nunca reescreve uma linha que já existe, nunca escreve em canal, contato_em, reuniao_em nem produto.
  5. Na mesma rodada, acrescenta a linha do mesmo lead no fim da aba **respostas** (depois da última linha com algo nas 24 colunas dela), nas 24 colunas.
  6. Nunca duplica: além do cursor, não acrescenta um id_pessoa que já está na aba (21.6), aba por aba. Se o cursor se perder, pede desde o início e só entra quem falta em cada aba.
  7. Salva o `cursor_seguinte` nas propriedades **depois** de gravar as linhas das duas abas. Se a gravação falhar, o cursor fica onde estava e a próxima rodada pede de novo (sem duplicar, pelo item 6).
  8. Repete enquanto `pode_ter_mais` for true, até 10 páginas (2.000 leads) por execução; o resto fica para a rodada seguinte.
  9. Usa a trava do script (LockService): duas rodadas não se cruzam. Se outra estiver rodando, sai sem fazer nada.
  10. Se der erro, a função termina com uma mensagem em português, sem dado pessoal, para o Google mandar o aviso de falha do gatilho por e-mail ao Otávio.
- **`desligar()`** apaga o gatilho. Não mexe nas abas nem nas propriedades.

**Como cada valor entra na linha nova:**

| Coluna | Como entra |
|---|---|
| estagio | Vazio no banco (hoje, sempre) vira **captado**: o banco não inventa o captado (21.9), e planilha-sdr diz que o lead chega como captado (15.5). pre-qualificado do banco vira pré-qualificado. Valor fora da lista fica vazio (pergunta 24.4) |
| estado | Como veio, se for da lista; vazio fica vazio; fora da lista fica vazio |
| data_volta | Como veio (AAAA-MM-DD) ou vazio |
| consentimento_whatsapp e consentimento_email | sim ou não (o banco escreve "nao", sem acento) |
| entrou_em | No horário de Brasília, como AAAA-MM-DD HH:MM:SS (o banco manda em UTC) |
| respostas_a_confirmar | Na faixa b, "valor-medio: ...; vendedores: ..."; na faixa a, vazio (21.8) |
| lead_score_nota e tentativas_feitas | Número |
| Todas | Valor que começa por = + - @ (ou tabulação, retorno ou apóstrofo) vai como texto, com um apóstrofo na frente que não aparece na célula: ninguém injeta fórmula pelo nome ou pela empresa do quiz. O telefone, que começa com +, também vai como texto |

Lead que viesse em faixa fora de a e b (o banco não manda) não entra, em nenhuma das duas abas, e o cursor segue.

## A aba respostas

A segunda aba (v3; funis/funil-01/planilha-sdr.md v3, "Aba respostas"). Uma linha por lead, as mesmas pessoas da fila. As colunas vêm de `respostas`, o objeto que a página do quiz manda no fim do quiz (entregas/quizzes/quiz-01/pagina/index.html, função respostasDoQuiz) e que a função do banco devolve desde a migração 002, do mesmo fim de quiz que dá a nota e o entrou_em da fila. Os nomes das colunas são os nomes curtos que o próprio quiz usa para cada pergunta (PERFIL, os números do funil e as telas de causa), na ordem das perguntas:

| # | Coluna | Chave em respostas | Como entra |
|---|---|---|---|
| 1 | id_pessoa | (do banco) | Como na fila |
| 2 | nome | (do banco) | Como na fila, em texto simples |
| 3 | entrou_em | (do banco) | Como na fila: horário de Brasília, AAAA-MM-DD HH:MM:SS |
| 4 | lead_score_faixa | (do banco) | a ou b |
| 5 | lead_score_nota | (do banco) | Número |
| 6 | ramo | ramo | Texto |
| 7 | faturamento | faturamento | Texto |
| 8 | vendedores | vendedores | Texto ("1" continua "1", não vira número) |
| 9 | quem marca a conversa | quem-marca | Texto |
| 10 | valor médio da venda | valor-medio | Número: "R$ 15.000" vira 15000. Se vier de outro jeito, texto, como veio |
| 11 | origem dos leads | origem (lista) | Texto, com as origens separadas por "; " |
| 12 | CRM | crm | Texto |
| 13 | cargo | cargo | Texto |
| 14 | lembra dos números | lembra | Sim ou Não |
| 15 a 19 | leads por mês, pré-qualificados, agendados, conversas realizadas, vendas fechadas | numeros (lista de { linha, valor, unidade }), pela linha: Leads por mês, Pré-qualificados, Agendados, Conversas realizadas, Vendas fechadas | Em quantidade (nº), número, lido como o quiz lê ("1.200" é 1200, "12,5" é 12,5); em porcentagem (%), texto com o sinal ("50%"). Vazios no modo chute |
| 20 | chute de comparecimento | chute | Texto, como a pessoa respondeu ("Menos de 75%", "60%"). Vazio no modo números |
| 21 | causa · primeiro contato | causa | Texto |
| 22 | causa · tentativas | causa2 | Texto |
| 23 | causa · lead sem contato | causa3 | Texto |
| 24 | outras respostas | qualquer outra chave | "chave: valor; chave: valor", com listas separadas por ", " e objetos em JSON; uma linha dos números que não seja uma das cinco vai como "numeros: {...}". Resposta vazia não entra |

- **Texto simples (@)** nas colunas 2, 6 a 9, 11 a 14 e 20 a 24, como na fila (24.12). As colunas 1, 3, 4, 5, 10 e 15 a 19 ficam sem formato, para os números continuarem números (a porcentagem vai com o apóstrofo na frente, que não aparece na célula, e continua texto).
- **O que faltar fica vazio.** Sem a coluna `respostas` (o banco sem a migração 002), as colunas 6 a 24 ficam vazias e a linha entra mesmo assim. Uma resposta nova que o quiz venha a mandar não quebra a rodada: vai para "outras respostas".
- **Fórmula não entra:** o mesmo apóstrofo da fila em todo valor que começa por = + - @ (ou tabulação, retorno ou apóstrofo).
- **Ninguém edita a aba.** Ela não tem colunas do SDR nem lista fechada, e nada dela volta para o banco.

**Registro sem dado pessoal.** O registro do Apps Script (Execuções) recebe só contagens e códigos, como `[planilha] busca: 3 linha(s) nova(s), 0 repetida(s), 0 fora da faixa, 1 volta(s); respostas: 3 linha(s) nova(s)` ou `[planilha] busca: nao-autorizado (401)`. Nunca nome, telefone, e-mail, id_pessoa, cursor, endereço nem chave. Nas propriedades, além das duas que o Otávio guarda, o script guarda só o cursor (CURSOR_GRAVADO_EM e CURSOR_ID_PESSOA; o id_pessoa é dado pessoal indireto, pergunta 24.3).

## Permissões

O manifesto (appsscript.json) pede só três, e o Google mostra as três na autorização:

| Permissão | Para quê |
|---|---|
| spreadsheets.currentonly | Ler e escrever **só nesta planilha**, a que contém o script, e nenhuma outra do Drive |
| script.external_request | Chamar o garçom (UrlFetchApp) |
| script.scriptapp | Criar e apagar o gatilho de 5 minutos |

As propriedades do script e a trava não pedem permissão. Por isso o script precisa ser criado **de dentro da planilha** (Extensões, Apps Script), não como projeto solto (pergunta 24.2).

## Instalação, passo a passo

Para o teste de amanhã, só com leads de mentira. Leva uns 10 minutos. Antes, o garçom precisa estar publicado com o segredo CHAVE_PLANILHA (roteiro da etapa 26).

1. **Criar a planilha.** Entre no Google Drive com a conta do Safra (sistemadevendassafra@gmail.com). Novo, Planilhas Google, Planilha em branco. Dê um nome, por exemplo "Planilha do SDR funil-01" (o nome da planilha do protótipo desde 15/11/2026). Não compartilhe com ninguém (#95).
   *Deu certo se:* a planilha abre vazia, com a aba "Página1".
2. **Abrir o Apps Script.** No menu da planilha: Extensões, Apps Script. Abre uma aba nova com um projeto e um arquivo Código.gs.
   *Deu certo se:* aparece o editor com `function myFunction() {}`.
3. **Colar o código.** Apague tudo o que está no arquivo do editor e cole o conteúdo inteiro de Codigo.gs desta pasta. Salve (o ícone de disquete, ou Ctrl+S / Cmd+S). Dê um nome ao projeto, por exemplo "planilha-sdr-funil-01".
   *Deu certo se:* a lista de funções, no alto, mostra instalar, buscarLeadsNovos e desligar.
4. **Colar o manifesto.** No editor, Configurações do projeto (a engrenagem, à esquerda), marque "Mostrar arquivo de manifesto appsscript.json no editor". Volte ao Editor (o ícone `< >`), abra appsscript.json, apague tudo e cole o conteúdo de appsscript.json desta pasta. Salve.
   *Deu certo se:* o arquivo mostra "America/Sao_Paulo", "V8" e as três permissões.
5. **Guardar as propriedades.** Configurações do projeto (a engrenagem), Propriedades do script, Adicionar propriedade do script. Duas:
   - `GARCOM_URL`: o endereço do protótipo, com https:// e **sem barra no fim** e sem /api (https://safra-prototipo-funil-01.sistemadevendassafra.workers.dev).
   - `CHAVE_PLANILHA`: o mesmo valor do segredo CHAVE_PLANILHA do Worker. Cole direto de onde ele foi gerado, sem passar por arquivo, e-mail nem chat (conexoes.md). Não escreva a chave em nenhuma célula da planilha.
   Salve as propriedades do script.
   *Deu certo se:* a tabela mostra as duas propriedades (o valor aparece; isso é normal, a página só abre para a conta do Safra).
6. **Rodar a instalação.** Volte ao Editor, escolha `instalar` na lista de funções e clique em Executar.
7. **Autorizar.** Na primeira vez, o Google pede autorização: Revisar permissões, escolha a conta do Safra. Como o script não é verificado pelo Google, aparece "O Google não verificou este app": clique em Avançado e em "Acessar planilha-sdr-funil-01 (não seguro)" (é o seu próprio script). Confira que a lista tem só as três permissões de "Permissões", acima, e clique em Permitir.
   *Deu certo se:* o Registro de execução, embaixo, termina com `[planilha] instalar: aba criada; respostas criada; gatilho criado` e "Execução concluída".
8. **Fazer o quiz com um lead de mentira** (TESTE no nome, e-mail @teste.invalid) e esperar até uns 6 minutos (1 minuto de margem do banco, 21.6, mais os 5 do gatilho). Para não esperar o gatilho, escolha `buscarLeadsNovos` e clique em Executar.

## Atualizar da versão 2

A planilha do protótipo roda a versão 2 desde 09/11/2026 (aba fila, com 20 colunas, e a aba fila antiga, da versão 1). O roteiro inteiro, com a limpeza dos leads de teste no banco e a migração 002, é o **APLICAR-PLANILHA-V3.md**, nesta pasta. Em resumo:

1. Antes, no banco: o SQL de limpeza (dados/banco/limpar-leads-de-teste.sql), a migração 002 e o conferir.sql (19 de 19). Sem a migração, nada quebra: a aba respostas nasce e recebe as linhas com as colunas das respostas vazias.
2. No Apps Script, apague o código do arquivo, cole o Codigo.gs novo inteiro e salve. O manifesto (appsscript.json) não mudou.
3. Na planilha, renomeie a aba **fila** para **fila v2** (e, se existir, a aba **respostas** para **respostas antiga**).
4. Rode `instalar` de novo. As duas abas nascem, fila na primeira posição e respostas na segunda, com os cabeçalhos, e o cursor é apagado.
5. Rode `buscarLeadsNovos`: a primeira busca traz de novo todos os leads que o banco entrega hoje, já sem os de teste, para as duas abas, sem duplicar.

*Deu certo se:* a aba **fila** nova tem as mesmas 20 colunas, a aba **respostas** tem as 24, as duas têm as mesmas pessoas, na mesma ordem, e nenhuma linha com nome TESTE e e-mail @teste.invalid; `buscarLeadsNovos` termina com "Execução concluída".

Se só a aba respostas for criada (a fila da versão 2 continua com o nome fila), também funciona: instalar apaga o cursor, a fila não repete ninguém e a respostas recebe todos. Mas aí a fila continua com as linhas dos leads de teste: para limpar a fila, ela também tem de nascer de novo.

## Atualizar da versão 1

A planilha de teste do protótipo foi instalada com a versão 1 (19 colunas). Com a versão 2, o cabeçalho da aba antiga não confere, e a busca para com "o cabeçalho da aba fila não é o esperado", sem gravar nada. Para atualizar (o roteiro da etapa 35 traz o passo):

1. Só depois de a migração do banco ter rodado (dados/banco/README.md, "Como aplicar"): sem ela, o garçom não manda o clique, e a coluna fica vazia.
2. No Apps Script, apague o código do arquivo, cole o Codigo.gs novo inteiro e salve.
3. Na planilha, renomeie a aba **fila** para **fila antiga**.
4. Rode `instalar` de novo. A aba nova nasce com as 20 colunas e sem cursor, e recebe todos os leads desde o início, sem duplicar; a antiga fica como estava (só leads de teste, #102).

*Deu certo se:* a aba **fila** nova tem clique_fim_quiz na coluna 13, e `buscarLeadsNovos` termina com "Execução concluída".

## Como saber que deu certo

- A planilha tem a aba **fila**, a primeira, com os 20 cabeçalhos na linha 1, congelada; estagio, estado e canal mostram a setinha da lista. Logo depois dela, a aba **respostas**, com os 24 cabeçalhos, congelada.
- No Apps Script, Acionadores (o relógio, à esquerda): um acionador só, `buscarLeadsNovos`, "Baseado no tempo", a cada 5 minutos.
- Depois do quiz de teste: uma linha nova na fila, com o nome TESTE..., estagio **captado** e canal, contato_em, reuniao_em e produto vazios; e uma linha nova na aba respostas, com o mesmo id_pessoa e as respostas do quiz.
- Em Execuções (a lista, à esquerda): rodadas de `buscarLeadsNovos` a cada 5 minutos, concluídas, com `[planilha] busca: 1 linha(s) nova(s)...` e, nas seguintes, `0 linha(s) nova(s)`.
- Rodar `buscarLeadsNovos` de novo à mão não repete a linha.

**Se der errado:**

| O que aparece | O que fazer |
|---|---|
| "faltam as propriedades do script..." | Passo 5; depois rode `instalar` de novo |
| "o garçom respondeu 401..." | A CHAVE_PLANILHA das propriedades não é igual à do Worker. Copie de novo para os dois lugares (conexoes.md, linha da planilha do SDR) |
| "não deu para falar com o garçom..." | Confira GARCOM_URL (https://, sem barra no fim, sem /api) e se o Worker está publicado |
| "o garçom respondeu com erro..." | O garçom ou o banco está fora. Em Execuções, o código (502, 503) diz qual; veja o registro do Worker na Cloudflare |
| "o cabeçalho da aba "fila" ou da aba "respostas" não é o esperado..." | Alguém mexeu na linha 1 de uma das duas. Renomeie essa aba (por exemplo, "fila antiga" ou "respostas antiga") e rode `instalar` de novo. A aba nova nasce sem cursor e recebe todos os leads desde o início, sem duplicar; a antiga fica como estava |
| "a aba "fila" ou a aba "respostas" não existe..." | O código v3 foi colado e `instalar` ainda não rodou, ou uma das abas foi apagada ou renomeada. Rode `instalar`: a aba que falta nasce, e as duas recebem o que falta |

## Como desligar

Qualquer um destes para a planilha de pedir leads; os dois juntos é o mais seguro.

1. **Apagar o gatilho:** no editor, escolha `desligar` e clique em Executar. Ou: Acionadores (o relógio), nos três pontinhos do acionador `buscarLeadsNovos`, Excluir acionador.
2. **Apagar a chave:** Configurações do projeto, Propriedades do script, apague `CHAVE_PLANILHA`. Sem ela, o script não chama o garçom.
3. **Trocar a chave no Worker** (se ela pode ter vazado): gere uma nova e guarde no segredo CHAVE_PLANILHA do Worker; a antiga para de abrir a porta na hora (conexoes.md).

Para limpar os dados de teste da planilha: apague a planilha inteira (Drive, Mover para a lixeira, e depois esvaziar a lixeira). Os dados de teste do banco saem com dados/banco/limpar-leads-de-teste.sql (v3; roteiro APLICAR-PLANILHA-V3.md, passo 1); depois dele, abas recriadas recebem só o que ficou no banco (log.md, "Dados de teste do protótipo (#102)").

## O que não faz

- **Não devolve nada ao banco.** A volta do status (o que o SDR muda em estagio, estado, data_volta, canal, contato_em, reuniao_em; planilha-sdr.md, "O que volta para o banco") não existe: não há porta no garçom nem função no banco para isso. O que o SDR escrever fica só na planilha.
- **A linha não muda depois de entrar.** tentativas_feitas, estagio e estado ficam com o valor do momento em que o lead entrou na aba; o que acontecer depois no banco não aparece nela. Na aba respostas, também: quem refaz o quiz não muda a linha (21.5).
- **Não atualiza linhas antigas.** Quem refaz o quiz não muda a linha (21.5); quem retira o consentimento depois de entrar continua na aba, e o Otávio apaga a linha à mão (21.10).
- **Não confere as regras da lista** além dos valores: "o estágio só avança", "stand-by exige data_volta" e "perdido só com o não do lead" não são travados pela planilha (pergunta 24.7).
- **Não protege as colunas do banco:** o SDR consegue digitar por cima de nome ou telefone. No MVP só o Otávio acessa (#95) (pergunta 24.7).
- **Não ordena a fila.** As linhas entram na ordem em que o banco gravou; a ordem da fila (faixa A, nota, entrou_em; planilha-sdr.md, "Ordem da fila") é com o filtro ou a classificação da própria planilha.
- **Não guarda nada fora da planilha:** nenhuma cópia em outro arquivo do Drive, nenhum e-mail com dados.

## Teste local

```
node entregas/planilha-sdr-funil-01/teste/testar-planilha.mjs
```

Precisa só do Node (18 ou mais novo; conferido no 26), sem instalar nada. O teste carrega Codigo.gs num contexto separado do Node (módulo `vm`) com o Google de mentira de teste/falsos.mjs e um garçom de mentira no formato da porta privada. Só leads de mentira (TESTE..., @teste.invalid), endereço do garçom em `.invalid` e uma chave de mentira montada em tempo de execução. O último caso de busca fala por HTTP com um servidorzinho em 127.0.0.1, que só existe durante o teste; nada sai para a rede. Ao fim, confere que nenhum nome, e-mail, telefone, id_pessoa, cursor, endereço ou chave apareceu no registro nem nas mensagens de erro.

O Google de mentira imita o que importa aqui: célula com apóstrofo na frente vira texto (e o apóstrofo some), "=" na frente vira fórmula, escrever fora do tamanho da aba dá erro, a trava pode estar com outra execução, gatilhos só com 1, 5, 10, 15 ou 30 minutos. O que só o Google de verdade confirma está na pergunta 24.13.

### Resultado do teste (15/11/2026, versão 3)

Antes da versão 3, 54 de 54. Agora, **69 de 69**: os 54 casos de antes continuam (só "instalar duas vezes" passou a contar as duas abas, fila e respostas, no lugar de uma) e entram 15, os que começam por "aba respostas". Quatro erros postos de propósito no código, um de cada vez, foram pegos (instalar sem apagar o cursor quando só a respostas nasce, a porcentagem virando número, a lista separada por vírgula e a aba respostas sem escrita: 68, 68, 66 e 57 de 69); o código voltou igual.

```
OK     · instalar sem propriedades: cria a aba, não cria gatilho e avisa em português (gatilhos 0; mensagem com os nomes das propriedades)
OK     · instalar com só uma propriedade: também não cria gatilho (gatilhos 0)
OK     · instalar com GARCOM_URL sem https: recusa e não cria gatilho (gatilhos 0)
OK     · instalar com CHAVE_PLANILHA curta (menos de 32): recusa e não cria gatilho (gatilhos 0)
OK     · instalar: aba "fila", 20 cabeçalhos na ordem de planilha-sdr.md, primeira linha congelada (20 colunas, congelada 1)
OK     · instalar: lista fechada em estagio, estado e canal, com os valores exatos e sem aceitar valor de fora (estagio 5, estado 5, canal 2; produto sem lista (5.3))
OK     · instalar: um gatilho de tempo, a cada 5 minutos, para buscarLeadsNovos (1 gatilho)
OK     · instalar duas vezes (e três): continua um gatilho só, aba e linhas intactas (gatilhos 1; células iguais)
OK     · instalar com gatilhos repetidos de antes: fica um só (buscarLeadsNovos 1; gatilho de outra função não foi tocado)
OK     · instalar com uma aba "fila" de outro cabeçalho: não mexe em nada e avisa (nada mudou)
OK     · desligar: apaga o gatilho e não mexe na aba nem nas propriedades (gatilhos 0)
OK     · instalar: texto simples (@) em nome, telefone, email, empresa e respostas_a_confirmar, e em nenhuma outra (5 colunas com @)
OK     · aba renomeada e instalar de novo: a aba nova recebe os leads desde o início, sem duplicar (linhas 3 na aba nova; aba antiga com 3)
OK     · instalar com a aba já existente não apaga o cursor (cursor igual)
OK     · primeira busca: acrescenta os 3 leads na ordem, só nas colunas do banco (linhas 3; uma escrita, colunas 1 a 16)
OK     · valores da linha: captado no estágio vazio, não com acento, horário de Brasília, respostas da faixa b (estagio captado; entrou_em 09:00:01; clique quero-conversa)
OK     · cursor salvo nas propriedades depois de gravar, igual ao cursor_seguinte (com Z) (cursor do lead 3)
OK     · pedido: endereço e chave das propriedades, chave no cabeçalho, limite 200, sem seguir redirecionamento (chamadas 1)
OK     · GARCOM_URL com barra no fim: a barra sai (sem barra dupla)
OK     · segunda busca: manda o cursor codificado e não duplica (linhas 3; cursor igual)
OK     · cursor com +00:00 (como o banco escreve): vai como %2B (linhas 2)
OK     · leads novos no garçom: entram no fim, depois dos que já estavam (linhas 5)
OK     · cursor perdido (propriedades apagadas): pede desde o início e não duplica, pela conferência do id_pessoa (repetidas 3; linhas 3)
OK     · cursor pela metade: começa do início, sem duplicar (linhas 3)
OK     · mesmo lead duas vezes na mesma página: entra uma vez (linhas 1)
OK     · paginação: 450 leads numa execução, em 3 voltas (200, 200, 50), na ordem (linhas 450; chamadas 3)
OK     · paginação: página cheia exata (200) pede mais uma e para na lista vazia (chamadas 2)
OK     · limite de voltas: 2050 leads entram em duas execuções (2000 e 50), a aba cresce e a validação acompanha (linhas 2050; voltas 10 + 1)
OK     · 401 do garçom: nada acrescentado, cursor não perdido, erro para o aviso do Google (linhas 3; cursor igual; erro: o garçom respondeu 401: a CHAVE_PLANILHA das propriedades nã)
OK     · chave errada nas propriedades: 401 de verdade do garçom falso, nada acrescentado (linhas 0)
OK     · 502 do garçom (linhas 3; cursor igual; erro: o garçom respondeu com erro; nada novo foi gravado nesta pág)
OK     · 400 do garçom (linhas 3; cursor igual; erro: o garçom respondeu com erro; nada novo foi gravado nesta pág)
OK     · 302 (redirecionamento) não é seguido (linhas 3; cursor igual; erro: o garçom respondeu com erro; nada novo foi gravado nesta pág)
OK     · erro de rede (o fetch lança) (linhas 3; cursor igual; erro: não deu para falar com o garçom (rede ou endereço). Tenta de)
OK     · resposta ilegível (HTML no lugar de JSON) (linhas 3; cursor igual; erro: a resposta do garçom não é JSON; nada foi gravado nesta pági)
OK     · fora do formato: leads não é lista (linhas 3; cursor igual; erro: a resposta do garçom veio fora do formato; nada foi gravado )
OK     · fora do formato: lead sem id_pessoa (linhas 3; cursor igual; erro: a resposta do garçom veio fora do formato; nada foi gravado )
OK     · fora do formato: leads sem cursor_seguinte (linhas 3; cursor igual; erro: a resposta do garçom veio fora do formato; nada foi gravado )
OK     · fora do formato: sem pode_ter_mais (linhas 3; cursor igual; erro: a resposta do garçom veio fora do formato; nada foi gravado )
OK     · fora do formato: mais de 200 leads (linhas 3; cursor igual; erro: a resposta do garçom veio fora do formato; nada foi gravado )
OK     · fora do formato: JSON que é lista (linhas 3; cursor igual; erro: a resposta do garçom veio fora do formato; nada foi gravado )
OK     · erro na segunda página: a primeira fica gravada com o cursor dela, a segunda não (linhas 200, depois 250)
OK     · sem propriedades na busca: não chama o garçom (chamadas 0)
OK     · sem a aba "fila": não chama o garçom (chamadas 0)
OK     · cabeçalho mexido na aba: não grava nada (linhas 0)
OK     · outra execução com a trava: sai sem fazer nada e sem erro (chamadas 0)
OK     · a trava é solta depois da busca, mesmo com erro (trava solta)
OK     · colunas do SDR preenchidas à mão não são tocadas; linhas antigas não são reescritas (linhas 2 a 4 iguais; escrita só em 5 a 7, colunas 1 a 16)
OK     · anotação à direita das 20 colunas não empurra os leads para baixo (leads nas linhas 5 e 6)
OK     · fórmula injetada pelo quiz vira texto (= + - @), nada vira fórmula (fórmulas 0; 6 empresas como texto)
OK     · estágio e estado do banco: pre-qualificado vira pré-qualificado; valor fora da lista fica vazio (mapa conferido)
OK     · lead fora das faixas a e b (defesa): não entra, mas o cursor avança (linhas 1; fora da faixa 2)
OK     · urlFetch síncrono por HTTP local: a busca inteira contra um servidorzinho em 127.0.0.1, sem duplicar (linhas 230 em 2 voltas; segunda busca 0; chave errada 401)
OK     · aba respostas · instalar: as duas abas na ordem (fila 1ª, respostas 2ª), mesmo com outra aba antes (fila 1, respostas 2, Página1 3)
OK     · aba respostas · instalar: os 24 cabeçalhos na ordem do quiz, primeira linha congelada, texto simples só nas colunas de texto, sem lista (24 colunas; 14 com @; números sem formato)
OK     · aba respostas · primeira busca: os mesmos leads da fila, na mesma ordem, na mesma rodada, numa escrita só (fila 3, respostas 3, uma chamada)
OK     · aba respostas · a linha com cada coluna (modo números): lista com "; ", números como número, porcentagem como texto (leads 1200, pré-qualificados 50%, valor médio 15000)
OK     · aba respostas · a linha no modo chute: o chute na coluna dele, os números do funil vazios (chute Menos de 75%; vendedores "1" como texto)
OK     · aba respostas · resposta sem coluna vai para "outras respostas" e não quebra a rodada (7 respostas sem coluna numa célula; a rodada inteira entrou)
OK     · aba respostas · sem a coluna respostas (migração 002 não rodada): a linha entra com o que houver, as respostas vazias, sem erro (linhas 2; 19 colunas de respostas vazias)
OK     · aba respostas · sem duplicar: segunda busca e cursor perdido não repetem na aba respostas (respostas 3, depois 5, sem repetir)
OK     · aba respostas · recriar as duas abas (renomear as antigas e instalar): o cursor sai e as duas recebem tudo de novo (fila 2 e respostas 2 com o banco de hoje; antigas com 3)
OK     · aba respostas · apagar as duas abas e instalar: as duas nascem de novo e recebem tudo (fila 3, respostas 3)
OK     · aba respostas · vindo da v2 (a fila já existe com os leads, sem a aba respostas): instalar cria só a respostas, que recebe todos, e a fila não repete (fila 0 nova; respostas 3)
OK     · aba respostas · sem a aba respostas ou com o cabeçalho dela mexido: a busca não chama o garçom e não grava nada, nem na fila (sem-aba e cabecalho-diferente; chamadas 0)
OK     · aba respostas · instalar com uma aba "respostas" de outro cabeçalho: não mexe em nada, nem cria a fila (nada mudou)
OK     · aba respostas · fórmula injetada pelas respostas vira texto, nada vira fórmula (fórmulas 0)
OK     · aba respostas · muitos leads: 1200 numa rodada, a aba cresce e o texto simples acompanha (respostas 1200 em 7 voltas)
OK     · nenhum dado pessoal, cursor, endereço ou chave no registro nem nas mensagens de erro (registros 176, mensagens de erro 21, nenhum achado)

69 de 69 casos passaram.
```

## Para o ensaio da etapa 25

O ensaio pode rodar Codigo.gs contra o garçom de verdade rodando localmente, assim:

```js
import { criarFalsos, carregarCodigo, criarUrlFetchSincrono } from '../../../entregas/planilha-sdr-funil-01/teste/falsos.mjs';

// O garçom (wrangler dev, ou o handler num servidor http) precisa rodar FORA da linha principal
// do Node: em outro processo ou num Worker. O UrlFetchApp do Google é síncrono, e o de mentira
// também: a linha principal fica parada esperando a resposta.
const http = criarUrlFetchSincrono({
  traduzir: (u) => u.replace('https://garcom.teste.invalid', 'http://127.0.0.1:' + PORTA)
});
const falsos = criarFalsos({
  propriedades: { GARCOM_URL: 'https://garcom.teste.invalid', CHAVE_PLANILHA: CHAVE_DE_MENTIRA },
  urlFetch: http.urlFetch
});
const gs = carregarCodigo(falsos);   // o contexto: gs.instalar(), gs.buscarLeadsNovos(), gs.buscar_(), gs.desligar()
gs.instalar();
gs.buscarLeadsNovos();               // lança erro com mensagem em português se der errado
const aba = falsos.estado.abas.find(a => a.getName() === 'fila');
aba.linha(2, 20);                    // os 20 valores da primeira linha de dados
const respostas = falsos.estado.abas.find(a => a.getName() === 'respostas');   // v3: a segunda aba
respostas.linha(2, 24);              // os 24 valores da mesma pessoa na aba respostas
falsos.estado.registros;             // tudo o que foi para o registro (confira: sem dado pessoal)
falsos.estado.propriedades;          // GARCOM_URL, CHAVE_PLANILHA e o cursor salvo
http.fechar();
```

- `GARCOM_URL` precisa começar com https://; por isso o ensaio usa um endereço de mentira em https e o `traduzir` troca para o 127.0.0.1. `criarUrlFetchSincrono` só aceita 127.0.0.1 ou localhost depois da tradução.
- `buscar_()` devolve o resumo sem lançar erro: `{ situacao, acrescentadas, respostas_acrescentadas, repetidas, fora_da_faixa, voltas, codigo, pode_ter_mais }` (acrescentadas é a fila; respostas_acrescentadas, desde a v3, a aba respostas), com situacao ok, ocupado, sem-propriedades, endereco-invalido, chave-curta, sem-aba, cabecalho-diferente, nao-autorizado, erro-garcom, erro-rede, resposta-ilegivel ou resposta-fora-do-formato.
- O banco só entrega fins de quiz gravados há mais de 1 minuto (21.6). O ensaio precisa esperar esse minuto, ou gravar os leads de teste com o relógio atrasado, sem mexer no esquema.
- A CHAVE_PLANILHA do ensaio, nas propriedades e no garçom, precisa ter pelo menos 32 caracteres (22.4) e ser de mentira, montada em tempo de execução.
- `garcomFalso({ chave, leads })` é um garçom de mentira que segue o formato da porta privada, para conferir sem o garçom de verdade.

## O que falta para funcionar

1. Banco aplicado e garçom publicado com os três segredos (roteiro da etapa 26). Para a v3, o roteiro APLICAR-PLANILHA-V3.md (a limpeza, a migração 002, o código novo e as abas recriadas).
2. A decisão de onde a planilha mora (5.4; pergunta 24.1) antes de qualquer lead de verdade, e a da aba respostas com a política de privacidade (pergunta 2 da entrada de 15/11/2026 no log.md).
3. A volta do status para o banco: uma porta nova no garçom, uma função no banco e uma versão nova deste script.
4. Decisão do conflito-17 (Júnior e Euclides) e aprovação do Otávio.
