## MODIFIED Requirements

### Requirement: Home reproduz o conteúdo e o mecanismo visual da home atual

A home SHALL reproduzir, com o mesmo conteúdo textual e as mesmas interações da home atual do `simplecote-front` (`src/site/HomePage.tsx` + `tech/DeckHero.tsx`): o hero em formato "stories" com troca automática de slide, navegação por teclado/swipe, pausa no hover/foco e barra de progresso; seguido das seções "Como funciona" e "Planos". A aparência (cores, tipografia, espaçamento) SHALL seguir a identidade visual definida em `site/design-system`, não a aparência literal do `simplecote-front`.

#### Scenario: Hero mantém a interação de antes

- **WHEN** o visitante abre a home
- **THEN** o hero troca de slide automaticamente a cada 6s, aceita navegação por setas do teclado e swipe no mobile, e pausa ao passar o mouse ou focar um elemento dentro dele — igual ao comportamento do `simplecote-front` hoje

#### Scenario: Seção "Como funciona" com link para a página própria

- **WHEN** o visitante rola até a seção "Como funciona" da home
- **THEN** o conteúdo resumido aparece, com um link para a página completa `/como-funciona`
