<template lang="pug">
  div(:edit="edit", :active="active", :style="cube.style | styl", @click.stop="edit && focus()", :class="css", @mouseover.stop="")
    .flex.xs5
      label(:class="$style.label", :for="cube._id") {{ cube.content }}
    .flex.xs7
      select(:id="cube._id")
        option(v-for='o in cube.options', :value="o.value") {{ o.name }}
</template>

<script>
export default {
  props: ['cube','select','edit'],
  computed: {
    css(){
      return this.$style.select + (this.cube.css ? ' --' + this.cube.css : '')
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
.select
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

  select
    text-align left
    border 1px solid #666
    outline none
    padding 8px
    width 100%
    border-radius 0

    // &[edit]
    //   transition .3s cubic-bezier(.25,.8,.25,1)

    // &[edit]:hover
    //   border 1px dotted #03a9f4 !important

    // &[active]
    //   border 1px dotted #4FFBFF !important
    //   outline none

:global(.application--light)
  .select
    select
      border 1px solid rgba(0,0,0,.15) !important
</style>
