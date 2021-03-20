<script>
import { createEventDispatcher } from 'svelte'

export let title = 'default'
export let open = false


const dispatch = createEventDispatcher()
function expandHandler () {
  dispatch('toggle')
}

</script>

<div class="expand">
  <div class="expand__header {open ? '_open' : ''}" on:click={expandHandler}>
    <div class="expand__title">
      <span>{title}</span>
      <div class="expand__arrow {open ? '_up' : ''}">
        <img src="arrow.svg" alt="">
      </div>
    </div>
  </div>

  <div class="expand__content {open ? '_open' : ''}">
    <slot></slot>
  </div>
</div>

<style lang="scss">
.expand {
  display: flex;
  flex-direction: column;
  position: relative;
  &__header {
    box-shadow: 0 1px 3px rgb(0 0 0 / 16%), 0 1px 3px rgb(0 0 0 / 12%);
    border-radius: 6px;
    padding: 10px;
    cursor: pointer;
    background: white;
    z-index: 1;
    &._open {
      z-index: 3;
    }
  }
  &__title {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__arrow {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    transform: rotate(90deg);
    transition: transform .3s;
    &._up {
      transform: rotate(-90deg);
    }
    & > img {
      width: 15px;
      height: 15px;
    }
  }
  &__content {
    border-radius: 6px;
    background: white;
    display: none;
    padding: 10px;
    box-shadow: 0 1px 3px rgb(0 0 0 / 16%), 0 1px 3px rgb(0 0 0 / 12%);
    transition: display .3s;
    &._open {
      display: block;
      position: absolute;
      top: 95%;
      z-index: 2;
    }
  }
}
</style>
