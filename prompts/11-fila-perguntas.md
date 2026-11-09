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

## Etapa 32

32.1. **A migração usa o nome e a lista do clique que ainda são proposta (31.15).**
   - *Dúvida:* a 18.4 manda registrar o clique no fim do quiz; o nome do tipo (interesse_pos_relatorio), o do campo (clique_fim_quiz) e os quatro valores (quero-conversa, chamar-whatsapp, tenho-interesse, agora-nao) são a proposta da planta v4, ainda sem resposta (31.15).
   - *O que foi feito:* migracoes/001-v3.sql liga exatamente esses nomes, com a lista numa restrição própria (eventos_clique_lista), marcada como proposta no comentário.
   - *Recomendação:* responder a 31.15 antes da etapa 34, que põe os valores nos botões do quiz.
   - *Se decidir diferente:* uma migração nova (002) troca só a restrição eventos_clique_lista (e, se o nome do tipo mudar, eventos_tipo_lista e eventos_quem_grava); a planta, o garçom, o quiz e a planilha mudam junto. Nenhum clique de verdade existe ainda.

32.2. **Clique sem fim do quiz na sessão é recusado; a ligação com a pessoa é só pela sessão.**
   - *Dúvida:* a planta liga o clique à pessoa (o campo clique_fim_quiz tem dado pessoal ligado), mas não diz o que fazer com o clique de quem desmarcou a caixa e não enviou nada (30.3), nem com uma sessão em que duas pessoas diferentes terminaram o quiz (a mesma aba, dois contatos).
   - *O que foi feito:* caminho conservador em registrar_evento: o clique só entra se a sessão tiver o fim do quiz de uma pessoa só; sem fim do quiz, ou com duas pessoas, é recusado (22023). A visita e o início do quiz entram sempre, sem pessoa; se o fim do quiz da sessão já tiver chegado (envio fora de ordem), já nascem ligados a ela, e com duas pessoas na sessão nascem sem pessoa, sem escolher.
   - *Recomendação:* manter. Quem desmarca a caixa não deixa rastro de pessoa no banco, como a 30.3 pede; contar esses cliques sem pessoa, se for útil, é decisão junto com a 30.3.
   - *Se decidir diferente:* para guardar o clique sem pessoa, a regra do v2 que exige pessoa em todo tipo fora de visita, início e fim do quiz (eventos_check3) muda numa migração nova, e a função deixa de recusar.

32.3. **Na planilha vai o último clique, e só se ele vier antes da leitura.**
   - *Dúvida:* a planta manda à planilha "o que a pessoa clicou no fim do quiz", sem dizer qual clique, se houver vários, e a linha que já foi para a planilha não é atualizada (21.5).
   - *O que foi feito:* leads_para_planilha v3 manda o último clique da pessoa (de qualquer sessão), no momento da leitura. A margem de 1 minuto do banco (21.6) dá tempo para quem clica logo depois do diagnóstico; quem clica depois de a planilha ter lido a linha fica com o clique só no banco.
   - *Recomendação:* manter no protótipo; quando a volta do status existir, avaliar se a planilha passa a atualizar essa coluna (só de leitura) nas linhas que já existem.
   - *Se decidir diferente:* para o primeiro clique, muda só a ordem da subconsulta na função, numa migração nova; para atualizar linhas antigas, muda o Codigo.gs, que hoje nunca reescreve uma linha.

32.4. **O catálogo do protótipo não tem a linha da landing.**
   - *Dúvida:* o banco só aceita o evento se o par entrega e versão estiver no catálogo (18.8), e catalogo-prototipo.sql só tem o quiz-01 versão 1. O id já está decidido: landing-page-01, o nome da pasta da entrega (10.15, aceita; landing-page-01-estrutura v4, passo "Registra a visita", que diz que a linha entra junto com as etapas 32 e 34). Não está escrito qual versão a página manda (a página não tem ainda um cabeçalho de versão próprio; as variantes estão na versão 2 de cada README) nem se as duas variantes que estão no ar (/ e /b/) mandam o mesmo par, o que mistura as duas na medição (10.14, de volta como pergunta 31.7).
   - *O que foi feito:* nada no catálogo nem no catalogo-prototipo.sql, porque o número da versão e o jeito de separar as variantes não estão escritos. O teste da migração grava a linha landing-page-01 versão 1 só na memória dele. Revisão: a correção mínima, quando a versão estiver escrita, é acrescentar a linha ao catalogo-prototipo.sql (v2) com o mesmo `on conflict (id_entrega, versao) do nothing` da linha do quiz, sem apagar nada; ela não entra na migração, que é só de esquema e roda também num projeto novo de verdade. O ensaio (que hoje confere "catálogo com uma linha só") muda junto, na etapa 35.
   - *Recomendação:* na etapa 34, escrever a versão da página (versão 1 na primeira publicação que grava visita, recomendado) e se as variantes mandam o mesmo par, e acrescentar a linha ao catalogo-prototipo.sql nessa mesma etapa, para o roteiro da etapa 35 já rodar o arquivo com as duas linhas antes de publicar. **Bloqueia a etapa 35:** publicar a landing nova sem a linha deixa a visita sem gravar.
   - *Se decidir diferente:* sem a linha, toda visita volta recusada pela chave estrangeira (23503) e o painel não tem visitas; o quiz e a planilha não quebram. Se cada variante virar uma versão, entram duas linhas (landing-page-01 versões 1 e 2, por exemplo) em vez de uma.

