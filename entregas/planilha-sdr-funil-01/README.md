---
id: planilha-sdr-funil-01
versao: 1
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: funil-01-planilha-sdr
    versao: 1
  - id: garcom
    versao: 2
  - id: banco-rascunho
    versao: 2
  - id: regra-seguranca
    versao: 2
  - id: decisoes
    versao: 4
desatualizado: true
---

# Planilha do SDR do funil-01 · Apps Script

> **SÓ DADOS DE TESTE ATÉ A DECISÃO.** Dado pessoal não entra no Google Drive (nucleo/regras/seguranca.md, regra 4), e onde a planilha do SDR mora segue em aberto (prompts/05-fila-perguntas.md, 5.4; funis/funil-01/planilha-sdr.md, "Onde a planilha mora"). Esta planilha pode ser criada no Drive do Safra **só para o teste**, com leads de mentira: nome começando por TESTE e e-mail terminado em @teste.invalid (#102). Com gente de verdade, não liga antes da decisão (pergunta 24.1).

O código que faz a planilha do SDR pedir ao garçom, a cada 5 minutos, os leads novos e acrescentá-los numa aba, com as colunas e a ordem de funis/funil-01/planilha-sdr.md. **Nunca foi rodado no Google.** Foi conferido só aqui, com um Google de mentira (ver "Teste local").

**Status.** Rascunho, pendente do Otávio. Nasce desatualizado, porque se apoia em documentos marcados (funil-01-planilha-sdr e garcom; regra provisória 11.1).

**Destino dos contatos em conflito · bloqueado para entrega até a decisão** (conflito-17, em base/lacunas.md). Este código segue o lado 2 (#90: banco e planilha), sem escolher. Protótipo de teste não é entrega.

## O que tem dentro

| Arquivo | O que é |
|---|---|
| Codigo.gs | O Apps Script (JavaScript V8, sem bibliotecas): `instalar()`, `buscarLeadsNovos()` e `desligar()` |
| appsscript.json | O manifesto: fuso de São Paulo, V8 e só três permissões (ver "Permissões") |
| teste/falsos.mjs | O Google de mentira (SpreadsheetApp, PropertiesService, UrlFetchApp, LockService, ScriptApp, Logger, Utilities e console), um garçom de mentira e um UrlFetchApp que fala com um endereço local. O ensaio da etapa 25 usa os mesmos |
| teste/testar-planilha.mjs | O teste local |

## O que faz

- **`instalar()`**, que o Otávio roda uma vez. Rodar de novo não estraga nada.
  1. Cria a aba **fila** (ou usa a que já existe, sem apagar nada).
  2. Se criou a aba agora, apaga o cursor guardado (de uma aba antiga renomeada ou apagada), para a aba nova receber todos os leads desde o início; a conferência do id_pessoa evita duplicata.
  3. Numa aba vazia, escreve na linha 1 as 19 colunas de planilha-sdr.md, na ordem: id_pessoa, nome, telefone, email, empresa, consentimento_whatsapp, consentimento_email, lead_score_faixa, lead_score_nota, respostas_a_confirmar, entrou_em, tentativas_feitas, estagio, estado, data_volta, canal, contato_em, reuniao_em, produto. Se a aba já tem esse cabeçalho, deixa. Se tem outro, não mexe em nada e avisa.
  4. Congela a primeira linha.
  5. Põe formato de texto simples nas colunas nome, telefone, email, empresa e respostas_a_confirmar, para o Google não transformar "00123", "TRUE" ou "1/2" em número, verdadeiro ou data (24.12).
  6. Põe lista fechada (sem aceitar valor de fora) em três colunas, com os nomes "Na planilha" de planilha-sdr.md: **estagio** (captado, pré-qualificado, agendado, realizado, venda), **estado** (conversando, tentativa, abandonado, stand-by, perdido) e **canal** (telefone, whatsapp). produto fica sem lista, porque está fora da lista fechada até a decisão de 5.3.
  7. Confere as propriedades do script (GARCOM_URL e CHAVE_PLANILHA). Se faltar alguma, se o endereço não começar com https:// ou se a chave tiver menos de 32 caracteres, avisa em português e **não** cria o gatilho (senão ele falharia a cada 5 minutos).
  8. Cria o gatilho de tempo de 5 minutos para `buscarLeadsNovos`. Se já existe, mantém; se há repetidos de antes, fica um só.
- **`buscarLeadsNovos()`**, que o gatilho roda a cada 5 minutos.
  1. Lê GARCOM_URL e CHAVE_PLANILHA das propriedades do script. Nunca estão no código.
  2. Chama `GET <GARCOM_URL>/api/planilha/leads-novos` com o cabeçalho `X-Chave-Planilha`, o cursor salvo (com `encodeURIComponent`) e `limite=200`. Na primeira vez, sem cursor. Não segue redirecionamento (a chave não vai para outro endereço).
  3. Com 401, erro do garçom, falha de rede ou resposta fora do formato `{ leads, cursor_seguinte, pode_ter_mais }` (entregas/garcom/README.md, "Porta privada"), não grava nada daquela página e não mexe no cursor.
  4. Acrescenta as linhas **no fim** da aba (depois da última linha com algo nas 19 colunas da fila; uma anotação à direita delas não empurra os leads), só nas 15 colunas que vêm do banco (de id_pessoa a data_volta), na ordem da planilha. Nunca apaga, nunca reescreve uma linha que já existe, nunca escreve em canal, contato_em, reuniao_em nem produto.
  5. Nunca duplica: além do cursor, não acrescenta um id_pessoa que já está na aba (21.6). Se o cursor se perder, pede desde o início e só entra quem falta.
  6. Salva o `cursor_seguinte` nas propriedades **depois** de gravar as linhas. Se a gravação falhar, o cursor fica onde estava e a próxima rodada pede de novo (sem duplicar, pelo item 5).
  7. Repete enquanto `pode_ter_mais` for true, até 10 páginas (2.000 leads) por execução; o resto fica para a rodada seguinte.
  8. Usa a trava do script (LockService): duas rodadas não se cruzam. Se outra estiver rodando, sai sem fazer nada.
  9. Se der erro, a função termina com uma mensagem em português, sem dado pessoal, para o Google mandar o aviso de falha do gatilho por e-mail ao Otávio.
- **`desligar()`** apaga o gatilho. Não mexe na aba nem nas propriedades.

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

Lead que viesse em faixa fora de a e b (o banco não manda) não entra, e o cursor segue.

**Registro sem dado pessoal.** O registro do Apps Script (Execuções) recebe só contagens e códigos, como `[planilha] busca: 3 linha(s) nova(s), 0 repetida(s), 0 fora da faixa, 1 volta(s)` ou `[planilha] busca: nao-autorizado (401)`. Nunca nome, telefone, e-mail, id_pessoa, cursor, endereço nem chave. Nas propriedades, além das duas que o Otávio guarda, o script guarda só o cursor (CURSOR_GRAVADO_EM e CURSOR_ID_PESSOA; o id_pessoa é dado pessoal indireto, pergunta 24.3).

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

1. **Criar a planilha.** Entre no Google Drive com a conta do Safra (sistemadevendassafra@gmail.com). Novo, Planilhas Google, Planilha em branco. Dê um nome, por exemplo "TESTE planilha do SDR funil-01". Não compartilhe com ninguém (#95).
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
   *Deu certo se:* o Registro de execução, embaixo, termina com `[planilha] instalar: aba criada; gatilho criado` e "Execução concluída".
8. **Fazer o quiz com um lead de mentira** (TESTE no nome, e-mail @teste.invalid) e esperar até uns 6 minutos (1 minuto de margem do banco, 21.6, mais os 5 do gatilho). Para não esperar o gatilho, escolha `buscarLeadsNovos` e clique em Executar.

## Como saber que deu certo

- A planilha tem a aba **fila**, com os 19 cabeçalhos na linha 1, congelada; estagio, estado e canal mostram a setinha da lista.
- No Apps Script, Acionadores (o relógio, à esquerda): um acionador só, `buscarLeadsNovos`, "Baseado no tempo", a cada 5 minutos.
- Depois do quiz de teste: uma linha nova na aba, com o nome TESTE..., estagio **captado** e canal, contato_em, reuniao_em e produto vazios.
- Em Execuções (a lista, à esquerda): rodadas de `buscarLeadsNovos` a cada 5 minutos, concluídas, com `[planilha] busca: 1 linha(s) nova(s)...` e, nas seguintes, `0 linha(s) nova(s)`.
- Rodar `buscarLeadsNovos` de novo à mão não repete a linha.

**Se der errado:**

| O que aparece | O que fazer |
|---|---|
| "faltam as propriedades do script..." | Passo 5; depois rode `instalar` de novo |
| "o garçom respondeu 401..." | A CHAVE_PLANILHA das propriedades não é igual à do Worker. Copie de novo para os dois lugares (conexoes.md, linha da planilha do SDR) |
| "não deu para falar com o garçom..." | Confira GARCOM_URL (https://, sem barra no fim, sem /api) e se o Worker está publicado |
| "o garçom respondeu com erro..." | O garçom ou o banco está fora. Em Execuções, o código (502, 503) diz qual; veja o registro do Worker na Cloudflare |
| "o cabeçalho da aba fila não é o esperado..." | Alguém mexeu na linha 1. Renomeie a aba (por exemplo, "fila antiga") e rode `instalar` de novo. A aba nova nasce sem cursor e recebe todos os leads desde o início, sem duplicar; a antiga fica como estava |

## Como desligar

Qualquer um destes para a planilha de pedir leads; os dois juntos é o mais seguro.

1. **Apagar o gatilho:** no editor, escolha `desligar` e clique em Executar. Ou: Acionadores (o relógio), nos três pontinhos do acionador `buscarLeadsNovos`, Excluir acionador.
2. **Apagar a chave:** Configurações do projeto, Propriedades do script, apague `CHAVE_PLANILHA`. Sem ela, o script não chama o garçom.
3. **Trocar a chave no Worker** (se ela pode ter vazado): gere uma nova e guarde no segredo CHAVE_PLANILHA do Worker; a antiga para de abrir a porta na hora (conexoes.md).

Para limpar os dados de teste da planilha: apague a planilha inteira (Drive, Mover para a lixeira, e depois esvaziar a lixeira). Os dados de teste do banco são outra pendência (log.md, "Dados de teste do protótipo (#102)").

## O que não faz

- **Não devolve nada ao banco.** A volta do status (o que o SDR muda em estagio, estado, data_volta, canal, contato_em, reuniao_em; planilha-sdr.md, "O que volta para o banco") não existe: não há porta no garçom nem função no banco para isso. O que o SDR escrever fica só na planilha.
- **A linha não muda depois de entrar.** tentativas_feitas, estagio e estado ficam com o valor do momento em que o lead entrou na aba; o que acontecer depois no banco não aparece nela.
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

### Resultado do teste (08/11/2026)

```
OK     · instalar sem propriedades: cria a aba, não cria gatilho e avisa em português (gatilhos 0; mensagem com os nomes das propriedades)
OK     · instalar com só uma propriedade: também não cria gatilho (gatilhos 0)
OK     · instalar com GARCOM_URL sem https: recusa e não cria gatilho (gatilhos 0)
OK     · instalar com CHAVE_PLANILHA curta (menos de 32): recusa e não cria gatilho (gatilhos 0)
OK     · instalar: aba "fila", 19 cabeçalhos na ordem de planilha-sdr.md, primeira linha congelada (19 colunas, congelada 1)
OK     · instalar: lista fechada em estagio, estado e canal, com os valores exatos e sem aceitar valor de fora (estagio 5, estado 5, canal 2; produto sem lista (5.3))
OK     · instalar: um gatilho de tempo, a cada 5 minutos, para buscarLeadsNovos (1 gatilho)
OK     · instalar duas vezes (e três): continua um gatilho só, aba e linhas intactas (gatilhos 1; células iguais)
OK     · instalar com gatilhos repetidos de antes: fica um só (buscarLeadsNovos 1; gatilho de outra função não foi tocado)
OK     · instalar com uma aba "fila" de outro cabeçalho: não mexe em nada e avisa (nada mudou)
OK     · desligar: apaga o gatilho e não mexe na aba nem nas propriedades (gatilhos 0)
OK     · instalar: texto simples (@) em nome, telefone, email, empresa e respostas_a_confirmar, e em nenhuma outra (5 colunas com @)
OK     · aba renomeada e instalar de novo: a aba nova recebe os leads desde o início, sem duplicar (linhas 3 na aba nova; aba antiga com 3)
OK     · instalar com a aba já existente não apaga o cursor (cursor igual)
OK     · primeira busca: acrescenta os 3 leads na ordem, só nas colunas do banco (linhas 3; uma escrita, colunas 1 a 15)
OK     · valores da linha: captado no estágio vazio, não com acento, horário de Brasília, respostas da faixa b (estagio captado; entrou_em 09:00:01)
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
OK     · colunas do SDR preenchidas à mão não são tocadas; linhas antigas não são reescritas (linhas 2 a 4 iguais; escrita só em 5 a 7, colunas 1 a 15)
OK     · anotação à direita das 19 colunas não empurra os leads para baixo (leads nas linhas 5 e 6)
OK     · fórmula injetada pelo quiz vira texto (= + - @), nada vira fórmula (fórmulas 0; 6 empresas como texto)
OK     · estágio e estado do banco: pre-qualificado vira pré-qualificado; valor fora da lista fica vazio (mapa conferido)
OK     · lead fora das faixas a e b (defesa): não entra, mas o cursor avança (linhas 1; fora da faixa 2)
OK     · urlFetch síncrono por HTTP local: a busca inteira contra um servidorzinho em 127.0.0.1, sem duplicar (linhas 230 em 2 voltas; segunda busca 0; chave errada 401)
OK     · nenhum dado pessoal, cursor, endereço ou chave no registro nem nas mensagens de erro (registros 137, mensagens de erro 19, nenhum achado)

54 de 54 casos passaram.
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
aba.linha(2, 19);                    // os 19 valores da primeira linha de dados
falsos.estado.registros;             // tudo o que foi para o registro (confira: sem dado pessoal)
falsos.estado.propriedades;          // GARCOM_URL, CHAVE_PLANILHA e o cursor salvo
http.fechar();
```

- `GARCOM_URL` precisa começar com https://; por isso o ensaio usa um endereço de mentira em https e o `traduzir` troca para o 127.0.0.1. `criarUrlFetchSincrono` só aceita 127.0.0.1 ou localhost depois da tradução.
- `buscar_()` devolve o resumo sem lançar erro: `{ situacao, acrescentadas, repetidas, fora_da_faixa, voltas, codigo, pode_ter_mais }`, com situacao ok, ocupado, sem-propriedades, endereco-invalido, chave-curta, sem-aba, cabecalho-diferente, nao-autorizado, erro-garcom, erro-rede, resposta-ilegivel ou resposta-fora-do-formato.
- O banco só entrega fins de quiz gravados há mais de 1 minuto (21.6). O ensaio precisa esperar esse minuto, ou gravar os leads de teste com o relógio atrasado, sem mexer no esquema.
- A CHAVE_PLANILHA do ensaio, nas propriedades e no garçom, precisa ter pelo menos 32 caracteres (22.4) e ser de mentira, montada em tempo de execução.
- `garcomFalso({ chave, leads })` é um garçom de mentira que segue o formato da porta privada, para conferir sem o garçom de verdade.

## O que falta para funcionar

1. Banco aplicado e garçom publicado com os três segredos (roteiro da etapa 26).
2. A decisão de onde a planilha mora (5.4; pergunta 24.1) antes de qualquer lead de verdade.
3. A volta do status para o banco: uma porta nova no garçom, uma função no banco e uma versão nova deste script.
4. Decisão do conflito-17 (Júnior e Euclides) e aprovação do Otávio.
