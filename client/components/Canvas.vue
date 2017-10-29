<template lang="pug">
  .build(:class="{[$style.left]:left,[$style.right]:right}")
    link(v-for="f in currentFonts" v-if="fonts[f]", :href="'/types/'+fonts[f]" rel='stylesheet')
    //- div(v-html="rules")
    div(v-html="styles")
    div
      portal-target(name="modal")
    Toolbar(
      :class="$style.toolbar"
      @leftClick="left = !left"
      @rightClick="right = !right")
    Navbar(:class="$style.navbar")
    Sidebar(
      v-if="activeCube"
      :cube='activeCube'
      :class="$style.sidebar"
      @keydown.native="keydown"
      tabindex="1")
    draggable(
      v-model='cubes'
      :style="page.style | styl"
      :options="{group:'cubes'}"
      :class="$style.canvas + ' --'+page.src"
      @click.native.stop="selectPage"
    )
      component(v-for="(cube, i) in cubes", :cube="cube", :is="cube.type", :key="i", :edit="true", :select="selectCube")
      i
</template>

<script>
import Toolbar from './ToolBar'
import Navbar from './NavBar'
import Sidebar from './Sidebar'
import Draggable from 'vuedraggable'
import { getRules, getFonts } from '../plugins/helpers'
import { mapState, mapGetters } from 'vuex'
import { fonts } from '../data/fonts'
import clone from 'lodash/clone'
import { css, update, reset, toString } from '../css-js/stylish.js'

export default {
  title: 'Build',
  async asyncData ({ store, route, context }) {
    store.state.e = context.e
    // store.state.env = context.env
    return store.dispatch('fetchBuild', route.params.id)
  },
  components: {
    Toolbar,
    Navbar,
    Sidebar,
    Draggable,
  },
  data() {
    return {
      left: true,
      right: true,
      styleStr: '',
      fonts,
    }
  },
  computed: {
    ...mapGetters([
      'page',
      'currentFonts'
    ]),
    ...mapState({
      rules(state){
        return '<style>'+getRules(state.cubes)+'</style>'
      },
      pageFonts(state){
        return getFonts(state.cubes, this.page)
      },
      user(state){
        return state.user
      },
    }),
    id(){
      return this.$route.params.id
    },
    activeCube: {
      get() {
        return this.$store.state.activeCube
      },
      set(cube) {
        this.$store.commit('setActiveCube', cube)
      }
    },
    activeElement: {
      get() {
        return this.$store.state.activeElement
      },
      set(el) {
        this.$store.commit('setActiveElement', el)
      }
    },
    cubes: {
      get() {
        return this.page.cubes
      },
      set(cubes) {
        this.$store.commit('setCubes', cubes)
      }
    },
  },
  watch: {
    id(){
      if (this.id != this.page._id) {
        this.$store.commit('setActivePage', this.id ? this.id : this.$store.state.newId)
        this.activeCube = this.page
      }
    },
  },
  mounted() {
    var { git_tag, now_url, now_region, now_plan, heroku_app, heroku_ver, heroku_des } = this.$store.state.e
    git_tag && console.log(git_tag)
    now_url && console.log(now_url, now_region, now_plan)
    heroku_app && console.log(heroku_app, heroku_ver, heroku_des)
    // console.log(this.$store.state.env)
    this.activeCube = this.page

    this.$store.state.recentFonts = clone(this.currentFonts)
  },
  created() {
    for (let id in this.$store.state.cubes){
      const c = this.$store.state.cubes[id]
      if (c.name != 'Block' && c.style){
        const rule = css([c.style], '--'+id)
        // if (c.content == "Button")
        //   console.log(c.style.fontSize);
        this.$watch(() => c.style, (val, old) => {
          update(rule, val)
        }, {deep: true})
      }
    }
    this.styles = '<style>'+toString()+'</style>'
    reset()
  },
  methods: {
    keydown(e){
      var metaKey = navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey
      if (e.keyCode == 8 || e.keyCode == 46 || ((e.keyCode == 67 || e.keyCode == 86 || e.keyCode == 88 || e.keyCode == 90) && metaKey))
        e.stopPropagation()
    },
    selectPage(){
      this.activeCube = this.page
    },
    selectCube(cube, el){
      this.activeCube = cube
      this.activeElement = el
    },
    // deselectCube(){
    //   this.activeCube = null
    // },
  }
}
</script>

<style lang="stylus" module>
$left := 300px
$right := 28em

.left
  .toolbar
  .canvas
    padding-left $left
  .navbar
    transform none

.right
  .toolbar
  .canvas
    padding-right $right
  .sidebar
    transform none

.navbar
  width $left
  transform translate3d(-100%, 0, 0)

.sidebar
  width $right
  transform translate3d(100%, 0, 0)

.canvas
  margin 0
  padding 48px 0 0
  min-height 100vh
  height 100%
  outline none
  transition padding .3s cubic-bezier(.25,.8,.5,1)
</style>
