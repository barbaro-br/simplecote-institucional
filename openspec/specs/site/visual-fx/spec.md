# site/visual-fx Specification

## Purpose
Define regras e comportamentos para efeitos visuais globais baseados em interações (scroll, ponteiro) no site institucional.

## Requirements

### Requirement: Efeitos não quebram acessibilidade ou SEO
O sistema SHALL implementar efeitos avançados (WebGL, ScrollTrigger, Framer Motion) apenas em clientes ("client-side") utilizando SSR ou Progressive Enhancement para que o conteúdo original permaneça inteiramente legível por leitores de tela e indexadores, e SHALL desativar animações intrusivas se o usuário configurar `prefers-reduced-motion: reduce`.

#### Scenario: Usuário com restrição de movimento
- **WHEN** um usuário visita a página com `prefers-reduced-motion` ativado no SO
- **THEN** os shaders 3D não movem/animam freneticamente e o scrollytelling se comporta como uma rolagem tradicional sem scrubbing ou motion complexo.

### Requirement: Hero Fundo Interativo
O `HeroFundo` SHALL renderizar um WebGL de malha interativo onde nós (representando conexões de fornecedores e supermercados) reagem de forma elástica ou iluminada ao passar o ponteiro.

#### Scenario: Interação com o Hero
- **WHEN** o mouse move sobre a malha de fundo
- **THEN** a malha responde sutilmente acompanhando ou iluminando os nós próximos ao ponteiro.

### Requirement: Efeitos de Spotlight Dinâmico
Cards de conteúdo principal e preços SHALL utilizar efeito radial ("glow") nas bordas/fundo sempre atrelado à posição do mouse, provendo feedback imediato.

#### Scenario: Passar o mouse sobre os planos
- **WHEN** o usuário movimenta o ponteiro sobre o grid de planos
- **THEN** um halo de luz dinâmico ilumina a borda exata próxima ao cursor, de forma contínua através dos cards vizinhos.
