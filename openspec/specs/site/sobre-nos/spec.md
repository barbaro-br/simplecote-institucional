# site/sobre-nos Specification

## Purpose

Define a página "Sobre nós", dedicada ao intuito do projeto, à história de como ele foi feito e a um canal de contato ("fale aqui").

## Requirements

### Requirement: Página Sobre nós acessível pelo header

O sistema SHALL oferecer, em `/sobre-nos`, uma página acessível pelo header, em viewport única (sem scroll).

#### Scenario: Acessar Sobre nós pelo header

- **WHEN** o visitante clica em "Sobre nós" no header
- **THEN** é levado a `/sobre-nos`, que abre em tela cheia sem rolagem de página

### Requirement: Conteúdo de intuito e história do projeto

A página SHALL apresentar o intuito do projeto e a história de como ele foi construído (backstory). A copy final SHALL ser fornecida pelo humano (o conteúdo ainda não existe no README e não deve ser inventado).

#### Scenario: Seções de intuito e história presentes

- **WHEN** o visitante abre `/sobre-nos`
- **THEN** a página exibe as seções de intuito do projeto e de história/backstory, com o texto fornecido pelo humano

### Requirement: Canal de contato (fale aqui)

A página SHALL oferecer um meio de contato/feedback ("fale aqui"), absorvendo o papel de contato que antes ficava no footer.

#### Scenario: Contato disponível

- **WHEN** o visitante abre `/sobre-nos`
- **THEN** há um canal de contato/feedback visível (ex.: e-mail ou link "fale aqui")

### Requirement: SEO próprio da página Sobre nós

A página SHALL definir `<title>` e `<meta name="description">` específicos, presentes no HTML do build, distintos das demais páginas.

#### Scenario: Título e descrição próprios

- **WHEN** a página `/sobre-nos` é carregada sem JavaScript
- **THEN** o HTML contém `<title>` e `<meta name="description">` específicos da página Sobre nós, diferentes dos das outras páginas
