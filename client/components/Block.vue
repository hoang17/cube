<template lang="pug">
  div(v-if="edit", :edit="edit", :active="active", :style="cube.style | styl", @click.stop="edit && focus()", :content="cube.content", :class="css", @mouseover.stop="hover=true", @mouseout.stop="hover=false")
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
      return [
        this.$style.block,
        this.cube.css ? '--' + this.cube.css : '',
        this.hover ? this.$style.hover : ''
      ]
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
  composes cube container from "../cubes/cube.css"

  .hover:after
    border 1px dotted #03a9f4 !important

:global(.application--dark)
  .block
    .hover:after
      border 1px dotted #03a9f4 !important
</style>
