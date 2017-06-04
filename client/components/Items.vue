<template lang="pug">
  .news-view.view
    .news-list-nav(@click.stop="")
      router-link(v-if='page == 2', :to="'/' + type + '/id/' + id") < prev
      router-link(v-else-if='page > 2', :to="'/' + type + '/id/' + id + '/' + (page - 1)") < prev
      a.disabled(v-else='') < prev
      span {{ page }}/{{ maxPage }}
      router-link(v-if='hasMore', :to="'/' + type + '/id/' + id + '/' + (page + 1)") more >
      a.disabled(v-else='') more >
    transition(:name='transition')
      .news-list(:key='displayedPage')
        transition-group(tag='ul', name='item')
            li.news-item(v-for="(item, i) in displayedItems", :key="item.id")
              .title
                .avatar
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
              .photo(v-if="item.full_picture")
                a(:href="'http://facebook.com/' + item.id", target='_blank', rel='noopener')
                  img(:src="item.full_picture")
              .photo(v-else-if="item.attachments && item.attachments.data[0].media")
                a(:href="'http://facebook.com/' + item.id", target='_blank', rel='noopener')
                  img(:src="item.attachments.data[0].media.image.src")
        infinite-loading(:on-infinite='onInfinite', ref='infiniteLoading')
            span(slot='no-more') You have reached the end, there is no more feeds to show ^^
        //- component(:is="componentType", :on-infinite='onInfinite', ref='infiniteLoading')
</template>

<script>
import InfiniteLoading from './InfiniteLoading'

export default {
  name: 'items',
  title: 'Items',
  components: {
    InfiniteLoading
  },
  asyncData ({ store, route }) {
    let offset = (route.params.page-1) * store.state.itemsPerPage || 0
    return store.dispatch('fetchItems', {id: route.params.id, offset: offset })
  },
  data() {
    return {
      offset: 0,
      // componentType: '',
      transition: 'slide-right',
      displayedPage: Number(this.$store.state.route.params.page) || 1,
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
    type () {
      return this.$store.state.route.params.type
    },
    page () {
      return Number(this.$store.state.route.params.page) || 1
    },
    maxPage () {
      return 100
      // const { itemsPerPage, items } = this.$store.state
      // return Math.ceil(items.length / itemsPerPage)
    },
    // offset () {
    //   return (this.page-1) * this.$store.state.itemsPerPage
    // },
    hasMore () {
      return this.page < this.maxPage
    }
  },
  // mounted(){
  //   console.log('@@@ mounted')
  //   this.componentType = 'infinite-loading'
  // },
  beforeMount () {
    console.log('@@@ beforeMount')
    if (this.$root._isMounted) {
      this.loadItems(this.page)
    }
  },
  beforeDestroy () {
    this.$store.commit('setItems', { items:[] })
  },
  watch: {
    page (to, from) {
      this.loadItems(to, from)
    }
  },
  methods: {
    async loadItems (to = this.page, from = -1) {
      this.$bar.start()
      this.transition = from === -1 ? null : to > from ? 'slide-left' : 'slide-right'
      this.displayedPage = this.maxPage+1
      this.displayedItems = []
      this.offset = (this.page-1) * this.$store.state.itemsPerPage
      await this.$store.dispatch('fetchItems', {id: this.id, offset: this.offset })
      if (this.page < 0 || this.page > this.maxPage) {
        this.$router.replace(`/${this.type}`)
        return
      }
      this.displayedPage = to
      this.displayedItems = this.$store.getters.activeItems
      this.$bar.finish()
    },
    async onInfinite() {
      console.log('onInfinite', this.displayedItems.length)
      if (this.displayedItems.length == 0) return

      this.offset = this.offset + this.$store.state.itemsPerPage
      await this.$store.dispatch('fetchMoreItems', {id: this.id, offset: this.offset})
      if (this.$store.getters.activeItems.length > this.displayedItems.length) {
        this.displayedItems = this.$store.getters.activeItems
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      } else {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      }
    },
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
  // top 55px
  top auto
  bottom 0px
  left 0
  right 0
  z-index 998
  box-shadow 0 1px 2px rgba(0,0,0,.5)
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
  .news-list
    padding-bottom 50px

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
