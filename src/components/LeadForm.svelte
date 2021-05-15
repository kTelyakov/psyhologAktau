<script>
import ModalLayout from './ModalLayout.svelte'
import BaseInput from 'components/BaseInput.svelte'
import Btn from './Btn.svelte'

function closeLeadForm () {
  show = false
}

export let show
export let header

let leadName = ''
let leadPhone = ''
</script>

{#if show}
  <ModalLayout bind:show>
    <div class="leadFormContent">
      <div class="leadFormContent__header">
        <div class="leadFormContent__headerTitle">
          { header }
        </div>
        <div class="leadFormContent__closeIcon" on:click={closeLeadForm}>
          <img src="close.svg" alt="">
        </div>
      </div>
      <div class="leadFormContent__body">
        <BaseInput bind:value={leadName} placeholder="Ваше имя"></BaseInput>
        <BaseInput bind:value={leadPhone} placeholder="Ваш телефон"></BaseInput>
        <Btn>Получить бесплатную консультацию</Btn>
      </div>
    </div>
  </ModalLayout>
{/if}

<style lang="scss">
  @import '../scss/mixins.scss';
  @import '../scss/colors.scss';
  .leadFormContent {
    background-color: white;
    margin: 0 auto;
    /*padding: 10px;*/
    position: relative;
    width: 50%;
    height: 50%;
    margin-top: 10%;
    @include mobile {
      width: 100%;
      margin-top: 0;
      padding: 0px;
      height: 100%;
    }
    &__header {
      height: 35px;
      background: $purple;
      padding: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    &__headerTitle {
      color: white;
      font-size: 20px;
      @include mobile {
        font-size: 14px;
        padding: 10px;
      }
    }
    &__closeIcon {
      width: 20px;
      height: 20px;
      overflow: hidden;
      cursor: pointer;
      & img {
        width: 20px;
        height: 20px;
      }
    }

    /* body */
    &__body {
      padding: 10px;
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
      flex-direction: column;
    }
  }
  </style>
