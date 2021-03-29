<script>
import Heading from '../Heading.svelte'
import Card from '../Card.svelte'

const testimonials = [
  {
    imgUrl: 'testimonials/testimonial1.png',
    title: 'Отзыв Роза'
  },
  {
    imgUrl: 'testimonials/testimonial2.png',
    title: 'Отзыв Райхан С.'
  },
  {
    imgUrl: 'testimonials/testimonial3.png',
    title: 'Отзыв Турсынгуль'
  },
  {
    imgUrl: 'testimonials/testimonial4.png',
    title: 'Отзыв Гульсым'
  },
  {
    imgUrl: 'testimonials/testimonial5.png',
    title: 'Отзыв Турсынай'
  },
  {
    imgUrl: 'testimonials/testimonial6.png',
    title: 'Отзыв Гульмира А.'
  },
  {
    imgUrl: 'testimonials/testimonial7.png',
    title: 'Отзыв Жумагуль А.'
  },
  {
    imgUrl: 'testimonials/testimonial8.png',
    title: 'Отзыв Турсынгуль'
  },
  {
    imgUrl: 'testimonials/testimonial9.png',
    title: 'Отзыв Гульнара Д.'
  },
  {
    imgUrl: 'testimonials/testimonial10.png',
    title: 'Вручение сертификата Жумагуль А.'
  },
  {
    imgUrl: 'testimonials/testimonial11.png',
    title: 'Отзыв Жумагуль А.'
  },
  {
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
      <Card cardObj="{testimonial}"></Card>
    {/each}
  </div>
</div>


<style lang="scss">
@import '../../scss/mixins.scss';
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
