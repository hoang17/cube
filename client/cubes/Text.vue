<template lang="pug">
  div(
    :class="css"
    :edit="edit"
    :active="active"
    v-html="markdown"
    @click.stop="edit && focus()"
    @mouseover.stop="")
  //-vue-markdown.cube(:edit="edit", :active="active", :style="cube.style | styl", @click.native.stop="edit && focus()", :source='cube.content')
</template>

<script>
// import VueMarkdown from 'vue-markdown'
import marked from 'marked'
import { css } from '../css-js/stylish'

export default {
  props: ['cube','select','edit','parent'],
  components: {
    // VueMarkdown
  },
  computed: {
    computedStyle(){
      return window.getComputedStyle(this.$refs.el)
    },
    css(){
      return [
        this.$style.text,
        this.cube.src ? '--' + this.cube.src : css(this.cube.style, 'x' + this.cube._id),
      ]
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
      this.select(this.cube, this.$el, this.parent)
    },
  },
}
</script>

<style lang="stylus" module>
.text
  composes cube from "./cube.css"
  &[edit]
    cursor default
</style>
