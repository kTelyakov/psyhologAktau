<script>
import { createEventDispatcher } from 'svelte'
import Btn from './Btn.svelte'

const dispatch = createEventDispatcher()

function clickHandler () {
  dispatch('click')
}

function btnClickHandler () {
  dispatch('clickOnBtn')
}

export let cardObj = {}
export let youtubeCard = false
</script>


  <div class="card {youtubeCard ? 'card--youtube' : ''}" on:click={clickHandler}>
    <div class="card__media">
      <img src="{cardObj.imgUrl}" alt="">
    </div>
    <div class="card__titleBlock">
      <div class="card__title">{ cardObj.title }</div>
      {#if cardObj.description}
        <div class="card__description">{ cardObj.description }</div>
      {/if}

    </div>
    {#if cardObj.btnText}
      <div class="card__actions">
        <Btn on:click={btnClickHandler}>{ cardObj.btnText }</Btn>
      </div>
    {/if}
  </div>


<style lang="scss">
@import '../scss/colors.scss';
@import '../scss/mixins.scss';

.card {
  border-radius: 6px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
  &--youtube {
    cursor: pointer;
  }
  &__media {
    overflow: hidden;
    & > img {
      width: 100%;
      border-top-left-radius: 6px;
      border-top-right-radius: 6px;
    }
  }
  &__titleBlock {
    padding: 15px;
  }
  &__title {
    color: $purple;
    font-size: 19px;
    line-height: 1.1;
    margin-bottom: 10px;
  }
  &__description {
    color: $purple;
    font-size: 14px;
    opacity: 0.6;
    line-height: 1.1;
  }
  &__actions {
    padding: 15px;
  }
}
</style>
