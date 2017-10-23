<template lang="pug">
  div(:style="cube.style | styl")
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

<style lang="stylus" module>
</style>
