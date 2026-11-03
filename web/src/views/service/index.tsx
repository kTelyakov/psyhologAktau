import { Check } from 'lucide-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Breadcrumbs, Rise } from '@/shared/ui'
import { JsonLd, breadcrumbSchema, graph, serviceSchema } from '@/shared/seo'
import { ContactsSection } from '@/widgets/contacts'
import { HeroSection } from '@/widgets/hero'

import { SERVICES } from './content'

export function serviceMetadata(slug: string): Metadata {
  const s = SERVICES[slug]
  if (!s) return { title: 'Страница не найдена' }
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: `/${slug}/` },
  }
}

export function ServiceView({ slug }: { slug: string }) {
  const service = SERVICES[slug]
  if (!service) notFound()

  const [first, ...rest] = service.hero.split(' ')

  const crumbs = [
    { name: 'Главная', url: '/' },
    { name: service.hero, url: `/${slug}/` },
  ]

  const jsonLd = graph(
    serviceSchema({ name: service.hero, description: service.description, url: `/${slug}/` }),
    breadcrumbSchema(crumbs),
  )

  return (
    <>
      <JsonLd data={jsonLd} />
      <HeroSection
        compact
        title={first}
        highlight={rest.join(' ')}
        subtitle={service.subtitle}
      />

      <div className="mx-auto max-w-3xl px-5 py-14">
        <Breadcrumbs items={crumbs} className="mb-8" />
        {service.blocks.map((block, i) => (
          <Rise key={i} delay={0.05 * i}>
            <section className="mb-12 last:mb-0">
              {block.heading && (
                <h2 className="mb-5 font-display text-[clamp(1.4rem,2.6vw,2rem)] leading-snug tracking-tight">
                  {block.heading}
                </h2>
              )}

              {block.paragraphs?.map((p, j) => (
                <p key={j} className="mb-4 text-[17px] leading-[1.78] text-ink-soft last:mb-0">
                  {p}
                </p>
              ))}

              {block.listIntro && (
                <p className="mb-3 mt-5 font-semibold text-ink">{block.listIntro}:</p>
              )}

              {block.list && (
                <ul className="mt-3 grid gap-3">
                  {block.list.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-full bg-sage-500 text-white">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      <span className="text-[17px] leading-relaxed text-ink-soft">{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </Rise>
        ))}
      </div>

      <ContactsSection />
    </>
  )
}
