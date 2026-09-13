## MODIFIED Requirements

### Requirement: Página própria explicando o mecanismo do leilão reverso

O sistema SHALL oferecer, em `/como-funciona`, uma página dedicada explicando o passo a passo do leilão reverso (abrir cotação → convidar representantes → comparar e economizar). A página SHALL utilizar o padrão de "Scrollytelling": ao rolar a seção de passos, o painel de texto desliza normalmente enquanto um painel de visualização adjacente/relacionado (sticky) muda de estado ilustrando o passo ativo correspondente. A página SHALL ter CTA para "Criar conta" ao final.

#### Scenario: Acessar a página diretamente

- **WHEN** um visitante acessa `/como-funciona` diretamente (sem vir pela home)
- **THEN** a página carrega com o conteúdo completo do mecanismo, sem depender de ter visitado a home antes

#### Scenario: Scrollytelling dos 3 Passos

- **WHEN** o usuário faz scroll passando pelos textos explicativos dos passos 1, 2 e 3
- **THEN** a parte visual dedicada a ilustrar os passos atualiza dinamicamente e fica fixada na tela para manter o contexto visual enquanto o texto passa

#### Scenario: Título mira o termo de busca do mecanismo

- **WHEN** a página é carregada
- **THEN** o `<title>` contém uma frase específica sobre o mecanismo (ex.: "Como funciona a cotação competitiva | SimpleCote"), diferente do título da home

#### Scenario: CTA ao final da página

- **WHEN** o visitante rola até o final da página
- **THEN** um botão "Criar conta" está disponível, linkando para o app (`site/seo` - "Botão Criar conta leva ao app")
