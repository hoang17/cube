<template lang="pug">
  .news-view.view
    //-transition(:name='transition')
    .news-list
      transition-group(tag='ul', name='item')
        li.news-item(v-for="item in displayedItems", :key="item.id")
          span.score(@click="setStar(item)")
            //-i.fa(:class="item.star ? 'fa-star' : 'fa-star-o'")
            img.icon(:src="item.icon", width="16", height="16")
          span.title
            router-link(:to="`/${type}/id/${item.id}/1`") {{ item.name }}
          span.host  - {{ item.privacy }} - {{ item.members.summary.total_count | formatNumber }}
      infinite-loading(showSpinner="true", :on-infinite='loadNextPage', ref='infiniteLoading')
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
      // transition: 'slide-left',
    }
  },
  computed: {
    displayedItems() {
      return this.$store.getters.activeGroups
    }
  },
  beforeMount () {
    if (this.$root._isMounted) {
      this.loadItems()
    }
  },
  methods: {
    setStar(item){
      item.star = !item.star
      this.$store.commit('setStar', {item, type: this.type})
    },
    async loadItems () {
      this.$bar.start()
      await this.$store.dispatch('getGroups')
      this.$bar.finish()
      this.$refs.infiniteLoading.$emit('in:loaded')
    },
    async loadNextPage() {
      if (this.displayedItems.length == 0) {
        return
      }
      let length = this.displayedItems.length
      await this.$store.dispatch('getMoreGroups')
      if (this.displayedItems.length > length) {
        this.$bar.finish()
        this.$refs.infiniteLoading.$emit('in:loaded')
      } else {
        this.$bar.finish()
        this.$refs.infiniteLoading.$emit('in:complete')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.news-view
  padding-top 10px
  /*transition all 0.4s ease-out*/
  ul
    list-style-type none
    padding 0

.news-list-nav
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
  border-radius 2px
  position absolute
  margin 0 0 80px 0
  width 100%
  /*transition all 0.4s ease-out*/
  ul
    list-style-type none
    padding 0
    margin 0

/*.slide-left-enter, .slide-right-leave-to
  opacity 0
  transform translate(30px, 0)

.slide-left-leave-to, .slide-right-enter
  opacity 0
  transform translate(-30px, 0)*/

/*.item-move, .item-enter-active, .item-leave-active
  transition all .5s cubic-bezier(.55,0,.1,1)*/

/*.item-enter
  opacity 0
  transform translate(30px, 0)*/

/*.item-leave-active
  position absolute
  opacity 0
  transform translate(30px, 0)*/

.news-item
  transition all 0.4s ease-out
  background-color #fff
  padding 10px 10px 10px 60px
  border-bottom 1px solid #eee
  position relative
  line-height 20px
  overflow hidden
  .score
    color #ff6600
    position absolute
    top 50%
    left 0
    width 60px
    text-align center
    margin-top -10px
    cursor pointer
    font-size 1.1em
  .meta, .host
    font-size .85em
    color #828282
    a
      color #828282
      text-decoration underline
      &:hover
        color #ff6600


.item-enter-active
  transform translate(30px, 0)
  /*transform translateY(30px)*/
  opacity 0

.item-leave-active
  transform translate(30px, 0)
  /*transform translateY(30px)*/
  position absolute
  opacity 0

</style>
