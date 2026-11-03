import { VideoCard } from '@/features/youtube-modal'
import { Rise, Marquee } from '@/shared/ui'

const TESTIMONIALS = [
  { youtubeId: 'JoOsmFxWuaU', image: 'testimonials/testimonial1.png', title: 'Отзыв Роза' },
  { youtubeId: 'fxSZsztAV8o', image: 'testimonials/testimonial2.png', title: 'Отзыв Райхан С.' },
  { youtubeId: 'b8T3rr9SOas', image: 'testimonials/testimonial3.png', title: 'Отзыв Турсынгуль' },
  { youtubeId: '_bltb7YlBV8', image: 'testimonials/testimonial4.png', title: 'Отзыв Гульсым' },
  { youtubeId: 'meHFqhcmzAY', image: 'testimonials/testimonial5.png', title: 'Отзыв Турсынай' },
  { youtubeId: 'vXIdDgie1RE', image: 'testimonials/testimonial6.png', title: 'Отзыв Гульмира А.' },
  { youtubeId: '4mOxeskUQi8', image: 'testimonials/testimonial7.png', title: 'Отзыв Жумагуль А.' },
  { youtubeId: 'KKk93IUK1QM', image: 'testimonials/testimonial8.png', title: 'Отзыв Турсынгуль' },
  { youtubeId: 'ASNbRbnl0jM', image: 'testimonials/testimonial9.png', title: 'Отзыв Гульнара Д.' },
  { youtubeId: '3s90XzEfMO8', image: 'testimonials/testimonial10.png', title: 'Вручение сертификата' },
  { youtubeId: 'TeqHkZBRxJA', image: 'testimonials/testimonial11.png', title: 'Отзыв Жумагуль А.' },
  { youtubeId: 'm-huqa7TFvU', image: 'testimonials/testimonial12.png', title: 'Отзыв Алексей (Москва)' },
]

const half = Math.ceil(TESTIMONIALS.length / 2)

export function TestimonialsSection() {
  return (
    <section id="testimonials" className="overflow-hidden py-20">
      <Rise>
        <p className="text-center text-[13px] font-bold uppercase tracking-[0.18em] text-sage-700">
          Отзывы
        </p>
        <h2 className="mt-3 text-center font-display text-[clamp(1.8rem,3.5vw,2.7rem)] tracking-tight">
          Что говорят те, кто уже приходил
        </h2>
        <p className="mx-auto mt-4 max-w-xl px-5 text-center leading-relaxed text-ink-soft">
          Видеоотзывы клиентов — без монтажа и сценария.
        </p>
      </Rise>

      <div className="relative mt-12">
        <Marquee pauseOnHover className="[--duration:58s]">
          {TESTIMONIALS.slice(0, half).map((t) => (
            <div key={t.youtubeId + t.image} className="w-64 shrink-0">
              <VideoCard {...t} />
            </div>
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="mt-4 [--duration:58s]">
          {TESTIMONIALS.slice(half).map((t) => (
            <div key={t.youtubeId + t.image} className="w-64 shrink-0">
              <VideoCard {...t} />
            </div>
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-paper to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-paper to-transparent" />
      </div>
    </section>
  )
}
