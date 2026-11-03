import { Button, Container, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { IconArrowRight } from '@tabler/icons-react'
import Link from 'next/link'

import { PostCard, listPosts } from '@/entities/post'
import { postsPlural } from '@/shared/lib'

export async function LatestPosts() {
  const { items, total } = await listPosts({ limit: 3 })
  if (items.length === 0) return null

  return (
    <Container size="lg" py={72}>
      <Stack gap={8} align="center" mb={48}>
        <Text tt="uppercase" fz="sm" fw={600} c="brand.6" lts="0.08em">Блог</Text>
        <Title order={2} ta="center">Статьи психолога</Title>
        <Text c="dimmed" ta="center" maw={620}>
          {total} {postsPlural(total)} о семье, страхах, воспитании детей и отношениях —
          написаны практикующими психологами центра.
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {items.map((p) => (
          <PostCard key={p.url} post={p} />
        ))}
      </SimpleGrid>

      <Group justify="center" mt="xl">
        <Button component={Link} href="/blog/" variant="light" size="md"
                rightSection={<IconArrowRight size={18} />}>
          Все статьи
        </Button>
      </Group>
    </Container>
  )
}
