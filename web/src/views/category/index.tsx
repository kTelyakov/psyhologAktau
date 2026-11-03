import { ArrowLeft } from 'lucide-react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getCategory, listCategories } from '@/entities/category'
import { PostCard, listPosts } from '@/entities/post'
import { CategoryFilter } from '@/features/blog-filter'
import { postsPlural } from '@/shared/lib'
import { Rise, DotPattern } from '@/shared/ui'
import { CtaBanner } from '@/widgets/cta'

interface Params {
  params: Promise<{ category: string }>
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category: slug } = await params
  const category = await getCategory(slug)
  if (!category) return { title: 'Рубрика не найдена' }

  return {
    title: `${category.title} — статьи психолога`,
    description: `${category.postCount} ${postsPlural(category.postCount)} в рубрике «${category.title}» от психологов центра «Ару-Ана» в Актау.`,
    alternates: { canonical: category.url },
  }
}

export default async function CategoryView({ params }: Params) {
  const { category: slug } = await params
  const [category, categories] = await Promise.all([getCategory(slug), listCategories()])
  if (!category) notFound()

  const { items } = await listPosts({ category: slug, limit: 100 })

  return (
    <>
      <section className="relative overflow-hidden border-b border-rule">
        <DotPattern className="[mask-image:radial-gradient(60%_60%_at_50%_40%,white,transparent)] fill-ink/[0.07]" />
        <div className="relative mx-auto max-w-6xl px-5 pb-10 pt-16">
          <Rise>
            <Link
              href="/blog/"
              className="mx-auto flex w-fit items-center gap-1.5 text-sm font-semibold text-clay-600 hover:underline"
            >
              <ArrowLeft className="size-4" /> Все статьи
            </Link>
            <h1 className="mt-4 text-center font-display text-[clamp(2rem,4.4vw,3.2rem)] tracking-tight">
              {category.title}
            </h1>
            <p className="mt-3 text-center text-ink-soft">
              {category.postCount} {postsPlural(category.postCount)}
            </p>
          </Rise>
          <Rise delay={0.12}>
            <div className="mt-9">
              <CategoryFilter categories={categories} active={slug} />
            </div>
          </Rise>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {items.map((p, i) => (
            <Rise key={p.url} delay={Math.min(0.05 * i, 0.5)} className="cv-card">
              <PostCard post={p} showCategory={false} />
            </Rise>
          ))}
        </div>
      </div>

      <CtaBanner />
    </>
  )
}
