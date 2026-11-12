# 14 · ESTADO.md · o resumo de uma página para o mentor

Escrito em 10/11/2026, 12h30, pelo mentor. Pedido curto, sem fila. Pode rodar antes ou depois do pedido 13: não mexe em página, banco, garçom nem planilha.

## Para que serve

O mentor passa a trabalhar num projeto próprio do Claude, que lê este repositório pelo GitHub. O log.md passa de 140 KB e não serve de porta de entrada, e o resumo de cada fila muda de nome a cada rodada. Falta um arquivo de caminho fixo, de uma página, que diga como o sistema está agora e que seja reescrito no fim de toda rodada. Decisão do Otávio, 10/11/2026: o projeto do mentor tem de se atualizar sozinho depois de cada rodada de trabalho.

## Como trabalhar

- Leia CLAUDE.md. Valem todas as regras da casa. Dúvidas no fim da resposta, pelo caminho conservador.
- Um subagente escreve, outro, que não viu a escrita, revisa contra este pedido e contra o repositório. Um commit só ("14 · estado para o mentor"). Este arquivo entra no commit.
- Proibido: publicar, rodar SQL no Supabase de verdade, push fora do que a regra 7 permite, chave, dado pessoal, mexer em fontes/.
- Nunca travessão. Use ponto médio.
- Não aplique nada do pedido 13 aqui, mesmo que o arquivo dele esteja na pasta.

## O que fazer

1. **Criar ESTADO.md na raiz**, no formato abaixo, com no máximo 60 linhas. Ele não é documento da base: não tem cabeçalho de versão e não entra na cascata, como o index.md e o log.md. Não copia fato da ficha de fatos: cita o id do campo. Sem dado pessoal e sem chave. Cada linha aponta o arquivo onde está o detalhe.
2. **CLAUDE.md**, duas mudanças:
   - Na frase "O mapa do que existe está em index.md; o histórico e as pendências, em log.md.", acrescentar: "o resumo de como o sistema está agora, em ESTADO.md."
   - Regra nova, a 11: "**ESTADO.md sempre em dia.** No fechamento de todo pedido e de toda fila, reescrever o ESTADO.md inteiro, no formato do próprio arquivo, no mesmo commit do fechamento. É a porta de entrada do mentor: uma página, sem fato copiado, sem dado pessoal e sem chave."
3. **index.md:** a linha do ESTADO.md em "Raiz" e este pedido na linha de prompts/.
4. **log.md:** a entrada deste pedido e a mudança da regra 7 do CLAUDE.md, feita pelo mentor em 12/11/2026 por decisão do Otávio, para o trabalho no Claude Code online.
5. **Resposta** em prompts/14-estado-para-o-mentor-resposta.md, com as perguntas, se houver.

## Formato do ESTADO.md

```
# Estado do sistema

Atualizado em: DD/MM/AAAA, HHhMM · por: pedido NN (etapa NN, se houver) · commit anterior: 7 letras

## Em uma frase
[Onde o sistema está.]

## O que mudou na última rodada
[Até 5 linhas, cada uma com o arquivo.]

## No ar · protótipo de teste
[O que está publicado, pelo que o repositório registra. O que o repositório já tem e ainda não foi publicado.]

## Nas mãos do Otávio
[Roteiros por aplicar e em que parte pararam, se o repositório souber. Decisões por responder, com o caminho do arquivo.]

## Próximo pedido
[Pedidos salvos em prompts/ que ainda não têm resposta.]

## Travas para ir ao ar com gente de verdade
[As abertas das Pendências do log.md, uma linha cada, no máximo 10.]

## Para os sócios
[O que espera o Júnior e o Euclides: a pauta e a versão dela.]

## Onde olhar
[Resposta, perguntas, triagem e página de decisões da última fila.]
```

Onde o repositório não sabe uma coisa, escrever "sem confirmação", nunca supor.

## O que o mentor sabe e o repositório ainda não registra

Para a primeira versão do ESTADO.md. Registrar como informado pelo mentor em 10/11/2026.

- **APLICAR-11, em 09/11/2026.** Partes 1 a 4 feitas pelo Otávio, acompanhadas pelo mentor: push; migração 001 rodada, com "Success. No rows returned"; catálogo com as três linhas; conferir.sql com 18 de 18; planilha com o Codigo.gs v2, a aba antiga renomeada para "fila antiga", instalar() com "aba criada; gatilho mantido" e buscarLeadsNovos com "3 linha(s) nova(s), 0 repetida(s)"; site publicado, com o Current Version ID começando por c4235168. As páginas foram conferidas no ar: acentos certos, fontes servidas pelo próprio site, nenhum pedido a outro endereço.
- **Partes 5, 6 e 7 do APLICAR-11: sem confirmação.** Escrever assim. Não atualizar o conexoes.md por conta deste pedido: quem dispara essa atualização é a parte 7 do roteiro, quando o Otávio avisar.
- **Decisões.** Em 09/11/2026, 16h10, o Otávio respondeu prompts/11-decisoes-restantes.md com "Aceito todas as recomendações." A aplicação está em prompts/13-correcoes-e-decisoes-restantes.md, ainda não rodado, que só roda depois da parte 7 do APLICAR-11.
- **Pedido 12.** Descartado: a apresentação do funil está sendo feita no Claude Design. O registro do descarte no log.md fica com o pedido 13.
- **De 12/11 a 16/11/2026.** O Otávio está só no Windows, sem o Mac, e trabalha com o Claude Code online. Nada se publica nesse período: publicar depende do wrangler logado no Mac. Informado pelo mentor em 12/11/2026.
