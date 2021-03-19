<section class="firstBlock">
  <h2 class="firstBlock__title">
    Помощь в решении<br> психологических проблем<br> любой сложности
  </h2>
  <ul class="firstBlock__list">
    {#each list as item}
    <li class="firstBlock__listItem">
      <img src="plus.svg" alt="">
      {item}
    </li>
    {/each}
  </ul>
  <img class="firstBlock__photo" src="mom.png" alt="Карайчикова Гульсара">
  <div class="firstBlock__btn">
    <Btn>Бесплатная консультация психолога</Btn>
  </div>
</section>

<script>
import Btn from '../../components/Btn.svelte'
const list = [
  'Более 20 лет опыта',
  'Полная анонимность',
  'Гарантия результата',
  'Помогли более 10 000 человек в СНГ'
]
</script>

<style lang="scss">
@import 'src/scss/colors.scss';
.firstBlock {
  padding: 30px 30px 0px 30px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  position: relative;
  &__title {
    font-size: 35px;
    line-height: 1;
    color: $purple;
    margin-bottom: 20px;
  }
  &__list {
    margin-bottom: 20px;
  }
  &__listItem {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;
    color: $purple;
    margin-bottom: 10px;
    & > img {
      width: 36px;
      height: 36px;
      margin-right: 5px;
    }
  }
  &__photo {
    position: absolute;
    right: 0;
    bottom: 0;
    max-width: 40%;
  }
}
</style>
