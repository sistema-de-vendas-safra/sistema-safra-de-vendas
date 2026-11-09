# Perguntas da fila das decisões de 09/11

Dúvidas das etapas 30 a 36 (prompts/11-decisoes-de-09-11.md), no formato de sempre: Dúvida, O que foi feito, Recomendação, Se decidir diferente. Cada escolha provisória seguiu o caminho mais conservador (Regra de pausas, CLAUDE.md).

## Etapa 30

30.1. **O nome público da Análise continua a definir.**
   - *Dúvida:* a resposta 7.9 deu nome, duração e condutor à conversa de venda (Call de Direcionamento), mas não deu o nome público do diagnóstico do quiz (a Análise). São quatro nomes em uso (ficha-de-fatos#analise-nome-publico).
   - *O que foi feito:* a #107 registra que o nome continua a definir; o campo da ficha continua em conflito · bloqueado para entrega, com uma observação nova. Nenhum nome foi escolhido.
   - *Recomendação:* escolher o nome antes de a landing e o quiz irem ao ar com gente de verdade; a recomendação da página era que o nome é seu, sem levar aos sócios.
   - *Se decidir diferente:* se o nome for aos sócios, o item 7 da pauta deixa de ser só "Para informar" e ganha uma linha para decidir o nome.

30.2. **Os números 10.x do pedido são os da página, não os do pedido 10.**
   - *Dúvida:* o pedido aceita 10.1 a 10.16. Esses números existem na página (prompts/08-decisoes-em-uma-pagina.md, vindos de prompts/07-fila-perguntas.md) e também existe uma pergunta 10.1 em prompts/10-prototipo-ligado-resposta.md (wrangler tail sem o filtro `--method POST` no Erro 4).
   - *O que foi feito:* li todos os 10.x como os da página, porque o pedido responde à página; a 10.1 da página é complemento da 8.5 ("os botões levam à seção que explica o quiz"). A 10.1 do pedido 10 continua aberta e não entrou na #114 nem em prompts/11-respostas.md.
   - *Recomendação:* confirmar a leitura e responder a 10.1 do pedido 10 junto com as que continuam abertas (etapa 36).
   - *Se decidir diferente:* se a 10.1 aceita for a do pedido 10, o Erro 4 do LIGAR.md fica com o tail sem filtro como está, e a 10.1 da página continua valendo como complemento da 8.5, que foi aceita.

30.3. **O que acontece quando a pessoa desmarca a caixa de aceite.**
   - *Dúvida:* a 13.4 manda o caminho conservador e o registro como pergunta: com a caixa desmarcada, o diagnóstico aparece na tela e nada vai ao banco nem à equipe.
   - *O que foi feito:* a #104 registra esse comportamento como escolha provisória. A página do quiz muda só na etapa 34.
   - *Recomendação:* manter; quem desmarca ainda vê o diagnóstico e não entra na contagem de análises gratuitas (5.7), nem na fila de quem liga.
   - *Se decidir diferente:* se quiser contar quem desmarca (sem dado de pessoa), o garçom precisa aceitar um evento sem contato, o que entra na etapa 33 junto com os eventos sem dado de pessoa.

30.4. **O status da #85 e da #33 depois da #108.**
   - *Dúvida:* a #108 diz que a promessa passa a valer por decisão do Otávio e que base/promessa.md sai de pendente-aprovacao para decidido. A #85 (promessa em duas versões, no lugar da #33) continua na tabela como pendente-aprovacao do Júnior e do Euclides, com "Não pode ir para entrega antes da aprovação". O pedido diz "as promessas", no plural, sem dizer se a #33 também vale.
   - *O que foi feito:* não reescrevi o texto nem o status da #85 e da #33; a #85 ganhou só "#108" na coluna "Revista por". promessa.md fica para a etapa 31.
   - *Recomendação:* na etapa 31, junto com promessa.md, passar a #85 para "decidido (otavio: 2026-11-09)", e a #33 para "substituída por #85" (a regra de "substituída" pede a substituta aprovada; a #108 faz da decisão do Otávio essa aprovação), com uma linha no log.md.
   - *Se decidir diferente:* se a promessa ainda tiver de passar pelos sócios, a #108 vale só para o topo da página como rascunho, e promessa.md continua pendente-aprovacao.

30.5. **Quando o ManyChat entra.**
   - *Dúvida:* a 5.6 escolhe o ManyChat e diz que ele depende da ligação com o Instagram, da Meta, que está fora do MVP até agora.
   - *O que foi feito:* ficha-de-fatos#reels-ferramenta registra a ferramenta e a dependência; a palavra ficou "para depois" (ficha-de-fatos#reels-palavra). conexoes.md fica para a etapa 31.
   - *Recomendação:* deixar o ManyChat para depois do MVP, junto com a etiqueta de anúncios da Meta (6.4); até lá, a linha dos reels no funil-01 fica reservada.
   - *Se decidir diferente:* se entrar já, a conta da Meta e a do ManyChat precisam ser criadas com o e-mail do Safra, com a menor permissão, antes de ligar, e o funil-01 ganha a origem dos reels.

30.6. **Os campos analise-duracao e analise-quem-conduz continuam em conflito.**
   - *Dúvida:* os dois campos da ficha estão em conflito e dizem que, com a #92, a pergunta passou a ser a duração e o condutor da conversa de venda. A #107 decide isso nos campos duracao-call-de-venda e quem-faz-a-reuniao. Fechar os dois campos antigos é mudança de sentido que o pedido não diz.
   - *O que foi feito:* os dois campos ficaram em conflito, com uma observação que aponta para a #107. lacunas (conflito-02) fica para a etapa 31.
   - *Recomendação:* na etapa 31, marcar os dois campos como "resolvido por #107 (a conversa de venda); a Análise é o diagnóstico do quiz", e fechar a parte do conflito-02 que sobra, deixando só o nome público da Análise.
   - *Se decidir diferente:* os campos continuam bloqueados e nenhum texto que fala da duração da Análise vai ao ar, o que não atrapalha a landing, que passa a citar duracao-call-de-venda.

30.7. **O CLAUDE.md ainda diz que dado pessoal nunca entra no Google Drive.**
   - *Dúvida:* a 5.4 cria a exceção da planilha do SDR no Drive, aplicada na regra 4 de nucleo/regras/seguranca.md (v3). O CLAUDE.md, na parte "O que é este sistema", diz "Dado pessoal nunca entra no repositório nem no Google Drive", sem a exceção. O pedido manda mudar no CLAUDE.md só a 4.8.
   - *O que foi feito:* o CLAUDE.md ficou só com a 4.8; a frase do Drive não mudou.
   - *Recomendação:* acrescentar ao fim da frase "(exceção: a planilha do SDR, regra 4 de segurança)", numa etapa que mexa no CLAUDE.md, com linha no log.md.
   - *Se decidir diferente:* a frase fica como está, e a regra 4 de segurança é quem vale para a planilha.

30.8. **A 26.3 e a 26.6 estão nas aceitas e também têm resposta própria.**
   - *Dúvida:* a lista das aceitas como recomendado traz a 26.3 e a 26.6; o item 11 das respostas próprias responde as duas de outro jeito (fica a publicável "default" e o wrangler logado no protótipo).
   - *O que foi feito:* a resposta própria vale sobre a recomendação (#113); a #114 e prompts/11-respostas.md dizem isso.
   - *Recomendação:* manter: a resposta própria é mais nova e mais específica.
   - *Se decidir diferente:* se valer a recomendação, o roteiro da etapa 35 ganha o passo de criar a publicável "garcom-quiz-prototipo" e trocar o segredo do Worker.

30.9. **A caixa já marcada e a regra de consentimento explícito.**
   - *Dúvida:* provas-e-conformidade (LGPD) cita "Consentimento explícito para WhatsApp e e-mail no quiz" (Doc Mestre online, regra 8). A #104 decide uma caixa só, já marcada. A #110 registra como exceção a posição do aceite e a promessa de percentual, não a caixa já marcada; a #103 tira a revisão jurídica do sistema.
   - *O que foi feito:* a #104 foi registrada como decidida, como o Otávio respondeu. provas-e-conformidade não foi mexido (etapa 31).
   - *Recomendação:* na etapa 31, registrar a caixa já marcada em provas-e-conformidade como exceção decidida pelo Otávio (#104), do mesmo jeito que a #110, para a regra e a página não se contradizerem.
   - *Se decidir diferente:* se a caixa tiver de vir desmarcada, muda só o estado inicial da caixa na etapa 34; o texto e os dois campos do banco ficam iguais.

30.10. **A regra de versionamento ainda manda perguntar na dúvida entre forma e sentido.**
   - *Dúvida:* nucleo/regras/versionamento.md diz "Na dúvida se é forma ou sentido, o Claude pergunta antes de alterar". Com a 4.8 no CLAUDE.md, numa fila vale a Regra de pausas, mas a frase da regra de versionamento não diz isso.
   - *O que foi feito:* a frase ficou como está (a etapa 30 aplicou só a 11.1 nessa regra); vale a leitura de que, numa fila, "perguntar" é registrar a pergunta e seguir pelo caminho conservador.
   - *Recomendação:* acrescentar "(numa fila, pela Regra de pausas do CLAUDE.md)" ao fim da frase, numa versão nova da regra.
   - *Se decidir diferente:* a frase fica como está, e a exceção vale só pelo CLAUDE.md.
