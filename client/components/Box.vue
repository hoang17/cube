<template lang="pug">
  div(:class="$style.box", :style="'flex: 1 1 ' + flexbase")
    slot
</template>
<script>
export default {
  props: ['w'],
  computed: {
    flexbase(){
      return this.w ? this.w * 100 + '%' : 'auto'
    }
  }
}
</script>
<style lang="stylus" module>
.box
  &:not(:last-child)
    margin-right: 3px
</style>
