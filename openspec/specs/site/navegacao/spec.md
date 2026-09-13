# site/navegacao Specification

## Purpose

Define o shell global do site — header com navegação, faixa marquee persistente e ausência de footer — com todas as páginas ocupando uma única viewport sem rolagem.

## Requirements

### Requirement: Páginas em viewport única sem scroll

Cada página do site SHALL ocupar uma única viewport (100vh) sem rolagem de página. O conteúdo SHALL ser dimensionado/compactado para caber nessa viewport.

#### Scenario: Abrir qualquer página

- **WHEN** o visitante abre qualquer página do site
- **THEN** a página preenche a viewport (100vh) e não há rolagem vertical de página

### Requirement: Header com as rotas do site

O header SHALL exibir a navegação principal com as rotas Home, Como funciona, Preços, Ajuda e Sobre nós, mantendo o logo como link para a Home e os CTAs "Entrar"/"Criar conta" apontando para o app.

#### Scenario: Navegação pelo header

- **WHEN** o visitante abre qualquer página
- **THEN** o header mostra os links Home, Como funciona, Preços, Ajuda e Sobre nós, cada um levando à respectiva página

### Requirement: Marquee fixa em todas as páginas

A faixa marquee ("Sem fidelidade", "Cancele quando quiser", "Suporte em português", "Grade ao vivo") SHALL permanecer visível de forma persistente em todas as páginas do site.

#### Scenario: Marquee presente ao trocar de página

- **WHEN** o visitante navega entre páginas
- **THEN** a faixa marquee com os diferenciais permanece visível na mesma posição

### Requirement: Sem footer global

O site SHALL não exibir um footer global. As informações que ficavam no footer (sobre o projeto, contato) SHALL migrar para a página "Sobre nós".

#### Scenario: Ausência de footer

- **WHEN** o visitante abre qualquer página
- **THEN** não há rodapé global de links/creditos na página

### Requirement: Modo de apresentação opcional

O site SHALL oferecer um modo de apresentação opcional (ex.: botão/toggle no header) que, quando ativado pelo visitante, navega automaticamente entre as páginas (Home → Como funciona → Preços → Ajuda → Sobre nós, em ciclo) a cada ~20–30 segundos. O modo SHALL ficar desligado por padrão e SHALL não interferir na navegação manual quando desativado.

#### Scenario: Modo desligado por padrão

- **WHEN** o visitante abre o site pela primeira vez
- **THEN** o modo de apresentação está desligado e a navegação é apenas manual

#### Scenario: Ativar o modo de apresentação

- **WHEN** o visitante ativa o modo de apresentação
- **THEN** o site passa a navegar sozinho entre as páginas em ciclo a cada ~20–30 segundos, até que o modo seja desativado

### Requirement: Destaque da aba ativa no header

O header SHALL indicar visualmente qual rota está ativa (ex.: a aba ativa com brilho/destaque na cor de acento, "verde cintilante"), e os itens de navegação SHALL ter um efeito de hover, permitindo ao visitante reconhecer onde está e o que é interativo.

#### Scenario: Aba ativa destacada

- **WHEN** o visitante está em uma página (ex.: Preços)
- **THEN** a aba correspondente no header (ex.: "Preços") fica destacada com brilho na cor de acento, diferente das demais

#### Scenario: Hover nos itens de navegação

- **WHEN** o visitante passa o mouse sobre um item do header
- **THEN** o item responde com um efeito de hover (ex.: mudança de cor/brilho)
