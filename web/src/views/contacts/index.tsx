import { Container, Stack, Text, Title } from '@mantine/core'
import type { Metadata } from 'next'

import { SITE } from '@/shared/config'
import { ContactsSection } from '@/widgets/contacts'

export const metadata: Metadata = {
  title: 'Контакты психолога в Актау — адрес, телефон, запись',
  description: `Как записаться на консультацию психолога в Актау: ${SITE.address}. Телефон ${SITE.phone}.`,
  alternates: { canonical: '/kontakty/' },
}

export default function ContactsView() {
  return (
    <>
      <Container size="lg" pt={56} pb={16}>
        <Stack gap="md" align="center">
          <Text tt="uppercase" fz="sm" fw={600} c="brand.6" lts="0.08em">Контакты</Text>
          <Title order={1} ta="center">Как записаться на консультацию</Title>
          <Text c="dimmed" ta="center" maw={620} fz="lg">
            Позвоните, напишите или оставьте заявку — свяжемся в ближайшее время
            и договоримся об удобном времени.
          </Text>
        </Stack>
      </Container>

      <ContactsSection />
    </>
  )
}
