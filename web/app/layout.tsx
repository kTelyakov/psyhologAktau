import '@mantine/core/styles.css'
import '@/app/styles/globals.css'

import { ColorSchemeScript, mantineHtmlProps } from '@mantine/core'
import type { Metadata, Viewport } from 'next'
import { Manrope } from 'next/font/google'

import { Providers } from '@/app/providers'
import { SITE } from '@/shared/config'
import { SiteFooter } from '@/widgets/footer'
import { SiteHeader } from '@/widgets/header'

const sans = Manrope({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://psyholog-aktau.kz'),
  title: {
    default: `${SITE.name} — ${SITE.center}`,
    template: `%s — ${SITE.name}`,
  },
  description:
    'Психолог в Актау: индивидуальные и семейные консультации, детский и подростковый '
    + 'психолог, корпоративные тренинги. Более 20 лет практики, полная анонимность. '
    + 'Первая консультация бесплатно.',
  keywords: [
    'психолог Актау', 'психолог в Актау', 'семейный психолог Актау',
    'детский психолог Актау', 'консультация психолога', 'Ару-Ана',
  ],
  openGraph: {
    type: 'website',
    locale: 'ru_KZ',
    siteName: SITE.center,
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#4251ca',
  width: 'device-width',
  initialScale: 1,
}

const JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://psyholog-aktau.kz/#organization',
  name: SITE.center,
  description: 'Центр практической психологии в Актау',
  telephone: '+77025253857',
  email: SITE.email,
  url: 'https://psyholog-aktau.kz',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'KZ',
    addressRegion: 'Мангистауская область',
    addressLocality: 'Актау',
    streetAddress: '28А мкр., бизнес-центр «Тианде»',
  },
  founder: { '@type': 'Person', name: SITE.psychologist, jobTitle: 'Психолог' },
  sameAs: SITE.socials.map((s) => s.href),
  priceRange: '₸₸',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" {...mantineHtmlProps} className={sans.variable}>
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>
        <Providers>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </Providers>
      </body>
    </html>
  )
}
