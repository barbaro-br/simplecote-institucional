import { useRef, type ElementType, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'motion/react'

const RAIO = 24

interface Props {
  children: ReactNode
  className?: string
  as?: ElementType
  [key: string]: any
}

export function BotaoMagnetico({ children, className, as = 'button', ...props }: Props) {
  const ref = useRef<HTMLElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 200, damping: 15 })
  const sy = useSpring(y, { stiffness: 200, damping: 15 })

  const aoMover = (e: React.PointerEvent<HTMLElement>) => {
    if (typeof window.matchMedia === 'function' && !window.matchMedia('(pointer: fine)').matches) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = e.clientX - (rect.left + rect.width / 2)
    const dy = e.clientY - (rect.top + rect.height / 2)
    const dist = Math.hypot(dx, dy)
    const fator = Math.min(1, RAIO / (dist || 1))
    x.set(dx * fator * 0.4)
    y.set(dy * fator * 0.4)
  }

  const aoSair = () => {
    x.set(0)
    y.set(0)
  }

  const MotionComponent = motion.create(as as any)

  return (
    <MotionComponent
      ref={ref}
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={aoMover}
      onPointerLeave={aoSair}
      {...props}
    >
      {children}
    </MotionComponent>
  )
}
