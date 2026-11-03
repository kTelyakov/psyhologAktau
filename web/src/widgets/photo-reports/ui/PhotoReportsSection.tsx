import Image from 'next/image'

import { Rise } from '@/shared/ui'
import { cn } from '@/shared/lib'

const PHOTOS = [
  'report1.jpeg', 'report2.jpeg', 'report3.jpeg', 'report4.jpeg',
  'report5.jpeg', 'report6.jpeg', 'report7.jpeg', 'report8.jpeg',
]

export function PhotoReportsSection() {
  return (
    <section className="border-y border-rule bg-white py-20">
      <div className="mx-auto max-w-6xl px-5">
        <Rise>
          <p className="text-center text-[13px] font-bold uppercase tracking-[0.18em] text-sage-700">
            Фотоотчёты
          </p>
          <h2 className="mt-3 text-center font-display text-[clamp(1.8rem,3.5vw,2.7rem)] tracking-tight">
            Тренинги и мастер-классы
          </h2>
        </Rise>

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-3 md:grid-cols-4">
          {PHOTOS.map((p, i) => (
            <Rise
              key={p}
              delay={0.05 * i}
              className={cn(i === 0 && 'col-span-2 row-span-2', i === 5 && 'md:col-span-2')}
            >
              <a
                href={`/photoReports/${p}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative block size-full overflow-hidden rounded-2xl bg-clay-50"
              >
                <Image
                  src={`/photoReports/${p}`}
                  alt="Фото с тренинга"
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </a>
            </Rise>
          ))}
        </div>
      </div>
    </section>
  )
}
