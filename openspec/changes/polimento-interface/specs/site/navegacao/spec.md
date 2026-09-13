## Purpose

Define a experiência global de navegação superior (header) e rodapé, garantindo que o usuário se localize e navegue facilmente entre as páginas do site institucional.

## ADDED Requirements

### Requirement: Header Flutuante (Floating Glass Header)

O site SHALL apresentar um cabeçalho global flutuante (`sticky` no topo) com efeito visual translúcido (glassmorphism/blur), contendo a logo da SimpleCote, links primários ("Preços", "Como funciona", "Ajuda") e o botão de login ("Entrar"). A logo SHALL funcionar como atalho implícito para a Home (`/`).

#### Scenario: Acesso à Home via Logo

- **WHEN** o usuário clica na logo no cabeçalho em qualquer página
- **THEN** ele é redirecionado para a página inicial (`/`)

#### Scenario: Acesso ao Como Funciona via Header

- **WHEN** o usuário visualiza o cabeçalho
- **THEN** existe um link explícito para "Como funciona" junto com "Preços" e "Ajuda"
