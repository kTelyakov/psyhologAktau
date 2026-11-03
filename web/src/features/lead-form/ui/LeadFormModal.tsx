'use client'

import { Button, Modal, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import type { ButtonProps } from '@mantine/core'
import type { ReactNode } from 'react'

import { LeadForm } from './LeadForm'

interface Props extends ButtonProps {
  label?: ReactNode
  title?: string
}

export function LeadFormModal({
  label = 'Записаться на консультацию',
  title = 'Бесплатная консультация',
  ...buttonProps
}: Props) {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Button onClick={open} {...buttonProps}>
        {label}
      </Button>

      <Modal opened={opened} onClose={close} title={title} centered size="md" radius="lg">
        <Text c="dimmed" fz="sm" mb="lg">
          Оставьте контакты — свяжемся в ближайшее время. Всё, что вы расскажете,
          остаётся между вами и психологом.
        </Text>
        <LeadForm onDone={() => setTimeout(close, 2500)} />
      </Modal>
    </>
  )
}
