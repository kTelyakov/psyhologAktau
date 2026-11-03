'use client'

import { AspectRatio, Card, Modal, Overlay, Text } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconPlayerPlayFilled } from '@tabler/icons-react'
import Image from 'next/image'

import classes from './VideoCard.module.css'

interface Props {
  youtubeId: string
  title: string
  image: string
}

export function VideoCard({ youtubeId, title, image }: Props) {
  const [opened, { open, close }] = useDisclosure(false)

  return (
    <>
      <Card
        className={classes.card}
        padding={0}
        shadow="sm"
        onClick={open}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && open()}
        aria-label={`Смотреть: ${title}`}
      >
        <div className={classes.media}>
          <Image src={`/${image}`} alt={title} fill sizes="320px" className={classes.image} />
          <Overlay color="#202656" backgroundOpacity={0.25} />
          <div className={classes.play}>
            <IconPlayerPlayFilled size={22} />
          </div>
        </div>
        <Text fw={600} fz="sm" p="md" lineClamp={2}>
          {title}
        </Text>
      </Card>

      <Modal opened={opened} onClose={close} size="xl" centered title={title} radius="lg">
        <AspectRatio ratio={16 / 9}>
          {opened && (
            <iframe
              src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
              allowFullScreen
              style={{ border: 0, borderRadius: 12 }}
            />
          )}
        </AspectRatio>
      </Modal>
    </>
  )
}
