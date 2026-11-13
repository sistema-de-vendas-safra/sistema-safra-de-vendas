# 21 · O funil em svsafra.gotriad.com.br e o quiz em /analise · partes 21.1 a 21.3

Escrito em 13/11/2026, 17h20, pelo mentor, a partir do pedido do Otávio na conversa de hoje.
Rodar sobre a main depois da publicação da landing-page-02 v4 (897c8fb). Não depende dos pedidos 13, 14 e 19.

Este pedido prepara tudo e não publica. O domínio ainda não está na Cloudflare: o Otávio está fazendo essa parte com o mentor.
Publicar antes de o domínio estar ativo derruba o site.

Estas respostas são a aprovação do Otávio para as mudanças de sentido que elas pedem:
onde a regra de versionamento mandaria transformar em pergunta, aplique e registre
como "decisão do Otávio, 13/11/2026".

## Como trabalhar

- Leia CLAUDE.md antes de começar. Valem a Regra de pausas e todas as regras da casa.
  Dúvidas no fim de prompts/21-dominio-e-caminho-da-analise-resposta.md, no formato de sempre, pelo caminho conservador.
- Uma parte por vez. Em cada parte, um subagente escreve e outro, que não viu a escrita,
  revisa contra este pedido e contra a base. Commit por parte ("21.N · nome curto").
  Este arquivo já está na main, subido pelo mentor: confira que ele existe e não o regrave.
- Push: vale a regra 7 como estiver no CLAUDE.md no dia em que rodar. Liste no fim da resposta os commits que subiram.
- Proibido: publicar (mesmo que o Otávio já tenha dito "publique" para outra coisa: esta publicação tem roteiro próprio);
  mexer em conta, domínio, DNS ou painel da Cloudflare; rodar SQL no Supabase de verdade; chave de verdade;
  dado pessoal real; mexer em fontes/; mudar texto de página (só endereços e caminhos mudam); inventar fato.
- Antes de escrever a configuração do wrangler, leia a documentação atual da Cloudflare sobre Custom Domains de Workers
  e sobre como o wrangler trata as rotas. Não escreva de memória.
- Nunca travessão. Use ponto médio.

## O pedido do Otávio

"Eu comprei o domínio gotriad.com.br, e queria colocar a landing page no endereço: svsafra.gotriad.com.br. O quiz eu quero colocar em svsafra.gotriad.com.br/analise" (13/11/2026, 17h03.)

Isso responde a pendência "domínio puro ou subdomínio": subdomínio, svsafra.

Leitura do mentor, para o que a frase não diz (mostrada ao Otávio na conversa; se ele decidir diferente, é ajuste pequeno):

