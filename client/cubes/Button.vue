<template lang="pug">
  button(
    :edit="edit"
    :active="active"
    :style="cube.style | styl"
    :class="css"
    @click.stop="onClick"
    @mouseover.stop="") {{ cube.content }}
</template>

<script>
export default {
  props: ['cube','select','edit','parent'],
  computed: {
    css(){
      return [this.$style.button, this.cube.src && '--'+this.cube.src]
    },
    active(){
      return this.$store.state.activeCube == this.cube
    },
  },
  methods: {
    onClick(){
      if (this.edit)
        this.select(this.cube, this.$el, this.parent)
      else if (this.cube.url) {
        if (this.cube.url == 'back')
          this.$router.go(-1)
        else
          this.$router.push(this.cube.url)
      }
    },
  },
}
</script>

<style lang="stylus" module>
.button
  composes cube from "./cube.css"
  outline none
  background none
  border 1px solid rgba(0,0,0,.15)
  border-radius 0
  cursor pointer
  display inline-block
  // box-shadow 0 1px 2px rgba(0,0,0,0.1)
  &:hover
    border-color rgba(0,0,0,.3)
  &:active
    box-shadow 0 2px 2px rgba(0,0,0,0.1)
  &[edit]
    cursor pointer
</style>
