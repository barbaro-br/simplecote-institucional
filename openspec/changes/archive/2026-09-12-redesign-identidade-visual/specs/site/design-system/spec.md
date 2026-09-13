## Purpose

Define os tokens e as diretrizes da identidade visual do site institucional (cor, tipografia, espaçamento, raios, sombras e motion) e garantir que todas as páginas públicas os consumam de forma consistente, sem regressão de acessibilidade ou SEO.

## ADDED Requirements

### Requirement: Tokens de cor centralizados da paleta refinada

O sistema SHALL definir uma paleta dark refinada (navy profundo + mint) com pelo menos três níveis de texto (primário, secundário, terciário) e níveis distintos de superfície e borda, exposta como CSS custom properties que todos os componentes e páginas SHALL consumir em vez de valores de cor hardcoded.

#### Scenario: Cor aplicada via token, não valor solto

- **WHEN** um componente ou página precisa usar a cor de acento ou de texto
- **THEN** ele referencia a custom property do design system (ex.: a cor de acento), em vez de um hex/rgb espalhado no markup

#### Scenario: Mudança de token propaga para todo o site

- **WHEN** o valor de um token de cor é alterado em um único lugar
- **THEN** todos os componentes e páginas que usam aquele token refletem a nova cor sem edição adicional

### Requirement: Tipografia de marca auto-hospedada

O sistema SHALL usar uma família tipográfica própria (uma sans de leitura para corpo/títulos e, quando necessário, um acento monoespaçado para números/labels técnicos), servida localmente pelo próprio build, aplicada de forma consistente em todas as páginas.

#### Scenario: Fontes carregam do próprio site

- **WHEN** uma página é carregada
- **THEN** as fontes são servidas como assets locais do build (sem requisição externa a CDN de fontes), preservando performance e privacidade do visitante

#### Scenario: Tipografia consistente entre páginas

- **WHEN** duas páginas diferentes do site são comparadas
- **THEN** ambas usam a mesma família tipográfica de marca (sem cair no `system-ui` padrão do navegador)

### Requirement: Escala de espaçamento, raios e sombras

O sistema SHALL definir tokens de espaçamento, raio de borda e sombra reutilizáveis, e os componentes SHALL usar esses tokens para manter ritmo e hierarquia visuais consistentes.

#### Scenario: Componente usa token de raio e espaçamento

- **WHEN** um componente (card, botão, painel) é estilizado
- **THEN** seus raios, paddings e sombras vêm dos tokens do design system, não de valores ad hoc

### Requirement: Motion centralizado e acessível

O sistema SHALL centralizar as durações e curvas de movimento em tokens, e SHALL respeitar `prefers-reduced-motion: reduce`, desativando ou simplificando animações para usuários que assim configurarem.

#### Scenario: Usuário com restrição de movimento

- **WHEN** o visitante tem `prefers-reduced-motion` ativado
- **THEN** as animações de entrada, shimmer e demais movimentos decorativos são desativados ou reduzidos ao mínimo

### Requirement: Identidade aplicada sem regressão de SEO

O redesign SHALL preservar todo o conteúdo textual e as tags de SEO (`<title>`, `<meta name="description">`, og:*) presentes no HTML gerado no build, sem tornar nenhum conteúdo essencial dependente de JavaScript para existir.

#### Scenario: HTML continua indexável após o redesign

- **WHEN** qualquer página é buscada sem executar JavaScript
- **THEN** o HTML retornado ainda contém o título, a descrição e o conteúdo textual da página, com a nova identidade aplicada via CSS/tokens no próprio HTML
