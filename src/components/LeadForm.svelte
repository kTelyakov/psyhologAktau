<script>
  import ModalLayout from './ModalLayout.svelte'
  import Btn from './Btn.svelte'
  
  export let show
  export let header
  </script>
  
  {#if show}
    <ModalLayout show>
      <div class="leadFormContent">
        <div class="leadFormContent__header">
          <div class="leadFormContent__headerTitle">
            header : { header }    
          </div>
        </div>
        <h2>Заявка</h2>
        <input type="text" placeholder="имя">
        <input type="text" placeholder="телефон">
      </div>
    </ModalLayout>
  {/if}
  
  <style lang="scss">
  @import '../scss/mixins.scss';
  @import '../scss/colors.scss';
  .leadFormContent {
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
      padding: 0px;
      height: 100%;
    }
    &__header {
      height: 64px;
      background: $purple;
      @include mobile {
        padding: 20px;
      }
    }
    &__headerTitle {
      font-size: 20px;
      color: white;
    }
  }  
  </style>
  