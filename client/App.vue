<template lang="pug">
  #app
    header.header
      nav.inner
        //- router-link(to='/' exact) Home
        //- router-link(to='/contact') Contact
        router-link(to='/groups') Groups
        router-link(to='/likes') Likes
        router-link(to='/friends') Friends
        router-link(to='/feeds') Feeds
    transition(name='fade', mode='out-in')
      keep-alive(exclude="items,feeds")
        router-view.view
</template>

<script>
export default {
  name: 'app',
  components: {
    // 'vue-select': VueSelect
  },
  data() {
    return {
      // message: { value: 'one', label: 'One' },
    }
  },
  methods: {
    // updateDate: function(date) {
    //   this.date = date
    // }
  }
}
</script>

<style lang="stylus">
body
  font-family -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif;
  font-size 15px
  background-color lighten(#eceef1, 30%)
  margin 0
  // padding-top 55px
  color #34495e
  overflow-y scroll

h1,h2,h3,h4,h5,h6
  margin auto

a
  &:hover
  &:active
  &:focus
    text-decoration none
    color #34495e
.disabled
    cursor:default

.header
  margin 0px auto
  max-width 800px
  background-color #ff6600
  // background-color #777
  // position fixed
  z-index 999
  height 51px
  //top 0
  left 0
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  //right 0
  .inner
    max-width 800px
    box-sizing border-box
    margin 0px auto
    padding 15px 30px
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

@media (max-width 600px)
  .header
    .inner
      padding 15px
    a
      margin-right 1em
</style>
