<template lang="pug">
  v-app.canvas
    v-layout(row)
      v-flex(xs12, sm6, offset-sm3)
        v-card
          v-toolbar.light-blue(dark)
            v-toolbar-side-icon
            v-toolbar-title Inbox
            v-spacer
            v-btn(icon)
              v-icon search
          v-list(three-line)
            template(v-for='item in messages')
              v-subheader(v-if='item.header', v-text='item.header')
              v-divider(v-else-if='item.divider', v-bind:inset='item.inset')
              v-list-tile(avatar, v-else, v-bind:key='item.title')
                v-list-tile-avatar
                  img(v-bind:src="'https://vuetifyjs.com' + item.avatar")
                v-list-tile-content
                  v-list-tile-title(v-html='item.title')
                  v-list-tile-sub-title(v-html='item.subtitle')

    br

    v-layout(row)
      v-flex(xs12, sm6, offset-sm3)
        v-card
          v-toolbar(dark)
            v-toolbar-side-icon
            v-toolbar-title Inbox
            v-spacer
            v-btn(icon)
              v-icon search
          v-list(two-line, dark)
            template(v-for='item in items')
              v-subheader(v-if='item.header', v-text='item.header')
              v-divider(v-else-if='item.divider', v-bind:inset='item.inset')
              v-list-tile(avatar, v-else, v-bind:key='item.title')
                v-list-tile-avatar
                  img(v-bind:src="'https://vuetifyjs.com' + item.avatar")
                v-list-tile-content
                  v-list-tile-title(v-html='item.title')
                  v-list-tile-sub-title(v-html='item.subtitle')

    br

    v-layout(row)
      v-flex(xs12, sm6, offset-sm3)
        v-card
          v-toolbar.white--text.light-blue(dark)
            v-toolbar-side-icon
            v-toolbar-title Inbox
            v-spacer
            v-btn(icon)
              v-icon search
            v-btn(icon)
              v-icon check_circle
          v-list(two-line)
            v-list-tile(avatar, ripple, v-for='(item, index) in items', v-bind:key='item.title')
              v-list-tile-content
                v-list-tile-title {{ item.title }}
                v-list-tile-sub-title.grey--text.text--darken-4 {{ item.headline }}
                v-list-tile-sub-title {{ item.subtitle }}
              v-list-tile-action
                v-list-tile-action-text {{ item.action }}
                v-icon.grey--text.text--lighten-1 star_border
              v-divider(v-if='index + 1 < items.length')

    br

    v-text-field(name='input-2', label='Enter Focus')

    v-card.grey.lighten-4.elevation-1
      v-card-text
        v-text-field#testing(name='input-1', label='Label Text')
        v-text-field(name='input-2', label='Enter Focus')
        v-text-field(name='input-3', label='Label Text', value='Input text')
        v-text-field(name='input-3', label='Label Text', value='Input text', disabled)
</template>

<script>

export default {
  components: {
  },
  data() {
    return {
      messages: [
        { header: 'Today' },
        { avatar: '/static/doc-images/lists/1.jpg', title: 'Brunch this weekend?', subtitle: "<span class='grey--text text--darken-2'>Ali Connors</span> — I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { divider: true, inset: true },
        { avatar: '/static/doc-images/lists/2.jpg', title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>', subtitle: "<span class='grey--text text--darken-2'>to Alex, Scott, Jennifer</span> — Wish I could come, but I'm out of town this weekend." },
        { divider: true, inset: true },
        { avatar: '/static/doc-images/lists/3.jpg', title: 'Oui oui', subtitle: "<span class='grey--text text--darken-2'>Sandra Adams</span> — Do you have Paris recommendations? Have you ever been?" },
        { divider: true, inset: true },
        { avatar: '/static/doc-images/lists/4.jpg', title: 'Birthday gift', subtitle: "<span class='grey--text text--darken-2'>Trevor Hansen</span> — Have any ideas about what we should get Heidi for her birthday?" },
        { divider: true, inset: true },
        { avatar: '/static/doc-images/lists/5.jpg', title: 'Recipe to try', subtitle: "<span class='grey--text text--darken-2'>Britta Holt</span> — We should eat this: Grate, Squash, Corn, and tomatillo Tacos." },
      ],
      items: [
        { avatar: '/static/doc-images/lists/1.jpg', action: '15 min', headline: 'Brunch this weekend?', title: 'Ali Connors', subtitle: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?" },
        { avatar: '/static/doc-images/lists/2.jpg', action: '2 hr', headline: 'Summer BBQ', title: 'me, Scrott, Jennifer', subtitle: "Wish I could come, but I'm out of town this weekend." },
        { avatar: '/static/doc-images/lists/3.jpg', action: '6 hr', headline: 'Oui oui', title: 'Sandra Adams', subtitle: "Do you have Paris recommendations? Have you ever been?" },
        { avatar: '/static/doc-images/lists/4.jpg', action: '12 hr', headline: 'Birthday gift', title: 'Trevor Hansen', subtitle: "Have any ideas about what we should get Heidi for her birthday?" },
        { avatar: '/static/doc-images/lists/5.jpg', action: '18hr', headline: 'Recipe to try', title: 'Britta Holt', subtitle: "We should eat this: Grate, Squash, Corn, and tomatillo Tacos." },
      ],
    }
  },
  computed: {
    user(){
      return this.$store.state.user
    },
  },
  methods: {
    async post(){
    }
  }
}
</script>

<style lang="stylus" scoped>
.canvas
  background-color #fff
  border-radius 2px
  padding 10px 15px
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  margin 5px
  /*height 100vh*/
</style>
