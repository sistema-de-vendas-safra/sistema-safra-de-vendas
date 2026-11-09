---
id: persona
versao: 4
status: decidido
aprovado_por:
  otavio: 2026-11-09
depende_de:
  - id: ficha-de-fatos
    versao: 4
  - id: decisoes
    versao: 5
  - id: lacunas
    versao: 6
desatualizado: false
---

# Persona · Rafa, o Dono-Closer

Quem compra a IASV Safra, como a pesquisa o descreve: quem ele é, as dores, os ganhos, as barreiras e os critérios, a jornada, as palavras queimadas, as falsas crenças e as falas dele, cada item com o grau de evidência.

**Status.** Decidido como base de pesquisa. Nenhuma decisão numerada do CONTEXTO cobre a persona (plano aprovado, prompts/02-plano-da-base-resposta.md, parte 1); o Otávio confirmou em 08/11/2026 que a aprovação do plano vale para ela. Decidido quer dizer "é a melhor descrição que temos", não "está validada": ver o grau de evidência logo abaixo.

**O que não fica aqui.** O corte de quem a oferta serve (faturamento, valor da venda, time) mora em ficha-de-fatos#criterio-de-qualificacao, **campo em conflito · bloqueado para entrega até a decisão** (lacuna-12, conflito-01). A persona da Buyer Persona online corresponde à versão (a) desse campo; o critério do Júnior, à versão (b). O volume de leads está em ficha-de-fatos#volume-minimo (hipótese a validar).

**Como ler.** Fontes como na ficha de fatos: F2 é a Buyer Persona online, F3 o Mapa de Empatia online, F4 o Dossiê de Voz do Cliente, F5 a Pesquisa de persona, CTX §n a seção do CONTEXTO v5.3. Decisões por #n; pendências pelo id de `lacunas`. Falas entre aspas são literais, com a grafia original.

---

## Grau de evidência

- **Composição, não pessoa real.** "Rafa, o Dono-Closer. Composição a partir de 35 vozes públicas, não uma pessoa real" (F2, Buyer Profile). Sem entrevistas: "Esta persona é uma hipótese forte, não um retrato confirmado: nasceu de 35 vozes públicas, e não das entrevistas que o método exige." (F2, "Limites desta persona"). O CTX §4 registra o mesmo: "F2, 35 vozes públicas, sem entrevistas".
- **De onde vêm as vozes.** Quase todas são reclamações ou processos contra quem vendeu para elas; há também depoimentos de vitrine e casos observados por veículos (F2, "Limites desta persona", onde está a composição). Os depoimentos de vitrine "são vitrine, autosselecionados e não verificados" (F4, "Caveats"); o Reclame Aqui "tem viés negativo e mostra os piores casos" (F4).
- **O que é mais sólido e o que é mais frágil.** "Os rings 3 e 4 são os mais sólidos; recompra e custo por venda são os mais frágeis." (F2).
- **Validação pendente.** Entrevistas com donos do perfil e teste de compreensão dos nomes das entregas: lacuna-25. Até lá, a persona é pesquisada, não validada.
- **Escala usada neste documento.** Da F2: **padrão** (duas ou mais fontes) e **em espera** (uma fonte ou nenhuma). Da F3: **observado** (está no dado, com a fala) e **inferência** (dedução da pesquisa, a validar). Estágio: **[NC]** nunca contratou estrutura comercial de terceiros; **[QM]** contratou e se queimou; **[AMBOS]** aparece nos dois (F3, "Como ler este mapa").
- **IDs.** Os IDs (RA-01, CS-02 e afins) remetem ao banco-de-evidencias.md, "que não está no projeto" (F4, cabeçalho); estão literais em F2 e F4 (CTX, cabeçalho). Em peça pública não entram IDs (PAINEL, regra 1), e quem reclama aparece pelo tipo de negócio e pela cidade, nunca pelo nome; reclamação só entra conferida na página pública (PAINEL, regra 9). As falas abaixo **não foram conferidas** na página pública: o painel segue o Reclame Aqui, não F2 nem F4 (PAINEL, "Onde o painel difere das fontes").

