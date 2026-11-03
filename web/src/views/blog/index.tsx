import type { Metadata } from 'next'

import { listCategories } from '@/entities/category'
import { PostCard, listPosts } from '@/entities/post'
import { CategoryFilter } from '@/features/blog-filter'
import { postsPlural } from '@/shared/lib'
import { JsonLd, breadcrumbSchema, graph, itemListSchema } from '@/shared/seo'
import { Breadcrumbs, DotPattern, Rise } from '@/shared/ui'
import { CtaBanner } from '@/widgets/cta'

export const metadata: Metadata = {
  title: 'Статьи психолога — о семье, страхах и воспитании детей',
  description:
    'Статьи практикующих психологов центра «Ару-Ана» в Актау: отношения в семье, '
    + 'детские страхи, воспитание подростков, тревога и зависимости.',
  alternates: { canonical: '/blog/' },
}

export default async function BlogView() {
  const [{ items, total }, categories] = await Promise.all([
    listPosts({ limit: 100 }),
    listCategories(),
  ])

  const jsonLd = graph(
    breadcrumbSchema([
      { name: 'Главная', url: '/' },
      { name: 'Статьи', url: '/blog/' },
    ]),
    itemListSchema(items.map((p) => ({ name: p.title, url: p.url }))),
  )

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="relative overflow-hidden border-b border-rule">
        <DotPattern className="[mask-image:radial-gradient(60%_60%_at_50%_40%,white,transparent)] fill-ink/[0.07]" />
        <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-16">
          <Breadcrumbs items={[{ name: 'Главная', url: '/' }, { name: 'Статьи' }]} className="mb-6 justify-center [&>ol]:justify-center" />
          <Rise>
            <p className="text-center text-[13px] font-bold uppercase tracking-[0.18em] text-sage-700">
              Блог
            </p>
            <h1 className="mt-3 text-center font-display text-[clamp(2rem,4.4vw,3.2rem)] tracking-tight">
              Статьи психолога
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed text-ink-soft">
              {total} {postsPlural(total)} о том, что волнует каждый день: семья, дети,
              страхи, отношения и поиск опоры в себе.
            </p>
          </Rise>
          <Rise delay={0.12}>
            <div className="mt-9">
              <CategoryFilter categories={categories} />
            </div>
          </Rise>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {items.map((p, i) => (
            <Rise key={p.url} delay={Math.min(0.04 * i, 0.5)} className="cv-card">
              <PostCard post={p} />
            </Rise>
          ))}
        </div>
        {items.length === 0 && (
          <p className="py-16 text-center text-ink-soft">Статьи пока не загружены.</p>
        )}
      </div>

      <CtaBanner />
    </>
  )
}
