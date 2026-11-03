import type { ReactNode } from 'react'

import { cn } from '@/shared/lib'

/**
 * Появление на чистом CSS: элемент виден с первого кадра, анимация не ждёт
 * гидратации React. Для контента над сгибом и для длинных списков это
 * принципиально — motion-обёртка там давала Render Delay в несколько секунд.
 */
export function Rise({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <div
      className={cn('anim-rise', className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  )
}
