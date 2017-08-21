<template lang="pug">
  v-app
    .control
      cb
      ub(v-if="activeCube", :cube='activeCube', @done="deselectCube", @remove="removeCube")
    .canvas
      v-layout(row, wrap)
        v-flex(xs12, md8, offset-md2)

          component(v-for="cube in cubes", :cube="cube", :is="cube.type", :key="cube.id", :class="cube.class", :select="selectCube", :deselect="deselectCube") {{ cube.content }}

          v-card
            v-toolbar.blue(dark)
              v-btn(icon, light)
                v-icon arrow_back
              v-toolbar-title Application
              v-spacer
              v-btn(icon, light)
                v-icon more_vert
            v-card-text
              h1.title Search for new keywords using a phrase, website or category
              h2.subheading.mb-5 Enter one or more of the following
              v-text-field(label='Your product or service', value='Grocery delivery', hint='For example, flowers or used cars', persistent-hint)
              v-text-field(label='Your landing page', hint='www.example.com/page', persistent-hint)
              v-select(label='Your product category', hint='Enter or select a product category', persistent-hint, :items='options', v-model='select')

          v-card
            v-card-text
              h1.title Personal Info
              v-text-field.mt-5(label='First name', v-model='first', required)
              v-text-field(label='Middle name', hint='example of helper text only on focus', v-model='middle')
              v-text-field(label='Last name', hint='example of persistent helper text', persistent-hint, v-model='last', required)
              small * required field

          v-card.grey.lighten-4.elevation-1
            v-card-text
              label Prefix for dollar currency
              v-text-field(label='Amount', value='10.00', prefix='$')
              label Suffix for weight
              v-text-field(label='Weight', value='28.00', suffix='lbs')
              label Suffix for email domain
              v-text-field(label='Email address', value='example', suffix='@gmail.com')
              label Suffix for time zone
              v-text-field(label='Label Text', value='12:30:00', type='time', suffix='PST')

          v-text-field(name='input-2', label='Enter Focus')

          v-card.grey.lighten-4.elevation-1
            v-card-text
              v-text-field#testing(name='input-1', label='Label Text')
              v-text-field(name='input-2', label='Enter Focus')
              v-text-field(name='input-3', label='Label Text', value='Input text')
              v-text-field(name='input-3', label='Label Text', value='Input text', disabled)

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
</template>

<script>
export default {
  asyncData ({ store, route }) {
    return store.dispatch('fetchCubes')
  },
  components: {
    // 'btn': () => import('./Button'),
    'ub': () => import('./UtilBox'),
    'cb': () => import('./CubesBox')
  },
  data() {
    return {
      activeCube: null,
      first: '',
      middle: '',
      last: '',
      select: [],
      options: [
        { value: 1, text: 'Option 1' },
        { value: 2, text: 'Option 2' },
        { value: 3, text: 'Option 3' }
      ],
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
    cubes(){
      return this.$store.getters.cubes
    }
  },
  methods: {
    selectCube(cube){
      if (this.activeCube)
        this.activeCube.active = false
      this.activeCube = cube
      this.activeCube.active = true
    },
    deselectCube(){
      this.activeCube = null
    },
    removeCube(){
      let index = this.$store.state.cubes.indexOf(this.activeCube)
      this.$store.state.cubes.splice(index, 1)
      this.activeCube = null
    },
  }
}
</script>

<style lang="stylus" scoped>
.canvas
  background-color #fff
  margin-left 300px
  margin-right 28em

  .card
    margin 20px auto

.control
  position fixed
  pointer-events none
  left 0
  top 0
  width 100%
  height 100%
  z-index 10000
  outline 0
</style>
