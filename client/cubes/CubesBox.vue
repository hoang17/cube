<template lang="pug">
  //-v-card.grey.lighten-4(height='620px', style='z-index: 0')
  v-navigation-drawer.grey.lighten-4.pb-0(permanent, absolute, height='100%', light)
    v-list(dense)
      template(v-for='(item, i) in items')
        v-layout(row, v-if='item.heading', align-center, :key='i')
          v-flex(xs6)
            v-subheader(v-if='item.heading') {{ item.heading }}
          //-v-flex.text-xs-center(xs6)
            a.body-2.black--text(href='#!') EDIT
        v-divider.my-4(dark, v-else-if='item.divider', :key='i')
        v-list-tile(:key='i', v-else, @click="onClick(item)")
          v-list-tile-action
            v-icon {{ item.icon }}
          v-list-tile-content
            v-list-tile-title
              | {{ item.text }}
</template>

<script>
import { cubes } from '../data/cubes'

export default {
  data: () => ({
    items: [
      { icon: 'lightbulb_outline', text: 'Notes' },
      { icon: 'touch_app', text: 'Reminders' },
      { divider: true },
      { heading: 'Cubes' },
      { icon: 'add', text: 'Create new text', action:'tx' },
      { icon: 'add', text: 'Create new button', action: 'btn' },
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
    onClick(item){
      if (item.action)
        this.$store.state.cubes.push(cubes[item.action].defaultValue)
    }
  }
}
</script>

<style lang="stylus" scoped>
v-card
  a
    text-decoration none
</style>
