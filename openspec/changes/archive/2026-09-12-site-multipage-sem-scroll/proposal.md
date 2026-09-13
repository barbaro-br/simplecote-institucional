## Why

O site já é multipage, mas cada página é longa e depende de rolagem vertical (sessões empilhadas, footer global, scrollytelling). O usuário quer uma experiência de "aplicativo" de tela cheia: cada rota (Home, Como funciona, Preços, Ajuda, Sobre nós) ocupa uma única viewport **sem scroll**, com a navegação no header e uma faixa marquee fixa. Isso também reforça o SEO, já que cada assunto vira uma página própria, curta e com `<title>`/`<meta description>` específicos.

## What Changes

- **Navegação global (sem scroll)**: header passa a listar Home, Como funciona, Preços, Ajuda e Sobre nós; cada página ocupa `100vh` sem rolagem de página.
- **Home** vira apenas o hero em formato "stories" (o `DeckHero`), sem as seções "Como funciona" e "Planos" (que já têm páginas próprias).
- **Como funciona**: substitui o scrollytelling (acionado por scroll) por passos que avançam automaticamente (auto-play) — o texto do passo e o quadrinho lateral animam sozinhos, com controles de pausa/voltar.
- **Preços e Ajuda**: conteúdo compactado para caber em `100vh` (sem rolagem de página; Ajuda pode usar painel interno/accordion).
- **Remover o footer global** e transformar a faixa marquee ("Sem fidelidade, Cancele quando quiser, Suporte em português, Grade ao vivo") em elemento **fixo/persistente** em todas as páginas.
- **Nova página "Sobre nós"**: intuito do projeto, como foi feito (backstory) e contato ("fale aqui"), absorvendo o papel que era do footer. A copy final vem do humano (README ainda não tem esse conteúdo).

## Capabilities

### New Capabilities

- `site/navegacao`: shell global — header com as 5 rotas, marquee fixa persistente e ausência de footer, com todas as páginas em viewport única (sem scroll).
- `site/sobre-nos`: página dedicada com intuito/backstory e contato, no header.

### Modified Capabilities

- `site/home`: deixa de exibir as seções "Como funciona" e "Planos" e passa a ser apenas o hero em tela cheia.
- `site/como-funciona`: o passo a passo deixa de ser acionado por scroll (scrollytelling) e passa a avançar automaticamente (auto-play).
- `site/precos`: conteúdo compactado para caber em uma viewport sem scroll.
- `site/ajuda`: conteúdo compactado para caber em uma viewport sem scroll.

## Impact

- `src/layouts/SiteLayout.astro` (header/nav, remoção do footer, marquee fixa), `src/pages/index.astro`, `src/pages/precos.astro`, `src/pages/ajuda.astro`, `src/pages/como-funciona.astro`, novo `src/pages/sobre-nos.astro`.
- Ilha `src/components/islands/ScrollytellingMockups.tsx` deixa de ser usada na Como funciona (substituída por auto-play); `DeckHero`, `SpotlightCard`, `Marquee`, `FaqAccordion` são reutilizados.
- **Fora de escopo**: `/para-supermercados` (landing de SEO separada, não listada no header) mantém o comportamento atual por ora.
- Sem novas dependências; sem mudança nos requisitos de SEO (`site/seo`) nem nos links pro app.
