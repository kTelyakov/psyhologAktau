<script></script>

<div class="carousel">
  <slot></slot>
</div>

<style lang="scss">
.carousel {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  width: auto;
  overflow-x: scroll;
  -moz-box-shadow:    inset 0 0 10px #000000;
  -webkit-box-shadow: inset 0 0 10px #000000;
  box-shadow:         inset 0 0 10px #000000;
  padding: 10px;
  border-radius: 6px;
}
</style>
