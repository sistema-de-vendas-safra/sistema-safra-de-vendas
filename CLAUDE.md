# Sistema de Vendas Safra · regras da casa

## O que é este sistema

Uma base de conhecimento versionada no Git, no padrão LLM Wiki do Karpathy:

- **fontes/**: material bruto, nunca editado.
- **base/**: o que o Claude destila das fontes.
- **funis/** e **entregas/**: o que se faz a partir da base (landings, quizzes, e-mails).

Cada documento da base, cada funil e cada entrega tem um cabeçalho com id fixo, versao, status (rascunho, decidido, pendente-aprovacao ou aprovado), aprovado_por e depende_de. Decisões do Safra podem exigir a aprovação do Júnior e do Euclides, não só do Otávio; o cabeçalho registra isso. Quando um documento da base sobe de versão, o que depende da versão antiga fica marcado como desatualizado, e o Claude propõe a atualização para o Otávio aprovar. Detalhes em nucleo/regras/versionamento.md.

Fatos (preço, datas, prazos, número de entregas, bônus) moram numa ficha de fatos na base e são referenciados, nunca copiados.

Os dados de leads moram num banco de dados fora do repositório. Dado pessoal nunca entra no repositório nem no Google Drive. Os aprendizados tirados dos dados viram fichas em aprendizados/, com prova e status (hipótese, confirmado, descartado); nada é concluído abaixo de uma amostra mínima. Segurança em nucleo/regras/seguranca.md; contas em conexoes.md.

O mapa do que existe está em index.md; o histórico e as pendências, em log.md.

## Regras

1. **fontes/ é somente leitura.** Nada ali é editado, renomeado ou apagado. Quando um documento online e uma cópia FONTE divergirem, vale o documento online.
2. **Referencie, não copie.** Cite o documento pelo id e declare em depende_de; fatos só na ficha de fatos.
3. **Toda alteração na base sobe a versão** e registra o motivo no log.md.
4. **Uma tarefa por vez.** Explicar em português simples o que vai fazer antes de agir. Perguntar antes de qualquer decisão que não esteja escrita.
5. **Nunca usar travessão** em nenhum texto, código ou comentário. Quando precisar de separador, usar o ponto médio (·).
6. **Nomes sem acento e sem espaço** em pastas e arquivos criados pelo sistema. As fontes mantêm o nome original.
7. **Nunca fazer push.** O Claude faz os commits; o Otávio faz o push pelo GitHub Desktop.
8. **Nunca escrever chave, senha ou token** em nenhum arquivo do repositório.
9. **Seguir as diretrizes andrej-karpathy-skills:** pensar antes de agir, simplicidade, mudanças cirúrgicas, objetivo verificável.
10. **O projeto "Estrategista de Negócio" no Claude é arquivo histórico desde 08/11/2026.** Mudança no Safra entra só pelo repositório (decisão #96).

## Regra de pausas

Regra permanente da casa (Otávio, 08/11/2026, prompts/04-decisoes-de-08-11-e-lead-score.md).

- Não parar para perguntar. Quando aparecer uma dúvida que seria do Otávio, seguir pelo caminho mais conservador: o status mais restritivo; o conflito registrado com os dois lados e bloqueado para entrega; nada inventado; nenhum lado escolhido pelo Claude.
- Registrar cada escolha provisória na lista "Perguntas para o Otávio", no fim do arquivo de resposta da etapa em prompts/, com: a dúvida, o que foi feito, a recomendação e o que muda se o Otávio decidir diferente.
- Só parar de verdade para: alterar ou apagar algo em fontes/; contrariar uma instrução escrita do prompt ou deste CLAUDE.md; qualquer ação que não dê para desfazer pelo Git.
- No fim, entregar a lista inteira de uma vez.
