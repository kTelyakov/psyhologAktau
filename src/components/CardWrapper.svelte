<script>
export let noShadow = false
</script>

<div class="cardWrapper { noShadow ? '_noShadow' : '' }">
  <slot></slot>
</div>

<style lang="scss">
.cardWrapper {
  box-shadow: 0 14px 28px rgb(0 0 0 / 25%), 0 10px 10px rgb(0 0 0 / 22%);
  padding: 30px;
  border-radius: 6px;
  &._noShadow {
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
   }
}
</style>
