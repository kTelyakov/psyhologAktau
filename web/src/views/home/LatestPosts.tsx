import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { PostCard, listPosts } from '@/entities/post'
import { postsPlural } from '@/shared/lib'
import { Rise, Button } from '@/shared/ui'

export async function LatestPosts() {
  const { items, total } = await listPosts({ limit: 3 })
  if (items.length === 0) return null

  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <Rise>
        <p className="text-center text-[13px] font-bold uppercase tracking-[0.18em] text-sage-700">
          Блог
        </p>
        <h2 className="mt-3 text-center font-display text-[clamp(1.8rem,3.5vw,2.7rem)] tracking-tight">
          Статьи психолога
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center leading-relaxed text-ink-soft">
          {total} {postsPlural(total)} о семье, страхах, воспитании детей и отношениях —
          написаны практикующими психологами центра.
        </p>
      </Rise>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-3">
        {items.map((p, i) => (
          <Rise key={p.url} delay={0.08 * i}>
            <PostCard post={p} />
          </Rise>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/blog/">
            Все статьи <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
