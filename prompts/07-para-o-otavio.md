# Perguntas para o Otávio · triagem da fila da noite (etapa 19)

A triagem leu as 80 perguntas de prompts/07-fila-perguntas.md (etapas 11 a 18) e separou assim:

| Grupo | Quantas |
|---|---|
| A · Forma | 3 |
| B · Já decidido | 0 |
| C · Para o Otávio | 57 |
| D · Para o Júnior e o Euclides | 20 |
| **Total** | **80** |

As 20 do grupo D foram para a pauta da reunião com o Júnior e o Euclides. As 3 do grupo A viraram só linhas no log.md.

Este arquivo traz só o grupo C, as 57 que pedem decisão sua, em duas partes:

1. **Decisões novas** (26): o que ainda não está em prompts/06-para-o-otavio.md. Estão em ordem do que destrava mais coisa primeiro (nota 4 mexe em muitos documentos; nota 1 é só confirmação local). Quando várias perguntas são a mesma decisão, estão juntas, com o número principal primeiro.
2. **Complementos de perguntas que você já tem** (31): uma linha cada, dizendo a qual pergunta ela se soma e o que acrescenta. Ao responder a pergunta principal, a resposta vale para o complemento.

Enquanto você não responde, vale a escolha provisória já aplicada (o caminho mais conservador).

## Parte 1 · Decisões novas

### Nota 4

#### 11.1 · Quando um documento sai da marca de desatualizado
- **Pergunta:** Um documento pode sair da marca de desatualizado se ainda se apoia, direto ou por cadeia, em outro documento que está marcado?
- **Recomendação:** não. Escrever na regra de versionamento que um documento só sai da marca quando nenhuma das bases dele estiver marcada. Respondendo a 4.5 (a demonstração com os números do cliente, na sua lista anterior), a cadeia inteira sai da marca de uma vez.
- **Se decidir diferente:** cerca de 20 documentos (base, funil, planta, pauta, landing, quiz, roteiros, política, variantes, banco, garçom) voltam a ficar sem a marca numa correção de forma; só o mecanismo e a oferta continuam marcados.

### Nota 3

#### 18.4 (com 14.15, 15.16 e 16.13) · Registrar o que a pessoa clicou no fim do quiz
- **Pergunta:** O fim do quiz passa a registrar o que a pessoa clicou ("Tenho interesse", "Quero marcar uma conversa", "Agora não", o pedido do plano), para quem liga para os leads saber quem pediu contato?
- **Recomendação:** sim. Criar esses registros no banco e mostrar a quem liga uma coluna só de leitura com o clique; aí o roteiro ganha uma abertura para quem pediu conversa.
- **Se decidir diferente:** as frases "Seu interesse fica registrado" e "Horário reservado" saem da página do quiz, porque prometem o que não acontece, e o interesse de quem não passou no filtro só aparece se a pessoa mandar mensagem.

#### 16.12 (com 15.8) · O aceite por WhatsApp cobre ligação?
- **Pergunta:** Quem aceitou contato por WhatsApp pode receber ligação nesse número, ou o quiz precisa de uma caixa própria para ligação? E quem só aceitou e-mail recebe contato por e-mail de quem liga para os leads?
- **Recomendação:** até o advogado responder, ligar só para quem aceitou WhatsApp e não contatar quem só aceitou e-mail. Levar a pergunta ao advogado junto com a política de privacidade.
- **Se decidir diferente:** com caixa própria para ligação, o quiz ganha uma terceira caixa e a planta do banco um campo novo; se não puder ligar, a frase da política sai e os roteiros mudam; se o e-mail bastar, os roteiros ganham um primeiro contato por e-mail.

### Nota 2

#### 13.4 · As duas caixas de aceite no quiz
- **Pergunta:** No quiz, a pessoa marca o aceite por WhatsApp e por e-mail em duas caixas separadas, e basta uma marcada para receber o diagnóstico?
- **Recomendação:** sim, e mandar esse texto ao advogado junto com a política de privacidade.
- **Se decidir diferente:** com as duas obrigatórias, o botão só libera com as duas marcadas e o aviso muda; com uma caixa só, a planta do banco passa a guardar um aceite único.

