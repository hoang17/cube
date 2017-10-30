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
import cssMixin from '../mixins/css'

export default {
  props: ['cube','select','edit','parent'],
  mixins: [cssMixin],
  components: {
    // VueMarkdown
  },
  computed: {
    // computedStyle(){
    //   return window.getComputedStyle(this.$refs.el)
    // },
    css(){
      return [
        this.$style.text,
        this.cubeCss,
      ]
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
