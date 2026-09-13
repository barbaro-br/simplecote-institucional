## 1. Borda do card de preço

- [x] 1.1 Em `precos.astro`, reposicionar o `BorderBeam` do card destacado para contornar o card inteiro (overlay absoluto no contorno), sem aparecer "por dentro". Verificar no navegador que a animação contorna o card todo.

## 2. Modo apresentação (`SiteLayout.astro`)

- [x] 2.1 Adicionar um toggle discreto no header que ativa/desativa o modo apresentação, persistindo em `localStorage`. Verificar o botão presente no header.
- [x] 2.2 Adicionar um `<script>` vanilla que, com o modo ativo, navega automaticamente em ciclo (`/` → `/como-funciona` → `/precos` → `/ajuda` → `/sobre-nos` → `/`) a cada ~25s. Verificar que, com o modo ativado, a página troca sozinha após o intervalo.

## 3. Previews do Como funciona (`PassosAutoPlay.tsx`)

- [x] 3.1 Reconstruir o visual do passo 1 (cadastro) como um mini-preview do app. Verificar `npm run build` e o preview exibido.
- [x] 3.2 Reconstruir o visual do passo 2 (abrir cotação) como uma telinha adicionando itens à cotação.
- [x] 3.3 Reconstruir o visual do passo 3 (convite) como uma animação de carta/e-mail fluindo (substituindo a bolinha/círculo).
- [x] 3.4 Reconstruir o visual do passo 4 (acompanhar respostas) reaproveitando `GradeAoVivoDemo` com ~5 produtos fictícios (ex.: leite em pó) e preços mudando ao vivo (mais barato em verde).
- [x] 3.5 Reconstruir o visual do passo 5 (vencedores) reaproveitando `ResultadoDemo` com os preços finais.
- [x] 3.6 Reconstruir o visual do passo 6 (fechar pedidos) como animação do pedido virando carta enviada ao representante.

## 4. Ajuda em dois painéis (`ajuda.astro` / `FaqAccordion.tsx` / `faq.ts`)

- [x] 4.1 Adicionar campo opcional `videoUrl?` ao `faq.ts` e fazer o `FaqAccordion` emitir a pergunta selecionada (ex.: `onSelect`).
- [x] 4.2 Reestruturar `ajuda.astro` em dois painéis: FAQ à esquerda e painel fixo de vídeo (`EmbedYouTube`) à direita, mostrando o vídeo da pergunta clicada (placeholder quando `videoUrl` ausente). Verificar que clicar numa pergunta atualiza o painel de vídeo.

## 5. Revisão

- [x] 5.1 Rodar `npm run build` e inspecionar Home, Preços, Como funciona, Ajuda e Sobre nós: borda do card, toggle de apresentação, 6 previews e painel de vídeo funcionando sem quebrar o layout de viewport única.
