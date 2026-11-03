import { Badge, Card, Group, Stack, Text, Title } from '@mantine/core'
import { IconCalendar } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

import { formatDate } from '@/shared/lib'
import type { PostListItem } from '@/shared/api'

import classes from './PostCard.module.css'

export function PostCard({ post, showCategory = true }: { post: PostListItem; showCategory?: boolean }) {
  return (
    <Card component={Link} href={post.url} className={classes.card} padding={0} shadow="sm">
      <div className={classes.media}>
        {post.image ? (
          <Image
            src={`/media/${post.image}`}
            alt={post.title}
            fill
            sizes="(max-width: 48em) 100vw, (max-width: 64em) 50vw, 380px"
            className={classes.image}
          />
        ) : (
          <div className={classes.placeholder} aria-hidden />
        )}
      </div>

      <Stack gap="xs" p="lg" style={{ flex: 1 }}>
        {showCategory && post.categoryTitle && (
          <Badge variant="light" color="brand" radius="sm" size="sm">
            {post.categoryTitle}
          </Badge>
        )}

        <Title order={3} fz="lg" lh={1.3} className={classes.title}>
          {post.title}
        </Title>

        <Text c="dimmed" fz="sm" lineClamp={3} style={{ flex: 1 }}>
          {post.excerpt}
        </Text>

        <Group gap={6} mt="xs" c="dimmed" fz="xs">
          <IconCalendar size={14} stroke={1.6} />
          <span>{formatDate(post.publishedAt)}</span>
          {post.author && <span>· {post.author}</span>}
        </Group>
      </Stack>
    </Card>
  )
}
