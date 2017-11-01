<template lang="pug">
  img(
    :src="cube.url"
    :class="css"
    :edit="edit"
    :active="active"
    @click.stop="edit && focus()")
</template>

<script>
import cssMixin from '../mixins/css'

export default {
  props: ['cube','select','edit','parent'],
  mixins: [cssMixin],
  computed: {
    css(){
      return [
        this.$style.photo,
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
.photo
  composes cube from "./cube.css"
  min-height 100px
  min-width 100px
  padding 0
  // border 1px solid #eee
  &[edit]
    cursor default
</style>
