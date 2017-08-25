<template lang="pug">
  .cube.container(:edit="edit", :active="cube.active", :style="cube.style", @click="onClick")
    draggable.inner(v-model='cube.cubes', :options="{group:'cubes'}", v-if="edit")
      component(v-for="(c, i) in cube.cubes", :cube="c", :is="c.type", :key="i", :edit="edit", :select="select")
    .inner(v-else)
      component(v-for="(c, i) in cube.cubes", :cube="c", :is="c.type", :key="i", :edit="edit")
</template>

<script>
import draggable from 'vuedraggable'

export default {
  props: ['cube','select','deselect','edit'],
  components: {
    draggable,
  },
  data() {
    return {
      // content: this.cube.content
    }
  },
  methods: {
    onClick(e){
      if (!this.edit)
        return false
      if (e.target == this.$el || e.target.parentNode == this.$el)
        this.select(this.cube)
    },
  },
}
</script>

<style lang="stylus" scoped>
.cube
  margin 10px auto
  padding 10px

  .inner
    min-height 30px

    &:empty:before
      content 'Container'
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
    border 1px dashed rgba(0,0,0,.2) !important
</style>
