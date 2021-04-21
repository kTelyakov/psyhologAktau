<script>
import CardWrapper from 'components/CardWrapper.svelte'
import Heading from 'components/Heading.svelte'
</script>

<div class="contactsSection">
  <CardWrapper>
    <div class="contactsSection__title">
      <Heading size="l">
        Контакты
      </Heading>
    </div>

    <div class="contactsSection__content">
      <div class="contactsSection__description">
        <ul class="contactsSection__list">
          <li class="contactsSection__listItem">Адрес: Республика Казахстан, Мангистауская Область, г.Актау, 28А мкр., Бизнес центр "Тианде", рядом с "Казком банк"</li>
          <li class="contactsSection__listItem">ИП Карайчикова Г.Б.
            Свидетельство о государственной регистрации ИП № 0029064
          </li>
          <li class="contactsSection__listItem">Телефон: <a href="tel:+77025253857">+7 702 525 38 57</a>
          </li>
          <li class="contactsSection__listItem">E-mail: psyholog.aktau@gmail.com</li>
        </ul>

        <!-- Иконки -->
        <div class="contactsSection__socials">
          <a class="contactsSection__socialsItem" href="https://www.instagram.com/psyholog_aktau/" target="_blank">
            <img src="socials/instagram.png" alt="">
          </a>
          <a class="contactsSection__socialsItem" href="https://vk.com/psyholog_aktau" target="_blank">
            <img src="socials/vk.png" alt="">
          </a>
          <a class="contactsSection__socialsItem" href="https://www.facebook.com/psiholog.aktau/" target="_blank">
            <img src="socials/fb.png" alt="">
          </a>
        </div>
      </div>
      <div class="contactsSection__map">
        <img src="map.png" alt="Карта">
      </div>
    </div>
  </CardWrapper>
</div>


<style lang="scss">
@import '../scss/mixins.scss';
.contactsSection {
  &__title {
    margin-bottom: 20px;
    width: 100%;
    text-align: center;
  }
  &__content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 20px;
    @include mobile {
      grid-template-columns: 1fr;
    }
  }
  &__map {
    display: flex;
    justify-content: center;
    align-items: center;
    & > img {
      max-width: 100%;
    }
  }
  &__list {
    margin-bottom: 20px;
  }
  &__listItem {
    border-bottom: 1px solid #eee;
    padding: 5px;
  }
  &__socials {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: row;
  }
  &__socialsItem {
    & > img {
      width: 30px;
      height: 30px;
      margin-right: 10px;
    }
  }
}
</style>
