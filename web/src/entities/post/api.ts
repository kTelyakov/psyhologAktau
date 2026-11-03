import { apiFetch, apiFetchSafe } from '@/shared/api'
import type { Post, PostPage, PostRef } from '@/shared/api'

export function getPost(category: string, slug: string) {
  return apiFetch<Post>(`/posts/${category}/${slug}`, {
    tags: ['posts', `post:${category}/${slug}`],
  })
}

export function listPosts(params: {
  category?: string
  q?: string
  limit?: number
  offset?: number
} = {}) {
  const qs = new URLSearchParams()
  if (params.category) qs.set('category', params.category)
  if (params.q) qs.set('q', params.q)
  qs.set('limit', String(params.limit ?? 50))
  qs.set('offset', String(params.offset ?? 0))

  return apiFetchSafe<PostPage>(
    `/posts?${qs}`,
    { items: [], total: 0, limit: params.limit ?? 50, offset: 0 },
    { tags: ['posts'] },
  )
}

/**
 * Пары (category, slug) для generateStaticParams.
 * Намеренно отказоустойчиво: сборка идёт в CI и не должна падать из-за
 * недоступного API — страницы отрендерятся по первому запросу
 * благодаря dynamicParams (см. §2.2 плана).
 */
export function getPostRefs() {
  return apiFetchSafe<PostRef[]>('/posts/refs', [], { tags: ['posts'] })
}
