# Perguntas da fila da madrugada

Dúvidas das etapas 20 a 27 (prompts/08-fila-da-madrugada.md), no formato de sempre: Dúvida, O que foi feito, Recomendação, Se decidir diferente. Cada escolha provisória seguiu o caminho mais conservador (Regra de pausas, CLAUDE.md).

## Etapa 20

20.1. **A regra 3 da segurança ainda diz ".env no Mac".**
   - *Dúvida:* nucleo/regras/seguranca.md, regra 3, diz que no Mac a chave mora num arquivo .env fora do Git. O desenho do protótipo não usa .env para chave nenhuma: os valores vão direto do painel do serviço para o cofre (Cloudflare, propriedades do Apps Script), sem passar por arquivo da máquina.
   - *O que foi feito:* a regra 3 ficou como estava, porque mudar o lugar da chave é mudança de sentido em documento decidido. Só a seção "Detector de chaves" mudou (forma, v2).
   - *Recomendação:* trocar a regra 3 por "Chave mora no cofre do serviço que a usa (variáveis secretas da Cloudflare, propriedades do Apps Script). Nenhuma chave passa por arquivo da máquina, nem .env." O .gitignore e o .claude/settings.json continuam barrando .env, como cerca.
   - *Se decidir diferente:* se o .env no Mac continuar valendo, nada muda no detector nem nos bloqueios; só o roteiro de amanhã (etapa 26) precisa dizer como criar o .env sem passar pelo chat.

20.2. **O bloqueio de comandos pega também buscas comuns.**
   - *Dúvida:* a sintaxe com curinga ("Bash(grep *.env*)") barra qualquer comando que tenha ".env" no meio, inclusive `grep -rn "process.env" .`, que não lê arquivo de segredo.
   - *O que foi feito:* ficou o bloqueio largo, o caminho mais restritivo. O Claude ainda pode buscar com a ferramenta de busca própria ou com outro termo (por exemplo "env.").
   - *Recomendação:* manter; o incômodo é pequeno e o bloqueio é cerca, não muro: comandos como `python3 -c` ou `xxd` ainda leriam o arquivo. A proteção principal é não existir chave em arquivo da máquina.
   - *Se decidir diferente:* se a busca por "process.env" fizer falta, trocar as regras de grep por formas mais estreitas (por exemplo "Bash(grep * .env)" e "Bash(grep * ./.env*)"), aceitando que alguma variação escape.

20.3. **Sem Node, o gancho bloqueia o commit.**
   - *Dúvida:* o gancho precisa do Node. Programas abertos pelo Finder, como o GitHub Desktop, às vezes não enxergam o Node do Homebrew; um commit feito por lá poderia ser barrado.
   - *O que foi feito:* o gancho acrescenta /opt/homebrew/bin e /usr/local/bin ao caminho de busca; se mesmo assim não achar o Node, bloqueia o commit com um aviso em português (o caminho mais seguro). O push pelo GitHub Desktop não roda o gancho e não é afetado.
   - *Recomendação:* manter; pela regra 7 do CLAUDE.md quem faz os commits é o Claude, pelo terminal, onde o Node existe.
   - *Se decidir diferente:* se o gancho tiver de deixar passar quando não houver Node, troca o `exit 1` do aviso por `exit 0`, e o commit sem Node passa sem conferência.

20.4. **Os dependentes da segurança apontam para a v1.**
   - *Dúvida:* sete documentos citam regra-seguranca versão 1 em depende_de (funil-01, planilha-sdr, planta-do-banco, banco-rascunho, landing-page-01-estrutura, politica-de-privacidade, garcom). A v2 é só forma, mas a cascata manda marcar e propor.
   - *O que foi feito:* os sete já estavam com desatualizado: true por outros motivos; nenhum foi alterado. A troca para a versão 2 fica proposta.
   - *Recomendação:* trocar regra-seguranca 1 para 2 em cada um na próxima vez que ele subir de versão, como forma.
   - *Se decidir diferente:* se a troca tiver de ser já, são sete correções de forma (versão sobe 1, depende_de muda, nada mais), com sete linhas no log.

