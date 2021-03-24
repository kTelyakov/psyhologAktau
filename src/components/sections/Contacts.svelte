<script>
import CardWrapper from '../CardWrapper.svelte'
import Heading from '../Heading.svelte'
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
        <ul>
          <li class="contactsSection__listItem">Адрес: Республика Казахстан, Мангистауская Область, г.Актау, 28А мкр., Бизнес центр "Тианде", рядом с "Казком банк"</li>
          <li class="contactsSection__listItem">ИП Карайчикова Г.Б.
            Свидетельство о государственной регистрации ИП № 0029064
          </li>
          <li class="contactsSection__listItem">Телефон: <a href="tel:+77025253857">+7 702 525 38 57</a>
          </li>
          <li class="contactsSection__listItem">E-mail: psyholog.aktau@gmail.com</li>
        </ul>
      </div>
      <div class="contactsSection__map">
        <img src="map.png" alt="Карта">
      </div>
    </div>
  </CardWrapper>
</div>


<style lang="scss">
@import '../../scss/mixins.scss';
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
  }
  &__listItem {
    border-bottom: 1px solid #eee;
    padding: 5px;
  }
}  
</style>