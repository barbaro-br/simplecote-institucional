## 1. Reposicionar o indicador de progresso

- [x] 1.1 Em `src/components/islands/DeckHero.tsx`, remover o bloco de progresso do topo da `<section>` (o `<div class="mx-auto flex ... pt-4">` atual) e re-posicioná-lo na base do hero, logo acima da linha de controles `‹ ⏸ ›`. Verificar no `npm run dev` que as barrinhas aparecem junto aos controles e não mais atrás do header fixo.

## 2. Segmentos clicáveis

- [x] 2.1 Trocar cada `<span>` de segmento por um `<button type="button">` que chama `ir(i)` no clique, com `aria-label` (ex.: "Ir para o slide N: <rótulo>") e `aria-current` no segmento ativo, mantendo o `<span>` interno de preenchimento (`deck-fill`) e o padrão de `key` atual. Verificar no navegador que clicar num segmento exibe o slide correspondente e o segmento clicado vira o ativo.

## 3. Revisão de interação e acessibilidade

- [x] 3.1 Confirmar no navegador que auto-rotação (6s), teclado (setas), swipe, pausa no hover/foco e `prefers-reduced-motion` (deck manual, segmentos ainda clicáveis) seguem funcionando. Rodar `npm run build` para garantir que a ilha compila sem erro.
