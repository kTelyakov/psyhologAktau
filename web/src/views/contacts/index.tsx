import type { Metadata } from 'next'

import { SITE } from '@/shared/config'
import { Rise, DotPattern } from '@/shared/ui'
import { ContactsSection } from '@/widgets/contacts'

export const metadata: Metadata = {
  title: 'Контакты психолога в Актау — адрес, телефон, запись',
  description: `Как записаться на консультацию психолога в Актау: ${SITE.address}. Телефон ${SITE.phone}.`,
  alternates: { canonical: '/kontakty/' },
}

export default function ContactsView() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-rule">
        <DotPattern className="[mask-image:radial-gradient(60%_60%_at_50%_40%,white,transparent)] fill-ink/[0.07]" />
        <div className="relative mx-auto max-w-6xl px-5 py-16">
          <Rise>
            <p className="text-center text-[13px] font-bold uppercase tracking-[0.18em] text-sage-700">
              Контакты
            </p>
            <h1 className="mt-3 text-center font-display text-[clamp(2rem,4.4vw,3.2rem)] tracking-tight">
              Как записаться на консультацию
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-center text-lg leading-relaxed text-ink-soft">
              Позвоните, напишите или оставьте заявку — свяжемся в ближайшее время
              и договоримся об удобном времени.
            </p>
          </Rise>
        </div>
      </section>

      <ContactsSection />
    </>
  )
}
