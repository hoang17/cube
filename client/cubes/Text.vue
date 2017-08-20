<template lang="pug">
  .cube.text(:class="{active: active}", @click="active=!active", v-click-outside="hide")
    .cube-slot
      slot
</template>

<script>
export default {
  data() {
    return {
      active: false
    }
  },
  methods: {
    hide () {
      this.active = false
    }
  },
}
</script>

<style lang="stylus" scoped>
.cube
  position relative
  margin 10px auto
  text-align center
  cursor pointer
  user-select none

  .cube-slot
    position relative
    padding 10px

    &:after
      pointer-events none
      content ''
      display block
      position absolute
      top 0
      left 0
      width 100%
      height 100%

    &:hover
      &:after
        border 1px dotted #03a9f4 !important

  &.active > .cube-slot
    &:after
      border 2px solid #81d4fa !important

</style>
