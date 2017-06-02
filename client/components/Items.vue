<template lang="pug">
  .news-view.view
    .news-list-nav(@click.stop="")
      button(v-if='canPrev' @click="prev") < prev
      a.disabled(v-else='') < prev
      span(style="white-space: pre-wrap") &emsp;&emsp;
      button(v-if='canNext' @click="next") next >
      a.disabled(v-else='') more >
    transition(:name='transition')
      .news-list(:key='id')
        transition-group(tag='ul', name='item')
          li.news-item(v-for="(item, i) in displayedItems", :key="item.id")
            p.title
              span.avatar
                a(:href="'http://facebook.com/' + item.id", target='_blank', rel='noopener')
                  img(:src="item.from.picture.data.url")
              span {{ item.from.name }}
              br(v-if="item.message")
              span(v-if="item.message") {{ item.message }}
              br(v-if="item.name")
              span.meta(v-if="item.name") {{ item.name }}
              br(v-if="item.description")
              span.meta(v-if="item.description") {{ item.description }}
              br(v-if="item.attachments && !item.full_picture")
              span.meta(v-if="item.attachments && !item.full_picture") {{ item.attachments.data[0].description }}
              br(v-if="item.story")
              span.meta(v-if="item.story") {{ item.story }}
              br(v-if="item.link")
              span.meta(v-if="item.link")
                a(:href="item.link", target='_blank', rel='noopener') {{ item.link }}
            div.photo(v-if="item.full_picture")
              a(:href="'http://facebook.com/' + item.id", target='_blank', rel='noopener')
                img(:src="item.full_picture")
            div.photo(v-else-if="item.attachments && item.attachments.data[0].media")
              a(:href="'http://facebook.com/' + item.id", target='_blank', rel='noopener')
                img(:src="item.attachments.data[0].media.image.src")
</template>

<script>
export default {
  name: 'items',
  title: 'Items',
  components: {
    // 'vue-select': VueSelect
  },
  asyncData ({ store, route }) {
    return store.dispatch('fetchItems', route)
  },
  data() {
    return {
      transition: 'slide-right',
      displayedItems: this.$store.getters.activeItems
    }
  },
  computed: {
    items () {
      return this.$store.state.items
    },
    id () {
      return this.$store.state.route.params.id
    },
    canNext () {
      return this.items.data.length == this.$store.state.itemsPerPage
    },
    canPrev () {
      return true
    }
  },
  methods: {
    async prev () {
      this.$bar.start()
      await this.$store.dispatch('fetchPrev')
      window.scrollTo(0, 0)
      this.transition = 'slide-right'
      this.displayedItems = this.$store.getters.activeItems
      this.$bar.finish()
    },
    async next () {
      this.$bar.start()
      await this.$store.dispatch('fetchNext')
      window.scrollTo(0, 0)
      this.transition = 'slide-left'
      this.displayedItems = this.$store.getters.activeItems
      this.$bar.finish()
    }
  }
}
</script>

<style lang="stylus">
@media (max-width 600px)
  body
    padding-top 0

  .navbar
    display none

  .container
    padding 7px
</style>

<style lang="stylus" scoped>
.news-view
  padding-top 10px

.news-list-nav, .news-list
  background-color #fff
  border-radius 2px

.news-list-nav
  padding 15px 30px
  position fixed
  text-align center
  top 55px
  left 0
  right 0
  z-index 998
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  a
    margin 0 1em
  .disabled
    color #ccc

.news-list
  position absolute
  margin 30px 0
  width 100%
  transition all .5s cubic-bezier(.55,0,.1,1)
  ul
    list-style-type none
    padding 0
    margin 0

.slide-left-enter, .slide-right-leave-to
  opacity 0
  transform translate(30px, 0)

.slide-left-leave-to, .slide-right-enter
  opacity 0
  transform translate(-30px, 0)

.item-move, .item-enter-active, .item-leave-active
  transition all .5s cubic-bezier(.55,0,.1,1)

.item-enter
  opacity 0
  transform translate(30px, 0)

.item-leave-active
  position absolute
  opacity 0
  transform translate(30px, 0)

@media (max-width 600px)
  .news-view
    padding-top 0
  .news-list
    margin 0
    padding-bottom 50px

  .news-list-nav
    position fixed
    top auto
    bottom 0px

  .photo
    margin-left -10px
    margin-right -10px

.news-item
  background-color #fff
  padding 10px 10px 10px 70px
  border-bottom 1px solid #eee
  position relative
  line-height 20px

  .avatar
    position absolute
    left 10px
    width 50px
    text-align center
    margin-top 5px

  img
    max-width 100%
    max-height 500px

  .photo
    img
      margin-top 5px

  .title
    font-size .95em
    white-space: pre-wrap
    word-wrap: break-word

    &::first-line
      font-weight bold
      line-height 28px

  .meta, .host
    font-size .85em
    color #828282
    a
      color #828282
      text-decoration underline
      &:hover
        color #ff6600

@media (max-width 600px)

  .news-item
    padding-left 10px

    .avatar
      position relative
      left 0
      width 40px
      float left
      margin-right 10px
      margin-bottom 3px

      img
        width 40px
</style>
