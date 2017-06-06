<template lang="pug">
  .news-view.view
    .nav-wrapper
      .news-list-nav(@click.stop="" v-sticky="{ stickyClass: 'sticky-header' }")
        h3
          a(v-if='page > 1', @click.prevent="previousPage", href="") ←
          a.disabled(v-else='') ←
          | {{ page }}
          a(v-if='hasMore', @click.prevent="nextPage", href="") →
          a.disabled(v-else='') →
    transition(:name='transition')
      .news-list(:key='originPage')
        transition-group(tag='ul', name='item')
          feed-item(v-for="p in displayedItems", :page="p", :key="p.p", :id="'p'+p.p", @page-changed="pageChanged", @center-appeared="pageChanged(p.p)")
        infinite-loading(:on-infinite='onInfinite', ref='infiniteLoading')
</template>

<script>
import Sticky from './Sticky'
import FeedItem from './FeedItem'
import VueScrollTo from 'vue-scrollto'

const scrollTo = function(page) {
  var options = {
      easing: 'ease',
      offset: -10,
      // onDone: function() {
      //   // scrolling is done
      // },
      // onCancel: function() {
      //   // scrolling has been interrupted
      // }
  }
  VueScrollTo.scrollTo(`#p${page}`, 500, options)
}

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
    let  p = Number(this.$store.state.route.params.page || 1)
    return {
      type: this.$options.name,
      transition: 'slide-right',
      offsetPage: p,
      originPage: p,
      displayedItems: this.$store.getters.activePageFeeds(p),
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
    console.log('beforeMount', this.page)
    if (this.$root._isMounted) {
      this.loadItems(this.page)
    }
  },
  watch: {
    page (to, from) {
      if (!this.$store.state.route.params.page)
        this.loadItems(to, false)
    }
  },
  methods: {
    async previousPage() {
      let p = this.page-1
      if (document.getElementById(`p${p}`))
        scrollTo(p)
      else {
        // await this.onInfinite()
        this.loadItems(p, false)
      }
    },
    async nextPage() {
      let p = this.page+1
      if (document.getElementById(`p${p}`))
        scrollTo(p)
      else {
        await this.onInfinite()
        scrollTo(p)
        // this.loadItems(p)
      }
    },
    async loadItems (to, next = true) {
      this.offsetPage = to
      this.$bar.start()
      this.transition = next ? 'slide-left' : 'slide-right'
      await this.$store.dispatch('getFeeds')
      if (to < 0 || to > this.maxPage) {
        this.$router.replace(`/${this.type}`)
        return
      }
      this.originPage = to
      this.$router.push({ params: { page: to }})
      this.displayedItems = this.$store.getters.activePageFeeds(to)
      this.$bar.finish()
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      window.scrollTo(0, 0)
    },
    async onInfinite() {
      if (this.displayedItems.length == 0) {
        return
      }
      this.offsetPage++
      if (this.offsetPage <= this.maxPage) {
        this.displayedItems = this.$store.getters.activePageFeeds(this.offsetPage, this.originPage)
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      } else {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      }
    },
    pageChanged(page) {
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
  z-index 999
  position relative

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
  margin -45px 0 80px 0
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
