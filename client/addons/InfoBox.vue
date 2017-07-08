<template lang="pug">
  .info-box(@click="expand=!expand")
    b
      img.icon(:src="obj.icon", width="16", height="16", v-if="obj.icon")
      |  {{ obj.name }}
    .meta {{ count | formatNumber }} - {{ meta }}
    .about(v-show="expand") {{ about }}
</template>

<script>
export default {
  props: {
    obj: Object,
		type: String,
  },
  data() {
    return {
      expand: false,
    }
  },
  computed: {
    about(){
      return !this.obj.description && this.obj.about ? this.obj.about : this.obj.description
    },
    meta(){
      if (this.type == 'groups'){
        return this.obj.privacy
      }
      return this.obj.category
    },
    count(){
      if (this.type == 'groups'){
        return this.obj.members.summary.total_count
      }
      return this.obj.fan_count
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
  margin-bottom 15px
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

@media (max-width 600px)
  .info-box
    padding 10px

</style>
