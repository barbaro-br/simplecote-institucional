# site/visual-fx Specification

## Purpose
Define regras e comportamentos para efeitos visuais globais baseados em interações (scroll, ponteiro) no site institucional.

## Requirements

### Requirement: Efeitos não quebram acessibilidade ou SEO
O sistema SHALL implementar efeitos avançados (WebGL, ScrollTrigger, Framer Motion) apenas em clientes ("client-side") utilizando SSR ou Progressive Enhancement para que o conteúdo original permaneça inteiramente legível por leitores de tela e indexadores, e SHALL desativar animações intrusivas se o usuário configurar `prefers-reduced-motion: reduce`.

#### Scenario: Usuário com restrição de movimento
- **WHEN** um usuário visita a página com `prefers-reduced-motion` ativado no SO
- **THEN** os shaders 3D não movem/animam freneticamente e as transições entre passos/slides não usam motion complexo.

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

### Requirement: Efeitos consomem os tokens do design system

Os efeitos visuais avançados (Spotlight dos cards, shader do hero, marquee, border beam, reveal por troca de slide) SHALL usar as cores de acento/glow e as durações/curvas de motion definidas em `site/design-system`, em vez de valores próprios espalhados pelos componentes.

#### Scenario: Cor do glow acompanha o token de acento

- **WHEN** o token de acento do design system é alterado
- **THEN** o brilho (glow) dos cards de spotlight e os gradientes do texto animado refletem a nova cor, sem edição adicional nos componentes de efeito

#### Scenario: Duração de motion acompanha o token

- **WHEN** a duração/curva de movimento é alterada no token central
- **THEN** os efeitos que usam motion (marquee, shimmer, reveal) adotam o novo valor sem edição adicional
