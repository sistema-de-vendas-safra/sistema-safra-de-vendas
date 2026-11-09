---
id: tom-de-voz
versao: 4
status: pendente-aprovacao
aprovado_por:
  otavio: 2026-11-09
  junior: pendente
depende_de:
  - id: ficha-de-fatos
    versao: 4
  - id: decisoes
    versao: 5
  - id: lacunas
    versao: 6
  - id: persona
    versao: 4
  - id: promessa
    versao: 4
desatualizado: false
---

# Tom de voz

Como as peças do Safra falam: a voz, a grafia, a regra de vocabulário, a postura do "vendedor chato", as falas do Júnior que marcam o método e a lista de frases e alegações que não entram em peça. Os nomes oficiais e os sinônimos a evitar de cada conceito ficam no glossário (GLOSSARY.md, na raiz), que aponta para cá.

**Manual de tom de voz do Safra:** não encontrado (dossiê §7: "não encontrado neste projeto").

**Status.** Pendente de aprovação do Júnior. O que é do Otávio está decidido; dependem da confirmação do Júnior a postura do "vendedor chato" (#26), publicar sobre gestão comercial (#29) e a tese do closer (#87) (CTX §10, lacuna 20; CTX §11). Enquanto o Júnior estiver pendente, este documento só serve de base para rascunho, avisando que pode mudar (nucleo/regras/versionamento.md). Em 08/11/2026 o Otávio resolveu os pontos que eram dele: a regra de vocabulário para colheita, plantio e relógio, o nome das etapas e o jargão em inglês, e a exceção do Deming (#94). Em 09/11/2026, também dele: as falas de quem liga fora da skill do Júnior (15.13), o nome da conversa de venda (#107), a troca da "reunião de safra" (8.12) e os nomes de etapa fora do topo (4.6) (#114).

**Como ler.** Fatos são citados pelo id do campo em `ficha-de-fatos`; decisões, por #n; pendências, pelo id de `lacunas`. Abreviações de fonte como na ficha de fatos. Texto entre aspas é literal da fonte.

---

## A voz

| Regra | Fonte | Status |
|---|---|---|
| A voz final de todas as peças passa pela skill junior-neves-voice. A skill fica na conta, fora dos arquivos do projeto | CTX §6; Oferta online ("A voz final de todas as peças passa pela skill junior-neves-voice"); Big Idea final online; dossiê §7 | regra registrada |
| "Voz do Júnior nas peças dele" | Doc Mestre online, regra 9 | regra registrada |
| As falas de quem liga para os leads seguem o tom da casa (vocabulário público, sem promessa, sem "reunião", "vendedor chato" com data), sem passar pela skill junior-neves-voice; a skill vale para o que sai em nome do Júnior | prompts/07-fila-perguntas.md, 15.13 | decidido (Otávio, 09/11/2026, 15.13; base/decisoes.md, #114) |
| Quem assina as peças (a Triad ou o Júnior em primeira pessoa) | ficha-de-fatos#nome-agencia, **campo em conflito · bloqueado para entrega até a decisão**; Promessa central online ("Decisões do cliente", item 2) | em aberto (lacuna-07, lacuna-19, conflito-07) |
| Português do Brasil; falas literais com a grafia original | PAINEL, regra 8 | regra do Otávio |
| Nenhum travessão nem traço médio; separador é o ponto médio (·) | CLAUDE.md, regra 5; PAINEL, regra 8 | regra da casa |

**O comprador é o Rafa** (ver `persona`): decide sozinho, desconfia da categoria inteira e rejeita "reunião e vídeo no lugar de aplicação". A Buyer Persona pede "Reduzir a ansiedade em vez de aumentar a urgência" (F2, tema 5).

---

## Grafia

| O quê | Como escrever | Fonte |
|---|---|---|
| O Júnior | ficha-de-fatos#grafia-junior: "Junior Neves" em público; "Júnior" no texto corrido. O design system v1.0 escreve "Júnior Neves" e está errado nesse ponto; vale o CTX, confirmado em 08/11/2026, e a divergência está registrada em `design-system` | CTX §6; ficha-de-fatos#grafia-junior |
| As Sessões de Comando | "Sessões de Comando com o Junior Neves" | #83; CTX §6 |
| O sistema | "Sistema de Vendas Safra", no singular. "Sistema de Vendas Safras" (plural) não | dossiê §11 (conversa "Wireframe da página de vendas Triad"); landing, "Copy" |
| O sistema, depois da primeira menção | O DS v1.0 manda escrever o nome completo, com iniciais maiúsculas, na primeira menção, e depois "o Safra" ou "o Sistema"; o lettering em caixa baixa pertence só ao logotipo. **Regra do DS v1.0, cuja adoção nenhuma decisão registra** (conflito-08) | DS, pagina-documentacao.html ("Nome em texto corrido") |
| A continuidade | GSAAS; a grafia GSAAS ou GSaaS está a confirmar (ficha-de-fatos#gsaas) | #38; PAINEL ("Pendências do painel") |
| Aprovação que falta | "pendente de aprovação do Júnior e do Euclides", nunca "pendente dos sócios" | PAINEL, regra 13 (Otávio, 23/10/2026) |
| Metas | "metas aprovadas pelo dono", nunca "metas assinadas" | PAINEL, regra 4 |
| Os nomes das entregas | Como em ficha-de-fatos#nomes-das-entregas, "exatamente assim"; a horta fica na descrição, nunca no nome | #56; DS (seção das entregas); PAINEL, regra 16 |
| A conversa de venda com o Júnior | Como em ficha-de-fatos#nome-call-de-venda; em público, nunca "reunião com o Júnior". A Análise é o diagnóstico do quiz, com nome público a definir (ficha-de-fatos#analise-nome-publico) | #92; #107 |
| O rito semanal em grupo | Pelo nome de ficha-de-fatos#calls-em-grupo e da análise de calls (ficha-de-fatos#analise-de-calls), nunca "reunião de safra"; a tela do painel com as prioridades se chama "Prioridade da semana" | 8.12 com 9.6 (Otávio, 09/11/2026; #114) |

---

## A regra de vocabulário (22/10)

> "O comprador ainda não conhece 'safra' nem 'colheita'. Nas promessas, nos títulos e nas chamadas, só entram palavras que ele já usa: lead, venda, verba, etapa, fim do mês, sim ou não. Os termos do método aparecem depois, quando o mecanismo é explicado (com a rúcula, o morango e a melancia) na VSL, na página e na call. Em 23/10, o nome Sistema de Vendas Safra passou a entrar na promessa principal."

Fonte: Oferta online ("Regra de vocabulário (22/10)"). Status: decidido (Otávio, 22/10; exceção do nome em 23/10) (dossiê §7).

**Colheita, plantio e relógio: decidido.** Vale a regra de 22/10, reafirmada pelo Otávio em 08/11/2026 (vocabulário público só com palavras do comprador; resposta 3 às perguntas da etapa 3). Esses termos não entram em promessa, título nem chamada antes de o mecanismo ser explicado. A exceção continua sendo o nome Sistema de Vendas Safra. O DS v1.0 traz a mesma regra: evita "safra" (fora do nome do sistema), "colheita", "plantio" e "relógio" "em promessas, títulos e chamadas antes de o mecanismo ser explicado" (DS, "Linguagem"). A leitura que a Oferta online pedia para confirmar ("Leio que ela continua valendo para os outros termos do método (colheita, plantio, relógio) em títulos e chamadas; falta confirmar.") fica confirmada.

**Vocabulário público** (Otávio, 08/11/2026; conflito-12): na comunicação de topo, só as palavras que o comprador já usa. Os termos do método e os nomes de etapa do DS ficam para dentro.

**Nomes das etapas em público** (Otávio, 08/11/2026, resposta 5): os do método, pré-qualificação, agendamento, comparecimento e fechamento (ficha-de-fatos#metas-por-etapa). A forma do DS ("lead qualificado, reunião marcada, reunião realizada, venda") perde nesse ponto, porque "reunião" é palavra queimada para a persona (ver `persona`). Em títulos e chamadas de topo vale também a regra de 22/10: os nomes de etapa entram no corpo da página e do quiz, nunca no topo (decisão do Otávio, 09/11/2026, 4.6; base/decisoes.md, #114).

**Vocabulário próprio a proteger:** "safra, relógio, maturação, solo, adubo, plantio, cultivo, colheita, 'o lead é a semente' e 'perdido é quem falou não'. Esse vocabulário é da narrativa do método e das descrições das entregas" (Sistema de Vendas Safra online, "Limites e cuidados"; F12).

**A horta** "fica no método e nas descrições, nunca no nome nem no problema" (CTX §6; #56). "A horta só aparece junto com o método, nunca no problema" (Doc Mestre online, regra 9). O nome do problema (Gestão Mensal de Leads) "entra depois do sintoma, nunca no lugar dele" (Mecanismo único online).

---

## A língua do comprador

- **Número no lugar de adjetivo.** O DS v1.0 pede "Número no lugar de narrativa: meta por etapa e leitura por safra", "Dizer com clareza o que o Sistema não promete" e "Mostrar o escopo por escrito, entrega a entrega" (DS, "Linguagem", Fazer; adoção sem decisão, conflito-08). A Buyer Persona pede o mesmo sentido: traduzir CAC como "quanto custa cada venda" (F2, tema 2).
- **Termo técnico traduzido.** "termos acadêmicos sem tradução ('atribuição multitoque' deve virar 'saber de onde vem cada venda')" (F5, "Vocabulário a usar e a evitar").
- **O teste do "sei, claro".** "'Você vai vender mais' não passa. 'Traga os números da sua última safra e a gente mostra onde ela quebrou' passa, porque o próprio prospect confere." (Mecanismo único online).
- **A Big Idea para o comprador.** "Não falar em CRM, não falar que o lead ficou mais caro." Direcionamento do Otávio de 22/10 para a versão da Big Idea dirigida ao comprador; "o alcance para outras peças não foi registrado" (dossiê §7).
- **Palavras queimadas** para a persona e falas dele: ver `persona` ("Palavras queimadas"). Nenhuma delas entra para nomear a oferta.
- **"Meta" e "alvos".** O Júnior "já disse em público que 'meta é boba' e prefere 'alvos'; o sistema usa meta por etapa" (CTX §9, leitura 18, indicativa, F24).

---

## A postura: o "vendedor chato"

> "persistência com data marcada, sem pressão"

Fonte: #26; CTX §6 (Postura). **Depende de confirmação do Júnior** (CTX §10, lacuna 20; lacuna-20).

- Na régua do serviço: "O time trabalha como o 'vendedor chato' que o Júnior admira: não larga o lead antes do não nem antes do fim do relógio, e cada contato tem data marcada. Insistência com método, não pressão." (Ficha do Serviço online, "A postura da régua").
- Na oferta: "O tom segue a postura do 'vendedor chato': persistência com data, sem pressão. Nada de 'última chance' que não seja a última." (Oferta online, "Urgência real").
- A tensão com a persona: o Rafa se incomoda com abordagem insistente ("incomodam a noite no horário almoço", RA-26; ver `persona`). O que separa as duas coisas é a data marcada e o fim do relógio, não a quantidade de contatos.
- A recomendação antiga da pesquisa ("venda sem pressão") aparece reescrita como "persistência com data, sem pressão" (PAINEL, "Onde o painel difere das fontes").

---

## A comunicação da linha do tempo

- **Fases de cor e a mensagem da instalação** (#80, decisão do Júnior em 07/11): a linha do tempo em três fases de cor (vermelho, amarelo e verde) e a mensagem de "todo o nosso arsenal de conhecimento" entregue no prazo de ficha-de-fatos#sistema-instalado, com o sistema instalado (CTX §6); a parte de cada fase na linha do tempo é **fato fora da ficha** (está em F25, "Linha do tempo da página", e no CTX §6). A fala de origem: "Escreve de um jeito até que chama atenção nós vamos entregar toda toda a nossa arsenal de conhecimento." (Júnior, F25).
- **"Sistema instalado" pode; "resultado" não.** "'sistema instalado em 15 dias' pode ir a público se for cumprido, 'resultado em 15 dias' não" (CTX §8; prazo: ficha-de-fatos#sistema-instalado).
- **Referência interna de narrativa** (#81): The Profit (no Brasil, O Sócio), de Marcus Lemonis, com "por 90 dias eu mando no seu comercial" (duração: ficha-de-fatos#duracao); "o nome dele e o da série ficam fora das peças" (CTX §6). É metáfora: "o time é do cliente, e nenhum poder de gestão vai ao contrato" (CTX §8).
- **"Liderar o comercial" e "assumir a liderança"** na promessa de 08/11 (#85; vale por decisão do Otávio, #108) também são metáforas (CTX §8; ver `promessa`).

---

## Falas do Júnior que marcam o método

| Fala | Fonte | Uso |
|---|---|---|
| "o lead é a semente" | F1; CTX §4 | Vocabulário próprio do método |
| "perdido é quem falou não" | F1; CTX §4 | Regra do método; base da frase-assinatura |
| "se eu for dizer a maior falha dos caras, ele não olhar para dados." | F25; CTX §4 | Fala do Júnior |
| "eu tenho bastante dificuldade de me autovender" | F22; CTX §3 | Contexto: por que a autoridade dele precisa ser construída (CTX §9, leitura 7) |
| Tese do closer: "o closer não convence; quem convence é o marketing e o sistema, e com sistema o closer é tirador de pedido" | CTX §3 (Júnior, "pela sequência da fala", F25) | Vira macronarrativa (#87), **com a autoria a confirmar com o Júnior** (lacuna-08). A regra 5 do painel diz: "A tese não aparece em público" e muda com isso (CTX §10, lacuna 8) |

O orgânico do Júnior sobre gestão comercial depende de ele aceitar publicar (#29, pendente; Doc Mestre online, "Autoridade em vendas").

---

## Frases e alegações que não entram em peça

Esta é a lista de frases e alegações proibidas que o plano aprovado tira do glossário (prompts/02-plano-da-base-resposta.md, parte 3, item 2). Os sinônimos e nomes antigos de cada conceito ficam no glossário.

### Nunca dizer (CTX §6)

| Frase ou alegação | Por quê ou o que usar no lugar | Fonte |
|---|---|---|
| "mentoria", "curso" ou "ensinar" para a oferta, inclusive para as Sessões de Comando | É "implementação, nunca mentoria" (#53) | CTX §6; Doc Mestre online, regra 7 |
| "turma" | As vagas não têm início comum (#65; ficha-de-fatos#vagas) | CTX §6 |
| GSAAS, gerente e entrega na primeira etapa do funil | #68; exceção: "gerente comercial" na página, para o papel do Júnior (#86) | CTX §6; Doc Mestre online, regra 7 |
| "Treinamento" e "Playbook" fora dos nomes das entregas | Só como nomes de entregas | CTX §6; Doc Mestre online, regra 7 |
| "10x" | Proibido | CTX §6; F5 ("Evitar") |
| "Os 4% como métrica de mercado" | A conversão é consequência das metas por etapa (ficha-de-fatos#metas-por-etapa), "e não como referência de mercado sem fonte" (Sistema de Vendas Safra online) | CTX §6; F12 |
| "94% do seu problema de vendas" | O número de Deming fala de empresas em geral (CTX §7); em peça, só com a nota "Adaptado de" (ficha-de-fatos#deming-percentual). **Exceção decidida:** o título da seção 2 da landing fica como está, com o asterisco (#94; conflito-13) | CTX §6; #94 |
| Totais autodeclarados | Credencial anunciada precisa de comprovante (CTX §8; ficha-de-fatos#total-dos-dois, ficha-de-fatos#lancamento-finch, ficha-de-fatos#camila-vieira) | CTX §6 |
| Tema político | Proibido; também "referências políticas" e "ironia sobre fé" (F5) | CTX §6; F5 |
| Resultado ligado ao contrato ou a prazo ("colher resultado em 15 dias"; prazo: ficha-de-fatos#sistema-instalado) | Só "sistema instalado", se cumprido (ficha-de-fatos#sistema-instalado; #39) | CTX §6, §8 |
| Prazo ou data para as vagas | A única urgência está em ficha-de-fatos#urgencia | CTX §6; Doc Mestre online, regra 3 |
| "a oferta mais robusta do mercado" sem base publicada | É leitura de 07/11 sem verificação (CTX §5) | CTX §6 |

### Outras alegações vetadas

| Frase ou alegação | Por quê ou o que usar no lugar | Fonte |
|---|---|---|
| "de [preço depois] por [preço das vagas]" | Um "de" nunca praticado é propaganda enganosa; os valores e a regra estão em ficha-de-fatos#preco-avancada-depois | Doc Mestre online, regra 1; F11; PAINEL |
| "todo o dinheiro" | "alegação absoluta (CONAR)". O texto da promessa mantido pela #108 traz a expressão: conflito registrado em `promessa`, bloqueado para ir ao ar até a resposta | CTX §8; ajuste sugerido em `promessa` |
| Promessa percentual de melhora | "Nada de percentual de melhora em peça antes de caso comprovado (CONAR)"; a promessa percentual "continua guardada até haver casos com base de comparação". O quiz fica como está, com a promessa de percentual no fim, por exceção decidida pelo Otávio (#110; `provas-e-conformidade`) | Mecanismo único online; Promessa central online ("Conformidade") |
| O "95%" da analogia, sem fonte (fato fora da ficha) | "A analogia diz 'quase todo negócio' até o 95% ter fonte" | Doc Mestre online, regra 7; Big Idea final online |
| "Nada de 'última chance' que não seja a última"; contador regressivo | "Contador regressivo fica de fora: o mercado já desgastou o recurso e ele é risco no CONAR (F10)." A landing tem, como sugestão não confirmada, uma contagem regressiva até a virada do mês | Oferta online ("Urgência real"); landing ("UX", sugestões) |
| Apresentar a leitura por safra como invenção inédita | "Novo para o mercado, não para o mundo": análise por coorte é prática conhecida (F8) | Sistema de Vendas Safra online ("Limites e cuidados"); DS ("Linguagem") |
| IA como manchete | IA comercial é mercadoria: "meio, nunca manchete" | CTX §9, leitura 8; F10 |
| "o maior nome", "maiores lançamentos" sem prova | Sugestão da landing: "um dos maiores", se não houver prova; mesmo assim, só com comprovante (conflito-05) | landing ("Copy", sugestões); CTX §8 |
| O nome de Marcus Lemonis e da série The Profit | Referência só interna (#81) | CTX §6, §8 |
| Marçal como aval | Marçal só nas credenciais, com comprovante (#25, #44); "citar Marçal como aval" está entre o que evitar | CTX §6; F5 |
| "fórmula secreta", "do zero ao milhão", "sem esforço" | Evitar | F5 ("Vocabulário a usar e a evitar") |
| "CRM" e "o lead ficou mais caro" na versão da Big Idea para o comprador | Direcionamento de 22/10 (alcance para outras peças não registrado) | dossiê §7, §11 |
| Jargão em inglês na comunicação de topo ("SDR", "closer", "pipeline") | "SDR" e "closer" saem da comunicação de topo (Otávio, 08/11/2026, resposta 5; conflito-12). O DS v1.0 prefere "quem agenda", "quem fecha", "vendedor"; o diagrama da seção 2 da landing precisa trocar "closer" e "SDR" | DS ("Linguagem"); landing; conflito-12 |

### Frases gastas do mercado

O mercado está "entre o estágio 4 e o 5 de sofisticação: todo mundo tem 'sistema' ou 'método'" (F10, "O que já está gasto"). Os termos abaixo já são usados por concorrentes; a coluna "Uso" é a da fonte.

| Termo ou promessa | Uso na Triad (F10) |
|---|---|
| "Máquina de vendas" | Evitar |
| "Previsibilidade", "previsível" | Só com número ao lado |
| "Implementação", "implementadora", "lado a lado", "entra na água" | Não basta dizer: mostrar quem executa e qual métrica responde |
| "O problema não é lead", "converter melhor" | Abertura de reconhecimento, não diferencial |
| "De trás pra frente", "conta reversa" | Não usar como nome do método; a novidade é a safra |
| "Vender sem depender de você", "vendedor estrela" | Evitar em headline |
| "Diagnóstico gratuito", "sessão estratégica", "raio-x" | Trocar por leitura da última safra do prospect |
| "SDR IA", "gerente comercial IA", "IA na operação" | IA como meio, nunca como manchete |
| "Arquitetura de vendas", "Arquitetura de Receita" | Evitar |
| "Sem letra miúda" | Não dizer; mostrar a cláusula |
| "Processo comercial", "estruturação comercial" | Evitar como promessa |

Fonte: F10 online ("O que já está gasto"). O CTX §5 resume: "'sem depender de você', 'o problema não é lead', 'previsibilidade', 'máquina de vendas', 'balde furado', 'vazamento', entre outras (F10)". O Doc Mestre online (regra 7) põe fora "as frases gastas do nicho ('máquina de vendas', 'previsibilidade', 'o problema não é lead')". Também ocupados por concorrentes, pelo documento do mecanismo: "ponto cego", "lead parado", "máquina", "engrenagem", "arquitetura", "implementadora" (dossiê §11, que remete a F13).

**Cuidado com a tese nova.** "Growth hacking" e "hackeando" soam "como truque e como anglicismo para parte do público (F10)"; "'o furo que ninguém vê' encosta em 'balde furado' e 'vazamento', gastas" (CTX §9, leitura 21). "hackeando" está em teste na promessa (ajuste sugerido em `promessa`; lacuna-02).

---

## O que falta decidir

| Decisão | Quem decide | Onde |
|---|---|---|
| A postura do "vendedor chato" (#26) e publicar sobre gestão comercial (#29) | O Júnior | lacuna-20 |
| A tese do closer como macronarrativa (#87): autoria e publicação | O Júnior | lacuna-08 |
| Quem assina as peças | O Júnior e o Euclides | lacuna-07, conflito-07 |
| "hackeando" contra "ajustando" ou "destravando" | O Otávio (ajustes da promessa) | lacuna-02 |

Resolvidos em 08/11/2026 pelo Otávio: a regra de vocabulário para colheita, plantio e relógio (resposta 3), o jargão em inglês e o nome das etapas (resposta 5; conflito-12) e o Deming no título da seção 2 (#94; conflito-13).

---

## Fontes

- CTX §3, §4, §5, §6, §7, §8, §9 (leituras 7, 8, 18, 21), §10 (lacunas 8 e 20), §11: 02-arquivos-do-projeto/CONTEXTO-DO-PROJETO.md (v5.3).
- Oferta online: 03-documentos-online/Oferta · Implementação Avançada do Sistema de Vendas Safra.md ("Regra de vocabulário (22/10)", "Urgência real", "Decisões do cliente").
- Promessa central online, Mecanismo único online, Big Idea final online, Sistema de Vendas Safra online, Ficha do Serviço online, Doc Mestre online ("Regras do funil" e "Autoridade em vendas"), F10 online ("O que já está gasto"): 03-documentos-online/.
- F1, F22, F25: 02-arquivos-do-projeto/claude/ (FONTE-call-brainstorming.md, FONTE-call-alinhamento-28-10.md, FONTE-call-decisao-07-11.md).
- F5: 02-arquivos-do-projeto/claude/FONTE-pesquisa-persona.md ("Vocabulário a usar e a evitar").
- PAINEL: 02-arquivos-do-projeto/claude/PAINEL-iasv-safra.md (regras 4, 8, 13, 16; "Onde o painel difere das fontes").
- Dossiê: 01-dossie/safra-dossie.md (§7, §11). Landing: 01-dossie/safra-landing.md ("Parte 2").
- DS: fontes/design-system-v1.0/pagina-documentacao.html ("Nome em texto corrido", "Linguagem"); adoção sem decisão (conflito-08).
- Decisões #25, #26, #29, #38, #39, #44, #53, #56, #65, #68, #80, #81, #83, #85, #86, #87, #92, #94, #107, #108, #110 e #114 (4.6, 8.12, 15.13) (base/decisoes.md).
- Otávio, 08/11/2026: respostas 3 e 5 às perguntas da etapa 3 (prompts/04-decisoes-de-08-11-e-lead-score.md, seção 5a) e seção 2 do mesmo prompt.
