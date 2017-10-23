<template lang="pug">
  div(:class="$style.navbar")
    Expansion
      Expand(:title="page.content" expand inner)
        MenuButton(
          icon="fa fa-plus"
          lb="Add New Page"
          :active="page._id == newId"
          :badge="showBadge(pages[newId])"
          @click.native.stop="selectPage()")
        MenuButton(
          v-for='(p, i) in pages'
          v-if="p._id != newId"
          icon="fa fa-file-o"
          :lb="p.content", :key='i'
          :meta="p.host"
          :active="page._id == p._id"
          :badge="showBadge(p)"
          @click.native.stop="selectPage(p)")
      Expand(title="Basic Cubes" expand :inner="$style.inner")
        MenuButton(
          v-for='(cube, i) in baseCubes'
          :w="1/2"
          :icon="cube.icon"
          :lb="cube.name", :key='i'
          @click.native="addBaseCube(cube)")
      Expand(title="Custom Cubes" expand inner)
        MenuButton(
          v-for='(cube, i) in customCubes'
          :icon="cube.icon"
          :lb="cube.content", :key='i', trash
          :meta="blockCount(cube) + ' cubes'"
          @click.native.stop="addCube(cube)"
          @trash="trash(cube)")
      Expand(title="Cube Blocks" expand inner)
        MenuButton(
          v-for='(cube, i) in blocks'
          icon="fa fa-cubes"
          :lb="cube.content", :key='i', trash
          :meta="blockCount(cube) + ' cubes'"
          @click.native.stop="addCube(cube)"
          @trash="trash(cube)")
      //-.v-list.pa-0(dense)
        .v-list-tile(avatar)
          .v-list-tile-avatar
            img(:src='user.profile.picture')
          .v-list-tile-content
            .v-list-tile-title {{ user.profile.name }}
          .v-list-tile-action
            //- button(icon, @click.native.stop='')
              i.fa.fa-cog
            //- button(icon, @click.native.stop='mini = !mini')
              .v-icon chevron_left
      //-.v-toolbar.transparent(flat,dense)
        .v-list
          .v-list-tile
            .v-list-tile-action
              .button(icon, @click="dark=!dark")
                i.fa.fa-moon-o
            .v-list-tile-content
              .v-list-tile-title Dark mode
            .v-list-tile-action.switch
              .v-switch(v-bind:label="dark ? 'On' : 'Off'", v-model='dark')
</template>

<script>
import { clone, getCubeStyles, getCubeBlocks, Block } from '../data/factory'
import * as baseCubes from '../data/cubes'
import { mapState, mapGetters } from 'vuex'
import Expansion from './Expansion'
import Expand from './Expand'
import MenuButton from './MenuButton'

export default {
  components: {
    Expansion, Expand, MenuButton
  },
  computed: {
    ...mapGetters([
      'page',
      'blockCount'
    ]),
    ...mapState([
      'user',
      'newId',
      'pages',
      'cubes',
      'activeCube',
    ]),
    dark: {
      get(){
        return this.$store.state.dark
      },
      set(dark){
        this.$store.state.dark = dark
      }
    },
    customCubes(){
      return Object.values(this.cubes).filter(e => !e.block)
    },
    blocks(){
      return Object.values(this.cubes).filter(e => e.block)
    }
  },
  data: () => ({
    baseCubes: baseCubes,
  }),
  methods: {
    showBadge(page){
      return this.$store.state.histories[page._id].sid != page.sid
    },
    selectPage(page){
      let id = page ? page._id : null
      this.$router.push({ name: 'build', params: { id: id }})
    },
    addBaseCube(cube){
      let c = clone(cube, this.user._id)
      if (this.activeCube && this.activeCube.cubes){
        this.activeCube.cubes.push(c)
      } else {
        this.page.cubes.push(c)
      }
    },
    addCube(cube){
      if (this.activeCube && this.activeCube.block && cube.block && cube._id == this.activeCube._id){
        return alert('OOPS! Can not add a block to itself')
      }

      let c = cube.block ? Block(cube, this.user._id) : clone(cube, this.user._id)

      if (!cube.block){
        c.src = cube._id
        delete c.style
      }

      // UPDATE BLOCKS COUNT
      let blocks = getCubeBlocks(c)
      for (let i in blocks){
        let count = this.page.blocks[i]
        this.$set(this.page.blocks, i, count ? count+blocks[i] : blocks[i])
      }
      // UPDATE STYLES COUNT
      // let styles = getCubeStyles(cube, this.$store.state.cubes)
      // for (let i in styles){
      //   let count = this.page.styles[i]
      //   this.$set(this.page.styles, i, count ? count+styles[i] : styles[i])
      // }
      // END UPDATE

      if (this.activeCube && this.activeCube.cubes){
        this.activeCube.cubes.push(c)
      } else {
        this.page.cubes.push(c)
      }
      // this.$store.commit('setActiveCube', c)
    },
    trash(cube){
      let count = this.blockCount(cube)
      if (count > 0){
        alert(`Can not delete this block because ${count} cubes connected to it`)
      } else if (confirm("Do you want to delete this cube?")){
        this.$store.dispatch('removeCube', cube)
      }
    },
  }
}
</script>

<style lang="stylus" module>
.navbar
  position fixed
  top 0
  left 0
  z-index 3
  height 100%
  overflow-y auto
  user-select none
  padding-bottom: 100px
  will-change transform
  background-color #f5f5f5
  border-right 1px solid #d1d1d1
  transition .3s cubic-bezier(.25,.8,.5,1)

.inner
  display flex
  flex-wrap wrap
</style>
