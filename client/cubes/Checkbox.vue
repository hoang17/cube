<template lang="pug">
  div(
    :edit="edit"
    :active="active"
    :style="cube.style | styl"
    :class="css"
    @click.stop="edit && focus()"
    @mouseover.stop="")
    label(:class="$style.label") {{ cube.content }}
    div(:class="$style.group")
      div(v-for='o in cube.options', :class="$style.checkbox")
        input(type="checkbox", :name="cube._id", :id="o.value", :value="o.value")
        label(:for="o.value") {{ o.name }}
</template>

<script>
export default {
  props: ['cube','select','edit', 'parent'],
  computed: {
    css(){
      return [this.$style.check, this.cube.src ? '--' + this.cube.src : '']
    },
    active(){
      return this.$store.state.activeCube == this.cube
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
.check
  composes cube from "./cube.css"
  text-align left !important
  align-items center
  display flex
  flex 1 1 auto

.label
  -webkit-font-smoothing antialiased
  text-transform uppercase
  letter-spacing 2px
  display inline-block
  padding 8px 0
  flex 1 1 40%

.group
  flex 1 1 60%

.checkbox
  label
    -webkit-font-smoothing antialiased
    display inline-block
    padding 3px 0 3px 10px
  input
    display inline-block
</style>
