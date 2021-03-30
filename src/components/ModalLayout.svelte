<script>
import { createEventDispatcher } from 'svelte'
const dispatch = createEventDispatcher()

function clickHandler () {
  dispatch('closeModal')
}
</script>

<div class="modalLayout" on:click={clickHandler} >
  <slot></slot>
</div>

<style lang="scss">
.modalLayout {
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.6);
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 20;
}
</style>
