## Why

Depois da busca web, o site ficou muito bom, mas o usuário listou ajustes finos de interface: há uma linha branca sob o header, o indicador de progresso dos slides do Home ainda é "barrinha" segmentada, a página Como funciona tem só 4 passos (com a barrinha de progresso espremida entre os botões), os cards de Preços podem melhorar de tamanho/hover, e o header não indica qual aba está ativa.

## What Changes

- **Remover a linha branca do header**: retirar a borda inferior do header (a "linha" que aparece logo abaixo dele).
- **Progresso do hero (Home)**: substituir as barrinhas segmentadas por um indicador no botão de play/pause (que enche ao longo dos 6s de cada slide) + um marcador (pontos) mostrando qual slide está ativo.
- **Como funciona**: expandir de 4 para ~6 passos, aproveitando o conteúdo que já existe no projeto (FAQ, telas do DeckHero, passos atuais), e reorganizar o indicador de progresso (tirá-lo de entre os botões voltar/pausar/avançar).
- **Preços**: melhorar o tamanho dos cards e o efeito de hover (mais presença e resposta ao passar o mouse).
- **Aba ativa no header**: destacar visualmente a rota ativa (Home, Como funciona, Preços, Ajuda, Sobre nós) com brilho/verde cintilante, e adicionar efeito de hover nos itens.

## Capabilities

### New Capabilities

(nenhuma)

### Modified Capabilities

- `site/home`: o indicador de progresso do hero deixa de ser barra segmentada e passa a ser o botão de play/pause (que enche) + marcador do slide ativo.
- `site/como-funciona`: o passo a passo passa de 4 para ~6 passos (derivados do conteúdo existente) e o indicador de progresso é reorganizado para fora dos botões de navegação.
- `site/navegacao`: o header passa a destacar visualmente a aba/rota ativa e a ter efeito de hover nos itens.

## Impact

- `src/components/islands/DeckHero.tsx` (progresso do hero), `src/components/islands/PassosAutoPlay.tsx` (mais passos + progresso), `src/layouts/SiteLayout.astro` (remover borda do header + aba ativa/hover), `src/pages/precos.astro` (tamanho/hover dos cards).
- Sem novas dependências; sem mudança de conteúdo de SEO, links pro app ou dados de planos/FAQ.
- **Fora de escopo (futuro)**: bandeirinha de idioma (PT-BR) e toggle de tema claro/escuro — mencionados pelo usuário como "mais pra frente", ficam de fora desta change.
- A copy dos novos passos do "Como funciona" é derivada do conteúdo já existente (FAQ/DeckHero/passos atuais); qualquer texto novo fica marcado para revisão do humano.
