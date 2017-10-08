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
  composes cube from "./cube.css"
  text-align left !important
  align-items center
  display flex
  flex 1 1 auto
  flex-wrap nowrap

  &[edit]:hover:after
    border 1px dotted #03a9f4 !important

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

:global(.application--light)
  .select
    select
      border 1px solid rgba(0,0,0,.15) !important
</style>
