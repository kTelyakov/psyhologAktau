<button class="btn">
  <slot></slot>
</button>

<style lang="scss">
.btn {
  display: inline-block;
  padding: 6px 12px;
  margin-bottom: 0;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  -ms-touch-action: manipulation;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  background-image: none;
  border: 1px solid transparent;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.1;
  text-transform: uppercase;
  letter-spacing: inherit;
  color: rgba(255,255,255,.87);
  outline: 0;
  outline-offset: 0;
  border: 0;
  border-radius: 2px;
  transition: all .15s ease-in-out;
  -o-transition: all .15s ease-in-out;
  -moz-transition: all .15s ease-in-out;
  -webkit-transition: all .15s ease-in-out;
  min-width: 88px;
  padding: 10px 14px;
  box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
  background-color: #C10E82;
  color: white;
  &:active {
    box-shadow: 0 1px 3px 0 rgb(0 0 0 / 12%), 0 1px 2px 0 rgb(0 0 0 / 24%);
  }
}
</style>
