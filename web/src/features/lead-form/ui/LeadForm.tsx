'use client'

import { Alert, Button, Stack, TextInput, Textarea } from '@mantine/core'
import { useForm } from '@mantine/form'
import { IconCheck, IconPhone, IconUser } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { submitLead } from '@/entities/lead'

export function LeadForm({ onDone }: { onDone?: () => void }) {
  const pathname = usePathname()
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [error, setError] = useState<string | null>(null)

  const form = useForm({
    initialValues: { name: '', phone: '', message: '', website: '' },
    validate: {
      name: (v) => (v.trim().length < 2 ? 'Укажите имя' : null),
      phone: (v) =>
        v.replace(/\D/g, '').length < 10 ? 'Укажите телефон в формате +7 7XX XXX XX XX' : null,
    },
  })

  async function handleSubmit(values: typeof form.values) {
    setState('sending')
    setError(null)
    try {
      await submitLead({ ...values, sourcePage: pathname })
      setState('sent')
      form.reset()
      onDone?.()
    } catch (e) {
      setError((e as Error).message)
      setState('idle')
    }
  }

  if (state === 'sent') {
    return (
      <Alert color="teal" icon={<IconCheck size={18} />} title="Заявка отправлена">
        Гульсара свяжется с вами в ближайшее время. Если вопрос срочный — позвоните напрямую.
      </Alert>
    )
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} noValidate>
      <Stack gap="md">
        {error && <Alert color="red">{error}</Alert>}

        <TextInput
          label="Ваше имя"
          placeholder="Как к вам обращаться"
          size="md"
          leftSection={<IconUser size={18} stroke={1.5} />}
          {...form.getInputProps('name')}
        />

        <TextInput
          label="Телефон"
          placeholder="+7 702 000 00 00"
          size="md"
          leftSection={<IconPhone size={18} stroke={1.5} />}
          {...form.getInputProps('phone')}
        />

        <Textarea
          label="Коротко о ситуации"
          description="Не обязательно — можно обсудить всё при звонке"
          placeholder="С чем хотите разобраться?"
          minRows={3}
          autosize
          maxRows={6}
          size="md"
          {...form.getInputProps('message')}
        />

        {/* honeypot: скрыт от людей, боты заполняют */}
        <TextInput
          tabIndex={-1}
          autoComplete="off"
          aria-hidden
          style={{ position: 'absolute', left: '-9999px', width: 1, height: 1 }}
          {...form.getInputProps('website')}
        />

        <Button type="submit" size="md" loading={state === 'sending'} fullWidth>
          Записаться на консультацию
        </Button>
      </Stack>
    </form>
  )
}
