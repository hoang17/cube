<template lang="pug">
  .news-view.view
    list-nav(:page="page", :maxPage="maxPage", @pageSelected="pageSelected", @nextPage="throttleNext", @previousPage="throttlePrev")
    transition(:name='transition')
      .news-list(:key='originPage')
        transition-group(tag='ul', name='item')
          feed-item(v-for="(p, i) in displayedItems", :page="p", :index="i", :key="p.p", :id="'p'+p.p", @center-appeared="pageChanged(p.p)")
        infinite-loading(:on-infinite='loadNextPage', ref='infiniteLoading')
</template>

<script>
import FeedItem from './FeedItem'
import ListNav from './ListNav'
import { throttle } from 'lodash'
import bluebird from 'bluebird'
import scrollTo from '../addons/Scroll'
const scroll = bluebird.promisify(scrollTo, { multiArgs: true })

export default {
  name: 'feeds',
  title: 'Feeds',
  components: {
    FeedItem,
    ListNav
  },
  asyncData ({ store, route }) {
    let  p = Number(route.params.page || 1)
    return store.dispatch('fetchFeeds', { offsetPage: p })
  },
  data() {
    let  p = Number(this.$store.state.route.params.page || 1)
    return {
      type: this.$options.name,
      // transition: 'slide-right',
      transition: 'fade',
      originPage: p,
      offsetPage: p,
      displayedItems: this.$store.getters.activeFeeds,
      throttlePrev: throttle(this.previousPage, 200, { leading: true }),
      throttleNext: throttle(this.nextPage, 200, { leading: true }),
    }
  },
  computed: {
    page () {
      return Number(this.$store.state.route.params.page) || 1
    },
    maxPage () {
      const { itemsPerPage, feedCount } = this.$store.state
      return Math.ceil(feedCount / itemsPerPage) || 1
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
        this.loadItems(to)
    }
  },
  methods: {
    async previousPage() {
      let p = this.page-1
      if (document.getElementById(`p${p}`))
        await this.scrollTo(p)
      else {
        this.loadItems(p)
        // await this.loadPreviousPage()
        // await this.scrollTo(p)
      }
    },
    async nextPage() {
      let p = this.page+1
      if (document.getElementById(`p${p}`))
        await this.scrollTo(p)
      else {
        await this.loadNextPage()
        await this.scrollTo(p)
      }
    },
    async loadItems (page) {
      if (page < 0 || page > this.maxPage) {
        this.$router.replace(`/${this.type}`)
        return
      }
      window.scroll(0,0)
      this.$bar.start()
      this.offsetPage = page
      this.displayedItems = []
      await this.$store.dispatch('fetchFeeds', { offsetPage: this.offsetPage })
      this.originPage = page
      this.$router.push({ params: { page }})
      this.displayedItems = this.$store.getters.activeFeeds
      this.$bar.finish()
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
    },
    async loadNextPage() {
      if (this.displayedItems.length == 0) return

      this.offsetPage++
      if (this.offsetPage <= this.maxPage) {
        this.$bar.start()
        await this.$store.dispatch('fetchMoreFeeds', { offsetPage: this.offsetPage })
        this.displayedItems = this.$store.getters.activeFeeds
        this.$bar.finish()
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      } else {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      }
    },
    async loadPreviousPage() {
      this.originPage--
      this.$router.push({ params: { page: this.originPage }})
      this.displayedItems = this.$store.getters.activeFeeds
    },
    pageChanged(page) {
      this.$router.push({ params: { page }})
    },
    async pageSelected(page){
      if (document.getElementById(`p${page}`))
        await this.scrollTo(page)
      else if (this.page+1 == page){
        await this.loadNextPage()
        await this.scrollTo(page)
      }
      else if (this.page-1 == page){
        await this.loadItems(page)
        // await this.loadPreviousPage()
        // await this.scrollTo(page)
      }
      else
        await this.loadItems(page)
    },
    scrollTo (page) {
      if (page == this.originPage) {
        return scroll('body')
      }
      var options = {
          easing: 'ease',
          offset: -10,
      }
      return scroll(`#p${page}`, 200, options)
    }
  }
}
</script>

<style lang="stylus" scoped>
.news-view
  padding-top 10px

.news-list
  background-color #fff
  border-radius 2px
  position absolute
  margin 10px 0 80px 0
  width 100%
  transition all .5s cubic-bezier(.55,0,.1,1)
  ul
    list-style-type none
    padding 0
    margin 0

.item-move, .item-enter-active, .item-leave-active
  transition all .5s cubic-bezier(.55,0,.1,1)

.item-enter-active, .item-leave-active
  transition all .2s ease

.item-enter, .item-leave-active
  opacity 0

/*.slide-left-enter, .slide-right-leave-to
  opacity 0
  transform translate(30px, 0)

.slide-left-leave-to, .slide-right-enter
  opacity 0
  transform translate(-30px, 0)

.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-active
  opacity 0

.item-move, .item-enter-active, .item-leave-active
  transition all .5s cubic-bezier(.55,0,.1,1)

.item-enter
  opacity 0
  transform translate(30px, 0)

.item-leave-active
  position absolute
  opacity 0
  transform translate(30px, 0)*/
</style>
