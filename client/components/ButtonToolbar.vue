<template lang="pug">
  button(:class="[$style.button, right && $style.right]")
    i(:class="css") {{ ma }}
</template>

<script>
export default {
  props: ['fa','ma', 'right'],
  computed: {
    css() {
      return [
        this.$style.icon,
        this.fa && `fa fa-${this.fa}`,
        this.ma && 'material-icons',
      ]
    }
  }
}
</script>

<style lang="stylus" module>
.button
  cursor: pointer
  background: transparent
  box-shadow: none
  border-radius: 50%
  justify-content: center
  height: 36px
  width: 36px
  min-width: 0
  align-items: center
  display: inline-flex
  flex: 0 1 auto
  font-size: 16px
  font-weight: 500
  margin: 6px 8px
  outline: 0
  position: relative
  vertical-align: middle
  user-select: none
  border-style: none
  color: rgba(0,0,0,.54)
  &[disabled]
    color rgba(0,0,0,.26)
    pointer-events none
  &.right
    float right

.icon
  font-size 18px
  color: inherit
  align-items: center
  display: inline-flex
  justify-content: center
  vertical-align: middle
  transition: .3s cubic-bezier(.25,.8,.5,1)
  &.fa
    font-size 16px
</style>
