# Log

Toda alteração na base sobe a versão e ganha uma linha aqui, com o motivo. Entradas mais novas no topo.

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
