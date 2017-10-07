<template lang="pug">
  .cube(v-if="edit", :edit="edit", :active="active", :style="cube.style | styl", @click.stop="edit && focus()", :content="cube.content", :class="css", @mouseover.stop="hover=true", @mouseout.stop="hover=false")
    component(:cube="source", :is="source.type", :edit="edit", :select="select")
</template>

<script>
export default {
  props: ['cube','select','edit'],
  data(){
    return {
      hover: false
    }
  },
  computed: {
    css(){
      return this.$style.block + ' --' + this.cube.css + (this.hover ? ' hover' : '')
    },
    active(){
      return this.$store.state.activeCube == this.cube
    },
    source(){
      return this.$store.state.cubes[this.cube.src]
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
.block
  &[edit]:after
    transition .3s cubic-bezier(.25,.8,.25,1)
    pointer-events none
    content ''
    display block
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    border 1px dotted rgba(0,0,0,.2) !important

  &[edit].hover:after
    border 1px dotted #03a9f4 !important

  &[active]:after
    border 1px dotted rgba(0,0,0,.5) !important

:global(.application--dark)
  .block
    &[edit]:after
      border 1px dotted #666 !important

    &[edit].hover:after
      border 1px dotted #03a9f4 !important

    &[active]:after
      border 1px dotted #4FFBFF !important
</style>
