<template lang="pug">
  a.cube.link(v-if="edit", :edit="edit", :active="active", :style="cube.style | styl", @click.stop="edit && focus()", :class="cube.css | css", @mouseover.stop="") {{ cube.content }}
  router-link.cube.link(v-else, :style="cube.style | styl", :to="cube.url?cube.url:''", :class="cube.css | css") {{ cube.content }}
</template>

<script>
export default {
  props: ['cube','select','deselect','edit'],
  computed: {
    active(){
      return this.$store.state.activeCube == this.cube
    }
  },
  methods: {
    focus(){
      this.select(this.cube)
    },
  },
}
</script>

<style lang="stylus" scoped>
.link
  display inline-block

  &[edit]
    cursor pointer

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

  &[edit]:hover:after
    border 1px dotted #03a9f4 !important

  // &[active]:after
  //   border 1px dashed rgba(0,0,0,.5) !important

</style>
