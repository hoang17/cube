<template lang="pug">
  v-btn.cube(:edit="edit", :active="active", :style="cube.style | styl", @click.stop="onClick", :class="css", @mouseover.stop="") {{ cube.content }}
</template>

<script>
export default {
  props: ['cube','select','edit'],
  computed: {
    css(){
      return this.$style.button + (this.cube.css ? ' --' + this.cube.css : '')
    },
    active(){
      return this.$store.state.activeCube == this.cube
    }
  },
  methods: {
    onClick(){
      if (this.edit)
        this.select(this.cube)
      else if (this.cube.url) {
        if (this.cube.url == 'back')
          this.$router.go(-1)
        else
          this.$router.push(this.cube.url)
      }
    },
  },
}
</script>

<style lang="stylus" module>
.button
  display inline-block

  &[edit]
    cursor pointer

  &[edit]:after
    transition .3s cubic-bezier(.25,.8,.25,1)
    pointer-events none
    content ''
    display block
    position absolute
    top 0
    left 0
    width 100%
    height 100%

  &[edit]:hover:after
    border 1px dotted #03a9f4 !important

  // &[active]:after
  //   border 1px dashed rgba(0,0,0,.5) !important
</style>
