---
id: politica-de-privacidade
versao: 9
status: pendente-aprovacao
aprovado_por:
  otavio: 2026-11-18
  junior: pendente
  euclides: pendente
depende_de:
  - id: planta-do-banco
    versao: 4
  - id: quiz-01-copy
    versao: 3
  - id: quiz-01-pagina
    versao: 5
  - id: landing-page-02
    versao: 2
  - id: landing-page-01-copy
    versao: 4
  - id: funil-01
    versao: 3
  - id: funil-01-planilha-sdr
    versao: 2
  - id: funil-01-roteiros-sdr
    versao: 2
  - id: regra-seguranca
    versao: 3
  - id: lacunas
    versao: 7
  - id: provas-e-conformidade
    versao: 4
  - id: ficha-de-fatos
    versao: 6
  - id: decisoes
    versao: 12
desatualizado: true
---

# Política de privacidade

## Para a equipe (sai antes de publicar)

**Status.** Pendente de aprovação do Júnior e do Euclides. O Otávio tirou a política do rascunho e aprovou a versão 4 em 13/11/2026 (#117), a versão 5 e o prazo da versão 6 em 18/11/2026 (ver "Versão 6") e o pacote v7 no mesmo dia, junto com o jurídico (ver "Versão 7"); a versão 8 só completa uma frase da v7, no mesmo sentido (ver "Versão 8"). Ela serve ao funil-01, pendente do Júnior e do Euclides (#90), e ao quiz-01, que é do Júnior: por isso os dois continuam em aprovado_por.

Revisão jurídica fica com a empresa que assina a política, fora do sistema (decisão do Otávio, 09/11/2026, 16.4; base/decisoes.md, #103). Os pontos levantados na 16.4 (o aceite e a ordem da fila, a nutrição, a revisão da nota, a transferência para fora do Brasil e o aviso de incidente) continuam no texto como estavam.

**Desatualizado.** Na versão 2 (etapa 31), todas as bases apontam para as versões em vigor. Continua marcada porque se apoia em `quiz-01-pagina`, que só muda nas etapas 33 e 34, e em documentos marcados por cadeia dela (`quiz-01-copy`, `landing-page-01-copy`, `funil-01-planilha-sdr`, `funil-01-roteiros-sdr`) (nucleo/regras/versionamento.md v3, 11.1). Desde a versão 4, declara as páginas em vigor, quiz-01-pagina 5 e landing-page-02 2, que o texto descreve (caixa única, fontes servidas junto com a página; correção 34.16).

**Versão 3 (pedido 17, 17.1, 12/11/2026).** Medição com o Google (decisão do Otávio, 12/11/2026; base/decisoes.md, #116): o item 7 foi reescrito, o Google entrou na lista do item 6 e os itens 2 e 3 ganharam uma frase cada, para continuarem verdadeiros. Em depende_de, só decisoes subiu (para 6); as outras bases ficam nas versões da v2, e o documento continua marcado. A linha do Google no item 6 não depende do conflito-17. Antes de ir ao ar com a medição ligada, conferir no Google Analytics: os eventos ligados além dos automáticos do item 7, o compartilhamento de dados da conta (a frase do item 6 sobre outras empresas usarem os dados para si depende dele) e que nenhum campo enviado ao Google leve o código da visita (log.md, Pendências).

**Versão 4 (13/11/2026, #117).** O Otávio tirou a política do rascunho: aprovada por ele, ela vai a pendente de aprovação do Júnior e do Euclides. Fica publicada como página do protótipo, em /politica-de-privacidade/, para onde apontam os links do quiz e do aviso de cookies. A página é montada a partir da seção "Texto para o lead" (entregas/prototipo-funil-01/montar-site.mjs): os `{{a definir: ...}}` aparecem como "[a definir: ...]", como no quiz; o marcador do conflito-17 não aparece, e a tabela do item 6 mostra os nomes ainda sem decisão como "[a definir]"; o prazo do item 8 vem da ficha de fatos (ficha-de-fatos#prazo-de-guarda). Esta seção "Para a equipe" e as "Fontes" não vão para a página. O texto para o lead não mudou; os dados que faltam (quem assina, CNPJ, encarregado, contato, data de publicação, os prazos e os nomes dos serviços) continuam a definir, e a revisão jurídica continua com a empresa que assina (#103). Correção de forma 34.16 aplicada (páginas em vigor declaradas em depende_de).

**Versão 5 (18/11/2026).** Pedido do Otávio, na conversa com o Claude, depois de ligar o Google Analytics no Tag Manager: "Atualize a política". A configuração no ar mede mais do que a v4 dizia, e a política passa a descrever o que está ligado. No item 7 entraram os eventos da medição otimizada (rolagem, cliques de saída, vídeo, downloads de arquivos e pesquisa no site) e os dados de local e de aparelho, cada um como a documentação do Google descreve, sem ir além dela; e a frase de que as interações com formulários e a coleta automática de dados digitados estão desligadas. O item 8 não mudou: o prazo de guarda dos dados do Google Analytics continua a definir, porque os 12 meses pedidos pelo Otávio não existem como opção na conta padrão (log.md, entrada de 18/11/2026, pergunta 1). É mudança de sentido: o Otávio volta para `pendente` em aprovado_por, e a página do protótipo continua com a v4 até a próxima publicação. depende_de sem mudança; o documento continua marcado.

**Versão 6 (18/11/2026).** O Otávio aprovou a versão 5 ("Aprovado") e decidiu o prazo de guarda dos dados do Google Analytics ("14 meses"), na mesma mensagem, junto com "deixo ligada" para a coleta granular de local e de aparelho, que a v5 já descreve como ligada, e "pode colocar tudo no ar" (log.md, entrada de 18/11/2026). O item 8 troca o "a definir" do prazo do Google Analytics pelo campo novo da ficha, ficha-de-fatos#prazo-de-guarda-analytics, e diz que os relatórios com números somados ficam depois do prazo, como a documentação do Google descreve. Em depende_de, ficha-de-fatos sobe para 6. A resposta do Otávio vale como aprovação da mudança que ela pede: otavio passa a 2026-11-18; Júnior e Euclides continuam pendentes. O documento continua marcado.

**Versão 7 (18/11/2026, #122).** O Pixel da Meta, pelo pacote v7 (seção 2), aprovado pelo Otávio e pelo jurídico, inclusive os trechos que o pacote marcava para o jurídico conferir (o primeiro parágrafo do item 6 e "O que a Meta faz com esses dados", no item 7), aplicados sem as marcas. Mudam, no texto para o lead: o item 2 (a visita também pelo Pixel); o item 3 (a finalidade 6, medir os anúncios no Facebook e no Instagram); o item 4 (a caixa cobre também a medição na Meta pelo nosso sistema, e a base legal da medição pela página com o Google e com a Meta); o item 5 (os dados da medição com o Google e com a Meta); o item 6 (o primeiro parágrafo e a linha da Meta na tabela); o item 7 (antes da escolha, os cookies do Pixel, "Se você aceitar", o bloco novo do Pixel com o que a Meta faz e o envio pelo nosso sistema, o código da visita fora também da Meta, "Se você recusar", "Como mudar a sua escolha" e o título da linha da base legal, que continua com o marcador, agora para as duas medições e a transferência); o item 8 (os dados na Meta e os 90 dias dos cookies do Pixel); e o direito 8 do item 9. O resto do texto para o lead não mudou, nem os marcadores "a definir". O que o pacote v7 pede conferir depois de ligar o Pixel: os nomes e a validade dos cookies que o Pixel gravar de fato em svsafra.gotriad.com.br (ferramentas do desenvolvedor, Aplicativo, Cookies); se a validade for outra, os itens 7 e 8 mudam antes de publicar o Pixel (log.md, Pendências). O envio pelo nosso sistema (API de Conversões) é descrito como possível ("pode avisar"): ele ainda não existe e, quando for ligado, é pedido novo. depende_de: quiz-01-copy 3 e decisoes 12; o documento continua marcado.

**Versão 8 (18/11/2026, #122).** Pedido do Otávio, antes do merge: no item 7, "O que fica guardado no seu navegador", a frase "para a página saber se pode carregar a medição do Google" passa a "para a página saber se pode carregar a medição do Google e a da Meta". É o mesmo sentido aprovado na #122 (um "Aceitar" só cobre as duas medições), sem nova rodada no jurídico, nas palavras do Otávio; o status e as datas em aprovado_por continuam os da v7. Nas "Fontes", as páginas da Meta passam a constar como conferidas pelo Claude do projeto de estratégia em 18/11/2026. Sobe de 7 para 8 pela regra de versionamento (toda alteração de conteúdo sobe a versão); o resto do texto é o da v7.

**Versão 9 (25/11/2026, #128).** Só esta seção, "Para a equipe": entra a frase pronta sobre o limite de envios por endereço IP (garçom v7, pedido 24), que o Otávio decidiu incluir "na mesma versão em que entrarem os dados da empresa. Deixe a frase pronta." O texto para o lead não mudou, a página publicada não muda e a aprovação do Otávio da versão 8 continua valendo para ele.

**Frase pronta, para a versão em que entrarem os dados da empresa (#128).** Entra no item 10, "Como a gente protege os seus dados", como o segundo item da lista:

> - Para barrar envios automáticos, o serviço que hospeda as nossas páginas, a Cloudflare, usa o endereço IP de quem envia o diagnóstico ou abre o quiz para contar quantos envios saem do mesmo endereço em um minuto. O nosso sistema não guarda esse endereço: ele não vai para o sistema de gestão de contatos nem para a planilha de quem faz o contato.

Na mesma versão: no item 6, a linha "Hospedagem das páginas..." recebe o nome do serviço com o fim "e o limite de envios por endereço IP (ver item 10)"; e o jurídico confere a base legal desse uso (proposta para ele avaliar: legítimo interesse, na prevenção de fraude e na segurança). Fonte do que a frase diz: entregas/garcom/README.md, versão 7 (o IP é a chave do limitador da Cloudflare e não vai ao banco nem ao registro do garçom; período de 60 segundos, no wrangler.toml v15).

**O que muda na operação, fora do texto para o lead.** Quem retira o aceite depois de entrar na planilha do SDR: o Otávio apaga a linha à mão, até existir o caminho automático, que entra com a volta do status (21.10, #114). A planilha do SDR fica no Drive do Safra, como exceção registrada à regra 4 de segurança, com acesso só do Otávio e de quem liga (nucleo/regras/seguranca.md v3, regra 4; 5.4, #114). O caminho de apagamento no fim do prazo de guarda é pendência com prazo (#106; log.md, Pendências).

**Destino dos dados em conflito · bloqueado para entrega até a decisão** (conflito-17). O lado 1 manda os contatos para uma conta nova do Triad CRM; o lado 2 (#90) manda para o banco de dados pelo garçom e para a planilha do SDR. O texto para o lead foi escrito para valer nos dois lados ("sistema de gestão de contatos"); a lista de serviços que guardam os dados está bloqueada (ver "Com quem os dados são compartilhados").

**Como ler.** Base na LGPD (Lei 13.709/2018), em termos gerais. `{{a definir: ...}}` é dado que ainda não existe; `{{BLOQUEADO: ...}}` é trecho em conflito, que não vai ao ar até a decisão. Nenhum fato da ficha é copiado. Escolhas provisórias desta etapa: prompts/07-fila-perguntas.md, 16.1 a 16.12.

---

## Texto para o lead

Esta política explica, em palavras simples, quais dados a gente pede quando você visita a nossa página e responde o diagnóstico, para que eles servem, quem tem acesso, por quanto tempo ficam guardados e como você pede para ver, corrigir ou apagar os seus dados. Ela segue a Lei Geral de Proteção de Dados (LGPD, Lei 13.709/2018).

Última atualização: {{a definir: data de publicação}}.

### 1. Quem cuida dos seus dados

- **Empresa responsável:** {{a definir: razão social}}
- **CNPJ:** {{a definir: CNPJ}}
- **Encarregado pelo tratamento de dados (a pessoa que responde por isso):** {{a definir: nome do encarregado}}
- **Contato para assuntos de privacidade:** {{a definir: e-mail ou canal de contato}}

### 2. Que dados a gente coleta

**Na página de apresentação.** A página não tem formulário e não pede nenhum dado seu. Ela só lê a etiqueta do link pelo qual você chegou (de onde veio, por exemplo um story ou a bio, e de qual campanha) e registra a data e a hora da visita. Enquanto você não termina o diagnóstico, essa visita não fica ligada a você. Se você aceitar a medição no aviso de cookies, o Google Analytics e o Pixel da Meta também registram a visita, nesta página e na do diagnóstico (ver item 7).

**No diagnóstico.** Ao longo da conversa, você informa:

- como quer ser chamado;
- dados da sua empresa: ramo, faturamento médio por mês, número de vendedores, quem marca as conversas de venda, valor médio de uma venda, de onde vêm os leads, se usa CRM e o seu cargo;
- os números do seu funil de vendas, como você lembrar deles, ou uma estimativa se não lembrar;
- como o seu time trabalha: em quanto tempo o lead recebe o primeiro contato, quantas tentativas vocês fazem e se sobra lead sem contato.

No fim, para receber o diagnóstico, você informa:

- nome;
- e-mail;
- WhatsApp, com o código do país;
- nome da empresa, se quiser (é opcional).

**O seu aceite.** Guardamos que você aceitou receber o diagnóstico e o contato da equipe por WhatsApp (mensagem e ligação) e por e-mail, o texto exato que você aceitou e a data e a hora do aceite. Se um dia você retirar o aceite, guardamos a data em que retirou.

**O que a gente calcula.** Com as suas respostas, o sistema calcula uma nota e uma faixa, que servem para organizar a ordem em que a nossa equipe entra em contato (ver item 4).

**Depois do diagnóstico.** Se alguém da nossa equipe falar com você, registramos quando e por qual canal foi o contato, em que pé está a conversa, a data combinada para voltar a falar, se marcar uma conversa de venda, a data e o horário, e o resultado (se você comprou ou não). Não guardamos anotações livres sobre você.

### 3. Para que a gente usa os seus dados

Só para isto:

1. **Montar o seu diagnóstico e mandar uma cópia para você**, por WhatsApp e por e-mail, se você deixou o aceite marcado.
2. **Alguém da nossa equipe falar com você sobre o diagnóstico**, por mensagem ou ligação no seu WhatsApp e por e-mail, se você deixou o aceite marcado.
3. **Organizar a ordem dos contatos** pela nota calculada com as suas respostas.
4. **Fazer contas com números somados**, sem identificar ninguém (por exemplo, quantas pessoas terminaram o diagnóstico num mês, ou de que origem vieram), para saber o que funciona na nossa página. Esses números não têm nome, telefone, e-mail nem respostas de ninguém.
5. **Medir como as páginas são usadas com o Google Analytics**, só se você aceitar no aviso de cookies (ver item 7).
6. **Medir os nossos anúncios no Facebook e no Instagram**: com o Pixel da Meta, só se você aceitar no aviso de cookies; e pelo nosso sistema, só se você deixar a caixa de aceite marcada (ver item 7).

A gente não vende os seus dados e não usa os seus dados para outra coisa sem pedir de novo.

### 4. Com base em quê a gente trata os seus dados

Com o seu consentimento (LGPD, art. 7º, inciso I). Antes de enviar o contato, você vê uma caixa de aceite só, que cobre o diagnóstico, o contato da equipe por WhatsApp (mensagem e ligação) e por e-mail, e a medição dos nossos anúncios na Meta pelo nosso sistema (ver item 7). A caixa já vem marcada; se você desmarcar, o diagnóstico aparece na tela e nada é enviado: nem o seu contato, nem as suas respostas ficam com a gente, nada vai à Meta pelo nosso sistema, e a equipe não fala com você.

Você pode retirar o aceite quando quiser, de graça, pelo canal do item 9. A retirada vale dali para a frente. A base legal da medição com o Google e com a Meta pela página, e como mudar essa escolha, estão no item 7.

**Sobre a nota.** A nota do item 2 é calculada de forma automática, a partir das suas respostas, e ajuda a decidir a ordem dos contatos da equipe. Você pode pedir para uma pessoa revisar o que foi decidido com base nela e pedir informação sobre os critérios usados (LGPD, art. 20), pelo canal do item 9.

### 5. Onde os seus dados ficam guardados e quem tem acesso

Os seus dados ficam guardados num sistema de gestão de contatos contratado por nós ({{a definir: provedor}}), com acesso protegido. Quem faz o contato com você trabalha numa planilha que recebe só parte deles (ver abaixo); ela fica numa conta da empresa, aberta só para quem cuida do sistema e para quem faz o contato, sem outro compartilhamento. Fora desses dois lugares, eles não ficam em arquivos de trabalho, em pastas compartilhadas nem no material interno da empresa.

Têm acesso só as pessoas da nossa equipe que precisam dos dados para fazer o que está no item 3:

- quem cuida do sistema;
- quem faz o contato com você, que vê só o necessário para falar com você (nome, contato, aceites, nota e as respostas que precisa confirmar) e só se você aceitou ser contatado;
- quem conduz a conversa de venda, se você marcar uma.

Quem vê os números do painel e dos estudos internos vê só números somados, sem identificar ninguém.

Se você aceitar a medição, os dados dela ficam com o Google e com a Meta, como diz o item 7.

### 6. Com quem os dados são compartilhados

A gente não vende os seus dados. Para o sistema funcionar, alguns serviços guardam ou processam os dados por nós, seguindo as nossas instruções (na LGPD, são os operadores). A Meta é diferente: além de medir os nossos anúncios, ela também usa os dados dessa medição nas regras dela, como diz o item 7.

{{BLOQUEADO: conflito-17 · as linhas a definir da lista de serviços que guardam os dados; as linhas do Google e da Meta não dependem do conflito}}

| O que o serviço faz | Nome |
|---|---|
| Hospedagem das páginas e do caminho que leva o seu contato até o sistema de gestão de contatos | {{a definir}} |
| Sistema de gestão de contatos (banco de dados ou CRM) | {{a definir}} |
| Planilha de trabalho de quem faz o contato com você | {{a definir}} |
| Envio da cópia do diagnóstico por e-mail e por WhatsApp | {{a definir}} |
| Medição de como as páginas são usadas, só depois do "Aceitar" no aviso de cookies (ver item 7) | Google (Google Tag Manager e Google Analytics) |
| Medição dos nossos anúncios no Facebook e no Instagram: pela página, só depois do "Aceitar" no aviso de cookies; pelo nosso sistema, só com a caixa de aceite marcada (ver item 7) | Meta (Pixel da Meta e API de Conversões) |

**Transferência para fora do Brasil:** {{a definir: se algum desses serviços guarda ou processa dados fora do Brasil e com que garantia}}.

A gente também pode informar dados quando uma lei ou uma ordem de autoridade exigir.

**Quando você decide compartilhar.** Se você mandar mensagem no nosso WhatsApp pelo botão da página, a conversa passa a seguir também as regras do WhatsApp. Se você usar "Compartilhar" ou "Baixar PDF" no diagnóstico, quem recebe o que você mandou é escolha sua.

### 7. Cookies e medição

**Antes de você escolher.** Enquanto você não escolhe, aparece no topo das nossas páginas um aviso de cookies com dois botões, "Aceitar" e "Recusar", e a página não guarda nada no seu navegador nem carrega nada do Google ou da Meta.

**A medição que é nossa.** O link pelo qual você chegou leva uma etiqueta de origem e de campanha, e a página cria um código de visita que é esquecido quando você fecha a aba. Esse código só passa a ser ligado a você se você terminar o diagnóstico e enviar o contato. Essa medição não usa cookie, não guarda nada no seu navegador e não depende da sua escolha no aviso.

**O que fica guardado no seu navegador.** Antes de você escolher, nada. Depois, a nossa página guarda só a sua escolha, no armazenamento local do navegador (localStorage), com o nome `safra_cookies_v1` e o valor `aceito` ou `recusado`. Ela serve para o aviso não aparecer de novo e para a página saber se pode carregar a medição do Google e a da Meta. A mesma escolha vale para a página de apresentação e para a do diagnóstico. Se você aceitar, o Google Analytics grava no seu navegador os dois cookies descritos abaixo, e o Pixel da Meta grava os dois dele.

**Se você aceitar.** A página carrega o Google Tag Manager, que carrega a medição, e duas ferramentas de medição: o Google Analytics, do Google, e o Pixel da Meta, da Meta, a empresa do Facebook e do Instagram. O consentimento de anúncio do Google fica sempre negado: a gente não anuncia no Google.

**O que o Google Analytics coleta, segundo a documentação do Google:**

- **Dois cookies:** `_ga`, que serve para distinguir um usuário de outro, e `_ga_` seguido de um código, que guarda o estado da sessão. Pelo padrão do Google, valem por 2 anos, e a validade é renovada a cada visita. O seu navegador pode encurtar esse prazo: o Chrome guarda até 400 dias sem uma nova visita, e o Safari, 7 dias.
- **Os eventos que ele coleta sozinho:** a página vista (page_view, com o endereço da página e a página de onde você veio), a primeira visita (first_visit), o começo de uma sessão (session_start) e o tempo com a página em foco (user_engagement). Em todo evento vão também o idioma, o endereço da página, a página de onde você veio, o título da página e a resolução da tela.
- **Os eventos da medição otimizada, que está ligada:** quando você rola a página até perto do fim (scroll); quando clica num link que leva para fora do nosso site (click, com o endereço e o domínio do link); quando um vídeo incorporado na página começa, passa de 10%, 25%, 50% e 75% e termina (video_start, video_progress e video_complete, com o título, o endereço e o tempo do vídeo); quando clica num link para um arquivo, como um PDF (file_download, com o nome do arquivo e o texto do link); e quando o endereço da página traz um termo de busca (view_search_results, com o termo). As interações com formulários e a coleta automática de dados que você digita, como nome, e-mail e telefone, estão desligadas: o que você escreve no diagnóstico não vai ao Google.
- **Local e aparelho:** a partir do endereço IP, o Google Analytics deduz a sua localização aproximada: país, região e cidade. Ele registra também dados do aparelho e do navegador, como a marca, o modelo e o nome do aparelho, as versões do navegador e do sistema e a resolução da tela.
- **O endereço IP:** segundo o Google, o Google Analytics não registra nem guarda o endereço IP. Para quem visita de fora da União Europeia, da Suíça e do Reino Unido, como do Brasil, o IP é usado para os serviços básicos e para a detecção de spam, nunca é associado a identificadores de usuário e é descartado depois do uso.

**O que o Pixel da Meta coleta, segundo a documentação da Meta:**

- **O que vai em todo acesso:** os dados que qualquer navegador manda ao abrir uma página, como o endereço IP, o navegador, o endereço da página e a página de onde você veio.
- **O código do Pixel e dois cookies:** `_fbp`, que distingue um navegador de outro, e `_fbc`, que guarda o código do clique quando você chega por um anúncio da Meta. Pelo padrão da Meta, valem por 90 dias.
- **Quatro momentos da sua visita:** a página vista; o começo do diagnóstico; o envio do contato, só depois que ele chega à gente; e, se você enviar, se as suas respostas ficaram no perfil que a nossa equipe atende primeiro. Junto de cada momento vai um código de evento, que não tem o seu nome nem o seu contato.
- **O que não vai pela página:** as suas respostas, o seu nome, o seu e-mail e o seu WhatsApp. A coleta automática de cliques e a de dados digitados estão desligadas. Segundo a Meta, o Pixel pode registrar o nome dos campos de um formulário, como "e-mail", mas não o que você escreve neles.

**O que a Meta faz com esses dados.** A Meta usa os dados para contar quantas pessoas chegaram ao diagnóstico e o enviaram depois de ver um anúncio nosso, e para escolher para quem mostrar os nossos anúncios. Ela também usa esses dados nas regras dela, descritas na Política de Privacidade da Meta, e pode ligá-los à sua conta no Facebook ou no Instagram, se você tiver uma.

**Com a caixa marcada, o envio pelo nosso sistema.** Se você deixar a caixa de aceite marcada, o nosso sistema pode avisar a Meta, direto do nosso servidor, de que você enviou o diagnóstico e se as suas respostas ficaram no perfil que a equipe atende primeiro. Junto vão o seu e-mail e o seu WhatsApp transformados em código (um resumo que não dá para desfazer) e o código do clique no anúncio, se houver. Serve para a Meta reconhecer quem chegou por um anúncio, mesmo quando o navegador bloqueia o Pixel. Esse envio não depende do aviso de cookies e para quando você retirar o aceite.

**O código da visita não vai ao Google nem à Meta.** Antes de carregar qualquer coisa do Google ou da Meta, a página tira o código de visita da nossa medição (id_sessao) do endereço que aparece no navegador, e ele fica de fora de tudo o que vai ao Google e à Meta. A página continua com o código na memória da aba, para a nossa medição.

**Se você recusar.** Nada muda na página: ela e o diagnóstico funcionam do mesmo jeito, e nada do Google nem da Meta é carregado. Fica guardada só a sua escolha. O envio pelo nosso sistema depende só da caixa de aceite do diagnóstico.

**Como mudar a sua escolha.** O link "Cookies", no fim da página, abre o aviso de novo. Se você tinha aceitado e passar a recusar, a página avisa o Google e a Meta da sua recusa e apaga os cookies do Google Analytics e do Pixel da Meta deste site. Até você sair desta página, o Google ainda pode receber medições sem cookie; da próxima página em diante, nada do Google nem da Meta é carregado. Você também pode apagar os dados deste site nas configurações do seu navegador; aí o aviso aparece de novo na próxima visita.

**Base legal das duas medições pela página (Google e Meta) e transferência dos dados para fora do Brasil:** {{a definir: jurídico da empresa que assina a política (#103)}}.

As letras da página vêm junto com ela, sem pedido a outro serviço. Se a medição mudar, esta política muda antes.

### 8. Por quanto tempo os dados ficam guardados

Os dados que você informa no diagnóstico ficam guardados por {{ficha-de-fatos#prazo-de-guarda}}. No fim do prazo, os dados que identificam você deixam de ser guardados: {{a definir: o que se apaga, o que vira anônimo e como fica registrado (#106)}}. Os dados da medição com o Google Analytics, se você aceitar, ficam guardados por {{ficha-de-fatos#prazo-de-guarda-analytics}}. Os relatórios com números somados, que não identificam ninguém, continuam depois desse prazo. Os dados que vão à Meta ficam guardados pelas regras da Meta, e os cookies do Pixel, por até 90 dias no seu navegador.

O sistema guarda só os dados listados no item 2. A qualquer momento, você pode pedir para apagar os seus dados antes do fim do prazo (item 9).

### 9. Os seus direitos e como pedir

Pela LGPD (art. 18), você pode pedir, a qualquer momento:

1. a confirmação de que a gente trata dados seus;
2. acesso aos seus dados;
3. a correção de dados incompletos, errados ou desatualizados;
4. que dados desnecessários, em excesso ou tratados em desacordo com a lei sejam tornados anônimos, bloqueados ou apagados;
5. a portabilidade dos seus dados para outro fornecedor;
6. que os dados tratados com o seu consentimento sejam apagados;
7. a informação de com quem a gente compartilhou os seus dados;
8. a informação sobre a possibilidade de não dar o consentimento e o que acontece se não der: se você desmarcar a caixa de aceite, o diagnóstico aparece na tela, mas nada é enviado: a gente não guarda o seu contato nem as suas respostas, não manda cópia, nada vai à Meta pelo nosso sistema e a equipe não fala com você;
9. a retirada do consentimento.

**Como pedir:** pelo canal {{a definir: e-mail ou canal de contato}}, falando com o encarregado {{a definir: nome do encarregado}}. Para proteger você, a gente pode pedir uma confirmação de que o pedido é seu. A resposta sai nos prazos da LGPD, em {{a definir: prazo de resposta}}.

**Para apagar os seus dados ou retirar o aceite:** peça pelo mesmo canal. A partir do pedido, você sai da lista de contatos da equipe e ninguém mais fala com você pelos canais que retirou. Como e em quanto tempo os dados são apagados do sistema: {{a definir: procedimento de apagamento (#106)}}.

Se achar que o seu pedido não foi atendido, você também pode reclamar à Autoridade Nacional de Proteção de Dados (ANPD).

### 10. Como a gente protege os seus dados

- O sistema é dividido em partes, e cada parte tem uma chave de acesso que abre só o que ela precisa. A página que você usa não tem nenhuma chave e não fala direto com o sistema de gestão de contatos.
- Os dados que você informa no diagnóstico ficam só no sistema de gestão de contatos e na planilha de quem faz o contato, que só quem cuida do sistema e quem faz o contato abrem. Nunca em arquivos de trabalho nem em pastas compartilhadas.
- Painéis e estudos internos usam só números somados, sem identificar ninguém.
- As contas dos serviços ficam no nome da empresa, não de uma pessoa, e cada chave de acesso pode ser trocada se houver suspeita de problema.

Nenhum sistema é 100% seguro. Se acontecer um incidente que possa trazer risco ou dano relevante a você, a gente avisa você e a ANPD, como a LGPD manda.

### 11. Mudanças nesta política

Se esta política mudar, a versão nova fica publicada neste mesmo endereço, com a data da atualização no topo. Se a mudança for no uso dos seus dados: {{a definir: como você é avisado e se o aceite é pedido de novo}}.

---

## Fontes

- dados/planta/planta.md (`planta-do-banco` v4): campos das gavetas pessoas e eventos, quem grava e quem lê, o que sai do banco, prazo de guarda, código de sessão (6.2).
- entregas/quizzes/quiz-01/copy.md (`quiz-01-copy` v2): perguntas, campos de contato, texto de aceite e caixa única já marcada (M16; #104), letra miúda (M7), botões do fim.
- entregas/quizzes/quiz-01/pagina/index.html (`quiz-01-pagina` v2): nada guardado no navegador, "Compartilhar" e "Baixar PDF". A caixa única e as fontes servidas junto com a página entram na etapa 34 (13.4, 10.7).
- entregas/landings/landing-page-01/copy.md (`landing-page-01-copy` v4): sem formulário; o contato é pedido pelo quiz-01.
- funis/funil-01/funil.md (`funil-01` v3): "Caminho do dado", "Origens e links", acesso no MVP (#95).
- funis/funil-01/planilha-sdr.md (`funil-01-planilha-sdr` v2): o que a planilha mostra; quem retirou o consentimento sai da planilha; conflito-17.
- funis/funil-01/roteiros-sdr.md (`funil-01-roteiros-sdr` v2), "Antes de qualquer contato": quem deixou o aceite marcado pode ser contatado por WhatsApp, ligação e e-mail (#105).
- nucleo/regras/seguranca.md (`regra-seguranca` v3), regra 4 com a exceção da planilha do SDR (5.4); conexoes.md.
- base/lacunas.md (`lacunas` v6): conflito-09, conflito-17, lacuna-10. base/provas-e-conformidade.md (`provas-e-conformidade` v4), "LGPD". base/ficha-de-fatos.md (`ficha-de-fatos` v4; v6 para o prazo do Google Analytics): prazo-de-guarda, prazo-de-guarda-analytics (v6); nome-agencia em conflito (por isso a empresa fica a definir). base/decisoes.md (`decisoes` v6): #90, #95, #103 a #106, #114 e #116 (medição com o Google Tag Manager e o Google Analytics só depois do "Aceitar"; o navegador guarda só a escolha; anúncio sempre negado; o id_sessao não vai ao Google).
- prompts/17-medicao-google.md (pedido 17), partes 17.1 e 17.2: o aviso com "Aceitar" e "Recusar", o que a montagem faz ao aceitar e ao recusar, o link para reabrir o aviso. O nome `safra_cookies_v1` e os valores `aceito` e `recusado` são os que a montagem do protótipo vai usar (17.2), escolhidos pelo Claude ao preparar a 17.2, como o aviso no topo da página, o link "Cookies" no fim, a regra de apagar os cookies `_ga` ao trocar para recusar e a de tirar o código da visita do endereço antes de carregar o Google (perguntas da 17.1, log.md). O texto do aviso está em entregas/documentos/aviso-de-cookies.md, que depende desta política.
- Documentação do Google, conferida por busca nas páginas oficiais em 12/11/2026 (a rede da máquina onde esta versão foi escrita não abre as páginas do Google); o item 7 não vai além dela:
  - https://support.google.com/analytics/answer/11397207 e https://developers.google.com/analytics/devguides/collection/ga4/cookie-usage: cookies `_ga` (distingue usuários) e `_ga_<container-id>` (guarda o estado da sessão), validade padrão de 2 anos, renovada a cada visita; navegadores podem encurtar (Chrome até 400 dias sem retorno, Safari 7 dias).
  - https://support.google.com/analytics/answer/9234069: eventos coletados automaticamente na web (page_view, com endereço da página e página de origem; first_visit; session_start; user_engagement, tempo com a página em foco) e os parâmetros de todo evento (idioma, endereço da página, página de origem, título da página e resolução da tela).
  - https://support.google.com/analytics/answer/9019185 e https://support.google.com/analytics/answer/16871531: o Google Analytics não registra nem guarda o endereço IP; fora da União Europeia, Suíça e Reino Unido, o IP é usado para os serviços básicos e a detecção de spam, nunca é associado a identificadores de usuário e é descartado depois do uso.
- Documentação da Meta, para as versões 7 e 8, conferida pelo Claude do projeto de estratégia em 18/11/2026 (registro pedido pelo Otávio; a rede da máquina onde a v7 e a v8 foram escritas não abre as páginas da Meta):
  - https://developers.facebook.com/docs/meta-pixel: **lida**. Sustenta o que o Pixel coleta: cabeçalhos HTTP, código do Pixel e cookie, cliques em botões, valores opcionais e nomes de campos de formulário, sem os valores digitados fora da correspondência avançada.
  - https://developers.facebook.com/docs/marketing-api/conversions-api/parameters/fbp-and-fbc: **conferida por trecho de busca**. Sustenta o `_fbp` gravado pelo Pixel no domínio do site e o `_fbc` com validade de 90 dias.
  - Conferir no navegador, depois de ligar: os nomes e a validade dos cookies que o Pixel gravar de fato em svsafra.gotriad.com.br (ferramentas do desenvolvedor, Aplicativo, Cookies). Se a validade for outra, o item 7 e o item 8 mudam antes de publicar.
- base/decisoes.md (`decisoes` v12), #122: o Pixel da Meta do conjunto de dados Triad · Site, só pelo Google Tag Manager e só depois do "Aceitar"; o que fica desligado no conjunto de dados; a caixa única cobrindo o envio pelo servidor.
- Documentação do Google lida direto nas páginas oficiais em 18/11/2026, para a versão 5 (cópias fora do repositório):
  - https://support.google.com/analytics/answer/9216061: os eventos da medição otimizada e os parâmetros de cada um (scroll; click com link_classes, link_domain, link_id, link_url e outbound; view_search_results com search_term, acionado pelos parâmetros q, s, search, query e keyword do endereço; video_start, video_progress e video_complete com video_current_time, video_duration, video_percent, video_provider, video_title, video_url e visible; file_download com file_extension, file_name, link_classes, link_id, link_text e link_url; form_start e form_submit, desligados).
  - https://support.google.com/analytics/answer/12017362: a localização aproximada vem do IP (cidade, região, país, continente); com a coleta granular ligada, o padrão do Google, vão também a cidade com a latitude e a longitude dela, a versão secundária do navegador, o user agent, a marca, o modelo e o nome do aparelho, as versões secundárias do sistema e da plataforma e a resolução da tela.
  - https://support.google.com/analytics/answer/7667196: a retenção dos dados de usuários e de eventos na conta padrão é de 2 ou 14 meses (26, 38 e 50 meses só no Analytics 360); ela não vale para os relatórios padrão agregados.
- Configuração no ar, conferida com o Otávio em 18/11/2026 (log.md, entrada de 18/11/2026): medição otimizada com visualizações de página (sem as mudanças do histórico de navegação), rolagens, cliques de saída, pesquisa no site, vídeo e downloads ligados; interações com formulários desligadas; dados fornecidos pelo usuário desligados; Indicadores do Google desligados; compartilhamento de dados da conta desmarcado. A coleta granular de local e de aparelho estava ligada (o padrão) na última vez que foi vista, em 18/11/2026, e o item 7 a descreve como ligada.
- Lei 13.709/2018 (LGPD), em termos gerais: art. 7º, I; art. 18; art. 20.
