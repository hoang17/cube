<template lang="pug">
  li.news-item
    .title
      .avatar
        a(:href="'http://facebook.com/' + item.from.id", target='_blank', rel='noopener')
          img(:src="item.from.picture.data.url")
      .from
        a(:href="'http://facebook.com/' + item.id", target='_blank', rel='noopener') {{ item.from.name }}
      .time
        router-link(:to="'/i/' + item.id") {{ item.created_time | timeAgo }}
      .text(v-if="item.message") {{ cropMsg }}
        span.more(v-if="isCropMsg", @click="full=!full")  see more
      .readtime(v-if="item.message && isCropMsg", @click="full=!full") {{ readingTime }} min read
      .meta(v-if="item.name && item.type!='photo'") {{ item.name }}
      .text.meta(v-if="description") {{ cropDesc }}
        span.more(v-if="isCropDesc", @click="desc=!desc")  see more
      .meta(v-if="item.story") {{ item.story }}
      .meta(v-if="item.type=='link'")
        a(:href="item.link", target='_blank', rel='noopener') {{ item.link | cropUrl }}
    .frame(v-if="item.source && item.source.includes('youtube.com/embed')")
      iframe(:src="item.source.replace('autoplay=1', 'autoplay=0')", frameborder="0", allowfullscreen="")
    .video(v-else-if="item.source")
      video(:src="item.source", controls="controls", :poster="item.full_picture", preload="metadata")
    .album(v-else-if="item.attachments")
      .media(v-for="a in item.attachments.data", :key="a.id")
        photo(v-if="a.media", :src="a.media.image.src", :id="item.id")
        .sub(v-else-if="a.subattachments", :class="{s4: a.subattachments.data.length > 4, s6: a.subattachments.data.length > 6}")
          photo(v-for="s in a.subattachments.data", :key="s.id", v-if="s.media", :src="s.media.image.src", :id="item.id")
          //-pre {{ a }}
    photo(v-else-if="item.full_picture", :id="item.id", :src="item.full_picture")
    .item-view-comments
      p.item-view-comments-header(v-if='item.comments && item.comments.summary.total_count > 0', @click='loadComments')
        | {{ open ? '▼' : '▶︎' }} {{ pluralize(item.comments.summary.total_count) }}
      p.item-view-comments-header(v-else, @click='loadComments')
        | {{ open ? '▼' : '▶︎' }} comment
      .loader(v-show="loader")
        spinner(:show='loader')
      ul.comment-children(v-show='open')
        comment(v-for='c in item.comments.data', :key='c.id', :comment='c')
        li.more-comment(v-if='item.comments.paging && item.comments.paging.next', @click="moreComments", v-show="!loading") view {{ moreCount }} more comments...
        li.loading(v-show="loading")
          spinner(:show="loading")
        comment-editor(:id="item.id", :user="user", @commentPosted="commentPosted")
</template>

<script>
import Comment from '../components/Comment'
import Photo from '../addons/Photo'
import Spinner from '../addons/Spinner'
import CommentEditor from '../addons/CommentEditor'
import axios from 'axios'
import { fetchComment } from '../api'
import _ from 'lodash'

