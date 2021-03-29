<script>
import ModalLayout from './ModalLayout.svelte'
import ClickOutside from 'ClickOutside'
import { createEventDispatcher } from 'svelte'

const dispatch = createEventDispatcher()

function forwardEvent() {
  console.log('forwardEvent ')
  dispatch('hide')
}

function clickOut () {
  console.log('clickOut clickOut')
}

export let show
export let videoId
export let autoplay
</script>

{#if show}
  <ModalLayout>
    <div class="modalYoutube">
      <iframe src="https://www.youtube.com/embed/${videoId}?rel=0&wmode=transparent&autoplay=${autoplay}&iv_load_policy=3" allowfullscreen frameborder="0"></iframe>
    </div>
  </ModalLayout>
{/if}

<style lang="scss">
.modalYoutube {
  background-color: white;
  margin: 0 auto;
  padding: 20px;
  position: relative;
  width: 50%;
  height: 50%;
  margin-top: 10%;
  & > iframe {
    width: 100%;
    height: 100%;
  }
}
</style>
