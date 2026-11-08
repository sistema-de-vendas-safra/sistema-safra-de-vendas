# Perguntas da fila da noite

## Etapa 11

11.1. **Pode um documento sair de desatualizado se ainda se apoia em outro marcado?**
   - *Dúvida:* a regra de versionamento marca desatualizado só quando a versão citada é menor que a atual; não diz o que fazer quando a dependência está na versão atual mas marcada (mecanismo e oferta, pela pergunta 4.5).
   - *O que foi feito:* na cascata da 6.9, só voltaram a false os documentos sem nenhuma dependência marcada (persona, produto, metodo, entregas-do-servico, lead-score). promessa, tom-de-voz, provas-e-conformidade, design-system, glossario, funil-01, planta, pauta, briefing, copy e estrutura subiram de versão com o depende_de atualizado, mas continuam marcados, porque se apoiam, direto ou por cadeia, no mecanismo e na oferta. Antes, briefing, copy, estrutura, pauta e planta estavam sem a marca, embora se apoiassem nos dois.
   - *Recomendação:* manter assim e escrever em nucleo/regras/versionamento.md, na Cascata: "um documento só sai de desatualizado quando nenhuma dependência estiver desatualizada". Responder a 4.5 libera a cadeia inteira de uma vez.
   - *Se decidir diferente:* se a marca valer só pela versão, voltam a false promessa, tom-de-voz, provas-e-conformidade, design-system, glossario, funil-01, planta, pauta, briefing, copy e estrutura, numa correção de forma; só mecanismo e oferta ficam marcados.
   - *Observação, sem ação:* as etapas 8 a 10 escreveram briefing, copy e estrutura sobre documentos marcados, e a regra diz que documento marcado não serve de base para entrega nova. Como os três são rascunho e nada vai ao ar, nada foi mexido; fica registrado para você ver junto com a 11.1.

## Etapa 12

- mecanismo e oferta seguem desatualizados e sem mudança: a atualização pede mudança de sentido. É o caso da pergunta 4.5 (prompts/05-fila-perguntas.md); nada novo a decidir aqui.

12.1. **As seções "Fontes" do briefing, da copy e da estrutura citam as versões antigas.**
   - *Dúvida:* no fim de cada um dos três documentos, a lista "Fontes" registra as versões lidas quando o texto foi escrito (por exemplo, persona v2, pauta v1, briefing v1). O cabeçalho já aponta para as versões atuais.
   - *O que foi feito:* a lista ficou como estava, como registro do que foi lido na escrita; só o cabeçalho e a nota "Documentos desatualizados" do topo mudaram (forma).
   - *Recomendação:* manter assim; o cabeçalho é o lugar da versão vigente, e a lista mostra a origem do texto.
   - *Se decidir diferente:* se a lista tiver de acompanhar o cabeçalho, os três sobem mais uma versão numa correção de forma, trocando as versões da lista pelas do depende_de.


## Etapa 13

13.1. **"Reunião" no texto do quiz.**
   - *Dúvida:* "reunião" é palavra queimada para a persona (`tom-de-voz`, resposta 5; `persona`), e o quiz do Júnior a usa em perguntas, rótulos do funil, falas, selos e leitura. A troca na landing (9.6) ainda espera resposta.
   - *O que foi feito:* "reunião" virou "conversa de venda" ou "conversa" em todo texto público do quiz (M3, M9 a M15, M17, M22, M24, M29), como na landing. Nas perguntas que o lead score usa, só o enunciado mudou; as opções ficaram iguais. "Lead perdido" na fala do Júnior sobre tentativas ficou como estava.
   - *Recomendação:* aceitar, junto com a 9.6, para landing e quiz falarem igual; levar ao Júnior no item 29 da pauta.
   - *Se decidir diferente:* se "reunião" puder aparecer no corpo, as linhas M9 a M15, M17, M22, M24 e M29 voltam ao texto do mockup, e M3 volta a "vendem por reunião"; nada mais muda.

