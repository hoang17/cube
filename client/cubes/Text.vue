<template lang="pug">
  .cube-wrap
    .cube(:class="{active: active}", @click="active=!active", v-click-outside="hide")
      .text
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
.cube-wrap
  position relative

.cube
  position relative
  cursor pointer
  text-align center
  padding 10px
  user-select none

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

  &.active
    &:after
      border 2px solid #81d4fa !important

</style>
