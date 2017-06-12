<template lang="pug">
  .news-view.view
    list-nav(:page="page", :maxPage="maxPage", @pageSelected="pageSelected", @nextPage="throttleNext", @previousPage="throttlePrev")
    transition(:name='transition')
      .news-list(:key='originPage')
        transition-group(tag='ul', name='item')
          feed-item(v-for="(p, i) in displayedItems", :page="p", :index="i", :key="p.p", :id="'p'+p.p", @center-appeared="pageChanged(p.p)")
    infinite-loading(:on-infinite='loadNextPage', ref='infiniteLoading')
    content-placeholder(:page="offsetPage", :showNumber="offsetPage>originPage")
</template>

<script>
import FeedItem from './FeedItem'
import ListNav from './ListNav'
import { throttle } from 'lodash'
import bluebird from 'bluebird'
import scrollTo from '../addons/Scroll'
const scroll = bluebird.promisify(scrollTo, { multiArgs: true })
import ContentPlaceholder from '../addons/ContentPlaceholder'

export default {
  name: 'items',
  title: 'Items',
  components: {
    FeedItem,
    ListNav,
    ContentPlaceholder
  },
  asyncData ({ store, route }) {
    let  p = Number(route.params.page || 1)
    return store.dispatch('fetchItems', {id: route.params.id, offsetPage: p })
  },
  data() {
    let  p = Number(this.$store.state.route.params.page || 1)
    return {
      transition: 'fade',
      originPage: p,
      offsetPage: p,
      displayedItems: this.$store.getters.activeItems,
      throttlePrev: throttle(this.previousPage, 200, { leading: true }),
      throttleNext: throttle(this.nextPage, 200, { leading: true })
    }
  },
  computed: {
    id () {
      return this.$store.state.route.params.id
    },
    type () {
      return this.$store.state.route.params.type
    },
    page () {
      return Number(this.$store.state.route.params.page) || 1
    },
    maxPage () {
      return 999
    }
  },
  beforeMount () {
    console.log('beforeMount', this.page)
    if (this.$root._isMounted) {
      this.loadItems(this.page)
    }
  },
  beforeDestroy () {
    this.$store.commit('setItems', { items:[] })
  },
  watch: {
    page (to, from) {
      if (!this.$store.state.route.params.page)
        this.loadItems(to)
    }
  },
  methods: {
    async nextPage() {
      let p = this.page+1
      if (document.getElementById(`p${p}`))
        await this.scrollTo(p)
      else {
        await scroll('.timeline-wrapper', 1, { offset: -5 })
        // await this.loadNextPage()
        // await this.scrollTo(p)
      }
    },
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
    async loadItems(page) {
      if (page < 0 || page > this.maxPage) {
        this.$router.replace(`/${this.type}`)
        return
      }
      window.scroll(0,0)
      this.$bar.start()
      this.displayedItems = []
      this.offsetPage = page
      this.originPage = page
      this.$router.push({ params: { page }})
      await this.$store.dispatch('fetchItems', {id: this.id, offsetPage: this.offsetPage })
      this.displayedItems = this.$store.getters.activeItems
      this.$bar.finish()
      this.$refs.infiniteLoading.$emit('in:loaded')
    },
    async loadNextPage() {
      if (this.displayedItems.length == 0) return
      this.$bar.start()
      this.offsetPage++
      this.$router.push({ params: { page: this.offsetPage }})
      await this.$store.dispatch('fetchMoreItems', {id: this.id, offsetPage: this.offsetPage })
      if (this.$store.getters.activeItems.length > this.displayedItems.length) {
        this.displayedItems = this.$store.getters.activeItems
        this.$bar.finish()
        this.$refs.infiniteLoading.$emit('in:loaded')
      } else {
        this.$refs.infiniteLoading.$emit('in:complete')
      }
    },
    async loadPreviousPage() {
      this.originPage--
      this.$router.push({ params: { page: this.originPage }})
      this.displayedItems = this.$store.getters.activeItems
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
      return scroll(`#p${page}`, 1, { offset: -5 })
    }
  }
}
</script>

<style lang="stylus" scoped>
.news-view
  padding-top 10px

.news-list
  border-radius 2px
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
</style>
