<template lang="pug">
  .info-box(@click="expand=!expand")
    b
      img.icon(:src="obj.icon", width="16", height="16")
      |  {{ obj.name }}
    .meta {{ count | formatNumber }} - {{ obj.privacy }}
    .description(v-show="expand") {{ obj.description }}
    //-pre {{ obj }}
</template>

<script>
export default {
  props: {
    id: String,
		type: String,
  },
  data() {
    return {
      expand: false,
    }
  },
  computed: {
    obj () {
      let id = this.id
      return this.$store.state.groups.data.filter(function(e){
        return e.id == id
      })[0]
    },
    count(){
      return this.obj.members.summary.total_count
    }
  }
}
</script>

<style lang="stylus" scoped>
.info-box
  background-color #fff
  border-radius 2px
  padding 10px
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  margin-bottom 15px
  .icon
    display inline-block
  .meta
    font-size .8em
    color #828282
    margin-top 5px
  .description
    margin-top 10px
    font-size .8em
    white-space pre-wrap
    word-wrap break-word
</style>
