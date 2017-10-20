<template lang="pug">
  button(:class="$style.button")
    slot
</template>
<script>
export default {
}
</script>
<style lang="stylus" module>
.button
  cursor: pointer
  background: transparent
  justify-content: center
  height: 28px
  min-width: 0
  align-items: center
  display: inline-flex
  flex: 1 1 auto
  font-size: 14px
  outline: 0
  background-color: white;
  border-radius: 2px
  border: 1px solid rgba(0,0,0,.15);
  position: relative
  vertical-align: middle
  user-select: none
  font-weight: 500
  margin-right: -1px
  color: rgba(0,0,0,.64)
  &:not(:first-child):not(:last-child) {
    border-radius: 0
  }
  &:first-child:not(:last-child) {
    border-bottom-right-radius: 0
    border-top-right-radius: 0
  }
  &:last-child:not(:first-child) {
    border-bottom-left-radius: 0
    border-top-left-radius: 0
  }
  &:hover{
    z-index: 2
    border-color: #b5b5b5;
    color: #363636;
    background-color: #e6e6e6;
  }
</style>
