<template lang="pug">
  a(
    v-if="edit"
    :class="css"
    :edit="edit"
    :active="active"
    @click.stop="edit && focus()"
    @mouseover.stop="") {{ cube.content }}
  router-link(
    v-else
    :to="cube.url?cube.url:''"
    :class="css") {{ cube.content }}
</template>

<script>
import cssMixin from '../mixins/css'
export default {
  props: ['cube','select','edit','parent'],
  mixins: [cssMixin],
  computed: {
    css(){
      return [
        this.$style.link,
        this.cubeCss,
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
.link
  composes cube from "./cube.css"
  padding 10px
  display inline-block
  &[edit]
    cursor pointer
</style>
