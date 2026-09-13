import { useState } from 'react'
import { FaqAccordion } from './FaqAccordion'
import type { FaqItem } from '../../data/faq'

/**
 * Ajuda em dois painéis: FAQ à esquerda e um painel fixo de vídeo à direita,
 * que exibe o vídeo da pergunta clicada (placeholder enquanto não há link).
 */
export function FaqComVideo({ perguntas }: { perguntas: FaqItem[] }) {
  const [selecionado, setSelecionado] = useState(0)
  const item = perguntas[selecionado]

  return (
    <div className="grid h-full gap-6 md:grid-cols-2 md:gap-8">
      {/* FAQ (esquerda) */}
      <div className="min-h-0 overflow-y-auto pr-1">
        <FaqAccordion perguntas={perguntas} onSelect={setSelecionado} />
      </div>

      {/* Painel de vídeo (direita, fixo) */}
      <div className="flex flex-col gap-3">
        <div className="aspect-video w-full overflow-hidden rounded-2xl border border-border bg-bg-deep">
          {item?.videoUrl ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube-nocookie.com/embed/${item.videoUrl}`}
              title={item.pergunta}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-center">
              <span className="text-4xl" aria-hidden="true">▶</span>
              <p className="px-6 text-sm text-muted-foreground">Tutorial em vídeo em breve.</p>
            </div>
          )}
        </div>
        <h3 className="text-sm font-medium text-text-1">{item?.pergunta}</h3>
      </div>
    </div>
  )
}
