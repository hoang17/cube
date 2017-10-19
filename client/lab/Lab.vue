<template lang="pug">
  .build
    Toolbar(
      :style="padding",
      @leftClick="show_left = !show_left",
      @rightClick="show_right = !show_right")
    Navbar(:style="style_left")
    Sidebar(:style="style_right")
</template>

<script>
import Toolbar from './ToolBar'
import Navbar from './NavBar'
import Sidebar from './PropBar'

export default {
  components: {
    Toolbar,
    Navbar,
    Sidebar,
  },
  data(){
    return {
      width_left: "300px",
      width_right: "28em",
      show_left: true,
      show_right: true,
    }
  },
  computed: {
    padding() {
      return {
        paddingLeft: this.show_left && this.width_left,
        paddingRight: this.show_right && this.width_right
      }
    },
    style_left(){
      return {
        width: this.width_left,
        transform: !this.show_left && 'translate3d(100%, 0, 0)'
      }
    },
    style_right(){
      return {
        width: this.width_right,
        transform: !this.show_right && 'translate3d(-100%, 0, 0)'
      }
    },
  }
}
</script>

<style lang="stylus" module>
</style>