---

## Quem é

| Atributo | O que a pesquisa diz | Grau | Fonte |
|---|---|---|---|
| Cargo | Dono, fundador ou CEO. "Não responde a ninguém." Quando existe head comercial, "costuma ser um ex-closer, e responde a ele" | padrão (R1-12 é inferência) | F2, Buyer Profile |
| Quem decide | "Rafa é dono, avalia sozinho e decide sozinho. Na maioria dos casos, o comprador técnico e o comprador econômico são a mesma pessoa." | padrão | F2 |
| Quem mais pesa | Sócio e cônjuge, sobretudo em empresa familiar; o contador, quando o assunto é imposto ou forma de pagamento | inferência (R2-05) | F2 |
| Quem usa | O head comercial, quando existe: "vai usar a solução, mas raramente decide" | inferência (R1-12, R1-15) | F2, Ring 5 |
| Perfil provável | Homem, de ascensão própria, com forte componente cristão; muitos fora das capitais. A faixa de idade está em F2 | padrão | F2, Buyer Profile |
| Educação | "Sem dado direto." Valoriza imersões, mentorias e eventos; o discurso que consome desconfia do ensino superior | em espera | F2 |
| Nichos mais prováveis | Educação e mentoria high ticket; saúde e estética; serviços profissionais, como advocacia e contabilidade; B2B e negócios locais em escala. "Não há dado percentual" | inferência | F2. Nicho ou setor específico do projeto: não encontrado; o projeto define o cliente pelo tipo de venda (dossiê §2) |
| Relação com a categoria | "Dois estágios: nunca contratou máquina de vendas (comprou educação ou opera sozinho) ou contratou e se queimou" | padrão | F2; F3 |
| Onde está | Não comenta no Instagram | observado | F10; CTX §4 |
| Em quem confia | Pares de mastermind e indicação; eventos e palestras; o ecossistema Marçal; nomes que avalizam fornecedores (F2 lista quais). "O Reclame Aqui entra, mas só depois da compra" | padrão | F2, Buyer Profile |
| O que quer | Execução dentro da operação e alguém sênior do começo ao fim | padrão | CTX §4; F2, temas 1 e 3 |

