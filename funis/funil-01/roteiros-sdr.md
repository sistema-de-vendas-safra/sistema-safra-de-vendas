---
id: funil-01-roteiros-sdr
versao: 2
status: pendente-aprovacao
aprovado_por:
  otavio: 2026-11-09
  junior: pendente
  euclides: pendente
depende_de:
  - id: funil-01
    versao: 3
  - id: funil-01-planilha-sdr
    versao: 2
  - id: lead-score
    versao: 3
  - id: tom-de-voz
    versao: 4
  - id: glossario
    versao: 4
  - id: persona
    versao: 4
  - id: metodo
    versao: 4
  - id: ficha-de-fatos
    versao: 4
  - id: provas-e-conformidade
    versao: 4
  - id: decisoes
    versao: 5
  - id: lacunas
    versao: 6
  - id: quiz-01-copy
    versao: 2
  - id: planta-do-banco
    versao: 4
desatualizado: true
---

# Roteiros do SDR · funil-01

O que quem liga diz aos leads do funil-01: o primeiro contato da faixa A e da faixa B, por WhatsApp e por ligação, as tentativas até o abandono, as respostas às situações mais comuns e o que dizer a quem caiu nos eliminatórios. As colunas e a lista de status que cada passo marca estão em `funil-01-planilha-sdr`.

