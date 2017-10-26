<template lang="pug">
  input(
    :class="$style.input"
    :style="styles"
    :value="value"
    :placeholder="ph"
    @input="e => $emit('input', e.target.value)")
</template>

<script>
export default {
  props: ['w','value','ph'],
  computed: {
    styles(){
      return this.w && 'flex: 1 1 ' + this.w*100 + '%'
    }
  }
}
</script>
<style lang="stylus" module>
.input
  display block
  width 100%
  height 28px
  padding .3rem .4rem
  font-size 14px
  line-height 1.25
  color #464a4c
  background-color #fff
  background-clip padding-box
  border 1px solid rgba(0,0,0,.15)
  /*border-radius 2px*/
  transition border-color ease-in-out .15s,box-shadow ease-in-out .15s
  &:not(:last-child)
    margin-right 5px
  &:focus
    color #464a4c
    background-color #fff
    border-color #5cb3fd
    outline 0
  &::placeholder
    color #aaa
</style>
