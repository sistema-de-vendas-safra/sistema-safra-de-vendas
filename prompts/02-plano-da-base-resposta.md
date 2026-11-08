# Etapa 2 · Plano da base · resposta

Feito em 08/11/2026 a partir do pedido em prompts/02-plano-da-base.md. Nada foi escrito em base/ nem em fontes/. Este arquivo só propõe.

**Como citar as fontes neste plano.** Os códigos F1 a F25 são os do Mapa de fontes do CONTEXTO (v5.3). Os números como #48 são as decisões do CONTEXTO §11. "CTX §3" é a seção 3 do CONTEXTO-DO-PROJETO.md. "Online" é o documento da pasta 03-documentos-online, que vale sobre a cópia FONTE. Três fontes sem código F, citadas pelo nome: o dossiê (01-dossie/safra-dossie.md), a landing (01-dossie/safra-landing.md) e o quiz (05-paginas/quiz-diagnostico-de-vendas/index.html). DS é o design system em fontes/design-system-v1.0/.

**Lido:** CLAUDE.md, nucleo/regras/versionamento.md, 00-LEIA-ME.md, CONTEXTO 5.3 inteiro, dossiê, landing, LEIA.md e safra-tokens.json do DS, o texto da pagina-documentacao.html. Para confirmar itens: Ficha do Serviço, Promessa central e Doc Mestre online (inteiros); Oferta, Downsell, One pager e Engenharia reversa online (por busca); o código do quiz; F25 e PAINEL-iasv-safra.md (por busca).

---

## 1. Documentos da base

Mudanças sobre o ponto de partida, com o motivo:

