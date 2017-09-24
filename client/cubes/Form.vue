<template lang="pug">
  draggable.cube.form(v-if="edit", :edit="edit", :active="active", :style="cube.style | styl", @click.native.stop="edit && focus()", :content="cube.content", v-model='cube.cubes', :options="{group:'cubes'}", :class="css", @mouseover.native.stop="hover=true", @mouseout.native.stop="hover=false")
    component(v-for="(c, i) in cube.cubes", :cube="c", :is="c.type", :key="i", :edit="edit", :select="select")
    i
  .cube.form(v-else, :style="cube.style | styl", :content="cube.content", :class="cube.css | css")
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
      return '--' + this.cube.css + (this.hover ? ' hover' : '')
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

<style lang="stylus" scoped>
.form
  min-height 38px

  &:empty:before
    content attr(content)
    display block
    position absolute
    top calc(50% - 0.5rem)
    left 0
    width 100%
    font-size 1rem
    height 1rem
    line-height 1rem
    white-space nowrap
    text-overflow ellipsis
    padding 0 2rem
    color rgba(144,145,153,0.5)

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

.application--dark
  .form
    &[edit]:after
      border 1px dotted #666 !important

    &[edit].hover:after
      border 1px dotted #03a9f4 !important

    &[active]:after
      border 1px dotted #4FFBFF !important

</style>
