<template lang="pug">
  .cube.button(:edit="edit", :active="cube.active", @click="edit && focus()")
    v-btn(:style="cube.style") {{ cube.content }}
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
  display inline-block
</style>
