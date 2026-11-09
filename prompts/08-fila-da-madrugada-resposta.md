# Fila da madrugada · resposta

Etapas 20 a 27, todas feitas, nenhuma incompleta. Cada etapa teve escritor e revisor separados. Nada foi publicado, nenhuma conta ou chave foi criada, nenhum push, fontes/ intacto. Tudo o que a fila produziu é rascunho, menos as decisões #99 a #102 (decidido, aprovadas pelo Otávio ao mandar executar). Nada vai ao ar: o conflito-17 e as aprovações continuam travando ir ao ar com gente de verdade.

## Uma linha por etapa

| Etapa | Resultado | Commits |
|---|---|---|
| 20 · Detector de chaves e brecha do .env | Feita com correções do revisor. Detector em Node puro ligado como gancho de pré-commit (.githooks); testes 87 de 87; .gitignore e .claude/settings.json fechando .env, .dev.vars e .pem. Segurança v2 (forma). | e5ab352 (com este pedido em 4b33481) |
| 21 · Banco v2 | Feita com correções do revisor. Decisões #99 a #102 em base/decisoes.md (v4); esquema v2 com permissões só explícitas; conferir.sql 13 de 13 numa cópia local; planta v3; conexoes.md sem ".env no Mac". | 36fb051 |
| 22 · Garçom v2 com duas portas | Feita com correções do revisor. Porta pública com a chave publicável, porta privada com a CHAVE_PLANILHA e a secreta; teste local 121 de 121. Proteção contra robô nas Pendências. | b9865d6 |
| 23 · Páginas ligadas e site do protótipo | Feita com correções do revisor. Quiz v2 envia para /api/fim-quiz; landings v2 repassam as utm; Worker safra-prototipo-funil-01 configurado; dry-run fecha; teste do quiz 60 de 60; prints em 375 e 1440. | 5afa8ff |
| 24 · Planilha do SDR com Apps Script | Feita com correções do revisor. Codigo.gs com instalação, gatilho de 5 minutos e cursor; teste com Google de mentira 54 de 54. Só dados de teste até a 5.4. | 66057b9 |
| 25 · Ensaio geral local | Feita com correções do revisor. 88 de 88; nenhum erro nas etapas anteriores, sem commit de correção. | 83fbf63 |
| 26 · Roteiro para ligar | Feita com correções do revisor. LIGAR.md para iniciante, cerca de 58 minutos (partes 1 a 5). | d9103b5 |
| 27 · Decisões em uma página e fechamento | Feita com correções do revisor. Triagem das 77 perguntas: A 10, B 5, C 60, D 2. Pauta v6. Cinco perguntas antigas saíram por já respondidas. Página de decisões e esta resposta. | "triagem 08 · pauta" (só a pauta) e "etapa 27 · fechamento da madrugada" (todo o resto); hashes no git log |

## Ensaio geral

- 88 de 88 conferências, rodado do zero duas vezes seguidas depois da revisão (86 de 86 no contorno sem wrangler), em cerca de 25 segundos, só com 127.0.0.1 e leads de teste.
- Confirmado na cópia local: anon só grava o fim do quiz, service_role só lê a lista da planilha, a planilha não duplica, a chave errada dá 401 e nada de dado pessoal na saída do garçom.
- Fica para o teste de amanhã, no serviço de verdade: dois envios realmente simultâneos, as permissões que o próprio Supabase dá, a API e as chaves novas, o Worker na Cloudflare e o Google de verdade (nucleo/ferramentas/ensaio/README.md, "Limitações").

## Varredura do histórico (etapa 20)

Nada encontrado: 33 commits, todos os ramos, 350 versões de arquivo (`--historico`), e nenhum achado nos 233 arquivos rastreados (`--rastreados`). Rodada de novo no fechamento: nada encontrado em 40 commits e 439 versões de arquivo. O histórico não foi alterado. Fonte: log.md (etapa 20) e nucleo/ferramentas/detector-de-chaves/README.md.

## O que o Otávio faz primeiro amanhã

1. **Push no GitHub Desktop**, antes de tudo (LIGAR.md, parte 1).
2. **Seguir o LIGAR.md** a partir da parte 1, em ordem: entregas/prototipo-funil-01/LIGAR.md. Antes, leia as duas linhas da tabela 1 da página de decisões (26.9 e 26.11).
3. **Responder a página de decisões** em bloco: prompts/08-decisoes-em-uma-pagina.md, com "Aceito todas as recomendações, menos: ...". As 2 da tabela 1 são para saber antes do roteiro; as 24 da tabela 2 travam ir ao ar com gente de verdade; as 104 da tabela 3 podem esperar.

## Perguntas para o Otávio

- **Atenção: duas escolhas desta fila contrariam o texto escrito do pedido e, pela Regra de pausas, deveriam ter parado a fila:** 26.9 (os passos 3.8 e 3.9 do LIGAR.md têm duas ações cada, contra "uma ação por passo") e 26.11 (a linha chega à planilha de 1 a 6 minutos depois, e não "em até 5"). As duas estão na tabela 1 da página de decisões, para você saber antes de seguir o roteiro.

- prompts/08-decisoes-em-uma-pagina.md: todas as perguntas abertas, das listas 06, 07 e desta fila, em três tabelas.
- prompts/08-triagem.md: a triagem das 77 perguntas desta fila e as 5 antigas que saíram por já respondidas (6.3, 18.2, 18.8, 18.9 e 18.11).
- As do grupo D foram para entregas/pautas/pauta-aprovacao-01.md (v6, item 29).
- Todas as perguntas da fila, com o detalhe, em prompts/08-fila-perguntas.md; as escolhas provisórias da etapa 27 são a 27.1 e a 27.2.
