<template lang="pug">
  draggable(v-if="edit", :edit="edit", :active="active", :style="cube.style | styl", @click.native.stop="edit && focus()", :content="cube.content", v-model='cube.cubes', :options="{group:'cubes'}", :class="css", @mouseover.native.stop="hover=true", @mouseout.native.stop="hover=false")
    component(v-for="(c, i) in cube.cubes", :cube="c", :is="c.type", :key="i", :edit="edit", :select="select")
    i
  div(v-else, :style="cube.style | styl", :content="cube.content", :class="$style.container + ' ' + cube.css | css")
    component(v-for="(c, i) in cube.cubes", :cube="c", :is="map(c.type)", :key="i", :edit="edit")
</template>

<script>
import draggable from 'vuedraggable'

export default {
  props: ['cube','select','edit'],
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
        this.cube.css ? '--' + this.cube.css : '',
        this.hover ? this.$style.hover : ''
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
      this.select(this.cube)
    },
  },
}
</script>

<style lang="stylus" module>
.container
  composes cube container from "./cube.css"
  min-height 38px

  .hover:after
    border 1px dotted #03a9f4 !important

:global(.application--dark)
  .container
    .hover:after
      border 1px dotted #03a9f4 !important
</style>
