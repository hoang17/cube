<template lang="pug">
  .cube.navbar(:edit="edit", :active="cube.active", :style="cube.style", @click="edit && focus()")
    slot
</template>

<script>
export default {
  props: ['cube','select','deselect','edit'],
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
.cube
  margin 10px auto
  padding 10px
  text-align center
</style>
