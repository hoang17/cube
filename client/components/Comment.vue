<template lang="pug">
  li.comment(v-if='comment')
    .avatar(v-if="comment.from.picture")
      a(:href="'http://facebook.com/' + comment.from.id", target='_blank', rel='noopener')
        img(:src="comment.from.picture.data.url")
    span.by
      router-link(:to="'/user/' + comment.from.id") {{ comment.from.name }}
      //-|       {{ comment.created_time | timeAgo }} ago
    span.text  {{ comment.message }}
    img.media(v-if="comment.attachment && comment.attachment.media", :src="comment.attachment.media.image.src", :class="comment.attachment.type")
    .toggle(v-if='comment.comment_count > 0', @click='open = !open')
      | {{ open ? '▼' : '▶︎' }} {{ pluralize(comment.comment_count) }}
    ul.comment-children(v-show='open', v-if='comment.comment_count > 0 && comment.comments')
      comment(v-for='c in comment.comments.data', :key='c.id', :comment='c')
</template>

<script>
export default {
  name: 'comment',
  props: ['comment'],
  data () {
    return {
      open: false
    }
  },
  // computed: {
  //   comment () {
  //     return this.$store.state.items[this.id]
  //   }
  // },
  methods: {
    pluralize: n => n + (n === 1 ? ' reply' : ' replies')
  }
}
</script>

<style lang="stylus" scoped>
.comment
  /*border-top 1px solid #eee*/
  font-size 13px
  position relative
  padding 5px 2px 5px 40px
  min-height 45px
  .media
    max-width 100%
    max-height 300px
    display block
  .sticker
    max-width 80px
    max-height 80px

  .comment-children
    padding-left 0
    font-size 13px
    list-style-type none
    .comment
      font-size 12px
      padding 5px 2px 5px 32px
      min-height 40px
      .avatar
        margin-top 4px
        width 25px
        height 25px
        /*border-radius 50%*/
        /*overflow hidden*/

  .avatar
    left 0
    margin-top 4px
    width 32px
    height 32px
    position absolute
    /*border-radius 50%*/
    /*overflow hidden*/
    img
      width 100%

  .by, .text, .toggle
    font-size .9em
    margin 0.3em 0
  .by
    color #828282
    a
      font-size 13px
      font-weight bold
  .text
    font-size 13px
    white-space pre-wrap
    overflow-wrap break-word
    word-wrap break-word
    a:hover
      color #ff6600
    pre
      white-space pre-wrap
  .toggle
    /*background-color #eee*/
    padding .1em 0
    border-radius 2px
    color #828282
    cursor pointer
    /*&.open
      padding 0
      background-color transparent
      margin-bottom -0.5em*/

@media (max-width 600px)
  .comment
    .comment-children
      /*border-left 2px solid #eee
      border-bottom 1px solid #eee*/
      /*padding-left 3px*/
      /*margin-left -30px*/
    .toggle
      /*margin-left -40px*/
</style>
