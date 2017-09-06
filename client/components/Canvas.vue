<template lang="pug">
  .main
    .control
      toolbar(:cube='activeCube')
      navbar
      propbar(v-if="activeCube", :cube='activeCube', @done="deselectCube", @remove="removeCube")
    draggable.canvas(@click.native.stop="selectPage", :style="page.style | styl", v-model='cubes', :options="{group:'cubes'}", :class="'--'+page.css")
      component(v-for="(cube, i) in cubes", :cube="cube", :is="cube.type", :key="i", :edit="true", :select="selectCube")
</template>

<script>
import Draggable from 'vuedraggable'

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
    }
  },
  computed: {
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
        return this.$store.getters.cubes
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
  },
  methods: {
    selectPage(){
      this.activeCube = this.page
    },
    selectCube(cube){
      this.activeCube = cube
    },
    deselectCube(){
      this.activeCube = null
    },
    removeCube(){
      // remove page
      if (this.activeCube == this.page && confirm("Do you want to delete this page?")) {
        this.$store.dispatch('deletePage', { page: this.page })
        this.activeCube = null
        this.$router.push({ name: 'build' })
        return
      }

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
  }
}
</script>

<style lang="stylus" scoped>
.canvas
  background-color #fff
  margin-left 300px
  margin-right 28em
  padding 48px 10px 0 10px
  height 100vh

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
