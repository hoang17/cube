<template lang="pug">
  .cube.radio-group(:edit="edit", :active="active", :style="cube.style | styl", @click.stop="edit && focus()", :class="cube.css|css", @mouseover.stop="")
    .flex.xs5
      label.label {{ cube.content }}
    .flex.xs7
      .radio(v-for='o in cube.options')
        input(type="radio", :name="cube._id", :id="cube._id + o.value", :value="o.value")
        label(:for="cube._id + o.value") {{ o.name }}
</template>

<script>
export default {
  props: ['cube','select','edit'],
  computed: {
    active(){
      return this.$store.state.activeCube == this.cube
    },
  },
  methods: {
    focus(){
      this.select(this.cube)
    },
  },
}
</script>

<style lang="stylus" scoped>
.radio-group
  text-align left
  align-items center
  display flex
  flex 1 1 auto
  flex-wrap nowrap

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

  &[edit]:hover:after
    border 1px dotted #03a9f4 !important

  // &[active]:after
  //   border 1px dashed rgba(0,0,0,.5) !important

.label
  text-transform uppercase
  letter-spacing 2px
  -webkit-font-smoothing antialiased
  display inline-block
  padding 8px 0

.radio
  label
    -webkit-font-smoothing antialiased
    display inline-block
    padding 3px 0 3px 10px

input
  display inline-block

  &[edit]
    transition .3s cubic-bezier(.25,.8,.25,1)

  &[edit]:hover
    border 1px dotted #03a9f4 !important

  // &[active]
  //   border 1px dotted #4FFBFF !important
  //   outline none

.application--light
  input
    border 1px solid rgba(0,0,0,.15) !important
</style>
