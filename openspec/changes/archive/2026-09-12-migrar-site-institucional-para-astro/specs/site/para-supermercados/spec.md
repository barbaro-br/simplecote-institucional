## Purpose

Página nova, dedicada a quem ainda está pesquisando a dor ("como reduzir custo de compras") sem necessariamente conhecer a categoria "cotação competitiva"/"leilão reverso" — não existe hoje.

## ADDED Requirements

### Requirement: Página dedicada à dor do comprador, com caminho até o produto

O sistema SHALL oferecer, em `/para-supermercados`, uma página que começa pela dor (custo de compras, tempo perdido cotando por telefone/planilha/WhatsApp) e conduz o visitante até a explicação do produto, com CTA para `/precos` ou "Criar conta".

#### Scenario: Acessar a página diretamente

- **WHEN** um visitante chega a `/para-supermercados` vindo de uma busca pela dor (não pelo nome do produto)
- **THEN** a página abre falando da dor antes de mencionar o mecanismo do produto, e termina com um caminho claro pra continuar (CTA)

#### Scenario: Título mira a dor, não a categoria

- **WHEN** a página é carregada
- **THEN** o `<title>` contém uma frase sobre reduzir custo de compras (não sobre "cotação competitiva", que é o título da home)
