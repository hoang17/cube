<template lang="pug">
  div(:class="[$style.box, active && $style.active]", :style="styles")
    div(:class="$style.icon")
      i(:class="icon")
    div(:class="[$style.content, badge && $style.badge]")
      div(:class="$style.label") {{ lb }}
      div(v-if="meta", :class="$style.meta") {{ meta }}
    div(v-if="trash", :class="$style.trash" @click.stop="$emit('trash')")
      i(class="fa fa-trash-o")
</template>
<script>
export default {
  props: ['w','active','icon','badge','lb', 'meta','trash'],
  computed: {
    styles(){
      return this.w && `flex: 1 1 ${this.w*100}%`
    }
  }
}
</script>
<style lang="stylus" module>
.box
  height 40px
  cursor pointer
  font-size 13px
  display flex
  margin 0
  padding 0 16px
  position relative
  user-select none
  &:hover
    background-color #e0e0e0
  &.active
    background-color #e0e0e0
    .label
    .meta
      font-weight 600
      letter-spacing 2px

.icon
.trash
  display flex
  min-width 36px
  align-items center

.trash
  justify-content: flex-end

.content
  text-align left
  flex: 1 1 auto
  overflow hidden
  display flex
  align-items flex-start
  justify-content center
  flex-direction column
  height 100%
  position relative

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

.badge:after
  background #4caf50!important
  font-size 8px
  width 10px
  height 10px
  top 15px
  right 0
  color: #fff
  content: attr(data-badge)
  display: flex
  position: absolute
  background-color: #1976d2
  border-radius: 50%
  justify-content: center
  align-items: center
  flex-direction: row
  flex-wrap: wrap
</style>
