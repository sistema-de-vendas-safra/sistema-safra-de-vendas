---
id: quiz-01-briefing
versao: 2
status: rascunho
aprovado_por:
  otavio: pendente
  junior: pendente
  euclides: pendente
depende_de:
  - id: decisoes
    versao: 5
  - id: ficha-de-fatos
    versao: 4
  - id: lacunas
    versao: 6
  - id: lead-score
    versao: 3
  - id: persona
    versao: 4
  - id: tom-de-voz
    versao: 4
  - id: provas-e-conformidade
    versao: 4
  - id: glossario
    versao: 4
  - id: funil-01
    versao: 3
  - id: planta-do-banco
    versao: 4
  - id: pauta-aprovacao-01
    versao: 7
desatualizado: true
---

# Briefing · quiz-01

O ponto de partida do quiz-01 do funil-01: para que ele serve, para quem, o que se espera de quem responde, o roteiro de telas herdado da cópia nova do quiz, o que dessa cópia vale como fonte, o que está em conflito e o que fica bloqueado. O texto tela por tela está em `quiz-01-copy` (entregas/quizzes/quiz-01/copy.md); o código é a etapa 14.

**Status.** Rascunho. O quiz-01 existe por causa da #90, pendente do Júnior e do Euclides; a porta de qualificação usa o lead score (#98), também pendente. Enquanto isso, ele só pode ser feito como rascunho, avisando que pode mudar (base/decisoes.md, "Enquanto a #90 estiver pendente"; nucleo/regras/versionamento.md). O quiz é do Júnior (CTX §3): por isso o Júnior e o Euclides estão em aprovado_por, junto com o Otávio.

