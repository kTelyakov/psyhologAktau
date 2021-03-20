<script>
import Heading from '../Heading.svelte'
import Card from '../Card.svelte'

const tvItems = [
  {
    imgUrl: 'tvSection/tv1.png',
    title: 'Какой должна быть молодая жена?'
  },
  {
    imgUrl: 'tvSection/tv2.png',
    title: 'Почему ранние браки рано распадаются?'
  },
  {
    imgUrl: 'tvSection/tv3.png',
    title: 'Что важнее для девушки - карьера или семья?'
  },
  {
    imgUrl: 'tvSection/tv4.png',
    title: 'Почему разводов становится больше?'
  },
  {
    imgUrl: 'tvSection/tv5.png',
    title: 'Ранние браки - хорошо или плохо?'
  },
]
</script>

<div class="tvSection">
  <div class="tvSection__title">
    <Heading size="l">Мы на ТВ</Heading>
  </div>
  <div class="tvSection__content">
    {#each tvItems as item}
      <Card cardObj="{item}"></Card>
    {/each}
  </div>
</div>

<style lang="scss">
@import '../../scss/mixins.scss';
.tvSection {
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
