import { Building2, Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'

import { LeadForm } from '@/features/lead-form'
import { SITE } from '@/shared/config'
import { Rise, BorderBeam } from '@/shared/ui'

export function ContactsSection() {
  const items = [
    { Icon: MapPin, label: 'Адрес', value: SITE.address },
    { Icon: Phone, label: 'Телефон', value: SITE.phone, href: SITE.phoneHref },
    { Icon: Mail, label: 'E-mail', value: SITE.email, href: `mailto:${SITE.email}` },
    { Icon: Building2, label: 'Реквизиты', value: SITE.entity },
  ]

  return (
    <section id="contacts" className="mx-auto max-w-6xl px-5 py-20">
      <Rise>
        <p className="text-center text-[13px] font-bold uppercase tracking-[0.18em] text-sage-700">
          Контакты
        </p>
        <h2 className="mt-3 text-center font-display text-[clamp(1.8rem,3.5vw,2.7rem)] tracking-tight">
          Приходите или напишите
        </h2>
      </Rise>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        <Rise>
          <ul className="space-y-5">
            {items.map(({ Icon, label, value, href }) => (
              <li key={label} className="flex gap-4">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-clay-50 text-clay-600">
                  <Icon className="size-5" strokeWidth={1.7} />
                </span>
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-wider text-ink-soft">{label}</p>
                  {href ? (
                    <a href={href} className="font-semibold text-clay-600 hover:underline">{value}</a>
                  ) : (
                    <p className="leading-relaxed">{value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <a
            href="https://2gis.kz/aktau"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-7 block overflow-hidden rounded-card border border-rule transition-shadow hover:shadow-lg"
          >
            <Image src="/map.png" alt="Карта: как нас найти" width={700} height={420} className="h-auto w-full" />
          </a>
        </Rise>

        <Rise delay={0.12}>
          <div className="relative overflow-hidden rounded-card border border-rule bg-white p-7 shadow-sm">
            <BorderBeam duration={10} size={110} />
            <h3 className="font-display text-2xl">Бесплатная консультация</h3>
            <p className="mb-6 mt-2 text-[15px] leading-relaxed text-ink-soft">
              Оставьте контакты — свяжемся в ближайшее время и подберём удобное время встречи.
            </p>
            <LeadForm />
          </div>
        </Rise>
      </div>
    </section>
  )
}
