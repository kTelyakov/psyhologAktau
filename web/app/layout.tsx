import '@/app/styles/globals.css'

import type { Metadata, Viewport } from 'next'
import { Lora, Manrope } from 'next/font/google'

import { SITE } from '@/shared/config'
import { JsonLd, graph, organizationSchema, personSchema, websiteSchema } from '@/shared/seo'
import { SiteFooter } from '@/widgets/footer'
import { SiteHeader } from '@/widgets/header'

const display = Lora({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600'],
  display: 'swap',
  variable: '--font-display',
})

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
  alternates: {
    canonical: '/',
    languages: { 'ru-KZ': '/', 'x-default': '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_KZ',
    siteName: SITE.center,
    images: [{ url: '/psyholog.png', width: 460, height: 560, alt: SITE.psychologist }],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  themeColor: '#c2704f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${display.variable} ${sans.variable}`}>
      <head>
        <JsonLd data={graph(organizationSchema(), personSchema(), websiteSchema())} />
      </head>
      <body className="font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
