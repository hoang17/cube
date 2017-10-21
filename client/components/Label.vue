<template lang="pug">
  label(:class="$style.label", :style="styles")
    slot
</template>
<script>
export default {
  props: ['w'],
  computed: {
    styles(){
      return this.w && 'flex: 1 1 ' + this.w*100 + '%'
    }
  }
}
</script>
<style lang="stylus" module>
.label
  color #363636
  display block
  font-size 11px
  font-weight 600
  margin-bottom 0.4em
  text-transform uppercase
  &:not(:last-child)
    margin-right 0
</style>
