## Purpose

Página nova, dedicada a explicar o mecanismo do leilão reverso em detalhe — hoje existe só como uma seção curta dentro da home, sem URL própria (não indexável separadamente).

## ADDED Requirements

### Requirement: Página própria explicando o mecanismo do leilão reverso

O sistema SHALL oferecer, em `/como-funciona`, uma página dedicada explicando o passo a passo do leilão reverso (abrir cotação → convidar representantes → comparar e economizar — o mesmo conteúdo dos 3 passos já usados na home, com mais profundidade textual do que o resumo da home). A página SHALL ter CTA para "Criar conta" ao final.

#### Scenario: Acessar a página diretamente

- **WHEN** um visitante acessa `/como-funciona` diretamente (sem vir pela home)
- **THEN** a página carrega com o conteúdo completo do mecanismo, sem depender de ter visitado a home antes

#### Scenario: Título mira o termo de busca do mecanismo

- **WHEN** a página é carregada
- **THEN** o `<title>` contém uma frase específica sobre o mecanismo (ex.: "Como funciona a cotação competitiva | SimpleCote"), diferente do título da home

#### Scenario: CTA ao final da página

- **WHEN** o visitante rola até o final da página
- **THEN** um botão "Criar conta" está disponível, linkando para o app (`site/seo` - "Botão Criar conta leva ao app")
