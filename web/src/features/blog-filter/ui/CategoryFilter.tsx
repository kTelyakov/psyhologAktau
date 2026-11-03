import Link from 'next/link'

import { cn } from '@/shared/lib'
import type { Category } from '@/shared/api'

export function CategoryFilter({ categories, active }: { categories: Category[]; active?: string }) {
  const chip = (isActive: boolean) =>
    cn(
      'inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold transition-all',
      isActive
        ? 'border-clay-500 bg-clay-500 text-white shadow-sm'
        : 'border-rule bg-white text-ink-soft hover:border-clay-300 hover:text-clay-600',
    )

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Link href="/blog/" className={chip(!active)}>Все статьи</Link>
      {categories.map((c) => (
        <Link key={c.slug} href={c.url} className={chip(active === c.slug)}>
          {c.title}
          <span className="text-[11px] opacity-80">{c.postCount}</span>
        </Link>
      ))}
    </div>
  )
}
