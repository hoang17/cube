<template lang="pug">
li.page-item
  h3(v-if="i>0") {{ page.p }}
  ul
    li.news-item(v-for="(item, i) in page.c", :key="item.id")
      div.title
        div.avatar
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
      div.photo(v-if="item.full_picture")
        a(:href="'http://facebook.com/' + item.id", target='_blank', rel='noopener')
          img(:src="item.full_picture")
      div.photo(v-else-if="item.attachments && item.attachments.data[0].media")
        a(:href="'http://facebook.com/' + item.id", target='_blank', rel='noopener')
          img(:src="item.attachments.data[0].media.image.src")
</template>

<script>
import Vuesible from './Vuesible'

export default {
  mixins: [Vuesible()],
  props: {
		page: {
			type: Object,
			required: true
		},
    i: {
			type: Number,
			required: true
		},
  }
}
</script>

<style lang="stylus" scoped>
.page-item
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

.page-item
  padding 10px 0
  background-color #f2f3f5
  h3
    text-align center
    padding-bottom 20px
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
