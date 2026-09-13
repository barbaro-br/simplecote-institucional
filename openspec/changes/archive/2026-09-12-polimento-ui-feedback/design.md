## Context

Motivação: ver `proposal.md`. Estado atual relevante:

- `SiteLayout.astro`: header com `border-b border-border/40` (a "linha branca") e nav sem estado ativo. A rota atual pode ser lida estaticamente via `Astro.url.pathname` (build time — sem JS).
- `DeckHero.tsx`: hero com barrinhas segmentadas clicáveis (abaixo do viewport) + controles `‹ ⏸ ›`. Usa `setTimeout` de 6s e `DURACAO_MS`.
- `PassosAutoPlay.tsx`: 4 passos, com os pontos de progresso **entre** os botões voltar/pausar/avançar.
- `precos.astro`: 3 cards com `SpotlightCard` (brilho no hover) + `CardTilt`.

Constraint dura: Astro static output; estado ativo do header deve ser resolvido no build (não via JS), para não depender de client.

## Goals / Non-Goals

**Goals:**

- Remover a linha/borda sob o header; dar destaque de aba ativa + hover no nav.
- Trocar as barrinhas do hero por botão de play/pause que enche + marcador de slide ativo.
- Aumentar para ~6 passos o "Como funciona" e reorganizar o indicador de progresso.
- Melhorar tamanho/hover dos cards de Preços.

**Non-Goals:**

- Não incluir bandeirinha de idioma (PT-BR) nem toggle de tema claro/escuro (futuro).
- Não mudar conteúdo de SEO, links pro app, dados de planos/FAQ.

## Decisions

### 1. Aba ativa no header (build time, sem JS)

No `SiteLayout.astro`, derivar a rota atual com `Astro.url.pathname` e aplicar uma classe de destaque (ex.: `text-accent` + brilho) ao link correspondente, com `aria-current="page"`. Hover nos demais itens via classes Tailwind. Como é resolvido no build, o estado ativo já vem correto no HTML.

**Alternativa:** destacar via JS no cliente — descartado (dependeria de JS, contrário à regra de SEO do projeto).

### 2. Progresso do hero: anel no botão de play/pause + pontos

Remover o bloco de barrinhas segmentadas. O botão de play/pause ganha um **anel de progresso** (SVG `circle` com `stroke-dashoffset` animado ao longo de `DURACAO_MS`, reiniciando a cada slide), e uma fileira de **pontos** marca o slide ativo (clicáveis para navegar). Sob `prefers-reduced-motion`, o anel não anima (fica cheio/estático) e a navegação segue manual.

**Alternativa:** barrinha dentro do botão — descartado; o anel comunica melhor "tempo restante" num controle circular já existente.

### 3. "Como funciona": ~6 passos + progresso separado dos botões

Expandir `PASSOS` para ~6 itens derivados do conteúdo já existente (FAQ + telas do DeckHero + passos atuais):

1. Crie sua conta
2. Abra uma cotação (monte a lista de itens)
3. Convide representantes (link e-mail/WhatsApp)
4. Acompanhe as respostas (quem abriu/respondeu)
5. Compare ao vivo (grade)
6. Feche os pedidos (apurar e gerar pedidos)

O texto reusa o que já existe; qualquer trecho novo fica marcado para revisão do humano. O `VisualPasso` ganha um estado por passo (ou reutiliza os visuais existentes + 2 novos). O indicador de progresso (pontos) sai de **entre** os botões e vai para uma linha própria (ex.: acima dos controles).

### 4. Preços: cards maiores e hover mais presente

Ajustar padding/tamanho dos cards (sem estourar a viewport única) e reforçar o hover: leve `scale` + spotlight/glow mais evidente (reusando o `SpotlightCard` + `CardTilt` já presentes).

## Risks / Trade-offs

- **[Risk] Anel de progresso não animar de forma confiável (repaint)** → Mitigação: usar SVG `stroke-dashoffset` + CSS transition de `DURACAO_MS`, reiniciando via `key`.
- **[Risk] 6 passos não caberem na viewport única** → Mitigação: o painel visual e o texto já trocam por passo (não empilham); reduzir espaçamentos se preciso.
- **[Risk] Estado ativo errado em rotas com prefixo** → Mitigação: comparação exata para `/` e por prefixo para as demais.
- **[Risk] Aumentar os cards de preços estourar a altura** → Mitigação: ajuste incremental e inspeção em viewport baixa.

## Migration Plan

Não se aplica (site estático; mudanças por componente). Rollback = reverter o arquivo da etapa que quebrou.

## Open Questions

- A copy exata dos passos novos do "Como funciona" (derivada do existente) deve ser revisada pelo humano; não bloqueia a estrutura.
