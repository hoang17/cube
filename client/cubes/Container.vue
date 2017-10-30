<template lang="pug">
  draggable(
    v-if="edit",
    v-model='cube.cubes'
    :edit="edit"
    :class="css"
    :active="active"
    :content="cube.content"
    :style="cube.style | styl"
    :options="{group:'cubes'}"
    @click.native.stop="edit && focus()"
    @mouseover.native.stop="hover=true"
    @mouseout.native.stop="hover=false")
    component(
      v-for="(c, i) in cube.cubes"
      :cube="c"
      :is="c.type"
      :key="i"
      :edit="edit"
      :select="select"
      :parent="cube")
    i
  div(
    v-else
    :style="cube.style | styl"
    :content="cube.content"
    :class="css")
    component(
      v-for="(c, i) in cube.cubes"
      :cube="c"
      :is="map(c.type)"
      :key="i"
      :edit="edit")
</template>

<script>
import draggable from 'vuedraggable'

export default {
  props: ['cube','select','edit','parent'],
  components: {
    draggable,
  },
  data(){
    return {
      hover: false
    }
  },
  computed: {
    css(){
      return [
        this.$style.container,
        this.cube.src ? '--' + this.cube.src : '',
        this.hover ? 'hover' : ''
      ]
    },
    active(){
      return this.$store.state.activeCube == this.cube
    }
  },
  methods: {
    map(type){
      return type == 'bk' ? 'bv' : type
    },
    focus(){
      this.select(this.cube, this.$el, this.parent)
    },
  },
}
</script>

<style lang="stylus" module>
.container
  composes cube con from "./cube.css"
  min-height 38px
</style>
