<template lang="pug">
  .page(:style="page.style")
    div(v-html="style")
    component(v-for="(cube, i) in cubes", :cube="cube", :is="cube.type", :key="i", :edit="false")
</template>

<script>
import insertCss from 'insert-css'
import { getRules } from '../plugins/helpers'

export default {
  title(){
    return this.page.content
  },
  async asyncData ({ store, route, context }) {
    await store.dispatch('fetchStyles')
    // context.rules = getRules(store.state.styles)

    // context.res.status(404).end('404 | Page Not Found')
    let id = await store.dispatch('fetchRoute', { url: store.state.host + route.path })
    if (!id)
      throw {code: 404}
    return store.dispatch('fetchPage', { id })
  },
  data() {
    return {
    }
  },
  watch: {
    async path(){
      let id = await this.$store.dispatch('fetchRoute', { url: this.url })
      if (!id)
        this.pageNotFound()
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
    style(){
      let s = getRules(this.$store.state.styles)
      return `<style>${s}</style>`
    },
  },
  methods: {}
}
</script>

<style lang="stylus">

/*.page
  background-color #fff*/

</style>
