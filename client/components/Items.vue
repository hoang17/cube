<template lang="pug">
  .news-view
    info-box(:account="account", :type="type")
    .new-post
      router-link(:to="'/'+ type + '/' + account.id + '/new'") New Post
    list-nav(:id="id", :type="type", :page="page", :maxPage="maxPage", @pageSelected="pageSelected", @nextPage="throttleNext", @previousPage="throttlePrev")
    transition(:name='transition')
      .news-list(:key='originPage')
        transition-group(tag='ul', name='item', v-if="Object.keys(displayedItems).length>0")
          feed-page(v-for="(p, i) in displayedItems", :account="account", :type="type", :page="p", :first="Object.keys(displayedItems)[0]==i", :index="Number(i)", :key="i", :id="'p'+i", @center-appeared="pageChanged(i)")
    infinite-loading(:on-infinite='onInfinite', ref='infiniteLoading')
    content-placeholder(v-show="loading", :row="row", :page ="offsetPage", :showNumber="offsetPage>originPage")
</template>

<script>
import FeedPage from './FeedPage'
import ListNav from './ListNav'
import InfoBox from '../addons/InfoBox'
import { throttle } from 'lodash'
import bluebird from 'bluebird'
import scrollTo from '../addons/Scroll'
const scroll = bluebird.promisify(scrollTo, { multiArgs: true })
import ContentPlaceholder from '../addons/ContentPlaceholder'

export default {
  name: 'items',
  title(){
    return this.account.name
  },
  components: {
    FeedPage,
    ListNav,
    InfoBox,
    ContentPlaceholder
  },
  asyncData ({ store, route }) {
    let p = Number(route.params.page || 1)
    return store.dispatch('fetchItems', {id: route.params.id, type: route.params.type, page: p })
  },
  data() {
    let p = Number(this.$route.params.page || 1)
    return {
      row: 5,
      loading: true,
      transition: 'fade',
      originPage: p,
      offsetPage: p,
      throttlePrev: throttle(this.previousPage, 200, { leading: true }),
      throttleNext: throttle(this.nextPage, 200, { leading: true })
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    account () {
      return this.$store.state.account
    },
    type () {
      return this.$route.params.type
    },
    page () {
      return Number(this.$route.params.page) || 1
    },
    maxPage () {
      return 999
    },
    displayedItems(){
      return this.$store.getters.activeItems
    }
  },
  beforeMount () {
    // if (this.$store.state.id != this.$route.params.id){
    //   this.$store.commit('setItems', { items:[] })
    //   if (this.$root._isMounted) {
    //     this.loadItems(this.page)
    //   }
    //   this.$store.state.id = this.$route.params.id
    // }
    if (this.$root._isMounted) {
      this.loadItems(this.page)
    }
  },
  beforeDestroy () {
    this.$store.commit('setItems', { items:[] })
  },
  watch: {
    page (to, from) {
      if (!this.$route.params.page)
        this.loadItems(to)
    }
  },
  methods: {
    onInfinite(){
      if (this.$bar.show) return
      this.row = 2
      this.loadNextPage()
    },
    async nextPage() {
      let p = this.page+1
      if (document.getElementById(`p${p}`))
        await this.scrollTo(p)
      else {
        this.row = 5
        this.loadNextPage()
        await scroll('.timeline-wrapper', 1, { offset: -20 })
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
      // this.displayedItems = []
      this.offsetPage = page
      this.originPage = page
      this.$router.push({ params: { page }})
      await this.$store.dispatch('fetchItems', {id: this.id, type: this.type, page: this.offsetPage })
      // this.displayedItems = this.$store.getters.activeItems
      this.$bar.finish()
      this.$refs.infiniteLoading.$emit('in:loaded')
    },
    async loadNextPage() {
      // if (this.displayedItems.length == 0) return
      this.$bar.start()
      this.offsetPage++
      this.$router.push({ params: { page: this.offsetPage }})
      let length = Object.keys(this.displayedItems).length
      await this.$store.dispatch('fetchMoreItems', {id: this.id, type: this.type, page: this.offsetPage })
      if (Object.keys(this.displayedItems).length > length) {
        // this.displayedItems = this.$store.getters.activeItems
        this.$bar.finish()
        this.$refs.infiniteLoading.$emit('in:loaded')
      } else {
        this.$bar.finish()
        this.$refs.infiniteLoading.$emit('in:complete')
        this.loading = false
      }
    },
    async loadPreviousPage() {
      this.originPage--
      this.$router.push({ params: { page: this.originPage }})
      // this.displayedItems = this.$store.getters.activeItems
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
      return scroll(`#p${page}`, 1, { offset: -20 })
    }
  }
}
</script>

<style lang="stylus" scoped>
.news-view
  padding-top 10px

.new-post
  background-color #fff
  border-radius 2px
  padding 10px 15px
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  margin-bottom 10px

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
