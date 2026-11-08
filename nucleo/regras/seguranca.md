---
id: regra-seguranca
versao: 1
status: rascunho
aprovado_por:
  otavio: pendente
depende_de: []
---

# Segurança

1. **Contas no nome do Safra.** Todo serviço do sistema é criado com o e-mail sistemadevendassafra@gmail.com, nunca com uma conta pessoal. O registro de cada conta fica em conexoes.md.
2. **Cada chave abre só o que precisa.** Uma chave por uso, com a menor permissão que resolve. A chave que só grava leads não lê o banco inteiro; a do painel só lê.
3. **Chave mora no cofre, nunca no código.** No Mac, num arquivo .env fora do Git (o .gitignore já bloqueia .env e .env.*). Na hospedagem, nas variáveis secretas do serviço. Nenhuma chave, senha ou token entra em arquivo do repositório, nem em comentário, nem em exemplo.
4. **Dado pessoal só no banco de dados e na planilha do SDR.** Nome, telefone, e-mail e respostas de leads nunca entram no repositório nem no Google Drive. Aprendizados e painéis no repositório usam só números agregados, sem identificar ninguém.
5. **Para cada chave, saber como trocá-la.** Em conexoes.md, cada serviço diz onde a chave mora, como revogar e quando foi a última troca. Se uma chave vazar, revoga primeiro e investiga depois.

## Detector de chaves

Um detector de chaves (por exemplo, gitleaks) roda antes de cada commit e bloqueia o commit se encontrar algo parecido com chave, senha ou token. Ele precisa estar instalado antes de existir a primeira chave do sistema. Enquanto não estiver instalado, nenhuma chave é criada.
