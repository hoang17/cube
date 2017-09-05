<template lang="pug">
  .propbar
    .action
      //- v-btn(primary, dark, @click="done") Done
      v-btn(icon, @click="remove")
        v-icon delete

    v-expansion-panel(expand)
      v-expansion-panel-content
        div(slot='header') {{ cube.name }}
        v-card
          v-card-text
            component(:cube="cube", :is="cube.type + '-pane'", @keydown.native.enter.stop="")
            select(v-model="cube.css")
              option(selected, :value="undefined") Select style
              option(v-for='s in styles', :value="s._id") {{ s.name }}
      v-expansion-panel-content
        div(slot='header') {{ style }}
        v-card
          v-card-text.style
            style-bar(:cube="cube", @keydown.native.enter.stop="")
</template>

<script>
import StyleBar from './StyleBar'
import insertCss from 'insert-css'
import { genStyle } from '../plugins/helpers'

export default {
  props: ['cube'],
  components: {
    StyleBar
  },
  data () {
    return {
    }
  },
  computed: {
    styles(){
      return this.$store.state.styles
    },
    style(){
      let s = this.$store.state.styles[this.cube.css]
      return s ? s.name + ' style' : 'style'
    },
  },
  mounted() {
    for (let id in this.styles){
      let e = this.styles[id]
      let s = genStyle(e.style)
      let style = `.--${id} {${s}}`
      insertCss(style)
    }
  },
  methods: {
    async done(){
      this.$emit('done')
    },
    async remove(){
      this.$emit('remove')
    }
  },
}
</script>

<style lang="stylus">
.propbar
  position absolute
  z-index 3
  top 0
  right 0
  height 100%
  width 28em
  pointer-events auto
  will-change transform
  user-select none
  transition .3s cubic-bezier(.25,.8,.25,1)
  border-left 1px solid rgba(0,0,0,0.12)
  text-align center
  overflow auto

  .action
    width 100%
    height 48px
    text-align left
    // position fixed
    // top 0
    // z-index 4

  .input-group__details
    min-height auto

  .input-group
    padding 16px 0 2px 0
    label
      font-size 13px !important
      text-transform lowercase
  .input-group--text-field
    input
      font-size 13px !important
  .input-group--text-field
    textarea
      font-size 13px !important

  .input-group--prefix:not(.input-group--focused):not(.input-group--dirty)
    label
      left 8px
      top 15px

  .input-group--prefix .input-group--text-field__prefix
  .input-group--prefix .input-group--text-field__suffix
  .input-group--suffix .input-group--text-field__prefix
  .input-group--suffix .input-group--text-field__suffix
    font-size 13px !important

  .input-group--text-field.input-group--dirty:not(.input-group--textarea)
  .input-group--text-field:not(.input-group--single-line):focus:not(.input-group--textarea)
  .input-group--text-field:not(.input-group--single-line).input-group--focused:not(.input-group--textarea)
    label
      transform translate3d(0,-18px,0) scale(.90)

  .icon
    font-size 20px

  select
    margin 10px auto

  .style
    padding-top 0

  .expansion-panel__header
    text-transform uppercase
    font-weight 500
    // box-shadow 1px -1px 1px 1px rgba(0,0,0,.1)
    // box-shadow 0 1px 5px rgba(0,0,0,.2), 0 2px 2px rgba(0,0,0,.14), 0 3px 1px -2px rgba(0,0,0,.12)

  .expansion-panel__body
    border-top 0.1rem solid #d1d1d1
  //   box-shadow inset 1px 1px 2px rgba(0,0,0,.1)

</style>