13.2. **"Diagnóstico" como nome e como palavra comum.**
   - *Dúvida:* "Diagnóstico de vendas" e o selo "Teste gratuito" estão entre os nomes em conflito da Análise (ficha-de-fatos#analise-nome-publico). O quiz usa "diagnóstico" dezenas de vezes como palavra comum.
   - *O que foi feito:* bloqueados o nome (olho, título do painel e do relatório, tela de erro) e o selo "Teste gratuito"; "seu diagnóstico" como palavra comum ficou.
   - *Recomendação:* manter até a decisão do nome (pauta, item 7).
   - *Se decidir diferente:* se "diagnóstico" também contar como nome, quase todas as falas da conversa ganham placeholder ou um sinônimo, e a copy precisa de uma revisão inteira.

13.3. **O plano de ação de 90 dias é a Análise?**
   - *Dúvida:* o quiz diz do plano: "Agora ele é gratuito. Em breve, vai custar R$ 497." A ficha registra esse valor como o da Análise (ficha-de-fatos#analise-valor), anotando que o quiz já o dizia do plano. Nenhuma decisão põe o plano como entrega nem diz que ele é a Análise (conflito-10).
   - *O que foi feito:* a fala usa {{ficha-de-fatos#analise-gratuidade}} e {{ficha-de-fatos#analise-valor}}, como a etapa manda, e a tela inteira da oferta fica [PENDENTE: conflito-10; conflito-19].
   - *Recomendação:* decidir no item 4 da pauta se o plano é a saída do diagnóstico e, se for, se ele é a própria Análise para efeito de preço.
   - *Se decidir diferente:* se o plano não for a Análise, a fala de preço vira {{BLOQUEADO: conflito-10}} até o plano ganhar campo próprio na ficha.

13.4. **Consentimento: duas caixas, pelo menos uma marcada.**
   - *Dúvida:* a planta guarda consentimento por WhatsApp e por e-mail separados; nada diz se os dois são obrigatórios para receber o diagnóstico.
   - *O que foi feito:* duas caixas desmarcadas, antes dos campos de e-mail e WhatsApp; o botão só libera com pelo menos uma; o canal não aceito não é usado. A empresa responsável fica na política (etapa 16), porque o nome da agência está em conflito; o prazo de guarda fica fora do texto (outros-23).
   - *Recomendação:* aceitar e mandar o texto à revisão de advogado junto com a política.
   - *Se decidir diferente:* se os dois forem obrigatórios, o botão só libera com as duas caixas e o aviso muda; se for uma caixa só, a planta passa a gravar um consentimento único.

13.5. **Escolha de dia e horário no relatório.**
   - *Dúvida:* o relatório do quiz deixa o lead escolher dia e hora; o registro diz que quem agenda é o SDR (#67; ficha-de-fatos#quem-agenda; `funil-01`, passo 3).
   - *O que foi feito:* a escolha ficou oculta; o botão virou "Quero marcar uma conversa", com a nota de que alguém da equipe chama no WhatsApp para marcar (M26).
   - *Recomendação:* manter enquanto o SDR agenda; reabrir se o funil passar a ter agenda própria.
   - *Se decidir diferente:* volta o bloco de dia e horário do mockup, e o funil-01 e a planta ganham o evento de agendamento feito pelo lead.

13.6. **Qual critério decide o fim do quiz.**
   - *Dúvida:* o corte do Júnior (R$ 50 mil e 1 vendedor) e o lead score mandam leads diferentes para a oferta do plano, para o relatório com "Tenho interesse" e para a nutrição (conflito-16).
   - *O que foi feito:* os dois lados escritos na copy (seção 10), bloqueados; nenhum escolhido. A faixa nunca aparece para o lead.
   - *Recomendação:* decidir junto com o item 2 da pauta (#98). Para o código da etapa 14, calcular os dois e só mostrar no console.
   - *Se decidir diferente:* com o lado do Júnior, a coluna do lead score sai e o lead score fica só para ordenar a fila; com o lado do lead score, o "Tenho interesse" deixa de prometer ligação (13.7).

13.7. **Promessa de ligação para quem não entra na fila.**
   - *Dúvida:* a nota do "Tenho interesse" diz que alguém vai chamar no WhatsApp; no lead score, eliminatórios e faixa C vão para a nutrição, sem SDR. O lead score também tem prazos por faixa que não estão escritos para o lead.
   - *O que foi feito:* duas notas escritas, uma por lado (M27), bloqueadas pelo conflito-16. Nenhum texto promete prazo de ligação.
   - *Recomendação:* se o lead score for aprovado, usar a nota neutra até a nutrição ter canal (5.3).
   - *Se decidir diferente:* se alguém da equipe chamar mesmo os não qualificados, vale a nota do Júnior, e o funil-01 ganha esse passo.

13.8. **O Júnior em primeira pessoa e "a nossa equipe".**
   - *Dúvida:* quem assina as peças está em aberto (pauta, item 8; 9.4), mas o formato do quiz é o Júnior conversando. "Triad" aparece na fala, na etiqueta, nas chamadas e no rodapé.
   - *O que foi feito:* o Júnior segue em primeira pessoa; "da Triad" saiu da fala de abertura (M8); "equipe da Triad" virou "a nossa equipe" (M7, M25, M27); marca e rodapé com placeholder.
   - *Recomendação:* manter a primeira pessoa no quiz, seja qual for a decisão da página, porque é o formato que o Júnior escolheu.
   - *Se decidir diferente:* se o quiz não puder falar como o Júnior, a conversa inteira precisa ser reescrita em nome da equipe.

13.9. **Onde o qualificado recebe o relatório completo.**
   - *Dúvida:* a fonte do quiz deixa em aberto onde o qualificado com etapa fraca recebe o relatório (CLAUDE.md, "Em aberto"); a ajuda do contato diz que ele "aparece nesta tela logo depois".
   - *O que foi feito:* a ajuda ficou como está, marcada [PENDENTE: 13.9]; a chamada do relatório foi escrita para servir também ao qualificado, se ele vir o relatório.
   - *Recomendação:* levar ao Júnior junto com o item 4 da pauta.
   - *Se decidir diferente:* se o relatório for só por e-mail e WhatsApp para o qualificado, a ajuda muda para "Ele chega no seu e-mail e WhatsApp".

13.10. **Briefing e copy do quiz nascem desatualizados.**
   - *Dúvida:* os dois se apoiam em documentos marcados (lead-score, persona e lacunas pela cascata desta etapa; os outros pela cadeia da 4.5).
   - *O que foi feito:* os dois nascem com desatualizado: true, seguindo a regra provisória 11.1.
   - *Recomendação:* a mesma da 11.1.
   - *Se decidir diferente:* se a marca valer só pela versão, os dois passam a desatualizado: false numa correção de forma.

13.11. **"A meta geral é cerca de 4%."**
   - *Dúvida:* a ficha registra a conversão de lead em venda pelo valor exato das quatro metas (ficha-de-fatos#metas-por-etapa); o Júnior arredonda para 4%, e o `tom-de-voz` não deixa os 4% soarem como métrica de mercado.
   - *O que foi feito:* a frase passou a citar o campo (M23).
   - *Recomendação:* aceitar.
   - *Se decidir diferente:* volta "cerca de 4%", com a ressalva de que é a conta das metas do método.

13.12. **"8 minutos" e meta do quiz.**
   - *Dúvida:* o tempo do quiz não está na ficha, e o quiz não tem meta de conclusão registrada.
   - *O que foi feito:* "8 minutos" ficou, por ser do próprio quiz; nenhuma meta foi inventada.
   - *Recomendação:* medir o tempo real no teste da etapa 14 e ajustar o número se não bater.
   - *Se decidir diferente:* se o tempo for fato da oferta, ele ganha campo na ficha e entra por referência.

13.13. **Números das metas escritos por extenso no relatório.**
   - *Dúvida:* "pelo menos 5", "1 a cada 4", "1 a cada 5" e "Metade dos leads" saem das metas do método (ficha-de-fatos#metas-por-etapa), mas estão escritos por extenso no texto do relatório.
   - *O que foi feito:* ficaram no texto, com a nota de que mudam junto com o campo da ficha. Na etapa 14 o código deriva esses textos do campo, num lugar só.
   - *Recomendação:* aceitar a derivação no código e trocar o texto da copy por referência ao campo.
   - *Se decidir diferente:* se o Júnior quiser frases fixas, elas viram campo próprio na ficha.

13.14. **"O processo comercial funciona." no relatório do funil saudável.**
   - *Dúvida:* "processo comercial" está entre os termos gastos que o tom-de-voz pede para evitar; a frase é do Júnior.
   - *O que foi feito:* ficou como o Júnior escreveu, sem entrar na tabela de mudanças.
   - *Recomendação:* levar ao Júnior junto com o item 29 da pauta, sugerindo "Suas vendas estão funcionando."
   - *Se decidir diferente:* se a frase mudar, entra como M31 na tabela de mudanças.

13.15. **Dependência em círculo entre briefing do quiz, pauta e copy do quiz.**
   - *Dúvida:* o briefing do quiz depende da pauta v3, a pauta depende da copy do quiz v1 e a copy depende do briefing v1. Na próxima subida, a cascata roda em volta.
   - *O que foi feito:* nada; nenhum documento quebra hoje.
   - *Recomendação:* a pauta deixa de declarar a copy em depende_de e só a cita no texto do item 29 (a pauta aponta para a copy, mas não se apoia nela).
   - *Se decidir diferente:* manter como está e aceitar que cada subida de um dos três marca os outros dois.

## Etapa 14

14.1. **Fontes do Google carregadas pela página.**
   - *Dúvida:* o mockup carrega as fontes Inter, Space Grotesk e Permanent Marker de fonts.googleapis.com e fonts.gstatic.com. É o único endereço externo da página; o visual está em conflito (conflito-18) e não podia ser mexido.
   - *O que foi feito:* ficou como está e foi registrado no README da página; o teste confere que nenhuma outra requisição externa acontece.
   - *Recomendação:* quando o visual for decidido, servir as fontes junto com a página (sem chamada ao Google), o que também evita mandar o endereço de cada visitante para fora.
   - *Se decidir diferente:* se o Google Fonts puder ficar, a política de privacidade (etapa 16) precisa citar esse terceiro.

14.2. **Qual critério decide o final na página.**
   - *Dúvida:* o conflito-16 (corte do Júnior contra o lead score) segue aberto, mas a página precisa levar cada lead a um final.
   - *O que foi feito:* a constante CRITERIO_DO_FIM ficou em 'junior', que é o comportamento do mockup, sem escolher lado na decisão; os dois critérios são calculados e aparecem no console a cada envio (13.6). O rodapé do relatório mostra "Final do quiz: [a definir: critério de qualificação]". A nota do "Tenho interesse" segue o critério em uso (M27).
   - *Recomendação:* decidir junto com o item 2 da pauta (#98).
   - *Se decidir diferente:* com o lead score, trocar a constante para 'lead-score'; o final passa a ser "qualificado = faixas a e b" e a nota neutra do "Tenho interesse" entra sozinha.

14.3. **Id da entrega no pacote e id do cabeçalho.**
   - *Dúvida:* o pacote leva entrega = quiz-01, como a etapa pede, e o cabeçalho da página tem id quiz-01-pagina. A planta diz que o catálogo de entregas usa o mesmo id do cabeçalho no repositório.
   - *O que foi feito:* os dois ficaram como a etapa pediu; a versão no pacote (1) é a da página.
   - *Recomendação:* no catálogo de entregas, a linha do quiz usar id_entrega quiz-01 e caminho_no_repositorio entregas/quizzes/quiz-01/pagina, e a planta dizer que o id do catálogo é o da pasta da entrega, não o do arquivo.
   - *Se decidir diferente:* se o catálogo tiver de usar o id do cabeçalho, ETIQUETAS.entrega vira quiz-01-pagina.

14.4. **Números de exemplo pré-preenchidos no funil.**
   - *Dúvida:* o mockup abria o modo números com "400" leads e "50%" já escritos, e o histórico mostrava números de exemplo quando faltava algum. Numa página real, isso entraria no lead score e no pacote como resposta da pessoa.
   - *O que foi feito:* os campos começam vazios; o histórico mostra o que a pessoa escreveu, com "·" no que ficou vazio. O texto não mudou; é lógica.
   - *Recomendação:* aceitar.
   - *Se decidir diferente:* voltar os valores de exemplo só no modo de revisão do protótipo (botão "Telas"), nunca no caminho normal.

14.5. **Valor médio da venda obrigatório.**
   - *Dúvida:* no mockup dava para seguir com o campo vazio (o protótipo usava R$ 15 mil de exemplo). O lead score pontua o valor e elimina abaixo de R$ 5 mil.
   - *O que foi feito:* o "Continuar" só liga com um valor escrito. Se mesmo assim faltar (pelo seletor de telas), vale 0 ponto e não elimina.
   - *Recomendação:* aceitar.
   - *Se decidir diferente:* se o campo puder ficar vazio, o lead score precisa de uma linha "não informou" com pontos próprios.

14.6. **"Triad" fora da tabela de mudanças.**
   - *Dúvida:* além do que a copy lista, "Triad" aparecia em avisos do protótipo ("abre o WhatsApp da Triad") e na marca do cabeçalho; o triângulo da marca é desenho.
   - *O que foi feito:* os avisos viraram "o nosso WhatsApp", com "[a definir: número do WhatsApp]"; o texto da marca do cabeçalho e dos rodapés vem de FATOS (aviso "a definir"). O triângulo ficou, por ser visual (conflito-18). Comentários internos do código que citam a Triad ficaram.
   - *Recomendação:* acrescentar essas trocas como M31 na tabela da copy, para o Júnior ver.
   - *Se decidir diferente:* se a marca puder aparecer, basta preencher FATOS.nome_agencia.

14.7. **O relatório ainda usa os cenários de exemplo.**
   - *Dúvida:* no mockup, o relatório (saudável e não qualificado) mostra sempre um cenário fixo (400 leads, R$ 15 mil), não os números da pessoa; a oferta do plano já usa os números dela. Ligar o relatório aos números é mudança maior que a etapa.
   - *O que foi feito:* ficou como no mockup; o lead score e o pacote usam só as respostas da pessoa. Está na lista do que falta no README.
   - *Recomendação:* fazer na versão que for ao ar, junto com a leitura escrita pela IA (briefing, seção 2).
   - *Se decidir diferente:* se o relatório de exemplo bastar até a decisão do funil, nada muda agora.

14.8. **Nota de quem cai no eliminatório.**
   - *Dúvida:* o lead score diz que o eliminatório sai da fila seja qual for o resto, mas não diz se a nota é calculada. A planta guarda lead_score_nota e lead_score_faixa (com "eliminatorio").
   - *O que foi feito:* a nota é calculada normalmente (81 no teste) e a faixa vai como eliminatorio.
   - *Recomendação:* aceitar; a nota ajuda a revisão das faixas (outros-22).
   - *Se decidir diferente:* a nota do eliminatório vai vazia ou zero, mudando uma linha em calcularLeadScore.

14.9. **Dinheiro na mesa com funil na meta e "sem números".**
   - *Dúvida:* com as quatro etapas na meta, o dinheiro na mesa é zero, e a regra dá 3 pontos ("menos de 0,5"). "Sem números informados" não diz se inclui número faltando.
   - *O que foi feito:* segui a letra: funil na meta vale 3; modo chute, número faltando ou valor vazio contam como "sem números" (7).
   - *Recomendação:* rever junto com as faixas depois das 50 primeiras respostas (outros-22).
   - *Se decidir diferente:* muda só LEAD_SCORE.pontos.dinheiroNaMesa.

14.10. **UTMs aceitas.**
   - *Dúvida:* a etapa fala em utm_* e a planta guarda só utm_source e utm_campaign; meta-ads está reservada, fora do MVP.
   - *O que foi feito:* a página lê só as duas da planta; aceita stories, bio, reels, email e whatsapp e a campanha funil-01; qualquer outro valor (inclusive meta-ads) vai vazio (5.5).
   - *Recomendação:* aceitar até a Meta sair da reserva.
   - *Se decidir diferente:* acrescentar o valor em UTM_ACEITAS; para outras utm, a planta ganha o campo antes.

14.11. **Só o evento fim_quiz.**
   - *Dúvida:* a planta tem também visita e inicio_quiz, que a página poderia montar; a etapa pede só o pacote do fim.
   - *O que foi feito:* só o fim_quiz; o id_sessao já é criado ao abrir a página, para ligar os outros eventos quando existirem.
   - *Recomendação:* acrescentar inicio_quiz na etapa do garçom (18), com o mesmo enviarPacote.
   - *Se decidir diferente:* nada a desfazer.

14.12. **"8 minutos" ainda sem medida.**
   - *Dúvida:* a 13.12 pedia medir o tempo real no teste da etapa 14, mas o teste automático responde em segundos e não mede o tempo de uma pessoa.
   - *O que foi feito:* "8 minutos" ficou.
   - *Recomendação:* cronometrar duas ou três pessoas reais respondendo, antes de ir ao ar.
   - *Se decidir diferente:* se o tempo virar fato da oferta, ganha campo na ficha e entra em FATOS.

14.13. **A página nasce desatualizada e copia o preço no código.**
   - *Dúvida:* a página se apoia em documentos marcados (lead-score, funil-01, planta-do-banco, briefing e copy do quiz); e a conta do lead score precisa do preço de ficha-de-fatos#preco-avancada, que fica escrito em FATOS.
   - *O que foi feito:* nasce com desatualizado: true (regra provisória 11.1). O preço está só em FATOS, com o id do campo, e não aparece na tela; qual preço vale depois das vagas segue na 4.7.
   - *Recomendação:* aceitar FATOS como o único lugar do código onde a ficha é copiada, e conferir esse objeto a cada nova versão da ficha.
   - *Se decidir diferente:* gerar FATOS automaticamente a partir da ficha, com um script em nucleo/ferramentas/.

14.14. **Venda média abaixo de R$ 5 mil recebe a oferta do plano.**
   - *Dúvida:* pelo lead score, venda média abaixo de R$ 5 mil é eliminatória; pelo critério do Júnior (R$ 50 mil e 1 vendedor), não é. Com o critério do Júnior em uso no fim do quiz (14.2), essa pessoa vê a oferta do plano.
   - *O que foi feito:* nada; segue o conflito-16 aberto. O teste não cobre esse caso.
   - *Recomendação:* decidir junto com o conflito-16; enquanto isso, se o quiz for a teste com pessoas reais, usar o critério mais restritivo dos dois (eliminado por qualquer um).
   - *Se decidir diferente:* se valer só o critério do Júnior, o lead score perde esse eliminatório para o fim do quiz e o SDR passa a filtrar.

14.15. **O clique em "Tenho interesse" não gera evento.**
   - *Dúvida:* o pacote sai no envio do contato, antes do relatório; o clique em "Tenho interesse" de quem foi eliminado não é registrado.
   - *O que foi feito:* nada no quiz. A etapa 18 (garçom) considera um evento próprio para esse clique.
   - *Recomendação:* criar o evento "interesse_pos_relatorio" na planta e no garçom.
   - *Se decidir diferente:* o interesse do eliminado só aparece se ele mandar mensagem.
