<template lang="pug">
  img(
    :src="cube.url || placeholderImg"
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
    placeholderImg(){
      const w = this.cube.style.width ? parseInt(this.cube.style.width) : 150
      const h = this.cube.style.height ? parseInt(this.cube.style.height) : 150
      return 'https://dummyimage.com/'+w+'x'+h+'/ffffff/000000.png'
    },
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
  padding 0
  width 150px
  border 1px solid #eee
  &[active]
  &[edit]:hover
    border 1px dotted #03a9f4
  &[edit]
    cursor default
</style>
