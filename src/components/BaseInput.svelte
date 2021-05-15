<script>
export let placeholder
export let value

function inputHandler (e) {
  value = e.target.value
}
</script>

<input type='text' on:input={inputHandler} placeholder="{placeholder}" class='baseInput' />

<style lang='scss'>
.baseInput {
  border-radius: 6px;
  outline: none;
  border: 1px solid;
  border-color: #c4c4c4;
  height: 20px;
  width: calc(100% - 20px);
  padding: 10px;
  margin-bottom: 10px;
}
</style>

