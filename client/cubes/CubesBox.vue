<template lang="pug">
  v-navigation-drawer.grey.lighten-4.pb-0(permanent, absolute, height='100%', light)
    v-list(dense)
      v-subheader Cubes
      v-list-tile(:key='i', @click="onClick(cube)", v-for='(cube, i) in cubes')
        v-list-tile-action
          v-icon add
        v-list-tile-content
          v-list-tile-title
            | Create new {{ cube.name }}
      template(v-for='(item, i) in items')
        v-divider.my-4(dark, v-if='item.divider', :key='i')
        v-list-tile(:key='i', v-else)
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title
              | {{ item.text }}
</template>

<script>
import cubes from '../data/cubes'
import _ from 'lodash'

export default {
  data: () => ({
    cubes: cubes,
    items: [
      { divider: true },
      { icon: 'lightbulb_outline', text: 'Notes' },
      { icon: 'touch_app', text: 'Reminders' },
      { divider: true },
      { icon: 'archive', text: 'Archive' },
      { icon: 'delete', text: 'Trash' },
      { divider: true },
      { icon: 'settings', text: 'Settings' },
      { icon: 'chat_bubble', text: 'Trash' },
      { icon: 'help', text: 'Help' },
      { icon: 'phonelink', text: 'App downloads' },
      { icon: 'keyboard', text: 'Keyboard shortcuts' }
    ]
  }),
  methods: {
    onClick(cube){
      this.$store.state.cubes.push(_.clone(cube.defaultValue))
    }
  }
}
</script>

<style lang="stylus" scoped>
v-card
  a
    text-decoration none
</style>
