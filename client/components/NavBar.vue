<template lang="pug">
  v-navigation-drawer(persistent, absolute, :mini-variant.sync='mini', v-model='drawer.left', overflow, enable-resize-watcher)
    v-toolbar.transparent(flat,dense)
      v-list.pa-0(dense)
        v-list-tile(avatar)
          v-list-tile-avatar
            img(:src='user.profile.picture')
          v-list-tile-content
            v-list-tile-title {{ user.profile.name }}
          v-list-tile-action
            v-btn(icon, @click.native.stop='mini = !mini')
              v-icon chevron_left
    v-list.pt-0(dense)
      v-divider
      v-list-tile(@click="selectPage()", :class="{active: page._id == newId }")
        v-list-tile-action
          i.fa.fa-plus
        v-list-tile-content(v-badge="{value:'',visible:showBadge(pages[newId])}")
          v-list-tile-title Add New Page

      v-list-tile(:key='i', @click.stop="selectPage(p)", v-for='(p, i) in pages', :class="{active: page._id == p._id}", v-if="p._id != newId")
        v-list-tile-action
          //- v-icon web_asset
          i.fa.fa-file-o
        v-list-tile-content(v-badge="{value:'',visible:showBadge(p)}")
          v-list-tile-title {{ p.content }}
          .meta  {{ p.host }}
        //- v-list-tile-action
          v-btn(icon, @click.stop="trashPage(p)")
            i.fa.fa-trash

      v-divider.my-2(dark)
      v-list-tile(:key='i', @click="addBaseCube(cube)", v-for='(cube, i) in baseCubes')
        v-list-tile-action
          //- v-icon add
          i.fa.fa-sticky-note-o
        v-list-tile-content
          v-list-tile-title {{ cube.name }}

      v-divider.my-2(dark)
      v-list-tile(:key='i', @click.stop="addCube(cube)", v-for='(cube, i) in cubes')
        v-list-tile-action
          i.fa(:class="cube.link?'fa-cubes':'fa-cube'")
        v-list-tile-content
          v-list-tile-title {{ cube.content }}
          span.meta  {{ cube.link ? `${linkCount(cube)} cubes` : '' }}
        v-list-tile-action
          v-btn(icon, @click.stop="trash(cube)")
            i.fa.fa-trash-o

      v-divider.my-2(dark)

    v-toolbar.transparent(flat,dense)
      v-list
        v-list-tile
          v-list-tile-action
            v-btn(icon, @click="dark=!dark")
              i.fa.fa-moon-o
          v-list-tile-content
            v-list-tile-title Dark mode
          v-list-tile-action.switch
            v-switch(v-bind:label="dark ? 'On' : 'Off'", v-model='dark')
</template>

<script>
import { clone, getCubeStyles, getCubeBlocks, Block } from '../data/factory'
import * as baseCubes from '../data/cubes'
import { mapState, mapGetters } from 'vuex'

export default {
  props: ['drawer'],
  computed: {
    ...mapGetters([
      'page',
      'linkCount'
    ]),
    ...mapState([
      'newId',
      'pages',
      'cubes',
      'activeCube',
      'user',
    ]),
    dark: {
      get(){
        return this.$store.state.dark
      },
      set(dark){
        this.$store.state.dark = dark
      }
    }
  },
  data: () => ({
    mini: false,
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
      let c = clone(cube)
      if (this.activeCube && this.activeCube.cubes){
        this.activeCube.cubes.push(c)
      } else {
        this.page.cubes.push(c)
      }
    },
    addCube(cube){
      if (this.activeCube && this.activeCube.link && cube.link && cube._id == this.activeCube._id){
        return alert('OOPS! Can not add a block to itself')
      }

      let c = cube.link ? Block(cube) : clone(cube)

      // UPDATE BLOCKS COUNT
      let blocks = getCubeBlocks(c)
      for (let i in blocks){
        let count = this.page.blocks[i]
        this.$set(this.page.blocks, i, count ? count+blocks[i] : blocks[i])
      }
      // UPDATE STYLES COUNT
      let styles = getCubeStyles(cube, this.$store.state.cubes)
      for (let i in styles){
        let count = this.page.styles[i]
        this.$set(this.page.styles, i, count ? count+styles[i] : styles[i])
      }
      // END UPDATE

      if (this.activeCube && this.activeCube.cubes){
        this.activeCube.cubes.push(c)
      } else {
        this.page.cubes.push(c)
      }
      // this.$store.commit('setActiveCube', c)
    },
    trash(cube){
      let count = this.linkCount(cube)
      if (cube.link && count > 0){
        alert(`Can not delete this block because ${count} cubes linked to it`)
      } else if (confirm("Do you want to delete this cube?")){
        this.$store.dispatch('removeCube', cube)
      }
    },
  }
}
</script>

<style lang="stylus" scoped>
.navigation-drawer
  z-index 5
  user-select none

  .active
    background-color rgba(0, 0, 0, 0.18)
    .list__tile__title
      font-weight bold

  .badge:after
    background #4caf50!important
    font-size 8px
    width 10px
    height 10px
    top 15px
    right 0

  v-card
    a
      text-decoration none

  .list__tile--avatar .avatar .icon
  .list__tile--avatar .avatar img
    width 30px
    height 30px

  .list__tile__action
    min-width 36px

  .list__tile__action.switch
    min-width 73px

  .meta
    color #999
    font-size 10px
    font-weight 100

.navigation-drawer--mini-variant
  margin-top 48px
</style>
