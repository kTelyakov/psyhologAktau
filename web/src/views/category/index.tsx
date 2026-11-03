import { Anchor, Container, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { getCategory, listCategories } from '@/entities/category'
import { PostCard, listPosts } from '@/entities/post'
import { CategoryFilter } from '@/features/blog-filter'
import { postsPlural } from '@/shared/lib'
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
      <Container size="lg" pt={56} pb={32}>
        <Stack gap="md" align="center" mb={40}>
          <Anchor component={Link} href="/blog/" fz="sm" c="brand.6">← Все статьи</Anchor>
          <Title order={1} ta="center">{category.title}</Title>
          <Text c="dimmed" ta="center">
            {category.postCount} {postsPlural(category.postCount)}
          </Text>
        </Stack>

        <CategoryFilter categories={categories} active={slug} />
      </Container>

      <Container size="lg" pb={32}>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {items.map((p) => (
            <PostCard key={p.url} post={p} showCategory={false} />
          ))}
        </SimpleGrid>
      </Container>

      <CtaBanner />
    </>
  )
}
