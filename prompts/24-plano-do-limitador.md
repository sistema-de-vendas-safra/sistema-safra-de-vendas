# 24 · Plano · o limitador por IP que não segura no ar

Pedido do Otávio, 25/11/2026, 19h30, na conversa com o Claude no Mac: um plano para 26/11 à tarde, **sem mudar código nem publicar nada**. Os anúncios sobem em 26/11, às 11h, sem o limitador (decisão dele; o limitador é P1 e não bloqueia os anúncios). Nada deste plano foi aplicado.

## O que se sabe hoje

- No ar está a versão 72dc8101 (garçom v7, wrangler.toml v15). A saída do deploy listou env.LIMITE_FIM_QUIZ (10 pedidos por 60 segundos), env.LIMITE_EVENTO e env.LIMITE_REGISTRO: o binding existe.
- Teste das recusas do passo 6 (log.md, 25/11/2026): 20 pedidos em rajada (19h21) e 20 espaçados de 3 em 3 segundos (19h27 a 19h28), todos com o corpo `{}`. **40 respostas 422, nenhuma 429.** A tabela recusas mostra fim-quiz/protecao-faltando com 40: a contagem funciona.
- No garçom, a conferência do limite vem antes de tudo (entregas/garcom/garcom.mjs, portaPublica). Mas `dentroDoLimite` deixa o pedido passar **em silêncio** em três casos: o limitador não existe no env; `limit()` dá erro; a resposta não traz `success` igual a `false`. Hoje não há como saber, pelo log, qual dos três aconteceu, ou se `limit()` está respondendo `success: true` a todos.
- A documentação da Cloudflare (Workers Rate Limiting, lida em 25/11/2026) diz que o limite é "aproximado", que as contagens são "eventualmente consistentes" e valem por local; ainda assim, 20 pedidos em 1 minuto, do mesmo IP, para um limite de 10 por minuto, deveriam dar algum 429.

## a. A menor mudança no garçom: registrar quando o limitador falha

Só a função `dentroDoLimite` muda, mais o nome da porta na chamada. O comportamento continua o mesmo (na dúvida, o lead passa); o que muda é que cada caso estranho vira uma linha no log da Cloudflare, **sem o IP** (o IP é a chave pedida ao limitador e nunca entra no registro, nem na mensagem do erro).

```js
async function dentroDoLimite(limitador, request, nome) {
  if (!limitador || typeof limitador.limit !== 'function') {
    registrar(nome + ': limitador-ausente');
    return true;
  }
  const ip = request.headers.get('CF-Connecting-IP') || 'sem-ip';
  try {
    const r = await limitador.limit({ key: ip });
    if (!r || typeof r.success !== 'boolean') {
      // só o formato da resposta: os nomes dos campos e o tipo de success, nunca valores
      registrar(nome + ': limitador-resposta-sem-success campos=' + (r ? Object.keys(r).join(',') : String(r))
        + ' tipo=' + (r ? typeof r.success : '-'));
    }
    return !r || r.success !== false;
  } catch (e) {
    // só o nome do erro: a mensagem pode trazer a chave (o IP)
    registrar(nome + ': limitador-erro ' + ((e && e.name) || 'erro'));
    return true;
  }
}
```

Na chamada: `dentroDoLimite(env[porta.limite], request, nome)`.

O que vem junto, para ficar no padrão da casa:
- **Testes** (entregas/garcom/teste/testar-garcom.mjs): o caso que já existe "limitador em falha: na dúvida, o lead passa" passa a conferir também a linha `limitador-erro` no registro; dois casos novos, "limitador sem success" (devolve `{}`) e "limitador ausente", cada um conferindo que o lead passa, que a linha aparece e que nenhuma linha do registro tem o IP de teste.
- **Versões:** garcom.mjs e README v7 para v8; log.md com o motivo. O wrangler.toml não muda.
- **Publicação:** um roteiro curto (APLICAR-25), no padrão dos anteriores: testes na máquina, deploy com a chave publicar-aplicar-24b pela variável de ambiente (o login OAuth saiu do Mac em 25/11), anotar a versão anterior (72dc8101) para voltar atrás.

**Um passo opcional, só para o diagnóstico:** se o tail do item b não mostrar nenhuma das três linhas, quer dizer que `limit()` está respondendo `success: true` a todos. Para confirmar, uma versão temporária pode registrar também `limitador-ok` ou `limitador-nao` em cada pedido (sem o IP), por uma hora, e sair na versão seguinte. Só com a sua autorização, porque gera uma linha por pedido.

## b. Como testar com o wrangler tail

Depois de publicar a v8, com a sessão do Claude aberta na janela onde a variável CLOUDFLARE_API_TOKEN existe (o terminal desta conversa não a enxerga):

1. **Terminal 1, o tail** (fica escutando; o nome do Worker é o do wrangler.toml):
   ```
   nucleo/ferramentas/prototipo/node_modules/.bin/wrangler tail safra-prototipo-funil-01 \
     --config entregas/prototipo-funil-01/wrangler.toml --format pretty --method POST --search limitador
   ```
   `--search` filtra pelo texto do console.log; `--method POST` deixa de fora as visitas. Sem o `--search`, aparecem também as linhas `[garcom] fim-quiz: recusado: protecao-faltando` de cada pedido, o que serve para ver que o tail está pegando o tráfego. Opções conferidas no `wrangler tail --help` da versão 4.158.0: --format (json, pretty), --status, --method, --search, --ip ("self" filtra o próprio IP), --header, --sampling-rate, --version-id.
