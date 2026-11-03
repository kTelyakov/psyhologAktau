import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

import { cn } from '@/shared/lib'

export interface Crumb {
  name: string
  url?: string
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Хлебные крошки" className={className}>
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-ink-soft">
        {items.map((c, i) => (
          <li key={c.name} className="flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3.5 shrink-0" aria-hidden />}
            {c.url ? (
              <Link href={c.url} className="transition-colors hover:text-clay-600">
                {c.name}
              </Link>
            ) : (
              <span aria-current="page" className={cn('text-ink')}>{c.name}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
