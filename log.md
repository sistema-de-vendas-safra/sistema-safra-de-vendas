# Log

Toda alteração na base sobe a versão e ganha uma linha aqui, com o motivo. Entradas mais novas no topo.

## 2026-11-08 · base lote 2

- base/produto.md v1, decidido (otavio: 2026-11-08).
- base/metodo.md v1, decidido (otavio: 2026-11-03).
- base/mecanismo.md v1, aprovado (otavio: 2026-10-22; junior: 2026-10-27; euclides: 2026-10-27). Confirmado pelo Otávio: fica aprovado, com a frase filosófica pendente, a crença "com ressalva" e os nomes de 01/11 (v0.5) marcados como posteriores à #48.
- base/oferta.md v1 e base/promessa.md v1, pendente-aprovacao (otavio: 2026-11-08; junior e euclides: pendente).
- base/entregas-do-servico.md v1, decidido (otavio: 2026-11-01). O calendário por dia da engenharia reversa não entra.
- base/ficha-de-fatos.md v1 para v2, decidido. Motivo: pedido do Otávio para pôr na ficha os fatos que o lote 2 citava sem campo: relogio-da-operacao, tentativas-ate-abandonado, duracao-call-de-venda, multiplo-regra-de-venda, gsaas-preco-travado (67 campos). Mudança de sentido aprovada pelo Otávio; os campos antigos não mudaram.
- base/lacunas.md v1 para v2, rascunho. Motivo: nova lacuna outros-19 (a fala do Júnior para a call: "3 semanas" ou "uma semana"), decisão do Otávio; depende_de passa a ficha-de-fatos v2.
- Cascata: base/decisoes.md fica desatualizado: true (depende de ficha-de-fatos v1). Atualização proposta ao Otávio: só apontar para a ficha v2, sem mudança de conteúdo.
- Revisão: dois revisores independentes. Corrigidos números de fatos fora da ficha (sessões, setup, safra de julho, calendário), citações alteradas dentro das aspas, a #91 como fonte do reembolso, a Análise da call marcada como em conflito e a pendência do Júnior sobre as 18 tentativas, que a fonte registra.

## 2026-11-08 · base lote 1

- base/ficha-de-fatos.md v1, decidido (otavio: 2026-11-08). Criada conforme o plano (prompts/02-plano-da-base-resposta.md, parte 2): 62 campos, cada um com status; os campos em conflito ficam "em conflito · bloqueado para entrega até a decisão". Campo novo, aceito pelo Otávio: barra-de-resgates. Campo arrependimento conforme a #91. grafia-junior: vale o CTX; o design system será corrigido na próxima versão dele (Otávio).
- base/decisoes.md v1, decidido (otavio: 2026-11-08, pela aprovação do plano). Registro #1 a #91. Sem texto em nenhuma fonte: #1 a #8, #10, #11, #13, #15, #17, #18, #21, #24, #28, #30 a #32, #34, #35, #47 (lista maior que a do plano: esses números só aparecem em faixas ou listas). Critério do Otávio: uma decisão só vira "substituída" quando a substituta for aprovada; por isso a #33 fica pendente-aprovacao com "substituição proposta em #85", e nenhuma das duas promessas vai para entrega antes da aprovação. Decisão nova #91: reembolso de 7 dias pela Hotmart; o art. 49 do CDC em venda para empresa fica com o advogado; não muda a #39.
- base/lacunas.md v1, rascunho (otavio: pendente). Lacunas do CTX §10, os conflitos da parte 5 do plano e a lacuna nova outros-18 (art. 49 do CDC).
- Glossário: a skill grill-with-docs instalada (mattpocock-skills 1.3.1) procura GLOSSARY.md na raiz, no formato de skills/engineering/domain-modeling/GLOSSARY-FORMAT.md. O glossário será GLOSSARY.md na raiz, com a linha _Fonte_ como extensão nossa (lote 3).
- Revisão: dois revisores independentes. Corrigidos status fora da tabela, remissões à ficha que faltavam, a fonte de duracao e a pontuação das notas.

## 2026-11-08 · regras aprovadas

- nucleo/regras/versionamento.md v1 para v2, status decidido (otavio: 2026-11-08). Motivo: aprovação do Otávio e nova seção "Forma e sentido" (correção de forma sobe a versão sem derrubar a aprovação; mudança de sentido volta para rascunho ou pendente-aprovacao; na dúvida, perguntar). Confirmados: versão como número inteiro e desatualizado como campo separado do status.
- nucleo/regras/seguranca.md v1, status decidido (otavio: 2026-11-08). Motivo: aprovação do Otávio, sem mudança de conteúdo.
- Confirmado: o zip original do acervo fica em fontes/safra-acervo.zip.

## 2026-11-08 · fundação

- Fundação criada: pastas nucleo/, base/, funis/, entregas/, dados/ e aprendizados/ com README; regras de versionamento e segurança (v1, rascunho); conexoes.md; CLAUDE.md; index.md; .gitignore; .claude/settings.json.
- Acervo de 08/11 movido para fontes/acervo-2026-11-08/ (98 arquivos, conferidos com o zip). O zip original ficou em fontes/safra-acervo.zip como reserva. safra-dossie.md e safra-landing.md da antiga historico-projeto/ eram idênticos (sha256) às cópias do zip; a pasta foi removida.
- Design system v1.0 baixado para fontes/design-system-v1.0/.
- Pastas vazias copywriter/, landing-page/, quiz/ e revisor/ removidas.

## Pendências

- [ ] **Decisão #90:** o funil-01 (landing-page-01, quiz-01, Supabase, planilha, SDR) substitui a página das três portas (#66) e o CRM do Doc Mestre. Pendente de aprovação do Júnior e do Euclides.
- [ ] **Design:** o design system v1.0 é escuro e proíbe cores fora da paleta, o que conflita com a paleta branco e verde (#81) e com os botões laranja de 03/11. Decidir antes da etapa de design da landing. Dono das próximas versões do design system a definir.
- [ ] **Segurança:** o site sv-safra.soulstory.com.br está aberto, sem senha, com o painel interno.
- [ ] **Acesso:** confirmar quem mais acessa o sistema (o Doc Mestre cita Lalas no design e Miranda na infra).
- [ ] **Migração:** depois da migração, o projeto do estrategista no Claude vira arquivo histórico (a confirmar).
- [ ] **Chaves:** antes de existir a primeira chave, instalar o detector de chaves (pre-commit) e fechar a brecha do .env no terminal (hoje o .claude/settings.json bloqueia só a ferramenta de leitura, não comandos como cat).
- [ ] **Prazo:** a data de 10/11 do funil pode atrasar. Começar certo vale mais que começar na data.
