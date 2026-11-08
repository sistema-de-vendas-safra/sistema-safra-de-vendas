---
id: quiz-01-copy
versao: 1
status: rascunho
aprovado_por:
  otavio: pendente
  junior: pendente
  euclides: pendente
depende_de:
  - id: quiz-01-briefing
    versao: 1
  - id: lead-score
    versao: 2
  - id: ficha-de-fatos
    versao: 3
  - id: lacunas
    versao: 5
  - id: decisoes
    versao: 3
  - id: tom-de-voz
    versao: 3
  - id: provas-e-conformidade
    versao: 3
  - id: persona
    versao: 3
  - id: glossario
    versao: 3
  - id: funil-01
    versao: 2
  - id: planta-do-banco
    versao: 2
desatualizado: true
---

# Copy · quiz-01

O texto do quiz-01, tela por tela e pergunta por pergunta, na ordem do roteiro do briefing (`quiz-01-briefing`, seção 4). Parte do texto do Júnior na cópia nova do quiz (fontes/quiz-01-repositorio-2026-11-08/mockups/quiz-diagnostico.html) e muda só onde a base manda. Cada mudança está na seção "Mudanças no texto do Júnior", no fim, e vai para o Júnior aprovar (pauta, item 29).

**Status.** Rascunho, avisando que pode mudar. O quiz é do Júnior, e o caminho do fim depende do critério de qualificação e do funil-01, os dois pendentes do Júnior e do Euclides (#90, #98): por isso os três estão em aprovado_por. Nada aqui vai ao ar antes da decisão dos conflitos 16 a 19, da política de privacidade (etapa 16) e da revisão de advogado (`provas-e-conformidade`).

**Documentos desatualizados.** Esta copy se apoia nos mesmos documentos marcados do briefing (pergunta 13.10). Não usa `mecanismo` nem `oferta`.

**Como ler.**
- `{{ficha-de-fatos#campo}}`: o fato entra pelo campo da ficha, nunca copiado. `{{ficha-de-fatos#metas-por-etapa:etapa}}` é só a meta daquela etapa (pre-qualificacao, agendamento, comparecimento, fechamento) e `:geral` é a conversão de lead em venda que o campo registra.
- `{{BLOQUEADO: ...}}`: o lugar existe, o texto não vai ao ar até a decisão.
- `{{a definir: ...}}`: falta um dado que ainda não existe (link, número).
- `[PENDENTE: x]` antes de um trecho: escrito, mas depende de x e pode mudar.
- **Seção oculta:** existe no rascunho e não vai ao ar.
- `[nome]`, `[n]`, `[R$]`: valores que o quiz preenche com as respostas da pessoa. `[nome]` é o primeiro nome.
- "Fica" quer dizer que o texto é o do mockup, sem mudança. Onde está escrito "muda (Mn)", a mudança Mn está na tabela do fim.
- Exemplos de pessoa e empresa são fictícios (Marina, Empresa Exemplo).

**Voz.** O Júnior em primeira pessoa, porque a conversa é ele guiando (REA, T4 e T6). Da skill junior-neves-voice ficou o que o texto dele já tem: frase curta, "a gente", número no lugar de adjetivo, pergunta seguida da resposta. Ficaram fora a gíria, os tiques orais e qualquer feito autodeclarado (`tom-de-voz`; pergunta 9.4). Os textos novos (consentimento, eliminatório) seguem o mesmo ritmo.

---

## 0. Título da página

- **Título da aba do navegador:** {{BLOQUEADO: ficha-de-fatos#analise-nome-publico}} (muda, M4)

---

## 1. Capa

- **Foto:** a do Júnior, como no mockup.
- **Etiqueta:** "Junior Neves · {{BLOQUEADO: ficha-de-fatos#nome-agencia}}" (muda, M1)
- **Rótulo:** "Comece aqui" (fica)
- **Cartão 1 · selo:** {{BLOQUEADO: ficha-de-fatos#analise-nome-publico}} (muda, M2)
- **Cartão 1 · título:** "Descubra onde sua equipe de vendas está perdendo performance" (fica)
- **Cartão 1 · faixa:** gráfico de colunas do funil de exemplo, com o rótulo "exemplo de diagnóstico" e a legenda "na meta" (fica); colunas "Leads · Com perfil · Agendados · Conversas · Vendas" (muda, M29)
- **Cartão 2 · selo:** "vídeo do Junior · cerca de 1 min" (fica)
- **Cartão 2 · título:** "O que o diagnóstico mede e o que você recebe no final" (fica). Vídeo ainda não gravado: placeholder.
- **Botão:** "Falar no WhatsApp" (fica). Número: {{a definir: numero do WhatsApp}}.
- **Rodapé:** {{BLOQUEADO: ficha-de-fatos#nome-agencia}} · "Diagnóstico de vendas para empresas que vendem por conversa de venda." · {{BLOQUEADO: ficha-de-fatos#nome-agencia}} (muda, M3)

**Notas.** Chamada pela dor, sem nome de produto e sem "Safra" (CLAUDE.md do quiz; `tom-de-voz`, regra de 22/10). "Teste gratuito" é um dos nomes em conflito (ficha-de-fatos#analise-nome-publico) e junta nome e gratuidade. O rodapé do mockup traz "© 2026 Triad Marketing USA LLC", um dos valores de ficha-de-fatos#nome-agencia (conflito-07).

---

## 2. Abertura do teste

- **Prévia:** folha de relatório de exemplo (Marina Souza, Dona, Serviços para empresas, R$ 150 a 500 mil por mês), com funil, perfil do funil, selos, leitura em 4 quadros e "dinheiro na mesa · valor calculado no final" (fica; título da folha muda, M4; a faixa de faturamento muda, M30; o gráfico muda, M29).
- **Olho:** "diagnóstico de vendas" (no mockup, com um travessão na frente) vira {{BLOQUEADO: ficha-de-fatos#analise-nome-publico}} (muda, M4)
- **Título:** "Descubra onde sua equipe de vendas está perdendo performance" (fica)
- **Apoio:** "Diagnóstico completo das 4 etapas do funil de vendas: **pré-qualificação**, **agendamento**, **comparecimento** e **fechamento**." (muda, M5)
- **Fatos curtos:** "8 minutos" · "Sem custo na promoção de lançamento" {{ficha-de-fatos#analise-gratuidade}} (muda, M6)
- **Botão:** "Começar diagnóstico →" (fica)
- **Letra miúda:** "Suas respostas servem só para montar o seu diagnóstico e para a nossa equipe falar com você. Como a gente cuida dos seus dados: [política de privacidade]({{a definir: link da politica de privacidade}})." (muda, M7)

**Notas.** "8 minutos" é do próprio quiz, não da ficha; fica até o teste da etapa 14 (pergunta 13.12). A gratuidade segue ficha-de-fatos#analise-gratuidade, com o fim real em ficha-de-fatos#analises-gratuitas, na mesma forma da landing (pergunta 9.3), sem o número. O olho da abertura no mockup começa com um travessão; a regra da casa não deixa (regra 5).

---

## 3. Conversa · nome

- **Fala 1:** "Oi! Sou o Junior Neves e vou guiar você neste diagnóstico." (muda, M8)
- **Fala 2:** "São perguntas sobre sua empresa e seu time de vendas. Leva cerca de 8 minutos, e o relatório sai no final." (fica)
- **Pergunta:** "Para começar: como você se chama?" (fica)
- **Campo:** exemplo "Ex.: Marina". Botão "Continuar".
- **Depois:** "Prazer, [nome]. Conforme você responde, seu diagnóstico vai sendo preenchido aqui ao lado." No celular: "na aba Resultado". (fica)

---

## 4. Conversa · empresa (bloco 1 de 3)

### 4.1 Ramo
- **Pergunta:** "Em que ramo sua empresa atua?" (fica)
- **Opções:** Serviços para empresas · Educação e cursos · Saúde e estética · Imóveis e construção · Tecnologia e software · Indústria e distribuição · Varejo e e-commerce · Outro (fica)
- Não pontua no lead score.

### 4.2 Faturamento · pontua
- **Pergunta:** "Quanto a empresa fatura por mês, em média?" (fica)
- **Opções:** Menos de R$ 50 mil · R$ 50 mil a R$ 150 mil · R$ 150 mil a R$ 500 mil · R$ 500 mil a R$ 1,5 milhão · Mais de R$ 1,5 milhão (fica; são as faixas que o lead score pontua; "Menos de R$ 50 mil" é eliminatório nos dois lados do conflito-16)

### 4.3 Vendedores · pontua
- **Pergunta:** "Quantos vendedores conduzem conversas de venda com clientes?" (muda, M9)
- **Ajuda:** "Conte quem conduz a conversa que fecha a venda, por vídeo ou presencial." (fica)
- **Opções:** Nenhum por enquanto · 1 · 2 ou 3 · 4 a 10 · Mais de 10 (fica; "Nenhum por enquanto" é eliminatório nos dois lados)

### 4.4 Quem marca
- **Pergunta:** "Quem marca as conversas de venda é a mesma pessoa que vende?" (muda, M10)
- **Opções:** Não. Tem gente só para fazer o primeiro contato e marcar · Sim. O vendedor faz tudo · Depende do vendedor (fica)
- **Depois:** "Guarde isso: fila maior do que o time consegue atender derruba mais venda do que roteiro ruim." (fica)
- Não pontua.

### 4.5 Valor médio da venda · pontua
- **Pergunta:** "Qual o valor médio de uma venda?" (fica)
- **Campo:** "R$", exemplo "15.000"; dica "Pode ser um valor aproximado." (fica)
- O lead score lê o número: de R$ 5 mil a menos de R$ 10 mil, ou R$ 10 mil ou mais; abaixo de R$ 5 mil é eliminatório só no lado do lead score (conflito-16).

### 4.6 Origem dos leads
- **Pergunta:** "De onde vêm os seus leads?" (fica)
- **Ajuda:** "Marque todas as que valem para vocês." (fica)
- **Opções:** Anúncios pagos (Meta, Google) · Indicação de clientes · Instagram e redes, sem anúncio · Prospecção ativa · Eventos e feiras · Site e busca no Google · Parcerias · Outro (fica)
- **Depois:** "Lead que chega direto no WhatsApp, sem origem marcada, fica invisível. Saber de onde vem cada um é o que mostra onde investir." (fica)
- Não pontua.

### 4.7 CRM · pontua
- **Pergunta:** "Vocês usam um CRM para acompanhar os clientes?" (fica)
- **Ajuda:** "CRM é o sistema onde fica o histórico de cada cliente e de cada negociação." (fica)
- **Opções:** Sim, e o time atualiza todo dia · Sim, mas pouca gente atualiza · Usamos planilha · Não. Fica no WhatsApp e na cabeça de cada um (fica; são as respostas que o lead score pontua)
- **Depois, se "Sim, e o time atualiza todo dia":** "Boa: com o CRM em dia, os números do funil saem de lá, não da memória." (fica)
- **Depois, nas outras:** "Ferramenta sem rotina não mede nada. O CRM só ajuda quando o time atualiza todo dia." (fica)

### 4.8 Cargo · pontua
- **Pergunta:** "Por último sobre a empresa: qual é o seu cargo?" (fica)
- **Opções:** Dono(a) ou sócio(a) · Diretor(a) comercial · Gestor(a) de vendas · Vendedor(a) · Marketing · Outro (fica)

### Marco
- "**Empresa** ✓ 1 de 3. Próximo: o funil." (fica)

---

## 5. Conversa · funil (bloco 2 de 3)

### 5.1 Lembra dos números?
- **Pergunta:** "Agora o funil. Você lembra, mais ou menos, dos números do seu funil?" (fica)
- **Ajuda:** "Leads, conversas de venda e vendas de um mês normal. Se não lembrar, tudo bem: dá para responder por estimativa." (muda, M11)
- **Opções:** **Sim** · "Escrevo os números que lembro." / **Não** · "Respondo por estimativa." (fica)
- **Depois, se Sim:** "Ótimo. Com os números, o diagnóstico fica mais preciso." (fica)
- **Depois, se Não:** "Sem problema. Não saber os números já é um sinal, e ele entra no diagnóstico." (fica)

### 5.2 Modo números · o primeiro número pontua
- **Pergunta:** "Pense em um mês normal e escreva cada número como lembrar, em quantidade ou em porcentagem." (fica)
- **Ajuda:** "Na porcentagem, conte assim: de cada 100 que chegam na etapa, quantos passam para a próxima." (fica)
- **Linhas** (rótulo · explicação), cada uma com "nº" ou "%", menos a primeira, só "nº":
  1. Leads por mês · contatos novos que chegam (fica; é o número que o lead score pontua)
  2. Pré-qualificados · leads com perfil para comprar, pelo critério de vocês (fica)
  3. Agendados · marcaram a conversa de venda (muda, M12)
  4. Conversas realizadas · a conversa de venda aconteceu (muda, M12)
  5. Vendas fechadas · viraram cliente (fica)
- **Contas ao vivo:** "base de todas as contas" · "≈ [n] [etapa]" · "= [n]% de [etapa anterior]" (fica)
- **Campo vazio:** marca de número ainda não escrito (muda, M30)
- **Resposta no histórico:** "[n] leads · [n] com perfil · [n] agendados · [n] conversas · [n] vendas" (muda, M29)
- **Avisos:** "Acima de 100%. Confere esse número?" · "Maior que a etapa anterior. Confere esse número?" (fica)

### 5.3 Modo chute · leads por mês vale "não lembra" no lead score
- **Pergunta já respondida no histórico:** "Se fosse chutar, quantos dos leads com perfil marcam a conversa de venda?" com a resposta "Menos de {{ficha-de-fatos#metas-por-etapa:agendamento}}" (muda, M13)
- **Pergunta:** "Se fosse chutar, quantos dos agendados vêm para a conversa de venda?" (muda, M13)
- **Ajuda:** "De cada 100 conversas marcadas, quantas acontecem de verdade." (muda, M13)
- **Opções:** "Mais de {{ficha-de-fatos#metas-por-etapa:comparecimento}}" · "Menos de {{ficha-de-fatos#metas-por-etapa:comparecimento}}" · "Realmente não faço ideia"; "ou chute um número", campo "%", exemplo "ex.: 60" (fica; o "X" é a própria meta, MANUAL, seção 1)

### Marco
- "**Funil** ✓ 2 de 3. Agora, as causas." (fica)

---

## 6. Conversa · causas (bloco 3 de 3)

No mockup, as três perguntas são as do agendamento. As das outras etapas estão no MANUAL, seção 2, e entram quando o quiz as tiver (briefing, seção 9).

- **Abertura:** "Uma coisa chamou atenção no agendamento. São três perguntas rápidas para entender o motivo." (fica)

### 6.1 Primeiro contato · pontua
- **Pergunta:** "Em quanto tempo o lead recebe o primeiro contato?" (fica)
- **Opções:** Em até 10 minutos · Em até 1 hora · No mesmo dia · No dia seguinte ou depois · Não sei (fica)
- **Depois, se "Em até 10 minutos":** "Isso é velocidade de quem leva lead a sério." (fica)
- **Depois, nas outras:** "Lead esfria rápido, e quem responde primeiro costuma ficar com a conversa." (muda, M14)

### 6.2 Tentativas · pontua
- **Pergunta:** "Quantas vezes vocês tentam falar com o lead antes de desistir?" (fica)
- **Ajuda:** "Conte ligações e mensagens." (fica)
- **Opções:** 1 ou 2 · 3 a 5 · 6 ou mais, com roteiro definido · Depende do vendedor (fica)
- **Depois, se "6 ou mais":** "Persistência com roteiro é o que separa lead perdido de conversa marcada." (muda, M14)
- **Depois, nas outras:** "Sem um número fixo de tentativas, cada vendedor desiste num ponto diferente, e lead com perfil fica pelo caminho." (fica)

### 6.3 Lead sem contato · pontua
- **Pergunta:** "No fim do dia, sobra lead sem contato?" (fica)
- **Opções:** Sim, muitos · Alguns · Não (fica)
- **Depois, se "Não":** "Bom sinal: o time dá conta de todos os leads que chegam." (fica)
- **Depois, nas outras:** "Sobra de lead no fim do dia é sinal de que entra mais lead do que o time consegue atender." (fica)
- **Marco:** "**Causas** ✓ 3 de 3." (fica)

### Selo conquistado
- **Aviso:** "selo conquistado · [nome do selo]" (fica)
- **Primeiro selo:** "Boa, [nome]: primeiro selo conquistado. Ele fica guardado no painel." (fica)
- **Selos:** Mede o funil · CRM vivo · Time dividido · Várias fontes · Resposta rápida · Semente boa · Agenda que comparece · Fechador (fica)
- **Descrições:** "Sabe os números de cada etapa." · "O time atualiza o CRM todo dia." · "Tem gente só para marcar a conversa de venda." · "Leads chegam por 3 caminhos ou mais." · "Primeiro contato em até 10 minutos." · "Metade dos leads ou mais tem perfil." · "3 de cada 4 conversas marcadas acontecem." · "1 venda a cada 5 conversas, ou melhor." (muda, M15, nas três que diziam "reunião")

**Notas.** "Semente boa" no selo é vocabulário do método dentro da peça, depois do funil explicado na conversa, não em título nem chamada (`tom-de-voz`, regra de 22/10). "Lead perdido" na fala do 6.2 é o lead que fica pelo caminho sem dizer não; o glossário reserva "perdido" para quem disse não. Fica como o Júnior escreveu e entra na pergunta 13.1.

---

## 7. Contato · com consentimento

- **Fala 1, com etapas abaixo da meta:** "Pronto, [nome]! O painel já mostra [n] de 4 etapas abaixo da meta." (fica)
- **Fala 1, com as 4 na meta:** "Pronto, [nome]! Pelo painel, as 4 etapas batem a meta." (fica)
- **Fala 2:** "Falta a leitura: a causa provável e o que fazer em cada etapa, e quanto dinheiro fica na mesa. Quem monta é uma IA treinada no meu jeito de diagnosticar. Tem custo, mas fica por minha conta." (fica)
- **Pergunta:** "Para onde eu mando o diagnóstico completo?" (fica)
- **Ajuda:** [PENDENTE: 13.9] "Ele aparece nesta tela logo depois, e uma cópia vai para o seu e-mail e WhatsApp." (fica)

**Texto de consentimento** (novo, M16), no cartão, **antes** dos campos de e-mail e WhatsApp:

> Antes do seu contato, o combinado. Seu nome, e-mail e WhatsApp servem para duas coisas: mandar o seu diagnóstico e alguém da nossa equipe falar com você sobre ele. Nada além disso. Você pode retirar o aceite ou pedir para apagar seus dados quando quiser. Tudo explicado na [política de privacidade]({{a definir: link da politica de privacidade}}).

- **Caixa 1 (desmarcada):** "Aceito receber o diagnóstico e o contato da equipe por WhatsApp."
- **Caixa 2 (desmarcada):** "Aceito receber o diagnóstico e o contato da equipe por e-mail."
- **Campos:** "Seu nome" (já preenchido com o nome da conversa; exemplo "Como podemos chamar você") · "E-mail" (exemplo "voce@empresa.com.br") · "WhatsApp" com o país (exemplo "(11) 98765-4321") · "Nome da empresa (opcional)" (exemplo "Empresa Ltda.") (fica)
- **Dicas:** "Formato: [modelo]" · "Número completo" · "Faltam números" · "Você quis dizer [e-mail corrigido]?" (fica)
- **Botão:** "Ver meu diagnóstico →" (fica). Só libera com nome, e-mail e WhatsApp válidos e com pelo menos uma das duas caixas marcadas [PENDENTE: 13.4]. O canal não aceito não é usado.
- **Aviso, se nenhuma caixa marcada:** "Marque pelo menos um jeito de receber o diagnóstico." (novo, M16)

**Notas.** Consentimento explícito para WhatsApp e e-mail, com a finalidade dita (`provas-e-conformidade`, "LGPD"; Doc Mestre online, regra 8; conflito-09). As duas caixas correspondem a consentimento_whatsapp e consentimento_email da planta; o texto aceito e a data vão para consentimento_texto e consentimento_em (`planta-do-banco`). O prazo de guarda fica fora do texto até a decisão (outros-23). Quem é a empresa responsável pelos dados fica na política (etapa 16), porque o nome da agência está em conflito (conflito-07). A política ainda não existe: o link fica a definir.

---

## 8. Montando o diagnóstico

- **Fala:** "Recebido, [nome]. Estou montando seu diagnóstico agora." (fica)
- **Título:** "Montando seu diagnóstico" (fica)
- **Passos:** "Calculando as 4 etapas do funil" · "Comparando com as metas" · "Somando o dinheiro na mesa" (fica)
- **Frases que trocam no painel:** "Lendo suas respostas…" · "Calculando as 4 etapas do funil…" · "Comparando com as metas…" · "Somando o dinheiro na mesa…" · "Escrevendo a leitura de cada etapa…" (fica)
- **Marco:** "**Diagnóstico** ✓ pronto." (fica)
- **Botão:** "Continuar →" (fica)

---

## 9. Painel ao vivo

- **Topo:** {{BLOQUEADO: ficha-de-fatos#analise-nome-publico}} · [mês · ano do preenchimento] (muda, M4)
- **Título:** {{BLOQUEADO: ficha-de-fatos#analise-nome-publico}} (muda, M4)
- **Ficha:** Nome · Cargo · Ramo · Faturamento (fica); item ainda sem resposta com a marca de vazio (muda, M30)
- **Funil e gráfico:** etapa ainda sem número com a marca de vazio; colunas do gráfico "Leads · Com perfil · Agendados · Conversas · Vendas" (muda, M29 e M30)
- **Perfil do funil:** "???" e "Aparece quando você terminar de responder."; durante a montagem, "Sai junto com o diagnóstico." (fica)
- **Seções:** "01 Funil" · "02 Selos [n] / 8" · "03 Leitura · 4 quadros" (Forças, Fraquezas, Oportunidades, Alertas) (fica)
- **Notas da leitura:** "Liberada depois do contato." · "Sendo escrita agora." · "Vai para o seu e-mail e WhatsApp." (fica)
- **Botões desligados:** "Compartilhar" · "Baixar PDF" · "Liberados quando o diagnóstico ficar pronto." (fica)
- **Perfis do funil:** "Semente fraca · O marketing traz gente sem perfil de compra." · "Lead esfriando na fila · Lead com perfil demora a virar conversa de venda." · "Agenda furada · Conversa marcada não vira conversa feita." · "Conversa sem fechamento · O cliente vem para a conversa e sai sem comprar." · "Funil redondo, pouca semente · O time converte bem. Falta lead." (muda, M17, nos três que diziam "reunião")

---

## 10. Finais

O caminho de cada lead depende do critério de qualificação: **{{BLOQUEADO: conflito-16}}**. Os dois lados estão escritos, sem escolha (briefing, seção 4, "Finais"):

| Final | Lado do Júnior (CLAUDE.md do quiz) | Lado do lead score (#98) |
|---|---|---|
| 10.1 Qualificado com etapa abaixo da meta | Fatura a partir de R$ 50 mil e tem pelo menos 1 vendedor | Faixas A e B |
| 10.2 Funil saudável | Quatro etapas na meta, qualificado ou não | Idem; o qualificado pela nota |
| 10.3 Não qualificado | Menos de R$ 50 mil ou nenhum vendedor | Eliminatórios e faixa C |

A faixa nunca aparece para o lead. Nenhum texto promete prazo de ligação (pergunta 13.7).

### 10.1 Qualificado · oferta do plano de 90 dias (na conversa)

[PENDENTE: conflito-10; conflito-19; 13.3]

- **Fala 1:** "Olha só, [nome]: [pela sua estimativa / pelos números que você informou], se as etapas fracas chegassem na meta, a conta daria **[cerca de] [n] vendas a mais por mês, uns [R$] mil**. É conta, não promessa: é dinheiro que hoje fica na mesa." (muda, M18)
- **Fala 2:** "Por isso, quero preparar um plano de ação de 90 dias para a sua empresa: o que fazer, etapa por etapa, para ir atrás desse dinheiro e instalar um sistema de vendas no seu comercial." (muda, M19)
- **Fala 3:** "Na promoção de lançamento, ele sai sem custo ({{ficha-de-fatos#analise-gratuidade}}). Depois, vai custar {{ficha-de-fatos#analise-valor}}." (muda, M20)
- **Pergunta:** "Quer receber o seu plano de ação de 90 dias?" (fica)
- **Opções:** "Sim, eu quero" · "Quero ver como é" (fica)
- **Depois:** "Fechou, [nome]." ou, para quem viu o exemplo e voltou, "Agora você já viu como ele é, [nome]." (fica)

**Página de exemplo do plano** (placeholder; fica)
- **Olho:** "plano de ação de 90 dias · exemplo"
- **Título:** "Como é o plano de ação de 90 dias"
- **Apoio:** "Placeholder: aqui entra um exemplo real do plano." · selo "exemplo do plano entra aqui"
- **Botões flutuantes:** "← Voltar" · "Quero o meu →"

**Vídeo do time e WhatsApp** (fica)
- **Fala:** "Agora dá o play neste recado rápido de alguém do meu time."
- **Vídeo:** placeholder, selo "vídeo · alguém do time do Junior"
- **Fala:** "Depois, é só mandar esta mensagem no nosso WhatsApp que o seu plano chega por lá."
- **Rótulo:** "Mensagem pronta" · **Mensagem:** "Envie o meu plano de ação." · **Botão:** "Mandar no WhatsApp". Número: {{a definir: numero do WhatsApp}}.

**Notas.** O percentual "em até X%" saiu (conflito-19): nenhum percentual de melhora em peça antes de caso comprovado (#39; `provas-e-conformidade`; `tom-de-voz`). "Resgatar parte desse dinheiro" também saiu, porque promete resultado; "instalar um sistema" pode ("sistema instalado" pode, "resultado" não; `tom-de-voz`). A fala 3 do mockup dizia o valor e a gratuidade copiados; agora vêm da ficha. A ficha registra esse valor como o da Análise, e o próprio campo anota que o quiz já o dizia do plano (ficha-de-fatos#analise-valor, "Histórico"); se o plano é a Análise não está decidido (conflito-10; pergunta 13.3). "Em breve" saiu: a cobrança começa depois das análises de ficha-de-fatos#analises-gratuitas, não numa data (`tom-de-voz`, prazo ou data só se real). O vídeo é de "alguém do time", não uma pessoa nomeada.

### 10.2 e 10.3 · Relatório

O relatório aparece para o funil saudável e para o não qualificado; para o qualificado, onde ele recebe o relatório completo está em aberto na própria fonte (pergunta 13.9).

**Topo**
- **Olho:** {{BLOQUEADO: ficha-de-fatos#analise-nome-publico}} · [empresa] · [mês de ano] (muda, M4)
- **Ficha:** [nome completo] · [cargo] · [ramo] · [faturamento] (fica)
- **Título, com etapa fraca:** "[nome], seu funil perde força em [n] das 4 etapas." (fica)
- **Apoio, com a pré-qualificação na meta:** "[Pela sua estimativa / Pelos números que você informou], o marketing faz a parte dele. Metade dos leads tem perfil de compra. A perda começa no agendamento e vai até o fechamento." (fica)
- **Apoio, com a pré-qualificação abaixo:** "[...], a perda começa na entrada: menos da metade dos leads tem perfil de compra." (fica)
- **Título, funil saudável:** "[nome], seu funil bate a meta nas 4 etapas." (fica)
- **Apoio, funil saudável:** "Pelos números que você informou, todas as etapas estão na meta ou acima. O processo comercial funciona. O limite agora é quantas sementes entram." (fica)
- **Selo de confiança:** "confiança alta · números que você informou" ou "estimativa · respostas por chute" (fica)
- **Cópia:** "Uma cópia deste diagnóstico vai para o seu e-mail e WhatsApp, nos canais que você aceitou." (muda, M21)

**Funil**
- **Olho e título:** "da semente ao fruto" · "Suas 4 etapas contra as metas" (fica)
- **Pontas:** "[n] leads no mês · as sementes" · "[n] vendas no mês · os frutos" (fica)
- **Etapas:** "[n] de [n] [base] [verbo]", com "têm perfil de compra", "marcaram a conversa de venda", "vieram para a conversa de venda", "viraram venda"; bases "leads", "pré-qualificados", "agendados", "conversas" (muda, M22) · status "abaixo da meta" ou "bateu a meta" (fica)
- **Geral:** "**[n]%** dos leads viram venda. Somando as quatro metas, dá {{ficha-de-fatos#metas-por-etapa:geral}}." (muda, M23)

**Selos:** "selos · [n] de 8" · "O que o seu time já faz bem" (fica)

**Leitura em 4 quadros** (fica, menos onde marcado)
- "leitura em 4 quadros" · "O resumo do seu comercial"; quadro sem item com a marca de vazio (muda, M30)
- **Forças:** "Metade dos leads tem perfil de compra: o marketing traz gente certa." · "Vocês sabem os números do funil, então dá para medir cada conserto." · saudável: "As 4 etapas batem a meta." · "[n]% dos leads viram venda."
- **Fraquezas:** "[etapa]: [≈] [n]%, meta [meta da etapa]." · saudável: "Nenhuma etapa abaixo da meta."
- **Oportunidades:** "Dinheiro na mesa: ≈ [R$] mil por mês com as etapas fracas na meta." · "Agendamento e comparecimento dependem de rotina. Costumam ser os consertos mais baratos." · saudável: "Mais leads com perfil: com as suas taxas, cada lead novo tem a mesma chance de virar venda." · "Venda de maior valor: o mesmo trabalho rende mais por cliente."
- **Alertas:** "Comparecimento e fechamento fracos juntos costumam indicar gente sem perfil entrando na agenda." · "Sem CRM atualizado todo dia, fica difícil ver onde cada lead para." · "Os números são estimativa. Contar os cinco números todo mês deixa o diagnóstico preciso." · saudável: "Mais leads pedem mais gente para atender. Fila maior que o time derruba o agendamento."

**Pontos fracos**
- **Olho e título:** "[n] pontos fracos · do que mais pesa para o que menos pesa" · "Onde sua equipe perde performance" (fica)
- **Em cada etapa:** "etapa principal" (na primeira) · "≈ [R$] mil por mês na mesa" · "[etapa] · [n]% · meta [meta da etapa]" · "Causa provável" · "O que fazer" (fica)
- **Pré-qualificação:** "De cada 10 leads, [n] têm perfil de compra. O esperado é pelo menos 5." · Causa: "Quando menos da metade dos leads tem perfil, o problema nasce no marketing, não no time de vendas. O mais comum é criativo ou público errado, ou uma promessa que atrai curioso em vez de quem pode comprar." · Fazer: "Escrever em uma frase quem é o cliente com perfil e julgar cada anúncio por ela." · "Colocar 2 ou 3 perguntas na entrada que filtrem quem pode comprar, como faturamento e prazo." · "Desligar o anúncio que traz lead barato que nunca vira conversa." (fica)
- **Agendamento:** "De cada 10 leads com perfil, [n] marcam a conversa de venda. O esperado é pelo menos 5." (muda, M24) · Causa: "Você contou que o primeiro contato sai [no mesmo dia]. Lead com perfil esfria rápido, e quem responde primeiro costuma ficar com a conversa. Antes de mexer no que se fala, vale atacar a velocidade." (muda, M24) · Fazer: "Responder cada lead em até 10 minutos no horário comercial." · "Cada lead com um responsável e um número fixo de tentativas, por ligação e WhatsApp." · "Se sobra lead sem contato no fim do dia, está entrando mais lead do que o time consegue atender." (fica)
- **Comparecimento:** "De cada 10 conversas marcadas, [n] não acontecem. O esperado é perder no máximo 1 a cada 4." (muda, M24) · Causa: "Hoje a pessoa recebe um lembrete só. Sem aviso na véspera e algumas horas antes, a conversa perde prioridade na agenda dela." (muda, M24) · Fazer: "Lembrete na véspera e de novo algumas horas antes." · "Quem falta é remarcado no mesmo dia." · "Ao marcar, explicar o que a pessoa leva da conversa e pedir o compromisso dela." (muda, M24, no último)
- **Fechamento:** "De cada [n] conversas, 1 vira venda. O esperado é pelo menos 1 a cada 5." (muda, M24) · Causa: "Quando a venda não fecha, o mais comum é o cliente dizer que vai pensar e sumir. Isso costuma indicar conversa que termina sem próximo passo e uma explicação que não deixa claro o que o cliente ganha." (muda, M24) · Fazer: "Toda conversa de venda termina com um sim, um não ou uma nova data marcada." · "Um roteiro único de conversa de venda, com duas gravações ouvidas por semana." · "Anotar o motivo de cada venda perdida." (muda, M24, nos dois primeiros)
- **Leitura conjunta:** "Comparecimento e fechamento fracos ao mesmo tempo costumam vir da mesma raiz. Gente sem perfil está entrando na agenda. Vale conferir o que quem agenda pergunta antes de marcar." · "Agendamento e comparecimento dependem de rotina, não de talento. Costumam ser os consertos mais baratos." (fica)
- **O que já funciona:** "**O que já funciona:** [etapas]. Metade dos seus leads tem perfil de compra, então o marketing está trazendo gente certa." (fica)
- **Saudável:** "pontos fracos" · "Nenhuma etapa ficou abaixo da meta" · "Onde crescer": "Mais leads com perfil. Com as suas taxas, cada lead novo tem a mesma chance de virar venda." · "Venda de maior valor. O mesmo trabalho do time rende mais por cliente." · "Leads antigos. Quem não fechou meses atrás pode estar pronto agora." · "O que manter": "Continue contando os cinco números todo mês, num lugar só. É isso que permite ver uma etapa cair antes de ela pesar no faturamento." (fica)

**Dinheiro na mesa** (fica)
- **Com etapa fraca:** "dinheiro na mesa" · "[≈] [R$] mil por mês [· estimativa]" · "São [cerca de] [n] vendas a mais por mês se as [n] etapas fracas chegassem na meta. Frutos que hoje ficam no pé." · fatias por etapa "[R$] mil · ≈ [n] vendas"
- **Nota, com os números:** "Conta feita com os seus números, não é promessa. Hoje: [n] vendas, [R$] mil por mês. Com as etapas na meta: [n] vendas, [R$] mil. Valor médio da venda: R$ [n]."
- **Nota, por estimativa:** "Conta por estimativa, não é promessa. Onde você respondeu “menos de X%”, a etapa entra como 70% da meta: [etapas]. Base: [n] leads por mês e valor médio de R$ [n]. Com os números exatos, a conta fica precisa."
- **Saudável:** "Está em investir mais em marketing." · "Seu time converte bem. Cada lead com perfil que entra tem boa chance de virar venda, e hoje o que falta é semente." · tabela "Leads a mais por mês · Vendas a mais · Por mês" · "Conta feita com as suas taxas de hoje: [n]% dos leads viram venda, valor médio de R$ [n]. Não é promessa. Mais leads também pedem gente para atender."

**Vídeo** (fica): "antes de decidir" · "1 minuto com o Junior sobre o seu diagnóstico" · selo "vídeo do Junior · cerca de 1 min". Placeholder até a gravação.

**Chamada · funil saudável qualificado**
- "próximo passo" · "Quer crescer junto com a nossa equipe?" (muda, M25)
- "Numa conversa, a equipe olha esse diagnóstico com você e mostra onde investir primeiro. Escolha como prefere falar." (fica)
- **Botões:** "Quero marcar uma conversa →" (muda, M26) · "Chamar no WhatsApp" (fica) · "Agora não" (fica)
- **Nota de "Quero marcar uma conversa":** "Anotado. Alguém da nossa equipe chama você no WhatsApp para marcar o horário." (muda, M26)
- **Escolha de dia e horário:** seção oculta (muda, M26).
- **Nota do WhatsApp:** abre a conversa com "Oi, fiz o diagnóstico de vendas e quero conversar." (fica)
- **Nota de "Agora não":** "Tudo bem. O diagnóstico fica no seu e-mail e no WhatsApp para quando quiser." (fica)

O mesmo bloco serve ao qualificado com etapa fraca, se ele vir o relatório (pergunta 13.9), com o título "Quer resolver isso junto com a nossa equipe?" e "por onde começar" no lugar de "onde investir primeiro" (muda, M25).

**Chamada · não qualificado (10.3) · {{BLOQUEADO: conflito-16}}**
- "próximo passo" · "Quer conversar sobre esse diagnóstico?" (fica)
- "Clique se você tem interesse que alguém da nossa equipe chame você para falar mais sobre esse assunto." (fica; é texto decidido pelo Júnior, MANUAL, M1)
- **Botão:** "Tenho interesse →" (fica) · "Agora não" (fica)
- **Nota de "Tenho interesse", lado do Júnior:** "Anotado. Alguém da nossa equipe vai chamar você no WhatsApp." (muda, M27)
- **Nota de "Tenho interesse", lado do lead score:** [PENDENTE: 13.7] "Anotado. Seu interesse fica registrado com o seu diagnóstico." (novo, M27)

**Ações e rodapé**
- "Compartilhar" · "Baixar PDF" (fica; na versão final, link para sócio ou gestor e PDF)
- **Rodapé:** {{BLOQUEADO: ficha-de-fatos#nome-agencia}} · "Metas usadas: {{ficha-de-fatos#metas-por-etapa}}. Cada etapa é medida contra a anterior." (muda, M28)

**Notas.** Os números de meta nas frases ("pelo menos 5", "1 a cada 4", "1 a cada 5", "Metade dos leads") vêm de ficha-de-fatos#metas-por-etapa e mudam com o campo. A escolha de dia e horário no relatório faz o próprio lead marcar a conversa; o registro diz que quem agenda é o SDR (#67; ficha-de-fatos#quem-agenda; `funil-01`, passo 3): por isso fica oculta (pergunta 13.5). Do lado do lead score, o não qualificado vai para a nutrição, fora da fila do SDR, e a nota do Júnior promete uma ligação: os dois estão escritos e o final está bloqueado.

---

## 11. Erro ao montar (fica)

- "diagnóstico de vendas" vira {{BLOQUEADO: ficha-de-fatos#analise-nome-publico}} (muda, M4)
- "Não deu para montar seu diagnóstico agora."
- "Suas respostas estão guardadas. Tente de novo em alguns instantes."
- **Botão:** "Tentar de novo →"

---

## Conferência da copy

- **Lead score:** as perguntas que pontuam (faturamento, valor médio, vendedores, leads por mês, CRM, cargo, tentativas, sobra de lead, primeiro contato) ficam, e as opções são as mesmas que `lead-score` pontua, letra por letra. Só o enunciado de "vendedores" mudou (M9); as opções não. O dinheiro na mesa é o que o quiz já calcula.
- **Fatos:** gratuidade e valor por ficha-de-fatos#analise-gratuidade e ficha-de-fatos#analise-valor; metas por ficha-de-fatos#metas-por-etapa. Campos citados, todos na ficha v3: analise-gratuidade, analise-nome-publico, analise-valor, analises-gratuitas, criterio-de-qualificacao, metas-por-etapa, nome-agencia, quem-agenda. Os números do exemplo (Marina, 400 leads, R$ 15 mil) são ilustrativos e não viram prova.
- **Conformidade:** sem "até X%" nem outro percentual de melhora; dinheiro na mesa sempre como conta; consentimento antes do e-mail e do WhatsApp, com finalidade e link da política; sem depoimento, logo ou número de cliente (LEIA PRIMEIRO, regra 8); sem prazo de ligação prometido; sem data para a cobrança.
- **Vocabulário:** sem "reunião" em texto público; sem "SDR" e "closer"; sem "diagnóstico gratuito"; sem "Safra" nem colheita em título e chamada; "Junior Neves" em público.
- **Separador:** ponto médio; nenhum travessão (o olho do mockup, a marca de vazio e a faixa de faturamento da folha de exemplo tinham, e saíram: M4 e M30).

---

## Mudanças no texto do Júnior

Toda alteração feita no texto do mockup (fontes/quiz-01-repositorio-2026-11-08/mockups/quiz-diagnostico.html). Para o Júnior aprovar (pauta, item 29). Texto que não está aqui ficou como ele escreveu.

| # | Onde | Texto original do mockup | Texto novo | Motivo |
|---|---|---|---|---|
| M1 | Capa, etiqueta | "Junior Neves · Triad" | "Junior Neves · {{BLOQUEADO: ficha-de-fatos#nome-agencia}}" | Nome da agência em conflito (conflito-07) |
| M2 | Capa, selo do cartão 1 | "Teste gratuito" | {{BLOQUEADO: ficha-de-fatos#analise-nome-publico}} | "Teste gratuito" é um dos nomes em conflito da Análise (conflito-02); a gratuidade vem da ficha (13.2) |
| M3 | Capa, rodapé | "Triad" · "Diagnóstico de vendas para empresas que vendem por reunião." · "© 2026 Triad Marketing USA LLC" | {{BLOQUEADO: ficha-de-fatos#nome-agencia}} · "Diagnóstico de vendas para empresas que vendem por conversa de venda." · {{BLOQUEADO: ficha-de-fatos#nome-agencia}} | Nome e empresa em conflito (conflito-07); "reunião" é palavra queimada para a persona (13.1) |
| M4 | Título da aba, abertura (olho e folha de exemplo), painel (topo e título), relatório (olho), erro | "Quiz Diagnóstico de Vendas" (título da aba); "diagnóstico de vendas" (com um travessão na frente) e "Diagnóstico de vendas" como nome; "outubro 2026" | {{BLOQUEADO: ficha-de-fatos#analise-nome-publico}}; mês e ano do preenchimento | "Diagnóstico de vendas" é um dos nomes em conflito (conflito-02); travessão proibido (regra 5); a data do protótipo era fixa |
| M5 | Abertura, apoio | "Diagnóstico completo e gratuito nas 4 etapas do funil de vendas: ..." | "Diagnóstico completo das 4 etapas do funil de vendas: ..." | "Diagnóstico gratuito" é frase gasta (`tom-de-voz`); a gratuidade vai para a linha de baixo, pela ficha |
| M6 | Abertura, fatos curtos | "100% gratuito" | "Sem custo na promoção de lançamento" ({{ficha-de-fatos#analise-gratuidade}}) | Gratuidade pela ficha, com fim real (ficha-de-fatos#analises-gratuitas), na forma da landing (9.3) |
| M7 | Abertura, letra miúda | "Suas respostas servem só para montar o seu diagnóstico e para a equipe da Triad falar com você." | "Suas respostas servem só para montar o seu diagnóstico e para a nossa equipe falar com você. Como a gente cuida dos seus dados: [política de privacidade]." | Nome da agência em conflito; link da política pedido pela LGPD (`provas-e-conformidade`) |
| M8 | Conversa, fala 1 | "Oi! Sou o Junior, da Triad, e vou guiar você neste diagnóstico." | "Oi! Sou o Junior Neves e vou guiar você neste diagnóstico." | Nome da agência em conflito; grafia pública "Junior Neves" (ficha-de-fatos#grafia-junior) |
| M9 | Pergunta dos vendedores | "Quantos vendedores fazem reunião de vendas com clientes?" | "Quantos vendedores conduzem conversas de venda com clientes?" | "Reunião" queimada (13.1); a ajuda dele já dizia "conduz a conversa"; opções iguais, como o lead score pontua |
| M10 | Pergunta de quem marca | "Quem marca as reuniões é a mesma pessoa que vende?" | "Quem marca as conversas de venda é a mesma pessoa que vende?" | "Reunião" queimada (13.1) |
| M11 | Ajuda de "Lembra dos números?" | "Leads, reuniões e vendas de um mês normal. ..." | "Leads, conversas de venda e vendas de um mês normal. ..." | "Reunião" queimada (13.1) |
| M12 | Modo números, linhas 3 e 4 | "Agendados · marcaram reunião"; "Reuniões realizadas · a reunião aconteceu" | "Agendados · marcaram a conversa de venda"; "Conversas realizadas · a conversa de venda aconteceu" | "Reunião" queimada (13.1) |
| M13 | Modo chute | "Se fosse chutar, quantos dos leads com perfil marcam reunião?" · "Se fosse chutar, quantos dos agendados vêm para a reunião?" · "De cada 100 reuniões marcadas, quantas acontecem de verdade." | "... marcam a conversa de venda?" · "... vêm para a conversa de venda?" · "De cada 100 conversas marcadas, quantas acontecem de verdade." | "Reunião" queimada (13.1); "X" das opções pela meta da ficha |
| M14 | Falas depois do primeiro contato e das tentativas | "... quem responde primeiro costuma ficar com a reunião." · "... separa lead perdido de reunião marcada." | "... costuma ficar com a conversa." · "... separa lead perdido de conversa marcada." | "Reunião" queimada (13.1) |
| M15 | Descrição dos selos | "Tem gente só para marcar reunião." · "3 de cada 4 reuniões acontecem." · "1 venda a cada 5 reuniões, ou melhor." | "Tem gente só para marcar a conversa de venda." · "3 de cada 4 conversas marcadas acontecem." · "1 venda a cada 5 conversas, ou melhor." | "Reunião" queimada (13.1) |
| M16 | Contato | Sem texto de consentimento; botão libera só com nome, e-mail e WhatsApp | Texto de consentimento antes dos campos, duas caixas (WhatsApp e e-mail), link da política e o aviso "Marque pelo menos um jeito de receber o diagnóstico." | LGPD: consentimento explícito com finalidade (conflito-09; `provas-e-conformidade`; `planta-do-banco`) (13.4) |
| M17 | Perfis do funil | "Lead com perfil demora a virar reunião." · "Agenda furada · Reunião marcada não vira reunião feita." · "Reunião sem fechamento · O cliente vem para a reunião e sai sem comprar." | "... demora a virar conversa de venda." · "Agenda furada · Conversa marcada não vira conversa feita." · "Conversa sem fechamento · O cliente vem para a conversa e sai sem comprar." | "Reunião" queimada (13.1) |
| M18 | Oferta do plano, fala 1 | "... uns R$ [n] mil. É dinheiro que hoje fica na mesa." | "... uns [R$] mil. É conta, não promessa: é dinheiro que hoje fica na mesa." | O manual dele manda dizer o dinheiro na mesa como conta, nunca como promessa (MANUAL, seção 5); a tela não tinha a ressalva que o relatório tem |
| M19 | Oferta do plano, fala 2 | "Por isso, quero preparar um plano de ação de 90 dias para a sua empresa. Não só para resgatar parte desse dinheiro, mas para instalar um sistema de vendas que pode aumentar seu faturamento em até **[X]%**." | "Por isso, quero preparar um plano de ação de 90 dias para a sua empresa: o que fazer, etapa por etapa, para ir atrás desse dinheiro e instalar um sistema de vendas no seu comercial." | Percentual de melhora proibido antes de caso comprovado (#39; CONAR; CDC, art. 30; conflito-19); "resgatar" promete resultado |
| M20 | Oferta do plano, fala 3 | "Agora ele é gratuito. Em breve, vai custar [o valor que hoje está em ficha-de-fatos#analise-valor]." | "Na promoção de lançamento, ele sai sem custo ({{ficha-de-fatos#analise-gratuidade}}). Depois, vai custar {{ficha-de-fatos#analise-valor}}." | Valor e gratuidade só pela ficha; "em breve" sugere data que não existe (a cobrança começa depois de ficha-de-fatos#analises-gratuitas); plano e Análise a confirmar (conflito-10; 13.3) |
| M21 | Relatório, cópia | "Uma cópia deste diagnóstico vai para o seu e-mail e WhatsApp." | "... vai para o seu e-mail e WhatsApp, nos canais que você aceitou." | O consentimento é por canal (M16) |
| M22 | Relatório, etapas do funil | "marcaram reunião" · "vieram para a reunião" · base "reuniões" | "marcaram a conversa de venda" · "vieram para a conversa de venda" · base "conversas" | "Reunião" queimada (13.1) |
| M23 | Relatório, conversão geral | "A meta geral é cerca de 4%." | "Somando as quatro metas, dá {{ficha-de-fatos#metas-por-etapa:geral}}." | Fato pela ficha, que registra o valor exato; os 4% não podem soar como métrica de mercado (`tom-de-voz`) (13.11) |
| M24 | Relatório, leitura de agendamento, comparecimento e fechamento | Frases e causas com "reunião" ("marcam reunião", "reuniões marcadas", "a reunião perde prioridade", "o que a pessoa leva da reunião", "reuniões", "reunião que termina sem próximo passo", "Toda reunião termina...", "roteiro único de reunião") | As mesmas frases com "conversa de venda" ou "conversa" | "Reunião" queimada (13.1) |
| M25 | Relatório, chamada do qualificado | "Quer crescer junto com a equipe da Triad?" · "Quer resolver isso junto com a equipe da Triad?" | "Quer crescer junto com a nossa equipe?" · "Quer resolver isso junto com a nossa equipe?" | Nome da agência em conflito (conflito-07) |
| M26 | Relatório, chamada do qualificado | "Agendar conversa", com escolha de dia e horário ("Escolha o dia", "Escolha o horário (Brasília)", "Confirmar horário", "Horário reservado: [dia], às [hora]. A confirmação chega no seu WhatsApp.") | "Quero marcar uma conversa", com a nota "Anotado. Alguém da nossa equipe chama você no WhatsApp para marcar o horário."; escolha de dia e horário oculta | Quem agenda é o SDR (#67; ficha-de-fatos#quem-agenda; `funil-01`) (13.5) |
| M27 | Relatório, nota do "Tenho interesse" | "Anotado. Alguém da equipe da Triad vai chamar você no WhatsApp." | Lado do Júnior: "Anotado. Alguém da nossa equipe vai chamar você no WhatsApp."; lado do lead score: "Anotado. Seu interesse fica registrado com o seu diagnóstico." | Nome da agência em conflito; no lead score o não qualificado vai para a nutrição, fora da fila do SDR (conflito-16) (13.7) |
| M28 | Relatório, rodapé | "Triad" · "Metas usadas: [as quatro metas de ficha-de-fatos#metas-por-etapa, escritas uma a uma]. ..." | {{BLOQUEADO: ficha-de-fatos#nome-agencia}} · "Metas usadas: {{ficha-de-fatos#metas-por-etapa}}. ..." | Nome da agência em conflito; metas pela ficha |
| M29 | Gráfico de colunas do funil (capa, folha de exemplo da abertura, painel) e resposta dos cinco números no histórico da conversa | Coluna "Reuniões"; resposta "... · 56 reuniões · ..." | Coluna "Conversas"; resposta "... · [n] conversas · ..." | "Reunião" queimada (13.1); as outras colunas e rótulos ficam |
| M30 | Marca de vazio (funil e gráfico do painel, campos dos cinco números, ficha, quadros sem item) e faixa de faturamento da folha de exemplo | um travessão como marca de vazio; "R$ 150", traço curto, "500 mil/mês" | "·" como marca de vazio; "R$ 150 a 500 mil por mês" | Travessão proibido em qualquer texto (regra 5); o sinal de vazio é escolha provisória, o Júnior pode trocar por outro que não seja travessão |

## Fontes

- fontes/quiz-01-repositorio-2026-11-08/mockups/quiz-diagnostico.html (texto e roteiro), CLAUDE.md, LEIA PRIMEIRO.md, MANUAL DO DIAGNÓSTICO (RASCUNHO).md, REA - FULL STACK MARKETING.md (só leitura).
- entregas/quizzes/quiz-01/briefing.md (v1).
- base/lead-score.md (v2), base/ficha-de-fatos.md (v3), base/lacunas.md (v5), base/decisoes.md (v3), base/tom-de-voz.md (v3), base/provas-e-conformidade.md (v3), base/persona.md (v3), GLOSSARY.md (v3), funis/funil-01/funil.md (v2), dados/planta/planta.md (v2).
- Formato: entregas/landings/landing-page-01/copy.md (v3).
- Skill: junior-neves-voice. Onde chocou com a base, valeu a base (9.4).
- Perguntas: prompts/05-fila-perguntas.md (9.3, 9.4, 9.6) e prompts/07-fila-perguntas.md (13.1 a 13.12).
