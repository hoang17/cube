<template lang="pug">
  select(
    :class="$style.select"
    :style="styles"
    :value="value"
    @input="e => $emit('input', e.target.value)")
    slot
</template>

<script>
export default {
  props: ['w','value'],
  computed: {
    styles(){
      return this.w && 'flex: 1 1 ' + this.w * 100 + '%'
    }
  }
}
</script>

<style lang="stylus" module>
.select
  display: block
  width: 100%
  height: 28px
  padding: .3rem .4rem
  font-size: 13px
  line-height: 1.25
  color: #464a4c
  background-clip: padding-box
  border: 1px solid rgba(0,0,0,.15)
  border-radius: 2px
  background-color: #fff
  padding-right: 1.0rem
  appearance: none
  transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s
  &:focus
    color: #464a4c
    background-color: #fff
    border-color: #5cb3fd
    outline: 0
</style>
