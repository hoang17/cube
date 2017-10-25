<template lang="pug">
  modal(name='login-modal' transition='pop-out', :width='modalWidth', :height='400')
    .box
      #bp-left.box-part
        #partition-register.partition
          .partition-title CREATE ACCOUNT
          .partition-form
            form(autocomplete='false')
              .autocomplete-fix
                input(type='password')
              input#n-email(type='text', placeholder='Email')
              input#n-username(type='text', placeholder='Username')
              input#n-password2(type='password', placeholder='Password')
            div(style='margin-top: 42px')
            .button-set
              button#goto-signin-btn Sign In
              button#register-btn Register
            button.large-btn.github-btn
              | connect with
              span github
            button.large-btn.facebook-btn
              | connect with
              span facebook
      #bp-right.box-part
        .box-messages
</template>
<script>
const MODAL_WIDTH = 656
export default {
  data () {
    return {
      modalWidth: MODAL_WIDTH
    }
  },
  created () {
    this.modalWidth = window.innerWidth < MODAL_WIDTH
      ? MODAL_WIDTH / 2
      : MODAL_WIDTH
  }
}
</script>
<style lang="stylus">
$background_color := #404142
$github_color := #DBA226
$facebook_color := #3880FF

.box
  background white
  overflow hidden
  width 656px
  height 400px
  border-radius 2px
  box-sizing border-box
  box-shadow 0 0 40px black
  color #8b8c8d
  font-size 0
  .box-part
    display inline-block
    position relative
    vertical-align top
    box-sizing border-box
    height 100%
    width 50%
    &#bp-right
      background url("/panorama.jpg") no-repeat top left
      border-left 1px solid #eee


  .box-messages
    position absolute
    left 0
    bottom 0
    width 100%

  .box-error-message
    position relative
    overflow hidden
    box-sizing border-box
    height 0
    line-height 32px
    padding 0 12px
    text-align center
    width 100%
    font-size 11px
    color white
    background #F38181

  .partition
    width 100%
    height 100%
    .partition-title
      box-sizing border-box
      padding 30px
      width 100%
      text-align center
      letter-spacing 1px
      font-size 20px
      font-weight 300

    .partition-form
      padding 0 20px
      box-sizing border-box


  input[type=password]
  input[type=text]
    display block
    box-sizing border-box
    margin-bottom 4px
    width 100%
    font-size 12px
    line-height 2
    border 0
    border-bottom 1px solid #DDDEDF
    padding 4px 8px
    font-family inherit
    transition .3s all
    outline none

  button
    background white
    border-radius 4px
    box-sizing border-box
    padding 10px
    letter-spacing 1px
    font-family "Open Sans", sans-serif
    font-weight 400
    min-width 140px
    margin-top 8px
    color #8b8c8d
    cursor pointer
    border 1px solid #DDDEDF
    text-transform uppercase
    transition 0.1s all
    font-size 10px
    outline none
    &hover
      border-color mix(#DDDEDF, black, 90%)
      color mix(#8b8c8d, black, 80%)


  .large-btn
    width 100%
    background white
    span
      font-weight 600

    &hover
      color white !important


  .button-set
    margin-bottom 8px

  #register-btn
  #signin-btn
    margin-left 8px

  .facebook-btn
    border-color $facebook_color
    color $facebook_color
    &hover
      border-color $facebook_color
      background $facebook_color


  .github-btn
    border-color $github_color
    color $github_color
    &hover
      border-color $github_color
      background $github_color


  .autocomplete-fix
    position absolute
    visibility hidden
    overflow hidden
    opacity 0
    width 0
    height 0
    left 0
    top 0


.pop-out-enter-active
.pop-out-leave-active
  transition all .3s

.pop-out-enter
.pop-out-leave-active
  opacity 0
  transform translateY(24px)

</style>
