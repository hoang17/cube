<template lang="pug">
  div(:class="$style.toolbar")
    Button(ma="menu" @click.native="$emit('leftClick')")
    Button(fa="save")
    Button(fa="copy")
    Button(fa="cut")
    Button(ma="content_paste")
    Button(fa="clone")
    Button(fa="trash-o")
    Button(ma="undo")
    Button(ma="redo")
    Button(ma="visibility")
    Button(fa="cube")
    Button(fa="cubes")
    Button(ma="menu" @click.native="$emit('rightClick')" right)
</template>

<script>
import Button from '../components/ButtonToolbar'

export default {
  components: {
    Button
  },
}
</script>

<style lang="stylus" module>
.toolbar
  width 100%
  height 48px
  position fixed
  z-index 3
  color rgba(0,0,0,.87)
  background-color #f5f5f5
  will-change padding-left, padding-right
  transition .3s cubic-bezier(.25,.8,.5,1)
  box-shadow 0 1px 3px rgba(0,0,0,.2),0 1px 1px rgba(0,0,0,.14),0 2px 1px -1px rgba(0,0,0,.12)
</style>
