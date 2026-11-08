# Etapa 2 · Plano da base

A fundação está pronta e publicada. Agora vamos planejar a base a partir das fontes. Nesta etapa você só propõe; ninguém escreve a base ainda. Escrever vem na próxima etapa, depois da minha aprovação.

## O que ler, nesta ordem

1. CLAUDE.md e nucleo/regras/versionamento.md
2. fontes/acervo-2026-11-08/safra-acervo/00-LEIA-ME.md
3. fontes/acervo-2026-11-08/safra-acervo/02-arquivos-do-projeto/CONTEXTO-DO-PROJETO.md (a síntese que manda, versão 5.3)
4. fontes/acervo-2026-11-08/safra-acervo/01-dossie/safra-dossie.md
5. fontes/acervo-2026-11-08/safra-acervo/01-dossie/safra-landing.md
6. fontes/design-system-v1.0/ (o LEIA.md, o safra-tokens.json e a pagina-documentacao.html, só para as regras de cor, tipografia e vocabulário)

Consulte os outros arquivos do acervo só quando precisar confirmar um item. Quando um documento online (pasta 03) e uma cópia FONTE divergirem, vale o documento online.

## O que entregar

Salve o plano em prompts/02-plano-da-base-resposta.md, com estas seis partes:

1. **Documentos da base.** Para cada documento proposto: id, nome do arquivo, o que ele contém, de quais fontes sai (códigos F1 a F25 ou nome do arquivo), status inicial (rascunho, decidido, pendente-aprovacao ou aprovado, conforme o registro do CONTEXTO) e quem aparece em aprovado_por. Ponto de partida, que você pode mudar se explicar o motivo: ficha-de-fatos, produto, oferta, promessa, entregas-do-servico, persona, tom-de-voz, decisoes, lacunas, design-system.

2. **Ficha de fatos.** A lista de campos (preços, vagas, Análise, prazos, número de entregas, bônus, downsell, critério de qualificação e o que mais for fato), com o valor e a fonte de cada um. Os campos em conflito ficam marcados, com os valores concorrentes e onde cada um aparece.

3. **Glossário.** Como o glossário do CONTEXTO e a lista de termos a evitar viram o CONTEXT.md, no formato do CONTEXT-FORMAT.md da skill grill-with-docs (plugin mattpocock-skills). Mostre três verbetes de exemplo, um deles com termos a evitar.

4. **Decisões.** Onde e em que formato o registro #1 a #89 passa a morar, e como a #90 entra (o funil-01 substitui a página das três portas, #66, e o CRM do Doc Mestre; pendente de aprovação do Júnior e do Euclides).

5. **Conflitos.** Lista priorizada dos conflitos e lacunas que afetam a landing-page-01 e o quiz-01. Para cada um: o que conflita, os valores, a fonte de cada lado e quem decide (eu sozinho, ou eu com o Júnior e o Euclides). Os conflitos que não afetam a landing e o quiz ficam numa lista à parte, só com uma linha cada.

6. **O que fica fora da base.** As fontes que servem só de consulta e por quê.

## Regras desta etapa

- A única escrita permitida é o arquivo prompts/02-plano-da-base-resposta.md e uma linha nova no index.md registrando a pasta prompts/ (o histórico do que foi pedido ao Claude Code e do que ele respondeu).
- Não escreva nada em base/, não crie o CONTEXT.md, não altere nada em fontes/.
- Não invente: cada item tem a sua fonte. O que não existir nas fontes vira "não encontrado".
- Respeite o status de cada decisão. O que está pendente de aprovação do Júnior e do Euclides continua pendente no plano.
- Não use travessão.
- Não faça commit nesta etapa.

No fim, me diga em até 10 linhas o que você encontrou de mais importante e espere a minha aprovação.
