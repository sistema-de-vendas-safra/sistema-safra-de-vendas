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

## Etapa 6 · Planta do banco

Detalhe em dados/planta/planta.md.

6.1. **Quem aprova a planta, e ela pode se apoiar em documentos pendentes e desatualizados?**
   - *Dúvida:* a planta serve ao funil-01 (#90) e usa o lead score (#98), os dois pendentes do Júnior e do Euclides; e, com a versão 4 de `lacunas`, os dois ficaram desatualizados (6.9).
   - *O que fiz:* status rascunho, com só o Otávio em aprovado_por (otavio: pendente). A planta é do Otávio, porque descreve o sistema que só ele acessa no MVP (#95). Usei do funil-01 e do lead-score só o que não muda com a lacuna nova.
   - *Recomendação:* o Otávio aprova a planta depois de atualizar o depende_de do funil-01 e do lead-score (6.9); ela continua rascunho enquanto a #90 estiver pendente.
   - *Se decidir diferente:* se o Júnior e o Euclides tiverem de aprovar, entram em aprovado_por e o status vira pendente-aprovacao.

6.2. **Como ligar a visita à pessoa, se a visita acontece antes do contato.**
   - *Dúvida:* a planta tem de guardar a origem da primeira visita, mas na visita a pessoa ainda não deixou contato. Um identificador guardado no navegador pediria consentimento antes da visita.
   - *O que fiz:* a página cria um código de sessão na visita e o esquece quando a aba fecha, sem guardar nada no navegador. No fim do quiz, o banco liga a visita e o início do quiz à pessoa. Visita sem fim de quiz fica sem pessoa.
   - *Recomendação:* aceitar. Quem visita hoje e volta amanhã por outro link aparece como duas visitas, e a primeira origem é a da visita em que terminou o quiz; é um erro pequeno e não pede consentimento extra.
   - *Se decidir diferente:* se quiser a primeira visita de verdade em várias sessões, é preciso guardar um identificador no navegador, com aviso e consentimento, e o texto do quiz-01 e de `provas-e-conformidade` muda.

6.3. **A mesma pessoa que refaz o quiz.**
   - *Dúvida:* nada diz se quem refaz o quiz vira um lead novo. E o garçom só grava: não pode ler o banco para saber se a pessoa já existe.
   - *O que fiz:* o próprio banco reconhece o telefone ou o e-mail já gravado e liga os eventos novos à mesma pessoa; os campos de primeira visita não são reescritos.
   - *Recomendação:* aceitar, porque mantém a chave do garçom só de gravação e permite a regra de 5.7 (quem refaz não conta de novo).
   - *Se decidir diferente:* se cada quiz for um lead novo, a planilha do SDR pode receber a mesma pessoa duas vezes e a contagem das análises gratuitas sobe mais rápido.

6.4. **As etiquetas nos eventos que não acontecem numa página, e a Meta.**
   - *Dúvida:* todo evento leva funil, entrega, versão da entrega e UTM, mas os eventos do SDR, da reunião e da venda não acontecem em nenhuma entrega. A planilha do SDR não é uma entrega de entregas/. E a tabela de origens do funil-01 usa só utm_source e utm_campaign.
   - *O que fiz:* esses eventos levam a entrega e a versão do quiz que a pessoa respondeu e a origem da primeira visita dela. A planilha não entra no catálogo. Usei só os dois campos de UTM do funil-01; não criei outros.
   - *Recomendação:* aceitar, porque assim toda venda volta até a peça e o link que a trouxeram. Quando a Meta sair da reserva, decidir se entra uma etiqueta a mais para separar os anúncios.
   - *Se decidir diferente:* se a planilha for tratada como entrega, ela ganha id e versão no catálogo e os eventos do SDR passam a apontar para ela, perdendo a ligação direta com a peça de origem.

6.5. **Venda e perda como tipos próprios, e o motivo da perda.**
   - *Dúvida:* a etapa pede eventos de mudança de status, venda e perda, e o funil-01 trata venda como estágio e perdido como estado. Nada diz se a perda guarda motivo.
   - *O que fiz:* venda e perda são tipos próprios, que também levam o estágio venda e o estado perdido; reuniao_marcada e reuniao_realizada levam o estágio agendado e realizado. A perda não guarda motivo, porque um texto livre pode trazer dado pessoal sem necessidade.
   - *Recomendação:* aceitar. Se o motivo da perda for útil para a leitura da safra, criar uma lista fechada de motivos, nunca texto livre.
   - *Se decidir diferente:* com motivo, o evento perda ganha um campo, e a planilha do SDR, uma coluna com a lista.

6.6. **As chaves e o que cada uma abre.**
   - *Dúvida:* o funil-01 deixou para esta etapa a chave da planilha do SDR. O garçom precisa conferir a entrega e a versão; o contador da página precisa ler um número; a regra é uma chave por uso, com a menor permissão.
   - *O que fiz:* o garçom grava pessoas e eventos e lê só o catálogo de entregas, que não tem dado pessoal. A planilha tem duas chaves: uma só lê os leads das faixas A e B, com os campos da lista "O que vai para a planilha"; outra só grava os eventos do SDR com valores da lista fechada. O contador tem uma chave que só lê a contagem. O painel só lê agregados. O catálogo de entregas é gravado pelo Otávio a cada versão publicada. Lead que retirou o consentimento não vai para a planilha. Nenhuma chave foi criada nem registrada em conexoes.md.
   - *Recomendação:* aceitar, e registrar cada chave em conexoes.md quando for criada, depois do detector de chaves.
   - *Se decidir diferente:* se a volta do status passar pelo garçom, a chave do garçom ganha a gravação dos eventos do SDR, e o funil-01 (passo 5) muda; se o garçom não puder ler nada, o catálogo vai para a configuração dele, e cada versão publicada pede uma troca ali.

6.7. **A contagem das análises gratuitas sem a regra de 5.7.**
   - *Dúvida:* a contagem sai do banco (ficha-de-fatos#barra-de-resgates), mas o que conta como análise usada é a pergunta 5.7, ainda aberta.
   - *O que fiz:* não guardei nenhum campo de "gratuita usada". A contagem é uma conta sobre os eventos fim_quiz, refeita a cada leitura; assim, a regra pode ser decidida depois sem perder nada. Até a decisão, o contador não vai ao ar.
   - *Recomendação:* decidir 5.7 antes de o contador ir ao ar; a planta já permite a recomendação de 5.7 (uma por pessoa que terminou o quiz, sem contar quem refaz).
   - *Se decidir diferente:* se contar só quem passou pela porta, a conta passa a olhar também a faixa do lead score; nenhum campo novo é preciso. Quando a cobrança da Análise for desenhada (5.9), a planta ganha o que for preciso para saber se a Análise de cada pessoa foi gratuita ou paga.

6.8. **Prazo de guarda e apagamento.**
   - *Dúvida:* nenhuma fonte diz por quanto tempo se guardam os dados dos leads nem como se atende quem pede para apagar.
   - *O que fiz:* registrei a lacuna nova outros-23 em `lacunas` (que sobe para a versão 4), na parte 3, porque não é conflito entre fontes e a parte 1 é só do CTX; ela aponta para conflito-09, por causa do texto de consentimento do quiz-01. Na planta, até a decisão, nada é apagado automaticamente e o banco não guarda nada além dos campos desenhados. Criei o campo consentimento_retirado_em, e quem retira o consentimento sai da planilha do SDR.
   - *Recomendação:* decidir o prazo com a revisão de advogado (lacuna-10) antes da primeira publicação do quiz-01, e pôr o prazo no texto de consentimento se o advogado pedir.
   - *Se decidir diferente:* se a lacuna couber melhor na parte 2 (afeta o quiz), ela muda de número e de lugar, sem mudar o conteúdo.

6.9. **A cascata da versão 4 de `lacunas`.**
   - *Dúvida:* a regra de versionamento marca como desatualizado tudo que depende da versão anterior. Além do funil-01, dependem de `lacunas` v3: `glossario`, `lead-score`, `entregas-do-servico`, `promessa`, `produto`, `tom-de-voz`, `metodo`, `provas-e-conformidade`, `persona` e `design-system`. `mecanismo` e `oferta` dependem de versões mais antigas e já estavam desatualizados.
   - *O que fiz:* marquei os onze com desatualizado: true, sem mudar conteúdo nem versão, como manda nucleo/regras/versionamento.md, "Cascata".
   - *Recomendação:* em cada um, só atualizar a versão de `lacunas` no depende_de para 4 e voltar desatualizado para false, subindo a versão como correção de forma: a lacuna nova (outros-23) não muda nada do que eles dizem. Enquanto isso, eles não servem de base para entrega nova, o que trava as etapas 8 a 10 se não forem atualizados antes.
   - *Se decidir diferente:* se o Otávio preferir que só o funil-01 fique marcado, os outros dez voltam a desatualizado: false sem mudar a versão.

## Etapa 7 · Pauta de aprovação para o Júnior e o Euclides

Detalhe em entregas/pautas/pauta-aprovacao-01.md.

7.1. **Os números na pauta impressa.**
   - *Dúvida:* a pauta cita preço, prazos, vagas e quantidades só pelo campo da ficha de fatos (por exemplo, "ficha de fatos, arrependimento"). Numa reunião, o Júnior e o Euclides vão precisar ver os valores, e alguns itens só fazem sentido com eles (prazo do reembolso, semana da entrega 1, quantidade de calls em grupo, preço da Essencial). Pelo mesmo motivo, os nomes de opção que trazem um prazo no próprio nome (a proposta de instalação rápida da Essencial, em ficha-de-fatos#downsell-desenho; o plano de ação do quiz; a duração do serviço, em ficha-de-fatos#duracao) ficaram descritos sem o número.
   - *O que fiz:* nenhum valor copiado; no corpo, o item diz só que o valor está na ficha de fatos, e o nome do campo vai na linha Referência do item.
   - *Recomendação:* na hora de imprimir, gerar uma folha anexa, fora do repositório ou como exportação, com os valores lidos da ficha de fatos na versão do dia, campo por campo; a pauta continua sem valores.
   - *Se decidir diferente:* se os valores puderem ir no corpo da pauta, ela ganha os números e passa a ser revista a cada versão nova da ficha (a cascata já marca isso pelo depende_de).

7.2. **O reembolso pela Hotmart e a Análise na primeira semana.**
   - *Dúvida:* o reembolso sem justificativa (ficha-de-fatos#arrependimento, #91) e a entrega 1 na semana 1 (ficha-de-fatos#quando-entrega-1, #72) se sobrepõem: o cliente pode receber a Análise completa e pedir o dinheiro de volta dentro do prazo. Nenhum documento da base registra solução. Também não está escrito se a Análise cobrada depois das gratuitas (ficha-de-fatos#analise-valor) passa pela Hotmart e tem o mesmo reembolso.
   - *O que fiz:* o item 11 descreve o risco, diz "nenhuma opção registrada na base", traz a posição registrada do Otávio sobre o reembolso (#91) e deixa o risco com "o Otávio decide antes da reunião". Nenhuma solução proposta na pauta.
   - *Recomendação:* levar o risco à reunião só como risco e levar o mesmo ponto ao advogado que vai revisar o contrato (lacuna-10, outros-18), antes da primeira venda. Qualquer solução que mexa no momento da entrega 1 mexe na #72, que é do Júnior com o Otávio, e volta para a aprovação deles.
   - *Se decidir diferente:* se o Otávio trouxer uma proposta de solução, ela entra no item 11 como opção registrada (com decisão ou proposta numerada) e a pauta sobe de versão.

7.3. **A ordem e os grupos da pauta.**
   - *Dúvida:* o pedido dá a ordem do que trava o funil-01; o resto não tem ordem escrita.
   - *O que fiz:* Parte 1 (trava o funil-01): #90, lead score, consentimento e promessa do quiz, plano de ação do quiz, promessa, design system, Análise e reunião, nome e assinatura, credenciais com as tentativas até abandonado (ficha-de-fatos#tentativas-ate-abandonado; o funil-01 usa esse número, 5.3) e parcelamento (a pergunta "Posso parcelar?" está nas perguntas frequentes da landing-page-01, conflito-15). Parte 2 (primeira venda e agenda): reembolso, engenharia reversa e teto de reuniões (com os demais pontos da lacuna-01 como "a validar"), meta e verba de mídia (lacuna-19), calls em grupo, Essencial, oferta e Ficha do Serviço, decisões da oferta. Parte 3 (conteúdo e postura). Parte 4, adiados (#84). Parte 5, para informar (#92 e #93). A Essencial (último passo do funil-01) e o teto de reuniões do Júnior (agenda de quem liga) ficaram na Parte 2, porque o funil pode começar sem eles.
   - *Recomendação:* aceitar; se a reunião for curta, levar só as Partes 1 e 5 e o item 11.
   - *Se decidir diferente:* muda só a ordem e a numeração dos itens.

7.4. **O que ficou fora da pauta.**
   - *Dúvida:* algumas lacunas citam o Júnior ou o Euclides sem que eles decidam: o "AVS" citado pelo Júnior e o fechamento que o Euclides queria fazer na reunião de 07/11 (lacuna-22, quem decide não registrado); o contrato (lacuna-10, quem decide não registrado); a margem do cliente para o lucro por lead (lacuna-09); a validação com donos (lacuna-25, entrou só como "próximo passo" no item 16); o prazo de guarda dos dados (outros-23, advogado); F7, o curso e a Júlia (outros-13, confirmação sem dono).
   - *O que fiz:* deixei fora, porque nenhuma fonte diz que são do Júnior ou do Euclides nem traz a marca "levar ao Júnior".
   - *Recomendação:* acrescentar à pauta, como perguntas de esclarecimento, o "AVS" e o fechamento do Euclides de 07/11, que só eles podem explicar.
   - *Se decidir diferente:* entram como itens novos na Parte 3, com "o Otávio decide antes da reunião".

7.5. **As opções dos itens 3 e 4 (quiz) e as respostas do item 25.**
   - *Dúvida:* conflito-09 e conflito-10 não têm proposta escrita, só os dois lados. No quiz, as regras de provas-e-conformidade (decidido pelo Otávio) pedem consentimento e vedam percentual, mas a posição do Otávio sobre o quiz em si não está registrada.
   - *O que fiz:* no item 3, em vez de opções, "os dois lados registrados" (o quiz como está, sem publicar, ou ajustado às regras), com "o Otávio decide antes da reunião" e a nota de que as regras já decididas apontam para o ajuste. No item 4, "aprovar, ajustar ou recusar". No item 25 (confirmações do Júnior), não há decisão: as respostas possíveis (confirmar, corrigir ou dizer que não há comprovante) não vêm da base e o item diz isso.
   - *Recomendação:* o Otávio registrar, antes da reunião, a posição de ajustar o quiz às regras (consentimento com a finalidade e sem promessa percentual), porque manter impede a publicação.
   - *Se decidir diferente:* muda só a linha da posição do Otávio nos itens 3 e 4.

7.6. **A pergunta 4.5 antes da reunião.**
   - *Dúvida:* a 4.5 (a demonstração com os números do prospect continua na reunião de venda ou passa para o quiz) é do Otávio, mas, se passar para o quiz, o mecanismo muda de sentido e volta para a aprovação do Júnior e do Euclides.
   - *O que fiz:* não pus a 4.5 como item da pauta; o item 16 traz uma linha "Atenção": a oferta precisa ser atualizada nesse ponto, e a opção é "aprovar depois da atualização". A posição do Otávio no item é só a registrada (ele aprovou a oferta em 08/11).
   - *Recomendação:* o Otávio responder a 4.5 antes da reunião; se a demonstração passar para o quiz, entra um item novo na Parte 1 (aprovação do mecanismo revisto).
   - *Se decidir diferente:* sem a 4.5 respondida, o item 16 vai à reunião só como leitura, sem pedir aprovação da oferta.

7.7. **Quem aprova a pauta, e para onde vão as respostas.**
   - *Dúvida:* a pauta não é decisão; é o roteiro da reunião.
   - *O que fiz:* aprovado_por só com o Otávio (pendente); status rascunho. A seção "Depois da reunião" diz que as respostas voltam para decisoes com a palavra de quem decidiu.
   - *Recomendação:* o Otávio aprova a pauta antes da reunião; depois dela, um prompt próprio registra as respostas (decisões novas ou aprovações das pendentes, como #85, #89, #90 e #98) e aplica a cascata.
   - *Se decidir diferente:* se a pauta tiver de ser aprovada também pelos dois, eles entram em aprovado_por e o status vira pendente-aprovacao.

7.8. **Os itens 23 e 26 e o bônus da Análise da base.**
   - *Dúvida:* a fala do Júnior (outros-19) e a tese da Triad (#82) são decisões do Otávio confirmadas ou validadas pelo Júnior; o valor apresentado do bônus da Análise da base (4.3) foi recomendado para esta pauta.
   - *O que fiz:* pus os três na pauta (itens 23, 26 e dentro do 17), com "o Otávio decide antes da reunião".
   - *Recomendação:* manter a fala do Júnior e o bônus; levar a tese da Triad só depois de o texto existir.
   - *Se decidir diferente:* sai o item 26, ou os três, sem mudar o resto.

7.9. **Por que o nome público da Análise, a duração e quem conduz a reunião com o Júnior entram na pauta.**
   - *Dúvida:* pelo conflito-02, quem decide é o Otávio (#59 a #62 são dele). A recomendação do plano aprovado de levar aos dois (prompts/02-plano-da-base-resposta.md) e o documento mestre online (decisão 4) falam só do valor da Análise, que a #92 já decidiu. Nenhuma fonte manda o nome, a duração ou quem conduz para o Júnior e o Euclides.
   - *O que fiz:* mantive o item 7 na pauta, com "o Otávio decide antes da reunião" e a justificativa de que a reunião de venda é feita pelo Júnior (#51; ficha-de-fatos#quem-faz-a-reuniao): a duração e quem conduz mexem na agenda dele. Tirei a atribuição ao plano e ao documento mestre.
   - *Recomendação:* o Otávio decidir o nome público sozinho, antes da reunião, e levar aos dois só a duração e quem conduz, porque dependem da agenda do Júnior.
   - *Se decidir diferente:* se o Otávio decidir os três sozinho, o item 7 sai da Parte 1 e vira um item da Parte 5 (para informar); se quiser os três com os dois, o item fica como está.

## Etapa 8 · Briefing da landing-page-01

Detalhe em entregas/landings/landing-page-01/briefing.md.

8.1. **A meta da landing não está registrada.**
   - *Dúvida:* a etapa pede a meta da landing pela ficha de fatos. A ficha tem a meta de vendas do funil (ficha-de-fatos#meta-de-vendas) e as metas por etapa do método (ficha-de-fatos#metas-por-etapa), que começam no captado, depois do quiz. Nenhum campo diz quantos visitantes devem começar ou terminar o quiz.
   - *O que fiz:* escrevi que a meta não está registrada. Não inventei número. A medição fica pelos eventos visita e inicio_quiz da planta, por versão da landing.
   - *Recomendação:* não fixar meta agora. Medir a passagem de visita para início do quiz e de início para fim do quiz por versão e por origem, e fixar a meta (um campo novo na ficha) só depois de uma amostra mínima, que também precisa ser decidida, como foi feito para o lead score (outros-22).
   - *Se decidir diferente:* se o Otávio der uma meta agora, ela entra como campo novo na ficha de fatos (a ficha sobe de versão) e o briefing passa a citá-la.

8.2. **A #68 ("nada de entrega na primeira etapa") e a seção 05, que mostra as entregas.**
   - *Dúvida:* a #68 diz "nada de GSAAS, gerente e entrega na primeira etapa". A aplicação do registro de 08/11 (prompts/04, seção 2) manda a landing mostrar as entregas de ficha-de-fatos#numero-de-entregas, com as Sessões de Comando e a Análise na semana de ficha-de-fatos#quando-entrega-1. Não está escrito se "entrega" na #68 quer dizer as entregas do serviço ou outra coisa.
   - *O que fiz:* mantive a seção 05 com as entregas, como manda a instrução mais nova e explícita do Otávio, e marquei a tensão no briefing.
   - *Recomendação:* confirmar que a #68 não proíbe mostrar as entregas na página (o wireframe as mostra desde antes de 08/11) e, se for o caso, registrar a leitura na própria linha da #68.
   - *Se decidir diferente:* a seção 05 sai da página ou vira só a linha do tempo sem as entregas, e a seção 09 perde a resposta "É mais uma mentoria?" com as entregas.

8.3. **O hero com a promessa bloqueada.**
   - *Dúvida:* o título do Hero A usa a #33 e a promessa nova é a #85, as duas pendentes do Júnior e do Euclides. O título do Hero B é texto do Otávio (04/11) e não é a promessa, mas o subtítulo do B adapta a #33. Sem o A, o teste A/B que o Júnior aprovou deixa de existir.
   - *O que fiz:* título e subtítulo do A e o subtítulo do B ficaram como placeholder marcado ({{BLOQUEADO: #85}}). O título do B ficou registrado como disponível, sem escolher se vai sozinho.
   - *Recomendação:* no rascunho da etapa 9, usar o título do Hero B como hero único provisório, com subtítulo neutro sem promessa, e retomar o teste A/B quando a #85 for aprovada (o A recebe a versão fria).
   - *Se decidir diferente:* se o Otávio preferir esperar a #85, o hero inteiro fica como placeholder e a etapa 9 escreve só o resto da página.

8.4. **O texto dos botões.**
   - *Dúvida:* o texto do botão decidido pelo Otávio é um dos valores concorrentes de ficha-de-fatos#analise-nome-publico, campo em conflito.
   - *O que fiz:* o briefing pede texto neutro, que diga a ação (começar as perguntas do diagnóstico) sem o nome da Análise, marcado com o campo.
   - *Recomendação:* decidir o nome público antes da etapa 9 (pauta, item 7, recomendação de 7.9: o Otávio decide sozinho). Com o nome, o botão volta ao texto decidido ou ao nome escolhido.
   - *Se decidir diferente:* se o texto decidido do botão puder ficar mesmo com o nome em conflito, ele entra literal e o placeholder sai só do botão.

8.5. **O destino dos botões.**
   - *Dúvida:* no wireframe, todos os botões levam à seção 08 (âncora) e só o botão de lá leva ao quiz. O funil-01 diz só que a landing leva ao quiz. A ação esperada é começar o quiz.
   - *O que fiz:* mantive o desenho do wireframe como partida: um destino só para todos os botões (a seção 08), e da seção 08 para o quiz-01.
   - *Recomendação:* manter, porque a seção 08 explica o que o quiz entrega e quem conversa com o Júnior; a etapa 10 confere se o caminho ficou longo no celular.
   - *Se decidir diferente:* se os botões forem direto ao quiz, a seção 08 vira uma seção como as outras, e a etapa 10 muda o caminho até o quiz.

8.6. **O vídeo na página (#51).**
   - *Dúvida:* a #51 (Júnior, decidida) diz "quiz e página com vídeo"; a #66 fala de versões com e sem VSL. O wireframe não tem vídeo, e o funil-01 não fala de vídeo na landing.
   - *O que fiz:* não reservei lugar de vídeo no briefing e registrei o ponto nos bloqueios.
   - *Recomendação:* decidir se a landing-page-01 tem vídeo e onde (hero ou seção própria). Os roteiros de VSL estão no acervo, fora da base, e a voz passa pela junior-neves-voice.
   - *Se decidir diferente:* se tiver vídeo, o briefing ganha um lugar para ele, a etapa 10 trata o carregamento, e o roteiro vira uma entrega própria.

8.7. **As credenciais enquanto não há comprovante.**
   - *Dúvida:* a seção 04 inteira depende de comprovantes e autorizações (conflito-05; #44). Mesmo a linha "você não me conhece, mas conhece o que eu fiz" só vai com comprovante (provas-e-conformidade, regra jurídica 2).
   - *O que fiz:* seção oculta, inteira.
   - *Recomendação:* avaliar uma versão mínima: só os dois nomes (Junior Neves e Euclides Vieira), o papel de cada um no serviço (o que a ficha já diz das Sessões de Comando e das calls em grupo) e a citação do Euclides escrita pelo Otávio, sem a assinatura que cita terceiro e número. Sem números, sem nomes de terceiros, sem fotos com terceiros.
   - *Se decidir diferente:* se o Otávio aceitar a versão mínima, a etapa 9 a escreve; se não, a seção continua oculta até a pauta com o Júnior e o Euclides (item 9).

8.8. **"Para quem é" sem o critério.**
   - *Dúvida:* o critério de qualificação está em conflito (ficha-de-fatos#criterio-de-qualificacao) e a proposta do lead score está pendente (#98). Alguns itens da seção não são corte de número, mas postura (decide sobre o comercial; quer instalação, não conteúdo; topa abrir os números; não quer que vendam no lugar dele; não busca resultado garantido).
   - *O que fiz:* bloqueei todo item que é corte de faturamento, valor de venda, tamanho do time, volume de leads ou tipo de venda; deixei os de postura como direção.
   - *Recomendação:* aceitar. Os itens de postura não atropelam nenhuma das cinco versões do critério.
   - *Se decidir diferente:* se o Otávio quiser a seção inteira bloqueada, ela fica oculta até a #98.

8.9. **O valor da Análise depois das gratuitas, na página.**
   - *Dúvida:* o valor está decidido (ficha-de-fatos#analise-valor), mas a cobrança ainda não foi desenhada (5.9). O preço riscado e o rodapé "passa a custar" só valem se o valor passar a ser cobrado de verdade (provas-e-conformidade, CDC e CONAR).
   - *O que fiz:* preço riscado e rodapé como seção oculta até a cobrança existir. A gratuidade fica, pelos campos da ficha.
   - *Recomendação:* desenhar a cobrança (5.9) antes de mostrar o valor; quando existir, o rodapé volta com {{ficha-de-fatos#analise-valor}} e {{ficha-de-fatos#analises-gratuitas}}.
   - *Se decidir diferente:* se o Otávio quiser o valor na página desde já, ele entra pela ficha, com o compromisso registrado de cobrar depois das gratuitas.

8.10. **A conversa com o Júnior não é para todos.**
   - *Dúvida:* a seção 08 do wireframe tem três passos, o último a conversa com o Júnior. No funil-01, só as faixas A e B do lead score vão para a fila do SDR; eliminatórios e faixa C vão para a nutrição. O FAQ diz que a pergunta que faltar se faz ao Júnior.
   - *O que fiz:* o passo 3 e a frase do FAQ ficam com texto neutro, que não promete a conversa a todos; o diagnóstico, sim, é para todos (#92; funil-01).
   - *Recomendação:* dizer na página que a conversa com o Júnior é para quem o perfil encaixa, sem dizer o critério enquanto ele estiver em conflito.
   - *Se decidir diferente:* se todos forem para a conversa, muda a porta de qualificação do funil-01 e do lead score, não só a página.

8.11. **A parte de cada fase de cor na linha do tempo.**
   - *Dúvida:* a #80 decide as fases de cor, e o wireframe e a F25 dão a parte de cada fase na linha do tempo. Esse número é fato fora da ficha (tom-de-voz; glossário, verbete Fases de cor).
   - *O que fiz:* o briefing pede as fases de cor sem a parte de cada uma.
   - *Recomendação:* se a parte de cada fase for para a página, registrá-la como campo da ficha de fatos, com a fonte F25.
   - *Se decidir diferente:* sem o campo, a linha do tempo mostra as três fases só pela ordem e pelo que acontece em cada uma.

8.12. **"Reunião de safra" nas seções 03b, 05 e 06.**
   - *Dúvida:* a linha da Inteligência Humana (03b), o cartão do Treinamento para Otimização da Conversão (05) e uma tela do painel (06) falam em "reunião de safra" ou "reunião semanal de safra", o rito semanal do formato anterior a 07/11. No formato de 07/11, o rito semanal são as calls em grupo (#78), e "reunião" é palavra queimada para a persona.
   - *O que fiz:* marquei as três como texto a trocar, com texto neutro até a troca, e pus o ponto na tabela de bloqueios.
   - *Recomendação:* usar o nome do rito de ficha-de-fatos#calls-em-grupo e a análise de calls (ficha-de-fatos#analise-de-calls) nas três.
   - *Se decidir diferente:* se a reunião de safra continuar como rito próprio do cliente (com o time dele, sem a Triad), ela precisa entrar em entregas-do-servico ou produto antes de ir para a página.

8.13. **As vagas na página.**
   - *Dúvida:* o FAQ do wireframe tem a pergunta das vagas (que diz "as dez começam juntas" e revela o preço) e o número de vagas entre os destaques. A Oferta saiu da página em 03/11 ("preço e condições ficam para a conversa"), e a única urgência da oferta é a de ficha-de-fatos#urgencia.
   - *O que fiz:* a pergunta das vagas e o número de vagas saem da página.
   - *Recomendação:* manter fora: as vagas são condição da oferta e ficam para a conversa com o Júnior.
   - *Se decidir diferente:* se as vagas voltarem, a pergunta é reescrita pelo registro (ficha-de-fatos#vagas, sem início comum, #65) e sem preço.

8.14. **Contato no clique e WhatsApp no topo: da landing ou do quiz-01?**
   - *Dúvida:* o Júnior pediu (03/11) capturar o contato no clique, "senão a gente perde ele"; o wireframe sugere pedir o WhatsApp no topo da página intermediária. Nenhuma fonte diz que isso fica no quiz-01. O funil-01 ("Caminho do dado", passos 1 e 2) diz que a landing só lê a etiqueta e que quem envia o contato, com o consentimento, é o quiz.
   - *O que fiz:* a landing não colhe contato; o pedido do Júnior e a sugestão do WhatsApp ficaram registrados como assunto do quiz-01, com a fonte no funil-01.
   - *Recomendação:* manter, porque assim o consentimento LGPD fica num lugar só (conflito-09) e a página não fala com o banco.
   - *Se decidir diferente:* se a landing pedir o contato no clique, ela ganha um campo com texto de consentimento, o garçom passa a receber dado pessoal da landing, e funil-01 e a planta do banco mudam.

8.15. **O passo "Traga os números" e o título da seção 08.**
   - *Dúvida:* o wireframe tem um passo 2 próprio ("Traga os números", do último mês) e um título que pede os números do último mês. No funil-01, os números do funil são respondidos dentro do quiz, e o quiz-01 ainda não foi escrito (o período que ele pede não está registrado).
   - *O que fiz:* fundi o passo 2 no passo 1 (responder o quiz com os números do funil). O título fica como partida para a etapa 9, condicionado ao que o quiz-01 pedir.
   - *Recomendação:* aceitar a fusão; conferir o título contra o quiz-01 quando ele existir.
   - *Se decidir diferente:* se o pedido de números for um passo à parte (por exemplo, enviado depois do quiz), a seção 08 volta a ter três passos antes da conversa e o caminho do funil-01 ganha esse passo.

## Etapa 9 · Copy da landing-page-01

Detalhe em entregas/landings/landing-page-01/copy.md.

9.1. **O hero enquanto a #85 estiver pendente.**
   - *Dúvida:* a 8.3 recomendou usar o título do Hero B como hero único provisório, mas o Otávio ainda não respondeu.
   - *O que fiz:* o Hero A ficou inteiro como {{BLOQUEADO: #85}}. O B ficou com o título do Otávio (04/11), marcado [PENDENTE: 8.3] e [PROVA REAL] (ver 9.14). O subtítulo do B, que adapta a #33, ficou {{BLOQUEADO: #85}}, como manda o briefing. Proposta de subtítulo neutro, fora da copy, para o Otávio decidir: "Antes de comprar mais lead, veja onde estão os que você já pagou." (só palavras do comprador, sem número nem resultado).
   - *Recomendação:* aceitar o B como hero único até a #85, com a proposta de subtítulo, e retomar o teste A/B quando a #85 for aprovada.
   - *Se decidir diferente:* se o Otávio aceitar a proposta, ela entra no lugar do placeholder; se preferir esperar a #85, o hero inteiro vira placeholder.

9.2. **O texto dos botões.**
   - *Dúvida:* o nome público da Análise está em conflito (ficha-de-fatos#analise-nome-publico), e o botão decidido pelo Otávio usa um dos nomes.
   - *O que fiz:* "Quero responder as perguntas do meu funil" no bloco de chamada e na seção 08, e "Responder as perguntas" no cabeçalho, todos com {{BLOQUEADO: ficha-de-fatos#analise-nome-publico}}. Evitei "diagnóstico" (gasto pelo mercado, `tom-de-voz`) e qualquer termo do método.
   - *Recomendação:* decidir o nome público (pauta, item 7) e voltar ao botão decidido ou ao nome escolhido.
   - *Se decidir diferente:* só muda o texto do botão, em todos os blocos de uma vez.

9.3. **Como dizer a gratuidade.**
   - *Dúvida:* a gratuidade está decidida (ficha-de-fatos#analise-gratuidade), com fim real em ficha-de-fatos#analises-gratuitas, e o Otávio pediu em 03/11 para dizê-la como promoção de lançamento. "Gratuita" (feminino) se refere à Análise, cujo nome está em conflito. Não está escrito se a página deve dizer o número de análises gratuitas.
   - *O que fiz:* "Sem custo na promoção de lançamento", sem o número e sem o nome.
   - *Recomendação:* manter sem o número até o contador da #93 aparecer; quando ele aparecer, o número entra junto, por {{ficha-de-fatos#analises-gratuitas}}.
   - *Se decidir diferente:* se o número for dito desde já, a linha vira "Sem custo nas primeiras {{ficha-de-fatos#analises-gratuitas}}" e não muda mais nada.

9.4. **A voz do Júnior contra a base (choque de skill).**
   - *Dúvida:* o `tom-de-voz` manda a voz final passar pela junior-neves-voice. A skill pede primeira pessoa do Júnior, gíria ("foda", "pica", "marechal"), "Fechou?" e autoridade com feitos próprios, e tem "mentoria" e "curso" no vocabulário dele. A base proíbe "mentoria" e "curso" para a oferta (#53), credencial sem comprovante (`provas-e-conformidade`) e pede reduzir a ansiedade do Rafa; e quem assina a página está em conflito (conflito-07).
   - *O que fiz:* venceu a base. Da skill ficou o ritmo (frase curta, pergunta seguida da resposta, "a gente", número no lugar de adjetivo, negações na língua do dono). Ficaram fora a primeira pessoa do Júnior, a gíria, os tiques orais e qualquer feito autodeclarado.
   - *Recomendação:* decidir quem assina (pauta, item 8). Se for o Júnior em primeira pessoa, passar a copy pela skill de novo, só nos textos de corpo, e mostrar ao Júnior.
   - *Se decidir diferente:* se a página falar como o Júnior, os "a gente" viram "eu" onde couber, e entram as marcas orais leves; a lista de proibições continua valendo.

9.5. **O padrão de landing de captura contra a base (choque de skill).**
   - *Dúvida:* a landing-page-copy pede formulário, micro-prova social (depoimento, número de usuários), urgência com prazo, números quebrados no título e inversão de risco. A base proíbe formulário na landing (8.14; `funil-01`), depoimento e número sem comprovante, prazo e contagem regressiva, e garantia.
   - *O que fiz:* venceu a base. Sem formulário, sem prova social (só [PROVA REAL]), sem urgência além da gratuidade, sem garantia. Da skill ficaram: um destino só, botão em primeira pessoa com verbo de ação, redutor de risco embaixo do botão (a gratuidade) e o "para quem não é" como filtro.
   - *Recomendação:* aceitar. Quando houver o primeiro caso com autorização, a página ganha a prova que falta.
   - *Se decidir diferente:* qualquer prova ou urgência nova precisa primeiro de comprovante ou de campo na ficha.

9.6. **As trocas de "reunião".**
   - *Dúvida:* "reunião" é palavra queimada para a persona (`tom-de-voz`, resposta 5), e o wireframe a usa no diagrama da seção 02, no funil de exemplo da seção 08, na tela "Reunião de safra" e no passo da conversa com o Júnior. A troca do rito está na 8.12, sem resposta.
   - *O que fiz:* "mede agendamentos", "conversa marcada que não aconteceu", "Comparecimento" e "Fechamento" na seção 02 (nomes de etapa do método, no corpo); "conversa" na seção 08; a tela do painel ganhou o nome provisório "Prioridade da semana", com o mesmo conteúdo, marcada [PENDENTE: 8.12].
   - *Recomendação:* aceitar as trocas; dar o nome final da tela junto com a resposta da 8.12.
   - *Se decidir diferente:* se "reunião" puder aparecer no corpo, as trocas voltam ao texto do wireframe sem mexer na estrutura.

9.7. **Textos do wireframe suavizados.**
   - *Dúvida:* alguns textos do wireframe (todos sugestão, não confirmada) encostam em promessa ou em palavra a evitar.
   - *O que fiz:* troquei, sem mudar a estrutura: o título das barras ("multiplica o lucro" virou "muda a conta"); o título do diagrama ("Sistema de Vendas multiplica vendas" virou "Ações isoladas somam peças soltas. Sistema de Vendas liga as etapas.") e a saída de "baixa eficácia" e "máxima eficácia", alegações absolutas sem prova; o subtítulo da Big Idea ("sacar o dinheiro que já existe no seu cemitério de leads" virou "Uma parte delas está parada nos leads que ninguém voltou a procurar"); nas colunas da seção 02, "nenhum lead sai da lista antes de dizer sim ou não" virou "cada lead é trabalhado até dizer sim ou não", para não encostar na frase-assinatura (#85); o "tudo" do sobretítulo do painel; "dois dashboards" virou "um painel com duas visões" (a base descreve um painel, `entregas-do-servico` seção 5; as duas visões são as abas do wireframe); "Feedback" virou "Retorno"; "Não é falta de lead" virou "Não é comprar mais lead" (encostava na frase gasta "o problema não é lead"); "o pior Sistema de Vendas que existe" virou "o jeito mais caro de vender"; "quem fecha só fecha a venda" saiu (tese do closer, #87, lacuna-08); "ninguém vira perdido sem dizer não", "até o sim ou o não" e "toda semana" sem campo saíram; "ninguém volta a falar" virou "quase ninguém"; "Leads perdidos" virou "Leads que ficaram pelo caminho"; a comparação das barras fica marcada para a revisão de advogado; "treina" virou "prepara"; "Sem planilha" saiu do painel, porque a planilha é um dos acessos que o cliente libera (ficha-de-fatos#insumo-do-cliente). No FAQ do caso, a resposta segue a troca pelo caso documentado de `oferta` (opcional, números agregados, nome da empresa ou só o setor à escolha do cliente, e o depoimento em vídeo "seja qual for o resultado"), sem a sessão extra, porque a página não fala da oferta. "CRM" ficou no corpo: o "não falar em CRM" de 22/10 vale para a Big Idea dirigida ao comprador, com alcance não registrado.
   - *Recomendação:* aceitar; conferir "CRM" no corpo.
   - *Se decidir diferente:* cada trecho volta ao texto do wireframe isoladamente.

9.8. **Os nomes das entregas por referência.**
   - *Dúvida:* os nomes das entregas são campo da ficha (ficha-de-fatos#nomes-das-entregas) e precisam aparecer um por um.
   - *O que fiz:* criei a notação {{ficha-de-fatos#nomes-das-entregas:n}} para o item n da lista. "Sessões de Comando com o Junior Neves" ficou literal, porque é nome decidido (#83) e não valor de campo.
   - *Recomendação:* aceitar a notação para as próximas entregas.
   - *Se decidir diferente:* os nomes entram literais, exatamente como na ficha, e a cascata passa a depender da revisão manual.

9.9. **As fases de cor sem a parte de cada uma.**
   - *Dúvida:* a 8.11 segue sem resposta, e o que acontece em cada fase vem da F25 (via wireframe).
   - *O que fiz:* três fases pela ordem, com uma linha cada (o time estranha, o time começa a acreditar, o sistema rodando), sem percentual e sem cor, marcadas [PENDENTE: 8.11].
   - *Recomendação:* confirmar as três linhas com o Júnior, que decidiu as fases (#80); a cor é do design.
   - *Se decidir diferente:* se a parte de cada fase entrar, vira campo da ficha e a linha do tempo cita o campo.

9.10. **O Euclides nas calls em grupo.**
   - *Dúvida:* o formato das calls em grupo, conduzidas pelo Júnior e pelo Euclides, está decidido (ficha-de-fatos#calls-em-grupo; #78, #79). Mas a promessa de 08/11 (#85, pendente) transforma a presença do Euclides em compromisso público de agenda, e o CTX chama essa agenda de segundo gargalo.
   - *O que fiz:* as calls em grupo saem só do campo, por {{ficha-de-fatos#calls-em-grupo:formato}} (que traz a frequência e os dois condutores), sem frase própria que prometa além dele; marcadas [PENDENTE: 9.10] na seção 05 e no FAQ; a quantidade ficou bloqueada. Por isso o Euclides está em aprovado_por.
   - *Recomendação:* confirmar com o Euclides antes de publicar, já que a página vincula pelo art. 30 do CDC.
   - *Se decidir diferente:* sai o nome do Euclides e fica "conduzidas pelo Junior Neves".

9.11. **As credenciais continuam ocultas.**
   - *Dúvida:* a 8.7 propôs uma versão mínima da seção 04, sem resposta.
   - *O que fiz:* não escrevi a versão mínima; a seção ficou oculta, só com a lista do que falta.
   - *Recomendação:* responder a 8.7; se a versão mínima for aceita, ela é escrita na próxima versão da copy.
   - *Se decidir diferente:* com a versão mínima aceita, a copy sobe de versão com a seção 04 escrita.

9.12. **Dizer na página que o time do cliente executa.**
   - *Dúvida:* a persona pergunta se o fornecedor executa ou "passa tarefa" (critério 2), e o registro diz que o time do cliente executa a infraestrutura a partir da tarefa do Júnior (ficha-de-fatos#execucao-do-time; #74). Dizer isso pode esfriar o Rafa; esconder contraria a conformidade.
   - *O que fiz:* disse, na entrega 2 e no FAQ ("O seu time"), sem esconder.
   - *Recomendação:* manter; o "sistema instalado no prazo" e as Sessões de Comando mostram quem comanda.
   - *Se decidir diferente:* a frase da entrega 2 pode ir para o FAQ, mas não pode sair da página.

9.13. **Placeholders com só uma parte do campo.**
   - *Dúvida:* alguns campos têm mais de um valor dentro (o percentual e a fonte de Deming; o tempo de cada cultura; o formato e a quantidade das calls em grupo; a quantidade e as datas das Sessões de Comando; o volume da análise de calls; o prazo da execução do time; o limite da barra), e a frase precisa de uma parte só.
   - *O que fiz:* criei a notação {{ficha-de-fatos#campo:parte}}, explicada em "Como ler" com a lista das partes usadas e o que cada uma traz (inclusive grupo-de-suporte:canal, sem a IA de consulta, adiada pela #84, e sistema-instalado:dia; sessoes-de-comando:quando só com os marcos decididos; execucao-do-time:prazo só com a duração), ao lado da :n da 9.8. As frases foram ajustadas para que cada placeholder encaixe sem repetir palavra (por exemplo, "São {{ficha-de-fatos#numero-de-entregas}}, instaladas...").
   - *Recomendação:* aceitar a notação; se ela ficar, a ficha pode ganhar subcampos com nome fixo na próxima versão, para a cascata achar cada parte.
   - *Se decidir diferente:* sem subcampos, cada placeholder cita o campo inteiro, e a frase em volta é reescrita para receber o valor completo.

9.14. **O título do Hero B pede prova.**
   - *Dúvida:* "Resgate o lucro que está oculto no seu negócio" é texto decidido pelo Otávio (04/11), mas "lucro" pede a margem do cliente (lacuna-09) e o benefício pede prova de vendas de leads que nunca disseram não (`provas-e-conformidade`; `mecanismo`).
   - *O que fiz:* mantive o texto e marquei [PROVA REAL: vendas colhidas de leads que nunca disseram não, num cliente fundador], citando a lacuna-09 nas Notas.
   - *Recomendação:* manter no rascunho; antes de ir ao ar, ou o primeiro caso documentado, ou a troca de "lucro" por algo que o dono confere sozinho (por exemplo, "as vendas que estão paradas nos leads que você já pagou").
   - *Se decidir diferente:* se o Otávio liberar o título sem prova, a marca sai, e a revisão de advogado decide.

9.15. **Os rótulos de fase "Análise" e "Fechamento" na seção 05.**
   - *Dúvida:* a fase "Análise" do wireframe se confunde com a Análise da porta de entrada (o diagnóstico do quiz, #92), e "Fechamento" é nome de etapa do funil (ficha-de-fatos#metas-por-etapa); a base só diz que a entrega 8 fecha o serviço.
   - *O que fiz:* "Ponto de partida" no lugar de "Análise" e "Encerramento" no lugar de "Fechamento". "Preparo do solo" e "Colheita e plantio" ficaram, como nomes de fase do método no corpo.
   - *Recomendação:* aceitar os dois rótulos; se o método tiver nomes oficiais para a primeira e a última fase, eles entram no lugar.
   - *Se decidir diferente:* os rótulos voltam ao wireframe, com uma linha explicando que a entrega 1 não é a leitura gratuita do quiz.

9.16. **"Colheita" no título do quadro da horta.**
   - *Dúvida:* o título do quadro ("Cada lead é uma planta. A venda é a colheita.") vem antes das plantas aparecerem, e a regra de 22/10 tira "colheita" de título antes de o mecanismo ser explicado.
   - *O que fiz:* troquei por "Cada lead é uma planta. Cada planta tem o seu tempo." "Colhido" fica só dentro do quadro, com a analogia na tela, e "colheita" só no corpo (o rótulo de fase "Colheita e plantio" e a resposta "A colheita é sua", depois do mecanismo).
   - *Recomendação:* aceitar.
   - *Se decidir diferente:* se o Otávio entender que o mecanismo já está explicado no texto acima do quadro, o título do wireframe volta.

9.17. **O lado da Gestão por Safra no quadro da horta.**
   - *Dúvida:* o wireframe mostra, do lado da Gestão por Safra, os três leads "colhidos (vendidos)" e "Nada fica na mesa". Na analogia isso soa como promessa de que todo lead vira venda, e nenhum caso comprova vendas de leads que nunca disseram não (`provas-e-conformidade`).
   - *O que fiz:* os três leads aparecem "trabalhados até o dia" de cada cultura, e o placar diz "3 de 3 trabalhados no tempo de cada um". O lado da Gestão Mensal ficou como no wireframe (1 de 3 colhido, dois ficaram na mesa), porque descreve o problema.
   - *Recomendação:* aceitar no rascunho; quando houver o primeiro caso documentado, avaliar se a analogia pode voltar a mostrar a venda.
   - *Se decidir diferente:* o texto do wireframe volta, e o quadro passa pela revisão de advogado junto com a promessa.
