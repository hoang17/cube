<template lang="pug">
  div(
    :class="css"
    :edit="edit"
    :active="active"
    :style="cube.style | styl"
    @click.stop="edit && focus()"
    @mouseover.stop="")
    label(:class="$style.label") {{ cube.content }}
    div(:class="$style.group")
      div(v-for='o in cube.options', :class="$style.radiobox")
        input(type="radio", :name="cube._id", :id="cube._id + o.value", :value="o.value")
        label(:for="cube._id + o.value") {{ o.name }}
</template>

<script>
export default {
  props: ['cube','select','edit'],
  computed: {
    css(){
      return [this.$style.radio, this.cube.src ? '--' + this.cube.src : '']
    },
    active(){
      return this.$store.state.activeCube == this.cube
    },
  },
  methods: {
    focus(){
      this.select(this.cube, this.$el)
    },
  },
}
</script>

<style lang="stylus" module>
.radio
  composes cube from "./cube.css"
  text-align left !important
  align-items center
  display flex
  flex 1 1 auto
  flex-wrap nowrap

.label
  -webkit-font-smoothing antialiased
  text-transform uppercase
  letter-spacing 2px
  display inline-block
  padding 8px 0
  flex 1 1 40%

.group
  flex 1 1 60%

.radiobox
  label
    -webkit-font-smoothing antialiased
    display inline-block
    padding 3px 0 3px 10px
  input
    display inline-block
</style>
