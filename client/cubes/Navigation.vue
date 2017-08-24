<template lang="pug">
  .cube.nav(:class="{active: cube.active}", :style="cube.style")
    .slot(:class="{edit: edit}", @click="edit && focus()")
      slot
</template>

<script>
export default {
  props: ['cube','select','deselect','edit'],
  data() {
    return {
      // content: this.cube.content
    }
  },
  methods: {
    focus(){
      this.select(this.cube)
    },
  },
}
</script>

<style lang="stylus" scoped>
.cube
  position relative
  margin 10px auto
  text-align center

  .slot
    position relative
    padding 10px

  .edit
    cursor pointer
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

  &.active > .edit
    &:after
      border 1px dashed rgba(0,0,0,.5) !important
      /*border 2px solid #81d4fa !important*/

</style>