32.5. **O Codigo.gs da planilha foi mexido, e só para a coluna do clique.**
   - *Dúvida:* a etapa 32 não fala da planilha em Apps Script (a 31.20 apontou a lacuna). A função da planilha passou a mandar clique_fim_quiz, que a planilha-sdr v2 pede numa coluna própria.
   - *O que foi feito:* Codigo.gs v2 (e o README e os testes dele) com a coluna clique_fim_quiz entre tentativas_feitas e estagio: a aba passa de 19 para 20 colunas, as do banco de 15 para 16. Teste local: 54 de 54. Nada mais mudou: o estado nutrição e a lista do produto continuam fora da lista da planilha (um estado nutricao vindo do banco aparece vazio na linha nova, como qualquer valor fora da lista). A aba de teste que já existe tem o cabeçalho de 19 colunas: a planilha v2 para nela com "cabeçalho diferente" até a aba ser renomeada e instalar() rodar de novo (README da planilha, "Atualizar da versão 1"). As duas ordens são seguras: a planilha v1 ignora o campo novo, e a v2 sem a migração deixa a coluna vazia.
   - *Recomendação:* aceitar, e pôr o resto da planilha-sdr v2 (nutrição, produto) na etapa 33 com a porta privada, como a 31.20 recomenda; o passo de colar o código novo e renomear a aba vai para o roteiro da etapa 35.
   - *Se decidir diferente:* para não mexer na planilha agora, o Codigo.gs volta à v1 pelo Git; o banco continua mandando o campo, que a v1 ignora.

32.6. **A ordem dentro da faixa (15.6) não está no banco nem na planilha.**
   - *Dúvida:* a 15.6 pede nota maior primeiro e, no empate, quem entrou antes. O pedido da etapa cita a ordem entre as mudanças possíveis no banco.
   - *O que foi feito:* nada no banco: leads_para_planilha continua entregando na ordem do cursor (gravado_em e id_pessoa), que é o que garante não perder nem repetir lead. O Codigo.gs acrescenta as linhas na ordem em que chegam; não ordena.
   - *Recomendação:* a ordem fica na planilha, numa versão nova do Codigo.gs (uma aba ou visão filtrada que ordena por faixa, nota e entrou_em, sem mexer na aba fila), junto com a 32.5.
   - *Se decidir diferente:* ordenar na função do banco quebraria o cursor; teria de vir com outro cursor, numa migração nova.

32.7. **O ensaio geral fica falso até a etapa 35, e o teste da migração mora em dados/banco/.**
   - *Dúvida:* o ensaio geral (nucleo/ferramentas/ensaio/ensaio.mjs, v2) aplica só o esquema v2, espera do conferir.sql "13 de 13" e da planilha 19 colunas. Com o conferir.sql v2 e o Codigo.gs v2, ele dá FALHOU nesses pontos. A etapa 35 é a que atualiza o ensaio.
   - *O que foi feito:* o ensaio não foi mexido. O teste da migração ficou em dados/banco/testar-migracao.mjs (usa o PGlite instalado em nucleo/ferramentas/ensaio/, sem rede), para não subir a versão do ensaio fora da etapa dele. Resultado: 64 de 64, conferir.sql 18 de 18. Rodado o ensaio com `--sem-wrangler` para ver o efeito: 90 de 108; os 18 FALHOU são só esses dois pontos (as linhas 4, 8 e 14 a 18 do conferir.sql, duas vezes, porque o ensaio não aplica a migração, e duas conferências da planilha, que esperam 19 colunas). O resto do ensaio, com o garçom v3 e o quiz, passou.
   - *Recomendação:* na etapa 35, o ensaio aplica o esquema v2, dados de teste, a migração duas vezes e o conferir.sql v2 ("18 de 18"), e espera 20 colunas na planilha; ou chama testar-migracao.mjs.
   - *Se decidir diferente:* se o ensaio tiver de continuar verde entre as etapas, a correção mínima no ensaio.mjs é aplicar a migração depois do esquema e trocar "13 de 13" e as 19 colunas, com o ensaio subindo para v3.

32.8. **Os nomes das duas respostas do histórico na planilha.**
   - *Dúvida:* a 15.4 diz que o histórico são as respostas de leads por mês e de CRM, sem dizer como aparecem. O quiz guarda o CRM como resposta própria (crm) e os leads por mês só dentro dos números do funil (a linha "Leads por mês"), e só quando a pessoa informa os números (no modo chute, não há esse número).
   - *O que foi feito:* respostas_a_confirmar da faixa b ganhou leads-por-mes (o valor da linha "Leads por mês", como a pessoa digitou) e crm (o texto da resposta). Sem número, leads-por-mes não vem.
   - *Recomendação:* aceitar. Se o rótulo "Leads por mês" mudar na página do quiz, a função precisa mudar junto.
   - *Se decidir diferente:* muda só a lista de respostas na função, numa migração nova.

32.9. **esquema.sql e o README do banco na versão 3, sem mudar o SQL do esquema.**
   - *Dúvida:* o esquema não pode ser reescrito para rodar no banco de verdade (21.11), mas rodar esquema.sql de novo depois da migração desfaria parte dela, e o README e o esquema dividem o id banco-rascunho (25.3).
   - *O que foi feito:* esquema.sql ganhou só um aviso no topo (é o v2 e não muda; a ordem esquema, migração, conferir; se rodar de novo, rodar a migração logo depois) e subiu para v3 junto com o README, como a 25.3 sugeria; nenhuma linha de SQL mudou e o depende_de dele continua o do SQL v2. O README v3 também aplica a 20.4 (regra-seguranca 3) e a 25.3 (linha do catalogo-prototipo.sql). A migração tem id próprio, banco-migracao-001, versão 1.
   - *Recomendação:* manter: o esquema v2 fica como registro do que rodou no Supabase, e cada mudança do banco vira uma migração numerada.
   - *Se decidir diferente:* se o esquema tiver de continuar v2 no cabeçalho, o aviso sai numa correção de forma e só o README fica v3.

