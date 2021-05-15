<script>
import ModalLayout from './ModalLayout.svelte'
import Btn from './Btn.svelte'
export let show
export let videoId
export let description = ''
</script>

{#if show}
  <ModalLayout bind:show>
    <div class="modalYoutube">
      <iframe class="modalYoutube__frame" title="" src="https://www.youtube.com/embed/{videoId}?rel=0&wmode=transparent&autoplay=true&iv_load_policy=3" allowfullscreen frameborder="0"></iframe>
      <div class="modalYoutube__description">
        {description}
        <div class="modalYoutube__close">
          <Btn>Закрыть</Btn>
        </div>
      </div>
    </div>
  </ModalLayout>
{/if}

<style lang="scss">
@import '../scss/mixins.scss';
.modalYoutube {
  background-color: white;
  margin: 0 auto;
  padding: 10px;
  position: relative;
  width: 50%;
  height: 50%;
  margin-top: 10%;
  @include mobile {
    width: 100%;
    margin-top: 0;
    padding: 5px;
    height: 100%;
  }
  &__frame {
    display: block;
    width: 100%;
    height: 100%;
    @include mobile {
      height: 80%;
    }
  }
  &__description {
    display: none;
    padding: 10px;
    height: 20%;
    overflow-y: scroll;
    background: white;
    font-weight: bold;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    @include mobile {
      display: flex;
    }
  }
  &__close {
    margin-top: 10px;
  }
}
</style>
