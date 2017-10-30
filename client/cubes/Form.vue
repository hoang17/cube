<template lang="pug">
  draggable(
    v-if="edit"
    v-model='cube.cubes'
    :edit="edit"
    :class="css"
    :active="active"
    :style="cube.style | styl"
    :content="cube.content"
    :options="{group:'cubes'}"
    @click.native.stop="edit && focus()"
    @mouseover.native.stop="hover=true"
    @mouseout.native.stop="hover=false")
    component(v-for="(c, i) in cube.cubes", :cube="c", :is="c.type", :key="i", :edit="edit", :select="select")    
  div(v-else, :style="cube.style | styl", :content="cube.content", :class="css")
    component(v-for="(c, i) in cube.cubes", :cube="c", :is="map(c.type)", :key="i", :edit="edit")
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
        this.$style.form,
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
.form
  composes cube con from "../cubes/cube.css"
  min-height 38px
</style>
