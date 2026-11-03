import {
  Anchor, Badge, Box, Container, Divider, Group, SimpleGrid, Stack, Text, Title,
  TypographyStylesProvider,
} from '@mantine/core'
import { IconCalendar, IconUser } from '@tabler/icons-react'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { PostCard, getPost, getPostRefs, listPosts } from '@/entities/post'
import { ApiError } from '@/shared/api'
import { SITE } from '@/shared/config'
import { formatDate, isoDate } from '@/shared/lib'
import { CtaBanner } from '@/widgets/cta'

import classes from './PostView.module.css'

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Container size={760} pt={40} pb={24}>
        <Stack gap="md">
          <Group gap={8} fz="sm" c="dimmed">
            <Anchor component={Link} href="/blog/" c="brand.6">Статьи</Anchor>
            <span>/</span>
            <Anchor component={Link} href={`/blog/${post.category}/`} c="brand.6">
              {post.categoryTitle}
            </Anchor>
          </Group>

          <Title order={1} fz="clamp(1.7rem, 3.4vw, 2.5rem)" lh={1.2}>
            {post.title}
          </Title>

          <Group gap="lg" c="dimmed" fz="sm">
            {post.author && (
              <Group gap={6}><IconUser size={15} stroke={1.6} />{post.author}</Group>
            )}
            <Group gap={6}><IconCalendar size={15} stroke={1.6} />{formatDate(post.publishedAt)}</Group>
          </Group>
        </Stack>
      </Container>

      {post.image && (
        <Container size={960} pb={32}>
          <Box className={classes.cover}>
            <Image src={`/media/${post.image}`} alt={post.title} fill priority
                   sizes="(max-width: 64em) 100vw, 960px" className={classes.coverImg} />
          </Box>
        </Container>
      )}

      <Container size={760} pb={48}>
        <TypographyStylesProvider>
          <div className="article-body" dangerouslySetInnerHTML={{ __html: post.content }} />
        </TypographyStylesProvider>

        <Divider my={48} />

        <Group gap="sm">
          <Text fz="sm" c="dimmed">Рубрика:</Text>
          <Badge component={Link} href={`/blog/${post.category}/`} variant="light"
                 color="brand" style={{ cursor: 'pointer' }}>
            {post.categoryTitle}
          </Badge>
        </Group>
      </Container>

      {others.length > 0 && (
        <Container size="lg" pb={32}>
          <Title order={2} fz="h3" mb="lg">Ещё в рубрике «{post.categoryTitle}»</Title>
          <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
            {others.map((p) => (
              <PostCard key={p.url} post={p} showCategory={false} />
            ))}
          </SimpleGrid>
        </Container>
      )}

      <CtaBanner
        title="Узнали в статье себя?"
        text="Первая консультация бесплатная. Разберём вашу ситуацию и решим, с чего начать."
      />
    </>
  )
}
