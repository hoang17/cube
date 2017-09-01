<template lang="pug">
  .cube.propbar.elevation-0
    .action
      v-btn(primary, dark, @click="done") Done
      v-btn(light, @click="remove") Remove
    .list
      component(:cube="cube", :is="cube.type + '-pane'")
</template>

<script>
export default {
  props: ['cube'],
  methods: {
    async done(){
      this.$emit('done')
    },
    async remove(){
      this.$emit('remove')
    }
  },
}
</script>

<style lang="stylus">
.propbar
  position absolute
  z-index 3
  top 0
  right 0
  height 100%
  width 28em
  pointer-events auto
  will-change transform
  user-select none
  transition .3s cubic-bezier(.25,.8,.25,1)
  border-left 1px solid rgba(0,0,0,0.12)

  .input-group__details
    min-height auto

  .input-group
    padding 16px 0 2px 0
    label
      font-size 13px !important
      text-transform lowercase
  .input-group--text-field
    input
      font-size 13px !important
  .input-group--text-field
    textarea
      font-size 13px !important

  .input-group--prefix:not(.input-group--focused):not(.input-group--dirty)
    label
      left 8px
      top 15px

  .input-group--prefix .input-group--text-field__prefix
  .input-group--prefix .input-group--text-field__suffix
  .input-group--suffix .input-group--text-field__prefix
  .input-group--suffix .input-group--text-field__suffix
    font-size 13px !important

  .input-group--text-field.input-group--dirty:not(.input-group--textarea)
  .input-group--text-field:not(.input-group--single-line):focus:not(.input-group--textarea)
  .input-group--text-field:not(.input-group--single-line).input-group--focused:not(.input-group--textarea)
    label
      transform translate3d(0,-18px,0) scale(.90)

.action
  position fixed
  bottom 0
  width 100%
  z-index 4
  background-color #fff
  padding 10px 0
  border-top: 1px solid rgba(0,0,0,.12)
  background-color #f2f3f5

.list
  overflow-y auto
  pointer-events auto
  height 100%
  padding-bottom 100px

</style>
