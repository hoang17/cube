<template lang="pug">
  .news-view.view
    .news-list-nav
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
            span.score {{ from + i + 1 }}
            span.title
              router-link(:to="`/${type}/id/${item.id}`") {{ item.name }}
              //- a(:href="'http://facebook.com/' + item.id", target='_blank', rel='noopener') {{ item.name }}
</template>

<script>
export default {
  name: 'groups',
  title: 'Groups',
  components: {
    // 'vue-select': VueSelect
  },
  asyncData ({ store, route }) {
    // return the Promise from the action
    return store.dispatch('getGroups')
  },
  data() {
    return {
      type: this.$options.name,
      transition: 'slide-right',
      displayedPage: Number(this.$store.state.route.params.page) || 1,
      displayedItems: this.$store.getters.activeGroups
    }
  },
  computed: {
    groups () {
      return this.$store.state.groups
    },
    page () {
      return Number(this.$store.state.route.params.page) || 1
    },
    maxPage () {
      const { itemsPerPage, groups } = this.$store.state
      return Math.ceil(groups.length / itemsPerPage)
    },
    from () {
      return (this.page-1) * this.$store.state.itemsPerPage
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
      this.$bar.start()
      await this.$store.dispatch('getGroups')
      if (this.page < 0 || this.page > this.maxPage) {
        this.$router.replace(`/${this.type}`)
        return
      }
      this.transition = from === -1 ? null : to > from ? 'slide-left' : 'slide-right'
      this.displayedPage = to
      this.displayedItems = this.$store.getters.activeGroups
      this.$bar.finish()
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
  padding 15px 30px
  position fixed
  text-align center
  top auto
  bottom 0px
  // top 55px
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
