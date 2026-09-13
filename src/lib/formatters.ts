// Cópia local de moeda() de simplecote-front/src/shared/format/formatters.ts
// Sem dependência entre repositórios.
export function moeda(valor: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(valor)
}
