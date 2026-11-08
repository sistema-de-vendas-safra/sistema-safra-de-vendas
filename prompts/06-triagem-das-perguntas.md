# Etapa 11 · Triagem das 84 perguntas da fila

Eu só reviso amanhã de manhã. Esta etapa existe para que eu acorde com a menor lista possível. Rode sem parar e sem me perguntar nada.

## O que fazer

Leia prompts/05-fila-perguntas.md e classifique cada pergunta num destes quatro grupos:

- **A · Forma.** Correção mecânica que não muda o sentido de nada: atualizar depende_de para a versão nova, tirar marca de desatualizado quando só a versão mudou, corrigir id, fonte, nome de campo ou notação. Aplique.
- **B · Já decidido.** A resposta já está escrita numa decisão minha registrada em base/decisoes.md, no log.md ou nos prompts 03 e 04. Aplique, citando o número da decisão ou o lugar onde ela está escrita. Se você precisar interpretar a decisão para aplicá-la, a pergunta não é B: é C.
- **C · Para o Otávio.** Pede uma decisão minha que não está escrita. Não aplique nada.
- **D · Para o Júnior e o Euclides.** Depende de um deles. Não aplique nada: acrescente em entregas/pautas/pauta-aprovacao-01.md (o documento sobe de versão), no lugar certo da ordem.

Na dúvida entre dois grupos, use o mais alto: entre A e B, B; entre B e C, C; entre C e D, D.

## Regras

- Valem o CLAUDE.md, nucleo/regras/versionamento.md e a Regra de pausas da fila (prompts/05-fila-de-trabalho.md).
- A pergunta 4.8 (a regra 4 do CLAUDE.md contra a Regra de pausas) é do grupo C. Até eu responder, a Regra de pausas vale para esta etapa.
- Use subagentes: um para classificar, outro, que não classificou, para conferir a classificação antes de aplicar qualquer coisa. Os grupos A e B são aplicados por um terceiro subagente e conferidos por um quarto.
- Faça um commit para o grupo A ("triagem · forma"), um para o B ("triagem · ja decidido") e um para a pauta ("triagem · pauta").
- Não faça push.

## O que entregar

Salve em prompts/06-para-o-otavio.md só o grupo C, em ordem do que destrava mais coisa primeiro. Para cada pergunta: o número original, a pergunta em uma ou duas frases sem siglas do sistema, a sua recomendação e o que muda se eu decidir diferente.

Salve em prompts/06-triagem-resposta.md a tabela completa: número, grupo, o que foi feito e o commit.

No chat, me diga só: quantas perguntas ficaram em cada grupo.
