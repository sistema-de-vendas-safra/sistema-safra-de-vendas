---
id: glossario
versao: 1
status: decidido
aprovado_por:
  otavio: 2026-11-08
depende_de:
  - id: ficha-de-fatos
    versao: 2
  - id: decisoes
    versao: 1
  - id: lacunas
    versao: 2
  - id: produto
    versao: 1
  - id: metodo
    versao: 1
  - id: mecanismo
    versao: 1
  - id: oferta
    versao: 1
  - id: promessa
    versao: 1
  - id: entregas-do-servico
    versao: 1
  - id: persona
    versao: 1
  - id: tom-de-voz
    versao: 1
desatualizado: false
---

# Glossário do Sistema de Vendas Safra

A língua do projeto: o que cada termo quer dizer aqui e os sinônimos que não se usam. Fatos (preço, prazos, quantidades) ficam em `ficha-de-fatos`.

Nota: as frases e alegações proibidas não são termos e ficam em `tom-de-voz` ("Frases e alegações que não entram em peça"). Os termos tirados de documentos em pendente-aprovacao (`tom-de-voz`, `promessa`, `oferta`) podem mudar quando eles forem aprovados.

## Language

A linha _Fonte_ é uma extensão nossa do formato: diz de onde vem cada definição. Termo marcado "em conflito, ver lacunas" não está resolvido e não entra em peça até a decisão.

### A Triad e as pessoas

**Triad**:
A agência do Euclides Vieira e do Junior Neves. Em conflito, ver lacunas (lacuna-07): o nome está em ficha-de-fatos#nome-agencia, com o provisório "Triad H." pendente (#89).
_Avoid_: Triad Marketing, TRIAD MKT, enquanto o nome não sair
_Fonte_: CTX §13; ficha-de-fatos#nome-agencia

**Junior Neves**:
Sócio da Triad, dono da operação de leilão onde o método nasceu e quem conduz as Sessões de Comando. A grafia segue ficha-de-fatos#grafia-junior: "Junior Neves" em público, "Júnior" no texto corrido.
_Avoid_: "Júnior Neves" em público
_Fonte_: CTX §6; ficha-de-fatos#grafia-junior

**Euclides Vieira**:
Sócio da Triad e dono da SX; conduz as calls em grupo com o Júnior.
_Fonte_: CTX §13; ficha-de-fatos#calls-em-grupo

**SX**:
A empresa do Euclides.
_Fonte_: CTX §13

**Growth hacking**:
A direção da tese nova: um ciclo de análise, ideação, priorização e teste, aplicado a aquisição, ativação, retenção e monetização.
_Avoid_: "hackeando" como manchete sem teste (ver `tom-de-voz`)
_Fonte_: #82; CTX §13

**Gap**:
Na tese v1.1, a passagem entre dois pilares, onde o dinheiro cai. Tese superada pela de growth hacking.
_Fonte_: CTX §13; #82

**Formação Estrategista e Growth Hacker**:
O curso antigo do Júnior, hoje fora de venda.
_Fonte_: CTX §13; ficha-de-fatos#bonus-curso

### O sistema e o método

**Sistema de Vendas Safra**:
O todo que a Triad instala: as peças Mentalidade de Vendas, Inteligências Humana, de Mercado e Artificial, Processos, Dados e Tecnologia. Depois da primeira menção, o DS v1.0 propõe "o Safra" ou "o Sistema" (adoção sem decisão, conflito-08).
_Avoid_: Método Safra, Gestão por Safra, SAFRA Sistema de Vendas, Sistema de Vendas Safras
_Fonte_: #22; #69; CTX §13; dossiê §11

**Peças do sistema**:
As partes do Sistema de Vendas Safra listadas no verbete acima; o sistema é o conjunto, não uma peça isolada.
_Fonte_: #69; CTX §13

**Gestão de Leads por Safra**:
O método proprietário dentro do sistema: gerir os leads pelo mês em que entraram, cada safra com o seu relógio.
_Avoid_: usar como nome do sistema
_Fonte_: #69; dossiê §11

**Ações isoladas**:
As correções feitas no comercial uma de cada vez e julgadas sozinhas, como mais anúncio, script novo ou outro closer; o contrário de tratar o comercial como sistema.
_Fonte_: CTX §13

