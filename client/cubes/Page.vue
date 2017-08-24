<template lang="pug">
  v-app
    .canvas
      v-layout(row, wrap)
        v-flex(xs12, md8, offset-md2)
          component(v-for="(cube, i) in cubes", :cube="cube", :is="cube.type", :key="i", :edit="false") {{ cube.content }}
</template>

<script>
export default {
  asyncData ({ store, route }) {
    return store.dispatch('fetchPage', { id: route.params.id })
  },
  data() {
    return {
    }
  },
  computed: {
    user(){
      return this.$store.state.user
    },
    cubes() {
      return this.$store.getters.cubes
    },
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
.canvas
  background-color #fff
  margin-left 20%
  margin-right 20%
  height 100vh

</style>
