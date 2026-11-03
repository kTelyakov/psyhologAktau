import { Container, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import type { Metadata } from 'next'

import { listCategories } from '@/entities/category'
import { PostCard, listPosts } from '@/entities/post'
import { CategoryFilter } from '@/features/blog-filter'
import { postsPlural } from '@/shared/lib'
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

  return (
    <>
      <Container size="lg" pt={56} pb={32}>
        <Stack gap="md" align="center" mb={40}>
          <Text tt="uppercase" fz="sm" fw={600} c="brand.6" lts="0.08em">Блог</Text>
          <Title order={1} ta="center">Статьи психолога</Title>
          <Text c="dimmed" ta="center" maw={660} fz="lg">
            {total} {postsPlural(total)} о том, что волнует каждый день: семья, дети,
            страхи, отношения и поиск опоры в себе.
          </Text>
        </Stack>

        <CategoryFilter categories={categories} />
      </Container>

      <Container size="lg" pb={32}>
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
          {items.map((p) => (
            <PostCard key={p.url} post={p} />
          ))}
        </SimpleGrid>

        {items.length === 0 && (
          <Text ta="center" c="dimmed" py={64}>
            Статьи пока не загружены.
          </Text>
        )}
      </Container>

      <CtaBanner />
    </>
  )
}