#### 14.2 · Qual corte decide o final do quiz até a reunião
- **Pergunta:** O corte do Júnior e a nota do lead mandam a pessoa para finais diferentes, e isso vai à reunião (pauta, item 2). Até lá, a página do quiz usa o corte do Júnior, como no protótipo. Nesse caso, quem vende abaixo do mínimo de valor médio da nota do lead vê a oferta do plano. O caminho mais conservador é usar o mais restritivo dos dois: quem cai em qualquer um dos cortes não vê a oferta nem entra na fila. Qual vale no rascunho?
- **Recomendação:** o mais restritivo dos dois, numa versão nova da página, com o aviso neutro no "Tenho interesse". Fazer isso antes de qualquer teste com pessoas reais.
- **Se decidir diferente:** fica o corte do Júnior, como hoje, sabendo que essa pessoa vê a oferta do plano. Nada vai ao ar antes da reunião, então nada se perde.

#### 14.13 · Os valores da ficha de fatos dentro do código do quiz
- **Pergunta:** O código do quiz precisa do preço para calcular a nota do lead. Ele pode ter um único lugar onde os valores da ficha de fatos ficam copiados (com o nome de cada campo), conferido à mão a cada versão nova da ficha, ou esse lugar tem de ser gerado da ficha por um programa?
- **Recomendação:** aceitar o lugar único conferido à mão agora; gerar por programa quando houver mais de uma peça com código.
- **Se decidir diferente:** entra uma ferramenta que lê a ficha e escreve esse trecho do código, e a conferência à mão sai.

#### 15.14 · O que quer dizer "sem preço" na conversa com o Júnior
- **Pergunta:** Quando a decisão de 08/11 diz que a conversa com o Júnior é "sem preço", isso quer dizer que a conversa não tem custo para o lead?
- **Recomendação:** sim; quem liga pode dizer "a conversa não tem custo". A duração da conversa espera o item 7 da pauta.
- **Se decidir diferente:** se quer dizer só que não se fala de preço na conversa, muda a resposta sobre custo, e a pauta precisa dizer em que momento o lead conhece o valor.

#### 16.4 (com 16.5, 16.6 e 16.10) · O que vai para o advogado
- **Pergunta:** Na revisão do advogado, além do prazo de guarda dos dados, vão estes pontos: se o texto de aceite do quiz precisa citar a ordem da fila pela nota e os números somados; se a nutrição cabe no aceite atual; o direito de pedir revisão da nota automática; a transferência de dados para fora do Brasil e o aviso de incidente?
- **Recomendação:** sim, todos de uma vez, antes de o quiz ir ao ar.
- **Se decidir diferente:** o ponto que sair da lista fica como está na política; se o aceite precisar citar a fila e os números, o texto do quiz muda e vai ao Júnior.

#### 17.5 · O filtro das entregas na página
- **Pergunta:** A página mostra, nas entregas, um filtro pelas sete peças do sistema. Você define quais peças cada entrega instala, para o filtro funcionar, ou o filtro sai?
- **Recomendação:** definir a lista e pôr na próxima versão da copy da página.
- **Se decidir diferente:** sem a lista, saem os botões e a frase "toque para filtrar" nas duas variantes de design, e muda a última linha da seção das entregas.

#### 18.5 (com 14.11) · Registrar a visita e o início do quiz
- **Pergunta:** A página e o quiz passam a registrar a visita e o início do quiz, na próxima versão, ligados pelo mesmo código de sessão?
- **Recomendação:** sim; sem isso o painel não mostra visitas e a origem da primeira visita fica sempre vazia.
- **Se decidir diferente:** a planta do banco perde esses dois registros e a primeira visita, e o painel conta só a partir do fim do quiz.