export default {
  props: {
		item: Object,
  },
  components: {
    Comment, Photo, Spinner, CommentEditor
  },
  computed: {
    user(){
      return this.$store.state.user
    },
    readingTime(){
      return Math.round(this.count/200) || 1
    },
    count(){
      return this.item.message.trim().split(/\s+/).length
    },
    // percent(){
    //   return this.full || this.length*1.5 >= this.item.message.length ? 100 : Math.floor((this.length/this.item.message.length)*100)
    // },
    length(){
      return typeof window != 'undefined' && window.innerWidth <= 800 && window.innerHeight <= 600 ? 500 : 1000
    },
    isCropMsg(){
      return !this.full && this.item.message.length > this.length * 1.5
    },
    cropMsg(){
      return this.isCropMsg
        ? _.truncate(this.item.message, {
            'length': this.length,
            'separator': /,? +/
          })
        : this.item.message
    },
    isCropDesc(){
      return !this.desc && this.description.length > this.length * 1.5
    },
    cropDesc(){
      return this.isCropDesc
        ? _.truncate(this.description, {
            'length': this.length,
            'separator': /,? +/
          })
        : this.description
    },
    description(){
      return this.item.description ? this.item.description : this.item.attachments && !this.item.full_picture ? this.item.attachments.data[0].description : null
    },
    moreCount(){
      return this.item.comments.summary.total_count - this.item.comments.data.length
    }
  },
  data () {
    return {
      open: false,
      loader: false,
      loading: false,
      full: false,
      desc: false,
    }
  },
  methods: {
    pluralize: n => n + (n === 1 ? ' comment' : ' comments'),
    async loadComments(){
      this.open = !this.open
      if (!this.item.comments || this.item.comments.data.length == 0) {
        this.loader = true
        this.item.comments = await fetchComment(this.$store.state.token,this.item.id)
        this.loader = false
      }
    },
    async moreComments(){
      this.loading = true
      let res = await axios.get(this.item.comments.paging.next)
      this.item.comments.data = this.item.comments.data.concat(res.data.data)
      this.item.comments.paging.next = res.data.paging.next ? res.data.paging.next : null
      this.loading = false
    },
    async commentPosted(comment){
      this.open = true
      this.loader = true
      this.item.comments = await fetchComment(this.$store.state.token,this.item.id)
      this.loader = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.news-item
  background-color #fff
  padding 10px 10px 10px 70px
  position relative
  line-height 20px
  margin-bottom 15px
  border-radius 2px
  box-shadow 0 1px 2px rgba(0,0,0,0.1)
  /*border-bottom 1px solid #eee*/
  .video
    margin-top 10px
    video
      max-height 500px
      max-width 100%

  .frame
    margin-top 10px
    position relative
    padding-bottom 56.25%
    padding-top 25px
    height 0
    iframe
      position absolute
      top 0
      left 0
      width 100%
      height 100%

  .album
    .media
      .sub
        /*column-width 300px*/
        column-count 2
        column-gap 5px
        .photo
          padding 0
          /*max-width 48%
          float left
          margin-right 10px*/
      .s4
        column-count 3

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
    .from
      font-weight bold
      padding-top 3px
      margin-bottom 2px
    .time
      margin-bottom 5px
    .text
      margin-bottom 10px

  .meta, .host, .time
    font-size .9em
    color #828282
    a
      color #828282
      text-decoration underline
      &:hover
        color #ff6600

  .more
    color #ff6600
    cursor pointer

  .readtime
    cursor pointer
    margin 10px 0
    font-size 13px
    padding 5px .5em
    background-color #eee
    border-radius 2px


.item-view-comments
  position relative
  background-color #fff
  margin-top 10px
  padding 0
  .loader
    position absolute
    top 5px
    right 10px

.item-view-comments-header
  cursor pointer
  margin 0
  font-size 13px
  padding .7em 0
  position relative
  .spinner
    display inline-block
    margin -15px 0

.comment-children
  list-style-type none
  padding 0
  margin 0

.more-comment
  cursor pointer
  margin-top 10px
  font-size 13px
  padding 5px .5em
  background-color #eee
  border-radius 2px

.loading
  margin-top 10px
  padding 0
  background-color #eee
  border-radius 2px

pre
  margin-top 10px

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

    .video
      video
        width 100%
    .video
    .frame
      margin-left -10px
      margin-right -10px
    .album
      .media
        margin-left -10px
        margin-right -10px
        .sub
          column-count 2
          column-gap 5px
          .photo
            padding 0
            margin 0
        .s4
          column-count 2
        .s6
          column-count 2
</style>
