<template lang="pug">
  v-navigation-drawer.grey.lighten-4.pb-0(permanent, absolute, height='100%', light)
    v-list(dense)
      //-v-subheader {{ page.content }}
      //-v-divider.my-4(dark)

      v-list-tile(@click="selectPage()", :class="{active: !page._id}")
        v-list-tile-action
          v-icon add
        v-list-tile-content
          v-list-tile-title Add New Page

      v-list-tile(:key='i', @click="selectPage(p)", v-for='(p, i) in pages', :class="{active: page._id == p._id}")
        v-list-tile-action
          v-icon web_asset
        v-list-tile-content
          v-list-tile-title {{ p.content }}

      v-divider.my-4(dark)
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
import cubes from '../data/cubes'
import _ from 'lodash'

export default {
  computed: {
    page(){
      return this.$store.state.page
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
      let id = page ? page._id : undefined
      this.$router.push({ name: 'build', params: { id: id }})
    },
    addCube(cube){
      this.$store.state.page.cubes.push(_.cloneDeep(cube.defaultValue))
    }
  }
}
</script>

<style lang="stylus" scoped>
.active
  .list__tile__title
    font-weight bold

v-card
  a
    text-decoration none
</style>
