# 23 · Resposta · o relatório com os números da pessoa e o funil só em números

Rodado em 25/11/2026, no Mac, sobre a main em 7e0602e. Nada publicado. O site no ar não foi aberto nem tocado. Nenhuma chave, nenhum dado pessoal, nada em fontes/. Garçom, banco, planilha do SDR e lead score (a regra e os pontos) sem mudança.

Cada parte foi escrita por um subagente e revisada por outro, que não viu a escrita. As correções da revisão entraram antes do commit de cada parte.

## O que foi feito

| Parte | Commit | O que mudou |
|---|---|---|
| 23.1 · Registrar | b0693e9 | base/decisoes.md v14, com a **#123**; copy.md v4; briefing.md v3; log.md; e este pedido, que entra como estava |
| 23.2 · Tela dos números | 7426258 | quiz-01-pagina v12: só quantidade, os cinco números obrigatórios, a dica nova; sai o "%" |
| 23.3 · Relatório e conversa | 6320b83 | quiz-01-pagina v12 completa: uma conta só (funilDaPessoa), o relatório e a conversa com os números da pessoa, o exemplo avisado para quem não lembra e os casos-limite |
| 23.4 · Ensaio, testes, roteiro | (ver "Commits", no fim) | testar-quiz-01.js, ensaio v15, prints novos, APLICAR-23.md v1, index.md, log.md e esta resposta |

**Testes**

| Teste | Antes (7e0602e, cópia limpa) | Agora |
|---|---|---|
| Teste do quiz | 425 OK | 719 OK, "Tudo certo" |
| Ensaio | 287 de 287 | 288 de 288 |
| Montagem do site | certa | certa |

As notas e as faixas do lead score não mudaram: exemplo 96 · a, eliminatório 81, faixa c 24 · c, faixa b 68 · b. Casos novos do teste: vendas zero (nota 96), quem não lembra (83 · a), o funil saudável nos dois desfechos (84 · a e 69, eliminatório) e números fora de ordem. Um revisor também comparou o lead score da página antiga com o da nova em 3004 casos (aleatórios, com campo vazio, zero, "Não" e valor médio vazio), e nenhuma nota mudou.

**Prova de que o teste pega o erro.** Pus de volta, de propósito, o CENARIOS.fraco no relatório do qualificado e o botão "%" na linha de pré-qualificados. Na versão do teste daquele momento (599 conferências), o teste do quiz deu 39 falhas, entre elas:
- "sem botão '%' (4 fixas, 2 botões)";
- a haste com "400 leads, 7 vendas", quando a conta à parte dava 200 e 2;
- "R$ 60 mil; na tela R$ 120 mil";
- "R$ 120 mil | 400 leads" entre os valores de exemplo que sobraram.

Desfeito com git checkout; `git diff --quiet` confirmou que a página voltou igual ao commit.

**O que entra na conta de quem respondeu "Não" (23.3, item 4).** Conferido: nada do que a pessoa responde no chute entra na conta. CENARIOS.chute é fixo, com 50 · 35 · 52,5 · 14: "Menos de 75%" e um chute de 90 dão o mesmo relatório.

**versao_entrega** continua 2, pelo precedente da v11 (log.md, respostas da Etapa 3, pergunta 1). A regra é subir quando muda o fim do quiz ou o aceite, e o formato do pacote não mudou. Com isso, não precisa SQL no catálogo.

## O que uma pessoa de teste via antes e vê agora

A pessoa de teste do eliminatório e da faixa c, com o funil 200 · 100 · 50 · 40 · 2, venda de R$ 10 mil e sem empresa:

| | Antes (v11) | Agora (v12) |
|---|---|---|
| Topo | "Análise Estratégica do Sistema de Vendas · Empresa Exemplo · novembro de 2026" | sem a empresa: "Análise Estratégica do Sistema de Vendas · novembro de 2026" |
| Leads | 400 | 200 |
| Taxas | 50% · 40% · 70% · 12,5% | 50% · 50% · 80% · 5% |
| Etapas fracas | 3 (agendamento, comparecimento, fechamento) | 1 (fechamento) |
| Vendas hoje · na meta | 7 · 15 | 2 · 8 |
| Dinheiro na mesa | R$ 120 mil | R$ 60 mil, o mesmo que o lead score usou |
| Frase da abertura | "A perda começa no agendamento e vai até o fechamento." | "A perda está no fechamento." |

