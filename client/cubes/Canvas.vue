<template lang="pug">
  .canvas
</template>

<script>

export default {
  data() {
    return {
    }
  },
  computed: {
    user(){
      return this.$store.state.user
    },
  },
  methods: {
    async post(){
    }
  }
}
</script>

<style lang="stylus" scoped>
.canvas
  background-color #fff
  border-radius 2px
  padding 10px 15px
  box-shadow 0 1px 2px rgba(0,0,0,.1)
  margin 20px
  height 100vh
</style>
