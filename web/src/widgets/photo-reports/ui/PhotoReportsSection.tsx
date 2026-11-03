import { Box, Container, Stack, Text, Title } from '@mantine/core'
import Image from 'next/image'

import classes from './PhotoReportsSection.module.css'

const PHOTOS = [
  'report1.jpeg', 'report2.jpeg', 'report3.jpeg', 'report4.jpeg',
  'report5.jpeg', 'report6.jpeg', 'report7.jpeg', 'report8.jpeg',
]

export function PhotoReportsSection() {
  return (
    <Box bg="white" style={{ borderBlock: '1px solid var(--mantine-color-gray-2)' }}>
      <Container size="lg" py={72}>
        <Stack gap={8} align="center" mb={48}>
          <Text tt="uppercase" fz="sm" fw={600} c="brand.6" lts="0.08em">Фотоотчёты</Text>
          <Title order={2} ta="center">Тренинги и мастер-классы</Title>
        </Stack>

        <div className={classes.grid}>
          {PHOTOS.map((p, i) => (
            <a key={p} href={`/photoReports/${p}`} target="_blank" rel="noopener noreferrer"
               className={classes.item} data-wide={i % 5 === 0 || undefined}>
              <Image src={`/photoReports/${p}`} alt="Фото с тренинга" width={600} height={400}
                     className={classes.img} />
            </a>
          ))}
        </div>
      </Container>
    </Box>
  )
}
