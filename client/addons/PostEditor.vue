<template lang="pug">
  .info-box
    .avatar
      a(:href="'http://facebook.com/' + user.id", target='_blank', rel='noopener')
        img(:src="user.profile.picture")
    //-.from
      a(:href="'http://facebook.com/' + user.id", target='_blank', rel='noopener') {{ user.profile.name }}
    textarea
</template>

<script>
export default {
  props: {
    user: Object,
  },
  data() {
    return {
      expand: false,
    }
  },
  computed: {
    count(){
    }
  }
}
</script>

<style lang="stylus" scoped>
.info-box
  background-color #fff
  border-radius 2px
  padding 10px 15px 10px 70px
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  margin-bottom 15px

  .avatar
    position absolute
    left 10px
    width 50px
    height 50px
    text-align center
    margin-top 5px
    img
      width 100%
      height 100%
  .from
    font-size .9em
    font-weight bold
    padding-top 3px
    margin-bottom 2px

  .icon
    display inline-block
    margin-right 2px
    margin-top -2px
  .meta
    font-size .8em
    color #828282
    margin-top 5px
  .description
    margin-top 10px
    font-size .8em
    white-space pre-wrap
    word-wrap break-word

@media (max-width 600px)
  .info-box
    padding 10px
</style>
