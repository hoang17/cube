<template lang="pug">
  .build(:class="{[$style.left]:left,[$style.right]:right}")
    Toolbar(:class="$style.toolbar" @leftClick="left = !left" @rightClick="right = !right")
    Navbar(:class="$style.navbar")
    Sidebar(:class="$style.sidebar")
</template>

<script>
import Toolbar from './Toolbar'
import Navbar from '../components/NavBar'
import Sidebar from '../components/Sidebar'

export default {
  components: {
    Toolbar,
    Navbar,
    Sidebar,
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

.left
  .toolbar
  .canvas
    padding-left $left
  .navbar
    transform none

.right
  .toolbar
  .canvas
    padding-right $right
  .sidebar
    transform none

.navbar
  width $left
  transform translate3d(-100%, 0, 0)

.sidebar
  width $right
  transform translate3d(100%, 0, 0)

.canvas
  margin 0
  padding 48px 0 0
  min-height 100vh
  height 100%
  outline none
  transition padding .3s cubic-bezier(.25,.8,.5,1)
</style>
