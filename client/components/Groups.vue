<template lang="pug">
  #groups
    header.header
      nav.inner
        a(href='/')
    .news-view.view
      .news-list-nav
        a.disabled < prev
        span 1/25
        a(href='/top/2') more >
      .news-list
        ul
          li.news-item(v-for="(group, i) in groups")
            span.score {{ i + 1 }}
            span.title
              a(:href="'http://facebook.com/' + group.id", target='_blank', rel='noopener') {{ group.name }}
</template>

<script>
export default {
  name: 'groups',
  components: {
    // 'vue-select': VueSelect
  },
  data() {
    return {
      // date: 'yy-mm-dd',
      groups: [
        {id: 1, name: "tada"}
      ]
    }
  },
  methods: {
    // updateDate: function(date) {
    //   this.date = date
    // }
  }
}
</script>

<style lang="stylus" scoped>
.header
  background-color #ff6600
  position fixed
  z-index 999
  height 55px
  top 0
  left 0
  right 0
  .inner
    max-width 800px
    box-sizing border-box
    margin 0px auto
    padding 15px 5px
  a
    color rgba(255, 255, 255, .8)
    line-height 24px
    transition color .15s ease
    display inline-block
    vertical-align middle
    font-weight 300
    letter-spacing .075em
    margin-right 1.8em
    &:hover
      color #fff
    &.router-link-active
      color #fff
      font-weight 400
    &:nth-child(6)
      margin-right 0

.view
  max-width 800px
  margin 0 auto
  position relative

.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-active
  opacity 0

@media (max-width 860px)
  .header .inner
    padding 15px 30px

@media (max-width 600px)
  .header
    .inner
      padding 15px
    a
      margin-right 1em
    .github
      display none


.news-view
  padding-top 45px

.news-list-nav, .news-list
  background-color #fff
  border-radius 2px

.news-list-nav
  padding 15px 30px
  position fixed
  text-align center
  top 55px
  left 0
  right 0
  z-index 998
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  a
    margin 0 1em
  .disabled
    color #ccc

.news-list
  position absolute
  margin 30px 0
  width 100%
  transition all .5s cubic-bezier(.55,0,.1,1)
  ul
    list-style-type none
    padding 0
    margin 0

.slide-left-enter, .slide-right-leave-to
  opacity 0
  transform translate(30px, 0)

.slide-left-leave-to, .slide-right-enter
  opacity 0
  transform translate(-30px, 0)

.item-move, .item-enter-active, .item-leave-active
  transition all .5s cubic-bezier(.55,0,.1,1)

.item-enter
  opacity 0
  transform translate(30px, 0)

.item-leave-active
  position absolute
  opacity 0
  transform translate(30px, 0)

@media (max-width 600px)
  .news-list
    margin 10px 0

.news-item
  background-color #fff
  padding 10px 10px 10px 60px
  border-bottom 1px solid #eee
  position relative
  line-height 20px
  .score
    color #ff6600
    position absolute
    top 50%
    left 0
    width 60px
    text-align center
    margin-top -10px
  .meta, .host
    font-size .85em
    color #828282
    a
      color #828282
      text-decoration underline
      &:hover
        color #ff6600
</style>
