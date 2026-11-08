# Etapa 3 · Escrever a base

O plano em prompts/02-plano-da-base-resposta.md está aprovado, com as respostas abaixo. Agora a base é escrita em três lotes, em sequência, sem parar entre eles, a não ser que apareça algo que só eu posso decidir.

## Respostas às quatro perguntas do plano

1. **Glossário:** fica na raiz do repositório, com o nome de arquivo e o formato que a versão instalada da skill grill-with-docs (plugin mattpocock-skills 1.3.1) procura. Confira na skill antes de escrever. Se ela procura GLOSSARY.md, use GLOSSARY.md; se procura CONTEXT.md, use CONTEXT.md. Mantenha a linha _Fonte_ como extensão nossa. Registre a escolha no log.md.
2. **Oferta:** pendente-aprovacao, como você propôs.
3. **metodo e mecanismo:** separados, como você propôs.
4. **Ficha de fatos:** o documento como um todo é decidido, e cada campo tem o seu status. Os campos em conflito ficam bloqueados para entrega até a decisão.

## Os três lotes

- **Lote 1 · a espinha:** base/ficha-de-fatos.md, base/decisoes.md (#1 a #90, sem pular número) e base/lacunas.md.
- **Lote 2 · o produto:** base/produto.md, base/metodo.md, base/mecanismo.md, base/oferta.md, base/promessa.md e base/entregas-do-servico.md.
- **Lote 3 · voz, prova e marca:** base/persona.md, base/tom-de-voz.md, base/provas-e-conformidade.md, base/design-system/design-system.md e o glossário na raiz.

## Como conduzir

Você é o coordenador. Para cada lote, na ordem:

1. **Escrever.** Entregue o lote a um subagente, que começa com contexto limpo. Passe a ele: este arquivo, o plano (prompts/02-plano-da-base-resposta.md), o CLAUDE.md, nucleo/regras/versionamento.md e, a partir do lote 2, os documentos dos lotes anteriores de que ele depende. Peça de volta só um resumo curto do que foi escrito.
2. **Revisar.** Entregue o resultado a outro subagente, que não participou da escrita, com a lista de conferência abaixo. Peça de volta só os problemas encontrados.
3. **Corrigir ou parar.** Problema de forma (cabeçalho incompleto, travessão, depende_de quebrado, fato copiado fora da ficha, fonte faltando): corrija e revise de novo. Problema que exige decisão minha (um conflito sem dono, uma fonte que contradiz o plano, algo que o plano não previu): pare tudo e me pergunte.
4. **Registrar.** Atualize o index.md, registre no log.md o lote, os documentos criados e as versões, e faça um commit com a mensagem "base lote N".
5. Siga para o próximo lote.

Se a sessão for interrompida, ao recomeçar confira no log.md quais lotes já foram feitos e continue do próximo.

## Como escrever (vale para os subagentes)

- Siga o plano: o que entra em cada documento, de onde sai, status inicial e aprovado_por.
- Cabeçalho padrão de nucleo/regras/versionamento.md em todos, com versao: 1 e depende_de apontando para os documentos e versões em que cada um se apoia. Todo documento que cita um fato declara a ficha-de-fatos em depende_de.
- Fato não se copia: preço, prazo, número de entregas, valor da Análise e afins são citados pelo id do campo da ficha (por exemplo, ficha-de-fatos#preco-avancada).
- Cada item tem a sua fonte. O que não existir nas fontes vira "não encontrado". Não invente e não escolha um lado de conflito por mim.
- Texto aprovado entra literal, entre aspas.
- Não use travessão.
- Não altere nada em fontes/.

## Lista de conferência do revisor

- Nenhum travessão.
- Todo documento com o cabeçalho completo (id, versao, status, aprovado_por, depende_de, desatualizado).
- Todo depende_de aponta para um id que existe, na versão que existe.
- Nenhum valor de fato copiado fora da ficha de fatos.
- Todo item com fonte; nenhum item sem fonte apresentado como fato.
- O status de cada decisão bate com o do plano; nada pendente do Júnior e do Euclides aparece como aprovado.
- Nenhum conflito resolvido sem decisão minha.

## No fim

Quando os três lotes estiverem feitos, me diga em até 12 linhas o que foi feito, o que o revisor encontrou e corrigiu, e o que ficou para eu decidir. Não faça push.
