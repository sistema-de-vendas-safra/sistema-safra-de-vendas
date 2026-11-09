# 10 · Resposta · protótipo ligado e testado

Feito em 09/11/2026, direto, sem subagentes, num commit só ("10 · prototipo ligado e testado").

- **entregas/prototipo-funil-01/LIGAR.md** v2 para v3: porteiro nos passos 3.8 e 3.9 (com o porquê e o PAREI), Erro 4 (`banco-401`), aviso entre 4.6 e 4.7, campo Seu nome na parte 5 e a linha "Ligado e testado em 09/11/2026".
- **conexoes.md:** segredos do Worker em 09/11/2026 (valor errado às 08h24 e 08h25, regravados às 08h53 e 08h55; CHAVE_PLANILHA às 08h29); planilha do SDR e Apps Script criados em 09/11/2026; "Última troca" atualizada.
- **log.md:** entrada do pedido 10; na limpeza da #102, a linha real do Otávio de 09/11, 08h56, no banco (pessoas e evento) e na planilha (linha 2); observação do relatório do eliminatório (14.7).
- **index.md:** protótipo ligado e testado em 09/11/2026; LIGAR.md v3; planilha rodada no Google.

Nenhum dado pessoal real, nenhuma chave, nada publicado, nada em fontes/.

## Perguntas para o Otávio

**10.1 · wrangler tail sem o filtro `--method POST` no Erro 4.**
- Dúvida: o pedido manda usar `wrangler tail --format pretty` sem filtro, e a v2 recomendava sempre `--method POST`, porque os pedidos da planilha (GET) mostram o cursor no endereço (id interno de pessoa; 26.5).
- O que foi feito: o comando do pedido, como escrito, porque sem os GET não se vê o `banco-401` da busca da planilha; com um aviso de não copiar nem fotografar e de parar com Ctrl+C assim que vir a linha. O comando com filtro do Erro 1 ficou como estava.
- Recomendação: manter assim no protótipo de teste; quando houver lead de verdade, usar o filtro e ver a busca da planilha só pelas Execuções do Apps Script.
- Se decidir diferente: acrescentar `--method POST` ao comando do Erro 4 e dizer que o erro da planilha se vê só no Supabase (Logs, API Gateway).
