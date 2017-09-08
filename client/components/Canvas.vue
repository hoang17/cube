<template lang="pug">
  .main
    div(v-html="rules")
    .control
      toolbar
      navbar
      propbar(v-if="activeCube", :cube='activeCube', tabindex="1", @keydown.native="keydown")
    draggable.canvas(@click.native.stop="selectPage", :style="page.style | styl", v-model='cubes', :options="{group:'cubes'}", :class="'--'+page.css")
      component(v-for="(cube, i) in cubes", :cube="cube", :is="cube.type", :key="i", :edit="true", :select="selectCube")
</template>

<script>
import Draggable from 'vuedraggable'
import cloneDeep  from 'lodash/cloneDeep'
import { getRules } from '../plugins/helpers'

export default {
  title: 'Build',
  async asyncData ({ store, route }) {
    await store.dispatch('fetchStyles')
    return store.dispatch('fetchPage', { id: route.params.id })
  },
  components: {
    Draggable,
    'navbar': () => import('./NavBar'),
    'propbar': () => import('./PropBar'),
    'toolbar': () => import('./ToolBar'),
  },
  data() {
    return {
      clipboard: null
    }
  },
  computed: {
    rules(){
      return getRules(this.$store.state.styles)
    },
    id(){
      return this.$route.params.id
    },
    activeCube: {
      get() {
        return this.$store.getters.activeCube
      },
      set(cube) {
        this.$store.commit('setActiveCube', cube)
      }
    },
    user(){
      return this.$store.state.user
    },
    page() {
      return this.$store.getters.page
    },
    cubes() {
      return this.page.cubes
    },
  },
  watch: {
    id(){
      if (this.id != this.page._id) {
        this.$store.dispatch('fetchPage', { id: this.id })
        this.activeCube = this.page
      }
    },
  },
  mounted() {
    // *** BRAIN FUCK :-? ***
    this.activeCube = this.page
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
    selectCube(cube){
      this.activeCube = cube
    },
    // deselectCube(){
    //   this.activeCube = null
    // },
  }
}
</script>

<style lang="stylus" scoped>
.canvas
  background-color #fff
  margin 0 28em 0 300px
  padding 48px 10px 20px 10px
  min-height 100vh
  height 100%
  outline none

  .card
    margin 20px auto

  .cube
    user-select none

    &[edit]
      cursor pointer

    &[edit]:after
      transition .3s cubic-bezier(.25,.8,.25,1)
      pointer-events none
      content ''
      display block
      position absolute
      top 0
      left 0
      width 100%
      height 100%

    &[edit]:hover:after
      border 1px dotted #03a9f4 !important

    &[active]:after
      border 1px dashed rgba(0,0,0,.5) !important

.control
  position fixed
  pointer-events none
  left 0
  top 0
  width 100%
  height 100%
  z-index 5
  outline 0
</style>
