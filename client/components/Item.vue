<template lang="pug">
  .news-view
    ul(v-if="item")
      feed-item.news-item(:item="item", :open="true", :full="true")
</template>

<script>
import FeedItem from './FeedItem'

export default {
  name: 'item',
  title: 'Item',
  components: {
    FeedItem
  },
  asyncData ({ store, route }) {
    return store.dispatch('fetchItem', {id: route.params.id })
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    id () {
      return this.$route.params.id
    },
    item(){
      return this.$store.state.item
    }
  },
  beforeMount() {
    if (this.$root._isMounted) {
      this.loadItem()
    }
  },
  beforeDestroy() {
    this.$store.commit('setItem', null)
  },
  methods: {
    async loadItem() {
      this.$bar.start()
      await this.$store.dispatch('fetchItem', {id: this.id })
      this.$bar.finish()
    },
  }
}
</script>

<style lang="stylus" scoped>
.news-view
  padding-top 10px
  transition all .5s cubic-bezier(.55,0,.1,1)
  ul
    list-style-type none
    padding 0
    margin 0
</style>
