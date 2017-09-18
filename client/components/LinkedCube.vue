<template lang="pug">
  .cube.lc(v-if="edit", :edit="edit", :active="active", :style="cube.style | styl", @click.stop="edit && focus()", :content="cube.content", :class="cube.css | css")
    component(:cube="source", :is="source.type", :edit="edit", :select="select")
</template>

<script>
export default {
  props: ['cube','select','edit'],
  data() {
    return {
    }
  },
  computed: {
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

<style lang="stylus" scoped>
.lc
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
    border 1px dashed rgba(0,0,0,.2) !important

  &[edit]:hover:after
    border 1px dotted #03a9f4 !important

  &[active]:after
    border 1px dashed rgba(0,0,0,.5) !important

.application--dark
  .lc
    &[edit]:after
      border 1px dashed #666 !important

    &[edit]:hover:after
      border 1px dotted #03a9f4 !important

    &[active]:after
      border 1px dashed #4FFBFF !important
</style>
