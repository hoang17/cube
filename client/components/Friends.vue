<template lang="pug">
  .news-view.view
    //- .news-list-nav
    //-   router-link(v-if='page == 2', :to="'/' + type") < prev
    //-   router-link(v-else-if='page > 2', :to="'/' + type + '/' + (page - 1)") < prev
    //-   a.disabled(v-else='') < prev
    //-   span {{ page }}/{{ maxPage }}
    //-   router-link(v-if='hasMore', :to="'/' + type + '/' + (page + 1)") more >
    //-   a.disabled(v-else='') more >
    transition(:name='transition')
      .news-list(:key='displayedPage', v-if='displayedPage > 0')
        transition-group(tag='ul', name='item')
          li.news-item(v-for="(item, i) in displayedItems", :key="item.id")
            span.score {{ i + 1 }}
            span.title
              a(:href="'http://facebook.com/' + item.id", target='_blank', rel='noopener') {{ item.name }}
        infinite-loading(:on-infinite='onInfinite', ref='infiniteLoading')
</template>

<script>
export default {
  name: 'friends',
  title: 'Friends',
  asyncData ({ store, route }) {
    return store.dispatch('getFriends')
  },
  data() {
    return {
      type: this.$options.name,
      transition: 'slide-right',
      displayedPage: 1,
      displayedItems: this.$store.getters.activeFriends(1),
      page: 1
    }
  },
  computed: {
    friends () {
      return this.$store.state.friends
    },
    maxPage () {
      const { itemsPerPage, friends } = this.$store.state
      return Math.ceil(friends.length / itemsPerPage)
    },
  },
  beforeMount () {
    if (this.$root._isMounted) {
      this.loadItems()
    }
  },
  // watch: {
  //   page (to, from) {
  //     this.loadItems()
  //   }
  // },
  methods: {
    async loadItems () {
      this.$bar.start()
      await this.$store.dispatch('getFriends')
      this.displayedItems = this.$store.getters.activeFriends(this.page)
      this.$bar.finish()
    },
    onInfinite() {
      this.page++
      if (this.page <= this.maxPage) {
        this.displayedItems = this.$store.getters.activeFriends(this.page)
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:loaded')
      } else {
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:complete')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.news-view
  padding-top 10px

.news-list-nav, .news-list
  background-color #fff
  border-radius 2px

.news-list-nav
  margin-bottom 10px
  padding 15px 30px
  position fixed
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

.news-item
  background-color #fff
  padding 10px 10px 10px 60px
  border-bottom 1px solid #eee
  position relative
  line-height 20px
  .score
    color #ff6600
    position absolute
    top 50%
    left 0
    width 60px
    text-align center
    margin-top -10px
  .meta, .host
    font-size .85em
    color #828282
    a
      color #828282
      text-decoration underline
      &:hover
        color #ff6600

</style>
