/** Серверный адрес API — используется при рендеринге, в браузер не попадает. */
export const API_URL_INTERNAL =
  process.env.API_URL_INTERNAL ?? 'http://127.0.0.1:8000'

/** Публичный адрес для браузера (форма заявки) — на проде проксирует nginx. */
export const API_URL_PUBLIC =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://127.0.0.1:8000'

export const SITE = {
  name: 'Психолог в Актау',
  center: 'Центр практической психологии «Ару-Ана»',
  psychologist: 'Гульсара Карайчикова',
  phone: '+7 702 525 38 57',
  phoneHref: 'tel:+77025253857',
  email: 'psyholog.aktau@gmail.com',
  address:
    'Республика Казахстан, Мангистауская область, г. Актау, 28А мкр., бизнес-центр «Тианде», рядом с «Казком банк»',
  entity: 'ИП Карайчикова Г.Б., свидетельство о государственной регистрации № 0029064',
  socials: [
    { name: 'Instagram', href: 'https://www.instagram.com/psyholog_aktau/', icon: 'instagram.png' },
    { name: 'VK', href: 'https://vk.com/psyholog_aktau', icon: 'vk.png' },
    { name: 'Facebook', href: 'https://www.facebook.com/psiholog.aktau/', icon: 'fb.png' },
  ],
} as const

export const REVALIDATE_SECONDS = 3600
