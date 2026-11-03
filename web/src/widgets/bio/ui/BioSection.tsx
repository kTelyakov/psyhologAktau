import { Badge, Box, Container, Group, Paper, SimpleGrid, Stack, Text, Title } from '@mantine/core'
import { IconAward, IconUsers } from '@tabler/icons-react'
import Image from 'next/image'

import { LeadFormModal } from '@/features/lead-form'
import { SITE } from '@/shared/config'

import classes from './BioSection.module.css'

const DIPLOMAS = [
  'dip1.jpeg', 'dip2.png', 'dip3.png', 'dip4.png', 'dip5.png', 'dip6.png',
  'dip7.jpeg', 'dip8.jpeg', 'dip9.jpeg', 'dip10.jpeg', 'dip11.jpeg', 'dip12.jpeg',
]

const STATS = [
  { value: '20+', label: 'лет практики', Icon: IconAward },
  { value: '10 000+', label: 'человек получили помощь', Icon: IconUsers },
]

export function BioSection() {
  return (
    <Box className={classes.wrapper} id="about">
      <Container size="lg" py={72}>
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing={48} style={{ alignItems: 'center' }}>
          <div className={classes.photoWrap}>
            <Image
              src="/psyholog.png"
              alt={SITE.psychologist}
              width={460}
              height={560}
              className={classes.photo}
            />
          </div>

          <Stack gap="lg">
            <Badge variant="light" color="brand" size="lg" radius="sm" w="fit-content">
              О специалисте
            </Badge>

            <Title order={2}>{SITE.psychologist}</Title>
            <Text fz="lg" c="brand.7" fw={500} mt={-8}>
              Практический психолог, основатель центра «Ару-Ана»
            </Text>

            <Text c="gray.7" lh={1.7}>
              Более двадцати лет работаю с людьми, которые оказались в тупике:
              распадается семья, не слышно ребёнка, накрывает тревога, уходит смысл.
              В работе опираюсь на уважение к человеку и его праву на ошибку —
              без диагнозов, обвинений и готовых рецептов.
            </Text>

            <Text c="gray.7" lh={1.7}>
              Веду приём в Актау и онлайн, провожу корпоративные тренинги,
              выступаю на телевидении и пишу статьи для тех, кто пока не готов
              прийти на консультацию.
            </Text>

            <SimpleGrid cols={2} spacing="md" mt="xs">
              {STATS.map(({ value, label, Icon }) => (
                <Paper key={label} p="md" withBorder bg="white">
                  <Group gap="sm" wrap="nowrap">
                    <Icon size={28} stroke={1.5} className={classes.statIcon} />
                    <div>
                      <Text fw={700} fz="xl" lh={1.1}>{value}</Text>
                      <Text fz="xs" c="dimmed" lh={1.3}>{label}</Text>
                    </div>
                  </Group>
                </Paper>
              ))}
            </SimpleGrid>

            <LeadFormModal label="Записаться на приём" size="md" w="fit-content" />
          </Stack>
        </SimpleGrid>

        <Stack gap="md" mt={64}>
          <Title order={3} ta="center" fz="h3">Образование и квалификация</Title>
          <Text c="dimmed" ta="center" fz="sm" mb="sm">
            {DIPLOMAS.length} документа о профессиональной подготовке
          </Text>
          <div className={classes.diplomas}>
            {DIPLOMAS.map((d) => (
              <a
                key={d}
                href={`/diploms/${d}`}
                target="_blank"
                rel="noopener noreferrer"
                className={classes.diploma}
              >
                <Image src={`/diploms/${d}`} alt="Диплом" width={200} height={140}
                       className={classes.diplomaImg} />
              </a>
            ))}
          </div>
        </Stack>
      </Container>
    </Box>
  )
}
