---
id: design-system
versao: 2
status: rascunho
aprovado_por:
  otavio: pendente
  junior: pendente
depende_de:
  - id: ficha-de-fatos
    versao: 3
  - id: decisoes
    versao: 3
  - id: lacunas
    versao: 3
  - id: tom-de-voz
    versao: 2
  - id: provas-e-conformidade
    versao: 2
desatualizado: false
---

# Design system

Ficha que aponta para o design system v1.0 guardado em fontes/design-system-v1.0/ e registra o que ele define, o que coincide com as decisões e o que está em conflito. Não copia tokens nem arquivos (base/design-system/README.md).

**Status.** Rascunho. Nenhuma decisão registra a adoção do design system v1.0 (log.md, pendência "Design"; conflito-08). Nada daqui vale como decidido; serve para conhecer o material e preparar a decisão. A adoção pede o Otávio e o Júnior (#81 é decisão de design ligada ao Júnior, F25: "Júnior, pela sequência (confirmar)").

**Como ler.** "DS" é a página de documentação (fontes/design-system-v1.0/pagina-documentacao.html). Fatos pelo id do campo em `ficha-de-fatos`; decisões por #n; pendências pelo id de `lacunas`.

---

## O que está guardado

| Item | Caminho | Observação |
|---|---|---|
| Registro da cópia | fontes/design-system-v1.0/LEIA.md | Baixado em 08/11/2026 do site do design system, versão 1.0.0, sem alteração |
| Página de documentação | fontes/design-system-v1.0/pagina-documentacao.html | Fonte de todas as regras abaixo |
| Tokens | fontes/design-system-v1.0/safra-tokens.json e safra-tokens.css | Não copiar para a base nem para peças sem a decisão de adoção. O nome do pacote no json contém travessão: não reproduzir |
| Pacote de identidade | fontes/design-system-v1.0/sistema-de-vendas-safra/ (logotipo em SVG e PNG, apresentação em PDF, tokens, LEIA-ME.txt) e o zip correspondente | Logotipo oficial |
| Apresentação da identidade | fontes/design-system-v1.0/sistema-de-vendas-safra-apresentacao-identidade.pdf | |

Dono das próximas versões do design system: a definir (log.md).

---

## O que o DS v1.0 define

Resumo para localizar a regra; o valor exato (cor, peso, medida) fica nos tokens e na página.

| Tema | O que define | Rótulo de origem no DS |
|---|---|---|
| Cores | Seis cores oficiais, com proporção de uso. A Menta é a cor da ação primária; "uma ação primária por tela" | Identidade oficial; proporção e estados são extensão do sistema |
| Fundo e acabamento | Fundos escuros; nenhuma sombra, brilho ou gradiente | Identidade oficial |
| Tipografia | Só a família Geist. Três pesos vêm da identidade; os pesos intermediários e a versão Mono são extensão | Identidade oficial e extensão do sistema |
| Logotipo | Não se redesenha; não existe versão vertical | Identidade oficial |
| Rótulos de origem | Cada regra traz "Identidade oficial", "Site oficial", "Extensão do sistema" ou "Demonstrativo" | |
| Linguagem | Lista de fazer e evitar (ver `tom-de-voz`, que cita o DS como fonte) | Extensão do sistema |
| Nome em texto corrido | Nome completo na primeira menção; depois "o Safra" ou "o Sistema"; o lettering em caixa baixa só no logotipo | |
| Entregas | Os nomes de ficha-de-fatos#nomes-das-entregas, "Use-os exatamente assim" | Coincide com ficha-de-fatos#nomes-das-entregas (#56) |
| Aplicações | Mockups fictícios; o domínio dos mockups "não pertence ao Sistema de Vendas Safra" | Demonstrativo |
| Checklist e acessibilidade | Checklist de revisão de peça; meta WCAG 2.2 AA | Extensão do sistema |

---

## O que coincide com o registro

- Os nomes de ficha-de-fatos#nomes-das-entregas: iguais no DS (#56).
- "Implementação, nunca mentoria" (#53) e a regra de vocabulário de 22/10 aparecem na lista de linguagem do DS (ver `tom-de-voz`). A regra para colheita, plantio e relógio, reafirmada pelo Otávio em 08/11/2026, é a mesma que o DS traz.
- "SDR" e "closer" fora da comunicação de topo: o DS e a decisão do Otávio de 08/11/2026 coincidem (`tom-de-voz`).
- Mockup não é prova: coerente com a regra de números ilustrativos (ver `provas-e-conformidade`).

---

## Conflitos registrados, sem resolver

Nenhum lado é escolhido aqui. Todos ficam **em conflito · bloqueado para entrega até a decisão**. A adoção do DS v1.0 vai para a pauta com o Júnior (**levar ao Júnior**; resposta 4 do Otávio, 08/11/2026).

| Conflito | Um lado | Outro lado | Onde |
|---|---|---|---|
| Qual design system vale | #45: "Design system Triad v2" (Doc Mestre online, regra 9: "vale até o nome novo sair"); o wireframe da landing foi feito no Triad v2 | O DS v1.0, guardado em 08/11/2026, sem decisão de adoção | conflito-08 |
| Paleta | #81: "referência The Profit e paleta branco e verde aprovada" (F25: "Júnior, pela sequência (confirmar)") | O DS v1.0: fundos escuros e cores só da paleta oficial | conflito-08 |
| Cor dos botões | Botões laranja (Otávio, 03/11, landing, "Design system antigo") | O DS v1.0: a ação primária é a Menta e não há cor fora da paleta | conflito-08 |
| Tipografia | Tipografia "cyberpunk" pedida pelo Júnior (landing; referência não encontrada) | O DS v1.0: só Geist | conflito-08 |
| Nome da agência | ficha-de-fatos#nome-agencia, **em conflito** | O DS v1.0 escreve "Euclides Vieira e Júnior Neves formam a Triad" | lacuna-07 |
| Proposta de valor | O DS v1.0 traz como proposta de valor o texto da #33 | Substituição proposta em #85, pendente | lacuna-02, conflito-03 |

---

## Divergências decididas

Pontos em que o DS v1.0 diverge do registro e o registro já decidiu. O DS está errado nesses pontos e será corrigido na próxima versão dele; fontes/ não muda.

| Ponto | O DS v1.0 diz | O que vale | Decisão |
|---|---|---|---|
| Grafia do Júnior | "Júnior Neves" ("Euclides Vieira e Júnior Neves formam a Triad", pagina-documentacao.html) | "Junior Neves" em público; "Júnior" no texto corrido (ficha-de-fatos#grafia-junior) | Otávio, 08/11/2026 (vale o CTX; confirmado de novo em 08/11/2026, prompts/04, seção 2) |
| Nomes das etapas | "Lead qualificado, Reunião marcada, Reunião realizada, Venda" | Em público, os nomes do método: pré-qualificação, agendamento, comparecimento, fechamento (ficha-de-fatos#metas-por-etapa); "reunião" é palavra queimada para a persona | Otávio, 08/11/2026, resposta 5 (conflito-12, resolvido) |

---

## Pendências

| O que falta | Quem decide | Onde |
|---|---|---|
| Adotar ou não o DS v1.0, e o que acontece com #45 e #81 | O Otávio e o Júnior | conflito-08; log.md, "Design" |
| Cor dos botões e tipografia da landing | O Otávio e o Júnior | conflito-08 |
| Corrigir a grafia "Júnior Neves" para a de ficha-de-fatos#grafia-junior e os nomes de etapa na próxima versão do DS (ver "Divergências decididas") | Dono das próximas versões do DS (a definir) | ficha-de-fatos#grafia-junior; conflito-12 |
| Dono das próximas versões do DS | Não registrado | log.md |

Decidir antes da etapa de design da landing (log.md).

---

## Fontes

- fontes/design-system-v1.0/ (LEIA.md; pagina-documentacao.html; tokens; pacote de identidade).
- base/design-system/README.md.
- Landing: 01-dossie/safra-landing.md ("Design system antigo").
- Doc Mestre online, regra 9; F25 (call de 07/11).
- log.md (pendência "Design").
- Decisões #33, #45, #53, #56, #81, #85 (base/decisoes.md).
- Otávio, 08/11/2026: respostas 3, 4 e 5 às perguntas da etapa 3 e seção 2 de prompts/04-decisoes-de-08-11-e-lead-score.md.
