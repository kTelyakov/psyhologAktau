'use client'

import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'

import { cn } from '@/shared/lib'
import { Dialog, DialogContent, DialogTitle, Marquee } from '@/shared/ui'

export interface Certificate {
  file: string
  title?: string
}

export function CertificateGallery({ items }: { items: Certificate[] }) {
  const [index, setIndex] = useState<number | null>(null)
  const stripRef = useRef<HTMLDivElement>(null)

  const total = items.length
  const open = index !== null

  const go = useCallback(
    (delta: number) => setIndex((i) => (i === null ? i : (i + delta + total) % total)),
    [total],
  )

  // Стрелки на клавиатуре; Esc закрывает силами Radix
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1) }
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1) }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, go])

  // Держим активную миниатюру в поле зрения
  useEffect(() => {
    if (index === null) return
    stripRef.current?.querySelector<HTMLElement>(`[data-i="${index}"]`)
      ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [index])

  const current = index !== null ? items[index] : null
  // Соседние кадры — чтобы перелистывалось без подгрузки
  const neighbours = index === null
    ? []
    : [items[(index + 1) % total], items[(index - 1 + total) % total]]

  return (
    <>
      <Marquee pauseOnHover className="[--duration:50s] [--gap:1rem]">
        {items.map((c, i) => (
          <button
            key={c.file}
            onClick={() => setIndex(i)}
            aria-label={c.title ?? `Открыть сертификат ${i + 1}`}
            className="group relative h-36 w-52 shrink-0 cursor-pointer overflow-hidden rounded-xl border border-rule bg-paper transition-transform duration-300 hover:scale-[1.04]"
          >
            <Image
              src={`/diploms/${c.file}`}
              alt=""
              fill
              sizes="208px"
              className="object-cover"
            />
            <span className="absolute inset-0 grid place-items-center bg-ink/0 opacity-0 transition-all duration-300 group-hover:bg-ink/35 group-hover:opacity-100">
              <Expand className="size-6 text-white" />
            </span>
          </button>
        ))}
      </Marquee>

      <Dialog open={open} onOpenChange={(v) => !v && setIndex(null)}>
        <DialogContent
          hideClose
          overlayClassName="bg-ink/85"
          className="max-w-5xl border-none bg-transparent p-0 shadow-none"
        >
          <DialogTitle className="sr-only">
            {current?.title ?? `Сертификат ${(index ?? 0) + 1} из ${total}`}
          </DialogTitle>

          {current && (
            <div className="flex flex-col gap-4">
              <div className="relative">
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-ink/90 shadow-2xl">
                  <Image
                    key={current.file}
                    src={`/diploms/${current.file}`}
                    alt={current.title ?? `Сертификат ${(index ?? 0) + 1}`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    className="object-contain"
                  />
                </div>

                {/* невидимый предзагруз соседних кадров */}
                <div className="pointer-events-none absolute size-px overflow-hidden opacity-0">
                  {neighbours.map((n) => (
                    <Image key={n.file} src={`/diploms/${n.file}`} alt="" width={16} height={16} />
                  ))}
                </div>

                {total > 1 && (
                  <>
                    <NavButton side="left" onClick={() => go(-1)} />
                    <NavButton side="right" onClick={() => go(1)} />
                  </>
                )}

                <button
                  onClick={() => setIndex(null)}
                  aria-label="Закрыть"
                  className="absolute right-2 top-2 grid size-10 cursor-pointer place-items-center rounded-full bg-ink/60 text-white backdrop-blur transition-colors hover:bg-ink/80"
                >
                  <X className="size-5" />
                </button>
              </div>

              <div className="flex flex-col items-center gap-3">
                <p className="rounded-full bg-ink/70 px-4 py-1.5 text-sm font-semibold text-white backdrop-blur">
                  {current.title ?? 'Документ о профессиональной подготовке'}
                  <span className="ml-2 font-normal opacity-70">
                    {(index ?? 0) + 1} / {total}
                  </span>
                </p>

                <div
                  ref={stripRef}
                  className="flex max-w-full gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                >
                  {items.map((c, i) => (
                    <button
                      key={c.file}
                      data-i={i}
                      onClick={() => setIndex(i)}
                      aria-label={`Сертификат ${i + 1}`}
                      aria-current={i === index}
                      className={cn(
                        'relative h-12 w-[4.5rem] shrink-0 cursor-pointer overflow-hidden rounded-md border-2 transition-all',
                        i === index
                          ? 'border-clay-400 opacity-100'
                          : 'border-transparent opacity-50 hover:opacity-90',
                      )}
                    >
                      <Image src={`/diploms/${c.file}`} alt="" fill sizes="72px" className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}

function NavButton({ side, onClick }: { side: 'left' | 'right'; onClick: () => void }) {
  const Icon = side === 'left' ? ChevronLeft : ChevronRight
  return (
    <button
      onClick={onClick}
      aria-label={side === 'left' ? 'Предыдущий' : 'Следующий'}
      className={cn(
        'absolute top-1/2 grid size-11 -translate-y-1/2 cursor-pointer place-items-center rounded-full',
        'bg-white/90 text-ink shadow-lg transition-all hover:bg-white hover:scale-105',
        side === 'left' ? 'left-2 sm:-left-5' : 'right-2 sm:-right-5',
      )}
    >
      <Icon className="size-5" />
    </button>
  )
}
