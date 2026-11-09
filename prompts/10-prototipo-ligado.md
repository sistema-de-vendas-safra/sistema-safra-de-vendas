# 10 · Registro do protótipo ligado e testado

Escrito em 09/11/2026, 09h15, pelo mentor. Registro e correção de forma: faça direto, sem subagentes, seguindo CLAUDE.md, num commit só ("10 · prototipo ligado e testado"). Este arquivo entra no commit. Nenhum dado pessoal real entra no repositório: onde aparece "a linha real do Otávio", registre só isso, sem nome completo, e-mail nem telefone.

## O que aconteceu em 09/11/2026 (registrar em log.md, conexoes.md e onde mais a casa mandar)

1. **Cofre do Worker.** SUPABASE_CHAVE_PUBLICAVEL e SUPABASE_CHAVE_SECRETA foram guardadas às 08h24 e 08h25 com valor errado: o botão de copiar do painel do Supabase falhou sem avisar, e o `pbpaste` entregou ao cofre o que já estava na área de transferência. O garçom registrou `fim-quiz: banco-401`; o diário do Supabase (Logs, API Gateway) mostrou `UNAUTHORIZED_INVALID_API_KEY` nas duas portas, inclusive na busca da planilha. As duas foram regravadas às 08h53 e 08h55 com um porteiro que confere o começo da chave antes de mandar ao cofre. CHAVE_PLANILHA gerada e guardada às 08h29, no cofre e nas propriedades do script. `wrangler secret list` mostra os três nomes.
2. **Planilha do SDR.** Criada em 09/11 no Drive do Safra com o nome "TESTE planilha do SDR funil-01". Projeto do Apps Script "planilha-sdr-funil-01", aberto de dentro da planilha. Propriedades GARCOM_URL e CHAVE_PLANILHA. Manifesto colado. instalar() rodada e autorizada (só as três permissões). Aba fila com os 19 cabeçalhos e gatilho de 5 minutos ativo.
3. **Testes (08h56 a 09h10), todos certos:**
   - A linha real do Otávio (ele mesmo, com os dois aceites) entrou às 08h56: faixa a, nota 86, utm stories; chegou à planilha na busca seguinte.
   - TESTE Ana Roteiro (variante A, utm bio): nota 96, faixa a; na planilha, empresa "=1+1" ficou como texto.
   - TESTE Bruno Roteiro (eliminatório, utm stories): gravado no banco com faixa eliminatorio e **não** entrou na planilha; o quiz foi ao relatório de quem não se qualifica.
   - TESTE Duplo Roteiro (duas abas, envios a 0,48 s um do outro): uma pessoa só no banco, dois eventos fim_quiz, uma linha só na planilha.
   - Texto do consentimento chegou ao banco com os acentos certos ("Você pode retirar...").
   - Busca da planilha rodada de novo: 0 novas, 0 repetidas.
   - Não provado: envio realmente simultâneo (o mesmo limite da pergunta 21.15).

## O que mudar

1. **LIGAR.md (versão nova, forma com o que aconteceu):**
   - Passos 3.8 e 3.9 passam a usar o porteiro. Publicável:
     `if pbpaste | tr -d '[:space:]' | grep -q '^sb_publishable_'; then pbpaste | tr -d '[:space:]' | nucleo/ferramentas/prototipo/node_modules/.bin/wrangler secret put SUPABASE_CHAVE_PUBLICAVEL --config entregas/prototipo-funil-01/wrangler.toml; else echo "PAREI: o que esta copiado nao e a chave publicavel. Copie de novo no Supabase."; fi`
     Secreta:
     `if pbpaste | tr -d '[:space:]' | grep -q '^sb_secret_'; then pbpaste | tr -d '[:space:]' | nucleo/ferramentas/prototipo/node_modules/.bin/wrangler secret put SUPABASE_CHAVE_SECRETA --config entregas/prototipo-funil-01/wrangler.toml && pbcopy < /dev/null; else echo "PAREI: o que esta copiado nao e uma chave secreta. Copie de novo no Supabase."; fi`
     Explicar em uma linha por que (o botão de copiar falhou sem avisar em 09/11) e que, se der PAREI, é só copiar de novo e repetir (seta para cima e Enter).
   - Em "Se algo der errado", um erro novo: o garçom registra `banco-401`. Como ver: `wrangler tail --config entregas/prototipo-funil-01/wrangler.toml --format pretty` e, no Supabase, Logs, API Gateway, campo error_code. Se for `UNAUTHORIZED_INVALID_API_KEY`, o cofre tem valor errado: refazer 3.8 e 3.9 com o porteiro. Não precisa publicar de novo (o `secret put` já publica).
   - Parte 4: entre copiar o código (4.6) e colar (4.7), não copiar nada nem tirar print; se o editor mostrar outra coisa, copiar de novo.
   - Parte 5: o campo "Seu nome" do contato chega preenchido com o nome da primeira tela; apagar antes de escrever o nome completo.
2. **conexoes.md:** segredos do Worker gravados em 09/11/2026 (com o episódio do valor errado e a regravação); planilha do SDR e Apps Script criados em 09/11/2026; "Última troca" atualizada.
3. **log.md, Pendências:** na limpeza antes de ir ao ar (#102), citar nominalmente "a linha real do Otávio de 09/11, 08h56, no banco (pessoas e evento) e na planilha (linha 2)". Registrar como observação que o relatório do eliminatório mostrou números que não batem com as respostas (confirma a 14.7, relatório com exemplo fixo).
4. **index.md:** protótipo ligado e testado em 09/11/2026.

Proibido: publicar, push, chave de verdade, dado pessoal real, mexer em fontes/.

## Ao terminar

Responda em até 5 linhas: o que mudou, o commit e o que o Otávio faz em seguida (push).
