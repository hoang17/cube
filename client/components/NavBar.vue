<template lang="pug">
  v-navigation-drawer(persistent, absolute, :mini-variant.sync='mini', v-model='drawer', overflow, enable-resize-watcher)
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
          v-icon add
        v-list-tile-content(v-badge="{value:'',visible:showBadge(pages[newId])}")
          v-list-tile-title Add New Page

      v-list-tile(:key='i', @click="selectPage(p)", v-for='(p, i) in pages', :class="{active: page._id == p._id}", v-if="p._id != newId")
        v-list-tile-action
          v-icon web_asset
        v-list-tile-content(v-badge="{value:'',visible:showBadge(p)}")
          v-list-tile-title {{ p.content }}

      v-divider.my-2(dark)
      v-list-tile(:key='i', @click="addCube(cube)", v-for='(cube, i) in cubes')
        v-list-tile-action
          v-icon add
        v-list-tile-content
          v-list-tile-title {{ cube.name }}
      v-divider.my-2(dark)

    v-toolbar.transparent(flat,dense)
      v-list
        v-list-tile
          v-list-tile-action
            i.fa.fa-moon-o
          v-list-tile-content
            v-list-tile-title Dark mode
          v-list-tile-action.switch
            v-switch(v-bind:label="dark ? 'On' : 'Off'", v-model='$store.state.dark')
</template>

<script>
import * as cubes from '../data/cubes'
import { mapState, mapGetters } from 'vuex'

export default {
  props: ['drawer'],
  computed: {
    ...mapGetters([
      'page'
    ]),
    ...mapState([
      'newId',
      'pages',
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
    cubes: cubes,
  }),
  methods: {
    showBadge(page){
      return this.$store.state.histories[page._id].sid != page.sid
    },
    selectPage(page){
      let id = page ? page._id : null
      this.$router.push({ name: 'build', params: { id: id }})
    },
    addCube(cube){
      let c = cube.init()
      if (this.activeCube && this.activeCube.cubes){
        this.activeCube.cubes.push(c)
      } else {
        this.page.cubes.push(c)
      }
      // this.$store.commit('setActiveCube', c)
    }
  }
}
</script>

<style lang="stylus" scoped>
.navigation-drawer
  z-index 3
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
    min-width 96px

.navigation-drawer--mini-variant
  margin-top 48px

</style>