Quem respondeu "Não" via o relatório de exemplo dito como dela ("Pela sua estimativa", "Suas 4 etapas", selos de taxa dados a ela). Agora vê o aviso de exemplo inteiro. A conta continua a do cenário chute: ≈ R$ 150 mil por mês · no exemplo. Os selos são só os que saem das respostas dela.

Os prints de antes e de agora estão em entregas/quizzes/quiz-01/prints/. Os novos são numeros-, relatorio-pessoa- e relatorio-exemplo-, em 375 e 1440. Na abertura, na pergunta e no contato, os prints ficaram de 20 a 100 pixels mais altos por causa do aviso de cookies v4, de texto mais longo: os prints commitados ainda eram de antes dele. O conteúdo é o mesmo.

## Os textos novos ou mudados, para o Otávio aprovar

Todos estão na página v12. Os do pedido estão também na copy v4. A copy continua rascunho.

**Da seção "Os textos" do pedido (proposta do mentor)**

| Onde | Antes | Depois |
|---|---|---|
| Tela dos números, pergunta | "Pense em um mês normal e escreva cada número como lembrar, em quantidade ou em porcentagem." | "Pense em um mês normal e escreva cada número como lembrar." |
| Tela dos números, ajuda | "Na porcentagem, conte assim: de cada 100 que chegam na etapa, quantos passam para a próxima." | "Em quantidade, não em porcentagem: quantos leads chegaram, quantos marcaram a conversa, quantos compraram. Número aproximado já serve." |
| Tela dos números, dica com o botão apagado | (não havia) | "Preencha os cinco números para seguir. Só as vendas podem ser zero. Se não lembrar de algum, toque no ✎ da pergunta anterior e responda “Não”." |
| Tela dos números, contas e avisos | "≈ [n] [etapa]" e "Acima de 100%. Confere esse número?" | saem |
| Relatório de quem não lembra, selo | "estimativa · respostas por chute" | "exemplo · sem os seus números" |
| Título | "[nome], seu funil perde força em [n] das 4 etapas." | "[nome], sem os seus números, este é um funil de exemplo." |
| Abertura | "Pela sua estimativa, ..." | "Um funil comum, com 400 leads por mês e R$ 15 mil por venda, para mostrar onde as vendas costumam escapar. Não é o diagnóstico da sua empresa. Com os cinco números do seu funil, a conta passa a ser a sua." |
| Título do funil | "Suas 4 etapas contra as metas" | "As 4 etapas do exemplo contra as metas" |
| Título dos pontos fracos | "Onde sua equipe perde performance" | "Onde um funil como este perde performance" |
| Dinheiro na mesa, abaixo do valor | "por mês · estimativa" | "por mês · no exemplo" |
| Dinheiro na mesa, frase | "São cerca de [n] vendas a mais por mês se as [n] etapas fracas chegassem na meta. Frutos que hoje ficam no pé." | "No exemplo, são cerca de [n] vendas a mais por mês se as [n] etapas fracas chegassem na meta." |
| Dinheiro na mesa, nota | "Conta por estimativa, não é promessa. Onde você respondeu “menos de X%”, a etapa entra como 70% da meta: ..." | "Conta de exemplo, não é a sua nem é promessa: um funil de 400 leads por mês e valor médio de R$ 15.000. Com os seus números, a conta fica sua." |
| Topo, sem empresa | "· Empresa Exemplo ·" | sem nome de empresa |

Os números 400, R$ 15 mil e R$ 15.000 vêm do cenário no código, não foram escritos à mão.

**Provisórios, escritos pela regra da 23.3, item 4 (nada do exemplo dito como da pessoa)**

