<template lang="pug">
  draggable(
    v-if="edit",
    v-model='cube.cubes'
    :edit="edit"
    :class="css"
    :active="active"
    :content="cube.content"
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
    :content="cube.content"
    :class="css")
    component(
      v-for="(c, i) in cube.cubes"
      :cube="c"
      :is="map(c.type)"
      :key="i"
      :edit="edit")
    i
</template>

<script>
import draggable from 'vuedraggable'
import cssMixin from '../mixins/css'

export default {
  props: ['cube','select','edit','parent'],
  mixins: [cssMixin],
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
        this.cubeCss,
        this.hover ? 'hover' : ''
      ]
    },
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
  padding 10px
  min-height 38px
</style>
