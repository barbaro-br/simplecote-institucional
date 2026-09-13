## Context

Motivação: ver `proposal.md`. Estado atual relevante:

- `precos.astro` renderiza `BorderBeam` como filho do `SpotlightCard` do plano destacado; o efeito de borda aparece "por dentro" (o card tem `overflow-hidden`), não contornando o card todo.
- `PassosAutoPlay.tsx` tem 6 estados de visual simples (mockups estáticos) no `VisualPasso`.
- Já existem ilhas ricas que podem ser reaproveitadas: `GradeAoVivoDemo` (preços mudando ao vivo, mais barato em verde) e `ResultadoDemo` (vencedores/valores finais), usadas no `DeckHero`.
- `ajuda.astro` hoje é só `FaqAccordion`; `EmbedYouTube` é um placeholder de player.

Constraint dura: Astro static output; SEO no HTML. O modo apresentação e os previews são client-side (ilhas/scripts), sem alterar o HTML indexável.

## Goals / Non-Goals

**Goals:**

- Contornar o card destacado de preços com a animação de borda.
- Modo apresentação opcional (ciclo automático de páginas), desligado por padrão.
- Reconstruir os 6 previews interativos do "Como funciona".
- Ajuda em dois painéis, com vídeo por pergunta (links placeholder).

**Non-Goals:**

- Não incluir o texto do "Sobre nós" (o humano vai criar).
- Não criar/gravar os vídeos reais (links placeholder).
- Não mudar conteúdo de SEO, dados de planos/FAQ nem links pro app.

## Decisions

### 1. Borda do card de preço contornando o card

Tornar o `BorderBeam` do card destacado um overlay absoluto (`absolute inset-0`) com o anel desenhado na borda externa (reaproveitando a classe `.border-beam`, que já usa `padding: 1px` + `mask` para pintar só o contorno). O card destacado precisa de `position: relative` e `overflow: visible` no wrapper (ou um wrapper sem `overflow-hidden` específico para a borda).

**Alternativa:** mover o `BorderBeam` para fora do `SpotlightCard` — descartado por perder o arredondamento alinhado ao card.

### 2. Modo apresentação via toggle + script vanilla no layout

Um botão discreto no header ativa/desativa o modo. Um `<script>` vanilla no `SiteLayout`:
- lê a flag em `localStorage` (`sc-demo`);
- se ativa, agenda `window.location.href` para a próxima rota após ~25s (ciclo fixo: `/` → `/como-funciona` → `/precos` → `/ajuda` → `/sobre-nos` → `/`);
- a flag persiste entre navegações (por isso sobrevive ao reload de página).

Sem `prefers-reduced-motion` envolvido: o modo é 100% opt-in do usuário.

### 3. Previews do "Como funciona": reaproveitar + criar

- Passos 4 e 5 reutilizam `GradeAoVivoDemo` (preços ao vivo, mais barato verde) e `ResultadoDemo` (vencedores), com dados de demonstração (ex.: produtos como "leite em pó").
- Passos 1, 2, 3 e 6 ganham previews novos: (1) mini-preview do app no cadastro, (2) telinha adicionando itens à cotação, (3) carta/e-mail fluindo no convite, (6) animação do pedido virando carta enviada ao representante.
- O `VisualPasso` continua trocando por `AnimatePresence`; os novos visuais usam `motion/react` (já instalado).

### 4. Ajuda em dois painéis com vídeo

`ajuda.astro` passa a ter um grid: FAQ à esquerda e um painel fixo de vídeo à direita. O `FaqAccordion` ganha um callback `onSelect(pergunta)` (ou o estado de pergunta ativa sobe para a página), que atualiza o `EmbedYouTube` com o `videoUrl` da pergunta. O `faq.ts` ganha um campo opcional `videoUrl?: string` (placeholder; `undefined` = player placeholder até o humano fornecer o link).

## Risks / Trade-offs

- **[Risk] Modo apresentação forçar navegação pode surpreender o visitante** → Mitigação: desligado por padrão, ativado só por clique explícito; desligar interrompe o ciclo.
- **[Risk] Previews novos pesarem no client** → Mitigação: reutilizar componentes já carregados (grade/resultado) e manter as animações leves (`motion/react`).
- **[Risk] Ajustar o `overflow` do card de preço quebrar o `SpotlightCard`** → Mitigação: aplicar o overlay de borda sem remover o `overflow-hidden` do conteúdo interno (wrapper separado).
- **[Risk] Dados fictícios dos produtos (passo 4)** → Mitigação: manter como demo (mesmo padrão de "Fornecedor A/B/C").

## Migration Plan

Não se aplica (site estático; mudanças por componente). Rollback = reverter o arquivo da etapa que quebrou.

## Open Questions

- Links reais dos vídeos do YouTube (serão fornecidos pelo humano depois de gravar); não bloqueiam a estrutura.
- Nomes/quantidade exatos dos produtos de demonstração do passo 4 (dados fictícios, ajustáveis).
