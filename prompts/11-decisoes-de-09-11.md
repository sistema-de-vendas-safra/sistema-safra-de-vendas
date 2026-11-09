# 11 · Fila das decisões de 09/11 · etapas 30 a 36

Escrito em 09/11/2026, 11h10, pelo mentor, a partir das respostas do Otávio à página prompts/08-decisoes-em-uma-pagina.md. Estas respostas são a aprovação do Otávio para todas as mudanças de sentido que elas pedem: onde a regra de versionamento mandaria transformar em pergunta, aplique e registre como "decisão do Otávio, 09/11/2026".

## Como trabalhar

- Leia CLAUDE.md antes de começar. Valem a Regra de pausas e todas as regras da casa. Dúvidas em prompts/11-fila-perguntas.md, no formato de sempre, pelo caminho conservador.
- Uma etapa por vez. Em cada etapa, um subagente escreve e outro, que não viu a escrita, revisa contra este pedido e contra a base. Commit por etapa ("etapa NN · nome curto"). Este arquivo entra no primeiro commit.
- Proibido: publicar, rodar SQL no Supabase de verdade, push, chave de verdade, dado pessoal real no repositório, mexer em fontes/. O que precisar das mãos do Otávio (rodar migração, publicar, testar) vai para o roteiro da etapa 35.
- O protótipo está no ar e o banco de verdade já tem dados: mudança no banco é sempre **migração nova** (arquivo novo, que roda sobre o esquema v2 sem apagar nada), nunca o esquema inteiro de novo (21.11).

## As respostas do Otávio

**Aceitas como recomendado** (a resposta vale também para os complementos entre parênteses na página): 4.1, 4.4, 4.5, 4.6, 4.7, 4.8, 4.9, 5.2, 5.3, 5.4, 5.5, 5.7, 5.9, 6.1, 6.2, 6.4, 6.5, 6.6, 7.1, 7.3, 7.7, 8.1, 8.2, 8.5, 8.10, 8.11, 8.12, 8.13, 8.14, 8.15, 9.3, 9.5, 9.7, 9.8, 9.12, 9.15, 9.16, 9.17, 10.1, 10.2, 10.3, 10.5, 10.6, 10.7, 10.8, 10.9, 10.10, 10.12, 10.13, 10.14, 10.15, 10.16, 11.1, 13.15, 14.2, 14.4, 14.5, 14.7, 14.8, 14.9, 14.12, 14.13, 15.3, 15.4, 15.6, 15.10, 15.13, 15.14, 17.1, 17.5, 18.4, 18.5, 20.1, 20.2, 20.3, 20.8, 20.9, 21.5, 21.9, 21.10, 21.11, 21.12, 21.14, 22.1, 22.2, 22.4, 22.6, 22.7, 23.1, 23.3, 23.6, 23.7, 23.9, 23.11, 24.3, 24.6, 24.7, 24.8, 25.2, 26.3, 26.5, 26.6, 27.1, 27.2, 09.1, 09.2, 09.4.

**Fechadas pelo teste de 09/11** (registrar como fechadas): 21.6, 24.2, 24.12, 26.1, 26.2, 26.4, 26.7, 26.12, 25.1, 25.6, 09.3. Na 26.4, a chave secreta "default" do Supabase continua existindo e sem uso: vai para o roteiro da etapa 35 como ação do Otávio (apagar).

**Sem resposta, continuam abertas:** 18.6, 8.8, 10.4, 22.3, 24.5.

**Com resposta própria do Otávio:**

