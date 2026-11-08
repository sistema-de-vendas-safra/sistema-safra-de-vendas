# Etapa 4 · Decisões de 08/11 e lead score · resposta

Feito em 08/11/2026 a partir de prompts/04-decisoes-de-08-11-e-lead-score.md, dentro da fila de prompts/05-fila-de-trabalho.md. Nada foi alterado em fontes/. Nenhum push. A revisão e o commit ficam com o coordenador da fila.

## O que mudou

- **Decisões novas #92 a #98** em base/decisoes.md (v3): a Análise vira o diagnóstico do quiz, gratuita nas primeiras e cobrada depois (#92, decidido; informar o Júnior e o Euclides na pauta); o contador de escassez com contagem real (#93); o título do Deming fica como está (#94); só o Otávio acessa o sistema no MVP (#95); o projeto Estrategista de Negócio vira arquivo histórico (#96); o site fica aberto, risco aceito (#97); lead score como critério de qualificação (#98, pendente do Júnior e do Euclides). A #62 virou "substituída por #92"; a #49, a #59 e a #61 ganharam a #92 em "Revista por". Antes, decisoes passou da v1 para a v2 só para apontar a ficha v2 (resposta 1).
- **Ficha de fatos v3:** valor, gratuidade e conteúdo da Análise decididos; campo novo analises-gratuitas; barra-de-resgates com a regra da #93 (os números da landing ficam só como histórico de exemplo); campos novos credenciais-44 ([PROVA REAL]), tempos-da-analogia e deming-percentual (com "Adaptado de"); relogio-da-operacao sem o "confirmar com o Júnior" (vale a #41); numero-de-entregas decidido. Nome público, duração e quem conduz a reunião continuam em aberto.
- **Lead score:** base/lead-score.md v1, pendente-aprovacao, com eliminatórios, pontos, faixas, exemplo de conferência (96, faixa A) e revisão programada. Nenhum preço em reais: o custo mensal sai de ficha-de-fatos#preco-avancada.
- **Lacunas v3:** os itens da seção 2 marcados como resolvidos com a decisão de origem; conflito-01 aponta para o lead score; Análise, escassez e Deming resolvidos no que as decisões definem; site como risco aceito; itens 4, 6 e 8 da etapa 3 com "levar ao Júnior"; revisão futura do lead score (outros-22).
- **Cascata:** atualizados direto persona, produto, metodo, entregas-do-servico, promessa, tom-de-voz (regra de vocabulário, etapas e jargão, exceção do Deming), provas-e-conformidade, design-system (seção "Divergências decididas", com a grafia "Junior Neves") e GLOSSARY.md (sem a F11). Os status ficaram como estavam, porque nada do Júnior e do Euclides foi tocado. Mecanismo e oferta ficaram com desatualizado: true, sem mudar conteúdo (pergunta 4.5).
- **Regras e registro:** CLAUDE.md com a regra 10 (#96) e a Regra de pausas; conexoes.md com só o Otávio no acesso (#95); log.md com a entrada da etapa e as pendências de base, acesso e migração fechadas, e a do site como risco aceito.

## Perguntas para o Otávio

Pelo caminho mais conservador. As mesmas estão em prompts/05-fila-perguntas.md.

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
