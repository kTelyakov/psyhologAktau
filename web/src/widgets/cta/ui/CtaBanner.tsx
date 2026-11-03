import { Box, Button, Container, Group, Stack, Text, Title } from '@mantine/core'
import { IconPhone } from '@tabler/icons-react'

import { LeadFormModal } from '@/features/lead-form'
import { SITE } from '@/shared/config'

import classes from './CtaBanner.module.css'

interface Props {
  title?: string
  text?: string
}

export function CtaBanner({
  title = 'Не обязательно справляться одному',
  text = 'Первая консультация бесплатная. Расскажете, что происходит, — вместе решим, с чего начать.',
}: Props) {
  return (
    <Container size="lg" py={48}>
      <Box className={classes.banner}>
        <Stack gap="md" align="center" ta="center">
          <Title order={2} c="white" maw={700}>{title}</Title>
          <Text c="brand.1" fz="lg" maw={620} lh={1.6}>{text}</Text>
          <Group gap="md" mt="sm">
            <LeadFormModal label="Записаться" size="md" variant="white" c="brand.7" />
            <Button
              component="a"
              href={SITE.phoneHref}
              size="md"
              variant="outline"
              color="white"
              leftSection={<IconPhone size={18} stroke={1.6} />}
            >
              {SITE.phone}
            </Button>
          </Group>
        </Stack>
      </Box>
    </Container>
  )
}
