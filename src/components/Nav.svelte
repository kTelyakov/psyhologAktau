<nav class="menu">

  <ul class="menu__links">
    {#each links as link}
      <li class="menu__link">{ link.name }</li>
    {/each}
  </ul>
</nav>


<script lang="ts">
const links = [
  { name: 'Главная' },
  { name: 'Услуги' },
  { name: 'Тренинги' },
  { name: 'Статьи' },
  { name: 'Контакты' }
]
</script>

<style lang="scss">
@import 'src/scss/mixins.scss';
@import 'src/scss/colors.scss';
.menu {
  width: 100%;
  height: 64px;
  background: $purple;
  display: flex;
  align-items: center;
  &__links {
    display: flex;
    width: 100%;
    justify-content: space-around;
    @include mobile {
      display: none;
    }
  }
  &__link {
    cursor: pointer;
    color: white;
    font-size: 16px;
    padding: 10px;
    &:hover {
      color: darken(white, 15%);
    }
  }
}
</style>
