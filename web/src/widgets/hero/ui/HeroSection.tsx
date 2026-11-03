import { Check, Phone, Sparkles } from 'lucide-react'
import Image from 'next/image'

import { LeadFormModal } from '@/features/lead-form'
import { SITE } from '@/shared/config'
import { Button, DotPattern, NumberTicker, ShimmerButton } from '@/shared/ui'
import { cn } from '@/shared/lib'

const ADVANTAGES = [
  'Более 20 лет опыта',
  'Полная анонимность',
  'Индивидуальный подход',
  'Первая консультация бесплатно',
]

interface Props {
  title?: string
  highlight?: string
  subtitle?: string
  compact?: boolean
}

export function HeroSection({
  title = 'Помощь в решении',
  highlight = 'психологических проблем',
  subtitle = 'Разберёмся в том, что происходит, и найдём выход. Конфиденциально, без осуждения, в вашем темпе.',
  compact = false,
}: Props) {
  return (
    <section className="relative overflow-hidden">
      <DotPattern className="[mask-image:radial-gradient(60%_60%_at_50%_30%,white,transparent)] fill-ink/[0.07]" />
      <div className="pointer-events-none absolute -right-32 -top-32 size-[460px] rounded-full bg-clay-100/60 blur-3xl" />
      <div className="pointer-events-none absolute -left-40 top-40 size-[380px] rounded-full bg-sage-100/70 blur-3xl" />

      <div
        className={cn(
          'relative mx-auto grid max-w-6xl items-center gap-12 px-5 lg:grid-cols-[1.1fr_0.9fr]',
          compact ? 'pb-12 pt-14' : 'pb-16 pt-20',
        )}
      >
        <div>
          <div className="anim-rise" style={{ animationDelay: '0.04s' }}>
            <span className="inline-flex items-center gap-2 rounded-full border border-clay-200 bg-white/70 px-4 py-1.5 text-[13px] font-semibold text-clay-700 backdrop-blur">
              <Sparkles className="size-3.5" />
              Психолог в Актау · 20 лет практики
            </span>
          </div>

          <div className="anim-rise" style={{ animationDelay: '0.11s' }}>
            <h1 className="mt-6 font-display text-[clamp(2.1rem,5vw,3.7rem)] leading-[1.12] tracking-tight">
              {title}{' '}
              <span className="relative inline-block italic text-clay-600">
                {highlight}
                <svg
                  className="absolute -bottom-1 left-0 w-full text-clay-300"
                  height="9"
                  viewBox="0 0 200 9"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path d="M2 6c40-4 80-5 196-3" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
              </span>{' '}
              любой сложности
            </h1>
          </div>

          <div className="anim-rise" style={{ animationDelay: '0.18s' }}>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">{subtitle}</p>
          </div>

          <div className="anim-rise" style={{ animationDelay: '0.24s' }}>
            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {ADVANTAGES.map((a) => (
                <li key={a} className="flex items-center gap-2.5 text-[15px] font-medium">
                  <span className="grid size-5 shrink-0 place-items-center rounded-full bg-sage-500 text-white">
                    <Check className="size-3" strokeWidth={3} />
                  </span>
                  {a}
                </li>
              ))}
            </ul>
          </div>

          <div className="anim-rise" style={{ animationDelay: '0.30s' }}>
            <div className="mt-9 flex flex-wrap gap-3">
              <LeadFormModal
                trigger={<ShimmerButton className="text-[15px]">Бесплатная консультация</ShimmerButton>}
              />
              <Button asChild variant="outline" size="lg">
                <a href={SITE.phoneHref}>
                  <Phone className="size-4" />
                  {SITE.phone}
                </a>
              </Button>
            </div>
          </div>

          <div className="anim-rise" style={{ animationDelay: '0.37s' }}>
            <div className="mt-10 flex items-center gap-8 border-t border-rule pt-7">
              <div>
                <p className="font-display text-3xl">
                  <NumberTicker value={20} />+
                </p>
                <p className="mt-1 text-[13px] text-ink-soft">лет практики</p>
              </div>
              <div className="h-10 w-px bg-rule" />
              <div>
                <p className="font-display text-3xl">
                  <NumberTicker value={10000} />+
                </p>
                <p className="mt-1 text-[13px] text-ink-soft">человек получили помощь</p>
              </div>
            </div>
          </div>
        </div>

        <div className="anim-rise hidden lg:block" style={{ animationDelay: '0.16s' }}>
          <div className="relative">
            <div className="absolute inset-x-0 bottom-0 top-[6%] rounded-[46%_46%_1.5rem_1.5rem/32%_32%_1.5rem_1.5rem] bg-gradient-to-b from-sage-300/45 to-clay-100/60" />
            <Image
              src="/mom.png"
              alt={SITE.psychologist}
              width={520}
              height={640}
              priority
              sizes="(max-width: 1024px) 16px, 520px"
              className="relative h-auto w-full object-contain drop-shadow-[0_20px_40px_rgba(33,29,26,0.16)]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
