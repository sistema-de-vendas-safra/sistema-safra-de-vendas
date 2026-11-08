---
id: provas-e-conformidade
versao: 3
status: decidido
aprovado_por:
  otavio: 2026-11-08
depende_de:
  - id: ficha-de-fatos
    versao: 3
  - id: decisoes
    versao: 3
  - id: lacunas
    versao: 4
  - id: mecanismo
    versao: 1
  - id: promessa
    versao: 3
  - id: oferta
    versao: 1
  - id: persona
    versao: 3
  - id: tom-de-voz
    versao: 3
desatualizado: true
---

# Provas e conformidade

O que existe de prova, o que falta provar (a lista [PROVA REAL]), as regras de CDC, CONAR, LGPD e Código Civil que valem para qualquer peça, e as regras jurídicas do funil. A landing e o quiz dependem deste documento o tempo todo (plano aprovado, prompts/02-plano-da-base-resposta.md, parte 1).

**Status.** Decidido pelo Otávio (08/11/2026, pela aprovação do plano). As regras vêm do CTX §7 e §8, das Regras do funil do Doc Mestre online, das regras de conformidade da landing e da decisão #91. Decidido quer dizer que as regras valem; não quer dizer que as provas existem. Nenhuma credencial tem comprovante guardado.

**Documentos pendentes.** As regras tiradas de documentos em pendente-aprovacao (`tom-de-voz`, `promessa`, `oferta`) podem mudar quando eles forem aprovados.

**Como ler.** Fatos são citados pelo id do campo em `ficha-de-fatos`; decisões, por #n; pendências, pelo id de `lacunas`. Abreviações de fonte como na ficha de fatos. "[PROVA REAL: ...]" marca o que falta provar antes de ir a público (CTX §7). Nenhuma regra aqui substitui a revisão de advogado, que a fonte pede antes da primeira peça e antes da primeira venda (CTX §8; Oferta online; lacuna-10).

---

## Sem garantia e o reembolso pela Hotmart (#39, #91)

