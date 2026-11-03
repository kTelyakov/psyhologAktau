import { SITE } from '@/shared/config'

import { ORG_ID, PERSON_ID, SITE_URL, WEBSITE_ID, abs } from './config'

type Node = Record<string, unknown>

/** Психолог как личность — на неё ссылаются статьи и организация. */
export function personSchema(): Node {
  return {
    '@type': 'Person',
    '@id': PERSON_ID,
    name: SITE.psychologist,
    jobTitle: 'Практический психолог',
    description:
      'Практический психолог с опытом более 20 лет, основатель центра практической психологии «Ару-Ана» в Актау.',
    image: abs('/psyholog.png'),
    url: SITE_URL,
    telephone: '+77025253857',
    email: SITE.email,
    worksFor: { '@id': ORG_ID },
    knowsAbout: [
      'Семейная психология',
      'Детская психология',
      'Подростковая психология',
      'Тревожные расстройства',
      'Эмоциональное выгорание',
      'Панические атаки',
    ],
    knowsLanguage: ['ru', 'kk'],
    sameAs: SITE.socials.map((s) => s.href),
  }
}

/** Организация. ProfessionalService точнее, чем LocalBusiness. */
export function organizationSchema(): Node {
  return {
    '@type': ['ProfessionalService', 'LocalBusiness'],
    '@id': ORG_ID,
    name: SITE.center,
    alternateName: 'Ару-Ана',
    description:
      'Центр практической психологии в Актау: индивидуальные и семейные консультации, '
      + 'детский и подростковый психолог, корпоративные тренинги.',
    url: SITE_URL,
    telephone: '+77025253857',
    email: SITE.email,
    image: abs('/logo.png'),
    logo: abs('/logo.png'),
    priceRange: '₸₸',
    currenciesAccepted: 'KZT',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '28А микрорайон, бизнес-центр «Тианде»',
      addressLocality: 'Актау',
      addressRegion: 'Мангистауская область',
      addressCountry: 'KZ',
    },
    areaServed: [
      { '@type': 'City', name: 'Актау' },
      { '@type': 'AdministrativeArea', name: 'Мангистауская область' },
      { '@type': 'Country', name: 'Казахстан' },
    ],
    founder: { '@id': PERSON_ID },
    employee: { '@id': PERSON_ID },
    sameAs: SITE.socials.map((s) => s.href),
    knowsLanguage: ['ru', 'kk'],
    makesOffer: [
      'Индивидуальные консультации',
      'Семейные консультации',
      'Детский психолог',
      'Подростковый психолог',
      'Консультации онлайн',
      'Корпоративные тренинги',
    ].map((name) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name, provider: { '@id': ORG_ID } },
    })),
  }
}

export function websiteSchema(): Node {
  return {
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: SITE_URL,
    name: SITE.name,
    inLanguage: 'ru-KZ',
    publisher: { '@id': ORG_ID },
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]): Node {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: abs(it.url),
    })),
  }
}

interface ArticleInput {
  title: string
  description: string
  url: string
  image?: string | null
  publishedAt?: string | null
  section?: string | null
  wordCount?: number
}

export function articleSchema(a: ArticleInput): Node {
  return {
    '@type': 'BlogPosting',
    '@id': abs(a.url) + '#article',
    headline: a.title.slice(0, 110),
    description: a.description,
    url: abs(a.url),
    mainEntityOfPage: { '@type': 'WebPage', '@id': abs(a.url) },
    datePublished: a.publishedAt ?? undefined,
    dateModified: a.publishedAt ?? undefined,
    articleSection: a.section ?? undefined,
    wordCount: a.wordCount,
    inLanguage: 'ru-KZ',
    image: a.image ? abs(`/media/${a.image}`) : abs('/logo.png'),
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORG_ID },
    isAccessibleForFree: true,
  }
}

export function serviceSchema(s: {
  name: string
  description: string
  url: string
}): Node {
  return {
    '@type': 'Service',
    '@id': abs(s.url) + '#service',
    name: s.name,
    description: s.description,
    url: abs(s.url),
    serviceType: 'Психологическая консультация',
    provider: { '@id': ORG_ID },
    areaServed: { '@type': 'Country', name: 'Казахстан' },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: abs(s.url),
      servicePhone: '+77025253857',
    },
  }
}

export function faqSchema(items: { q: string; a: string[] }[]): Node {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a.join('\n\n') },
    })),
  }
}

export function itemListSchema(items: { name: string; url: string }[]): Node {
  return {
    '@type': 'ItemList',
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      url: abs(it.url),
    })),
  }
}

/** Собирает один @graph — так Google разбирает связи между сущностями. */
export function graph(...nodes: Node[]): string {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': nodes.filter(Boolean),
  })
}
