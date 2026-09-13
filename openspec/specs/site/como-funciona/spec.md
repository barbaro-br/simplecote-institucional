# site/como-funciona Specification

## Purpose
Página nova, dedicada a explicar o mecanismo do leilão reverso em detalhe — hoje existe só como uma seção curta dentro da home, sem URL própria (não indexável separadamente).

## Requirements

### Requirement: Página própria explicando o mecanismo do leilão reverso

O sistema SHALL oferecer, em `/como-funciona`, uma página dedicada explicando o passo a passo do leilão reverso (abrir cotação → convidar representantes → comparar e economizar), em viewport única (sem scroll). Os passos SHALL avançar automaticamente (auto-play): o texto do passo ativo e o painel de visualização adjacente animam sozinhos, com controles de pausa/voltar. A página SHALL ter CTA para "Criar conta".

#### Scenario: Acessar a página diretamente

- **WHEN** um visitante acessa `/como-funciona` diretamente (sem vir pela home)
- **THEN** a página carrega com o conteúdo completo do mecanismo, sem depender de ter visitado a home antes

#### Scenario: Scrollytelling dos 3 Passos

- **WHEN** o visitante abre `/como-funciona`
- **THEN** o passo 1 é exibido com o painel ilustrando o passo; após alguns segundos avança automaticamente para o passo 2 e depois para o 3, atualizando o painel a cada troca, com controles de pausar e voltar

#### Scenario: Título mira o termo de busca do mecanismo

- **WHEN** a página é carregada
- **THEN** o `<title>` contém uma frase específica sobre o mecanismo (ex.: "Como funciona a cotação competitiva | SimpleCote"), diferente do título da home

#### Scenario: CTA ao final da página

- **WHEN** o visitante vê a página
- **THEN** um botão "Criar conta" está disponível, linkando para o app (`site/seo` - "Botão Criar conta leva ao app")