20.5. **Todo .env.* é barrado, inclusive um exemplo.**
   - *Dúvida:* o pedido barra qualquer .env.*; um arquivo de exemplo como .env.exemplo, sem valor, também seria recusado.
   - *O que foi feito:* barra todos, sem exceção, como no pedido e no .gitignore. Exemplos de configuração usam outro nome (como entregas/garcom/wrangler.toml.exemplo).
   - *Recomendação:* manter.
   - *Se decidir diferente:* se um .env.exemplo for útil, abrir exceção só para esse nome no detector (examinarNome) e no .gitignore (!.env.exemplo); o conteúdo continua sendo examinado.

20.6. **.dev.vars.* entrou junto com .dev.vars.**
   - *Dúvida:* o pedido fala em .dev.vars; o wrangler também lê variantes como .dev.vars.staging.
   - *O que foi feito:* .gitignore, .claude/settings.json e o detector tratam .dev.vars.* igual a .dev.vars, como já se fazia com .env e .env.*.
   - *Recomendação:* manter.
   - *Se decidir diferente:* tirar as quatro linhas de .dev.vars.* (uma no .gitignore, duas no settings, uma condição no detector); nada mais muda.

20.7. **O README do detector ganhou cabeçalho de rascunho.**
   - *Dúvida:* a regra de versionamento vale para base/, funis/ e entregas/; nucleo/ferramentas/ não tem cabeçalho até aqui. O pedido da fila diz que tudo o que ela produz nasce como rascunho, com cabeçalho e versão.
   - *O que foi feito:* nucleo/ferramentas/detector-de-chaves/README.md nasce com cabeçalho (id detector-de-chaves, v1, rascunho, otavio: pendente, depende de regra-seguranca 2).
   - *Recomendação:* manter; o detector é a ferramenta que a regra decidida exige, e o cabeçalho mostra de qual versão da regra ele parte.
   - *Se decidir diferente:* tirar o cabeçalho, deixando o README como os outros de nucleo/ferramentas/; a linha do log e do índice perdem a versão.

20.8. **O que o detector deixa passar.**
   - *Dúvida:* para não barrar os commits normais da casa, algumas formas escapam: token da Cloudflare sem a palavra Cloudflare ou wrangler na mesma linha; valor atribuído a nome de segredo que só tenha letras (sem número) e menos de 32 caracteres; valores com "exemplo", "mentira" ou ".invalid"; arquivos binários e zip.
   - *O que foi feito:* ficou assim; os casos estão no README ("Limites") e nos testes. Os formatos fortes (sb_secret_, sb_publishable_, JWT, AIza, chave privada) barram em qualquer lugar.
   - *Recomendação:* aceitar; o detector é cerca, e o desenho (nenhuma chave em arquivo da máquina) é a proteção principal.
   - *Se decidir diferente:* apertar a regra de atribuição (por exemplo, barrar qualquer valor de 16 caracteres sem espaço) obriga a revisar os falsos positivos que aparecerem nos arquivos rastreados antes de ligar.

20.9. **Barrar mais nomes e comandos do que o pedido.**
   - *Dúvida:* o pedido barra .env, .env.*, .dev.vars e .pem, e os comandos Bash só sobre .env e .dev.vars. Ficavam abertos `cat chave.pem` e afins, e os nomes .envrc, *.env (como secrets.env) e id_rsa*, que também guardam segredo.
   - *O que foi feito:* fui além do pedido, pelo lado seguro: o detector (examinarNome) e o .gitignore passam a barrar *.env, .envrc e id_rsa* (inclusive id_rsa.pub); o .claude/settings.json ganha o bloqueio dos mesmos comandos (cat, head, tail, less, more, grep, sed, awk, cp, source e o ponto) sobre *.pem. Nenhum arquivo rastreado hoje tem esses nomes.
   - *Recomendação:* manter.
   - *Se decidir diferente:* para desfazer, tirar as três linhas do fim do .gitignore (*.env, .envrc, id_rsa*), as duas condições novas em examinarNome no detector (e os casos de nome correspondentes no teste) e as onze linhas "Bash(... *.pem*)" do settings.
