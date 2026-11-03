import { Box, Container, SimpleGrid, Stack, Text, Title } from '@mantine/core'

import { VideoCard } from '@/features/youtube-modal'

const TV_ITEMS = [
  { youtubeId: '1qlAjCqdsZw', image: 'tvSection/tv1.png', title: 'Какой должна быть молодая жена?' },
  { youtubeId: 'VhTEmjMnmfs', image: 'tvSection/tv2.png', title: 'Почему ранние браки рано распадаются?' },
  { youtubeId: 'CS2_i3bJ4WA', image: 'tvSection/tv3.png', title: 'Что важнее для девушки — карьера или семья?' },
  { youtubeId: 'oDuEmmJ-zNA', image: 'tvSection/tv4.png', title: 'Почему разводов становится больше?' },
  { youtubeId: 'wfWPLx5r9U0', image: 'tvSection/tv5.png', title: 'Ранние браки — хорошо или плохо?' },
]

export function TvSection() {
  return (
    <Box bg="white" style={{ borderBlock: '1px solid var(--mantine-color-gray-2)' }}>
      <Container size="lg" py={72}>
        <Stack gap={8} align="center" mb={48}>
          <Text tt="uppercase" fz="sm" fw={600} c="brand.6" lts="0.08em">На телевидении</Text>
          <Title order={2} ta="center">Выступления и интервью</Title>
        </Stack>

        <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 5 }} spacing="lg">
          {TV_ITEMS.map((t) => (
            <VideoCard key={t.youtubeId} {...t} />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  )
}
