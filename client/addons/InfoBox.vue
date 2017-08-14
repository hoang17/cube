<template lang="pug">
  .info-box(@click="expand=!expand")
    b
      img.icon(:src="account.icon", width="16", height="16", v-if="account.icon")
      |  {{ account.name }}
    .meta {{ count | formatNumber }} - {{ meta }}
    .about(v-show="expand") {{ about }}
</template>

<script>
export default {
  props: {
    account: Object,
		type: String,
  },
  data() {
    return {
      expand: false,
    }
  },
  computed: {
    about(){
      return !this.account.description && this.account.about ? this.account.about : this.account.description
    },
    meta(){
      if (this.type == 'groups'){
        return this.account.privacy
      }
      return this.account.category
    },
    count(){
      if (!this.account) return 0
      if (this.type == 'groups'){
        return this.account.members.summary.total_count
      }
      return this.account.fan_count
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
  margin-bottom 10px
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

</style>
