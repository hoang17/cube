<template lang="pug">
  li.page-item
    h4(v-show="index>0") {{ page.p }}
    ul
      feed-item.news-item(v-for="item in page.c", :key="item.id", :item="item")
      //-li.news-item(v-for="(item, i) in page.c", :key="item.id")
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
        photo(v-if="item.full_picture", :id="item.id", :src="item.full_picture")
        photo(v-else-if="item.attachments && item.attachments.data[0].media", :id="item.id", :src="item.attachments.data[0].media.image.src")
        .item-view-comments(v-if='item.comments.data.length > 0')
          p.item-view-comments-header(@click='open = !open')
            | {{ open ? '▼' : '▶︎' }} {{ pluralize(item.comments.summary.total_count) }}
            //-spinner(:show='loading')
          ul.comment-children(v-show='open')
            comment(v-for='c in item.comments.data', :key='c.id', :comment='c')
</template>

<script>
import FeedItem from './FeedItem'
import Vuesible from '../addons/Vuesible'

export default {
  mixins: [Vuesible()],
  props: {
		page: Object,
    index: Number,
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