2. **Terminal 2, os pedidos:** os mesmos 20 do passo 6, corpo `{}`, com a origem do site, um a cada 3 segundos, com a hora de cada resposta. Com a sua autorização, como em 25/11.
3. **Como ler:**

| O tail mostra | Quer dizer | Próximo passo |
|---|---|---|
| `limitador-ausente` | o env do Worker no ar não tem o binding, apesar da saída do deploy | conferir a versão no ar (deployments list) e o wrangler.toml publicado |
| `limitador-erro <nome>` | `limit()` dá erro no ar | levar o nome do erro à documentação e, se for preciso, ao suporte da Cloudflare |
| `limitador-resposta-sem-success` | a resposta tem outro formato | ajustar a leitura da resposta |
| nada, e todos 422 | `limit()` responde `success: true` a todos | o passo opcional do item a, para confirmar; depois, a alternativa do item c ou um limitador com Durable Object (que a documentação recomenda para limites exatos) |
| 429 a partir de algum pedido | o limitador voltou a segurar | registrar e fechar a P1 |

O tail não guarda nada: o que aparece na tela é o registro. O Claude copia para o log.md só as linhas `[garcom]`, sem IP.

## c. A alternativa sem código: uma regra de limite de taxa na zona gotriad.com.br

Pelo painel da Cloudflare, sem mexer no garçom. Segundo a documentação (WAF, "Rate limiting rules", tabela de disponibilidade, lida em 25/11/2026, por um resumo; vale conferir a tabela na página antes de criar):

| | Free | Pro |
|---|---|---|
| Quantas regras | 1 | 2 |
| Campos para escolher o pedido | só Path (e Verified Bot) | Host, URI, Path, Full URI, Query (e Verified Bot) |
| O método (POST) na regra | não | não (só a partir do Business) |
| Contagem por | IP | IP |
| Período da contagem | só 10 segundos | até 1 minuto |
| Tempo do bloqueio | só 10 segundos | até 1 hora |
| Resposta própria no bloqueio | não | sim (a padrão é 429) |

**Primeiro, conferir no painel qual é o plano da zona gotriad.com.br** (Overview da zona). O Claude não tem acesso a isso daqui.

**A regra, no plano Free** (Security rules → Create rule → Rate limiting rules):
- Nome: `fim-quiz por IP`.
- Quando: Path é igual a `/api/fim-quiz`.
- Mesmas características: IP.
- Quando passar de: **3 pedidos em 10 segundos**. Uma pessoa manda um fim de quiz por análise; 3 em 10 segundos ainda cobre algumas pessoas na mesma operadora.
- Ação: Block. Duração: 10 segundos.
- Deploy.

No plano Pro dá para chegar perto do que o garçom pretendia: **10 pedidos em 1 minuto**, Block por 1 minuto.

**O que muda com a regra, e os cuidados:**
- O pedido bloqueado não chega ao garçom: não entra na tabela recusas como `limite`; aparece nos eventos de segurança do painel da Cloudflare.
- Sem o método na regra (Free e Pro), ela conta qualquer pedido a /api/fim-quiz. Hoje só o quiz manda POST para lá; isso não muda nada na prática.
- A documentação não diz, nas páginas lidas, se a regra roda antes de um Worker com Custom Domain na mesma zona. **Conferir com o mesmo teste do passo 6:** se os pedidos depois do limite voltarem 429 da Cloudflare (e não 422 do garçom), a regra está segurando. Em 10 segundos, isso pede pedidos em rajada (os 20 seguidos do primeiro lote), com a sua autorização.
- No Free, o bloqueio de 10 segundos é curto: segura uma enxurrada, não um robô paciente. As outras três barreiras continuam.
- O limitador do garçom pode ficar como está; os dois juntos não atrapalham.

## A recomendação

Fazer as duas coisas, nesta ordem: **a regra do item c primeiro** (dez minutos no painel, sem publicar código, e já protege os anúncios), conferida com o teste em rajada; **depois o item a e o b**, para descobrir por que o limitador do Worker não segura. Se o diagnóstico mostrar que `limit()` responde `success: true` a todos, a decisão entre manter só a regra da zona ou trocar o limitador por um Durable Object fica com você.

## Perguntas para o Otávio

1. **O plano da zona.** Dúvida: a zona gotriad.com.br está no Free ou no Pro? Feito: o plano traz a regra para os dois. Recomendação: conferir no painel antes de criar. Se for Business ou acima, dá para incluir o método POST e contar em 1 minuto.
2. **O limite da regra no Free.** Dúvida: 3 em 10 segundos é o número certo? Feito: proposto 3, porque o Free só conta em 10 segundos. Recomendação: 3. Se preferir mais folga para operadoras, 5; menos que 3 arrisca bloquear quem clica duas vezes.
3. **O passo opcional do diagnóstico** (uma linha por pedido por uma hora). Feito: deixado de fora do plano principal. Recomendação: só se o tail não mostrar nenhuma das três linhas.
