<template lang="pug">
  .news-view
    .info-box(@click="expand=!expand")
      b
        img.icon(:src="account.icon", width="16", height="16", v-if="account && account.icon")
        |  {{ name }}
    .comment
      .avatar
        img(:src="profilePicture")
      .text
        .area
          textarea(v-autosize="", placeholder="Write a new post...", v-model="message")
      button.post(type='submit', value='Post', name='submit', @click='post', :disabled="this.message.trim().length==0") Post
</template>

<script>
import { postStatus } from '../api'

export default {
  asyncData ({ store, route }) {
    return store.dispatch('fetchObj', {id: route.params.id })
  },
  data() {
    return {
      expand: false,
      message: '',
    }
  },
  computed: {
    profilePicture(){
      return this.type == 'pages' ? this.account.picture.data.url : this.user.profile.picture
    },
    token(){
      return this.type == 'pages' ? this.account.access_token : this.$store.state.token
    },
    user(){
      return this.$store.state.user
    },
    name(){
      return this.account ? this.account.name : this.user.profile.name
    },
    id () {
      return this.$route.params.id ? this.$route.params.id : 'me'
    },
    account () {
      let id = this.id
      let list = []
      if (this.type == 'groups') {
        list = this.$store.state.groups.data
      } else if (this.type == 'likes'){
        list = this.$store.state.likes.data
      } else if (this.type == 'pages') {
        list = this.$store.state.pages.data
      }
      return list.filter(function(e){
        return e.id == id
      })[0]
    },
    type () {
      return this.$route.params.type
    },
  },
  beforeMount () {
    if (this.$root._isMounted) {
      this.$store.dispatch('fetchObj', {id: this.$route.params.id })
    }
  },
  methods: {
    async post(){
      let m = this.message
      this.message = ''
      let status = await postStatus(this.token, this.id, m)
      status.message = m
    }
  }
}
</script>

<style lang="stylus" scoped>
.info-box
  background-color #fff
  border-radius 2px
  padding 10px 15px
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  margin 10px 0
  .icon
    display inline-block
    margin-right 2px
    margin-top -2px
  .meta
    font-size .8em
    color #828282
    margin-top 5px
  .about
    margin-top 10px
    font-size .8em
    white-space pre-wrap
    word-wrap break-word

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

  .text
    font-size 13px
    white-space pre-wrap
    overflow-wrap break-word
    word-wrap break-word
    /*padding-right 50px*/
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
    top 5px
    /*right 0*/
    /*position absolute*/
    font-family sans-serif
    width 146px
    height 32px
    float right
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