- **produto** fica só com o formato da IASV Safra (o que é, ritos, quem faz o quê, o que não está incluído). O sistema e o método vão para dois documentos novos, porque têm status diferentes: **metodo** (o sistema das 7 peças e a Gestão de Leads por Safra, decidido pelo Otávio em #69) e **mecanismo** (problema, Big Idea, analogia e crença, aprovados pelo Júnior e pelo Euclides em #48). Juntos num só, o status cairia para o mais fraco e o "aprovado" da Big Idea se perderia.
- **provas-e-conformidade** entra como documento novo. A landing e o quiz dependem dele o tempo todo (contador, barra de vagas, credenciais, consentimento LGPD, o que pode e o que não pode ser prometido) e hoje essas regras estão espalhadas em CTX §7, §8 e nas Regras do funil do Doc Mestre.
- **glossario** é o CONTEXT.md (parte 3). Fica fora de base/ só se você decidir pela raiz do repositório (pergunta no fim).
- **design-system** passa a ser uma ficha em base/design-system/ que aponta para fontes/design-system-v1.0/ sem copiar os tokens, e registra os conflitos com #45, #81 e os botões laranja.

Os status abaixo seguem o registro do CONTEXTO. Em aprovado_por, a data é a da decisão registrada; "pendente" é quem ainda precisa aprovar.

| id | Arquivo | O que contém | De onde sai | Status inicial | aprovado_por |
|---|---|---|---|---|---|
| ficha-de-fatos | base/ficha-de-fatos.md | Todos os fatos da parte 2, cada um com valor, fonte e status próprio; os campos em conflito marcados como "em conflito" e proibidos em entrega até a decisão | CTX §1, §3, §7, §10; Ficha, Oferta, Downsell, One pager e Doc Mestre online; F1; landing; quiz | rascunho até você aprovar a ficha; depois decidido. Cada campo carrega o status da decisão de origem | otavio: pendente |
| produto | base/produto.md | O que é a IASV Safra: 90 dias, implementação nunca mentoria, sistema instalado em 15 dias, CRM do cliente; os ritos (3 Sessões de Comando, calls em grupo, análise de calls, grupo de suporte); o que o cliente precisa fazer; o que não está incluído; a continuidade (GSAAS) e o downsell só como referência à ficha | CTX §3; Ficha online; F25; #46, #52, #53, #70 a #79, #83, #84, #88 | decidido (#70 a #79 são decisões do Júnior na call de 07/11; #83, #84 e #88, suas) | otavio: 2026-11-08 |
| metodo | base/metodo.md | O Sistema de Vendas Safra (as 7 peças); a Gestão de Leads por Safra como método proprietário; as seis regras (safra, relógio, estágio, estado, metas por etapa, leitura de trás para frente); onde o método já roda (leilão de julho, números na ficha) | CTX §3, §13; F12 online ("o que é e como se diferencia"); F7 (só as regras); F1; #41, #69 | decidido | otavio: 2026-11-03 |
| mecanismo | base/mecanismo.md | O problema (Gestão Mensal de Leads) em três camadas; a solução em cinco passos; a Big Idea aprovada; a analogia rúcula, morango e melancia; a crença que decide a compra. A frase filosófica fica marcada como pendente dentro do documento | Mecanismo único online (F13); Big Idea final online (F14, pasta "Big Idea do Método Safra · rodada 1"); Promessa online (a crença); #36, #40, #48 | aprovado | otavio: 2026-10-22; junior: 2026-10-27; euclides: 2026-10-27 |
| oferta | base/oferta.md | A oferta montada: equação de valor, obstáculos, âncoras, roteiro da call, bônus, garantia, porta de entrada e downsell, citando os valores pela ficha | Oferta online (v1.7, 08/11); One pager online; Downsell online; CTX §3, §9 | pendente-aprovacao (o núcleo foi aprovado em #48; #52 a #65 e #84 são revisões suas depois disso, que pelo CTX §11 "valem como direção de trabalho") | otavio: 2026-11-08; junior: pendente; euclides: pendente |
| promessa | base/promessa.md | A promessa de 08/11 nas duas versões, com o subtítulo; os ajustes propostos marcados como sugestão; a frase-assinatura; o que pode e o que não pode ir a público; a promessa de 23/10 (#33) como histórico | Promessa central online; CTX §6, §8, leitura 23; #39, #85 | pendente-aprovacao | otavio: 2026-11-08; junior: pendente; euclides: pendente |
| entregas-do-servico | base/entregas-do-servico.md | As 8 entregas com o nome oficial, o que cada uma é, a descrição da horta (só na descrição), quando sai (pela ficha) e o critério de pronto; a ordem e o porquê | Ficha online; CTX §3; DS (nomes "use exatamente assim"); #52, #56, #72 a #75, #77, #88 | decidido (nomes seus, #56; entregáveis aprovados em #48; calendário do Júnior em 07/11). O calendário por dia da engenharia reversa não entra: é proposta e fica em lacunas | otavio: 2026-11-01 |
| persona | base/persona.md | Rafa, o Dono-Closer; dores, ganhos, palavras queimadas, falsas crenças, citações com ID (RA-01, CS-02), grau de evidência de cada item. O critério de qualificação não fica aqui: mora na ficha, em conflito | Buyer Persona online (F2); Mapa de Empatia online (F3); F4; F5; CTX §4, §9 | decidido, como base de pesquisa (35 vozes públicas, sem entrevistas; validação com 8 a 10 donos pendente). Nenhuma decisão do CONTEXTO cobre a persona: é proposta minha | otavio: pendente |
| tom-de-voz | base/tom-de-voz.md | Voz (skill junior-neves-voice), grafia, regra de vocabulário de 22/10, postura do "vendedor chato", "nunca dizer", frases gastas do mercado, falas do Júnior. Os termos e sinônimos a evitar ficam no glossário, não aqui | CTX §4, §5, §6; dossiê §7; Doc Mestre (regra 7); F10; PAINEL-iasv-safra.md; DS (Linguagem). Manual de tom de voz: não encontrado | pendente-aprovacao (#26 e #29 dependem da confirmação do Júnior; o resto é seu) | otavio: 2026-11-08; junior: pendente |
| provas-e-conformidade | base/provas-e-conformidade.md | O que existe de prova; a lista [PROVA REAL] do que falta; as regras de CDC, CONAR, LGPD e Código Civil que valem para peça; as três regras jurídicas do funil | CTX §7, §8; Doc Mestre (Regras do funil 1 a 3 e 8); landing (Regras de conformidade); Ficha online | decidido | otavio: 2026-11-08 |
| decisoes | base/decisoes.md | O registro #1 a #90 (formato na parte 4) | CTX §11 e o texto espalhado em CTX §1 a §13; dossiê §9; documentos online; log.md (#90) | decidido como registro fiel; cada decisão tem o status dela | otavio: pendente |
| lacunas | base/lacunas.md | As lacunas do CTX §10 mais os conflitos novos da parte 5, cada um com quem decide e o que destrava | CTX §10; parte 5 deste plano; Engenharia reversa online (12 pontos) | rascunho (lista viva) | otavio: pendente |
| design-system | base/design-system/design-system.md | Ficha do DS v1.0: origem, versão, o que vale (cores, Geist, proporção, vocabulário do site oficial), o que não vale ainda, os conflitos com #45, #81 e o laranja. Aponta para os arquivos em fontes/, sem copiar | fontes/design-system-v1.0/ (LEIA.md, safra-tokens.json, pagina-documentacao.html); landing (bloco "design system antigo"); F25; #45, #81 | rascunho (nenhuma decisão registra a adoção do DS v1.0; pendência já aberta no log.md) | otavio: pendente; junior: pendente (#81 foi dele) |
| glossario | CONTEXT.md (raiz) ou base/CONTEXT.md | Parte 3 | CTX §13; dossiê §11; DS (Nome em texto corrido; Linguagem) | decidido | otavio: pendente |

---

## 2. Ficha de fatos

Cada campo tem um id para ser citado de fora (ex.: `ficha-de-fatos#preco-avancada`). Os campos **em conflito** listam os valores concorrentes e onde cada um aparece; nenhum deles pode ir para entrega até a decisão.

### Preço, vagas e pagamento

| Campo | Valor | Fonte | Status |
|---|---|---|---|
| preco-avancada | R$ 45 mil até a 10ª venda da Avançada | #57 (#9, #19); CTX §3; Ficha, Oferta e Doc Mestre online | decidido |
| preco-avancada-depois | R$ 60 mil depois da 10ª venda, cobrado de verdade; nunca "de R$ 60 mil por R$ 45 mil" | #19, #57; Ficha online; Doc Mestre (regra 1) | decidido |
| vagas | 10 = as 10 primeiras vendas da Avançada; sem turma nem início comum; as vagas não diminuem até a 10ª venda | #57, #63, #64, #65 | decidido. Obs.: CTX diz "10 primeiras vendas"; Ficha, Oferta e Doc Mestre dizem "10 primeiras vagas" no mesmo sentido. A ficha fixa "vendas" (#65) e o glossário põe "vagas" como forma aceita |
| vendas-que-contam | Só vendas da Avançada; a Essencial não conta | #63 | decidido |
| urgencia | Só o preço até a 10ª venda; nenhuma data, nenhum prazo | #57, #65; Ficha online; CTX §6 | decidido |
| inicio-de-cada-cliente | Em aberto | #65 | em aberto. Proposta: venda com data de início marcada, em janelas de até 3 clientes (Engenharia reversa, sugestão não confirmada) |
| meio-de-pagamento | Hotmart, à vista ou parcelado | #54 (Euclides, 28/10) | decidido |
| parcelamento | **Em conflito.** "Parcelamento e taxa a definir" (CTX §3) · "proposta: R$ 45 mil à vista ou 6x de R$ 8.250" (Oferta e One pager online; PAINEL) | | a definir |
| taxa-hotmart | Taxa reduzida em negociação pelo Euclides | Oferta e Doc Mestre online | em aberto |
| garantia | Nenhuma; contrato só com o escopo das 8 entregas | #39 | decidido |
| arrependimento | 7 dias (CDC, art. 49), no checkout e nos termos da Hotmart | CTX §8; landing (FAQ) | regra legal |
| meta-de-vendas | 10 vendas em 30 dias, R$ 450 mil brutos | #50; Doc Mestre | decidido, sob tensão com a agenda do Júnior (lacuna 1) |
| inicio-do-funil | 10/11/2026 | #50 | decidido; log.md registra que pode atrasar |

### Duração e prazos

| Campo | Valor | Fonte | Status |
|---|---|---|---|
| duracao | 90 dias (13 semanas) | #46; Ficha online | decidido |
| inicio-do-relogio | Na primeira Sessão de Comando | #72 | decidido |
| sistema-instalado | Dia 15 | #73 | decidido |
| execucao-do-time | O time do cliente executa a infraestrutura em uma semana | #74 | decidido |
| quando-entrega-1 a quando-entrega-8 | 1: semana 1 · 2: semanas 1 e 2 · 3: até o dia 15 · 4: semanas 3 a 13 · 5: até o dia 15 · 6: teoria até o dia 15, grupo das semanas 3 a 13 · 7: semanas 1 e 2 · 8: semana 13 | Ficha online; #72 a #75, #88 | decidido; a Ficha avisa que "as datas ainda são de trabalho" até a engenharia reversa |
| safras-novas | Fecham entre o 4º e o 5º mês, contados da primeira call; dito na venda | Ficha online | decidido |
| calendario-por-dia | D-5 a D90, horas por papel | Engenharia reversa online | sugestão, não confirmada (fica fora da ficha até validar) |

### Entregas, ritos e suporte

| Campo | Valor | Fonte | Status |
|---|---|---|---|
| numero-de-entregas | **Em conflito.** 8 (#52, #56; Ficha online; DS) · 9, com a "Mentoria 1:1" como nona (wireframe, seções 5 e 9) · 9 (contrato, fora do projeto) | | 8 decidido; a página está desatualizada (lacuna 5) |
| nomes-das-entregas | Análise Estratégica das Safras; Implementação da Infraestrutura; Playbook de Comunicação Persuasiva; Recuperação de Ativos; Painel de Safras; Treinamento para Otimização da Conversão; Playbook da Gestão de Vendas por Safra; Relatório de Produtividade | #56; Ficha online; DS | decidido (nomes entram na ficha porque o DS manda usá-los "exatamente assim") |
| sessoes-de-comando | 3, com o Júnior, o dono e o head comercial: semana 1 (de 2 a 3 horas), semana 1 ou 2 (entre o D3 e o D5 na engenharia reversa) e semana 13 | #78, #83; Ficha online | decidido. A Sessão 2 conjunta por janela é proposta que mexe em #78 (lacuna 1) |
| calls-em-grupo | Semanais, das semanas 3 a 13, conduzidas pelo Júnior e pelo Euclides. **Quantidade em conflito:** "cerca de dez" (Ficha online) · "11 calls em grupo" (Promessa online, ao falar da agenda do Euclides) | #78, #79 | decidido no formato; quantidade a fixar |
| analise-de-calls | 2 calls de venda por cliente por semana, devolvidas no grupo de suporte | #88 | decidido |
| grupo-de-suporte | 1 grupo de WhatsApp por cliente, com CS e IA de consulta | #76 | decidido; quem faz o CS e a IA ficou para depois (#84) |
| insumo-do-cliente | Liberar acessos e exportar leads de 3 a 6 meses; levar sócio e head às 3 Sessões; nomear um responsável; atraso do cliente pausa o cronograma, não o pagamento | Ficha online | decidido. "Cerca de 2 horas por dia do head do D4 ao D10" é da engenharia reversa (sugestão) |

### Análise (a porta de entrada)

| Campo | Valor | Fonte | Status |
|---|---|---|---|
| analise-nome-publico | **Em conflito.** "Análise Estratégica do seu Comercial" ou "do seu Sistema de Vendas" (#66; CTX §6, §13; Doc Mestre) · "Análise Estratégica das Safras, na versão da call" (Ficha, Oferta e One pager online; é também o nome da entrega 1) · botão "Faça uma Análise Estratégica do seu Sistema de Vendas" (landing) · "Diagnóstico de vendas" e "Teste gratuito" (quiz) | | conflito de nome |
| analise-valor | **Em conflito.** Valor de R$ 4.997 (#62; CTX; Ficha, Oferta, Doc Mestre online) · R$ 497 riscado, e "passa a custar R$ 497" quando a promoção acabar (landing, seção 08) · "Agora ele é gratuito. Em breve, vai custar R$ 497", dito do plano de ação de 90 dias (quiz) | | conflito (lacuna 11) |
| analise-gratuidade | **Em conflito.** Gratuita nas 10 primeiras vendas, cobrada por R$ 4.997 depois (#49, #59, #62) · "promoção de lançamento", sem citar a 10ª venda (landing; pedido seu de 03/11, fora do registro numerado) | | conflito |
| analise-duracao | **Em conflito.** 30 a 45 minutos (#59, #61; Ficha online) · 60 minutos (landing, passo 3) | | conflito |
| analise-quem-conduz | **Em conflito.** O Júnior (#51, #62; Doc Mestre) · "o time de Junior Neves" (landing, passo 3) | | conflito |
| analise-conteudo | Sobre a última safra, a mesma para todos os públicos | #59, #61 | decidido |
| analise-abatimento | Se o valor pago depois da 10ª venda é abatido na implementação | Ficha online | proposta |
| quem-agenda | O SDR; quem é o SDR (a Tati ou alguém a contratar) em aberto | #67; Doc Mestre (decisão 3) | decidido; nome em aberto |
| quem-faz-a-reuniao | O Júnior, no começo | #51 | decidido |

### Bônus, downsell e continuidade

| Campo | Valor | Fonte | Status |
|---|---|---|---|
| bonus-curso | Curso gravado do Júnior para o time; preço real e se é a Formação Estrategista e Growth Hacker: a confirmar | #48; CTX §10 (lacuna 22, fatos a confirmar) | aprovado |
| bonus-analise-base | Análise Estratégica da base de clientes, "valor de R$ 4.997" (CTX §3) ou "referência: R$ 4.997" (One pager) | #48, #59 | aprovado |
| bonus-caso | Sessão extra com o Júnior para quem autoriza virar caso documentado | #48 | aprovado |
| downsell-nome | Implementação Essencial | #60 | decidido |
| downsell-preco | **Em conflito.** R$ 22.500, "decidido (23/10)" (Downsell online; #60) · "R$ 22.500 segue como hipótese" (Engenharia reversa online) | | decidido no registro; a proposta nova reabre |
| downsell-desenho | Entregas 1, 3, 6 e 7, 13 semanas, curso gravado como único bônus, GSAAS depois, só depois do não, forma de pagamento a definir · proposta de 08/11: Instalação em 15 dias (entregas 1, 2, 3 e 7) | #37, #42, #60; Downsell online; Engenharia reversa | decidido, em revisão (lacuna 3) |
| gsaas | Nome decidido (#38); desenho, preço e detalhes para depois (#84); hipótese de R$ 15 mil por mês. Grafia GSAAS ou GSaaS a confirmar (PAINEL) | #38, #58, #84 | para depois |

### Público e qualificação

| Campo | Valor | Fonte | Status |
|---|---|---|---|
| criterio-de-qualificacao | **Em conflito, cinco versões.** (a) Faturamento de R$ 150 mil a R$ 1,5 milhão por mês, cerca de 100 leads por mês (a validar), duas ou mais pessoas vendendo com o dono incluído, histórico de 3 meses; venda consultiva acima de R$ 10 mil (Ficha online, "Serve para quem" e "Em 30 segundos"; F2). (b) Só quem já tem time de vendas (Júnior, F22, 28/10). (c) Venda acima de R$ 5 mil e faturamento acima de R$ 100 mil por mês (landing: Hero A, "Para quem é", FAQ). (d) Já tem leads, já tem time, vende acima de R$ 10 mil (landing: Hero B; One pager). (e) No quiz, "qualificado" é quem fatura R$ 50 mil por mês ou mais e tem ao menos 1 vendedor que faz reunião; o valor médio da venda é perguntado mas não filtra (quiz, função `qualificado`) | | sem decisão (lacuna 12; Doc Mestre, decisão 9) |
| volume-minimo | Cerca de 100 leads por mês | Ficha online | hipótese a validar |
| metas-por-etapa | 50% pré-qualificam, 50% agendam, 75% comparecem, 20% fecham (3,75% de lead em venda) | F1; F12; quiz (`METAS = [50, 50, 75, 20]`) | regra do método (Júnior) |
| safra-de-julho | 989 leads, 12,8% pré-qualificados, 16% de agendamento, 36% de fechamento sobre reuniões; fechou em 29/10 sem números finais; se os 127 são os pré-qualificados (F1) ou os que não agendaram (F7) | F1; CTX §3, §10 | fato registrado; final a confirmar |
| head-comercial-custo | Cerca de R$ 14 mil por mês (segundo o Júnior) | CTX §5; Ficha online | fato citado |

### Credenciais e números públicos (todos sem comprovante)

| Campo | Valor | Fonte | Status |
|---|---|---|---|
| total-dos-dois | **Em conflito.** Mais de R$ 600 milhões (CTX §1; Doc Mestre, regra 2) · R$ 579 milhões ("R$ 579 mi+" nas credenciais e contador "R$ 579.324.483,37" no hero, na landing) | | [PROVA REAL] (lacuna 16) |
| lancamento-finch | **Em conflito.** R$ 120 milhões (CTX; landing) · R$ 126 milhões (criativos de 01/11, CTX §3) | | [PROVA REAL] |
| camila-vieira | Do zero aos R$ 28 milhões em 11 meses | CTX §3 | [PROVA REAL] |
| seguidores-junior | 130 mil | Doc Mestre; F10 | fato de pesquisa (20/10) |

### Nome e assinatura

| Campo | Valor | Fonte | Status |
|---|---|---|---|
| nome-agencia | **Em conflito.** "Triad H.", provisório (#89, pendente do Júnior e do Euclides) · "Triad" e "© 2026 Triad Marketing USA LLC" (rodapé do quiz) · "TRIAD MKT" no logo (Doc Mestre) · proposta de assinar página e criativos por "Junior Neves e IASV Safra" até o nome sair (Doc Mestre) | | pendente-aprovacao |
| grafia-junior | "Junior Neves" em público, "Júnior" no texto corrido (CTX §6) · o DS escreve "Júnior Neves" | | decidido no CTX; o DS diverge |

**Não encontrado nas fontes:** o número de Análises gratuitas que a barra de resgates usaria; o teto de reuniões do Júnior por semana; a verba de mídia; o número do WhatsApp da Triad (vazio no quiz).

---

## 3. Glossário (CONTEXT.md)

**Formato.** O da skill grill-with-docs do plugin mattpocock-skills, versão 1.2.3 (arquivo domain-modeling/CONTEXT-FORMAT.md): título, uma ou duas frases sobre o contexto, seção "Language", um verbete por termo em negrito, definição de uma ou duas frases dizendo o que o termo **é**, e a linha `_Avoid_:` com os sinônimos e nomes velhos que não se usa. Na versão 1.3.1 do plugin o mesmo formato foi renomeado para GLOSSARY.md; como você pediu CONTEXT.md, sigo a 1.2.3.

**Como o material vira verbete.**

1. Cada termo do CTX §13 e da tabela "Termos do Safra" do dossiê §11 vira um verbete. A definição sai do CTX, conferida na Ficha online; a fonte vai numa linha `_Fonte_:` (extensão nossa ao formato, porque a regra 2 da casa pede fonte).
2. A lista "Termos e frases a evitar" (dossiê §11; CTX §6) se divide em duas:
   - **Sinônimos e nomes antigos** de um conceito vão para o `_Avoid_` do verbete certo (ex.: "Mentoria 1:1" no verbete Sessões de Comando; "Leitura das Safras" no verbete Análise Estratégica das Safras).
   - **Frases e alegações proibidas** que não são nome de nada ("10x", "94% do seu problema de vendas", "a oferta mais robusta do mercado", "balde furado") não cabem no formato: vão para o tom-de-voz, e o glossário aponta para lá.
3. Agrupamento em subtítulos, como o formato permite: A Triad e as pessoas · O sistema e o método · A oferta · As entregas e os ritos · O funil.
4. Termos com nome em conflito (a Análise da porta, a agência) entram com a forma registrada e uma nota "em conflito, ver lacunas", sem escolher por você.
5. Termos gerais de vendas (lead, CRM, SDR) não entram, pela regra do formato. Exceção: onde o projeto dá um sentido próprio (ex.: "Perdido").

**Três verbetes de exemplo:**

```md
**Sessões de Comando**:
As três calls individuais do Junior Neves com o dono e o head comercial de cada cliente: na semana 1, na semana 1 ou 2 e na semana 13.
_Avoid_: Mentoria 1:1, mentoria, mentorias, calls individuais (em peça)
_Fonte_: #83; Ficha online; CTX §13

**Gestão Mensal de Leads**:
O problema que o sistema resolve: o mês como régua de tudo, inclusive do lead, que sai da mesa quando o mês vira sem ter dito não.
_Avoid_: Safras Misturadas, lead parado, ponto cego
_Fonte_: #40; Mecanismo único online (F13)

**Perdido**:
O estado do lead que disse não. Quem não respondeu ainda está no campo.
_Fonte_: F1; Ficha online; F12
```

---

## 4. Decisões

**Onde.** base/decisoes.md, com o cabeçalho padrão (id decisoes).

**O que encontrei.** O CONTEXTO não lista as decisões uma a uma: a seção 11 agrupa por data ("#8 a #29: mecanismo por safra, Big Idea, oferta, nomes e postura"), e o texto de cada número está espalhado nas seções 1 a 13 e nos documentos online. Achei texto para a maioria; sem texto em nenhuma fonte do acervo: #2 a #6 (aparecem só como "estacionadas"), #17, #21, #28, #30, #31, #35 e #47. A #12 e a #20 só aparecem nos documentos online (Downsell e Oferta), não no CONTEXTO.

**Formato.** Uma tabela, uma linha por número, sem pular nenhum:

| # | Data | Decisão | Quem decidiu | Status | Revista por | Fonte |
|---|---|---|---|---|---|---|
| 65 | 2026-11-03 | As 10 vagas são as 10 primeiras vendas, sem turma nem início comum | Otávio | decidido | | CTX §3, §11 |
| 66 | 2026-11-03 | Página única com três portas, cada uma com e sem VSL; campanhas da Análise e da Calculadora | Otávio | decidido; substituição proposta em #90 | #90 (pendente) | CTX §3, §11 |

Regras do registro:

- **Status de cada linha:** decidido · aprovado · pendente-aprovacao (com quem falta) · depende de confirmação do Júnior (#16, #26, #29, #44, #87) · estacionada (#1 a #7, #10, #13, #15, #18, #23, #27) · substituída por #N (ex.: #33 por #85) · texto não encontrado.
- **Nada se apaga.** Uma decisão substituída fica na tabela com "substituída por #N"; quem substitui ganha "substitui #N".
- **Frase curta, com as palavras da fonte.** Não reescrevo o sentido; onde o texto vier de mais de um lugar, cito os dois.
- **Decisões novas entram a partir da #90**, sempre com a sua palavra; cada uma sobe a versão do documento e ganha linha no log.md, e a cascata marca os dependentes.
- O CTX §11, linha 207, entra como nota no topo: o que #48 aprovou vale como decisão do cliente; as de 07/11 são do cliente; as de 08/11 são suas e valem como direção de trabalho até a aprovação dos sócios.

**Como a #90 entra:**

| # | Data | Decisão | Quem decidiu | Status | Revista por | Fonte |
|---|---|---|---|---|---|---|
| 90 | 2026-11-08 | O funil-01 (landing-page-01, quiz-01, Supabase, planilha, SDR) substitui a página das três portas (#66) e o CRM do Doc Mestre | Otávio | pendente-aprovacao (junior: pendente; euclides: pendente); substitui #66 quando aprovada | | log.md, Pendências (fora do acervo) |

Enquanto a #90 estiver pendente: a #66 continua "decidido", com a nota "substituição proposta em #90"; funis/funil-01, a landing-page-01 e o quiz-01 levam `depende_de: decisoes` e só podem ser feitos como rascunho, avisando que podem mudar (regra de versionamento). Quando os dois aprovarem: a #90 vira "aprovado" com as datas, a #66 vira "substituída por #90", decisoes sobe de versão e a cascata marca o que dependia da versão anterior.

---

## 5. Conflitos

### Afetam a landing-page-01 e o quiz-01, por prioridade

| # | O que conflita | Valores e fonte de cada lado | Quem decide |
|---|---|---|---|
| 1 | **Critério de qualificação** (filtro do quiz e texto de "Para quem é") | As cinco versões do campo criterio-de-qualificacao na ficha: Ficha online e F2 (R$ 10 mil; R$ 150 mil a R$ 1,5 milhão); Júnior em F22 (só quem tem time); landing Hero A, "Para quem é" e FAQ (R$ 5 mil; R$ 100 mil); Hero B e One pager (R$ 10 mil, já tem time); quiz (R$ 50 mil por mês e 1 vendedor; o ticket não filtra). O quiz deixa passar quem a Ficha recusa (dono sozinho, R$ 50 mil por mês) | Você com o Júnior e o Euclides (Doc Mestre, decisão 9; a regra do quiz é do Júnior na E.M.V.) |
| 2 | **A Análise: valor, gratuidade, duração, quem conduz e nome** | R$ 4.997, gratuita até a 10ª venda, 30 a 45 minutos, com o Júnior (#59, #61, #62; Ficha online) · R$ 497 riscado, "promoção de lançamento", 60 minutos, com "o time de Junior Neves" (landing) · "Em breve, vai custar R$ 497", dito do plano de 90 dias (quiz) · nome: "do seu Comercial" (#66), "das Safras na versão da call" (Ficha, Oferta), "do seu Sistema de Vendas" (botão), "Diagnóstico de vendas" (quiz) | Você (#59 a #62 são seus); o Doc Mestre põe o valor entre as decisões do Júnior e do Euclides (decisão 4), então convém levar aos dois |
| 3 | **Promessa do hero** | Hero A ainda usa o título de 23/10 (#33, substituída) e o subtítulo "sem precisar mudar uma vírgula no seu marketing", que a leitura 23 do CTX diz contradizer o método · promessa de 08/11 (#85), pendente dos dois, com ajustes propostos não confirmados (Promessa online) · Hero B adapta a #33 · o DS v1.0 traz a #33 como "Proposta de valor" | Júnior e Euclides aprovam a #85; você decide os ajustes |
| 4 | **Escassez e contador** | "Restam 19%" e "81% das Análises gratuitas já foram resgatadas" (landing; pedido seu de 03/11, número de exemplo) e contador "Total gerado" · CTX §8 e Doc Mestre regra 3: só com contagem real e número fixo de Análises; a promoção precisa de fim real. Número de Análises gratuitas: não encontrado | Você (copy); o número real depende do funil-01 |
| 5 | **Credenciais e nomes de terceiros** | R$ 600 ou R$ 579 milhões; R$ 120 ou R$ 126 milhões; faixa "nos bastidores de" com seis nomes; mosaico de fotos; depoimento do Júnior sobre o Marçal (landing) · CTX §7, §8: comprovante, autorização de nome e imagem (Código Civil, art. 18), "um dos maiores" sem prova | Júnior e Euclides (#44), com os comprovantes |
| 6 | **Portas e destinos (#66 contra #90)** | Três portas com e sem VSL, Calculadora como porta (#66; Doc Mestre) · todos os botões levam à Análise e a calculadora saiu (landing) · #90 substitui a #66, pendente | Júnior e Euclides (aprovação da #90) |
| 7 | **Quem assina e nome da agência** | "Triad H." provisório (#89, pendente) · "Triad" e "Triad Marketing USA LLC" (quiz) · assinar por "Junior Neves e IASV Safra" até o nome sair (Doc Mestre, proposta) · "Euclides Vieira e Júnior Neves formam a Triad" (DS) | Júnior e Euclides |
| 8 | **Design** | DS v1.0: fundo escuro, só a paleta oficial, Menta como ação primária, Geist (DS) · paleta branco e verde aprovada pelo Júnior "pela sequência da fala, confirmar" (#81; F25) · botões laranja #FF8400 (seu pedido de 03/11, landing) · "o design system Triad v2 vale até o nome novo sair" (#45; Doc Mestre, regra 9) | Você com o Júnior (#81 foi dele); já está nas pendências do log.md |
| 9 | **O quiz promete resultado e não pede consentimento** | O quiz diz que o sistema "pode aumentar seu faturamento em até X%" (X calculado no código) · a Promessa online guarda promessa percentual até haver casos; #39 e CTX §8 (CONAR, CDC art. 30) · CTX §8 e Doc Mestre regra 8 pedem consentimento LGPD no quiz; o quiz pede e-mail e WhatsApp sem texto de consentimento | Você com o Júnior (o quiz é o artefato dele) |
| 10 | **Plano de ação de 90 dias como saída** | O quiz oferece "plano de ação de 90 dias" pelo WhatsApp; a landing mostra o PDV-90 como saída da Análise · nenhuma decisão o põe como entrega (lacuna 22); precisa da confirmação do Júnior | Júnior, com você |
| 11 | **A página ainda no formato antigo** | 9 entregas e "Mentoria 1:1" (contra #52, #83 e #53); calendário com a Análise na semana 3 (contra #72); gerente de safra no FAQ (formato de 07/11); "as dez começam juntas" (contra #65); GSAAS nas seções 5 e 6 e no FAQ (contra #68); "gerente comercial" alinhado à promessa (#86) (landing; CTX lacunas 5, 14, 15, 17) | Você (as regras são suas) |
| 12 | **Vocabulário do DS contra o do método** | Etapas: "lead qualificado, reunião marcada, reunião realizada, venda" (DS) · "pré-qualificação, agendamento, comparecimento, fechamento" (Ficha online; quiz) · estágios "captado, pré-qualificado, agendado, realizado, venda" (F12). O DS proíbe "SDR", "closer" e "pipeline" na comunicação de topo; a landing usa "closer" e "SDR" no diagrama da seção 2. O DS escreve "Júnior Neves" | Você |
| 13 | **O 94% de Deming no título da seção 2** | "94%* dos problemas de vendas são problemas de Sistema de Vendas", sem "Adaptado de" (landing) · "Nunca dizer: 94% do seu problema de vendas" (CTX §6); Deming fala de empresas em geral (CTX §7); a nota "Adaptado de" segue em aberto (lacuna 21) | Você |
| 14 | **#90 pendente e a data de 10/11** | Tudo que a landing e o quiz usam do funil-01 (Supabase, planilha, SDR) depende de uma decisão pendente; a data de 10/11 pode atrasar (log.md) | Júnior e Euclides (#90); você (data) |
| 15 | **Parcelamento no FAQ** | "Posso parcelar? Sim. Pela Hotmart, à vista ou parcelado" (landing) · parcelamento a definir (CTX) · proposta 6x de R$ 8.250 (Oferta online) | Você com o Euclides (taxa da Hotmart) |

### Não afetam a landing nem o quiz

- Engenharia reversa a validar: meta de 10 vendas em 30 dias contra a agenda do Júnior (caminhos A, B, C; o C mexe na #78).
- Essencial: Instalação em 15 dias ou versão em grupo; preço "decidido" (Downsell) contra "hipótese" (Engenharia reversa).
- Calls em grupo: "cerca de dez" (Ficha) contra "11" (Promessa), o que pesa na agenda do Euclides.
- GSAAS: desenho, preço, quem conduz o grupo, grafia GSAAS ou GSaaS.
- Papéis da entrega (analista, redator, revisor de calls, CS, tecnologia).
- Contrato ainda com 9 entregas e sem o formato de 07/11.
- Tese da Triad com growth hacking (#82) e se os pilares viram as quatro áreas.
- Tese do closer como macronarrativa (#87), autoria a confirmar.
- Lucro por lead pede a margem do cliente.
- Safra de clientes (#16), sem a qual "vender mais vezes" fica sem entrega.
- Credenciais autodeclaradas do Júnior de 07/11, sem comprovante.
- Números finais da safra de julho e os 127.
- Data e autor de F7; se o curso gravado é a Formação; papel da Júlia.
- Painel interativo (v4.10) e apresentação comercial sem #70 a #89; slide da Análise contra #61.
- Restos no Google Docs do Doc Mestre (lacuna 18).
- Simulador a refazer no formato de 07/11.
- Site sv-safra.soulstory.com.br aberto, sem senha (já no log.md).

---

## 6. O que fica fora da base

Ficam em fontes/ só para consulta. A base cita quando precisar, mas não destila.

| Fonte | Por quê |
|---|---|
| Transcrições: F1, F22 (parte bruta), F19, 07-materiais-enviados/transcricao-call-07-11.txt e resumo-reuniao-07-11.txt, "Resumo da reunião com Junior Neves (07 11)" online | Material bruto com erros de reconhecimento. As decisões já estão no CTX e em F25; abrir só para conferir uma fala ou um minuto |
| Cópias FONTE com documento online mais novo: F11 (FONTE-ficha-do-servico), F12 (FONTE-metodo-safra-diferenciacao), F17 (FONTE-downsell) | Vale o documento online (regra 1 da casa) |
| F7 (FONTE-metodo-safra) | Só as regras do método entram (em metodo); preço, nomes, entregas e relógio estão superados |
| Superadas ou históricas: Tese de mercado da Triad (F18, superada por #82), Relatório de estado (22/10), Big Idea · IASV Safra (22/10, "O Comercial sem Relógio", não é a aprovada), Big Idea rodadas 1 a 4 (só a "Big Idea final" entra, em mecanismo), Antes de rodar o REA (26/10, fora da seção 12 do CTX) | Registro de como se chegou às decisões, não estado atual |
| Pesquisa de mercado: Raio-X do mercado (F6, e o HTML), Concorrência (F10), Criativos campeões (F23), Perfil público do Júnior (F9), Pesquisa de persona (F5) | Consulta para copy e posicionamento. Só os achados que viram regra entram (frases gastas no tom-de-voz; territórios no metodo) |
| Peças já escritas: VSLs (as duas), Criativos rodada 1, Roteiros de vídeo modelados, Macronarrativas | São entregas antigas e banco de copy, não conhecimento. Servem de referência quando uma entrega nova for feita, e várias dependem de aprovação do Júnior ou de comprovantes |
| Engenharia reversa das entregas | Proposta a validar com os sócios. Entra na base só depois, decisão por decisão; até lá é citada em lacunas |
| Doc Mestre online | É o funil antigo. Suas regras do funil entram em provas-e-conformidade e tom-de-voz; o resto é fonte do funis/funil-01 e pode ser substituído pela #90 |
| Páginas e protótipos: projeto-iasv-safra.html (painel v4.10, desatualizado), simulador (v5, a refazer), quiz (artefato do Júnior) e 06-wireframe | O quiz e o wireframe são o ponto de partida do quiz-01 e da landing-page-01 em entregas/, não da base. O simulador tem premissas em hipótese |
| PAINEL-iasv-safra.md | Nota de trabalho do painel; as regras de vocabulário dela entram no glossário e no tom-de-voz com fonte |
| Dossiê e safra-landing | Sínteses de 08/11. Servem de mapa; cada item da base cita a fonte primária que eles apontam |
| Arquivos do DS: zip, PDF da apresentação, logos SVG e PNG, safra-tokens.css | Ativos. A ficha design-system aponta para eles; nada é copiado |
| 04-apresentacoes/LEIA.md e F4 (voz do cliente) | Só links e citações com ID; a persona cita os IDs quando precisar |

---

## Perguntas antes da próxima etapa

1. **Lugar do CONTEXT.md:** na raiz do repositório (onde a skill grill-with-docs procura) ou em base/CONTEXT.md (junto do resto da base)?
2. **Status da oferta:** pendente-aprovacao (minha proposta, porque #52 a #65 e #84 são revisões suas depois da aprovação #48) ou decidido?
3. **Divisão em metodo e mecanismo:** aceita os dois documentos separados, ou prefere um só, aceitando que o status caia para decidido?
4. **Ficha de fatos com status por campo:** aceita que a ficha como um todo seja decidido e cada campo tenha o seu status (com os campos em conflito bloqueados), em vez de a ficha inteira ficar pendente por causa de alguns campos?
