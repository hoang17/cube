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
.text
  composes cube from "./cube.css"

  &[edit]:hover:after
    border 1px dotted #03a9f4 !important
</style>