1. **16.4 (com 16.5, 16.6, 16.10) · Advogado:** a revisão jurídica não é responsabilidade do sistema. Tirar a revisão de advogado das travas de ida ao ar e dos avisos dos documentos (política de privacidade, LIGAR.md, log.md, pauta); registrar uma linha só: "revisão jurídica fica com a empresa que assina a política, fora do sistema". Os pontos da 16.4 ficam na política como estão.
2. **13.4 · Aceite:** uma caixa de aceite só, que já vem marcada; quem quiser, desmarca. O texto da caixa cobre o diagnóstico e o contato da equipe por WhatsApp (mensagem e ligação) e por e-mail (ver 16.12); escreva no tom da casa e liste o texto final para o Otávio conferir. Para não mexer na tabela do banco agora, a caixa única preenche os dois campos que já existem (consentimento_whatsapp e consentimento_email) com o mesmo valor e o mesmo texto aceito. Se a pessoa desmarcar: caminho conservador, o diagnóstico aparece na tela e nada é enviado ao banco nem à equipe; registre como pergunta.
3. **16.12 (com 15.8, 21.4) · Canais:** sim, o aceite cobre ligação no número do WhatsApp; com a caixa única, quem aceitou pode ser contatado por WhatsApp, ligação e e-mail. Roteiros do SDR e política seguem isso.
4. **6.8 (com 16.9, 18.10) · Prazo de guarda:** 12 meses, contados do último evento da pessoa. Entra na política de privacidade e na planta. O caminho de apagamento (o que se apaga, o que vira anônimo, quem faz e como fica registrado) vira pendência com prazo: escrito e testado antes de o primeiro dado real completar 12 meses.
5. **7.9 (com 8.4, 9.2) · Nome e duração:** a conversa de venda com o Júnior passa a se chamar **"Call de Direcionamento"**, tem **60 minutos** e é **conduzida pelo Junior Neves**. Registrar na ficha de fatos e aplicar onde a conversa aparece (landing, roteiros do SDR, oferta, mecanismo, glossário). Com a 4.5, é nela que fica a demonstração com os números do cliente. O nome público do diagnóstico do quiz (a Análise) **não** foi dado: continua "a definir" e vira pergunta. O item 7 da pauta vira "Para informar".
6. **8.3 (com 9.1) · Topo da página:** manter tudo o que veio do projeto anterior, inclusive as promessas. A promessa passa a valer por decisão do Otávio (base/promessa.md sai de pendente para decidido, aprovado_por otavio 09/11); o subtítulo neutro não entra. Se a página tiver dois topos, a 10.14 volta como pergunta, sem teste ligado. O item 5 da pauta vira "Para confirmar".
7. **9.14 · "Lucro":** o título vai com "lucro", sem esperar caso documentado. Tirar a marca de bloqueio desse título.
8. **7.5 · Quiz:** manter o quiz como está: não mudar a posição do aceite em relação ao pedido de contato e não tirar a promessa de percentual do fim do quiz. Registrar como exceção às regras de prova e conformidade, decidida pelo Otávio. As outras decisões que mexem no quiz (14.2, 13.4, 14.4, 14.5, 18.4, 18.5, 09.1, 10.7) valem. O item 29 da pauta continua com os sócios. Atualizar a linha da posição do Otávio nos itens 3 e 4 da pauta.
9. **5.1 · Funil:** o Otávio aprova o documento do funil-01 com data de 09/11/2026 e mantém a data de lançamento que está lá, aceitando alguns dias de atraso se precisar. Júnior e Euclides continuam aprovando junto com o item 1 da pauta.
10. **5.6 · Reels:** a palavra que o público comenta fica para depois; a ferramenta é o **ManyChat**. Registrar em conexoes.md como conta a criar, com a menor permissão, e anotar que o ManyChat depende da ligação com o Instagram, que é da Meta (fora do MVP até agora): vira pergunta sobre quando entra.
11. **26.3 e 26.6:** no protótipo, fica a chave publicável "default" e o wrangler continua logado; antes de ir ao ar, decidir se vale uma publicável só do garçom e fazer `wrangler logout` quando pausar.

## Etapa 30 · Registrar as decisões

- base/decisoes.md a partir da #103: as respostas próprias acima, uma decisão por item, e uma decisão-bloco para as aceitas como recomendado e as fechadas pelo teste, citando os números.
- prompts/11-respostas.md: tabela número · resposta · onde foi aplicada (preenchida ao longo da fila).
- Regras: versionamento (11.1), CLAUDE.md (4.8), segurança regra 3 (20.1) e a exceção da planilha no Drive (5.4) numa versão nova da regra 4, com acesso só do Otávio e de quem liga.
- Ficha de fatos: nome, duração e condutor da Call (7.9), prazo de guarda (6.8), ferramenta dos reels (5.6).

