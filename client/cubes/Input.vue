<template lang="pug">
  div(
    :edit="edit"
    :class="css"
    :active="active"
    :style="cube.style | styl"
    @click.stop="edit && focus()"
    @mouseover.stop="")
    label(:for="cube._id", :class="$style.label") {{ cube.content }}
    input(:id="cube._id", :class="$style.input", :placeholder="cube.placeholder")
</template>

<script>
export default {
  props: ['cube','select','edit'],
  computed: {
    css(){
      return [this.$style.textfield, this.cube.src ? '--' + this.cube.src : '']
    },
    active(){
      return this.$store.state.activeCube == this.cube
    },
  },
  methods: {
    focus(){
      this.select(this.cube, this.$el)
    },
  },
}
</script>

<style lang="stylus" module>
.textfield
  composes cube from "./cube.css"
  text-align left !important
  align-items center
  display flex
  flex 1 1 auto
  flex-wrap nowrap

  label
    text-transform uppercase
    letter-spacing 2px
    -webkit-font-smoothing antialiased
    display block
    padding 8px 0
    flex 1 1 40%
    // height 100%
    // line-height 36px
    // vertical-align middle
    // border 1px solid #666

  input
    text-align left
    outline none
    padding 8px
    width 100%
    border 1px solid rgba(0,0,0,.15)
    flex 1 1 60%
    // border-radius 2px

:global(.application--light)
  .textfield
    input
      border 1px solid rgba(0,0,0,.15) !important
</style>
