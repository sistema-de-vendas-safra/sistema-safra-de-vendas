---
id: ficha-de-fatos
versao: 4
status: decidido
aprovado_por:
  otavio: 2026-11-09
depende_de: []
desatualizado: false
---

# Ficha de fatos

Aqui moram os fatos do Safra: preço, vagas, prazos, número de entregas, bônus, valores da Análise, credenciais e nomes. Os outros documentos citam cada fato pelo id do campo (por exemplo, `ficha-de-fatos#preco-avancada`) e nunca copiam o valor.

**O documento é decidido; cada campo tem o seu status.** Foi o que o Otávio respondeu na etapa 3 (prompts/03-escrever-a-base.md, resposta 4). Um campo marcado **em conflito · bloqueado para entrega até a decisão** não pode ir para nenhuma entrega: lista os valores concorrentes e onde cada um aparece, sem escolher um lado. Quem decide e o que destrava está em `lacunas`.

**Dependências.** A ficha cita as decisões (#n) e as lacunas só como fonte e remissão, sem depender delas: decisoes e lacunas é que dependem da ficha. Por isso depende_de fica vazio.

## Como ler as fontes

- **CTX §n:** seção n de fontes/acervo-2026-11-08/safra-acervo/02-arquivos-do-projeto/CONTEXTO-DO-PROJETO.md (v5.3, 08/11/2026).
- **F1 a F25:** os códigos do Mapa de fontes do CTX.
- **#n:** a decisão n do registro (base/decisoes.md).
- **online:** o documento de mesmo nome em 03-documentos-online/. Vale sobre a cópia FONTE (regra 1 da casa).
- **landing:** 01-dossie/safra-landing.md (o wireframe da página, documentado em 08/11). **dossiê:** 01-dossie/safra-dossie.md. **quiz:** 05-paginas/quiz-diagnostico-de-vendas/index.html. **wireframe:** 06-wireframe/project/. **PAINEL:** 02-arquivos-do-projeto/claude/PAINEL-iasv-safra.md. **DS:** fontes/design-system-v1.0/ (pagina-documentacao.html).

## Status de um campo

| Status | O que quer dizer |
|---|---|
| decidido | Decidido pelo Otávio e não exige mais ninguém: está no registro de decisões ou num documento online do Otávio (ex.: Ficha do Serviço), citado como fonte |
| aprovado | Aprovado pelo Júnior e pelo Euclides (#48) |
| pendente-aprovacao | Decidido pelo Otávio, falta o Júnior e o Euclides |
| em aberto · a definir · para depois | Ninguém decidiu ainda ("para depois": adiado por decisão registrada) |
| proposta · sugestão, não confirmada · hipótese a validar | Existe na fonte, mas não é decisão |
| regra legal · regra do método | Vem da lei ou do método do Júnior, não de uma decisão numerada |
| fato registrado · fato citado · fato de pesquisa | Número que a fonte registra, sem decisão por trás |
| [PROVA REAL] | Número público sem comprovante guardado |
| em conflito · bloqueado para entrega até a decisão | Duas ou mais fontes dizem coisas diferentes |

---

## Preço, vagas e pagamento

### preco-avancada
- **Valor:** R$ 45 mil até a 10ª venda da Implementação Avançada. Forma de escrever registrada: "R$ 45 mil para as 10 primeiras vagas; depois, R$ 60 mil."
- **Fonte:** #57 (com #9 e #19); CTX §3; Ficha do Serviço online ("Preço e porta de entrada"); Oferta online ("Preço, pagamento e âncora"); Doc Mestre online (Regras do funil, regra 1).
- **Status:** decidido.

### preco-avancada-depois
- **Valor:** R$ 60 mil depois da 10ª venda, cobrado de verdade dali em diante. Nunca anunciar "de R$ 60 mil por R$ 45 mil" enquanto os R$ 60 mil não forem preço praticado.
- **Fonte:** #19, #57; CTX §8; Ficha do Serviço online; Oferta online; Doc Mestre online (regra 1).
- **Status:** decidido.

### vagas
- **Valor:** 10 vagas, que são as 10 primeiras vendas da Avançada. Sem turma nem início comum. As vagas não diminuem até a 10ª venda.
- **Fonte:** #57, #63, #64, #65; CTX §3.
- **Status:** decidido.
- **Obs.:** o CTX diz "10 primeiras vendas"; a Ficha do Serviço, a Oferta e o Doc Mestre online dizem "10 primeiras vagas", no mesmo sentido. A ficha fixa "vendas" (#65); "vagas" fica como forma aceita no glossário.

### vendas-que-contam
- **Valor:** só vendas da Implementação Avançada contam para as 10 vagas; vendas da Implementação Essencial não contam.
- **Fonte:** #63; CTX §3; Ficha do Serviço online; Downsell online.
- **Status:** decidido.

### urgencia
- **Valor:** a única urgência é o preço até a 10ª venda. Nenhuma data, nenhum prazo.
- **Fonte:** #57, #65; CTX §6 ("Nunca dizer: ... prazo ou data para as 10 vagas"); Ficha do Serviço online; Doc Mestre online (regra 3).
- **Status:** decidido.
- **Obs.:** vale para a oferta da Implementação Avançada. A escassez da Análise gratuita é outra regra: ficha-de-fatos#barra-de-resgates (#93).

### inicio-de-cada-cliente
- **Valor:** em aberto. Propostas na fonte, nenhuma confirmada: venda com data de início marcada, em janelas de até 3 clientes a cada duas semanas (Engenharia reversa online, caminho A); duas datas fixas por mês para os inícios, sem criar turma (CTX §13, "Janela de início"); teto de 4 a 5 inícios por mês, em duas janelas fixas (Oferta online, "O que as 10 vagas exigem").
- **Fonte:** #65; CTX §3, §13; Engenharia reversa online; Oferta online.
- **Status:** em aberto.

### meio-de-pagamento
- **Valor:** Hotmart, à vista ou parcelado.
- **Fonte:** #54 (Euclides, 28/10); CTX §3; Oferta online; Doc Mestre online.
- **Status:** decidido.

### parcelamento
- **Em conflito · bloqueado para entrega até a decisão.**
- **Valores concorrentes:**
  - "parcelamento e taxa a definir" (CTX §3, linha Pagamento).
  - "proposta: R$ 45 mil à vista ou 6x de R$ 8.250" (Oferta online, "A oferta em uma página" e "Pagamento (proposta)"; One pager online, "Pagamento (proposta)"; PAINEL). A Oferta online cita também a alternativa de R$ 42.750 à vista e 6x de R$ 7.500.
  - "Sim. Pela Hotmart, à vista ou parcelado." no FAQ "Posso parcelar?" (landing, marcado lá como sugestão, não confirmada).
- **Status:** em conflito · bloqueado para entrega até a decisão.

### taxa-hotmart
- **Valor:** taxa reduzida em negociação pelo Euclides.
- **Fonte:** Oferta online; One pager online; Doc Mestre online ("Taxa da Hotmart no parcelado"; próximos passos: "Euclides: fechar a taxa da Hotmart").
- **Status:** em aberto.

### garantia
- **Valor:** nenhuma garantia. Nenhuma promessa em contrato: o contrato traz só o escopo das 8 entregas, com critério de pronto.
- **Fonte:** #39; CTX §3, §8; Oferta online ("Sem garantia em contrato").
- **Status:** decidido.

### arrependimento
- **Valor:** na Hotmart, serviço online de consultoria tem sempre 7 dias de reembolso, sem justificativa, independente do CDC. Isso não é garantia de resultado (ver #39 e ficha-de-fatos#garantia).
- **Fonte:** #91; Otávio, 08/11/2026, a partir da Central de Ajuda da Hotmart, "Como ajustar o prazo de garantia do produto que criei?", consultada em 08/11/2026 (fora do acervo).
- **Status:** decidido (otavio: 2026-11-08).
- **Obs.:** se o art. 49 do CDC também se aplica numa venda para empresa, só um advogado define (Oferta online, "Cuidado jurídico": o artigo "pode não se aplicar"; Downsell online: "a definir com advogado"). Fica em lacunas (outros-18), para antes da primeira venda. O CTX §8 e a landing citavam o art. 49 como base dos 7 dias.

### meta-de-vendas
- **Valor:** 10 vendas em 30 dias, R$ 450 mil brutos.
- **Fonte:** #50; CTX §2; Doc Mestre online.
- **Status:** decidido, sob tensão com a agenda do Júnior (lacuna 1 do CTX; ver `lacunas#lacuna-01`).

### inicio-do-funil
- **Valor:** 10/11/2026.
- **Fonte:** #50; CTX §1; Doc Mestre online.
- **Status:** decidido. O log.md (Pendências) registra que a data pode atrasar.
- **Obs.:** #111 (09/11/2026): o Otávio mantém esta data ao aprovar o funil-01, aceitando alguns dias de atraso se precisar.

---

## Duração e prazos

### duracao
- **Valor:** 90 dias (13 semanas).
- **Fonte:** CTX §3 (linha Produto, que cita #46, #52, #53, #70, #73); Ficha do Serviço online.
- **Status:** decidido.

### inicio-do-relogio
- **Valor:** o relógio dos 90 dias começa na primeira Sessão de Comando.
- **Fonte:** #72; CTX §3; Ficha do Serviço online ("Como funcionam os 90 dias").
- **Status:** decidido.

### sistema-instalado
- **Valor:** dia 15. "Em 15 dias, o sistema fica instalado; dali até a semana 13, é acompanhamento e otimização."
- **Fonte:** #73; CTX §3; Ficha do Serviço online.
- **Status:** decidido.

### execucao-do-time
- **Valor:** o time do cliente executa a infraestrutura em uma semana, no CRM que já usa, a partir da aula e da tarefa passadas pelo Júnior.
- **Fonte:** #74; CTX §3; Ficha do Serviço online.
- **Status:** decidido.

### quando-entrega-1
- **Valor:** semana 1, na primeira Sessão de Comando.
- **Fonte:** #72; CTX §3; Ficha do Serviço online (tabela "O que o cliente recebe").
- **Status:** decidido. A Ficha avisa: "As datas ainda são de trabalho" até a engenharia reversa; valem três marcos (Análise na semana 1, tudo entregue no dia 15, fechamento na semana 13).

### quando-entrega-2
- **Valor:** semanas 1 e 2.
- **Fonte:** #74; CTX §3; Ficha do Serviço online.
- **Status:** decidido (mesmo aviso de quando-entrega-1).

### quando-entrega-3
- **Valor:** até o dia 15.
- **Fonte:** #73; CTX §3; Ficha do Serviço online.
- **Status:** decidido (mesmo aviso de quando-entrega-1).

### quando-entrega-4
- **Valor:** semanas 3 a 13.
- **Fonte:** #77; CTX §3; Ficha do Serviço online.
- **Status:** decidido (mesmo aviso de quando-entrega-1).

### quando-entrega-5
- **Valor:** até o dia 15.
- **Fonte:** #71, #73; CTX §3; Ficha do Serviço online.
- **Status:** decidido (mesmo aviso de quando-entrega-1).

### quando-entrega-6
- **Valor:** a parte teórica até o dia 15; a call semanal em grupo das semanas 3 a 13.
- **Fonte:** #73, #78, #88; CTX §3. A tabela da Ficha do Serviço online põe "Semanas 3 a 13" na coluna Quando e diz no texto que "a parte teórica sai nos primeiros 15 dias".
- **Status:** decidido (mesmo aviso de quando-entrega-1).

### quando-entrega-7
- **Valor:** semanas 1 e 2 (no preparo do solo).
- **Fonte:** #75; CTX §3; Ficha do Serviço online.
- **Status:** decidido (mesmo aviso de quando-entrega-1).

### quando-entrega-8
- **Valor:** semana 13, na terceira Sessão de Comando.
- **Fonte:** CTX §3; Ficha do Serviço online.
- **Status:** decidido (mesmo aviso de quando-entrega-1).

### safras-novas
- **Valor:** as safras novas, plantadas a partir da semana 3, só fecham entre o quarto e o quinto mês, contados da primeira call. "Isso é dito na venda, nunca escondido."
- **Fonte:** Ficha do Serviço online ("O que os 90 dias fecham e o que não fecham"); CTX §9, leitura 4.
- **Status:** decidido (registrado na Ficha do Serviço, sem decisão numerada própria).

### calendario-por-dia
- **Valor:** calendário do D-5 ao D90, com horas por papel, biblioteca em ondas e MVP das 10 primeiras. Os números ficam no documento de origem e não entram aqui até a validação.
- **Fonte:** Engenharia reversa online (08/11); CTX §3 ("Engenharia reversa"); dossiê §4.6.
- **Status:** sugestão, não confirmada. Não serve de fato para entrega até o Júnior e o Euclides validarem (lacuna 1).

---

### relogio-da-operacao
- **Valor:** 90 dias de maturação na operação do Júnior, contados do dia em que o lead entra. É o exemplo da operação demonstrada: o relógio varia por negócio.
- **Fonte:** Mecanismo único online ("Dar relógio"); Sistema de Vendas Safra online (tabela, "Relógio de maturação"); F7 ("os 90 dias são o exemplo da operação demonstrada"); #41.
- **Status:** fato registrado (entrou na v2, pedido do Otávio em 08/11/2026).
- **Obs.:** F1 descreve a safra "tratada por 90 dias depois do fim do mês", contagem diferente da do Sistema de Vendas Safra online (do dia em que o lead entra). Vale a #41: a contagem começa no dia em que o lead entra (Otávio, 08/11/2026, resposta 7 às perguntas da etapa 3).

## Entregas, ritos e suporte

### numero-de-entregas
- **Valor:** 8 entregas.
- **Fonte:** #52, #56; CTX §3; Ficha do Serviço online; DS, "Implementação em 8 entregas".
- **Status:** decidido. A landing segue o registro, com as Sessões de Comando no lugar da "Mentoria 1:1" (Otávio, 08/11/2026: aplicação do registro, sem decisão nova; lacuna-05, conflito-11).
- **Histórico (formato antigo, não é valor):** 9 entregas, com a "Mentoria 1:1" como a nona (wireframe, seções 5 e 9: "09 · Do começo ao fim"; landing, FAQ "É mais uma mentoria?" e números "9 entregas"); 9 entregas no contrato (CTX §12: "Ainda com 9 entregas"; o contrato está fora do projeto e ainda precisa ser refeito: lacuna-10, outros-06).

### nomes-das-entregas
- **Valor:** os nomes oficiais, na ordem:
  1. Análise Estratégica das Safras
  2. Implementação da Infraestrutura
  3. Playbook de Comunicação Persuasiva
  4. Recuperação de Ativos
  5. Painel de Safras
  6. Treinamento para Otimização da Conversão
  7. Playbook da Gestão de Vendas por Safra
  8. Relatório de Produtividade
- **Fonte:** #56; CTX §3; Ficha do Serviço online; DS: "Use-os exatamente assim em materiais e interfaces."
- **Status:** decidido. A analogia da horta fica na descrição, nunca no nome (#56; CTX §6).

### sessoes-de-comando
- **Valor:** 3 Sessões de Comando com o Junior Neves, o dono e o head comercial: a primeira na semana 1 (de duas a três horas, com a Análise Estratégica das Safras), a segunda na semana 1 ou 2 (a passagem das mudanças; entre o D3 e o D5 na engenharia reversa) e a terceira na semana 13 (fechamento, com o Relatório de Produtividade).
- **Fonte:** #78, #83; CTX §3, §13; Ficha do Serviço online.
- **Status:** decidido. A Sessão 2 conjunta por janela é proposta da Engenharia reversa online que mexe em #78 (lacuna 1).

### calls-em-grupo
- **Em conflito (só na quantidade) · bloqueado para entrega até a decisão.**
- **Valor do formato:** semanais, das semanas 3 a 13, com todos os clientes, conduzidas pelo Júnior e pelo Euclides (#78, #79; CTX §3; Ficha do Serviço online). Status do formato: decidido.
- **Quantidade, valores concorrentes:**
  - "As outras, cerca de dez, são semanais e em grupo" (Ficha do Serviço online).
  - "compromisso de agenda nas 11 calls em grupo", para o Euclides (Promessa central online).
- **Status:** formato decidido; quantidade em conflito · bloqueado para entrega até a decisão.

### analise-de-calls
- **Valor:** 2 calls de venda por cliente por semana, analisadas e devolvidas no grupo de suporte, dentro do Treinamento para Otimização da Conversão.
- **Fonte:** #88; CTX §3; Ficha do Serviço online.
- **Status:** decidido.

### grupo-de-suporte
- **Valor:** 1 grupo de WhatsApp por cliente, com CS e uma IA de consulta treinada nas reuniões gravadas, no Playbook da Gestão de Vendas por Safra e no método.
- **Fonte:** #76; CTX §3; Ficha do Serviço online.
- **Status:** decidido. Quem faz o CS e quem constrói a IA ficou para depois (#84).

### insumo-do-cliente
- **Valor:** antes da primeira call, liberar os acessos (CRM ou planilha, WhatsApp, agenda) e exportar os leads dos últimos 3 a 6 meses, com data de entrada, origem, etapa e valor; levar o sócio e o head comercial às três Sessões de Comando; executar com o próprio time, em uma semana, as mudanças da segunda call; nomear uma pessoa responsável pela operação; registrar todo lead no CRM a partir da semana 3; ter base legal para voltar aos leads antigos (LGPD). "Atraso do cliente pausa o cronograma, não o pagamento."
- **Fonte:** Ficha do Serviço online ("O que o cliente precisa fazer").
- **Status:** decidido (registrado na Ficha do Serviço, sem decisão numerada própria). Acesso de administrador ao CRM e cerca de 2 horas por dia do head comercial do D4 ao D10 vêm da Engenharia reversa online: sugestão, não confirmada.

---

## Análise (a porta de entrada)

### analise-nome-publico
- **Em conflito · bloqueado para entrega até a decisão.**
- **Valores concorrentes:**
  - "Análise Estratégica do seu Comercial", ou "do seu Sistema de Vendas" (#66; CTX §3, §6, §13; Doc Mestre online).
  - "Análise Estratégica das Safras, na versão da call" (Ficha do Serviço online, "Porta de entrada"; Oferta online; One pager online). É também o nome da entrega 1.
  - Botão "Faça uma Análise Estratégica do seu Sistema de Vendas" (landing, decidido pelo Otávio).
  - "Diagnóstico de vendas" e o selo "Teste gratuito" (quiz).
- **Status:** em conflito (nome).
- **Obs.:** com a #92, a Análise passa a ser o diagnóstico do quiz. O nome público continua em conflito (Otávio, 08/11/2026). A #107 (09/11/2026) deu nome à conversa de venda (ficha-de-fatos#nome-call-de-venda), não à Análise: o nome público da Análise continua a definir.

### analise-valor
- **Valor:** R$ 497 por Análise, cobrado depois das análises gratuitas de ficha-de-fatos#analises-gratuitas.
- **Fonte:** #92 (substitui a #62 no valor).
- **Status:** decidido (otavio: 2026-11-08). O Júnior e o Euclides devem ser informados na pauta de aprovação (#92; o Doc Mestre online punha o valor entre as decisões dos dois, decisão 4).
- **Histórico (não é valor):** R$ 4.997 (#59, #62; CTX §3; Ficha do Serviço online; Oferta online; Doc Mestre online), superado pela #92. A landing (cartão da oferta e rodapé da seção 08) e o quiz ("Agora ele é gratuito. Em breve, vai custar R$ 497.", dito do plano de ação de 90 dias) já traziam o valor novo, sem decisão registrada até a #92.

### analise-gratuidade
- **Valor:** gratuita nas primeiras análises, até completar o número de ficha-de-fatos#analises-gratuitas; depois, cobrada pelo valor de ficha-de-fatos#analise-valor.
- **Fonte:** #92 (revisa a #49 e a #59 na gratuidade).
- **Status:** decidido (otavio: 2026-11-08); informar o Júnior e o Euclides na pauta de aprovação (#92).
- **Histórico (não é valor):** gratuita nas 10 primeiras vendas da Avançada (#49, #59, #62; CTX §3; Ficha do Serviço online; Oferta online); gratuita "na promoção de lançamento", sem citar o fim (landing; pedido do Otávio de 03/11, fora do registro numerado).

### analises-gratuitas
- **Valor:** 100 análises gratuitas.
- **Fonte:** #92.
- **Status:** decidido (otavio: 2026-11-08). A contagem sai do banco de dados (#93; ficha-de-fatos#barra-de-resgates).

### analise-duracao
- **Em conflito · bloqueado para entrega até a decisão.**
- **Valores concorrentes:**
  - 30 a 45 minutos (#59, #61; CTX §3; Ficha do Serviço online; Oferta online).
  - "Uma conversa de 60 minutos." (landing, passo 3; no wireframe sem decisão registrada).
- **Status:** em conflito.
- **Obs.:** com a #92, a Análise é o diagnóstico do quiz e a reunião com o Júnior é a conversa de venda, sem preço. A #92 não define a duração da reunião: continua em aberto (conflito-02). Ver também ficha-de-fatos#duracao-call-de-venda.
- **Obs. (09/11/2026):** a #107 decidiu a duração da conversa de venda (ficha-de-fatos#duracao-call-de-venda). Este campo fica como estava até a cascata decidir se ele se fecha (pergunta em prompts/11-fila-perguntas.md).

### analise-quem-conduz
- **Em conflito · bloqueado para entrega até a decisão.**
- **Valores concorrentes:**
  - O Júnior, "que conduz e fecha nesse começo" (#51, #62; CTX §10, lacuna 11; Doc Mestre online).
  - "Converse com o time de Junior Neves" (landing, passo 3).
- **Status:** em conflito.
- **Obs.:** com a #92, a pergunta passa a ser quem conduz a reunião com o Júnior (a conversa de venda), que a #92 não define: continua em aberto (conflito-02). Ver também ficha-de-fatos#quem-faz-a-reuniao (#51).
- **Obs. (09/11/2026):** a #107 decidiu quem conduz a conversa de venda (ficha-de-fatos#quem-faz-a-reuniao). Este campo fica como estava até a cascata decidir se ele se fecha (pergunta em prompts/11-fila-perguntas.md).

### analise-conteudo
- **Valor:** a Análise é o diagnóstico do quiz, o mesmo para todos os públicos. A reunião com o Júnior é a conversa de venda, sem preço. A Análise completa, com documento e painel, é a entrega 1.
- **Fonte:** #92; #59 e #61 para "a mesma para todos os públicos"; CTX §3; Ficha do Serviço online.
- **Status:** decidido (otavio: 2026-11-08).
- **Histórico (não é valor):** "a versão da call, sobre a última safra do prospect, a mesma para todos os públicos (orgânico e pago; frio, morno e quente)" (#59, #61; Ficha do Serviço online; Oferta online), revista pela #92.

### analise-abatimento
- **Valor:** se o valor pago pela Análise depois da 10ª venda é abatido na implementação.
- **Fonte:** Ficha do Serviço online ("O que ainda falta decidir": "(proposta)"); PAINEL ("a F17 mantém, como proposta, o abatimento da Análise paga depois da 10ª venda; a #62 deixa essa proposta onde já estiver"). Para as 10 primeiras vendas, a Oferta online registra "sem versão paga nem abatimento" (decisão de 01/11).
- **Status:** proposta.
- **Obs.:** com a #92, a Análise paga é a que vem depois de ficha-de-fatos#analises-gratuitas, não mais depois da 10ª venda. A proposta não foi revista.

### barra-de-resgates
- **Valor (regra):** o contador de escassez conta as análises gratuitas reais já usadas, a partir do banco de dados, e só aparece na página quando mais de 60 das análises de ficha-de-fatos#analises-gratuitas já tiverem sido usadas. Até lá, nenhuma porcentagem de resgate e nenhuma barra de vagas.
- **Fonte:** #93; CTX §7, §8 e Doc Mestre online, regra 3 (contagem real, número fixo de Análises gratuitas e promoção com fim real).
- **Status:** decidido (otavio: 2026-11-08). A contagem real depende do banco de dados do funil-01 (#90, pendente-aprovacao).
- **Não vale para** o contador "Total gerado" do hero, que segue no conflito de credenciais com o Júnior e o Euclides (ficha-de-fatos#total-dos-dois; conflito-05).
- **Histórico de exemplo da landing (não é valor):** "Restam 19%" e "81% das Análises gratuitas já foram resgatadas" (landing; pedido do Otávio de 03/11, "para FOMO"; a landing marca o número como de exemplo).

### quem-agenda
- **Valor:** o SDR agenda a reunião. Quem é o SDR (a Tati ou alguém a contratar) está em aberto.
- **Fonte:** #67; CTX §3; Doc Mestre online (Decisões do cliente, item 3).
- **Status:** decidido; nome em aberto.

### quem-faz-a-reuniao
- **Valor:** o Júnior faz as reuniões de venda e fecha, no começo. A Call de Direcionamento (ficha-de-fatos#nome-call-de-venda) é conduzida pelo Junior Neves (grafia: ficha-de-fatos#grafia-junior).
- **Fonte:** #51; CTX §3, §8; #107 (condutor da Call de Direcionamento).
- **Status:** decidido (condutor: otavio, 2026-11-09, #107).

---

### nome-call-de-venda
- **Valor:** "Call de Direcionamento": o nome da conversa de venda com o Júnior (a "reunião com o Júnior" da #92). É nela que fica a demonstração com os números do cliente (4.5, #114).
- **Fonte:** #107.
- **Status:** decidido (otavio: 2026-11-09). O Júnior e o Euclides são informados na pauta (item 7, "Para informar").

### duracao-call-de-venda
- **Valor:** 60 minutos (a Call de Direcionamento, ficha-de-fatos#nome-call-de-venda).
- **Fonte:** #107; Oferta online ("Na call (cerca de 60 minutos)").
- **Status:** decidido (otavio: 2026-11-09, #107). Não confundir com analise-duracao, que é a Análise e está em conflito.
- **Histórico (não é valor):** "cerca de 60 minutos", proposta (entrou na v2, pedido do Otávio em 08/11/2026, pela Oferta online).

### multiplo-regra-de-venda
- **Valor:** cerca de três vezes o preço parado nas safras antigas; abaixo disso, a recomendação é não vender agora.
- **Fonte:** Oferta online ("Regra de venda recomendada"; "Decisões do cliente", item 11; roteiro da call); One pager online.
- **Status:** proposta, entre as decisões do cliente ainda abertas (entrou na v2, pedido do Otávio em 08/11/2026).

## Bônus, downsell e continuidade

### bonus-curso
- **Valor:** curso gravado do Júnior, liberado para o time. Preço real e se é a Formação Estrategista e Growth Hacker: a confirmar.
- **Fonte:** #48; CTX §3, §10 (lacuna 22 e "Fatos a confirmar"); Oferta online ("O pacote").
- **Status:** aprovado.

### bonus-analise-base
- **Valor:** Análise Estratégica da base de clientes, feita sobre quem já comprou. Valor apresentado: "valor de R$ 4.997" (CTX §3) ou "referência: R$ 4.997" (One pager online). Entregue até a semana 12 (Oferta online).
- **Fonte:** #48, #59; CTX §3; Oferta online; One pager online.
- **Status:** aprovado.
- **Obs.:** o valor de referência do bônus era o mesmo da Análise antiga (#59, #62). Com a #92, ficha-de-fatos#analise-valor mudou e os dois deixaram de coincidir. O bônus é aprovado (#48) e não muda aqui; a revisão do valor apresentado fica para o Otávio (prompts/05-fila-perguntas.md, 4.3).

### bonus-caso
- **Valor:** uma sessão extra com o Júnior para quem autoriza virar caso documentado.
- **Fonte:** #48; CTX §3; Oferta online ("A troca pelo caso documentado").
- **Status:** aprovado. Preço de uma sessão avulsa do Júnior: a confirmar (CTX §10, lacuna 22).

### downsell-nome
- **Valor:** Implementação Essencial (do Sistema de Vendas Safra).
- **Fonte:** #60; CTX §3; Downsell online.
- **Status:** decidido.

### downsell-preco
- **Em conflito · bloqueado para entrega até a decisão.**
- **Valores concorrentes:**
  - R$ 22.500, "Decidido (23/10)" (Downsell online, "Preço e conta" e "Já decidido em 23/10"); CTX §11 registra "downsell Implementação Essencial, R$ 22.500 (#60)" em 01/11.
  - "R$ 22.500 segue como hipótese" (Engenharia reversa online); "Preço (R$ 22.500 como hipótese)" (Downsell online, nota "Proposta de 08/11, a decidir").
- **Status:** em conflito · bloqueado para entrega até a decisão.

### downsell-desenho
- **Valor registrado:** entregas 1, 3, 6 e 7; 13 semanas, no calendário da Avançada; o curso gravado como único bônus; acesso ao GSAAS depois; oferecida só depois do não à Avançada; forma de pagamento a definir; não conta para as 10 vagas.
- **Proposta de 08/11:** "Instalação em 15 dias": entregas 1, 2, 3 e 7, a Sessão de Comando 1 completa e uma Sessão 2 curta, sem calls em grupo. A alternativa é a Essencial em grupo por 13 semanas.
- **Fonte:** #37, #42, #60; CTX §3; Downsell online; Engenharia reversa online.
- **Status:** decidido, em revisão desde 07/11 (lacuna 3 do CTX).

### gsaas
- **Valor:** nome decidido: GSAAS (Gestão de Safra as a Service), a continuidade opcional depois dos 90 dias. Desenho, preço e detalhes ficam para depois. Proposta de 07/11: Painel de Safras por assinatura, ferramentas de IA para alugar (agente de SDR primeiro, social seller depois) e acompanhamento em grupo opcional, de preferência sem o Júnior. Hipótese de preço: R$ 15 mil por mês, a rever.
- **Fonte:** #38, #58, #84; CTX §3; Ficha do Serviço online; Oferta online.
- **Status:** para depois. Grafia "GSAAS ou GSaaS, a confirmar com o Otavio" (PAINEL).

---

### gsaas-preco-travado
- **Valor:** preço do GSAAS travado por 12 meses para os clientes das 10 primeiras vagas.
- **Fonte:** Oferta online ("GSAAS na oferta (proposta)"; "Decisões do cliente", item 9).
- **Status:** proposta (entrou na v2, pedido do Otávio em 08/11/2026).

## Público e qualificação

### criterio-de-qualificacao
- **Em conflito · bloqueado para entrega até a decisão.** Cinco versões:
  - (a) Faturamento de R$ 150 mil a R$ 1,5 milhão por mês; leads todo mês (cerca de 100 ou mais, a validar); duas ou mais pessoas vendendo, o dono incluído; histórico dos leads dos últimos 3 meses; venda consultiva acima de R$ 10 mil (Ficha do Serviço online, "Serve para quem" e "Em 30 segundos"; F2).
  - (b) Só quem já tem time de vendas (Júnior, F22, 28/10; CTX §4).
  - (c) Venda acima de R$ 5 mil e faturamento acima de R$ 100 mil por mês (landing: Hero A, "Para quem é", FAQ "Funciona no meu negócio?").
  - (d) Já tem leads, já tem time, vende acima de R$ 10 mil (landing: Hero B; One pager online, "Acima do título").
  - (e) No quiz, é qualificado quem não marca "Menos de R$ 50 mil" de faturamento e não marca "Nenhum por enquanto" em "Quantos vendedores fazem reunião de vendas com clientes?". O valor médio da venda é perguntado, mas não filtra (quiz, função `qualificado`).
- **Status:** em conflito · bloqueado para entrega até a decisão (lacuna 12 do CTX; Doc Mestre online, decisão 9).
- **Proposta de 08/11:** o lead score de base/lead-score.md (#98), pendente do Júnior e do Euclides. Até a aprovação, o campo segue em conflito.

### volume-minimo
- **Valor:** cerca de 100 leads por mês.
- **Fonte:** Ficha do Serviço online ("Serve para quem"; "Hipóteses a validar"; "Volume mínimo para aceitar um cliente" em "O que ainda falta decidir").
- **Status:** hipótese a validar.

### metas-por-etapa
- **Valor:** 50% pré-qualificam, 50% agendam, 75% comparecem, 20% fecham (3,75% de lead em venda).
- **Fonte:** F1; F12; CTX §3; quiz (`METAS = [50, 50, 75, 20]`).
- **Status:** regra do método (Júnior).

### safra-de-julho
- **Valor:** no leilão do Júnior, em julho: 989 leads, 12,8% pré-qualificados, 16% de agendamento, 36% de fechamento sobre reuniões. A safra fechou em 29/10, sem números finais registrados. A confirmar: se os 127 são o total de pré-qualificados (F1) ou os pré-qualificados que não agendaram (F7).
- **Fonte:** F1; F7; CTX §3, §10 ("Fatos a confirmar").
- **Status:** fato registrado; números finais a confirmar ([PROVA REAL: números finais da safra de julho], CTX §7).

### head-comercial-custo
- **Valor:** cerca de R$ 14 mil por mês de salário, segundo o Júnior.
- **Fonte:** CTX §5; Ficha do Serviço online; Oferta online (âncora 2, F1).
- **Status:** fato citado.

---

### tentativas-ate-abandonado
- **Valor:** 18 tentativas de contato antes de um lead virar abandonado, na operação do Júnior.
- **Fonte:** F1; Criativos rodada 1 online ("Dezoito tentativas").
- **Status:** fato registrado (entrou na v2, pedido do Otávio em 08/11/2026); liberação para peça pendente do Júnior: a fonte pede "Confirmar com o Júnior que a regra segue valendo" e liberar "as histórias da operação usadas nos talking heads" (Criativos rodada 1 online).

## Dados e canais

### prazo-de-guarda
- **Valor:** 12 meses, contados do último evento da pessoa.
- **Fonte:** #106.
- **Status:** decidido (otavio: 2026-11-09). Entra na política de privacidade e na planta do banco. O caminho de apagamento é pendência com prazo (#106; log.md, Pendências).

### reels-ferramenta
- **Valor:** ManyChat, a ferramenta que manda o link a quem comenta nos reels.
- **Fonte:** #112.
- **Status:** decidido (otavio: 2026-11-09). Conta a criar, com a menor permissão (conexoes.md). Depende da ligação com o Instagram, que é da Meta e está fora do MVP até agora: quando entra é pergunta.

### reels-palavra
- **Valor:** a palavra curta, sem acento, que o público comenta nos reels para receber o link.
- **Fonte:** #112.
- **Status:** para depois (#112).

---

## Credenciais e números públicos (todos sem comprovante)

### total-dos-dois
- **Em conflito · bloqueado para entrega até a decisão.**
- **Valores concorrentes:**
  - Mais de R$ 600 milhões faturados juntos (CTX §1; Doc Mestre online, regra 2).
  - R$ 579 milhões: "R$ 579 mi+" nas credenciais e o contador "R$ 579.324.483,37" no hero (landing).
- **Status:** em conflito · bloqueado para entrega até a decisão; [PROVA REAL] (lacuna 16 do CTX).

### lancamento-finch
- **Em conflito · bloqueado para entrega até a decisão.**
- **Valores concorrentes:**
  - R$ 120 milhões (CTX §3; landing, "R$ 120 mi+"; Doc Mestre online, regra 2).
  - R$ 126 milhões (Criativos rodada 1 online, 01/11; citado no CTX §3).
- **Status:** em conflito · bloqueado para entrega até a decisão; [PROVA REAL].

### camila-vieira
- **Valor:** do zero aos R$ 28 milhões em 11 meses.
- **Fonte:** CTX §3; Criativos rodada 1 online.
- **Status:** em conflito · bloqueado para entrega até a decisão; [PROVA REAL].

### credenciais-44
- **Valor:** Junior Neves: trabalhou com Pablo Marçal, Thiago Nigro e Bruno Perini. Euclides Vieira: trabalhou também com Paulo Vieira. (O lançamento com Thiago Finch e a Camila Vieira estão em ficha-de-fatos#lancamento-finch e ficha-de-fatos#camila-vieira.)
- **Fonte:** #44; CTX §3 ("Pessoas"); Tese de mercado da Triad online; VSLs de 3 minutos online e VSL de 3 a 4 minutos online (cartões de credencial, que pedem "[PROVA REAL: comprovante de cada credencial e autorização de nome e imagem]").
- **Status:** [PROVA REAL] (entrou na v3, resposta 2 do Otávio em 08/11/2026). Uso em peça só com comprovante e autorização de nome e imagem (#25, #44; Código Civil, art. 18); a confirmação é do Júnior e do Euclides e vai para a pauta com o Júnior (lacuna-20, outros-21).

### seguidores-junior
- **Valor:** 130 mil seguidores.
- **Fonte:** Doc Mestre online ("Autoridade em vendas"); F10.
- **Status:** fato de pesquisa (20/10).

---

## Analogia e dados de terceiros

### tempos-da-analogia
- **Valor:** rúcula em cerca de 30 dias; morango em cerca de 60; melancia em cerca de 90.
- **Fonte:** #36; Big Idea final online ("Rúcula, morango e melancia"); CTX §6.
- **Status:** aprovado (com a Big Idea, #48; entrou na v3, resposta 2 do Otávio em 08/11/2026). O "95%" da mesma analogia não tem fonte e não entra.

### deming-percentual
- **Valor:** 94% dos problemas pertencem ao sistema (W. Edwards Deming, Out of the Crisis, 1982). Em peça, sempre com a nota "Adaptado de".
- **Fonte:** CTX §7; landing (seção 2, título e nota de rodapé); Otávio, 08/11/2026, resposta 2 às perguntas da etapa 3.
- **Status:** fato de pesquisa, "forte como citação, indicativa para vendas" (CTX §7); entrou na v3. Nunca como "do seu problema de vendas" (CTX §6), com a exceção do título da seção 2 da landing (#94).
- **Obs.:** a nota de rodapé da landing hoje não tem o "Adaptado de" (o Otávio tirou em 03/11; landing, "Nota de rodapé"). Pela resposta 2 de 08/11, a nota volta a ter (prompts/05-fila-perguntas.md, 4.4).

---

## Nome e assinatura

### nome-agencia
- **Em conflito · bloqueado para entrega até a decisão.**
- **Valores concorrentes:**
  - "Triad H.", nome provisório (#89, pendente de aprovação do Júnior e do Euclides; CTX §1, §6).
  - "Triad" e "© 2026 Triad Marketing USA LLC" (rodapé do quiz).
  - "TRIAD MKT" no logo (Doc Mestre online, "Nome da Triad em revisão").
  - Proposta de assinar a página e os criativos por "Junior Neves e pela IASV Safra, sem a marca da agência, até o nome sair" (Doc Mestre online).
- **Status:** em conflito · bloqueado para entrega até a decisão; o nome provisório depende de #89 (pendente-aprovacao).

### grafia-junior
- **Valor:** "Junior Neves" em público; "Júnior" no texto corrido.
- **Fonte:** CTX §6.
- **Status:** decidido (Otávio, 08/11/2026: vale o CTX; confirmado de novo em 08/11/2026, prompts/04, seção 2). **Divergência:** o DS v1.0 escreve "Júnior Neves" ("Euclides Vieira e Júnior Neves formam a Triad", pagina-documentacao.html) e está errado nesse ponto; a divergência está registrada em base/design-system/design-system.md.

---

## Não encontrado nas fontes

- O teto de reuniões de venda do Júnior por semana (o Doc Mestre online tem a subtarefa "Agenda do Júnior, com teto de reuniões por semana", sem número).
- A verba de mídia.
- O número do WhatsApp da Triad (vazio no quiz: `WHATS = {numero:''}`).
