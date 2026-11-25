# 23 · O relatório com os números da pessoa e o funil só em números · partes 23.1 a 23.4

Escrito em 25/11/2026, pelo mentor, a partir do pedido do Otávio na conversa de hoje.
Rodar sobre a main em 7e0602e (complemento da #122) ou depois. Número 23 porque o 22 é o do rastreamento (APLICAR-22). Não depende dos pedidos 13, 14 e 19.

Este pedido prepara tudo e não publica. A publicação tem roteiro próprio (APLICAR-23). O funil está no ar em svsafra.gotriad.com.br desde 15/11 e o Pixel desde 18/11: gente de verdade pode chegar ao quiz a qualquer momento.

As respostas abaixo são a aprovação do Otávio para as mudanças de sentido que elas pedem:
onde a regra de versionamento mandaria transformar em pergunta, aplique e registre como "decisão do Otávio, 25/11/2026".
Os textos novos são proposta do mentor: aplique e liste para o Otávio aprovar (a copy continua rascunho).

## Como trabalhar

- Leia CLAUDE.md antes de começar. Valem a Regra de pausas e todas as regras da casa.
  Dúvidas no fim de prompts/23-relatorio-com-os-numeros-da-pessoa-resposta.md, no formato de sempre, pelo caminho conservador.
- Uma parte por vez. Em cada parte, um subagente escreve e outro, que não viu a escrita,
  revisa contra este pedido e contra a base. Commit por parte ("23.N · nome curto").
- Este arquivo foi escrito pelo mentor na pasta do Mac e ainda não tem commit: o commit da 23.1 o inclui como está, sem regravar.
- Push: vale a regra 7 como estiver no CLAUDE.md no dia em que rodar (hoje, no Mac: o Claude faz os commits e o Otávio faz o push pelo GitHub Desktop). Liste no fim da resposta os commits.
- Os pontos do código citados aqui (R.nums, CORPO.numeros, atualizarLivro, volumesDe, funilPainel, contaConversa, telaRelatorio, CENARIOS, calcular) são onde o mentor olhou em 25/11, na página v11. Confira antes de mudar; não confie.
- Proibido: publicar; mexer em painel da Cloudflare, do Google Tag Manager ou da Meta; rodar SQL no Supabase de verdade;
  chave de verdade; dado pessoal real; mexer em fontes/; mudar o garçom, o banco, a planilha do SDR ou o lead score (a regra e os pontos); inventar fato.
- Nunca travessão. Use ponto médio.

## O pedido do Otávio

1. **O relatório com os números da pessoa.** "Sim, vamos fazer isso." (25/11/2026, sobre a correção do relatório.)
   Hoje a página do quiz (entregas/quizzes/quiz-01/pagina/index.html, v11) monta todo relatório com um dos três cenários fixos de CENARIOS (400 leads por mês, R$ 15 mil por venda; o "fraco" dá 7 vendas hoje, 15 na meta e R$ 120 mil na mesa), e não com as respostas da pessoa. Sem empresa, o topo diz "Empresa Exemplo". É a 14.7 (#114): "corrigir só na versão que for ao ar". A versão que vai ao ar é esta.
2. **Só números, sem porcentagem.** "Deixe apenas a opção de números, sem opção de porcentagem." (25/11/2026, 09h21, sobre a tela "Pense em um mês normal e escreva cada número como lembrar, em quantidade ou em porcentagem.")
   Vale para a tela dos cinco números do funil (modo números). A tela do chute, de quem respondeu "Não", continua como está, com o "%" do chute: não faz parte do pedido.
3. **Os cinco números obrigatórios.** Resposta do Otávio ao mentor: "Exigir os cinco". O botão de seguir da tela dos números só acende com os cinco preenchidos; quem não sabe volta e responde "Não" na pergunta anterior.
4. **Quem não lembra vê o exemplo, avisado.** Resposta do Otávio ao mentor: "Exemplo, avisando". Quem respondeu "Não" continua com a conta de exemplo, mas o relatório diz com todas as letras que é um funil de exemplo, não o dela.

## 23.1 · Registrar

- base/decisoes.md sobe de versão com a decisão nova no próximo número livre (deve ser a #123): as quatro respostas acima, com as palavras do Otávio, e a nota de que ela cumpre a 14.7 da #114 sem mudar o resto da #114. Não muda nenhum fato: a ficha de fatos fica como está.
- entregas/quizzes/quiz-01/copy.md sobe de versão com os textos da seção "Os textos", marcados como proposta do mentor a aprovar. Na 5.2 saem o "nº" ou "%" das linhas, a conta "≈ [n] [etapa]" e o aviso "Acima de 100%. Confere esse número?".
- O briefing do quiz (entregas/quizzes/quiz-01/briefing.md, item "Números ou chute", que diz "escreve em número ou porcentagem") acompanha pela regra de versionamento.
- log.md: a entrada e as pendências. "Relatório do eliminatório com números que não batem (14.7)" ganha a nota de que está pronto no repositório e só fecha depois da publicação pelo APLICAR-23. A pergunta 2 da entrada de 19/11/2026 fica respondida por este pedido.
- Cascata pela regra de versionamento.

## 23.2 · A tela dos números: só em quantidade e os cinco obrigatórios

Na página do quiz:

1. As cinco linhas ficam só em quantidade, cada uma com o "nº" fixo, igual à primeira linha hoje (alterna--fixa). Somem o botão "%" e a troca de unidade. Hoje a linha de pré-qualificados começa em "%" (R.nums): passa a começar em "nº", como as outras.
2. A conta ao vivo fica com "base de todas as contas", "= [n]% de [etapa anterior]" e o aviso "Maior que a etapa anterior. Confere esse número?", que continua só aviso, como hoje. Saem o "≈ [n] [etapa]" e o "Acima de 100%".
3. O botão de seguir só acende com os cinco campos preenchidos, com leads, pré-qualificados, agendados e conversas maiores que zero; vendas pode ser zero. É a mesma condição que o lead score já usa em dinheiroNaMesaInformado. Com o botão apagado, a dica nova aparece perto dele. Corrigir a resposta pelo ✎ continua funcionando nos dois sentidos (de "Sim" para "Não" e de volta).
4. O que a porcentagem deixa sem uso sai (o ramo "%" de volumesDe, de atualizarLivro e de resumoNumeros, e o estilo da troca de unidade), sem mudar nada para quem escreve em quantidade.
5. O pacote do fim do quiz mantém o formato: cada linha de respostas.numeros continua com unidade, agora sempre "nº". O garçom, o banco e a planilha do SDR não mudam; o formato com "%" continua aceito por eles, para as respostas antigas.
6. O chute não muda.

## 23.3 · O relatório e a conversa com os números da pessoa

1. **Uma conta só.** Uma função para o funil da pessoa (os cinco números e o valor médio que ela informou), usada pelo relatório e pela conversa gratuita, para os dois nunca mostrarem números diferentes. O lead score só passa a usá-la se a nota de nenhum caso mudar (o ensaio prova); se mudar, não mexa nele.
2. **Quem respondeu "Sim".** Todo relatório (o do qualificado aberto por "Ver meu diagnóstico", o do não qualificado, o saudável e o saudável não qualificado) e a conversa gratuita usam os números da pessoa: a haste, os selos, os quatro quadros, os pontos fracos, o dinheiro na mesa, a tabela do saudável e as notas. Nenhum número de CENARIOS chega a quem fez o quiz respondendo "Sim".
3. **Casos que a conta tem de aguentar, sem cair no exemplo:**
   - Vendas zero. Hoje a divisão do dinheiro entre as etapas (ln(meta/taxa)) dá infinito. Escolha a correção mais simples que não muda a conta de nenhum caso sem zero; explique e registre como pergunta.
   - Funil pequeno, com etapa fraca mas zero venda a mais depois do arredondamento. Hoje contaConversa cai no exemplo. Mostre a conta como ela é; se faltar frase para esse caso, escreva uma provisória e liste.
   - Números fora de ordem (uma etapa maior que a anterior): continua só aviso, e a conta não pode quebrar.
   - Em nenhum caso a tela mostra NaN, Infinity, undefined ou número negativo.
4. **Quem respondeu "Não".** A conta continua a de exemplo (CENARIOS.chute). Confira e diga na resposta se o que a pessoa respondeu no chute entra na conta; hoje parece não entrar. O relatório e a conversa dizem com todas as letras que é um exemplo. A regra para cada frase: nada que veio do exemplo é dito como da pessoa ou do time dela. Os selos e as frases que saem das respostas dela (CRM, quem marca, origem dos leads, primeiro contato, tentativas, lead sem contato) continuam dela; os que saem das taxas do exemplo (Semente boa, Agenda que comparece, Fechador, as frases de cada etapa) não são dados como dela. Os textos dos lugares principais estão na seção "Os textos"; o resto, escreva pela regra, como provisório, e liste.
5. **Nome e empresa.** Sem empresa, o topo fica sem nome de empresa (só o nome da Análise e o mês). Nenhum valor de exemplo da página (EX, "Marina Souza", "Empresa Exemplo", marina@empresaexemplo.com.br) aparece para quem fez o quiz: confira o topo, a ficha (cargo, ramo, faturamento) e o histórico da conversa.
6. **O que continua exemplo, de propósito.** O relatório de exemplo da abertura (a primeira tela) é vitrine, não diagnóstico: fica como está. O painel "Telas" continua abrindo os relatórios com o exemplo, para revisão. Confira se o botão "Telas" aparece no site montado por montar-site.mjs, o que vai ao ar. Não mexa: se aparece, registre como pergunta, com o que um visitante de verdade vê ao tocar nele e a recomendação.
7. **versao_entrega.** Siga o precedente da v11 (log.md, entrada da Etapa 3, pergunta 1). Se subir exigir SQL no catálogo, mantenha 2 e registre como pergunta.
8. A página sobe de versão, com o README e o cabeçalho de comentário em dia e o depende_de atualizado.

## Os textos (proposta do mentor, para o Otávio aprovar)

A tela dos números:
- Pergunta: "Pense em um mês normal e escreva cada número como lembrar."
- Ajuda: "Em quantidade, não em porcentagem: quantos leads chegaram, quantos marcaram a conversa, quantos compraram. Número aproximado já serve."
- Dica, com o botão apagado: "Preencha os cinco números para seguir. Só as vendas podem ser zero. Se não lembrar de algum, toque no ✎ da pergunta anterior e responda “Não”."

O relatório de quem não lembra (os números entre colchetes vêm do cenário no código, nunca escritos à mão):
- Selo: "exemplo · sem os seus números"
- Título: "[nome], sem os seus números, este é um funil de exemplo."
- Abertura: "Um funil comum, com [400] leads por mês e R$ [15 mil] por venda, para mostrar onde as vendas costumam escapar. Não é o diagnóstico da sua empresa. Com os cinco números do seu funil, a conta passa a ser a sua."
- Título do funil: "As 4 etapas do exemplo contra as metas" (no lugar de "Suas 4 etapas contra as metas").
- Título dos pontos fracos: "Onde um funil como este perde performance" (no lugar de "Onde sua equipe perde performance").
- Dinheiro na mesa, abaixo do valor: "por mês · no exemplo". A frase: "No exemplo, são cerca de [n] vendas a mais por mês se as [n] etapas fracas chegassem na meta." A nota: "Conta de exemplo, não é a sua nem é promessa: um funil de [400] leads por mês e valor médio de R$ [15.000]. Com os seus números, a conta fica sua."

## 23.4 · Ensaio, testes, roteiro e fechamento

O que provar, tudo local, como o ensaio já faz:
- As pessoas de teste do ensaio (nucleo/ferramentas/ensaio/ensaio.mjs) e do teste do quiz (nucleo/ferramentas/prints/testar-quiz-01.js) escrevem hoje a linha de pré-qualificados em porcentagem sem tocar no botão, porque a linha começava em "%": EXEMPLO e FAIXA_B com 200 · 50 e FAIXA_C com 30 · 50. Troque pelo número equivalente (200 · 100 e 30 · 15), e o mesmo em qualquer outra pessoa de teste nessa situação, para o funil continuar o mesmo. Confira que as notas, as faixas e as telas finais não mudam. A conferência da planilha no ensaio que espera "50%" passa a esperar o número. Os testes da planilha e da migração que usam "%" ficam: eles provam o formato antigo.
- Conferências novas, em 1440, 375 e 360: a tela dos números sem "%" em lugar nenhum, com os textos novos; o botão apagado com campo vazio e com zero em cada um dos quatro primeiros, aceso com os cinco preenchidos e vendas zero; a dica aparece com o botão apagado e some com ele aceso.
- O relatório de cada pessoa de teste mostra os números dela: os leads, as taxas, as vendas de hoje e na meta e o dinheiro na mesa batem com a conta feita à parte no teste e com o que a conversa gratuita mostrou, e o dinheiro na mesa é o mesmo que o lead score usou. "400 leads", "R$ 120 mil", "Empresa Exemplo" e "Marina" não aparecem.
- Sem empresa: o topo sem nome de empresa.
- Quem não lembra: o relatório e a conversa com o aviso de exemplo, e nenhuma frase que a regra da 23.3, item 4, proíbe ("Suas 4 etapas", "Onde sua equipe perde", "Pela sua estimativa" e as outras que você achar).
- Vendas zero e funil pequeno: o relatório inteiro sem NaN, Infinity, undefined nem número negativo.
- O painel "Telas" continua abrindo os cinco relatórios com o exemplo, e a abertura continua com o relatório de vitrine.
- Prova de que o ensaio pega o erro: devolva de propósito o CENARIOS.fraco ao relatório do qualificado e o botão "%" a uma linha, rode, mostre as falhas, desfaça e confira que os arquivos voltaram iguais.
- Prints novos da tela dos números e dos relatórios, como a casa faz, comparados aos de antes.

O roteiro para o Otávio, em entregas/prototipo-funil-01/APLICAR-23.md, um passo por ação, no formato da casa (o porquê, "Faça", "Deu certo se", "Se der errado"), sem pedir chave nenhuma:
- O que muda no ar e o que não muda: só a página do quiz; o garçom, o banco, a planilha e o Tag Manager ficam como estão.
- Publicar pelo jeito que o APLICAR-22 usou, dizendo o que precisa existir no Mac para o Claude publicar, sem mostrar valor nenhum.
- A conferência no ar, como lista do que olhar (quem roda é o Claude, quando o Otávio pedir a publicação): um envio de teste que passa no corte e um que não passa, com nome começando por TESTE e e-mail @teste.invalid, conferindo que o relatório mostra os números digitados; um "Não" com o aviso de exemplo; a tela dos números sem "%".
- A limpeza desses leads de teste, pelo SQL que já existe (dados/banco/limpar-leads-de-teste.sql).
- Como voltar atrás (a versão anterior da página).

Fechamento:
- index.md atualizado.
- prompts/23-relatorio-com-os-numeros-da-pessoa-resposta.md: o que foi feito, com os commits; a tabela de cada texto novo ou mudado (onde, antes, depois), para o Otávio aprovar; o que uma pessoa de teste via antes e vê agora, com os números; o que ficou de fora e por quê; as perguntas para o Otávio.
- ESTADO.md: se já existir, reescreva; se não existir, não crie (é do pedido 14).
- Nada publicado, e o site no ar não foi aberto nem tocado.
