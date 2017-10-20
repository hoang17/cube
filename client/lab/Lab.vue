<template lang="pug">
  .build(:class="{[$style.left]:left,[$style.right]:right}")
    Toolbar(:class="$style.toolbar"
      @leftClick="left = !left",
      @rightClick="right = !right")
    Navbar(:class="$style.navbar")
    Sidebar(:class="$style.sidebar")
</template>

<script>
// import Toolbar from './ToolBar'
// import Navbar from './NavBar'
// import Sidebar from './PropBar'

export default {
  components: {
    // Toolbar,
    // Navbar,
    // Sidebar,
  },
  data(){
    return {
      left: true,
      right: true,
    }
  },
}
</script>

<style lang="stylus" module>
$left := 300px
$right := 28em

.navbar
  width $left

.sidebar
  width $right

.left
  .toolbar
  .canvas
    padding-left $left
  .navbar
    transform translate3d(100%, 0, 0)

.right
  .toolbar
  .canvas
    padding-right $right
  .sidebar
    transform translate3d(-100%, 0, 0)
</style>
