<template lang="pug">
  .cube.block(:style="cube.style | styl", :class="cube.css | css")
    component(:cube="source", :is="source.type")
</template>

<script>
export default {
  props: ['cube'],
  data() {
    return {
    }
  },
  computed: {
    source(){
      return this.$store.state.cubes[this.cube.src]
    },
  },
  methods: {
  },
}
</script>

<style lang="stylus" scoped>
</style>
