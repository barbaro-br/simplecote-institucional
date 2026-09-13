## MODIFIED Requirements

### Requirement: Página dedicada à dor do comprador, com caminho até o produto

O sistema SHALL oferecer, em `/para-supermercados`, uma página que começa pela dor (custo de compras, tempo perdido cotando por telefone/planilha/WhatsApp) e conduz o visitante até a explicação do produto, com CTA para `/precos` ou "Criar conta". O texto de introdução das dores principais SHALL utilizar o efeito de "Scrub Reveal", iniciando de forma mais neutra ou opaca e preenchendo as palavras/letras progressivamente vinculadas à descida do scroll da página, garantindo foco máximo na leitura.

#### Scenario: Acessar a página diretamente

- **WHEN** um visitante chega a `/para-supermercados` vindo de uma busca pela dor (não pelo nome do produto)
- **THEN** a página abre falando da dor antes de mencionar o mecanismo do produto, e termina com um caminho claro pra continuar (CTA)

#### Scenario: Scrubbing no texto das dores

- **WHEN** o usuário rola a seção de dores da página (ex: "isso te soa familiar")
- **THEN** o texto animado acende dinamicamente acompanhando o progresso do scroll do usuário

#### Scenario: Título mira a dor, não a categoria

- **WHEN** a página é carregada
- **THEN** o `<title>` contém uma frase sobre reduzir custo de compras (não sobre "cotação competitiva", que é o título da home)
