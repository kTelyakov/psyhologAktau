import { Anchor, Container, Divider, Group, SimpleGrid, Stack, Text } from '@mantine/core'
import { IconMail, IconMapPin, IconPhone } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'

import { SITE } from '@/shared/config'

import classes from './SiteFooter.module.css'

export function SiteFooter() {
  return (
    <footer className={classes.footer}>
      <Container size="lg" py={48}>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="xl">
          <Stack gap="xs">
            <Text fw={700} c="white" fz="lg">{SITE.name}</Text>
            <Text fz="sm" c="brand.2">{SITE.center}</Text>
            <Group gap="sm" mt="sm">
              {SITE.socials.map((s) => (
                <Anchor key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
                        aria-label={s.name} className={classes.social}>
                  <Image src={`/socials/${s.icon}`} alt={s.name} width={28} height={28} />
                </Anchor>
              ))}
            </Group>
          </Stack>

          <Stack gap="xs">
            <Text fw={600} c="white" fz="sm" tt="uppercase" mb={4}>Разделы</Text>
            {[
              { label: 'Индивидуальные консультации', href: '/individualnye-konsultacii/' },
              { label: 'Семейные консультации', href: '/semeynye-konsultacii/' },
              { label: 'Детский психолог', href: '/detskiy-psiholog/' },
              { label: 'Статьи', href: '/blog/' },
              { label: 'Контакты', href: '/kontakty/' },
            ].map((l) => (
              <Anchor key={l.href} component={Link} href={l.href} fz="sm" className={classes.link}>
                {l.label}
              </Anchor>
            ))}
          </Stack>

          <Stack gap="sm">
            <Text fw={600} c="white" fz="sm" tt="uppercase" mb={4}>Контакты</Text>
            <Group gap={8} wrap="nowrap" align="flex-start">
              <IconPhone size={16} stroke={1.6} className={classes.icon} />
              <Anchor href={SITE.phoneHref} fz="sm" className={classes.link}>{SITE.phone}</Anchor>
            </Group>
            <Group gap={8} wrap="nowrap" align="flex-start">
              <IconMail size={16} stroke={1.6} className={classes.icon} />
              <Anchor href={`mailto:${SITE.email}`} fz="sm" className={classes.link}>{SITE.email}</Anchor>
            </Group>
            <Group gap={8} wrap="nowrap" align="flex-start">
              <IconMapPin size={16} stroke={1.6} className={classes.icon} />
              <Text fz="sm" c="brand.2">{SITE.address}</Text>
            </Group>
          </Stack>
        </SimpleGrid>

        <Divider my="xl" color="rgba(255,255,255,0.14)" />

        <Stack gap={4}>
          <Text fz="xs" c="brand.3">{SITE.entity}</Text>
          <Text fz="xs" c="brand.3">
            © {new Date().getFullYear()} {SITE.center}
          </Text>
        </Stack>
      </Container>
    </footer>
  )
}
