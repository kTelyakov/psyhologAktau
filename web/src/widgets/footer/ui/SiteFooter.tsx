import { Mail, MapPin, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import { SITE } from '@/shared/config'

const SECTIONS = [
  { label: 'Индивидуальные консультации', href: '/individualnye-konsultacii/' },
  { label: 'Семейные консультации', href: '/semeynye-konsultacii/' },
  { label: 'Детский психолог', href: '/detskiy-psiholog/' },
  { label: 'Статьи', href: '/blog/' },
  { label: 'Контакты', href: '/kontakty/' },
]

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <p className="font-display text-2xl">Ару-Ана</p>
            <p className="mt-2 text-sm leading-relaxed text-paper/60">
              Центр практической психологии в Актау
            </p>
            <div className="mt-5 flex gap-3">
              {SITE.socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="grid size-10 place-items-center rounded-full bg-white/10 transition-all hover:-translate-y-0.5 hover:bg-white/20"
                >
                  <Image src={`/socials/${s.icon}`} alt={s.name} width={20} height={20} unoptimized />
                </a>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-paper/50">Разделы</p>
            <ul className="space-y-2.5">
              {SECTIONS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-paper/75 transition-colors hover:text-clay-200">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-paper/50">Контакты</p>
            <ul className="space-y-3.5 text-sm">
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-clay-300" />
                <a href={SITE.phoneHref} className="text-paper/75 hover:text-clay-200">{SITE.phone}</a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-clay-300" />
                <a href={`mailto:${SITE.email}`} className="text-paper/75 hover:text-clay-200">{SITE.email}</a>
              </li>
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 size-4 shrink-0 text-clay-300" />
                <span className="leading-relaxed text-paper/75">{SITE.address}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 space-y-1 border-t border-white/10 pt-6 text-xs text-paper/45">
          <p>{SITE.entity}</p>
          <p>© {new Date().getFullYear()} {SITE.center}</p>
        </div>
      </div>
    </footer>
  )
}
