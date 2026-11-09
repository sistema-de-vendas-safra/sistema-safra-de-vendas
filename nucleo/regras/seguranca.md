---
id: regra-seguranca
versao: 3
status: decidido
aprovado_por:
  otavio: 2026-11-09
depende_de: []
---

# Segurança

1. **Contas no nome do Safra.** Todo serviço do sistema é criado com o e-mail sistemadevendassafra@gmail.com, nunca com uma conta pessoal. O registro de cada conta fica em conexoes.md.
2. **Cada chave abre só o que precisa.** Uma chave por uso, com a menor permissão que resolve. A chave que só grava leads não lê o banco inteiro; a do painel só lê.
3. **Chave mora no cofre do serviço que a usa, nunca no código.** O cofre é o do próprio serviço (por exemplo, as variáveis secretas da Cloudflare e as propriedades do Apps Script). Nenhuma chave passa por arquivo da máquina, nem .env. O .gitignore e o .claude/settings.json continuam barrando .env e .env.*, como cerca. Nenhuma chave, senha ou token entra em arquivo do repositório, nem em comentário, nem em exemplo (decisão do Otávio, 09/11/2026, 20.1; base/decisoes.md, #114).
4. **Dado pessoal só no banco de dados e na planilha do SDR.** Nome, telefone, e-mail e respostas de leads nunca entram no repositório nem no Google Drive, com uma exceção registrada: a planilha do SDR mora no Drive do Safra, com acesso só do Otávio e de quem liga para os leads, sem outro compartilhamento. Quem liga abre só a planilha; o acesso ao sistema continua só do Otávio (#95). Aprendizados e painéis no repositório usam só números agregados, sem identificar ninguém (exceção: decisão do Otávio, 09/11/2026, 5.4 com 16.8 e 24.1; base/decisoes.md, #114).
5. **Para cada chave, saber como trocá-la.** Em conexoes.md, cada serviço diz onde a chave mora, como revogar e quando foi a última troca. Se uma chave vazar, revoga primeiro e investiga depois.

## Detector de chaves

Um detector de chaves (nucleo/ferramentas/detector-de-chaves/, ligado pelo gancho .githooks/pre-commit) roda antes de cada commit e bloqueia o commit se encontrar algo parecido com chave, senha ou token. Ele precisa estar instalado antes de existir a primeira chave do sistema. Enquanto não estiver instalado, nenhuma chave é criada.
