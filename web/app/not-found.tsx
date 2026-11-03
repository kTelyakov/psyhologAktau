import { Button, Container, Group, Stack, Text, Title } from '@mantine/core'
import Link from 'next/link'

export default function NotFound() {
  return (
    <Container size={620} py={120}>
      <Stack gap="lg" align="center" ta="center">
        <Text fw={700} fz={72} c="brand.2" lh={1}>404</Text>
        <Title order={1} fz="h2">Такой страницы нет</Title>
        <Text c="dimmed" fz="lg">
          Возможно, она переехала. Попробуйте начать с главной или посмотрите статьи.
        </Text>
        <Group gap="md" mt="sm">
          <Button component={Link} href="/" size="md">На главную</Button>
          <Button component={Link} href="/blog/" variant="light" size="md">Статьи</Button>
        </Group>
      </Stack>
    </Container>
  )
}
