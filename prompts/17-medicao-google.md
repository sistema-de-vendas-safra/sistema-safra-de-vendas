# 17 · Medição com o Google: Tag Manager, aviso de cookies e política

Escrito em 12/11/2026, 13h45, pelo mentor. Pedido curto, em três partes. Roda numa sessão nova do Claude Code online, no ambiente "sistema-de-vendas-safra", com o CLOUDFLARE_API_TOKEN ainda nas variáveis do ambiente (vale até 16/11/2026), depois que a sessão da conferência da visita (201) terminar.

Estas respostas são a aprovação do Otávio para as mudanças de sentido que elas pedem: onde a regra de versionamento mandaria transformar em pergunta, aplique e registre como "decisão do Otávio, 12/11/2026".

## Para que serve

Medir o funil com as ferramentas do Google sem quebrar o que a casa promete. Hoje a política (politica-de-privacidade v2, item 7) diz que as páginas não usam ferramenta de outra empresa que colha dados de quem visita, e a #114 (6.2) diz que nada é guardado no navegador. Este pedido desfaz as duas pelo caminho mais conservador: o Google só carrega depois do "Aceitar" num aviso de cookies, o navegador guarda só a escolha, e o código da visita (id_sessao) não vai ao Google.

## As respostas do Otávio

- "Vamos instalar o google tag manager, google search console, google analytics." (12/11/2026)
- Contêiner do Tag Manager criado pelo Otávio em 12/11/2026: conta "Sistema de Vendas Safra", contêiner "gotriad.com.br", plataforma Web, código **GTM-T6L4QTB8**. O código não é segredo: aparece no código de qualquer página que usa o Tag Manager. Pode ir para arquivo.
- Domínio do funil: gotriad.com.br (Otávio, 12/11/2026). Ainda não apontado.
- Leitura do mentor, apresentada ao Otávio em 12/11/2026 sem objeção: aviso de cookies com "Aceitar" e "Recusar" do mesmo peso; nada do Google antes do "Aceitar"; anúncio sempre negado até decisão nova; o id_sessao fora do que vai ao Google. O texto do aviso é rascunho até o Otávio aprovar.
- Fora deste pedido: o Google Analytics, que o Otávio liga dentro do Tag Manager com o mentor depois da publicação, e o Google Search Console, que entra depois do domínio, verificado por DNS. Nenhum dos dois entra no código da página.

## Como trabalhar

