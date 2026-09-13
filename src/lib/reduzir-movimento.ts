import { useSyncExternalStore } from 'react'

const CONSULTA_REDUZIDO = '(prefers-reduced-motion: reduce)'

type ConnectionSaveData = {
  saveData?: boolean
}

function salvarDadosAtivo(): boolean {
  if (typeof navigator === 'undefined') return false
  const nav = navigator as Navigator & { connection?: ConnectionSaveData }
  return Boolean(nav.connection?.saveData)
}

function lerReduzido(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false
  return window.matchMedia(CONSULTA_REDUZIDO).matches
}

function assinarReduzido(onChange: () => void): () => void {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return () => {}
  const mql = window.matchMedia(CONSULTA_REDUZIDO)
  mql.addEventListener('change', onChange)
  return () => mql.removeEventListener('change', onChange)
}

/** Hook React */
export function useReduzirMovimento(): boolean {
  const reduzido = useSyncExternalStore(assinarReduzido, lerReduzido, () => false)
  return reduzido || salvarDadosAtivo()
}

export function useDeveAnimar(): boolean {
  return !useReduzirMovimento()
}

/** Vanilla exports para uso fora de componentes React ou em inicialização síncrona */
export function deveReduzirMovimento(): boolean {
  return lerReduzido() || salvarDadosAtivo()
}
export function deveAnimar(): boolean {
  return !deveReduzirMovimento()
}
export { deveAnimar as deveAnimarFn }
