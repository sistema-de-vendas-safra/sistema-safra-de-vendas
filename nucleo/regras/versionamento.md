---
id: regra-versionamento
versao: 3
status: decidido
aprovado_por:
  otavio: 2026-11-09
depende_de: []
---

# Versionamento

Vale para todo documento da base/, todo funil em funis/ e toda entrega em entregas/.

## Cabeçalho padrão

Todo documento começa com este bloco:

```yaml
---
id: oferta-avancada          # fixo para sempre; sem acento, sem espaço
versao: 3                    # número inteiro; sobe 1 a cada alteração
status: pendente-aprovacao   # rascunho · decidido · pendente-aprovacao · aprovado
aprovado_por:                # quem precisa aprovar e o que cada um já fez
  otavio: 2026-11-08
  junior: pendente
  euclides: pendente
depende_de:                  # documentos e versões em que este se apoia
  - id: ficha-de-fatos
    versao: 2
  - id: persona
    versao: 1
desatualizado: false         # vira true quando algo de que depende sobe de versão
---
```

- **id**: nunca muda, mesmo que o título ou o nome do arquivo mudem. É por ele que os outros documentos referenciam este.
- **versao**: começa em 1. Qualquer alteração de conteúdo sobe 1 e ganha uma linha no log.md com o motivo.
- **aprovado_por**: lista quem precisa aprovar este documento. Cada nome tem a data da aprovação ou a palavra `pendente`. Quando a decisão é só do Otávio, a lista tem só ele.
- **depende_de**: cada documento usado como base, com a versão exata que foi usada.
- **desatualizado**: marca da cascata (abaixo).

## Status

| Status | O que significa | Pode virar entrega? |
|---|---|---|
| rascunho | Em construção. Ainda não é decisão de ninguém. | Não |
| decidido | Decidido pelo Otávio, e o documento não exige mais ninguém. | Sim |
| pendente-aprovacao | Exige aprovação de mais alguém (Júnior, Euclides) e ao menos um ainda está `pendente` em aprovado_por. | Só como rascunho, avisando que pode mudar |
| aprovado | Todos os nomes em aprovado_por têm data. | Sim |

## Forma e sentido

Toda alteração sobe a versão, mas nem toda alteração derruba a aprovação:

- **Correção de forma** (erro de digitação, formatação, link quebrado): sobe a versão e registra no log.md, mas o status e as datas em aprovado_por continuam como estão.
- **Mudança de sentido** (qualquer coisa que altere o que o documento diz ou decide): o documento `decidido` ou `aprovado` volta para `rascunho` ou `pendente-aprovacao` até ser aprovado de novo, e as datas em aprovado_por voltam para `pendente`.

Na dúvida se é forma ou sentido, o Claude pergunta antes de alterar.

## Cascata

1. Um documento sobe de versão (por exemplo, ficha-de-fatos passa de 2 para 3).
2. O Claude procura tudo que tem `depende_de` apontando para esse id numa versão menor que a nova.
3. Cada um desses documentos recebe `desatualizado: true`. O conteúdo não muda sozinho.
4. O Claude propõe a atualização de cada um, mostrando o que mudou na origem e o que muda no dependente.
5. O Otávio aprova (ou pede ajuste). Só então o dependente é alterado: sobe de versão, atualiza a versão em `depende_de`, volta para `desatualizado: false` e ganha a linha no log.md.
6. Se o dependente também tiver dependentes, a cascata continua a partir dele.

Um documento com `desatualizado: true` não serve de base para entrega nova até ser atualizado.

Um documento só sai da marca (volta para `desatualizado: false`) quando nenhuma das bases dele, direta ou por cadeia, estiver marcada. Enquanto uma base continuar com `desatualizado: true`, o dependente continua marcado, mesmo que já tenha sido atualizado no resto (decisão do Otávio, 09/11/2026, 11.1; base/decisoes.md, #114).

## Fatos

Preço, datas, prazos, número de entregas e bônus moram só na ficha de fatos (base/). Os outros documentos citam o fato pelo id e declaram a ficha em `depende_de`; nunca copiam o valor. Assim, mudar um preço é mudar um lugar só, e a cascata mostra tudo que precisa ser revisto.
