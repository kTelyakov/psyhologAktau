import { ArrowUpRight, Baby, GraduationCap, HeartHandshake, User, Users, Video } from 'lucide-react'
import Link from 'next/link'

import { Rise, BorderBeam } from '@/shared/ui'
import { cn } from '@/shared/lib'

const SERVICES = [
  {
    href: '/individualnye-konsultacii/',
    title: 'Индивидуальные консультации',
    description: 'Тревога, самооценка, выгорание, отношения, поиск опоры в себе',
    Icon: User,
    featured: true,
  },
  { href: '/semeynye-konsultacii/', title: 'Семейные консультации', description: 'Для пар, которые хотят понять друг друга', Icon: HeartHandshake },
  { href: '/skype-konsultacii/', title: 'Консультации онлайн', description: 'Из любого города — по видеосвязи', Icon: Video },
  { href: '/detskiy-psiholog/', title: 'Детский психолог', description: 'Адаптация, страхи, поведение — для детей до 7 лет', Icon: Baby },
  { href: '/trudnye-podrostki/', title: 'Подростковый психолог', description: 'Работа с трудными подростками и их родителями', Icon: GraduationCap },
  { href: '/treningi/', title: 'Корпоративные тренинги', description: 'Выгорание, конфликты, климат в коллективе', Icon: Users },
]

export function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-5 py-20">
      <Rise>
        <p className="text-center text-[13px] font-bold uppercase tracking-[0.18em] text-sage-700">
          Чем могу помочь
        </p>
        <h2 className="mt-3 text-center font-display text-[clamp(1.8rem,3.5vw,2.7rem)] tracking-tight">
          Направления работы
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center leading-relaxed text-ink-soft">
          Первая консультация бесплатная. На ней вместе определим, что происходит
          и какой формат работы подойдёт именно вам.
        </p>
      </Rise>

      <div className="mt-12 grid gap-4 md:auto-rows-fr md:grid-cols-3">
        {SERVICES.map(({ href, title, description, Icon, featured }, i) => (
          <Rise key={href} delay={0.06 * i} className={cn(featured && 'md:col-span-2 md:row-span-2')}>
            <Link
              href={href}
              className={cn(
                'group relative flex h-full flex-col overflow-hidden rounded-card border border-rule bg-white p-7',
                'transition-all duration-300 hover:-translate-y-1 hover:border-clay-200 hover:shadow-[0_18px_40px_-14px_rgba(33,29,26,0.18)]',
                featured && 'bg-gradient-to-br from-white to-clay-50',
              )}
            >
              {featured && <BorderBeam duration={9} size={90} />}
              <span className="grid size-13 place-items-center rounded-2xl bg-clay-50 text-clay-600 transition-colors duration-300 group-hover:bg-clay-500 group-hover:text-white">
                <Icon className="size-6" strokeWidth={1.6} />
              </span>
              <h3 className={cn('mt-5 font-display leading-snug', featured ? 'text-2xl' : 'text-xl')}>
                {title}
              </h3>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-ink-soft">{description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-clay-600">
                Подробнее
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          </Rise>
        ))}
      </div>
    </section>
  )
}