32.10. **O produto não é obrigatório na venda.**
   - *Dúvida:* a planta v4 diz que o produto vai no evento venda, mas não diz se a venda sem produto entra, nem se o produto pode aparecer em outro tipo. O esquema v2 não confere "em que tipos" de nenhum campo.
   - *O que foi feito:* só a lista fechada (iasv ou essencial). A venda sem produto continua entrando, como no v2; nenhuma regra nova que a planta não escreve.
   - *Recomendação:* decidir quando a volta do status existir (é ela que grava a venda): exigir o produto na venda, porque só a IASV conta para as vagas (ficha-de-fatos#vendas-que-contam).
   - *Se decidir diferente:* com a regra, uma migração nova põe a restrição (tipo diferente de venda, ou produto preenchido); hoje não há venda gravada que a impeça.

32.11. **O cabeçalho da planilha v2 ainda cita garcom 2, regra-seguranca 2 e decisoes 4.** (revisão)
   - *Dúvida:* Codigo.gs e o README da planilha subiram para a v2 com a coluna nova, mas o depende_de só trocou funil-01-planilha-sdr e banco-rascunho; hoje são garcom 3, regra-seguranca 3 e decisoes 5. O código segue o contrato da porta privada, que não mudou do garçom 2 para o 3.
   - *O que foi feito:* nada; o documento já está com desatualizado: true, e a planilha-sdr v2 só foi aplicada em parte (32.5).
   - *Recomendação:* trocar as três versões na próxima versão da planilha (a que puser nutrição e produto), como forma, depois de conferir que nada do garçom 3, da regra 3 (20.1) e da #114 muda o código.
   - *Se decidir diferente:* trocar agora, como forma, na mesma v2 ainda não commitada; nenhuma linha de código muda.

32.12. **conexoes.md diz que a chave publicável só executa registrar_fim_quiz.** (revisão)
   - *Dúvida:* depois da migração, a chave publicável (papel anon) também executa registrar_evento. conexoes.md descreve o que está no ar, e a migração ainda não rodou.
   - *O que foi feito:* nada em conexoes.md.
   - *Recomendação:* no roteiro da etapa 35, logo depois de o Otávio rodar a migração e o conferir.sql, atualizar a linha do Supabase em conexoes.md (anon executa registrar_fim_quiz e registrar_evento).
   - *Se decidir diferente:* atualizar já, com a ressalva "depois da migração 001"; o risco é a linha descrever um banco que ainda não existe.

## Etapa 33

33.1. **O nome da rota nova: /api/evento.**
   - *Dúvida:* a planta v4 diz que a visita, o início do quiz e o clique no fim do quiz entram "pela mesma porta, com as mesmas travas", mas não dá o endereço. O banco tem uma função própria para eles (registrar_evento), separada do fim do quiz.
   - *O que foi feito:* uma rota nova, POST /api/evento, ao lado de /api/fim-quiz, com o mesmo código de portaria (portaPublica) e a função registrar_evento. /api/fim-quiz ficou exatamente como estava e continua recusando visita e clique.
   - *Recomendação:* aceitar: uma rota por função do banco deixa cada porta conferir só o seu pacote, e o fim do quiz, que leva dado de pessoa, não divide conferência com os eventos que não levam.
   - *Se decidir diferente:* se os eventos tiverem de entrar por /api/fim-quiz, a porta passa a escolher a conferência e a função pelo tipo; muda só garcom.mjs e o teste, e a etapa 34 manda para o endereço escolhido. Nenhuma página manda eventos ainda.

33.2. **O limite de tamanho do evento é 2 KB, não 16 KB.**
   - *Dúvida:* "as mesmas travas" pede uma trava de tamanho, sem dizer o número. O pacote de um evento tem perto de 300 bytes; o do fim do quiz, com as respostas, perto de 2 KB.
   - *O que foi feito:* /api/evento recusa corpo acima de 2 KB (413), pelo Content-Length e lendo em partes, como a outra porta. A sessão no tamanho máximo do banco (60 letras) passa com folga (conferido no teste).
   - *Recomendação:* aceitar: é a mesma trava, mais apertada, e a porta que não leva dado de pessoa é a mais fácil de usar para encher o banco de lixo.
   - *Se decidir diferente:* trocar TAMANHO_MAXIMO_EVENTO por TAMANHO_MAXIMO (16 KB) em garcom.mjs; os casos de tamanho do teste mudam junto.

33.3. **O que quer dizer "citar só a planta" no cabeçalho.**
   - *Dúvida:* a 23.11 diz que o garçom "deixa de depender da página e cita só a planta". Pode ser lido como "só a planta no lugar da página" ou como "só a planta em todo o depende_de".
   - *O que foi feito:* a leitura mais estreita: saiu quiz-01-pagina, e o formato do pacote passou a ser citado só pela planta (no README e no topo de garcom.mjs). Ficaram as outras bases, com as versões atuais (banco-rascunho 3, planta-do-banco 4, decisoes 5, funil-01 3, funil-01-planilha-sdr 2, regra-seguranca 3, lacunas 6), e entrou banco-migracao-001 1, porque o garçom chama a função criada nela. O garçom continua desatualizado, porque banco-rascunho, banco-migracao-001 e funil-01-planilha-sdr estão marcados (11.1).
   - *Recomendação:* aceitar: o garçom chama funções do banco e segue decisões e regras que não estão na planta; tirar essas bases esconderia da cascata mudanças que mexem no código.
   - *Se decidir diferente:* o depende_de fica só com planta-do-banco 4, como forma; nenhuma linha de código muda.

33.4. **Garçom v4 publicado antes da migração.**
   - *Dúvida:* a porta nova chama registrar_evento, que só existe depois da migração 001. A ordem de publicar é do roteiro da etapa 35.
   - *O que foi feito:* nada a mais no garçom. Se a função não existir, o banco responde 404 e o garçom devolve 502 `servico indisponivel`, sem detalhe (conferido no teste, simulado). /api/fim-quiz e a porta privada não dependem da migração.
   - *Recomendação:* no roteiro da etapa 35, a migração e o conferir.sql vêm antes de publicar o Worker; mesmo fora de ordem, nada quebra e nada se grava errado, só os eventos novos se perdem até a migração rodar.
   - *Se decidir diferente:* nenhuma mudança no código; só a ordem do roteiro.

33.5. **O OPTIONS de outra origem dá 403, não 405.**
   - *Dúvida:* a 22.2 diz que o OPTIONS passa a dar 405. A porta confere a origem antes do método, como sempre fez.
   - *O que foi feito:* o bloco do pré-voo saiu e o OPTIONS cai nas mesmas conferências de qualquer pedido: da própria origem, 405 com `Allow: POST`; de outra origem ou sem origem, 403. Nenhuma resposta leva cabeçalho de CORS. Vale para /api/fim-quiz e /api/evento.
   - *Recomendação:* aceitar: a ordem das conferências não mudou, e as duas respostas recusam sem abrir nada.
   - *Se decidir diferente:* para 405 em todo OPTIONS, a conferência de método vem antes da de origem em portaPublica; muda um caso do teste.

33.6. **O garçom não confere qual entrega manda cada tipo.**
   - *Dúvida:* a planta diz que a visita é da landing e o início e o clique são do quiz, mas não diz que um evento com outra entrega deve ser recusado. O banco confere só se o par entrega e versão está no catálogo (18.8).
   - *O que foi feito:* nada a mais: o garçom confere o formato da entrega e da versão, como no fim do quiz, e deixa o catálogo para o banco. Nenhuma regra que a planta não escreve.
   - *Recomendação:* aceitar no protótipo; se a medição precisar, escrever na planta qual entrega cada tipo pode levar, e aí o garçom e uma migração nova conferem.
   - *Se decidir diferente:* uma lista tipo e entregas permitidas em garcom.mjs (visita só landing-page-01; inicio_quiz e interesse_pos_relatorio só quiz-01) e a mesma regra no banco, numa migração nova.

33.7. **A porta nova aumenta o que um robô pode encher.**
   - *Dúvida:* /api/evento não pede aceite nem dado de pessoa, então é a porta mais fácil de usar com o cabeçalho Origin forjado. Visitas falsas não expõem ninguém, mas estragam a contagem de visitas e a diferença entre visitas e inícios do quiz (10.10).
   - *O que foi feito:* as mesmas travas de formato, mais o limite de 2 KB (33.2). A proteção contra robô e o limite de pedidos continuam como pendência antes de tráfego real (log.md, Pendências).
   - *Recomendação:* manter a pendência e ligar o limite de pedidos da Cloudflare também em /api/evento antes de qualquer tráfego real; no protótipo, só com leads de teste, não muda nada.
   - *Se decidir diferente:* para ligar o limite já, entra um binding de limite no wrangler.toml e uma conferência no garçom; é uma versão nova do garçom e do protótipo.

33.8. **Nutrição e produto da planilha não entraram nesta etapa.**
   - *Dúvida:* a 32.5 recomendava pôr o resto da planilha-sdr v2 (nutrição e produto) "na etapa 33, com a porta privada". O pedido da etapa 33 fala só das portas públicas e pede que todos os testes anteriores continuem certos.
   - *O que foi feito:* nada na porta privada nem na planilha em Apps Script; o contrato da porta privada não muda com nutrição e produto, que são listas da planilha.
   - *Recomendação:* fazer junto com a próxima versão da planilha (32.5, 32.6, 32.11), fora do garçom.
   - *Se decidir diferente:* uma etapa própria para a planilha v3, com o Codigo.gs, o README e o teste dela; o garçom não muda.

## Etapa 34

34.1. **O percentual da fala 2 do plano de 90 dias não voltou à página.**
   - *Dúvida:* a 7.5 (#110) manda o quiz ficar como está, "promessa de percentual" incluída, e a copy v2 desfez a M19; mas a volta do percentual está em aberto na 31.3, e o pedido da etapa 34 diz que o texto fica como está salvo a caixa.
   - *O que foi feito:* a página v3 continua sem o percentual, como a v2. Registrado no README da página (seção "Texto").
   - *Recomendação:* decidir a 31.3 junto com a pauta (item 29); se o percentual voltar, ele entra pela copy e pela ficha de fatos, nunca escrito na mão na página.
   - *Se decidir diferente:* muda uma frase do plano de 90 dias na página e no quiz-01-copy; os prints do resultado-a e do eliminatório mudam.

34.2. **Com a caixa desmarcada, as frases que falam de envio continuam iguais.**
   - *Dúvida:* quem desmarca não recebe nada, mas as telas seguintes continuam com o "Vai para o seu e-mail" e os botões de contato do fim (M21; 31.2). A 7.5 manda não mexer no texto do quiz fora da caixa.
   - *O que foi feito:* o texto ficou como está; o aviso da copy v2 ("Sem o aceite, o diagnóstico aparece só aqui na tela, e nada é enviado.") aparece embaixo da caixa desmarcada; nenhum pacote nem clique sai. Só a linha da cópia no relatório, que a copy v2 já escreveu para os dois casos (M21), mudou: marcada, "Uma cópia deste diagnóstico vai para o seu e-mail e WhatsApp."; desmarcada, "Este diagnóstico fica só aqui na tela. Sem o aceite, nada foi enviado." (correção do revisor da etapa 34: a página mostrava a quem desmarcou que a cópia ia para o e-mail e o WhatsApp, o que é falso).
   - *Recomendação:* decidir na 31.2 se, com a caixa desmarcada, somem a nota do e-mail e os botões de contato do fim; até lá, o protótipo só roda com leads de teste.
   - *Se decidir diferente:* a página esconde essas frases quando aceite é falso (mudança pequena em mostrarResultado e no fim), com copy v3 e prints novos de contato-sem-consentimento.

34.3. **O quiz novo é a versão 2 da entrega quiz-01 no catálogo.**
   - *Dúvida:* a página v3 muda o corte do fim e o aceite; o banco já gravou pacotes da versão 1 (página v2) no teste. A 10.15 diz que a versão sobe a cada publicação, mas não diz se uma página nunca publicada com gente conta.
   - *O que foi feito:* versao_entrega 2 nas etiquetas e linha ('quiz-01', 2) nova em catalogo-prototipo.sql v2, sem mexer na ('quiz-01', 1).
   - *Recomendação:* aceitar: separa no banco os testes da página antiga dos da nova.
   - *Se decidir diferente:* volta versao_entrega 1 na página e sai a linha nova do catálogo; o teste muda uma expectativa.

34.4. **As duas variantes da landing gravam a visita com o mesmo par (landing-page-01, 1).**
   - *Dúvida:* a 10.15 dá à página publicada o nome da pasta da entrega; a pasta é landing-page-01 para as duas variantes, mas a escolha entre A e B é da reunião e a medição pode querer separar.
   - *O que foi feito:* as duas mandam entrega landing-page-01, versão 1; uma linha só no catálogo. No protótipo, a A fica em / e a B em /b/, e o banco não distingue as duas.
   - *Recomendação:* aceitar até a reunião escolher a variante; se as duas forem ao ar ao mesmo tempo, cada uma vira versão própria (como a 10.14 para os dois topos).
   - *Se decidir diferente:* a B passa a mandar outra versão (ou outra entrega), com linha nova no catálogo; muda uma linha no script de cada variante e o catalogo-prototipo.sql.

34.5. **A nota do "Tenho interesse" é a do lado do lead score.**
   - *Dúvida:* a 31.14 pergunta qual nota usar; com o corte mais restritivo (14.2), nenhum dos dois lados venceu o conflito-16.
   - *O que foi feito:* com CRITERIO_DO_FIM em 'mais-restritivo', a página mostra "Anotado. Seu interesse fica registrado com o seu diagnóstico.", que já estava na página e não promete ligação (13.7); a nota do Júnior só aparece se o critério for 'junior'.
   - *Recomendação:* aceitar até a decisão do conflito-16.
   - *Se decidir diferente:* troca uma condição em notaInteresse e o caso 2 do teste.

34.6. **"Mandar no WhatsApp" do plano de 90 dias não manda clique.**
   - *Dúvida:* a lista proposta da 31.15 tem quatro valores de clique, todos dos botões do relatório; o botão do fim do plano de 90 dias abre o WhatsApp com o plano e não está na lista.
   - *O que foi feito:* esse botão não manda evento; os quatro botões do relatório mandam.
   - *Recomendação:* aceitar; se o SDR precisar saber, um quinto valor entra na lista do banco e do garçom primeiro.
   - *Se decidir diferente:* valor novo na restrição do banco (migração nova), no garçom e no mapa CLIQUES da página.

34.7. **O custo mensal da nota usa o preço da Avançada enquanto houver vaga.**
   - *Dúvida:* a 4.7 manda usar o preço que vale no dia da resposta; a página não sabe quantas vagas sobram.
   - *O que foi feito:* a página continua com ficha-de-fatos#preco-avancada, como o lead-score v3 diz para enquanto houver vaga.
   - *Recomendação:* quando as vagas acabarem, sobe a ficha de fatos e, pela cascata, a página.
   - *Se decidir diferente:* a página passa a ler outro campo da ficha; muda FATOS e o total do exemplo no teste.

34.8. **A página do quiz continua desatualizada.**
   - *Dúvida:* todas as bases foram para a versão em vigor, mas a copy e o briefing do quiz continuam marcados pela cadeia da pauta, que declara a página v2 (31.19), e o garçom v4 pelo banco.
   - *O que foi feito:* desatualizado: true na página v3 (regra 11.1), como nas landings v3.
   - *Recomendação:* resolver a 31.19 (a pauta citar a página sem depender dela, como já faz com a copy, 13.15), o que solta a cadeia.
   - *Se decidir diferente:* nada muda na página; só os cabeçalhos.

34.9. **O quiz não ganhou lang nem a meta viewport na entrega.**
   - *Dúvida:* a 09.1 pede doctype e meta charset como as duas primeiras linhas; a meta viewport e o lang="pt-BR" continuam faltando na entrega (23.8), e o montador acrescenta a viewport no site.
   - *O que foi feito:* só o doctype e a charset (09.1), mais as fontes (10.7). Nenhuma outra mudança no `<head>` do mockup.
   - *Recomendação:* pôr a viewport e o lang na próxima versão da página, com prints de 375 como celular, e tirar o acréscimo do montador.
   - *Se decidir diferente:* duas linhas na página; o montador passa a dizer "já existia"; os prints de 375 do quiz mudam.

34.10. **O que ainda aparece com http no site montado.**
   - *Dúvida:* a 10.7 pede nenhuma ferramenta de terceiros nem fonte do Google. A busca por http no site montado acha o xmlns do SVG dentro de um data: no estilo.css da variante A, o https://wa.me/ do botão de WhatsApp do quiz e os endereços escritos dentro das licenças das fontes.
   - *O que foi feito:* nada disso é pedido ao abrir a página: o xmlns é um nome, o wa.me só abre no clique com o número preenchido (hoje vazio), e as licenças são texto. O montador confere src, link, url() e @import para http(s) e qualquer fonts.googleapis ou fonts.gstatic, e o teste do quiz (no repositório) e o da landing (script da etapa 34 fora do repositório; entra no ensaio da etapa 35) conferem que nenhuma requisição sai para outro endereço.
   - *Recomendação:* aceitar.
   - *Se decidir diferente:* se o wa.me também não puder, o botão "Mandar no WhatsApp" sai até haver número e decisão (hoje, sem número, ele só mostra o aviso de protótipo).

34.11. **A recompra no subtítulo do hero B aparece como etiqueta, não sai do texto.**
   - *Dúvida:* a estrutura v4 diz que o subtítulo do hero B vai "sem o trecho {{BLOQUEADO: #16}}, que não vai ao ar enquanto bloqueado". Tirar o trecho quebra a frase ("vender mais e. Com os leads...").
   - *O que foi feito:* seguido o padrão das outras marcas #16 da página: a etiqueta "a definir: #16" fica antes de "vender mais vezes para o mesmo cliente"; a página continua rascunho, que não vai ao ar.
   - *Recomendação:* antes de ir ao ar com gente de verdade, decidir a #16 ou escrever na copy a versão da frase sem a recompra ("para vender gastando menos e vender mais").
   - *Se decidir diferente:* muda só o `<p class="hero-subtitulo">` das duas variantes.

34.12. **O subtítulo do hero fica depois do botão em toda largura.**
   - *Dúvida:* a 10.16 deixa o subtítulo ir para baixo do botão no celular, quando o botão não couber; no computador, a copy põe o subtítulo antes do botão.
   - *O que foi feito:* mantida a ordem que a página já tinha (título, bloco de chamada, subtítulo) nas duas larguras. Mudar a ordem só por CSS deixaria a ordem lida diferente da vista, e duplicar o texto também não serve.
   - *Recomendação:* aceitar no rascunho; se o computador tiver de mostrar o subtítulo antes do botão, decidir junto com o design (conflito-08).
   - *Se decidir diferente:* o subtítulo sobe para antes do bloco de chamada no código e, no celular, conferir que o botão ainda cabe na primeira tela.

34.13. **Doctype e charset antes do comentário de cabeçalho nas landings.**
   - *Dúvida:* o comentário de cabeçalho das landings passava de 1024 bytes; o montador punha a meta charset antes de tudo, inclusive do doctype, e as landings montadas rodavam em modo de compatibilidade (BackCompat) desde o pedido 09, sem ninguém notar (o ensaio mede o modo só do quiz). O pedido da etapa 34 não citava isso.
   - *O que foi feito:* cada index.html das landings começa por `<!doctype html>`, `<html lang="pt-BR">`, `<head>` e `<meta charset="utf-8">`, com o comentário logo depois, como a 09.1 para o quiz; as duas ficam no modo padrão no site montado (conferido). O quiz também (doctype e charset antes do comentário).
   - *Recomendação:* aceitar; na etapa 35, o ensaio passa a conferir o modo das landings também.
   - *Se decidir diferente:* o comentário volta para o topo e o montador passa a inserir a charset depois do doctype; muda o montador.

34.14. **A lista de peças por entrega é rascunho à parte, com duas peças sem entrega.**
   - *Dúvida:* a 17.5 pede definir que peças cada entrega instala; nem `entregas-do-servico` nem `metodo` têm essa tabela, e Inteligência de Mercado e Inteligência Artificial não têm nenhuma entrega que as instale escrita na base (lacuna-21; #84).
   - *O que foi feito:* entregas/landings/landing-page-01/pecas-por-entrega.md (v1, rascunho, otavio: pendente), com cada ligação proposta citando o trecho da base que a sustenta e "a definir" onde a base não diz. A copy e as páginas não mudaram; o filtro continua só marcando a peça.
   - *Recomendação:* o Otávio aprovar ou cortar ligação por ligação e decidir o que o filtro mostra para as duas peças sem entrega; depois, a lista entra na copy v5 e o filtro passa a filtrar.
   - *Se decidir diferente:* se o filtro sair, saem os botões e a frase "toque para filtrar" nas duas variantes, e a última linha da 03b muda.

34.15. **banco-rascunho sobe para a versão 4 só pela documentação do catálogo.**
   - *Dúvida:* o catálogo novo (32.4) é documentado no README do banco, que divide o id banco-rascunho com o esquema.sql; nenhuma linha de SQL do esquema mudou.
   - *O que foi feito:* README do banco e cabeçalho do esquema.sql v4 (correção de forma, status mantido); conferir.sql (que já declarava banco-rascunho 3) ganhou desatualizado: true, sem outra mudança; os outros dependentes já estavam marcados.
   - *Recomendação:* aceitar; atualizar os dependentes do banco junto com a etapa 35 e a próxima migração.
   - *Se decidir diferente:* se o catálogo devesse ter id próprio, catalogo-prototipo.sql ganha cabeçalho com id próprio e o banco volta a não mudar de versão.

34.16. **A política de privacidade ainda descreve a página do quiz de antes.**
   - *Dúvida:* a política v2 diz que "a página de hoje ainda tem as duas caixas e carrega as fontes de fora"; a página v3 já tem a caixa única e as fontes servidas junto. A política não está no pedido da etapa 34.
   - *O que foi feito:* nada na política; ela já está marcada como desatualizada e declara quiz-01-pagina 2.
   - *Recomendação:* na próxima versão da política, tirar a frase e declarar quiz-01-pagina 3.
   - *Se decidir diferente:* nada muda nas páginas.

34.17. **O teste da landing ficou fora do repositório.**
   - *Dúvida:* a visita das duas variantes foi conferida (44 de 44, no site montado: pacote aceito pelo garçom v4, sessão no formato do banco, botão com id_sessao e utm, falha do garçom sem mudança na página, file:// e sem programa sem envio, nenhum pedido a outro endereço, modo padrão), mas o script ficou na pasta temporária da sessão; o repositório só tem o teste do quiz. O revisor rodou o script de novo e passou.
   - *O que foi feito:* nada no repositório; o log registra "script fora do repositório".
   - *Recomendação:* na etapa 35, levar a conferência para dentro do ensaio (ou de nucleo/ferramentas/prints/testar-landing-01.js), para quem vier depois poder rodar.
   - *Se decidir diferente:* a visita fica conferida só pelo ensaio e pelo teste manual do roteiro.

34.18. **Com a caixa desmarcada, o início do quiz já foi gravado.**
   - *Dúvida:* a 13.4 diz que, desmarcada a caixa, "nada é enviado ao banco nem à equipe". O início do quiz sai quando o quiz abre (10.6), antes de a pessoa ver a caixa, e a visita da landing também; nenhum dos dois leva dado de pessoa (etapa 33: evento sem dado de pessoa não pede aceite).
   - *O que foi feito:* fica assim: com a caixa desmarcada, não saem o fim do quiz nem o clique do fim; o início e a visita, que vieram antes e não têm pessoa, ficam no banco só com a sessão.
   - *Recomendação:* aceitar: sem eles, a diferença entre visitas, inícios e fins do quiz (10.10) não fecha, e a sessão sozinha não identifica ninguém.
   - *Se decidir diferente:* o início do quiz passa a sair só junto com o fim (perde a 10.6), ou a política de privacidade passa a dizer que a visita e o início são contados mesmo sem o aceite.

## Etapa 35

35.1. **"Eliminatório pelo corte novo" lido como o relatório de quem não se qualifica.**
   - *Dúvida:* o pedido manda testar "um lead que antes passava e agora cai no eliminatório" pelo corte mais restritivo (14.2). Pelo corte novo, quem passa no corte do Júnior e fica na faixa c vai para o relatório de quem não se qualifica, mas o banco grava a faixa **c**, não **eliminatorio** (essa faixa continua só para o faturamento abaixo de R$ 50 mil, sem vendedor ou valor médio baixo, base/lead-score.md).
   - *O que foi feito:* o ensaio (TESTE Carla Ensaio) e o APLICAR-11.md (teste 3, TESTE Caio Aplicar) usam a faixa c que passa no corte do Júnior (nota 24, as respostas FAIXA_C de testar-quiz-01.js): até a página v2 ia para o plano, agora vai para o relatório de não qualificado, com o "Tenho interesse"; no banco, faixa c; fora da planilha. Nenhuma regra mudou.
   - *Recomendação:* aceitar a leitura.
   - *Se decidir diferente:* se "eliminatório" for a faixa eliminatorio, o teste vira o do 09/11 (faturamento "Menos de R$ 50 mil"), que o ensaio já faz com a TESTE Paulo Ensaio; o corte novo fica sem teste próprio no roteiro.

35.2. **O Chromium e o wrangler falavam com a internet por conta própria no ensaio.**
   - *Dúvida:* o pedido manda conferir que o navegador do ensaio não pede nada fora de 127.0.0.1 e rodar o wrangler sem rede para fora. As páginas não pediam nada, mas um vigia externo (lsof, na primeira rodada desta etapa) viu o processo do Chromium do ensaio conectado a endereços do Google (atualização, conta e mensagens do próprio navegador) e o wrangler conectado a workers.cloudflare.com (o miniflare buscando o cf.json). O ensaio v2 não conferia isso; o README dele dizia que não conferia.
   - *O que foi feito:* o Chromium abre com todo nome fora de 127.0.0.1 como "não encontrado" e com um proxy inexistente em 127.0.0.1:9, e o registro de rede dele (netlog) é conferido no fim: nenhuma conexão TCP fora de 127.0.0.1. O wrangler sobe com CLOUDFLARE_CF_FETCH_ENABLED=false, WRANGLER_HIDE_BANNER=true, WRANGLER_SEND_METRICS=false e DO_NOT_TRACK=1 e com a trava nucleo/ferramentas/ensaio/rede-so-local.cjs (NODE_OPTIONS=--require), que recusa e anota todo pedido para fora; conferido: sem os avisos, a trava pegou workers.cloudflare.com. Nas duas rodadas finais, o vigia não viu nada fora de 127.0.0.1. Fica de fora: o "UDP" do teste de IPv6 do Chromium ([2001:4860:4860::8888]:443), que só abre o soquete para descobrir o endereço local, sem mandar dado (linha INFO).
   - *Recomendação:* aceitar. O dry-run do README do protótipo (`wrangler deploy --dry-run`) também procura versão nova no registro do npm (a saída de hoje mostrou "update available 4.159.0"): acrescentar WRANGLER_HIDE_BANNER=true ao comando na próxima versão do README do protótipo.
   - *Se decidir diferente:* sem as travas, o ensaio continua passando, mas a conferência de rede volta a valer só para as páginas.

35.3. **A planilha com 0 leads na revisão da etapa 34 era a margem de 1 minuto.**
   - *Dúvida:* o revisor da etapa 34 viu a busca da planilha voltar 0 leads logo depois de gravar um lead de faixa A; o pedido manda confirmar se é a margem (21.6) e corrigir se for defeito.
   - *O que foi feito:* opção nova do ensaio, `--esperar-margem`, que espera a margem de verdade, sem mexer no banco: a primeira busca, logo depois do quiz, não traz os leads novos; a busca seguinte, 48 segundos depois na rodada, traz o lead A e a faixa b. 144 de 144. Nada foi corrigido, porque nada estava errado. O APLICAR-11.md (6.6) avisa da margem.
   - *Recomendação:* aceitar.
   - *Se decidir diferente:* tirar ou encurtar a margem é migração nova (leads_para_planilha), com a 21.6 de volta; a margem protege a ordem do cursor da planilha.

35.4. **Na tela do plano, nenhum botão manda o clique do fim do quiz.**
   - *Dúvida:* a 18.4 manda registrar o que a pessoa clicou no fim do quiz, e a lista proposta (31.15) tem um valor por botão: quero-conversa, chamar-whatsapp, tenho-interesse e agora-nao. Esses botões estão nos relatórios ("Quero marcar uma conversa", "Chamar no WhatsApp", "Tenho interesse", "Agora não"). O caminho da maior parte dos qualificados, porém, é a conversa do plano de 90 dias ("Sim, eu quero", "Quero ver como é" e "Mandar no WhatsApp"), que não manda clique nenhum. Achado ao montar o teste do APLICAR-11.md.
   - *O que foi feito:* nada na página. Na revisão da etapa 35: é lacuna da etapa 34, que já tinha deixado o "Mandar no WhatsApp" do plano sem clique (34.6), e a 18.4 fica aplicada só em parte; a correção não é pequena nem clara, porque pede escolher o valor de cada botão do plano (os quatro da 31.15 são dos relatórios) e, com valor novo, uma migração 002, o garçom e a página. Fica como bloqueio até a decisão, pelo caminho conservador (nenhum valor inventado). O ensaio e o roteiro testam o clique pelo relatório do funil saudável (faixa b, "Quero marcar uma conversa") e pelo relatório de não qualificado ("Tenho interesse"); o lead A do ensaio, no plano, fica com clique_fim_quiz vazio na planilha, e o ensaio confere isso.
   - *Recomendação:* decidir junto com a 31.15 se os botões do plano entram na lista (por exemplo, "Sim, eu quero" e "Mandar no WhatsApp" como quero-conversa e chamar-whatsapp, ou valores novos), e então mudar a página (e, se entrarem valores novos, uma migração 002 da restrição eventos_clique_lista).
   - *Se decidir diferente:* se o plano ficar sem clique, a coluna clique_fim_quiz da planilha só diz algo de quem passou pelos relatórios, e o SDR deve ler a coluna vazia como "não sabemos", não como "não clicou".

35.5. **O teste da landing que estava fora do repositório (34.17) entrou no ensaio só em parte.**
   - *Dúvida:* o teste de 44 conferências da etapa 34 ficou na pasta temporária daquela sessão e não existe mais; o pedido manda levá-lo ao ensaio "se fizer sentido".
   - *O que foi feito:* o ensaio confere, no site montado, com o garçom v4 e o banco: a visita gravada nas duas variantes, o modo padrão e o UTF-8, a Geist da variante A carregada do site, o botão com utm e id_sessao no formato do banco, a linha da visita no banco (landing-page-01, versão 1, utm, sessão, ligada à pessoa pelo fim do quiz), o botão funcionando com /api/evento fora do ar, nada mandado pelo file://, nenhum pedido a outro endereço e o console sem dado de pessoa. Não foi refeito um testar-landing-01.js à parte, nem a conferência pixel a pixel dos prints.
   - *Recomendação:* aceitar; os prints das landings continuam com a ferramenta de prints.
   - *Se decidir diferente:* um nucleo/ferramentas/prints/testar-landing-01.js próprio, no padrão do testar-quiz-01.js, com o garçom respondido no navegador.

35.6. **A ordem do APLICAR-11: catálogo antes da conferência.**
   - *Dúvida:* o pedido põe o catálogo entre a migração e o conferir.sql; o README do banco ("Como aplicar") põe o conferir.sql antes do catálogo.
   - *O que foi feito:* segui o pedido: migração (2.4), catálogo (2.6), conferir.sql (2.8). O conferir.sql não olha o catálogo, então a ordem dos dois não muda nenhum resultado; os dois vêm antes de publicar.
   - *Recomendação:* aceitar; acertar o README do banco na próxima versão dele.
   - *Se decidir diferente:* trocar os passos 2.5 e 2.6 com os 2.7 e 2.8; nada mais muda.

35.7. **A aba nova da planilha recebe de novo a linha real do Otávio.**
   - *Dúvida:* renomear a aba antiga e rodar instalar() de novo (README da planilha, "Atualizar da versão 1") faz a aba nova receber todos os leads desde o início, inclusive a linha real do Otávio de 09/11, 08h56. A linha passa a existir duas vezes na planilha de teste (aba fila antiga e aba fila).
   - *O que foi feito:* o APLICAR-11.md (3.5) avisa e diz que as duas abas saem juntas na limpeza antes de ir ao ar (#102). Nada foi apagado: apagar a aba antiga ou a linha é do Otávio, e não se desfaz pelo Git. Na revisão da etapa 35, a pendência da limpeza (log.md, Pendências, dados de teste do protótipo) passou a citar as duas abas, e o aviso de não gravar a tela do APLICAR-11.md passou a incluir a parte 6, que mostra a planilha com essa linha.
   - *Recomendação:* aceitar.
   - *Se decidir diferente:* apagar a aba fila antiga depois do passo 3.5 deixa uma cópia só; o histórico de 09/11 da aba antiga se perde.

35.8. **Documentos que ainda dizem que o ensaio é o de antes.**
   - *Dúvida:* dados/banco/README.md ("Conferido nesta máquina") diz que o ensaio aplica só o esquema v2 e espera "13 de 13" até a etapa 35; o README do protótipo ainda mostra o dry-run de 08/11 (15,91 KiB, 9 arquivos). O pedido limita a mudança no README do protótipo ao que aponta para o APLICAR-11.md e não fala do README do banco.
   - *O que foi feito:* nada nos dois trechos. O dry-run de hoje está no log.md: wrangler 4.158.0, 19 arquivos do site, 18,10 KiB (5,27 KiB comprimido), as mesmas ligações (ASSETS, SUPABASE_URL, ORIGEM_PERMITIDA), sem publicar.
   - *Recomendação:* corrigir os dois como forma na próxima versão de cada documento.
   - *Se decidir diferente:* corrigir já: banco-rascunho v5 e prototipo-funil-01 v6, forma.

35.9. **conexoes.md com a ressalva "a valer depois do APLICAR-11".**
   - *Dúvida:* a 32.12 recomendou atualizar a linha do Supabase só depois de o Otávio rodar a migração; o pedido manda registrar já, como "a valer depois do APLICAR-11".
   - *O que foi feito:* a linha do Supabase ganhou a ressalva (a chave publicável passa a executar também registrar_evento, depois da migração); o resto da linha não mudou. O APLICAR-11.md (parte 7) pede ao Otávio que avise o Claude, que então tira a ressalva e registra a chave "default" apagada e a publicação nova.
   - *Recomendação:* aceitar.
   - *Se decidir diferente:* tirar a ressalva e esperar o aviso do Otávio, como a 32.12 recomendava.

## Etapa 36

36.1. **Nenhuma pergunta desta fila foi para a pauta.**
   - *Dúvida:* pela regra da triagem, na dúvida entre C e D vale D. Várias perguntas tocam assuntos do Júnior e do Euclides: 30.4, 31.5 e 31.6 (a promessa e a #79), 31.3 e 34.1 (o percentual), 31.14 e 34.5 (conflito-16), 31.7 e 34.4 (as variantes), 34.9 (a viewport do quiz), 34.11 (a #16) e 34.12 (conflito-08).
   - *O que foi feito:* todas ficaram no grupo C, porque o assunto dos sócios de cada uma já está num item da pauta (itens 2, 3, 4, 5, 6, 6a, 18 e 29) e o que falta é a sua decisão antes da reunião (a leitura de uma resposta sua, ou o que fica no rascunho até lá). A pauta não mudou (continua v7); a lista está em prompts/11-triagem.md, "O que foi aplicado".
   - *Recomendação:* aceitar; quando você responder a página de decisões, a próxima versão da pauta leva a sua posição nos itens tocados.
   - *Se decidir diferente:* as que você quiser levar aos sócios como pergunta própria entram na pauta v8, cada uma no item do assunto, sem mudar a numeração.

36.2. **A B 31.9 e as A que esperam a próxima versão ficaram nas Pendências.**
   - *Dúvida:* a 31.9 (subcampos de nome fixo na ficha de fatos) está decidida pela 9.8 (#114), mas a etapa 36 é de fechamento e não mexe na base. As A 30.10, 32.11, 34.16, 35.6 e 35.8 pedem a próxima versão de cada documento.
   - *O que foi feito:* nenhuma aplicada agora; todas num item novo do log.md, Pendências, "Correções para a próxima versão de cada documento (triagem da etapa 36)", como a triagem da etapa 27 fez com as dela.
   - *Recomendação:* aceitar; cada uma entra quando o documento subir de versão por outro motivo.
   - *Se decidir diferente:* aplicar já numa etapa curta: ficha de fatos v5 (31.9), regra de versionamento v4 (30.10), planilha v3 só no cabeçalho (32.11), política v3 (34.16), README do banco v5 (35.6, 35.8) e README do protótipo v6 (35.8), todas como forma.
