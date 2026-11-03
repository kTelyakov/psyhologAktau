import * as React from 'react'

import { cn } from '@/shared/lib'

const base =
  'w-full rounded-xl border border-rule bg-white px-4 py-3 text-[15px] text-ink placeholder:text-ink-soft/55 ' +
  'transition-colors outline-none focus:border-clay-400 focus:ring-2 focus:ring-clay-200 ' +
  'aria-[invalid=true]:border-red-400 aria-[invalid=true]:focus:ring-red-100'

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => <input ref={ref} className={cn(base, className)} {...props} />,
)
Input.displayName = 'Input'

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(({ className, ...props }, ref) => (
  <textarea ref={ref} className={cn(base, 'min-h-[110px] resize-y', className)} {...props} />
))
Textarea.displayName = 'Textarea'

export function Label({ className, ...props }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={cn('mb-1.5 block text-sm font-semibold text-ink', className)} {...props} />
}

export function FieldError({ children }: { children?: React.ReactNode }) {
  if (!children) return null
  return <p className="mt-1.5 text-[13px] text-red-600">{children}</p>
}
