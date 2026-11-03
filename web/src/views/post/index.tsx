import { CalendarDays, ChevronRight, User } from 'lucide-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PostCard, getPost, getPostRefs, listPosts } from '@/entities/post'
import { ApiError } from '@/shared/api'
import { SITE } from '@/shared/config'
import { formatDate, isoDate } from '@/shared/lib'
import { Rise } from '@/shared/ui'
import { CtaBanner } from '@/widgets/cta'

interface Params {
  params: Promise<{ category: string; slug: string }>
}

/**
 * Выполняется на сборке (в CI). Отказоустойчив: при недоступном API вернёт
 * пустой список, и страницы отрендерятся по первому запросу
 * благодаря dynamicParams — см. §2.2 плана.
 */
export async function generateStaticParams() {
  return getPostRefs()
}

async function load(category: string, slug: string) {
  try {
    return await getPost(category, slug)
  } catch (e) {
    if (e instanceof ApiError && e.status === 404) return null
    throw e
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { category, slug } = await params
  const post = await load(category, slug)
  if (!post) return { title: 'Статья не найдена' }

  const description = post.metaDescription ?? post.excerpt
  return {
    title: post.metaTitle ?? post.title,
    description,
    alternates: { canonical: post.url },
    openGraph: {
      type: 'article',
      title: post.title,
      description,
      url: post.url,
      publishedTime: isoDate(post.publishedAt),
      images: post.image ? [{ url: `/media/${post.image}` }] : undefined,
    },
  }
}

export default async function PostView({ params }: Params) {
  const { category, slug } = await params
  const post = await load(category, slug)
  if (!post) notFound()

  const { items: related } = await listPosts({ category, limit: 4 })
  const others = related.filter((p) => p.slug !== post.slug).slice(0, 3)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: isoDate(post.publishedAt),
    author: { '@type': 'Person', name: post.author ?? SITE.psychologist },
    publisher: { '@type': 'Organization', name: SITE.center },
    image: post.image ? `/media/${post.image}` : undefined,
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article>
        <header className="mx-auto max-w-3xl px-5 pb-8 pt-12">
          <Rise>
            <nav className="flex items-center gap-1.5 text-sm text-ink-soft">
              <Link href="/blog/" className="hover:text-clay-600">Статьи</Link>
              <ChevronRight className="size-3.5" />
              <Link href={`/blog/${post.category}/`} className="hover:text-clay-600">
                {post.categoryTitle}
              </Link>
            </nav>

            <h1 className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.18] tracking-tight">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-rule py-4 text-sm text-ink-soft">
              {post.author && (
                <span className="flex items-center gap-2">
                  <User className="size-4" /> {post.author}
                </span>
              )}
              <span className="flex items-center gap-2">
                <CalendarDays className="size-4" /> {formatDate(post.publishedAt)}
              </span>
            </div>
          </Rise>
        </header>

        {post.image && (
          <Rise delay={0.08}>
            <div className="mx-auto max-w-5xl px-5 pb-10">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[1.75rem] bg-clay-50 shadow-[0_20px_50px_-20px_rgba(33,29,26,0.3)]">
                <Image
                  src={`/media/${post.image}`}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 1024px"
                  className="object-cover"
                />
              </div>
            </div>
          </Rise>
        )}

        <div className="mx-auto max-w-3xl px-5 pb-14">
          <div className="article-body" dangerouslySetInnerHTML={{ __html: post.content }} />

          <div className="mt-12 flex items-center gap-3 border-t border-rule pt-6">
            <span className="text-sm text-ink-soft">Рубрика:</span>
            <Link
              href={`/blog/${post.category}/`}
              className="rounded-full bg-clay-50 px-4 py-1.5 text-sm font-semibold text-clay-700 transition-colors hover:bg-clay-100"
            >
              {post.categoryTitle}
            </Link>
          </div>
        </div>
      </article>

      {others.length > 0 && (
        <section className="mx-auto max-w-6xl px-5 pb-10">
          <h2 className="mb-6 font-display text-2xl">
            Ещё в рубрике «{post.categoryTitle}»
          </h2>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {others.map((p, i) => (
              <Rise key={p.url} delay={0.07 * i}>
                <PostCard post={p} showCategory={false} />
              </Rise>
            ))}
          </div>
        </section>
      )}

      <CtaBanner
        title="Узнали в статье себя?"
        text="Первая консультация бесплатная. Разберём вашу ситуацию и решим, с чего начать."
      />
    </>
  )
}
