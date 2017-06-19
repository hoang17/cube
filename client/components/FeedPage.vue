<template lang="pug">
  li.page-item
    h4(v-show="!first") {{ index }}
    ul
      feed-item.news-item(v-for="item in page", :key="item.id", :item="item")
</template>

<script>
import FeedItem from './FeedItem'
import Vuesible from '../addons/Vuesible'

export default {
  mixins: [Vuesible()],
  props: {
		page: Array,
    index: Number,
    first: Boolean,
  },
  components: {
    FeedItem
  }
}
</script>

<style lang="stylus" scoped>
.page-item
  background-color #f2f3f5
  h4
    text-align center
    padding 0 0 15px 0
    margin 0
  ul
    list-style-type none
    padding 0
    margin 0
</style>
