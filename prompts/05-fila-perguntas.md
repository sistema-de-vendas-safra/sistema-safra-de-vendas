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

## Etapa 5 · Funil-01

Detalhe em funis/funil-01/funil.md.

5.1. **Quem já aprovou o funil-01?**
   - *Dúvida:* a #90 é do Otávio e está pendente do Júnior e do Euclides. O documento do funil é novo e ninguém o leu ainda.
   - *O que fiz:* status pendente-aprovacao, com otavio, junior e euclides como pendente em aprovado_por.
   - *Recomendação:* o Otávio aprova o documento com data; o Júnior e o Euclides aprovam junto com a #90, na pauta da etapa 7.
   - *Se decidir diferente:* se o Otávio quiser o funil só como seu, aprovado_por fica só com ele, e o status continua pendente-aprovacao enquanto a #90 estiver pendente.

5.2. **O que conta como cada estágio no funil-01, e qual é o relógio.**
   - *Dúvida:* o método dá os nomes (captado, pré-qualificado, agendado, realizado, venda), mas não diz o que cada um é neste funil. O relógio é contado da entrada do lead (#41), sem dizer qual é a entrada nem o prazo do funil-01.
   - *O que fiz:* propus captado = terminou o quiz com contato; pré-qualificado = faixa A, ou faixa B depois da confirmação do SDR; agendado, realizado e venda pela reunião com o Júnior. Deixei o relógio sem prazo.
   - *Recomendação:* aceitar o mapa; a entrada do lead é o fim do quiz; o prazo do relógio é calibrado depois das primeiras safras, como manda o método.
   - *Se decidir diferente:* muda a tabela de estágios do funil e, com ela, o que cada meta por etapa mede.

5.3. **Os passos que o método não nomeia: nutrição, não compareceu, produto vendido e número de tentativas.**
   - *Dúvida:* eliminatórios e faixa C vão para a nutrição, que não tem nome de estágio nem de estado, nem canal ou conteúdo definidos. Quem falta à reunião não tem nome. A venda não diz se foi IASV ou Essencial. O número de tentativas até abandonado é o da operação do Júnior (ficha-de-fatos#tentativas-ate-abandonado), e o do funil-01 não está escrito.
   - *O que fiz:* não pus nenhum nome novo na lista fechada. Deixei marcados como proposta: "nutrição" para eliminatórios e faixa C; quem não compareceu continua em agendado, com estado tentativa; um campo de produto ao lado do estágio venda. Não escrevi número de tentativas.
   - *Recomendação:* aceitar "nutrição" como estado (é situação do contato, não posição no funil); aceitar o não comparecimento como agendado e tentativa; aceitar o campo de produto; usar o número da operação do Júnior só depois que ele confirmar que a regra segue valendo.
   - *Se decidir diferente:* a lista fechada do SDR e a planta do banco (etapa 6) mudam juntas.

5.4. **Onde mora a planilha do SDR, e quem a acessa.**
   - *Dúvida:* a regra de segurança diz que dado pessoal só fica no banco e na planilha do SDR, nunca no Google Drive. Uma planilha Google mora no Drive. E a #95 diz que só o Otávio acessa o sistema no MVP, mas o SDR precisa abrir a planilha.
   - *O que fiz:* escrevi que onde a planilha mora e como o SDR a acessa estão em aberto. Não escolhi ferramenta.
   - *Recomendação:* decidir se a planilha do SDR é exceção registrada à regra do Drive (com acesso só do SDR e do Otávio) ou se fica em outro lugar; e registrar que a #95 vale para o sistema, com o SDR acessando só a planilha.
   - *Se decidir diferente:* muda o passo 4 do caminho do dado e, se for exceção, nucleo/regras/seguranca.md e conexoes.md sobem de versão.

5.5. **As etiquetas dos links e a etiqueta fora da lista.**
   - *Dúvida:* o prompt pede nomes fixos para as origens, sem dizer quais parâmetros usar nem o que fazer com etiqueta desconhecida.
   - *O que fiz:* propus duas etiquetas, utm_source com o nome da origem e utm_campaign com funil-01. Etiqueta fora da lista não é gravada como origem (o lead entra com a origem em branco).
   - *Recomendação:* aceitar as duas etiquetas e a origem em branco, para não criar nomes novos sem querer.
   - *Se decidir diferente:* muda a tabela de origens; se a etiqueta desconhecida tiver de ser guardada, a planta do banco ganha um campo para ela.

5.6. **A palavra-chave dos reels e a ferramenta que manda a mensagem.**
   - *Dúvida:* a palavra-chave não está decidida. A ferramenta que lê o comentário e manda a mensagem com o link não está em conexoes.md, e a Meta está fora do MVP lá.
   - *O que fiz:* descrevi o mecanismo, deixei a palavra-chave e a ferramenta em aberto.
   - *Recomendação:* o Otávio escolhe uma palavra curta, sem acento, que caiba no tom dos reels; e registra a ferramenta em conexoes.md antes de ligar, com a menor permissão que resolve.
   - *Se decidir diferente:* se não houver ferramenta no MVP, a linha de reels fica reservada, como a de meta-ads.

5.7. **O que conta como uma análise gratuita usada no contador.**
   - *Dúvida:* ficha-de-fatos#barra-de-resgates conta "as análises gratuitas reais já usadas", sem dizer o que é uma análise usada no funil-01.
   - *O que fiz:* não escrevi a regra no funil; marquei como proposta.
   - *Recomendação:* conta uma por pessoa que terminou o quiz e recebeu o diagnóstico, inclusive eliminatórios e faixa C (todos recebem a Análise, #92); quem refaz o quiz não conta de novo.
   - *Se decidir diferente:* se contar só quem passou pela porta, o contador sobe mais devagar e o campo da ficha ganha essa definição.

5.8. **A Implementação Essencial: quem oferece e quando.**
   - *Dúvida:* a ficha diz só que ela é oferecida depois do não à Avançada. Quem oferece e se é na mesma reunião ou num contato seguinte só aparece em `oferta`, que está desatualizada. O preço está em conflito e o desenho, em revisão.
   - *O que fiz:* escrevi só "depois do não, e só depois dele", com o preço bloqueado. Não me apoiei em `oferta`.
   - *Recomendação:* decidir junto com a atualização de `oferta` (4.5) e com lacuna-03.
   - *Se decidir diferente:* o passo 6 do caminho do lead ganha quem e quando.

5.9. **O que acontece depois da última análise gratuita.**
   - *Dúvida:* depois de ficha-de-fatos#analises-gratuitas, a Análise é cobrada (ficha-de-fatos#analise-valor). O funil não diz como o lead paga nem em que ponto do quiz.
   - *O que fiz:* citei os campos e deixei a cobrança fora do caminho do lead.
   - *Recomendação:* desenhar a cobrança antes de o contador chegar perto do limite, numa versão 2 do funil.
   - *Se decidir diferente:* nada muda agora; o caminho do lead ganha um passo quando a cobrança for desenhada.