**Safra**:
Os leads que entraram num mesmo mês.
_Fonte_: F11; F12; CTX §13

**Relógio de maturação**:
O prazo para o lead amadurecer, contado do dia em que ele entra; cada negócio tem o seu. O exemplo da operação do Júnior está em ficha-de-fatos#relogio-da-operacao.
_Avoid_: contar o relógio do fim do mês (a contagem de F1 diverge; vale a #41, do dia em que o lead entra; ver ficha-de-fatos#relogio-da-operacao)
_Fonte_: #41; ficha-de-fatos#relogio-da-operacao

**Estágio**:
A posição do lead no funil, que só avança.
_Fonte_: F12; CTX §13

**Estado**:
A situação do contato com o lead: conversando, tentativa, abandonado, stand-by ou perdido.
_Fonte_: F12; ficha-de-fatos#tentativas-ate-abandonado

**Perdido**:
Só o lead que disse não. Quem não respondeu ainda está no campo.
_Avoid_: chamar de perdido quem só não respondeu
_Fonte_: F1 ("perdido é quem falou não"); F11

**Metas por etapa**:
A taxa mínima de cada passagem do funil, aprovada pelo dono. Os valores estão em ficha-de-fatos#metas-por-etapa.
_Avoid_: metas assinadas
_Fonte_: F12; PAINEL, regra 4

**Etapas**:
As passagens do funil que recebem meta. Em conflito, ver lacunas (conflito-12): o método e o DS v1.0 nomeiam as etapas de formas diferentes.
_Fonte_: Ficha do Serviço online; DS; conflito-12

**Leitura de trás para frente**:
A forma de ler uma safra que começa no fechamento e recua, etapa por etapa, até a etapa que quebrou.
_Avoid_: "de trás para frente" como nome do método (ver `tom-de-voz`)
_Fonte_: Sistema de Vendas Safra online (tabela do método); Mecanismo único online; F10

**Gestão Mensal de Leads**:
O nome do problema: o mês como régua de tudo, inclusive do lead, misturando safras no relatório. Entra depois do sintoma, nunca no lugar dele.
_Avoid_: Safras Misturadas, lead parado, ponto cego
_Fonte_: #40; F13; Mecanismo único online

**Virada do mês**:
O momento em que, na Gestão Mensal de Leads, o lead pago sai da mesa sem ter dito não; é "o rosto do vilão".
_Fonte_: Mecanismo único online ("O vilão"); Big Idea final online; One pager online ("O problema em três camadas")

**Rúcula, morango e melancia**:
A analogia dos tempos de decisão: cada lead amadurece no seu tempo, como cada cultura. Os tempos de cada uma são fato fora da ficha.
_Avoid_: rúcula e tomate
_Fonte_: F14; dossiê §11

**Vendedor chato**:
A postura do serviço: persistência com data marcada, sem pressão. Depende de confirmação do Júnior.
_Fonte_: #26; CTX §6; lacuna-20

**Tese do closer**:
A ideia de que o closer não convence; quem convence é o marketing e o sistema, e com sistema o closer é tirador de pedido. Macronarrativa com autoria a confirmar com o Júnior.
_Fonte_: #87; CTX §3; lacuna-08

### A oferta

**IASV Safra**:
A Implementação Avançada do Sistema de Vendas Safra, a oferta principal: implementação dentro da operação do cliente. Preço em ficha-de-fatos#preco-avancada; duração em ficha-de-fatos#duracao.
_Avoid_: mentoria, curso, programa, consultoria
_Fonte_: #53; Oferta online; ficha-de-fatos#preco-avancada

**Implementação Essencial**:
O downsell da IASV Safra. O preço está em ficha-de-fatos#downsell-preco, em conflito.
_Fonte_: #60; ficha-de-fatos#downsell-nome

**Sistema instalado**:
A mensagem de que o sistema fica instalado no prazo de ficha-de-fatos#sistema-instalado. Pode ir a público se for cumprido; resultado no mesmo prazo, não.
_Avoid_: "resultado" ou "colher resultado" no prazo da instalação
_Fonte_: #80; CTX §8; ficha-de-fatos#sistema-instalado

**GSAAS**:
Gestão de Safra as a Service, a continuidade opcional depois do serviço, em desenho. A grafia (GSAAS ou GSaaS) está a confirmar.
_Avoid_: Head de Gestão de Safra, Head de Gestão de Safra e Manejo (nomes antigos); Mecanização da Safra (nome antigo dos agentes de IA, hoje parte do GSAAS, CTX §13; não é entrega, #52); GSAAS na primeira etapa do funil
_Fonte_: #38; #52; #58; #68; ficha-de-fatos#gsaas; CTX §13

**Vagas**:
A forma aceita de falar da escassez: vagas sem início comum. Número e regra em ficha-de-fatos#vagas e ficha-de-fatos#vendas-que-contam.
_Avoid_: turma
_Fonte_: #65; ficha-de-fatos#vagas

**Análise Estratégica do seu Comercial**:
A porta de entrada gratuita, aberta pelo quiz. Em conflito, ver lacunas (conflito-02): nome, valor, gratuidade, duração e condutor estão em ficha-de-fatos#analise-nome-publico e nos campos seguintes.
_Fonte_: #66; ficha-de-fatos#analise-nome-publico

**Calculadora**:
A Calculadora do Valor Potencial de Recuperação de Leads, a outra porta do quiz.
_Fonte_: #66; CTX §13

**Análise Estratégica da base de clientes**:
Bônus: a análise da base de quem já comprou do cliente. Detalhe em ficha-de-fatos#bonus-analise-base.
_Fonte_: ficha-de-fatos#bonus-analise-base

**Troca pelo caso**:
Condição em que o cliente autoriza documentar o seu caso, seja qual for o resultado, em troca do que está em ficha-de-fatos#bonus-caso. Não pode exigir depoimento positivo.
_Fonte_: Oferta online ("A troca pelo caso documentado"); ficha-de-fatos#bonus-caso

**PDV-90**:
Plano de Desenvolvimento de Vendas mostrado na página como saída da Análise. Sem decisão como entrega.
_Fonte_: landing; lacuna-22; conflito-10

**Janela de início**:
Proposta de 08/11: datas fixas por mês para os inícios dos clientes, sem criar turma. Sugestão, não confirmada.
_Avoid_: turma
_Fonte_: CTX §13; ficha-de-fatos#inicio-de-cada-cliente

**Gerente comercial**:
Como a página chama o papel do Júnior na operação do cliente; exceção à regra de não falar em gerente na primeira etapa.
_Avoid_: gerente de safra (papel do formato até 05/11, que conduzia o rito semanal de cada cliente; não existe no formato de 07/11, CTX §13)
_Fonte_: #86; #68; CTX §13

### As entregas e os ritos

**Entregas**:
As partes do serviço, com os nomes oficiais em ficha-de-fatos#nomes-das-entregas, usados exatamente assim; a horta fica na descrição, nunca no nome. O número de entregas do contrato está em ficha-de-fatos#numero-de-entregas, em conflito, ver lacunas (outros-06).
_Fonte_: #56; ficha-de-fatos#nomes-das-entregas

**Análise Estratégica das Safras**:
A entrega 1 (ficha-de-fatos#quando-entrega-1).
_Avoid_: Leitura das Safras
_Fonte_: #56; #72

**Implementação da Infraestrutura**:
A entrega 2 (ficha-de-fatos#quando-entrega-2).
_Fonte_: #56

**Playbook de Comunicação Persuasiva**:
A entrega 3 (ficha-de-fatos#quando-entrega-3).
_Avoid_: Adubo
_Fonte_: #56

**Recuperação de Ativos**:
A entrega 4 (ficha-de-fatos#quando-entrega-4).
_Avoid_: Recuperação do Solo, Recuperação de Safras
_Fonte_: #56

**Painel de Safras**:
A entrega 5 (ficha-de-fatos#quando-entrega-5).
_Fonte_: #56

**Treinamento para Otimização da Conversão**:
A entrega 6, feita nas calls em grupo (ficha-de-fatos#quando-entrega-6).
_Avoid_: "Treinamento" fora do nome da entrega
_Fonte_: #56; #78

**Playbook da Gestão de Vendas por Safra**:
A entrega 7 (ficha-de-fatos#quando-entrega-7).
_Avoid_: Manual de Gestão de Vendas por Safra; "Playbook" fora dos nomes das entregas
_Fonte_: #56

**Relatório de Produtividade**:
A entrega 8 (ficha-de-fatos#quando-entrega-8).
_Avoid_: Relatório de Produtividade da Colheita
_Fonte_: #56

**Sessões de Comando**:
As calls individuais do Junior Neves com o dono e o head comercial de cada cliente. Quantidade e datas em ficha-de-fatos#sessoes-de-comando.
_Avoid_: Mentoria 1:1, mentoria, calls individuais em peça
_Fonte_: #83; CTX §6

**Calls em grupo**:
As calls com todos os clientes (frequência em ficha-de-fatos#calls-em-grupo), conduzidas pelo Júnior e pelo Euclides, onde acontece o Treinamento para Otimização da Conversão. A quantidade está em ficha-de-fatos#calls-em-grupo, em conflito, ver lacunas.
_Fonte_: #78; #79; ficha-de-fatos#calls-em-grupo

**Análise de calls**:
A análise das calls de venda de cada cliente dentro das calls em grupo. Volume em ficha-de-fatos#analise-de-calls.
_Fonte_: CTX §13; ficha-de-fatos#analise-de-calls

**Grupo de suporte**:
O WhatsApp de cada cliente, com CS e IA de consulta.
_Fonte_: #76; ficha-de-fatos#grupo-de-suporte

**Fases de cor**:
Vermelho, amarelo e verde da linha do tempo do serviço na página. A parte de cada fase é fato fora da ficha.
_Fonte_: #80; CTX §13

**Preparo do solo**:
A etapa do serviço em que o Júnior passa as mudanças (Implementação da Infraestrutura) e entrega o Playbook da Gestão de Vendas por Safra; vocabulário do método, só depois de o mecanismo ser explicado.
_Avoid_: em títulos e chamadas antes do mecanismo (regra de vocabulário, em aberto; ver `tom-de-voz`)
_Fonte_: Ficha do Serviço online (tabela das etapas); Sistema de Vendas Safra online

**Colheita**:
A etapa do serviço em que os leads antigos que nunca disseram não voltam ao funil, dentro do sistema de safras (Recuperação de Ativos).
_Avoid_: em títulos e chamadas antes do mecanismo (regra de vocabulário, em aberto; ver `tom-de-voz`)
_Fonte_: Ficha do Serviço online (tabela das etapas); Sistema de Vendas Safra online

**Plantio**:
A etapa do serviço em que as safras novas entram com relógio e meta, e o Treinamento para Otimização da Conversão vira a call semanal em grupo.
_Avoid_: Cultivo (nome antigo sem correspondência confirmada, CTX §13; "cultivo" segue só no vocabulário das descrições); em títulos e chamadas antes do mecanismo
_Fonte_: Ficha do Serviço online (tabela das etapas); Sistema de Vendas Safra online

### O funil

**Funil perpétuo**:
O funil sem lançamento, que começa na data de ficha-de-fatos#inicio-do-funil.
_Avoid_: lançamento, turma
_Fonte_: #50; CTX §13; ficha-de-fatos#inicio-do-funil

**E.M.V.**:
Estrutura mínima viável do funil.
_Fonte_: CTX §13; Doc Mestre online

**Funil-01**:
O desenho de funil proposto para substituir o das três portas. Pendente de aprovação do Júnior e do Euclides.
_Fonte_: #90; conflito-06; conflito-14

**Página das três portas**:
O desenho de entrada do funil decidido em 03/11: "três portas com e sem VSL, campanhas da Análise e da Calculadora". Pode ser substituído pelo Funil-01.
_Fonte_: #66; #90

**Quiz**:
A peça que qualifica o lead e abre as portas da Análise e da Calculadora. Nome público em conflito, ver lacunas (conflito-02; ficha-de-fatos#analise-nome-publico). A falta de consentimento LGPD e a promessa percentual do quiz estão em conflito-09.
_Fonte_: #66; quiz; conflito-02

**Temperatura**:
A escala de frio, morno e quente do público do funil; mede só se a pessoa já conhece o Júnior, não se ela está pronta para comprar.
_Fonte_: F22 ("Temperatura")

**Barra de resgates**:
A barra da página que mostraria quantas Análises já foram resgatadas. Em conflito, ver lacunas (conflito-04): só com contagem real (ficha-de-fatos#barra-de-resgates).
_Fonte_: landing; ficha-de-fatos#barra-de-resgates
