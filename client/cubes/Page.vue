<template lang="pug">
  .page(:style="page.style")
    component(v-for="(cube, i) in cubes", :cube="cube", :is="cube.type", :key="i", :edit="false")
</template>

<script>
export default {
  title(){
    return this.page.content
  },
  async asyncData ({ store, route, context }) {
    // context.res.status(404).end('404 | Page Not Found')
    let id = await store.dispatch('fetchRoute', { url: store.state.host + route.path })
    if (!id)
      throw {code: 404}
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

<style lang="stylus">
.page
  // background-color #fff

  .cube
    position relative
    margin 10px auto
    text-align center
    padding 10px
    transition .3s cubic-bezier(.25,.8,.25,1)
</style>
