## Purpose

Página inicial (`/`) — primeira impressão do produto, com o hero em formato "stories" e as seções de conteúdo que hoje moram na home do `simplecote-front`.

## ADDED Requirements

### Requirement: Home reproduz o conteúdo e o mecanismo visual da home atual

A home SHALL reproduzir, com o mesmo conteúdo textual e a mesma experiência visual da home atual do `simplecote-front` (`src/site/HomePage.tsx` + `tech/DeckHero.tsx`): o hero em formato "stories" com troca automática de slide, navegação por teclado/swipe, pausa no hover/foco e barra de progresso; seguido das seções "Como funciona" e "Planos".

#### Scenario: Hero mantém a interação de antes

- **WHEN** o visitante abre a home
- **THEN** o hero troca de slide automaticamente a cada 6s, aceita navegação por setas do teclado e swipe no mobile, e pausa ao passar o mouse ou focar um elemento dentro dele — igual ao comportamento do `simplecote-front` hoje

#### Scenario: Seção "Como funciona" com link para a página própria

- **WHEN** o visitante rola até a seção "Como funciona" da home
- **THEN** o conteúdo resumido aparece, com um link para a página completa `/como-funciona`

### Requirement: Título e descrição da home miram a categoria de solução

O `<title>`/`<meta name="description">` da home SHALL comunicar a categoria do produto ("cotação competitiva para supermercados"), reproduzindo a mensagem já validada na home atual — não um texto genérico de placeholder.

#### Scenario: Título da home

- **WHEN** a home é carregada
- **THEN** o `<title>` contém "SimpleCote" e a frase "cotações competitivas para supermercados" (ou equivalente direto), igual ao `useSEO` da home atual do `simplecote-front`