1. **O endereço antigo não morre.** Quem abrir uma página em safra-prototipo-funil-01.sistemadevendassafra.workers.dev é levado para a mesma página no endereço novo, com tudo o que vinha no endereço (utm, id_sessao). Redirecionamento temporário (302), porque ainda é protótipo.
2. **O caminho antigo do quiz não morre.** /quiz/ leva para /analise/, com tudo o que vinha no endereço.
3. **A planilha do SDR não quebra.** Ela chama a porta privada do garçom pelo endereço antigo. A porta privada continua respondendo nos dois endereços, até a planilha ser apontada para o novo, que é passo do Otávio.
4. **O aviso para o Google não indexar continua** (#101), também no endereço novo. Tirar é outra decisão.
5. **O endereço puro gotriad.com.br fica de fora:** este pedido não cria nada nele.

## 21.1 · Registrar

- base/decisoes.md sobe de versão com a decisão nova no próximo número livre (deve ser a #120): a frase do Otávio, os cinco pontos acima como leitura do mentor, e a nota de que ela muda o endereço do protótipo (#101) sem mudar o resto da #101.
- conexoes.md: o endereço novo como "a valer depois da publicação do roteiro APLICAR-21"; o antigo continua anotado como o que está no ar. O domínio: registrado no Registro.br, com os servidores de DNS a caminho da Cloudflare (em andamento, pelo Otávio). Sem dado pessoal de ninguém.
- log.md com a entrada e a pendência "Domínio do funil (#120)", com o que falta: a zona ativa na Cloudflare, a publicação pelo roteiro, a planilha do SDR, o Google Analytics e o Tag Manager, o Search Console.
- Cascata pela regra de versionamento. Na resposta, avise que o pedido 13 passa a começar no número seguinte.

## 21.2 · O programa

1. **A montagem** (entregas/prototipo-funil-01/montar-site.mjs): o quiz passa a ser montado em /analise/ no lugar de /quiz/, com as fontes e a imagem dele junto.
2. **Os caminhos dentro das páginas:** tudo o que hoje aponta para /quiz/ passa a apontar para /analise/: as chamadas da landing-page-02 (programa do fim de pagina/index.html), os links da página da política e do aviso de cookies, e o que o próprio quiz usar. Nenhum texto visível muda. Se algum texto visível citar o endereço, não mexa: liste.
3. **O garçom** (entregas/garcom/garcom.mjs):
   - no endereço antigo, pedido de página leva (302) ao endereço novo, no mesmo caminho, com /quiz virando /analise e a consulta preservada;
   - no endereço novo, /quiz e /quiz/ levam (302) a /analise/, com a consulta preservada; /analise sem a barra final funciona;
   - a porta pública (o envio do lead e os eventos) aceita a origem nova; a porta privada responde nos dois endereços;
   - o cabeçalho de não indexar continua em toda resposta.
4. **A configuração** (entregas/prototipo-funil-01/wrangler.toml): o Custom Domain svsafra.gotriad.com.br, do jeito que a documentação atual manda; o endereço workers.dev continua ligado; ORIGEM_PERMITIDA com o endereço novo. O endereço antigo entra como variável comum, se o garçom precisar dele para redirecionar. Sem id de conta e sem segredo no arquivo, como hoje.
5. **A medição** (medicao.mjs e medicao.json): confira que pagina_limpa e origem_limpa continuam certas com o caminho novo. Não mexa no Tag Manager nem no Analytics: liste na resposta o que o Otávio vai precisar trocar lá.
6. **O banco e o catálogo:** se alguma coisa gravada no banco ou no catálogo depender do caminho /quiz/ ou do endereço antigo, não mude o banco: registre como pergunta, dizendo o que quebra e o SQL que seria preciso.
7. READMEs e versões do que mudar (protótipo, garçom, landing-page-02, quiz, ferramentas), com depende_de em dia.

## 21.3 · Ensaio, roteiro e fechamento

O que provar, tudo local, como o ensaio já faz:
- O ensaio sobe de versão e passa inteiro com o quiz em /analise/. Conferências novas: as chamadas da landing levam a /analise/ com as utm e o id_sessao, em 1440, 375 e 360; /quiz/ leva a /analise/ com a consulta inteira; um pedido de página com o nome do endereço antigo é levado ao novo, no mesmo caminho; a porta pública aceita a origem nova e recusa a antiga; a porta privada responde com os dois nomes; o cabeçalho de não indexar está em tudo, inclusive nos redirecionamentos; os links da política e do aviso de cookies abrem; o quiz vai do começo ao relatório, nos três desfechos, em /analise/.
- Os testes do garçom e do quiz passam, atualizados para o caminho novo.
- Prova de que o ensaio pega o erro: devolva de propósito uma chamada da landing para /quiz/ e tire o redirecionamento, rode, mostre a falha, desfaça e confira que os arquivos voltaram iguais.

O roteiro para o Otávio, em entregas/prototipo-funil-01/APLICAR-21.md, um passo por ação, no formato da casa (o porquê, "Faça", "Deu certo se", "Se der errado"), sem pedir chave nenhuma:
- Passo 0, que trava os outros: como ver, no painel da Cloudflare, que o domínio gotriad.com.br está ativo na conta do Safra. Sem isso, parar.
- Ligar o endereço svsafra.gotriad.com.br ao Worker. Dois caminhos, com a recomendação: pela publicação do wrangler, se o token do ambiente tiver permissão para o domínio; ou por cliques no painel (o roteiro diz quais). Diga o que acontece com o token atual, que vence em 16/11/2026, sem mostrar valor nenhum.
- Publicar, pelo jeito de sempre, e conferir no ar pelo endereço novo e pelo antigo. A conferência no ar entra no roteiro como lista do que olhar; quem roda é o Claude, quando o Otávio pedir a publicação.
- Como voltar atrás, se der errado (a versão anterior e o que desfazer no painel).
- Depois: a planilha do SDR (onde trocar o endereço, nas propriedades do script); o Google Analytics e o Tag Manager; o Search Console.

Fechamento:
- index.md atualizado.
- prompts/21-dominio-e-caminho-da-analise-resposta.md: o que foi feito, com os commits; o que muda para quem abre o endereço antigo; a lista de tudo o que apontava para /quiz/ e foi trocado; o que ficou de fora e por quê; as perguntas para o Otávio; os commits que subiram.
- ESTADO.md: se já existir, reescreva; se não existir, não crie (é do pedido 14).
- Nada publicado, e o site no ar não foi aberto nem tocado.
