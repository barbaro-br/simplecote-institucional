## ADDED Requirements

### Requirement: Modo de apresentação opcional

O site SHALL oferecer um modo de apresentação opcional (ex.: botão/toggle no header) que, quando ativado pelo visitante, navega automaticamente entre as páginas (Home → Como funciona → Preços → Ajuda → Sobre nós, em ciclo) a cada ~20–30 segundos. O modo SHALL ficar desligado por padrão e SHALL não interferir na navegação manual quando desativado.

#### Scenario: Modo desligado por padrão

- **WHEN** o visitante abre o site pela primeira vez
- **THEN** o modo de apresentação está desligado e a navegação é apenas manual

#### Scenario: Ativar o modo de apresentação

- **WHEN** o visitante ativa o modo de apresentação
- **THEN** o site passa a navegar sozinho entre as páginas em ciclo a cada ~20–30 segundos, até que o modo seja desativado
