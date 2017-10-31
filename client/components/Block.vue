<template lang="pug">
  div(
    v-if="edit"
    :edit="edit"
    :class="css"
    :active="active"
    :content="cube.content"
    @click.stop="edit && focus()"
    @mouseover.stop="hover=true"
    @mouseout.stop="hover=false")
    component(:cube="src", :is="src.type", :edit="edit", :select="select")
    i
</template>

<script>
import cssMixin from '../mixins/css'
export default {
  props: ['cube','select','edit','parent'],
  mixins: [cssMixin],
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
  },
  methods: {
    focus(){
      this.select(this.cube, this.$el, this.parent)
    },
  },
}
</script>

<style lang="stylus" module>
.block
  composes cube con from "../cubes/cube.css"
</style>
