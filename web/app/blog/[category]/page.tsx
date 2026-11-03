import { listCategories } from '@/entities/category'

export { generateMetadata, default } from '@/views/category'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const categories = await listCategories()
  return categories.map((c) => ({ category: c.slug }))
}
