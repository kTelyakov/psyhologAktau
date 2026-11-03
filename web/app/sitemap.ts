import type { MetadataRoute } from 'next'

import { listCategories } from '@/entities/category'
import { listPosts } from '@/entities/post'
import { SERVICE_SLUGS } from '@/views/service/content'

const BASE = 'https://psyholog-aktau.kz'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [{ items }, categories] = await Promise.all([
    listPosts({ limit: 100 }),
    listCategories(),
  ])

  const statics: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, priority: 1, changeFrequency: 'weekly' },
    { url: `${BASE}/blog/`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${BASE}/kontakty/`, priority: 0.6, changeFrequency: 'yearly' },
    ...SERVICE_SLUGS.map((s) => ({
      url: `${BASE}/${s}/`,
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    })),
  ]

  return [
    ...statics,
    ...categories.map((c) => ({
      url: `${BASE}${c.url}`,
      priority: 0.6,
      changeFrequency: 'weekly' as const,
    })),
    ...items.map((p) => ({
      url: `${BASE}${p.url}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : undefined,
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    })),
  ]
}
