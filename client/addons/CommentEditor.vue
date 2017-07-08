<template lang="pug">
  li.comment
    .avatar
      a(:href="'http://facebook.com/' + user.id", target='_blank', rel='noopener')
        img(:src="user.profile.picture")
    //-span.by
      router-link(:to="'/user/' + user.id") {{ user.profile.name }}
    .text
      .area
        textarea(v-autosize="", placeholder="Write a comment...", v-model="message")
      button.post(type='submit', value='Post', name='submit', @click='post', :disabled="this.message.trim().length==0") Post
</template>

<script>
import { postComment } from '../api'

export default {
  props: {
    id: String,
    user: Object,
  },
  data() {
    return {
      message: '',
    }
  },
  methods: {
    async post(){
      let m = this.message
      this.message = ''
      let comment = await postComment(this.$store.state.token,this.id,m)
      comment.message = m
      this.$emit('commentPosted', comment)
    }
  }
}
</script>

<style lang="stylus" scoped>
.comment
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
  .time
    color #828282
    font-size .8em
  .by
    a
      font-size 13px
      font-weight bold
  .text
    font-size 13px
    white-space pre-wrap
    overflow-wrap break-word
    word-wrap break-word
    padding-right 50px
    a:hover
      color #ff6600
    .area
      textarea
        resize: none
        width 100%
        height 44px
        border 1px solid #dddfe2
        border-radius 2px
        -webkit-appearance none
        box-shadow inset 0 1px 2px rgba(0,0,0,.1)
    button.post
      top 10px
      right 0
      position absolute
      font-family sans-serif
      width 46px
      height 42px
      box-shadow 0 1px 2px rgba(0,0,0,.1)
      text-shadow 0 -1px rgba(0, 0, 0, .25)
      border none
      border-radius 3px
      box-sizing border-box
      -webkit-user-select none
      color #fff
      -webkit-appearance none
      background #5b93fc
      display inline-block
      font-size 12px
      line-height 28px
      overflow visible
      padding 0 9px
      text-align center
      vertical-align top
      white-space nowrap
      font-weight bold
    button[disabled]
      background-image linear-gradient(rgba(255, 255, 255, .9), rgba(255, 255, 255, 0))
      background-color #f6f7f9
      color #bec2c9
      text-shadow none
</style>
