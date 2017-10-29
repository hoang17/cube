<template lang="pug">
  div(:style="page.style | styl", :class="css")
    link(v-for="f in pageFonts" v-if="fonts[f]", :href="'/types/'+fonts[f]" rel='stylesheet')
    style(v-for="c,i in blocks" v-if="c.name!='Block'" v-html="getRule(c)")
    component(v-for="(cube, i) in cubes", :cube="cube", :is="map(cube.type)", :key="i", :edit="false")
</template>

<script>
import { getRules, getFonts } from '../plugins/helpers'
import { fonts } from '../data/fonts'
import css from '../css-js/styl'

export default {
  title(){
    return this.page.content
  },
  async asyncData ({ store, route, context }) {
    // context.res.status(404).end('404 | Page Not Found')
    let id = await store.dispatch('fetchView', { url: store.state.host + route.path })
    if (!id)
      throw {code: 404}
    store.commit('setActivePage', id)
  },
  data() {
    return {
      fonts
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
        this.page.src ? '--' + this.page.src : ''
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
      return '<style>'+getRules(this.$store.state.cubes)+'</style>'
    },
    pageFonts(state){
      return getFonts(this.$store.state.cubes, this.page)
    },
    blocks(state){
      return this.$store.state.cubes
    },
  },
  methods: {
    getRule(e){
      return css([e.style], '--'+e._id).toString()
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
