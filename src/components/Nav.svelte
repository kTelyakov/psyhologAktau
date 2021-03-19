<nav class="menu">
  <svg on:click={hamburgerClickHandler} class="menu__hamburger" id="light" enable-background="new 0 0 24 24" height="512" viewBox="0 0 24 24" width="512" xmlns="http://www.w3.org/2000/svg"><g><path fill="white" d="m21.5 24h-19c-1.379 0-2.5-1.122-2.5-2.5v-19c0-1.378 1.121-2.5 2.5-2.5h19c1.379 0 2.5 1.122 2.5 2.5v19c0 1.378-1.121 2.5-2.5 2.5zm-19-23c-.827 0-1.5.673-1.5 1.5v19c0 .827.673 1.5 1.5 1.5h19c.827 0 1.5-.673 1.5-1.5v-19c0-.827-.673-1.5-1.5-1.5z"/></g><g><path d="m16.5 8h-9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h9c.276 0 .5.224.5.5s-.224.5-.5.5z"/></g><g><path d="m16.5 12.5h-9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h9c.276 0 .5.224.5.5s-.224.5-.5.5z"/></g><g><path d="m16.5 17h-9c-.276 0-.5-.224-.5-.5s.224-.5.5-.5h9c.276 0 .5.224.5.5s-.224.5-.5.5z"/></g></svg>
    <ul class="menu__links { hamburgerOpen ? '_mobile' : '' }">
      {#each links as link (link.href)}
        <li class="menu__link">{ link.name }</li>
      {/each}
    </ul>
</nav>


<script lang="ts">
const links = [
  { name: 'Главная', href: '/1' },
  { name: 'Услуги', href: '/2' },
  { name: 'Тренинги', href: '/3' },
  { name: 'Статьи', href: '/4' },
  { name: 'Контакты', href: '/5' }
]

let hamburgerOpen = false

function hamburgerClickHandler () {
  hamburgerOpen = !hamburgerOpen
}
</script>

<style lang="scss">
@import 'src/scss/mixins.scss';
@import 'src/scss/colors.scss';
.menu {
  height: 64px;
  background: $purple;
  border-radius: 6px;
  display: flex;
  align-items: center;
  position: relative;
  @include mobile {
    padding-left: 10px;
  }
  &__hamburger {
    width: 30px;
    height: 30px;
    fill: white;
    color: white;
    display: none;
    @include mobile {
      display: block;
    }
  }
  &__links {
    display: flex;
    width: 100%;
    justify-content: space-around;
    transition: display .3s;
    @include mobile {
      display: none;
    }
    &._mobile {
      background: $purple;
      display: flex;
      position: absolute;
      flex-direction: column;
      top: 100%;
      left: 0;
      border-top: 1px solid white;
      z-index: 10;
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
