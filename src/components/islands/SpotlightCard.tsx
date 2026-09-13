import { useEffect, useRef, type ReactNode } from 'react'
import { useDeveAnimar } from '../../lib/reduzir-movimento'

/**
 * Card com brilho radial dinâmico contínuo. 
 * Acompanha o ponteiro mesmo quando ele está fora do card (iluminando bordas vizinhas).
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const deveAnimar = useDeveAnimar()

  useEffect(() => {
    if (!deveAnimar || typeof window === 'undefined') return

    const el = ref.current
    if (!el) return

    const aoMover = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect()
      el.style.setProperty('--spot-x', `${e.clientX - rect.left}px`)
      el.style.setProperty('--spot-y', `${e.clientY - rect.top}px`)
    }

    window.addEventListener('pointermove', aoMover, { passive: true })
    return () => window.removeEventListener('pointermove', aoMover)
  }, [deveAnimar])

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden rounded-2xl border bg-background/60 backdrop-blur-sm ${className ?? ''}`}
    >
      {deveAnimar && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
          style={{
            background:
              'radial-gradient(400px circle at var(--spot-x, -1000px) var(--spot-y, -1000px), color-mix(in srgb, var(--accent, var(--brand-mint)) 15%, transparent), transparent 80%)',
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
