<template lang="pug">
  div(:class="[$style.pane, active && $style.active]")
    div(:class="$style.icon")
      i(:class="icon")
    div(:class="$style.content", :badge="badge")
      div(:class="$style.label") {{ lb }}
      div(:class="$style.meta") {{ meta }}
    //-div(:class="$style.trash" @click.stop="$emit('trash')")
      i(class="fa fa-trash-o")
</template>
<script>
export default {
  props: ['active','icon','badge','lb', 'meta']
}
</script>
<style lang="stylus" module>
.pane
  height 40px
  cursor pointer
  font-size 13px
  display flex
  margin 0
  padding 0
  position relative
  user-select none

.icon
  display flex
  min-width 42px
  align-items center
  justify-content flex-start
  justify-content center

.content
  text-align: left
  flex: 1 1 auto
  overflow: hidden
  display: flex
  align-items: flex-start
  justify-content: center
  flex-direction: column
  height: 100%

.label
  height: 24px
  line-height: 24px
  position: relative
  white-space: nowrap
  overflow: hidden
  text-overflow: ellipsis
  width: 100%
  transition: .3s cubic-bezier(.25,.8,.5,1)

.meta
  color #999
  font-size 10px
  font-weight 100
  transition: .3s cubic-bezier(.25,.8,.5,1)

.active
  background-color #e0e0e0
  .label
  .meta
    font-weight 600
    letter-spacing 2px
</style>
