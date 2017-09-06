<template lang="pug">
  v-navigation-drawer(permanent, absolute, height='100%', light)
    v-list(dense)
      //-v-subheader {{ page.content }}
      //-v-divider.my-4(dark)

      v-list-tile(@click="selectPage()", :class="{active: page._id == newId }")
        v-list-tile-action
          v-icon add
        v-list-tile-content
          v-list-tile-title Add New Page

      v-list-tile(:key='i', @click="selectPage(p)", v-for='(p, i) in pages', :class="{active: page._id == p._id}", v-if="p._id != newId")
        v-list-tile-action
          v-icon web_asset
        v-list-tile-content
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

export default {
  computed: {
    activeCube() {
      return this.$store.getters.activeCube
    },
    newId() {
      return this.$store.state.newId
    },
    page(){
      return this.$store.getters.page
    },
    pages(){
      return this.$store.state.pages
    },
  },
  data: () => ({
    cubes: cubes,
  }),
  methods: {
    selectPage(page){
      let id = page ? page._id : null
      this.$router.push({ name: 'build', params: { id: id }})
    },
    addCube(cube){
      let c = cube.new()
      if (this.activeCube.cubes){
        this.activeCube.cubes.push(c)
      } else {
        this.$store.getters.page.cubes.push(c)
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

  v-card
    a
      text-decoration none
</style>
