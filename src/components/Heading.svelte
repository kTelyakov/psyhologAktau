<script lang="ts">
  export let size: 'xl' | 'l' | 'm' | 's' = 'xl'
</script>

{#if size === 'xl'}
  <h1 class="heading--xl">
    <slot></slot>
  </h1>
{/if}
{#if size === 'l'}
  <h2 class="heading--l">
    <slot></slot>
  </h2>
{/if}
{#if size === 'm'}
  <h2 class="heading--m">
    <slot></slot>
  </h2>
{/if}


<style lang="scss">
@import '../scss/colors.scss';
.heading {
  &--xl {

  }
  &--l {
    font-size: 30px;
    color: $purple;
    line-height: 1.1;
  }
  &--m {
    font-size: 20px;
    color: $purple;
    line-height: 1.1;
  }
}
</style>