#### 18.6 · Quem refaz o quiz: histórico do aceite e reconhecimento pelo telefone
- **Pergunta:** Quando alguém refaz o quiz, cada aceite e cada retirada de consentimento ficam guardados como histórico, valendo sempre o mais novo, e a pessoa é reconhecida só pelo telefone? Isso muda a recomendação da 6.3, da sua lista anterior, que dizia "pelo telefone ou e-mail".
- **Recomendação:** sim. Assim quem divide um e-mail não vira uma pessoa só, e quem tinha retirado o aceite e aceitou de novo passa a valer.
- **Se decidir diferente:** com a 6.3 como está, duas pessoas que dividem um e-mail podem virar uma só, e o aceite novo de quem tinha retirado não vale.

#### 18.11 · Cinco ajustes no desenho do banco antes de ligar
- **Pergunta:** Antes de ligar o banco, aceita estes ajustes: o painel lê só uma visão pronta, sem acesso à tabela com dados pessoais; a função que grava roda com os direitos do dono e só ela fica liberada para o garçom; telefone e e-mail não se repetem no banco; o garçom ganha limite de pedidos e proteção contra robôs?
- **Recomendação:** sim, todos, numa versão 2 do desenho do banco.
- **Se decidir diferente:** ficar com a chave que abre tudo é mais simples, mas um vazamento da chave do garçom abre o banco inteiro.

### Nota 1 · confirmação local

#### 13.15 · O círculo entre a pauta e o quiz
- **Pergunta:** A pauta deixa de se declarar apoiada na copy do quiz e só a cita no texto, para cortar o círculo entre pauta, copy do quiz e briefing do quiz?
- **Recomendação:** sim; a pauta aponta para a copy, mas não se apoia nela. Vale o mesmo para as duas variantes da página, que a pauta também passou a declarar.
- **Se decidir diferente:** cada versão nova de um dos três marca os outros dois como desatualizados, em volta.

#### 14.4 · Campos de número começam vazios
- **Pergunta:** No quiz, os campos de números começam vazios, em vez de virem preenchidos com os números de exemplo do protótipo?
- **Recomendação:** sim; o exemplo entraria na nota e no banco como se fosse resposta da pessoa.
- **Se decidir diferente:** os números de exemplo voltam só no modo de revisão do protótipo, nunca no caminho normal.

#### 14.5 · Valor médio da venda obrigatório
- **Pergunta:** O valor médio da venda passa a ser obrigatório no quiz para seguir?
- **Recomendação:** sim.
- **Se decidir diferente:** a nota do lead ganha uma linha "não informou" com pontos próprios.

#### 14.7 · O relatório ainda mostra um exemplo fixo
- **Pergunta:** O relatório do quiz ainda mostra um cenário fixo de exemplo, não os números da pessoa. Isso se corrige só na versão que for ao ar?
- **Recomendação:** sim, junto com a leitura escrita pela inteligência artificial; antes disso, o relatório não vai a pessoas reais.
- **Se decidir diferente:** se o relatório de exemplo bastar até a decisão do funil, nada muda agora.

#### 14.8 · Nota de quem cai num corte eliminatório
- **Pergunta:** Quem cai num corte eliminatório também tem a nota do lead calculada e guardada?
- **Recomendação:** sim; ajuda a rever as faixas depois das 50 primeiras respostas.
- **Se decidir diferente:** a nota de quem foi eliminado fica vazia ou zero.

#### 14.9 · Dois casos de borda da nota do lead
- **Pergunta:** Na nota do lead, funil todo na meta (nada de dinheiro na mesa) vale como "menos de 0,5", e número faltando conta como "sem números informados"?
- **Recomendação:** sim, e rever junto com as faixas depois das 50 primeiras respostas.
- **Se decidir diferente:** muda só a tabela de pontos desse bloco.

#### 14.12 (com 13.12) · Os "8 minutos" do quiz
- **Pergunta:** O quiz continua dizendo "8 minutos" até alguém cronometrar duas ou três pessoas reais respondendo, antes de ir ao ar?
- **Recomendação:** sim.
- **Se decidir diferente:** se o tempo virar fato da oferta, ganha campo na ficha de fatos e o quiz passa a citá-lo.

