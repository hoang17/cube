<template lang="pug">
  div(:edit="edit", :active="active", :style="cube.style | styl", @click.stop="edit && focus()", :class="css", @mouseover.stop="")
    .flex.xs5
      label(:class="$style.label") {{ cube.content }}
    .flex.xs7
      div(v-for='o in cube.options', :class="$style.radio")
        input(type="radio", :name="cube._id", :id="cube._id + o.value", :value="o.value")
        label(:for="cube._id + o.value") {{ o.name }}
</template>

<script>
export default {
  props: ['cube','select','edit'],
  computed: {
    css(){
      return [this.$style.radioGroup, this.cube.css ? '--' + this.cube.css : '']
    },
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

<style lang="stylus" module>
.radio-group
  composes cube from "./cube.css"
  text-align left !important
  align-items center
  display flex
  flex 1 1 auto
  flex-wrap nowrap

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
</style>
