'use client'

import { useState, type ReactNode } from 'react'

import {
  Button, Dialog, DialogContent, DialogDescription,
  DialogHeader, DialogTitle, DialogTrigger, type ButtonProps,
} from '@/shared/ui'

import { LeadForm } from './LeadForm'

interface Props extends Omit<ButtonProps, 'children'> {
  label?: ReactNode
  title?: string
  trigger?: ReactNode
}

export function LeadFormModal({
  label = 'Записаться на консультацию',
  title = 'Бесплатная консультация',
  trigger,
  ...buttonProps
}: Props) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger ?? <Button {...buttonProps}>{label}</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Оставьте контакты — свяжемся в ближайшее время и подберём удобное время встречи.
          </DialogDescription>
        </DialogHeader>
        <LeadForm onDone={() => setTimeout(() => setOpen(false), 2600)} />
      </DialogContent>
    </Dialog>
  )
}