#### 15.3 · Duas colunas novas na planilha de quem liga
- **Pergunta:** A planilha de quem liga para os leads ganha duas colunas só de leitura, a data em que o lead entrou e quantos contatos já foram feitos, e a planta do banco passa a listá-las?
- **Recomendação:** sim; o prazo da faixa A e o abandono dependem delas.
- **Se decidir diferente:** quem liga conta prazo e tentativas por conta própria, e a planta fica como está.

#### 15.4 · O "histórico" que se confirma na faixa B
- **Pergunta:** O "histórico" que quem liga confirma na faixa B são as respostas do quiz sobre leads por mês e sobre a ferramenta de vendas que o cliente usa?
- **Recomendação:** sim, e a pergunta proposta no roteiro fica.
- **Se decidir diferente:** muda só a coluna e a terceira pergunta da faixa B.

#### 15.6 · Ordem dentro de cada faixa
- **Pergunta:** Dentro de cada faixa, liga primeiro quem tem nota maior e, no empate, quem entrou antes; quem estava em espera volta no dia marcado, na posição da faixa dele?
- **Recomendação:** sim.
- **Se decidir diferente:** muda só a seção "Ordem da fila" da planilha.

#### 15.10 · Ligação primeiro, WhatsApp no mesmo dia
- **Pergunta:** No primeiro contato, quem liga para os leads tenta primeiro a ligação e, sem resposta, manda WhatsApp no mesmo dia?
- **Recomendação:** sim; a promessa do quiz de chamar pelo WhatsApp continua verdadeira, porque a confirmação vai pelo WhatsApp.
- **Se decidir diferente:** com WhatsApp primeiro, a faixa B continua precisando de ligação para confirmar; muda só a ordem no roteiro.

#### 15.13 · As falas de quem liga e a voz do Júnior
- **Pergunta:** As falas de quem liga para os leads seguem o tom de voz da casa, sem passar pela voz do Júnior, porque quem liga fala em nome da equipe?
- **Recomendação:** sim; a voz do Júnior vale para o que sai em nome dele.
- **Se decidir diferente:** as falas são reescritas na voz do Júnior, o que soa estranho na boca de outra pessoa.

#### 17.1 · Seções escondidas nos rascunhos de design
- **Pergunta:** Nos rascunhos de design para a reunião, as seções inteiras escondidas da página (preço riscado, credenciais e outras) ficam fora, só como comentário, enquanto cada campo pendente aparece como "a definir"?
- **Recomendação:** sim; na versão que for ao ar, os avisos somem junto com cada decisão.
- **Se decidir diferente:** entra um bloco "a definir" por seção escondida, nas duas variantes.

#### 18.9 · A chave do banco quando a conta existir
- **Pergunta:** Quando a conta do banco for criada, usamos a chave secreta nova, que pode ser cancelada sozinha, no lugar da chave antiga?
- **Recomendação:** sim, e conferir no primeiro teste, num projeto de teste.
- **Se decidir diferente:** com a chave antiga, nada muda no código.

## Parte 2 · Complementos de perguntas que você já tem

Ao responder a pergunta principal, a resposta vale também para estas.

### Somam-se a perguntas de prompts/06-para-o-otavio.md

