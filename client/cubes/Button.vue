<template lang="pug">
  v-btn.cube.button(:edit="edit", :active="cube.active", :style="cube.style", @click="onClick") {{ cube.content }}
</template>

<script>
export default {
  props: ['cube','select','deselect','edit'],
  data() {
    return {
      // content: this.cube.content
    }
  },
  methods: {
    onClick(){
      if (this.edit)
        this.select(this.cube)
      else if (this.cube.url) {
        if (this.cube.url == 'back')
          window.history.back()
        else
          this.$router.push({name: 'view', params: {id: this.cube.url} })
      }
    },
  },
}
</script>

<style lang="stylus" scoped>
.cube
  margin 10px auto
  padding 10px
  display inline-block
</style>
