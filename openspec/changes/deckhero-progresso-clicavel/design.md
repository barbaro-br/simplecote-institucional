## Context

Motivação: ver `proposal.md`. Hoje o `DeckHero` renderiza a barra de progresso segmentada num bloco próprio **no topo** da `<section>` (acima do viewport dos slides) e os controles `‹ ⏸ ›` num bloco **no rodapé**. Os segmentos são `<span>` passivos. O header do site é `fixed top-0`, então as barrinhas encostam/ficam atrás dele.

## Goals / Non-Goals

**Goals:**

- Mover o indicador de progresso para a base do hero, junto dos controles.
- Tornar cada segmento um controle de navegação clicável.

**Non-Goals:**

- Não alterar auto-rotação, teclado, swipe, pausa no hover/foco nem `prefers-reduced-motion`.
- Não mexer no layout dos slides nem no conteúdo.

## Decisions

### 1. Posição: indicador logo acima da linha de controles

O bloco de progresso sai do topo e passa a ficar **logo acima** (ou junto) da linha de controles no rodapé da seção. Manter uma linha própria (progresso) seguida da linha de controles preserva o ritmo visual atual e evita misturar hit areas pequenas.

**Alternativa:** fundir os segmentos na mesma linha dos botões `‹ ⏸ ›` — descartado porque deixa a região densa e os alvos de clique próximos demais no mobile.

### 2. Segmentos viram `<button>` reais

Cada segmento vira um `<button>` (não `<span role="button">`), chamando `ir(i)` no clique, com:
- `aria-label={`Ir para o slide ${i + 1}: ${rotulo}`}`
- `aria-current={i === indice ? 'true' : undefined}`

Isso mantém a navegação acessível por teclado (foco/tab) sem trabalho extra, consistente com os botões `‹ ⏸ ›` já existentes.

**Alternativa:** manter `<span>` com `role="button"` + `tabIndex` — descartado por exigir manipulação manual de foco/teclado.

### 3. Animação de preenchimento preservada

O preenchimento continua no `<span>` interno com `@keyframes deck-fill` e o padrão de `key` atual (`${id}-${indice}-${anim}`) que já reinicia a animação a cada troca de slide. Clicar num segmento apenas chama `ir(i)`, e o mecanismo de animação existente cuida do resto — nenhuma lógica nova de timer.

### 4. `prefers-reduced-motion`

Com `prefers-reduced-motion`, o deck já não gira sozinho (`rodando = false`); os segmentos continuam clicáveis (navegação manual), apenas sem a animação de preenchimento — comportamento compatível com o requisito de acessibilidade.

## Risks / Trade-offs

- **[Risk] Segmentos clicáveis muito próximos dos controles no mobile** → Mitigação: linha de progresso separada da linha de controles com `gap` adequado; hit area dos botões limitada à altura do segmento.
- **[Risk] Foco via teclado salta para os segmentos e muda o slide sem intenção** → Mitigação: `aria-label` claro e comportamento idêntico aos botões existentes; não adicionar `autofocus`.
- **[Risk] Regressão no preenchimento ao clicar rapidamente** → Mitigação: reutilizar o `key` existente, que já força reinício correto da animação.

## Migration Plan

Não se aplica (site estático; mudança confinada a um componente). Rollback = reverter a edição do `DeckHero.tsx`.

## Open Questions

Nenhuma.
