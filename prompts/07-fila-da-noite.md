# Fila da noite · etapas 11 a 19

Eu vou dormir. Rode esta fila inteira, em sequência, sem parar e sem me perguntar nada. Eu reviso amanhã de manhã.

## Como conduzir

- Valem o CLAUDE.md, nucleo/regras/versionamento.md e, inteiras, as seções "Como conduzir a fila" e "Regra de pausas" de prompts/05-fila-de-trabalho.md: escritor e revisor separados em cada etapa, commit "etapa N · nome", etapa que não passa no revisor depois de duas correções vira "incompleta" no log e a fila segue.
- As perguntas desta fila vão para prompts/07-fila-perguntas.md, numeradas por etapa.
- Tudo o que esta fila produz é rascunho. Nada vai ao ar.
- Proibido nesta fila: criar contas, criar ou pedir chaves, publicar qualquer coisa na internet, fazer push, instalar programas fora da pasta do projeto, alterar fontes/. Se precisar de uma ferramenta (por exemplo, para tirar prints de página), instale só dentro da pasta do projeto e ponha node_modules e afins no .gitignore. Se não der, registre e siga.
- Se a sessão cair ou o limite de uso acabar, ao recomeçar confira o git log e continue da primeira etapa sem commit.

## Etapa 11 · Triagem das 84 perguntas

Execute prompts/06-triagem-das-perguntas.md inteiro.

## Etapa 12 · Cascata pendente

Se depois da triagem ainda houver documentos com desatualizado: true por mudança só de versão, atualize-os (correção de forma). Se a atualização pedir mudança de sentido, deixe como está e mande para a lista de perguntas.

## Etapa 13 · Quiz-01: briefing e copy

