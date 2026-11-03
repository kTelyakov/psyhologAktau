import { Phone } from 'lucide-react'

import { LeadFormModal } from '@/features/lead-form'
import { SITE } from '@/shared/config'
import { Rise, Button, DotPattern, ShimmerButton } from '@/shared/ui'

interface Props {
  title?: string
  text?: string
}

export function CtaBanner({
  title = 'Не обязательно справляться одному',
  text = 'Первая консультация бесплатная. Расскажете, что происходит, — вместе решим, с чего начать.',
}: Props) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-12">
      <Rise>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-clay-600 via-clay-500 to-clay-700 px-6 py-16 text-center">
          <DotPattern className="fill-white/15 [mask-image:radial-gradient(70%_70%_at_50%_50%,white,transparent)]" />
          <div className="pointer-events-none absolute -right-20 -top-20 size-64 rounded-full bg-white/10 blur-2xl" />

          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-display text-[clamp(1.6rem,3.4vw,2.6rem)] leading-tight text-white">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/80">{text}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <LeadFormModal
                trigger={
                  <ShimmerButton background="#ffffff" shimmerColor="#c2704f" className="text-clay-700">
                    Записаться
                  </ShimmerButton>
                }
              />
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:border-white hover:bg-white/10"
              >
                <a href={SITE.phoneHref}>
                  <Phone className="size-4" />
                  {SITE.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Rise>
    </section>
  )
}