**Documentos desatualizados.** Na versão 2 (etapa 31, decisões do Otávio de 09/11/2026), todas as bases apontam para as versões em vigor, e as da base saíram da marca com a 4.5 (#114). Este briefing continua marcado porque se apoia em `pauta-aprovacao-01`, que continua marcada enquanto a página do quiz (`quiz-01-pagina`) não for atualizada nas etapas 33 e 34 (nucleo/regras/versionamento.md v3, 11.1). Não usa `mecanismo` nem `oferta`.

**Exceção às regras de prova e conformidade (#110).** O quiz fica como está: o aceite não muda de posição em relação ao pedido de contato, e a promessa de percentual no fim do quiz não sai. É exceção às regras de `provas-e-conformidade`, decidida pelo Otávio (decisão do Otávio, 09/11/2026, 7.5; base/decisoes.md, #110). As outras decisões que mexem no quiz valem (14.2, 13.4, 14.4, 14.5, 18.4, 18.5, 09.1, 10.7). O item 29 da pauta continua com o Júnior e o Euclides.

**Como ler.** Fatos pelo id do campo em `ficha-de-fatos` (nenhum valor copiado); decisões por #n; pendências pelo id de `lacunas`; perguntas da fila pelo número (prompts/05-fila-perguntas.md e prompts/07-fila-perguntas.md). "Fonte do quiz" é fontes/quiz-01-repositorio-2026-11-08/ (só leitura): CLAUDE.md, LEIA PRIMEIRO.md, MANUAL DO DIAGNÓSTICO (RASCUNHO).md, REA - FULL STACK MARKETING.md e mockups/quiz-diagnostico.html. Ela vale sobre o artefato do acervo (LEIA.md da pasta).

---

## 1. Básico

### Objetivo no funil

O quiz-01 é o passo 2 do caminho do lead no funil-01 (`funil-01`, "Caminho do lead"): o lead chega da landing-page-01 com a etiqueta do link, responde, deixa o contato com consentimento e recebe o diagnóstico.

- O diagnóstico do quiz é a própria Análise (#92; ficha-de-fatos#analise-conteudo), com a gratuidade de ficha-de-fatos#analise-gratuidade e ficha-de-fatos#analises-gratuitas, cobrada depois pelo valor de ficha-de-fatos#analise-valor. O nome público continua a definir (ficha-de-fatos#analise-nome-publico; conflito-02; #107; pergunta 30.1). A conversa de venda com o Júnior, que vem depois, é a Call de Direcionamento (ficha-de-fatos#nome-call-de-venda; #107).
- Todo lead que termina o quiz recebe o diagnóstico, inclusive quem não entra na fila do SDR (`lead-score`, "Eliminatórios"; fonte do quiz, CLAUDE.md, "Não qualificado").
- No fim, o quiz calcula a nota e a faixa do lead score e monta o pacote de dados no formato da planta do banco (`planta-do-banco`). No protótipo de teste, o pacote vai ao garçom (#101); o destino dos contatos continua em conflito (conflito-17).
- Até a reunião com o Júnior e o Euclides, o final usa o mais restritivo dos dois cortes, o do Júnior e o da nota (14.2, #114): qualificado só quem passa nos dois. A nota é calculada e guardada também para quem cai num eliminatório (14.8).
- O quiz registra o início quando abre, com o mesmo código de sessão da visita à landing (10.6, 18.5), e registra o clique da pessoa no fim do quiz, para quem liga saber (18.4).

### Público

O Rafa, o Dono-Closer (`persona`): dono que vende por conversa de venda e decide sozinho. O corte de quem a oferta serve está em ficha-de-fatos#criterio-de-qualificacao, **em conflito · bloqueado para entrega até a decisão** (conflito-01, conflito-16).

### Ação esperada

Responder até o fim, deixar nome, e-mail e WhatsApp com a caixa de aceite (uma só, já marcada, #104) e, no fim, aceitar o próximo passo que cabe ao caminho dele (ver "Finais"). Quem desmarca a caixa vê o diagnóstico na tela, e nada vai ao banco nem à equipe (escolha provisória, pergunta 30.3).

### Meta

As metas da operação são as do funil-01. O quiz em si não tem meta de conclusão registrada; não foi inventada. O "8 minutos" fica até cronometrar pessoas reais, antes de ir ao ar (13.12, 14.12, #114).

---

## 2. O que da fonte do quiz vale como fonte

As decisões do CLAUDE.md do quiz que não conflitam com a base valem como fonte (prompts/07-fila-da-noite.md, etapa 13):

- **Metas do funil** (uma meta por etapa), cada etapa medida contra a anterior, valendo para qualquer valor de venda (CLAUDE.md, "Funil e metas"; MANUAL, M3). Batem com ficha-de-fatos#metas-por-etapa; na copy, entram pelo campo.
- **Chamada pela dor**, sem nome de produto e sem a palavra "Safra": "Descubra onde sua equipe de vendas está perdendo performance" (CLAUDE.md, "Chamada da página"). Bate com a regra de 22/10 do `tom-de-voz`. O CLAUDE.md diz que "o Otávio, que é copywriter, ajusta o texto final".
- **Números ou chute:** primeiro pergunta se a pessoa lembra dos números; lembra, escreve em número ou porcentagem; não lembra, modo chute ("Mais de X%", "Menos de X%", "Realmente não faço ideia" e campo para chutar). "Menos de X%" entra na conta como 70% da meta, marcado como estimativa (CLAUDE.md, "Números"; MANUAL, M6).
- **Quiz extenso** com perfil da empresa obrigatório: ramo, ticket médio, tamanho do comercial, origem dos leads, CRM, faturamento e vendedores (CLAUDE.md, "Quiz extenso").
- **Contato antes do resultado:** nome, e-mail e WhatsApp (CLAUDE.md; LEIA PRIMEIRO, regra 4). Bate com o funil-01, que pede o consentimento nesse ponto.
- **Regra fixa acha a etapa fraca; a IA escreve a explicação**, treinada no jeito do Júnior (CLAUDE.md; MANUAL, abertura). Na versão real; o protótipo usa textos fixos.
- **O relatório aponta todos os pontos fracos**, do que mais perde dinheiro para o que menos perde; "não mede" vem primeiro (MANUAL, M4 e seção 4).
- **Dinheiro na mesa** só no fim, como conta e nunca como promessa: total e fatia de cada etapa (CLAUDE.md; MANUAL, seção 5 e M5). Bate com `provas-e-conformidade`.
- **Funil saudável:** com as quatro etapas na meta, o diagnóstico é dinheiro na mesa por falta de investir mais em marketing (MANUAL, M3).
- **Estrutura fiel ao site de referência**, sem copiar texto (REA; LEIA PRIMEIRO, regra 7). O mapa de fidelidade da REA é a ordem das peças.
- **Não inventar prova social** (LEIA PRIMEIRO, regra 8). Bate com `provas-e-conformidade`.
- **Tom da explicação:** direto, sem culpar pessoas, sem prometer resultado, sem nome de produto; "quem faz o primeiro contato" e "quem conduz a reunião" (na copy, "conversa", pela 13.1), não "SDR" e "closer" (MANUAL, seção 6, onde esses pontos estão marcados como sugestão, ainda sem aprovação do Júnior). Bate com o `tom-de-voz`.

Ficam fora deste briefing, porque não são texto do quiz: a publicação na Cloudflare e o repositório na conta pessoal (vão para as pendências na etapa 19).

---

## 3. O que está em conflito

| Ponto | Lado da fonte do quiz | Lado da base | Lacuna | Como a copy fica |
|---|---|---|---|---|
| Critério de qualificação | R$ 50 mil por mês e 1 vendedor | Lead score (#98) | conflito-16, conflito-01 | Os dois finais escritos, bloqueados |
| Destino dos contatos | Triad CRM, conta nova | Banco e planilha do SDR (#90) | conflito-17 | Nenhum destino citado no texto; envio desligado |
| Identidade visual | Triad escura com verde neon | DS v1.0 e paleta branco e verde (#81) | conflito-18, conflito-08 | Sem decisão de visual; o mockup fica como está |
| Promessa "até X%" | Plano de 90 dias com percentual | #39 e conformidade | conflito-19, conflito-09 | O quiz fica como está, com o percentual, por exceção decidida pelo Otávio (#110) |

Outros pontos em aberto que tocam o quiz: nome público da Análise (conflito-02), quem assina e nome da agência (conflito-07; ficha-de-fatos#nome-agencia), plano de ação de 90 dias como saída (conflito-10), portas e funil (conflito-06, conflito-14). O prazo de guarda dos dados está decidido (ficha-de-fatos#prazo-de-guarda; #106) e entra pela política de privacidade.

---

## 4. Roteiro de telas

Na ordem do mockup (fontes do quiz, mockups/quiz-diagnostico.html, lista "Telas"):

1. **Capa** (C1 a C11 da REA): foto do Júnior, cartão do teste, cartão do vídeo, WhatsApp, rodapé.
2. **Abertura do teste** (A1 a A9): relatório de exemplo, título, apoio com as 4 etapas, tempo, gratuidade, botão, letra miúda com o link da política de privacidade.
3. **Conversa** (T1 a T19), em três blocos com marco ("1 de 3"):
   - Nome.
   - Empresa: ramo, faturamento, vendedores, quem marca, valor médio da venda, origem dos leads, CRM, cargo.
   - Funil: lembra dos números; modo números (cinco números) ou modo chute.
   - Causas (no protótipo, só as do agendamento): primeiro contato, tentativas, lead sem contato.
4. **Contato** com o texto de aceite e a caixa única, já marcada, antes de pedir e-mail e WhatsApp (#104; a posição fica, #110).
5. **Montando o diagnóstico.**
6. **Finais** (ver abaixo).
7. **Erro ao montar.**

O painel ao vivo (ficha, perfil do funil, funil, selos, leitura em 4 quadros) acompanha a conversa.

### Perguntas que o lead score usa

Ficam, com as opções exatamente como o lead score pontua (`lead-score`, "Pontos"): faturamento, valor médio da venda, vendedores, leads por mês (primeiro número do funil; "não lembra" vale como no lead score), CRM, cargo, tentativas, sobra de lead, primeiro contato; e o dinheiro na mesa que o quiz já calcula. Ramo, origem e quem marca não pontuam, mas ficam, porque o Júnior pediu o quiz extenso e o perfil completo (CLAUDE.md do quiz).

### Finais

| Caminho | Quem cai aqui, lado do Júnior | Quem cai aqui, lado do lead score | O que a tela faz |
|---|---|---|---|
| Qualificado com etapa abaixo da meta | Fatura a partir de R$ 50 mil e tem vendedor | Faixas A e B | Dinheiro na mesa na conversa, oferta do plano de 90 dias (conflito-10, conflito-19), vídeo do time e WhatsApp |
| Funil saudável | Qualquer um com as 4 etapas na meta | Idem | Relatório de crescimento |
| Não qualificado | Menos de R$ 50 mil ou sem vendedor | Eliminatórios e faixa C | Relatório completo com "Tenho interesse" |

Qual coluna decide está em conflito (conflito-16): **bloqueado para entrega até a decisão**. Até a reunião, a página usa o mais restritivo dos dois (14.2). A faixa do lead score nunca aparece para o lead; ela só decide o que o SDR faz (`lead-score`, "Faixas"). O texto para o lead não promete prazo de ligação (pergunta 13.7).

---

## 5. Direcionamento de copy

- **Voz:** a do Júnior em primeira pessoa, porque o formato da conversa é o Júnior guiando (REA, T4 e T6; decisão do quiz). Passou pela skill junior-neves-voice; onde chocou com a base, venceu a base: sem gíria, sem autoridade autodeclarada, sem "mentoria" nem "curso" (tom-de-voz; pergunta 9.4). Quem assina segue em conflito (pauta, item 8; pergunta 13.8).
- **Nome da agência:** onde o mockup diz "Triad", a copy diz "a nossa equipe" ou leva {{BLOQUEADO: ficha-de-fatos#nome-agencia}} (conflito-07).
- **Nome da Análise:** "Diagnóstico de vendas" como nome e o selo "Teste gratuito" são valores de ficha-de-fatos#analise-nome-publico e ficam bloqueados; "diagnóstico" como palavra comum fica (pergunta 13.2). Sem "diagnóstico gratuito", que é frase gasta (`tom-de-voz`).
- **Gratuidade e valor:** só pela ficha, na forma da landing ("Sem custo na promoção de lançamento"; pergunta 9.3).
- **"Reunião":** palavra queimada para a persona; vira "conversa de venda" ou "conversa", como na landing (pergunta 9.6; pergunta 13.1).
- **Etapas:** pré-qualificação, agendamento, comparecimento e fechamento (ficha-de-fatos#metas-por-etapa; `glossario`, Etapas).
- **Sem promessa:** sem "vai dobrar", dinheiro na mesa como conta. Exceção decidida pelo Otávio: a promessa "até X%" do plano de 90 dias fica, como no quiz do Júnior (#110).
- **A conversa de venda:** quando o texto do quiz falar da conversa com o Júnior pelo nome, é a Call de Direcionamento (ficha-de-fatos#nome-call-de-venda; #107).
- **Toda mudança no texto do Júnior** fica listada na copy, seção "Mudanças no texto do Júnior", e vai para a pauta (item 29).

## 6. Direcionamento de UX

Segue a REA e o mockup: uma pergunta por vez, botões que avançam sozinhos, "Continuar" só onde se escreve ou se marcam várias, barra de progresso sem rótulos, painel ao vivo, abas "Conversa" e "Resultado" no celular, correção da resposta pelo lápis. Nada vai ao banco sem a caixa de aceite marcada (#104). Nada novo foi desenhado aqui.

## 7. Design · bloqueado

Conflito-18 e conflito-08. O visual do mockup fica como está até a decisão (prompts/07-fila-da-noite.md, etapa 14).

---

## 8. Bloqueios

| O quê | Por quê | Como fica |
|---|---|---|
| Nome da Análise ("Diagnóstico de vendas", "Teste gratuito") | ficha-de-fatos#analise-nome-publico; conflito-02 | Placeholder marcado |
| "Triad", marca e rodapé "© 2026 Triad Marketing USA LLC" | ficha-de-fatos#nome-agencia; conflito-07 | Placeholder marcado; "a nossa equipe" no corpo |
| Caminho do fim do quiz | conflito-16 | Os dois lados escritos, bloqueado |
| Envio e destino dos contatos | conflito-17; #90 | Envio só no protótipo de teste (#101); nenhum destino no texto |
| Visual | conflito-18, conflito-08 | Mockup como está |
| Oferta do plano de 90 dias, preço e exemplo | conflito-10, conflito-19 | Texto sem percentual, marcado pendente; página de exemplo é placeholder |
| Link da política de privacidade | Documento da etapa 16 | {{a definir: link da politica de privacidade}} |
| Número do WhatsApp | Não encontrado nas fontes (ficha-de-fatos, "Não encontrado") | {{a definir: numero do WhatsApp}} |
| Vídeos do Júnior e do time | Ainda não gravados (fonte do quiz, "O que falta") | Placeholder |
| Agenda própria no relatório | #67: quem agenda é o SDR (ficha-de-fatos#quem-agenda) | Seção oculta (pergunta 13.5) |
| Prazo de guarda dos dados no consentimento | Decidido (ficha-de-fatos#prazo-de-guarda; #106) | Fica na política de privacidade, fora do texto da caixa |

## 9. O que fica para as próximas etapas

- Etapa 14: código, cálculo do lead score num lugar só, pacote de dados, envio desligado, consentimento obrigatório, prints.
- Etapa 16: a política de privacidade, cujo link entra no consentimento.
- Etapa 34 (fila 11), numa versão nova da página: corte mais restritivo (14.2); caixa única já marcada e o comportamento ao desmarcar (13.4); campos de número vazios (14.4); valor médio obrigatório (14.5); nota guardada também no eliminatório (14.8); as regras da 14.9; registro do clique no fim e do início do quiz (18.4, 18.5, 10.6); doctype e meta charset (09.1); fontes servidas junto com a página, sem pedido ao Google (10.7). O texto do quiz fica como está (#110), salvo o da caixa de aceite.
- Perguntas de causa das outras etapas e modo chute em todas as etapas (fonte do quiz, "O que falta"): o texto está no MANUAL, seção 2, e não foi escrito nesta copy, porque o mockup não o tem.

## Fontes

- Fonte do quiz: fontes/quiz-01-repositorio-2026-11-08/ (LEIA.md, LEIA PRIMEIRO.md, CLAUDE.md, MANUAL DO DIAGNÓSTICO (RASCUNHO).md, REA - FULL STACK MARKETING.md, mockups/quiz-diagnostico.html).
- base/lead-score.md (v3), base/ficha-de-fatos.md (v4), base/lacunas.md (v6), base/decisoes.md (v5; #103 a #114), base/tom-de-voz.md (v4), base/provas-e-conformidade.md (v4), base/persona.md (v4), GLOSSARY.md (v4), funis/funil-01/funil.md (v3), dados/planta/planta.md (v4), entregas/pautas/pauta-aprovacao-01.md (v7).
- Formato: entregas/landings/landing-page-01/briefing.md e copy.md (v3).
- Perguntas: prompts/05-fila-perguntas.md (9.3, 9.4, 9.6) e prompts/07-fila-perguntas.md (11.1, 13.1 a 13.12); respostas do Otávio de 09/11/2026 (prompts/11-decisoes-de-09-11.md; prompts/11-respostas.md).
