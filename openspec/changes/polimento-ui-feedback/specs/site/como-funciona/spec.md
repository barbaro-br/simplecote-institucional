## MODIFIED Requirements

### Requirement: Página própria explicando o mecanismo do leilão reverso

O sistema SHALL oferecer, em `/como-funciona`, uma página dedicada explicando o passo a passo do leilão reverso em cerca de 6 passos (ex.: criar conta, abrir cotação, convidar representantes, acompanhar respostas, comparar ao vivo e fechar pedidos), em viewport única (sem scroll). Os passos SHALL avançar automaticamente (auto-play): o texto do passo ativo e o painel de visualização adjacente animam sozinhos, com controles de pausa/voltar. O indicador de progresso SHALL ficar organizado separadamente dos botões de navegação. A página SHALL ter CTA para "Criar conta".

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

#### Scenario: Mais passos exibidos

- **WHEN** o visitante vê a página `/como-funciona`
- **THEN** há cerca de 6 passos cobrindo o fluxo completo (criar conta até fechar pedidos), além dos 4 atuais
