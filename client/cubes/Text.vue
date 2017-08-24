<template lang="pug">
  .cube.text(:contenteditable="edit", :edit="edit", :active="cube.active", :style="cube.style", @focus="edit && focus()")
    slot
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
    focus(){
      this.select(this.cube)
      // let style = window.getComputedStyle(this.$el)
      // console.log(this.$el);
      // console.log(style);
    },
    input:function(event){
      // this.content = event.target.innerText
    },
    blur(){
      // this.cube.content = this.content
    }
  },
}
</script>

<style lang="stylus" scoped>
.cube
  margin 10px auto
  padding 10px
</style>
