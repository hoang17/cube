<template lang="pug">
  .news-view
    .info-box
      .text
        input(placeholder='Search for group...', v-model="id")
        button.post(type='submit', name='submit', @click='post', :disabled="this.id.trim().length==0") Next
</template>

<script>

export default {
  data() {
    return {
      id: '',
    }
  },
  computed: {
    user(){
      return this.$store.state.user
    },
  },
  methods: {
    async post(){
      this.$router.push({ name: 'items', params: { type:'groups', id: this.id }})
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

/*.comment
  font-size 13px
  position relative
  padding 5px 2px 5px 40px
  min-height 45px*/

  .text
    font-size 13px
    white-space pre-wrap
    overflow-wrap break-word
    word-wrap break-word
    input
      resize: none
      width 50%
      height 32px
      border 1px solid #dddfe2
      border-radius 2px
      -webkit-appearance none
      box-shadow inset 0 1px 2px rgba(0,0,0,.1)
      padding 5px
  button.post
    /*top 5px
    right 0
    position absolute*/
    margin-left 10px
    font-family sans-serif
    width 146px
    height 32px
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
