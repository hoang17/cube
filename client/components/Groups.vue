<template lang="pug">
  .news-view.view
    transition(:name='transition')
      .news-list(:key='displayedPage', v-if='displayedPage > 0')
        transition-group(tag='ul', name='item')
          li.news-item(v-for="(item, i) in displayedItems", :key="item.id")
            span.score {{ i + 1 }}
            span.title
              router-link(:to="`/${type}/id/${item.id}`") {{ item.name }}
            span.host  - {{ item.privacy }} - {{ item.ver }}
        infinite-loading(:on-infinite='onInfinite', ref='infiniteLoading')
</template>

<script>
export default {
  name: 'groups',
  title: 'Groups',
  asyncData ({ store, route }) {
    return store.dispatch('getGroups')
  },
  data() {
    return {
      type: this.$options.name,
      transition: 'slide-left',
      displayedPage: 1,
      displayedItems: this.$store.getters.activeGroups(1),
      page: 1
    }
  },
  computed: {
    groups () {
      return this.$store.state.groups
    },
    maxPage () {
      const { itemsPerPage, groups } = this.$store.state
      return Math.ceil(groups.length / itemsPerPage)
    },
  },
  beforeMount () {
    if (this.$root._isMounted) {
      this.loadItems()
    }
  },
  methods: {
    async loadItems () {
      this.$bar.start()
      await this.$store.dispatch('getGroups')
      this.displayedItems = this.$store.getters.activeGroups(this.page)
      this.$bar.finish()
      this.$refs.infiniteLoading.$emit('in:loaded')
    },
    onInfinite() {
      if (this.displayedItems.length == 0) {
        return
      }
      this.page++
      if (this.page <= this.maxPage) {
        this.displayedItems = this.$store.getters.activeGroups(this.page)
        this.$refs.infiniteLoading.$emit('in:loaded')
      } else {
        this.$refs.infiniteLoading.$emit('in:complete')
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
