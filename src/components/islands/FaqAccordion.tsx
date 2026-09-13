import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '../../lib/cn'

interface FaqItem {
  pergunta: string
  resposta: string
  videoUrl?: string
}

interface FaqAccordionProps {
  perguntas: FaqItem[]
  onSelect?: (index: number) => void
}

export function FaqAccordion({ perguntas, onSelect }: FaqAccordionProps) {
  const [ativoIndex, setAtivoIndex] = useState<number | null>(null)

  return (
    <div className="w-full space-y-4">
      {perguntas.map((item, index) => {
        const isAtivo = ativoIndex === index

        return (
          <div
            key={index}
            className="border border-white/10 bg-white/5 rounded-2xl overflow-hidden backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            <button
              onClick={() => {
                setAtivoIndex(isAtivo ? null : index)
                onSelect?.(index)
              }}
              className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint"
              aria-expanded={isAtivo}
            >
              <h3 className="text-lg font-semibold text-white/90 pr-8">{item.pergunta}</h3>
              <div
                className={cn(
                  "flex-shrink-0 w-8 h-8 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-300",
                  isAtivo ? "rotate-180 bg-white/10" : "rotate-0"
                )}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </button>
            
            <AnimatePresence initial={false}>
              {isAtivo && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <div className="px-6 pb-6 text-white/70 leading-relaxed">
                    {item.resposta}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