- **Sem garantia.** "Sem garantia; contrato só com o escopo"; "nenhuma promessa em contrato, de nenhum tipo" (#39). O fato está em ficha-de-fatos#garantia.
- **O reembolso.** "na Hotmart, serviço online de consultoria tem sempre 7 dias de reembolso, sem justificativa, independente do CDC" (#91, Otávio, 08/11/2026, a partir da Central de Ajuda da Hotmart). O prazo é o de ficha-de-fatos#arrependimento.
- **Isso não é garantia de resultado.** "Isso não muda a #39: não existe garantia de resultado; existe o reembolso em 7 dias pela plataforma" (#91; prazo: ficha-de-fatos#arrependimento).
- **O art. 49 do CDC numa venda para empresa.** Se o direito de arrependimento do CDC também se aplica quando a venda é para uma empresa que usa o serviço no próprio negócio, "só um advogado define" (#91). Fica em outros-18, para antes da primeira venda. A Oferta online diz que o artigo "pode não se aplicar"; o Downsell online, "a definir com advogado".
- **Divergência com a fonte.** O CTX §8 ("arrependimento de 7 dias no checkout e nos termos da Hotmart, já que a página tirou 'Tem garantia?'"; prazo: ficha-de-fatos#arrependimento, #91) e a landing citavam o art. 49 do CDC como base. Pela #91, a base é a regra da Hotmart, e o art. 49 fica com o advogado. Vale a #91.
- **Em peça:** nunca chamar o reembolso de garantia. A página tirou a pergunta "Tem garantia?" (landing, "UX", 04/11).

---

## O que existe de prova

Do CTX §7 ("Inventário de provas reais"), salvo onde indicado.

| Prova | Tipo | Grau e limite | Fonte |
|---|---|---|---|
| Painel de safras no leilão do Júnior | Demonstração na operação dele | O uso como prova pública está estacionado (#27); mostrar o painel numa call privada é decisão aberta (Oferta online, "Decisões do cliente", item 10) | CTX §7; #27 |
| A safra de julho do leilão | Demonstração | ficha-de-fatos#safra-de-julho (fato registrado; números finais a confirmar). "Prova que a leitura por safra localiza a etapa que quebra, numa operação real." "Não prova resultado em cliente" | Sistema de Vendas Safra online; ver `mecanismo` (plano de prova) |
| O método nasceu de uma pergunta do Júnior na própria operação | Origem | Existe (F7) | `mecanismo` (plano de prova) |
| A lógica de que o relatório do mês mistura safras | Lógica | Existe | `mecanismo` (plano de prova) |
| Curso gravado do Júnior | Produto | "sem resultados conhecidos" | CTX §7; ficha-de-fatos#bonus-curso |
| Autoridade de lançamento | Autodeclarada | Sem comprovante (F9) | CTX §7 |
| Seguidores do Júnior | Fato de pesquisa | ficha-de-fatos#seguidores-junior; a autoridade pública dele "não é de vendas (forte, F10)" | CTX §9, leitura 7 |
| Deming, Out of the Crisis (1982) | Dado de terceiro | "forte como citação, indicativa para vendas"; o percentual: ficha-de-fatos#deming-percentual. Em peça, só com a nota "Adaptado de" e nunca como "94% do seu problema de vendas", com a exceção do título da seção 2 da landing (#94; conflito-13; ver `tom-de-voz`) | CTX §7, §6 |
| HBR 2011, lead de teste em empresas dos EUA | Dado de terceiro | moderada; os números: fato fora da ficha | CTX §7 |
| Na reserva: Ramper 2022 e HBR 2015 (receita com processo formal) | Dado de terceiro | Ramper indicativa; HBR 2015 moderada, correlação; os números: fato fora da ficha | CTX §7 |
| A pós-graduação que escalava o criativo e trazia estudantes sem perfil, achada olhando os dados | Candidata a história de bastidor (F25) | Sem número comprovado nem autorização; o custo por lead citado: fato fora da ficha | CTX §7 |
| Análise por coorte como prática conhecida | Autoridade externa (F8) | "Achado sem citação"; falta uma fonte publicável | `mecanismo` (plano de prova) |

**O que a prova não cobre.** "A organização por safras rodou numa operação só, a do Júnior (F7)." Falta o caso de empresa terceira (Sistema de Vendas Safra online, "Limites e cuidados"). "O funil de 10/11, gerido por safra, pode virar a primeira safra documentada." (CTX §7; data: ficha-de-fatos#inicio-do-funil).

**Reputação.** Há reclamações públicas sobre entrega do Júnior (CTX §8, "Reputação"; F9); quantidade e datas: fato fora da ficha. "O passivo de entrega espelha a ferida da persona" (CTX §9, leitura 7).

---

## O que falta provar · [PROVA REAL]

Nenhum destes itens pode ir a público antes do comprovante ou da autorização.

### Credenciais e números públicos

| Item | Campo da ficha | Situação |
|---|---|---|
| [PROVA REAL: comprovante do total faturado pelos dois] | ficha-de-fatos#total-dos-dois | **em conflito · bloqueado para entrega até a decisão** (lacuna-16, conflito-05) |
| [PROVA REAL: comprovante do lançamento com o Finch] | ficha-de-fatos#lancamento-finch | **em conflito · bloqueado para entrega até a decisão** |
| [PROVA REAL: comprovante do caso da Camila Vieira] | ficha-de-fatos#camila-vieira | **em conflito · bloqueado para entrega até a decisão** |
| [PROVA REAL: comprovante das credenciais de 07/11 do Júnior] | Sem campo na ficha; os itens estão em outros-11 | Autodeclaradas na call de 07/11, sem comprovante (F25) |
| [PROVA REAL: comprovante das credenciais de #44] (com quem o Júnior e o Euclides trabalharam, além do Finch e da Camila Vieira) | ficha-de-fatos#credenciais-44 ([PROVA REAL]; levar ao Júnior, outros-21) | "credenciais com comprovante" (#44), que depende de confirmação do Júnior e do Euclides (lacuna-20) |
| [PROVA REAL: contagem real para o contador "Total gerado" da página] | ficha-de-fatos#total-dos-dois | **em conflito · bloqueado para entrega até a decisão** (conflito-04, conflito-05). A barra de vagas segue a regra de ficha-de-fatos#barra-de-resgates (#93): contagem real, a partir do banco de dados, sobre ficha-de-fatos#analises-gratuitas |

### Autorização de nome e imagem

- [PROVA REAL: autorização de nome e imagem de Marçal, Grupo Primo, Finch, Paulo e Camila Vieira] (CTX §7). Código Civil, art. 18. Marçal só nas credenciais, com comprovante (#25, #44).
- A faixa "nos bastidores de", o mosaico de fotos e o depoimento do Júnior sobre o Marçal estão na landing sem comprovante nem autorização (conflito-05; lacuna-21).
- [PROVA REAL: fotos do Euclides e do Júnior com os clientes, ou fotos novas: retrato gerado por IA só sinalizado, e foto com terceiro gerada por IA nunca] (CTX §7).
- [PROVA REAL: o vídeo que o Euclides mostra nas reuniões, o que é e o direito de uso] (CTX §7).

### Casos e resultados

- [PROVA REAL: caso de cliente ao fim de uma safra, com números por etapa e autorização] (CTX §7; `mecanismo`).
- [PROVA REAL: números finais da safra de julho] (CTX §7; ficha-de-fatos#safra-de-julho; outros-12). O print da safra de julho fechada, com números por etapa, pede também a autorização do Júnior (`mecanismo`, plano de prova; #27 estacionada).
- [PROVA REAL: receita recuperada de leads dados como perdidos num cliente fundador] (`mecanismo`, plano de prova).
- [PROVA REAL: vendas recuperadas e custo por venda, antes e depois, num cliente fundador] (`promessa`, cuidados da #33; Promessa central online).
- [PROVA REAL: vendas colhidas de leads que nunca disseram não, num cliente fundador], antes de a promessa de benefício da Big Idea ir a público (`mecanismo`).
- [PROVA REAL: depoimento de quem já contratou o Júnior] (CTX §7).
- [PROVA REAL: três histórias de bastidor que provem a tese, com número e autorização, a da pós-graduação incluída] (CTX §7).

### Números sem fonte

- [PROVA REAL: fonte do 95%] (CTX §7; `mecanismo`; o número é fato fora da ficha). Até lá, "quase todo negócio" (Big Idea final online; Doc Mestre online, regra 7).
- Uma fonte publicável sobre análise de coorte (`mecanismo`, plano de prova).

---

## Regras que valem para qualquer peça

### CDC e CONAR

| Regra | Fonte |
|---|---|
| A promessa integra o contrato: pelo art. 30 do CDC, "a publicidade suficientemente precisa obriga quem a faz e passa a integrar o contrato, quando a relação for de consumo"; o CONAR "exige que toda alegação possa ser comprovada" | Oferta online ("As opções estudadas em 22/10", "Um cuidado jurídico") |
| A promessa só vai a público "com prova do primeiro caso e revisão de advogado"; a de 08/11 (#85, pendente) torna vinculante a liderança do Júnior e do Euclides durante o serviço (CDC, art. 30; duração em ficha-de-fatos#duracao) | CTX §8; ver `promessa` |
| Preço "depois" e "valor de" só valem se passarem a ser preço praticado de verdade: ficha-de-fatos#preco-avancada-depois (#19) e ficha-de-fatos#analise-valor (#92; a Análise precisa passar a ser cobrada de verdade depois das gratuitas) | CTX §8 |
| Credencial anunciada precisa de comprovante (ver a lista acima) | CTX §8; Doc Mestre online, regra 2 |
| Contador e barra de vagas só com contagem real; um percentual parado é escassez falsa (CDC, art. 37, e CONAR). A regra do contador de escassez está em ficha-de-fatos#barra-de-resgates (#93) | CTX §8; landing ("Regras de conformidade"); #93 |
| A promoção precisa de um fim real, e a Análise precisa passar a ser cobrada de verdade depois. Com a #92, o fim real é o número de ficha-de-fatos#analises-gratuitas, e o valor depois está em ficha-de-fatos#analise-valor | landing ("Regras de conformidade"); #92 |
| Escassez só a verdadeira, sem prazo nem data: ficha-de-fatos#urgencia, ficha-de-fatos#vagas, ficha-de-fatos#vendas-que-contam | Doc Mestre online, regra 3; CTX §8 |
| "todo o dinheiro" é alegação absoluta | CTX §8 |
| Nenhum percentual de melhora antes de caso comprovado | Mecanismo único online; Promessa central online ("Conformidade"). O quiz promete percentual (conflito-09) |
| "Sistema instalado" no prazo de ficha-de-fatos#sistema-instalado pode, se for cumprido; "resultado" no mesmo prazo, não | CTX §8; landing |
| Comparação com concorrente só com base | CTX §8 |
| Nenhum depoimento, caso ou número inventado | Doc Mestre online, regra 2 |
| Depoimento não pode ser comprado nem condicionado ao elogio: "A troca é pela autorização de documentar, seja qual for o resultado. Ela não pode exigir depoimento positivo." | Oferta online ("A troca pelo caso documentado") |
| Número ilustrativo leva o selo "Exemplo" e nunca vira prova; no painel, o selo "Números fictícios", com premissas à vista, e a nota de que não é resultado, previsão nem promessa | landing ("Regras de conformidade"); PAINEL, regra 11 |
| Mockup com números fictícios não é evidência de resultado | DS, pagina-documentacao.html ("Mockup como prova"; "Representação visual, não evidência de produto") |
| Reclamação só entra verdadeira e rastreável, conferida na página pública; quem reclama aparece pelo tipo de negócio e pela cidade, nunca pelo nome | PAINEL, regra 9; `persona` segue esta regra |

### Código Civil e marcas

- Nome e imagem de terceiros em propaganda só com autorização (Código Civil, art. 18), "Marcus Lemonis incluído" (CTX §8).
- "marcas de terceiros (Meta, CRM, escritório virtual) fora dos criativos" (CTX §8).

### O contrato

- Só o escopo das entregas, com critério de pronto e portabilidade de dados (#39; CTX §8). O número de entregas está em ficha-de-fatos#numero-de-entregas; o contrato ainda tem o formato antigo (outros-06).
- "'por 90 dias eu mando no seu comercial' e 'liderar o comercial' (#85) são metáforas: o time é do cliente, e nenhum poder de gestão vai ao contrato" (CTX §8; duração: ficha-de-fatos#duracao).
- Contrato revisado por advogado, só com o escopo das entregas (Doc Mestre online, E.M.V.); ritos, presença do Júnior e do Euclides que a promessa anuncia, gravações e dados (lacuna-10).

### LGPD

| Regra | Fonte |
|---|---|
| Consentimento no quiz, na calculadora, no formulário e nas páginas | CTX §8 |
| "Consentimento explícito para WhatsApp e e-mail no quiz, no formulário e nas páginas, com a finalidade dita (LGPD)." | Doc Mestre online, regra 8 |
| Na Análise, só números agregados por etapa, "nunca a lista de leads" | CTX §8; Mecanismo único online |
| Base legal para voltar aos leads antigos do cliente, conferida no começo do serviço | CTX §8; ficha-de-fatos#insumo-do-cliente |
| Consentimento e finalidade para as gravações das calls e os dados do cliente que alimentam a IA de consulta e o painel conectado, por escrito no contrato | CTX §8; lacuna-04, lacuna-10 |
| No caso documentado, só números agregados, nunca a lista de leads | Oferta online ("A troca pelo caso documentado") |
| Dado pessoal de lead nunca entra no repositório nem no Google Drive | CLAUDE.md; nucleo/regras/seguranca.md |

**Divergência registrada:** o quiz pede e-mail e WhatsApp sem texto de consentimento (conflito-09).

### Nome e marca

- "'Safra' colide com o Banco Safra na busca (F8); 'Triad' ocupado (#55); 'Triad H.' é provisório (#89), sem busca de marca feita." (CTX §8). Nome da agência: ficha-de-fatos#nome-agencia, **campo em conflito · bloqueado para entrega até a decisão** (lacuna-07).
- A consulta ao INPI está fora de pauta por ora (#23).
- O DS v1.0 avisa que o domínio dos mockups (safra.com.br) "não pertence ao Sistema de Vendas Safra e não deve ser usado em peças reais" (DS, "Aplicações da marca").

### Agente de IA que fala com o lead

"Agente natural, que não se apresenta como pessoa" (Doc Mestre online, "Riscos e pontos em aberto", proposta): "se descobrir que falou com um robô achando que era gente, a confiança cai na hora". Vale para o agente de SDR alugado depois do serviço (CTX §9, leitura 16, indicativa).

---

## As regras jurídicas do funil

O Doc Mestre online tem nove Regras do funil; "as três primeiras são jurídicas e travam a publicação". A oitava é a de dados. Abaixo, cada uma com os valores citados pela ficha: o texto literal das regras 1 a 3 traz valores de fato e fica na fonte.

1. **Preço.** A forma de escrever o preço registrada em ficha-de-fatos#preco-avancada; nunca "de [preço depois] por [preço das vagas]" enquanto o preço depois não for praticado (ficha-de-fatos#preco-avancada-depois).
2. **Prova.** "Credenciais (... e cada nome citado) só com comprovante guardado." Os números de credencial que a regra cita estão em ficha-de-fatos#total-dos-dois e ficha-de-fatos#lancamento-finch, **em conflito**. Vale também "para a linha 'você não me conhece, mas conhece o que eu fiz' e para o vídeo da página. Nenhum depoimento, caso ou número inventado."
3. **Escassez.** "Só a verdadeira": ficha-de-fatos#vagas e ficha-de-fatos#urgencia ("Nenhuma peça cita prazo nem data"); vendas da Essencial não contam (ficha-de-fatos#vendas-que-contam). A regra traz também o valor e a gratuidade da Análise, hoje decididos pela #92 (ficha-de-fatos#analise-valor, ficha-de-fatos#analise-gratuidade).
8. **Dados.** Ver LGPD, acima.

Fonte: Doc Mestre online ("Regras do funil"). O Doc Mestre é o funil antigo e pode ser substituído pela #90, pendente de aprovação do Júnior e do Euclides (plano aprovado, parte 6; conflito-06, conflito-14). As regras de vocabulário e de marca (7 e 9) estão em `tom-de-voz`.

**Revisão jurídica antes de ir ao ar** (Doc Mestre online, E.M.V., "Revisão jurídica"): promessa, preço, credenciais com comprovante e escassez das vagas. Todas "A fazer".

---

## Pendências

| O que falta | Quem decide ou confirma | Onde |
|---|---|---|
| Comprovantes das credenciais | O Júnior e o Euclides (#44) | lacuna-16, lacuna-24, conflito-05, outros-11 |
| Autorizações de nome e imagem | Os terceiros, pedidas pelo Júnior e pelo Euclides | conflito-05, lacuna-21 |
| Art. 49 do CDC numa venda para empresa | Um advogado | outros-18 |
| Contrato com o formato novo, revisado por advogado | Não registrado | lacuna-10, outros-06 |
| Contador "Total gerado" com contagem real (a barra de resgates já tem regra, #93; a contagem depende do funil-01) | O Júnior e o Euclides (credenciais) | conflito-04, conflito-05 |
| Consentimento LGPD e promessa percentual no quiz | O Otávio com o Júnior | conflito-09 |
| Números finais da safra de julho | O Júnior | outros-12, lacuna-24 |
| Fonte do "95%" (fato fora da ficha) | Não registrado | `mecanismo` |
| Painel do leilão como prova pública | Estacionado (#27) | `mecanismo` |

---

## Fontes

- CTX §6, §7 ("Inventário de provas reais"), §8 ("Restrições"), §9 (leituras 7 e 16): 02-arquivos-do-projeto/CONTEXTO-DO-PROJETO.md (v5.3).
- Doc Mestre online: 03-documentos-online/Doc Mestre · Funil IASV Safra.md ("Regras do funil", E.M.V., "Riscos e pontos em aberto").
- Landing: 01-dossie/safra-landing.md ("Regras de conformidade que valem para a copy da página"; "UX").
- Oferta online, Promessa central online, Mecanismo único online, Big Idea final online, Sistema de Vendas Safra online, Downsell online: 03-documentos-online/.
- PAINEL: 02-arquivos-do-projeto/claude/PAINEL-iasv-safra.md (regras 9 e 11).
- DS: fontes/design-system-v1.0/pagina-documentacao.html ("Aplicações da marca"; "Regras e acessibilidade").
- Decisões #19, #23, #25, #27, #39, #44, #55, #62, #85, #89, #90, #91, #92, #93, #94 (base/decisoes.md).
