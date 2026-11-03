import { Badge, Box, Button, Container, Group, List, ListItem, Stack, Text, Title } from '@mantine/core'
import { IconCircleCheck, IconPhone } from '@tabler/icons-react'
import Image from 'next/image'

import { LeadFormModal } from '@/features/lead-form'
import { SITE } from '@/shared/config'

import classes from './HeroSection.module.css'

const ADVANTAGES = [
  'Более 20 лет опыта',
  'Полная анонимность',
  'Индивидуальный подход',
  'Помогли более 10 000 человек в СНГ',
]

interface Props {
  title?: string
  subtitle?: string
  badge?: string
}

export function HeroSection({
  title = 'Помощь в решении психологических проблем любой сложности',
  subtitle = 'Разберёмся в том, что происходит, и найдём выход. Конфиденциально, без осуждения, в вашем темпе.',
  badge = 'Центр практической психологии «Ару-Ана»',
}: Props) {
  return (
    <Box className={classes.wrapper}>
      <Container size="lg" className={classes.inner}>
        <Stack gap="xl" className={classes.content}>
          <Badge variant="light" color="brand" size="lg" radius="sm" w="fit-content">
            {badge}
          </Badge>

          <Title order={1} className={classes.title}>
            {title}
          </Title>

          <Text fz="lg" c="gray.7" maw={540} lh={1.6}>
            {subtitle}
          </Text>

          <List spacing="sm" icon={<IconCircleCheck size={22} className={classes.check} />}>
            {ADVANTAGES.map((a) => (
              <ListItem key={a}>
                <Text fw={500} c="gray.8">{a}</Text>
              </ListItem>
            ))}
          </List>

          <Group gap="md">
            <LeadFormModal label="Бесплатная консультация" size="md" />
            <Button
              component="a"
              href={SITE.phoneHref}
              variant="default"
              size="md"
              leftSection={<IconPhone size={18} stroke={1.6} />}
            >
              {SITE.phone}
            </Button>
          </Group>
        </Stack>

        <div className={classes.photoWrap}>
          <div className={classes.blob} aria-hidden />
          <Image
            src="/mom.png"
            alt={SITE.psychologist}
            width={520}
            height={640}
            priority
            className={classes.photo}
          />
        </div>
      </Container>
    </Box>
  )
}
