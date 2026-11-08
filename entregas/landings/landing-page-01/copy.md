---
id: landing-page-01-copy
versao: 1
status: rascunho
aprovado_por:
  otavio: pendente
  junior: pendente
  euclides: pendente
depende_de:
  - id: landing-page-01-briefing
    versao: 1
  - id: tom-de-voz
    versao: 2
  - id: glossario
    versao: 2
  - id: provas-e-conformidade
    versao: 2
  - id: ficha-de-fatos
    versao: 3
  - id: persona
    versao: 2
  - id: promessa
    versao: 2
  - id: decisoes
    versao: 3
  - id: lacunas
    versao: 4
  - id: mecanismo
    versao: 1
  - id: entregas-do-servico
    versao: 2
  - id: funil-01
    versao: 1
  - id: lead-score
    versao: 1
  - id: oferta
    versao: 1
desatualizado: false
---

# Copy · landing-page-01

O texto da landing-page-01, seção por seção, na ordem do briefing (`landing-page-01-briefing`). A ordem final, a hierarquia e o celular são da etapa 10.

**Status.** Rascunho, avisando que pode mudar. A página existe por causa da #90, pendente do Júnior e do Euclides, e cita o Euclides nas calls em grupo (9.10): por isso os dois estão em aprovado_por. A voz se apoia no `tom-de-voz`, pendente do Júnior. A copy ainda não passou pelo teste com donos do perfil (lacuna-25). Nada aqui vai ao ar antes do quiz-01 publicável (conflito-09) e da revisão de advogado (`provas-e-conformidade`).

