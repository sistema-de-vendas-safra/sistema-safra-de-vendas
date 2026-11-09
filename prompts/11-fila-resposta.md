# Fila das decisões de 09/11 · resposta

Etapas 30 a 36, todas feitas, nenhuma incompleta. Cada etapa teve escritor e revisor separados. Nada foi publicado, nada rodou no Supabase de verdade, nenhuma conta ou chave foi criada, nenhum push, fontes/ intacto. As respostas do Otávio de 09/11/2026 (prompts/11-decisoes-de-09-11.md) foram aplicadas como decisão dele (#103 a #115, base/decisoes.md v5). O código novo (migração, garçom, páginas, planilha, ensaio, roteiro) é rascunho e só roda no protótipo de teste, com leads de mentira (#102). Nada vai ao ar com gente de verdade: as travas estão em prompts/11-decisoes-restantes.md (tabela 2) e no log.md, Pendências.

## Uma linha por etapa

| Etapa | Resultado | Commit |
|---|---|---|
| 30 · Registrar as decisões | Decisões #103 a #115 em base/decisoes.md v5 (uma por resposta própria, uma para as aceitas, uma para as fechadas pelo teste). Ficha de fatos v4 (nome, duração e condutor da Call de Direcionamento, #107; prazo de guarda; ManyChat). Regras: versionamento v3 (11.1), segurança v3 (regra 3 pela 20.1; regra 4 com a exceção da planilha, 5.4), CLAUDE.md (4.8). prompts/11-respostas.md com as 134 linhas. Perguntas 30.1 a 30.10. | 65e6ae6 |
| 31 · Cascata nos documentos | Base, oferta, mecanismo, promessa (v4, decidido pela #108), funil-01 v3, planta v4, planilha-sdr e roteiros-sdr v2, política v2, landing (briefing, copy e estrutura v4), quiz (briefing e copy v2), pauta v7, LIGAR.md v4, GLOSSARY v4 e conexoes.md. Revisão jurídica fora do sistema (#103). A cadeia saiu da marca de desatualizado onde nada mais marcado a prendia (11.1). Perguntas 31.1 a 31.22. | c0506a6 |
| 32 · Banco: migração v3 | dados/banco/migracoes/001-v3.sql, que roda sobre o esquema v2 com dados dentro, sem apagar nada, e pode rodar duas vezes (clique do fim do quiz, registrar_evento para visita e início do quiz, nutrição, produto, histórico da faixa B). conferir.sql v2 com 18 linhas. Teste da migração no PGlite: 64 de 64. Codigo.gs v2 com a coluna do clique (20 colunas): 54 de 54. Perguntas 32.1 a 32.12. | 4a41400 |
| 33 · Garçom v4 | Porta nova POST /api/evento (visita, início do quiz, clique no fim) com as mesmas travas, sem pedir aceite; pré-voo retirado (22.2); cabeçalho cita a planta no lugar da página (23.11). Teste: 253 de 253. Dry-run do Worker sem publicar. Perguntas 33.1 a 33.8. | 524cc42 |
| 34 · Páginas | Quiz v3: corte mais restritivo, caixa única já marcada (e o caminho de quem desmarca), campos de número vazios, valor médio obrigatório, nota no eliminatório, clique no fim e início do quiz, doctype, fontes servidas junto. Teste do quiz: 132 de 132. Landings v3 (A e B): visita gravada, Call de Direcionamento, fontes locais, doctype. Catálogo v2. Lista de peças por entrega v1 (17.5), para aprovar. Perguntas 34.1 a 34.18. | 274fb7a |
| 35 · Ensaio, montagem e roteiro | Ensaio v3 sobre banco v2 com dados, migração duas vezes, eventos novos, caixa marcada e desmarcada, corte novo e fontes locais, com a rede travada em 127.0.0.1. Montagem "Tudo certo" e dry-run. entregas/prototipo-funil-01/APLICAR-11.md v1, o seu roteiro. LIGAR.md v5 e README do protótipo v5 apontando para ele. Perguntas 35.1 a 35.9. | 4d8cad6 |
| 36 · Fechamento | Triagem das 79 perguntas: A 11, B 6, C 62, D 0 (prompts/11-triagem.md). Página prompts/11-decisoes-restantes.md com as 5 que ficaram abertas, a 10.1 do pedido 10 e as do grupo C. Esta resposta. Pauta sem mudança (nenhuma do grupo D). prompts/11-respostas.md sem "a aplicar" pendente. Perguntas 36.1 e 36.2. | este commit |

## Ensaio geral e testes

- **Ensaio geral (nucleo/ferramentas/ensaio/, v3): 145 de 145** com o wrangler dev --local, rodado do zero duas vezes (pasta site/ e .wrangler apagadas antes), e de novo do zero na revisão da etapa 35. Variantes: 144 de 144 com `--esperar-margem` (a espera de verdade da margem de 1 minuto); 142 de 142 com `--sem-wrangler`. Um vigia externo não viu nenhuma conexão fora de 127.0.0.1 nas duas rodadas.
- Provas de que o ensaio pega erro: com o corte de antes na página, 2 FALHOU; com o envio da caixa desmarcada, 1 FALHOU (mudanças desfeitas pelo Git).
- **Testes de cada peça:** garçom v4, 253 de 253; migração 001 no PGlite, 64 de 64; conferir.sql, 18 de 18 depois da migração (11 de 18 num banco só v2); quiz v3, 132 de 132; planilha (Codigo.gs v2 com Google de mentira), 54 de 54; conferência das landings no site montado, 44 de 44 na etapa 34, levada para dentro do ensaio na etapa 35.
- **Montagem e dry-run:** montar-site.mjs "Tudo certo" (15 arquivos, nenhum pedido a outro endereço). `wrangler deploy --dry-run` sem login e sem publicar: wrangler 4.158.0, 19 arquivos do site, 18,10 KiB (5,27 KiB comprimido), as ligações ASSETS, SUPABASE_URL e ORIGEM_PERMITIDA, "--dry-run: exiting now".
- Fica para o APLICAR-11, no serviço de verdade: a migração e o conferir.sql no Supabase, o Worker novo na Cloudflare, a planilha de verdade com 20 colunas e o teste com pessoas de mentira novas.

## O que o Otávio faz primeiro

1. **Push no GitHub Desktop**, antes de tudo (APLICAR-11.md, parte 1).
2. **Seguir o APLICAR-11.md** em ordem, da parte 1 à 7: entregas/prototipo-funil-01/APLICAR-11.md. Antes, leia "Leia antes de seguir o APLICAR-11", no topo de prompts/11-decisoes-restantes.md.
3. **Responder a página de decisões** em bloco: prompts/11-decisoes-restantes.md, com "Aceito todas as recomendações, menos: ...". As 8 linhas da tabela 1 mexem no teste de agora; as 12 da tabela 2 travam ir ao ar com gente de verdade; as 32 da tabela 3 podem esperar.

## Perguntas para o Otávio

- **Atenção: estas três escolhas contrariam o texto escrito do pedido ou de uma resposta sua e, pela Regra de pausas, deveriam ter parado a fila.** Estão no topo de prompts/11-decisoes-restantes.md, para você saber antes de seguir o roteiro:
  - **35.4 (com 34.6):** a tela do plano de 90 dias não manda o clique do fim do quiz, contra a 18.4 e o "clique no fim" do pedido da etapa 35.
  - **31.3 (com 34.1):** a página v3 continua sem a promessa de percentual, contra a 7.5 (#110); a copy v2 já a devolveu.
  - **33.5:** o OPTIONS de outra origem dá 403, e não 405 como dizia a recomendação aceita da 22.2.
- **Também no topo da página, para saber antes do roteiro (mudam o que ele prova, sem contrariar texto escrito):**
  - **31.1:** o texto da caixa única, que a 13.4 manda você conferir, já está na página v3 que o roteiro publica.
  - **34.4 (com 32.4, 34.3):** o catálogo v2 tem de rodar antes de publicar (passo 2.6), e as duas variantes gravam o mesmo par.
  - **35.7:** o passo 3.5 deixa a sua linha real de 09/11 nas duas abas da planilha de teste, até a limpeza.

- prompts/11-decisoes-restantes.md: todas as perguntas abertas, em três tabelas: as 5 que ficaram sem resposta (18.6, 8.8, 10.4, 22.3, 24.5), a 10.1 do pedido 10 (com a 30.2) e as 62 do grupo C desta fila.
- prompts/11-triagem.md: a triagem das 79 perguntas desta fila (A 11, B 6, C 62, D 0). As do grupo A e a B 31.9 que esperam a próxima versão de cada documento estão no log.md, Pendências.
- Nenhuma foi para a pauta: as que tocam assuntos do Júnior e do Euclides já estão em itens da pauta (entregas/pautas/pauta-aprovacao-01.md, v7); a lista está na triagem.
- Todas as perguntas da fila, com o detalhe, em prompts/11-fila-perguntas.md; as escolhas provisórias da etapa 36 são a 36.1 e a 36.2.
