<script>
import CardWrapper from 'components/CardWrapper.svelte'
import Heading from 'components/Heading.svelte'
import Card from 'components/Card.svelte'

const services = [
  {
    imgUrl: 'service1.png',
    title: 'Индивидуальные консультации',
    description: 'Помогут решить любую проблему',
    btnText: ''

  },
  {
    imgUrl: 'service2.png',
    title: 'Семейные консультации',
    description: 'Подойдут для семейных пар',
    btnText: ''
  },
  {
    imgUrl: 'service3.png',
    title: 'Skype консультации',
    description: 'Для дистанционной работы',
    btnText: ''
  },
  {
    imgUrl: 'service4.png',
    title: 'Корпоративные тренинги',
    description: 'Для юридических лиц',
    btnText: ''
  },
  {
    imgUrl: 'service5.png',
    title: 'Детский психолог',
    description: 'Для детей до 7 лет',
    btnText: ''
  },
  {
    imgUrl: 'service6.png',
    title: 'Подростковый психолог',
    description: 'Работа с трудными подростками',
    btnText: ''
  }
]
</script>

<CardWrapper>
  <div class="secondSection">
    <div class="secondSection__title">
      <Heading size="l">
        Предоставляемые услуги:
      </Heading>
    </div>

    <div class="secondSection__services">
      {#each services as service}
        <Card cardObj="{service}"></Card>
      {/each}
    </div>
  </div>

</CardWrapper>

<style lang="scss">
@import '../scss/mixins.scss';
.secondSection {
  &__title {
    text-align: center;
    width: 100%;
    margin-bottom: 30px;
  }
  &__services {
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
