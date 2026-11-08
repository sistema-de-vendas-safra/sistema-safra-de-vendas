---
id: landing-page-01-briefing
versao: 3
status: rascunho
aprovado_por:
  otavio: pendente
depende_de:
  - id: decisoes
    versao: 3
  - id: ficha-de-fatos
    versao: 3
  - id: lacunas
    versao: 4
  - id: persona
    versao: 3
  - id: promessa
    versao: 3
  - id: oferta
    versao: 1
  - id: mecanismo
    versao: 1
  - id: tom-de-voz
    versao: 3
  - id: provas-e-conformidade
    versao: 3
  - id: entregas-do-servico
    versao: 3
  - id: design-system
    versao: 3
  - id: glossario
    versao: 3
  - id: funil-01
    versao: 2
  - id: lead-score
    versao: 2
  - id: pauta-aprovacao-01
    versao: 2
  - id: planta-do-banco
    versao: 2
desatualizado: true
---

# Briefing · landing-page-01

O ponto de partida da landing-page-01 do funil-01: para que ela serve, para quem, o que se espera do visitante, a estrutura herdada do wireframe corrigida pelo registro, as referências de copy, UX e design em linhas gerais e a lista do que está bloqueado. **Não tem copy final** (é a etapa 9) nem estrutura de tela (etapa 10): só direcionamento.

**Status.** Rascunho. A landing-page-01 existe por causa da #90, pendente do Júnior e do Euclides; enquanto isso, ela só pode ser feita como rascunho, avisando que pode mudar (base/decisoes.md, "Enquanto a #90 estiver pendente"; nucleo/regras/versionamento.md). O Otávio ainda não leu este briefing.

**Documentos desatualizados.** Este briefing usa `mecanismo` e `oferta`, desatualizados pela pergunta 4.5, e se apoia em documentos que seguem marcados por cadeia deles (promessa, tom-de-voz, provas-e-conformidade, design-system, glossario, funil-01, planta-do-banco e pauta-aprovacao-01; regra provisória 11.1); precisa ser revisto depois da 4.5. De `mecanismo` e `oferta` nada sobre o papel da Análise foi tirado: nesse ponto valem a #92 e a ficha de fatos.

