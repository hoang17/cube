<template lang="pug">
  div(:style="page.style | styl", :class="css")
    link(v-for="f in pageFonts", :href='fontUrl(f)', rel='stylesheet')
    div(v-html="rules")
    component(v-for="(cube, i) in cubes", :cube="cube", :is="map(cube.type)", :key="i", :edit="false")
</template>

<script>
import { getRules, getFonts } from '../plugins/helpers'
import { fonts } from '../data/fonts'

export default {
  title(){
    return this.page.content
  },
  // rules(){
  //   return getRules(this.$store.state.styles)
  // },
  async asyncData ({ store, route, context }) {
    // context.res.status(404).end('404 | Page Not Found')
    let id = await store.dispatch('fetchView', { url: store.state.host + route.path })
    if (!id)
      throw {code: 404}
    store.commit('setActivePage', id)
  },
  data() {
    return {
    }
  },
  watch: {
    async path(){
      let id = await this.$store.dispatch('fetchView', { url: this.url })
      if (!id)
        return this.pageNotFound()
      this.$store.commit('setActivePage', id)
    }
  },
  computed: {
    css(){
      return [
        this.$style.page,
        this.page.css ? '--' + this.page.css : ''
      ]
    },
    path(){
      return this.$route.path
    },
    url(){
      return this.$store.state.host + this.$route.path
    },
    page() {
      return this.$store.getters.page
    },
    cubes() {
      return this.page.cubes
    },
    rules(){
      return '<style>'+getRules(this.$store.state.styles)+'</style>'
    },
    pageFonts(state){
      return getFonts(this.$store.state.styles, this.page)
    },
  },
  methods: {
    fontUrl(f) {
      return '/types/' + fonts[f]
    },
    map(type){
      return type == 'bk' ? 'bv' : type
    },
    pageNotFound(){
      alert('404 | Page not found')
    }
  }
}
</script>

<style lang="stylus" module>
.page
  padding-top 10px
</style>
