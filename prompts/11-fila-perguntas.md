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

## Etapa 31

31.1. **O texto da caixa de aceite única, para você conferir.**
   - *Dúvida:* a 13.4 pede o texto final da caixa no tom da casa (base/tom-de-voz.md), cobrindo o diagnóstico e o contato por WhatsApp (mensagem e ligação) e por e-mail, listado para você conferir.
   - *O que foi feito:* em quiz-01-copy v2 (seção 7 e M16) ficou assim. Texto de antes da caixa: "Antes do seu contato, o combinado. Seu nome, e-mail e WhatsApp servem para duas coisas: mandar o seu diagnóstico e alguém da nossa equipe falar com você sobre ele, por mensagem ou ligação no WhatsApp e por e-mail. Nada além disso. A caixa abaixo já vem marcada. Se preferir, desmarque: você vê o diagnóstico aqui na tela, e nada é enviado para a gente. Você pode retirar o aceite ou pedir para apagar seus dados quando quiser. Tudo explicado na política de privacidade." Caixa, já marcada: "Aceito receber o meu diagnóstico e o contato da equipe por WhatsApp, por mensagem ou ligação, e por e-mail." Aviso quando desmarcada: "Sem o aceite, o diagnóstico aparece só aqui na tela, e nada é enviado." A caixa preenche consentimento_whatsapp e consentimento_email com o mesmo valor e o mesmo texto (#104).
   - *Recomendação:* conferir e aprovar antes da etapa 34, que leva o texto à página.
   - *Se decidir diferente:* muda só o texto em quiz-01-copy (M16) e, na etapa 34, a constante do consentimento da página; os dois campos do banco continuam com o mesmo valor.

31.2. **Quem desmarca a caixa: os campos de contato e as frases que prometem cópia ou contato.**
   - *Dúvida:* com a caixa desmarcada, nada vai ao banco nem à equipe (30.3). O quiz ainda pede nome, e-mail e WhatsApp, e várias frases continuam prometendo cópia ou contato (a ajuda da tela de contato, "Vai para o seu e-mail e WhatsApp." no painel, a nota de "Agora não", os botões "Quero marcar uma conversa" e "Tenho interesse").
   - *O que foi feito:* o botão continua pedindo nome, e-mail e WhatsApp válidos, como hoje. Só a M21 (a cópia no relatório) ganhou a variante para quem desmarca, marcada [PENDENTE: 30.3]; as outras frases ficaram listadas numa nota da seção 7 da copy, sem texto novo.
   - *Recomendação:* com a caixa desmarcada, não pedir e-mail nem WhatsApp, que não seriam usados, e esconder nesse caminho as frases de cópia e os botões de contato. Decidir junto com a 30.3, antes da etapa 34.
   - *Se decidir diferente:* se os campos continuarem obrigatórios, a política já cobre o caso (nada é guardado), e só as frases precisam da variante.

31.3. **A promessa de percentual volta ao texto do quiz.**
   - *Dúvida:* a #110 manda não tirar a promessa de percentual do fim do quiz. A copy v1 e a página v2 já estavam sem ela (M19), e a etapa 34 manda deixar o texto da página "como está", salvo a caixa. Em base/lacunas.md, o conflito-19 dizia que a copy sai sem o percentual.
   - *O que foi feito:* "como está" foi lido como o quiz do Júnior, que é o que os itens 3 e 4 da pauta chamavam de "o quiz como está hoje". Na copy v2, a M19 foi desfeita: a fala 2 do plano de 90 dias voltou ao texto dele, com "em até [X]%". A página não foi mexida. O conflito-19 continua bloqueado em lacunas v6, com a #110 registrada e o item 29 ainda com os sócios; provas-e-conformidade v4 registra a exceção.
   - *Recomendação:* confirmar. Se confirmado, a etapa 34 devolve à página a fala 2 e o cálculo do [X] da fonte.
   - *Se decidir diferente:* se "como está" for a página de hoje, a M19 volta como na v1 da copy, e a exceção #110 vale só para a posição do aceite.

31.4. **"Todo o dinheiro" e "sem precisar mudar uma vírgula no seu marketing" na promessa mantida.**
   - *Dúvida:* a #108 manda manter as promessas do projeto anterior como estão. O texto de 08/11 traz "todo o dinheiro", que o CTX §8, provas-e-conformidade e tom-de-voz vedam como alegação absoluta (CONAR), e "sem precisar mudar uma vírgula no seu marketing", que promessa registra como ponto frágil (conflito-03). Diferente da #110 no quiz, a #108 não fala de exceção. O subtítulo do Hero B promete também "vender mais vezes para o mesmo cliente", que depende da #16, do Júnior.
   - *O que foi feito:* conflito registrado em promessa v4 com os dois lados e bloqueado para ir ao ar. Na copy da landing v4, os dois trechos do Hero A ficaram escritos e marcados [PENDENTE: 31.4], e o trecho do Hero B ficou {{BLOQUEADO: #16}}. Nenhum lado escolhido.
   - *Recomendação:* usar na versão que for ao ar os ajustes já sugeridos em promessa ("o dinheiro"; "sem aumentar a verba de marketing"), ou registrar os dois trechos como exceção decidida, como na #110.
   - *Se decidir diferente:* com a exceção, os dois trechos entram em "Exceções decididas pelo Otávio" de provas-e-conformidade e as marcas saem numa correção de forma; com os ajustes, mudam o Hero A e promessa.

31.5. **A regra de #79 depois da #108.**
   - *Dúvida:* pela CTX §3, a regra de #79 "cai se a promessa for aprovada". A #108 faz a promessa valer por decisão sua, mas não diz se isso conta como a aprovação que derruba a #79, que mexe na agenda do Júnior e do Euclides.
   - *O que foi feito:* produto v4 mantém a #79 valendo até a resposta, com nota que cita a #108 e a 30.4.
   - *Recomendação:* responder junto com a 30.4; enquanto o compromisso de agenda não for confirmado pelos dois (pauta, item 5, "Para confirmar"), a #79 continua.
   - *Se decidir diferente:* se a #79 cair já, a presença do Júnior e do Euclides nas calls em grupo vira compromisso público, e mudam o produto, a promessa e o contrato (lacuna-10).

31.6. **Peças da landing fora do topo que dependiam da #85.**
   - *Dúvida:* a #108 fala do topo. Fora dele continuam presas à #85 (pendente-aprovacao no registro, pergunta 30.4) a frase-assinatura (seção 03), "não é com alguém da equipe" (05), "gerente comercial" (#86) e "eu mando no seu comercial".
   - *O que foi feito:* as quatro continuam {{BLOQUEADO: #85}} no briefing e na copy da landing v4.
   - *Recomendação:* decidir junto com a 30.4; se a #85 passar a decidido, a frase-assinatura e "não é com alguém da equipe" entram na próxima versão da copy.
   - *Se decidir diferente:* ficam bloqueadas até o Júnior e o Euclides aprovarem (pauta, item 5).

31.7. **Dois topos na landing: a 10.14 de volta.**
   - *Dúvida:* a copy tem o Hero A (a promessa de 08/11 para o público frio) e o Hero B (o seu título de 04/11). A #108 manda a 10.14 voltar como pergunta, sem teste ligado; não está escrito qual topo aparece enquanto não há teste.
   - *O que foi feito:* os dois estão escritos na copy v4; na estrutura v4 vai ao ar só o B, como hoje nas variantes, e o A fica oculto. Nenhum teste ligado.
   - *Recomendação:* decidir a 10.14 antes de ligar o teste: cada topo vira uma versão própria da entrega landing-page-01 no catálogo, ou ganha um campo no evento. Até lá, só o B.
   - *Se decidir diferente:* se o A for o topo único, a ordem da estrutura troca a linha 2 pela 2b; se o teste ligar já, a planta ou o catálogo mudam nas etapas 32 a 34.

31.8. **Texto novo do passo 3 da seção 08 da landing.**
   - *Dúvida:* o passo 3 precisou de texto novo para a Call de Direcionamento e a demonstração (4.5): "Se o seu perfil encaixa, a gente liga para marcar a {{nome}}. {{duração}} com o {{condutor}}, com os seus números na mesa: ele mostra como o sistema ficaria no seu comercial."
   - *O que foi feito:* escrito no tom da casa, sem preço, sem prazo de ligação e sem critério, com nome, duração e condutor pela ficha.
   - *Recomendação:* conferir. Se preferir, a frase da demonstração sai e ficam só nome, duração e condutor.
   - *Se decidir diferente:* muda só o passo 3, nas duas variantes, na etapa 34.

31.9. **Partes novas de campos da ficha usadas na copy da landing.**
   - *Dúvida:* a copy v4 usa as partes duracao:dias, nome-call-de-venda:nome, duracao-call-de-venda:duracao e quem-faz-a-reuniao:condutor (notação da 9.13), que a ficha não tem como subcampos de nome fixo.
   - *O que foi feito:* as quatro estão definidas em "Como ler" da copy; a ficha não foi mexida (não é desta etapa).
   - *Recomendação:* criar os subcampos na próxima versão da ficha de fatos.
   - *Se decidir diferente:* cada placeholder cita o campo inteiro, e a frase em volta é reescrita.

31.10. **A leitura da 8.12: "reunião de safra" sai.**
   - *Dúvida:* na página de decisões, a 8.12 está como "'Reunião de safra' vira o nome das calls em grupo? Tela 'Prioridade da semana'?", com "Sim para os dois". A frase curta pode ser lida ao contrário. A recomendação completa (prompts/05-fila-perguntas.md, 8.12) é trocar a "reunião de safra" pelo nome de ficha-de-fatos#calls-em-grupo e pela análise de calls, porque "reunião" é palavra queimada para a persona; a 9.6 dá à tela o nome "Prioridade da semana".
   - *O que foi feito:* aplicada a recomendação completa em tom-de-voz v4, GLOSSARY v4 (_Avoid_ "reunião de safra") e briefing e copy da landing v4: "reunião de safra" não entra na página; a tela do painel se chama "Prioridade da semana".
   - *Recomendação:* confirmar essa leitura. Na revisão, a pergunta completa em prompts/06-para-o-otavio.md (8.12 com 9.6) é "usamos o nome das calls em grupo e da análise de calls? E a tela do painel fica com o nome Prioridade da semana?", e a recomendação é "sim para os dois": a leitura aplicada é a dela, não a inversa.
   - *Se decidir diferente:* se "Reunião de safra" for o nome público das calls em grupo, o nome entra no campo calls-em-grupo da ficha, sai do _Avoid_ do glossário e do tom-de-voz e volta ao corpo da seção 05 da copy, nunca em título nem chamada.

31.11. **O mecanismo ficou aprovado depois da troca de nome.**
   - *Dúvida:* o mecanismo foi aprovado pelo Júnior e pelo Euclides (#48). A 4.5 dizia que, se a demonstração continuasse na call, a mudança no mecanismo "pode ser só forma".
   - *O que foi feito:* tratado como forma: mudaram o nome do lugar (Call de Direcionamento), a nota da #92 e a pendência do condutor, resolvida pela ficha. Status e datas ficaram como estavam (aprovado).
   - *Recomendação:* manter, porque nada do que a #48 aprovou mudou de sentido.
   - *Se decidir diferente:* o mecanismo volta para pendente-aprovacao (otavio 2026-11-09; junior e euclides pendente) e entra um item na Parte 1 da pauta.

31.12. **A data da sua aprovação na oferta.**
   - *Dúvida:* na oferta, a 4.5 é forma, e pela regra a forma mantém as datas; mas a v2 também acrescenta a 5.9, a 9.3 e a 15.14, que são decisões suas de 09/11.
   - *O que foi feito:* otavio 2026-11-09 na oferta v2; Júnior e Euclides seguem pendentes.
   - *Recomendação:* manter.
   - *Se decidir diferente:* a data volta a 2026-11-08, sem outra mudança.

31.13. **O que é "o mais restritivo dos dois cortes" (14.2).**
   - *Dúvida:* a 14.2 diz que, até a reunião, o quiz usa o mais restritivo dos dois cortes (o do Júnior e a faixa da nota), mas não diz como combiná-los.
   - *O que foi feito:* lead-score v3, lacunas v6 (conflito-16) e o briefing e a copy do quiz v2 usam a frase da recomendação. A leitura de trabalho (vai para a fila só quem passa nos dois) não foi escrita como regra.
   - *Recomendação:* confirmar essa leitura antes da etapa 34, que implementa na página.
   - *Se decidir diferente:* muda só a regra de fim na página do quiz (etapa 34).

31.14. **O corte mais restritivo e a nota do "Tenho interesse".**
   - *Dúvida:* com o corte mais restritivo, não é qualificado quem falha em qualquer um dos dois cortes. A copy do quiz tem duas notas para o "Tenho interesse": a do lado do Júnior promete WhatsApp, a do lado do lead score não promete nada.
   - *O que foi feito:* as duas continuam escritas, e o final continua {{BLOQUEADO: conflito-16}}. Nenhuma escolhida.
   - *Recomendação:* na etapa 34, usar a nota do lado do lead score, que não promete ligação (13.7), enquanto valer o corte mais restritivo.
   - *Se decidir diferente:* entra a nota do Júnior, e quem liga passa a ter de chamar no WhatsApp quem clicou, mesmo fora da fila.

31.15. **O nome e os valores do clique no fim do quiz (18.4).**
   - *Dúvida:* a 18.4 manda registrar o que a pessoa clicou no fim do quiz, mas não dá o nome do tipo de evento nem os valores.
   - *O que foi feito:* na planta v4, o tipo é interesse_pos_relatorio, o nome recomendado na 14.15, e o campo é clique_fim_quiz, com a lista proposta quero-conversa, chamar-whatsapp, tenho-interesse e agora-nao, um valor por botão do fim do quiz. A planilha-sdr v2 ganha a coluna só de leitura, e os roteiros v2, uma abertura para quem pediu a conversa.
   - *Recomendação:* aceitar os nomes, para a etapa 32 usá-los na migração.
   - *Se decidir diferente:* mudam o nome do tipo e a lista na planta, na migração, no garçom, na página do quiz e na coluna da planilha; a abertura dos roteiros fica.

31.16. **Mensagens por e-mail de quem liga.**
   - *Dúvida:* a #105 deixa contatar por e-mail quem aceitou, mas não existe roteiro de e-mail, e a lista fechada de canal (telefone, whatsapp) não tem e-mail.
   - *O que foi feito:* os roteiros v2 dizem que o e-mail é permitido, mas que, até haver mensagens escritas, o contato é por ligação e WhatsApp. O canal não ganhou o valor email.
   - *Recomendação:* escrever as mensagens de e-mail numa versão nova dos roteiros só se o e-mail for usado; nesse caso, email entra no canal da planta, do banco e da planilha.
   - *Se decidir diferente:* com e-mail já, a planta, o banco (por migração), a planilha e os roteiros sobem de versão juntos.

31.17. **A faixa B que fica em dúvida vai para nutrição.**
   - *Dúvida:* a 15.11 (complemento da 5.3, aceita) diz "esse lead vai para nutrição"; a pergunta cobria dois casos, a faixa B que cai num eliminatório na confirmação e a que fica em dúvida.
   - *O que foi feito:* aplicado aos dois casos nos roteiros e na planilha v2: estágio captado, estado nutrição, sem marcar a Call.
   - *Recomendação:* confirmar.
   - *Se decidir diferente:* a faixa B em dúvida volta a {{a definir}} nos roteiros, ou ganha a regra que você escrever.

31.18. **A planta e o funil não declaram a copy do quiz.**
   - *Dúvida:* a caixa única e os botões do fim do quiz estão em quiz-01-copy, que continua marcada. Declarar quiz-01-copy em depende_de deixaria o funil-01 e a planta marcados.
   - *O que foi feito:* no funil v3 e na planta v4, a caixa é citada pela #104 e pela 31.1, e o texto que aparece na planta é exemplo. Nenhum dos dois declara quiz-01-copy; a planilha e os roteiros declaram.
   - *Recomendação:* manter: a planta descreve campos, e o texto que vale é o guardado letra por letra no banco.
   - *Se decidir diferente:* a planta e o funil ganham quiz-01-copy em depende_de e ficam marcados até a etapa 34.

31.19. **A pauta continua presa à página do quiz, e com ela a cadeia.**
   - *Dúvida:* a 13.15 tira da dependência da pauta a copy do quiz e as duas variantes, que ela só cita. A pauta ainda depende de quiz-01-pagina (item 29) e de funil-01-roteiros-sdr, os dois marcados até as etapas 33 e 34. Por isso a pauta, os dois briefings, as duas copys, a planilha e os roteiros do SDR e a política continuam marcados (regra 11.1).
   - *O que foi feito:* fiquei na letra da 13.15 e mantive quiz-01-pagina no depende_de da pauta.
   - *Recomendação:* estender a 13.15 à página do quiz, que a pauta também só cita. Assim a cadeia sai da marca quando a etapa 34 atualizar a página.
   - *Se decidir diferente:* tudo fica como está, e a cadeia só sai da marca depois das etapas 33 e 34.

31.20. **A planilha em Apps Script não tem etapa nesta fila.**
   - *Dúvida:* a planilha-sdr v2 e a planta v4 pedem, no Codigo.gs, a coluna 20 (clique_fim_quiz), o estado nutricao e a lista em produto (5.3, 18.4). As etapas 32 a 34 falam do banco, do garçom e das páginas, não do Apps Script.
   - *O que foi feito:* nada mudou em entregas/planilha-sdr-funil-01/ (código fora desta etapa); continua marcada.
   - *Recomendação:* acrescentar o Codigo.gs à etapa 33 (junto com a porta privada do garçom), com o teste local, e o passo de colar o código novo ao roteiro da etapa 35.
   - *Se decidir diferente:* a planilha continua com 19 colunas, sem nutrição nem produto, até uma fila própria; quem liga não vê o clique do fim do quiz.

31.21. **Os README das variantes e da página do quiz ficam para a etapa 34.**
   - *Dúvida:* o pedido inclui os README das variantes da landing e da página do quiz, só no cabeçalho e na documentação. O id de cada um é dividido com o index.html, que esta etapa não pode tocar, e o README descreve o código como ele está. O README da página do quiz ainda traz "Revisão de advogado do texto de consentimento" em "O que ainda falta para ir ao ar", contra a #103.
   - *O que foi feito:* os três README ficaram como estão (v2, desatualizado: true), para a versão do README não se separar da do index.html. Nada neles contradiz as decisões, salvo a linha do advogado, que sai na etapa 34.
   - *Recomendação:* na etapa 34, subir README e index.html juntos, com o texto novo, e trocar a linha do advogado pela linha única da #103.
   - *Se decidir diferente:* se a linha tiver de sair já, o README da página do quiz sobe para v3 sozinho, com uma nota de que o index.html continua na v2 até a etapa 34.

31.22. **Os itens 5 e 7 da pauta continuam na Parte 1, "Para decidir".**
   - *Dúvida:* a resposta faz do item 5 "Para confirmar" e do item 7 "Para informar". Os dois ganharam o rótulo no título, mas continuam na Parte 1 ("Para decidir · trava o funil novo"); a pauta tem uma Parte 5 ("Para informar").
   - *O que foi feito:* nada mudou de lugar, para não mudar a numeração que outros documentos citam (como na 17.6); o rótulo no título e a primeira frase de cada item dizem que não são para decidir.
   - *Recomendação:* manter no lugar, com o rótulo; na versão impressa, a ordem continua a mesma.
   - *Se decidir diferente:* o item 7 vai para a Parte 5 como letra (C), e o item 5 ganha uma parte própria "Para confirmar"; os números citados em outros documentos não mudam.