## Etapa 31 · Cascata nos documentos

Aplicar em todos os documentos que dependem das decisões (base, oferta, mecanismo, promessa, funil-01, planta, planilha-sdr, roteiros do SDR, política de privacidade, copy, estrutura e variantes da landing, copy e briefing do quiz, pauta), subindo versão e registrando em log.md. Com a 4.5 e a 11.1, tirar a marca de desatualizado de toda a cadeia que só dependia disso; o que ainda depende de algo marcado continua marcado.

## Etapa 32 · Banco: migração v3

- dados/banco/migracoes/ (pasta nova) com uma migração que roda sobre o esquema v2 com dados dentro, sem apagar nada, e pode rodar duas vezes: tipos de evento novos do clique no fim do quiz (18.4) e o que faltar para visita e início do quiz (18.5, 10.6, 10.8); as duas respostas a mais na função da planilha (15.4); qualquer outra mudança que as decisões peçam. A 6.6 (chaves por papel) fica como pendência até existir painel, contador ou volta do status.
- Atualizar conferir.sql para conferir o esquema depois da migração. Testar no PGlite: esquema v2, dados de teste, migração duas vezes, conferir.sql.

## Etapa 33 · Garçom v4

Aceitar os eventos novos (clique do fim do quiz, visita, início do quiz) pela porta pública com as mesmas travas; evento sem dado de pessoa não pede aceite. Tirar o pré-voo (22.2). Citar só a planta (23.11). Testes atualizados, todos os anteriores continuando certos.

## Etapa 34 · Páginas

- Quiz, versão nova: corte mais restritivo dos dois (14.2), caixa única já marcada e o comportamento ao desmarcar (13.4), campos de número vazios (14.4), valor médio obrigatório (14.5), nota guardada também no eliminatório (14.8), regras da 14.9, registro do clique no fim e do início do quiz (18.4, 18.5, 10.6), doctype (09.1) com prints novos em 375 e 1440 comparados aos atuais, fontes servidas junto com a página em vez do Google (10.7; fontes de licença livre, instaladas pelo npm em nucleo/ferramentas/ e copiadas pelo montador). Texto do quiz como está (7.5), salvo o da caixa de aceite.
- Landing, as duas variantes: registro de visita (18.5, 10.8, 10.9, 10.10), as mudanças de copy e de layout aceitas (8.x, 9.x, 10.2, 10.3, 10.16 e o que mais a página de decisões pedir), "Call de Direcionamento" onde a conversa aparece, fontes servidas junto (10.7), promessas do projeto anterior (8.3).
- 17.5: rascunhar, a partir de base/entregas-do-servico.md, a lista de peças que cada entrega instala, para o Otávio aprovar; até lá, a página fica como está nesse ponto.
- 14.7 e 23.9 ficam para a versão que for ao ar: só registrar.

## Etapa 35 · Ensaio, montagem e roteiro do Otávio

- Ensaio geral atualizado para tudo o que mudou (migração sobre dados existentes, eventos novos, caixa única marcada e desmarcada, corte mais restritivo, fontes locais sem nenhum pedido a terceiros) e rodado inteiro. Montar o site e rodar o dry-run.
- entregas/prototipo-funil-01/APLICAR-11.md: roteiro curto para o Otávio, no padrão do LIGAR.md (uma ação por passo, "como saber que deu certo"): push; rodar a migração no SQL Editor; rodar conferir.sql; publicar com o comando único; apagar a chave secreta "default" do Supabase; teste rápido com uma pessoa de mentira nova (caixa marcada, caixa desmarcada, eliminatório pelo corte novo, clique no fim) conferindo banco e planilha.

## Etapa 36 · Fechamento

- Triagem das perguntas desta fila no formato de sempre.
- prompts/11-decisoes-restantes.md: as que continuam abertas (18.6, 8.8, 10.4, 22.3, 24.5) e as novas desta fila, no formato da página de decisões, com a frase para responder em bloco.
- prompts/11-fila-resposta.md: uma linha por etapa, commits, resultado do ensaio e o que o Otávio faz primeiro.
