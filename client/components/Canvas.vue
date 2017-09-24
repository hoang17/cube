<template lang="pug">
  .workspace(:class="{drawer: drawer.left, drawerRight: drawer.right}")
    div(v-html="rules")
    .control
      navbar(:drawer.sync='drawer')
      propbar(v-if="activeCube", :cube='activeCube', tabindex="1", @keydown.native="keydown", :drawer.sync='drawer')
      toolbar(:drawer.sync='drawer')
    draggable.canvas(@click.native.stop="selectPage", :style="page.style | styl", v-model='cubes', :options="{group:'cubes'}", :class="'--'+page.css")
      component(v-for="(cube, i) in cubes", :cube="cube", :is="cube.type", :key="i", :edit="true", :select="selectCube")
      i
</template>

<script>
import Draggable from 'vuedraggable'
import { getRules } from '../plugins/helpers'
import { mapState, mapGetters } from 'vuex'

export default {
  title: 'Build',
  async asyncData ({ store, route }) {
    return store.dispatch('fetchBuild', route.params.id)
  },
  components: {
    Draggable,
    'navbar': () => import('./NavBar'),
    'propbar': () => import('./PropBar'),
    'toolbar': () => import('./ToolBar'),
  },
  data() {
    return {
      drawer: {left: true, right: true},
    }
  },
  computed: {
    ...mapGetters([
      'page'
    ]),
    ...mapState({
      rules(state){
        return getRules(state.styles)
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

<style lang="stylus">
.application--dark
  .canvas
    // background-color hsl(220, 13%, 18%)
    color hsl(220, 14%, 71%)

.application--light
  .canvas
    background-color #fff

  .navigation-drawer--right
    background-color #fafafa

.canvas
  margin 0
  padding 48px 10px 20px 10px
  min-height 100vh
  height 100%
  outline none
  transition margin .3s cubic-bezier(.25,.8,.5,1)
  will-change margin-left

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

    // &[edit]:hover:after
    //   border 1px dotted #03a9f4 !important

    // &[active]:after
    //   border 1px dashed rgba(0,0,0,.5) !important

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
