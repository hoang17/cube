<template lang="pug">
  a(v-if="edit", :edit="edit", :active="active", :style="cube.style | styl", @click.stop="edit && focus()", :class="css", @mouseover.stop="") {{ cube.content }}
  router-link(v-else, :style="cube.style | styl", :to="cube.url?cube.url:''", :class="css") {{ cube.content }}
</template>

<script>
export default {
  props: ['cube','select','edit'],
  computed: {
    css(){
      return [this.$style.link, this.cube.src ? '--' + this.cube.src : '']
    },
    active(){
      return this.$store.state.activeCube == this.cube
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
.link
  composes cube from "./cube.css"
  display inline-block
  &[edit]
    cursor pointer
</style>
