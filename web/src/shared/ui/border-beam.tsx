'use client'

import { motion, type MotionStyle, type Transition } from 'motion/react'

import { cn } from '@/shared/lib'

interface BorderBeamProps {
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  transition?: Transition
  className?: string
  style?: React.CSSProperties
  reverse?: boolean
  initialOffset?: number
}

export function BorderBeam({
  className,
  size = 60,
  delay = 0,
  duration = 6,
  colorFrom = '#c2704f',
  colorTo = '#7d8f7a',
  transition,
  style,
  reverse = false,
  initialOffset = 0,
}: BorderBeamProps) {
  return (
    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border border-transparent [mask-clip:padding-box,border-box] [mask-composite:intersect] [mask-image:linear-gradient(transparent,transparent),linear-gradient(#000,#000)]">
      <motion.div
        className={cn(
          'absolute aspect-square',
          'bg-gradient-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent',
          className,
        )}
        style={
          {
            width: size,
            offsetPath: `rect(0 auto auto 0 round ${size}px)`,
            '--color-from': colorFrom,
            '--color-to': colorTo,
            ...style,
          } as MotionStyle
        }
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{ offsetDistance: reverse ? [`${100 - initialOffset}%`, `${-initialOffset}%`] : [`${initialOffset}%`, `${100 + initialOffset}%`] }}
        transition={{ repeat: Infinity, ease: 'linear', duration, delay: -delay, ...transition }}
      />
    </div>
  )
}
