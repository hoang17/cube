<template lang="pug">
  v-app
    .canvas(:style="page.style")
      v-layout(row, wrap)
        v-flex(xs12, md8, offset-md2)
          component(v-for="(cube, i) in cubes", :cube="cube", :is="cube.type", :key="i", :edit="false")
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
    page() {
      return this.$store.state.page
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

  .cube
    position relative
    margin 10px auto
    text-align center
    padding 10px
    transition .3s cubic-bezier(.25,.8,.25,1)

</style>
