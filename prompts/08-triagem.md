# Triagem das perguntas da fila da madrugada (etapa 27)

As 77 perguntas de prompts/08-fila-perguntas.md (20.1 a 26.12), cada uma num grupo só, no formato de sempre (prompts/06-triagem-das-perguntas.md):

- **A · Forma.** Não muda o sentido de nada. Aplicada já ou, quando a recomendação manda esperar a próxima versão do documento, registrada nas Pendências do log.md (pergunta 27.2); sempre com linha no log.md.
- **B · Já decidido.** Uma decisão escrita resolve sem interpretação (base/decisoes.md, ou o pedido prompts/08-fila-da-madrugada.md, que o Otávio aprovou ao mandar executar). Aplicada, citando a decisão.
- **C · Para o Otávio.** Pede uma decisão dele que não está escrita. Nada aplicado; vai para prompts/08-decisoes-em-uma-pagina.md.
- **D · Para o Júnior e o Euclides.** Vai para a pauta (entregas/pautas/pauta-aprovacao-01.md).

Na dúvida entre dois grupos, o mais alto (A e B, B; B e C, C; C e D, D).

## Contagem

| Grupo | Quantas |
|---|---|
| A · Forma | 10 |
| B · Já decidido | 5 |
| C · Para o Otávio | 60 |
| D · Para o Júnior e o Euclides | 2 |
| **Total** | **77** |

## O que foi aplicado

- **A (10):** nenhuma mexe em documento agora. Cinco já foram aplicadas por uma etapa seguinte e ficam só como registro (21.15, 22.9, 23.10, 25.5, 26.8). Cinco têm recomendação de esperar a próxima versão do documento, como forma (20.4, 22.8, 23.4, 25.3, 26.10): viraram um item novo nas Pendências do log.md, "Correções de forma para a próxima versão de cada documento", junto com a troca de prototipo-funil-01 1 para 2 que a 26.8 deixou proposta. Arquivo tocado: log.md (entrada da etapa 27 e Pendências).
- **B (5):** as cinco já estavam aplicadas nos arquivos, como a decisão manda; nada a mudar neles. Arquivo tocado: log.md (uma linha citando a decisão de cada uma).
- **C (60):** nada aplicado. Estão em prompts/08-decisoes-em-uma-pagina.md, muitas como complemento de uma pergunta antiga (o número aparece entre parênteses junto da principal).
- **D (2):** entregas/pautas/pauta-aprovacao-01.md v5 para v6, item 29, "Também na mesa, do site de teste" (23.2 e 23.8). Arquivos tocados: a pauta, index.md e log.md.

## Tabela

