<template lang="pug">
  .news-view.view
    .news-list-nav(@click.stop="")
      router-link(v-if='page == 2', :to="'/' + type") < prev
      router-link(v-else-if='page > 2', :to="'/' + type + '/' + (page - 1)") < prev
      a.disabled(v-else='') < prev
      span {{ page }}/{{ maxPage }}
      router-link(v-if='hasMore', :to="'/' + type + '/' + (page + 1)") more >
      a.disabled(v-else='') more >
    transition(:name='transition')
      .news-list(:key='displayedPage', v-if='displayedPage > 0')
        transition-group(tag='ul', name='item')
          li.news-item(v-for="(item, i) in displayedItems", :key="item.id")
            div.title
              div.avatar
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
        infinite-loading(:on-infinite='onInfinite', ref='infiniteLoading')
</template>

<script>
export default {
  name: 'feeds',
  title: 'Feeds',
  asyncData ({ store, route }) {
    return store.dispatch('getFeeds')
  },
  data() {
    const page = Number(this.$store.state.route.params.page || 1)
    const start = (page-1) * this.$store.state.itemsPerPage
    return {
      type: this.$options.name,
      transition: 'slide-right',
      offsetPage: page,
      displayedPage: page,
      displayedItems: this.$store.getters.activeFeeds(page, start)
    }
  },
  computed: {
    feeds () {
      return this.$store.state.feeds
    },
    page () {
      return Number(this.$store.state.route.params.page) || 1
    },
    maxPage () {
      const { itemsPerPage, feeds } = this.$store.state
      return Math.ceil(feeds.length / itemsPerPage)
    },
    hasMore () {
      return this.page < this.maxPage
    }
  },
  beforeMount () {
    if (this.$root._isMounted) {
      this.loadItems(this.page)
    }
  },
  watch: {
    page (to, from) {
      this.loadItems(to, from)
    }
  },
  methods: {
    async loadItems (to = this.page, from = -1) {
      if (this.page < 0 || this.page > this.maxPage) {
        this.$router.replace(`/${this.type}`)
        return
      }
      this.offsetPage = this.page
      this.$bar.start()
      this.transition = from === -1 ? null : to > from ? 'slide-left' : 'slide-right'
      const start = (this.page-1) * this.$store.state.itemsPerPage
      await this.$store.dispatch('getFeeds')
      this.displayedPage = to
      this.displayedItems = this.$store.getters.activeFeeds(this.page, start)
      this.$bar.finish()
    },
    async onInfinite() {
      if (this.displayedItems.length == 0) return

      this.offsetPage++
      console.log('onInfinite', this.offsetPage)

      const start = (this.page-1) * this.$store.state.itemsPerPage
      if (this.offsetPage <= this.maxPage) {
        this.displayedItems = this.$store.getters.activeFeeds(this.offsetPage, start)
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      } else {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      }
    }
    // async loadItems (to = this.page, from = -1) {
    //   this.$bar.start()
    //   await this.$store.dispatch('getFeeds')
    //   if (this.page < 0 || this.page > this.maxPage) {
    //     this.$router.replace(`/${this.type}`)
    //     return
    //   }
    //   this.transition = from === -1 ? null : to > from ? 'slide-left' : 'slide-right'
    //   this.displayedPage = to
    //   this.displayedItems = this.$store.getters.activeFeeds(this.page)
    //   this.$bar.finish()
    // }
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
  margin-bottom 10px
  padding 15px 30px
  text-align center
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  a
    margin 0 1em
  .disabled
    color #ccc

.news-list
  position absolute
  margin 0 0 80px 0
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
    font-size .9em
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