| Onde | Antes | Depois |
|---|---|---|
| Relatório de quem não lembra, chip | "perfil do funil [X]" | "perfil do exemplo [X]" |
| Título dos quadros | "O resumo do seu comercial" | "O resumo do exemplo, com as suas respostas" |
| Forças | "Metade dos leads tem perfil de compra: o marketing traz gente certa." | sai (vinha do exemplo) |
| Fraquezas | "Agendamento: ≈ 35%, meta 50%." | "No exemplo, agendamento: 35%, meta 50%." |
| Oportunidades | "Dinheiro na mesa: ≈ R$ [n] mil por mês com as etapas fracas na meta." | "No exemplo, o dinheiro na mesa é de ≈ R$ [n] mil por mês com as etapas fracas na meta." |
| Alerta | "Os números são estimativa. Contar os cinco números todo mês deixa o diagnóstico preciso." | "Os números deste relatório são de um funil de exemplo. Com os cinco números do seu funil, a leitura passa a ser a sua." |
| O que já funciona | "O que já funciona: [etapas]. Metade dos seus leads tem perfil de compra, ..." | "No exemplo, já funcionam: [etapas]." |
| Haste e fraquezas | "≈" antes das taxas | sem o "≈": os números do exemplo são exatos |
| Selos do relatório | também os de taxa do exemplo (Semente boa, Agenda que comparece, Fechador) | só os que saem das respostas dela |
| Painel da conversa, cabeçalho e frase | "Perfil do funil" | "Perfil do exemplo" · "Sem os seus números, este é o perfil de um funil de exemplo, não o seu." |
| Fala antes do contato | "Pronto, [nome]! O painel já mostra [n] de 4 etapas abaixo da meta." | "Pronto, [nome]! Sem os seus números, o painel mostra um funil de exemplo." |
| Painel durante o quiz | selos de taxa e aviso de selo novo a partir das taxas do exemplo; gráfico do cenário "fraco" | sem selos de taxa do exemplo; o gráfico do mesmo cenário do relatório (chute) |

**Provisórios dos casos-limite e das frases que agora saem dos números da pessoa**

| Onde | Antes | Depois |
|---|---|---|
| Fechamento com vendas zero | "De cada Infinity conversas, 1 vira venda." | "Nenhuma conversa virou venda no mês. O esperado é pelo menos 1 a cada 5." |
| Sem venda a mais (funil pequeno), valor | (caía no exemplo) | "R$ 0", sem as fatias e sem a etiqueta por etapa |
| Sem venda a mais, frase | (caía no exemplo) | "Com o volume de hoje, levar a etapa fraca (ou as [n] etapas fracas) até a meta ainda não soma uma venda inteira a mais por mês. O ganho aparece quando entrarem mais leads." |
| Sem venda a mais, Oportunidades | (caía no exemplo) | "Com o volume de hoje, as etapas fracas na meta ainda não somam uma venda a mais por mês. Com mais leads, cada conserto passa a render." |
| Abertura, pré-qualificação na meta | sempre "A perda começa no agendamento e vai até o fechamento." | essa frase só quando as três estão fracas; senão, "A perda está [no agendamento / no comparecimento / no fechamento]." (ex.: "A perda está no comparecimento e no fechamento.") |
| Leitura conjunta | os dois parágrafos sempre | o primeiro só com comparecimento e fechamento fracos; o segundo só com agendamento ou comparecimento fraco; sem nenhum, o bloco sai |
| Causa do agendamento | "Você contou que o primeiro contato sai no mesmo dia." fixo | da resposta dela ("em até 1 hora", "no mesmo dia", "no dia seguinte ou depois"), como o colchete da copy pede; com "Em até 10 minutos", "Não sei" ou sem resposta, essa frase sai e o resto da causa fica |
| Singular com 1 (só a forma) | "1 pontos fracos", "São 1 vendas ... se as 1 etapas fracas", "Hoje: 1 vendas", "1 vendas no mês" | "1 ponto fraco", "É 1 venda a mais por mês se a etapa fraca chegasse na meta.", "Hoje: 1 venda", "1 venda no mês" |

## O que ficou de fora e por quê