**Status.** Pendente de aprovação. Serve ao funil-01, pendente do Júnior e do Euclides (#90), e usa o lead score, também pendente (#98); a postura do "vendedor chato" depende de confirmação do Júnior (#26; lacuna-20), e o número de tentativas, também (ficha-de-fatos#tentativas-ate-abandonado). Segue a mesma aprovação do funil-01: o Otávio aprovou em 09/11/2026, e o Júnior e o Euclides aprovam junto com o item 1 da pauta (decisão do Otávio, 09/11/2026, 5.1 com 15.1; base/decisoes.md, #111).

**Continua desatualizado.** A versão 2 aplica as decisões de 09/11/2026, mas se apoia em `quiz-01-copy` e em `funil-01-planilha-sdr`, que continuam marcados por cadeia; pela regra de versionamento, só sai da marca quando nenhuma base estiver marcada (11.1; #114).

**Como ler.** Fatos pelo id do campo em `ficha-de-fatos`; decisões por #n; pendências pelo id de `lacunas`. Texto entre aspas é o que o SDR diz ou escreve. Entre colchetes, o que o SDR troca pelo dado da linha da planilha: [nome], [empresa], [seu nome], [dia], [hora]. {{ficha-de-fatos#campo}} é o valor do campo da ficha, dito como está lá; {{a definir: ...}} é o que a base não decide; {{BLOQUEADO: ...}} é campo ou trecho em conflito. Tudo marcado **proposta** está em prompts/07-fila-perguntas.md (15.1 a 15.16).

---

## A voz

- **Quem fala é o SDR, em nome da equipe**, não o Júnior. O quiz fala como o Júnior em primeira pessoa (`quiz-01-copy`); aqui, o SDR se apresenta como alguém da equipe que montou o diagnóstico. As falas de quem liga seguem o tom da casa (`tom-de-voz`), não a voz do Júnior: a skill junior-neves-voice vale para o que sai em nome dele (15.13; #114).
- **Sem nome de agência.** Quem assina e o nome da agência estão em conflito (ficha-de-fatos#nome-agencia; conflito-07). O SDR diz "a nossa equipe" ou "a equipe do Junior", como a copy do quiz (`quiz-01-copy`, M7, M25, M27). O nome do SDR é {{a definir: quem é o SDR · ficha-de-fatos#quem-agenda}}.
- **O Júnior em público** se escreve como ficha-de-fatos#grafia-junior manda.
- **A conversa de venda** se chama {{ficha-de-fatos#nome-call-de-venda}}, com o Junior (decisão do Otávio, 09/11/2026, 7.9; base/decisoes.md, #107). Depois da primeira menção na conversa, basta "a conversa com o Junior". É nela que o Junior olha o diagnóstico com os números do lead (4.5; #114).
- **Vocabulário público** (`tom-de-voz`, "A regra de vocabulário"; `glossario`, verbete Etapas): só palavras que o comprador já usa, como lead, venda, etapa, fim do mês, sim ou não. Ficam fora das falas: "reunião" (palavra queimada para a persona; no lugar, "conversa" ou o nome da Call), "SDR", "closer", "pipeline", "safra" fora do nome do sistema, "colheita", "plantio", "relógio", "mentoria", "curso", "consultoria", "máquina de vendas", "previsibilidade", "processo comercial", "diagnóstico gratuito" (`tom-de-voz`; `persona`, "Palavras queimadas").
- **Sem promessa de resultado** (#39; `provas-e-conformidade`; `tom-de-voz`, "Promessa percentual de melhora"): nenhuma fala diz que o lead vai vender mais, quanto vai ganhar ou em quanto tempo. O dinheiro na mesa do diagnóstico é conta, não promessa (`quiz-01-copy`, seção 10).
- **Sem prova inventada:** nenhum cliente, número de cliente, depoimento ou credencial. As credenciais não têm comprovante (`provas-e-conformidade`; conflito-05).
- **Sem número copiado da ficha:** nenhum preço, prazo, vaga ou meta nas falas. As vagas ficam fora das falas de quem liga: só aparecem na Call de Direcionamento (8.13; #114).
- **"Vendedor chato", com data:** "persistência com data marcada, sem pressão" (#26, pendente do Júnior; `tom-de-voz`, "A postura"). Cada contato termina com uma data marcada ou com a porta aberta; nada de "última chance" que não seja a última. A persona se incomoda com abordagem insistente (`persona`, RA-26): o que separa as duas coisas é a data marcada, não a quantidade de contatos.
- **A faixa e a nota nunca aparecem** para o lead (`quiz-01-copy`, seção 10).
- **Frase curta, uma pergunta por vez**, número no lugar de adjetivo (`tom-de-voz`, "A língua do comprador").

---

## Antes de qualquer contato

1. **Confira o aceite na planilha.** O quiz tem uma caixa de aceite só, que cobre o diagnóstico e o contato da equipe por WhatsApp (mensagem e ligação) e por e-mail (`quiz-01-copy`, seção 7; #104). Quem aceitou (consentimento_whatsapp = sim, que com a caixa única é igual a consentimento_email) pode ser contatado por WhatsApp, por ligação no número do WhatsApp e por e-mail (decisão do Otávio, 09/11/2026, 16.12 com 15.8 e 21.4; base/decisoes.md, #105). Quem não aceitou não chega à planilha. As mensagens por e-mail de quem liga ainda não estão escritas: até lá, o contato é por ligação e WhatsApp (prompts/11-fila-perguntas.md).
2. **Confira a faixa** (lead_score_faixa) e o prazo da faixa (`lead-score`, "Faixas"; ordem em `funil-01-planilha-sdr`, "Ordem da fila").
3. **Olhe as respostas** que a linha traz. Na faixa B, são as que você vai confirmar.
4. **Horário:** {{a definir: janela de contato, 15.9}}. Proposta: evitar a noite e o horário de almoço, que a persona cita como incômodo (`persona`, RA-26).
5. **Olhe o que o lead clicou** no fim do quiz, na coluna clique_fim_quiz (18.4, com 15.16; #114; `funil-01-planilha-sdr`). A coluna só vem preenchida depois que o quiz, o banco e o garçom passarem a gravar o clique (etapas 32 a 34); até lá, você não sabe o que o lead clicou, e as falas abaixo servem para quem pediu a conversa e para quem não pediu. Para quem pediu, use a abertura "Quem pediu a conversa", na faixa A.
6. **Canal primeiro:** ligação primeiro; sem resposta, WhatsApp no mesmo dia (15.10; #114). A nota do quiz para quem pediu a conversa ("alguém da nossa equipe chama você no WhatsApp para marcar o horário", `quiz-01-copy`, M26) continua verdadeira, porque a confirmação vai pelo WhatsApp.

Cada contato feito vira uma linha de contato na planilha (canal e contato_em), e cada mudança de situação, um novo estado (`funil-01-planilha-sdr`, "O que volta para o banco").

---

## Faixa A · primeiro contato

O que a base manda: ligar no prazo da faixa A e marcar a Call de Direcionamento com o Júnior (`lead-score`, "Faixas"; `funil-01`, "Porta de qualificação"). Quem conduz: ficha-de-fatos#quem-faz-a-reuniao (#107).

### Ligação

> "Oi, [nome]? Aqui é [seu nome], da equipe do Junior. Você acabou de fazer o diagnóstico das vendas da [empresa]. Tem dois minutos agora?"

**Quem pediu a conversa** (clique_fim_quiz = quero-conversa, quando a coluna existir):

> "Oi, [nome]? Aqui é [seu nome], da equipe do Junior. No fim do diagnóstico das vendas da [empresa], você pediu para marcar a conversa. Tem dois minutos agora?"

Se não pode agora:

> "Sem problema. Que horário fica melhor para eu te ligar hoje?"

Marque estado tentativa e a data_volta combinada (stand-by só se a volta for em outro dia).

Se pode:

> "Obrigado por responder. Vi as suas respostas. O próximo passo é a {{ficha-de-fatos#nome-call-de-venda}} com o Junior: ele olha esse diagnóstico com você, com os seus números, e mostra por onde começar. Tenho [dia] às [hora] ou [dia] às [hora]. Qual fica melhor?"

> "Fechado: [dia], às [hora]. Mando a confirmação no seu WhatsApp. Até lá."

Na planilha: estágio pré-qualificado, depois agendado com reuniao_em; estado conversando (`funil-01-planilha-sdr`, 15.5).

Se o lead perguntar quanto tempo leva: "{{ficha-de-fatos#duracao-call-de-venda}}." (#107). Se perguntar quem conduz: "o próprio Junior" (ficha-de-fatos#quem-faz-a-reuniao).

### WhatsApp

> "Oi, [nome]. Aqui é [seu nome], da equipe do Junior. Vi o diagnóstico que você fez das vendas da [empresa]."

> "O próximo passo é a {{ficha-de-fatos#nome-call-de-venda}} com o Junior: ele olha esse diagnóstico com você, com os seus números, e mostra por onde começar. Tenho [dia] às [hora] ou [dia] às [hora]. Qual fica melhor para você?"

Quando ele escolhe:

> "Combinado: [dia], às [hora]. Na véspera eu te lembro por aqui."

O lembrete na véspera e algumas horas antes está no próprio diagnóstico do quiz como prática de comparecimento (`quiz-01-copy`, 10.2, "Comparecimento"); as mensagens de lembrete são {{a definir: lembretes, 15.9}}.

---

## Faixa B · primeiro contato

O que a base manda: ligar no prazo da faixa B, confirmar por telefone o que o quiz deixou em dúvida (valor da venda, time, histórico) e só então marcar (`lead-score`, "Faixas"). A confirmação é por telefone; o WhatsApp só serve para combinar a ligação.

### Ligação

> "Oi, [nome]? Aqui é [seu nome], da equipe do Junior. Você fez o diagnóstico das vendas da [empresa]. Tem cinco minutos agora?"

Se pode:

> "Antes de marcar a {{ficha-de-fatos#nome-call-de-venda}} com o Junior, quero entender três coisas sobre a [empresa], para a conversa valer o seu tempo. Pode ser?"

1. **Valor da venda:**
   > "Hoje, uma venda típica de vocês fica em quanto, mais ou menos?"
2. **Time:**
   > "Quantas pessoas fazem conversa de venda com cliente hoje, contando você?"
3. **Histórico:** são as respostas de leads por mês e de CRM do quiz, que vêm em respostas_a_confirmar (15.4; #114). A pergunta:
   > "Vocês têm guardado o que aconteceu com os leads dos últimos meses? Numa planilha, num sistema ou só no WhatsApp?"

Se as respostas confirmam o que o quiz mostrou, siga como na faixa A, a partir de "O próximo passo é a {{ficha-de-fatos#nome-call-de-venda}} com o Junior".

Se alguma resposta cai num eliminatório de `lead-score` ("Eliminatórios"), não marque. Use o fechamento de "Quem caiu nos eliminatórios", abaixo. Na planilha, o estágio fica captado e o estado, nutrição (5.3, com 15.11; #114).

Se a dúvida continua (nem confirma nem elimina), não marque: o estágio fica captado e o estado, nutrição (15.11; #114).

### WhatsApp

> "Oi, [nome]. Aqui é [seu nome], da equipe do Junior. Vi o diagnóstico que você fez das vendas da [empresa]."

> "Antes de marcar a {{ficha-de-fatos#nome-call-de-venda}} com o Junior, queria te fazer três perguntas rápidas por telefone, coisa de cinco minutos. Posso te ligar hoje? Que horário é melhor?"

Quando ele responde com um horário, marque data_volta e ligue no horário. As três perguntas não vão por mensagem (`lead-score`, "Faixas": "confirma por telefone").

---

## Respostas às situações mais comuns

| O lead diz | O SDR responde | Na planilha |
|---|---|---|
| "Agora não dá, me chama depois." | "Sem problema. Que dia fica bom para eu te chamar de novo?" | stand-by com data_volta (obrigatória) |
| "Não tenho interesse." | "Entendido, obrigado por responder. O seu diagnóstico continua com você, nos canais que você aceitou." | perdido (só quem disse não) |
| "Quanto custa?" | "Valores não passam por mim. A conversa com o Junior é para olhar o seu diagnóstico, com os seus números, e ver se faz sentido seguir junto." | sem mudança |
| "A conversa tem custo?" | "A conversa não tem custo." (#92; 15.14; #114) | sem mudança |
| "Quanto tempo leva?" | "{{ficha-de-fatos#duracao-call-de-venda}}." (#107) | sem mudança |
| "Vocês garantem resultado?" | "Não. Não existe garantia de resultado. O que a conversa faz é mostrar, com os seus números, onde as suas vendas estão parando." | sem mudança |
| "Quem são vocês?" | "Somos a equipe do Junior. Ele explica na conversa como a gente trabalha." ({{BLOQUEADO: ficha-de-fatos#nome-agencia}} se o lead pedir o nome da empresa) | sem mudança |
| "Não quero mais receber mensagem." | "Entendido. Não vou mais te chamar." Avise o Otávio para registrar a retirada do consentimento (`planta-do-banco`, consentimento_retirado_em) | perdido; retirada do consentimento pelo Otávio (15.8) |
| Faltou à conversa marcada | "Oi, [nome]. Senti a sua falta hoje às [hora]. Quer remarcar? Tenho [dia] às [hora] ou [dia] às [hora]." | agendado, com estado tentativa (5.3; #114; `funil-01`) |

A resposta sobre garantia segue #39 e `provas-e-conformidade` ("Sem garantia"). Nenhuma resposta cita reembolso, prazo ou vagas; se o lead perguntar, a resposta é "isso o Junior explica na conversa", sem número. As vagas ficam só na Call de Direcionamento (8.13; #114).

---

## Tentativas até o abandono

O que a base diz:

- **Número de tentativas no funil-01: {{a definir: 15.9}}.** O número da operação do Júnior está em ficha-de-fatos#tentativas-ate-abandonado, com liberação pendente do Júnior; o do funil-01 não está escrito (`funil-01`, "Status do SDR"; 5.3; pauta, item 9). Pela 5.3 (aceita em 09/11/2026, #114), usa-se o da operação do Júnior só depois que ele confirmar.
- **Intervalo entre tentativas: {{a definir: 15.9}}.** Nenhum documento da base escreve.
- **Ao fim do relógio**, nenhum lead pode estar em conversando nem em tentativa (`metodo`); o relógio do funil-01 conta do fim do quiz, e o prazo é calibrado depois das primeiras safras (5.2; #114).
- **Abandonado** é quem sumiu depois de esgotadas as tentativas; **perdido** só quem disse não (`metodo`; `glossario`, verbete Perdido).

Cada tentativa é um contato registrado (canal e contato_em) e mantém o estado tentativa (`funil-01-planilha-sdr`).

### Tentativa seguinte, por ligação

Se não atende, não deixe recado longo. Se cair na caixa:

> "Oi, [nome], aqui é [seu nome], da equipe do Junior, sobre o diagnóstico da [empresa]. Te mando uma mensagem no WhatsApp."

### Tentativa seguinte, por WhatsApp

Alternar as mensagens, uma por tentativa, sem repetir a mesma:

> "Oi, [nome]. Passando de novo sobre o diagnóstico da [empresa]. Quer marcar a conversa com o Junior? Tenho [dia] às [hora]."

> "[nome], se esta semana estiver corrida, me diz um dia melhor e eu te chamo nele."

> "Oi, [nome]. Ainda faz sentido olhar o seu diagnóstico com o Junior? Um sim ou um não já me ajuda."

### Última tentativa

Só quando for de fato a última (`tom-de-voz`, "Nada de 'última chance' que não seja a última"):

> "Oi, [nome]. Vou parar de te chamar por aqui para não incomodar. Se quiser conversar sobre o seu diagnóstico depois, é só responder esta mensagem."

Na planilha: abandonado. Se o lead responder depois, o estado volta a conversando; o estágio continua onde estava.

---

## Quem caiu nos eliminatórios

**Bloqueado para entrega até a decisão** (conflito-16). Os dois lados, sem escolha:

| Lado | Quem recebe contato do SDR | Fonte |
|---|---|---|
| 1 · O corte do Júnior | Quem não se encaixa e clica "Tenho interesse" recebe a nota "Alguém da nossa equipe vai chamar você no WhatsApp" | `quiz-01-copy`, 10.3, M27; conflito-16 |
| 2 · O lead score | Ninguém: eliminatórios e faixa C vão para a nutrição, fora da fila do SDR; a nota diz só "Seu interesse fica registrado com o seu diagnóstico" | `lead-score`, "Eliminatórios"; `funil-01`; `quiz-01-copy`, M27 |

Nos dois lados, o eliminatório recebeu o diagnóstico normalmente (`lead-score`, "Eliminatórios"). A nutrição não tem canal nem conteúdo definidos (5.3): nenhuma fala promete conteúdo, contato futuro ou data.

Situações em que o SDR fala com quem caiu nos eliminatórios, mesmo no lado 2:

- o lead escreve no WhatsApp por conta própria;
- a confirmação da faixa B mostra um eliminatório (ver "Faixa B").

O que dizer (proposta, 15.12):

> "Obrigado por contar, [nome]. Pelo que você me disse sobre a [empresa], a conversa com o Junior ainda não é o melhor próximo passo para vocês agora. Ela é feita para um momento em que o time de vendas já está rodando com mais volume."

> "O seu diagnóstico continua valendo: ele mostra em qual etapa as suas vendas estão parando, e dá para começar por ali com o que você já tem."

> "Se a [empresa] mudar de momento, é só me chamar por aqui."

Regras desta fala:

- Não dizer qual corte o lead não passou, nem número de faturamento, de valor da venda ou de vendedores (o corte está em conflito e é regra interna; conflito-16, conflito-01).
- Não dizer "não qualificado", "eliminado", "reprovado" nem "faixa".
- Não oferecer o plano de ação de 90 dias nem a Implementação Essencial: o plano está em conflito (conflito-10, conflito-19) e a Essencial só é oferecida a quem disse não à IASV (ficha-de-fatos#downsell-desenho).
- A frase "momento em que o time de vendas já está rodando com mais volume" não diz o corte, mas aponta para ele; se o Otávio preferir uma fala sem motivo nenhum, sai a segunda metade da primeira mensagem (15.12).

Na planilha: o eliminatório não tem linha (só faixas A e B entram). O lead da faixa B que caiu no eliminatório na confirmação fica como está em "Faixa B" (15.11).

---

## Pendências que tocam os roteiros

| O que falta | Quem decide | Onde |
|---|---|---|
| Número e intervalo de tentativas, janela de horário, lembretes | O Otávio; o número, o Júnior | ficha-de-fatos#tentativas-ate-abandonado; 5.3; 15.9 |
| Mensagens por e-mail de quem liga | O Otávio | #105; prompts/11-fila-perguntas.md |
| Quem caiu nos eliminatórios recebe contato ou não | O Otávio com o Júnior e o Euclides | conflito-16; 15.12 |
| A coluna clique_fim_quiz preenchida | Etapas 32 a 34 | 18.4; 15.16 |
| Quem é o SDR; nome da agência | Não registrado; o Júnior e o Euclides | ficha-de-fatos#quem-agenda; conflito-07 |
| Postura do "vendedor chato" | O Júnior | #26; lacuna-20 |
| Aprovação deste documento | O Júnior e o Euclides, com o item 1 da pauta (o Otávio aprovou em 09/11/2026) | 15.1; #111 |

---

## Fontes

- funis/funil-01/funil.md (v3): "Caminho do lead", "Porta de qualificação", "Status do SDR"; funis/funil-01/planilha-sdr.md (v2).
- base/lead-score.md (v3): "Eliminatórios", "Faixas".
- dados/planta/planta.md (v4): consentimento_retirado_em, a caixa de aceite única, clique_fim_quiz.
- base/tom-de-voz.md (v4): "A voz", "A regra de vocabulário (22/10)", "A língua do comprador", "A postura: o 'vendedor chato'", "Frases e alegações que não entram em peça".
- base/persona.md (v4): "Palavras queimadas"; RA-26. GLOSSARY.md (v4): verbetes Etapas, Estado, Perdido.
- base/metodo.md (v4): "As seis regras", "Detalhes das regras de estado".
- base/ficha-de-fatos.md (v4): quem-agenda, quem-faz-a-reuniao, tentativas-ate-abandonado, nome-call-de-venda, duracao-call-de-venda, nome-agencia, grafia-junior, downsell-desenho.
- base/provas-e-conformidade.md (v4): "Sem garantia", "LGPD". base/decisoes.md (v5): #26, #39, #67, #90, #92, #98, #104, #105, #107, #111, #114. base/lacunas.md (v6): conflito-07, conflito-10, conflito-16, conflito-19, lacuna-20.
- entregas/quizzes/quiz-01/copy.md (v2): seções 7 e 10; M7, M21, M25, M26, M27.
- prompts/11-decisoes-de-09-11.md; prompts/11-respostas.md.
- prompts/05-fila-perguntas.md, 5.2 a 5.4; prompts/06-para-o-otavio.md; prompts/07-fila-perguntas.md, 13.1, 13.7, 14.15; prompts/07-fila-da-noite.md, "Etapa 15".
