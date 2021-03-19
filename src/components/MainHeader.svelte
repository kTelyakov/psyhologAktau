<div class="mainHeader">

  <!-- Логотип -->
  <div class="mainHeader__logo">
    <img src="/logo.png" alt="">
  </div>

  <div class="mainHeader__centerBlock">
    <h1 class="mainHeader__title">
      Психолог в Актау
    </h1>
    <p class="mainHeader__titleDescription">Центр практической психологии Ару-Ана</p>
  </div>

  <div class="mainHeader__rightBlock">
    <a class="mainHeader__phone" href="tel:+77025253857">+77025253857</a>
    <Btn class="mainHeader__btn">Горячая линия</Btn>
  </div>

</div>


<style lang="scss">
@import 'src/scss/mixins.scss';
.mainHeader {
  min-height: 130px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  @include mobile {
    flex-direction: column;
  }

  /* Центральный блок */
  &__centerBlock {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  &__title {
    font-size: 25px;
    color: #4251CA;
    line-height: 28px;
    @include mobile {
      text-align: center;
      margin-bottom: 10px;
    }
  }
  &__titleDescription {
    font-size: 19px;
    line-height: 26px;
    @include mobile {
      text-align: center;
      margin-bottom: 20px;
    }
  }

  &__logo {
    display: flex;
    flex-direction: column;
  }
  /* Правый блок */
  &__rightBlock {
    display: flex;
    flex-direction: column;
    @include mobile {
      display: none;
    }
  }
  &__phone {
    text-decoration: none;
    margin-bottom: 10px;
    font-size: 16px;
    text-align: center;
  }
  &__btn {

  }

}
</style>
<script>
import Btn from './Btn.svelte'
</script>