- **A fala inventada no histórico do chute.** antes('chute') põe no histórico uma pergunta e a resposta "Menos de 50%", que a pessoa não deu. Ficou como está, porque o pedido diz que o chute não muda (pergunta 5).
- **A causa do comparecimento.** "Hoje a pessoa recebe um lembrete só." não sai de nenhuma resposta e é dita como da pessoa. É texto da copy e não mudou (pergunta 4).
- **O botão "Telas" no site.** Está lá, e o pedido manda não mexer (pergunta 1).
- **O depende_de antigo da página.** ficha-de-fatos 5 (atual 6), landing-page-02 2 (atual 6) e politica-de-privacidade 7 (atual 8) já estavam defasados antes deste pedido. Ficam como estão: pela cascata, só sobem depois de o Otávio aprovar a atualização. A página continua com desatualizado: true (pergunta 8).
- **"R$ 0 mil".** O `mil()` continua dando "R$ 0 mil" na nota "Hoje: 0 vendas, R$ 0 mil por mês", com vendas zero. Não é erro de conta. Ficou, porque mudar o `mil()` mexe em todos os valores pequenos.

## Perguntas para o Otávio

1. **O botão "Telas" no site no ar.**
   - **A dúvida:** o site montado por montar-site.mjs leva o botão "Telas". Um visitante de verdade que toca nele vê a lista das 25 telas. Ao tocar numa delas, abre a tela com dados de exemplo; nos relatórios, os de 400 leads, "Empresa Exemplo" e "Marina Souza". A nota do painel diz "Protótipo de teste. O contato enviado vai para o banco de teste: use nome começando por TESTE e e-mail @teste.invalid.", o que pede a uma pessoa de verdade que use dados de teste.
   - **Mais um caminho:** quem recarrega a página no relatório volta pelo endereço (#relatorio) sem as respostas. Essa pessoa vê o relatório de exemplo, sem aviso.
   - **O que foi feito:** nada, como o pedido manda.
   - **Recomendação:** num pedido próprio, tirar o botão "Telas" e a nota do site montado (o arquivo da página continua com ele, para revisão), e, no site, abrir na abertura quem chega por um endereço de relatório sem respostas.
   - **Se decidir manter:** qualquer visitante continua podendo abrir um relatório de exemplo que parece um diagnóstico.
2. **Vendas zero: onde fica o dinheiro na mesa.**
   - **A dúvida:** a divisão do dinheiro entre as etapas (ln(meta/taxa)) dava infinito com o fechamento em 0%.
   - **O que foi feito:** a correção mais simples que não muda nenhum caso sem zero. As etapas com taxa 0 ficam com a fatia toda, em partes iguais, e as outras etapas fracas com zero. É o limite da própria conta quando a taxa tende a zero. Um revisor conferiu 5000 funis sem zero, e todos deram o mesmo resultado de antes. Efeito: com vendas zero, as outras etapas fracas aparecem com "≈ R$ 0 mil por mês na mesa".
   - **Recomendação:** manter.
   - **Se decidir diferente:** um piso na taxa (por exemplo, 1%) divide o dinheiro com as outras etapas, mas muda a conta dos funis com taxa perto de zero.
3. **Os textos provisórios.**
   - **A dúvida:** as duas tabelas "Provisórios" acima trazem textos que o pedido não escreveu.
   - **O que foi feito:** escritos pela regra da 23.3 ("nada que veio do exemplo é dito como da pessoa") e pelos casos-limite.
   - **Recomendação:** aprovar, ou ajustar texto por texto.
   - **Se decidir diferente:** são só frases, e nenhuma muda a conta.
4. **A causa do comparecimento.**
   - **A dúvida:** "Hoje a pessoa recebe um lembrete só. Sem aviso na véspera e algumas horas antes, a conversa perde prioridade na agenda dela." afirma algo do processo da pessoa que nenhuma pergunta do quiz pergunta.
   - **O que foi feito:** nada; é texto da copy.
   - **Recomendação:** trocar a primeira frase por uma geral, por exemplo "Com um lembrete só, a conversa perde prioridade na agenda da pessoa.", ou tirá-la.
   - **Se decidir manter:** o relatório continua dizendo algo que a pessoa não contou.
5. **A resposta inventada no histórico do chute.**
   - **A dúvida:** quem responde "Não" vê no histórico uma pergunta a mais, "Se fosse chutar, quantos dos leads com perfil marcam a conversa de venda?", com a resposta "Menos de 50%" no balão dela, que ela nunca deu.
   - **O que foi feito:** nada, porque o pedido diz que o chute não muda.
   - **Recomendação:** tirar esse par num pedido próprio.
   - **Se decidir manter:** a conversa continua pondo na boca da pessoa um número do exemplo.
6. **A causa do agendamento vinda da resposta.**
   - **A dúvida:** a página dizia "Você contou que o primeiro contato sai no mesmo dia." para todo mundo; a copy tem o "[no mesmo dia]" entre colchetes, isto é, vindo da resposta.
   - **O que foi feito:** a frase segue a resposta. Com "Em até 10 minutos" ou "Não sei", ela sai e o resto da causa fica.
   - **Recomendação:** manter.
   - **Se decidir diferente:** volta o texto fixo, numa linha.
7. **O selo e a nota da estimativa na copy.**
   - **A dúvida:** o pedido dá o selo novo "exemplo · sem os seus números", mas não diz em palavras que o selo "estimativa · respostas por chute" e a nota dos 70% da meta saem.
   - **O que foi feito:** na copy v4, saem para quem não lembra, marcados como escolha provisória a aprovar. A página não os mostra mais. O briefing v3 ainda diz que "Menos de X%" entra como 70% da meta; a conta de exemplo não usa o chute (ver "O que entra na conta").
   - **Recomendação:** aprovar, e num pedido futuro tirar a frase dos 70% do briefing ou fazer o chute entrar na conta.
   - **Se decidir diferente:** o selo e a nota voltam, mas a nota diria uma conta que a página não faz.
8. **O depende_de antigo da página.**
   - **A dúvida:** a página v12 ainda declara ficha-de-fatos 5, landing-page-02 2 e politica-de-privacidade 7. Isso já vinha de antes.
   - **O que foi feito:** ficou como está, com desatualizado: true, pela cascata.
   - **Recomendação:** num pedido de atualização, conferir a página contra as versões atuais e subir as três.
   - **Se decidir diferente:** nada muda na tela.
9. **A versão da página e dos testes.**
   - **A dúvida:** a 23.2 e a 23.3 foram dois commits na mesma página.
   - **O que foi feito:** uma versão só, a v12, porque nada foi publicado entre elas. O ensaio foi à v15: o cabeçalho do .mjs dizia 12 e o README 14, e os dois ficaram em 15.
   - **Recomendação:** manter.
   - **Se decidir diferente:** é uma linha em cada cabeçalho.
10. **A chave da Cloudflare para publicar.**
    - **A dúvida:** a chave de 18/11/2026 tinha 7 dias de prazo.
    - **O que foi feito:** o APLICAR-23 manda criar uma nova pelo passo 2.1 do APLICAR-22, se a de antes tiver vencido.
    - **Recomendação:** conferir no painel antes de pedir a publicação.
    - **Se a chave ainda valer:** o passo da chave nova sai.
11. **A copy já aponta para o briefing v3.**
    - **A dúvida:** pela cascata, a copy só ganharia a marca de desatualizada.
    - **O que foi feito:** como a copy v4 e o briefing v3 nasceram juntos da #123, a copy já declara o briefing 3.
    - **Recomendação:** manter.
    - **Se decidir diferente:** volta para 2, numa linha.
12. **O nome de teste no ensaio.**
    - **A dúvida:** as pessoas do ensaio continuam com o nome Marina; só o teste do quiz passou a usar "TESTE Joana", que é onde mora a conferência "Marina não aparece".
    - **O que foi feito:** a troca só no teste do quiz.
    - **Recomendação:** manter.
    - **Se decidir diferente:** troca-se o nome numa pessoa do ensaio e na resposta esperada.
13. **O campo u de R.nums.**
    - **A dúvida:** o campo ficou sempre 'n', sem uso.
    - **O que foi feito:** ficou, para a mudança ser pequena.
    - **Recomendação:** manter.
    - **Se decidir diferente:** tirar é uma linha, sem efeito na tela nem no pacote.

## Commits

Feitos no Mac; o push é do Otávio, pelo GitHub Desktop (regra 7).

- b0693e9 · 23.1 · Registrar a #123 (decisoes v14, copy v4, briefing v3, log)
- 7426258 · 23.2 · Tela dos números só em quantidade e os cinco obrigatórios (quiz-01-pagina v12)
- 6320b83 · 23.3 · Relatório e conversa com os números da pessoa; exemplo avisado para quem não lembra (quiz-01-pagina v12)
- 23.4 · o commit desta parte, listado na resposta do Claude na conversa
