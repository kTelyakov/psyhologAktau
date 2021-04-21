<script>
import Heading from 'components/Heading.svelte'
import CardYoutube from 'components/CardYoutube.svelte'

const testimonials = [
  {
    youtubeId: 'JoOsmFxWuaU',
    imgUrl: 'testimonials/testimonial1.png',
    title: 'Отзыв Роза'
  },
  {
    youtubeId: 'fxSZsztAV8o',
    imgUrl: 'testimonials/testimonial2.png',
    title: 'Отзыв Райхан С.'
  },
  {
    youtubeId: 'b8T3rr9SOas',
    imgUrl: 'testimonials/testimonial3.png',
    title: 'Отзыв Турсынгуль'
  },
  {
    youtubeId: '_bltb7YlBV8',
    imgUrl: 'testimonials/testimonial4.png',
    title: 'Отзыв Гульсым'
  },
  {
    youtubeId: 'meHFqhcmzAY',
    imgUrl: 'testimonials/testimonial5.png',
    title: 'Отзыв Турсынай'
  },
  {
    youtubeId: 'vXIdDgie1RE',
    imgUrl: 'testimonials/testimonial6.png',
    title: 'Отзыв Гульмира А.'
  },
  {
    youtubeId: '4mOxeskUQi8',
    imgUrl: 'testimonials/testimonial7.png',
    title: 'Отзыв Жумагуль А.'
  },
  {
    youtubeId: 'KKk93IUK1QM',
    imgUrl: 'testimonials/testimonial8.png',
    title: 'Отзыв Турсынгуль'
  },
  {
    youtubeId: 'ASNbRbnl0jM',
    imgUrl: 'testimonials/testimonial9.png',
    title: 'Отзыв Гульнара Д.'
  },
  {
    youtubeId: '3s90XzEfMO8',
    imgUrl: 'testimonials/testimonial10.png',
    title: 'Вручение сертификата Жумагуль А.'
  },
  {
    youtubeId: 'TeqHkZBRxJA',
    imgUrl: 'testimonials/testimonial11.png',
    title: 'Отзыв Жумагуль А.'
  },
  {
    youtubeId: 'm-huqa7TFvU',
    imgUrl: 'testimonials/testimonial12.png',
    title: 'Отзыв Алексей (Москва)'
  },
]
</script>

<div class="testimonials">
  <div class="testimonials__title">
    <Heading size="l">
      Отзывы
    </Heading>
  </div>
  <div class="testimonials__content">
    {#each testimonials as testimonial}
      <CardYoutube cardObj="{testimonial}" youtubeId={testimonial.youtubeId}></CardYoutube>
    {/each}
  </div>
</div>


<style lang="scss">
@import '../scss/mixins.scss';
.testimonials {
  &__title {
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
  }
  &__content {
    padding: 30px;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    @include tablet {
      grid-template-columns: 1fr 1fr;
    }
    @include mobile {
      grid-template-columns: 1fr;
    }
  }
}
</style>
