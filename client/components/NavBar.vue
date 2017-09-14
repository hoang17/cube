<template lang="pug">
  v-navigation-drawer(permanent, absolute, height='100%')
    v-list(dense)
      //-v-subheader {{ page.content }}
      //-v-divider.my-4(dark)

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
      //-template(v-for='(item, i) in items')
        v-divider.my-4(dark, v-if='item.divider', :key='i')
        v-list-tile(:key='i', v-else)
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title {{ item.text }}
</template>

<script>
import * as cubes from '../data/cubes'
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters([
      'page'
    ]),
    ...mapState([
      'newId',
      'pages',
      'activeCube',
    ]),
  },
  data: () => ({
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
  user-select none

  .active
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
</style>
