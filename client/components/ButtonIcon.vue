<template lang="pug">
  Button(:class="[$style.button]")
    i(:class="css") {{ ma }}
</template>

<script>
import Button from './Button'
export default {
  props: ['fa','ma'],
  components: {
    Button
  },
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
.icon
  font-size 16px
  color: inherit
  align-items: center
  display: inline-flex
  justify-content: center
  vertical-align: middle
  transition: .3s cubic-bezier(.25,.8,.5,1)
  &.fa
    font-size 16px
</style>
