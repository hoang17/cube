<template lang="pug">
  .main
    div(v-html="rules")
    .control
      toolbar(:cube='activeCube', @remove="trash", @dup="dup")
      navbar
      propbar(v-if="activeCube", :cube='activeCube', @done="deselectCube", @remove="trash", tabindex="1", @keydown.native="keydown")
    draggable.canvas(@click.native.stop="selectPage", :style="page.style | styl", v-model='cubes', :options="{group:'cubes'}", :class="'--'+page.css")
      component(v-for="(cube, i) in cubes", :cube="cube", :is="cube.type", :key="i", :edit="true", :select="selectCube")
</template>

<script>
import Draggable from 'vuedraggable'
import cloneDeep  from 'lodash/cloneDeep'
import { getRules } from '../plugins/helpers'
import { ObjectId } from '../api'

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
        this.$store.dispatch('fetchPage', { id: this.id })
        this.activeCube = this.page
      }
    },
  },
  mounted() {
    // *** BRAIN FUCK :-? ***
    this.activeCube = this.page

    document.addEventListener('keydown', e => {
      // if (window.event) e =  event
      var metaKey = (e) => navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey

      if (e.keyCode == 67 && metaKey(e)){
        this.copy()
      }
      else if (e.keyCode == 86 && metaKey(e)){
        this.paste()
      }
      else if (e.keyCode == 88 && metaKey(e)){
        this.cut()
      }
    }, false)
  },
  methods: {
    keydown(e){
      var metaKey = (e) => navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey
      if ((e.keyCode == 67 || e.keyCode == 86 || e.keyCode == 88 || e.keyCode == 90) && metaKey(e)){
        e.stopPropagation()
      }
    },
    copy(){
      if (!this.activeCube || this.activeCube.name == 'Page') return
      this.clipboard = cloneDeep(this.activeCube)
      console.log('copied');
    },
    cut(){
      if (!this.activeCube || this.activeCube.name == 'Page') return
      this.clipboard = cloneDeep(this.activeCube)
      this.removeActiveCube()
      console.log('cut');
    },
    paste(){
      if (!this.activeCube || !this.clipboard) return
      let c = cloneDeep(this.clipboard)
      if (this.activeCube.cubes){
        this.activeCube.cubes.push(c)
      } else {
        this.cubes.push(c)
      }
      console.log('pasted');
    },
    dup(){
      if (this.activeCube == this.page) {
        let p = cloneDeep(this.page)
        p._id = ObjectId()
        p.new = true
        p.content += ' Copy'
        p.path = p._id
        p.url = p.host + '/' + p._id
        this.$store.commit('setPage', p)
        this.activeCube = p
        this.$router.push({ name: 'build', params: { id: p._id }})
      }
      else this.cubes.push(cloneDeep(this.activeCube))
    },
    trash(){
      // remove page
      if (this.activeCube == this.page && confirm("Do you want to delete this page?")) {
        this.$store.dispatch('deletePage', { page: this.page })
        this.activeCube = null
        this.$router.push({ name: 'build' })
      }
      else this.removeActiveCube()
    },
    removeActiveCube(){
      var remove = cubes => {
        let index = cubes.indexOf(this.activeCube)
        if (index > -1){
          cubes.splice(index, 1)
          this.activeCube = null
        } else {
          cubes.map(c => {
            if (c.cubes && c.cubes.length > 0)
              remove(c.cubes)
          })
        }
      }
      remove(this.cubes)
    },
    selectPage(){
      this.activeCube = this.page
    },
    selectCube(cube){
      this.activeCube = cube
    },
    deselectCube(){
      this.activeCube = null
    },
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
