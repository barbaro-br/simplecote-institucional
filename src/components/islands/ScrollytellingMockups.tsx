import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { gsap, ScrollTrigger } from '../../lib/gsap-scroll'
import { cn } from '../../lib/cn'

export function ScrollytellingMockups({ className }: { className?: string }) {
  const [passoAtivo, setPassoAtivo] = useState<number>(1)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Registrar o ScrollTrigger para cada passo da coluna esquerda
    const triggers = [1, 2, 3].map((num) => {
      return ScrollTrigger.create({
        trigger: `#passo-${num}`,
        start: 'top 50%',
        end: 'bottom 50%',
        onToggle: (self) => {
          if (self.isActive) {
            setPassoAtivo(num)
          }
        },
      })
    })

    return () => {
      triggers.forEach((t) => t.kill())
    }
  }, [])

  return (
    <div className={cn("relative h-full w-full rounded-2xl border bg-background/60 backdrop-blur-sm overflow-hidden", className)}>
      <AnimatePresence mode="wait">
        {passoAtivo === 1 && (
          <motion.div
            key="passo1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
          >
            <div className="mb-6 flex space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-2 w-16 rounded-full bg-brand-mint/30" />
              ))}
            </div>
            <div className="h-40 w-full max-w-sm rounded-lg border border-dashed border-brand-mint/50 bg-brand-mint/10 flex items-center justify-center">
              <span className="text-sm text-brand-mint font-medium">Bipando itens...</span>
            </div>
          </motion.div>
        )}
        
        {passoAtivo === 2 && (
          <motion.div
            key="passo2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8"
          >
            <div className="relative h-48 w-48 rounded-full border border-border flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-brand-mint flex items-center justify-center text-brand-navy-deep font-bold">
                Você
              </div>
              
              {/* Avatares flutuantes */}
              {[
                { top: '-10%', left: '40%' },
                { top: '30%', left: '100%' },
                { top: '80%', left: '10%' },
              ].map((pos, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.2, type: 'spring' }}
                  className="absolute h-10 w-10 rounded-full bg-foreground flex items-center justify-center border-2 border-background"
                  style={pos}
                >
                  <span className="text-xs text-background">F{i+1}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {passoAtivo === 3 && (
          <motion.div
            key="passo3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8"
          >
            <div className="w-full max-w-sm space-y-3">
              {[
                { name: 'Fornecedor A', val: 'R$ 1.200', win: false },
                { name: 'Fornecedor B', val: 'R$ 1.150', win: true },
                { name: 'Fornecedor C', val: 'R$ 1.250', win: false },
              ].map((item, i) => (
                <div key={i} className={cn(
                  "flex justify-between rounded-md border p-4 transition-colors",
                  item.win ? "border-brand-mint bg-brand-mint/10" : "border-border bg-background"
                )}>
                  <span className={item.win ? "font-bold text-brand-mint" : "text-muted-foreground"}>{item.name}</span>
                  <span className={item.win ? "font-bold text-brand-mint" : "font-semibold"}>{item.val}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
