'use client'

import { Burger, Button, Container, Drawer, Group, Stack, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPhone } from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { LeadFormModal } from '@/features/lead-form'
import { SITE } from '@/shared/config'

import classes from './SiteHeader.module.css'

const LINKS = [
  { label: 'Главная', href: '/' },
  { label: 'Услуги', href: '/individualnye-konsultacii/' },
  { label: 'Статьи', href: '/blog/' },
  { label: 'Контакты', href: '/kontakty/' },
]

export function SiteHeader() {
  const [opened, { toggle, close }] = useDisclosure(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, ''))

  return (
    <header className={classes.header}>
      <Container size="lg" className={classes.inner}>
        <Link href="/" className={classes.brand}>
          <Image src="/logo.png" alt="" width={48} height={48} className={classes.logo} />
          <div>
            <Text fw={700} fz="lg" lh={1.1} c="brand.8">
              {SITE.name}
            </Text>
            <Text fz="xs" c="dimmed" lh={1.3} visibleFrom="xs">
              {SITE.center}
            </Text>
          </div>
        </Link>

        <Group gap={4} visibleFrom="md" component="nav">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={classes.link}
              data-active={isActive(l.href) || undefined}
            >
              {l.label}
            </Link>
          ))}
        </Group>

        <Group gap="sm" wrap="nowrap">
          <Button
            component="a"
            href={SITE.phoneHref}
            variant="subtle"
            leftSection={<IconPhone size={16} stroke={1.6} />}
            visibleFrom="sm"
          >
            {SITE.phone}
          </Button>
          <LeadFormModal label="Записаться" visibleFrom="md" />
          <Burger opened={opened} onClick={toggle} hiddenFrom="md" aria-label="Меню" />
        </Group>
      </Container>

      <Drawer opened={opened} onClose={close} title="Меню" position="right" size="xs">
        <Stack gap="xs">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className={classes.drawerLink} onClick={close}>
              {l.label}
            </Link>
          ))}
          <Button component="a" href={SITE.phoneHref} variant="light" mt="md" fullWidth
                  leftSection={<IconPhone size={16} />}>
            {SITE.phone}
          </Button>
          <LeadFormModal label="Записаться" fullWidth />
        </Stack>
      </Drawer>
    </header>
  )
}