| Número | Título curto | Grupo | Motivo |
|---|---|---|---|
| 20.1 | A regra 3 da segurança ainda diz ".env no Mac" | C | Mudar o lugar da chave é sentido num documento decidido |
| 20.2 | Bloqueio largo de comandos com ".env" | C | Escolha entre cerca larga e estreita, não escrita |
| 20.3 | Sem Node, o gancho bloqueia o commit | C | O pedido não diz o que fazer sem Node |
| 20.4 | Dependentes da segurança apontam para a v1 | A | Só a versão em depende_de; a recomendação guarda para a próxima versão de cada um (Pendências) |
| 20.5 | Todo .env.* é barrado, até um exemplo | B | prompts/08, etapa 20: "qualquer arquivo .env, .env.*" |
| 20.6 | .dev.vars.* junto com .dev.vars | C | Vai além do pedido; junto com a 20.9 |
| 20.7 | README do detector com cabeçalho de rascunho | B | prompts/08, "Como trabalhar": tudo o que a fila produz nasce com cabeçalho e versão |
| 20.8 | O que o detector deixa passar | C | Aceitar um limite de segurança é decisão do Otávio |
| 20.9 | Barrar mais nomes e comandos que o pedido | C | Vai além do pedido escrito |
| 21.1 | Índice único parcial | B | #100: índice único parcial no telefone e no e-mail |
| 21.2 | Telefone de uma pessoa e e-mail de outra | C | Complemento da 18.6 (reconhecer só pelo telefone) |
| 21.3 | service_role só com a função da planilha | B | #99 (toda permissão revogada e dada de forma explícita) e #100 (secreta só para a função da planilha) |
| 21.4 | Quem não aceitou WhatsApp fica fora da planilha | C | O pedido manda o caminho provisório, mas a decisão segue aberta; complemento da 16.12 |
| 21.5 | Quem refaz entra uma vez, pelo primeiro fim em a ou b | C | A base não diz qual fim de quiz vale |
| 21.6 | Margem de 1 minuto no cursor | C | Número escolhido pelo Claude |
| 21.7 | entrou_em e tentativas_feitas saem do banco | C | Complemento da 15.3 |
| 21.8 | respostas_a_confirmar sem o "histórico" | C | Complemento da 15.4 |
| 21.9 | Estágio, estado e data_volta atuais | C | Regra nova para a planta |
| 21.10 | Retirada do consentimento depois da planilha | C | Caminho de dado pessoal não escrito |
| 21.11 | Rodar o esquema de novo não muda tabela existente | C | Escolha de como versões futuras do esquema mudam tabela |
| 21.12 | Permissões padrão só do papel que roda o esquema | C | Regra de trabalho nova (sempre pelo editor SQL) |
| 21.13 | O linter vai avisar das duas visões | B | #100: visões sem security_invoker, com SELECT revogado de todo mundo |
| 21.14 | funil-01 e planilha-sdr falam da chave antiga | C | Mudar documento pendente de aprovação e marcado como desatualizado pede o Otávio (cascata) |
| 21.15 | Sem conferência de envios simultâneos aqui | A | Já aplicada: o teste de amanhã manda dois envios quase juntos (LIGAR.md 5.3); o resto segue na 26.7 |
| 21.16 | entrou_em vem do relógio do servidor | C | Muda a definição de entrou_em na 15.3 e na planilha-sdr; complemento da 15.3 |
| 22.1 | O "+" do horário sem codificar é recusado | C | Escolha de comportamento não escrita |
| 22.2 | O pré-voo da porta pública continua | C | A recomendação é tirar numa v3, decisão não escrita |
| 22.3 | Limite acima de 200 é recusado | C | O pedido deixa escolher; junto com a 22.5 |
| 22.4 | CHAVE_PLANILHA com pelo menos 32 caracteres | C | Mínimo escolhido pelo Claude |
| 22.5 | Parâmetro desconhecido na porta privada é recusado | C | O pedido não diz; junto com a 22.3 |
| 22.6 | Formato da resposta da porta privada | C | pode_ter_mais foi acrescentado além do pedido |
| 22.7 | noindex nos arquivos só com o Worker antes deles | C | Há dois jeitos de cumprir a #101; a escolha é do Otávio |
| 22.8 | O wrangler.toml.exemplo virou só uma lista | A | Apagar o exemplo na próxima versão do garçom, sem mudar sentido (Pendências) |
| 22.9 | Pacote do exemplo marcado como teste só no teste | A | Já aplicada na etapa 23 (README do quiz com dados de teste, 23.4) |
| 23.1 | Aberta do arquivo, a página não envia nem avisa | C | O pedido deixa escolher |
| 23.2 | Texto novo do aviso de falha do envio | D | Texto do quiz, que é do Júnior: pauta, item 29 |
| 23.3 | Nota do painel "Telas" e o "preencher exemplo" | C | A #102 manda marcar os leads de teste, mas o texto da nota é redação do Claude |
| 23.4 | O teste do garçom ainda acrescenta TESTE | A | Limpeza só do teste, na próxima versão do garçom (Pendências) |
| 23.5 | A landing repassa cinco utm, o quiz lê duas | C | Complemento da 18.5 |
| 23.6 | Link da landing: repositório no arquivo, /quiz/ no site | C | O pedido deixa escolher |
| 23.7 | compatibility_date em 2026-11-04 | C | Data escolhida pelo Claude |
| 23.8 | Meta viewport do quiz só no site do protótipo | D | A recomendação liga a mudança à página do Júnior e ao conflito-18: pauta, item 29 |
| 23.9 | Comentários de cabeçalho vão para o site | C | Regra nova antes de ir ao ar |
| 23.10 | Linha ('quiz-01', 1) no catálogo antes do teste | A | Já aplicada: catalogo-prototipo.sql (etapa 25) e LIGAR.md 2.7 e 2.8; o resto segue na 25.2 |
| 23.11 | garcom e quiz-01-pagina dependem um do outro | C | Cortar dependência muda o grafo da cascata, como na 13.15 |
| 24.1 | Planilha de teste no Drive contra a regra 4 | C | Complemento da 5.4 |
| 24.2 | Permissões mínimas: script dentro da planilha | C | Escolha de desenho não escrita |
| 24.3 | O cursor nas propriedades tem um id_pessoa | C | Dado pessoal indireto fora do banco |
| 24.4 | Lead chega como captado; acento; valor fora da lista | C | Junto com a 21.9 |
| 24.5 | Como alguns valores aparecem na planilha | C | Formato escolhido pelo Claude |
| 24.6 | Erro na busca vira falha da execução | C | O pedido não diz se o Otávio é avisado |
| 24.7 | A planilha não trava as regras da lista | C | Deixar para depois é decisão do Otávio |
| 24.8 | Aba "fila" com outro cabeçalho: nada é mexido | C | Escolha de defesa não escrita |
| 24.9 | GARCOM_URL só com https | C | Escolha de defesa não escrita |
| 24.10 | Até 10 páginas por rodada | C | Número escolhido pelo Claude |
| 24.11 | Lead fora das faixas a e b não entra | C | Escolha de defesa não escrita |
| 24.12 | Proteção contra fórmula com apóstrofo | C | Há mais de um jeito; o pedido não diz |
| 24.13 | O que o Google de mentira não prova | C | O LIGAR.md confere a maior parte, não tudo (falta o formato @ com "00123" e o aviso por e-mail); junto com a 24.12 |
| 25.1 | Margem de 1 minuto no ensaio: atrasar o relógio | C | O pedido deixa escolher |
| 25.2 | A linha do catálogo diz "publicada" no teste | C | Decidir antes de ir ao ar, junto com a limpeza (#102) |
| 25.3 | catalogo-prototipo.sql fora do README do banco | A | Linha a mais no README na próxima versão do banco (Pendências) |
| 25.4 | A sessão da landing não chega ao quiz | C | Complemento da 18.5 |
| 25.5 | Envios simultâneos sem conferência de verdade | A | Já aplicada: LIGAR.md 5.3; o resto segue na 26.7 |
| 25.6 | O ensaio usa as ferramentas já instaladas | C | Escolha de desenho não escrita; junto com a 25.7 |
| 25.7 | Sem wrangler, o contorno roda e o ensaio falha | C | Escolha de desenho não escrita |
| 26.1 | O Terminal entra já na parte 2 | C | Muda a ordem do pedido (Terminal na parte 3) |
| 26.2 | A CHAVE_PLANILHA sem arquivo e sem chat | C | Caminho de chave escolhido pelo Claude |
| 26.3 | A chave publicável é a que o projeto já tem | C | A #100 não diz |
| 26.4 | Desligar as chaves antigas e a "default" | C | Passo obrigatório que conexoes.md não pedia assim |
| 26.5 | O registro do Worker só pelos envios do quiz | C | Escolha de segurança não escrita |
| 26.6 | O login do wrangler num arquivo do Mac | C | Escolha de segurança não escrita |
| 26.7 | Três testes, três pessoas, duas linhas | C | Desenho do teste escolhido pelo Claude |
| 26.8 | Protótipo v2 só para apontar para o LIGAR.md | A | Já aplicada como forma na etapa 26; a troca de versão nos dependentes vai nas Pendências |
| 26.9 | O tempo estimado e os passos 3.8 e 3.9 | C | Contraria "uma ação por passo", instrução escrita do pedido |
| 26.10 | Nomes de botões dos painéis não conferidos | A | Corrigir nomes no LIGAR.md numa v2 é forma (Pendências) |
| 26.11 | "Em até 5 minutos" vira "de 1 a 6 minutos" | C | Diverge do texto do pedido; junto com a 21.6 |
| 26.12 | Correções da revisão aplicadas ao LIGAR.md | C | Na dúvida entre A e C, C: são escolhas de segurança no roteiro |

## Perguntas antigas que saíram por já respondidas

Antes de montar a página de decisões, cada pergunta de prompts/06-para-o-otavio.md e prompts/07-para-o-otavio.md foi conferida contra base/decisoes.md (#99 a #102), o log.md e o pedido prompts/08-fila-da-madrugada.md. Saíram 5:

| Número | De onde | Respondida por | Por quê |
|---|---|---|---|
| 18.2 | 07, complemento da 6.6 | #100 | O garçom não usa mais a chave que abre tudo: a porta pública usa a publicável, papel anon, que só executa registrar_fim_quiz |
| 18.8 | 07, complemento da 6.6 | #100 | O papel anon não lê nenhuma tabela, então quem confere a entrega e a versão é o banco; a planta v3 já diz isso |
| 18.9 | 07, decisão nova | #100 | A porta privada usa a chave secreta nova, que se revoga sozinha; a #100 diz que responde a 18.9 |
| 18.11 | 07, decisão nova | #99, #100 e o pedido 08 (etapa 22) | Itens 1 a 3: a #100 diz que os responde. Item 4 (robô e limite de pedidos): o pedido 08 mandou não ligar agora e registrar como pendência obrigatória antes de tráfego real, com Turnstile e limite de pedidos (log.md, Pendências). Item 5 (o esquema só roda no Supabase): o projeto existe (#99) e o ensaio roda o esquema numa cópia local |
| 6.3 | 06 | #100 | Quem refaz o quiz é reconhecido pelo telefone ou pelo e-mail: a #100 manda índice único nos dois, e a gravação junta os envios da mesma pessoa. A proposta de reconhecer só pelo telefone continua aberta na 18.6, e agora pede mudar a #100 (pergunta 27.1) |

Ficaram, só em parte respondidas:

- **6.6** (uma chave por uso, com a menor permissão): a #100 aplica a regra às duas chaves que existem. Segue aberta só para as que faltam (painel, contador, volta do status), junto com a 18.3, que a #100 diz que "continua para depois".
- **10.5** (o botão leva origem e código da visita no endereço): o pedido 08 manda o botão carregar as utm; o código da visita segue com a 18.5 e a 25.4.

Seguem abertas de propósito, porque o pedido 08 diz que "ficam como estão": 14.2, 18.4, 18.5, 18.6, 18.10 e o conflito-17.

## Escolhas provisórias desta etapa

As perguntas 27.1 e 27.2, em prompts/08-fila-perguntas.md, seção "Etapa 27".
