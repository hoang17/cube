<template lang="pug">
  vue-markdown.cube.text(:edit="edit", :active="cube.active", :style="cube.style", @click.native.stop="edit && focus()", :source='cube.content')
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  props: ['cube','select','deselect','edit'],
  components: {
    VueMarkdown
  },
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
.text
  position relative
  margin 10px auto
  padding 10px

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
