import { Anchor, Box, Card, Container, Group, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { IconBuildingStore, IconMail, IconMapPin, IconPhone } from '@tabler/icons-react'
import Image from 'next/image'

import { LeadForm } from '@/features/lead-form'
import { SITE } from '@/shared/config'

import classes from './ContactsSection.module.css'

export function ContactsSection() {
  const items = [
    { Icon: IconMapPin, label: 'Адрес', value: SITE.address },
    { Icon: IconPhone, label: 'Телефон', value: SITE.phone, href: SITE.phoneHref },
    { Icon: IconMail, label: 'E-mail', value: SITE.email, href: `mailto:${SITE.email}` },
    { Icon: IconBuildingStore, label: 'Реквизиты', value: SITE.entity },
  ]

  return (
    <Container size="lg" py={72} id="contacts">
      <Stack gap={8} align="center" mb={48}>
        <Text tt="uppercase" fz="sm" fw={600} c="brand.6" lts="0.08em">Контакты</Text>
        <Title order={2} ta="center">Приходите или напишите</Title>
      </Stack>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
        <Stack gap="lg">
          <Stack gap="md">
            {items.map(({ Icon, label, value, href }) => (
              <Group key={label} gap="md" wrap="nowrap" align="flex-start">
                <div className={classes.iconBox}>
                  <Icon size={20} stroke={1.6} />
                </div>
                <div>
                  <Text fz="xs" c="dimmed" tt="uppercase" fw={600} lts="0.04em">{label}</Text>
                  {href ? (
                    <Anchor href={href} fw={500} c="brand.7">{value}</Anchor>
                  ) : (
                    <Text c="gray.8" lh={1.5}>{value}</Text>
                  )}
                </div>
              </Group>
            ))}
          </Stack>

          <a href="https://2gis.kz/aktau" target="_blank" rel="noopener noreferrer" className={classes.map}>
            <Image src="/map.png" alt="Карта: как нас найти" width={700} height={420}
                   className={classes.mapImg} />
          </a>
        </Stack>

        <Card padding="xl" shadow="md" bg="white">
          <Title order={3} fz="h3" mb={6}>Бесплатная консультация</Title>
          <Text c="dimmed" fz="sm" mb="lg">
            Оставьте контакты — свяжемся в ближайшее время. Всё, что вы расскажете,
            остаётся между вами и психологом.
          </Text>
          <LeadForm />
        </Card>
      </SimpleGrid>
    </Container>
  )
}
