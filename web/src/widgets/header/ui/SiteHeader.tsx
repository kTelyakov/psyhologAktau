'use client'

import { Menu, Phone, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { LeadFormModal } from '@/features/lead-form'
import { SITE } from '@/shared/config'
import { cn } from '@/shared/lib'
import { Button } from '@/shared/ui'

const LINKS = [
  { label: 'Главная', href: '/' },
  { label: 'Услуги', href: '/individualnye-konsultacii/' },
  { label: 'Статьи', href: '/blog/' },
  { label: 'Контакты', href: '/kontakty/' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, ''))

  return (
    <header className="sticky top-0 z-50 border-b border-rule/80 bg-paper/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-6xl items-center justify-between gap-4 px-5">
        <Link href="/" className="flex shrink-0 items-center gap-3">
          <Image
            src="/logo.png"
            alt=""
            width={42}
            height={42}
            priority
            unoptimized
            className="object-contain"
          />
          <span className="leading-tight">
            <span className="block font-display text-lg">Ару-Ана</span>
            <span className="hidden text-[11px] tracking-wide text-ink-soft xs:block">
              центр практической психологии
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                'rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                isActive(l.href)
                  ? 'bg-clay-500 text-white'
                  : 'text-ink-soft hover:bg-clay-50 hover:text-clay-600',
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={SITE.phoneHref}
            className="hidden items-center gap-2 px-3 text-sm font-semibold transition-colors hover:text-clay-600 sm:flex"
          >
            <Phone className="size-4" />
            {SITE.phone}
          </a>
          <LeadFormModal label="Записаться" size="sm" className="hidden md:inline-flex" />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Меню"
            className="grid size-10 cursor-pointer place-items-center rounded-full hover:bg-paper-2 md:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-rule bg-paper px-5 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 font-semibold text-ink-soft hover:bg-paper-2 hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
            <Button asChild variant="outline" className="mt-2">
              <a href={SITE.phoneHref}>
                <Phone className="size-4" /> {SITE.phone}
              </a>
            </Button>
            <LeadFormModal label="Записаться" className="mt-1 w-full" />
          </div>
        </nav>
      )}
    </header>
  )
}
