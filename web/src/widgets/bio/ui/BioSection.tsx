import { Award, Users } from 'lucide-react'
import Image from 'next/image'

import { LeadFormModal } from '@/features/lead-form'
import { SITE } from '@/shared/config'
import { Rise, Marquee, NumberTicker } from '@/shared/ui'

const DIPLOMAS = [
  'dip1.jpeg', 'dip2.png', 'dip3.png', 'dip4.png', 'dip5.png', 'dip6.png',
  'dip7.jpeg', 'dip8.jpeg', 'dip9.jpeg', 'dip10.jpeg', 'dip11.jpeg', 'dip12.jpeg',
]

export function BioSection() {
  return (
    <section id="about" className="border-y border-rule bg-white py-20">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <Rise>
            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-sage-300/50 to-clay-100">
              <Image
                src="/psyholog.png"
                alt={SITE.psychologist}
                width={520}
                height={620}
                className="h-auto w-full object-contain"
              />
            </div>
          </Rise>

          <Rise delay={0.12}>
            <p className="text-[13px] font-bold uppercase tracking-[0.18em] text-sage-700">
              О специалисте
            </p>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,3.5vw,2.7rem)] tracking-tight">
              {SITE.psychologist}
            </h2>
            <p className="mt-2 text-lg font-medium text-clay-600">
              Практический психолог, основатель центра «Ару-Ана»
            </p>

            <div className="mt-6 space-y-4 leading-relaxed text-ink-soft">
              <p>
                Более двадцати лет работаю с людьми, которые оказались в тупике:
                распадается семья, не слышно ребёнка, накрывает тревога, уходит смысл.
                В работе опираюсь на уважение к человеку и его праву на ошибку —
                без диагнозов, обвинений и готовых рецептов.
              </p>
              <p>
                Веду приём в Актау и онлайн, провожу корпоративные тренинги,
                выступаю на телевидении и пишу статьи для тех, кто пока не готов
                прийти на консультацию.
              </p>
            </div>

            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {[
                { Icon: Award, value: 20, suffix: '+', label: 'лет практики' },
                { Icon: Users, value: 10000, suffix: '+', label: 'человек получили помощь' },
              ].map(({ Icon, value, suffix, label }) => (
                <div key={label} className="flex items-center gap-3 rounded-2xl border border-rule bg-paper px-4 py-4">
                  <Icon className="size-7 shrink-0 text-clay-500" strokeWidth={1.6} />
                  <div>
                    <p className="font-display text-2xl leading-none">
                      <NumberTicker value={value} />{suffix}
                    </p>
                    <p className="mt-1 text-xs text-ink-soft">{label}</p>
                  </div>
                </div>
              ))}
            </div>

            <LeadFormModal label="Записаться на приём" size="lg" className="mt-7" />
          </Rise>
        </div>

        <Rise delay={0.1}>
          <div className="mt-20">
            <h3 className="text-center font-display text-2xl">Образование и квалификация</h3>
            <p className="mt-2 text-center text-sm text-ink-soft">
              {DIPLOMAS.length} документов о профессиональной подготовке
            </p>
            <Marquee pauseOnHover className="mt-8 [--duration:50s] [--gap:1rem]">
              {DIPLOMAS.map((d) => (
                <a
                  key={d}
                  href={`/diploms/${d}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative h-36 w-52 shrink-0 overflow-hidden rounded-xl border border-rule bg-paper transition-transform duration-300 hover:scale-[1.04]"
                >
                  <Image src={`/diploms/${d}`} alt="Диплом" fill sizes="208px" className="object-cover" />
                </a>
              ))}
            </Marquee>
          </div>
        </Rise>
      </div>
    </section>
  )
}