**Cuidado com o Marçal.** A persona confia no ecossistema dele, mas Marçal entra só nas credenciais, com comprovante (#25, #44), "nunca como aval" (PAINEL, "Diagnóstico honesto"). Citar Marçal como aval está entre o que evitar (F5, "Vocabulário a usar e a evitar").

**O critério do Júnior corta parte da persona.** "'Quem já tem time de vendas' corta parte da persona (moderada, F2, F22); o quiz precisa filtrar isso." (CTX §9, leitura 15). O corte em si está em ficha-de-fatos#criterio-de-qualificacao, em conflito.

---

## O que o fez buscar ajuda agora (gatilhos)

| Gatilho, na voz dele | Estágio | Grau | Fonte |
|---|---|---|---|
| "Contratei uma agência ou um programa comercial, a verba foi embora e não entrou contrato. Não dá para repetir isso com o próximo." | QM | padrão | F2, Ring 1.1 |
| "Fiz a imersão, fiz a mentoria e voltei para a empresa com o caderno cheio e o comercial do mesmo jeito." | NC | padrão | F2, Ring 1.2 |
| "O faturamento chegou alto, mas o caixa não acompanha: um mês bom, outro ruim, e dívida no meio." | NC | padrão | F2, Ring 1.3 |
| "Eu ainda sou quem fecha as vendas grandes. Se eu paro, a empresa para." | NC | em espera | F2, Ring 1.4 |
| O anúncio ficou mais caro sem mudança na operação (repasse de tributos da Meta) | AMBOS | em espera, nenhuma voz de cliente | F2, Ring 1.5. A data e o percentual do repasse: fato fora da ficha |

"O gatilho mais documentado é o fracasso da compra anterior" (F2, Ring 1). Sem nenhuma fala: saída do closer estrela, queda depois de um lançamento, comparação com um par que escalou, virada de trimestre (F2).

---

## Dores

Ranking da F3 ("Ranking das dores"), com a severidade da fonte. O CTX §4 resume: "ficar sozinho depois da assinatura; receber reunião e vídeo no lugar de aplicação; pagar execução sem ver venda; ser o único que fecha. O fornecedor desanda perto do terceiro mês (F2)."

| # | Dor | Estágio | Severidade (F3) | Grau | Voz |
|---|---|---|---|---|---|
| 1 | Ficar sozinho depois da assinatura: sênior, mentor ou acompanhamento que somem | AMBOS | Extrema | observado, padrão | "Fui abandonado à própria sorte após as imersões." (RA-13) |
| 2 | Receber reunião, vídeo ou conteúdo genérico no lugar de aplicação | AMBOS | Extrema | observado, padrão | "Vendem consultoria e só passam vídeos para assistir." (RA-06) |
| 3 | Pagar por execução e não ver venda | QM | Extrema | observado, padrão | "Alcance e impressão não pagam boletos; o combinado eram LEADS qualificados e vendas." (RA-01) |
| 4 | Fornecedor que não pratica o que vende | AMBOS | Extrema | observado, padrão | "Ensinam uma coisa e fazem outra." (RA-15) |
| 5 | Perder verba, acessos e marca | QM | Extrema | observado | "Facebook e BM retidos" (RA-25) |
| 6 | Pressão de venda e upsell, com apelo de fé ou de brio | NC | Moderada | observado | "vendedora [que] me chama diz que eu ouvisse meu coração que Deus me capacitaria" (RA-24) |
| 7 | Caixa que oscila e dívida | NC | Extrema | observado | "não é porque você fez 'seis em sete' uma vez que fará sempre" (CS-03) |
| 8 | Ser exposto diante dos pares | AMBOS | Moderada | observado, mais inferência | "Faço parte de grandes grupos e masterminds do mercado de infoproduto e marketing digital e não gostaria de expor essa experiência." (RA-04) |
| 9 | Ser o único que fecha | NC | Extrema, por inferência | em espera (uma voz, dita como modelo e não como queixa) | "Eu sou o CEO e sou o melhor vendedor da empresa." (CS-02) |
| 10 | Pré-requisito revelado depois da compra | QM | Moderada | em espera | "deveria ter sido tratado como pré-requisito obrigatório" (RA-10) |
| 11 | Custo por venda subindo sem saber onde o funil vaza | AMBOS | Extrema, por inferência | inferência, nenhuma voz | sem fala de cliente (F3) |

"A dor mais extrema não é o preço, é pagar e ficar sozinho." (F3). "O que ele rejeita é desperdício, não preço alto; a queixa dominante é pagar e não ver venda" (F3, contradição 6, inferência).

---

## Ganhos

Ranking da F3 ("Ranking dos ganhos").

| # | Ganho | Estágio | Relevância (F3) | Grau |
|---|---|---|---|---|
| 1 | Ser medido em venda, contrato e lead qualificado | QM | Essencial | observado, padrão |
| 2 | Aplicação dentro da operação, não conteúdo | AMBOS | Essencial | observado, padrão |
| 3 | Acompanhamento sênior que continua depois da assinatura | AMBOS | Essencial | observado, mais inferência |
| 4 | Salto de faturamento em poucos meses | NC | Essencial | observado, só vitrine |
| 5 | Time que fecha sem ele | NC | Essencial | em espera, mais inferência |
| 6 | Primeiro resultado dentro de cerca de três meses | AMBOS | Essencial | em espera, mais inferência |
| 7 | Pares que sejam donos | NC | Desejável | em espera |
| 8 | Liberdade contratual e acessos com ele | AMBOS | Desejável | inferência |
| 9 | Ser reconhecido como dono, não como aluno | AMBOS | Desejável | inferência |
| 10 | Números semanais para ter controle | AMBOS | Desejável | inferência |

"Nenhuma das 35 vozes mede sucesso em CAC, margem ou LTV." (F3, "Ganhos do cliente"). As métricas da oferta "não são a língua nativa dele e precisam ser traduzidas em venda e caixa" (F3, inferência).

**Promessas da oferta sem voz.** "'saber quanto custa cada venda' e 'vender de novo para quem já comprou' têm 0 de 35 menções" (F2, Ring 2): "testar, não afirmar". A recompra depende da safra de clientes (#16; outros-10).

---

## Barreiras

Da F2, Ring 3: "O que trava Rafa é o medo de errar de novo, e não a preferência pelo que já tem."

| # | Barreira, na voz dele | Estágio | Grau |
|---|---|---|---|
| 1 | "Depois que eu assino, fico sozinho: o acompanhamento some e o meu problema é empurrado para um parceiro." | AMBOS | padrão |
| 2 | "Na venda vem o sênior. Depois quem me atende é um júnior, ou nem é a pessoa que me prometeram." | AMBOS | padrão |
| 3 | "O acesso prometido encolhe: vira live, grupo de WhatsApp ou 20 minutos por Zoom." | NC | padrão |
| 4 | "Vou pagar caro, de novo, para receber reunião e vídeo?" | AMBOS | padrão |
| 5 | "Quem me vende não usa o que vende. Ensinam uma coisa e fazem outra." | AMBOS | padrão |
| 6 | "Se eu cair em outra furada, vou passar vergonha na frente dos meus pares." | AMBOS | padrão |
| 7 | "Se eu quiser sair, fico preso em aviso, multa, prazo de garantia e acessos retidos." | AMBOS | padrão |
| 8 | "Isso eu já acho de graça no YouTube." | NC | padrão |
| 9 | "No meio do caminho, vão querer me vender mais, usando até a minha fé." | NC | padrão |
| em espera | "Vão me cobrar uma estrutura que ninguém me disse que eu precisava ter." | QM | uma fonte |
| em espera | "Não tenho tempo para implementar" e "meu time não vai aderir" | AMBOS | só inferência |

**Atenção a duas barreiras que tocam o formato.** A barreira 3 cita o grupo de WhatsApp como acesso que encolhe, e o grupo de suporte é um rito do serviço (ficha-de-fatos#grupo-de-suporte). "O grupo enfraquece um território e encosta numa ferida" (CTX §9, leitura 19, moderada). A barreira 1 é a mesma ferida que o passivo de entrega do Júnior espelha (CTX §9, leitura 7).

---

## Critérios de decisão

Da F2, Ring 4: "Rafa compara fornecedores por quem executa, onde executa e como é medido."

| # | Critério, na voz dele | Estágio | Grau |
|---|---|---|---|
| 1 | "Quem, com nome e sobrenome, vai trabalhar na minha operação depois da assinatura, e até quando?" | AMBOS | padrão |
| 2 | "Vocês executam dentro do meu comercial ou me passam tarefa, vídeo e reunião?" | AMBOS | padrão |
| 3 | "Qual métrica de entrega está no contrato? É venda, ou é alcance?" | QM | padrão |
| 4 | "Vocês usam no próprio atendimento o que estão me vendendo?" | QM | padrão |
| em espera | "O que eu preciso ter pronto antes de começar? Quero isso por escrito antes de assinar." | QM | uma fonte |
| em espera | "Como eu saio, e os meus acessos ficam comigo?" | QM | uma fonte |
| em espera | "O que tem sobre vocês no Reclame Aqui?" | AMBOS | uma fonte |
| em espera | "Os outros participantes são donos como eu?" ("Pesa se a oferta tiver encontros em grupo") | NC | uma fonte |
| em espera | "Tem caso no meu nicho, com número antes e depois?" | AMBOS | só inferência |
| em espera | "Quanto custa, e o que acontece se não der resultado?" ("ninguém pede garantia de forma espontânea") | AMBOS | nenhuma fonte |

**O critério 3 contra o registro.** A pesquisa mostra que ele pergunta pela métrica em contrato; a decisão é "nenhuma promessa em contrato, de nenhum tipo" (#39; ficha-de-fatos#garantia). A Oferta online registra o custo dessa escolha e o que a sustenta: "ninguém pede garantia de forma espontânea (F2)" (Oferta online, "Sem garantia em contrato").

---

## Jornada

"Rafa decide em dias, quase sempre no calor de um evento ou de uma call, e só confere a reputação do fornecedor quando já está saindo. Depois, o ciclo recomeça com o próximo." (F2, Ring 5).

| Passo, na voz dele | Grau |
|---|---|
| "Conheci o fornecedor numa palestra, num evento ou num anúncio, e o vendedor veio atrás logo depois." | padrão |
| "Confiei em quem já tinha nome: o influenciador que fazia a propaganda, o palestrante, a maior empresa do segmento." | padrão |
| "Decidi rápido e só fui ler o Reclame Aqui depois." | padrão |
| "Os primeiros meses foram bem. Perto do terceiro, começaram os problemas, e eu fui atrás do próximo." | padrão |
| Quanto tempo passa entre o primeiro contato e a assinatura, e quem mais opina | em espera, só inferência dos relatórios |

"Os primeiros meses costumam ir bem; perto de três meses, a promessa desanda e ele volta ao mercado." (F2). A F2 nota que a duração da oferta (ficha-de-fatos#duracao) cai exatamente nessa janela.

---

## Temas que ressoam

Da F2 ("Temas que ressoam"). "Os quatro primeiros têm voz de comprador em todos os rings que tocam; os três últimos ainda dependem de inferência e devem ser testados antes de virar mensagem principal."

| # | Tema | Força (F2) | O que a pesquisa recomenda | Situação no registro |
|---|---|---|---|---|
| 1 | Execução dentro da operação, não conteúdo | Alta | Vender o que fica instalado no time ao fim do serviço, e não horas de encontro | Coerente com #53 ("implementação, nunca mentoria") |
| 2 | Medido por venda, não por alcance | Alta | "Contratar e reportar em reunião realizada, fechamento e receita. Traduzir CAC como 'quanto custa cada venda'" | A parte de contratar por métrica foi superada por #39: o contrato traz só o escopo. Reportar fica no Relatório de Produtividade, sem meta prometida |
| 3 | Sênior do começo ao fim | Alta | "Nome, agenda e cadência do sênior escritos no contrato" | Recomendação da pesquisa. O contrato segue #39 (lacuna-10); a presença do Júnior e do Euclides que a promessa de 08/11 anuncia está pendente (#85) |
| 4 | Sem letra miúda | Média | "Lista de pré-requisitos antes de assinar; acessos sempre no nome do cliente; saída sem multa" | Pré-requisitos em ficha-de-fatos#insumo-do-cliente; "Sem letra miúda" como frase é gasta (F10) |
| 5 | Decidir sem medo de outra furada | Média | "Reduzir a ansiedade em vez de aumentar a urgência: diagnóstico com os números dele, zero pressão de upsell" | A Análise antes da compra: com a #92, é o diagnóstico do quiz, com gratuidade e valor em ficha-de-fatos#analise-gratuidade e ficha-de-fatos#analise-valor; o nome público segue em conflito (conflito-02). A demonstração com os números do cliente fica na Call de Direcionamento (ficha-de-fatos#nome-call-de-venda; 4.5, #114; #107) |
| 6 | Caixa previsível, sem montanha-russa | Baixa a média | "Mostrar onde o funil vaza em reais, com a conta de comparecimento e fechamento" | "Previsibilidade" é frase gasta, só com número ao lado (F10) |
| 7 | A empresa vendendo sem ele | Baixa | "Testar em anúncio antes de pôr na headline" | O obstáculo "Eu sou o único que fecha venda." fica "não resolvido de propósito" (#20) |

**As três situações de compra** (F2): (1) escolhendo a melhor opção, o [QM] que vai contratar de novo e "troca, não desiste"; (2) incapacidade de decidir, "a situação mais comum nos dados", em que ele "quer resolver, mas trava com medo de errar de novo"; (3) preferência pelo status quo, o [NC] que acha que resolve com energia do time ou com conteúdo gratuito. Na situação 2, a F2 recomenda, entre outras coisas, "garantia ligada a um indicador combinado": **superada pela #39** (sem garantia) e pela #91 (reembolso pela Hotmart, que não é garantia de resultado; ficha-de-fatos#arrependimento).

---

## Palavras queimadas

Para a persona: **reunião, relatório de vaidade, consultoria, mentoria, curso, programa, máquina de vendas** (CTX §4; F3; dossiê §7, "achado de pesquisa").

Como ele chama a solução que avalia, nas palavras dele: "Máquina de vendas", "assessoria", "processo comercial", "aplicação prática" (F2, Buyer Profile). Três desses termos estão gastos pelos concorrentes ou queimados para ele (F10; F3); a F2 pede que "Máquina de vendas", "previsível" e "aplicação prática" sejam "sondados: o que significam para ele, em número".

Como ele fala do próprio funil (inferência da F5, §1.6): "lead lixo", "tráfego queimando", "closer que não fecha", "no-show", "fura reunião", "ticket", "margem", "caixa", "escala", "previsibilidade", "tô no operacional", "dono de empresa x dono de emprego".

---

## Falsas crenças

Do CTX §9 (grau moderado): "o meu problema é escala"; "consultoria de vendas é mais uma mentoria"; "meu time não segue processo"; "o problema é o tráfego caro".

Da F3 (inferência): o [NC] "tende a achar que vender é convicção e energia, e que o time não fecha por falta de garra, não de processo" e "suspeita que já tem o essencial de graça" (esta, observada).

**Contradições entre o que ele diz e o que faz** (F3, "Contradições entre discurso e prática"): ouve "Nunca aceite conselho de quem não fez" e compra de quem não pratica o que vende; prega responsabilidade total e põe o fracasso na conta do fornecedor; quer uma empresa que funcione sem ele, mas a própria remuneração o premia por continuar vendendo.

---

## Falas com ID

Selecionadas de F2 e F4, literais. Grau: padrão quando o mesmo tema tem duas ou mais fontes em F2.

| Fala | ID | Estágio | Tema |
|---|---|---|---|
| "Alcance e impressão não pagam boletos; o combinado eram LEADS qualificados e vendas." | RA-01 | QM | Medido por venda |
| "Está parecendo jogo do Tigrinho do Marketing!" | RA-01 | QM | Desconfiança |
| "Sou o lado fraco nessa relação" | RA-01 | QM | Assimetria na compra |
| "Ficamos sem amparo, porque havíamos encerrado contrato com outra empresa para apostar na V4." | RA-01 | QM | Troca de fornecedor |
| "Eu sou o CEO e sou o melhor vendedor da empresa. Eu não tiro dinheiro, eu ganho percentual sobre minha performance de vendas." | CS-02 | NC | Dono-closer |
| "não é porque você fez 'seis em sete' uma vez que fará sempre" | CS-03 | NC | Caixa que oscila |
| "De início, tudo bem, porém, a partir de uns 3 meses começaram os problemas." | RA-03 | QM | O terceiro mês |
| "Consultor Junior (que por sinal só esteve presente na venda, depois demorava para responder as mensagens quando não as ignorava)." | RA-04 | AMBOS | Sênior que some |
| "Superficial, genérico e completamente inútil para a aplicação prática." | RA-13 | NC | Conteúdo no lugar de aplicação |
| "A assessoria se resume a 2 reuniões mensais que não levam a lugar nenhum de 30 minutos cada uma." | RA-05 | AMBOS | Reunião sem encaminhamento |
| "Eles vende automação, mas não usam o que esses vendem no próprio atendimento." | RA-09 | QM | Quem vende não usa |
| "Senti que não dominam o serviço que vendem." | RA-08 | QM | Quem vende não usa |
| "Se a operação dependia de estrutura robusta de equipe, isso deveria ter sido tratado como pré-requisito obrigatório, e não como ajuste ao longo do processo." | RA-10 | QM | Pré-requisito oculto |
| "Descobri que o melhor conteúdo dele é o gratuito." | PJ-03 | NC | Já tem de graça |
| "incomodam a noite no horário almoço" | RA-26 | AMBOS | Insistência do vendedor |

Fonte: F2 (rings 1 a 5); F4 ("As 20 frases mais fortes para copy"). As frases do CTX §4 que entram na linguagem: RA-01 e CS-02.

**Cuidado com a fala RA-26.** A persona se incomoda com abordagem insistente (F3, "O que o faz se sentir mal"), e a postura do serviço é o "vendedor chato" (#26, que depende de confirmação do Júnior). A ponte é "persistência com data marcada, sem pressão" (CTX §6).

---

## O que a pesquisa não cobre

Da F3 ("Lacunas de pesquisa") e da F2:

- **Recompra e base:** nenhuma voz. "É a terceira promessa ('vender mais vezes') e não tem lastro." (F3). Ver #16 e outros-10.
- **Admirador sem compra:** nenhuma voz; aparece só por inferência (F3).
- **Time comercial no ecossistema:** nenhuma voz sobre closer ou SDR; "Toda dor operacional vem de quem está fora do ecossistema" (F3).
- **Comparecimento às reuniões e custo por venda:** sem voz (F3).
- **Quem decide e em quanto tempo:** só inferência (F2, Ring 5; F3).
- **Teto de preço:** a faixa da F3 "é inferência" (F3, lacuna 7).
- **Garantia:** "Ninguém pede de forma espontânea" (F3, lacuna 8).
- **Faturamento real:** declarado em poucas vozes; nas outras, "a faixa é estimada pelo valor investido em fornecedores" (F3).
- **Perda do closer estrela:** "Gatilho provável sem nenhuma fala" (F3).

---

## Como validar

O plano de validação da F2 ("Como validar com 8 a 10 entrevistas"; o número de entrevistas está em lacuna-25):

1. "Recrutar dos quatro grupos": quem contratou máquina de vendas e se queimou, quem comprou mentoria ou imersão, quem ficou como estava e quem nunca considerou contratar ajuda; todos com compra ou decisão nos últimos 12 meses, "e nenhum em negociação ativa com você".
2. "Usar uma só pergunta roteirizada: 'Leve-me de volta ao dia em que você decidiu pela primeira vez buscar ajuda para estruturar o seu comercial. O que aconteceu?'"
3. "Sondar as palavras dele": o que "máquina de vendas", "previsível" e "aplicação prática" significariam em números na empresa dele.
4. "Fechar as lacunas que mais pesam na oferta: recompra (0 de 35 vozes), custo por venda, quem participa da decisão e em quanto tempo, garantia, e o que aconteceu quando o melhor vendedor saiu."

As perguntas de cada lacuna estão na tabela "Lacunas de pesquisa" da F3. A Oferta online pede também o teste da oferta com donos do perfil antes da copy (lacuna-25).

---

## Fontes

- F2, Buyer Persona online: 03-documentos-online/Buyer Persona Empresário High Ticket do Ecossistema Marçal.md (20/10/2026).
- F3, Mapa de Empatia online: 03-documentos-online/Mapa de Empatia Empresário High Ticket do Ecossistema Marçal.md (20/10/2026).
- F4: 02-arquivos-do-projeto/claude/FONTE-voz-do-cliente.md (cabeçalho, TL;DR, "As 20 frases mais fortes para copy", "Caveats").
- F5: 02-arquivos-do-projeto/claude/FONTE-pesquisa-persona.md (§1.6 e "Vocabulário a usar e a evitar").
- CTX §4, §9 (leituras 7, 15 e 19 e falsas crenças), cabeçalho: 02-arquivos-do-projeto/CONTEXTO-DO-PROJETO.md (v5.3).
- PAINEL: 02-arquivos-do-projeto/claude/PAINEL-iasv-safra.md (regras 1 e 9; "Onde o painel difere das fontes").
- Dossiê: 01-dossie/safra-dossie.md (§2 e §7).
- Oferta online: 03-documentos-online/Oferta · Implementação Avançada do Sistema de Vendas Safra.md ("Sem garantia em contrato"), só para o critério 3.
- F10: 03-documentos-online/Concorrência de Júnior Neves no nicho de vendas.md ("O que já está gasto"), para os termos gastos.
- Decisões #16, #20, #25, #26, #39, #44, #53, #85, #91, #107, #114 (base/decisoes.md).
