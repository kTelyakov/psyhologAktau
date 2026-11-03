import { Container, SimpleGrid, Stack, Text, Title } from '@mantine/core'

import { VideoCard } from '@/features/youtube-modal'

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
  { youtubeId: '3s90XzEfMO8', image: 'testimonials/testimonial10.png', title: 'Вручение сертификата Жумагуль А.' },
  { youtubeId: 'TeqHkZBRxJA', image: 'testimonials/testimonial11.png', title: 'Отзыв Жумагуль А.' },
  { youtubeId: 'm-huqa7TFvU', image: 'testimonials/testimonial12.png', title: 'Отзыв Алексей (Москва)' },
]

export function TestimonialsSection() {
  return (
    <Container size="lg" py={72} id="testimonials">
      <Stack gap={8} align="center" mb={48}>
        <Text tt="uppercase" fz="sm" fw={600} c="brand.6" lts="0.08em">Отзывы</Text>
        <Title order={2} ta="center">Что говорят те, кто уже приходил</Title>
        <Text c="dimmed" ta="center" maw={620}>
          Видеоотзывы клиентов — без монтажа и сценария.
        </Text>
      </Stack>

      <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 4 }} spacing="lg">
        {TESTIMONIALS.map((t) => (
          <VideoCard key={t.youtubeId + t.image} {...t} />
        ))}
      </SimpleGrid>
    </Container>
  )
}
