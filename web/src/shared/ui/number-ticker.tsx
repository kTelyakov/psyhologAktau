'use client'

import { useInView, useMotionValue, useSpring } from 'motion/react'
import { useEffect, useRef } from 'react'

import { cn } from '@/shared/lib'

interface Props {
  value: number
  direction?: 'up' | 'down'
  delay?: number
  className?: string
  decimalPlaces?: number
}

export function NumberTicker({
  value,
  direction = 'up',
  delay = 0,
  className,
  decimalPlaces = 0,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(direction === 'down' ? value : 0)
  const springValue = useSpring(motionValue, { damping: 60, stiffness: 100 })
  const isInView = useInView(ref, { once: true, margin: '0px' })

  useEffect(() => {
    if (!isInView) return
    const t = setTimeout(() => motionValue.set(direction === 'down' ? 0 : value), delay * 1000)
    return () => clearTimeout(t)
  }, [motionValue, isInView, delay, value, direction])

  useEffect(
    () =>
      springValue.on('change', (latest) => {
        if (ref.current) {
          ref.current.textContent = Intl.NumberFormat('ru-RU', {
            minimumFractionDigits: decimalPlaces,
            maximumFractionDigits: decimalPlaces,
          }).format(Number(latest.toFixed(decimalPlaces)))
        }
      }),
    [springValue, decimalPlaces],
  )

  return (
    <span ref={ref} className={cn('inline-block tabular-nums tracking-tight', className)}>
      0
    </span>
  )
}
