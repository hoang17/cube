<template lang="pug">
  .news-view.view
    .nav-wrapper
      .news-list-nav(@click.stop="" v-sticky="{ stickyClass: 'sticky-header' }")
        router-link(v-if='page > 1', :to="{ name: type, params: { page: page-1 }}") < prev
        a.disabled(v-else='') < prev
        span {{ page }}/{{ maxPage }}
        router-link(v-if='hasMore', :to="{ name: type, params: { page: page+1 }}") more >
        a.disabled(v-else='') more >
    transition(:name='transition')
      .news-list(:key='displayedPage', v-if='displayedPage > 0')
        transition-group(tag='ul', name='item')
          feed-item(v-for="page in displayedItems", :page="page", :key="page.p", :id="page.p", @page-changed="pageChanged", @center-appeared="pageChanged(page.p)")
          //- li.page-item(v-for="page in displayedItems", :key="page.p", :id="page.p")
          //-   h3 {{ page.p }}
          //-   ul
          //-     li.news-item(v-for="(item, i) in page.c", :key="item.id")
          //-       div.title
          //-         div.avatar
          //-           a(:href="'http://facebook.com/' + item.id", target='_blank', rel='noopener')
          //-             img(:src="item.from.picture.data.url")
          //-         span {{ item.from.name }}
          //-         br(v-if="item.message")
          //-         span(v-if="item.message") {{ item.message }}
          //-         br(v-if="item.name")
          //-         span.meta(v-if="item.name") {{ item.name }}
          //-         br(v-if="item.description")
          //-         span.meta(v-if="item.description") {{ item.description }}
          //-         br(v-if="item.attachments && !item.full_picture")
          //-         span.meta(v-if="item.attachments && !item.full_picture") {{ item.attachments.data[0].description }}
          //-         br(v-if="item.story")
          //-         span.meta(v-if="item.story") {{ item.story }}
          //-         br(v-if="item.link")
          //-         span.meta(v-if="item.link")
          //-           a(:href="item.link", target='_blank', rel='noopener') {{ item.link }}
          //-       div.photo(v-if="item.full_picture")
          //-         a(:href="'http://facebook.com/' + item.id", target='_blank', rel='noopener')
          //-           img(:src="item.full_picture")
          //-       div.photo(v-else-if="item.attachments && item.attachments.data[0].media")
          //-         a(:href="'http://facebook.com/' + item.id", target='_blank', rel='noopener')
          //-           img(:src="item.attachments.data[0].media.image.src")
        infinite-loading(:on-infinite='onInfinite', ref='infiniteLoading')
</template>

<script>
import Sticky from './Sticky'
import FeedItem from './FeedItem'

export default {
  name: 'feeds',
  title: 'Feeds',
  components: {
    FeedItem,
  },
  directives: {
    'sticky': Sticky,
  },
  asyncData ({ store, route }) {
    return store.dispatch('getFeeds')
  },
  data() {
    const page = Number(this.$store.state.route.params.page || 1)
    return {
      type: this.$options.name,
      transition: 'slide-right',
      offsetPage: page,
      displayedPage: page,
      displayedItems: this.$store.getters.activePageFeeds(page),
      pageScroll: false
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
    console.log('beforeMount', this.displayedPage)
    if (this.$root._isMounted) {
      this.loadItems(this.displayedPage)
    }
  },
  watch: {
    page (to, from) {
      // if (to != this.offsetPage)
      //   this.loadItems(to, from)
    }
  },
  methods: {
    async loadItems (to, from = -1) {
      this.offsetPage = to
      this.$bar.start()
      this.transition = from === -1 ? null : to > from ? 'slide-left' : 'slide-right'
      await this.$store.dispatch('getFeeds')
      if (to < 0 || to > this.maxPage) {
        this.$router.replace(`/${this.type}`)
        return
      }
      this.displayedPage = to
      this.displayedItems = this.$store.getters.activePageFeeds(this.displayedPage)
      this.$bar.finish()
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      window.scrollTo(0, 0)
    },
    async onInfinite() {
      if (this.displayedItems.length == 0) {
        return
      }
      this.offsetPage++
      // console.log('offset page', this.offsetPage)
      if (this.offsetPage <= this.maxPage) {
        this.displayedItems = this.$store.getters.activePageFeeds(this.offsetPage, this.displayedPage)
        // console.log(this.displayedItems.length)
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      } else {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      }
    },
    pageChanged(page) {
      // console.log('pageChanged', page)
      this.$router.push({ params: { page }})
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

.nav-wrapper
  height 55px

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

// @media (max-width 600px)
</style>
