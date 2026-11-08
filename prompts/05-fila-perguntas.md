# Perguntas da fila · etapas 4 a 10

Escolhas provisórias feitas durante a fila (prompts/05-fila-de-trabalho.md), pelo caminho mais conservador. Cada item traz: a dúvida, o que foi feito, a recomendação e o que muda se o Otávio decidir diferente. Numeradas por etapa.


## Etapa 4 · Decisões de 08/11 e lead score

Detalhe em prompts/04-decisoes-de-08-11-e-lead-score-resposta.md.

4.1. **A #61 também foi revista pela #92?**
   - *Dúvida:* a #92 diz que a Análise passa a ser o diagnóstico do quiz. A #61 dizia que o escopo da Análise gratuita é "a versão da call". O prompt cita só a #49, a #59 e a #62.
   - *O que fiz:* apliquei a #92 em ficha-de-fatos#analise-conteudo (a Análise é o diagnóstico do quiz; a versão da call ficou como histórico) e pus a #92 em "Revista por" da #61, que continua decidida.
   - *Recomendação:* confirmar.
   - *Se decidir diferente:* analise-conteudo volta a dizer "a versão da call" e a #61 perde a remissão; a ficha sobe de versão.

4.2. **O conflito do número de entregas fecha na ficha?**
   - *Dúvida:* a seção 2 manda a landing seguir o registro (8 entregas) e marcar as lacunas como resolvidas, mas o campo ficha-de-fatos#numero-de-entregas estava em conflito, e o contrato ainda tem 9.
   - *O que fiz:* o campo passou a decidido (#52, #56). A versão de 9 entregas ficou como histórico do formato antigo. O contrato continua em aberto (lacuna-10, outros-06).
   - *Recomendação:* confirmar, porque a outra fonte do conflito era o próprio formato antigo.
   - *Se decidir diferente:* o campo volta a ficar em conflito, e lacuna-05 e conflito-11 voltam a ficar abertos na parte das entregas.

4.3. **O valor de referência do bônus da Análise da base.**
   - *Dúvida:* ficha-de-fatos#bonus-analise-base apresenta o bônus pelo valor antigo da Análise (#59, #62). Com a #92, o valor da Análise mudou e os dois deixaram de coincidir. O bônus é aprovado pelo Júnior e pelo Euclides (#48).
   - *O que fiz:* não mudei o valor do bônus; pus uma observação no campo. A oferta, que cita os dois, ficou desatualizada (ver 4.5).
   - *Recomendação:* manter o valor do bônus como está, porque é outra análise (a da base de clientes) e está aprovado, e decidir na pauta com o Júnior e o Euclides se ele continua sendo apresentado assim.
   - *Se decidir diferente:* o campo muda, e a mudança vai para a aprovação do Júnior e do Euclides, porque o bônus é aprovado.

4.4. **O "Adaptado de" volta à nota de rodapé da landing?**
   - *Dúvida:* a resposta 2 põe o percentual de Deming na ficha "com a nota 'Adaptado de'". Na landing, você tinha tirado o "Adaptado de" em 03/11. A #94 mantém o título "como está, com o asterisco", sem falar da nota.
   - *O que fiz:* ficha-de-fatos#deming-percentual diz que, em peça, o número vai sempre com "Adaptado de", e registra que a nota atual da landing não tem.
   - *Recomendação:* voltar o "Adaptado de" na nota de rodapé, como pede a lacuna 21 do CTX.
   - *Se decidir diferente:* o campo perde a exigência da nota, e lacuna-21 volta a ficar aberta no ponto do Deming.

4.5. **Mecanismo e oferta: a versão rápida da Análise na call.**
   - *Dúvida:* os dois tratam a "versão rápida da Análise" feita na call como a demonstração do mecanismo e a prova antes da compra. Com a #92, a Análise é o diagnóstico do quiz, e a reunião com o Júnior é a conversa de venda. Não está escrito se a versão rápida continua na call.
   - *O que fiz:* mecanismo (v1, aprovado) e oferta (v1, pendente-aprovacao) ficaram com desatualizado: true, sem mudar conteúdo nem versão. Os dois não servem de base para entrega nova até a atualização.
   - *Recomendação:* dizer se a demonstração com os números do prospect continua na reunião (com outro nome, já que a Análise agora é o quiz) ou se passa a ser o próprio diagnóstico do quiz. Com isso, eu atualizo a oferta (que também tem a linha da regra de vocabulário e a da Análise, já resolvidas) e o mecanismo.
   - *Se a demonstração continuar na call:* basta trocar o nome e citar a #92; no mecanismo, isso pode ser só forma. *Se passar para o quiz:* o mecanismo muda de sentido e volta para a aprovação do Júnior e do Euclides.

4.6. **Nomes de etapa nos títulos e chamadas de topo.**
   - *Dúvida:* a resposta 5 põe em público os nomes de etapa do método (pré-qualificação, agendamento, comparecimento, fechamento). A seção 2 diz que, na comunicação de topo, só entram palavras que o comprador já usa.
   - *O que fiz:* em público valem os nomes do método; em títulos e chamadas de topo vale também a regra de 22/10 (tom-de-voz e glossário, verbete Etapas).
   - *Recomendação:* manter assim: os nomes de etapa entram no corpo da página e do quiz, e o topo fica com as palavras do comprador.
   - *Se decidir diferente:* se puderem ir ao topo, sai a ressalva do tom-de-voz e do glossário.

4.7. **Qual preço entra no "custo mensal da implementação" do lead score.**
   - *Dúvida:* o lead score divide ficha-de-fatos#preco-avancada por 3. Esse campo vale até a 10ª venda; depois vale ficha-de-fatos#preco-avancada-depois.
   - *O que fiz:* escrevi o que o prompt manda (preco-avancada) e marquei a dúvida no próprio lead-score.
   - *Recomendação:* usar o preço que estiver valendo no dia da resposta (preco-avancada até a 10ª venda, preco-avancada-depois a partir dela).
   - *Se decidir diferente:* se o cálculo ficar sempre no preco-avancada, só sai a nota do lead-score.

4.8. **A regra 4 do CLAUDE.md e a Regra de pausas.**
   - *Dúvida:* a regra 4 diz "Perguntar antes de qualquer decisão que não esteja escrita". A Regra de pausas, agora permanente, diz para não parar e seguir o caminho mais conservador.
   - *O que fiz:* acrescentei a Regra de pausas e a regra 10, sem mexer na regra 4.
   - *Recomendação:* acrescentar à regra 4: "fora de uma fila de trabalho; numa fila, vale a Regra de pausas".
   - *Se decidir diferente:* fica como está, e a Regra de pausas vale como exceção, sem estar escrita como exceção.

4.9. **A "única urgência" da ficha e o contador de escassez da Análise.**
   - *Dúvida:* ficha-de-fatos#urgencia diz que a única urgência é o preço até a 10ª venda. A #93 cria um contador de escassez para as análises gratuitas.
   - *O que fiz:* pus uma observação em urgencia: ela vale para a oferta da Avançada, e a escassez da Análise gratuita segue ficha-de-fatos#barra-de-resgates. Também registrei que a contagem real depende do banco do funil-01 (#90, pendente).
   - *Recomendação:* confirmar a leitura.
   - *Se decidir diferente:* urgencia passa a citar as duas escassezes no próprio valor.
