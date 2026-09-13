## Purpose

Componentes transversais de micro-interação, focados em botões magnéticos e revelação tipográfica (Scrub Text) em áreas nobres das páginas institucionais.

## ADDED Requirements

### Requirement: Botões principais utilizam interação magnética

Os botões de CTA primários da barra de navegação e áreas-chave (ex: "Criar conta") SHALL ter o comportamento "Magnético". Isso cria um efeito físico interativo onde o elemento se move sutilmente em direção ao ponteiro do mouse quando sobreposto.

#### Scenario: Interação magnética em Desktop

- **WHEN** o cursor do usuário entra na área limite de atração de um CTA principal
- **THEN** o botão é levemente deslocado em direção ao cursor, usando animação elástica (spring).
