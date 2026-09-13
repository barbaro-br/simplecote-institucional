## MODIFIED Requirements

### Requirement: Home reproduz o conteúdo e o mecanismo visual da home atual

A home SHALL reproduzir, com o mesmo conteúdo textual e a mesma experiência visual da home atual do `simplecote-front` (`src/site/HomePage.tsx` + `tech/DeckHero.tsx`): o hero em formato "stories" com troca automática de slide, navegação por teclado/swipe, pausa no hover/foco e barra de progresso; seguido das seções "Como funciona" e "Planos". A rolagem principal da página SHALL utilizar Scroll Snapping (`scroll-snap-type: y mandatory`) em telas desktop (e opcionalmente em mobile, se a altura permitir) para que cada seção ocupe a altura total da tela e o scroll trave no início exato de cada bloco.

#### Scenario: Hero mantém a interação de antes

- **WHEN** o visitante abre a home
- **THEN** o hero troca de slide automaticamente a cada 6s, aceita navegação por setas do teclado e swipe no mobile, e pausa ao passar o mouse ou focar um elemento dentro dele — igual ao comportamento do `simplecote-front` hoje

#### Scenario: Seção "Como funciona" com link para a página própria

- **WHEN** o visitante rola até a seção "Como funciona" da home
- **THEN** o conteúdo resumido aparece, com um link para a página completa `/como-funciona`

#### Scenario: Snap Scrolling entre seções na Home

- **WHEN** o visitante realiza o movimento de rolagem (scroll)
- **THEN** a tela não para no meio-termo entre duas seções; ela é magneticamente ajustada para o início (topo) da seção mais próxima ("Hero", "Como Funciona" ou "Planos")