- **15.1** · soma-se à 5.1 (quem aprova o funil): a planilha e os roteiros de quem liga seguem a mesma aprovação do funil; os roteiros também esperam o "vendedor chato" (pauta, item 19).
- **15.5** · soma-se à 5.2 (o que cada estágio quer dizer): a faixa A chega como captada, e quem liga marca a passagem a pré-qualificado no contato.
- **15.11** · soma-se à 5.3 (nutrição como situação do contato): a faixa B que cai num corte na confirmação vai para a nutrição.
- **16.8** · soma-se à 5.4 (onde fica a planilha de quem liga): a política de privacidade continua falando em funções, sem nomes de pessoas.
- **14.10** · soma-se à 5.5 (as etiquetas dos links): a página lê só as duas etiquetas da planta, e qualquer origem fora da lista, inclusive anúncios da Meta, entra em branco.
- **18.7** · soma-se à 5.5: o garçom grava o lead com a origem fora da lista em branco, em vez de recusar o pacote, e o banco é a última trava.
- **18.1** · soma-se à 6.1 (quem aprova a planta do banco): vale o mesmo para o banco e o garçom.
- **15.7** · soma-se à 6.5 (nada de texto livre no motivo da perda): a regra vale para a planilha inteira; se faltar algo, vira lista fechada.
- **18.2** · soma-se à 6.6 (uma chave por uso, com a menor permissão): o garçom ganha um papel próprio, que só executa a função de gravação, e deixa de usar a chave que abre tudo.
- **18.3** · soma-se à 6.6: as chaves de leitura (planilha, painel, contador) e da volta da situação são criadas cada uma com o seu papel, numa versão 2 do banco, e registradas no registro de contas.
- **18.8** · soma-se à 6.6: quem confere a entrega e a versão é o banco, e o garçom não lê nenhuma tabela; a planta é ajustada na próxima versão.
- **16.9** · soma-se à 6.8 (prazo de guarda com o advogado): a política espera a mesma decisão.
- **18.10** · soma-se à 6.8: junto com o prazo, escrever o caminho de apagamento (o que se apaga, o que vira anônimo, quem faz e como fica registrado), porque hoje o banco recusa apagar qualquer registro.
- **14.1** · soma-se à 10.7 (nenhuma ferramenta de terceiros que colha dado do visitante): as fontes de letra do Google recebem o endereço de quem abre a página do quiz; servir as fontes junto com a página.
- **16.7** · soma-se à 10.7: se as fontes forem servidas junto com a página, a linha delas sai da política de privacidade; se o Google ficar, a política cita o serviço.
- **17.4** · soma-se à 10.7: as duas variantes de design ficaram sem fonte de fora; se a variante A for escolhida, a letra dela é baixada e servida junto com a página.
- **14.3** · soma-se à 10.15 (nome fixo da página publicada): o nome no catálogo de entregas é o da pasta da entrega (quiz-01, landing-page-01), não o do arquivo.
- **17.7** · soma-se à 10.15: o registro da visita nas variantes usa esse mesmo nome; o endereço público do quiz e a ligação com o garçom entram quando existirem.

### Somam-se a decisões novas desta lista

- **13.10** · soma-se à 11.1: o briefing e a copy do quiz nasceram marcados como desatualizados.
- **15.15** · soma-se à 11.1: a planilha e os roteiros de quem liga nasceram marcados como desatualizados.
- **16.11** · soma-se à 11.1: a política de privacidade nasceu marcada como desatualizada.
- **17.8** · soma-se à 11.1: as duas variantes de design nasceram marcadas como desatualizadas.
- **14.15** · soma-se à 18.4: é o clique em "Tenho interesse" de quem não passou no filtro, que hoje não é registrado.
- **15.16** · soma-se à 18.4: quem liga não sabe se o lead pediu conversa ou disse "Agora não"; com o registro, a planilha ganha a coluna e o roteiro uma abertura própria.
- **16.13** · soma-se à 18.4: a página do quiz diz "fica registrado" e "Horário reservado" sem gravar nada. A outra parte desta pergunta (uma ressalva no texto de ajuda do contato) foi para a pauta, porque é texto do Júnior.
- **15.8** · soma-se à 16.12: hoje se liga só para quem aceitou WhatsApp, quem só deu e-mail não é contatado, e o pedido para parar vira perda com aviso a você.
- **16.5** · soma-se à 16.4: a nutrição ainda não tem canal nem conteúdo; quando for desenhada, o advogado diz se cabe no aceite atual.
- **16.6** · soma-se à 16.4: a política já diz que a nota do lead é automática e que a pessoa pode pedir revisão; o advogado confirma.
- **16.10** · soma-se à 16.4: a transferência para fora do Brasil ficou "a definir" e o aviso de incidente entrou em termos gerais; o advogado confere os dois.
- **14.11** · soma-se à 18.5: hoje o quiz grava só o fim; o código de sessão já nasce ao abrir a página, pronto para os outros registros.
- **13.12** · soma-se à 14.12: o quiz também não tem meta de conclusão registrada, e nenhuma foi inventada.
