'use client'

import { Check, Loader2, MessageSquare, Phone, User } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { submitLead } from '@/entities/lead'
import { Button, FieldError, Input, Label, Textarea } from '@/shared/ui'

interface Errors {
  name?: string
  phone?: string
  form?: string
}

export function LeadForm({ onDone }: { onDone?: () => void }) {
  const pathname = usePathname()
  const [values, setValues] = useState({ name: '', phone: '', message: '', website: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle')

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues((v) => ({ ...v, [k]: e.target.value }))
    setErrors((prev) => ({ ...prev, [k]: undefined }))
  }

  function validate(): boolean {
    const next: Errors = {}
    if (values.name.trim().length < 2) next.name = 'Укажите имя'
    if (values.phone.replace(/\D/g, '').length < 10) next.phone = 'Телефон в формате +7 7XX XXX XX XX'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate()) return
    setState('sending')
    try {
      await submitLead({ ...values, sourcePage: pathname })
      setState('sent')
      setValues({ name: '', phone: '', message: '', website: '' })
      onDone?.()
    } catch (err) {
      setErrors({ form: (err as Error).message })
      setState('idle')
    }
  }

  if (state === 'sent') {
    return (
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-sage-300 bg-sage-100/60 px-6 py-10 text-center">
        <span className="grid size-12 place-items-center rounded-full bg-sage-500 text-white">
          <Check className="size-6" />
        </span>
        <p className="font-display text-xl">Заявка отправлена</p>
        <p className="max-w-sm text-sm leading-relaxed text-ink-soft">
          Гульсара свяжется с вами в ближайшее время. Если вопрос срочный — позвоните напрямую.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {errors.form && (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errors.form}
        </p>
      )}

      <div>
        <Label htmlFor="lead-name">Ваше имя</Label>
        <div className="relative">
          <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-soft/60" />
          <Input
            id="lead-name"
            className="pl-10"
            placeholder="Как к вам обращаться"
            value={values.name}
            onChange={set('name')}
            aria-invalid={!!errors.name}
          />
        </div>
        <FieldError>{errors.name}</FieldError>
      </div>

      <div>
        <Label htmlFor="lead-phone">Телефон</Label>
        <div className="relative">
          <Phone className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-ink-soft/60" />
          <Input
            id="lead-phone"
            className="pl-10"
            inputMode="tel"
            placeholder="+7 702 000 00 00"
            value={values.phone}
            onChange={set('phone')}
            aria-invalid={!!errors.phone}
          />
        </div>
        <FieldError>{errors.phone}</FieldError>
      </div>

      <div>
        <Label htmlFor="lead-msg">
          Коротко о ситуации
          <span className="ml-1.5 font-normal text-ink-soft">— не обязательно</span>
        </Label>
        <div className="relative">
          <MessageSquare className="pointer-events-none absolute left-3.5 top-3.5 size-4 text-ink-soft/60" />
          <Textarea
            id="lead-msg"
            className="pl-10"
            placeholder="С чем хотите разобраться?"
            value={values.message}
            onChange={set('message')}
          />
        </div>
      </div>

      {/* honeypot — скрыт от людей, боты заполняют */}
      <input
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] size-px"
        value={values.website}
        onChange={set('website')}
      />

      <Button type="submit" size="lg" className="w-full" disabled={state === 'sending'}>
        {state === 'sending' && <Loader2 className="size-4 animate-spin" />}
        Записаться на консультацию
      </Button>

      <p className="text-center text-xs leading-relaxed text-ink-soft/80">
        Всё, что вы расскажете, остаётся между вами и психологом
      </p>
    </form>
  )
}
