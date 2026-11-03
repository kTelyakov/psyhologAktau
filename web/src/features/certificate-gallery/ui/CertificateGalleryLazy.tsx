'use client'

import dynamic from 'next/dynamic'

import type { Certificate } from './CertificateGallery'

/**
 * Код лайтбокса (обработчик клавиатуры, Radix Dialog, лента миниатюр)
 * нужен только после клика по миниатюре. До этого момента в бандл
 * первой загрузки он не попадает — иначе TBT растёт на пустом месте.
 */
const Gallery = dynamic(
  () => import('./CertificateGallery').then((m) => m.CertificateGallery),
  {
    ssr: true,
    loading: () => <CertificateSkeleton />,
  },
)

function CertificateSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden p-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-36 w-52 shrink-0 animate-pulse rounded-xl bg-paper-2" />
      ))}
    </div>
  )
}

export function CertificateGalleryLazy({ items }: { items: Certificate[] }) {
  return <Gallery items={items} />
}
