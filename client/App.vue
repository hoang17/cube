<template lang="pug">
  v-app
    transition(name='fade', mode='out-in')
      router-view.view
      //-keep-alive(include="groups,likes,pages")
        router-view.view
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="stylus">

body
  font-family -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif
  text-rendering optimizeLegibility
  font-size 14px
  background-color lighten(#eceef1, 30%)
  margin 0
  height 100vh
  word-spacing 0.05em
  /*color #34495e*/
  /*-webkit-font-smoothing auto*/
  /*overflow-y scroll*/

/*h1,h2,h3,h4,h5,h6
  margin auto*/

.application--light
  color #000

p
  margin 0

a
  /*color #34495e*/
  color rgb(134,142,150)
  text-decoration none

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
  background-color #fff
  z-index 999
  height 51px
  left 0
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  .inner
    max-width 800px
    box-sizing border-box
    margin 0px auto
    padding 15px 30px
  a
    color #252525
    line-height 24px
    transition color .15s ease
    display inline-block
    vertical-align middle
    font-weight 300
    letter-spacing .075em
    margin-right 1.8em
    &:hover
      color #ccc
    &.router-link-active
      color #252525
      font-weight 400
    &:nth-child(6)
      margin-right 0

.view
  /*max-width 800px*/
  margin 0 auto
  position relative

.fade-enter-active, .fade-leave-active
  transition all .2s ease

.fade-enter, .fade-leave-active
  opacity 0

@media (max-width 600px)
  /*body
    padding-top 0*/

  .navbar
    margin-bottom 10px
    .container
      padding 0 15px 0 15px

  .container
    padding 0 7px 0 7px

  .header
    .inner
      padding 15px
    a
      margin-right 1em
</style>
