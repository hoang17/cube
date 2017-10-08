<template lang="pug">
  div(:edit="edit", :active="active", :style="cube.style | styl", @click.stop="edit && focus()", v-html="markdown", :class="css", @mouseover.stop="")
  //-vue-markdown.cube(:edit="edit", :active="active", :style="cube.style | styl", @click.native.stop="edit && focus()", :source='cube.content')
</template>

<script>
// import VueMarkdown from 'vue-markdown'

import marked from 'marked'

export default {
  props: ['cube','select','edit'],
  components: {
    // VueMarkdown
  },
  computed: {
    css(){
      return this.$style.text + (this.cube.css ? ' --' + this.cube.css : '')
    },
    active(){
      return this.$store.state.activeCube == this.cube
    },
    markdown() {
      return marked(this.cube.content, { sanitize: true })
    }
  },
  methods: {
    focus(){
      this.select(this.cube)
    },
  },
}
</script>

<style lang="stylus" module>
// .className
//   color green
//   background red

.text
  // composes className
  composes: cube from "./cube.css"

  // &[edit]:after
  //   transition .3s cubic-bezier(.25,.8,.25,1)
  //   pointer-events none
  //   content ''
  //   display block
  //   position absolute
  //   top 0
  //   left 0
  //   width 100%
  //   height 100%

  &[edit]:hover:after
    border 1px dotted #03a9f4 !important

  // &[active]:after
  //   border 1px dashed rgba(0,0,0,.5) !important
</style>