- Leia CLAUDE.md. Valem a Regra de pausas e todas as regras da casa. Dúvidas no fim da resposta, pelo caminho conservador.
- Três partes, um commit cada ("17.1 · ...", "17.2 · ...", "17.3 · ..."), direto na main pela exceção da regra 7. Este arquivo entra no primeiro commit. Em cada parte, um subagente escreve e outro, que não viu a escrita, revisa contra este pedido e contra o repositório.
- Este pedido é a autorização para publicar uma vez, na parte 17.3, pelo passo 4.3 do APLICAR-11.
- Proibido: mexer no programa empacotado da landing-page-02 (assets/) ou no texto da landing e do quiz; carregar qualquer coisa do Google antes do "Aceitar"; mandar o id_sessao ao Google; entrar no Tag Manager, no Analytics ou no Search Console, que são contas do Otávio; tirar o noindex (#101); rodar SQL no Supabase; escrever, mostrar ou registrar valor de token; dado pessoal; mexer em fontes/; push fora do que a regra 7 permite.
- Não precisa liberar endereço do Google na rede do ambiente: as conferências provam que o pedido ao Google sai depois do "Aceitar", não que ele volta. Enquanto o Otávio não publicar o contêiner, o Google responde 404 ao gtm.js, e isso é esperado.
- Nunca travessão. Use ponto médio.

## 17.1 · Registrar a decisão

1. **base/decisoes.md**, versão nova, decisão no próximo número livre (hoje, #116): medição com o Google Tag Manager (GTM-T6L4QTB8), carregado só depois do "Aceitar" no aviso de cookies; o navegador guarda só a escolha; anúncio negado; o id_sessao não vai ao Google; o Analytics é ligado dentro do Tag Manager pelo Otávio; o Search Console vem depois do domínio. Com a frase do Otávio. Substitui em parte a #114 (6.2): até o "Aceitar", a página continua sem guardar nada e sem falar com ninguém de fora. O pedido 13 diz "a partir da #116": registre na resposta que ele passa a começar no próximo número livre.
2. **entregas/documentos/politica-de-privacidade.md**, versão nova, item 7 reescrito: o que fica no navegador (só a escolha, e com que nome); o que carrega depois do "Aceitar" (Google Tag Manager e Google Analytics, do Google); o que o Google Analytics registra (conferir na documentação do Google e não ir além dela); que o código da visita não vai ao Google; que recusar não muda nada na página; como mudar a escolha depois. Base legal e transferência internacional ficam {{a definir: jurídico da empresa que assina a política (#103)}}. O Google entra na lista de operadores. Status continua rascunho, com os três aprovado_por pendentes.
3. **entregas/documentos/aviso-de-cookies.md**, documento novo (id aviso-de-cookies, versão 1, rascunho, otavio pendente): o texto do aviso, curto, em português simples, sem fato inventado, com "Aceitar", "Recusar" e o link para a política ({{a definir: link da politica de privacidade}}, como no quiz). Depende de politica-de-privacidade.
4. **Cascata** pela regra de versionamento. **conexoes.md:** linhas novas do Google Tag Manager (conta, contêiner, código, login no Gmail do Safra, criado em 12/11/2026 pelo Otávio), do Google Analytics (a criar pelo Otávio) e do Google Search Console (depois do domínio). **log.md** e **index.md**.

## 17.2 · Aviso e Tag Manager na montagem

1. Tudo entra pela montagem (entregas/prototipo-funil-01/montar-site.mjs), nos HTML montados, nunca nas entregas: o / da landing-page-02 e o /quiz/. O código GTM-T6L4QTB8 mora num lugar só, lido pela montagem.
2. O que a montagem acrescenta em cada página:
   - antes de tudo, o padrão de consentimento do Google com tudo negado (análise e os três de anúncio);
   - o aviso de cookies, com o texto do aviso-de-cookies e os dois botões com o mesmo peso visual; usável pelo teclado; no visual da landing-page-02;
   - ao "Aceitar": guardar a escolha, mudar só a análise para concedida, pôr na camada de dados (dataLayer) a variável `pagina_limpa` com o endereço da página sem o id_sessao e, só então, carregar o Tag Manager;
   - ao "Recusar": guardar a escolha e não carregar nada;
   - com a escolha já guardada, o aviso não aparece de novo: quem aceitou na landing não vê o aviso no quiz, e o Tag Manager carrega direto;
   - um jeito discreto de reabrir o aviso e mudar a escolha, sem cobrir nenhum botão. Se no quiz não houver lugar bom, deixe só na landing e registre como pergunta.
3. O aviso nunca cobre o botão "Fazer a Análise" nem a barra fixa do rodapé do quiz no celular.
4. A conferência da montagem continua barrando qualquer arquivo de outro endereço no HTML. A única exceção é o carregador do Tag Manager, que só roda depois do "Aceitar".
5. **Testes** (ensaio e testar-quiz-01), em 375, 360 e 1440 pixels:
   - os testes de hoje continuam passando sem tocar no aviso, inclusive "nenhuma requisição para outro endereço". Se o aviso atrapalhar um clique, o problema é do aviso, não do teste;
   - sem escolha e com "Recusar": nenhuma requisição para outro endereço;
   - com "Aceitar": a primeira requisição para outro endereço é www.googletagmanager.com/gtm.js?id=GTM-T6L4QTB8, e nenhuma vai a lugar fora do Google; a `pagina_limpa` não tem o id_sessao; a escolha passa da landing para o quiz;
   - o aviso não cobre os botões;
   - prova de que o teste pega erro: com o carregador forçado a rodar antes do "Aceitar", o teste falha. Desfaça depois.
6. Montagem com "Tudo certo".

## 17.3 · Publicar, conferir e fechar

1. Publicar pelo passo 4.3 do APLICAR-11. Anotar o Current Version ID novo e o anterior (fd6ba97b).
2. Conferir no ar, num navegador sem tela, as mesmas provas do 17.2, no endereço do protótipo. Se a página ou o quiz não abrirem, voltar para a fd6ba97b (wrangler rollback) e contar ao Otávio. A conferência grava no banco visitas e início do quiz sem pessoa: registrar a hora.
3. Registros: README do protótipo, conexoes.md, index.md, log.md.
4. Resposta em prompts/17-medicao-google-resposta.md: o Version ID; o texto do aviso na íntegra, para o Otávio ler; o que fica guardado no navegador e com que nome; as perguntas. Não criar o ESTADO.md, que é do pedido 14; se ele já existir, reescrever.
5. No fim da resposta, a lista dos commits que subiram (regra 7) e, em duas linhas, o lembrete do token: apagar a variável CLOUDFLARE_API_TOKEN do ambiente e revogar o token na Cloudflare na última publicação da semana, até 16/11/2026.

## Como saber que deu certo

No ar: sem clicar no aviso, a página não fala com ninguém de fora; depois do "Aceitar", ela pede o gtm.js do GTM-T6L4QTB8 e nada fora do Google; o aviso não volta no quiz; nenhum botão fica coberto no celular.
