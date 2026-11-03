import { Card, Container, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import {
  IconHeartHandshake, IconMoodKid, IconSchool, IconUser, IconUsersGroup, IconVideo,
} from '@tabler/icons-react'
import Link from 'next/link'

import classes from './ServicesSection.module.css'

const SERVICES = [
  {
    href: '/individualnye-konsultacii/',
    title: 'Индивидуальные консультации',
    description: 'Личный запрос: тревога, самооценка, отношения, поиск опоры',
    Icon: IconUser,
  },
  {
    href: '/semeynye-konsultacii/',
    title: 'Семейные консультации',
    description: 'Для пар, которые хотят понять друг друга и сохранить отношения',
    Icon: IconHeartHandshake,
  },
  {
    href: '/skype-konsultacii/',
    title: 'Консультации онлайн',
    description: 'Из любого города — по видеосвязи, с тем же результатом',
    Icon: IconVideo,
  },
  {
    href: '/treningi/',
    title: 'Корпоративные тренинги',
    description: 'Для юридических лиц: климат в коллективе, выгорание, конфликты',
    Icon: IconUsersGroup,
  },
  {
    href: '/detskiy-psiholog/',
    title: 'Детский психолог',
    description: 'Для детей до 7 лет: адаптация, страхи, поведение',
    Icon: IconMoodKid,
  },
  {
    href: '/trudnye-podrostki/',
    title: 'Подростковый психолог',
    description: 'Работа с трудными подростками и их родителями',
    Icon: IconSchool,
  },
]

export function ServicesSection() {
  return (
    <Container size="lg" py={72} id="services">
      <Stack gap={8} align="center" mb={48}>
        <Text tt="uppercase" fz="sm" fw={600} c="brand.6" lts="0.08em">
          Чем могу помочь
        </Text>
        <Title order={2} ta="center">Направления работы</Title>
        <Text c="dimmed" ta="center" maw={620}>
          Первая консультация — бесплатная. На ней вместе определим,
          что происходит и какой формат работы подойдёт именно вам.
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {SERVICES.map(({ href, title, description, Icon }) => (
          <Card key={href} component={Link} href={href} className={classes.card} padding="xl" shadow="sm">
            <div className={classes.iconBox}>
              <Icon size={26} stroke={1.5} />
            </div>
            <Title order={3} fz="lg" mt="md" mb={6} className={classes.title}>
              {title}
            </Title>
            <Text c="dimmed" fz="sm" lh={1.55}>
              {description}
            </Text>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  )
}
