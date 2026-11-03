'use client'

import { Play } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

import { cn } from '@/shared/lib'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/shared/ui'

interface Props {
  youtubeId: string
  title: string
  image: string
  className?: string
}

export function VideoCard({ youtubeId, title, image, className }: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className={cn(
            'group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-card border border-rule bg-white text-left',
            'transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-12px_rgba(33,29,26,0.2)]',
            className,
          )}
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-clay-100">
            <Image
              src={`/${image}`}
              alt=""
              fill
              sizes="320px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-ink/25 transition-colors group-hover:bg-ink/15" />
            <span className="absolute inset-0 m-auto grid size-14 place-items-center rounded-full bg-white/95 text-clay-600 shadow-lg transition-transform duration-300 group-hover:scale-110">
              <Play className="size-5 translate-x-px fill-current" />
            </span>
          </div>
          <p className="line-clamp-2 p-4 text-sm font-semibold leading-snug">{title}</p>
        </button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl p-4">
        <DialogTitle className="mb-3 px-1 text-lg">{title}</DialogTitle>
        <div className="aspect-video overflow-hidden rounded-2xl bg-ink">
          {open && (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              className="size-full border-0"
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
