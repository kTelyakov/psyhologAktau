import { VideoCard } from '@/features/youtube-modal'
import { Rise } from '@/shared/ui'

const TV_ITEMS = [
  { youtubeId: '1qlAjCqdsZw', image: 'tvSection/tv1.png', title: 'Какой должна быть молодая жена?' },
  { youtubeId: 'VhTEmjMnmfs', image: 'tvSection/tv2.png', title: 'Почему ранние браки рано распадаются?' },
  { youtubeId: 'CS2_i3bJ4WA', image: 'tvSection/tv3.png', title: 'Что важнее для девушки — карьера или семья?' },
  { youtubeId: 'oDuEmmJ-zNA', image: 'tvSection/tv4.png', title: 'Почему разводов становится больше?' },
  { youtubeId: 'wfWPLx5r9U0', image: 'tvSection/tv5.png', title: 'Ранние браки — хорошо или плохо?' },
]

export function TvSection() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <Rise>
        <p className="text-center text-[13px] font-bold uppercase tracking-[0.18em] text-sage-700">
          На телевидении
        </p>
        <h2 className="mt-3 text-center font-display text-[clamp(1.8rem,3.5vw,2.7rem)] tracking-tight">
          Выступления и интервью
        </h2>
      </Rise>

      <div className="mt-12 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        {TV_ITEMS.map((t, i) => (
          <Rise key={t.youtubeId} delay={0.06 * i}>
            <VideoCard {...t} />
          </Rise>
        ))}
      </div>
    </section>
  )
}