**Como ler.**
- Fatos pelo id do campo em `ficha-de-fatos` (nenhum valor copiado); decisões por #n; pendências pelo id de `lacunas`; perguntas da fila pelo número (prompts/05-fila-perguntas.md).
- "Wireframe" é fontes/acervo-2026-11-08/safra-acervo/01-dossie/safra-landing.md (só leitura). Os textos do wireframe são citados pelo nome do elemento, não reproduzidos, salvo quando a decisão é o próprio texto.
- Em cada seção: **Sai** (não volta), **Entra** (o que o registro e as decisões de 08/11 pedem), **Fica** (segue como direção), **Bloqueado** (com o que a página faz enquanto isso).
- Três formas de a página esperar uma decisão, usadas na lista de bloqueios: **placeholder marcado** (o lugar existe e leva a marca {{BLOQUEADO: ficha-de-fatos#campo}} ou {{BLOQUEADO: #n}}, que é a forma da etapa 9); **seção oculta** (existe no rascunho, não vai ao ar); **texto neutro sem promessa** (diz o que é verdade hoje, sem número, nome em conflito nem promessa).
- **[design system antigo]** marca o que o wireframe lista como "Design system antigo" (o Triad v2 da #45 e os pedidos visuais de 03/11 e 07/11, entre eles a paleta da #81 e os botões laranja). **[design system v1.0 · pendente]** marca o que vem do v1.0, cuja adoção não está decidida. Nenhum dos dois vale como direção de design hoje (conflito-08).
- Escolhas provisórias deste briefing: perguntas 8.1 a 8.15.

---

## 1. Básico

### Objetivo no funil

A landing-page-01 é o primeiro passo do caminho do lead no funil-01: o lead chega por um link etiquetado e é levado ao quiz-01 (`funil-01`, "Caminho do lead", passo 1). O trabalho da página é fazer o visitante entender o problema e o sistema o bastante para querer o diagnóstico, e filtrar quem não é o perfil antes de ele começar.

- O diagnóstico do quiz é a própria Análise (#92; ficha-de-fatos#analise-conteudo), gratuita segundo ficha-de-fatos#analise-gratuidade e ficha-de-fatos#analises-gratuitas. A reunião com o Júnior vem depois, para quem passa pela porta de qualificação, e é a conversa de venda, sem preço (#92; `funil-01`, passos 3 e 4).
- A página **não vende a implementação**: preço e condições ficam para a conversa (wireframe, "Seções que saíram da página": a Oferta saiu em 03/11, decidido pelo Otávio).
- A página **não coleta dado pessoal**: lê a etiqueta do link e a passa ao quiz; quem pede o contato, com consentimento, é o quiz-01 (`funil-01`, "Caminho do dado", passo 1; `planta-do-banco`, eventos visita e inicio_quiz).
- Endereço da landing: não decidido (`funil-01`, "Origens e links").

### Público

O Rafa, o Dono-Closer de `persona`: dono, fundador ou CEO, que decide sozinho, já comprou estrutura comercial ou educação e se queimou, ou nunca contratou; a dor mais extrema é "pagar e ficar sozinho", e o que ele rejeita é reunião e vídeo no lugar de aplicação (`persona`, "Quem é", "Dores", "Barreiras"). A persona é pesquisa, não validação (lacuna-25).

O corte de quem a oferta serve (faturamento, valor da venda, time, volume de leads) **não está na persona**: está em ficha-de-fatos#criterio-de-qualificacao, em conflito · bloqueado para entrega até a decisão (conflito-01; proposta do lead score, #98, pendente).

### Ação esperada

Começar o quiz-01. É a única ação da página (um destino só; ver 8.5). O evento que mede essa ação é inicio_quiz, ligado à visita pelo código de sessão (`planta-do-banco`).

### Meta

**A meta da landing não está registrada.** A ficha de fatos tem a meta de vendas do funil (ficha-de-fatos#meta-de-vendas) e as metas por etapa do método (ficha-de-fatos#metas-por-etapa), que começam no captado, depois do quiz. Nenhum campo diz quantos visitantes devem começar o quiz, nem quantos devem terminá-lo. Pergunta 8.1.

---

## 2. Estrutura de partida

A ordem do wireframe (desktop): cabeçalho fixo · 01 Hero (A, e B como variante de teste) · faixa de bastidores · 02 Sistema de Vendas · 03 Big Idea · 03b O que é o Sistema de Vendas Safra · 04 Credenciais · 05 Como funciona · 06 Painel de Safras · 07 Para quem é · 08 Análise Estratégica · 09 Perguntas frequentes. A ordem fica como partida; a etapa 10 decide a ordem final.

Correções que valem para a página inteira (prompts/04-decisoes-de-08-11-e-lead-score.md, seção 2; conflito-11, resolvido): as entregas de ficha-de-fatos#numero-de-entregas, com os nomes de ficha-de-fatos#nomes-das-entregas; "Sessões de Comando com o Junior Neves" no lugar de "Mentoria 1:1" (#83); a Análise Estratégica das Safras (entrega 1) na semana de ficha-de-fatos#quando-entrega-1 (#72); nada de GSAAS nem de gerente de safra (#68); nada de "as dez começam juntas" (#65); grafia "Junior Neves" em público (ficha-de-fatos#grafia-junior); na comunicação de topo, só palavras do comprador (regra de 22/10; `tom-de-voz`).

### Bloco de chamada (repete ao fim de quase todas as seções)

- **Sai:** a barra "Restam" e a porcentagem de Análises resgatadas embaixo de cada botão. Pela #93, nenhuma porcentagem de resgate nem barra de vagas até o limite de ficha-de-fatos#barra-de-resgates.
- **Entra:** o contador de escassez da #93, **só quando** a contagem real (a partir do banco de dados) passar do limite do campo. A contagem depende do funil-01 (#90, pendente) e da definição de "análise usada" (5.7, 6.7).
- **Fica:** um botão por bloco, sempre com o mesmo destino.
- **Bloqueado:** o texto do botão decidido pelo Otávio usa um dos nomes concorrentes de ficha-de-fatos#analise-nome-publico. Enquanto o nome estiver em conflito: **texto neutro sem promessa**, que diga a ação (começar as perguntas do diagnóstico) sem o nome da Análise, marcado com {{BLOQUEADO: ficha-de-fatos#analise-nome-publico}} (8.4). O contador fica como **seção oculta**.
- **Destino:** no wireframe, todos os botões levam à seção 08 e o botão de lá leva ao quiz. Fica assim como partida (8.5).

### Cabeçalho fixo

- **Fica:** botão secundário ao alcance em toda a rolagem, com o mesmo destino (sugestão do wireframe, não confirmada).
- **Bloqueado:** o logo. O logotipo oficial está no pacote do design system v1.0, sem decisão de adoção (conflito-08), e o nome da agência está em conflito (ficha-de-fatos#nome-agencia; conflito-07). **Placeholder marcado** no lugar do logo; o texto do botão segue o bloco de chamada.

### 01 · Hero (versão A e versão B)

- **Sai:** o contador "Total gerado" (ver Bloqueado); qualquer barra de resgates.
- **Entra:** pelo registro, a versão fria da promessa de 08/11 iria para o Hero A (`promessa`, "Onde cada versão entra"). Só quando a #85 for aprovada.
- **Fica:** o teste A/B medindo só a copy (wireframe; Júnior, 03/11); o pedido do Júnior de focar em aproveitar todos os leads, não só os que o time conseguiu responder; um único botão primário na dobra.
- **Bloqueado:**
  - Título e subtítulo do Hero A: o título usa a #33 e a promessa nova é a #85, as duas pendentes do Júnior e do Euclides; o subtítulo tem "sem precisar mudar uma vírgula no seu marketing", que contradiz o método (conflito-03; `promessa`, "Pontos frágeis"). **Placeholder marcado** {{BLOQUEADO: #85}}.
  - Subtítulo do Hero B: adapta a #33. **Placeholder marcado** {{BLOQUEADO: #85}}.
  - Título do Hero B: é texto do Otávio (wireframe, 04/11), mas sozinho, sem o A, o teste deixa de existir. Proposta em 8.3.
  - Qualificador antes do título (nos dois heróis): é corte de público, em ficha-de-fatos#criterio-de-qualificacao. **Placeholder marcado** {{BLOQUEADO: ficha-de-fatos#criterio-de-qualificacao}}.
  - Contador "Total gerado": ficha-de-fatos#total-dos-dois, em conflito e sem comprovante (conflito-04, conflito-05). **Seção oculta.** Não é o contador de escassez da #93.
  - Vídeo: a #51 (Júnior) pede "página com vídeo"; o wireframe não tem vídeo. Pergunta 8.6.

### Faixa de bastidores (logo abaixo do hero)

- **Bloqueado:** a lista de nomes de terceiros, sem comprovante nem autorização de nome (Código Civil, art. 18; #25, #44; conflito-05). **Seção oculta** até as autorizações.

### 02 · Sistema de Vendas

- **Fica:**
  - O título com o percentual de Deming e o asterisco, como está no wireframe: exceção registrada (#94; ficha-de-fatos#deming-percentual; conflito-13, resolvido).
  - O quadro do "não é", na linguagem do dono (pedido do Júnior, 03/11).
  - As duas imagens das argolas, com os rótulos "Como funciona na sua empresa" (decidido pelo Otávio, 03/11) e "Como funciona no Sistema de Vendas Safra".
  - A comparação em barras (elogiada pelo Júnior), com o selo "Exemplo" e o rodapé de que não é resultado nem previsão.
  - O diagrama ações isoladas contra sistema e os três cartões.
- **Entra:** a nota de rodapé de Deming com "Adaptado de", como manda ficha-de-fatos#deming-percentual. O Otávio tirou o "Adaptado de" no canvas (wireframe, "Nota de rodapé"); a escolha está na pergunta 4.4 e fica marcada no texto até a resposta.
- **Sai:** "SDR" e "closer" do diagrama e da legenda da imagem 2 (conflito-12, resolvido; `tom-de-voz`, jargão em inglês). A troca de palavra é da etapa 9. O cartão da HBR continua fora (Otávio, 04/11).
- **Bloqueado:** o cartão do LTV ("vender mais vezes") depende da safra de clientes no método (#16, depende do Júnior; outros-10). Fica com **texto neutro sem promessa**, marcado {{BLOQUEADO: #16}}. Os três cartões espelham os três ganhos da #33, pendente: não podem virar promessa.

### 03 · Big Idea

- **Fica:**
  - O título da Big Idea, aprovado (#48; `mecanismo`, "A Big Idea").
  - A sequência sintoma, nome do problema (Gestão Mensal de Leads) e saída (Gestão de Leads por Safra), na ordem de `mecanismo` ("Na copy": o sintoma primeiro).
  - O quadro da horta com a chave de dois estados: a analogia é aprovada (#48), e os tempos de cada planta vêm de ficha-de-fatos#tempos-da-analogia.
  - A metáfora da melancia tratada como rúcula, com "O sistema diz quem chamar e quando".
  - A frase "Perdido é só quem disse não", da regra do Júnior.
  - A frase-ponte para a 03b.
- **Entra:** o pedido do Júnior (03/11) de um número pequeno no canto de cada planta, com os tempos de ficha-de-fatos#tempos-da-analogia; a frase-assinatura vai junto com a promessa (`promessa`), então só entra quando a #85 for aprovada.
- **Sai:** o percentual da analogia sem fonte (`tom-de-voz`; fato fora da ficha).
- **Bloqueado:** nada específico. O subtítulo do "cemitério de leads" e os textos do quadro são sugestão, não confirmada, e vão para a etapa 9 como partida.

### 03b · O que é o Sistema de Vendas Safra

- **Fica:** o anel com as peças de #69 e o centro "Sistema de Vendas Safra" (decidido pelo Otávio, 07/11); o cartão do método proprietário (#69); uma linha por peça.
- **Sai:** na linha da Inteligência Artificial, a menção aos agentes que falam com o lead e ao GSAAS (#68, #84).
- **Entra:** "Em [duração]" sempre por ficha-de-fatos#duracao.
- **Bloqueado:**
  - A linha da Inteligência Artificial, que precisa passar pela Cyntia (wireframe) e depende do uso real de IA nas entregas (lacuna-21). **Texto neutro sem promessa**, com a IA como meio, nunca como manchete (`tom-de-voz`).
  - A linha da Inteligência Humana fala em "reunião de safra", rito do formato anterior a 07/11. Pergunta 8.12.

### 04 · Credenciais

- **Bloqueado (seção inteira):**
  - O número dos dois e o do lançamento estão em conflito e sem comprovante (ficha-de-fatos#total-dos-dois, ficha-de-fatos#lancamento-finch).
  - Os nomes e as fotos com terceiros estão sem autorização (conflito-05).
  - As credenciais de #44 dependem do Júnior e do Euclides (ficha-de-fatos#credenciais-44).
  - O depoimento do Júnior sobre o Marçal tem três condições não cumpridas (wireframe).
  - Até a linha "você não me conhece, mas conhece o que eu fiz" só vai com comprovante guardado (`provas-e-conformidade`, regra jurídica 2), e o título decidido pelo Otávio é dessa família.
  - **Seção oculta.** Alternativa mínima, para o Otávio decidir: pergunta 8.7.
- **Fica, para quando destravar:** a citação do Euclides escrita pelo Otávio, sem a assinatura que cita terceiro e número; o Júnior sem o selo de criador do sistema (edição do Otávio); fotos reais ou novas, retrato por IA só sinalizado e foto com terceiro por IA nunca (`provas-e-conformidade`).
- **Sai:** o caso documentado continua fora até haver números reais e autorização.

### 05 · Como funciona

A seção mais mudada pelo registro: o calendário do wireframe é anterior à call de 07/11.

- **Sai:**
  - O cartão do GSAAS, a continuidade depois do serviço (#68, #84).
  - O cartão das calls individuais como "Mentoria 1:1", contado como entrega a mais, com os marcos antigos (#83, #78).
  - A Análise numa semana diferente da registrada.
  - Qualquer contagem de entregas diferente de ficha-de-fatos#numero-de-entregas.
- **Entra:**
  - As entregas de ficha-de-fatos#nomes-das-entregas, "exatamente assim", com a horta só na descrição (#56).
  - Cada entrega no seu campo, de ficha-de-fatos#quando-entrega-1 a ficha-de-fatos#quando-entrega-8, com o Playbook da Gestão de Vendas por Safra no preparo do solo (#75).
  - A mensagem do sistema instalado no prazo de ficha-de-fatos#sistema-instalado, com "todo o nosso arsenal de conhecimento" (#80), e nunca "resultado" nesse prazo (`tom-de-voz`; CTX §8).
  - As Sessões de Comando com o Junior Neves (ficha-de-fatos#sessoes-de-comando).
  - As calls em grupo, só pelo formato (ficha-de-fatos#calls-em-grupo).
  - O grupo de suporte (ficha-de-fatos#grupo-de-suporte).
  - A análise de calls dentro do Treinamento (ficha-de-fatos#analise-de-calls).
  - A linha do tempo em fases de cor (#80). Ver 8.11 para a parte de cada fase.
  - Aviso que acompanha os campos ficha-de-fatos#quando-entrega-1 a ficha-de-fatos#quando-entrega-8: "As datas ainda são de trabalho" até a engenharia reversa; valem três marcos (a entrega 1, ficha-de-fatos#sistema-instalado e a entrega 8). A linha do tempo mostra só o que esses campos dizem e fica marcada como sujeita a mudança (lacuna-01).
- **Fica:** o anel que volta do relatório para a próxima safra; o filtro de peças que acende as entregas (sugestão); os nomes de fase do método, que já podem aparecer aqui porque o mecanismo foi explicado nas seções 03 e 03b (regra de 22/10).
- **Bloqueado:**
  - A quantidade de calls em grupo, em conflito: **placeholder marcado** {{BLOQUEADO: ficha-de-fatos#calls-em-grupo}}.
  - O cartão do Treinamento para Otimização da Conversão descreve uma reunião semanal de safra, rito do formato anterior a 07/11 (pergunta 8.12). **Texto neutro sem promessa** até a troca; o que vale é ficha-de-fatos#quando-entrega-6, ficha-de-fatos#calls-em-grupo (formato) e ficha-de-fatos#analise-de-calls.
  - A frase de impacto pedida pelo Júnior no topo das entregas tem duas metades. "Não é mentoria" pode (#53). "Não é com alguém da equipe" depende de quem lidera, que é a #85, pendente (com a #79). Essa metade leva **placeholder marcado** {{BLOQUEADO: #85}}.
  - A referência The Profit (#81) só como narrativa interna, sem o nome do Lemonis nem da série. "Eu mando no seu comercial" é metáfora e, como "liderar o comercial", depende da #85.
- **Atenção (8.2):** a #68 diz "nada de GSAAS, gerente e entrega na primeira etapa", e a seção 05 mostra as entregas, como manda a aplicação do registro de 08/11.

### 06 · Painel de Safras

- **Sai:** a tela "Agentes de IA" com o selo GSAAS e os agentes na janela (#68; lacuna-14).
- **Entra:** o painel ligado aos dados do cliente (#71), no prazo de ficha-de-fatos#quando-entrega-5; as metas da tabela de exemplo, sempre por ficha-de-fatos#metas-por-etapa.
- **Fica:** as duas abas (quem gere o time e o vendedor); as demais telas; as telas que giram até o toque (sugestão); o selo "Dados de exemplo" em toda a janela, com nomes e números fictícios (`provas-e-conformidade`: mockup não é prova).
- **Bloqueado:** a tela "Reunião de safra" descreve o rito do formato anterior a 07/11 (pergunta 8.12). **Texto neutro sem promessa** até a troca.

### 07 · Para quem é

- **Bloqueado:** todos os itens que são corte de faturamento, valor de venda, tamanho do time, volume de leads ou tipo de venda (nas duas colunas e no FAQ) estão em ficha-de-fatos#criterio-de-qualificacao, em conflito; a proposta do lead score (#98) está pendente. **Placeholder marcado** {{BLOQUEADO: ficha-de-fatos#criterio-de-qualificacao}} em cada um.
- **Fica:** os itens de postura, que não são corte. Por exemplo, decidir sobre o comercial, querer o sistema instalado na operação e não conteúdo para assistir, topar abrir os números, não querer que alguém venda no lugar, não buscar resultado garantido. Proposta em 8.8. O item "e não mais um curso ou mentoria" foi editado pelo Otávio; a palavra entra só na negação, nunca para nomear a oferta (#53).
- **Entra:** o título e o fecho deixam de dizer "antes de pedir a Análise" com o nome em conflito. Como todos recebem o diagnóstico (#92; `funil-01`), a seção serve para alinhar a expectativa da conversa de venda, não para barrar o quiz. **Texto neutro** quanto ao nome (ficha-de-fatos#analise-nome-publico).

### 08 · A Análise (destino dos botões)

Muda de papel com a #92: a Análise **é** o diagnóstico do quiz. A seção apresenta o quiz e o que ele entrega, e leva até ele.

- **Sai:**
  - O passo da conversa "com o time de Junior Neves" com a duração do wireframe (ver Bloqueado).
  - O selo de gratuidade "por pouco tempo": o fim real da gratuidade é uma quantidade (ficha-de-fatos#analises-gratuitas), não um prazo, e a única urgência sem prazo nem data é a de ficha-de-fatos#urgencia.
  - A contagem regressiva até a virada do mês: contador regressivo está entre as alegações vetadas (`tom-de-voz`).
  - A barra de resgates com número de exemplo (#93).
  - A frase "Se fizer sentido, a gente mostra como instalar o sistema. Se não fizer, você sai com o diagnóstico na mão.": presume a conversa para todos, contra a 8.10. Sai como está; a ideia de que o diagnóstico fica com ele já está em "O relatório é seu, comprando ou não".
  - O passo 2 do wireframe ("Traga os números") como passo separado: foi fundido no passo 1, porque no funil-01 os números do funil são respondidos dentro do quiz (8.15).
- **Entra:**
  - Os passos seguem o caminho do funil-01. (1) O visitante responde o quiz, com os números do funil dele (o antigo passo 2 entra aqui). (2) Recebe o diagnóstico, que é a Análise (#92). (3) Se passar pela porta de qualificação, o SDR liga e marca a conversa com o Júnior (#67; ficha-de-fatos#quem-agenda; ficha-de-fatos#quem-faz-a-reuniao), sem preço.
  - O passo 3 não é para todos: eliminatórios e faixa C vão para a nutrição (`lead-score`; `funil-01`). Por isso a página não promete a conversa a todos (8.10).
- **Fica:**
  - O cartão do que ele leva: o funil de perda de exemplo, com o selo "Exemplo" e o sentimento de perda (pedido do Otávio, 03/11).
  - O rótulo "Potencial de dinheiro a sacar (sem comprar mais leads)" (decidido pelo Otávio, 03/11), com valor de exemplo e selo.
  - "O relatório é seu, comprando ou não", coerente com o funil-01 (todo lead que termina o quiz recebe o diagnóstico).
  - A gratuidade, por ficha-de-fatos#analise-gratuidade e ficha-de-fatos#analises-gratuitas.
  - O cartão só mostra o que o quiz-01 entrega de fato.
  - O título "Traga os números do seu último mês. A gente mostra onde a sua venda quebra." como partida para a etapa 9, desde que o quiz-01 peça esses números; se o quiz pedir outro período, o título acompanha o quiz (8.15).
  - A foto do Júnior no passo 3, como **placeholder marcado**: foto real ou nova, retrato por IA só sinalizado [PROVA REAL] (`provas-e-conformidade`); o visual fica bloqueado pelo design system.
- **Bloqueado:**
  - O mock-up do PDV-90 como saída da Análise: sem decisão como entrega (conflito-10; lacuna-22). **Seção oculta.**
  - Duração e condutor da conversa com o Júnior (ficha-de-fatos#analise-duracao, ficha-de-fatos#analise-quem-conduz; conflito-02). **Texto neutro**, sem duração; o condutor fica com {{BLOQUEADO: ficha-de-fatos#analise-quem-conduz}}.
  - O preço riscado e o rodapé "quando a promoção acabar, passa a custar". O valor está decidido (ficha-de-fatos#analise-valor), mas a cobrança ainda não existe (5.9), e "valor de" só vale como preço praticado de verdade (`provas-e-conformidade`). **Seção oculta** até a cobrança (8.9).
  - O sobretítulo com o nome da Análise (ficha-de-fatos#analise-nome-publico): **placeholder marcado**.
  - O próprio destino: o quiz-01 não pode ser publicado sem consentimento LGPD e sem tirar a promessa percentual (conflito-09). A landing vai ao ar junto com o quiz-01, nunca antes.
- **Fica fora da página:** não há formulário. A landing não colhe contato: quem pede o contato, com consentimento, é o quiz-01 (`funil-01`, "Caminho do dado", passos 1 e 2). Por isso o pedido do Júnior de capturar o contato no clique e a sugestão do WhatsApp no topo da página intermediária (wireframe, "UX") ficam para o quiz-01, como escolha provisória (8.14).

### 09 · Perguntas frequentes

- **Sai:**
  - O número de entregas do wireframe (fica ficha-de-fatos#numero-de-entregas).
  - "Mentoria" e "mentorias" nas respostas (#53, #83).
  - O gerente de safra (formato anterior a 07/11).
  - O GSAAS na resposta do depois (#68, #84).
  - A pergunta das vagas inteira, que diz "as dez começam juntas" (contra #65) e revela o preço (8.13).
  - A pergunta da garantia continua fora (Otávio, 04/11). O reembolso pela Hotmart (#91; ficha-de-fatos#arrependimento) fica no checkout e nos termos, nunca chamado de garantia.
- **Entra:**
  - "É mais uma mentoria?": a resposta usa as entregas de ficha-de-fatos#numero-de-entregas, instaladas na operação, e as Sessões de Comando como rito, não entrega.
  - "Quem me atende?": as Sessões de Comando com o Junior Neves (ficha-de-fatos#sessoes-de-comando), as calls em grupo pelo formato e o grupo de suporte (ficha-de-fatos#grupo-de-suporte). Cuidado com a barreira do acesso que encolhe para grupo de WhatsApp (`persona`, barreira 3).
  - "E depois?": o que fica com o time (os playbooks e o treinamento; `entregas-do-servico`), sem a continuidade.
  - "Funciona no meu negócio?": aponta para o diagnóstico, sem critério (ver Bloqueado).
- **Fica:** "Quem faz as vendas" (#14); "O meu caso vai aparecer?" (documentar é opcional; só números agregados, nunca a lista de leads; `provas-e-conformidade`, LGPD); o acordeão com a primeira aberta (sugestão).
- **Bloqueado:**
  - "Posso parcelar?": ficha-de-fatos#parcelamento em conflito (conflito-15), e a página não fala mais de pagamento. **Seção oculta.**
  - O critério em "Funciona no meu negócio?": {{BLOQUEADO: ficha-de-fatos#criterio-de-qualificacao}}.
  - Os números de destaque da seção: a duração (ficha-de-fatos#duracao) e as entregas (ficha-de-fatos#numero-de-entregas) podem; as vagas ficam fora (8.13).
  - A frase "a pergunta que faltar, você faz direto ao Junior": só quem passa pela porta conversa com ele (8.10). **Texto neutro**, sem o nome da Análise.
  - "Gerente comercial" (#86), se aparecer na resposta sobre o papel do Júnior, precisa alinhar com a promessa (#85, pendente; lacuna-05). **Placeholder marcado** {{BLOQUEADO: #85}}.

### Seções que saíram e continuam fora

A Oferta (03/11), a Calculadora de Recuperação de Ativos (04/11), o caso documentado (04/11) e o cartão da HBR (04/11), como no wireframe. A Calculadora era porta pela #66; se a #90 não for aprovada, a arquitetura volta a ser a das três portas, com e sem vídeo (conflito-06).

### Rodapé (não está no wireframe)

- **Bloqueado:** quem assina a página (ficha-de-fatos#nome-agencia; conflito-07; lacuna-19). **Placeholder marcado.**
- O domínio dos mockups do design system v1.0 não pertence ao Sistema de Vendas Safra e não vai para peça real (`provas-e-conformidade`, "Nome e marca").

---

## 3. Referências e direcionamentos

### 3.1 Copy

**Voz e regras**
- A voz final passa pela skill junior-neves-voice (`tom-de-voz`, "A voz"). Na etapa 9, as skills landing-page-copy e roteiro-de-pagina, conforme a fila.
- Regra de vocabulário de 22/10, reafirmada em 08/11 (`tom-de-voz`):
  - Em promessa, título e chamada, só palavras que o comprador já usa (lead, venda, verba, etapa, fim do mês, sim ou não).
  - Safra, colheita, plantio e relógio entram depois de o mecanismo ser explicado, e o nome Sistema de Vendas Safra é a exceção.
  - Os nomes de etapa do método vão no corpo, não no topo (4.6).
- Palavras queimadas para a persona, frases gastas do mercado e a lista do "nunca dizer": `persona` ("Palavras queimadas") e `tom-de-voz` ("Frases e alegações que não entram em peça"). Para esta página pesam "mentoria" e "reunião", "diagnóstico gratuito" (gasto pelo mercado: trocar pela leitura dos números dele), "previsibilidade" sem número, "todo o dinheiro", "10x", percentual de melhora, IA como manchete e Marçal como aval.
- Fatos sempre por campo da ficha; texto que depende de decisão pendente vai marcado no próprio texto (fila, etapa 9).
- Postura: "persistência com data marcada, sem pressão" (#26), **só como rascunho**, porque depende da confirmação do Júnior (lacuna-20; pauta, item 19); e "reduzir a ansiedade em vez de aumentar a urgência" (`persona`, tema 5).

**Ordem de revelação** (`mecanismo`, "Na copy", orientação sem aprovação própria)
- O sintoma, na voz do comprador.
- As causas que ele já pagou para resolver (o quadro do "não é").
- A Gestão Mensal de Leads, nomeada e mostrada no desenho, e o custo dela.
- O Sistema de Vendas Safra, nomeado antes de ser descrito; as etapas; a prova.
- A chamada.
- Da mesma orientação, **não** vale a parte em que a demonstração é a versão rápida da Análise na call: a #92 mudou isso (4.5).

**Decididos que a página usa** (wireframe, Parte 2, "Copy")
- O nome no singular: Sistema de Vendas Safra.
- O título de Deming na seção 2, com asterisco (#94).
- Os rótulos das imagens da seção 2.
- O rótulo "Potencial de dinheiro a sacar".
- A gratuidade dita como promoção de lançamento, sem citar a venda que encerra as vagas (Otávio, 03/11; ficha-de-fatos#vagas). Com a #92, o fim real é ficha-de-fatos#analises-gratuitas.
- Sessões de Comando (#83).
- Fases de cor e mensagem do sistema instalado (#80).

**Pedidos do Júnior (03/11)**
- Foco em aproveitar todos os leads.
- O dado de impacto seguido das negações na linguagem do dono.
- Manter "sistema".
- A comparação de números.
- Autoridade com cases que mostrem a divisão das vendas: dados reais ainda não chegaram, então nada entra.
- A frase de impacto no topo das entregas (ver seção 05).

**Sugestões não confirmadas que vão para a etapa 9 como partida, não como decisão**
- Os ajustes da promessa #85 (`promessa`, "Ajustes propostos").
- Trocar "o maior nome" por "um dos maiores", e mesmo assim só com comprovante.
- "Gratuita" no feminino.
- Um critério só e um formato só para valores, quando o critério for decidido.

**Banco de copy citado pelo wireframe** (Macronarrativas, VSLs, tese do closer): fica no acervo. A tese do closer depende do Júnior (#87; lacuna-08) e não entra.

### 3.2 UX

**Decididos**
- Pré-qualificação obrigatória por quiz; o SDR agenda; o Júnior faz as reuniões (#51, #67).
- Na primeira etapa, "nada de GSAAS, gerente e entrega" (#68), com a exceção de "gerente comercial" (#86). A seção 05 mostra as entregas pela aplicação do registro de 08/11; a leitura do "e entrega" está na pergunta 8.2.
- A Oferta e a pergunta da garantia saíram.
- Hero A e B em teste, medindo só a copy.
- A linha do tempo com fases de cor, a semana da entrega 1, o prazo do sistema instalado, as Sessões de Comando e as calls em grupo (#80; lacuna-17).

**Do funil-01 e da planta do banco**
- A página lê utm_source e utm_campaign e as passa ao quiz (`funil-01`, "Origens e links").
- A página cria um código de sessão na visita, sem guardar nada no navegador (`planta-do-banco`, 6.2).
- Mede visita e inicio_quiz por versão da landing (`planta-do-banco`).
- Fala com o banco só pelo garçom, nunca direto, e não guarda chave.

**Em aberto, do registro**
- Página única com um destino (funil-01, #90) contra as três portas com e sem vídeo (#66): rascunho até a #90 (conflito-06).
- Vídeo na página: 8.6.

**Sugestões do wireframe, não confirmadas, como partida para a etapa 10**
- Um botão primário por dobra, com o mesmo texto e o mesmo destino.
- Cabeçalho fixo com botão secundário.
- Quadro da horta que abre na Gestão Mensal e inverte na chave ou no toque.
- Filtro de peças na seção 05.
- Telas do painel que giram até o toque.
- FAQ em acordeão.
- No celular, a imagem do hero sai.
- A seção 02 legível sem JavaScript e estática com movimento reduzido.

A contagem regressiva sai (ver seção 08).

**Pedidos do Júnior sem fechamento:** mais perguntas no quiz e captura do contato no clique (são do quiz-01); fora da página, o agente que lê a call e o fura-fila pago.

**Peças ligadas:** a página de obrigado do quiz, com roteiro de vídeo curto (wireframe, "Peças ligadas"), é do quiz-01.

### 3.3 Design · bloqueado

Todo o design está bloqueado pela pendência do design system (conflito-08; log.md, "Design"; pauta-aprovacao-01, item 6). Quatro lados que não batem:
- o design system v1.0, escuro;
- a paleta branco e verde da #81 (Júnior, "pela sequência, confirmar");
- os botões laranja de 03/11;
- o Triad v2 da #45, que "vale até o nome novo sair".

A etapa 10 também não usa cor, fonte nem estilo. Abaixo, só as linhas gerais.

**Conceitos de imagem que não dependem de nenhum visual** (wireframe, Design)
- As argolas, ideia do Júnior. Só duas pessoas na cena de baixo, para não parecer que sistema é ter mais gente. O mesmo homem nas duas cenas. A planta na parede.
- O número discreto no canto de cada planta da horta (tempos de ficha-de-fatos#tempos-da-analogia).
- O mock-up do PDV-90 como documento, com o conteúdo embaçado: decidido pelo Otávio em 03/11, mas bloqueado, porque o PDV-90 como saída da Análise não tem decisão (conflito-10; lacuna-22).
- Perda e ganho com sinais visuais opostos em toda a página (regra geral: sugestão).
- A fazenda de pivôs no hero (sugestão).
- Fotos reais do Euclides e do Júnior [PROVA REAL].
- Retrato por IA só sinalizado e foto com terceiro por IA nunca.

**[design system antigo]** (o que o wireframe lista em "Design system antigo")
- [design system antigo] O wireframe inteiro no Triad v2 (#45): fundo escuro, verde como cor de marca, fontes e componentes daquele sistema.
- [design system antigo] A paleta branco e verde aprovada na call de 07/11 (#81), sobre o visual daquela data, "confirmar".
- [design system antigo] Os botões laranja em tríade com o verde, texto preto, borda em relevo, brilho e seta num círculo (Otávio, 03/11).
- [design system antigo] A barra de resgates piscando embaixo de cada botão: sai também pela #93.
- [design system antigo] Vermelho só para o que se perde e verde para o que se colhe.
- [design system antigo] A seção 02 em duas colunas com fio vermelho e verde.
- [design system antigo] O funil de perda todo vermelho (Otávio, 03/11).
- [design system antigo] As imagens das argolas no estilo cinematográfico cyberpunk, com chuva e neon.
- [design system antigo] A colheitadeira de luz laranja do hero.
- [design system antigo] A tipografia cyberpunk pedida pelo Júnior (referência não encontrada).
- [design system antigo] O PDV-90 em papel claro.

**[design system v1.0 · pendente]** (base/design-system/design-system.md; fontes/design-system-v1.0/)
- [design system v1.0 · pendente] Fundos escuros, sem sombra, brilho nem gradiente.
- [design system v1.0 · pendente] As cores oficiais e a Menta como ação primária, "uma ação primária por tela".
- [design system v1.0 · pendente] Só a família Geist.
- [design system v1.0 · pendente] O logotipo, que não se redesenha.
- [design system v1.0 · pendente] Os rótulos de origem de cada regra.
- [design system v1.0 · pendente] A meta de acessibilidade WCAG 2.2 AA.
- [design system v1.0 · pendente] O checklist de revisão de peça.

O v1.0 já coincide com o registro nos nomes das entregas, em "implementação, nunca mentoria", na regra de vocabulário e em tirar "SDR" e "closer" do topo. Erra a grafia do Júnior e os nomes de etapa (`design-system`, "Divergências decididas").

---

## 4. Bloqueios

| Bloqueio | Onde toca a página | Quem decide · onde | O que a página faz enquanto isso |
|---|---|---|---|
| #90: o funil-01 no lugar das três portas | A página inteira e o destino único | O Júnior e o Euclides · conflito-06, conflito-14; pauta, item 1 | Feita como rascunho, avisando que pode mudar; sem integração ao banco até a aprovação |
| Promessa #33 e #85 | Hero A e B (título e subtítulo), frase-assinatura, "não é com alguém da equipe", liderança do Júnior e do Euclides, "gerente comercial" (#86), a referência "eu mando no seu comercial" (#81) | O Júnior e o Euclides; os ajustes, o Otávio · conflito-03, lacuna-02; pauta, item 5 | Placeholder marcado {{BLOQUEADO: #85}}; título do Hero B conforme 8.3 |
| Critério de qualificação e lead score (#98) | Qualificador do hero, seção 07, FAQ "Funciona no meu negócio?", passo 3 da seção 08 | O Otávio com o Júnior e o Euclides · ficha-de-fatos#criterio-de-qualificacao; conflito-01; pauta, item 2 | Placeholder marcado {{BLOQUEADO: ficha-de-fatos#criterio-de-qualificacao}}; só os itens de postura (8.8) |
| Nome público da Análise | Texto dos botões, cabeçalho, título e fecho da 07, sobretítulo da 08, FAQ | O Otávio · ficha-de-fatos#analise-nome-publico; conflito-02; pauta, item 7 | Texto neutro, que diz a ação sem o nome (8.4), com a marca do campo |
| Duração e condutor da conversa com o Júnior | Passo 3 da seção 08 | O Otávio (agenda do Júnior) · ficha-de-fatos#analise-duracao, ficha-de-fatos#analise-quem-conduz; pauta, item 7 | Texto neutro, sem duração; condutor com placeholder marcado |
| Consentimento LGPD e promessa percentual do quiz | O destino de todos os botões | O Otávio com o Júnior · conflito-09; pauta, item 3 | A landing não vai ao ar antes do quiz-01 publicável; no rascunho, aponta para o quiz-01 em rascunho |
| Contador de escassez (#93) | Bloco de chamada, seção 08 | Regra decidida; contagem depende de #90 e de 5.7 · ficha-de-fatos#barra-de-resgates; conflito-04 | Seção oculta até a contagem real passar do limite do campo; nenhuma porcentagem nem barra |
| Cobrança da Análise depois das gratuitas | Preço riscado e rodapé da seção 08 | O Otávio · 5.9 | Seção oculta (8.9) |
| PDV-90 como saída da Análise | Item 3 do cartão da seção 08 | O Júnior com o Otávio · conflito-10, lacuna-22; pauta, item 4 | Seção oculta |
| Credenciais, números públicos e nomes de terceiros | Contador "Total gerado" do hero, faixa de bastidores, seção 04 inteira | O Júnior e o Euclides, com comprovantes e autorizações · ficha-de-fatos#total-dos-dois, ficha-de-fatos#lancamento-finch, ficha-de-fatos#camila-vieira, ficha-de-fatos#credenciais-44; conflito-05, lacuna-16, lacuna-21 (depoimento sobre o Marçal), lacuna-24; pauta, item 9 | Seção oculta (alternativa mínima em 8.7) |
| Nome da agência e assinatura | Logo do cabeçalho, rodapé | O Júnior e o Euclides · ficha-de-fatos#nome-agencia; conflito-07; pauta, item 8 | Placeholder marcado |
| Design system (escuro do v1.0 contra branco e verde da #81, laranja de 03/11 e Triad v2 da #45) | Todo o visual, logo, imagens, cor dos botões | O Otávio e o Júnior · conflito-08; pauta, item 6 | Nada de cor, fonte nem estilo; só os conceitos de imagem como direção |
| Quantidade de calls em grupo | Seção 05, FAQ "Quem me atende?" | Ver outros-03 · ficha-de-fatos#calls-em-grupo; pauta, item 14 | Só o formato; quantidade com placeholder marcado |
| Parcelamento | FAQ "Posso parcelar?" | O Otávio com o Euclides · ficha-de-fatos#parcelamento; conflito-15; pauta, item 10 | Seção oculta |
| Safra de clientes (#16) | Cartão "vender mais vezes" da seção 02 | O Júnior · outros-10; pauta, item 18 | Texto neutro sem promessa, marcado {{BLOQUEADO: #16}} |
| Uso real de IA nas entregas | Linha da Inteligência Artificial na 03b | Não registrado (passa pela Cyntia, segundo o wireframe) · lacuna-21 | Texto neutro, IA como meio |
| Nota "Adaptado de" do Deming | Rodapé da seção 02 | O Otávio · 4.4 | Segue ficha-de-fatos#deming-percentual (com "Adaptado de"), marcado até a resposta |
| Vídeo na página (#51) | Hero ou seção própria | O Otávio · 8.6 | Nenhum lugar de vídeo no rascunho até a resposta |
| Meta da landing | Medição | O Otávio · 8.1 | Medir visita e início do quiz por versão, sem meta e sem conclusão antes da amostra mínima |
| "Reunião de safra", rito do formato anterior a 07/11 | Linha da Inteligência Humana (03b), cartão do Treinamento (05), tela do painel (06) | O Otávio · 8.12 | Texto neutro sem promessa até a troca |
| Postura do "vendedor chato" (#26) | Tom da copy | O Júnior · lacuna-20; pauta, item 19 | Só como rascunho, avisando que pode mudar |
| Datas das entregas "ainda de trabalho" | Linha do tempo da seção 05 | O Júnior e o Euclides (engenharia reversa) · ficha-de-fatos#quando-entrega-1 a ficha-de-fatos#quando-entrega-8; lacuna-01; pauta, item 12 | Só os três marcos dos campos, marcados como sujeitos a mudança |
| Teste da oferta e dos nomes das entregas com donos do perfil antes da copy | Copy da página inteira (etapa 9) | Não registrado · lacuna-25 | A copy da etapa 9 sai como rascunho, avisando que ainda não passou pelo teste |
| Endereço da landing | Links etiquetados de todas as origens | Não decidido · `funil-01`, "Origens e links" | Links do rascunho com o endereço como placeholder marcado |

---

## 5. O que fica para as próximas etapas

- **Etapa 9 (copy):** o texto de cada seção, a partir daqui, com {{ficha-de-fatos#campo}} e {{BLOQUEADO: ...}}.
- **Etapa 10 (estrutura):** ordem final, hierarquia, celular, botões, caminho até o quiz, estados de carregamento e erro, acessibilidade; sem cor, fonte nem estilo.
- **Antes de ir ao ar, fora desta fila:** a #90 aprovada, o quiz-01 publicável (conflito-09), a revisão de advogado da promessa, das credenciais e da escassez (`provas-e-conformidade`), e o design system decidido.

---

## Fontes

- Wireframe: fontes/acervo-2026-11-08/safra-acervo/01-dossie/safra-landing.md (Parte 1, seção por seção; Parte 2, Copy, UX e Design).
- base/decisoes.md (v3): #14, #16, #25, #26, #33, #36, #44, #45, #48, #51, #53, #56, #65, #66, #67, #68, #69, #71, #72, #73, #75, #78, #79, #80, #81, #83, #84, #85, #86, #87, #90, #91, #92, #93, #94, #98.
- base/ficha-de-fatos.md (v3); base/lacunas.md (v4): conflito-01 a conflito-15, lacuna-02, lacuna-05, lacuna-10, lacuna-11, lacuna-14, lacuna-16, lacuna-17, lacuna-19, lacuna-21, lacuna-22, lacuna-24, lacuna-25, outros-03, outros-10.
- base/persona.md (v2), base/promessa.md (v2), base/oferta.md (v1, desatualizada), base/mecanismo.md (v1, desatualizado), base/tom-de-voz.md (v2), base/provas-e-conformidade.md (v2), base/entregas-do-servico.md (v2), base/design-system/design-system.md (v2), base/lead-score.md (v1), GLOSSARY.md (v2).
- funis/funil-01/funil.md (v1); dados/planta/planta.md (v1); entregas/pautas/pauta-aprovacao-01.md (v1).
- prompts/04-decisoes-de-08-11-e-lead-score.md, seção 2; prompts/05-fila-de-trabalho.md, "Etapa 8"; prompts/05-fila-perguntas.md (4.4, 4.5, 4.6, 5.7, 5.9, 6.2, 6.7, 6.9 e 8.1 a 8.15).
