import { Container, List, ListItem, Paper, Stack, Text, Title } from '@mantine/core'
import { IconCircleCheck } from '@tabler/icons-react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

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

  return (
    <>
      <HeroSection title={service.hero} subtitle={service.subtitle} />

      <Container size={820} py={64}>
        <Paper p={{ base: 'lg', sm: 48 }} shadow="sm" bg="white">
          <Stack gap={40}>
            {service.blocks.map((block, i) => (
              <Stack key={i} gap="md">
                {block.heading && (
                  <Title order={2} fz="h3" c="brand.8">
                    {block.heading}
                  </Title>
                )}

                {block.paragraphs?.map((p, j) => (
                  <Text key={j} c="gray.7" lh={1.75}>
                    {p}
                  </Text>
                ))}

                {block.listIntro && (
                  <Text fw={600} c="gray.8" mt={4}>
                    {block.listIntro}:
                  </Text>
                )}

                {block.list && (
                  <List spacing="sm" icon={<IconCircleCheck size={20} color="var(--mantine-color-brand-6)" />}>
                    {block.list.map((item) => (
                      <ListItem key={item}>
                        <Text c="gray.7" lh={1.6}>{item}</Text>
                      </ListItem>
                    ))}
                  </List>
                )}
              </Stack>
            ))}
          </Stack>
        </Paper>
      </Container>

      <ContactsSection />
    </>
  )
}
