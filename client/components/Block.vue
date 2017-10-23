<template lang="pug">
  div(
    v-if="edit"
    :edit="edit"
    :class="css"
    :active="active"
    :style="cube.style | styl"
    :content="cube.content"
    @click.stop="edit && focus()"
    @mouseover.stop="hover=true"
    @mouseout.stop="hover=false")
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
        this.hover ? 'hover' : ''
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
  composes cube con from "../cubes/cube.css"
</style>