**Documentos desatualizados.** Esta copy se apoia em documentos marcados desatualizados (tom-de-voz, glossario, provas-e-conformidade, persona, promessa, entregas-do-servico, funil-01, lead-score, pela cascata de lacunas v4) e precisa ser revista depois da pergunta 6.9; usa `mecanismo` (só o título da Big Idea, #48, e a ordem de revelação) e `oferta` (só a troca pelo caso documentado, no FAQ), e precisa ser revista depois da 4.5. Nada sobre o papel da Análise foi tirado de `mecanismo` nem de `oferta`: vale a #92 e a ficha.

**Como ler.**
- `{{ficha-de-fatos#campo}}`: o fato entra pelo campo da ficha, nunca copiado. `{{ficha-de-fatos#nomes-das-entregas:n}}` é o item n da lista do campo, exatamente como está lá.
- `{{BLOQUEADO: ficha-de-fatos#campo}}` ou `{{BLOQUEADO: #n}}`: o lugar existe, o texto não vai ao ar até a decisão.
- `[PENDENTE: x]` antes de um trecho: o trecho foi escrito, mas depende da decisão ou pergunta x e pode mudar.
- `[PROVA REAL: ...]`: falta comprovante ou autorização; nada entra no lugar.
- **Seção oculta:** existe no rascunho e não vai ao ar.
- `{{ficha-de-fatos#campo:parte}}`: só a parte nomeada do valor do campo, sem o resto (9.13). Partes usadas: deming-percentual:percentual (o número); tempos-da-analogia:rucula, :morango, :melancia (o número de dias de cada cultura); calls-em-grupo:formato e :quantidade; sessoes-de-comando:quantidade (o número de sessões) e :quando (a semana de cada uma, só os marcos decididos, sem a proposta da engenharia reversa); analise-de-calls:volume (quantas calls por cliente por semana); execucao-do-time:prazo (só a duração, "uma semana", sem preposição); grupo-de-suporte:canal ("um grupo por cliente, com atendimento", sem a IA de consulta nem o nome do aplicativo); sistema-instalado:dia (só o dia, sem a frase do campo); barra-de-resgates:limite. Nomes das entregas pelo item do campo (:n): 9.8.
- Em cada seção, **Notas** traz as fontes e o que está marcado. Escolhas provisórias desta copy: perguntas 9.1 a 9.17 (prompts/05-fila-perguntas.md).

**Voz.** "A gente" no lugar da Triad ou do Júnior em primeira pessoa, porque quem assina está em conflito (ficha-de-fatos#nome-agencia; conflito-07). Frases curtas, pergunta seguida da própria resposta, negações na língua do dono, número no lugar de adjetivo, zero pressão (`persona`, tema 5). Da skill junior-neves-voice ficou o ritmo; a gíria e a autoridade autodeclarada ficaram fora (9.4).

---

## Bloco de chamada (repete ao fim das seções 02, 03, 03b, 05, 06, 07 e 09)

- **Botão:** "Quero responder as perguntas do meu funil" {{BLOQUEADO: ficha-de-fatos#analise-nome-publico}}
- **Linha abaixo do botão:** "Sem custo na promoção de lançamento."
- **Contador de escassez:** seção oculta. Só aparece quando a contagem real passar do limite {{ficha-de-fatos#barra-de-resgates:limite}}.

**Notas.** Texto neutro: diz a ação sem o nome da Análise (briefing, bloco de chamada; 8.4; 9.2). O botão decidido pelo Otávio usa um dos nomes em conflito e volta quando o nome sair. A gratuidade segue ficha-de-fatos#analise-gratuidade, com o fim real em ficha-de-fatos#analises-gratuitas, dita como promoção de lançamento (Otávio, 03/11; 9.3). Sem barra, sem porcentagem, sem contagem regressiva (#93; `tom-de-voz`). Destino: a seção 08 (8.5).

---

## Cabeçalho fixo

- **Logo:** {{BLOQUEADO: ficha-de-fatos#nome-agencia}}
- **Botão secundário:** "Responder as perguntas" {{BLOQUEADO: ficha-de-fatos#analise-nome-publico}}

**Notas.** Logo bloqueado pelo nome da agência (conflito-07) e pelo design system (conflito-08). Botão curto, mesmo destino do bloco de chamada (sugestão do wireframe, não confirmada).

---

## 01 · Hero

### Versão A (teste)

- **Qualificador:** {{BLOQUEADO: ficha-de-fatos#criterio-de-qualificacao}}
- **Título:** {{BLOQUEADO: #85}}
- **Subtítulo:** {{BLOQUEADO: #85}}
- **Botão:** bloco de chamada.

### Versão B (hero único provisório enquanto a A estiver bloqueada)

- **Qualificador:** {{BLOQUEADO: ficha-de-fatos#criterio-de-qualificacao}}
- **Título, as duas linhas:** [PENDENTE: 8.3] [PROVA REAL: vendas colhidas de leads que nunca disseram não, num cliente fundador]
  - "Resgate o lucro que está oculto no seu negócio."
  - "Ele está nos leads que nunca disseram não e foram ignorados quando os novos leads chegaram."
- **Subtítulo:** {{BLOQUEADO: #85}}
- **Botão:** bloco de chamada.

**Contador "Total gerado":** seção oculta. [PROVA REAL: contagem real e comprovante de {{BLOQUEADO: ficha-de-fatos#total-dos-dois}}]

**Vídeo:** nenhum lugar reservado (8.6).

**Notas.** O A recebe a versão fria da promessa só quando a #85 for aprovada (`promessa`, "Onde cada versão entra"); até lá, nada da #33 nem da #85, e nada de "sem precisar mudar uma vírgula no seu marketing" (conflito-03). O título do B é texto do Otávio (wireframe, 04/11), com o destaque em "nunca disseram não"; ele usa como hero único a recomendação da 8.3, ainda sem resposta (9.1). O título fica como o Otávio escreveu, mas "lucro" pede a margem do cliente (lacuna-09) e o benefício pede prova de vendas de leads que nunca disseram não (`provas-e-conformidade`; `mecanismo`): marcado [PROVA REAL] (9.14). O subtítulo do B adapta a #33 e fica bloqueado, como manda o briefing; a proposta de subtítulo neutro está na 9.1. Qualificador e contador bloqueados (conflito-01, conflito-04, conflito-05).

---

## Faixa de bastidores

Seção oculta. [PROVA REAL: autorização de nome e imagem de cada terceiro citado (Código Civil, art. 18) e comprovante de {{BLOQUEADO: ficha-de-fatos#credenciais-44}}]

**Notas.** Briefing, faixa de bastidores; conflito-05; #25, #44.

---

## 02 · Sistema de Vendas

- **Sobretítulo:** Por que a venda fica cara
- **Título:** {{ficha-de-fatos#deming-percentual:percentual}}* dos problemas de vendas são problemas de Sistema de Vendas.
- **Nota de rodapé:** [PENDENTE: 4.4] * Adaptado de W. Edwards Deming, o pai da qualidade, no livro Out of the Crisis.

**Quadro do "não é"**
- Quando a venda trava, quase nunca é o que parece.
- Não é o seu vendedor.
- Não é falta de poder de persuasão.
- Não é o script de vendas.
- Não é contratar um vendedor melhor.
- Não é falta de técnica para quebrar objeção.
- Não é comprar mais lead.

**Texto em duas colunas**
- Quando querem vender mais, as empresas fazem ações isoladas: mais anúncio, script novo, outro vendedor. É o jeito mais caro de vender, porque uma ação não conversa com a outra.
- Num Sistema de Vendas, cada etapa alimenta a próxima, e nenhum lead é largado só porque o mês virou. Por isso as etapas não se somam: uma muda a conta da outra.

**Imagem 1**
- **Rótulo:** "Como funciona na sua empresa"
- **Legenda:** De olhos vendados, sem um sistema, o dono arremessa lead atrás de lead. A maioria cai fora. De vez em quando, um acerta.

**Imagem 2**
- **Rótulo:** "Como funciona no Sistema de Vendas Safra"
- **Legenda:** O dono põe cada lead na esteira e acompanha cada etapa na tela. O sistema leva o lead, etapa por etapa, até quem fecha.

**Diagrama**
- **Título:** Ações isoladas somam peças soltas. Sistema de Vendas liga as etapas.
- **Lado 1 · Ações isoladas.** Uma ação não conversa com a outra.
  - Peças soltas: Anúncio (mede leads) · Quem agenda (mede agendamentos) · Quem fecha (mede as vendas do mês) · Pós-venda (sem dono).
  - O que cai entre elas: Lead sem resposta · Conversa marcada que não aconteceu · Cliente que ninguém procurou.
  - Resultado: vendas mais caras · ticket médio menor · {{BLOQUEADO: #16}} cliente que compra uma vez só.
- **Lado 2 · Sistema de Vendas.** Cada etapa alimenta a próxima.
  - Ciclo: Anúncio · Pré-qualificação · Agendamento · Comparecimento · Fechamento · {{BLOQUEADO: #16}} Recompra.

**Comparação em barras** (selo "Exemplo")
- **Título:** Mais anúncio multiplica o custo. Sistema de Vendas muda a conta.
- **Hoje:** 20 vendas · R$ 50 mil de anúncio · R$ 2.500 por venda.
- **Dobrar o anúncio:** 30 vendas · R$ 100 mil de anúncio · R$ 3.333 por venda.
- **Pensar como sistema:** 40 vendas · R$ 50 mil de anúncio · R$ 1.250 por venda.
- **Rodapé:** Números redondos para mostrar a conta. Não é resultado de cliente nem previsão.

**Cartões**
- **Título:** Ação isolada piora os números do seu caixa.
- **Quanto custa cada venda:** na ação isolada, sobe a cada lead que fica sem resposta.
- **Quanto entra em cada venda:** na ação isolada, cai quando ninguém trabalha o lead até o fim.
- **Quanto cada cliente compra no tempo:** {{BLOQUEADO: #16}} na ação isolada, quase ninguém volta a procurar quem já comprou.

**Botão:** bloco de chamada.

**Notas.** O título de Deming fica como está, com o asterisco, pela exceção da #94 (conflito-13); o placeholder do título traz só o percentual do campo (9.13). A nota leva o "Adaptado de", como manda ficha-de-fatos#deming-percentual, marcada até a resposta da 4.4. Rótulos das imagens: decididos (Otávio, 03/11). "SDR" e "closer" trocados por "quem agenda", "quem fecha" e "vendedor" (conflito-12; `tom-de-voz`). A frase "quem fecha só fecha a venda" saiu da legenda da imagem 2: é a tese do closer, que depende do Júnior (#87; lacuna-08) e não entra (briefing). O lado 2 do diagrama mostra só o ciclo, sem lista de ganhos (texto neutro sem promessa). "Não é falta de lead" virou "Não é comprar mais lead", para não encostar na frase gasta "o problema não é lead" (`tom-de-voz`), e "o pior Sistema de Vendas que existe" virou "o jeito mais caro de vender" (9.7). "Reunião" trocada por "agendamentos", "conversa marcada" e "comparecimento" (etapas do método; `tom-de-voz`, resposta 5; 9.6). "LTV" traduzido, e tudo o que é recompra fica {{BLOQUEADO: #16}} (outros-10). Os cartões não dizem o que melhora no sistema: espelham os três ganhos da #33, pendente, e não podem virar promessa. O título das barras, o título do diagrama, o "baixa eficácia" e "máxima eficácia" do diagrama e o "nenhum lead sai da lista" das colunas foram suavizados (9.7). Os números das barras são ilustrativos, com selo e rodapé (`provas-e-conformidade`); a comparação vai para a revisão de advogado antes de ir ao ar, porque compara um resultado ilustrativo com o do sistema (9.7). Na releitura, "ninguém volta a falar" virou "quase ninguém", "elas se multiplicam" virou "uma muda a conta da outra" e "acompanha tudo" virou "acompanha cada etapa". O cartão da HBR continua fora.

---

## 03 · Big Idea

- **Sobretítulo:** Sistema de Vendas Safra
- **Título:** Você já pagou pelas suas próximas vendas.
- **Subtítulo:** Uma parte delas está parada nos leads que ninguém voltou a procurar.

**Texto**
- Todo mês, o seu time corre atrás do lead novo. No dia 30, quem ainda não comprou fica para trás, e quase ninguém volta a falar com ele.
- Ele disse não? Não. Só parou de ser trabalhado.
- Isso tem nome: Gestão Mensal de Leads. Ela costuma deixar dinheiro na mesa, em leads que você já pagou para ter.
- A saída é a Gestão de Leads por Safra: cada lead trabalhado no tempo dele, e não no tempo do mês.

**Quadro da horta**
- **Rótulo:** Os leads de um mesmo mês, do dia 0 ao dia {{ficha-de-fatos#tempos-da-analogia:melancia}}
- **Título:** Cada lead é uma planta. Cada planta tem o seu tempo.
- **Chave:** Vire a chave e compare · Gestão Mensal de Leads · Gestão de Leads por Safra
- **Número no canto de cada planta:** {{ficha-de-fatos#tempos-da-analogia:rucula}} na rúcula · {{ficha-de-fatos#tempos-da-analogia:morango}} no morango · {{ficha-de-fatos#tempos-da-analogia:melancia}} na melancia
- **Lado da Gestão Mensal · O mês fecha no dia 30.**
  - Lead 1 · Rúcula · pronta em uns {{ficha-de-fatos#tempos-da-analogia:rucula}} dias · Colhido (vendido) no dia 30.
  - Lead 2 · Morango · pronto em uns {{ficha-de-fatos#tempos-da-analogia:morango}} dias · Parou de ser cultivado e morreu.
  - Lead 3 · Melancia · pronta em uns {{ficha-de-fatos#tempos-da-analogia:melancia}} dias · Parou de ser cultivado e morreu.
  - Placar: colhido 1 de 3. Dois de três ficaram na mesa. Você pagou pelos três leads e vendeu para um.
- **Lado da Gestão por Safra · Cada lead no tempo dele.**
  - Lead 1 · trabalhado até o dia {{ficha-de-fatos#tempos-da-analogia:rucula}}. Lead 2 · trabalhado até o dia {{ficha-de-fatos#tempos-da-analogia:morango}}. Lead 3 · trabalhado até o dia {{ficha-de-fatos#tempos-da-analogia:melancia}}.
  - Placar: 3 de 3 trabalhados no tempo de cada um.

**A metáfora**
- Venda de alto valor é melancia. E você trata os seus leads como rúcula.
- **Selo na foto:** Tratada como rúcula
- No Sistema de Vendas Safra, cada lead é trabalhado no tempo dele. O sistema diz quem chamar e quando.

**Frase de impacto:** Perdido é só quem disse não.

**Botão:** bloco de chamada.

**Ponte para a 03b:** A Gestão de Leads por Safra é só uma das peças do Sistema de Vendas Safra.

**Notas.** Título aprovado (#48). Ordem de `mecanismo` ("Na copy"): o sintoma primeiro, depois o nome do problema (#40), depois a saída. A horta aparece junto com o método, nunca no problema (#56; `tom-de-voz`); O título do quadro não usa "colheita": é título, e vem antes das plantas (regra de 22/10; 9.16). "Colhido" aparece só dentro do quadro, já com a analogia na tela. Os tempos das plantas vêm só do campo; o "95%" da analogia fica fora (`provas-e-conformidade`). "Ticket" virou "valor" na metáfora. O subtítulo do wireframe ("sacar o dinheiro que já existe no seu cemitério de leads") foi trocado por uma frase que o dono confere sozinho (teste do "sei, claro"; 9.7). "Perdido é só quem disse não" vem da regra do Júnior (F1); a frase-assinatura da promessa não entra (#85). Placar e plantas são analogia, não número de cliente. O lado da Gestão por Safra não diz que os três foram vendidos nem que nada fica na mesa: diz só que cada um foi trabalhado no seu tempo (9.17).

---

## 03b · O que é o Sistema de Vendas Safra

- **Sobretítulo:** O que é o Sistema de Vendas Safra
- **Título:** Sete peças ligadas. Um só Sistema de Vendas.
- **Texto:** Ação isolada mexe numa peça de cada vez. O Sistema de Vendas Safra liga as sete: o que uma aprende, a outra usa. Até o {{ficha-de-fatos#sistema-instalado:dia}}, a gente instala todas no seu comercial; depois, acompanha até o fim de {{ficha-de-fatos#duracao}}.
- **Centro do anel:** Sistema de Vendas Safra

**Cartão do método**
- O método proprietário
- Gestão de Leads por Safra
- Cada mês de captação vira uma safra, com relógio contado do dia em que cada lead entra e meta para cada etapa. É o que mostra de qual safra vem cada venda e onde ela quebra.

**Uma linha por peça**
- **Mentalidade de Vendas:** [PENDENTE: #26] O time não larga o lead antes do não nem antes do fim do relógio dele, e cada contato tem data marcada.
- **Inteligência Humana:** [PENDENTE: 8.12] Quem vende, preparado com as calls de venda do próprio time analisadas ({{ficha-de-fatos#analise-de-calls:volume}}).
- **Inteligência de Mercado:** O que o seu cliente pergunta e objeta vira roteiro e argumento.
- **Inteligência Artificial:** [PENDENTE: lacuna-21] Apoio para o time ler os números e preparar os roteiros.
- **Processos:** A régua de contato, as regras do CRM e o rito da semana, tudo por escrito no {{ficha-de-fatos#nomes-das-entregas:7}}.
- **Dados:** Cada número com a safra de onde veio, contra a meta de etapa que você aprovou.
- **Tecnologia:** O CRM montado por safra e o painel ligado às suas ferramentas.
- **Última linha:** Em "Como funciona", logo abaixo, você toca em cada peça e vê as entregas que a instalam.

**Botão:** bloco de chamada.

**Notas.** Peças e centro do anel: #69 e Otávio (07/11). O relógio contado do dia em que o lead entra segue a #41. A linha da Mentalidade usa a postura do "vendedor chato" (#26), que depende do Júnior (lacuna-20), com as palavras de `entregas-do-servico` ("não larga o lead antes do não nem antes do fim do relógio"), sem o absoluto "até o sim ou o não". A linha da Inteligência Humana troca a "reunião de safra" (8.12) pela análise de calls (ficha-de-fatos#analise-de-calls). A linha da IA sai sem os agentes e sem o GSAAS (#68, #84) e com a IA como meio, nunca manchete; o uso real de IA nas entregas ainda não está registrado (lacuna-21). "Playbook" só como nome de entrega (`tom-de-voz`). "CRM" fica no corpo (9.7).

---

## 04 · Credenciais

Seção oculta, inteira.

- [PROVA REAL: comprovante de {{BLOQUEADO: ficha-de-fatos#total-dos-dois}}]
- [PROVA REAL: comprovante de {{BLOQUEADO: ficha-de-fatos#lancamento-finch}} e de {{BLOQUEADO: ficha-de-fatos#camila-vieira}}]
- [PROVA REAL: comprovante de {{BLOQUEADO: ficha-de-fatos#credenciais-44}} e autorização de nome e imagem de cada terceiro]
- [PROVA REAL: fotos reais ou novas do Euclides e do Júnior; retrato por IA só sinalizado; foto com terceiro por IA nunca]
- [PROVA REAL: comprovante guardado para o título "Você ainda não conhece o Sistema de Vendas Safra, mas conhece o que ele fez."]
- [PROVA REAL: as três condições do depoimento sobre o Marçal]

**Notas.** Briefing, seção 04; `provas-e-conformidade`, regra jurídica 2; conflito-05. A versão mínima da 8.7 não foi escrita, porque a 8.7 está sem resposta (9.11). Nenhum número, nome de terceiro, foto ou depoimento entra no lugar.

---

## 05 · Como funciona

- **Sobretítulo:** Como funciona
- **Título:** O sistema instalado até o {{ficha-de-fatos#sistema-instalado:dia}}. Depois, acompanhamento até o fim do serviço.
- **Frase de impacto no topo das entregas:** Não é mentoria. É o sistema instalado dentro da sua operação, entrega por entrega. {{BLOQUEADO: #85}} (a segunda metade: "não é com alguém da equipe")
- **Mensagem da instalação:** Até o {{ficha-de-fatos#sistema-instalado:dia}}, a gente entrega todo o nosso arsenal de conhecimento, e o sistema fica instalado.
- **Filtro:** As peças que cada entrega instala · toque para filtrar · Todas · Mentalidade de Vendas · Inteligência Humana · Inteligência de Mercado · Inteligência Artificial · Processos · Dados · Tecnologia

**Linha do tempo**
- [PENDENTE: lacuna-01] Três marcos, do começo ao fim de {{ficha-de-fatos#duracao}}: {{ficha-de-fatos#nomes-das-entregas:1}}: {{ficha-de-fatos#quando-entrega-1}} · sistema instalado: {{ficha-de-fatos#sistema-instalado:dia}} · {{ficha-de-fatos#nomes-das-entregas:8}}: {{ficha-de-fatos#quando-entrega-8}}.
- [PENDENTE: 8.11] Fases de cor, só pela ordem e pelo que acontece em cada uma:
  - Primeira fase: logo depois da instalação, o time ainda estranha o jeito novo.
  - Segunda fase: os primeiros números por safra aparecem no painel, e o time começa a acreditar.
  - Terceira fase: o sistema rodando, pronto para crescer.
- **Aviso junto da linha do tempo:** Datas de referência, que podem mudar antes do seu início.

**As entregas** (nome exatamente como no campo; semana pelo campo de cada uma)

*Ponto de partida*
- **01 · {{ficha-de-fatos#nomes-das-entregas:1}}** · {{ficha-de-fatos#quando-entrega-1}} · A gente lê os seus últimos meses de leads e acha a etapa onde a venda quebra.

*Preparo do solo*
- **02 · {{ficha-de-fatos#nomes-das-entregas:2}}** · {{ficha-de-fatos#quando-entrega-2}} · O CRM que você já usa, montado por safra, com as regras do sistema. O seu time executa as mudanças em {{ficha-de-fatos#execucao-do-time:prazo}}, a partir da tarefa passada pelo Junior Neves.
- **03 · {{ficha-de-fatos#nomes-das-entregas:3}}** · {{ficha-de-fatos#quando-entrega-3}} · A régua de contato e os roteiros que o seu time usa em cada tentativa.
- **05 · {{ficha-de-fatos#nomes-das-entregas:5}}** · {{ficha-de-fatos#quando-entrega-5}} · Cada safra e cada etapa na sua tela, ligado aos seus dados.
- **07 · {{ficha-de-fatos#nomes-das-entregas:7}}** · {{ficha-de-fatos#quando-entrega-7}} · O sistema por escrito, para o seu time rodar sem a gente.

*Colheita e plantio*
- **04 · {{ficha-de-fatos#nomes-das-entregas:4}}** · {{ficha-de-fatos#quando-entrega-4}} · O seu time volta aos leads que você já pagou e que nunca disseram não.
- **06 · {{ficha-de-fatos#nomes-das-entregas:6}}** · {{ficha-de-fatos#quando-entrega-6}} · [PENDENTE: 8.12] A parte teórica primeiro. Depois, {{ficha-de-fatos#analise-de-calls:volume}}, analisadas e devolvidas.

*Encerramento*
- **08 · {{ficha-de-fatos#nomes-das-entregas:8}}** · {{ficha-de-fatos#quando-entrega-8}} · Os números de cada safra, etapa por etapa.

**Anel de volta:** Do relatório, a próxima safra já começa lida.

**Do começo ao fim**
- **Sessões de Comando com o Junior Neves:** {{ficha-de-fatos#sessoes-de-comando:quantidade}}, com você e o seu head comercial: {{ficha-de-fatos#sessoes-de-comando:quando}}.
- **Calls em grupo:** [PENDENTE: 9.10] {{ficha-de-fatos#calls-em-grupo:formato}}. Quantidade: {{BLOQUEADO: ficha-de-fatos#calls-em-grupo:quantidade}}
- **Grupo de suporte:** entre uma conversa e outra, o seu time tem onde perguntar: {{ficha-de-fatos#grupo-de-suporte:canal}}.

**Botão:** bloco de chamada.

**Notas.** Entregas, nomes e ordem por ficha-de-fatos#numero-de-entregas e ficha-de-fatos#nomes-das-entregas, com a horta só na descrição (#56); o Playbook da Gestão de Vendas por Safra no preparo do solo (#75); a entrega 1 na semana do campo (#72). "Sistema instalado" pode; "resultado" nesse prazo, não (`tom-de-voz`; CTX §8). A mensagem do "arsenal" é a da #80. "Não é mentoria" pode (#53); a outra metade da frase do Júnior depende da #85. Nomes de fase do método no corpo, porque o mecanismo já foi explicado em 03 e 03b; a primeira fase virou "Ponto de partida" para não confundir com a Análise da porta de entrada, e a última virou "Encerramento", porque "Fechamento" é nome de etapa do funil (9.15). As calls em grupo saem só do campo, sem prometer frequência nem condutor além dele (CDC, art. 30; 9.10). Linha do tempo só com os três marcos e marcada (lacuna-01); fases de cor sem a parte de cada uma (8.11; 9.9); a cor em si é do design, bloqueado (conflito-08). O cartão da entrega 6 troca a "reunião semanal de safra" (8.12) pelo que vale: ficha-de-fatos#quando-entrega-6 e ficha-de-fatos#analise-de-calls. A entrega 2 diz que o time do cliente executa (#74; 9.12). O grupo de suporte aparece como apoio entre os ritos, nunca como o acesso principal (`persona`, barreira 3), e só pela parte :canal: a IA de consulta não é anunciada, porque quem a constrói ficou para depois (#84). Saem o GSAAS (#68, #84), a "Mentoria 1:1" (#83) e o The Profit (#81).

---

## 06 · Painel de Safras

- **Sobretítulo:** Com o Sistema de Vendas Safra, você vê cada etapa enquanto ela acontece
- **Rótulo:** {{ficha-de-fatos#nomes-das-entregas:5}}
- **Título:** Cada lead no seu tempo. Cada etapa na sua tela.
- **Subtítulo:** Um painel ligado às suas ferramentas, com duas visões e só os números que você precisa ver. O dono enxerga o time inteiro. O vendedor enxerga o dia dele.
- **Quando:** {{ficha-de-fatos#quando-entrega-5}}.

**Aba "Para quem gere o time":** Abrir uma tela de manhã e saber qual safra está perto do fim, onde a venda está travando e qual vendedor precisa de ajuda. Tudo numa tela só.
- **Painel de Safras:** Cada safra, cada etapa e cada vendedor, com o relógio à vista.
- **Onde a safra trava:** Cada etapa contra a meta que você aprovou. Você sabe onde mexer antes de a safra fechar.
- **Leads que nunca disseram não:** Os leads que você já pagou e que ainda estão no campo.
- **Prioridade da semana:** [PENDENTE: 8.12] O esforço do time vai para a safra perto do fim e abaixo da meta.
- **Avaliação de calls:** Objeções e próximos passos das calls do seu time.

**Aba "Para o vendedor":** Abrir o dia e saber com quem falar, quando e o que dizer. Sem depender da memória.
- **Contatos de hoje:** Quem tem contato marcado para hoje, safra por safra.
- **Relógio do lead:** Quantos dias cada lead ainda tem antes do fim do relógio.
- **Roteiro de cada tentativa:** A mensagem certa para cada contato da régua.
- **Histórico do lead:** Tudo o que o lead já disse, num lugar só.
- **Retorno das calls:** O que ajustar na próxima conversa.

**Janela do painel:** selo "Dados de exemplo" sempre à vista. Nomes e números fictícios; a tabela de etapas usa as metas de {{ficha-de-fatos#metas-por-etapa}}; a pauta da semana segue o nome provisório acima.

**Botão:** bloco de chamada.

**Notas.** Sai a tela "Agentes de IA" com o selo GSAAS (#68; lacuna-14). O painel ligado aos dados do cliente segue a #71. A tela "Reunião de safra" ganhou o nome provisório "Prioridade da semana", com o mesmo conteúdo, até a resposta da 8.12 (9.6). O sobretítulo perdeu o "tudo", que era absoluto, e "dois dashboards" virou "um painel com duas visões": a base descreve um painel (`entregas-do-servico`, seção 5), e as duas visões são as duas abas do wireframe (9.7). "Feedback" virou "Retorno". "Ninguém vira perdido sem dizer não" saiu: o lead também sai no fim do relógio e por ficha-de-fatos#tentativas-ate-abandonado. "Toda semana" saiu das telas, porque nenhum campo fixa essa frequência para elas. "Sem planilha" saiu, porque a planilha é um dos acessos que o cliente libera (ficha-de-fatos#insumo-do-cliente). "As vendas que você já pagou e ainda pode colher" virou "os leads que ainda estão no campo", sem promessa de venda. Mockup com dados fictícios não é prova (`provas-e-conformidade`).

---

## 07 · Para quem é

- **Sobretítulo:** Para quem é
- **Título:** Antes de responder, veja se o sistema é para o seu momento.

**É para você se:**
- Você é dono ou sócio e decide sobre o comercial.
- {{BLOQUEADO: ficha-de-fatos#criterio-de-qualificacao}} (valor da venda)
- {{BLOQUEADO: ficha-de-fatos#criterio-de-qualificacao}} (faturamento)
- {{BLOQUEADO: ficha-de-fatos#criterio-de-qualificacao}} (leads todo mês)
- {{BLOQUEADO: ficha-de-fatos#criterio-de-qualificacao}} (gente vendendo além do dono)
- Quer o sistema instalado dentro da sua operação, e não mais um curso ou mentoria.
- Topa abrir os números do seu comercial.

**Não é para você se:**
- {{BLOQUEADO: ficha-de-fatos#criterio-de-qualificacao}} (ainda não tem leads chegando)
- Quer aula, curso ou conteúdo para assistir.
- Quer que alguém venda no seu lugar.
- {{BLOQUEADO: ficha-de-fatos#criterio-de-qualificacao}} (venda sem conversa, no balcão ou no e-commerce)
- Não topa abrir os números do seu comercial.
- Procura fórmula pronta ou promessa de resultado garantido.

**Fecho:** Se você se reconheceu do lado de cá, o próximo passo é responder as perguntas.

**Botão:** bloco de chamada.

**Notas.** Todo corte de valor, faturamento, volume, time ou tipo de venda fica bloqueado (conflito-01; #98, pendente); os itens de postura ficam (8.8). "Curso ou mentoria" só na negação, nunca para nomear a oferta (#53; edição do Otávio no canvas). O título e o fecho não citam a Análise pelo nome (ficha-de-fatos#analise-nome-publico) e não barram o quiz: todos recebem a leitura dos números (#92; `funil-01`).

---

## 08 · O destino dos botões

- **Sobretítulo:** {{BLOQUEADO: ficha-de-fatos#analise-nome-publico}}
- **Selo:** Sem custo na promoção de lançamento
- **Título:** [PENDENTE: 8.15] Traga os números do seu último mês. A gente mostra onde a sua venda quebra.

**Três passos**
1. **Responda as perguntas.** [PENDENTE: 8.15] Com os números do seu funil: leads, agendamentos, comparecimentos e vendas.
2. **Receba a leitura dos seus números.** [PENDENTE: 8.15 / quiz-01] A etapa onde a sua venda quebra e quanto ficou pelo caminho.
3. **Se o seu perfil encaixa, a gente liga para marcar uma conversa.** Com {{BLOQUEADO: ficha-de-fatos#analise-quem-conduz}}. [PROVA REAL: foto real ou nova do Júnior; retrato por IA só sinalizado]

**Cartão do que você leva** (selo "Exemplo")
- **Rótulo:** O que você leva
- **Título do cartão:** Relatório da sua última safra
- **1 · Onde a sua venda quebra** · Leads que ficaram pelo caminho · [PENDENTE: 8.15 / quiz-01]
  - Leads do mês: 1.000
  - Pré-qualificação: 500 seguem (menos 500)
  - Agendamento: 125 seguem (menos 375)
  - Comparecimento: 94 seguem (menos 31)
  - Fechamento: 19 vendas (menos 75)
  - Ao lado de cada etapa, a meta para comparar: {{ficha-de-fatos#metas-por-etapa}}.
  - 981 de cada 1.000 leads ficam pelo caminho.
  - Entre os leads pré-qualificados, a maior perda está no agendamento: 375 leads que você pagou e que ninguém levou até a conversa.
- **2 · Potencial de dinheiro a sacar (sem comprar mais leads)** · [PENDENTE: 8.15 / quiz-01] · R$ 300 mil · em leads que você já pagou e que nunca disseram não.
- **3 · PDV-90:** seção oculta.
- **Fecho do cartão:** O relatório é seu, comprando ou não.

**Cartão da oferta**
- Preço riscado e rodapé "passa a custar": seção oculta ({{ficha-de-fatos#analise-valor}} só quando a cobrança existir).
- Barra de resgates: seção oculta ({{ficha-de-fatos#barra-de-resgates}}).
- **Botão:** "Quero responder as perguntas do meu funil" {{BLOQUEADO: ficha-de-fatos#analise-nome-publico}}
- **Linha abaixo do botão:** Sem custo na promoção de lançamento.

**Notas.** Com a #92, a leitura dos números é a própria Análise (ficha-de-fatos#analise-conteudo); a gratuidade segue ficha-de-fatos#analise-gratuidade e ficha-de-fatos#analises-gratuitas. O passo 2 do wireframe entrou no passo 1 (8.15); o título, o passo 2 e os itens 1 e 2 do cartão acompanham o que o quiz-01 pedir e entregar. O funil de exemplo leva as metas de ficha-de-fatos#metas-por-etapa ao lado, para a perda ficar contra a meta; os números do exemplo foram montados com essas metas à vista e precisam ser refeitos se o campo mudar. "Leads perdidos" virou "Leads que ficaram pelo caminho": perdido é só quem disse não (glossário). O passo 3 não promete a conversa a todos (8.10; `lead-score`, por `funil-01`); quem liga é quem agenda (#67; ficha-de-fatos#quem-agenda); duração da conversa fora, condutor bloqueado (conflito-02). "Reunião" trocada por "conversa" (9.6). Funil e valor são de exemplo, com selo, e não viram prova; "Potencial de dinheiro a sacar (sem comprar mais leads)" é rótulo decidido (Otávio, 03/11). Saem o "por pouco tempo", a contagem regressiva, a barra com número de exemplo e a frase "se fizer sentido... se não fizer". PDV-90 oculto (conflito-10; lacuna-22); preço riscado oculto (8.9). Sem formulário: o contato é pedido pelo quiz-01, com consentimento (`funil-01`; 8.14). A landing só vai ao ar junto com o quiz-01 publicável (conflito-09).

---

## 09 · Perguntas frequentes

- **Sobretítulo:** Perguntas frequentes
- **Título:** O que todo dono pergunta antes de assinar.
- **Números de destaque:** {{ficha-de-fatos#duracao}} · {{ficha-de-fatos#numero-de-entregas}}
- **Frase:** Ficou alguma dúvida? Comece pelos seus números: as perguntas mostram primeiro onde a sua venda quebra.
- **Botão:** bloco de chamada.

**É mais uma mentoria?**
Não. São {{ficha-de-fatos#numero-de-entregas}}, instaladas dentro da sua operação: o CRM montado por safra, o {{ficha-de-fatos#nomes-das-entregas:5}}, a régua de contato e o sistema por escrito. As Sessões de Comando com o Junior Neves são o rito que conduz a instalação, não uma entrega a mais.

**Quem me atende depois que eu assinar?**
O Junior Neves, nas Sessões de Comando com você e o seu head comercial: {{ficha-de-fatos#sessoes-de-comando:quando}}. Nas calls em grupo: [PENDENTE: 9.10] {{ficha-de-fatos#calls-em-grupo:formato}}; quantidade {{BLOQUEADO: ficha-de-fatos#calls-em-grupo:quantidade}}. E, entre uma conversa e outra, o seu time tem o grupo de suporte: {{ficha-de-fatos#grupo-de-suporte:canal}}.

**Quem faz as vendas: vocês ou o meu time?**
O seu time. A gente instala o sistema e prepara quem vende para operar. A colheita é sua.

**Funciona no meu negócio?**
É o que as perguntas do início respondem, com os seus números. {{BLOQUEADO: ficha-de-fatos#criterio-de-qualificacao}}

**O meu caso vai aparecer para outros empresários?**
Só se você quiser. Documentar o caso é opcional. Se você topar, entram os números somados por etapa, antes e depois, com o nome da empresa ou só o setor, à sua escolha, e um depoimento em vídeo sobre o que aconteceu, seja qual for o resultado. A lista de leads nunca é publicada.

**E quando o serviço acaba?**
O {{ficha-de-fatos#nomes-das-entregas:3}}, o {{ficha-de-fatos#nomes-das-entregas:7}} e o que o seu time praticou no {{ficha-de-fatos#nomes-das-entregas:6}} ficam com você e o seu time. Os seus dados também.

**Posso parcelar?** Seção oculta. {{BLOQUEADO: ficha-de-fatos#parcelamento}}

**Notas.** Saem a pergunta das vagas (contra #65 e com preço; 8.13), a da garantia (Otávio, 04/11), "mentoria" nas respostas (#53, #83), o gerente de safra e o GSAAS (#68, #84). "Gerente comercial" (#86) não foi usado: a resposta sobre o papel do Júnior ficaria presa à #85. A frase do FAQ não promete a conversa com o Júnior a todos (8.10). "Quem faz as vendas" segue a #14. "O meu caso" segue a troca pelo caso documentado de `oferta` (opcional; números agregados; nome da empresa ou só o setor, à escolha do cliente) e a LGPD de `provas-e-conformidade`. O depoimento em vídeo entra, como a oferta registra, com a ressalva ética de que não pode ser condicionado ao elogio ("seja qual for o resultado"); a sessão extra (ficha-de-fatos#bonus-caso) não entra, porque a página não fala da oferta. "E depois" segue `entregas-do-servico` (o Playbook e os dados ficam com o cliente, nenhum acesso retido) e não fala de continuidade. A palavra "treina" virou "prepara", para não encostar em "ensinar" (`tom-de-voz`).

---

## Rodapé

- **Quem assina a página:** {{BLOQUEADO: ficha-de-fatos#nome-agencia}}

**Notas.** Conflito-07; lacuna-19. O domínio dos mockups do design system v1.0 não entra (`provas-e-conformidade`, "Nome e marca").

---

## Conferência da copy

- **Fatos:** todos por campo da ficha. Campos citados, todos existentes na ficha v3: analise-gratuidade, analise-nome-publico, analise-quem-conduz, analise-valor, analise-de-calls, analise-conteudo, analises-gratuitas, barra-de-resgates, bonus-caso, calls-em-grupo, camila-vieira, credenciais-44, criterio-de-qualificacao, deming-percentual, duracao, execucao-do-time, grupo-de-suporte, insumo-do-cliente, lancamento-finch, metas-por-etapa, nome-agencia, nomes-das-entregas, numero-de-entregas, parcelamento, quando-entrega-1 a quando-entrega-8, quem-agenda, sessoes-de-comando, sistema-instalado, tempos-da-analogia, tentativas-ate-abandonado, total-dos-dois. Os números do exemplo (barras, funil, valor a sacar) são ilustrativos, com selo, e não são fatos do serviço. Placeholders com :n ou :parte trazem só o item ou a parte nomeada do campo (9.8, 9.13), com a parte definida em "Como ler". As frases foram ajustadas para essas partes. Os placeholders que vêm depois de dois pontos ou entre parênteses (por exemplo, calls-em-grupo:formato e os campos quando-entrega) trazem o valor como explicação, não como pedaço da frase.
- **Vocabulário de topo:** nenhum título, promessa ou chamada usa SDR, closer, GSAAS, gerente de safra, colheita, plantio ou relógio antes da seção 03; "safra" no topo só no nome Sistema de Vendas Safra. Nenhum título usa "colheita": o título do quadro da horta, que usava, foi trocado (9.16); "colhido" e "colheita" aparecem só no corpo, depois do mecanismo nomeado: no quadro da horta, no cabeçalho de fase "Colheita e plantio" da seção 05 (rótulo de grupo de entregas, não título da seção) e no FAQ. "Reunião" não aparece em nenhum texto público; aparece só nas Notas, ao citar o wireframe.
- **Palavras a evitar** (`tom-de-voz`; `persona`): "mentoria" e "curso" só em negação; sem "previsibilidade", "máquina de vendas", "todo o dinheiro", "10x", percentual de melhora, "diagnóstico gratuito", "sem letra miúda", IA como manchete, Marçal como aval, "Treinamento" e "Playbook" fora dos nomes.
- **Conformidade** (`provas-e-conformidade`): sem garantia nem reembolso chamado de garantia; sem preço, vagas, prazo ou data; sem contador sem contagem real; sem depoimento, nome, foto ou número de credencial; "sistema instalado" sem "resultado"; sem absoluto sobre o lead ("até o sim ou o não", "nada fica na mesa", "ninguém vira perdido"); a comparação das barras vai à revisão de advogado.
- **Grafia:** "Junior Neves" em público (ficha-de-fatos#grafia-junior); "Sistema de Vendas Safra" no singular.
- **Separador:** ponto médio; nenhum travessão.

## Fontes

- entregas/landings/landing-page-01/briefing.md (v1): estrutura, bloqueios e perguntas 8.1 a 8.15.
- Wireframe: fontes/acervo-2026-11-08/safra-acervo/01-dossie/safra-landing.md (só leitura), texto de partida.
- base/tom-de-voz.md (v2), GLOSSARY.md (v2), base/provas-e-conformidade.md (v2), base/ficha-de-fatos.md (v3), base/persona.md (v2), base/promessa.md (v2), base/decisoes.md (v3), base/lacunas.md (v4), base/mecanismo.md (v1), base/entregas-do-servico.md (v2), base/oferta.md (v1, desatualizada), base/lead-score.md (v1), funis/funil-01/funil.md (v1).
- Skills: landing-page-copy, roteiro-de-pagina, junior-neves-voice. Onde chocaram com a base, valeu a base (9.4, 9.5).
- prompts/05-fila-perguntas.md: 4.4, 4.5, 6.9, 8.1 a 8.15 e 9.1 a 9.17.
