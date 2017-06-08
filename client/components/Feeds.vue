<template lang="pug">
  .news-view.view
    .nav-wrapper
      .news-list-nav(@click.stop="", v-sticky="{ stickyClass: 'sticky-header' }", v-if="maxPage")
        a(v-if='page > 1', @click.prevent="previousPage", href="") ←
        a.disabled(v-else='') ←
        span.mdl-selectfield
          select.mdc-select(v-model="selectedPage", @change="pageSelected")
            option(v-for="n in range", :value="n", :disabled="n=='...'") {{ n }}
        a(v-if='hasMore', @click.prevent="throttleNext", href="") →
        a.disabled(v-else='') →
    transition(:name='transition')
      .news-list(:key='originPage')
        transition-group(tag='ul', name='item')
          feed-item(v-for="p in displayedItems", :page="p", :key="p.p", :id="'p'+p.p", @page-changed="pageChanged", @center-appeared="pageChanged(p.p)")
        infinite-loading(:on-infinite='loadNextPage', ref='infiniteLoading')
</template>

<script>
import Sticky from './Sticky'
import FeedItem from './FeedItem'
import { range, union, throttle } from 'lodash'
import bluebird from 'bluebird'
import scrollTo from './Scroll'
const scroll = bluebird.promisify(scrollTo, { multiArgs: true })

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
      selectedPage: p,
      displayedItems: this.$store.getters.activePageFeeds(p),
      pageScroll: false,
      throttlePrev: throttle(this.previousPage, 200, { leading: true }),
      throttleNext: throttle(this.nextPage, 200, { leading: true }),
    }
  },
  computed: {
    range() {
      let delta = 100
      if (this.maxPage <= delta + 20)
        return range(1, this.maxPage+1)
      let begin = this.page-delta > 0 ? this.page-delta : 1
      let end = this.page+delta > this.maxPage ? this.maxPage : this.page+delta
      let middle = range(begin, end+1)
      let first = range(1, 6)
      let last = range(this.maxPage-5, this.maxPage+1)

      if (begin <= 6)
        return [...union(first, middle), '...', ...last]

      if (end >= this.maxPage-6)
        return [...first, '...', ...union(middle, last)]

      return [...first, '...', ...middle, '...', ...last]
    },
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
      this.selectedPage = to
      if (!this.$store.state.route.params.page)
        this.loadItems(to, false)
    },
  },
  methods: {
    async previousPage() {
      let p = this.page-1
      if (document.getElementById(`p${p}`))
        await this.scrollTo(p)
      else {
        this.loadItems(p, false)
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
      this.displayedItems = await this.$store.getters.activePageFeeds(to)
      this.$bar.finish()
      this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      scroll('body')
    },
    async loadNextPage() {
      if (this.displayedItems.length == 0) {
        return
      }
      this.offsetPage++
      if (this.offsetPage <= this.maxPage) {
        this.displayedItems = await this.$store.getters.activePageFeeds(this.offsetPage, this.originPage)
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      } else {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      }
    },
    async loadPreviousPage() {
      this.originPage--
      this.selectedPage = this.originPage
      this.$router.push({ params: { page: this.originPage }})
      this.displayedItems = await this.$store.getters.activePageFeeds(this.offsetPage, this.originPage)
    },
    pageChanged(page) {
      this.selectedPage = page
      this.$router.push({ params: { page }})
    },
    async pageSelected(){
      if (document.getElementById(`p${this.selectedPage}`))
        await this.scrollTo(this.selectedPage)
      else if (this.page+1 == this.selectedPage){
        await this.loadNextPage()
        await this.scrollTo(this.selectedPage)
      }
      else if (this.page-1 == this.selectedPage){
        await this.loadPreviousPage()
        await this.scrollTo(this.selectedPage)
      }
      else
        await this.loadItems(this.selectedPage, false)
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
  font-family "HelveticaNeue-CondensedBold", "Helvetica Neue", Arial, sans-serif
  font-weight 500
  font-size 18px
  margin-bottom 10px
  padding 10px 30px
  text-align center
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  a
    font-size 24px
    margin 0 1em
  .disabled
    color #ccc

  select
    font-size 22px
    background-color transparent
    color #666
    border none
    border-bottom 1px solid rgba(0,0,0, 0.12)
    padding 4px 17px 4px 2px
    border-radius 0
    &:focus
      outline none

  .mdl-selectfield
    position relative
    select
      -webkit-appearance none
      -moz-appearance none
      appearance none
    &:after
      position absolute
      top 0.55em
      right 0.1em
      width 0
      height 0
      padding 0
      content ''
      border-left .25em solid transparent
      border-right .25em solid transparent
      border-top 0.375em solid #ccc
      pointer-events none

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
</style>
