## MODIFIED Requirements

### Requirement: Home reproduz o conteúdo e o mecanismo visual da home atual

A home SHALL reproduzir o hero em formato "stories" da home atual (`src/site/HomePage.tsx` + `tech/DeckHero.tsx`): troca automática de slide, navegação por teclado/swipe, pausa no hover/foco — agora em viewport única, sem scroll de página, e SEM as seções "Como funciona" e "Planos" (que passam a ser acessíveis apenas pelas páginas próprias, via header). O progresso de cada slide SHALL ser indicado pelo botão de play/pause (que enche ao longo da duração do slide) e por um marcador do slide ativo, em vez de barrinhas segmentadas.

#### Scenario: Hero mantém a interação de antes

- **WHEN** o visitante abre a home
- **THEN** o hero troca de slide automaticamente a cada 6s, aceita navegação por setas do teclado e swipe no mobile, e pausa ao passar o mouse ou focar um elemento dentro dele

#### Scenario: Seção "Como funciona" com link para a página própria

- **WHEN** o visitante quer ver "Como funciona"
- **THEN** o link para a página completa `/como-funciona` fica disponível no header, pois a seção resumida não aparece mais na home

#### Scenario: Home em viewport única, sem as seções internas

- **WHEN** o visitante abre a home
- **THEN** a página ocupa uma única viewport (sem rolagem) e não exibe as seções "Como funciona" nem "Planos"

#### Scenario: Progresso indicado pelo botão e marcador do slide ativo

- **WHEN** o visitante observa o hero em execução
- **THEN** o botão de play/pause enche ao longo do slide e um marcador (ex.: pontos) destaca qual slide está ativo
