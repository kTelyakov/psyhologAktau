'use client'

import { AnimatePresence, motion, useInView, type UseInViewOptions, type Variants } from 'motion/react'
import { useRef, type ReactNode } from 'react'

interface BlurFadeProps {
  children: ReactNode
  className?: string
  variant?: { hidden: { y: number }; visible: { y: number } }
  duration?: number
  delay?: number
  yOffset?: number
  inView?: boolean
  inViewMargin?: UseInViewOptions['margin']
  blur?: string
}

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.4,
  delay = 0,
  yOffset = 6,
  inView = true,
  inViewMargin = '-50px',
  blur = '6px',
}: BlurFadeProps) {
  const ref = useRef(null)
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin })
  const isInView = !inView || inViewResult

  const defaultVariants: Variants = {
    hidden: { y: yOffset, opacity: 0, filter: `blur(${blur})` },
    visible: { y: -0, opacity: 1, filter: 'blur(0px)' },
  }
  const combinedVariants = variant ?? defaultVariants

  return (
    <AnimatePresence>
      <motion.div
        ref={ref}
        data-blur-fade
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        exit="hidden"
        variants={combinedVariants}
        transition={{ delay: 0.04 + delay, duration, ease: 'easeOut' }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
