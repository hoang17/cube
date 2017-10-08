<template lang="pug">
  div(:edit="edit", :active="active", :style="cube.style | styl", @click.stop="edit && focus()", :class="css", @mouseover.stop="")
    .flex.xs5
      label(:for="cube._id", :class="$style.label") {{ cube.content }}
    .flex.xs7
      input(:id="cube._id", :class="$style.input", :placeholder="cube.placeholder")
</template>

<script>
export default {
  props: ['cube','select','edit'],
  computed: {
    css(){
      return this.$style.textfield + (this.cube.css ? ' --' + this.cube.css : '')
    },
    active(){
      return this.$store.state.activeCube == this.cube
    },
  },
  methods: {
    focus(){
      this.select(this.cube)
    },
  },
}
</script>

<style lang="stylus" module>
.textfield
  composes: cube from "./cube.css"
  text-align left
  align-items center
  display flex
  flex 1 1 auto
  flex-wrap nowrap

  // &[edit]:after
  //   transition .3s cubic-bezier(.25,.8,.25,1)
  //   pointer-events none
  //   content ''
  //   display block
  //   position absolute
  //   top 0
  //   left 0
  //   width 100%
  //   height 100%

  &[edit]:hover:after
    border 1px dotted #03a9f4 !important

  // &[active]:after
  //   border 1px dashed rgba(0,0,0,.5) !important
  label
    text-transform uppercase
    letter-spacing 2px
    -webkit-font-smoothing antialiased
    display block
    padding 8px 0
    // height 100%
    // line-height 36px
    // vertical-align middle
    // border 1px solid #666

  input
    text-align left
    border 1px solid #666
    outline none
    padding 8px
    width 100%
    // border-radius 2px

    // &[edit]
    //   transition .3s cubic-bezier(.25,.8,.25,1)

    // &[edit]:hover
    //   border 1px dotted #03a9f4 !important

    // &[active]
    //   border 1px dotted #4FFBFF !important
    //   outline none

:global(.application--light)
  .textfield
    input
      border 1px solid rgba(0,0,0,.15) !important

</style>
