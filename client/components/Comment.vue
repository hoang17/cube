<template lang="pug">
  li.comment(v-if='comment')
    .avatar
      a(:href="'http://facebook.com/' + comment.from.id", target='_blank', rel='noopener')
        img(:src="comment.from.picture.data.url")
    span.by
      router-link(:to="'/user/' + comment.from.id") {{ comment.from.name }}
      //-|       {{ comment.created_time | timeAgo }} ago
    span.text  {{ comment.message }}
    .toggle(v-if='comment.comment_count > 0', @click='open = !open')
      | {{ open ? '▼' : '▶︎' }} {{ pluralize(comment.comment_count) }}
    ul.comment-children(v-show='open', v-if='comment.comment_count > 0')
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

  .comment-children
    /*margin-left 2em*/
    /*border-left 2px solid #eee*/
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

  .avatar
    left 0
    margin-top 4px
    width 32px
    height 32px
    position absolute
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
    background-color #eee
    padding .3em .5em
    border-radius 2px
    color #828282
    cursor pointer
    /*&.open
      padding 0
      background-color transparent
      margin-bottom -0.5em*/
</style>
