<template lang="pug">
  a(:class="$style.link")
    i(:class="css") {{ ma }}
</template>

<script>
export default {
  props: ['fa','ma'],
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
.link
  cursor: pointer
  border-radius: 50%
  justify-content: center
  height: 36px
  width: 36px
  align-items: center
  display: inline-flex
  flex: 0 1 auto
  font-size: 16px
  margin: 6px 8px
  outline: 0
  position: relative
  vertical-align: middle
  user-select: none
  color: rgba(0,0,0,.54)
  &[disabled]
    color rgba(0,0,0,.26)
    pointer-events none

.icon
  font-size 18px
  color inherit
  align-items center
  display inline-flex
  justify-content center
  vertical-align middle
  transition: .3s cubic-bezier(.25,.8,.5,1)
  &.fa
    font-size 16px
</style>
