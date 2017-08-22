<template lang="pug">
  .cube.text(:class="{active: cube.active}", :style="cube.style")
    .slot(contenteditable, @input="input", @focus="focus", @blur="blur")
      slot
</template>

<script>
export default {
  props: ['cube','select','deselect'],
  data() {
    return {
      content: this.cube.content
    }
  },
  methods: {
    focus(){
      this.select(this.cube)
      let style = window.getComputedStyle(this.$el)
      // console.log(this.$el);
      // console.log(style);
    },
    input:function(event){
      this.content = event.target.innerText
      console.log(this.content);
    },
    blur(){
      console.log(this.content);
      this.cube.content = this.content
    }
  },
}
</script>

<style lang="stylus" scoped>
.cube
  position relative
  margin 10px auto
  text-align center
  cursor pointer
  user-select none

  .slot
    position relative
    padding 10px

    &:after
      pointer-events none
      content ''
      display block
      position absolute
      top 0
      left 0
      width 100%
      height 100%

    &:hover
      &:after
        border 1px dotted #03a9f4 !important

  &.active > .slot
    &:after
      border 1px dashed rgba(0,0,0,.5) !important
      /*border 2px solid #81d4fa !important*/

</style>
