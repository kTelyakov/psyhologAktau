import { Group } from '@mantine/core'
import Link from 'next/link'

import type { Category } from '@/shared/api'

import classes from './CategoryFilter.module.css'

export function CategoryFilter({
  categories,
  active,
}: {
  categories: Category[]
  active?: string
}) {
  return (
    <Group gap={8} justify="center">
      <Link href="/blog/" className={classes.chip} data-active={!active || undefined}>
        Все статьи
      </Link>
      {categories.map((c) => (
        <Link key={c.slug} href={c.url} className={classes.chip} data-active={active === c.slug || undefined}>
          {c.title}
          <span className={classes.count}>{c.postCount}</span>
        </Link>
      ))}
    </Group>
  )
}
