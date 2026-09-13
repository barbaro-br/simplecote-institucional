## ADDED Requirements

### Requirement: Destaque da aba ativa no header

O header SHALL indicar visualmente qual rota está ativa (ex.: a aba ativa com brilho/destaque na cor de acento, "verde cintilante"), e os itens de navegação SHALL ter um efeito de hover, permitindo ao visitante reconhecer onde está e o que é interativo.

#### Scenario: Aba ativa destacada

- **WHEN** o visitante está em uma página (ex.: Preços)
- **THEN** a aba correspondente no header (ex.: "Preços") fica destacada com brilho na cor de acento, diferente das demais

#### Scenario: Hover nos itens de navegação

- **WHEN** o visitante passa o mouse sobre um item do header
- **THEN** o item responde com um efeito de hover (ex.: mudança de cor/brilho)
