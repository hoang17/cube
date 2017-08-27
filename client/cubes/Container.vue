<template lang="pug">
  .cube.container(:edit="edit", :active="cube.active", :style="cube.style", @click.stop="onClick")
    draggable.inner(v-model='cube.cubes', :options="{group:'cubes'}", v-if="edit", :content="cube.content")
      component(v-for="(c, i) in cube.cubes", :cube="c", :is="c.type", :key="i", :edit="edit", :select="select")
    .inner(v-else)
      component(v-for="(c, i) in cube.cubes", :cube="c", :is="c.type", :key="i", :edit="edit")
</template>

<script>
import draggable from 'vuedraggable'

export default {
  props: ['cube','select','edit'],
  components: {
    draggable,
  },
  data() {
    return {
    }
  },
  methods: {
    onClick(e){
      if (!this.edit)
        return false
      this.select(this.cube)
    },
  },
}
</script>

<style lang="stylus" scoped>
.container
  position relative
  margin 10px auto
  padding 10px

  .inner
    position relative
    min-height 30px

    &:empty:before
      content attr(content)
      display block
      position absolute
      top calc(50% - 0.5rem)
      left 0
      width 100%
      font-size 1rem
      height 1rem
      line-height 1rem
      white-space nowrap
      text-overflow ellipsis
      padding 0 2rem
      color rgba(144,145,153,0.5)

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
    border 1px dashed rgba(0,0,0,.2) !important

  &[edit]:hover:after
    border 1px dotted #03a9f4 !important

  &[active]:after
    border 1px dashed rgba(0,0,0,.5) !important
</style>
