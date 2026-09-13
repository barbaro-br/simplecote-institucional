import { useSyncExternalStore } from 'react'

const MD = '(min-width: 768px)'

function lerLarga(): boolean {
  if (typeof window === 'undefined') return false
  if (typeof window.matchMedia === 'function') return window.matchMedia(MD).matches
  return typeof window.innerWidth === 'number' && window.innerWidth >= 768
}

function assinarLarga(onChange: () => void): () => void {
  if (typeof window === 'undefined') return () => {}
  if (typeof window.matchMedia === 'function') {
    const mql = window.matchMedia(MD)
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }
  window.addEventListener('resize', onChange)
  return () => window.removeEventListener('resize', onChange)
}

export function useViewportLarga(): boolean {
  return useSyncExternalStore(assinarLarga, lerLarga, () => false)
}

export function viewportLarga(): boolean {
  return lerLarga()
}
