<template lang="pug">
  .cube.link(:edit="edit", :active="cube.active", :style="cube.style", @click.stop="edit && focus()")
    a(v-if="edit") {{ cube.content }}
    router-link(v-else, :to="cube.url?cube.url:''") {{ cube.content }}
</template>

<script>
export default {
  props: ['cube','select','deselect','edit'],
  data() {
    return {
      // content: this.cube.content
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
  margin 10px auto
  padding 10px
  display inline-block
  position relative

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

  &[active]:after
    border 1px dashed rgba(0,0,0,.5) !important

</style>
