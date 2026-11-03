import { apiFetchSafe } from '@/shared/api'
import type { Category } from '@/shared/api'

export function listCategories() {
  return apiFetchSafe<Category[]>('/categories', [], { tags: ['categories'] })
}

export async function getCategory(slug: string): Promise<Category | null> {
  const all = await listCategories()
  return all.find((c) => c.slug === slug) ?? null
}
