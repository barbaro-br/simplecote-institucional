import { useEffect, useRef } from 'react'
import { cn } from '../../lib/cn'
import { gsap, ScrollTrigger, SplitText } from '../../lib/gsap-scroll'
import { useDeveAnimar } from '../../lib/reduzir-movimento'

interface ScrubTextProps {
  children: React.ReactNode
  className?: string
  /** Se 'words', quebra por palavras. Se 'chars', quebra por letras. Padrão: 'words' */
  splitType?: 'words' | 'chars'
}

export function ScrubText({ children, className, splitType = 'words' }: ScrubTextProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const deveAnimar = useDeveAnimar()

  useEffect(() => {
    if (!deveAnimar || !textRef.current || typeof window === 'undefined') return

    // Evitar flash inicial
    gsap.set(textRef.current, { visibility: 'visible' })

    const split = new SplitText(textRef.current, { type: splitType })
    const targets = splitType === 'chars' ? split.chars : split.words

    gsap.set(targets, { opacity: 0.2 })

    const tl = gsap.to(targets, {
      opacity: 1,
      stagger: 0.1,
      ease: 'none',
      scrollTrigger: {
        trigger: textRef.current,
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: true,
      },
    })

    return () => {
      tl.kill()
      split.revert()
    }
  }, [deveAnimar, splitType])

  return (
    <div
      ref={textRef}
      className={cn(className, deveAnimar ? 'invisible' : 'visible')}
    >
      {children}
    </div>
  )
}
