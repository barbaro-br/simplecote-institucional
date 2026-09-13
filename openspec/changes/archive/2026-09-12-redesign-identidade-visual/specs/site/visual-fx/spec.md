## ADDED Requirements

### Requirement: Efeitos consomem os tokens do design system

Os efeitos visuais avançados (Spotlight dos cards, shader do hero, scrollytelling, scrub text, marquee, border beam) SHALL usar as cores de acento/glow e as durações/curvas de motion definidas em `site/design-system`, em vez de valores próprios espalhados pelos componentes.

#### Scenario: Cor do glow acompanha o token de acento

- **WHEN** o token de acento do design system é alterado
- **THEN** o brilho (glow) dos cards de spotlight e os gradientes do texto animado refletem a nova cor, sem edição adicional nos componentes de efeito

#### Scenario: Duração de motion acompanha o token

- **WHEN** a duração/curva de movimento é alterada no token central
- **THEN** os efeitos que usam motion (marquee, shimmer, reveal) adotam o novo valor sem edição adicional
