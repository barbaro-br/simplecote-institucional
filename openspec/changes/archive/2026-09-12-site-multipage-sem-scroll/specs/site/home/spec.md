## MODIFIED Requirements

### Requirement: Home reproduz o conteúdo e o mecanismo visual da home atual

A home SHALL reproduzir o hero em formato "stories" da home atual (`src/site/HomePage.tsx` + `tech/DeckHero.tsx`): troca automática de slide, navegação por teclado/swipe, pausa no hover/foco e barra de progresso — agora em viewport única, sem scroll de página, e SEM as seções "Como funciona" e "Planos" (que passam a ser acessíveis apenas pelas páginas próprias, via header).

#### Scenario: Hero mantém a interação de antes

- **WHEN** o visitante abre a home
- **THEN** o hero troca de slide automaticamente a cada 6s, aceita navegação por setas do teclado e swipe no mobile, e pausa ao passar o mouse ou focar um elemento dentro dele

#### Scenario: Seção "Como funciona" com link para a página própria

- **WHEN** o visitante quer ver "Como funciona"
- **THEN** o link para a página completa `/como-funciona` fica disponível no header, pois a seção resumida não aparece mais na home

#### Scenario: Home em viewport única, sem as seções internas

- **WHEN** o visitante abre a home
- **THEN** a página ocupa uma única viewport (sem rolagem) e não exibe as seções "Como funciona" nem "Planos"
