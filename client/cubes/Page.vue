<template lang="pug">
  .canvas(:style="page.style")
    component(v-for="(cube, i) in cubes", :cube="cube", :is="cube.type", :key="i", :edit="false")
</template>

<script>
export default {
  title(){
    return this.page.content
  },
  async asyncData ({ store, route }) {
    let id = await store.dispatch('fetchRoute', { url: store.state.host + route.path })
    return store.dispatch('fetchPage', { id })
  },
  data() {
    return {}
  },
  watch: {
    async path(){
      let id = await this.$store.dispatch('fetchRoute', { url: this.url })
      this.$store.dispatch('fetchPage', { id })
    }
  },
  computed: {
    path(){
      return this.$route.path
    },
    url(){
      return this.$store.state.host + this.$route.path
    },
    user(){
      return this.$store.state.user
    },
    page() {
      return this.$store.getters.page
    },
    cubes() {
      return this.$store.getters.cubes
    },
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
.canvas
  // background-color #fff

  .cube
    position relative
    margin 10px auto
    text-align center
    padding 10px
    transition .3s cubic-bezier(.25,.8,.25,1)

// @media (max-width: 1024px)
//   .container
//     display block !important
//     // flex-direction column !important

</style>