**Fonte nova.** O quiz evoluiu num repositório separado, e a cópia dele está em fontes/quiz-01-repositorio-2026-11-08/ (leia o LEIA.md da pasta). É a versão mais nova e vale sobre o artefato do acervo. Antes de escrever, registre a fonte nova no index.md e no log.md. O CLAUDE.md desse repositório traz decisões próprias. As que conflitam com a base entram em base/lacunas.md como conflito, com os dois lados e sem escolher: o critério de qualificação (R$ 50 mil e 1 vendedor, contra o lead score), o destino dos contatos (Triad CRM, contra o Supabase e a planilha da #90), a identidade visual (Triad escura com verde neon, contra o design system v1.0 e a #81) e a promessa "até X%" (contra a conformidade). As que não conflitam valem como fonte.

Crie entregas/quizzes/quiz-01/briefing.md e entregas/quizzes/quiz-01/copy.md a partir de fontes/quiz-01-repositorio-2026-11-08/mockups/quiz-diagnostico.html, do CLAUDE.md, do MANUAL DO DIAGNÓSTICO e da REA desse repositório, da base e do lead score.

- Mantenha as perguntas que o lead score usa.
- Conformidade: tire a promessa "pode aumentar seu faturamento em até X%"; inclua o texto de consentimento antes de pedir e-mail e WhatsApp, com link para a política de privacidade; o valor da Análise e a gratuidade vêm da ficha de fatos.
- Toda mudança no texto do Júnior fica listada, com o motivo, porque o quiz é dele (vai para a pauta).

## Etapa 14 · Quiz-01: código

Crie entregas/quizzes/quiz-01/pagina/ a partir de fontes/quiz-01-repositorio-2026-11-08/mockups/quiz-diagnostico.html, aplicando o copy da etapa 13. Não mexa no visual: ele está em conflito e fica como está até a decisão.

- Calcule o lead score e a faixa exatamente como base/lead-score.md manda, num lugar só do código, fácil de ajustar.
- Monte o pacote de dados do fim do quiz no formato da planta do banco (dados/planta/planta.md), com as etiquetas de funil, entrega, versão e UTMs lidas do endereço da página.
- O envio fica desligado: no lugar do garçom, uma função que só mostra o pacote no console do navegador. Nenhum endereço externo, nenhuma chave.
- O consentimento é obrigatório para enviar.
- Teste abrindo a página localmente: percorra o quiz com as respostas do exemplo de base/lead-score.md (o total precisa dar 96, faixa A) e com um caso eliminatório. Tire prints em 375 e 1440 pixels de largura e guarde em entregas/quizzes/quiz-01/prints/.

## Etapa 15 · SDR: planilha e roteiros

Crie funis/funil-01/planilha-sdr.md e funis/funil-01/roteiros-sdr.md.

- Planilha: as colunas, quais o SDR edita e quais não, a lista fechada de status do funil-01, a ordem da fila pelo lead score e o que volta para o banco. Sem nenhum dado real.
- Roteiros: primeiro contato por faixa (A e B), por WhatsApp e por ligação, as tentativas até o abandono conforme a base, e o que dizer a quem caiu nos eliminatórios. Na voz que o tom-de-voz define, com o vocabulário público.

## Etapa 16 · Política de privacidade (rascunho)

Crie entregas/documentos/politica-de-privacidade.md (e o README da pasta).

- O que é coletado no quiz e na landing, para quê, onde fica guardado, quem acessa, por quanto tempo (lacuna em aberto), os direitos do titular e como pedir a exclusão.
- A empresa responsável e o contato ficam como {{a definir}}, porque dependem de decisão.
- Marque no topo: precisa de revisão de advogado antes de ir ao ar.

## Etapa 17 · Landing-page-01: duas variantes de design para a reunião

O design está bloqueado porque o Júnior e o Euclides precisam escolher entre o design system v1.0 (escuro) e a paleta branco e verde aprovada em #81. Para a escolha ser rápida, faça as duas.

- Crie entregas/landings/landing-page-01/variante-a-design-system-v1/ e entregas/landings/landing-page-01/variante-b-branco-e-verde/, cada uma com uma página HTML a partir de copy.md e estrutura.md. Use a skill frontend-design.
- Variante A: tokens de fontes/design-system-v1.0/safra-tokens.json e as regras do design system. Variante B: paleta branco e verde, com o que o safra-landing.md registra sobre ela e os botões laranja de 03/11.
- Mesmo texto, mesma estrutura, mesmas imagens de marcação nas duas. Só o visual muda. Onde faltar imagem, use um bloco cinza com a descrição.
- Fatos aparecem como estão na ficha; campo bloqueado aparece como um aviso visível de "a definir".
- Celular primeiro. Tire prints em 375 e 1440 pixels de largura de cada variante e guarde em entregas/landings/landing-page-01/prints/.
- Acrescente na pauta de aprovação um item para escolher a variante, apontando para os prints.

## Etapa 18 · Banco e garçom, prontos para quando houver contas

Crie dados/banco/ com o rascunho do banco a partir da planta: as tabelas, os campos e as fechaduras (só o garçom grava, ninguém de fora lê). Crie entregas/garcom/ com o código do garçom: recebe o pacote do quiz, confere etiquetas e consentimento, e grava no banco.

- Nenhuma chave, nenhum endereço real: onde entra a chave, só o nome da variável, lida do cofre.
- Um README em cada pasta dizendo o que falta para funcionar (contas, chaves, detector de chaves).
- Nada é executado contra nenhum serviço real.

## Etapa 19 · Fechamento da noite

- Faça a triagem das perguntas desta fila com os mesmos quatro grupos de prompts/06-triagem-das-perguntas.md (forma, já decidido, para o Otávio, para o Júnior e o Euclides), aplicando o que puder aplicar.
- Registre nas pendências do log.md: o repositório do quiz mora na conta pessoal otavio-gif, fora da organização do Safra, e está ligado a uma publicação automática na Cloudflare; depois da migração, decidir se ele vira arquivo histórico e se a Cloudflare passa a publicar a partir do repositório do sistema. Registre também em conexoes.md que a conta da Cloudflare do Safra já existe (o endereço do quiz usa o subdomínio sistemadevendassafra), com verificação em duas etapas a confirmar.
- Salve em prompts/07-para-o-otavio.md só as que pedem decisão minha, em ordem do que destrava mais, com recomendação.
- Salve em prompts/07-fila-da-noite-resposta.md uma linha por etapa e os commits.
- No chat, só: "Fila da noite concluída", etapas feitas e quantas perguntas sobraram para mim.
