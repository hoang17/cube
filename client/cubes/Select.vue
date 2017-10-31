<template lang="pug">
  div(
    :class="css"
    :edit="edit"
    :active="active"
    @click.stop="edit && focus()"
    @mouseover.stop="")
    label(:class="$style.label", :for="cube._id") {{ cube.content }}
    select(:id="cube._id")
      option(v-for='o in cube.options', :value="o.value") {{ o.name }}
</template>

<script>
import cssMixin from '../mixins/css'
export default {
  props: ['cube','select','edit','parent'],
  mixins: [cssMixin],
  computed: {
    css(){
      return [
        this.$style.select,
        this.cubeCss,
      ]
    },
  },
  methods: {
    focus(){
      this.select(this.cube, this.$el, this.parent)
    },
  },
}
</script>

<style lang="stylus" module>
.select
  composes cube from "./cube.css"
  text-align left !important
  align-items center
  display flex
  flex 1 1 auto
  flex-wrap nowrap

  label
    text-transform uppercase
    letter-spacing 2px
    -webkit-font-smoothing antialiased
    display block
    padding 8px 0
    flex 1 1 40%
    // height 100%
    // line-height 36px
    // vertical-align middle
    // border 1px solid #666

  select
    -webkit-font-smoothing antialiased
    text-align left
    border 1px solid #666
    outline none
    padding 8px
    width 100%
    border-radius 0
    flex 1 1 60%
    border 1px solid rgba(0,0,0,.15)

:global(.application--light)
  .select
    select
      border 1px solid rgba(0,0,0,.15) !important
</style>
