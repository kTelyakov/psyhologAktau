<section class="firstBlock">
  <div class="firstBlock__title">
    <Heading size="l">
      {@html ctaText }
    </Heading>
  </div>
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
    <Btn on:click={showModalForm}>Консультация психолога</Btn>
  </div>

  <LeadForm bind:show={showModal} on:closeModal={closeModalHandler} header="Заказать бесплатную консультацию"></LeadForm>

</section>

<script>
import Btn from 'components/Btn.svelte'
import Heading from 'components/Heading.svelte'
import LeadForm from 'components/LeadForm.svelte'
const list = [
  'Более 20 лет опыта',
  'Полная анонимность',
  'Гарантия результата',
  'Помогли более 10 000 человек в СНГ'
]
let showModal = false

export let ctaText = 'Помощь в решении<br> психологических проблем<br> любой сложности'
function showModalForm () {
  showModal = true
}

function closeModalHandler ({ detail }) {
  showModal = detail
}
</script>

<style lang="scss">
@import '../scss/colors.scss';
@import '../scss/mixins.scss';
.firstBlock {
  padding: 30px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  position: relative;
  &__title {
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
      width: 30px;
      height: 30px;
      margin-right: 5px;
    }
  }
  &__photo {
    position: absolute;
    right: 0;
    bottom: 0;
    max-width: 40%;
    @include tablet {
      display: none;
    }
    @include mobile {
      display: none;
    }
  }
}
</style>
