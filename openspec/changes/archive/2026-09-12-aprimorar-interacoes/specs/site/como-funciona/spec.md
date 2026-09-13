## MODIFIED Requirements

### Requirement: Página própria explicando o mecanismo do leilão reverso

O sistema SHALL oferecer, em `/como-funciona`, uma página dedicada explicando o passo a passo do leilão reverso em cerca de 6 passos (criar conta, abrir cotação, convidar representantes, acompanhar respostas, comparar e fechar pedidos), em viewport única (sem scroll). Os passos SHALL avançar automaticamente (auto-play), com controles de pausa/voltar. Cada passo SHALL exibir um painel de visualização interativo específico (ex.: preview do app no cadastro, tela adicionando itens, carta de convite, lista de preços mudando ao vivo, resultado dos vencedores e animação do pedido virando carta). A página SHALL ter CTA para "Criar conta".

#### Scenario: Acessar a página diretamente

- **WHEN** um visitante acessa `/como-funciona` diretamente (sem vir pela home)
- **THEN** a página carrega com o conteúdo completo do mecanismo, sem depender de ter visitado a home antes

#### Scenario: Scrollytelling dos 3 Passos

- **WHEN** o visitante abre `/como-funciona`
- **THEN** os passos são exibidos em auto-play: o passo ativo e o painel de visualização avançam sozinhos, com controles de pausar e voltar

#### Scenario: Título mira o termo de busca do mecanismo

- **WHEN** a página é carregada
- **THEN** o `<title>` contém uma frase específica sobre o mecanismo (ex.: "Como funciona a cotação competitiva | SimpleCote"), diferente do título da home

#### Scenario: CTA ao final da página

- **WHEN** o visitante vê a página
- **THEN** um botão "Criar conta" está disponível, linkando para o app (`site/seo` - "Botão Criar conta leva ao app")

#### Scenario: Previews interativos por passo

- **WHEN** o visitante observa um passo
- **THEN** o painel visual exibe o preview interativo daquele passo (ex.: lista de preços mudando ao vivo no passo de acompanhar respostas, ou animação de carta no passo de fechar pedidos)
