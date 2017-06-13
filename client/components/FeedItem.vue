<template lang="pug">
li.page-item
  h4(v-show="index>0") {{ page.p }}
  ul
    li.news-item(v-for="(item, i) in page.c", :key="item.id")
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
      .item-view-comments
        p.item-view-comments-header(v-if="item.comments.data.length")
          | {{ item.comments.summary.total_count }} comments
          //-spinner(:show='loading')
        ul.comment-children
          comment(v-for='c in item.comments.data', :key='c.id', :comment='c')
</template>

<script>
import Comment from '../components/Comment'
import Vuesible from '../addons/Vuesible'
import Photo from '../addons/Photo'

export default {
  mixins: [Vuesible()],
  props: {
		page: Object,
    index: Number,
  },
  components: {
    Comment, Photo
  }
}
</script>

<style lang="stylus" scoped>
.page-item
  background-color #f2f3f5
  h4
    text-align center
    padding 15px 0
    margin 0
  ul
    list-style-type none
    padding 0
    margin 0

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

  .title
    font-size .9em
    white-space pre-wrap
    word-wrap break-word

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

.item-view-comments
  background-color #fff
  margin-top 10px
  padding 0

.item-view-comments-header
  margin 0
  font-size 13px
  padding 1em 0
  position relative
  .spinner
    display inline-block
    margin -15px 0

.comment-children
  list-style-type none
  padding 0
  margin 0

@media (max-width 600px)
  .news-item
    padding-left 10px
    .photo
      margin-left -10px
      margin-right -10px
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
